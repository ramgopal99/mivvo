import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_6: SubLesson = {
  id: "9.6",
  title: 'Memory Debugging and Profiling',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🔍 Memory Debugging and Profiling in C

Memory debugging and profiling are essential for creating reliable, high-performance C programs. These techniques help identify memory leaks, corruption, and performance bottlenecks.

---

## 🐛 Memory Debugging Tools

### **Valgrind Memcheck**

Valgrind is a powerful memory debugging tool that detects memory leaks, invalid accesses, and other memory-related errors.

#### **Basic Usage**

\`\`\`bash
# Compile with debug symbols
gcc -g -O0 program.c -o program

# Run with valgrind
valgrind --tool=memcheck ./program

# Check for leaks at exit
valgrind --tool=memcheck --leak-check=full ./program

# Track origins of uninitialized values
valgrind --tool=memcheck --track-origins=yes ./program

# Generate suppression file
valgrind --tool=memcheck --gen-suppressions=all ./program
\`\`\`

#### **Common Valgrind Options**

\`\`\`bash
# Detailed leak checking
valgrind --leak-check=full --show-leak-kinds=all

# Track file descriptors
valgrind --track-fds=yes

# Check for race conditions (with helgrind)
valgrind --tool=helgrind

# Performance profiling
valgrind --tool=callgrind

# Cache profiling
valgrind --tool=cachegrind
\`\`\`

### **AddressSanitizer (ASan)**

AddressSanitizer is a fast memory error detector built into modern compilers.

#### **GCC/Clang Usage**

\`\`\`bash
# Compile with AddressSanitizer
gcc -fsanitize=address -g program.c -o program

# Run program (instrumentation is automatic)
./program

# For more detailed output
ASAN_OPTIONS=detect_leaks=1 ./program
\`\`\`

#### **Common ASan Options**

\`\`\`c
// Environment variables
export ASAN_OPTIONS="detect_leaks=1:abort_on_error=1:print_stats=1"

// Detect stack/heap buffer overflows
-fsanitize=address

// Detect use-after-return
-fsanitize=address -fsanitize-address-use-after-scope

// Detect uninitialized memory access
-fsanitize=memory

// Thread safety
-fsanitize=thread
\`\`\`

### **Custom Memory Tracker**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <execinfo.h>

#define MAX_ALLOCATIONS 10000

typedef struct {
    void *ptr;
    size_t size;
    const char *file;
    int line;
    void *backtrace[10];
    int backtrace_size;
} AllocationInfo;

static AllocationInfo allocations[MAX_ALLOCATIONS];
static size_t allocation_count = 0;
static size_t total_allocated = 0;

void* debug_malloc(size_t size, const char *file, int line) {
    void *ptr = malloc(size);
    if (ptr != NULL) {
        if (allocation_count < MAX_ALLOCATIONS) {
            allocations[allocation_count].ptr = ptr;
            allocations[allocation_count].size = size;
            allocations[allocation_count].file = file;
            allocations[allocation_count].line = line;
            allocations[allocation_count].backtrace_size =
                backtrace(allocations[allocation_count].backtrace, 10);
            allocation_count++;
        }
        total_allocated += size;
    }
    return ptr;
}

void debug_free(void *ptr, const char *file, int line) {
    if (ptr == NULL) return;

    for (size_t i = 0; i < allocation_count; i++) {
        if (allocations[i].ptr == ptr) {
            total_allocated -= allocations[i].size;

            // Remove from array (shift remaining)
            memmove(&allocations[i], &allocations[i+1],
                   (allocation_count - i - 1) * sizeof(AllocationInfo));
            allocation_count--;

            free(ptr);
            return;
        }
    }

    fprintf(stderr, "DOUBLE FREE detected at %s:%d\\n", file, line);
    fprintf(stderr, "Pointer: %p\\n", ptr);
}

void print_memory_report() {
    printf("\\n=== MEMORY DEBUG REPORT ===\\n");
    printf("Total allocations: %zu\\n", allocation_count);
    printf("Total memory allocated: %zu bytes\\n", total_allocated);
    printf("\\nActive allocations:\\n");

    for (size_t i = 0; i < allocation_count; i++) {
        printf("  %p: %zu bytes at %s:%d\\n",
               allocations[i].ptr,
               allocations[i].size,
               allocations[i].file,
               allocations[i].line);

        if (allocations[i].backtrace_size > 0) {
            printf("    Backtrace:\\n");
            backtrace_symbols_fd(allocations[i].backtrace,
                               allocations[i].backtrace_size, 1);
        }
    }

    if (allocation_count > 0) {
        printf("\\nWARNING: %zu memory leaks detected!\\n", allocation_count);
    } else {
        printf("\\nNo memory leaks detected.\\n");
    }
}

// Override standard functions
#define malloc(size) debug_malloc(size, __FILE__, __LINE__)
#define free(ptr) debug_free(ptr, __FILE__, __LINE__)

int main() {
    atexit(print_memory_report);

    char *str1 = (char*)malloc(100);
    char *str2 = (char*)malloc(50);

    strcpy(str1, "First allocation");
    strcpy(str2, "Second allocation");

    printf("Strings: %s, %s\\n", str1, str2);

    free(str1);
    // free(str2);  // Leak!

    return 0;
}
\`\`\`

---

## 📊 Memory Profiling

### **Manual Profiling**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

typedef struct {
    size_t allocations;
    size_t frees;
    size_t total_allocated;
    size_t peak_usage;
    size_t current_usage;
    clock_t start_time;
} MemoryStats;

static MemoryStats mem_stats = {0};

void* profiled_malloc(size_t size) {
    void *ptr = malloc(size);
    if (ptr != NULL) {
        mem_stats.allocations++;
        mem_stats.total_allocated += size;
        mem_stats.current_usage += size;

        if (mem_stats.current_usage > mem_stats.peak_usage) {
            mem_stats.peak_usage = mem_stats.current_usage;
        }
    }
    return ptr;
}

void profiled_free(void *ptr, size_t size) {
    if (ptr != NULL) {
        mem_stats.frees++;
        mem_stats.current_usage -= size;
        free(ptr);
    }
}

void print_memory_stats() {
    clock_t end_time = clock();
    double time_elapsed = (double)(end_time - mem_stats.start_time) / CLOCKS_PER_SEC;

    printf("\\n=== MEMORY PROFILING REPORT ===\\n");
    printf("Time elapsed: %.3f seconds\\n", time_elapsed);
    printf("Total allocations: %zu\\n", mem_stats.allocations);
    printf("Total frees: %zu\\n", mem_stats.frees);
    printf("Total memory allocated: %zu bytes\\n", mem_stats.total_allocated);
    printf("Peak memory usage: %zu bytes\\n", mem_stats.peak_usage);
    printf("Current memory usage: %zu bytes\\n", mem_stats.current_usage);

    if (mem_stats.allocations > mem_stats.frees) {
        printf("WARNING: %zu unfreed allocations!\\n",
               mem_stats.allocations - mem_stats.frees);
    }

    if (time_elapsed > 0) {
        printf("Average allocation rate: %.0f bytes/second\\n",
               (double)mem_stats.total_allocated / time_elapsed);
    }
}

// Initialize profiling
void init_memory_profiling() {
    mem_stats.start_time = clock();
    atexit(print_memory_stats);
}

// Wrapper macros
#define MALLOC(size) profiled_malloc(size)
#define FREE(ptr, size) profiled_free(ptr, size)

int main() {
    init_memory_profiling();

    // Allocate and free some memory
    int *arr1 = (int*)MALLOC(100 * sizeof(int));
    int *arr2 = (int*)MALLOC(50 * sizeof(int));

    for (int i = 0; i < 100; i++) {
        arr1[i] = i;
    }

    FREE(arr2, 50 * sizeof(int));

    // arr1 is leaked!

    return 0;
}
\`\`\`

### **Valgrind Massif (Heap Profiler)**

\`\`\`bash
# Profile heap usage
valgrind --tool=massif ./program

# Generate detailed report
ms_print massif.out.<pid>

# Visual output
valgrind --tool=massif --massif-out-file=massif.out ./program
\`\`\`

### **Custom Heap Visualizer**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define HEAP_SIZE 1024
#define BLOCK_SIZE 32

typedef struct Block {
    size_t size;
    int free;
    struct Block *next;
} Block;

static char heap[HEAP_SIZE];
static Block *free_list = NULL;

void heap_init() {
    free_list = (Block*)heap;
    free_list->size = HEAP_SIZE - sizeof(Block);
    free_list->free = 1;
    free_list->next = NULL;
}

void* heap_alloc(size_t size) {
    Block *current = free_list;
    Block *prev = NULL;

    while (current != NULL) {
        if (current->free && current->size >= size + sizeof(Block)) {
            // Split block
            Block *new_block = (Block*)((char*)current + sizeof(Block) + size);
            new_block->size = current->size - size - sizeof(Block);
            new_block->free = 1;
            new_block->next = current->next;

            current->size = size;
            current->free = 0;
            current->next = new_block;

            return (char*)current + sizeof(Block);
        }
        prev = current;
        current = current->next;
    }

    return NULL;
}

void heap_free(void *ptr) {
    if (ptr == NULL) return;

    Block *block = (Block*)((char*)ptr - sizeof(Block));
    block->free = 1;

    // Coalesce with adjacent free blocks
    // (Simplified implementation)
}

void print_heap_visualization() {
    printf("\\n=== HEAP VISUALIZATION ===\\n");

    Block *current = (Block*)heap;
    size_t offset = 0;

    while (offset < HEAP_SIZE) {
        if (current->free) {
            printf("[FREE:%zu]", current->size);
        } else {
            printf("[USED:%zu]", current->size);
        }

        offset += sizeof(Block) + current->size;
        if (current->next != NULL) {
            current = current->next;
        } else {
            break;
        }
    }

    printf("\\n");
}

int main() {
    heap_init();

    print_heap_visualization();

    void *ptr1 = heap_alloc(64);
    void *ptr2 = heap_alloc(32);
    void *ptr3 = heap_alloc(96);

    print_heap_visualization();

    heap_free(ptr2);

    print_heap_visualization();

    return 0;
}
\`\`\`

---

## 🔍 Advanced Debugging Techniques

### **Electric Fence (efence)**

Electric Fence is a malloc debugger that detects buffer overflows and underflows.

\`\`\`bash
# Compile with efence
gcc program.c -lefence -o program

# Run (will detect boundary violations)
./program
\`\`\`

### **DMalloc**

DMalloc is another memory debugger with extensive features.

\`\`\`bash
# Compile normally
gcc program.c -o program

# Run with dmalloc
dmalloc -l logfile -i 100 program

# Check logfile for errors
\`\`\`

### **Memory Scrambling**

\`\`\`c
// Debug version that scrambles freed memory
void debug_free(void *ptr, size_t size) {
    if (ptr != NULL) {
        // Fill with pattern to detect use-after-free
        memset(ptr, 0xDE, size);
        free(ptr);
    }
}

void* debug_malloc(size_t size) {
    void *ptr = malloc(size);
    if (ptr != NULL) {
        // Fill with pattern to detect uninitialized access
        memset(ptr, 0xCD, size);
    }
    return ptr;
}
\`\`\`

### **Bounds Checking**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char *data;
    size_t size;
    size_t actual_size;  // Include guard zones
} SafeBuffer;

#define GUARD_SIZE 64
#define GUARD_VALUE 0xAB

SafeBuffer* safe_buffer_create(size_t size) {
    SafeBuffer *buf = (SafeBuffer*)malloc(sizeof(SafeBuffer));
    if (buf == NULL) return NULL;

    buf->size = size;
    buf->actual_size = size + 2 * GUARD_SIZE;

    buf->data = (char*)malloc(buf->actual_size);
    if (buf->data == NULL) {
        free(buf);
        return NULL;
    }

    // Initialize guard zones
    memset(buf->data, GUARD_VALUE, GUARD_SIZE);
    memset(buf->data + GUARD_SIZE + size, GUARD_VALUE, GUARD_SIZE);

    return buf;
}

void safe_buffer_destroy(SafeBuffer *buf) {
    if (buf != NULL) {
        // Check guard zones
        int corrupted = 0;

        for (size_t i = 0; i < GUARD_SIZE; i++) {
            if (buf->data[i] != GUARD_VALUE ||
                buf->data[GUARD_SIZE + buf->size + i] != GUARD_VALUE) {
                corrupted = 1;
                break;
            }
        }

        if (corrupted) {
            fprintf(stderr, "Buffer corruption detected!\\n");
        }

        free(buf->data);
        free(buf);
    }
}

char* safe_buffer_data(SafeBuffer *buf) {
    return buf->data + GUARD_SIZE;
}

int main() {
    SafeBuffer *buf = safe_buffer_create(100);
    if (buf == NULL) return 1;

    char *data = safe_buffer_data(buf);
    strcpy(data, "Safe buffer test");

    // This would corrupt guard zone
    // data[100] = 'x';  // Buffer overflow!

    printf("Buffer content: %s\\n", data);

    safe_buffer_destroy(buf);

    return 0;
}
\`\`\`

---

## 📈 Performance Profiling

### **Cache Performance Analysis**

\`\`\`bash
# Valgrind cachegrind
valgrind --tool=cachegrind ./program
cg_annotate cachegrind.out.<pid>

# Intel VTune (if available)
vtune -collect memory-access ./program

# perf (Linux)
perf stat -e cache-misses,cache-references ./program
\`\`\`

### **Memory Access Pattern Analysis**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// Measure cache performance
void benchmark_access_patterns() {
    const size_t SIZE = 1024 * 1024;  // 1M elements
    int *array = (int*)malloc(SIZE * sizeof(int));
    if (array == NULL) return;

    // Initialize
    for (size_t i = 0; i < SIZE; i++) {
        array[i] = i;
    }

    clock_t start, end;

    // Sequential access (cache-friendly)
    start = clock();
    volatile int sum1 = 0;
    for (size_t i = 0; i < SIZE; i++) {
        sum1 += array[i];
    }
    end = clock();
    printf("Sequential access: %.3f seconds\\n",
           (double)(end - start) / CLOCKS_PER_SEC);

    // Random access (cache-unfriendly)
    start = clock();
    volatile int sum2 = 0;
    for (size_t i = 0; i < SIZE; i++) {
        size_t index = rand() % SIZE;
        sum2 += array[index];
    }
    end = clock();
    printf("Random access: %.3f seconds\\n",
           (double)(end - start) / CLOCKS_PER_SEC);

    free(array);
}

int main() {
    srand(time(NULL));
    benchmark_access_patterns();
    return 0;
}
\`\`\`

### **Memory Fragmentation Analysis**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define NUM_ALLOCATIONS 1000
#define MAX_ALLOCATION_SIZE 1024

void analyze_fragmentation() {
    void *allocations[NUM_ALLOCATIONS];
    size_t sizes[NUM_ALLOCATIONS];

    // Make many allocations of varying sizes
    for (int i = 0; i < NUM_ALLOCATIONS; i++) {
        sizes[i] = rand() % MAX_ALLOCATION_SIZE + 1;
        allocations[i] = malloc(sizes[i]);

        if (allocations[i] != NULL) {
            memset(allocations[i], 0xAA, sizes[i]);
        }
    }

    // Free every other allocation (create holes)
    for (int i = 0; i < NUM_ALLOCATIONS; i += 2) {
        if (allocations[i] != NULL) {
            free(allocations[i]);
            allocations[i] = NULL;
        }
    }

    // Try to allocate large blocks (test fragmentation)
    size_t large_sizes[] = {4096, 8192, 16384, 32768};

    printf("Testing fragmentation:\\n");
    for (size_t i = 0; i < sizeof(large_sizes)/sizeof(large_sizes[0]); i++) {
        void *large_block = malloc(large_sizes[i]);
        if (large_block != NULL) {
            printf("  Successfully allocated %zu bytes\\n", large_sizes[i]);
            free(large_block);
        } else {
            printf("  Failed to allocate %zu bytes\\n", large_sizes[i]);
        }
    }

    // Clean up remaining allocations
    for (int i = 0; i < NUM_ALLOCATIONS; i++) {
        if (allocations[i] != NULL) {
            free(allocations[i]);
        }
    }
}

int main() {
    srand(42);  // Deterministic for testing
    analyze_fragmentation();
    return 0;
}
\`\`\`

---

## 🛠️ Automated Testing Frameworks

### **Memory Testing Harness**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <setjmp.h>

#define TEST_ASSERT(condition, message) \\
    do { \\
        if (!(condition)) { \\
            fprintf(stderr, "TEST FAILED: %s\\n", message); \\
            fprintf(stderr, "  File: %s, Line: %d\\n", __FILE__, __LINE__); \\
            longjmp(test_env, 1); \\
        } \\
    } while (0)

jmp_buf test_env;

void test_memory_allocation() {
    // Test basic allocation
    int *ptr = (int*)malloc(sizeof(int));
    TEST_ASSERT(ptr != NULL, "malloc returned NULL");

    *ptr = 42;
    TEST_ASSERT(*ptr == 42, "memory write/read failed");

    free(ptr);

    // Test zero allocation
    ptr = (int*)malloc(0);
    TEST_ASSERT(ptr != NULL, "malloc(0) returned NULL");
    free(ptr);

    printf("✓ Memory allocation tests passed\\n");
}

void test_memory_leaks() {
    // This would normally be checked by external tools
    // Here we just test the pattern
    for (int i = 0; i < 100; i++) {
        int *ptr = (int*)malloc(sizeof(int));
        TEST_ASSERT(ptr != NULL, "allocation failed in loop");

        *ptr = i;
        TEST_ASSERT(*ptr == i, "memory corruption in loop");

        free(ptr);
    }

    printf("✓ Memory leak pattern tests passed\\n");
}

void test_bounds_checking() {
    const int SIZE = 10;
    int *array = (int*)malloc(SIZE * sizeof(int));
    TEST_ASSERT(array != NULL, "array allocation failed");

    // Valid access
    for (int i = 0; i < SIZE; i++) {
        array[i] = i * 2;
        TEST_ASSERT(array[i] == i * 2, "array access failed");
    }

    // Note: We can't easily test invalid access in a safe way
    // That's what valgrind/ASan are for

    free(array);

    printf("✓ Bounds checking tests passed\\n");
}

int run_memory_tests() {
    if (setjmp(test_env) == 0) {
        printf("Running memory tests...\\n");

        test_memory_allocation();
        test_memory_leaks();
        test_bounds_checking();

        printf("All memory tests passed!\\n");
        return 0;
    } else {
        printf("Memory tests failed!\\n");
        return 1;
    }
}

int main() {
    return run_memory_tests();
}
\`\`\`

---

## 🎯 Best Practices for Memory Management

### **Memory Management Guidelines**

1. **Always check allocation results**
   \`\`\`c
   int *ptr = (int*)malloc(size);
   if (ptr == NULL) {
       // Handle error gracefully
       return ERROR_CODE;
   }
   \`\`\`

2. **Set pointers to NULL after free**
   \`\`\`c
   free(ptr);
   ptr = NULL;  // Prevent dangling pointer
   \`\`\`

3. **Free memory in reverse allocation order**
   \`\`\`c
   // Allocate
   void *a = malloc(100);
   void *b = malloc(200);
   void *c = malloc(300);

   // Free in reverse
   free(c);
   free(b);
   free(a);
   \`\`\`

4. **Use consistent allocation patterns**
   \`\`\`c
   // Good: Centralized allocation
   typedef struct {
       int *buffer;
       size_t size;
   } SafeBuffer;

   SafeBuffer* buffer_create(size_t size) {
       SafeBuffer *buf = malloc(sizeof(SafeBuffer));
       if (buf == NULL) return NULL;

       buf->buffer = malloc(size);
       if (buf->buffer == NULL) {
           free(buf);
           return NULL;
       }

       buf->size = size;
       return buf;
   }
   \`\`\`

5. **Document memory ownership**
   \`\`\`c
   // Function that takes ownership
   void process_data(char *data /* caller must free */);

   // Function that returns ownership
   char* generate_data(void /* caller must free result */);
   \`\`\`

### **Debug Build Configuration**

\`\`\`c
#ifdef DEBUG
   #define MALLOC(size) debug_malloc(size, __FILE__, __LINE__)
   #define FREE(ptr) debug_free(ptr, __FILE__, __LINE__)
   #define REALLOC(ptr, size) debug_realloc(ptr, size, __FILE__, __LINE__)
#else
   #define MALLOC(size) malloc(size)
   #define FREE(ptr) free(ptr)
   #define REALLOC(ptr, size) realloc(ptr, size)
#endif

// Usage
int *array = (int*)MALLOC(100 * sizeof(int));
// ... use array ...
FREE(array);
\`\`\`

### **Memory Pool for Performance**

\`\`\`c
typedef struct MemoryPool {
    void *blocks;
    size_t block_size;
    size_t num_blocks;
    char *free_flags;
} MemoryPool;

MemoryPool* pool_create(size_t block_size, size_t num_blocks) {
    MemoryPool *pool = malloc(sizeof(MemoryPool));
    if (pool == NULL) return NULL;

    pool->block_size = block_size;
    pool->num_blocks = num_blocks;
    pool->blocks = malloc(block_size * num_blocks);
    pool->free_flags = calloc(num_blocks, 1);  // All free initially

    if (pool->blocks == NULL || pool->free_flags == NULL) {
        free(pool->blocks);
        free(pool->free_flags);
        free(pool);
        return NULL;
    }

    return pool;
}

void* pool_alloc(MemoryPool *pool) {
    for (size_t i = 0; i < pool->num_blocks; i++) {
        if (pool->free_flags[i]) {
            pool->free_flags[i] = 0;
            return (char*)pool->blocks + i * pool->block_size;
        }
    }
    return NULL;
}

void pool_free(MemoryPool *pool, void *ptr) {
    if (ptr == NULL) return;

    size_t offset = (char*)ptr - (char*)pool->blocks;
    size_t index = offset / pool->block_size;

    if (index < pool->num_blocks) {
        pool->free_flags[index] = 1;
    }
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Valgrind** and **AddressSanitizer** are essential debugging tools
2. **Custom memory trackers** provide application-specific debugging
3. **Performance profiling** identifies memory bottlenecks
4. **Automated testing** prevents regressions
5. **Consistent patterns** reduce human error
6. **Documentation** clarifies memory ownership
7. **Debug builds** catch issues during development
8. **Memory pools** optimize frequent allocations

Master memory debugging to create bulletproof C applications! 🔍✨`;

    return contentString;
  })()
};
