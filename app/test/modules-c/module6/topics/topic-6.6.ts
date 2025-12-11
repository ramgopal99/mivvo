import { SubLesson } from '../../../data/lessonsData';

export const topic_6_6: SubLesson = {
  id: 6.6,
  title: 'Dynamic Memory Allocation',
  status: 'completed',
  content: `# 💾 Dynamic Memory Allocation

Master the art of allocating and managing memory at runtime using malloc, calloc, realloc, and free.

---

## 🎯 Why Dynamic Memory?

### Limitations of Static Memory

\`\`\`c
#include <stdio.h>

#define MAX_STUDENTS 100  // Fixed at compile time

int main() {
    int scores[MAX_STUDENTS];

    // What if we need more than 100 students?
    // What if we need exactly 50 students (wasting memory)?

    printf("Fixed array size: %d\\n", MAX_STUDENTS);
    return 0;
}
\`\`\`

**Problems:**
- ❌ Fixed size determined at compile time
- ❌ May waste memory or be too small
- ❌ Cannot resize after creation

### Dynamic Memory Solutions

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int num_students;

    printf("How many students? ");
    scanf("%d", &num_students);

    // Allocate exactly the right amount of memory
    int* scores = (int*)malloc(num_students * sizeof(int));

    if (scores == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    // Use the memory
    for (int i = 0; i < num_students; i++) {
        scores[i] = i * 10;
        printf("Student %d: %d\\n", i + 1, scores[i]);
    }

    // Free the memory when done
    free(scores);
    scores = NULL;  // Good practice

    return 0;
}
\`\`\`

**Benefits:**
- ✅ Allocate memory at runtime
- ✅ Request exact amount needed
- ✅ Can resize with realloc
- ✅ Memory persists until explicitly freed

---

## 🛠️ Memory Allocation Functions

### malloc() - Memory Allocation

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main() {
    // Allocate memory for 5 integers
    int* arr = (int*)malloc(5 * sizeof(int));

    if (arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    // Initialize and use the memory
    for (int i = 0; i < 5; i++) {
        arr[i] = (i + 1) * 10;
        printf("%d ", arr[i]);
    }
    printf("\\n");

    free(arr);  // Always free allocated memory
    return 0;
}
\`\`\`

**Key points:**
- Returns `void*` (must cast to appropriate type)
- Memory is uninitialized (contains garbage)
- Returns `NULL` if allocation fails
- Always check return value

### calloc() - Cleared Memory Allocation

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main() {
    // Allocate and zero-initialize memory for 5 integers
    int* arr = (int*)calloc(5, sizeof(int));

    if (arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    // Memory is already zeroed
    printf("Zero-initialized array: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", arr[i]);  // Will print 0 0 0 0 0
    }
    printf("\\n");

    free(arr);
    return 0;
}
\`\`\`

**Differences from malloc:**
- Takes two arguments: count and size
- Initializes memory to zero
- Slightly slower than malloc due to initialization

### realloc() - Resize Allocated Memory

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main() {
    // Start with small array
    int* arr = (int*)malloc(3 * sizeof(int));
    if (arr == NULL) return 1;

    // Initialize
    for (int i = 0; i < 3; i++) {
        arr[i] = i + 1;
    }

    printf("Original array: ");
    for (int i = 0; i < 3; i++) printf("%d ", arr[i]);
    printf("\\n");

    // Resize to larger array
    int* new_arr = (int*)realloc(arr, 5 * sizeof(int));
    if (new_arr == NULL) {
        free(arr);  // Original still valid if realloc fails
        return 1;
    }
    arr = new_arr;  // Update pointer

    // Initialize new elements
    arr[3] = 4;
    arr[4] = 5;

    printf("Resized array: ");
    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);
    printf("\\n");

    free(arr);
    return 0;
}
\`\`\`

**Important notes:**
- May move memory to new location
- Old pointer becomes invalid if realloc succeeds
- Original memory still valid if realloc fails
- Can shrink or grow memory

---

## 🗑️ Memory Deallocation

### free() - Release Memory

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main() {
    // Allocate memory
    int* ptr = (int*)malloc(sizeof(int));
    if (ptr == NULL) return 1;

    *ptr = 42;
    printf("Value: %d\\n", *ptr);

    // Free memory
    free(ptr);

    // Set to NULL to prevent dangling pointer
    ptr = NULL;

    // ptr is now invalid - don't dereference it!
    // *ptr = 100;  // Undefined behavior

    return 0;
}
\`\`\`

### When to Free Memory

\`\`\`c
void process_data() {
    // Allocate memory
    int* data = (int*)malloc(100 * sizeof(int));

    if (data != NULL) {
        // Use the memory
        for (int i = 0; i < 100; i++) {
            data[i] = i * 2;
        }

        // Free memory before function returns
        free(data);
        data = NULL;
    }
}

int main() {
    process_data();

    // Memory is properly freed when function returns
    printf("Memory management complete\\n");

    return 0;
}
\`\`\`

---

## 🐛 Memory Management Errors

### Memory Leaks

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

void memory_leak() {
    int* ptr = (int*)malloc(sizeof(int));
    *ptr = 42;

    // Forgot to free! Memory leak occurs
    // This memory is now unreachable
}

int main() {
    for (int i = 0; i < 100; i++) {
        memory_leak();  // 100 memory leaks!
    }

    printf("Program finished, but memory leaked\\n");
    return 0;
}
\`\`\`

### Dangling Pointers

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int* ptr = (int*)malloc(sizeof(int));
    *ptr = 42;

    free(ptr);  // Memory freed, but ptr still points there

    // ptr is now a dangling pointer
    // *ptr = 100;  // Undefined behavior!

    // Set to NULL to prevent accidental use
    ptr = NULL;

    return 0;
}
\`\`\`

### Double Free

\`\`\`c
#include <stdio.h>
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
#include <stdio.h>
#include <stdlib.h>

int main() {
    int* ptr = (int*)malloc(sizeof(int));
    *ptr = 42;

    free(ptr);

    // Memory is freed, but we try to use it
    // This might work, crash, or cause strange bugs
    printf("Freed memory: %d\\n", *ptr);

    return 0;
}
\`\`\`

---

## 🛡️ Best Practices for Memory Management

### Always Check Allocation Success

\`\`\`c
int* safe_malloc(size_t size) {
    int* ptr = (int*)malloc(size * sizeof(int));

    if (ptr == NULL) {
        printf("Memory allocation failed!\\n");
        exit(1);  // Or handle error appropriately
    }

    return ptr;
}

int main() {
    int* arr = safe_malloc(10);

    // Use arr safely
    for (int i = 0; i < 10; i++) {
        arr[i] = i;
    }

    free(arr);
    return 0;
}
\`\`\`

### Set Pointers to NULL After Freeing

\`\`\`c
void safe_free(int** ptr) {
    if (*ptr != NULL) {
        free(*ptr);
        *ptr = NULL;  // Prevent dangling pointer
    }
}

int main() {
    int* ptr = (int*)malloc(sizeof(int));

    // Use ptr...

    safe_free(&ptr);

    // ptr is now NULL - safe to check
    if (ptr == NULL) {
        printf("Pointer is NULL\\n");
    }

    return 0;
}
\`\`\`

### Use Consistent Memory Management

\`\`\`c
// Consistent pattern for dynamic arrays
typedef struct {
    int* data;
    size_t size;
} IntArray;

IntArray* create_int_array(size_t size) {
    IntArray* arr = (IntArray*)malloc(sizeof(IntArray));

    if (arr != NULL) {
        arr->data = (int*)malloc(size * sizeof(int));

        if (arr->data == NULL) {
            free(arr);
            return NULL;
        }

        arr->size = size;

        // Initialize to zero
        memset(arr->data, 0, size * sizeof(int));
    }

    return arr;
}

void destroy_int_array(IntArray* arr) {
    if (arr != NULL) {
        free(arr->data);
        free(arr);
    }
}
\`\`\`

---

## 🧪 Practical Examples

### Dynamic Array Management

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    int* data;
    size_t size;
    size_t capacity;
} DynamicArray;

DynamicArray* create_dynamic_array(size_t initial_capacity) {
    DynamicArray* arr = (DynamicArray*)malloc(sizeof(DynamicArray));

    if (arr != NULL) {
        arr->data = (int*)malloc(initial_capacity * sizeof(int));

        if (arr->data == NULL) {
            free(arr);
            return NULL;
        }

        arr->size = 0;
        arr->capacity = initial_capacity;
    }

    return arr;
}

int append_to_dynamic_array(DynamicArray* arr, int value) {
    if (arr == NULL) return 0;

    // Resize if needed
    if (arr->size >= arr->capacity) {
        size_t new_capacity = arr->capacity * 2;
        int* new_data = (int*)realloc(arr->data, new_capacity * sizeof(int));

        if (new_data == NULL) {
            return 0;  // Reallocation failed
        }

        arr->data = new_data;
        arr->capacity = new_capacity;
    }

    arr->data[arr->size] = value;
    arr->size++;

    return 1;  // Success
}

void destroy_dynamic_array(DynamicArray* arr) {
    if (arr != NULL) {
        free(arr->data);
        free(arr);
    }
}

int main() {
    DynamicArray* arr = create_dynamic_array(2);

    if (arr != NULL) {
        // Add elements (will automatically resize)
        for (int i = 0; i < 10; i++) {
            append_to_dynamic_array(arr, i * 10);
        }

        printf("Array contents: ");
        for (size_t i = 0; i < arr->size; i++) {
            printf("%d ", arr->data[i]);
        }
        printf("\\n");

        printf("Size: %zu, Capacity: %zu\\n", arr->size, arr->capacity);

        destroy_dynamic_array(arr);
    }

    return 0;
}
\`\`\`

### String Builder with Dynamic Memory

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char* data;
    size_t size;
    size_t capacity;
} StringBuilder;

StringBuilder* create_string_builder(size_t initial_capacity) {
    StringBuilder* sb = (StringBuilder*)malloc(sizeof(StringBuilder));

    if (sb != NULL) {
        sb->data = (char*)malloc(initial_capacity);

        if (sb->data == NULL) {
            free(sb);
            return NULL;
        }

        sb->data[0] = '\\0';  // Empty string
        sb->size = 0;
        sb->capacity = initial_capacity;
    }

    return sb;
}

int append_to_string_builder(StringBuilder* sb, const char* str) {
    if (sb == NULL || str == NULL) return 0;

    size_t str_len = strlen(str);
    size_t needed_capacity = sb->size + str_len + 1;  // +1 for null terminator

    // Resize if needed
    if (needed_capacity > sb->capacity) {
        size_t new_capacity = sb->capacity * 2;
        while (new_capacity < needed_capacity) {
            new_capacity *= 2;
        }

        char* new_data = (char*)realloc(sb->data, new_capacity);

        if (new_data == NULL) {
            return 0;  // Reallocation failed
        }

        sb->data = new_data;
        sb->capacity = new_capacity;
    }

    // Append string
    strcpy(sb->data + sb->size, str);
    sb->size += str_len;

    return 1;  // Success
}

void destroy_string_builder(StringBuilder* sb) {
    if (sb != NULL) {
        free(sb->data);
        free(sb);
    }
}

int main() {
    StringBuilder* sb = create_string_builder(10);

    if (sb != NULL) {
        append_to_string_builder(sb, "Hello");
        append_to_string_builder(sb, ", ");
        append_to_string_builder(sb, "World");
        append_to_string_builder(sb, "!");

        printf("Built string: %s\\n", sb->data);
        printf("Length: %zu, Capacity: %zu\\n", sb->size, sb->capacity);

        destroy_string_builder(sb);
    }

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Dynamic memory** allows allocation at runtime with exact sizes
2. **malloc** allocates uninitialized memory, **calloc** initializes to zero
3. **realloc** resizes existing allocations (may move memory)
4. **free** releases memory back to the system
5. **Always check** return values from allocation functions
6. **Set pointers to NULL** after freeing to prevent dangling pointers
7. **Memory leaks** occur when allocated memory is never freed
8. **Double free** and accessing freed memory cause undefined behavior

---

## 🚀 Preview: Pointer Pitfalls and Best Practices

In the next topic, you'll learn about:
- **Common pointer mistakes** and how to avoid them
- **Debugging memory issues** with tools and techniques
- **Memory management best practices** for robust programs
- **Advanced pointer patterns** and safety techniques

**Master memory management and your programs will be reliable and efficient!** 🛡️
