import { SubLesson } from '../../../data/lessonsData';

export const topic_6_7: SubLesson = {
  id: 6.7,
  title: 'Pointer Pitfalls and Best Practices',
  status: 'completed',
  content: `# 🛡️ Pointer Pitfalls and Best Practices

Learn to avoid common pointer mistakes and master safe pointer programming techniques for robust C code.

---

## 🚨 Common Pointer Mistakes

### Uninitialized Pointers

\`\`\`c
#include <stdio.h>

int main() {
    int* ptr;  // Uninitialized - contains garbage

    // This might crash or give wrong results
    // *ptr = 42;  // ❌ Undefined behavior

    printf("Uninitialized pointer: %p\\n", ptr);

    return 0;
}
\`\`\`

**Fix:**
\`\`\`c
int* ptr = NULL;  // Safe initialization

// Or initialize with valid address
int x = 42;
int* ptr = &x;
\`\`\`

### Null Pointer Dereference

\`\`\`c
#include <stdio.h>

int main() {
    int* ptr = NULL;

    // This will crash the program
    // *ptr = 42;  // ❌ Segmentation fault

    // Safe usage
    if (ptr != NULL) {
        *ptr = 42;
    } else {
        printf("Pointer is NULL\\n");
    }

    return 0;
}
\`\`\`

### Dangling Pointers

\`\`\`c
#include <stdlib.h>

int* create_dangling_pointer() {
    int local_var = 42;
    return &local_var;  // ❌ Returns address of local variable
}

int main() {
    int* dangling = create_dangling_pointer();
    // local_var no longer exists, but dangling still points to it

    // This is undefined behavior - might crash or give wrong values
    // printf("%d\\n", *dangling);

    return 0;
}
\`\`\`

**Fixes:**
\`\`\`c
// Use static variable
int* safe_function1() {
    static int static_var = 42;
    return &static_var;  // Static variables persist
}

// Use dynamic allocation
int* safe_function2() {
    int* ptr = (int*)malloc(sizeof(int));
    if (ptr != NULL) {
        *ptr = 42;
    }
    return ptr;  // Caller must free this
}
\`\`\`

### Memory Leaks

\`\`\`c
#include <stdlib.h>

void memory_leak() {
    int* ptr = (int*)malloc(sizeof(int));
    *ptr = 42;

    // Forgot to free! Memory leak
}

int main() {
    for (int i = 0; i < 1000; i++) {
        memory_leak();  // 1000 memory leaks!
    }

    return 0;
}
\`\`\`

### Double Free

\`\`\`c
#include <stdlib.h>

int main() {
    int* ptr = (int*)malloc(sizeof(int));

    free(ptr);     // First free - OK
    // free(ptr);  // Second free - Undefined behavior!

    return 0;
}
\`\`\`

### Accessing Freed Memory

\`\`\`c
#include <stdlib.h>

int main() {
    int* ptr = (int*)malloc(sizeof(int));
    *ptr = 42;

    free(ptr);

    // Memory is freed, but pointer still points there
    // *ptr = 100;  // ❌ Undefined behavior

    return 0;
}
\`\`\`

---

## 🛠️ Debugging Pointer Issues

### Using printf for Debugging

\`\`\`c
#include <stdio.h>

void debug_pointer(int* ptr, const char* name) {
    printf("Pointer %s:\\n", name);
    printf("  Address: %p\\n", (void*)ptr);

    if (ptr != NULL) {
        printf("  Value: %d\\n", *ptr);
    } else {
        printf("  Value: NULL\\n");
    }
}

int main() {
    int x = 42;
    int* ptr1 = &x;
    int* ptr2 = NULL;

    debug_pointer(ptr1, "ptr1");
    debug_pointer(ptr2, "ptr2");

    return 0;
}
\`\`\`

### Valgrind for Memory Debugging

\`\`\`bash
# Compile with debug symbols
gcc -g -o program program.c

# Run with valgrind
valgrind --leak-check=full ./program

# Check for memory leaks, invalid accesses, etc.
\`\`\`

### AddressSanitizer

\`\`\`bash
# Compile with AddressSanitizer
gcc -fsanitize=address -g -o program program.c

# Run program - will detect memory errors
./program
\`\`\`

---

## 🛡️ Pointer Safety Best Practices

### Always Initialize Pointers

\`\`\`c
// ✅ Good
int* ptr = NULL;
int x = 42;
int* ptr2 = &x;

// ❌ Bad
int* ptr3;  // Garbage value
\`\`\`

### Check for NULL Before Dereferencing

\`\`\`c
void safe_dereference(int* ptr) {
    if (ptr != NULL) {
        *ptr = 42;
    } else {
        printf("Error: NULL pointer\\n");
    }
}
\`\`\`

### Set Pointers to NULL After Freeing

\`\`\`c
int* ptr = (int*)malloc(sizeof(int));
*ptr = 42;

// Use ptr...

free(ptr);
ptr = NULL;  // Prevent dangling pointer
\`\`\`

### Use const for Pointers You Don't Modify

\`\`\`c
// Pointer to constant data
void print_array(const int* arr, int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
        // arr[i] = 0;  // ❌ Compiler error
    }
}

// Constant pointer to data
void process_data(int* const data, int size) {
    for (int i = 0; i < size; i++) {
        data[i] *= 2;  // ✅ Can modify data
    }
    // data = NULL;  // ❌ Cannot change pointer
}
\`\`\`

### Validate Array Bounds

\`\`\`c
int safe_array_access(int* arr, int size, int index) {
    if (index < 0 || index >= size) {
        printf("Error: Index %d out of bounds\\n", index);
        return 0;  // Safe default value
    }

    return arr[index];
}
\`\`\`

---

## 🏗️ Safe Pointer Patterns

### Resource Management (RAII-like)

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int* data;
    size_t size;
} SafeArray;

SafeArray* create_safe_array(size_t size) {
    SafeArray* arr = (SafeArray*)malloc(sizeof(SafeArray));

    if (arr != NULL) {
        arr->data = (int*)calloc(size, sizeof(int));

        if (arr->data == NULL) {
            free(arr);
            return NULL;
        }

        arr->size = size;
    }

    return arr;
}

void destroy_safe_array(SafeArray* arr) {
    if (arr != NULL) {
        free(arr->data);
        free(arr);
    }
}

int safe_get(const SafeArray* arr, size_t index) {
    if (arr == NULL || index >= arr->size) {
        return 0;  // Safe default
    }
    return arr->data[index];
}

int safe_set(SafeArray* arr, size_t index, int value) {
    if (arr == NULL || index >= arr->size) {
        return 0;  // Failed
    }
    arr->data[index] = value;
    return 1;  // Success
}
\`\`\`

### Function Parameter Validation

\`\`\`c
#include <assert.h>

// Use assertions for debugging
void process_data(int* data, int size) {
    assert(data != NULL && "Data pointer cannot be NULL");
    assert(size > 0 && "Size must be positive");

    // Process data safely
    for (int i = 0; i < size; i++) {
        data[i] *= 2;
    }
}

// Or use runtime checks
void safe_process_data(int* data, int size) {
    if (data == NULL || size <= 0) {
        fprintf(stderr, "Invalid parameters to safe_process_data\\n");
        return;
    }

    for (int i = 0; i < size; i++) {
        data[i] *= 2;
    }
}
\`\`\`

---

## 🔍 Pointer Type Safety

### Avoid void* When Possible

\`\`\`c
// ✅ Prefer specific types
int* int_ptr = (int*)malloc(sizeof(int));

// ❌ Avoid generic pointers when specific type is known
void* generic = malloc(sizeof(int));
int* int_ptr = (int*)generic;  // Extra casting needed
\`\`\`

### Proper Casting

\`\`\`c
#include <stdlib.h>

int main() {
    // ✅ Cast malloc return
    int* ptr1 = (int*)malloc(sizeof(int));

    // ✅ Cast when necessary
    void* void_ptr = ptr1;
    int* ptr2 = (int*)void_ptr;

    // ❌ Don't cast unnecessarily
    int x = 42;
    int* ptr3 = (int*)&x;  // Unnecessary cast

    free(ptr1);
    return 0;
}
\`\`\`

---

## 🧠 Advanced Pointer Safety

### Bounds Checking Macros

\`\`\`c
#define CHECK_BOUNDS(arr, size, index) \\
    ((index) >= 0 && (index) < (size))

#define SAFE_ACCESS(arr, size, index, default_value) \\
    (CHECK_BOUNDS(arr, size, index) ? (arr)[index] : (default_value))

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int size = sizeof(arr) / sizeof(arr[0]);

    // Safe access with bounds checking
    printf("Element 2: %d\\n", SAFE_ACCESS(arr, size, 2, -1));
    printf("Invalid index: %d\\n", SAFE_ACCESS(arr, size, 10, -1));

    return 0;
}
\`\`\`

### Smart Pointer Simulation

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int* ptr;
    size_t size;
} SmartPointer;

SmartPointer* create_smart_pointer(size_t size) {
    SmartPointer* sp = (SmartPointer*)malloc(sizeof(SmartPointer));

    if (sp != NULL) {
        sp->ptr = (int*)calloc(size, sizeof(int));

        if (sp->ptr == NULL) {
            free(sp);
            return NULL;
        }

        sp->size = size;
    }

    return sp;
}

void destroy_smart_pointer(SmartPointer* sp) {
    if (sp != NULL) {
        free(sp->ptr);
        free(sp);
    }
}

int smart_get(const SmartPointer* sp, size_t index) {
    if (sp == NULL || index >= sp->size) {
        return 0;
    }
    return sp->ptr[index];
}

int smart_set(SmartPointer* sp, size_t index, int value) {
    if (sp == NULL || index >= sp->size) {
        return 0;
    }
    sp->ptr[index] = value;
    return 1;
}
\`\`\`

---

## 🐛 Debugging Memory Issues

### Memory Leak Detection

\`\`\`c
// Simple leak detector (conceptual)
#include <stdlib.h>
#include <stdio.h>

typedef struct Allocation {
    void* ptr;
    size_t size;
    const char* file;
    int line;
    struct Allocation* next;
} Allocation;

static Allocation* allocation_list = NULL;

void* debug_malloc(size_t size, const char* file, int line) {
    void* ptr = malloc(size);

    if (ptr != NULL) {
        Allocation* alloc = (Allocation*)malloc(sizeof(Allocation));

        if (alloc != NULL) {
            alloc->ptr = ptr;
            alloc->size = size;
            alloc->file = file;
            alloc->line = line;
            alloc->next = allocation_list;
            allocation_list = alloc;
        }
    }

    return ptr;
}

void debug_free(void* ptr) {
    if (ptr == NULL) return;

    // Find and remove from allocation list
    Allocation* current = allocation_list;
    Allocation* prev = NULL;

    while (current != NULL) {
        if (current->ptr == ptr) {
            if (prev == NULL) {
                allocation_list = current->next;
            } else {
                prev->next = current->next;
            }
            free(current);
            break;
        }
        prev = current;
        current = current->next;
    }

    free(ptr);
}

void report_leaks() {
    Allocation* current = allocation_list;

    while (current != NULL) {
        printf("Memory leak: %zu bytes allocated at %s:%d\\n",
               current->size, current->file, current->line);
        current = current->next;
    }
}

// Macros for easy usage
#define malloc(size) debug_malloc(size, __FILE__, __LINE__)
#define free(ptr) debug_free(ptr)
\`\`\`

---

## 📋 Complete Safe Pointer Guidelines

### Declaration
1. **Always initialize** pointers (NULL or valid address)
2. **Use const** when data shouldn't be modified
3. **Be explicit** about pointer types

### Usage
1. **Check for NULL** before dereferencing
2. **Validate bounds** for array access
3. **Use safe functions** with bounds checking

### Memory Management
1. **Check allocation results** (malloc, calloc, realloc)
2. **Free memory** when no longer needed
3. **Set pointers to NULL** after freeing
4. **Avoid double free** and accessing freed memory

### Functions
1. **Validate parameters** in functions
2. **Use const** for read-only pointer parameters
3. **Document ownership** (who frees allocated memory)

### Debugging
1. **Use tools** like Valgrind and AddressSanitizer
2. **Add assertions** for debugging
3. **Log allocations** and frees in debug builds

---

## 🧪 Practical Examples

### Safe String Processing

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Safe string copy with length checking
char* safe_strncpy(char* dest, const char* src, size_t dest_size) {
    if (dest == NULL || src == NULL || dest_size == 0) {
        return NULL;
    }

    // Leave space for null terminator
    size_t copy_len = dest_size - 1;

    // Copy at most copy_len characters
    size_t i;
    for (i = 0; i < copy_len && src[i] != '\\0'; i++) {
        dest[i] = src[i];
    }

    // Null terminate
    dest[i] = '\\0';

    return dest;
}

// Safe string concatenation
char* safe_strncat(char* dest, const char* src, size_t dest_size) {
    if (dest == NULL || src == NULL || dest_size == 0) {
        return NULL;
    }

    size_t dest_len = strlen(dest);
    size_t remaining = dest_size - dest_len - 1;

    if (remaining == 0) {
        return dest;  // No space left
    }

    // Concatenate safely
    strncat(dest, src, remaining);

    return dest;
}

int main() {
    char buffer[20];

    safe_strncpy(buffer, "Hello, World!", sizeof(buffer));
    printf("Copied: '%s'\\n", buffer);

    safe_strncat(buffer, " How are you?", sizeof(buffer));
    printf("Concatenated: '%s'\\n", buffer);

    return 0;
}
\`\`\`

### Memory Pool for Safe Allocation

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define POOL_SIZE 1024

typedef struct {
    char pool[POOL_SIZE];
    size_t used;
    char* allocations[100];  // Track allocations
    size_t alloc_count;
} MemoryPool;

MemoryPool* create_memory_pool() {
    MemoryPool* pool = (MemoryPool*)malloc(sizeof(MemoryPool));

    if (pool != NULL) {
        pool->used = 0;
        pool->alloc_count = 0;
    }

    return pool;
}

void* pool_alloc(MemoryPool* pool, size_t size) {
    if (pool == NULL || pool->used + size > POOL_SIZE ||
        pool->alloc_count >= 100) {
        return NULL;
    }

    void* ptr = &pool->pool[pool->used];
    pool->allocations[pool->alloc_count++] = (char*)ptr;
    pool->used += size;

    return ptr;
}

void destroy_memory_pool(MemoryPool* pool) {
    if (pool != NULL) {
        // All allocations are freed automatically
        free(pool);
    }
}

int main() {
    MemoryPool* pool = create_memory_pool();

    if (pool != NULL) {
        // Allocate strings from pool
        char* str1 = (char*)pool_alloc(pool, 20);
        char* str2 = (char*)pool_alloc(pool, 30);

        if (str1 && str2) {
            strcpy(str1, "Hello");
            strcpy(str2, "World");

            printf("%s %s\\n", str1, str2);
        }

        // All memory freed at once
        destroy_memory_pool(pool);
    }

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Always initialize** pointers to NULL or valid addresses
2. **Check for NULL** before dereferencing pointers
3. **Validate array bounds** to prevent buffer overflows
4. **Free allocated memory** and set pointers to NULL
5. **Use const** appropriately to protect data
6. **Validate function parameters** that are pointers
7. **Use debugging tools** like Valgrind to find memory issues
8. **Follow consistent patterns** for memory management

---

## 🚀 Module 6 Complete!

**Congratulations!** You've mastered pointers in C:

- ✅ **Pointer introduction** and memory concepts
- ✅ **Declaration and initialization** with proper syntax
- ✅ **Pointer operations** and arithmetic
- ✅ **Pointers and arrays** relationship
- ✅ **Pointers and functions** (pass-by-reference, function pointers)
- ✅ **Dynamic memory allocation** (malloc, calloc, realloc, free)
- ✅ **Pointer pitfalls** and safety best practices

**Ready for Module 7: Structures and Unions?** Structures let you group related data together, and unions allow multiple data types in the same memory! 📦
