import { SubLesson } from '../../../../data/lessonsData';

export const topic_12_4: SubLesson = {
  id: '12.4',
  title: 'Concurrent Data Structures',
  status: 'demo',
  content: `# Concurrent Data Structures

## Lock-Free Data Structures

### Lock-Free Stack
\`\`\`c
#include <stdatomic.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    _Atomic(struct Node *) next;
} Node;

typedef _Atomic(Node *) AtomicNodePtr;

typedef struct {
    AtomicNodePtr top;
} LockFreeStack;

void stack_push(LockFreeStack *stack, int value) {
    Node *new_node = malloc(sizeof(Node));
    new_node->data = value;

    Node *old_top;
    do {
        old_top = atomic_load(&stack->top);
        new_node->next = old_top;
    } while (!atomic_compare_exchange_weak(&stack->top, &old_top, new_node));
}

int stack_pop(LockFreeStack *stack) {
    Node *old_top;
    Node *new_top;
    do {
        old_top = atomic_load(&stack->top);
        if (old_top == NULL) return -1; // Empty stack

        new_top = old_top->next;
    } while (!atomic_compare_exchange_weak(&stack->top, &old_top, new_top));

    int value = old_top->data;
    free(old_top);
    return value;
}
\`\`\`

### Lock-Free Queue (Michael-Scott Algorithm)
\`\`\`c
typedef struct Node {
    int data;
    _Atomic(struct Node *) next;
} Node;

typedef struct {
    _Atomic(Node *) head;
    _Atomic(Node *) tail;
} LockFreeQueue;

void queue_init(LockFreeQueue *queue) {
    Node *dummy = malloc(sizeof(Node));
    dummy->next = NULL;
    atomic_store(&queue->head, dummy);
    atomic_store(&queue->tail, dummy);
}

void queue_enqueue(LockFreeQueue *queue, int value) {
    Node *new_node = malloc(sizeof(Node));
    new_node->data = value;
    new_node->next = NULL;

    Node *tail;
    while (1) {
        tail = atomic_load(&queue->tail);
        Node *next = atomic_load(&tail->next);

        if (tail == atomic_load(&queue->tail)) {
            if (next == NULL) {
                if (atomic_compare_exchange_weak(&tail->next, &next, new_node)) {
                    atomic_compare_exchange_weak(&queue->tail, &tail, new_node);
                    return;
                }
            } else {
                atomic_compare_exchange_weak(&queue->tail, &tail, next);
            }
        }
    }
}

int queue_dequeue(LockFreeQueue *queue) {
    while (1) {
        Node *head = atomic_load(&queue->head);
        Node *tail = atomic_load(&queue->tail);
        Node *next = atomic_load(&head->next);

        if (head == atomic_load(&queue->head)) {
            if (head == tail) {
                if (next == NULL) return -1; // Empty queue
                atomic_compare_exchange_weak(&queue->tail, &tail, next);
            } else {
                int value = next->data;
                if (atomic_compare_exchange_weak(&queue->head, &head, next)) {
                    free(head);
                    return value;
                }
            }
        }
    }
}
\`\`\`

## Concurrent Hash Table

### Concurrent Hash Map with Lock Striping
\`\`\`c
#include <pthread.h>
#include <stdlib.h>
#include <string.h>

#define NUM_STRIPES 16
#define INITIAL_CAPACITY 1024

typedef struct Entry {
    char *key;
    int value;
    struct Entry *next;
} Entry;

typedef struct {
    Entry **buckets;
    size_t capacity;
    pthread_mutex_t stripes[NUM_STRIPES];
} ConcurrentHashMap;

size_t hash_function(const char *key, size_t capacity) {
    size_t hash = 5381;
    int c;
    while ((c = *key++)) {
        hash = ((hash << 5) + hash) + c;
    }
    return hash % capacity;
}

void hashmap_init(ConcurrentHashMap *map, size_t capacity) {
    map->capacity = capacity;
    map->buckets = calloc(capacity, sizeof(Entry *));

    for (int i = 0; i < NUM_STRIPES; i++) {
        pthread_mutex_init(&map->stripes[i], NULL);
    }
}

void hashmap_put(ConcurrentHashMap *map, const char *key, int value) {
    size_t hash = hash_function(key, map->capacity);
    size_t stripe = hash % NUM_STRIPES;

    pthread_mutex_lock(&map->stripes[stripe]);

    Entry *entry = map->buckets[hash];
    while (entry != NULL) {
        if (strcmp(entry->key, key) == 0) {
            entry->value = value;
            pthread_mutex_unlock(&map->stripes[stripe]);
            return;
        }
        entry = entry->next;
    }

    // Key not found, create new entry
    Entry *new_entry = malloc(sizeof(Entry));
    new_entry->key = strdup(key);
    new_entry->value = value;
    new_entry->next = map->buckets[hash];
    map->buckets[hash] = new_entry;

    pthread_mutex_unlock(&map->stripes[stripe]);
}

int hashmap_get(ConcurrentHashMap *map, const char *key) {
    size_t hash = hash_function(key, map->capacity);
    size_t stripe = hash % NUM_STRIPES;

    pthread_mutex_lock(&map->stripes[stripe]);

    Entry *entry = map->buckets[hash];
    while (entry != NULL) {
        if (strcmp(entry->key, key) == 0) {
            int value = entry->value;
            pthread_mutex_unlock(&map->stripes[stripe]);
            return value;
        }
        entry = entry->next;
    }

    pthread_mutex_unlock(&map->stripes[stripe]);
    return -1; // Key not found
}
\`\`\`

## Concurrent Linked List

### Fine-Grained Locking Linked List
\`\`\`c
typedef struct Node {
    int data;
    struct Node *next;
    pthread_mutex_t lock;
} Node;

typedef struct {
    Node *head;
    pthread_mutex_t head_lock;
} ConcurrentLinkedList;

void list_init(ConcurrentLinkedList *list) {
    list->head = NULL;
    pthread_mutex_init(&list->head_lock, NULL);
}

void list_insert(ConcurrentLinkedList *list, int data) {
    Node *new_node = malloc(sizeof(Node));
    new_node->data = data;
    new_node->next = NULL;
    pthread_mutex_init(&new_node->lock, NULL);

    pthread_mutex_lock(&list->head_lock);

    new_node->next = list->head;
    list->head = new_node;

    pthread_mutex_unlock(&list->head_lock);
}

int list_search(ConcurrentLinkedList *list, int target) {
    Node *current = list->head;

    while (current != NULL) {
        pthread_mutex_lock(&current->lock);
        if (current->data == target) {
            pthread_mutex_unlock(&current->lock);
            return 1;
        }
        Node *next = current->next;
        pthread_mutex_unlock(&current->lock);
        current = next;
    }

    return 0;
}
\`\`\`

## Read-Copy-Update (RCU)

### Basic RCU Concept
\`\`\`c
// Simplified RCU implementation
typedef struct RCUNode {
    int data;
    struct RCUNode *next;
} RCUNode;

typedef struct {
    RCUNode *head;
    pthread_mutex_t update_lock;
    atomic_int reader_count;
} RCUList;

RCUNode* rcu_read(RCUList *list) {
    atomic_fetch_add(&list->reader_count, 1);
    RCUNode *head = list->head;
    // Critical section - readers can access data
    atomic_fetch_sub(&list->reader_count, 1);
    return head;
}

void rcu_update(RCUList *list, RCUNode *new_head) {
    pthread_mutex_lock(&list->update_lock);

    // Wait for all readers to finish
    while (atomic_load(&list->reader_count) > 0) {
        sched_yield();
    }

    // Safe to update
    RCUNode *old_head = list->head;
    list->head = new_head;

    pthread_mutex_unlock(&list->update_lock);

    // Deferred cleanup
    free(old_head);
}
\`\`\`

## Skip List

### Concurrent Skip List
\`\`\`c
#include <stdatomic.h>
#include <stdlib.h>
#include <time.h>

#define MAX_LEVEL 16

typedef struct SkipNode {
    int key;
    int value;
    struct SkipNode *forward[MAX_LEVEL];
} SkipNode;

typedef struct {
    SkipNode *header;
    int level;
    pthread_mutex_t update_lock;
} ConcurrentSkipList;

SkipNode* make_node(int key, int value, int level) {
    SkipNode *node = malloc(sizeof(SkipNode));
    node->key = key;
    node->value = value;
    for (int i = 0; i < level; i++) {
        node->forward[i] = NULL;
    }
    return node;
}

int random_level() {
    int level = 1;
    while (rand() < RAND_MAX / 2 && level < MAX_LEVEL) {
        level++;
    }
    return level;
}

void skiplist_insert(ConcurrentSkipList *list, int key, int value) {
    SkipNode *update[MAX_LEVEL];
    SkipNode *current = list->header;

    pthread_mutex_lock(&list->update_lock);

    // Find position to insert
    for (int i = list->level - 1; i >= 0; i--) {
        while (current->forward[i] != NULL &&
               current->forward[i]->key < key) {
            current = current->forward[i];
        }
        update[i] = current;
    }

    // Generate random level
    int new_level = random_level();
    if (new_level > list->level) {
        for (int i = list->level; i < new_level; i++) {
            update[i] = list->header;
        }
        list->level = new_level;
    }

    // Insert new node
    SkipNode *new_node = make_node(key, value, new_level);
    for (int i = 0; i < new_level; i++) {
        new_node->forward[i] = update[i]->forward[i];
        update[i]->forward[i] = new_node;
    }

    pthread_mutex_unlock(&list->update_lock);
}

int skiplist_search(ConcurrentSkipList *list, int key) {
    SkipNode *current = list->header;

    for (int i = list->level - 1; i >= 0; i--) {
        while (current->forward[i] != NULL &&
               current->forward[i]->key < key) {
            current = current->forward[i];
        }
    }

    current = current->forward[0];
    if (current != NULL && current->key == key) {
        return current->value;
    }

    return -1; // Not found
}
\`\`\`

## Performance Considerations

### Choosing the Right Data Structure
- **High read, low write**: RCU-based structures
- **High contention**: Lock-free algorithms
- **Ordered access**: Skip lists over hash tables
- **Memory efficiency**: Fine-grained locking

### Memory Management in Concurrent Structures
\`\`\`c
// Hazard pointers for safe memory reclamation
typedef struct HazardPointer {
    atomic_uintptr_t pointer;
} HazardPointer;

#define MAX_HAZARD_POINTERS 8

HazardPointer hazard_pointers[MAX_HAZARD_POINTERS];
atomic_uintptr_t retired_list;

void *get_hazard_pointer(int index) {
    return (void *)atomic_load(&hazard_pointers[index].pointer);
}

void set_hazard_pointer(int index, void *ptr) {
    atomic_store(&hazard_pointers[index].pointer, (uintptr_t)ptr);
}

// Safe memory reclamation
void retire_node(void *node) {
    // Add to retired list for later cleanup
    uintptr_t old_head = atomic_load(&retired_list);
    do {
        *(void **)node = (void *)old_head;
    } while (!atomic_compare_exchange_weak(&retired_list,
                                           &old_head, (uintptr_t)node));
}
\`\`\`

## Testing Concurrent Data Structures

### Linearizability Testing
- **Serializability**: Operations appear to execute in some sequential order
- **Linearizability**: Operations appear instantaneous at some point between start and end

### Stress Testing
\`\`\`c
#include <pthread.h>
#include <stdlib.h>

#define NUM_THREADS 8
#define OPERATIONS_PER_THREAD 10000

typedef struct {
    ConcurrentDataStructure *ds;
    int thread_id;
} ThreadArgs;

void* stress_test_worker(void *arg) {
    ThreadArgs *args = (ThreadArgs *)arg;
    ConcurrentDataStructure *ds = args->ds;

    for (int i = 0; i < OPERATIONS_PER_THREAD; i++) {
        int operation = rand() % 3;
        int key = rand() % 1000;

        switch (operation) {
            case 0: // Insert
                ds_insert(ds, key, key * 2);
                break;
            case 1: // Search
                ds_search(ds, key);
                break;
            case 2: // Delete
                ds_delete(ds, key);
                break;
        }
    }

    return NULL;
}

void run_stress_test(ConcurrentDataStructure *ds) {
    pthread_t threads[NUM_THREADS];
    ThreadArgs args[NUM_THREADS];

    for (int i = 0; i < NUM_THREADS; i++) {
        args[i].ds = ds;
        args[i].thread_id = i;
        pthread_create(&threads[i], NULL, stress_test_worker, &args[i]);
    }

    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_join(threads[i], NULL);
    }
}
\`\`\`

## Best Practices

### Design Principles
1. **Minimize shared state**: Reduce synchronization needs
2. **Use appropriate granularity**: Coarse vs fine-grained locking
3. **Consider memory ordering**: Compiler and hardware barriers
4. **Handle ABA problems**: Tagged pointers or hazard pointers

### Common Patterns
- **Immutable data**: Share read-only data safely
- **Copy-on-write**: Create copies for modifications
- **Version numbering**: Detect concurrent modifications
- **Optimistic concurrency**: Retry on conflicts`
};

