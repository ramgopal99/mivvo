import { SubLesson } from '../../../data/lessonsData';

export const topic_10_2: SubLesson = {
  id: 10.2,
  title: 'Memory Debugging Tools',
  status: 'completed',
  content: `# 🐛 Memory Debugging Tools

Master professional memory debugging tools and techniques including Valgrind, AddressSanitizer, and custom debugging utilities for robust C programming.

---

## 🎯 Valgrind: Comprehensive Memory Analysis

### Valgrind Overview

**Valgrind is a powerful instrumentation framework for building dynamic analysis tools, with Memcheck being its most popular tool for memory debugging.**

\`\`\`bash
# Basic usage
gcc -g program.c -o program
valgrind --tool=memcheck ./program

# With detailed leak checking
valgrind --tool=memcheck --leak-check=full ./program

# Track origins of uninitialized values
valgrind --tool=memcheck --track-origins=yes ./program
\`\`\`

### Common Valgrind Errors

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main() {
    // Invalid read
    int* ptr = malloc(sizeof(int));
    free(ptr);
    // printf("%d\\n", *ptr);  // Invalid read of freed memory

    // Invalid write
    int arr[10];
    // arr[15] = 42;  // Invalid write beyond array bounds

    // Memory leak
    int* leak = malloc(sizeof(int));
    *leak = 100;
    // No free(leak);  // Memory leak

    // Uninitialized value
    int uninit;
    // if (uninit > 0) { ... }  // Conditional jump on uninitialized value

    return 0;
}
\`\`\`

### Valgrind Output Interpretation

\`\`\`
==12345== Invalid read of size 4
==12345==    at 0x4005B4: main (program.c:12)
==12345==  Address 0x51b0040 is 0 bytes inside a block of size 4 free'd
==12345==    at 0x4C2EDEB: free (vg_replace_malloc.c:530)
==12345==    by 0x4005AF: main (program.c:11)
==12345==  Block was alloc'd at
==12345==    at 0x4C2CE5F: malloc (vg_replace_malloc.c:299)
==12345==    by 0x4005A3: main (program.c:10)

==12345== 4 bytes in 1 blocks are definitely lost in loss record 1 of 1
==12345==    at 0x4C2CE5F: malloc (vg_replace_malloc.c:299)
==12345==    by 0x4005C5: main (program.c:18)
\`\`\`

---

## 🔍 AddressSanitizer: Fast Memory Error Detection

### AddressSanitizer Overview

**AddressSanitizer (ASan) is a fast memory error detector that adds instrumentation to detect out-of-bounds accesses, use-after-free, and other memory issues.**

\`\`\`bash
# Compile with AddressSanitizer
gcc -fsanitize=address -g program.c -o program

# Run program (ASan will detect and report errors)
./program

# Also works with undefined behavior detection
gcc -fsanitize=address -fsanitize=undefined -g program.c -o program
\`\`\`

### ASan Error Examples

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void stack_buffer_overflow() {
    char buffer[10];
    strcpy(buffer, "This string is way too long for this buffer");
}

void heap_buffer_overflow() {
    char* ptr = malloc(10);
    strcpy(ptr, "This string is way too long for this allocation");
    free(ptr);
}

void use_after_free() {
    int* ptr = malloc(sizeof(int));
    *ptr = 42;
    free(ptr);
    printf("Value: %d\\n", *ptr);  // Use after free
}

void double_free() {
    int* ptr = malloc(sizeof(int));
    free(ptr);
    free(ptr);  // Double free
}

int main(int argc, char* argv[]) {
    if (argc > 1) {
        if (strcmp(argv[1], "stack") == 0) stack_buffer_overflow();
        if (strcmp(argv[1], "heap") == 0) heap_buffer_overflow();
        if (strcmp(argv[1], "uaf") == 0) use_after_free();
        if (strcmp(argv[1], "double") == 0) double_free();
    }

    return 0;
}
\`\`\`

### ASan Output Example

\`\`\`
=================================================================
==12345==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x602000000010 at pc 0x55a1b3c7d1a3 bp 0x7ffc8b2d8c60 sp 0x7ffc8b2d8c50
WRITE of size 1 at 0x602000000010 thread T0
    #0 0x55a1b3c7d1a2 in heap_buffer_overflow() program.c:10
    #1 0x55a1b3c7d23e in main program.c:28
    #2 0x7f8b8c2d4082 in __libc_start_main

0x602000000010 is located 0 bytes to the right of 10-byte region [0x602000000000,0x60200000000a)
allocated by thread T0 here:
    #0 0x7f8b8c6b9d28 in __interceptor_malloc
    #1 0x55a1b3c7d18e in heap_buffer_overflow() program.c:9
\`\`\`

---

## 🧪 Custom Memory Debugging Utilities

### Memory Leak Detector

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <execinfo.h>
#include <signal.h>

#define MAX_ALLOCATIONS 10000

typedef struct {
    void* ptr;
    size_t size;
    const char* file;
    int line;
    void* backtrace[10];
    int backtrace_size;
} AllocationInfo;

static AllocationInfo allocations[MAX_ALLOCATIONS];
static size_t allocation_count = 0;

void* debug_malloc(size_t size, const char* file, int line) {
    void* ptr = malloc(size);

    if (ptr != NULL && allocation_count < MAX_ALLOCATIONS) {
        allocations[allocation_count].ptr = ptr;
        allocations[allocation_count].size = size;
        allocations[allocation_count].file = file;
        allocations[allocation_count].line = line;
        allocations[allocation_count].backtrace_size =
            backtrace(allocations[allocation_count].backtrace, 10);
        allocation_count++;
    }

    return ptr;
}

void debug_free(void* ptr) {
    if (ptr == NULL) return;

    // Find and remove allocation
    for (size_t i = 0; i < allocation_count; i++) {
        if (allocations[i].ptr == ptr) {
            // Move last allocation to this position
            allocations[i] = allocations[allocation_count - 1];
            allocation_count--;
            free(ptr);
            return;
        }
    }

    fprintf(stderr, "ERROR: Attempting to free unknown pointer %p\\n", ptr);
    free(ptr);
}

void dump_leaks() {
    if (allocation_count == 0) {
        printf("No memory leaks detected.\\n");
        return;
    }

    printf("MEMORY LEAKS DETECTED: %zu allocations\\n", allocation_count);

    for (size_t i = 0; i < allocation_count; i++) {
        printf("\\nLeak %zu: %zu bytes allocated at %s:%d\\n",
               i + 1, allocations[i].size,
               allocations[i].file, allocations[i].line);

        printf("Backtrace:\\n");
        backtrace_symbols_fd(allocations[i].backtrace,
                           allocations[i].backtrace_size, 1);
    }
}

void signal_handler(int sig) {
    printf("\\nReceived signal %d, dumping memory leaks...\\n", sig);
    dump_leaks();
    exit(1);
}

#define malloc(size) debug_malloc(size, __FILE__, __LINE__)
#define free(ptr) debug_free(ptr)

int main() {
    // Install signal handlers
    signal(SIGABRT, signal_handler);
    signal(SIGSEGV, signal_handler);
    signal(SIGINT, signal_handler);

    // Test allocations
    int* arr = malloc(100 * sizeof(int));
    char* str = malloc(50);

    // Simulate leak
    int* leak = malloc(sizeof(int));
    *leak = 42;

    // Free some
    free(arr);

    // Exit without freeing leak and str
    printf("Program exiting, checking for leaks...\\n");
    dump_leaks();

    return 0;
}
\`\`\`

### Bounds Checking Wrapper

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define CANARY_SIZE 8
#define CANARY_VALUE 0xDEADBEEFCAFEBABE

typedef struct {
    size_t requested_size;
    unsigned long canary_start;
    char data[];
} BoundsCheckedBlock;

void* safe_malloc(size_t size) {
    size_t total_size = sizeof(BoundsCheckedBlock) + size + CANARY_SIZE;
    BoundsCheckedBlock* block = malloc(total_size);

    if (block == NULL) return NULL;

    block->requested_size = size;
    block->canary_start = CANARY_VALUE;

    // Set end canary
    unsigned long* end_canary = (unsigned long*)&block->data[size];
    *end_canary = CANARY_VALUE;

    return block->data;
}

void safe_free(void* ptr) {
    if (ptr == NULL) return;

    BoundsCheckedBlock* block = (BoundsCheckedBlock*)
        ((char*)ptr - offsetof(BoundsCheckedBlock, data));

    // Check canaries
    int corruption = 0;

    if (block->canary_start != CANARY_VALUE) {
        fprintf(stderr, "Buffer underflow detected!\\n");
        corruption = 1;
    }

    unsigned long* end_canary = (unsigned long*)&block->data[block->requested_size];
    if (*end_canary != CANARY_VALUE) {
        fprintf(stderr, "Buffer overflow detected!\\n");
        corruption = 1;
    }

    if (corruption) {
        fprintf(stderr, "Memory corruption detected, not freeing\\n");
        return;
    }

    free(block);
}

int main() {
    char* buffer = safe_malloc(20);

    if (buffer) {
        strcpy(buffer, "Hello World");

        // This would be caught
        // buffer[25] = '!';  // Buffer overflow

        printf("Buffer content: %s\\n", buffer);

        safe_free(buffer);
    }

    return 0;
}
\`\`\`

---

## 📊 Memory Profiling Techniques

### Allocation Statistics

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

typedef struct {
    size_t total_allocated;
    size_t current_used;
    size_t peak_used;
    size_t allocation_count;
    size_t free_count;
    clock_t start_time;
} MemoryProfile;

static MemoryProfile profile = {0};

void profile_init() {
    memset(&profile, 0, sizeof(profile));
    profile.start_time = clock();
}

void* profile_malloc(size_t size) {
    void* ptr = malloc(size);

    if (ptr != NULL) {
        profile.total_allocated += size;
        profile.current_used += size;
        profile.peak_used = profile.current_used > profile.peak_used ?
                           profile.current_used : profile.peak_used;
        profile.allocation_count++;
    }

    return ptr;
}

void profile_free(void* ptr, size_t size) {
    if (ptr != NULL) {
        free(ptr);
        profile.current_used -= size;
        profile.free_count++;
    }
}

void profile_report() {
    clock_t end_time = clock();
    double elapsed = (double)(end_time - profile.start_time) / CLOCKS_PER_SEC;

    printf("\\n=== Memory Profile Report ===\\n");
    printf("Total allocated: %zu bytes\\n", profile.total_allocated);
    printf("Current used: %zu bytes\\n", profile.current_used);
    printf("Peak used: %zu bytes\\n", profile.peak_used);
    printf("Allocations: %zu\\n", profile.allocation_count);
    printf("Frees: %zu\\n", profile.free_count);
    printf("Elapsed time: %.2f seconds\\n", elapsed);

    if (profile.allocation_count > 0) {
        printf("Average allocation size: %.1f bytes\\n",
               (double)profile.total_allocated / profile.allocation_count);
    }

    printf("Memory efficiency: %.1f%%\\n",
           profile.peak_used > 0 ?
           (double)profile.total_allocated / profile.peak_used * 100 : 0);
}

#define malloc(size) profile_malloc(size)
#define free(ptr) (profile_free(ptr, 0), free(ptr))  // Simplified

int main() {
    profile_init();

    // Simulate memory usage
    int* arr1 = malloc(1000 * sizeof(int));
    char* str1 = malloc(500);
    double* arr2 = malloc(200 * sizeof(double));

    free(arr1);
    free(str1);

    // Allocate more
    int* arr3 = malloc(500 * sizeof(int));

    profile_report();

    free(arr2);
    free(arr3);

    return 0;
}
\`\`\`

---

## 🎯 Debugging Strategies

### Systematic Debugging Approach

1. **Reproduce the issue** consistently
2. **Use AddressSanitizer** for quick detection (fast compilation)
3. **Use Valgrind** for detailed analysis (slower but thorough)
4. **Add bounds checking** to custom allocators
5. **Track allocation patterns** with profiling
6. **Use conditional compilation** for debug builds

### Common Memory Issues

\`\`\`c
// Buffer overflow
char buffer[10];
strcpy(buffer, "This is too long");  // Overflow!

// Use-after-free
int* ptr = malloc(sizeof(int));
free(ptr);
*ptr = 42;  // Use after free

// Double free
int* ptr = malloc(sizeof(int));
free(ptr);
free(ptr);  // Double free

// Memory leak
void leaky_function() {
    int* ptr = malloc(sizeof(int));
    // Forgot to free!
}

// Uninitialized access
int uninit;
if (uninit > 0) { ... }  // Uninitialized value
\`\`\`

### Prevention Techniques

\`\`\`c
// Always check allocations
int* ptr = malloc(sizeof(int));
if (ptr == NULL) {
    // Handle error
    return -1;
}

// Use safe string functions
char buffer[100];
// strcpy(buffer, input);  // Unsafe
strncpy(buffer, input, sizeof(buffer) - 1);
buffer[sizeof(buffer) - 1] = '\\0';  // Ensure null termination

// Initialize variables
int value = 0;  // Explicit initialization
struct Data* data = NULL;

// Use const for read-only pointers
const char* readonly = "constant string";

// RAII-like cleanup
#define CLEANUP(label) goto label; label:
int error_code = 0;
FILE* file = fopen("data.txt", "r");
if (file == NULL) {
    error_code = -1;
    CLEANUP;
}

// Cleanup code
if (file) fclose(file);
return error_code;
\`\`\`

---

## 🧪 Complete Debugging Example

### Memory Corruption Detector

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

#define MAGIC_FREE 0xDEADBEEF
#define MAGIC_ALLOC 0xCAFEBABE

typedef struct BlockHeader {
    uint32_t magic;
    size_t size;
    const char* file;
    int line;
    struct BlockHeader* next;
    struct BlockHeader* prev;
} BlockHeader;

static BlockHeader* allocation_list = NULL;

void* debug_malloc(size_t size, const char* file, int line) {
    size_t total_size = sizeof(BlockHeader) + size + sizeof(uint32_t);
    BlockHeader* header = malloc(total_size);

    if (header == NULL) return NULL;

    header->magic = MAGIC_ALLOC;
    header->size = size;
    header->file = file;
    header->line = line;

    // Set canary at end
    uint32_t* canary = (uint32_t*)((char*)(header + 1) + size);
    *canary = MAGIC_ALLOC;

    // Add to allocation list
    header->next = allocation_list;
    header->prev = NULL;
    if (allocation_list) {
        allocation_list->prev = header;
    }
    allocation_list = header;

    return header + 1;
}

void debug_free(void* ptr) {
    if (ptr == NULL) return;

    BlockHeader* header = (BlockHeader*)ptr - 1;

    // Validate magic number
    if (header->magic != MAGIC_ALLOC) {
        fprintf(stderr, "ERROR: Invalid free - not an allocated block\\n");
        return;
    }

    // Check canary
    uint32_t* canary = (uint32_t*)((char*)ptr + header->size);
    if (*canary != MAGIC_ALLOC) {
        fprintf(stderr, "ERROR: Buffer overflow detected at %s:%d\\n",
                header->file, header->line);
    }

    // Remove from allocation list
    if (header->prev) {
        header->prev->next = header->next;
    } else {
        allocation_list = header->next;
    }
    if (header->next) {
        header->next->prev = header->prev;
    }

    // Mark as freed
    header->magic = MAGIC_FREE;
    free(header);
}

void debug_check_heap() {
    BlockHeader* current = allocation_list;
    int leak_count = 0;

    while (current) {
        // Check canary
        uint32_t* canary = (uint32_t*)((char*)(current + 1) + current->size);
        if (*canary != MAGIC_ALLOC) {
            fprintf(stderr, "HEAP CORRUPTION: Block at %s:%d\\n",
                    current->file, current->line);
        }
        leak_count++;
        current = current->next;
    }

    if (leak_count > 0) {
        fprintf(stderr, "MEMORY LEAKS: %d unfreed allocations\\n", leak_count);
        current = allocation_list;
        while (current) {
            fprintf(stderr, "  Leak: %zu bytes at %s:%d\\n",
                    current->size, current->file, current->line);
            current = current->next;
        }
    } else {
        printf("No memory leaks detected\\n");
    }
}

#define malloc(size) debug_malloc(size, __FILE__, __LINE__)
#define free(ptr) debug_free(ptr)

int main() {
    atexit(debug_check_heap);

    int* arr = malloc(10 * sizeof(int));

    for (int i = 0; i < 10; i++) {
        arr[i] = i * 2;
    }

    // Simulate buffer overflow
    // arr[15] = 999;  // This would be caught

    free(arr);

    // Simulate leak
    // int* leak = malloc(sizeof(int));  // This would be reported

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Valgrind** provides comprehensive memory analysis but is slower
2. **AddressSanitizer** offers fast memory error detection with minimal overhead
3. **Custom debugging allocators** can detect leaks and corruption
4. **Bounds checking** prevents buffer overflows
5. **Memory profiling** helps optimize allocation patterns
6. **Systematic debugging** approach finds issues efficiently
7. **Prevention is better than cure** - write defensive code

---

## 🚀 Preview: Memory Leaks and Prevention

In the next topic, you'll learn about:
- **Memory leak detection** algorithms and tools
- **Reference counting** and automatic memory management
- **Smart pointers** implementation in C
- **RAII patterns** for resource management
- **Garbage collection** concepts and implementation

**Preventing memory leaks is crucial for stable, long-running programs!** 💧

