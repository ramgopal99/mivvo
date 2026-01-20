import { SubLesson } from '../../../../data/lessonsData';

export const topic_5_6: SubLesson = {
  id: "5.6",
  title: 'Memory Management Best Practices',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🛡️ Memory Management Best Practices in C

Proper memory management is crucial for writing reliable, efficient, and secure C programs. Memory leaks, dangling pointers, and buffer overflows are common sources of bugs. This lesson covers best practices for managing memory safely.

---

## 📋 The Memory Management Rules

### **The Three Golden Rules**

1. **Free what you allocate** - Every malloc/calloc/realloc needs a corresponding free
2. **Free only once** - Never free the same pointer twice
3. **Free after use** - Don't hold allocated memory longer than necessary

### **Additional Rules**

4. **Initialize pointers** - Set unused pointers to NULL
5. **Check allocations** - Always verify malloc/calloc/realloc success
6. **Handle failures gracefully** - Don't crash on allocation failure

---

## 🔧 Safe Memory Allocation Patterns

### **Pattern 1: Allocate and Initialize**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Safe allocation with initialization
int* create_int_array(size_t size, int initial_value) {
    // Allocate memory
    int *arr = (int*)malloc(size * sizeof(int));
    if (arr == NULL) {
        fprintf(stderr, "Memory allocation failed\\n");
        return NULL;
    }

    // Initialize all elements
    for (size_t i = 0; i < size; i++) {
        arr[i] = initial_value;
    }

    return arr;
}

int main(void) {
    int *numbers = create_int_array(10, 42);
    if (numbers == NULL) {
        return EXIT_FAILURE;
    }

    // Use the array...
    for (int i = 0; i < 10; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\\n");

    free(numbers);
    numbers = NULL;

    return EXIT_SUCCESS;
}
\`\`\`

### **Pattern 2: Resource Acquisition is Initialization (RAII-like)**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

// Structure that manages its own memory
typedef struct {
    int *data;
    size_t size;
} IntVector;

IntVector* int_vector_create(size_t initial_capacity) {
    IntVector *vec = (IntVector*)malloc(sizeof(IntVector));
    if (vec == NULL) return NULL;

    vec->data = (int*)malloc(initial_capacity * sizeof(int));
    if (vec->data == NULL) {
        free(vec);
        return NULL;
    }

    vec->size = 0;
    return vec;
}

void int_vector_destroy(IntVector *vec) {
    if (vec) {
        free(vec->data);
        free(vec);
    }
}

int main(void) {
    IntVector *vec = int_vector_create(10);
    if (vec == NULL) {
        fprintf(stderr, "Failed to create vector\\n");
        return EXIT_FAILURE;
    }

    // Use vector...
    vec->data[vec->size++] = 42;

    // Cleanup happens automatically
    int_vector_destroy(vec);

    return EXIT_SUCCESS;
}
\`\`\`

---

## 🎯 Memory Leak Prevention

### **Pattern 1: Early Returns and Cleanup**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

// Function with proper cleanup on error
char* read_file_content(const char *filename) {
    FILE *file = fopen(filename, "r");
    if (file == NULL) {
        return NULL;
    }

    // Get file size
    fseek(file, 0, SEEK_END);
    long size = ftell(file);
    fseek(file, 0, SEEK_SET);

    // Allocate memory
    char *content = (char*)malloc(size + 1);
    if (content == NULL) {
        fclose(file);  // Clean up before returning
        return NULL;
    }

    // Read file
    size_t bytes_read = fread(content, 1, size, file);
    if (bytes_read != (size_t)size) {
        free(content);
        fclose(file);
        return NULL;
    }

    content[size] = '\\0';
    fclose(file);

    return content;
}

int main(void) {
    char *content = read_file_content("example.txt");
    if (content) {
        printf("File content: %s\\n", content);
        free(content);
    }

    return EXIT_SUCCESS;
}
\`\`\`

### **Pattern 2: Goto Cleanup (Controversial but Effective)**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int complex_operation(void) {
    int *buffer1 = NULL;
    int *buffer2 = NULL;
    FILE *file = NULL;

    // Allocate resources
    buffer1 = (int*)malloc(100 * sizeof(int));
    if (buffer1 == NULL) goto cleanup;

    buffer2 = (int*)malloc(200 * sizeof(int));
    if (buffer2 == NULL) goto cleanup;

    file = fopen("data.txt", "w");
    if (file == NULL) goto cleanup;

    // Perform complex operations...
    for (int i = 0; i < 100; i++) {
        buffer1[i] = i * 2;
        fprintf(file, "%d\\n", buffer1[i]);
    }

    // Success
    fclose(file);
    free(buffer2);
    free(buffer1);
    return 1;

cleanup:
    // Single cleanup point
    if (file) fclose(file);
    if (buffer2) free(buffer2);
    if (buffer1) free(buffer1);
    return 0;
}

int main(void) {
    if (complex_operation()) {
        printf("Operation successful\\n");
    } else {
        printf("Operation failed\\n");
    }

    return EXIT_SUCCESS;
}
\`\`\`

---

## 🛡️ Buffer Overflow Prevention

### **Bounds Checking**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Safe string copy with bounds checking
char* safe_strncpy(char *dest, const char *src, size_t dest_size) {
    if (dest == NULL || src == NULL || dest_size == 0) {
        return NULL;
    }

    // Leave space for null terminator
    size_t max_copy = dest_size - 1;

    // Copy up to max_copy characters
    size_t i;
    for (i = 0; i < max_copy && src[i] != '\\0'; i++) {
        dest[i] = src[i];
    }

    // Null terminate
    dest[i] = '\\0';

    return dest;
}

// Safe array access function
int safe_array_access(int *arr, size_t size, size_t index) {
    if (arr == NULL || index >= size) {
        return 0;  // Error value
    }
    return arr[index];
}

int main(void) {
    char buffer[20];
    const char *source = "This is a very long string that might overflow";

    // Safe copy
    safe_strncpy(buffer, source, sizeof(buffer));
    printf("Safe copy result: %s\\n", buffer);

    // Safe array access
    int arr[5] = {1, 2, 3, 4, 5};
    printf("Element 2: %d\\n", safe_array_access(arr, 5, 2));
    printf("Invalid access: %d\\n", safe_array_access(arr, 5, 10));

    return EXIT_SUCCESS;
}
\`\`\`

---

## 🔄 Pointer Lifecycle Management

### **Pattern: Initialize, Use, Cleanup**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

// Structure representing a managed resource
typedef struct {
    void *data;
    size_t size;
    int valid;
} ManagedBuffer;

ManagedBuffer* managed_buffer_create(size_t size) {
    ManagedBuffer *buf = (ManagedBuffer*)malloc(sizeof(ManagedBuffer));
    if (buf == NULL) return NULL;

    buf->data = malloc(size);
    if (buf->data == NULL) {
        free(buf);
        return NULL;
    }

    buf->size = size;
    buf->valid = 1;

    return buf;
}

void managed_buffer_destroy(ManagedBuffer *buf) {
    if (buf) {
        if (buf->data && buf->valid) {
            free(buf->data);
        }
        free(buf);
    }
}

void* managed_buffer_get_data(ManagedBuffer *buf) {
    return buf && buf->valid ? buf->data : NULL;
}

int main(void) {
    ManagedBuffer *buf = managed_buffer_create(100);
    if (buf == NULL) {
        printf("Failed to create buffer\\n");
        return EXIT_FAILURE;
    }

    // Use buffer safely
    char *data = (char*)managed_buffer_get_data(buf);
    if (data) {
        strcpy(data, "Hello, safe memory!");
        printf("Buffer content: %s\\n", data);
    }

    // Automatic cleanup
    managed_buffer_destroy(buf);

    return EXIT_SUCCESS;
}
\`\`\`

---

## 🎯 Memory Debugging Techniques

### **Pattern 1: Memory Tracking**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

// Simple memory tracker (for debugging)
#ifdef DEBUG
static size_t allocated_memory = 0;

void* debug_malloc(size_t size) {
    void *ptr = malloc(size);
    if (ptr) {
        allocated_memory += size;
        printf("Allocated %zu bytes, total: %zu\\n", size, allocated_memory);
    }
    return ptr;
}

void debug_free(void *ptr, size_t size) {
    if (ptr) {
        allocated_memory -= size;
        printf("Freed %zu bytes, remaining: %zu\\n", size, allocated_memory);
        free(ptr);
    }
}

#define MALLOC(size) debug_malloc(size)
#define FREE(ptr, size) debug_free(ptr, size)
#else
#define MALLOC(size) malloc(size)
#define FREE(ptr, size) free(ptr)
#endif

int main(void) {
    int *arr = (int*)MALLOC(10 * sizeof(int));
    if (arr) {
        for (int i = 0; i < 10; i++) {
            arr[i] = i;
        }
        FREE(arr, 10 * sizeof(int));
    }

    return EXIT_SUCCESS;
}
\`\`\`

### **Pattern 2: Sentinel Values**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Add sentinel values to detect buffer overflows
#define SENTINEL_VALUE 0xDEADBEEF

void* safe_malloc(size_t size) {
    // Allocate extra space for sentinels
    size_t total_size = size + 2 * sizeof(unsigned int);
    unsigned int *ptr = (unsigned int*)malloc(total_size);

    if (ptr == NULL) return NULL;

    // Set sentinels
    ptr[0] = SENTINEL_VALUE;
    ptr[(total_size / sizeof(unsigned int)) - 1] = SENTINEL_VALUE;

    // Return pointer to usable memory
    return &ptr[1];
}

int check_sentinels(void *ptr, size_t size) {
    if (ptr == NULL) return 0;

    size_t total_size = size + 2 * sizeof(unsigned int);
    unsigned int *sentinel_ptr = (unsigned int*)ptr - 1;

    // Check sentinels
    if (sentinel_ptr[0] != SENTINEL_VALUE ||
        sentinel_ptr[total_size / sizeof(unsigned int) - 1] != SENTINEL_VALUE) {
        fprintf(stderr, "Memory corruption detected!\\n");
        return 0;
    }

    return 1;
}

void safe_free(void *ptr, size_t size) {
    if (ptr && check_sentinels(ptr, size)) {
        unsigned int *sentinel_ptr = (unsigned int*)ptr - 1;
        size_t total_size = size + 2 * sizeof(unsigned int);
        free(sentinel_ptr);
    }
}
\`\`\`

---

## 🛠️ Memory Analysis Tools

### **Valgrind (Linux/Mac)**

\`\`\`bash
# Compile with debug info
gcc -g -o program program.c

# Run with valgrind
valgrind --leak-check=full ./program
\`\`\`

### **AddressSanitizer (GCC/Clang)**

\`\`\`bash
# Compile with AddressSanitizer
gcc -fsanitize=address -o program program.c

# Run normally - ASan will detect issues
./program
\`\`\`

### **Dr. Memory (Windows)**

\`\`\`bash
# Run with Dr. Memory
drmemory.exe program.exe
\`\`\`

---

## 🎯 Comprehensive Memory Safety Example

### **Safe Dynamic Array Implementation**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>

// Safe dynamic array structure
typedef struct {
    void *data;
    size_t element_size;
    size_t capacity;
    size_t size;
} SafeArray;

// Create a safe array
SafeArray* safe_array_create(size_t element_size, size_t initial_capacity) {
    assert(element_size > 0);
    assert(initial_capacity > 0);

    SafeArray *arr = (SafeArray*)malloc(sizeof(SafeArray));
    if (arr == NULL) return NULL;

    arr->data = malloc(element_size * initial_capacity);
    if (arr->data == NULL) {
        free(arr);
        return NULL;
    }

    arr->element_size = element_size;
    arr->capacity = initial_capacity;
    arr->size = 0;

    return arr;
}

// Destroy safe array
void safe_array_destroy(SafeArray *arr) {
    if (arr) {
        free(arr->data);
        free(arr);
    }
}

// Resize array if needed
static int safe_array_resize(SafeArray *arr, size_t new_capacity) {
    assert(arr != NULL);

    void *new_data = realloc(arr->data, arr->element_size * new_capacity);
    if (new_data == NULL) return 0;

    arr->data = new_data;
    arr->capacity = new_capacity;
    return 1;
}

// Add element to array
int safe_array_push(SafeArray *arr, const void *element) {
    assert(arr != NULL);
    assert(element != NULL);

    if (arr->size >= arr->capacity) {
        size_t new_capacity = arr->capacity * 2;
        if (!safe_array_resize(arr, new_capacity)) {
            return 0; // Resize failed
        }
    }

    void *dest = (char*)arr->data + (arr->size * arr->element_size);
    memcpy(dest, element, arr->element_size);
    arr->size++;

    return 1;
}

// Get element from array
void* safe_array_get(SafeArray *arr, size_t index) {
    assert(arr != NULL);

    if (index >= arr->size) {
        return NULL;
    }

    return (char*)arr->data + (index * arr->element_size);
}

// Remove element from array
void safe_array_remove(SafeArray *arr, size_t index) {
    assert(arr != NULL);

    if (index >= arr->size) {
        return;
    }

    // Shift elements left
    void *src = (char*)arr->data + ((index + 1) * arr->element_size);
    void *dest = (char*)arr->data + (index * arr->element_size);
    size_t bytes_to_move = (arr->size - index - 1) * arr->element_size;

    memmove(dest, src, bytes_to_move);
    arr->size--;
}

int main(void) {
    // Create array of integers
    SafeArray *int_array = safe_array_create(sizeof(int), 4);
    if (int_array == NULL) {
        printf("Failed to create array\\n");
        return EXIT_FAILURE;
    }

    // Add integers
    for (int i = 1; i <= 10; i++) {
        if (!safe_array_push(int_array, &i)) {
            printf("Failed to add element\\n");
            break;
        }
    }

    printf("Array size: %zu, capacity: %zu\\n", int_array->size, int_array->capacity);

    // Print all elements
    printf("Elements: ");
    for (size_t i = 0; i < int_array->size; i++) {
        int *value = (int*)safe_array_get(int_array, i);
        printf("%d ", *value);
    }
    printf("\\n");

    // Remove element at index 2
    safe_array_remove(int_array, 2);
    printf("After removing index 2: ");
    for (size_t i = 0; i < int_array->size; i++) {
        int *value = (int*)safe_array_get(int_array, i);
        printf("%d ", *value);
    }
    printf("\\n");

    safe_array_destroy(int_array);
    return EXIT_SUCCESS;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Follow the three rules** - allocate, free, and don't double-free
2. **Check every allocation** - handle NULL returns gracefully
3. **Use RAII patterns** - encapsulate allocation and cleanup
4. **Initialize pointers** - set unused pointers to NULL
5. **Validate bounds** - prevent buffer overflows
6. **Use debugging tools** - valgrind, AddressSanitizer, etc.
7. **Document memory ownership** - who allocates, who frees
8. **Test extensively** - memory bugs can be subtle and dangerous

Memory management mastery takes practice, but following these patterns will make your C programs robust and reliable! 🛡️✨`;
    return contentString;
  })()
};
