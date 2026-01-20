import { Exercise } from '../../../../data/lessonsData';

export const exercise_14_8: Exercise = {
  id: "14.8",
  title: 'Advanced C Features Coding Exercises',
  status: 'demo',
  type: 'code',
  codeQuestions: [
    {
      id: "macro_metaprogramming",
      question: `## Advanced Macro Metaprogramming

Create a sophisticated macro system that can generate type-safe containers and algorithms. Implement:

1. **Generic Container Generation**: Create vector-like containers for different types
2. **Algorithm Generation**: Generate sort/search algorithms for containers
3. **Type Safety**: Ensure compile-time type checking
4. **Memory Management**: Proper allocation/deallocation

**Requirements:**
- Use X-macros for repetitive code generation
- Implement container operations (push, pop, insert, remove)
- Create generic algorithms (sort, find, filter)
- Handle different data types safely
- Provide clean API with proper error handling

**Example Usage:**
\`\`\`c
// Generate vector for int
GENERATE_VECTOR(int_vector, int)

// Generate algorithms
GENERATE_ALGORITHMS(int_vector, int)

int main() {
    int_vector vec;
    int_vector_init(&vec);

    int_vector_push(&vec, 5);
    int_vector_push(&vec, 2);
    int_vector_push(&vec, 8);

    // Sort the vector
    int_vector_sort(&vec);

    // Find element
    size_t index = int_vector_find(&vec, 5);

    int_vector_free(&vec);
    return 0;
}
\`\`\``,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>

// Generic vector container generator
#define GENERATE_VECTOR(name, type) \\
typedef struct { \\
    type *data; \\
    size_t size; \\
    size_t capacity; \\
} name; \\
\\
static inline void name##_init(name *vec) { \\
    vec->data = NULL; \\
    vec->size = 0; \\
    vec->capacity = 0; \\
} \\
\\
static inline void name##_free(name *vec) { \\
    free(vec->data); \\
    vec->data = NULL; \\
    vec->size = 0; \\
    vec->capacity = 0; \\
} \\
\\
static inline void name##_reserve(name *vec, size_t new_capacity) { \\
    if (new_capacity <= vec->capacity) return; \\
    vec->capacity = new_capacity; \\
    vec->data = realloc(vec->data, vec->capacity * sizeof(type)); \\
    assert(vec->data != NULL); \\
} \\
\\
static inline void name##_push(name *vec, type value) { \\
    if (vec->size >= vec->capacity) { \\
        size_t new_cap = vec->capacity ? vec->capacity * 2 : 8; \\
        name##_reserve(vec, new_cap); \\
    } \\
    vec->data[vec->size++] = value; \\
} \\
\\
static inline type name##_pop(name *vec) { \\
    assert(vec->size > 0); \\
    return vec->data[--vec->size]; \\
} \\
\\
static inline type name##_get(const name *vec, size_t index) { \\
    assert(index < vec->size); \\
    return vec->data[index]; \\
} \\
\\
static inline void name##_set(name *vec, size_t index, type value) { \\
    assert(index < vec->size); \\
    vec->data[index] = value; \\
} \\
\\
static inline size_t name##_size(const name *vec) { \\
    return vec->size; \\
} \\
\\
static inline int name##_empty(const name *vec) { \\
    return vec->size == 0; \\
}

// Algorithm generator using _Generic for type safety
#define GENERATE_ALGORITHMS(name, type) \\
static inline void name##_swap_elements(name *vec, size_t i, size_t j) { \\
    type temp = vec->data[i]; \\
    vec->data[i] = vec->data[j]; \\
    vec->data[j] = temp; \\
} \\
\\
static inline int name##_compare(type a, type b) { \\
    return (a > b) - (a < b); \\
} \\
\\
static inline void name##_sort(name *vec) { \\
    for (size_t i = 0; i < vec->size; i++) { \\
        for (size_t j = i + 1; j < vec->size; j++) { \\
            if (name##_compare(vec->data[i], vec->data[j]) > 0) { \\
                name##_swap_elements(vec, i, j); \\
            } \\
        } \\
    } \\
} \\
\\
static inline size_t name##_find(const name *vec, type value) { \\
    for (size_t i = 0; i < vec->size; i++) { \\
        if (vec->data[i] == value) { \\
            return i; \\
        } \\
    } \\
    return (size_t)-1; \\
} \\
\\
static inline size_t name##_binary_search(const name *vec, type value) { \\
    size_t left = 0; \\
    size_t right = vec->size; \\
    \\
    while (left < right) { \\
        size_t mid = left + (right - left) / 2; \\
        int cmp = name##_compare(vec->data[mid], value); \\
        if (cmp < 0) { \\
            left = mid + 1; \\
        } else if (cmp > 0) { \\
            right = mid; \\
        } else { \\
            return mid; \\
        } \\
    } \\
    return (size_t)-1; \\
}

// Generate vectors for different types
GENERATE_VECTOR(int_vector, int)
GENERATE_VECTOR(double_vector, double)
GENERATE_ALGORITHMS(int_vector, int)
GENERATE_ALGORITHMS(double_vector, double)

// Example usage
int main() {
    // Integer vector
    int_vector int_vec;
    int_vector_init(&int_vec);

    int_vector_push(&int_vec, 5);
    int_vector_push(&int_vec, 2);
    int_vector_push(&int_vec, 8);
    int_vector_push(&int_vec, 1);

    printf("Original: ");
    for (size_t i = 0; i < int_vector_size(&int_vec); i++) {
        printf("%d ", int_vector_get(&int_vec, i));
    }
    printf("\\n");

    int_vector_sort(&int_vec);

    printf("Sorted: ");
    for (size_t i = 0; i < int_vector_size(&int_vec); i++) {
        printf("%d ", int_vector_get(&int_vec, i));
    }
    printf("\\n");

    size_t index = int_vector_find(&int_vec, 5);
    printf("Found 5 at index: %zu\\n", index);

    size_t bs_index = int_vector_binary_search(&int_vec, 5);
    printf("Binary search found 5 at index: %zu\\n", bs_index);

    int_vector_free(&int_vec);

    // Double vector
    double_vector double_vec;
    double_vector_init(&double_vec);

    double_vector_push(&double_vec, 3.14);
    double_vector_push(&double_vec, 1.41);
    double_vector_push(&double_vec, 2.71);

    double_vector_sort(&double_vec);

    printf("Sorted doubles: ");
    for (size_t i = 0; i < double_vector_size(&double_vec); i++) {
        printf("%.2f ", double_vector_get(&double_vec, i));
    }
    printf("\\n");

    double_vector_free(&double_vec);

    return 0;
}`
    },
    {
      id: "atomic_data_structures",
      question: `## Lock-Free Atomic Data Structures

Implement a lock-free stack and queue using C11 atomic operations. The implementations should be:

1. **Thread-Safe**: Multiple threads can operate concurrently
2. **Lock-Free**: Progress guarantees without locks
3. **ABA-Safe**: Protected against ABA problems
4. **Memory Efficient**: Proper memory management

**Requirements:**
- Use atomic operations for synchronization
- Implement hazard pointers or similar for memory safety
- Handle concurrent push/pop operations
- Provide clean API with proper initialization/cleanup

**Example Usage:**
\`\`\`c
// Lock-free stack
AtomicStack stack;
atomic_stack_init(&stack);

// In multiple threads
atomic_stack_push(&stack, 42);
int value = atomic_stack_pop(&stack);

// Lock-free queue
AtomicQueue queue;
atomic_queue_init(&queue);

atomic_queue_enqueue(&queue, 100);
int dequeued = atomic_queue_dequeue(&queue);
\`\`\`

**Implementation Notes:**
- Use tagged pointers to prevent ABA problems
- Implement hazard pointers for safe memory reclamation
- Ensure proper memory ordering with atomic operations
- Handle edge cases (empty containers, memory allocation failures)`,
      solution: `#include <stdatomic.h>
#include <stdlib.h>
#include <stdio.h>
#include <stdint.h>

// Hazard pointer implementation for safe memory reclamation
#define MAX_THREADS 8
#define MAX_HAZARD_POINTERS 2

typedef struct HazardPointer {
    atomic_uintptr_t pointer;
} HazardPointer;

typedef struct HazardPointerRecord {
    HazardPointer hazard_pointers[MAX_HAZARD_POINTERS];
    struct HazardPointerRecord *next;
} HazardPointerRecord;

static atomic_uintptr_t retired_list;
static _Atomic(HazardPointerRecord *) head_hazard_pointers;

// Get hazard pointer for current thread
static HazardPointerRecord *get_hazard_pointer_record() {
    // Simplified - in real implementation, use thread-local storage
    static HazardPointerRecord record;
    return &record;
}

static void hazard_pointer_set(HazardPointerRecord *record, int index, void *ptr) {
    atomic_store(&record->hazard_pointers[index].pointer, (uintptr_t)ptr);
}

static void *hazard_pointer_get(HazardPointerRecord *record, int index) {
    return (void *)atomic_load(&record->hazard_pointers[index].pointer);
}

static bool hazard_pointer_contains(void *ptr) {
    HazardPointerRecord *current = atomic_load(&head_hazard_pointers);
    while (current) {
        for (int i = 0; i < MAX_HAZARD_POINTERS; i++) {
            if (hazard_pointer_get(current, i) == ptr) {
                return true;
            }
        }
        current = current->next;
    }
    return false;
}

// Atomic Stack Implementation
typedef struct Node {
    int data;
    _Atomic(struct Node *) next;
} Node;

typedef struct {
    _Atomic(Node *) top;
    atomic_uintptr_t pop_count;
} AtomicStack;

void atomic_stack_init(AtomicStack *stack) {
    atomic_store(&stack->top, NULL);
    atomic_store(&stack->pop_count, 0);
}

Node *create_node(int data) {
    Node *node = malloc(sizeof(Node));
    node->data = data;
    atomic_store(&node->next, NULL);
    return node;
}

void atomic_stack_push(AtomicStack *stack, int value) {
    Node *new_node = create_node(value);
    Node *old_top;

    do {
        old_top = atomic_load(&stack->top);
        atomic_store(&new_node->next, old_top);
    } while (!atomic_compare_exchange_weak(&stack->top, &old_top, new_node));
}

int atomic_stack_pop(AtomicStack *stack) {
    HazardPointerRecord *hp_record = get_hazard_pointer_record();
    Node *old_top;
    Node *new_top;

    while (1) {
        old_top = atomic_load(&stack->top);
        hazard_pointer_set(hp_record, 0, old_top);

        if (old_top != atomic_load(&stack->top)) {
            continue; // Hazard pointer not valid
        }

        if (old_top == NULL) {
            hazard_pointer_set(hp_record, 0, NULL);
            return -1; // Empty stack
        }

        new_top = atomic_load(&old_top->next);

        if (atomic_compare_exchange_weak(&stack->top, &old_top, new_top)) {
            hazard_pointer_set(hp_record, 0, NULL);
            int value = old_top->data;

            // Safe memory reclamation would go here
            // For simplicity, we'll leak memory in this example
            // Real implementation would use hazard pointers properly

            return value;
        }
    }
}

// Atomic Queue Implementation (Michael-Scott)
typedef struct QueueNode {
    int data;
    _Atomic(struct QueueNode *) next;
} QueueNode;

typedef struct {
    _Atomic(QueueNode *) head;
    _Atomic(QueueNode *) tail;
} AtomicQueue;

void atomic_queue_init(AtomicQueue *queue) {
    QueueNode *dummy = create_node(0); // Dummy node
    atomic_store(&queue->head, dummy);
    atomic_store(&queue->tail, dummy);
}

void atomic_queue_enqueue(AtomicQueue *queue, int value) {
    QueueNode *new_node = create_node(value);
    QueueNode *tail;

    while (1) {
        tail = atomic_load(&queue->tail);
        QueueNode *next = atomic_load(&tail->next);

        if (tail == atomic_load(&queue->tail)) {
            if (next == NULL) {
                // Try to link new node
                if (atomic_compare_exchange_weak(&tail->next, &next, new_node)) {
                    // Try to swing tail
                    atomic_compare_exchange_weak(&queue->tail, &tail, new_node);
                    return;
                }
            } else {
                // Help advance tail
                atomic_compare_exchange_weak(&queue->tail, &tail, next);
            }
        }
    }
}

int atomic_queue_dequeue(AtomicQueue *queue) {
    HazardPointerRecord *hp_record = get_hazard_pointer_record();
    QueueNode *head;
    QueueNode *tail;
    QueueNode *next;

    while (1) {
        head = atomic_load(&queue->head);
        hazard_pointer_set(hp_record, 0, head);

        if (head != atomic_load(&queue->head)) {
            continue;
        }

        tail = atomic_load(&queue->tail);
        next = atomic_load(&head->next);
        hazard_pointer_set(hp_record, 1, next);

        if (head != atomic_load(&queue->head)) {
            continue;
        }

        if (next == NULL) {
            hazard_pointer_set(hp_record, 0, NULL);
            hazard_pointer_set(hp_record, 1, NULL);
            return -1; // Empty queue
        }

        if (head == tail) {
            // Help advance tail
            atomic_compare_exchange_weak(&queue->tail, &tail, next);
        } else {
            // Try to dequeue
            int value = next->data;
            if (atomic_compare_exchange_weak(&queue->head, &head, next)) {
                hazard_pointer_set(hp_record, 0, NULL);
                hazard_pointer_set(hp_record, 1, NULL);

                // Safe memory reclamation would go here
                return value;
            }
        }
    }
}

// Example usage and testing
int main() {
    // Test atomic stack
    AtomicStack stack;
    atomic_stack_init(&stack);

    printf("Testing Atomic Stack:\\n");

    atomic_stack_push(&stack, 10);
    atomic_stack_push(&stack, 20);
    atomic_stack_push(&stack, 30);

    printf("Popped: %d\\n", atomic_stack_pop(&stack)); // 30
    printf("Popped: %d\\n", atomic_stack_pop(&stack)); // 20
    printf("Popped: %d\\n", atomic_stack_pop(&stack)); // 10
    printf("Popped: %d\\n", atomic_stack_pop(&stack)); // -1 (empty)

    // Test atomic queue
    AtomicQueue queue;
    atomic_queue_init(&queue);

    printf("\\nTesting Atomic Queue:\\n");

    atomic_queue_enqueue(&queue, 100);
    atomic_queue_enqueue(&queue, 200);
    atomic_queue_enqueue(&queue, 300);

    printf("Dequeued: %d\\n", atomic_queue_dequeue(&queue)); // 100
    printf("Dequeued: %d\\n", atomic_queue_dequeue(&queue)); // 200
    printf("Dequeued: %d\\n", atomic_queue_dequeue(&queue)); // 300
    printf("Dequeued: %d\\n", atomic_queue_dequeue(&queue)); // -1 (empty)

    return 0;
}`
    }
  ]
};
