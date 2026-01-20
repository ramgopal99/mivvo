import { SubLesson } from '../../../../data/lessonsData';

export const topic_13_4: SubLesson = {
  id: '13.4',
  title: 'Network Security and Cryptography',
  status: 'demo',
  content: `# Network Security and Cryptography

## Cryptographic Foundations

### Symmetric Encryption
\`\`\`c
#include <openssl/evp.h>
#include <openssl/aes.h>

// AES encryption/decryption
int aes_encrypt(unsigned char *plaintext, int plaintext_len,
                unsigned char *key, unsigned char *iv,
                unsigned char *ciphertext) {
    EVP_CIPHER_CTX *ctx = EVP_CIPHER_CTX_new();
    int len, ciphertext_len;

    EVP_EncryptInit_ex(ctx, EVP_aes_256_cbc(), NULL, key, iv);

    EVP_EncryptUpdate(ctx, ciphertext, &len, plaintext, plaintext_len);
    ciphertext_len = len;

    EVP_EncryptFinal_ex(ctx, ciphertext + len, &len);
    ciphertext_len += len;

    EVP_CIPHER_CTX_free(ctx);
    return ciphertext_len;
}

int aes_decrypt(unsigned char *ciphertext, int ciphertext_len,
                unsigned char *key, unsigned char *iv,
                unsigned char *plaintext) {
    EVP_CIPHER_CTX *ctx = EVP_CIPHER_CTX_new();
    int len, plaintext_len;

    EVP_DecryptInit_ex(ctx, EVP_aes_256_cbc(), NULL, key, iv);

    EVP_DecryptUpdate(ctx, plaintext, &len, ciphertext, ciphertext_len);
    plaintext_len = len;

    EVP_DecryptFinal_ex(ctx, plaintext + len, &len);
    plaintext_len += len;

    EVP_CIPHER_CTX_free(ctx);
    return plaintext_len;
}
\`\`\`

### Asymmetric Encryption (RSA)
\`\`\`c
#include <openssl/rsa.h>
#include <openssl/pem.h>

// Generate RSA key pair
RSA* generate_rsa_keypair(int bits) {
    RSA *rsa = RSA_new();
    BIGNUM *bn = BN_new();
    BN_set_word(bn, RSA_F4);  // 65537

    RSA_generate_key_ex(rsa, bits, bn, NULL);
    BN_free(bn);

    return rsa;
}

// RSA encryption
int rsa_encrypt(RSA *rsa, unsigned char *plaintext, int plaintext_len,
                unsigned char *encrypted) {
    return RSA_public_encrypt(plaintext_len, plaintext,
                            encrypted, rsa, RSA_PKCS1_PADDING);
}

// RSA decryption
int rsa_decrypt(RSA *rsa, unsigned char *encrypted, int encrypted_len,
                unsigned char *decrypted) {
    return RSA_private_decrypt(encrypted_len, encrypted,
                             decrypted, rsa, RSA_PKCS1_PADDING);
}
\`\`\`

## Hash Functions and HMAC

### SHA-256 Hashing
\`\`\`c
#include <openssl/sha.h>

void sha256_hash(unsigned char *data, size_t len, unsigned char *hash) {
    SHA256_CTX sha256;
    SHA256_Init(&sha256);
    SHA256_Update(&sha256, data, len);
    SHA256_Final(hash, &sha256);
}

// Usage
unsigned char hash[SHA256_DIGEST_LENGTH];
sha256_hash(data, data_len, hash);
\`\`\`

### HMAC for Message Authentication
\`\`\`c
#include <openssl/hmac.h>

void hmac_sha256(unsigned char *key, size_t key_len,
                 unsigned char *data, size_t data_len,
                 unsigned char *mac) {
    unsigned int mac_len;
    HMAC(EVP_sha256(), key, key_len, data, data_len, mac, &mac_len);
}

// Verify HMAC
bool verify_hmac(unsigned char *key, size_t key_len,
                 unsigned char *data, size_t data_len,
                 unsigned char *expected_mac) {
    unsigned char computed_mac[EVP_MAX_MD_SIZE];
    hmac_sha256(key, key_len, data, data_len, computed_mac);

    return CRYPTO_memcmp(computed_mac, expected_mac, 32) == 0;
}
\`\`\`

## SSL/TLS Implementation

### OpenSSL TLS Server
\`\`\`c
#include <openssl/ssl.h>
#include <openssl/err.h>

SSL_CTX* create_ssl_context() {
    const SSL_METHOD *method = TLS_server_method();
    SSL_CTX *ctx = SSL_CTX_new(method);

    if (!ctx) {
        perror("Unable to create SSL context");
        ERR_print_errors_fp(stderr);
        exit(EXIT_FAILURE);
    }

    return ctx;
}

void configure_ssl_context(SSL_CTX *ctx) {
    // Load certificate and private key
    if (SSL_CTX_use_certificate_file(ctx, "server.crt", SSL_FILETYPE_PEM) <= 0) {
        ERR_print_errors_fp(stderr);
        exit(EXIT_FAILURE);
    }

    if (SSL_CTX_use_PrivateKey_file(ctx, "server.key", SSL_FILETYPE_PEM) <= 0) {
        ERR_print_errors_fp(stderr);
        exit(EXIT_FAILURE);
    }

    // Verify private key matches certificate
    if (!SSL_CTX_check_private_key(ctx)) {
        fprintf(stderr, "Private key does not match certificate\\n");
        exit(EXIT_FAILURE);
    }
}

void handle_ssl_connection(int client_fd, SSL_CTX *ctx) {
    SSL *ssl = SSL_new(ctx);
    SSL_set_fd(ssl, client_fd);

    if (SSL_accept(ssl) <= 0) {
        ERR_print_errors_fp(stderr);
        SSL_free(ssl);
        return;
    }

    // Handle encrypted communication
    char buffer[1024];
    int bytes = SSL_read(ssl, buffer, sizeof(buffer));

    if (bytes > 0) {
        // Process request
        SSL_write(ssl, "Hello from SSL server", 21);
    }

    SSL_shutdown(ssl);
    SSL_free(ssl);
}
\`\`\`

### OpenSSL TLS Client
\`\`\`c
SSL_CTX* create_ssl_client_context() {
    const SSL_METHOD *method = TLS_client_method();
    SSL_CTX *ctx = SSL_CTX_new(method);

    // Load trusted certificates
    if (!SSL_CTX_load_verify_locations(ctx, "ca-cert.pem", NULL)) {
        ERR_print_errors_fp(stderr);
        exit(EXIT_FAILURE);
    }

    // Require server certificate verification
    SSL_CTX_set_verify(ctx, SSL_VERIFY_PEER, NULL);

    return ctx;
}

void connect_ssl_server(const char *hostname, int port, SSL_CTX *ctx) {
    int sockfd = create_tcp_connection(hostname, port);

    SSL *ssl = SSL_new(ctx);
    SSL_set_fd(ssl, sockfd);

    // Set hostname for SNI
    SSL_set_tlsext_host_name(ssl, hostname);

    if (SSL_connect(ssl) != 1) {
        ERR_print_errors_fp(stderr);
        SSL_free(ssl);
        close(sockfd);
        return;
    }

    // Verify server certificate
    X509 *cert = SSL_get_peer_certificate(ssl);
    if (cert == NULL) {
        printf("No server certificate\\n");
    } else {
        // Verify certificate hostname
        if (SSL_get_verify_result(ssl) != X509_V_OK) {
            printf("Certificate verification failed\\n");
        }
        X509_free(cert);
    }

    // Send encrypted data
    SSL_write(ssl, "Hello SSL server", 16);

    SSL_shutdown(ssl);
    SSL_free(ssl);
    close(sockfd);
}
\`\`\`

## Secure Communication Protocols

### Implementing a Simple TLS-like Protocol
\`\`\`c
typedef struct {
    unsigned char client_random[32];
    unsigned char server_random[32];
    unsigned char master_secret[48];
    unsigned char client_write_key[32];
    unsigned char server_write_key[32];
    EVP_CIPHER_CTX *client_cipher;
    EVP_CIPHER_CTX *server_cipher;
} TLSConnection;

// Handshake process
void tls_handshake(int sockfd, TLSConnection *conn) {
    // Client sends ClientHello
    send_client_hello(sockfd, conn->client_random);

    // Server responds with ServerHello + Certificate + ServerHelloDone
    receive_server_hello(sockfd, conn);

    // Client sends ClientKeyExchange + ChangeCipherSpec + Finished
    send_client_key_exchange(sockfd, conn);

    // Server sends ChangeCipherSpec + Finished
    receive_server_finished(sockfd, conn);

    // Initialize cipher contexts
    init_ciphers(conn);
}

// Encrypt/decrypt data
void tls_send(int sockfd, TLSConnection *conn, unsigned char *data, size_t len) {
    unsigned char encrypted[4096];
    int encrypted_len;

    EVP_EncryptUpdate(conn->client_cipher, encrypted, &encrypted_len, data, len);
    send(sockfd, encrypted, encrypted_len, 0);
}

size_t tls_receive(int sockfd, TLSConnection *conn, unsigned char *buffer, size_t max_len) {
    unsigned char encrypted[4096];
    int encrypted_len = recv(sockfd, encrypted, sizeof(encrypted), 0);

    unsigned char decrypted[4096];
    int decrypted_len;

    EVP_DecryptUpdate(conn->server_cipher, decrypted, &decrypted_len,
                     encrypted, encrypted_len);

    memcpy(buffer, decrypted, decrypted_len);
    return decrypted_len;
}
\`\`\`

## Network Security Best Practices

### Input Validation and Sanitization
\`\`\`c
#include <string.h>
#include <ctype.h>

// Sanitize user input
char* sanitize_input(const char *input, size_t max_len) {
    char *sanitized = malloc(max_len + 1);
    size_t i = 0;

    while (*input && i < max_len) {
        if (isalnum(*input) || *input == '_' || *input == '-') {
            sanitized[i++] = *input;
        }
        input++;
    }

    sanitized[i] = '\\0';
    return sanitized;
}

// Validate IP address
bool is_valid_ipv4(const char *ip) {
    struct sockaddr_in sa;
    return inet_pton(AF_INET, ip, &(sa.sin_addr)) == 1;
}
\`\`\`

### Buffer Overflow Protection
\`\`\`c
// Safe string operations
#define SAFE_STRCPY(dst, src, dst_size) \\
    do { \\
        strncpy(dst, src, dst_size - 1); \\
        dst[dst_size - 1] = '\\0'; \\
    } while (0)

// Bounds checking
int safe_read(int fd, char *buffer, size_t buffer_size) {
    size_t bytes_to_read = buffer_size - 1;  // Leave space for null terminator
    ssize_t bytes_read = read(fd, buffer, bytes_to_read);

    if (bytes_read >= 0) {
        buffer[bytes_read] = '\\0';
    }

    return bytes_read;
}
\`\`\`

## Authentication and Authorization

### Challenge-Response Authentication
\`\`\`c
#include <openssl/rand.h>
#include <openssl/sha.h>

// Generate random challenge
void generate_challenge(unsigned char *challenge, size_t len) {
    RAND_bytes(challenge, len);
}

// Compute response = SHA256(password + challenge)
void compute_response(const char *password, unsigned char *challenge,
                     size_t challenge_len, unsigned char *response) {
    SHA256_CTX sha256;
    SHA256_Init(&sha256);
    SHA256_Update(&sha256, password, strlen(password));
    SHA256_Update(&sha256, challenge, challenge_len);
    SHA256_Final(response, &sha256);
}

// Server authentication
bool authenticate_client(int client_fd, const char *expected_password) {
    unsigned char challenge[32];
    unsigned char expected_response[SHA256_DIGEST_LENGTH];

    generate_challenge(challenge, sizeof(challenge));

    // Send challenge
    send(client_fd, challenge, sizeof(challenge), 0);

    // Receive response
    unsigned char client_response[SHA256_DIGEST_LENGTH];
    recv(client_fd, client_response, sizeof(client_response), 0);

    // Compute expected response
    compute_response(expected_password, challenge, sizeof(challenge),
                    expected_response);

    // Compare responses
    return CRYPTO_memcmp(client_response, expected_response,
                        SHA256_DIGEST_LENGTH) == 0;
}
\`\`\`

### Token-Based Authorization
\`\`\`c
#include <jwt.h>  // libjwt

// Create JWT token
char* create_jwt_token(const char *user_id, const char *secret) {
    jwt_t *jwt = NULL;
    jwt_new(&jwt);

    jwt_set_alg(jwt, JWT_ALG_HS256, (unsigned char *)secret, strlen(secret));
    jwt_add_grant(jwt, "user_id", user_id);
    jwt_add_grant_int(jwt, "exp", time(NULL) + 3600);  // 1 hour

    char *token = jwt_encode_str(jwt);
    jwt_free(jwt);

    return token;
}

// Verify JWT token
bool verify_jwt_token(const char *token, const char *secret, char **user_id) {
    jwt_t *jwt = NULL;

    if (jwt_decode(&jwt, token, (unsigned char *)secret, strlen(secret)) != 0) {
        return false;
    }

    // Check expiration
    time_t exp = jwt_get_grant_int(jwt, "exp");
    if (time(NULL) > exp) {
        jwt_free(jwt);
        return false;
    }

    // Extract user ID
    *user_id = strdup(jwt_get_grant(jwt, "user_id"));

    jwt_free(jwt);
    return true;
}
\`\`\`

## Secure Coding Practices

### Avoiding Common Vulnerabilities
\`\`\`c
// Avoid format string vulnerabilities
void safe_print(const char *format, ...) {
    va_list args;
    va_start(args, format);

    // Validate format string (simplified)
    const char *ptr = format;
    while (*ptr) {
        if (*ptr == '%' && *(ptr + 1) != '%') {
            // Allow only safe format specifiers
            char next = *(ptr + 1);
            if (strchr("sdiuoxXfFeEgGc", next) == NULL) {
                fprintf(stderr, "Unsafe format specifier\\n");
                va_end(args);
                return;
            }
        }
        ptr++;
    }

    vprintf(format, args);
    va_end(args);
}

// Use constant-time comparison for secrets
bool constant_time_compare(const unsigned char *a, const unsigned char *b, size_t len) {
    volatile unsigned char result = 0;

    for (size_t i = 0; i < len; i++) {
        result |= a[i] ^ b[i];
    }

    return result == 0;
}
\`\`\`

## Network Intrusion Detection

### Simple Packet Analysis
\`\`\`c
#include <netinet/ip.h>
#include <netinet/tcp.h>

void analyze_packet(const unsigned char *packet, size_t len) {
    struct iphdr *ip_header = (struct iphdr *)packet;

    // Check for suspicious patterns
    if (ip_header->protocol == IPPROTO_TCP) {
        struct tcphdr *tcp_header = (struct tcphdr *)(packet + ip_header->ihl * 4);

        // Check for SYN flood (too many SYN packets)
        if (tcp_header->syn && !tcp_header->ack) {
            log_suspicious_packet(packet, "Potential SYN flood");
        }

        // Check for port scanning
        if (tcp_header->syn && tcp_header->fin) {
            log_suspicious_packet(packet, "Xmas scan detected");
        }
    }

    // Check payload for known attack signatures
    if (len > sizeof(struct iphdr) + sizeof(struct tcphdr)) {
        const char *payload = packet + sizeof(struct iphdr) + sizeof(struct tcphdr);
        size_t payload_len = len - sizeof(struct iphdr) - sizeof(struct tcphdr);

        if (strstr(payload, "UNION SELECT") != NULL) {
            log_suspicious_packet(packet, "SQL injection attempt");
        }
    }
}
\`\`\`

### Rate Limiting
\`\`\`c
typedef struct {
    time_t window_start;
    unsigned int request_count;
    unsigned int max_requests;
    time_t window_size;
} RateLimiter;

bool check_rate_limit(RateLimiter *limiter, const char *client_ip) {
    time_t now = time(NULL);

    // Reset window if expired
    if (now - limiter->window_start >= limiter->window_size) {
        limiter->window_start = now;
        limiter->request_count = 0;
    }

    if (limiter->request_count >= limiter->max_requests) {
        return false;  // Rate limit exceeded
    }

    limiter->request_count++;
    return true;
}
\`\`\`

Network security in C programming requires careful attention to cryptographic implementation, secure communication protocols, and defense against common network attacks. Using established libraries like OpenSSL and following secure coding practices are essential for building secure network applications.`
};

