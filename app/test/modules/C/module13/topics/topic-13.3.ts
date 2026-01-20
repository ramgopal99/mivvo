import { SubLesson } from '../../../../data/lessonsData';

export const topic_13_3: SubLesson = {
  id: '13.3',
  title: 'Advanced Network Programming Techniques',
  status: 'demo',
  content: `# Advanced Network Programming Techniques

## I/O Multiplexing

### select() System Call
\`\`\`c
#include <sys/select.h>

int select(int nfds, fd_set *readfds, fd_set *writefds,
           fd_set *exceptfds, struct timeval *timeout);

// Usage example
fd_set read_fds;
FD_ZERO(&read_fds);
FD_SET(sockfd1, &read_fds);
FD_SET(sockfd2, &read_fds);

struct timeval timeout = {5, 0}; // 5 seconds

int ready = select(FD_SETSIZE, &read_fds, NULL, NULL, &timeout);

if (ready > 0) {
    if (FD_ISSET(sockfd1, &read_fds)) {
        // Handle sockfd1
    }
    if (FD_ISSET(sockfd2, &read_fds)) {
        // Handle sockfd2
    }
} else if (ready == 0) {
    printf("Timeout\\n");
}
\`\`\`

### poll() System Call
\`\`\`c
#include <poll.h>

struct pollfd {
    int fd;         // File descriptor
    short events;   // Requested events
    short revents;  // Returned events
};

// Events flags
// POLLIN: Data available to read
// POLLOUT: Writing possible
// POLLERR: Error condition
// POLLHUP: Hang up
// POLLNVAL: Invalid request

// Usage
struct pollfd fds[2];
fds[0].fd = sockfd1;
fds[0].events = POLLIN;
fds[1].fd = sockfd2;
fds[1].events = POLLIN;

int timeout = 5000; // 5 seconds
int ready = poll(fds, 2, timeout);

if (ready > 0) {
    if (fds[0].revents & POLLIN) {
        // Handle sockfd1
    }
    if (fds[1].revents & POLLIN) {
        // Handle sockfd2
    }
}
\`\`\`

### epoll() (Linux-specific)
\`\`\`c
#include <sys/epoll.h>

int epfd = epoll_create1(0);

struct epoll_event event;
event.events = EPOLLIN;
event.data.fd = sockfd;

epoll_ctl(epfd, EPOLL_CTL_ADD, sockfd, &event);

// Wait for events
struct epoll_event events[10];
int nfds = epoll_wait(epfd, events, 10, timeout);

for (int i = 0; i < nfds; i++) {
    if (events[i].events & EPOLLIN) {
        // Handle readable socket
    }
}
\`\`\`

## Asynchronous I/O

### POSIX AIO
\`\`\`c
#include <aio.h>

struct aiocb aio_cb;
memset(&aio_cb, 0, sizeof(struct aiocb));

aio_cb.aio_fildes = sockfd;
aio_cb.aio_buf = buffer;
aio_cb.aio_nbytes = BUFFER_SIZE;
aio_cb.aio_offset = 0;

// Submit read request
aio_read(&aio_cb);

// Check completion
while (aio_error(&aio_cb) == EINPROGRESS) {
    // Do other work
}

// Get result
int bytes_read = aio_return(&aio_cb);
\`\`\`

### Signal-driven I/O
\`\`\`c
#include <signal.h>

// Set up signal handler
void sigio_handler(int sig) {
    // Handle I/O event
}

signal(SIGIO, sigio_handler);

// Enable asynchronous I/O
fcntl(sockfd, F_SETOWN, getpid());
int flags = fcntl(sockfd, F_GETFL);
fcntl(sockfd, F_SETFL, flags | O_ASYNC | O_NONBLOCK);
\`\`\`

## Zero-Copy Techniques

### sendfile() System Call
\`\`\`c
#include <sys/sendfile.h>

// Transfer file directly from disk to network
int in_fd = open("large_file.dat", O_RDONLY);
struct stat stat_buf;
fstat(in_fd, &stat_buf);

off_t offset = 0;
size_t bytes_sent = sendfile(out_fd, in_fd, &offset, stat_buf.st_size);
\`\`\`

### Memory-mapped File Transfer
\`\`\`c
// Map file to memory
int fd = open("file.dat", O_RDONLY);
struct stat sb;
fstat(fd, &sb);

char *file_data = mmap(NULL, sb.st_size, PROT_READ, MAP_PRIVATE, fd, 0);

// Send directly from mapped memory
send(sockfd, file_data, sb.st_size, 0);

// Cleanup
munmap(file_data, sb.st_size);
close(fd);
\`\`\`

## Connection Pooling

### TCP Connection Pool Implementation
\`\`\`c
typedef struct {
    int socket_fd;
    time_t last_used;
    bool in_use;
} Connection;

typedef struct {
    Connection *connections;
    int pool_size;
    int used_count;
    pthread_mutex_t mutex;
    struct sockaddr_in server_addr;
} ConnectionPool;

ConnectionPool* connection_pool_create(const char *host, int port, int pool_size) {
    ConnectionPool *pool = malloc(sizeof(ConnectionPool));
    pool->connections = malloc(sizeof(Connection) * pool_size);
    pool->pool_size = pool_size;
    pool->used_count = 0;
    pthread_mutex_init(&pool->mutex, NULL);

    // Server address setup
    memset(&pool->server_addr, 0, sizeof(pool->server_addr));
    pool->server_addr.sin_family = AF_INET;
    pool->server_addr.sin_port = htons(port);
    inet_pton(AF_INET, host, &pool->server_addr.sin_addr);

    // Initialize connections
    for (int i = 0; i < pool_size; i++) {
        pool->connections[i].socket_fd = -1;
        pool->connections[i].in_use = false;
    }

    return pool;
}

int connection_pool_get(ConnectionPool *pool) {
    pthread_mutex_lock(&pool->mutex);

    // Find available connection
    for (int i = 0; i < pool->pool_size; i++) {
        if (!pool->connections[i].in_use) {
            if (pool->connections[i].socket_fd == -1) {
                // Create new connection
                int sock = socket(AF_INET, SOCK_STREAM, 0);
                if (connect(sock, (struct sockaddr *)&pool->server_addr,
                           sizeof(pool->server_addr)) == 0) {
                    pool->connections[i].socket_fd = sock;
                } else {
                    close(sock);
                    pthread_mutex_unlock(&pool->mutex);
                    return -1;
                }
            }

            pool->connections[i].in_use = true;
            pool->connections[i].last_used = time(NULL);
            pool->used_count++;

            pthread_mutex_unlock(&pool->mutex);
            return pool->connections[i].socket_fd;
        }
    }

    pthread_mutex_unlock(&pool->mutex);
    return -1; // No available connections
}

void connection_pool_release(ConnectionPool *pool, int sockfd) {
    pthread_mutex_lock(&pool->mutex);

    for (int i = 0; i < pool->pool_size; i++) {
        if (pool->connections[i].socket_fd == sockfd) {
            pool->connections[i].in_use = false;
            pool->used_count--;
            break;
        }
    }

    pthread_mutex_unlock(&pool->mutex);
}
\`\`\`

## SSL/TLS Secure Communication

### OpenSSL Integration
\`\`\`c
#include <openssl/ssl.h>
#include <openssl/err.h>

// Initialize OpenSSL
SSL_library_init();
OpenSSL_add_all_algorithms();
SSL_load_error_strings();

// Create SSL context
SSL_CTX *ctx = SSL_CTX_new(TLS_client_method());

// Load certificates
SSL_CTX_use_certificate_file(ctx, "client.crt", SSL_FILETYPE_PEM);
SSL_CTX_use_PrivateKey_file(ctx, "client.key", SSL_FILETYPE_PEM);

// Create SSL connection
SSL *ssl = SSL_new(ctx);
SSL_set_fd(ssl, sockfd);

// Perform SSL handshake
if (SSL_connect(ssl) != 1) {
    ERR_print_errors_fp(stderr);
    return 1;
}

// Send/receive encrypted data
SSL_write(ssl, message, strlen(message));
SSL_read(ssl, buffer, sizeof(buffer));

// Cleanup
SSL_shutdown(ssl);
SSL_free(ssl);
SSL_CTX_free(ctx);
\`\`\`

## Network Packet Analysis

### Raw Socket Packet Capture
\`\`\`c
#include <netinet/ip.h>
#include <netinet/tcp.h>
#include <netinet/udp.h>

// Create raw socket
int raw_sock = socket(AF_INET, SOCK_RAW, IPPROTO_TCP);

// Bind to interface (optional)
setsockopt(raw_sock, SOL_SOCKET, SO_BINDTODEVICE, "eth0", strlen("eth0"));

// Receive packets
while (1) {
    char buffer[65536];
    struct sockaddr_in from_addr;
    socklen_t addr_len = sizeof(from_addr);

    int packet_len = recvfrom(raw_sock, buffer, sizeof(buffer), 0,
                            (struct sockaddr *)&from_addr, &addr_len);

    if (packet_len > 0) {
        // Parse IP header
        struct iphdr *ip_header = (struct iphdr *)buffer;

        printf("Source IP: %s\\n", inet_ntoa(*(struct in_addr *)&ip_header->saddr));
        printf("Dest IP: %s\\n", inet_ntoa(*(struct in_addr *)&ip_header->daddr));
        printf("Protocol: %d\\n", ip_header->protocol);

        // Parse TCP/UDP headers based on protocol
        if (ip_header->protocol == IPPROTO_TCP) {
            struct tcphdr *tcp_header = (struct tcphdr *)(buffer + ip_header->ihl * 4);
            printf("Source Port: %d\\n", ntohs(tcp_header->source));
            printf("Dest Port: %d\\n", ntohs(tcp_header->dest));
        }
    }
}
\`\`\`

## High-Performance Server Architectures

### Event-Driven Architecture
\`\`\`c
typedef struct {
    int fd;
    void (*read_handler)(int fd, void *data);
    void (*write_handler)(int fd, void *data);
    void *data;
} EventHandler;

typedef struct {
    EventHandler *handlers;
    int max_handlers;
    int num_handlers;
} EventLoop;

void event_loop_add_handler(EventLoop *loop, int fd,
                           void (*read_handler)(int fd, void *data),
                           void (*write_handler)(int fd, void *data),
                           void *data) {
    loop->handlers[loop->num_handlers].fd = fd;
    loop->handlers[loop->num_handlers].read_handler = read_handler;
    loop->handlers[loop->num_handlers].write_handler = write_handler;
    loop->handlers[loop->num_handlers].data = data;
    loop->num_handlers++;
}

void event_loop_run(EventLoop *loop) {
    while (1) {
        fd_set read_fds, write_fds;
        FD_ZERO(&read_fds);
        FD_ZERO(&write_fds);

        int max_fd = 0;
        for (int i = 0; i < loop->num_handlers; i++) {
            FD_SET(loop->handlers[i].fd, &read_fds);
            if (loop->handlers[i].write_handler) {
                FD_SET(loop->handlers[i].fd, &write_fds);
            }
            if (loop->handlers[i].fd > max_fd) {
                max_fd = loop->handlers[i].fd;
            }
        }

        int ready = select(max_fd + 1, &read_fds, &write_fds, NULL, NULL);

        for (int i = 0; i < loop->num_handlers; i++) {
            int fd = loop->handlers[i].fd;
            if (FD_ISSET(fd, &read_fds) && loop->handlers[i].read_handler) {
                loop->handlers[i].read_handler(fd, loop->handlers[i].data);
            }
            if (FD_ISSET(fd, &write_fds) && loop->handlers[i].write_handler) {
                loop->handlers[i].write_handler(fd, loop->handlers[i].data);
            }
        }
    }
}
\`\`\`

### Thread Pool Server
\`\`\`c
typedef struct {
    int client_socket;
    struct sockaddr_in client_addr;
} ClientRequest;

void *worker_thread(void *arg) {
    ThreadPool *pool = (ThreadPool *)arg;

    while (1) {
        ClientRequest *request = threadpool_get_work(pool);

        // Handle client request
        handle_client(request->client_socket, &request->client_addr);

        close(request->client_socket);
        free(request);
    }

    return NULL;
}

int main() {
    // Create listening socket
    int server_fd = create_tcp_server("127.0.0.1", 8080);

    // Create thread pool
    ThreadPool *pool = threadpool_create(10);

    while (1) {
        struct sockaddr_in client_addr;
        socklen_t addr_len = sizeof(client_addr);

        int client_fd = accept(server_fd, (struct sockaddr *)&client_addr, &addr_len);

        if (client_fd >= 0) {
            ClientRequest *request = malloc(sizeof(ClientRequest));
            request->client_socket = client_fd;
            request->client_addr = client_addr;

            threadpool_add_work(pool, request);
        }
    }

    return 0;
}
\`\`\`

## Network Protocol Implementation

### HTTP/1.1 Client
\`\`\`c
typedef struct {
    int socket_fd;
    char *host;
    int port;
} HttpClient;

HttpClient* http_client_create(const char *host, int port) {
    HttpClient *client = malloc(sizeof(HttpClient));
    client->host = strdup(host);
    client->port = port;

    // Create and connect socket
    client->socket_fd = create_tcp_connection(host, port);

    return client;
}

char* http_get(HttpClient *client, const char *path) {
    // Send HTTP request
    char request[1024];
    snprintf(request, sizeof(request),
             "GET %s HTTP/1.1\\r\\n"
             "Host: %s\\r\\n"
             "Connection: close\\r\\n\\r\\n",
             path, client->host);

    send(client->socket_fd, request, strlen(request), 0);

    // Receive response
    char *response = malloc(65536);
    int total_received = 0;

    while (1) {
        int bytes = recv(client->socket_fd,
                        response + total_received,
                        65536 - total_received, 0);

        if (bytes <= 0) break;
        total_received += bytes;
    }

    response[total_received] = '\\0';
    return response;
}
\`\`\`

### Simple DNS Resolver
\`\`\`c
typedef struct {
    uint16_t id;
    uint16_t flags;
    uint16_t qdcount;
    uint16_t ancount;
    uint16_t nscount;
    uint16_t arcount;
} DnsHeader;

typedef struct {
    uint16_t qtype;
    uint16_t qclass;
} DnsQuestion;

char* resolve_hostname(const char *hostname) {
    int sockfd = socket(AF_INET, SOCK_DGRAM, 0);

    // DNS server (Google Public DNS)
    struct sockaddr_in dns_server;
    dns_server.sin_family = AF_INET;
    dns_server.sin_port = htons(53);
    inet_pton(AF_INET, "8.8.8.8", &dns_server.sin_addr);

    // Build DNS query
    char query[512] = {0};
    DnsHeader *header = (DnsHeader *)query;
    header->id = htons(12345);
    header->flags = htons(0x0100);  // Standard query
    header->qdcount = htons(1);

    // Encode hostname
    char *qname = query + sizeof(DnsHeader);
    const char *src = hostname;
    char *dst = qname;

    while (*src) {
        char *len_pos = dst++;
        char *start = dst;
        while (*src && *src != '.') {
            *dst++ = *src++;
        }
        *len_pos = dst - start;
        if (*src) src++;  // Skip dot
    }
    *dst++ = 0;  // Null terminator

    // Add question
    DnsQuestion *question = (DnsQuestion *)dst;
    question->qtype = htons(1);   // A record
    question->qclass = htons(1);  // IN class

    // Send query
    int query_len = dst - query + sizeof(DnsQuestion);
    sendto(sockfd, query, query_len, 0,
           (struct sockaddr *)&dns_server, sizeof(dns_server));

    // Receive response
    char response[512];
    recvfrom(sockfd, response, sizeof(response), 0, NULL, NULL);

    close(sockfd);

    // Parse response (simplified)
    // Return first A record IP address
    return parse_dns_response(response);
}
\`\`\`

## Performance Monitoring

### Network Statistics Collection
\`\`\`c
#include <sys/ioctl.h>
#include <net/if.h>
#include <linux/if_link.h>

void get_network_stats(const char *interface) {
    struct ifaddrs *ifaddr, *ifa;
    getifaddrs(&ifaddr);

    for (ifa = ifaddr; ifa != NULL; ifa = ifa->ifa_next) {
        if (ifa->ifa_addr == NULL) continue;
        if (strcmp(ifa->ifa_name, interface) != 0) continue;

        if (ifa->ifa_addr->sa_family == AF_INET) {
            // IPv4 stats
            struct rtnl_link_stats *stats = ifa->ifa_data;
            printf("RX bytes: %lu\\n", stats->rx_bytes);
            printf("TX bytes: %lu\\n", stats->tx_bytes);
            printf("RX packets: %lu\\n", stats->rx_packets);
            printf("TX packets: %lu\\n", stats->tx_packets);
        }
    }

    freeifaddrs(ifaddr);
}
\`\`\`

### Socket Performance Monitoring
\`\`\`c
void monitor_socket_performance(int sockfd) {
    // Get socket buffer sizes
    int send_buf, recv_buf;
    socklen_t len = sizeof(int);

    getsockopt(sockfd, SOL_SOCKET, SO_SNDBUF, &send_buf, &len);
    getsockopt(sockfd, SOL_SOCKET, SO_RCVBUF, &recv_buf, &len);

    printf("Send buffer: %d bytes\\n", send_buf);
    printf("Receive buffer: %d bytes\\n", recv_buf);

    // Monitor TCP metrics (Linux specific)
    struct tcp_info tcp_info;
    len = sizeof(tcp_info);
    getsockopt(sockfd, IPPROTO_TCP, TCP_INFO, &tcp_info, &len);

    printf("RTT: %u ms\\n", tcp_info.tcpi_rtt / 1000);
    printf("Retransmits: %u\\n", tcp_info.tcpi_total_retrans);
}
\`\`\`

Advanced network programming techniques involve understanding low-level socket operations, implementing efficient I/O multiplexing, and building scalable server architectures. These concepts are essential for developing high-performance network applications that can handle thousands of concurrent connections efficiently.`
};

