import { SubLesson } from '../../../data/lessonsData';

export const topic_6_4: SubLesson = {
  id: 6.4,
  title: 'Pointers and Arrays',
  status: 'completed',
  content: `# 🔗 Pointers and Arrays

Discover the intimate relationship between arrays and pointers in C - they are essentially the same thing with different syntax.

---

## 🎯 Array Names are Pointers

### The Fundamental Truth

**In most contexts, an array name decays into a pointer to its first element.**

\`\`\`c
#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};

    printf("Array name 'arr': %p\\n", arr);
    printf("Address of first element &arr[0]: %p\\n", &arr[0]);
    printf("Are they equal? %s\\n", arr == &arr[0] ? "Yes" : "No");

    // Both access the same memory
    printf("arr[0] = %d\\n", arr[0]);
    printf("*arr = %d\\n", *arr);

    return 0;
}
\`\`\`

**Key insight:** `arr` and `&arr[0]` are identical in value and type.

---

## 🔍 Array-Pointer Equivalence

### Interchangeable Syntax

\`\`\`c
#include <stdio.h>

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    int* ptr = arr;  // ptr points to first element

    printf("Using array notation:\\n");
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d\\n", i, arr[i]);
    }

    printf("\\nUsing pointer notation:\\n");
    for (int i = 0; i < 5; i++) {
        printf("*(ptr + %d) = %d\\n", i, *(ptr + i));
    }

    printf("\\nUsing pointer increment:\\n");
    for (int* current = ptr; current < ptr + 5; current++) {
        printf("*current = %d\\n", *current);
    }

    return 0;
}
\`\`\`

### Memory Layout

\`\`\`c
#include <stdio.h>

int main() {
    int arr[3] = {100, 200, 300};
    int* ptr = arr;

    printf("Memory addresses:\\n");
    printf("&arr[0] = %p, arr[0] = %d\\n", &arr[0], arr[0]);
    printf("&arr[1] = %p, arr[1] = %d\\n", &arr[1], arr[1]);
    printf("&arr[2] = %p, arr[2] = %d\\n", &arr[2], arr[2]);

    printf("\\nPointer arithmetic:\\n");
    printf("ptr = %p, *ptr = %d\\n", ptr, *ptr);
    printf("ptr + 1 = %p, *(ptr + 1) = %d\\n", ptr + 1, *(ptr + 1));
    printf("ptr + 2 = %p, *(ptr + 2) = %d\\n", ptr + 2, *(ptr + 2));

    return 0;
}
\`\`\`

---

## 📤 Passing Arrays to Functions

### Method 1: Array Notation (Decays to Pointer)

\`\`\`c
#include <stdio.h>

// Function parameter: int arr[] (actually int* arr)
void print_array(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

// Function can modify the array
void double_array(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        arr[i] *= 2;
    }
}

int main() {
    int numbers[] = {1, 2, 3, 4, 5};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    printf("Original: ");
    print_array(numbers, size);

    double_array(numbers, size);

    printf("Doubled: ");
    print_array(numbers, size);

    return 0;
}
\`\`\`

### Method 2: Explicit Pointer Notation

\`\`\`c
#include <stdio.h>

// Explicit pointer parameter
void reverse_array(int* arr, int size) {
    for (int i = 0; i < size / 2; i++) {
        int temp = arr[i];
        arr[i] = arr[size - 1 - i];
        arr[size - 1 - i] = temp;
    }
}

int main() {
    int numbers[] = {1, 2, 3, 4, 5, 6};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    printf("Original: ");
    for (int i = 0; i < size; i++) printf("%d ", numbers[i]);
    printf("\\n");

    reverse_array(numbers, size);

    printf("Reversed: ");
    for (int i = 0; i < size; i++) printf("%d ", numbers[i]);
    printf("\\n");

    return 0;
}
\`\`\`

### Method 3: const Pointer (Read-Only)

\`\`\`c
#include <stdio.h>

// Function promises not to modify the array
int find_max(const int* arr, int size) {
    if (size == 0) return 0;

    int max = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

int main() {
    int numbers[] = {12, 45, 23, 67, 89, 34};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    int maximum = find_max(numbers, size);
    printf("Maximum value: %d\\n", maximum);

    return 0;
}
\`\`\`

---

## 🏗️ Multi-Dimensional Arrays and Pointers

### 2D Arrays as Pointers

\`\`\`c
#include <stdio.h>

int main() {
    int matrix[3][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };

    // matrix decays to pointer to array of 4 ints
    printf("matrix = %p\\n", matrix);
    printf("&matrix[0] = %p\\n", &matrix[0]);
    printf("Are they equal? %s\\n", matrix == &matrix[0] ? "Yes" : "No");

    // Access elements
    printf("matrix[1][2] = %d\\n", matrix[1][2]);
    printf("*(*(matrix + 1) + 2) = %d\\n", *(*(matrix + 1) + 2));

    return 0;
}
\`\`\`

### Passing 2D Arrays to Functions

\`\`\`c
#include <stdio.h>

// Method 1: Specify second dimension
void print_matrix(int matrix[][4], int rows) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < 4; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\\n");
    }
}

// Method 2: Pointer to array
void print_matrix_ptr(int (*matrix)[4], int rows) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < 4; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\\n");
    }
}

int main() {
    int matrix[3][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };

    printf("Matrix:\\n");
    print_matrix(matrix, 3);

    return 0;
}
\`\`\`

---

## 🔤 Strings as Character Arrays

### String Literals and Pointers

\`\`\`c
#include <stdio.h>
#include <string.h>

int main() {
    // String literal - stored in read-only memory
    char* str_ptr = "Hello, World!";

    // Character array - stored on stack
    char str_arr[] = "Hello, World!";

    printf("Pointer to literal: %s\\n", str_ptr);
    printf("Character array: %s\\n", str_arr);

    // Both can be used with pointer arithmetic
    printf("Third character (pointer): %c\\n", *(str_ptr + 2));
    printf("Third character (array): %c\\n", str_arr[2]);

    // But you can't modify string literals
    // str_ptr[0] = 'h';  // ❌ Undefined behavior!

    // You can modify character arrays
    str_arr[0] = 'h';  // ✅ OK
    printf("Modified array: %s\\n", str_arr);

    return 0;
}
\`\`\`

### String Functions with Pointers

\`\`\`c
#include <stdio.h>
#include <string.h>

int main() {
    char str1[50] = "Hello";
    char str2[] = " World!";
    char* str3 = " C Programming";

    // Concatenation
    strcat(str1, str2);
    printf("After concatenation: %s\\n", str1);

    // Copy
    char destination[50];
    strcpy(destination, str1);
    printf("Copied string: %s\\n", destination);

    // Length
    printf("Length of destination: %zu\\n", strlen(destination));

    // Comparison
    if (strcmp(str1, destination) == 0) {
        printf("Strings are equal\\n");
    }

    return 0;
}
\`\`\`

---

## 🧪 Array of Pointers vs Pointer to Array

### Array of Pointers

\`\`\`c
#include <stdio.h>

int main() {
    int x = 10, y = 20, z = 30;

    // Array of pointers to int
    int* ptr_array[3] = {&x, &y, &z};

    printf("Array of pointers:\\n");
    for (int i = 0; i < 3; i++) {
        printf("ptr_array[%d] = %p, *ptr_array[%d] = %d\\n",
               i, ptr_array[i], i, *ptr_array[i]);
    }

    // Modify through array of pointers
    *ptr_array[0] = 100;  // Changes x
    *ptr_array[1] = 200;  // Changes y
    *ptr_array[2] = 300;  // Changes z

    printf("\\nAfter modification: x=%d, y=%d, z=%d\\n", x, y, z);

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

    printf("Pointer to array:\\n");
    printf("ptr_to_array = %p\\n", ptr_to_array);
    printf("&arr = %p\\n", &arr);

    // Access elements
    printf("First element: %d\\n", (*ptr_to_array)[0]);
    printf("Third element: %d\\n", (*ptr_to_array)[2]);

    // Can also use pointer arithmetic
    printf("Second element: %d\\n", *(*ptr_to_array + 1));

    return 0;
}
\`\`\`

---

## 🛡️ Common Array-Pointer Pitfalls

### sizeof() Behavior

\`\`\`c
#include <stdio.h>

void demonstrate_sizeof(int arr[], int size) {
    printf("sizeof(arr) in function: %zu\\n", sizeof(arr));  // Pointer size!
    printf("size parameter: %d\\n", size);
}

int main() {
    int arr[10] = {0};

    printf("sizeof(arr) in main: %zu\\n", sizeof(arr));  // Array size
    printf("sizeof(arr[0]): %zu\\n", sizeof(arr[0]));    // Element size

    // When passed to function, array decays to pointer
    demonstrate_sizeof(arr, sizeof(arr) / sizeof(arr[0]));

    return 0;
}
\`\`\`

### Returning Local Arrays

\`\`\`c
#include <stdio.h>

// ❌ Dangerous: returns pointer to local array
int* bad_function() {
    int local_arr[5] = {1, 2, 3, 4, 5};
    return local_arr;  // Array goes out of scope!
}

// ✅ Safe: return dynamically allocated array
int* good_function(int size) {
    int* arr = (int*)malloc(size * sizeof(int));
    if (arr != NULL) {
        for (int i = 0; i < size; i++) {
            arr[i] = i + 1;
        }
    }
    return arr;
}

int main() {
    int* ptr = good_function(5);
    if (ptr != NULL) {
        for (int i = 0; i < 5; i++) {
            printf("%d ", ptr[i]);
        }
        free(ptr);
    }

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Array names decay to pointers** to their first element
2. **Array indexing** (`arr[i]`) is equivalent to pointer arithmetic (`*(arr + i)`)
3. **When passed to functions**, arrays become pointers (lose size information)
4. **sizeof()** works differently for arrays vs pointers
5. **Multi-dimensional arrays** have complex pointer relationships
6. **String literals** are read-only arrays of characters
7. **Always pass array size** as a separate parameter to functions

---

## 🚀 Preview: Pointers and Functions

In the next topic, you'll learn about:
- **Function parameters** that are pointers
- **Returning pointers** from functions safely
- **Function pointers** and their uses
- **Callback functions** and advanced patterns

**Pointers make functions truly powerful - they enable data sharing and modification!** 🎛️
