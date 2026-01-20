import { SubLesson } from '../../../../data/lessonsData';

export const topic_13_2: SubLesson = {
  id: '13.2',
  title: 'UDP Programming and Datagram Sockets',
  status: 'demo',
  content: `# UDP Programming and Datagram Sockets

## UDP vs TCP Comparison

### TCP Characteristics
- **Connection-oriented**: Three-way handshake required
- **Reliable**: Guaranteed delivery with acknowledgments
- **Ordered**: Data arrives in sent order
- **Full-duplex**: Bidirectional communication
- **Congestion control**: Built-in flow control
- **Overhead**: Higher protocol overhead

### UDP Characteristics
- **Connectionless**: No handshake required
- **Unreliable**: No delivery guarantees
- **Unordered**: Packets may arrive out of order
- **Lightweight**: Minimal protocol overhead
- **Broadcast/Multicast**: Supports group communication
- **Speed**: Lower latency than TCP

### When to Use UDP
- **Real-time applications**: VoIP, gaming, video streaming
- **Broadcast/multicast**: Network discovery, streaming media
- **Custom reliability**: Applications implementing their own reliability
- **Low-latency requirements**: DNS queries, SNMP, DHCP
- **Small messages**: TFTP, NTP, RIP

## UDP Socket Programming

### Creating UDP Sockets
\`\`\`c
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

// Create UDP socket
int udp_socket = socket(AF_INET, SOCK_DGRAM, 0);
if (udp_socket < 0) {
    perror("socket creation failed");
    return 1;
}
\`\`\`

### UDP Server Implementation
\`\`\`c
#define BUFFER_SIZE 1024
#define PORT 8080

int main() {
    int sockfd;
    struct sockaddr_in server_addr, client_addr;
    char buffer[BUFFER_SIZE];
    socklen_t addr_len = sizeof(client_addr);

    // Create UDP socket
    sockfd = socket(AF_INET, SOCK_DGRAM, 0);

    // Bind to port
    memset(&server_addr, 0, sizeof(server_addr));
    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = INADDR_ANY;
    server_addr.sin_port = htons(PORT);

    bind(sockfd, (struct sockaddr *)&server_addr, sizeof(server_addr));
    printf("UDP server listening on port %d\\n", PORT);

    while (1) {
        // Receive data
        int bytes_received = recvfrom(sockfd, buffer, BUFFER_SIZE, 0,
                                    (struct sockaddr *)&client_addr, &addr_len);

        if (bytes_received > 0) {
            buffer[bytes_received] = '\\0';
            printf("Received: %s\\n", buffer);

            // Echo back to client
            sendto(sockfd, buffer, bytes_received, 0,
                   (struct sockaddr *)&client_addr, addr_len);
        }
    }

    close(sockfd);
    return 0;
}
\`\`\`

### UDP Client Implementation
\`\`\`c
int main() {
    int sockfd;
    struct sockaddr_in server_addr;
    char buffer[BUFFER_SIZE];
    char *message = "Hello UDP Server!";

    // Create UDP socket
    sockfd = socket(AF_INET, SOCK_DGRAM, 0);

    // Server address
    memset(&server_addr, 0, sizeof(server_addr));
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(PORT);
    inet_pton(AF_INET, "127.0.0.1", &server_addr.sin_addr);

    // Send message
    sendto(sockfd, message, strlen(message), 0,
           (struct sockaddr *)&server_addr, sizeof(server_addr));

    // Receive response
    socklen_t addr_len = sizeof(server_addr);
    int bytes_received = recvfrom(sockfd, buffer, BUFFER_SIZE, 0,
                                (struct sockaddr *)&server_addr, &addr_len);

    if (bytes_received > 0) {
        buffer[bytes_received] = '\\0';
        printf("Server response: %s\\n", buffer);
    }

    close(sockfd);
    return 0;
}
\`\`\`

## UDP Message Boundaries

### Message-Oriented Communication
\`\`\`c
// UDP preserves message boundaries
char *messages[] = {
    "First message",
    "Second message",
    "Third message"
};

for (int i = 0; i < 3; i++) {
    sendto(sockfd, messages[i], strlen(messages[i]), 0,
           (struct sockaddr *)&server_addr, sizeof(server_addr));

    // Each sendto() call creates a separate UDP datagram
    // Each recvfrom() call receives exactly one datagram
}
\`\`\`

### Handling Partial Messages
\`\`\`c
// UDP doesn't fragment application messages
// Each recvfrom() gets exactly one sendto() message
while (1) {
    char buffer[BUFFER_SIZE];
    struct sockaddr_in sender_addr;
    socklen_t addr_len = sizeof(sender_addr);

    int bytes = recvfrom(sockfd, buffer, BUFFER_SIZE, 0,
                        (struct sockaddr *)&sender_addr, &addr_len);

    if (bytes > 0) {
        // Process complete message
        process_udp_message(buffer, bytes, &sender_addr);
    }
}
\`\`\`

## UDP Broadcasting

### Broadcast Addresses
\`\`\`c
// Enable broadcast on socket
int broadcast = 1;
setsockopt(sockfd, SOL_SOCKET, SO_BROADCAST, &broadcast, sizeof(broadcast));

// Send to broadcast address
struct sockaddr_in broadcast_addr;
broadcast_addr.sin_family = AF_INET;
broadcast_addr.sin_port = htons(12345);
inet_pton(AF_INET, "192.168.1.255", &broadcast_addr.sin_addr);

// Send broadcast message
char *message = "Broadcast message";
sendto(sockfd, message, strlen(message), 0,
       (struct sockaddr *)&broadcast_addr, sizeof(broadcast_addr));
\`\`\`

### Broadcast Receiver
\`\`\`c
// Bind to broadcast port
struct sockaddr_in local_addr;
local_addr.sin_family = AF_INET;
local_addr.sin_port = htons(12345);
local_addr.sin_addr.s_addr = INADDR_ANY;  // Receive from any interface

bind(sockfd, (struct sockaddr *)&local_addr, sizeof(local_addr));

// Receive broadcasts
while (1) {
    char buffer[BUFFER_SIZE];
    struct sockaddr_in sender_addr;
    socklen_t addr_len = sizeof(sender_addr);

    int bytes = recvfrom(sockfd, buffer, BUFFER_SIZE, 0,
                        (struct sockaddr *)&sender_addr, &addr_len);

    if (bytes > 0) {
        char sender_ip[INET_ADDRSTRLEN];
        inet_ntop(AF_INET, &sender_addr.sin_addr, sender_ip, sizeof(sender_ip));
        printf("Broadcast from %s: %.*s\\n", sender_ip, bytes, buffer);
    }
}
\`\`\`

## UDP Multicast

### Multicast Group Management
\`\`\`c
#include <netinet/in.h>

// Join multicast group
struct ip_mreq mreq;
inet_pton(AF_INET, "239.0.0.1", &mreq.imr_multiaddr);
mreq.imr_interface.s_addr = INADDR_ANY;

setsockopt(sockfd, IPPROTO_IP, IP_ADD_MEMBERSHIP, &mreq, sizeof(mreq));

// Leave multicast group
setsockopt(sockfd, IPPROTO_IP, IP_DROP_MEMBERSHIP, &mreq, sizeof(mreq));

// Set multicast TTL
int ttl = 64;
setsockopt(sockfd, IPPROTO_IP, IP_MULTICAST_TTL, &ttl, sizeof(ttl));

// Disable loopback (don't receive own packets)
int loopback = 0;
setsockopt(sockfd, IPPROTO_IP, IP_MULTICAST_LOOP, &loopback, sizeof(loopback));
\`\`\`

### Multicast Sender
\`\`\`c
struct sockaddr_in multicast_addr;
multicast_addr.sin_family = AF_INET;
multicast_addr.sin_port = htons(12345);
inet_pton(AF_INET, "239.0.0.1", &multicast_addr.sin_addr);

char *message = "Multicast message";
sendto(sockfd, message, strlen(message), 0,
       (struct sockaddr *)&multicast_addr, sizeof(multicast_addr));
\`\`\`

### Multicast Receiver
\`\`\`c
// Join multicast group (as shown above)
// Bind to multicast port
struct sockaddr_in local_addr;
local_addr.sin_family = AF_INET;
local_addr.sin_port = htons(12345);
local_addr.sin_addr.s_addr = INADDR_ANY;

bind(sockfd, (struct sockaddr *)&local_addr, sizeof(local_addr));

// Receive multicast packets
while (1) {
    char buffer[BUFFER_SIZE];
    struct sockaddr_in sender_addr;
    socklen_t addr_len = sizeof(sender_addr);

    int bytes = recvfrom(sockfd, buffer, BUFFER_SIZE, 0,
                        (struct sockaddr *)&sender_addr, &addr_len);

    if (bytes > 0) {
        printf("Multicast: %.*s\\n", bytes, buffer);
    }
}
\`\`\`

## UDP Reliability and Congestion Control

### Implementing Reliability over UDP
\`\`\`c
typedef struct {
    uint32_t sequence_number;
    uint32_t ack_number;
    uint16_t flags;
    uint16_t window_size;
    char data[UDP_DATA_SIZE];
} UdpPacket;

typedef struct {
    int socket_fd;
    struct sockaddr_in peer_addr;
    socklen_t peer_addr_len;

    // Reliability state
    uint32_t next_seq_num;
    uint32_t expected_seq_num;
    uint32_t window_size;

    // Packet buffers
    UdpPacket send_buffer[MAX_WINDOW];
    UdpPacket recv_buffer[MAX_WINDOW];

    // Timers and retransmission
    struct timespec send_times[MAX_WINDOW];
    int retransmit_counts[MAX_WINDOW];
} ReliableUdpSocket;

// Send with acknowledgment
int rudp_send(ReliableUdpSocket *rudp, const char *data, size_t len) {
    UdpPacket packet;
    packet.sequence_number = rudp->next_seq_num++;
    packet.flags = FLAG_DATA;
    memcpy(packet.data, data, len);

    // Send packet
    sendto(rudp->socket_fd, &packet, sizeof(packet), 0,
           (struct sockaddr *)&rudp->peer_addr, rudp->peer_addr_len);

    // Start retransmission timer
    // Wait for acknowledgment
    // Retransmit if timeout

    return len;
}

// Receive with acknowledgment
int rudp_recv(ReliableUdpSocket *rudp, char *buffer, size_t max_len) {
    UdpPacket packet;

    while (1) {
        int bytes = recvfrom(rudp->socket_fd, &packet, sizeof(packet), 0,
                           (struct sockaddr *)&rudp->peer_addr, &rudp->peer_addr_len);

        if (packet.sequence_number == rudp->expected_seq_num) {
            // Send acknowledgment
            UdpPacket ack;
            ack.ack_number = packet.sequence_number;
            ack.flags = FLAG_ACK;

            sendto(rudp->socket_fd, &ack, sizeof(ack), 0,
                   (struct sockaddr *)&rudp->peer_addr, rudp->peer_addr_len);

            // Process data
            size_t data_len = bytes - sizeof(UdpPacket) + sizeof(char) * UDP_DATA_SIZE;
            memcpy(buffer, packet.data, data_len);
            rudp->expected_seq_num++;

            return data_len;
        }
    }
}
\`\`\`

## UDP Performance Optimization

### Socket Buffer Sizes
\`\`\`c
// Increase UDP socket buffer sizes
int buffer_size = 4 * 1024 * 1024; // 4MB
setsockopt(sockfd, SOL_SOCKET, SO_SNDBUF, &buffer_size, sizeof(buffer_size));
setsockopt(sockfd, SOL_SOCKET, SO_RCVBUF, &buffer_size, sizeof(buffer_size));

// Check maximum buffer size
int max_buffer;
socklen_t len = sizeof(max_buffer);
getsockopt(sockfd, SOL_SOCKET, SO_SNDBUF, &max_buffer, &len);
printf("Max send buffer: %d\\n", max_buffer);
\`\`\`

### Packet Size Considerations
\`\`\`c
// Get interface MTU
struct ifreq ifr;
strcpy(ifr.ifr_name, "eth0");
ioctl(sockfd, SIOCGIFMTU, &ifr);
int mtu = ifr.ifr_mtu;

printf("MTU: %d bytes\\n", mtu);

// Optimal UDP payload size (MTU - IP header - UDP header)
int optimal_size = mtu - 20 - 8; // IPv4
printf("Optimal UDP payload: %d bytes\\n", optimal_size);
\`\`\`

### Non-blocking UDP
\`\`\`c
// Set non-blocking mode
int flags = fcntl(sockfd, F_GETFL, 0);
fcntl(sockfd, F_SETFL, flags | O_NONBLOCK);

// Use with select() for timeout
fd_set read_fds;
FD_ZERO(&read_fds);
FD_SET(sockfd, &read_fds);

struct timeval timeout = {1, 0}; // 1 second timeout

int ready = select(sockfd + 1, &read_fds, NULL, NULL, &timeout);
if (ready > 0) {
    // Data available
    char buffer[BUFFER_SIZE];
    recvfrom(sockfd, buffer, BUFFER_SIZE, 0, NULL, NULL);
} else if (ready == 0) {
    // Timeout
    printf("No data received within timeout\\n");
}
\`\`\`

## UDP Security Considerations

### Spoofing Protection
- **Source IP filtering**: Accept packets only from known sources
- **Challenge-response**: Verify sender identity
- **Cryptographic authentication**: Use HMAC or digital signatures

### DoS Attack Mitigation
- **Rate limiting**: Limit packet processing rate
- **Stateless processing**: Avoid storing state for each packet
- **Firewall rules**: Block suspicious traffic patterns

### Data Integrity
\`\`\`c
#include <openssl/hmac.h>

// Add HMAC for integrity
unsigned char hmac[EVP_MAX_MD_SIZE];
unsigned int hmac_len;

HMAC(EVP_sha256(), key, key_len,
     (unsigned char *)data, data_len,
     hmac, &hmac_len);

// Send data + HMAC
// Verify on receive
\`\`\`

## Cross-Platform UDP Programming

### Windows Compatibility
\`\`\`c
#ifdef _WIN32
    #include <winsock2.h>
    #include <ws2tcpip.h>
    #pragma comment(lib, "ws2_32.lib")

    // Initialize Winsock
    WSADATA wsaData;
    WSAStartup(MAKEWORD(2, 2), &wsaData);
#else
    #include <sys/socket.h>
    #include <netinet/in.h>
    #include <arpa/inet.h>
    #include <unistd.h>
#endif

// Common socket operations work the same
// Use closesocket() on Windows, close() on Unix
\`\`\`

### Platform-Specific Optimizations
- **Windows**: Use WSASendTo/WSARecvFrom for overlapped I/O
- **Linux**: Use sendmmsg/recvmmsg for multiple messages
- **macOS/BSD**: Use kqueue for efficient I/O multiplexing

## UDP Application Examples

### DNS Client
\`\`\`c
// Simple DNS query structure
typedef struct {
    uint16_t id;
    uint16_t flags;
    uint16_t qdcount;
    uint16_t ancount;
    uint16_t nscount;
    uint16_t arcount;
    // Question section follows
} DnsHeader;

// Send DNS query to 8.8.8.8:53
// Parse response for A records
\`\`\`

### NTP Client
\`\`\`c
// NTP packet structure (RFC 5905)
typedef struct {
    uint8_t li_vn_mode;
    uint8_t stratum;
    uint8_t poll;
    int8_t precision;
    // ... timing data
} NtpPacket;

// Query NTP server for current time
// Adjust system clock based on response
\`\`\`

### Syslog Client
\`\`\`c
// Send syslog messages via UDP
// Format: <priority>timestamp hostname message
char syslog_msg[1024];
snprintf(syslog_msg, sizeof(syslog_msg),
         "<134>%s %s %s", timestamp, hostname, message);

sendto(sockfd, syslog_msg, strlen(syslog_msg), 0,
       (struct sockaddr *)&server_addr, sizeof(server_addr));
\`\`\`

UDP provides a lightweight, low-latency transport protocol ideal for applications where occasional packet loss is acceptable and speed is paramount. Understanding UDP's characteristics and implementing appropriate reliability mechanisms when needed is crucial for building robust network applications.`
};

