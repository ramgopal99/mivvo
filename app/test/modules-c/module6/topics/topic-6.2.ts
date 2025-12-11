import { SubLesson } from '../../../data/lessonsData';

export const topic_6_2: SubLesson = {
  id: 6.2,
  title: 'Pointer Declaration and Initialization',
  status: 'completed',
  content: `# 📝 Pointer Declaration and Initialization

Master the correct syntax for declaring pointers and the various ways to initialize them safely.

---

## 📋 Pointer Declaration Syntax

### Basic Declaration

\`\`\`c
// datatype* pointer_name;
int* int_pointer;
double* double_pointer;
char* string_pointer;
void* generic_pointer;
\`\`\`

### Declaration with Initialization

\`\`\`c
// Method 1: Declare and initialize separately
int x = 42;
int* ptr;
ptr = &x;  // Initialize with address

// Method 2: Declare and initialize together
int y = 100;
int* ptr2 = &y;  // Initialize immediately

// Method 3: Initialize with NULL
int* safe_ptr = NULL;  // Safe initialization
\`\`\`

### Multiple Pointer Declarations

\`\`\`c
// ✅ Correct: Each variable is explicitly declared as pointer
int* p1, * p2, * p3;

// ❌ Incorrect: Only first is pointer, others are regular ints
int* p1, p2, p3;  // p2 and p3 are not pointers!

// ✅ Alternative syntax (less common)
int *p1, *p2, *p3;
\`\`\`

---

## 🔧 Pointer Type Modifiers

### Constant Pointers

\`\`\`c
int x = 10, y = 20;

// Pointer to constant int - cannot change value through pointer
const int* ptr1 = &x;  // Cannot do: *ptr1 = 50;
*ptr1 = 30;            // ❌ Error: cannot modify const int

// Can change what it points to
ptr1 = &y;             // ✅ OK: change address

// Constant pointer to int - cannot change address
int* const ptr2 = &x;  // Cannot do: ptr2 = &y;
*ptr2 = 30;            // ✅ OK: can modify value

// Constant pointer to constant int
const int* const ptr3 = &x;  // Cannot change address or value
\`\`\`

### Void Pointers

\`\`\`c
#include <stdio.h>

int main() {
    int x = 42;
    double y = 3.14;
    char c = 'A';

    // Void pointer can point to any type
    void* generic_ptr;

    // Point to different types
    generic_ptr = &x;
    printf("Integer: %d\\n", *(int*)generic_ptr);

    generic_ptr = &y;
    printf("Double: %.2f\\n", *(double*)generic_ptr);

    generic_ptr = &c;
    printf("Character: %c\\n", *(char*)generic_ptr);

    return 0;
}
\`\`\`

---

## 🎯 Pointer Initialization Best Practices

### Always Initialize Pointers

\`\`\`c
// ✅ Good: Initialize to NULL
int* safe_ptr = NULL;

// ✅ Good: Initialize with valid address
int x = 42;
int* valid_ptr = &x;

// ❌ Bad: Uninitialized pointer (garbage address)
int* dangerous_ptr;  // Contains random memory address
// *dangerous_ptr = 42;  // Undefined behavior!
\`\`\`

### Use NULL for Invalid Pointers

\`\`\`c
#include <stdio.h>

int* find_value(int arr[], int size, int target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) {
            return &arr[i];  // Return valid address
        }
    }
    return NULL;  // Return NULL when not found
}

int main() {
    int numbers[] = {10, 20, 30, 40, 50};
    int* result = find_value(numbers, 5, 25);

    if (result != NULL) {
        printf("Found: %d\\n", *result);
    } else {
        printf("Value not found\\n");
    }

    return 0;
}
\`\`\`

---

## 🔄 Pointer Assignment and Reassignment

### Basic Assignment

\`\`\`c
int a = 10, b = 20;
int* ptr;

// Assign address of a
ptr = &a;
printf("Points to a: %d\\n", *ptr);

// Reassign to point to b
ptr = &b;
printf("Now points to b: %d\\n", *ptr);
\`\`\`

### Pointer-to-Pointer Assignment

\`\`\`c
int x = 42;
int* ptr1 = &x;
int** ptr2 = &ptr1;  // Pointer to pointer

printf("x = %d\\n", x);
printf("*ptr1 = %d\\n", *ptr1);
printf("**ptr2 = %d\\n", **ptr2);

// Modify through double pointer
**ptr2 = 100;
printf("After modification: x = %d\\n", x);
\`\`\`

---

## 🏗️ Complex Pointer Declarations

### Arrays of Pointers

\`\`\`c
#include <stdio.h>

int main() {
    int x = 10, y = 20, z = 30;

    // Array of pointers to int
    int* ptr_array[3] = {&x, &y, &z};

    // Access through array of pointers
    for (int i = 0; i < 3; i++) {
        printf("ptr_array[%d] points to: %d\\n", i, *ptr_array[i]);
    }

    // Modify through array of pointers
    *ptr_array[0] = 100;  // Changes x
    *ptr_array[1] = 200;  // Changes y
    *ptr_array[2] = 300;  // Changes z

    printf("After modification: x=%d, y=%d, z=%d\\n", x, y, z);

    return 0;
}
\`\`\`

### Pointer to Array

\`\`\`c
#include <stdio.h>

int main() {
    int arr[5] = {1, 2, 3, 4, 5};

    // Pointer to array of 5 ints
    int (*ptr_to_array)[5] = &arr;

    // Access array elements through pointer
    printf("First element: %d\\n", (*ptr_to_array)[0]);
    printf("Third element: %d\\n", (*ptr_to_array)[2]);

    // Can also do pointer arithmetic
    printf("Second element: %d\\n", *(*ptr_to_array + 1));

    return 0;
}
\`\`\`

### Function Pointers

\`\`\`c
#include <stdio.h>

// Function pointer declaration
int (*operation)(int, int);

// Functions to point to
int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

int main() {
    int x = 10, y = 5;

    // Point to add function
    operation = add;
    printf("10 + 5 = %d\\n", operation(x, y));

    // Point to multiply function
    operation = multiply;
    printf("10 * 5 = %d\\n", operation(x, y));

    return 0;
}
\`\`\`

---

## 🛡️ Declaration Errors and Solutions

### Asterisk Placement Confusion

\`\`\`c
int* ptr1, ptr2, ptr3;  // Only ptr1 is a pointer!

// Correct alternatives:
int *ptr1, *ptr2, *ptr3;  // All are pointers
int* ptr1; int* ptr2; int* ptr3;  // Separate declarations
\`\`\`

### Type Mismatch

\`\`\`c
int x = 42;
double* wrong_ptr = &x;  // ❌ Type mismatch warning

// ✅ Correct: matching types
int* correct_ptr = &x;
double y = 3.14;
double* correct_double_ptr = &y;
\`\`\`

### Scope Issues

\`\`\`c
void dangerous_function() {
    int local_var = 42;
    int* local_ptr = &local_var;
    // local_ptr is valid here
}
// local_ptr is now a dangling pointer!

// ✅ Safe approach
int* safe_function() {
    static int static_var = 42;  // Static persists
    return &static_var;
}
\`\`\`

---

## 🎯 Declaration Patterns

### Pointer to Function Returning Pointer

\`\`\`c
// Complex declaration: pointer to function returning int*
int* (*complex_ptr)(int, int);

// Simpler: typedef can help
typedef int* (*OperationFunc)(int, int);
OperationFunc func_ptr = some_function;
\`\`\`

### Reading Complex Declarations

**Right-to-Left Rule:**
1. Start from identifier
2. Look right for `[]` or `()` 
3. Look left for `*`
4. Repeat

\`\`\`c
int* ptr[5];        // Array of 5 pointers to int
int (*ptr)[5];      // Pointer to array of 5 ints
int* (*ptr)[5];     // Pointer to array of 5 pointers to int
int (*ptr)(int);    // Pointer to function taking int, returning int
int* (*ptr)(int);   // Pointer to function taking int, returning int*
\`\`\`

---

## 🧪 Initialization Techniques

### Dynamic Initialization

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int* ptr = NULL;
    int user_choice;

    printf("Enter 1 to allocate memory, 2 to exit: ");
    scanf("%d", &user_choice);

    if (user_choice == 1) {
        ptr = (int*)malloc(sizeof(int));
        if (ptr != NULL) {
            *ptr = 42;
            printf("Allocated and initialized: %d\\n", *ptr);
            free(ptr);
        }
    }

    return 0;
}
\`\`\`

### Conditional Initialization

\`\`\`c
#include <stdio.h>

int main() {
    int x = 10, y = 20;
    int* ptr;

    // Conditional initialization
    if (x > y) {
        ptr = &x;
    } else {
        ptr = &y;
    }

    printf("Larger value: %d\\n", *ptr);

    return 0;
}
\`\`\`

### Initialization with Functions

\`\`\`c
int* get_largest_address(int* a, int* b) {
    return (*a > *b) ? a : b;
}

int main() {
    int x = 100, y = 200;
    int* largest_ptr = get_largest_address(&x, &y);

    printf("Largest value: %d\\n", *largest_ptr);

    return 0;
}
\`\`\`

---

## 📋 Best Practices Summary

### Declaration Rules
1. **Always use `int* ptr` or `int *ptr`** - be consistent
2. **Declare pointers separately** if unsure: `int* p1; int* p2;`
3. **Initialize pointers** immediately or set to NULL
4. **Use meaningful names** for pointer variables

### Initialization Rules  
1. **Never use uninitialized pointers**
2. **Set unused pointers to NULL**
3. **Validate pointer addresses** before dereferencing
4. **Check allocation success** for dynamic memory

### Type Safety
1. **Match pointer types** to pointed-to data
2. **Use const** appropriately for immutable data
3. **Cast void pointers** explicitly when dereferencing
4. **Avoid unnecessary type casting**

---

## 🧪 Complete Examples

### Safe Pointer Management

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

// Safe pointer operations
typedef struct {
    int* data;
    size_t size;
} SafeArray;

SafeArray* create_safe_array(size_t size) {
    SafeArray* arr = (SafeArray*)malloc(sizeof(SafeArray));
    if (arr == NULL) return NULL;

    arr->data = (int*)calloc(size, sizeof(int));  // Zero-initialized
    if (arr->data == NULL) {
        free(arr);
        return NULL;
    }

    arr->size = size;
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

int main() {
    SafeArray* my_array = create_safe_array(5);

    if (my_array != NULL) {
        // Safe operations
        safe_set(my_array, 0, 10);
        safe_set(my_array, 2, 30);
        safe_set(my_array, 10, 99);  // Out of bounds - ignored

        for (size_t i = 0; i < my_array->size; i++) {
            printf("Element %zu: %d\\n", i, safe_get(my_array, i));
        }

        destroy_safe_array(my_array);
    }

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Declaration syntax**: `datatype* pointer_name;`
2. **Multiple declarations**: `int* p1, * p2, * p3;` (asterisk before each)
3. **Always initialize** pointers (to NULL or valid address)
4. **Use const** appropriately: `const int*` vs `int* const`
5. **void pointers** can point to any type but lose type safety
6. **Complex declarations** read right-to-left
7. **Function pointers** store addresses of functions

---

## 🚀 Preview: Pointer Operations and Arithmetic

In the next topic, you'll learn about:
- **Pointer arithmetic** and address calculations
- **Incrementing and decrementing** pointers
- **Pointer comparisons** and relational operations
- **Array indexing** through pointer operations

**Pointer arithmetic unlocks the true power of pointers in C!** ➕
