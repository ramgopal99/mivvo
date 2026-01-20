import { SubLesson } from '../../../../data/lessonsData';

export const topic_13_5: SubLesson = {
  id: '13.5',
  title: 'Building Scalable Network Servers',
  status: 'demo',
  content: `# Building Scalable Network Servers

## Server Architecture Patterns

### Single-Threaded Event Loop
\`\`\`c
#include <sys/select.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#define MAX_CLIENTS 1024
#define BUFFER_SIZE 4096

typedef struct {
    int fd;
    char buffer[BUFFER_SIZE];
    size_t buffer_len;
    void (*handler)(int fd, char *data, size_t len);
} ClientConnection;

typedef struct {
    ClientConnection clients[MAX_CLIENTS];
    int max_fd;
    fd_set master_set;
} EventLoop;

void event_loop_init(EventLoop *loop) {
    FD_ZERO(&loop->master_set);
    loop->max_fd = 0;
    memset(loop->clients, 0, sizeof(loop->clients));
}

void event_loop_add_client(EventLoop *loop, int fd,
                          void (*handler)(int fd, char *data, size_t len)) {
    if (fd >= MAX_CLIENTS) return;

    loop->clients[fd].fd = fd;
    loop->clients[fd].buffer_len = 0;
    loop->clients[fd].handler = handler;

    FD_SET(fd, &loop->master_set);
    if (fd > loop->max_fd) {
        loop->max_fd = fd;
    }
}

void event_loop_remove_client(EventLoop *loop, int fd) {
    FD_CLR(fd, &loop->master_set);
    close(fd);
    loop->clients[fd].fd = 0;
}

void event_loop_run(EventLoop *loop) {
    while (1) {
        fd_set read_set = loop->master_set;
        int ready = select(loop->max_fd + 1, &read_set, NULL, NULL, NULL);

        if (ready < 0) {
            perror("select");
            break;
        }

        for (int fd = 0; fd <= loop->max_fd; fd++) {
            if (FD_ISSET(fd, &read_set)) {
                ClientConnection *client = &loop->clients[fd];

                if (client->fd == 0) continue;  // Skip inactive clients

                ssize_t bytes_read = read(fd, client->buffer + client->buffer_len,
                                        BUFFER_SIZE - client->buffer_len);

                if (bytes_read <= 0) {
                    // Client disconnected or error
                    event_loop_remove_client(loop, fd);
                } else {
                    client->buffer_len += bytes_read;

                    // Process complete messages (simple newline-delimited protocol)
                    char *newline;
                    while ((newline = memchr(client->buffer, '\\n', client->buffer_len)) != NULL) {
                        size_t msg_len = newline - client->buffer + 1;
                        client->handler(fd, client->buffer, msg_len - 1);

                        // Remove processed message from buffer
                        memmove(client->buffer, newline + 1, client->buffer_len - msg_len);
                        client->buffer_len -= msg_len;
                    }
                }
            }
        }
    }
}
\`\`\`

### Multi-Process Server (Fork-based)
\`\`\`c
#include <sys/wait.h>
#include <signal.h>

void sigchld_handler(int sig) {
    // Clean up zombie processes
    while (waitpid(-1, NULL, WNOHANG) > 0);
}

void handle_client(int client_fd) {
    // Process client request
    char buffer[1024];
    ssize_t bytes_read;

    while ((bytes_read = read(client_fd, buffer, sizeof(buffer))) > 0) {
        // Process request and send response
        write(client_fd, "HTTP/1.1 200 OK\\r\\nContent-Length: 12\\r\\n\\r\\nHello World!", 53);
    }

    close(client_fd);
    exit(0);  // Child process exits
}

int main() {
    signal(SIGCHLD, sigchld_handler);

    int server_fd = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in addr = {
        .sin_family = AF_INET,
        .sin_port = htons(8080),
        .sin_addr.s_addr = INADDR_ANY
    };

    bind(server_fd, (struct sockaddr *)&addr, sizeof(addr));
    listen(server_fd, 10);

    while (1) {
        int client_fd = accept(server_fd, NULL, NULL);

        if (client_fd < 0) continue;

        pid_t pid = fork();

        if (pid == 0) {
            // Child process
            close(server_fd);  // Child doesn't need listening socket
            handle_client(client_fd);
        } else {
            // Parent process
            close(client_fd);  // Parent doesn't need client socket
        }
    }

    return 0;
}
\`\`\`

### Thread Pool Server
\`\`\`c
#include <pthread.h>
#include <semaphore.h>

#define THREAD_POOL_SIZE 10
#define QUEUE_SIZE 100

typedef struct {
    void (*function)(void *arg);
    void *arg;
} Task;

typedef struct {
    Task queue[QUEUE_SIZE];
    int front, rear, count;
    pthread_mutex_t mutex;
    sem_t empty, full;
} TaskQueue;

typedef struct {
    pthread_t threads[THREAD_POOL_SIZE];
    TaskQueue queue;
    int shutdown;
} ThreadPool;

void task_queue_init(TaskQueue *queue) {
    queue->front = 0;
    queue->rear = 0;
    queue->count = 0;
    pthread_mutex_init(&queue->mutex, NULL);
    sem_init(&queue->empty, 0, QUEUE_SIZE);
    sem_init(&queue->full, 0, 0);
}

void task_queue_add(TaskQueue *queue, void (*function)(void *), void *arg) {
    sem_wait(&queue->empty);

    pthread_mutex_lock(&queue->mutex);
    queue->queue[queue->rear].function = function;
    queue->queue[queue->rear].arg = arg;
    queue->rear = (queue->rear + 1) % QUEUE_SIZE;
    queue->count++;
    pthread_mutex_unlock(&queue->mutex);

    sem_post(&queue->full);
}

Task task_queue_get(TaskQueue *queue) {
    sem_wait(&queue->full);

    pthread_mutex_lock(&queue->mutex);
    Task task = queue->queue[queue->front];
    queue->front = (queue->front + 1) % QUEUE_SIZE;
    queue->count--;
    pthread_mutex_unlock(&queue->mutex);

    sem_post(&queue->empty);
    return task;
}

void *worker_thread(void *arg) {
    ThreadPool *pool = (ThreadPool *)arg;

    while (!pool->shutdown) {
        Task task = task_queue_get(&pool->queue);

        if (task.function) {
            task.function(task.arg);
        }
    }

    return NULL;
}

void thread_pool_init(ThreadPool *pool) {
    task_queue_init(&pool->queue);
    pool->shutdown = 0;

    for (int i = 0; i < THREAD_POOL_SIZE; i++) {
        pthread_create(&pool->threads[i], NULL, worker_thread, pool);
    }
}

void thread_pool_add_task(ThreadPool *pool, void (*function)(void *), void *arg) {
    task_queue_add(&pool->queue, function, arg);
}

void handle_client(void *arg) {
    int client_fd = *(int *)arg;
    free(arg);

    // Handle HTTP request
    char buffer[4096];
    ssize_t bytes_read = read(client_fd, buffer, sizeof(buffer));

    if (bytes_read > 0) {
        // Simple HTTP response
        const char *response =
            "HTTP/1.1 200 OK\\r\\n"
            "Content-Type: text/plain\\r\\n"
            "Content-Length: 13\\r\\n"
            "\\r\\n"
            "Hello World!\\n";

        write(client_fd, response, strlen(response));
    }

    close(client_fd);
}

int main() {
    ThreadPool pool;
    thread_pool_init(&pool);

    int server_fd = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in addr = {
        .sin_family = AF_INET,
        .sin_port = htons(8080),
        .sin_addr.s_addr = INADDR_ANY
    };

    bind(server_fd, (struct sockaddr *)&addr, sizeof(addr));
    listen(server_fd, 10);

    while (1) {
        int *client_fd = malloc(sizeof(int));
        *client_fd = accept(server_fd, NULL, NULL);

        if (*client_fd >= 0) {
            thread_pool_add_task(&pool, handle_client, client_fd);
        } else {
            free(client_fd);
        }
    }

    return 0;
}
\`\`\`

## Load Balancing Strategies

### Round-Robin Load Balancer
\`\`\`c
typedef struct {
    int server_fds[10];
    int num_servers;
    int current_server;
} LoadBalancer;

void load_balancer_init(LoadBalancer *lb, const char *servers[], int num_servers) {
    lb->num_servers = num_servers;
    lb->current_server = 0;

    for (int i = 0; i < num_servers; i++) {
        lb->server_fds[i] = create_tcp_connection(servers[i], 8080);
    }
}

int load_balancer_get_server(LoadBalancer *lb) {
    int server_fd = lb->server_fds[lb->current_server];
    lb->current_server = (lb->current_server + 1) % lb->num_servers;
    return server_fd;
}

// Forward request to backend server
void forward_request(int client_fd, LoadBalancer *lb) {
    char buffer[4096];
    ssize_t bytes_read = read(client_fd, buffer, sizeof(buffer));

    if (bytes_read > 0) {
        int server_fd = load_balancer_get_server(lb);

        // Forward request to server
        write(server_fd, buffer, bytes_read);

        // Read response from server
        bytes_read = read(server_fd, buffer, sizeof(buffer));

        if (bytes_read > 0) {
            // Send response back to client
            write(client_fd, buffer, bytes_read);
        }
    }
}
\`\`\`

### Least Connections Algorithm
\`\`\`c
typedef struct {
    int server_fd;
    int active_connections;
    pthread_mutex_t mutex;
} BackendServer;

typedef struct {
    BackendServer servers[10];
    int num_servers;
} LeastConnectionsLB;

int least_connections_get_server(LeastConnectionsLB *lb) {
    int min_connections = INT_MAX;
    int selected_server = 0;

    for (int i = 0; i < lb->num_servers; i++) {
        pthread_mutex_lock(&lb->servers[i].mutex);
        if (lb->servers[i].active_connections < min_connections) {
            min_connections = lb->servers[i].active_connections;
            selected_server = i;
        }
        pthread_mutex_unlock(&lb->servers[i].mutex);
    }

    pthread_mutex_lock(&lb->servers[selected_server].mutex);
    lb->servers[selected_server].active_connections++;
    pthread_mutex_unlock(&lb->servers[selected_server].mutex);

    return selected_server;
}

void least_connections_release_server(LeastConnectionsLB *lb, int server_index) {
    pthread_mutex_lock(&lb->servers[server_index].mutex);
    lb->servers[server_index].active_connections--;
    pthread_mutex_unlock(&lb->servers[server_index].mutex);
}
\`\`\`

## Connection Pooling

### HTTP Connection Pool
\`\`\`c
#include <openssl/ssl.h>

typedef struct {
    char *host;
    int port;
    SSL_CTX *ssl_ctx;
    int socket_fd;
    SSL *ssl;
    time_t last_used;
    int in_use;
} PooledConnection;

typedef struct {
    PooledConnection *connections;
    int max_connections;
    int num_connections;
    pthread_mutex_t mutex;
} ConnectionPool;

PooledConnection* connection_pool_get(ConnectionPool *pool, const char *host, int port) {
    pthread_mutex_lock(&pool->mutex);

    // Look for existing connection
    for (int i = 0; i < pool->num_connections; i++) {
        PooledConnection *conn = &pool->connections[i];
        if (!conn->in_use && strcmp(conn->host, host) == 0 && conn->port == port) {
            if (time(NULL) - conn->last_used > 300) {  // 5 minutes timeout
                // Connection too old, close it
                if (conn->ssl) SSL_shutdown(conn->ssl);
                close(conn->socket_fd);
                conn->socket_fd = -1;
            } else {
                conn->in_use = 1;
                conn->last_used = time(NULL);
                pthread_mutex_unlock(&pool->mutex);
                return conn;
            }
        }
    }

    // Create new connection if under limit
    if (pool->num_connections < pool->max_connections) {
        PooledConnection *conn = &pool->connections[pool->num_connections++];
        conn->host = strdup(host);
        conn->port = port;
        conn->socket_fd = create_tcp_connection(host, port);
        conn->ssl = NULL;
        conn->in_use = 1;
        conn->last_used = time(NULL);

        pthread_mutex_unlock(&pool->mutex);
        return conn;
    }

    pthread_mutex_unlock(&pool->mutex);
    return NULL;  // No available connections
}

void connection_pool_release(ConnectionPool *pool, PooledConnection *conn) {
    pthread_mutex_lock(&pool->mutex);
    conn->in_use = 0;
    conn->last_used = time(NULL);
    pthread_mutex_unlock(&pool->mutex);
}
\`\`\`

## Caching Strategies

### In-Memory Cache
\`\`\`c
#include <search.h>  // For tsearch family

typedef struct {
    char *key;
    void *value;
    size_t value_size;
    time_t expires_at;
} CacheEntry;

typedef struct {
    void *root;  // Balanced binary tree root
    size_t max_size;
    size_t current_size;
    pthread_mutex_t mutex;
} LRUCache;

int cache_compare(const void *a, const void *b) {
    return strcmp(((CacheEntry *)a)->key, ((CacheEntry *)b)->key);
}

void cache_put(LRUCache *cache, const char *key, void *value, size_t value_size, time_t ttl) {
    pthread_mutex_lock(&cache->mutex);

    CacheEntry *entry = malloc(sizeof(CacheEntry));
    entry->key = strdup(key);
    entry->value = malloc(value_size);
    memcpy(entry->value, value, value_size);
    entry->value_size = value_size;
    entry->expires_at = time(NULL) + ttl;

    // Remove existing entry if present
    CacheEntry **found = tfind(entry, &cache->root, cache_compare);
    if (found) {
        tdelete(*found, &cache->root, cache_compare);
        free((*found)->key);
        free((*found)->value);
        free(*found);
    }

    // Add new entry
    tsearch(entry, &cache->root, cache_compare);
    cache->current_size += value_size;

    // Implement LRU eviction if needed
    if (cache->current_size > cache->max_size) {
        // Remove least recently used entries
        // (Simplified - real implementation would track access times)
    }

    pthread_mutex_unlock(&cache->mutex);
}

void* cache_get(LRUCache *cache, const char *key, size_t *value_size) {
    pthread_mutex_lock(&cache->mutex);

    CacheEntry search_entry = {.key = (char *)key};
    CacheEntry **found = tfind(&search_entry, &cache->root, cache_compare);

    if (found && (*found)->expires_at > time(NULL)) {
        *value_size = (*found)->value_size;
        void *value = malloc(*value_size);
        memcpy(value, (*found)->value, *value_size);
        pthread_mutex_unlock(&cache->mutex);
        return value;
    }

    pthread_mutex_unlock(&cache->mutex);
    return NULL;
}
\`\`\`

## Monitoring and Logging

### Server Metrics Collection
\`\`\`c
typedef struct {
    unsigned long long total_requests;
    unsigned long long active_connections;
    unsigned long long bytes_sent;
    unsigned long long bytes_received;
    unsigned long long errors;
    time_t start_time;
    pthread_mutex_t mutex;
} ServerMetrics;

void metrics_init(ServerMetrics *metrics) {
    memset(metrics, 0, sizeof(ServerMetrics));
    metrics->start_time = time(NULL);
    pthread_mutex_init(&metrics->mutex, NULL);
}

void metrics_record_request(ServerMetrics *metrics, size_t bytes_received, size_t bytes_sent) {
    pthread_mutex_lock(&metrics->mutex);
    metrics->total_requests++;
    metrics->bytes_received += bytes_received;
    metrics->bytes_sent += bytes_sent;
    pthread_mutex_unlock(&metrics->mutex);
}

void metrics_connection_start(ServerMetrics *metrics) {
    pthread_mutex_lock(&metrics->mutex);
    metrics->active_connections++;
    pthread_mutex_unlock(&metrics->mutex);
}

void metrics_connection_end(ServerMetrics *metrics) {
    pthread_mutex_lock(&metrics->mutex);
    metrics->active_connections--;
    pthread_mutex_unlock(&metrics->mutex);
}

void metrics_log_stats(ServerMetrics *metrics) {
    pthread_mutex_lock(&metrics->mutex);

    time_t uptime = time(NULL) - metrics->start_time;
    double requests_per_second = (double)metrics->total_requests / uptime;

    printf("Server Statistics:\\n");
    printf("  Uptime: %ld seconds\\n", uptime);
    printf("  Total requests: %llu\\n", metrics->total_requests);
    printf("  Active connections: %llu\\n", metrics->active_connections);
    printf("  Requests/second: %.2f\\n", requests_per_second);
    printf("  Bytes sent: %llu\\n", metrics->bytes_sent);
    printf("  Bytes received: %llu\\n", metrics->bytes_received);
    printf("  Errors: %llu\\n", metrics->errors);

    pthread_mutex_unlock(&metrics->mutex);
}
\`\`\`

### Structured Logging
\`\`\`c
#include <syslog.h>

typedef enum {
    LOG_LEVEL_DEBUG,
    LOG_LEVEL_INFO,
    LOG_LEVEL_WARN,
    LOG_LEVEL_ERROR
} LogLevel;

typedef struct {
    LogLevel level;
    const char *facility;
    FILE *file;
    int use_syslog;
} Logger;

void logger_init(Logger *logger, LogLevel level, const char *facility, const char *filename) {
    logger->level = level;
    logger->facility = facility;

    if (filename) {
        logger->file = fopen(filename, "a");
        logger->use_syslog = 0;
    } else {
        logger->file = NULL;
        logger->use_syslog = 1;
        openlog(facility, LOG_PID | LOG_CONS, LOG_USER);
    }
}

void logger_log(Logger *logger, LogLevel level, const char *format, ...) {
    if (level < logger->level) return;

    va_list args;
    va_start(args, format);

    time_t now = time(NULL);
    struct tm *tm_info = localtime(&now);
    char timestamp[20];
    strftime(timestamp, sizeof(timestamp), "%Y-%m-%d %H:%M:%S", tm_info);

    const char *level_str;
    int syslog_level;

    switch (level) {
        case LOG_LEVEL_DEBUG:
            level_str = "DEBUG";
            syslog_level = LOG_DEBUG;
            break;
        case LOG_LEVEL_INFO:
            level_str = "INFO";
            syslog_level = LOG_INFO;
            break;
        case LOG_LEVEL_WARN:
            level_str = "WARN";
            syslog_level = LOG_WARNING;
            break;
        case LOG_LEVEL_ERROR:
            level_str = "ERROR";
            syslog_level = LOG_ERR;
            break;
    }

    if (logger->use_syslog) {
        vsyslog(syslog_level, format, args);
    } else if (logger->file) {
        fprintf(logger->file, "[%s] %s: ", timestamp, level_str);
        vfprintf(logger->file, format, args);
        fprintf(logger->file, "\\n");
        fflush(logger->file);
    }

    va_end(args);
}
\`\`\`

Building scalable network servers requires careful consideration of architecture patterns, load balancing, connection pooling, caching, and comprehensive monitoring. The choice of server architecture depends on the specific requirements for concurrency, latency, and resource utilization.`
};

