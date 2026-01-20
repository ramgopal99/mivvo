import { SubLesson } from '../../../../data/lessonsData';

export const topic_16_2: SubLesson = {
  id: '16.2',
  title: 'Advanced Memory Management',
  status: 'demo',
  content: `# Advanced Memory Management in C

## Custom Memory Allocators

### Arena Allocator
\`\`\`c
#include <stdlib.h>
#include <string.h>
#include <assert.h>

// Arena allocator for efficient memory management
typedef struct {
    char *buffer;
    size_t buffer_size;
    size_t offset;
} Arena;

void arena_init(Arena *arena, size_t size) {
    arena->buffer = malloc(size);
    assert(arena->buffer != NULL);
    arena->buffer_size = size;
    arena->offset = 0;
}

void *arena_alloc(Arena *arena, size_t size) {
    // Align to 8-byte boundary
    size_t aligned_size = (size + 7) & ~7;

    if (arena->offset + aligned_size > arena->buffer_size) {
        return NULL;  // Out of memory
    }

    void *ptr = arena->buffer + arena->offset;
    arena->offset += aligned_size;

    return ptr;
}

void arena_reset(Arena *arena) {
    arena->offset = 0;
}

void arena_destroy(Arena *arena) {
    free(arena->buffer);
    arena->buffer = NULL;
    arena->buffer_size = 0;
    arena->offset = 0;
}

// Usage example
typedef struct {
    char name[50];
    int age;
    double salary;
} Employee;

int main() {
    Arena arena;
    arena_init(&arena, 1024);  // 1KB arena

    // Allocate multiple objects from arena
    Employee *emp1 = arena_alloc(&arena, sizeof(Employee));
    Employee *emp2 = arena_alloc(&arena, sizeof(Employee));
    Employee *emp3 = arena_alloc(&arena, sizeof(Employee));

    if (emp1 && emp2 && emp3) {
        strcpy(emp1->name, "Alice");
        emp1->age = 30;
        emp1->salary = 50000.0;

        strcpy(emp2->name, "Bob");
        emp2->age = 25;
        emp2->salary = 45000.0;

        strcpy(emp3->name, "Charlie");
        emp3->age = 35;
        emp3->salary = 60000.0;

        printf("Arena allocated %zu bytes\\n", arena.offset);
    }

    // All objects freed at once
    arena_destroy(&arena);

    return 0;
}
\`\`\`

### Pool Allocator
\`\`\`c
#include <stdlib.h>
#include <string.h>

// Fixed-size memory pool
typedef struct PoolNode {
    struct PoolNode *next;
} PoolNode;

typedef struct {
    PoolNode *free_list;
    size_t block_size;
    size_t pool_size;
    void *pool_memory;
} MemoryPool;

void pool_init(MemoryPool *pool, size_t block_size, size_t pool_size) {
    pool->block_size = block_size;
    pool->pool_size = pool_size;

    // Allocate pool memory
    size_t total_size = pool_size * (sizeof(PoolNode) + block_size);
    pool->pool_memory = malloc(total_size);

    // Initialize free list
    pool->free_list = NULL;
    char *current = (char *)pool->pool_memory;

    for (size_t i = 0; i < pool_size; i++) {
        PoolNode *node = (PoolNode *)current;
        node->next = pool->free_list;
        pool->free_list = node;
        current += sizeof(PoolNode) + block_size;
    }
}

void *pool_alloc(MemoryPool *pool) {
    if (pool->free_list == NULL) {
        return NULL;  // Pool exhausted
    }

    PoolNode *node = pool->free_list;
    pool->free_list = node->next;

    // Return memory block after the node
    return (char *)node + sizeof(PoolNode);
}

void pool_free(MemoryPool *pool, void *ptr) {
    if (ptr == NULL) return;

    // Get the node from the pointer
    PoolNode *node = (PoolNode *)((char *)ptr - sizeof(PoolNode));

    // Add back to free list
    node->next = pool->free_list;
    pool->free_list = node;
}

void pool_destroy(MemoryPool *pool) {
    free(pool->pool_memory);
    pool->pool_memory = NULL;
    pool->free_list = NULL;
}

// Usage
typedef struct {
    int x, y;
    char name[20];
} Point;

int main() {
    MemoryPool pool;
    pool_init(&pool, sizeof(Point), 10);  // Pool of 10 Point objects

    // Allocate objects
    Point *p1 = pool_alloc(&pool);
    Point *p2 = pool_alloc(&pool);

    if (p1 && p2) {
        p1->x = 10; p1->y = 20; strcpy(p1->name, "Point A");
        p2->x = 30; p2->y = 40; strcpy(p2->name, "Point B");

        printf("Point 1: (%d,%d) %s\\n", p1->x, p1->y, p1->name);
        printf("Point 2: (%d,%d) %s\\n", p2->x, p2->y, p2->name);

        // Free objects
        pool_free(&pool, p1);
        pool_free(&pool, p2);
    }

    pool_destroy(&pool);
    return 0;
}
\`\`\`

## Memory Debugging Techniques

### Memory Leak Detection
\`\`\`c
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

// Simple memory tracker
typedef struct MemBlock {
    void *ptr;
    size_t size;
    const char *file;
    int line;
    struct MemBlock *next;
} MemBlock;

static MemBlock *mem_list = NULL;
static size_t total_allocated = 0;

// Debug malloc
void *debug_malloc(size_t size, const char *file, int line) {
    void *ptr = malloc(size);
    if (ptr) {
        MemBlock *block = malloc(sizeof(MemBlock));
        if (block) {
            block->ptr = ptr;
            block->size = size;
            block->file = file;
            block->line = line;
            block->next = mem_list;
            mem_list = block;
            total_allocated += size;
        }
    }
    return ptr;
}

// Debug free
void debug_free(void *ptr, const char *file, int line) {
    if (ptr == NULL) return;

    MemBlock *prev = NULL;
    MemBlock *current = mem_list;

    while (current) {
        if (current->ptr == ptr) {
            // Remove from list
            if (prev) {
                prev->next = current->next;
            } else {
                mem_list = current->next;
            }

            total_allocated -= current->size;
            free(current);
            free(ptr);
            return;
        }
        prev = current;
        current = current->next;
    }

    fprintf(stderr, "ERROR: Attempting to free unknown pointer at %s:%d\\n",
            file, line);
}

// Memory report
void debug_memory_report(void) {
    printf("\\n=== Memory Report ===\\n");
    printf("Total allocated: %zu bytes\\n", total_allocated);

    MemBlock *current = mem_list;
    int leak_count = 0;

    while (current) {
        printf("LEAK: %zu bytes allocated at %s:%d\\n",
               current->size, current->file, current->line);
        leak_count++;
        current = current->next;
    }

    if (leak_count == 0) {
        printf("No memory leaks detected!\\n");
    } else {
        printf("Total leaks: %d\\n", leak_count);
    }
    printf("====================\\n\\n");
}

// Macros to replace malloc/free
#define malloc(size) debug_malloc(size, __FILE__, __LINE__)
#define free(ptr) debug_free(ptr, __FILE__, __LINE__)

// Usage example
int main() {
    atexit(debug_memory_report);

    char *str1 = malloc(50);
    strcpy(str1, "Hello World");

    char *str2 = malloc(25);
    strcpy(str2, "Memory tracking");

    // Forgot to free str1 - this will be reported
    free(str2);

    return 0;
}
\`\`\`

### Bounds Checking
\`\`\`c
#include <stdlib.h>
#include <string.h>
#include <assert.h>

// Safe array with bounds checking
typedef struct {
    void *data;
    size_t element_size;
    size_t capacity;
    size_t size;
} SafeArray;

void safe_array_init(SafeArray *array, size_t element_size, size_t capacity) {
    array->data = malloc(element_size * capacity);
    assert(array->data != NULL);
    array->element_size = element_size;
    array->capacity = capacity;
    array->size = 0;
}

void safe_array_destroy(SafeArray *array) {
    free(array->data);
    array->data = NULL;
    array->capacity = 0;
    array->size = 0;
}

void *safe_array_get(SafeArray *array, size_t index) {
    assert(index < array->size && "Index out of bounds");
    return (char *)array->data + (index * array->element_size);
}

void safe_array_set(SafeArray *array, size_t index, const void *value) {
    assert(index < array->capacity && "Index out of capacity");

    if (index >= array->size) {
        array->size = index + 1;
    }

    memcpy((char *)array->data + (index * array->element_size),
           value, array->element_size);
}

void safe_array_push(SafeArray *array, const void *value) {
    assert(array->size < array->capacity && "Array full");
    safe_array_set(array, array->size, value);
}

// Usage
int main() {
    SafeArray int_array;
    safe_array_init(&int_array, sizeof(int), 10);

    int value = 42;
    safe_array_push(&int_array, &value);

    value = 100;
    safe_array_push(&int_array, &value);

    // Safe access
    int *first = safe_array_get(&int_array, 0);
    int *second = safe_array_get(&int_array, 1);

    printf("First: %d, Second: %d\\n", *first, *second);

    // This would trigger assert in debug mode
    // int *invalid = safe_array_get(&int_array, 10);

    safe_array_destroy(&int_array);
    return 0;
}
\`\`\`

## Memory Pool Strategies

### Slab Allocator
\`\`\`c
#include <stdlib.h>
#include <string.h>

// Slab allocator for objects of same size
typedef struct Slab {
    void *memory;
    void *free_list;
    size_t object_size;
    size_t object_count;
    struct Slab *next;
} Slab;

typedef struct {
    Slab *slabs;
    size_t object_size;
    size_t objects_per_slab;
} SlabAllocator;

void slab_init(SlabAllocator *allocator, size_t object_size, size_t objects_per_slab) {
    allocator->slabs = NULL;
    allocator->object_size = object_size;
    allocator->objects_per_slab = objects_per_slab;
}

Slab *create_slab(SlabAllocator *allocator) {
    Slab *slab = malloc(sizeof(Slab));
    if (!slab) return NULL;

    size_t total_size = allocator->objects_per_slab * allocator->object_size;
    slab->memory = malloc(total_size);
    if (!slab->memory) {
        free(slab);
        return NULL;
    }

    slab->object_size = allocator->object_size;
    slab->object_count = allocator->objects_per_slab;
    slab->next = NULL;

    // Initialize free list
    slab->free_list = NULL;
    char *current = (char *)slab->memory;

    for (size_t i = 0; i < allocator->objects_per_slab; i++) {
        void *obj = current;
        *(void **)obj = slab->free_list;
        slab->free_list = obj;
        current += allocator->object_size;
    }

    return slab;
}

void *slab_alloc(SlabAllocator *allocator) {
    // Check existing slabs
    Slab *slab = allocator->slabs;
    while (slab) {
        if (slab->free_list) {
            void *obj = slab->free_list;
            slab->free_list = *(void **)obj;
            return obj;
        }
        slab = slab->next;
    }

    // Create new slab
    Slab *new_slab = create_slab(allocator);
    if (!new_slab) return NULL;

    new_slab->next = allocator->slabs;
    allocator->slabs = new_slab;

    // Allocate from new slab
    void *obj = new_slab->free_list;
    new_slab->free_list = *(void **)obj;
    return obj;
}

void slab_free(SlabAllocator *allocator, void *ptr) {
    // Find which slab this object belongs to
    Slab *slab = allocator->slabs;
    while (slab) {
        char *start = (char *)slab->memory;
        char *end = start + (slab->object_count * slab->object_size);

        if ((char *)ptr >= start && (char *)ptr < end) {
            // Object belongs to this slab
            *(void **)ptr = slab->free_list;
            slab->free_list = ptr;
            return;
        }
        slab = slab->next;
    }

    // Object not found - this is an error
    fprintf(stderr, "ERROR: Attempting to free unknown object\\n");
}

void slab_destroy(SlabAllocator *allocator) {
    Slab *current = allocator->slabs;
    while (current) {
        Slab *next = current->next;
        free(current->memory);
        free(current);
        current = next;
    }
    allocator->slabs = NULL;
}

// Usage
typedef struct {
    int id;
    char data[100];
} Record;

int main() {
    SlabAllocator allocator;
    slab_init(&allocator, sizeof(Record), 100);  // 100 objects per slab

    // Allocate records
    Record *rec1 = slab_alloc(&allocator);
    Record *rec2 = slab_alloc(&allocator);

    if (rec1 && rec2) {
        rec1->id = 1;
        strcpy(rec1->data, "First record");

        rec2->id = 2;
        strcpy(rec2->data, "Second record");

        printf("Record 1: ID=%d, Data='%s'\\n", rec1->id, rec1->data);
        printf("Record 2: ID=%d, Data='%s'\\n", rec2->id, rec2->data);

        // Free records
        slab_free(&allocator, rec1);
        slab_free(&allocator, rec2);
    }

    slab_destroy(&allocator);
    return 0;
}
\`\`\`

Advanced memory management techniques in C provide better performance, reduced fragmentation, and improved debugging capabilities compared to standard malloc/free. Custom allocators can significantly improve performance for specific use cases.`
};

