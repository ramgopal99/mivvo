import { SubLesson } from '../../../../data/lessonsData';

export const topic_11_5: SubLesson = {
  id: '11.5',
  title: 'Multi-threading in C',
  status: 'demo',
  content: `# Multi-threading in C

## POSIX Threads (Pthreads)

### Thread Creation
\`\`\`c
#include <pthread.h>

void *thread_function(void *arg) {
    printf("Thread executing\\n");
    return NULL;
}

int main() {
    pthread_t thread_id;

    // Create thread
    int result = pthread_create(&thread_id, NULL,
                               thread_function, NULL);

    if (result != 0) {
        perror("pthread_create");
        return 1;
    }

    // Wait for thread to complete
    pthread_join(thread_id, NULL);

    return 0;
}
\`\`\`

### Thread Arguments
\`\`\`c
struct thread_data {
    int id;
    char *message;
};

void *print_thread(void *arg) {
    struct thread_data *data = (struct thread_data *)arg;
    printf("Thread %d: %s\\n", data->id, data->message);
    return NULL;
}

int main() {
    pthread_t threads[2];
    struct thread_data thread_args[2];

    for (int i = 0; i < 2; i++) {
        thread_args[i].id = i;
        thread_args[i].message = "Hello from thread";

        pthread_create(&threads[i], NULL, print_thread,
                      (void *)&thread_args[i]);
    }

    for (int i = 0; i < 2; i++) {
        pthread_join(threads[i], NULL);
    }

    return 0;
}
\`\`\`

## Thread Synchronization

### Mutexes
\`\`\`c
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

void *thread_safe_function(void *arg) {
    pthread_mutex_lock(&mutex);
    // Critical section
    printf("Thread-safe operation\\n");
    pthread_mutex_unlock(&mutex);

    return NULL;
}
\`\`\`

### Condition Variables
\`\`\`c
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;
int ready = 0;

void *producer(void *arg) {
    pthread_mutex_lock(&mutex);
    ready = 1;
    pthread_cond_signal(&cond);
    pthread_mutex_unlock(&mutex);
    return NULL;
}

void *consumer(void *arg) {
    pthread_mutex_lock(&mutex);
    while (!ready) {
        pthread_cond_wait(&cond, &mutex);
    }
    printf("Resource is ready\\n");
    pthread_mutex_unlock(&mutex);
    return NULL;
}
\`\`\`

### Read-Write Locks
\`\`\`c
pthread_rwlock_t rwlock = PTHREAD_RWLOCK_INITIALIZER;

// Multiple readers can access simultaneously
pthread_rwlock_rdlock(&rwlock);
// Read operation
pthread_rwlock_unlock(&rwlock);

// Only one writer at a time
pthread_rwlock_wrlock(&rwlock);
// Write operation
pthread_rwlock_unlock(&rwlock);
\`\`\`

## Thread Safety

### Thread-Safe Functions
- **reentrant**: Can be interrupted and called again safely
- **thread-safe**: Safe to call from multiple threads

### Making Code Thread-Safe
1. **Avoid global variables**: Use thread-local storage
2. **Use proper synchronization**: Mutexes, condition variables
3. **Atomic operations**: For simple operations
4. **Immutable data**: Read-only shared data

### Thread-Local Storage
\`\`\`c
__thread int thread_local_variable = 0;

void *thread_function(void *arg) {
    thread_local_variable = 42;
    // Each thread has its own copy
    return NULL;
}
\`\`\`

## Thread Cancellation

### Cancellation Points
\`\`\`c
// Enable cancellation
pthread_setcancelstate(PTHREAD_CANCEL_ENABLE, NULL);
pthread_setcanceltype(PTHREAD_CANCEL_DEFERRED, NULL);

// Cancellation point functions:
// read(), write(), open(), close(), wait(), etc.

void *thread_func(void *arg) {
    while (1) {
        // Do work - cancellation can occur here
        sleep(1);  // Cancellation point
    }
    return NULL;
}

// Cancel thread
pthread_cancel(thread_id);
\`\`\`

## Thread Attributes

### Stack Size
\`\`\`c
pthread_attr_t attr;
pthread_attr_init(&attr);
pthread_attr_setstacksize(&attr, 1024 * 1024);  // 1MB

pthread_create(&thread, &attr, thread_func, NULL);
pthread_attr_destroy(&attr);
\`\`\`

### Detach State
\`\`\`c
// Detached thread - resources automatically freed
pthread_attr_setdetachstate(&attr, PTHREAD_CREATE_DETACHED);

// Joinable thread (default) - requires pthread_join
pthread_attr_setdetachstate(&attr, PTHREAD_CREATE_JOINABLE);
\`\`\`

## Thread Pools

### Basic Thread Pool Concept
\`\`\`c
#define MAX_THREADS 4

typedef struct {
    pthread_t threads[MAX_THREADS];
    // Task queue would go here
} thread_pool;

// Worker thread function
void *worker_thread(void *arg) {
    while (1) {
        // Get task from queue
        // Process task
        // Repeat
    }
    return NULL;
}
\`\`\`

## Performance Considerations

### Context Switching Overhead
- Minimize thread creation/destruction
- Use thread pools for frequent tasks
- Avoid excessive synchronization

### False Sharing
\`\`\`c
// Bad - false sharing
struct {
    int thread1_data;
    int thread2_data;  // On same cache line as thread1_data
} shared;

// Good - padding prevents false sharing
struct {
    int thread1_data;
    char padding[64];  // Cache line size
    int thread2_data;
} shared;
\`\`\`

### Lock Contention
- Use fine-grained locking
- Prefer reader-writer locks when appropriate
- Consider lock-free data structures

## Common Pitfalls

1. **Race Conditions**: Multiple threads accessing shared data
2. **Deadlocks**: Circular wait for resources
3. **Starvation**: Thread never gets access to resources
4. **Forgotten Unlocks**: Mutex not released
5. **Thread Leaks**: Detached threads not properly managed

### Avoiding Deadlocks
1. **Lock ordering**: Always acquire locks in same order
2. **Lock timeouts**: Don't wait forever
3. **Try-lock**: Non-blocking lock attempts
4. **Lock hierarchy**: Define lock acquisition order
`
};

