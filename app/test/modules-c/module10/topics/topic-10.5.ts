import { SubLesson } from '../../../data/lessonsData';

export const topic_10_5: SubLesson = {
  id: 10.5,
  title: 'Memory Management Libraries',
  status: 'completed',
  content: `# 🛠️ Memory Management Libraries

Explore standard and third-party memory management libraries, optimization techniques, and advanced memory control functions.

---

## 🎯 Standard Library Functions

### Complete malloc Family

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    // malloc - uninitialized memory
    int* arr1 = malloc(10 * sizeof(int));
    if (arr1 == NULL) {
        perror("malloc failed");
        return 1;
    }
    // arr1 contains garbage values

    // calloc - zero-initialized memory
    int* arr2 = calloc(10, sizeof(int));
    if (arr2 == NULL) {
        perror("calloc failed");
        free(arr1);
        return 1;
    }
    // arr2 is initialized to zeros

    // realloc - resize allocation
    int* arr3 = realloc(arr1, 20 * sizeof(int));
    if (arr3 == NULL) {
        perror("realloc failed");
        free(arr1);
        free(arr2);
        return 1;
    }
    arr1 = arr3;  // realloc may have moved memory

    // Initialize new elements
    for (int i = 10; i < 20; i++) {
        arr1[i] = i * 2;
    }

    // aligned_alloc - aligned memory (C11)
    #ifdef __STDC_VERSION__
        #if __STDC_VERSION__ >= 201112L
            int* aligned = aligned_alloc(64, 10 * sizeof(int));
            if (aligned != NULL) {
                printf("Allocated 64-byte aligned memory\\n");
                free(aligned);
            }
        #endif
    #endif

    free(arr1);
    free(arr2);

    return 0;
}
\`\`\`

### Memory Manipulation Functions

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char* buffer1 = malloc(100);
    char* buffer2 = malloc(100);

    if (buffer1 == NULL || buffer2 == NULL) {
        free(buffer1);
        free(buffer2);
        return 1;
    }

    // Copy memory
    strcpy(buffer1, "Hello, World!");
    memcpy(buffer2, buffer1, strlen(buffer1) + 1);
    printf("Copied: %s\\n", buffer2);

    // Move memory (handles overlapping)
    memmove(buffer1 + 7, buffer1, 6);  // Move "Hello, " over ", World!"
    printf("After memmove: %s\\n", buffer1);

    // Compare memory
    if (memcmp(buffer1, buffer2, 6) == 0) {
        printf("First 6 bytes are identical\\n");
    }

    // Set memory
    memset(buffer1, 'A', 10);
    printf("After memset: %.10s\\n", buffer1);

    // Search memory
    char* found = memchr(buffer1, 'A', 10);
    if (found != NULL) {
        printf("Found 'A' at offset %ld\\n", found - buffer1);
    }

    free(buffer1);
    free(buffer2);

    return 0;
}
\`\`\`

---

## 🚀 High-Performance Allocators

### jemalloc

**jemalloc is a general-purpose malloc implementation that emphasizes fragmentation avoidance, scalability, and performance.**

\`\`\`bash
# Using jemalloc
gcc -ljemalloc program.c -o program

# Or preload
LD_PRELOAD=/usr/lib/libjemalloc.so ./program
\`\`\`

**jemalloc features:**
- Excellent fragmentation resistance
- Multi-threaded scalability
- Extensive debugging and profiling support
- Drop-in replacement for standard malloc

### tcmalloc (Thread-Caching malloc)

**tcmalloc provides fast allocation for multi-threaded applications with thread-local caches.**

\`\`\`bash
# Using tcmalloc
gcc -ltcmalloc program.c -o program

# Or preload
LD_PRELOAD=/usr/lib/libtcmalloc.so ./program
\`\`\`

**tcmalloc features:**
- Thread-local allocation caches
- Reduced lock contention
- Memory usage profiling
- Heap checker for leaks

### mimalloc

**mimalloc is a compact general-purpose allocator with excellent performance.**

\`\`\`bash
# Using mimalloc
gcc -lmimalloc program.c -o program
\`\`\`

**mimalloc features:**
- Small binary size
- Excellent performance
- Secure by default
- Heap visualization tools

---

## 🧠 Advanced Memory Control

### Memory Advice (POSIX)

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>

int main() {
    // Allocate large memory region
    size_t size = 1024 * 1024 * 100;  // 100MB
    void* memory = malloc(size);

    if (memory == NULL) {
        perror("malloc failed");
        return 1;
    }

    // Provide memory usage hints to the system
    #ifdef __linux__
        // Tell system we will access memory sequentially
        if (madvise(memory, size, MADV_SEQUENTIAL) != 0) {
            perror("madvise failed");
        }

        // Or tell system we will access randomly
        // madvise(memory, size, MADV_RANDOM);

        // Or tell system we won't need this memory soon
        // madvise(memory, size, MADV_DONTNEED);
    #endif

    // Use memory...
    memset(memory, 0, size);

    free(memory);
    return 0;
}
\`\`\`

### Memory Locking

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <unistd.h>

int main() {
    size_t size = 4096;
    void* memory = malloc(size);

    if (memory == NULL) return 1;

    // Lock memory to prevent paging
    #ifdef __linux__
        if (mlock(memory, size) == 0) {
            printf("Memory locked successfully\\n");

            // Memory won't be paged out
            // Useful for real-time applications

            munlock(memory, size);
        }
    #endif

    free(memory);
    return 0;
}
\`\`\`

---

## 🌐 NUMA-Aware Allocation

### NUMA Concepts

**NUMA (Non-Uniform Memory Access) systems have memory distributed across CPU nodes. Local memory access is faster than remote access.**

\`\`\`c
// numa.h functions (if available)
#include <numa.h>
#include <numaif.h>

int main() {
    #ifdef HAVE_NUMA_H
        // Check if NUMA is available
        if (numa_available() == 0) {
            printf("NUMA not available\\n");
            return 1;
        }

        // Allocate memory on specific node
        int node = 0;  // CPU node 0
        void* memory = numa_alloc_onnode(4096, node);

        if (memory != NULL) {
            printf("Allocated memory on NUMA node %d\\n", node);

            // Get preferred node for current thread
            int preferred_node = numa_preferred();
            printf("Preferred node: %d\\n", preferred_node);

            numa_free(memory, 4096);
        }
    #else
        printf("NUMA support not compiled\\n");
    #endif

    return 0;
}
\`\`\`

---

## 🧪 Complete Library Comparison

### Performance Benchmark

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define ITERATIONS 1000000
#define ALLOC_SIZE 128

double benchmark_allocator(const char* name,
                          void* (*alloc_func)(size_t),
                          void (*free_func)(void*)) {
    void* pointers[ITERATIONS];
    clock_t start = clock();

    // Allocate
    for (int i = 0; i < ITERATIONS; i++) {
        pointers[i] = alloc_func(ALLOC_SIZE);
        if (pointers[i] == NULL) {
            fprintf(stderr, "Allocation failed at %d\\n", i);
            return -1.0;
        }
    }

    // Free
    for (int i = 0; i < ITERATIONS; i++) {
        free_func(pointers[i]);
    }

    clock_t end = clock();
    double time_taken = (double)(end - start) / CLOCKS_PER_SEC;

    printf("%s: %.3f seconds for %d allocations\\n",
           name, time_taken, ITERATIONS);

    return time_taken;
}

int main() {
    printf("Memory allocator performance comparison\\n");
    printf("Allocating %d blocks of %d bytes each\\n\\n", ITERATIONS, ALLOC_SIZE);

    // Standard malloc
    benchmark_allocator("Standard malloc", malloc, free);

    // If other allocators are available, test them too
    #ifdef USE_JEMALLOC
        // jemalloc would be linked
        benchmark_allocator("jemalloc", malloc, free);
    #endif

    #ifdef USE_TCMALLOC
        benchmark_allocator("tcmalloc", malloc, free);
    #endif

    return 0;
}
\`\`\`

### Memory Usage Analysis

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <malloc.h>  // GNU extension

void analyze_heap() {
    #ifdef __GLIBC__
        // GNU malloc statistics
        struct mallinfo info = mallinfo();

        printf("Heap analysis:\\n");
        printf("  Total allocated space: %d bytes\\n", info.arena);
        printf("  Ordinary blocks: %d bytes\\n", info.ordblks);
        printf("  Small blocks: %d bytes\\n", info.smblks);
        printf("  Holding blocks: %d bytes\\n", info.hblks);
        printf("  Free chunks: %d\\n", info.ordblks);
        printf("  Free fastbin blocks: %d\\n", info.smblks);
        printf("  Free arenas: %d\\n", info.hblks);

        // Memory usage summary
        printf("\\nMemory usage: %d KB total heap\\n", info.arena / 1024);
    #else
        printf("Heap analysis not available on this platform\\n");
    #endif
}

int main() {
    // Allocate some memory
    void* ptrs[100];
    for (int i = 0; i < 100; i++) {
        ptrs[i] = malloc(1024);
    }

    analyze_heap();

    // Free some
    for (int i = 0; i < 50; i++) {
        free(ptrs[i]);
    }

    analyze_heap();

    // Cleanup
    for (int i = 50; i < 100; i++) {
        free(ptrs[i]);
    }

    return 0;
}
\`\`\`

---

## 🎯 Choosing the Right Allocator

### Use Case Guidelines

| Allocator | Best For | Avoid For |
|-----------|----------|-----------|
| **Standard malloc** | General-purpose, simple programs | High-performance, multi-threaded apps |
| **jemalloc** | Multi-threaded applications, low fragmentation | Simple single-threaded programs |
| **tcmalloc** | High-throughput multi-threaded apps | Memory-constrained environments |
| **mimalloc** | General-purpose, secure applications | Legacy systems |
| **Pool allocators** | Frequent small allocations | Variable-sized allocations |
| **Arena allocators** | Scoped memory management | Long-lived data structures |

### Integration Strategies

\`\`\`c
// Conditional compilation for different allocators
#ifdef USE_JEMALLOC
    #include <jemalloc/jemalloc.h>
    #define MALLOC(size) je_malloc(size)
    #define FREE(ptr) je_free(ptr)
    #define REALLOC(ptr, size) je_realloc(ptr, size)
#else
    #define MALLOC(size) malloc(size)
    #define FREE(ptr) free(ptr)
    #define REALLOC(ptr, size) realloc(ptr, size)
#endif

// Custom allocation wrapper
typedef struct {
    void* (*malloc_func)(size_t);
    void* (*realloc_func)(void*, size_t);
    void (*free_func)(void*);

    // Statistics
    size_t total_allocated;
    size_t peak_usage;
    size_t allocation_count;
} Allocator;

void* allocator_malloc(Allocator* alloc, size_t size) {
    void* ptr = alloc->malloc_func(size);

    if (ptr != NULL) {
        alloc->total_allocated += size;
        alloc->allocation_count++;

        if (alloc->total_allocated > alloc->peak_usage) {
            alloc->peak_usage = alloc->total_allocated;
        }
    }

    return ptr;
}

// Usage
int main() {
    Allocator alloc = {
        .malloc_func = MALLOC,
        .realloc_func = REALLOC,
        .free_func = FREE,
        .total_allocated = 0,
        .peak_usage = 0,
        .allocation_count = 0
    };

    int* arr = allocator_malloc(&alloc, 100 * sizeof(int));

    if (arr != NULL) {
        printf("Allocated %zu bytes, total allocated: %zu\\n",
               100 * sizeof(int), alloc.total_allocated);

        alloc.free_func(arr);
    }

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Standard library** provides basic but essential memory functions
2. **High-performance allocators** like jemalloc and tcmalloc optimize for specific use cases
3. **Memory advice** helps systems optimize memory usage patterns
4. **NUMA awareness** improves performance on multi-socket systems
5. **Allocator selection** depends on application requirements
6. **Profiling and monitoring** help choose the best allocation strategy

---

## 🚀 Module 10 Complete!

**Congratulations!** You've mastered advanced memory management in C:

- ✅ **Advanced allocation** strategies and custom allocators
- ✅ **Memory debugging tools** (Valgrind, AddressSanitizer)
- ✅ **Memory leaks** prevention and detection
- ✅ **Memory fragmentation** causes and solutions
- ✅ **Memory management libraries** and high-performance allocators

**Ready for Module 11: Command Line Arguments?** Programs need to interact with users and the system through command-line interfaces! 💻

This module will cover:
- `main()` function signatures and argument parsing
- `argc` and `argv` usage
- Option parsing with `getopt()`
- Environment variables
- Exit codes and program termination

Let's continue building your comprehensive C programming course! 🚀

