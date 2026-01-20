import { SubLesson } from '../../../../data/lessonsData';

export const topic_12_1: SubLesson = {
  id: '12.1',
  title: 'Advanced Thread Synchronization',
  status: 'demo',
  content: `# Advanced Thread Synchronization

## Semaphore Concepts

### Binary vs Counting Semaphores
- **Binary Semaphore**: Acts like a mutex (0 or 1)
- **Counting Semaphore**: Allows multiple threads to access a resource

### POSIX Semaphore API
\`\`\`c
#include <semaphore.h>

// Named semaphore (accessible by name)
sem_t *sem_open(const char *name, int oflag, ...);

// Unnamed semaphore
int sem_init(sem_t *sem, int pshared, unsigned int value);

// Operations
int sem_wait(sem_t *sem);    // Decrement (P operation)
int sem_post(sem_t *sem);    // Increment (V operation)
int sem_trywait(sem_t *sem); // Non-blocking wait
int sem_timedwait(sem_t *sem, const struct timespec *abs_timeout);

// Get current value
int sem_getvalue(sem_t *sem, int *sval);

// Cleanup
int sem_close(sem_t *sem);
int sem_unlink(const char *name);
int sem_destroy(sem_t *sem);
\`\`\`

### Producer-Consumer Problem with Semaphores
\`\`\`c
#include <semaphore.h>
#include <pthread.h>

#define BUFFER_SIZE 10

int buffer[BUFFER_SIZE];
int in = 0, out = 0;

sem_t empty_slots, full_slots;
pthread_mutex_t buffer_mutex;

void *producer(void *arg) {
    int item;
    while (1) {
        item = produce_item();

        sem_wait(&empty_slots);           // Wait for empty slot
        pthread_mutex_lock(&buffer_mutex);

        buffer[in] = item;                // Add to buffer
        in = (in + 1) % BUFFER_SIZE;

        pthread_mutex_unlock(&buffer_mutex);
        sem_post(&full_slots);            // Signal full slot
    }
    return NULL;
}

void *consumer(void *arg) {
    int item;
    while (1) {
        sem_wait(&full_slots);            // Wait for full slot
        pthread_mutex_lock(&buffer_mutex);

        item = buffer[out];               // Remove from buffer
        out = (out + 1) % BUFFER_SIZE;

        pthread_mutex_unlock(&buffer_mutex);
        sem_post(&empty_slots);           // Signal empty slot

        consume_item(item);
    }
    return NULL;
}
\`\`\`

## Reader-Writer Problem

### Reader-Writer Locks
\`\`\`c
#include <pthread.h>

pthread_rwlock_t rwlock = PTHREAD_RWLOCK_INITIALIZER;

// Reader
pthread_rwlock_rdlock(&rwlock);
// Read shared data
pthread_rwlock_unlock(&rwlock);

// Writer
pthread_rwlock_wrlock(&rwlock);
// Modify shared data
pthread_rwlock_unlock(&rwlock);
\`\`\`

### Reader Priority vs Writer Priority
- **Reader Priority**: Readers can starve writers
- **Writer Priority**: Writers can starve readers
- **Fair Solution**: Alternating access or priority queues

## Condition Variables Advanced Usage

### Spurious Wakeups
Condition variables can wake up spuriously (without being signaled). Always check the condition:

\`\`\`c
pthread_mutex_lock(&mutex);
while (!condition) {
    pthread_cond_wait(&cond, &mutex);
}
// Condition is now true
pthread_mutex_unlock(&mutex);
\`\`\`

### Timed Wait
\`\`\`c
#include <time.h>

struct timespec timeout;
clock_gettime(CLOCK_REALTIME, &timeout);
timeout.tv_sec += 5;  // 5 second timeout

pthread_mutex_lock(&mutex);
int result = pthread_cond_timedwait(&cond, &mutex, &timeout);
if (result == ETIMEDOUT) {
    // Timeout occurred
}
pthread_mutex_unlock(&mutex);
\`\`\`

### Broadcast vs Signal
- **pthread_cond_signal()**: Wakes one waiting thread
- **pthread_cond_broadcast()**: Wakes all waiting threads

## Barriers

### POSIX Thread Barriers
\`\`\`c
#include <pthread.h>

pthread_barrier_t barrier;
pthread_barrier_init(&barrier, NULL, num_threads);

void *thread_function(void *arg) {
    // Phase 1 work
    do_work();

    // Wait for all threads to reach this point
    pthread_barrier_wait(&barrier);

    // Phase 2 work (all threads synchronized)
    do_more_work();

    return NULL;
}
\`\`\`

### Custom Barrier Implementation
\`\`\`c
typedef struct {
    pthread_mutex_t mutex;
    pthread_cond_t cond;
    int count;
    int max_count;
} barrier_t;

void barrier_init(barrier_t *barrier, int count) {
    barrier->count = 0;
    barrier->max_count = count;
    pthread_mutex_init(&barrier->mutex, NULL);
    pthread_cond_init(&barrier->cond, NULL);
}

void barrier_wait(barrier_t *barrier) {
    pthread_mutex_lock(&barrier->mutex);
    barrier->count++;

    if (barrier->count == barrier->max_count) {
        barrier->count = 0;
        pthread_cond_broadcast(&barrier->cond);
    } else {
        pthread_cond_wait(&barrier->cond, &barrier->mutex);
    }

    pthread_mutex_unlock(&barrier->mutex);
}
\`\`\`

## Spin Locks

### Busy Waiting Locks
\`\`\`c
#include <stdatomic.h>

typedef atomic_flag spinlock_t;

void spinlock_init(spinlock_t *lock) {
    atomic_flag_clear(lock);
}

void spinlock_lock(spinlock_t *lock) {
    while (atomic_flag_test_and_set(lock)) {
        // Busy wait
        // Could add sched_yield() or pause instruction
    }
}

void spinlock_unlock(spinlock_t *lock) {
    atomic_flag_clear(lock);
}
\`\`\`

### When to Use Spin Locks
- **Pros**: Fast when lock is held briefly
- **Cons**: Waste CPU cycles when lock is contended
- **Best for**: Low-contention, short critical sections

## Atomic Operations

### C11 Atomic Types
\`\`\`c
#include <stdatomic.h>

atomic_int counter = ATOMIC_VAR_INIT(0);

// Atomic operations
atomic_fetch_add(&counter, 1);     // counter++
atomic_fetch_sub(&counter, 1);     // counter--
atomic_load(&counter);             // Read
atomic_store(&counter, 42);        // Write
\`\`\`

### Memory Ordering
- **memory_order_relaxed**: No ordering constraints
- **memory_order_acquire**: Acquire operation
- **memory_order_release**: Release operation
- **memory_order_acq_rel**: Both acquire and release
- **memory_order_seq_cst**: Sequential consistency

### Atomic Compare and Exchange
\`\`\`c
bool atomic_compare_exchange_weak(atomic_int *obj,
                                  int *expected, int desired);

bool atomic_compare_exchange_strong(atomic_int *obj,
                                    int *expected, int desired);
\`\`\`

## Lock-Free Data Structures

### Lock-Free Stack
\`\`\`c
#include <stdatomic.h>

typedef struct Node {
    int data;
    _Atomic(struct Node *) next;
} Node;

typedef struct {
    _Atomic(Node *) top;
} LockFreeStack;

void stack_push(LockFreeStack *stack, int data) {
    Node *new_node = malloc(sizeof(Node));
    new_node->data = data;

    Node *old_top;
    do {
        old_top = atomic_load(&stack->top);
        new_node->next = old_top;
    } while (!atomic_compare_exchange_weak(&stack->top,
                                           &old_top, new_node));
}

int stack_pop(LockFreeStack *stack) {
    Node *old_top;
    Node *new_top;
    do {
        old_top = atomic_load(&stack->top);
        if (old_top == NULL) return -1; // Empty stack
        new_top = old_top->next;
    } while (!atomic_compare_exchange_weak(&stack->top,
                                           &old_top, new_top));

    int data = old_top->data;
    free(old_top);
    return data;
}
\`\`\`

## Performance Considerations

### Lock Granularity
- **Coarse-grained locking**: Fewer locks, simpler code
- **Fine-grained locking**: More concurrency, complex code
- **Lock striping**: Divide data into independent segments

### Lock Contention
- Use **read-write locks** when reads >> writes
- **Try-lock** operations to avoid blocking
- **Lock-free algorithms** for high-performance needs

### Deadlock Prevention
1. **Lock Ordering**: Always acquire locks in the same order
2. **Lock Timeout**: Don't wait forever
3. **Deadlock Detection**: Monitor and break deadlocks
4. **Lock Hierarchy**: Define lock acquisition order

### Thread-Specific Storage
\`\`\`c
#include <threads.h>

thread_local int thread_specific_variable = 0;

// Or with POSIX:
#include <pthread.h>
pthread_key_t key;

void thread_cleanup(void *value) {
    free(value);
}

int main() {
    pthread_key_create(&key, thread_cleanup);
    // Use pthread_setspecific() and pthread_getspecific()
}
\`\`\`

## Common Pitfalls

1. **Priority Inversion**: High-priority thread waits for low-priority thread
2. **Convoying**: Threads queue up behind slow thread holding lock
3. **Lock Convoys**: Serialization due to lock contention
4. **ABA Problem**: In lock-free algorithms, value changes from A to B and back to A

### Solutions
- **Priority Inheritance**: Boost priority of lock holder
- **Backoff Algorithms**: Exponential backoff on contention
- **Read-Copy-Update (RCU)**: For read-mostly data structures
- **Tagged Pointers**: To detect ABA problems`
};

