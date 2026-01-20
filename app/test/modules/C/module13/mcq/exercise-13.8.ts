import { Exercise } from '../../../../data/lessonsData';

export const exercise_13_8: Exercise = {
  id: "13.8",
  title: 'Network Programming Coding Exercises',
  status: 'demo',
  type: 'code',
  codeQuestions: [
    {
      id: "tcp_echo_server",
      question: `## TCP Echo Server

Implement a TCP echo server that listens for connections and echoes back any data received from clients. The server should:

1. Listen on a specified port (use 8080)
2. Accept multiple concurrent connections using threads
3. Echo back all received data to the client
4. Handle client disconnections gracefully
5. Provide basic logging of connections

**Requirements:**
- Use POSIX threads for handling multiple clients
- Implement proper error handling
- Use appropriate buffer sizes
- Clean up resources properly

**Example Usage:**
\`\`\`bash
# Terminal 1: Start server
./echo_server

# Terminal 2: Connect with telnet or netcat
echo "Hello World" | nc localhost 8080
# Should receive "Hello World" back
\`\`\``,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <pthread.h>
#include <time.h>

#define PORT 8080
#define BUFFER_SIZE 4096
#define MAX_CONNECTIONS 10

void log_message(const char *message) {
    time_t now = time(NULL);
    struct tm *tm_info = localtime(&now);
    char timestamp[20];
    strftime(timestamp, sizeof(timestamp), "%Y-%m-%d %H:%M:%S", tm_info);
    printf("[%s] %s\\n", timestamp, message);
    fflush(stdout);
}

void *handle_client(void *arg) {
    int client_fd = *(int *)arg;
    free(arg);

    char client_ip[INET_ADDRSTRLEN];
    struct sockaddr_in client_addr;
    socklen_t addr_len = sizeof(client_addr);

    getpeername(client_fd, (struct sockaddr *)&client_addr, &addr_len);
    inet_ntop(AF_INET, &client_addr.sin_addr, client_ip, sizeof(client_ip));

    log_message("Client connected", client_ip);

    char buffer[BUFFER_SIZE];
    ssize_t bytes_read;

    while ((bytes_read = recv(client_fd, buffer, sizeof(buffer), 0)) > 0) {
        // Echo the data back to client
        ssize_t bytes_sent = send(client_fd, buffer, bytes_read, 0);

        if (bytes_sent < 0) {
            perror("send failed");
            break;
        }

        // Log the echoed data (first 50 chars)
        char log_buf[64];
        int log_len = bytes_read > 50 ? 50 : bytes_read;
        memcpy(log_buf, buffer, log_len);
        log_buf[log_len] = '\\0';

        // Replace newlines with spaces for logging
        for (int i = 0; i < log_len; i++) {
            if (log_buf[i] == '\\n' || log_buf[i] == '\\r') {
                log_buf[i] = ' ';
            }
        }

        printf("Echoed %zd bytes: %.50s%s\\n", bytes_read, log_buf,
               bytes_read > 50 ? "..." : "");
    }

    if (bytes_read < 0) {
        perror("recv failed");
    }

    log_message("Client disconnected", client_ip);
    close(client_fd);

    return NULL;
}

int main() {
    int server_fd;
    struct sockaddr_in server_addr;

    log_message("Starting TCP echo server on port", PORT);

    // Create socket
    server_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (server_fd < 0) {
        perror("socket creation failed");
        exit(EXIT_FAILURE);
    }

    // Set socket options to reuse address
    int opt = 1;
    if (setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt)) < 0) {
        perror("setsockopt failed");
        close(server_fd);
        exit(EXIT_FAILURE);
    }

    // Bind to port
    memset(&server_addr, 0, sizeof(server_addr));
    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = INADDR_ANY;
    server_addr.sin_port = htons(PORT);

    if (bind(server_fd, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0) {
        perror("bind failed");
        close(server_fd);
        exit(EXIT_FAILURE);
    }

    // Listen for connections
    if (listen(server_fd, MAX_CONNECTIONS) < 0) {
        perror("listen failed");
        close(server_fd);
        exit(EXIT_FAILURE);
    }

    log_message("Server listening for connections");

    while (1) {
        int *client_fd = malloc(sizeof(int));
        *client_fd = accept(server_fd, NULL, NULL);

        if (*client_fd < 0) {
            perror("accept failed");
            free(client_fd);
            continue;
        }

        // Create thread to handle client
        pthread_t thread;
        if (pthread_create(&thread, NULL, handle_client, client_fd) != 0) {
            perror("pthread_create failed");
            close(*client_fd);
            free(client_fd);
            continue;
        }

        // Detach thread for automatic cleanup
        pthread_detach(thread);
    }

    close(server_fd);
    return 0;
}`
    },
    {
      id: "udp_chat_client",
      question: `## UDP Chat Client

Implement a simple UDP-based chat client that can send and receive messages to/from a chat server. The client should:

1. Connect to a UDP chat server
2. Send messages typed by the user
3. Receive and display messages from other clients
4. Handle graceful exit (type 'quit' to exit)
5. Display received messages with timestamps

**Requirements:**
- Use non-blocking I/O for receiving messages
- Handle multiple incoming messages
- Display clear user interface
- Proper error handling
- Clean exit on 'quit' command

**Example Usage:**
\`\`\`bash
# Terminal 1: Start UDP chat server (you need to implement this separately)
./udp_chat_server

# Terminal 2: Start client
./udp_chat_client
Connected to chat server
You: Hello everyone!
[14:30:15] Alice: Hi there!
[14:30:17] Bob: Welcome!
You: quit
Goodbye!
\`\`\`

**Note:** You'll need a corresponding UDP chat server that broadcasts messages to all connected clients.`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <fcntl.h>
#include <errno.h>
#include <time.h>

#define SERVER_IP "127.0.0.1"
#define SERVER_PORT 8888
#define BUFFER_SIZE 1024
#define MAX_MESSAGE_SIZE 512

void set_nonblocking(int sockfd) {
    int flags = fcntl(sockfd, F_GETFL, 0);
    fcntl(sockfd, F_SETFL, flags | O_NONBLOCK);
}

void print_timestamped_message(const char *message) {
    time_t now = time(NULL);
    struct tm *tm_info = localtime(&now);
    char timestamp[20];
    strftime(timestamp, sizeof(timestamp), "[%H:%M:%S]", tm_info);
    printf("%s %s\\n", timestamp, message);
    fflush(stdout);
}

int main() {
    int sockfd;
    struct sockaddr_in server_addr;
    char buffer[BUFFER_SIZE];
    char message[MAX_MESSAGE_SIZE];

    printf("UDP Chat Client\\n");
    printf("Type 'quit' to exit\\n\\n");

    // Create UDP socket
    sockfd = socket(AF_INET, SOCK_DGRAM, 0);
    if (sockfd < 0) {
        perror("socket creation failed");
        exit(EXIT_FAILURE);
    }

    // Set socket to non-blocking for receiving
    set_nonblocking(sockfd);

    // Server address
    memset(&server_addr, 0, sizeof(server_addr));
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(SERVER_PORT);
    inet_pton(AF_INET, SERVER_IP, &server_addr.sin_addr);

    printf("Connected to chat server at %s:%d\\n", SERVER_IP, SERVER_PORT);

    // Send join message
    const char *join_msg = "JOIN";
    sendto(sockfd, join_msg, strlen(join_msg), 0,
           (struct sockaddr *)&server_addr, sizeof(server_addr));

    fd_set read_fds;
    struct timeval timeout;

    while (1) {
        // Check for incoming messages
        FD_ZERO(&read_fds);
        FD_SET(sockfd, &read_fds);
        FD_SET(STDIN_FILENO, &read_fds);

        timeout.tv_sec = 0;
        timeout.tv_usec = 100000; // 100ms timeout

        int ready = select(sockfd + 1, &read_fds, NULL, NULL, &timeout);

        if (ready > 0) {
            // Check for incoming UDP messages
            if (FD_ISSET(sockfd, &read_fds)) {
                struct sockaddr_in sender_addr;
                socklen_t addr_len = sizeof(sender_addr);

                ssize_t bytes_received = recvfrom(sockfd, buffer, sizeof(buffer) - 1, 0,
                                                (struct sockaddr *)&sender_addr, &addr_len);

                if (bytes_received > 0) {
                    buffer[bytes_received] = '\\0';

                    // Don't display our own messages or system messages
                    if (strncmp(buffer, "You:", 4) != 0 &&
                        strcmp(buffer, "JOIN") != 0 &&
                        strcmp(buffer, "LEAVE") != 0) {
                        print_timestamped_message(buffer);
                    }
                }
            }

            // Check for user input
            if (FD_ISSET(STDIN_FILENO, &read_fds)) {
                if (fgets(message, sizeof(message), stdin) != NULL) {
                    // Remove newline
                    size_t len = strlen(message);
                    if (len > 0 && message[len - 1] == '\\n') {
                        message[len - 1] = '\\0';
                        len--;
                    }

                    // Check for quit command
                    if (strcmp(message, "quit") == 0) {
                        // Send leave message
                        const char *leave_msg = "LEAVE";
                        sendto(sockfd, leave_msg, strlen(leave_msg), 0,
                               (struct sockaddr *)&server_addr, sizeof(server_addr));

                        printf("Goodbye!\\n");
                        break;
                    }

                    // Send message to server
                    if (len > 0) {
                        printf("You: %s\\n", message);
                        sendto(sockfd, message, strlen(message), 0,
                               (struct sockaddr *)&server_addr, sizeof(server_addr));
                    }
                }
            }
        }
    }

    close(sockfd);
    return 0;
}`
    }
  ]
};
