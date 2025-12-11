import { SubLesson } from '../../../data/lessonsData';

export const topic_6_1: SubLesson = {
  id: 6.1,
  title: 'Introduction to Pointers',
  status: 'completed',
  content: `# 🎯 Introduction to Pointers

Learn why pointers are the most powerful and challenging feature of C programming, and understand their fundamental concepts.

---

## 🎯 Why Pointers Matter

### The Power of Pointers

**Pointers are memory addresses that allow you to directly manipulate data in memory.**

Without pointers, you can only work with copies of data:

\`\`\`c
#include <stdio.h>

void try_to_change(int x) {
    x = 100;  // Changes the copy, not the original
}

int main() {
    int number = 50;
    printf("Before: %d\\n", number);
    try_to_change(number);
    printf("After: %d\\n", number);  // Still 50!
    return 0;
}
\`\`\`

With pointers, you can modify the original data:

\`\`\`c
#include <stdio.h>

void actually_change(int* ptr) {
    *ptr = 100;  // Changes the original through the pointer
}

int main() {
    int number = 50;
    printf("Before: %d\\n", number);
    actually_change(&number);  // Pass address
    printf("After: %d\\n", number);  // Now 100!
    return 0;
}
\`\`\`

**Pointers enable:**
- ✅ Direct memory manipulation
- ✅ Efficient function parameter passing
- ✅ Dynamic memory allocation
- ✅ Array operations
- ✅ Complex data structures
- ✅ System-level programming

---

## 🏠 Understanding Memory

### Memory as a Sequence of Bytes

\`\`\`c
#include <stdio.h>

int main() {
    int x = 42;
    double y = 3.14;
    char c = 'A';

    printf("Address of x: %p\\n", &x);
    printf("Address of y: %p\\n", &y);
    printf("Address of c: %p\\n", &c);

    printf("Size of int: %zu bytes\\n", sizeof(int));
    printf("Size of double: %zu bytes\\n", sizeof(double));
    printf("Size of char: %zu bytes\\n", sizeof(char));

    return 0;
}
\`\`\`

**Key concepts:**
- **Memory address**: Unique identifier for each byte location
- **Variables occupy contiguous memory blocks**
- **Address operator \`&\`**: Gets the memory address of a variable
- **sizeof operator**: Shows how many bytes a type occupies

---

## 🎯 What is a Pointer?

### Definition
**A pointer is a variable that stores a memory address.**

\`\`\`c
#include <stdio.h>

int main() {
    int x = 42;        // Regular variable
    int* ptr = &x;     // Pointer variable storing address of x

    printf("Value of x: %d\\n", x);
    printf("Address of x: %p\\n", &x);
    printf("Value of ptr: %p\\n", ptr);
    printf("Value at address ptr: %d\\n", *ptr);

    return 0;
}
\`\`\`

### Pointer Components

1. **Data Type**: What type of data the pointer points to
2. **Asterisk \`*\`**: Indicates it's a pointer variable
3. **Address**: The actual memory address stored
4. **Dereference operator \`*\`**: Accesses the value at the address

---

## 📝 Pointer Declaration and Initialization

### Declaration Syntax

\`\`\`c
// datatype* pointer_name;
int* int_ptr;
double* double_ptr;
char* char_ptr;
void* void_ptr;  // Generic pointer
\`\`\`

### Initialization Methods

#### Method 1: Initialize with Address

\`\`\`c
int x = 10;
int* ptr1 = &x;  // Point to existing variable
\`\`\`

#### Method 2: Initialize to NULL

\`\`\`c
int* ptr2 = NULL;  // Point to nothing (safe)
\`\`\`

#### Method 3: Uninitialized

\`\`\`c
int* ptr3;  // Contains garbage address (dangerous!)
\`\`\`

### Multiple Pointer Declarations

\`\`\`c
// Correct way
int* p1, * p2, * p3;

// Incorrect way (only p1 is a pointer)
int* p1, p2, p3;  // p2 and p3 are regular ints!
\`\`\`

---

## 🔍 Dereferencing Pointers

### Accessing Values Through Pointers

\`\`\`c
#include <stdio.h>

int main() {
    int value = 100;
    int* ptr = &value;

    printf("Direct access: %d\\n", value);
    printf("Pointer access: %d\\n", *ptr);

    // Modify through pointer
    *ptr = 200;
    printf("After modification: %d\\n", value);

    return 0;
}
\`\`\`

### Multiple Levels of Indirection

\`\`\`c
#include <stdio.h>

int main() {
    int x = 42;
    int* ptr1 = &x;      // Pointer to int
    int** ptr2 = &ptr1;  // Pointer to pointer to int
    int*** ptr3 = &ptr2; // Pointer to pointer to pointer to int

    printf("x = %d\\n", x);
    printf("*ptr1 = %d\\n", *ptr1);
    printf("**ptr2 = %d\\n", **ptr2);
    printf("***ptr3 = %d\\n", ***ptr3);

    // Modify through triple pointer
    ***ptr3 = 100;
    printf("After modification: x = %d\\n", x);

    return 0;
}
\`\`\`

---

## 🛡️ Pointer Safety

### NULL Pointers

\`\`\`c
#include <stdio.h>

int main() {
    int* safe_ptr = NULL;    // Safe initialization
    int* dangerous_ptr;      // Contains garbage

    // Safe to check
    if (safe_ptr != NULL) {
        printf("Safe pointer points to: %d\\n", *safe_ptr);
    } else {
        printf("Safe pointer is NULL\\n");
    }

    // Dangerous - may crash!
    // printf("%d\\n", *dangerous_ptr);

    return 0;
}
\`\`\`

### Dangling Pointers

\`\`\`c
#include <stdio.h>

int* create_dangling_pointer() {
    int local_var = 42;
    return &local_var;  // ❌ Returns address of local variable
}

int main() {
    int* dangling = create_dangling_pointer();
    // local_var no longer exists, but dangling still points to its address
    // *dangling is undefined behavior!
    return 0;
}
\`\`\`

---

## 🎮 Real-World Pointer Applications

### Function Parameters (Pass by Reference)

\`\`\`c
#include <stdio.h>

// Swap two values using pointers
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    printf("Before swap: x=%d, y=%d\\n", x, y);
    swap(&x, &y);
    printf("After swap: x=%d, y=%d\\n", x, y);
    return 0;
}
\`\`\`

### Arrays and Pointers

\`\`\`c
#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int* ptr = arr;  // Points to first element

    // Access array elements through pointer
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d, *(ptr + %d) = %d\\n",
               i, arr[i], i, *(ptr + i));
    }

    // Pointer arithmetic
    printf("First element: %d\\n", *ptr);
    printf("Second element: %d\\n", *(ptr + 1));
    printf("Last element: %d\\n", *(ptr + 4));

    return 0;
}
\`\`\`

### Dynamic Memory Allocation

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main() {
    // Allocate memory for 5 integers
    int* dynamic_array = (int*)malloc(5 * sizeof(int));

    if (dynamic_array != NULL) {
        // Use the allocated memory
        for (int i = 0; i < 5; i++) {
            dynamic_array[i] = i * 10;
            printf("%d ", dynamic_array[i]);
        }
        printf("\\n");

        // Free the memory
        free(dynamic_array);
        dynamic_array = NULL;  // Good practice
    } else {
        printf("Memory allocation failed!\\n");
    }

    return 0;
}
\`\`\`

---

## 🐛 Common Pointer Mistakes

### Uninitialized Pointers

\`\`\`c
int* ptr;  // Contains garbage address
// *ptr = 42;  // Undefined behavior - may crash!
\`\`\`

### Memory Leaks

\`\`\`c
void memory_leak() {
    int* ptr = (int*)malloc(sizeof(int));
    *ptr = 42;
    // Forgot to free(ptr)! Memory leak!
}
\`\`\`

### Double Free

\`\`\`c
int* ptr = (int*)malloc(sizeof(int));
free(ptr);    // First free - OK
// free(ptr); // Second free - Undefined behavior!
\`\`\`

### Invalid Dereference

\`\`\`c
int* ptr = NULL;
// *ptr = 42;  // Crash! Dereferencing NULL pointer
\`\`\`

---

## 📊 Pointer Types and Sizes

### Different Pointer Types

\`\`\`c
#include <stdio.h>

int main() {
    int x = 42;
    double y = 3.14;
    char c = 'A';

    int* int_ptr = &x;
    double* double_ptr = &y;
    char* char_ptr = &c;
    void* void_ptr;

    printf("Size of int*: %zu bytes\\n", sizeof(int_ptr));
    printf("Size of double*: %zu bytes\\n", sizeof(double_ptr));
    printf("Size of char*: %zu bytes\\n", sizeof(char_ptr));
    printf("Size of void*: %zu bytes\\n", sizeof(void_ptr));

    // All pointer types usually have the same size on modern systems
    return 0;
}
\`\`\`

### Type Safety

\`\`\`c
int x = 42;
int* int_ptr = &x;

// ❌ Wrong type - compilation warning/error
double* wrong_ptr = &x;

// ✅ Correct type
int* correct_ptr = &x;

// ⚠️ void* can point to anything (but lose type safety)
void* generic_ptr = &x;
\`\`\`

---

## 🎯 Pointer Syntax Summary

| Operation | Syntax | Description |
|-----------|--------|-------------|
| **Declaration** | \`int* ptr;\` | Declare pointer variable |
| **Address-of** | \`&variable\` | Get address of variable |
| **Dereference** | \`*pointer\` | Access value at address |
| **Assignment** | \`ptr = &var;\` | Point to a variable |
| **NULL check** | \`if (ptr != NULL)\` | Check if pointer is valid |
| **Array access** | \`*(ptr + i)\` | Access array element |

---

## 🚀 Preview: Pointer Declaration and Initialization

In the next topic, you'll learn about:
- **Detailed pointer declaration syntax** and rules
- **Pointer initialization methods** and best practices
- **Multiple pointer declarations** and common mistakes
- **Pointer constants and constant pointers**

**Mastering pointer declaration is the foundation for all pointer operations!** 🏗️
