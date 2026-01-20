import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_2: SubLesson = {
  id: "9.2",
  title: 'Memory Management Best Practices',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🛡️ Memory Management Best Practices in C

Effective memory management is crucial for reliable C programs. Poor memory management leads to leaks, crashes, and security vulnerabilities. This lesson covers essential practices for safe and efficient memory usage.

---

## 🚨 Memory-Related Bugs

### **Memory Leaks**

Memory leaks occur when allocated memory is not properly freed, causing programs to consume increasing amounts of memory.

#### **Simple Leak Example**

\`\`\`c
void leaky_function() {
    int *ptr = (int*)malloc(sizeof(int));
    *ptr = 42;
    // Forgot free(ptr)! Memory leak!
}

int main() {
    for (int i = 0; i < 1000000; i++) {
        leaky_function();  // Leaks 4 bytes per call
    }
    return 0;
}
\`\`\`

#### **Detecting Leaks**

\`\`\`c
// Compile with: gcc -fsanitize=address program.c
// Or use valgrind: valgrind --leak-check=full ./program

#include <stdlib.h>

void check_allocation(void **ptr, size_t size) {
    *ptr = malloc(size);
    if (*ptr == NULL) {
        fprintf(stderr, "Memory allocation failed\\n");
        exit(1);
    }
}
\`\`\`

### **Dangling Pointers**

Dangling pointers point to memory that has been freed.

#### **Classic Dangling Pointer**

\`\`\`c
int* create_array() {
    int *arr = (int*)malloc(5 * sizeof(int));
    return arr;
}

int main() {
    int *ptr = create_array();
    // ptr points to allocated memory

    free(ptr);
    // Now ptr is dangling!

    // Undefined behavior!
    *ptr = 10;  // DANGER!

    return 0;
}
\`\`\`

#### **Use After Free**

\`\`\`c
struct Node {
    int data;
    struct Node *next;
};

void delete_node(struct Node *node) {
    free(node);
    // node pointer still exists but points to freed memory
}

int main() {
    struct Node *node = (struct Node*)malloc(sizeof(struct Node));
    node->data = 42;

    delete_node(node);

    // Still using freed memory - undefined behavior!
    printf("%d\\n", node->data);  // DANGER!

    return 0;
}
\`\`\`

### **Double Free**

Attempting to free the same memory twice.

\`\`\`c
void double_free_bug() {
    int *ptr = (int*)malloc(sizeof(int));

    free(ptr);
    free(ptr);  // ERROR: Double free!
}

int main() {
    double_free_bug();
    return 0;  // May crash or corrupt heap
}
\`\`\`

---

## 🛡️ Prevention Strategies

### **1. Consistent Allocation/Deallocation Patterns**

#### **RAII-like Pattern in C**

\`\`\`c
typedef struct {
    int *data;
    size_t size;
} SafeArray;

SafeArray* safe_array_create(size_t size) {
    SafeArray *arr = (SafeArray*)malloc(sizeof(SafeArray));
    if (arr == NULL) return NULL;

    arr->data = (int*)malloc(size * sizeof(int));
    if (arr->data == NULL) {
        free(arr);
        return NULL;
    }

    arr->size = size;
    return arr;
}

void safe_array_destroy(SafeArray *arr) {
    if (arr != NULL) {
        free(arr->data);
        free(arr);
    }
}

// Usage
int main() {
    SafeArray *arr = safe_array_create(10);
    if (arr == NULL) return 1;

    // Use array...

    safe_array_destroy(arr);  // Clean up everything
    arr = NULL;

    return 0;
}
\`\`\`

#### **Reference Counting**

\`\`\`c
typedef struct {
    int *data;
    int ref_count;
} SharedData;

SharedData* shared_data_create(size_t size) {
    SharedData *shared = (SharedData*)malloc(sizeof(SharedData));
    if (shared == NULL) return NULL;

    shared->data = (int*)malloc(size * sizeof(int));
    if (shared->data == NULL) {
        free(shared);
        return NULL;
    }

    shared->ref_count = 1;
    return shared;
}

SharedData* shared_data_acquire(SharedData *shared) {
    if (shared != NULL) {
        shared->ref_count++;
    }
    return shared;
}

void shared_data_release(SharedData *shared) {
    if (shared != NULL) {
        shared->ref_count--;
        if (shared->ref_count == 0) {
            free(shared->data);
            free(shared);
        }
    }
}
\`\`\`

### **2. Null After Free**

Always set pointers to NULL after freeing.

\`\`\`c
#define FREE(ptr) do { \\
    free(ptr); \\
    ptr = NULL; \\
} while(0)

// Usage
int *ptr = (int*)malloc(sizeof(int));
if (ptr != NULL) {
    *ptr = 42;
    FREE(ptr);  // Now ptr is NULL

    // Safe to check
    if (ptr == NULL) {
        printf("Memory freed\\n");
    }
}
\`\`\`

### **3. Boundary Checking**

Validate array bounds to prevent overflows.

\`\`\`c
typedef struct {
    int *data;
    size_t size;
    size_t capacity;
} DynamicArray;

int dynamic_array_get(DynamicArray *arr, size_t index) {
    if (index >= arr->size) {
        fprintf(stderr, "Index out of bounds: %zu >= %zu\\n", index, arr->size);
        exit(1);
    }
    return arr->data[index];
}

void dynamic_array_set(DynamicArray *arr, size_t index, int value) {
    if (index >= arr->capacity) {
        // Resize logic...
    }
    arr->data[index] = value;
    if (index >= arr->size) {
        arr->size = index + 1;
    }
}
\`\`\`

### **4. Memory Pool Pattern**

Pre-allocate memory pools to reduce fragmentation.

\`\`\`c
#define POOL_SIZE 100
#define BLOCK_SIZE 64

typedef struct {
    void *blocks[POOL_SIZE];
    int free_blocks[POOL_SIZE];
    int free_count;
} MemoryPool;

void pool_init(MemoryPool *pool) {
    pool->free_count = POOL_SIZE;
    for (int i = 0; i < POOL_SIZE; i++) {
        pool->blocks[i] = malloc(BLOCK_SIZE);
        pool->free_blocks[i] = i;
    }
}

void* pool_alloc(MemoryPool *pool) {
    if (pool->free_count == 0) return NULL;

    int index = pool->free_blocks[--pool->free_count];
    return pool->blocks[index];
}

void pool_free(MemoryPool *pool, void *ptr) {
    for (int i = 0; i < POOL_SIZE; i++) {
        if (pool->blocks[i] == ptr) {
            pool->free_blocks[pool->free_count++] = i;
            return;
        }
    }
}
\`\`\`

---

## 🧪 Testing and Debugging

### **Memory Leak Detection**

#### **Using Valgrind**

\`\`\`bash
# Compile with debug info
gcc -g program.c -o program

# Run with valgrind
valgrind --leak-check=full ./program

# Check output for memory leaks
\`\`\`

#### **Simple Leak Checker**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

#ifdef DEBUG
static int allocation_count = 0;

void* debug_malloc(size_t size) {
    void *ptr = malloc(size);
    if (ptr != NULL) {
        allocation_count++;
        printf("Allocated: %p (total: %d)\\n", ptr, allocation_count);
    }
    return ptr;
}

void debug_free(void *ptr) {
    if (ptr != NULL) {
        allocation_count--;
        printf("Freed: %p (remaining: %d)\\n", ptr, allocation_count);
        free(ptr);
    }
}

#define malloc debug_malloc
#define free debug_free

#endif // DEBUG

int main() {
    int *ptr1 = (int*)malloc(sizeof(int));
    int *ptr2 = (int*)malloc(sizeof(int));

    free(ptr1);
    // Forgot to free ptr2! Will show in debug output

    return 0;
}
\`\`\`

### **Address Sanitizer**

\`\`\`bash
# Compile with address sanitizer
gcc -fsanitize=address -g program.c -o program

# Run program - will detect leaks and invalid accesses
./program
\`\`\`

### **Custom Memory Tracker**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_TRACKED 1000

typedef struct {
    void *ptr;
    size_t size;
    const char *file;
    int line;
} Allocation;

static Allocation allocations[MAX_TRACKED];
static int allocation_count = 0;

void* tracked_malloc(size_t size, const char *file, int line) {
    void *ptr = malloc(size);
    if (ptr != NULL && allocation_count < MAX_TRACKED) {
        allocations[allocation_count].ptr = ptr;
        allocations[allocation_count].size = size;
        allocations[allocation_count].file = file;
        allocations[allocation_count].line = line;
        allocation_count++;
    }
    return ptr;
}

void tracked_free(void *ptr, const char *file, int line) {
    if (ptr == NULL) return;

    free(ptr);

    // Remove from tracking
    for (int i = 0; i < allocation_count; i++) {
        if (allocations[i].ptr == ptr) {
            // Shift remaining allocations
            memmove(&allocations[i], &allocations[i+1],
                   (allocation_count - i - 1) * sizeof(Allocation));
            allocation_count--;
            return;
        }
    }

    fprintf(stderr, "Double free detected at %s:%d\\n", file, line);
}

void print_memory_report() {
    printf("\\nMemory Report:\\n");
    printf("===============\\n");
    printf("Total allocations: %d\\n", allocation_count);

    for (int i = 0; i < allocation_count; i++) {
        printf("LEAK: %p (%zu bytes) at %s:%d\\n",
               allocations[i].ptr,
               allocations[i].size,
               allocations[i].file,
               allocations[i].line);
    }
}

#define malloc(size) tracked_malloc(size, __FILE__, __LINE__)
#define free(ptr) tracked_free(ptr, __FILE__, __LINE__)

int main() {
    atexit(print_memory_report);

    int *ptr1 = (int*)malloc(sizeof(int));
    int *ptr2 = (int*)malloc(sizeof(int));

    free(ptr1);
    // ptr2 leaks!

    return 0;
}
\`\`\`

---

## 🚀 Performance Considerations

### **Allocation Strategies**

#### **Bulk Allocation**

\`\`\`c
// Instead of many small allocations
int **bad_way(int rows, int cols) {
    int **matrix = (int**)malloc(rows * sizeof(int*));
    for (int i = 0; i < rows; i++) {
        matrix[i] = (int*)malloc(cols * sizeof(int));
    }
    return matrix;
}

// Better: single allocation for all data
typedef struct {
    int *data;
    int rows;
    int cols;
} Matrix;

Matrix* create_matrix(int rows, int cols) {
    Matrix *mat = (Matrix*)malloc(sizeof(Matrix));
    mat->data = (int*)malloc(rows * cols * sizeof(int));
    mat->rows = rows;
    mat->cols = cols;
    return mat;
}

int matrix_get(Matrix *mat, int row, int col) {
    return mat->data[row * mat->cols + col];
}
\`\`\`

#### **Memory Alignment**

\`\`\`c
// Aligned allocation for performance
void* aligned_malloc(size_t size, size_t alignment) {
    void *ptr = NULL;
    if (posix_memalign(&ptr, alignment, size) != 0) {
        return NULL;
    }
    return ptr;
}

// Usage for SIMD operations
float *vector = (float*)aligned_malloc(1024 * sizeof(float), 32);
\`\`\`

### **Fragmentation Avoidance**

\`\`\`c
// Object pool for frequently allocated objects
#define POOL_SIZE 100

typedef struct Node Node;
struct Node {
    int data;
    Node *next;
};

typedef struct {
    Node nodes[POOL_SIZE];
    int free_list[POOL_SIZE];
    int free_count;
} NodePool;

void pool_init(NodePool *pool) {
    pool->free_count = POOL_SIZE;
    for (int i = 0; i < POOL_SIZE; i++) {
        pool->free_list[i] = i;
    }
}

Node* pool_alloc(NodePool *pool) {
    if (pool->free_count == 0) return NULL;

    int index = pool->free_list[--pool->free_count];
    return &pool->nodes[index];
}

void pool_free(NodePool *pool, Node *node) {
    int index = node - pool->nodes;
    pool->free_list[pool->free_count++] = index;
}
\`\`\`

---

## 🏢 Enterprise Memory Management

### **Memory Manager Class**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct MemoryManager MemoryManager;

struct MemoryManager {
    void* (*alloc)(MemoryManager*, size_t);
    void (*free)(MemoryManager*, void*);

    // Private data
    size_t total_allocated;
    size_t allocation_count;
};

static void* standard_alloc(MemoryManager *mm, size_t size) {
    void *ptr = malloc(size);
    if (ptr != NULL) {
        mm->total_allocated += size;
        mm->allocation_count++;
    }
    return ptr;
}

static void standard_free(MemoryManager *mm, void *ptr) {
    if (ptr != NULL) {
        // Note: we don't track individual frees
        free(ptr);
    }
}

MemoryManager* memory_manager_create() {
    MemoryManager *mm = (MemoryManager*)malloc(sizeof(MemoryManager));
    if (mm == NULL) return NULL;

    mm->alloc = standard_alloc;
    mm->free = standard_free;
    mm->total_allocated = 0;
    mm->allocation_count = 0;

    return mm;
}

void memory_manager_stats(MemoryManager *mm) {
    printf("Memory Statistics:\\n");
    printf("Total allocated: %zu bytes\\n", mm->total_allocated);
    printf("Allocation count: %zu\\n", mm->allocation_count);
}

void memory_manager_destroy(MemoryManager *mm) {
    memory_manager_stats(mm);
    free(mm);
}
\`\`\`

### **Garbage Collection Simulation**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Simple mark-and-sweep garbage collector simulation
typedef struct Object Object;

struct Object {
    int marked;    // For garbage collection
    Object *next;  // Linked list
    char data[64]; // Object data
};

typedef struct {
    Object *objects;
    Object *free_list;
} Heap;

void heap_init(Heap *heap) {
    heap->objects = NULL;
    heap->free_list = NULL;
}

Object* heap_alloc(Heap *heap) {
    Object *obj;

    // Try free list first
    if (heap->free_list != NULL) {
        obj = heap->free_list;
        heap->free_list = obj->next;
    } else {
        obj = (Object*)malloc(sizeof(Object));
    }

    if (obj != NULL) {
        obj->marked = 0;
        obj->next = heap->objects;
        heap->objects = obj;
    }

    return obj;
}

void mark(Object *obj) {
    if (obj == NULL || obj->marked) return;
    obj->marked = 1;
}

void sweep(Heap *heap) {
    Object **current = &heap->objects;

    while (*current != NULL) {
        if (!(*current)->marked) {
            // Unmarked object - collect
            Object *to_free = *current;
            *current = to_free->next;

            // Add to free list
            to_free->next = heap->free_list;
            heap->free_list = to_free;
        } else {
            // Marked object - keep
            (*current)->marked = 0;  // Reset for next GC
            current = &(*current)->next;
        }
    }
}

void gc_collect(Heap *heap, Object *root) {
    // Mark phase
    mark(root);

    // Sweep phase
    sweep(heap);
}
\`\`\`

---

## 🎯 Best Practices Summary

### **Golden Rules**

1. **Always check malloc/calloc return values**
2. **Always free allocated memory**
3. **Set pointers to NULL after free**
4. **Free memory in reverse allocation order**
5. **Use consistent allocation/deallocation patterns**
6. **Validate array bounds**
7. **Test with memory debugging tools**

### **Debugging Checklist**

- [ ] Use Valgrind or AddressSanitizer
- [ ] Check all malloc calls return non-NULL
- [ ] Verify all free calls match allocations
- [ ] Ensure no use-after-free bugs
- [ ] Check for buffer overflows
- [ ] Test with different input sizes

### **Performance Tips**

- [ ] Prefer fewer large allocations over many small ones
- [ ] Use memory pools for frequently allocated objects
- [ ] Align memory for SIMD operations
- [ ] Consider cache-friendly data structures
- [ ] Profile memory usage in performance-critical code

Mastering memory management is essential for writing robust, efficient C programs! 🛡️✨`;

    return contentString;
  })()
};
