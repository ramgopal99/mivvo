import { SubLesson } from '../../../../data/lessonsData';

export const topic_13_6: SubLesson = {
  id: '13.6',
  title: 'Network Application Development',
  status: 'demo',
  content: `# Network Application Development

## HTTP Client and Server Implementation

### Simple HTTP Client
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <openssl/ssl.h>
#include <openssl/err.h>

typedef struct {
    int sockfd;
    SSL *ssl;
    int use_ssl;
} HttpConnection;

HttpConnection* http_connect(const char *hostname, int port, int use_ssl) {
    HttpConnection *conn = calloc(1, sizeof(HttpConnection));
    conn->use_ssl = use_ssl;

    struct hostent *host = gethostbyname(hostname);
    if (!host) {
        free(conn);
        return NULL;
    }

    conn->sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (conn->sockfd < 0) {
        free(conn);
        return NULL;
    }

    struct sockaddr_in server_addr;
    memset(&server_addr, 0, sizeof(server_addr));
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(port);
    memcpy(&server_addr.sin_addr, host->h_addr, host->h_length);

    if (connect(conn->sockfd, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0) {
        close(conn->sockfd);
        free(conn);
        return NULL;
    }

    if (use_ssl) {
        SSL_library_init();
        SSL_CTX *ctx = SSL_CTX_new(SSLv23_client_method());
        conn->ssl = SSL_new(ctx);
        SSL_set_fd(conn->ssl, conn->sockfd);

        if (SSL_connect(conn->ssl) != 1) {
            SSL_free(conn->ssl);
            SSL_CTX_free(ctx);
            close(conn->sockfd);
            free(conn);
            return NULL;
        }
        SSL_CTX_free(ctx);
    }

    return conn;
}

char* http_get(HttpConnection *conn, const char *path) {
    char request[1024];
    snprintf(request, sizeof(request),
             "GET %s HTTP/1.1\\r\\n"
             "Host: example.com\\r\\n"
             "Connection: close\\r\\n\\r\\n", path);

    if (conn->use_ssl) {
        SSL_write(conn->ssl, request, strlen(request));
    } else {
        write(conn->sockfd, request, strlen(request));
    }

    // Read response
    char *response = malloc(65536);
    size_t total_read = 0;

    while (1) {
        ssize_t bytes_read;
        if (conn->use_ssl) {
            bytes_read = SSL_read(conn->ssl, response + total_read, 4096);
        } else {
            bytes_read = read(conn->sockfd, response + total_read, 4096);
        }

        if (bytes_read <= 0) break;
        total_read += bytes_read;

        // Check for end of HTTP response (simplified)
        if (strstr(response, "\\r\\n\\r\\n") && strstr(response, "Content-Length:")) {
            break;
        }
    }

    response[total_read] = '\\0';
    return response;
}

void http_close(HttpConnection *conn) {
    if (conn->ssl) {
        SSL_shutdown(conn->ssl);
        SSL_free(conn->ssl);
    }
    close(conn->sockfd);
    free(conn);
}

// Usage
int main() {
    HttpConnection *conn = http_connect("www.example.com", 443, 1);
    if (conn) {
        char *response = http_get(conn, "/");
        printf("Response: %s\\n", response);
        free(response);
        http_close(conn);
    }
    return 0;
}
\`\`\`

### Simple HTTP Server
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <pthread.h>

#define PORT 8080
#define BUFFER_SIZE 4096

void *handle_client(void *arg) {
    int client_fd = *(int *)arg;
    free(arg);

    char buffer[BUFFER_SIZE];
    ssize_t bytes_read = read(client_fd, buffer, sizeof(buffer) - 1);

    if (bytes_read > 0) {
        buffer[bytes_read] = '\\0';

        // Parse HTTP request (simplified)
        char method[16], path[256], version[16];
        sscanf(buffer, "%s %s %s", method, path, version);

        // Simple routing
        const char *response_body;
        if (strcmp(path, "/") == 0) {
            response_body = "<h1>Hello, World!</h1>";
        } else if (strcmp(path, "/about") == 0) {
            response_body = "<h1>About Page</h1>";
        } else {
            response_body = "<h1>404 Not Found</h1>";
        }

        // Send HTTP response
        char response[4096];
        int response_len = snprintf(response, sizeof(response),
            "HTTP/1.1 200 OK\\r\\n"
            "Content-Type: text/html\\r\\n"
            "Content-Length: %zu\\r\\n"
            "\\r\\n"
            "%s", strlen(response_body), response_body);

        write(client_fd, response, response_len);
    }

    close(client_fd);
    return NULL;
}

int main() {
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);

    struct sockaddr_in server_addr;
    memset(&server_addr, 0, sizeof(server_addr));
    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = INADDR_ANY;
    server_addr.sin_port = htons(PORT);

    bind(server_fd, (struct sockaddr *)&server_addr, sizeof(server_addr));
    listen(server_fd, 10);

    printf("HTTP server listening on port %d\\n", PORT);

    while (1) {
        int *client_fd = malloc(sizeof(int));
        *client_fd = accept(server_fd, NULL, NULL);

        if (*client_fd >= 0) {
            pthread_t thread;
            pthread_create(&thread, NULL, handle_client, client_fd);
            pthread_detach(thread);  // Auto-cleanup
        } else {
            free(client_fd);
        }
    }

    close(server_fd);
    return 0;
}
\`\`\`

## FTP Client Implementation

### Basic FTP Client
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>

typedef struct {
    int control_fd;
    int data_fd;
    char response_buffer[1024];
} FtpConnection;

FtpConnection* ftp_connect(const char *hostname, int port) {
    FtpConnection *ftp = calloc(1, sizeof(FtpConnection));

    struct hostent *host = gethostbyname(hostname);
    if (!host) {
        free(ftp);
        return NULL;
    }

    ftp->control_fd = socket(AF_INET, SOCK_STREAM, 0);

    struct sockaddr_in server_addr;
    memset(&server_addr, 0, sizeof(server_addr));
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(port);
    memcpy(&server_addr.sin_addr, host->h_addr, host->h_length);

    if (connect(ftp->control_fd, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0) {
        close(ftp->control_fd);
        free(ftp);
        return NULL;
    }

    // Read welcome message
    ftp_read_response(ftp);
    return ftp;
}

char* ftp_read_response(FtpConnection *ftp) {
    ssize_t bytes_read = read(ftp->control_fd, ftp->response_buffer, sizeof(ftp->response_buffer) - 1);
    if (bytes_read > 0) {
        ftp->response_buffer[bytes_read] = '\\0';
        return ftp->response_buffer;
    }
    return NULL;
}

int ftp_send_command(FtpConnection *ftp, const char *command) {
    char cmd[1024];
    snprintf(cmd, sizeof(cmd), "%s\\r\\n", command);
    return write(ftp->control_fd, cmd, strlen(cmd));
}

int ftp_login(FtpConnection *ftp, const char *username, const char *password) {
    char cmd[256];

    // Send USER command
    snprintf(cmd, sizeof(cmd), "USER %s", username);
    ftp_send_command(ftp, cmd);
    ftp_read_response(ftp);

    // Send PASS command
    snprintf(cmd, sizeof(cmd), "PASS %s", password);
    ftp_send_command(ftp, cmd);
    ftp_read_response(ftp);

    return 1; // Simplified - should check response codes
}

int ftp_download_file(FtpConnection *ftp, const char *remote_file, const char *local_file) {
    // Enter passive mode
    ftp_send_command(ftp, "PASV");
    char *response = ftp_read_response(ftp);

    // Parse data port from response (simplified)
    int data_port = 20; // Should parse actual port from PASV response

    // Create data connection
    struct sockaddr_in data_addr;
    // ... setup data connection ...

    ftp->data_fd = socket(AF_INET, SOCK_STREAM, 0);
    connect(ftp->data_fd, (struct sockaddr *)&data_addr, sizeof(data_addr));

    // Send RETR command
    char cmd[256];
    snprintf(cmd, sizeof(cmd), "RETR %s", remote_file);
    ftp_send_command(ftp, cmd);
    ftp_read_response(ftp);

    // Read file data from data connection
    FILE *fp = fopen(local_file, "wb");
    char buffer[4096];
    ssize_t bytes_read;

    while ((bytes_read = read(ftp->data_fd, buffer, sizeof(buffer))) > 0) {
        fwrite(buffer, 1, bytes_read, fp);
    }

    fclose(fp);
    close(ftp->data_fd);
    ftp_read_response(ftp); // Read transfer complete response

    return 1;
}

void ftp_disconnect(FtpConnection *ftp) {
    ftp_send_command(ftp, "QUIT");
    ftp_read_response(ftp);
    close(ftp->control_fd);
    free(ftp);
}

// Usage
int main() {
    FtpConnection *ftp = ftp_connect("ftp.example.com", 21);
    if (ftp) {
        ftp_login(ftp, "username", "password");
        ftp_download_file(ftp, "remote_file.txt", "local_file.txt");
        ftp_disconnect(ftp);
    }
    return 0;
}
\`\`\`

## Email Client (SMTP)

### Simple SMTP Client
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <openssl/ssl.h>

typedef struct {
    int sockfd;
    SSL *ssl;
    char buffer[1024];
} SmtpConnection;

SmtpConnection* smtp_connect(const char *hostname, int port, int use_tls) {
    SmtpConnection *smtp = calloc(1, sizeof(SmtpConnection));

    struct hostent *host = gethostbyname(hostname);
    if (!host) {
        free(smtp);
        return NULL;
    }

    smtp->sockfd = socket(AF_INET, SOCK_STREAM, 0);

    struct sockaddr_in server_addr;
    memset(&server_addr, 0, sizeof(server_addr));
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(port);
    memcpy(&server_addr.sin_addr, host->h_addr, host->h_length);

    if (connect(smtp->sockfd, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0) {
        close(smtp->sockfd);
        free(smtp);
        return NULL;
    }

    // Read greeting
    smtp_read_response(smtp);

    if (use_tls) {
        // Start TLS
        smtp_send_command(smtp, "STARTTLS");
        smtp_read_response(smtp);

        // Initialize SSL
        SSL_library_init();
        SSL_CTX *ctx = SSL_CTX_new(TLS_client_method());
        smtp->ssl = SSL_new(ctx);
        SSL_set_fd(smtp->ssl, smtp->sockfd);
        SSL_connect(smtp->ssl);
        SSL_CTX_free(ctx);
    }

    return smtp;
}

char* smtp_read_response(SmtpConnection *smtp) {
    ssize_t bytes_read;
    if (smtp->ssl) {
        bytes_read = SSL_read(smtp->ssl, smtp->buffer, sizeof(smtp->buffer) - 1);
    } else {
        bytes_read = read(smtp->sockfd, smtp->buffer, sizeof(smtp->buffer) - 1);
    }

    if (bytes_read > 0) {
        smtp->buffer[bytes_read] = '\\0';
        return smtp->buffer;
    }
    return NULL;
}

void smtp_send_command(SmtpConnection *smtp, const char *command) {
    char cmd[1024];
    snprintf(cmd, sizeof(cmd), "%s\\r\\n", command);

    if (smtp->ssl) {
        SSL_write(smtp->ssl, cmd, strlen(cmd));
    } else {
        write(smtp->sockfd, cmd, strlen(cmd));
    }
}

void smtp_send_email(SmtpConnection *smtp, const char *from, const char *to, const char *subject, const char *body) {
    char cmd[512];

    // EHLO
    snprintf(cmd, sizeof(cmd), "EHLO localhost");
    smtp_send_command(smtp, cmd);
    smtp_read_response(smtp);

    // MAIL FROM
    snprintf(cmd, sizeof(cmd), "MAIL FROM:<%s>", from);
    smtp_send_command(smtp, cmd);
    smtp_read_response(smtp);

    // RCPT TO
    snprintf(cmd, sizeof(cmd), "RCPT TO:<%s>", to);
    smtp_send_command(smtp, cmd);
    smtp_read_response(smtp);

    // DATA
    smtp_send_command(smtp, "DATA");
    smtp_read_response(smtp);

    // Send email content
    char email[4096];
    snprintf(email, sizeof(email),
             "From: %s\\r\\n"
             "To: %s\\r\\n"
             "Subject: %s\\r\\n"
             "\\r\\n"
             "%s\\r\\n"
             ".", from, to, subject, body);

    if (smtp->ssl) {
        SSL_write(smtp->ssl, email, strlen(email));
    } else {
        write(smtp->sockfd, email, strlen(email));
    }

    smtp_read_response(smtp);

    // QUIT
    smtp_send_command(smtp, "QUIT");
    smtp_read_response(smtp);
}

void smtp_close(SmtpConnection *smtp) {
    if (smtp->ssl) {
        SSL_shutdown(smtp->ssl);
        SSL_free(smtp->ssl);
    }
    close(smtp->sockfd);
    free(smtp);
}

// Usage
int main() {
    SmtpConnection *smtp = smtp_connect("smtp.gmail.com", 587, 1);
    if (smtp) {
        smtp_send_email(smtp, "sender@example.com", "recipient@example.com",
                       "Test Email", "This is a test email sent from C!");
        smtp_close(smtp);
    }
    return 0;
}
\`\`\`

## DNS Resolver

### Simple DNS Query Tool
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

// DNS Header structure
typedef struct {
    uint16_t id;
    uint16_t flags;
    uint16_t qdcount;
    uint16_t ancount;
    uint16_t nscount;
    uint16_t arcount;
} DnsHeader;

// DNS Question structure
typedef struct {
    uint16_t qtype;
    uint16_t qclass;
} DnsQuestion;

// DNS Resource Record structure (simplified)
typedef struct {
    uint16_t type;
    uint16_t class;
    uint32_t ttl;
    uint16_t rdlength;
} DnsRR;

uint16_t generate_dns_id() {
    return rand() % 65536;
}

void encode_dns_name(char *dns_name, const char *hostname) {
    char *dst = dns_name;
    const char *src = hostname;

    while (*src) {
        char *len_pos = dst++;
        char *start = dst;

        while (*src && *src != '.') {
            *dst++ = *src++;
        }

        *len_pos = dst - start;

        if (*src) src++; // Skip dot
    }

    *dst = 0; // Null terminator
}

char* decode_dns_name(char *packet, char *name_ptr, char *result, size_t max_len) {
    char *result_ptr = result;
    size_t result_len = 0;

    while (*name_ptr && result_len < max_len - 1) {
        if ((*name_ptr & 0xC0) == 0xC0) {
            // Compression pointer
            uint16_t offset = ((*name_ptr & 0x3F) << 8) | *(name_ptr + 1);
            name_ptr = packet + offset;
            continue;
        }

        uint8_t label_len = *name_ptr++;
        if (label_len == 0) break;

        if (result_len > 0) {
            *result_ptr++ = '.';
            result_len++;
        }

        memcpy(result_ptr, name_ptr, label_len);
        result_ptr += label_len;
        result_len += label_len;
        name_ptr += label_len;
    }

    *result_ptr = '\\0';
    return result;
}

char* resolve_domain(const char *domain, const char *dns_server) {
    int sockfd = socket(AF_INET, SOCK_DGRAM, 0);

    struct sockaddr_in server_addr;
    memset(&server_addr, 0, sizeof(server_addr));
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(53);
    inet_pton(AF_INET, dns_server, &server_addr.sin_addr);

    // Build DNS query
    char query[512] = {0};
    DnsHeader *header = (DnsHeader *)query;
    header->id = htons(generate_dns_id());
    header->flags = htons(0x0100); // Standard query, recursion desired
    header->qdcount = htons(1);

    // Encode domain name
    char *qname = query + sizeof(DnsHeader);
    encode_dns_name(qname, domain);

    // Add question
    char *question_ptr = qname + strlen(qname) + 1;
    DnsQuestion *question = (DnsQuestion *)question_ptr;
    question->qtype = htons(1);   // A record
    question->qclass = htons(1);  // IN class

    size_t query_len = question_ptr - query + sizeof(DnsQuestion);

    // Send query
    sendto(sockfd, query, query_len, 0, (struct sockaddr *)&server_addr, sizeof(server_addr));

    // Receive response
    char response[512];
    socklen_t addr_len = sizeof(server_addr);
    ssize_t response_len = recvfrom(sockfd, response, sizeof(response), 0,
                                   (struct sockaddr *)&server_addr, &addr_len);

    close(sockfd);

    if (response_len < sizeof(DnsHeader)) {
        return NULL;
    }

    // Parse response
    DnsHeader *resp_header = (DnsHeader *)response;
    if (ntohs(resp_header->ancount) == 0) {
        return NULL; // No answers
    }

    // Skip question section (simplified)
    char *answer_ptr = response + sizeof(DnsHeader);
    char name[256];
    decode_dns_name(response, answer_ptr, name, sizeof(name));

    // Skip name and find A record
    answer_ptr += strlen(answer_ptr) + 1 + sizeof(DnsQuestion);

    for (int i = 0; i < ntohs(resp_header->ancount); i++) {
        DnsRR *rr = (DnsRR *)answer_ptr;

        if (ntohs(rr->type) == 1) { // A record
            uint32_t ip_addr = *(uint32_t *)(answer_ptr + sizeof(DnsRR));
            struct in_addr addr;
            addr.s_addr = ip_addr;

            char *result = malloc(INET_ADDRSTRLEN);
            inet_ntop(AF_INET, &addr, result, INET_ADDRSTRLEN);
            return result;
        }

        answer_ptr += sizeof(DnsRR) + ntohs(rr->rdlength);
    }

    return NULL;
}

// Usage
int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Usage: %s <domain>\\n", argv[0]);
        return 1;
    }

    char *ip = resolve_domain(argv[1], "8.8.8.8");
    if (ip) {
        printf("%s -> %s\\n", argv[1], ip);
        free(ip);
    } else {
        printf("Failed to resolve %s\\n", argv[1]);
    }

    return 0;
}
\`\`\`

## Chat Application

### Simple TCP Chat Server
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <pthread.h>

#define PORT 8888
#define MAX_CLIENTS 10
#define BUFFER_SIZE 1024

typedef struct {
    int socket_fd;
    char username[32];
} ClientInfo;

ClientInfo clients[MAX_CLIENTS];
pthread_mutex_t clients_mutex = PTHREAD_MUTEX_INITIALIZER;

void broadcast_message(char *message, int sender_fd) {
    pthread_mutex_lock(&clients_mutex);

    for (int i = 0; i < MAX_CLIENTS; i++) {
        if (clients[i].socket_fd != 0 && clients[i].socket_fd != sender_fd) {
            send(clients[i].socket_fd, message, strlen(message), 0);
        }
    }

    pthread_mutex_unlock(&clients_mutex);
}

void *handle_client(void *arg) {
    int client_fd = *(int *)arg;
    free(arg);

    char buffer[BUFFER_SIZE];
    char username[32] = "Anonymous";

    // Add client to list
    pthread_mutex_lock(&clients_mutex);
    for (int i = 0; i < MAX_CLIENTS; i++) {
        if (clients[i].socket_fd == 0) {
            clients[i].socket_fd = client_fd;
            strcpy(clients[i].username, username);
            break;
        }
    }
    pthread_mutex_unlock(&clients_mutex);

    // Notify others
    char join_msg[128];
    snprintf(join_msg, sizeof(join_msg), "%s joined the chat\\n", username);
    broadcast_message(join_msg, client_fd);

    while (1) {
        ssize_t bytes_read = recv(client_fd, buffer, sizeof(buffer) - 1, 0);

        if (bytes_read <= 0) {
            break;
        }

        buffer[bytes_read] = '\\0';

        // Format message
        char message[BUFFER_SIZE + 64];
        snprintf(message, sizeof(message), "%s: %s", username, buffer);

        // Broadcast to all clients
        broadcast_message(message, client_fd);
    }

    // Remove client
    pthread_mutex_lock(&clients_mutex);
    for (int i = 0; i < MAX_CLIENTS; i++) {
        if (clients[i].socket_fd == client_fd) {
            clients[i].socket_fd = 0;
            break;
        }
    }
    pthread_mutex_unlock(&clients_mutex);

    // Notify others
    char leave_msg[128];
    snprintf(leave_msg, sizeof(leave_msg), "%s left the chat\\n", username);
    broadcast_message(leave_msg, 0);

    close(client_fd);
    return NULL;
}

int main() {
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);

    struct sockaddr_in server_addr;
    memset(&server_addr, 0, sizeof(server_addr));
    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = INADDR_ANY;
    server_addr.sin_port = htons(PORT);

    bind(server_fd, (struct sockaddr *)&server_addr, sizeof(server_addr));
    listen(server_fd, 5);

    printf("Chat server started on port %d\\n", PORT);

    while (1) {
        int *client_fd = malloc(sizeof(int));
        *client_fd = accept(server_fd, NULL, NULL);

        if (*client_fd >= 0) {
            pthread_t thread;
            pthread_create(&thread, NULL, handle_client, client_fd);
            pthread_detach(thread);
        } else {
            free(client_fd);
        }
    }

    close(server_fd);
    return 0;
}
\`\`\`

Network application development involves understanding various protocols and implementing robust client-server communication. The examples above demonstrate fundamental concepts that can be extended to build more complex network applications.`
};

