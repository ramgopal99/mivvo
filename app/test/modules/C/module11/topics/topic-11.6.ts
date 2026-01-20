import { SubLesson } from '../../../../data/lessonsData';

export const topic_11_6: SubLesson = {
  id: '11.6',
  title: 'Network Programming with Sockets',
  status: 'demo',
  content: `# Network Programming with Sockets

## Socket Programming Basics

### Socket Types
- **Stream Sockets (SOCK_STREAM)**: TCP - reliable, connection-oriented
- **Datagram Sockets (SOCK_DGRAM)**: UDP - unreliable, connectionless
- **Raw Sockets (SOCK_RAW)**: Direct IP access

### Address Families
- **AF_INET**: IPv4 addresses
- **AF_INET6**: IPv6 addresses
- **AF_UNIX**: Unix domain sockets (local communication)

## TCP Client-Server Model

### TCP Server
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>

#define PORT 8080
#define BUFFER_SIZE 1024

int main() {
    int server_fd, new_socket;
    struct sockaddr_in address;
    int addrlen = sizeof(address);
    char buffer[BUFFER_SIZE] = {0};

    // Create socket
    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
        perror("socket failed");
        exit(EXIT_FAILURE);
    }

    // Bind to port
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
        perror("bind failed");
        exit(EXIT_FAILURE);
    }

    // Listen for connections
    if (listen(server_fd, 3) < 0) {
        perror("listen failed");
        exit(EXIT_FAILURE);
    }

    printf("Server listening on port %d\\n", PORT);

    // Accept connection
    if ((new_socket = accept(server_fd, (struct sockaddr *)&address,
                             (socklen_t*)&addrlen)) < 0) {
        perror("accept failed");
        exit(EXIT_FAILURE);
    }

    // Read from client
    int valread = read(new_socket, buffer, BUFFER_SIZE);
    printf("Received: %s\\n", buffer);

    // Send response
    char *response = "Hello from server";
    send(new_socket, response, strlen(response), 0);

    close(new_socket);
    close(server_fd);

    return 0;
}
\`\`\`

### TCP Client
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>

#define PORT 8080

int main() {
    int sock = 0;
    struct sockaddr_in serv_addr;
    char *message = "Hello from client";
    char buffer[1024] = {0};

    // Create socket
    if ((sock = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
        printf("\\n Socket creation error \\n");
        return -1;
    }

    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(PORT);

    // Convert IPv4 address from text to binary
    if (inet_pton(AF_INET, "127.0.0.1", &serv_addr.sin_addr) <= 0) {
        printf("\\nInvalid address/ Address not supported \\n");
        return -1;
    }

    // Connect to server
    if (connect(sock, (struct sockaddr *)&serv_addr, sizeof(serv_addr)) < 0) {
        printf("\\nConnection Failed \\n");
        return -1;
    }

    // Send message
    send(sock, message, strlen(message), 0);
    printf("Message sent\\n");

    // Read response
    int valread = read(sock, buffer, 1024);
    printf("Server response: %s\\n", buffer);

    close(sock);
    return 0;
}
\`\`\`

## UDP Communication

### UDP Server
\`\`\`c
// Similar setup to TCP server
int udp_socket = socket(AF_INET, SOCK_DGRAM, 0);

// No listen() or accept() for UDP
// Use recvfrom() to receive data

struct sockaddr_in client_addr;
socklen_t addr_len = sizeof(client_addr);
char buffer[BUFFER_SIZE];

int bytes_received = recvfrom(udp_socket, buffer, BUFFER_SIZE, 0,
                             (struct sockaddr*)&client_addr, &addr_len);

// Send response back
sendto(udp_socket, response, strlen(response), 0,
       (struct sockaddr*)&client_addr, addr_len);
\`\`\`

### UDP Client
\`\`\`c
// Similar to TCP client setup
int udp_socket = socket(AF_INET, SOCK_DGRAM, 0);

// Send data
sendto(udp_socket, message, strlen(message), 0,
       (struct sockaddr*)&server_addr, sizeof(server_addr));

// Receive response
recvfrom(udp_socket, buffer, BUFFER_SIZE, 0, NULL, NULL);
\`\`\`

## Socket Options

### Setting Socket Options
\`\`\`c
#include <sys/socket.h>

// Reuse address
int opt = 1;
setsockopt(sock, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

// Set receive timeout
struct timeval tv;
tv.tv_sec = 5;  // 5 seconds
tv.tv_usec = 0;
setsockopt(sock, SOL_SOCKET, SO_RCVTIMEO, &tv, sizeof(tv));

// Set send buffer size
int buffer_size = 65536;
setsockopt(sock, SOL_SOCKET, SO_SNDBUF, &buffer_size, sizeof(buffer_size));
\`\`\`

## Hostname Resolution

### getaddrinfo()
\`\`\`c
#include <netdb.h>
#include <arpa/inet.h>

struct addrinfo hints, *result;
memset(&hints, 0, sizeof(hints));
hints.ai_family = AF_INET;
hints.ai_socktype = SOCK_STREAM;

int status = getaddrinfo("www.example.com", "80", &hints, &result);
if (status != 0) {
    fprintf(stderr, "getaddrinfo: %s\\n", gai_strerror(status));
    return 1;
}

// Use result->ai_addr for connection
// result is a linked list of address structures

freeaddrinfo(result);
\`\`\`

## Non-blocking I/O

### Setting Non-blocking Mode
\`\`\`c
#include <fcntl.h>

// Set socket to non-blocking
int flags = fcntl(sock, F_GETFL, 0);
fcntl(sock, F_SETFL, flags | O_NONBLOCK);

// Now operations return immediately
int result = connect(sock, addr, addrlen);
if (result < 0) {
    if (errno == EINPROGRESS) {
        // Connection in progress, check later with select()
    }
}
\`\`\`

## Multiplexed I/O with select()

### Basic select() Usage
\`\`\`c
#include <sys/select.h>

fd_set read_fds;
FD_ZERO(&read_fds);
FD_SET(sock1, &read_fds);
FD_SET(sock2, &read_fds);

int max_fd = (sock1 > sock2) ? sock1 : sock2;

struct timeval timeout;
timeout.tv_sec = 5;
timeout.tv_usec = 0;

int ready = select(max_fd + 1, &read_fds, NULL, NULL, &timeout);

if (ready > 0) {
    if (FD_ISSET(sock1, &read_fds)) {
        // Data available on sock1
    }
    if (FD_ISSET(sock2, &read_fds)) {
        // Data available on sock2
    }
}
\`\`\`

## Error Handling

### Common Socket Errors
- **ECONNREFUSED**: Connection refused (server not running)
- **ETIMEDOUT**: Connection timed out
- **EHOSTUNREACH**: Host unreachable
- **ENETUNREACH**: Network unreachable

### Proper Error Checking
\`\`\`c
int sock = socket(AF_INET, SOCK_STREAM, 0);
if (sock < 0) {
    perror("socket creation failed");
    return -1;
}

if (connect(sock, (struct sockaddr*)&addr, sizeof(addr)) < 0) {
    perror("connection failed");
    close(sock);
    return -1;
}
\`\`\`

## IPv6 Support

### IPv6 Socket Creation
\`\`\`c
struct sockaddr_in6 server_addr;
memset(&server_addr, 0, sizeof(server_addr));
server_addr.sin6_family = AF_INET6;
server_addr.sin6_port = htons(PORT);
server_addr.sin6_addr = in6addr_any;  // ::0

int sock = socket(AF_INET6, SOCK_STREAM, 0);
bind(sock, (struct sockaddr*)&server_addr, sizeof(server_addr));
\`\`\`

## Security Considerations

### Input Validation
- Validate all received data
- Check buffer sizes
- Sanitize input strings

### Secure Coding Practices
- Use safe string functions (strncpy, not strcpy)
- Validate IP addresses
- Implement proper timeout handling
- Avoid buffer overflows

## Performance Optimization

### TCP Optimization
- Use TCP_NODELAY to disable Nagle's algorithm for low-latency needs
- Adjust buffer sizes for high-throughput applications
- Implement connection pooling

### UDP Optimization
- Set appropriate MTU size
- Implement reliability layer if needed
- Handle packet fragmentation

### General Tips
- Use non-blocking I/O for high-performance servers
- Implement proper connection management
- Monitor network statistics
- Profile and optimize bottlenecks
`
};

