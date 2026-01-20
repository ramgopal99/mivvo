import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_1: SubLesson = {
  id: "9.1",
  title: 'Dynamic Memory Allocation',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 💾 Dynamic Memory Allocation in C

Dynamic memory allocation allows programs to request memory at runtime. Unlike static arrays, dynamic allocation enables flexible memory usage and efficient resource management.

---

## 📋 What is Dynamic Memory Allocation?

**Dynamic memory allocation is the process of allocating memory at runtime.** Key advantages:

- **Flexible sizing**: Memory size determined at runtime
- **Efficient resource use**: Allocate only what you need
- **Variable lifetimes**: Memory persists beyond function scope
- **Large data structures**: Handle data too big for stack

### **Memory Areas in C**

1. **Stack**: Automatic variables, function calls (fixed size)
2. **Heap**: Dynamic allocation (grows as needed)
3. **Global/Static**: Global variables, static variables
4. **Code/Text**: Program instructions

---

## 🔧 malloc() - Memory Allocation

### **Basic Syntax**

\`\`\`c
#include <stdlib.h>

void *malloc(size_t size);
\`\`\`

**Parameters:**
- \`size\`: Number of bytes to allocate

**Returns:**
- Pointer to allocated memory (void*)
- \`NULL\` if allocation fails

### **Basic malloc() Example**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    // Allocate memory for 5 integers
    int *numbers = (int*)malloc(5 * sizeof(int));

    if (numbers == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    // Use the allocated memory
    for (int i = 0; i < 5; i++) {
        numbers[i] = i + 1;
        printf("%d ", numbers[i]);
    }
    printf("\\n");

    // Free the memory
    free(numbers);

    return 0;
}
\`\`\`

---

## 🔄 calloc() - Contiguous Allocation

### **Syntax**

\`\`\`c
void *calloc(size_t num_elements, size_t element_size);
\`\`\`

**Parameters:**
- \`num_elements\`: Number of elements
- \`element_size\`: Size of each element

**Features:**
- Initializes memory to zero
- Takes two parameters instead of one

### **calloc() Example**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    // Allocate and initialize to zero
    int *array = (int*)calloc(5, sizeof(int));

    if (array == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    printf("Initialized values: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", array[i]);  // All zeros
    }
    printf("\\n");

    free(array);

    return 0;
}
\`\`\`

---

## 📈 realloc() - Resize Memory

### **Syntax**

\`\`\`c
void *realloc(void *ptr, size_t new_size);
\`\`\`

**Parameters:**
- \`ptr\`: Pointer to previously allocated memory
- \`new_size\`: New size in bytes

**Behavior:**
- Expands/contracts existing allocation
- May move data to new location
- Copies data automatically

### **realloc() Example**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    // Initial allocation
    int *array = (int*)malloc(3 * sizeof(int));
    if (array == NULL) return 1;

    // Initialize
    for (int i = 0; i < 3; i++) {
        array[i] = i + 1;
    }

    printf("Original: ");
    for (int i = 0; i < 3; i++) printf("%d ", array[i]);
    printf("\\n");

    // Resize to hold 5 elements
    int *new_array = (int*)realloc(array, 5 * sizeof(int));
    if (new_array == NULL) {
        free(array);
        return 1;
    }
    array = new_array;

    // Initialize new elements
    array[3] = 4;
    array[4] = 5;

    printf("Resized:  ");
    for (int i = 0; i < 5; i++) printf("%d ", array[i]);
    printf("\\n");

    free(array);

    return 0;
}
\`\`\`

---

## 🆓 free() - Memory Deallocation

### **Syntax**

\`\`\`c
void free(void *ptr);
\`\`\`

**Important Rules:**
- Only free memory allocated with malloc/calloc/realloc
- Only free each pointer once
- Set pointer to NULL after freeing (good practice)
- Freeing NULL pointer is safe (no operation)

### **Proper Memory Management**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *ptr = (int*)malloc(sizeof(int));

    if (ptr != NULL) {
        *ptr = 42;
        printf("Value: %d\\n", *ptr);

        free(ptr);      // Deallocate memory
        ptr = NULL;     // Prevent dangling pointer
    }

    return 0;
}
\`\`\`

---

## 🚨 Memory Leaks

### **What is a Memory Leak?**

Memory leak occurs when allocated memory is not properly freed, causing the program to consume more and more memory over time.

### **Example of Memory Leak**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

void memory_leak_function() {
    int *ptr = (int*)malloc(sizeof(int));
    *ptr = 100;
    // Forgot to free(ptr)! Memory leak!
}

int main(void) {
    for (int i = 0; i < 1000; i++) {
        memory_leak_function();  // Leaks 4 bytes each call
    }
    // After 1000 iterations: 4KB of leaked memory
    return 0;
}
\`\`\`

### **Preventing Memory Leaks**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

void safe_function() {
    int *ptr = (int*)malloc(sizeof(int));
    if (ptr == NULL) return;

    *ptr = 100;

    // Always free allocated memory
    free(ptr);
    ptr = NULL;
}
\`\`\`

---

## 💥 Dangling Pointers

### **What are Dangling Pointers?**

Dangling pointers point to memory that has been freed or is no longer valid.

### **Dangling Pointer Example**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *ptr = (int*)malloc(sizeof(int));
    *ptr = 42;

    printf("Before free: %d\\n", *ptr);

    free(ptr);  // Memory deallocated

    // ptr is now a dangling pointer!
    // This causes undefined behavior
    // printf("After free: %d\\n", *ptr);  // DANGER!

    ptr = NULL;  // Safe: set to NULL

    return 0;
}
\`\`\`

---

## 🔄 Dynamic Arrays

### **Creating Dynamic Arrays**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int size;

    printf("Enter array size: ");
    scanf("%d", &size);

    // Dynamic array allocation
    int *array = (int*)malloc(size * sizeof(int));

    if (array == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    // Initialize and use array
    for (int i = 0; i < size; i++) {
        array[i] = (i + 1) * 10;
        printf("%d ", array[i]);
    }
    printf("\\n");

    free(array);

    return 0;
}
\`\`\`

### **Dynamic 2D Arrays**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int rows = 3, cols = 4;

    // Allocate array of pointers (rows)
    int **matrix = (int**)malloc(rows * sizeof(int*));

    if (matrix == NULL) return 1;

    // Allocate each row
    for (int i = 0; i < rows; i++) {
        matrix[i] = (int*)malloc(cols * sizeof(int));
        if (matrix[i] == NULL) {
            // Free previously allocated rows
            for (int j = 0; j < i; j++) {
                free(matrix[j]);
            }
            free(matrix);
            return 1;
        }
    }

    // Initialize matrix
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            matrix[i][j] = i * cols + j + 1;
        }
    }

    // Print matrix
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            printf("%2d ", matrix[i][j]);
        }
        printf("\\n");
    }

    // Free memory (reverse order)
    for (int i = 0; i < rows; i++) {
        free(matrix[i]);
    }
    free(matrix);

    return 0;
}
\`\`\`

---

## 🏗️ Dynamic Data Structures

### **Dynamic Linked List**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

// Function to create new node
Node* create_node(int data) {
    Node *new_node = (Node*)malloc(sizeof(Node));
    if (new_node == NULL) return NULL;

    new_node->data = data;
    new_node->next = NULL;
    return new_node;
}

// Function to add node to end
void append(Node **head, int data) {
    Node *new_node = create_node(data);
    if (new_node == NULL) return;

    if (*head == NULL) {
        *head = new_node;
        return;
    }

    Node *current = *head;
    while (current->next != NULL) {
        current = current->next;
    }
    current->next = new_node;
}

// Function to free entire list
void free_list(Node *head) {
    Node *current = head;
    while (current != NULL) {
        Node *temp = current;
        current = current->next;
        free(temp);
    }
}

int main(void) {
    Node *head = NULL;

    // Add elements dynamically
    append(&head, 10);
    append(&head, 20);
    append(&head, 30);

    // Print list
    Node *current = head;
    while (current != NULL) {
        printf("%d ", current->data);
        current = current->next;
    }
    printf("\\n");

    // Free memory
    free_list(head);

    return 0;
}
\`\`\`

---

## ⚠️ Common Memory Errors

### **Double Free**

\`\`\`c
int *ptr = (int*)malloc(sizeof(int));
// ... use ptr ...
free(ptr);
// ... later ...
free(ptr);  // ERROR: Double free!
\`\`\`

### **Use After Free**

\`\`\`c
int *ptr = (int*)malloc(sizeof(int));
free(ptr);
// ptr still points to freed memory
*ptr = 42;  // ERROR: Use after free!
\`\`\`

### **Buffer Overflow**

\`\`\`c
int *array = (int*)malloc(5 * sizeof(int));
// Valid indices: 0-4
array[5] = 10;  // ERROR: Buffer overflow!
\`\`\`

### **Memory Leak in Loops**

\`\`\`c
for (int i = 0; i < 100; i++) {
    int *ptr = (int*)malloc(sizeof(int));
    // Forgot to free(ptr) in each iteration!
}
\`\`\`

---

## 🛡️ Best Practices

### **Memory Management Rules**

1. **Check allocation success**: Always check if malloc/calloc/realloc return NULL
2. **Free allocated memory**: Every malloc/calloc/realloc needs a corresponding free
3. **Set pointers to NULL**: After freeing, set pointer to NULL
4. **Free in reverse order**: Free nested allocations in reverse order
5. **Handle allocation failures**: Gracefully handle out-of-memory situations
6. **Use consistent patterns**: Follow consistent allocation/deallocation patterns

### **Memory-Safe Functions**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

// Safe allocation macro
#define SAFE_MALLOC(ptr, size) \\
    do { \\
        ptr = malloc(size); \\
        if (ptr == NULL) { \\
            fprintf(stderr, "Memory allocation failed\\n"); \\
            exit(1); \\
        } \\
    } while(0)

int main(void) {
    int *array;
    SAFE_MALLOC(array, 10 * sizeof(int));

    // Use array...

    free(array);
    array = NULL;

    return 0;
}
\`\`\`

---

## 🎯 Practical Examples

### **Example 1: Dynamic String Builder**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char *data;
    size_t size;
    size_t capacity;
} StringBuilder;

StringBuilder* sb_create(size_t initial_capacity) {
    StringBuilder *sb = (StringBuilder*)malloc(sizeof(StringBuilder));
    if (sb == NULL) return NULL;

    sb->data = (char*)malloc(initial_capacity);
    if (sb->data == NULL) {
        free(sb);
        return NULL;
    }

    sb->data[0] = '\\0';
    sb->size = 0;
    sb->capacity = initial_capacity;

    return sb;
}

void sb_append(StringBuilder *sb, const char *str) {
    size_t str_len = strlen(str);

    // Resize if needed
    if (sb->size + str_len + 1 > sb->capacity) {
        size_t new_capacity = sb->capacity * 2;
        char *new_data = (char*)realloc(sb->data, new_capacity);

        if (new_data == NULL) return;

        sb->data = new_data;
        sb->capacity = new_capacity;
    }

    strcpy(sb->data + sb->size, str);
    sb->size += str_len;
}

void sb_free(StringBuilder *sb) {
    if (sb != NULL) {
        free(sb->data);
        free(sb);
    }
}

int main(void) {
    StringBuilder *sb = sb_create(10);

    if (sb == NULL) return 1;

    sb_append(sb, "Hello, ");
    sb_append(sb, "Dynamic ");
    sb_append(sb, "Memory ");
    sb_append(sb, "Allocation!");

    printf("Result: %s\\n", sb->data);
    printf("Size: %zu, Capacity: %zu\\n", sb->size, sb->capacity);

    sb_free(sb);

    return 0;
}
\`\`\`

### **Example 2: Dynamic Stack**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct {
    int *data;
    int top;
    int capacity;
} Stack;

Stack* stack_create(int initial_capacity) {
    Stack *stack = (Stack*)malloc(sizeof(Stack));
    if (stack == NULL) return NULL;

    stack->data = (int*)malloc(initial_capacity * sizeof(int));
    if (stack->data == NULL) {
        free(stack);
        return NULL;
    }

    stack->top = -1;
    stack->capacity = initial_capacity;

    return stack;
}

bool stack_push(Stack *stack, int value) {
    if (stack->top + 1 >= stack->capacity) {
        // Resize stack
        int new_capacity = stack->capacity * 2;
        int *new_data = (int*)realloc(stack->data, new_capacity * sizeof(int));

        if (new_data == NULL) return false;

        stack->data = new_data;
        stack->capacity = new_capacity;
    }

    stack->data[++stack->top] = value;
    return true;
}

bool stack_pop(Stack *stack, int *value) {
    if (stack->top < 0) return false;

    *value = stack->data[stack->top--];
    return true;
}

void stack_free(Stack *stack) {
    if (stack != NULL) {
        free(stack->data);
        free(stack);
    }
}

int main(void) {
    Stack *stack = stack_create(2);

    if (stack == NULL) return 1;

    // Push elements
    stack_push(stack, 10);
    stack_push(stack, 20);
    stack_push(stack, 30);  // This will trigger resize

    printf("Stack capacity: %d\\n", stack->capacity);

    // Pop elements
    int value;
    while (stack_pop(stack, &value)) {
        printf("Popped: %d\\n", value);
    }

    stack_free(stack);

    return 0;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Dynamic allocation** uses heap memory for flexible sizing
2. **malloc()** allocates uninitialized memory
3. **calloc()** allocates and initializes memory to zero
4. **realloc()** resizes existing allocations
5. **free()** deallocates memory and prevents leaks
6. **Always check** for NULL after allocation
7. **Prevent memory leaks** by freeing all allocated memory
8. **Avoid dangling pointers** by setting freed pointers to NULL

Master dynamic memory allocation to create flexible, efficient C programs! 💾✨`;

    return contentString;
  })()
};
