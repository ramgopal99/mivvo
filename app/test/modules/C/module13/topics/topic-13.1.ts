import { SubLesson } from '../../../../data/lessonsData';

export const topic_13_1: SubLesson = {
  id: '13.1',
  title: 'TCP/IP Network Programming Fundamentals',
  status: 'demo',
  content: `# TCP/IP Network Programming Fundamentals

## Network Architecture and Protocols

### OSI Model vs TCP/IP Model

| Layer | OSI Model | TCP/IP Model | Examples |
|-------|-----------|--------------|----------|
| 7 | Application | Application | HTTP, FTP, SMTP |
| 6 | Presentation | Application | ASCII, JPEG, MPEG |
| 5 | Session | Application | NetBIOS, RPC |
| 4 | Transport | Transport | TCP, UDP |
| 3 | Network | Internet | IP, ICMP, ARP |
| 2 | Data Link | Network Access | Ethernet, PPP |
| 1 | Physical | Network Access | Cables, WiFi |

### TCP/IP Protocol Suite

#### Internet Protocol (IP)
- **Connectionless**: No session establishment
- **Unreliable**: No guarantee of delivery
- **Best-effort delivery**: Packets may be lost, reordered, duplicated
- **IPv4 vs IPv6**: 32-bit vs 128-bit addressing

#### Transmission Control Protocol (TCP)
- **Connection-oriented**: Three-way handshake
- **Reliable**: Acknowledgment and retransmission
- **Ordered**: Sequence numbers ensure correct order
- **Full-duplex**: Simultaneous bidirectional communication

#### User Datagram Protocol (UDP)
- **Connectionless**: No handshake required
- **Unreliable**: No acknowledgments or retransmissions
- **No ordering**: Packets may arrive out of order
- **Lightweight**: Lower overhead than TCP

## Socket Programming Basics

### Socket Types
\`\`\`c
#include <sys/socket.h>

// Stream socket (TCP)
int tcp_socket = socket(AF_INET, SOCK_STREAM, 0);

// Datagram socket (UDP)
int udp_socket = socket(AF_INET, SOCK_DGRAM, 0);

// Raw socket (direct IP access)
int raw_socket = socket(AF_INET, SOCK_RAW, IPPROTO_ICMP);
\`\`\`

### Socket Address Structures

#### IPv4 Socket Address
\`\`\`c
struct sockaddr_in {
    sa_family_t    sin_family;  // AF_INET
    in_port_t      sin_port;    // Port number (network byte order)
    struct in_addr sin_addr;    // IPv4 address
    char           sin_zero[8]; // Padding
};

struct in_addr {
    uint32_t s_addr; // IPv4 address (network byte order)
};
\`\`\`

#### IPv6 Socket Address
\`\`\`c
struct sockaddr_in6 {
    sa_family_t     sin6_family;   // AF_INET6
    in_port_t       sin6_port;     // Port number
    uint32_t        sin6_flowinfo; // Flow control
    struct in6_addr sin6_addr;     // IPv6 address
    uint32_t        sin6_scope_id; // Interface index
};
\`\`\`

### Generic Socket Address
\`\`\`c
struct sockaddr {
    sa_family_t sa_family;    // Address family
    char        sa_data[14];  // Address data (implementation dependent)
};
\`\`\`

## Byte Order and Network Byte Order

### Host vs Network Byte Order
- **Host byte order**: Native processor endianness
- **Network byte order**: Big-endian (most significant byte first)

### Conversion Functions
\`\`\`c
#include <arpa/inet.h>

// 16-bit conversions
uint16_t htons(uint16_t hostshort);    // Host to network (short)
uint16_t ntohs(uint16_t netshort);     // Network to host (short)

// 32-bit conversions
uint32_t htonl(uint32_t hostlong);     // Host to network (long)
uint32_t ntohl(uint32_t netlong);      // Network to host (long)

// IPv4 address conversions
in_addr_t inet_addr(const char *cp);   // String to binary
char *inet_ntoa(struct in_addr in);    // Binary to string

// IPv4/IPv6 address conversions (recommended)
int inet_pton(int af, const char *src, void *dst);  // Presentation to network
const char *inet_ntop(int af, const void *src, char *dst, socklen_t size);
\`\`\`

### Usage Examples
\`\`\`c
// Setting up IPv4 address
struct sockaddr_in server_addr;
server_addr.sin_family = AF_INET;
server_addr.sin_port = htons(8080);  // Convert port to network byte order
inet_pton(AF_INET, "192.168.1.1", &server_addr.sin_addr);

// IPv6 example
struct sockaddr_in6 server_addr6;
server_addr6.sin6_family = AF_INET6;
server_addr6.sin6_port = htons(8080);
inet_pton(AF_INET6, "::1", &server_addr6.sin6_addr);
\`\`\`

## TCP Client-Server Communication

### TCP Server Workflow
1. **Create socket**: socket()
2. **Bind to address**: bind()
3. **Listen for connections**: listen()
4. **Accept connections**: accept()
5. **Communicate**: read()/write() or recv()/send()
6. **Close connection**: close()

### TCP Client Workflow
1. **Create socket**: socket()
2. **Connect to server**: connect()
3. **Communicate**: read()/write() or recv()/send()
4. **Close connection**: close()

## Socket Options

### Setting Socket Options
\`\`\`c
#include <sys/socket.h>

int sockfd = socket(AF_INET, SOCK_STREAM, 0);

// Reuse address (prevent "Address already in use")
int opt = 1;
setsockopt(sockfd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

// Set send/receive buffer sizes
int buffer_size = 65536;
setsockopt(sockfd, SOL_SOCKET, SO_SNDBUF, &buffer_size, sizeof(buffer_size));
setsockopt(sockfd, SOL_SOCKET, SO_RCVBUF, &buffer_size, sizeof(buffer_size));

// Set timeouts
struct timeval timeout;
timeout.tv_sec = 5;
timeout.tv_usec = 0;
setsockopt(sockfd, SOL_SOCKET, SO_RCVTIMEO, &timeout, sizeof(timeout));
setsockopt(sockfd, SOL_SOCKET, SO_SNDTIMEO, &timeout, sizeof(timeout));
\`\`\`

### TCP-specific Options
\`\`\`c
// Disable Nagle's algorithm (send immediately)
int flag = 1;
setsockopt(sockfd, IPPROTO_TCP, TCP_NODELAY, &flag, sizeof(flag));

// Set keep-alive
int keepalive = 1;
setsockopt(sockfd, SOL_SOCKET, SO_KEEPALIVE, &keepalive, sizeof(keepalive));

// Set TCP keep-alive parameters
int keepidle = 60;  // Start keep-alive after 60 seconds
int keepintvl = 10; // Send keep-alive every 10 seconds
int keepcnt = 3;    // Send 3 keep-alive packets

setsockopt(sockfd, IPPROTO_TCP, TCP_KEEPIDLE, &keepidle, sizeof(keepidle));
setsockopt(sockfd, IPPROTO_TCP, TCP_KEEPINTVL, &keepintvl, sizeof(keepintvl));
setsockopt(sockfd, IPPROTO_TCP, TCP_KEEPCNT, &keepcnt, sizeof(keepcnt));
\`\`\`

## Error Handling

### Socket Error Codes
- **ECONNREFUSED**: Connection refused (server not running)
- **ETIMEDOUT**: Connection timed out
- **EHOSTUNREACH**: Host unreachable
- **ENETUNREACH**: Network unreachable
- **ECONNRESET**: Connection reset by peer

### Robust Error Handling
\`\`\`c
int create_tcp_socket() {
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (sockfd < 0) {
        perror("socket creation failed");
        return -1;
    }

    // Set socket options
    int opt = 1;
    if (setsockopt(sockfd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt)) < 0) {
        perror("setsockopt failed");
        close(sockfd);
        return -1;
    }

    return sockfd;
}

int connect_with_timeout(int sockfd, struct sockaddr *addr, socklen_t addrlen, int timeout_sec) {
    // Set non-blocking mode
    int flags = fcntl(sockfd, F_GETFL, 0);
    fcntl(sockfd, F_SETFL, flags | O_NONBLOCK);

    int result = connect(sockfd, addr, addrlen);

    if (result < 0) {
        if (errno == EINPROGRESS) {
            // Connection in progress, wait for completion
            fd_set write_fds;
            FD_ZERO(&write_fds);
            FD_SET(sockfd, &write_fds);

            struct timeval timeout;
            timeout.tv_sec = timeout_sec;
            timeout.tv_usec = 0;

            result = select(sockfd + 1, NULL, &write_fds, NULL, &timeout);

            if (result > 0) {
                // Check if connection was successful
                int error;
                socklen_t len = sizeof(error);
                getsockopt(sockfd, SOL_SOCKET, SO_ERROR, &error, &len);

                if (error != 0) {
                    errno = error;
                    result = -1;
                }
            }
        }
    }

    // Restore blocking mode
    fcntl(sockfd, F_SETFL, flags);

    return result;
}
\`\`\`

## Hostname Resolution

### getaddrinfo() Function
\`\`\`c
#include <netdb.h>
#include <sys/socket.h>

int getaddrinfo(const char *node,     // Hostname or IP
                const char *service,  // Port or service name
                const struct addrinfo *hints,    // Input hints
                struct addrinfo **res);          // Output linked list

void freeaddrinfo(struct addrinfo *res);

// Example usage
struct addrinfo hints, *result, *rp;
memset(&hints, 0, sizeof(hints));
hints.ai_family = AF_INET;      // IPv4
hints.ai_socktype = SOCK_STREAM; // TCP
hints.ai_flags = AI_NUMERICHOST; // Numeric host only

int status = getaddrinfo("www.example.com", "80", &hints, &result);
if (status != 0) {
    fprintf(stderr, "getaddrinfo: %s\\n", gai_strerror(status));
    return 1;
}

// Iterate through results
for (rp = result; rp != NULL; rp = rp->ai_next) {
    // Use rp->ai_addr for connection
}

freeaddrinfo(result);
\`\`\`

### getnameinfo() Function (Reverse DNS)
\`\`\`c
int getnameinfo(const struct sockaddr *sa, socklen_t salen,
                char *host, size_t hostlen,
                char *serv, size_t servlen, int flags);

// Example
char host[NI_MAXHOST], service[NI_MAXSERV];
getnameinfo((struct sockaddr *)&client_addr, addr_len,
            host, sizeof(host), service, sizeof(service),
            NI_NUMERICHOST | NI_NUMERICSERV);
printf("Connection from %s:%s\\n", host, service);
\`\`\`

## Network Programming Best Practices

### Robust Server Design
1. **Handle multiple clients**: Use select(), poll(), or threads
2. **Graceful shutdown**: Handle SIGTERM/SIGINT signals
3. **Resource limits**: Set appropriate limits on connections
4. **Logging**: Log connection attempts and errors
5. **Security**: Validate input, avoid buffer overflows

### Performance Optimization
1. **Buffer sizes**: Optimize send/receive buffer sizes
2. **Nagle's algorithm**: Disable for real-time applications
3. **Connection pooling**: Reuse connections when possible
4. **Asynchronous I/O**: Use non-blocking I/O for scalability

### Security Considerations
1. **Input validation**: Never trust client input
2. **Buffer overflow protection**: Use safe string functions
3. **Access control**: Implement proper authentication/authorization
4. **Encryption**: Use SSL/TLS for sensitive data
5. **Resource exhaustion**: Prevent DoS attacks

### Cross-Platform Compatibility
- Use **POSIX sockets** for maximum portability
- Handle endianness differences properly
- Be aware of different behavior on Windows vs Unix-like systems
- Use conditional compilation for platform-specific code`
};

