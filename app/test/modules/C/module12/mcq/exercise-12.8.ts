import { Exercise } from '../../../../data/lessonsData';

export const exercise_12_8: Exercise = {
  id: "12.8",
  title: 'Advanced Concurrency Programming Exercises',
  status: 'demo',
  type: 'code',
  codeQuestions: [
    {
      id: "lock_free_stack",
      question: `## Lock-Free Stack Implementation

Implement a lock-free stack using atomic operations. The stack should support push and pop operations that work correctly with multiple threads.

**Requirements:**
- Use C11 atomic operations
- Handle the ABA problem using tagged pointers
- Implement proper memory management
- Ensure thread safety without locks

**Example Usage:**
\`\`\`c
LockFreeStack stack;
stack_init(&stack);

// In multiple threads
stack_push(&stack, 42);
int value = stack_pop(&stack);
\`\`\`

**Hints:**
- Use atomic_compare_exchange_weak for CAS operations
- Implement tagged pointers to prevent ABA
- Consider using hazard pointers for memory reclamation`,
      solution: `#include <stdatomic.h>
#include <stdlib.h>
#include <stdio.h>

// Tagged pointer to prevent ABA problem
typedef struct TaggedPtr {
    uintptr_t ptr;
    uintptr_t tag;
} TaggedPtr;

typedef struct Node {
    int data;
    _Atomic(TaggedPtr) next;
} Node;

typedef struct {
    _Atomic(TaggedPtr) top;
} LockFreeStack;

void stack_init(LockFreeStack *stack) {
    atomic_store(&stack->top, (TaggedPtr){0, 0});
}

Node* create_node(int data) {
    Node *node = malloc(sizeof(Node));
    node->data = data;
    return node;
}

void stack_push(LockFreeStack *stack, int value) {
    Node *new_node = create_node(value);
    TaggedPtr old_top, new_top;

    do {
        old_top = atomic_load(&stack->top);
        new_node->next._value = old_top;
        new_top.ptr = (uintptr_t)new_node;
        new_top.tag = old_top.tag + 1;
    } while (!atomic_compare_exchange_weak(&stack->top, &old_top, new_top));
}

int stack_pop(LockFreeStack *stack) {
    TaggedPtr old_top, new_top;
    Node *node;

    do {
        old_top = atomic_load(&stack->top);
        if (old_top.ptr == 0) {
            return -1; // Empty stack
        }

        node = (Node *)old_top.ptr;
        TaggedPtr next = atomic_load(&node->next);
        new_top.ptr = next.ptr;
        new_top.tag = old_top.tag + 1;
    } while (!atomic_compare_exchange_weak(&stack->top, &old_top, new_top));

    int value = node->data;
    // In a real implementation, you'd use hazard pointers or
    // reference counting for safe memory reclamation
    free(node);

    return value;
}

// Example usage
int main() {
    LockFreeStack stack;
    stack_init(&stack);

    stack_push(&stack, 10);
    stack_push(&stack, 20);
    stack_push(&stack, 30);

    printf("Popped: %d\\n", stack_pop(&stack)); // 30
    printf("Popped: %d\\n", stack_pop(&stack)); // 20
    printf("Popped: %d\\n", stack_pop(&stack)); // 10
    printf("Popped: %d\\n", stack_pop(&stack)); // -1 (empty)

    return 0;
}`
    },
    {
      id: "reader_writer_lock",
      question: `## Reader-Writer Lock Implementation

Implement a reader-writer lock that allows multiple readers to access a resource simultaneously but gives exclusive access to writers.

**Requirements:**
- Use POSIX threads
- Implement writer priority to prevent writer starvation
- Provide fair access between readers and writers
- Include proper error handling

**Example Usage:**
\`\`\`c
RWLock lock;
rwlock_init(&lock);

rwlock_read_lock(&lock);
// Read operations
rwlock_read_unlock(&lock);

rwlock_write_lock(&lock);
// Write operations
rwlock_write_unlock(&lock);
\`\`\`

**Implementation Notes:**
- Use a mutex and condition variables
- Track the number of active readers and waiting writers
- Ensure writers get priority when they arrive`,
      solution: `#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    pthread_mutex_t mutex;
    pthread_cond_t readers_cond;
    pthread_cond_t writers_cond;
    int readers_active;
    int writers_waiting;
    int writers_active;
} RWLock;

void rwlock_init(RWLock *lock) {
    pthread_mutex_init(&lock->mutex, NULL);
    pthread_cond_init(&lock->readers_cond, NULL);
    pthread_cond_init(&lock->writers_cond, NULL);
    lock->readers_active = 0;
    lock->writers_waiting = 0;
    lock->writers_active = 0;
}

void rwlock_read_lock(RWLock *lock) {
    pthread_mutex_lock(&lock->mutex);

    // Wait while there are active or waiting writers
    while (lock->writers_active > 0 || lock->writers_waiting > 0) {
        pthread_cond_wait(&lock->readers_cond, &lock->mutex);
    }

    lock->readers_active++;
    pthread_mutex_unlock(&lock->mutex);
}

void rwlock_read_unlock(RWLock *lock) {
    pthread_mutex_lock(&lock->mutex);
    lock->readers_active--;

    // If this is the last reader and there are waiting writers,
    // wake up one writer
    if (lock->readers_active == 0 && lock->writers_waiting > 0) {
        pthread_cond_signal(&lock->writers_cond);
    }

    pthread_mutex_unlock(&lock->mutex);
}

void rwlock_write_lock(RWLock *lock) {
    pthread_mutex_lock(&lock->mutex);
    lock->writers_waiting++;

    // Wait while there are active readers or writers
    while (lock->readers_active > 0 || lock->writers_active > 0) {
        pthread_cond_wait(&lock->writers_cond, &lock->mutex);
    }

    lock->writers_waiting--;
    lock->writers_active++;
    pthread_mutex_unlock(&lock->mutex);
}

void rwlock_write_unlock(RWLock *lock) {
    pthread_mutex_lock(&lock->mutex);
    lock->writers_active--;

    // If there are waiting writers, wake up one writer
    // Otherwise, wake up all waiting readers
    if (lock->writers_waiting > 0) {
        pthread_cond_signal(&lock->writers_cond);
    } else {
        pthread_cond_broadcast(&lock->readers_cond);
    }

    pthread_mutex_unlock(&lock->mutex);
}

void rwlock_destroy(RWLock *lock) {
    pthread_mutex_destroy(&lock->mutex);
    pthread_cond_destroy(&lock->readers_cond);
    pthread_cond_destroy(&lock->writers_cond);
}

// Example usage
RWLock lock;
int shared_data = 0;

void* reader_thread(void *arg) {
    rwlock_read_lock(&lock);
    printf("Reader: shared_data = %d\\n", shared_data);
    rwlock_read_unlock(&lock);
    return NULL;
}

void* writer_thread(void *arg) {
    rwlock_write_lock(&lock);
    shared_data++;
    printf("Writer: shared_data = %d\\n", shared_data);
    rwlock_write_unlock(&lock);
    return NULL;
}

int main() {
    rwlock_init(&lock);

    pthread_t threads[6];

    // Create 4 reader threads and 2 writer threads
    for (int i = 0; i < 4; i++) {
        pthread_create(&threads[i], NULL, reader_thread, NULL);
    }

    for (int i = 4; i < 6; i++) {
        pthread_create(&threads[i], NULL, writer_thread, NULL);
    }

    // Wait for all threads
    for (int i = 0; i < 6; i++) {
        pthread_join(threads[i], NULL);
    }

    rwlock_destroy(&lock);
    return 0;
}`
    }
  ]
};
