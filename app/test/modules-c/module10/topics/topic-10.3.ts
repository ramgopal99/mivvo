import { SubLesson } from '../../../data/lessonsData';

export const topic_10_3: SubLesson = {
  id: 10.3,
  title: 'Memory Leaks and Prevention',
  status: 'completed',
  content: `# 💧 Memory Leaks and Prevention

Master memory leak detection, prevention techniques, and automatic memory management strategies for robust C programs.

---

## 🎯 Understanding Memory Leaks

### What is a Memory Leak?

**A memory leak occurs when dynamically allocated memory is not properly deallocated, causing the program to consume increasing amounts of memory over time.**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

void leaky_function() {
    // Allocate memory
    int* data = malloc(100 * sizeof(int));

    if (data == NULL) return;

    // Use memory
    for (int i = 0; i < 100; i++) {
        data[i] = i;
    }

    // Forget to free!
    // free(data);  // ❌ Memory leak
}

int main() {
    // Call function multiple times
    for (int i = 0; i < 1000; i++) {
        leaky_function();  // 1000 memory leaks!
    }

    printf("Program finished\\n");
    return 0;
}
\`\`\`

### Leak Detection Tools

\`\`\`bash
# Valgrind leak check
valgrind --tool=memcheck --leak-check=full ./program

# AddressSanitizer (detects leaks at exit)
gcc -fsanitize=address -fsanitize=leak program.c -o program

# Custom leak detector
#include "leak_detector.h"  // Custom header
\`\`\`

---

## 🛡️ Prevention Strategies

### RAII Pattern in C

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    FILE* file;
    char* buffer;
    size_t buffer_size;
} FileProcessor;

FileProcessor* fp_create(const char* filename) {
    FileProcessor* fp = calloc(1, sizeof(FileProcessor));
    if (fp == NULL) return NULL;

    fp->file = fopen(filename, "r");
    if (fp->file == NULL) {
        free(fp);
        return NULL;
    }

    fp->buffer_size = 1024;
    fp->buffer = malloc(fp->buffer_size);
    if (fp->buffer == NULL) {
        fclose(fp->file);
        free(fp);
        return NULL;
    }

    return fp;
}

void fp_destroy(FileProcessor* fp) {
    if (fp == NULL) return;

    if (fp->file) fclose(fp->file);
    if (fp->buffer) free(fp->buffer);
    free(fp);
}

#define CLEANUP goto cleanup; cleanup:

int process_file(const char* filename) {
    FileProcessor* fp = fp_create(filename);
    if (fp == NULL) return -1;

    // Process file...
    char line[256];
    while (fgets(line, sizeof(line), fp->file)) {
        // Process line
        if (strlen(line) > 100) {
            fp_destroy(fp);
            return -1;  // Early return, but memory is leaked!
        }
    }

    fp_destroy(fp);
    return 0;
}

// Better version with cleanup
int process_file_safe(const char* filename) {
    int result = -1;
    FileProcessor* fp = NULL;

    fp = fp_create(filename);
    if (fp == NULL) CLEANUP;

    // Process file...
    char line[256];
    while (fgets(line, sizeof(line), fp->file)) {
        if (strlen(line) > 100) CLEANUP;
        // Process line...
    }

    result = 0;

cleanup:
    fp_destroy(fp);
    return result;
}
\`\`\`

### Reference Counting

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int* data;
    size_t size;
    int ref_count;
} SharedArray;

SharedArray* shared_array_create(size_t size) {
    SharedArray* arr = malloc(sizeof(SharedArray));
    if (arr == NULL) return NULL;

    arr->data = calloc(size, sizeof(int));
    if (arr->data == NULL) {
        free(arr);
        return NULL;
    }

    arr->size = size;
    arr->ref_count = 1;

    return arr;
}

SharedArray* shared_array_retain(SharedArray* arr) {
    if (arr != NULL) {
        arr->ref_count++;
    }
    return arr;
}

void shared_array_release(SharedArray* arr) {
    if (arr == NULL) return;

    arr->ref_count--;

    if (arr->ref_count == 0) {
        free(arr->data);
        free(arr);
    }
}

int main() {
    SharedArray* arr = shared_array_create(10);

    // Multiple references
    SharedArray* ref1 = shared_array_retain(arr);
    SharedArray* ref2 = shared_array_retain(arr);

    // Use array through different references
    arr->data[0] = 42;
    ref1->data[1] = 24;

    // Release references
    shared_array_release(ref1);
    shared_array_release(ref2);

    // Array still exists (ref_count = 1)
    printf("Array[0] = %d\\n", arr->data[0]);

    shared_array_release(arr);  // Now freed

    return 0;
}
\`\`\`

---

## 🧠 Smart Pointer Implementation

### Simple Smart Pointer

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    void* ptr;
    void (*destructor)(void*);
} SmartPtr;

SmartPtr* smart_ptr_create(void* ptr, void (*destructor)(void*)) {
    SmartPtr* sp = malloc(sizeof(SmartPtr));
    if (sp == NULL) return NULL;

    sp->ptr = ptr;
    sp->destructor = destructor;

    return sp;
}

void* smart_ptr_get(SmartPtr* sp) {
    return sp ? sp->ptr : NULL;
}

void smart_ptr_destroy(SmartPtr* sp) {
    if (sp == NULL) return;

    if (sp->destructor && sp->ptr) {
        sp->destructor(sp->ptr);
    }

    free(sp);
}

#define AUTO_PTR(ptr, dtor) \\
    __attribute__((cleanup(smart_ptr_destroy))) \\
    SmartPtr* auto_ptr = smart_ptr_create(ptr, dtor)

void free_int(void* ptr) { free(*(int**)ptr); }

int main() {
    // Automatic cleanup
    AUTO_PTR(malloc(sizeof(int)), free_int);

    int* value = smart_ptr_get(auto_ptr);
    *value = 42;

    printf("Value: %d\\n", *value);

    // Automatic cleanup when scope ends
    return 0;
}
\`\`\`

---

## 🎯 Leak Detection Algorithms

### Mark and Sweep

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <setjmp.h>

#define POOL_SIZE 1000

typedef struct Block {
    size_t size;
    int marked;
    struct Block* next;
    char data[];  // Flexible array
} Block;

typedef struct {
    char pool[POOL_SIZE];
    Block* free_list;
    Block* allocations;
    jmp_buf gc_context;
} GC;

void gc_init(GC* gc) {
    gc->free_list = (Block*)gc->pool;
    gc->free_list->size = POOL_SIZE - sizeof(Block);
    gc->free_list->next = NULL;
    gc->allocations = NULL;
}

void* gc_alloc(GC* gc, size_t size) {
    // Find free block
    Block* prev = NULL;
    Block* curr = gc->free_list;

    while (curr && curr->size < size + sizeof(Block)) {
        prev = curr;
        curr = curr->next;
    }

    if (curr == NULL) {
        // Trigger garbage collection
        longjmp(gc->gc_context, 1);
    }

    // Split block if necessary
    size_t remaining = curr->size - size - sizeof(Block);
    if (remaining > sizeof(Block)) {
        Block* new_block = (Block*)&curr->data[size];
        new_block->size = remaining;
        new_block->next = curr->next;

        curr->size = size;
        curr->next = new_block;
    }

    // Remove from free list
    if (prev) {
        prev->next = curr->next;
    } else {
        gc->free_list = curr->next;
    }

    // Add to allocations
    curr->marked = 0;
    curr->next = gc->allocations;
    gc->allocations = curr;

    return curr->data;
}

void gc_mark(GC* gc, void* ptr) {
    if (ptr == NULL) return;

    Block* block = (Block*)((char*)ptr - sizeof(Block));
    block->marked = 1;
}

void gc_sweep(GC* gc) {
    Block* prev = NULL;
    Block* curr = gc->allocations;

    while (curr) {
        if (!curr->marked) {
            // Remove from allocations and add to free list
            Block* to_free = curr;

            if (prev) {
                prev->next = curr->next;
                curr = curr->next;
            } else {
                gc->allocations = curr->next;
                curr = curr->next;
            }

            // Add to free list
            to_free->next = gc->free_list;
            gc->free_list = to_free;

        } else {
            curr->marked = 0;  // Reset for next GC
            prev = curr;
            curr = curr->next;
        }
    }
}

#define GC_ALLOC(gc, size) gc_alloc(gc, size)
#define GC_ROOT(gc, ptr) gc_mark(gc, ptr)

int main() {
    GC gc;
    gc_init(&gc);

    if (setjmp(gc.gc_context) == 0) {
        // Allocate some data
        int* arr = GC_ALLOC(&gc, 10 * sizeof(int));

        for (int i = 0; i < 10; i++) {
            arr[i] = i * 2;
        }

        // Mark what we want to keep
        GC_ROOT(&gc, arr);

        // Simulate allocation pressure to trigger GC
        for (int i = 0; i < 100; i++) {
            GC_ALLOC(&gc, 50);
        }

    } else {
        // GC triggered
        printf("Garbage collection triggered\\n");
        gc_sweep(&gc);
    }

    return 0;
}
\`\`\`

---

## 🛡️ Prevention Best Practices

### Consistent Patterns

\`\`\`c
// 1. Check all allocations
void* safe_malloc(size_t size) {
    void* ptr = malloc(size);
    if (ptr == NULL) {
        fprintf(stderr, "Memory allocation failed\\n");
        exit(1);
    }
    return ptr;
}

// 2. Use cleanup macros
#define CLEANUP_AND_RETURN(value) do { \\
    cleanup_resources(); \\
    return (value); \\
} while(0)

// 3. Resource management structure
typedef struct {
    void** resources;
    size_t count;
    size_t capacity;
} ResourceManager;

void rm_init(ResourceManager* rm) {
    rm->resources = NULL;
    rm->count = 0;
    rm->capacity = 0;
}

void rm_add(ResourceManager* rm, void* resource, void (*cleanup)(void*)) {
    // Add resource with cleanup function
    // Implementation...
}

void rm_cleanup(ResourceManager* rm) {
    for (size_t i = 0; i < rm->count; i++) {
        // Call cleanup function for each resource
    }
    free(rm->resources);
}
\`\`\`

### Code Review Checklist

- [ ] All `malloc()` calls have corresponding `free()`
- [ ] Error paths don't leak resources
- [ ] Large data structures are properly managed
- [ ] Third-party libraries' cleanup functions are called
- [ ] File descriptors and sockets are closed
- [ ] Shared memory segments are detached and removed

---

## 🎯 Key Takeaways

1. **Memory leaks** cause programs to consume increasing memory
2. **RAII patterns** ensure cleanup on scope exit
3. **Reference counting** manages shared resources
4. **Smart pointers** provide automatic memory management
5. **Garbage collection** can be implemented in C
6. **Prevention** is better than detection
7. **Consistent patterns** reduce leak opportunities

---

## 🚀 Preview: Memory Fragmentation

In the next topic, you'll learn about:
- **Memory fragmentation** causes and effects
- **Compaction algorithms** and defragmentation
- **Allocation strategies** to minimize fragmentation
- **Virtual memory** and paging concepts
- **Memory-mapped files** for large datasets

**Understanding fragmentation is key to efficient memory usage!** 🧩

