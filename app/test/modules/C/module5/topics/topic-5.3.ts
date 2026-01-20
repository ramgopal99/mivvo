import { SubLesson } from '../../../../data/lessonsData';

export const topic_5_3: SubLesson = {
  id: "5.3",
  title: 'Dynamic Memory Allocation',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 💾 Dynamic Memory Allocation in C

Dynamic memory allocation allows programs to request memory from the operating system at runtime. This is essential for handling data whose size is unknown at compile time or changes during program execution.

---

## 📋 Why Dynamic Memory?

### **Limitations of Static Memory**

\`\`\`c
// ❌ Fixed size - can't change at runtime
int fixed_array[100];

// ❌ Wasted space if not fully used
char large_buffer[10000];  // Always uses 10KB
\`\`\`

### **Advantages of Dynamic Memory**

- **Variable size** - Allocate exactly what's needed
- **Runtime flexibility** - Resize as program runs
- **Efficient memory usage** - Only use what's necessary
- **Large data structures** - Handle data larger than stack allows

---

## 🔧 Memory Allocation Functions

### **malloc() - Memory Allocation**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    // Allocate memory for 5 integers
    int *arr = (int*)malloc(5 * sizeof(int));

    if (arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    // Use the allocated memory
    for (int i = 0; i < 5; i++) {
        arr[i] = (i + 1) * 10;
        printf("arr[%d] = %d\\n", i, arr[i]);
    }

    // Always free allocated memory
    free(arr);

    return 0;
}
\`\`\`

**Parameters:**
- **Size**: Number of bytes to allocate
- **Return**: \`void*\` pointer to allocated memory, or \`NULL\` if failed

---

### **calloc() - Contiguous Allocation**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    // Allocate and initialize to zero
    int *arr = (int*)calloc(5, sizeof(int));

    if (arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    // calloc initializes to zero
    printf("Initialized values: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    free(arr);
    return 0;
}
\`\`\`

**Differences from malloc():**
- Takes **number of elements** and **element size** as separate parameters
- **Initializes memory to zero**
- Slightly slower due to initialization

---

### **realloc() - Resize Memory**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    // Allocate initial memory
    int *arr = (int*)malloc(3 * sizeof(int));
    if (arr == NULL) return 1;

    // Initialize
    for (int i = 0; i < 3; i++) {
        arr[i] = i + 1;
    }

    printf("Original array: ");
    for (int i = 0; i < 3; i++) printf("%d ", arr[i]);
    printf("\\n");

    // Resize to 5 elements
    int *new_arr = (int*)realloc(arr, 5 * sizeof(int));
    if (new_arr == NULL) {
        free(arr);
        return 1;
    }
    arr = new_arr;  // Update pointer

    // Initialize new elements
    arr[3] = 4;
    arr[4] = 5;

    printf("Resized array:  ");
    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);
    printf("\\n");

    free(arr);
    return 0;
}
\`\`\`

---

## 🗑️ Memory Deallocation

### **free() - Release Memory**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *ptr = (int*)malloc(sizeof(int));
    if (ptr == NULL) return 1;

    *ptr = 42;
    printf("Value: %d\\n", *ptr);

    // Release memory back to system
    free(ptr);

    // ptr is now a dangling pointer - don't use it!
    ptr = NULL;  // Good practice

    return 0;
}
\`\`\`

**Important Rules:**
1. **Free every malloc/calloc/realloc**
2. **Only free once** - double free causes crashes
3. **Set pointer to NULL** after freeing
4. **Free in reverse order** of allocation

---

## 🎯 Practical Examples

### **Example 1: Dynamic Array Input**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int size;

    printf("Enter number of elements: ");
    scanf("%d", &size);

    // Allocate memory based on user input
    int *arr = (int*)malloc(size * sizeof(int));
    if (arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    // Input values
    printf("Enter %d integers:\\n", size);
    for (int i = 0; i < size; i++) {
        scanf("%d", &arr[i]);
    }

    // Display values
    printf("You entered: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    // Calculate sum
    int sum = 0;
    for (int i = 0; i < size; i++) {
        sum += arr[i];
    }
    printf("Sum: %d\\n", sum);
    printf("Average: %.2f\\n", (float)sum / size);

    free(arr);
    return 0;
}
\`\`\`

### **Example 2: String Builder**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define INITIAL_SIZE 10

char* read_line(void) {
    char *buffer = (char*)malloc(INITIAL_SIZE);
    if (buffer == NULL) return NULL;

    size_t size = INITIAL_SIZE;
    size_t length = 0;
    int ch;

    while ((ch = getchar()) != '\\n' && ch != EOF) {
        if (length + 1 >= size) {
            // Double the buffer size
            size *= 2;
            char *new_buffer = (char*)realloc(buffer, size);
            if (new_buffer == NULL) {
                free(buffer);
                return NULL;
            }
            buffer = new_buffer;
        }
        buffer[length++] = ch;
    }

    // Null terminate
    buffer[length] = '\\0';

    // Shrink to fit
    char *final_buffer = (char*)realloc(buffer, length + 1);
    return final_buffer ? final_buffer : buffer;
}

int main(void) {
    printf("Enter a line of text: ");
    char *line = read_line();

    if (line) {
        printf("You entered: %s\\n", line);
        printf("Length: %zu characters\\n", strlen(line));
        free(line);
    } else {
        printf("Memory allocation failed!\\n");
    }

    return 0;
}
\`\`\`

### **Example 3: 2D Array (Matrix)**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int** create_matrix(int rows, int cols) {
    // Allocate array of pointers (rows)
    int **matrix = (int**)malloc(rows * sizeof(int*));
    if (matrix == NULL) return NULL;

    // Allocate each row
    for (int i = 0; i < rows; i++) {
        matrix[i] = (int*)malloc(cols * sizeof(int));
        if (matrix[i] == NULL) {
            // Free previously allocated rows
            for (int j = 0; j < i; j++) {
                free(matrix[j]);
            }
            free(matrix);
            return NULL;
        }
    }

    return matrix;
}

void free_matrix(int **matrix, int rows) {
    for (int i = 0; i < rows; i++) {
        free(matrix[i]);
    }
    free(matrix);
}

int main(void) {
    int rows = 3, cols = 4;

    int **matrix = create_matrix(rows, cols);
    if (matrix == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    // Initialize matrix
    int value = 1;
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            matrix[i][j] = value++;
        }
    }

    // Display matrix
    printf("Matrix:\\n");
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            printf("%3d ", matrix[i][j]);
        }
        printf("\\n");
    }

    free_matrix(matrix, rows);
    return 0;
}
\`\`\`

---

## ⚠️ Memory Management Issues

### **Memory Leaks**

\`\`\`c
// ❌ Memory leak - allocated but never freed
void leaky_function(void) {
    int *ptr = (int*)malloc(sizeof(int));
    *ptr = 42;
    // Function ends without freeing ptr!
}

// ✅ Correct - always free allocated memory
void correct_function(void) {
    int *ptr = (int*)malloc(sizeof(int));
    if (ptr == NULL) return;

    *ptr = 42;
    // Use ptr...
    free(ptr);  // Good!
}
\`\`\`

### **Dangling Pointers**

\`\`\`c
// ❌ Dangling pointer
int* create_number(void) {
    int *ptr = (int*)malloc(sizeof(int));
    *ptr = 42;
    return ptr;
}

void bad_example(void) {
    int *num = create_number();
    free(num);        // Memory freed
    // num is now dangling!
    // *num = 99;     // CRASH!
}
\`\`\`

### **Double Free**

\`\`\`c
// ❌ Double free crash
void double_free_bug(void) {
    int *ptr = (int*)malloc(sizeof(int));
    if (ptr == NULL) return;

    free(ptr);        // First free - OK
    free(ptr);        // Second free - CRASH!
}
\`\`\`

### **Use After Free**

\`\`\`c
// ❌ Use after free
void use_after_free(void) {
    int *ptr = (int*)malloc(sizeof(int));
    if (ptr == NULL) return;

    *ptr = 42;
    free(ptr);        // Memory freed

    // Memory might be used by other parts of program
    // *ptr = 99;     // UNDEFINED BEHAVIOR!
}
\`\`\`

---

## 🔧 Memory Management Best Practices

### **The "Three Rules" of Dynamic Memory**

1. **Free what you allocate** - Every malloc/calloc/realloc needs a free
2. **Free only once** - Never free the same pointer twice
3. **Free after use** - Don't keep allocated memory longer than needed

### **Error Handling Pattern**

\`\`\`c
// ✅ Robust memory allocation with error handling
int* safe_malloc(size_t size) {
    int *ptr = (int*)malloc(size * sizeof(int));
    if (ptr == NULL) {
        fprintf(stderr, "Memory allocation failed!\\n");
        exit(EXIT_FAILURE);  // Or return NULL and handle in caller
    }
    return ptr;
}

// Usage
int *arr = safe_malloc(10);
// Use arr...
free(arr);
arr = NULL;
\`\`\`

### **RAII-like Pattern in C**

\`\`\`c
// ✅ Encapsulate allocation/deallocation
typedef struct {
    int *data;
    size_t size;
} IntArray;

IntArray* int_array_create(size_t size) {
    IntArray *arr = (IntArray*)malloc(sizeof(IntArray));
    if (arr == NULL) return NULL;

    arr->data = (int*)malloc(size * sizeof(int));
    if (arr->data == NULL) {
        free(arr);
        return NULL;
    }

    arr->size = size;
    return arr;
}

void int_array_destroy(IntArray *arr) {
    if (arr) {
        free(arr->data);
        free(arr);
    }
}

// Usage
IntArray *arr = int_array_create(10);
if (arr) {
    // Use arr->data...
    int_array_destroy(arr);  // Clean up everything
}
\`\`\`

---

## 🎯 Advanced Example: Simple Vector (Dynamic Array)

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *data;
    size_t size;
    size_t capacity;
} Vector;

Vector* vector_create(size_t initial_capacity) {
    Vector *vec = (Vector*)malloc(sizeof(Vector));
    if (vec == NULL) return NULL;

    vec->data = (int*)malloc(initial_capacity * sizeof(int));
    if (vec->data == NULL) {
        free(vec);
        return NULL;
    }

    vec->size = 0;
    vec->capacity = initial_capacity;
    return vec;
}

void vector_destroy(Vector *vec) {
    if (vec) {
        free(vec->data);
        free(vec);
    }
}

int vector_push(Vector *vec, int value) {
    if (vec->size >= vec->capacity) {
        // Double capacity
        size_t new_capacity = vec->capacity * 2;
        int *new_data = (int*)realloc(vec->data, new_capacity * sizeof(int));
        if (new_data == NULL) {
            return 0;  // Failed
        }
        vec->data = new_data;
        vec->capacity = new_capacity;
    }

    vec->data[vec->size++] = value;
    return 1;  // Success
}

void vector_print(Vector *vec) {
    printf("Vector (%zu/%zu): ", vec->size, vec->capacity);
    for (size_t i = 0; i < vec->size; i++) {
        printf("%d ", vec->data[i]);
    }
    printf("\\n");
}

int main(void) {
    Vector *vec = vector_create(2);
    if (vec == NULL) {
        printf("Failed to create vector\\n");
        return 1;
    }

    // Add elements (will automatically resize)
    for (int i = 1; i <= 10; i++) {
        vector_push(vec, i * 10);
        vector_print(vec);
    }

    vector_destroy(vec);
    return 0;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **malloc()** allocates uninitialized memory
2. **calloc()** allocates and zeros memory
3. **realloc()** resizes existing allocations
4. **free()** releases memory back to system
5. **Always check for NULL** after allocation
6. **Free all allocated memory** to prevent leaks
7. **Set pointers to NULL** after freeing
8. **Handle allocation failures** gracefully

Dynamic memory allocation gives you control over memory usage - use it wisely to create efficient, flexible programs! 🔧✨`;
    return contentString;
  })()
};
