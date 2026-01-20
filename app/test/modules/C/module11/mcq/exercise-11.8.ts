import { Exercise } from '../../../../data/lessonsData';

export const exercise_11_8: Exercise = {
  id: "11.8",
  title: 'System Programming Coding Exercises',
  status: 'demo',
  type: 'code',
  codeQuestions: [
    {
      id: "file_copy",
      question: `## File Copy Utility

Write a C program that copies the contents of one file to another file. The program should:

1. Take source and destination file names as command line arguments
2. Use binary mode for copying (to handle all file types)
3. Display progress information
4. Handle errors appropriately

**Requirements:**
- Use appropriate buffer size for efficiency
- Handle large files without running out of memory
- Provide clear error messages
- Close all file handles properly

**Example Usage:**
\`\`\`bash
./filecopy source.txt destination.txt
\`\`\``,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BUFFER_SIZE 8192

int main(int argc, char *argv[]) {
    if (argc != 3) {
        printf("Usage: %s <source> <destination>\\n", argv[0]);
        return 1;
    }

    FILE *source = fopen(argv[1], "rb");
    if (source == NULL) {
        perror("Error opening source file");
        return 1;
    }

    FILE *dest = fopen(argv[2], "wb");
    if (dest == NULL) {
        perror("Error opening destination file");
        fclose(source);
        return 1;
    }

    char buffer[BUFFER_SIZE];
    size_t bytes_read;
    size_t total_bytes = 0;

    printf("Copying file...\\n");

    while ((bytes_read = fread(buffer, 1, BUFFER_SIZE, source)) > 0) {
        size_t bytes_written = fwrite(buffer, 1, bytes_read, dest);
        if (bytes_written != bytes_read) {
            perror("Error writing to destination file");
            fclose(source);
            fclose(dest);
            return 1;
        }
        total_bytes += bytes_read;
        printf("\\rCopied: %zu bytes", total_bytes);
        fflush(stdout);
    }

    if (ferror(source)) {
        perror("Error reading from source file");
        fclose(source);
        fclose(dest);
        return 1;
    }

    printf("\\nFile copy completed successfully!\\n");
    printf("Total bytes copied: %zu\\n", total_bytes);

    fclose(source);
    fclose(dest);

    return 0;
}`
    },
    {
      id: "thread_pool",
      question: `## Simple Thread Pool

Implement a basic thread pool in C using POSIX threads. The thread pool should:

1. Create a fixed number of worker threads
2. Accept work tasks (functions with arguments)
3. Distribute work among available threads
4. Wait for all work to complete

**Requirements:**
- Use a thread-safe task queue
- Implement proper synchronization
- Handle thread creation and cleanup
- Provide a clean API

**Example Usage:**
\`\`\`c
// Create thread pool with 4 threads
ThreadPool *pool = threadpool_create(4);

// Add work tasks
for (int i = 0; i < 10; i++) {
    threadpool_add_task(pool, worker_function, (void*)&task_data[i]);
}

// Wait for completion
threadpool_wait(pool);

// Cleanup
threadpool_destroy(pool);
\`\`\``,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <stdbool.h>

// Task structure
typedef struct {
    void (*function)(void *arg);
    void *arg;
} Task;

// Thread pool structure
typedef struct {
    pthread_t *threads;
    int num_threads;
    Task *task_queue;
    int queue_size;
    int queue_capacity;
    int queue_front;
    int queue_rear;
    pthread_mutex_t queue_mutex;
    pthread_cond_t queue_cond;
    pthread_cond_t completion_cond;
    int active_tasks;
    bool shutdown;
} ThreadPool;

// Function declarations
ThreadPool* threadpool_create(int num_threads);
void threadpool_destroy(ThreadPool *pool);
bool threadpool_add_task(ThreadPool *pool, void (*function)(void *), void *arg);
void threadpool_wait(ThreadPool *pool);

static void* worker_thread(void *arg);
static bool queue_is_empty(ThreadPool *pool);
static bool queue_is_full(ThreadPool *pool);
static void queue_push(ThreadPool *pool, Task task);
static Task queue_pop(ThreadPool *pool);

// Worker thread function
static void* worker_thread(void *arg) {
    ThreadPool *pool = (ThreadPool *)arg;

    while (true) {
        pthread_mutex_lock(&pool->queue_mutex);

        // Wait for tasks or shutdown signal
        while (queue_is_empty(pool) && !pool->shutdown) {
            pthread_cond_wait(&pool->queue_cond, &pool->queue_mutex);
        }

        // Exit if shutting down and no tasks
        if (pool->shutdown && queue_is_empty(pool)) {
            pthread_mutex_unlock(&pool->queue_mutex);
            break;
        }

        // Get task from queue
        Task task = queue_pop(pool);
        pool->active_tasks++;
        pthread_mutex_unlock(&pool->queue_mutex);

        // Execute task
        task.function(task.arg);

        // Task completed
        pthread_mutex_lock(&pool->queue_mutex);
        pool->active_tasks--;
        if (pool->active_tasks == 0 && queue_is_empty(pool)) {
            pthread_cond_signal(&pool->completion_cond);
        }
        pthread_mutex_unlock(&pool->queue_mutex);
    }

    return NULL;
}

// Queue helper functions
static bool queue_is_empty(ThreadPool *pool) {
    return pool->queue_size == 0;
}

static bool queue_is_full(ThreadPool *pool) {
    return pool->queue_size == pool->queue_capacity;
}

static void queue_push(ThreadPool *pool, Task task) {
    pool->task_queue[pool->queue_rear] = task;
    pool->queue_rear = (pool->queue_rear + 1) % pool->queue_capacity;
    pool->queue_size++;
}

static Task queue_pop(ThreadPool *pool) {
    Task task = pool->task_queue[pool->queue_front];
    pool->queue_front = (pool->queue_front + 1) % pool->queue_capacity;
    pool->queue_size--;
    return task;
}

// Public API implementation
ThreadPool* threadpool_create(int num_threads) {
    ThreadPool *pool = (ThreadPool *)malloc(sizeof(ThreadPool));
    if (pool == NULL) return NULL;

    pool->num_threads = num_threads;
    pool->queue_capacity = 100; // Fixed capacity for simplicity
    pool->queue_size = 0;
    pool->queue_front = 0;
    pool->queue_rear = 0;
    pool->active_tasks = 0;
    pool->shutdown = false;

    // Allocate resources
    pool->threads = (pthread_t *)malloc(sizeof(pthread_t) * num_threads);
    pool->task_queue = (Task *)malloc(sizeof(Task) * pool->queue_capacity);

    if (pool->threads == NULL || pool->task_queue == NULL) {
        free(pool->threads);
        free(pool->task_queue);
        free(pool);
        return NULL;
    }

    // Initialize synchronization primitives
    pthread_mutex_init(&pool->queue_mutex, NULL);
    pthread_cond_init(&pool->queue_cond, NULL);
    pthread_cond_init(&pool->completion_cond, NULL);

    // Create threads
    for (int i = 0; i < num_threads; i++) {
        if (pthread_create(&pool->threads[i], NULL, worker_thread, pool) != 0) {
            // Handle thread creation failure
            pool->shutdown = true;
            threadpool_destroy(pool);
            return NULL;
        }
    }

    return pool;
}

void threadpool_destroy(ThreadPool *pool) {
    if (pool == NULL) return;

    // Signal shutdown
    pthread_mutex_lock(&pool->queue_mutex);
    pool->shutdown = true;
    pthread_cond_broadcast(&pool->queue_cond);
    pthread_mutex_unlock(&pool->queue_mutex);

    // Wait for threads to finish
    for (int i = 0; i < pool->num_threads; i++) {
        pthread_join(pool->threads[i], NULL);
    }

    // Cleanup resources
    pthread_mutex_destroy(&pool->queue_mutex);
    pthread_cond_destroy(&pool->queue_cond);
    pthread_cond_destroy(&pool->completion_cond);

    free(pool->threads);
    free(pool->task_queue);
    free(pool);
}

bool threadpool_add_task(ThreadPool *pool, void (*function)(void *), void *arg) {
    if (pool == NULL || function == NULL) return false;

    Task task = {function, arg};

    pthread_mutex_lock(&pool->queue_mutex);

    // Wait if queue is full (simplified - in real implementation you'd want to handle this better)
    while (queue_is_full(pool) && !pool->shutdown) {
        pthread_cond_wait(&pool->queue_cond, &pool->queue_mutex);
    }

    if (pool->shutdown) {
        pthread_mutex_unlock(&pool->queue_mutex);
        return false;
    }

    queue_push(pool, task);
    pthread_cond_signal(&pool->queue_cond);
    pthread_mutex_unlock(&pool->queue_mutex);

    return true;
}

void threadpool_wait(ThreadPool *pool) {
    if (pool == NULL) return;

    pthread_mutex_lock(&pool->queue_mutex);
    while (pool->active_tasks > 0 || !queue_is_empty(pool)) {
        pthread_cond_wait(&pool->completion_cond, &pool->queue_mutex);
    }
    pthread_mutex_unlock(&pool->queue_mutex);
}

// Example usage
void example_task(void *arg) {
    int *num = (int *)arg;
    printf("Processing task %d\\n", *num);
    sleep(1); // Simulate work
    printf("Completed task %d\\n", *num);
}

int main() {
    ThreadPool *pool = threadpool_create(4);
    if (pool == NULL) {
        printf("Failed to create thread pool\\n");
        return 1;
    }

    // Add some tasks
    for (int i = 0; i < 10; i++) {
        int *task_num = (int *)malloc(sizeof(int));
        *task_num = i;
        threadpool_add_task(pool, example_task, task_num);
    }

    // Wait for completion
    threadpool_wait(pool);

    // Cleanup
    threadpool_destroy(pool);

    printf("All tasks completed\\n");
    return 0;
}`
    }
  ]
};
