import { SubLesson } from '../../../data/lessonsData';

export const topic_10_6: SubLesson = {
  id: 10.6,
  title: 'Best Practices',
  status: 'completed',
  content: `# 🏆 Best Practices

Master comprehensive memory management best practices, design patterns, and professional techniques for robust C programs.

---

## 🎯 Memory Management Principles

### 1. Fail Early, Fail Loud

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

// ✅ Good: Check allocations immediately
int* create_array(size_t size) {
    int* arr = malloc(size * sizeof(int));

    if (arr == NULL) {
        fprintf(stderr, "Failed to allocate array of %zu elements\\n", size);
        exit(EXIT_FAILURE);  // Fail fast
    }

    return arr;
}

// ❌ Bad: Defer error handling
int* create_array_bad(size_t size) {
    return malloc(size * sizeof(int));  // May return NULL
}

// Usage requires constant NULL checks
int main() {
    int* arr = create_array_bad(1000);

    if (arr == NULL) {  // Easy to forget
        printf("Allocation failed\\n");
        return 1;
    }

    // Use arr...
}
\`\`\`

### 2. Use Appropriate Allocation Functions

\`\`\`c
// Choose the right function for the job
int main() {
    // ✅ Use calloc for arrays that need initialization
    int* counters = calloc(100, sizeof(int));  // Zero-initialized

    // ✅ Use malloc for performance-critical allocations
    char* buffer = malloc(8192);  // Fast, uninitialized

    // ✅ Use realloc for growing buffers
    char* new_buffer = realloc(buffer, 16384);

    if (new_buffer == NULL) {
        // Handle reallocation failure
        free(buffer);
        return 1;
    }
    buffer = new_buffer;

    free(counters);
    free(buffer);

    return 0;
}
\`\`\`

### 3. Implement Resource Management Patterns

\`\`\`c
// RAII-like pattern for C
typedef struct {
    FILE* file;
    char* buffer;
    size_t buffer_size;
} FileReader;

FileReader* filereader_create(const char* filename) {
    FileReader* reader = calloc(1, sizeof(FileReader));

    if (reader == NULL) return NULL;

    reader->file = fopen(filename, "r");
    if (reader->file == NULL) {
        free(reader);
        return NULL;
    }

    reader->buffer_size = 4096;
    reader->buffer = malloc(reader->buffer_size);
    if (reader->buffer == NULL) {
        fclose(reader->file);
        free(reader);
        return NULL;
    }

    return reader;
}

void filereader_destroy(FileReader* reader) {
    if (reader == NULL) return;

    fclose(reader->file);
    free(reader->buffer);
    free(reader);
}

// Usage with automatic cleanup
#define WITH_FILE_READER(var, filename) \\
    __attribute__((cleanup(filereader_destroy))) \\
    FileReader* var = filereader_create(filename); \\
    if (var == NULL) { \\
        fprintf(stderr, "Failed to create file reader\\n"); \\
        return 1; \\
    }

int process_file(const char* filename) {
    WITH_FILE_READER(reader, filename);

    // Use reader safely
    char* line = NULL;
    size_t len = 0;

    while (getline(&line, &len, reader->file) != -1) {
        printf("Read: %s", line);
    }

    free(line);

    return 0;
}
\`\`\`

---

## 🛡️ Defensive Programming

### Validate All Inputs

\`\`\`c
// ✅ Validate allocation sizes
void* safe_malloc(size_t size) {
    if (size == 0) {
        fprintf(stderr, "Warning: allocating 0 bytes\\n");
        return NULL;
    }

    if (size > MAX_ALLOCATION_SIZE) {
        fprintf(stderr, "Error: allocation size %zu too large\\n", size);
        return NULL;
    }

    void* ptr = malloc(size);

    if (ptr == NULL) {
        fprintf(stderr, "Error: malloc(%zu) failed\\n", size);
        return NULL;
    }

    return ptr;
}

// ✅ Check array bounds
int safe_array_access(int* array, size_t size, size_t index) {
    if (array == NULL) {
        fprintf(stderr, "Error: array is NULL\\n");
        return 0;
    }

    if (index >= size) {
        fprintf(stderr, "Error: index %zu out of bounds (size %zu)\\n",
               index, size);
        return 0;
    }

    return array[index];
}
\`\`\`

### Use Memory Debugging Tools

\`\`\`c
// Enable debugging in debug builds
#ifdef DEBUG
    #define MALLOC(size) debug_malloc(size, __FILE__, __LINE__)
    #define FREE(ptr) debug_free(ptr)
    #define CHECK_LEAKS() memory_check_leaks()
#else
    #define MALLOC(size) malloc(size)
    #define FREE(ptr) free(ptr)
    #define CHECK_LEAKS() ((void)0)
#endif

// Usage
int main() {
    int* arr = MALLOC(100 * sizeof(int));

    if (arr == NULL) {
        fprintf(stderr, "Allocation failed\\n");
        return 1;
    }

    // Use arr...

    FREE(arr);

    CHECK_LEAKS();

    return 0;
}
\`\`\`

---

## 🏗️ Design Patterns

### Memory Pool Pattern

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define POOL_BLOCK_SIZE 64
#define POOL_BLOCK_COUNT 1024

typedef struct MemoryPool {
    char pool[POOL_BLOCK_SIZE * POOL_BLOCK_COUNT];
    char used[POOL_BLOCK_COUNT];
    size_t free_count;
} MemoryPool;

void pool_init(MemoryPool* pool) {
    memset(pool->used, 0, sizeof(pool->used));
    pool->free_count = POOL_BLOCK_COUNT;
}

void* pool_alloc(MemoryPool* pool, size_t size) {
    if (size > POOL_BLOCK_SIZE || pool->free_count == 0) {
        return NULL;
    }

    // Find free block
    for (size_t i = 0; i < POOL_BLOCK_COUNT; i++) {
        if (!pool->used[i]) {
            pool->used[i] = 1;
            pool->free_count--;
            return &pool->pool[i * POOL_BLOCK_SIZE];
        }
    }

    return NULL;
}

void pool_free(MemoryPool* pool, void* ptr) {
    if (ptr == NULL) return;

    size_t offset = (char*)ptr - pool->pool;
    size_t block_index = offset / POOL_BLOCK_SIZE;

    if (block_index < POOL_BLOCK_COUNT && pool->used[block_index]) {
        pool->used[block_index] = 0;
        pool->free_count++;
    }
}

// Usage pattern
#define WITH_MEMORY_POOL(var) \\
    MemoryPool var; \\
    pool_init(&var)

int process_data() {
    WITH_MEMORY_POOL(pool);

    // Allocate from pool
    void* data1 = pool_alloc(&pool, 32);
    void* data2 = pool_alloc(&pool, 48);

    if (data1 == NULL || data2 == NULL) {
        return 1;
    }

    // Use data...

    // Pool automatically cleaned up
    return 0;
}
\`\`\`

### Reference Counting Pattern

\`\`\`c
typedef struct {
    void* data;
    size_t size;
    volatile int ref_count;
} SharedBuffer;

SharedBuffer* shared_buffer_create(size_t size) {
    SharedBuffer* buffer = malloc(sizeof(SharedBuffer));

    if (buffer == NULL) return NULL;

    buffer->data = malloc(size);
    if (buffer->data == NULL) {
        free(buffer);
        return NULL;
    }

    buffer->size = size;
    buffer->ref_count = 1;

    return buffer;
}

SharedBuffer* shared_buffer_retain(SharedBuffer* buffer) {
    if (buffer != NULL) {
        __atomic_fetch_add(&buffer->ref_count, 1, __ATOMIC_SEQ_CST);
    }
    return buffer;
}

void shared_buffer_release(SharedBuffer* buffer) {
    if (buffer == NULL) return;

    if (__atomic_fetch_sub(&buffer->ref_count, 1, __ATOMIC_SEQ_CST) == 1) {
        // Last reference, free resources
        free(buffer->data);
        free(buffer);
    }
}

// Thread-safe usage
void worker_thread(SharedBuffer* shared_data) {
    SharedBuffer* local_ref = shared_buffer_retain(shared_data);

    // Use shared_data safely
    memset(local_ref->data, 0, local_ref->size);

    shared_buffer_release(local_ref);
}
\`\`\`

---

## 📊 Performance Considerations

### Allocation Frequency

\`\`\`c
// ❌ Bad: Frequent small allocations
void process_data_slow(int* data, size_t count) {
    for (size_t i = 0; i < count; i++) {
        int* temp = malloc(sizeof(int));  // Allocates every iteration!
        *temp = data[i] * 2;
        // Use temp...
        free(temp);
    }
}

// ✅ Good: Batch allocations
void process_data_fast(int* data, size_t count) {
    int* temp_buffer = malloc(count * sizeof(int));

    if (temp_buffer == NULL) return;

    for (size_t i = 0; i < count; i++) {
        temp_buffer[i] = data[i] * 2;
    }

    // Use temp_buffer...

    free(temp_buffer);
}

// ✅ Better: Use stack for small, fixed-size allocations
#define MAX_TEMP 1024
void process_data_best(int* data, size_t count) {
    int temp_buffer[MAX_TEMP];

    if (count > MAX_TEMP) {
        // Fallback to heap
        int* heap_buffer = malloc(count * sizeof(int));
        // ...
        free(heap_buffer);
    } else {
        // Use stack
        for (size_t i = 0; i < count; i++) {
            temp_buffer[i] = data[i] * 2;
        }
        // Use temp_buffer...
    }
}
\`\`\`

### Memory Access Patterns

\`\`\`c
// ✅ Good: Sequential access
void process_sequential(int* array, size_t size) {
    for (size_t i = 0; i < size; i++) {
        array[i] *= 2;  // Sequential access is cache-friendly
    }
}

// ❌ Bad: Random access pattern
void process_random(int* array, size_t size) {
    for (size_t i = 0; i < size; i++) {
        size_t index = rand() % size;  // Random access hurts cache performance
        array[index] *= 2;
    }
}

// ✅ Good: Prefetch-aware access
void process_with_prefetch(int* array, size_t size) {
    const size_t PREFETCH_DISTANCE = 16;

    for (size_t i = 0; i < size; i++) {
        if (i + PREFETCH_DISTANCE < size) {
            __builtin_prefetch(&array[i + PREFETCH_DISTANCE], 1, 3);
        }
        array[i] *= 2;
    }
}
\`\`\`

---

## 🧪 Testing and Validation

### Memory Leak Testing

\`\`\`c
// Test function for memory leaks
void test_memory_leaks() {
    // Override malloc/free for testing
    extern void* test_malloc(size_t size);
    extern void test_free(void* ptr);

    #define malloc(size) test_malloc(size)
    #define free(ptr) test_free(ptr)

    // Test code that should not leak
    void* ptr1 = malloc(100);
    void* ptr2 = malloc(200);

    free(ptr1);
    // Forgot to free ptr2 - should be detected

    #undef malloc
    #undef free
}

// Bounds checking
void test_bounds_checking() {
    int array[10];

    // These should be caught in debug mode
    // array[-1] = 42;  // Underflow
    // array[10] = 42;  // Overflow

    // Safe access
    if (0 <= 5 && 5 < 10) {
        array[5] = 42;
    }
}
\`\`\`

### Stress Testing

\`\`\`c
#include <time.h>

void stress_test_allocator(size_t max_allocations, size_t max_size) {
    void** allocations = calloc(max_allocations, sizeof(void*));
    size_t allocation_count = 0;

    srand(time(NULL));

    for (int i = 0; i < 10000; i++) {
        int action = rand() % 3;

        if (action == 0 && allocation_count < max_allocations) {
            // Allocate
            size_t size = (rand() % max_size) + 1;
            void* ptr = malloc(size);

            if (ptr != NULL) {
                allocations[allocation_count++] = ptr;
                memset(ptr, 0xAA, size);  // Fill with pattern
            }

        } else if (action == 1 && allocation_count > 0) {
            // Free random allocation
            size_t index = rand() % allocation_count;
            free(allocations[index]);

            // Remove from array
            allocations[index] = allocations[--allocation_count];
        }

        // Periodically check memory integrity
        if (i % 1000 == 0) {
            printf("Iteration %d: %zu allocations\\n", i, allocation_count);
        }
    }

    // Cleanup
    for (size_t i = 0; i < allocation_count; i++) {
        free(allocations[i]);
    }
    free(allocations);
}
\`\`\`

---

## 🎯 Complete Best Practices Checklist

### Memory Allocation
- [ ] Check all malloc/calloc/realloc return values
- [ ] Use appropriate allocation function for the task
- [ ] Initialize allocated memory appropriately
- [ ] Handle allocation failures gracefully

### Memory Deallocation
- [ ] Free all allocated memory exactly once
- [ ] Set pointers to NULL after freeing
- [ ] Use matching allocation/deallocation functions
- [ ] Free in reverse order of allocation when possible

### Error Handling
- [ ] Implement comprehensive error checking
- [ ] Fail fast on critical allocation failures
- [ ] Provide meaningful error messages
- [ ] Log errors appropriately

### Performance
- [ ] Minimize allocation frequency
- [ ] Use appropriate data structures
- [ ] Consider memory access patterns
- [ ] Profile memory usage regularly

### Debugging
- [ ] Use Valgrind and AddressSanitizer regularly
- [ ] Implement custom debugging allocators for development
- [ ] Test with various allocation patterns
- [ ] Monitor memory usage in production

### Security
- [ ] Validate all input sizes before allocation
- [ ] Use safe string functions
- [ ] Implement bounds checking
- [ ] Avoid information leakage through uninitialized memory

---

## 🎯 Key Takeaways

1. **Fail early** on allocation errors with clear error messages
2. **Choose appropriate allocators** for different use cases
3. **Implement resource management patterns** (RAII, reference counting)
4. **Validate all inputs** and check bounds
5. **Use debugging tools** regularly during development
6. **Consider performance implications** of allocation patterns
7. **Test thoroughly** with various memory scenarios
8. **Follow security best practices** to prevent vulnerabilities

