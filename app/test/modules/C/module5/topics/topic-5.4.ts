import { SubLesson } from '../../../../data/lessonsData';

export const topic_5_4: SubLesson = {
  id: "5.4",
  title: 'Pointers and Arrays',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🔗 Pointers and Arrays in C

Arrays and pointers are closely related in C. Understanding their relationship is fundamental to mastering C programming. Arrays often "decay" into pointers, and pointer arithmetic enables efficient array manipulation.

---

## 📋 Arrays vs Pointers

### **The Relationship**

\`\`\`c
#include <stdio.h>

int main(void) {
    int arr[5] = {10, 20, 30, 40, 50};
    int *ptr = arr;  // ptr points to first element

    printf("Array name 'arr' is: %p\\n", (void*)arr);
    printf("Pointer 'ptr' is: %p\\n", (void*)ptr);
    printf("Are they equal? %s\\n", arr == ptr ? "Yes" : "No");

    return 0;
}
\`\`\`

**Key Insight:** Array names act like constant pointers to the first element!

---

## 🔄 Array Decay

### **When Arrays Become Pointers**

\`\`\`c
#include <stdio.h>

void func(int *param) {
    printf("Parameter type: pointer\\n");
    printf("sizeof(param): %zu\\n", sizeof(param));  // Size of pointer
}

int main(void) {
    int arr[5] = {1, 2, 3, 4, 5};

    printf("Array size: %zu\\n", sizeof(arr));      // Size of whole array
    printf("Element size: %zu\\n", sizeof(arr[0]));

    func(arr);  // Array decays to pointer when passed to function

    return 0;
}
\`\`\`

**Array decay happens when:**
- Passing arrays to functions
- Using arrays in expressions (except \`sizeof\` and \`&\`)

---

## 🎯 Array Access Methods

### **Three Ways to Access Arrays**

\`\`\`c
#include <stdio.h>

int main(void) {
    int arr[5] = {10, 20, 30, 40, 50};

    printf("Method 1: Array indexing\\n");
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d\\n", i, arr[i]);
    }

    printf("\\nMethod 2: Pointer arithmetic\\n");
    for (int i = 0; i < 5; i++) {
        printf("*(arr + %d) = %d\\n", i, *(arr + i));
    }

    printf("\\nMethod 3: Pointer traversal\\n");
    int *ptr = arr;
    for (int i = 0; i < 5; i++) {
        printf("*ptr = %d\\n", *ptr);
        ptr++;  // Move to next element
    }

    return 0;
}
\`\`\`

**Equivalences:**
- \`arr[i]\` ≡ \`*(arr + i)\`
- \`&arr[i]\` ≡ \`arr + i\`

---

## 📍 Array Name Properties

### **What You CAN Do**

\`\`\`c
int arr[5] = {1, 2, 3, 4, 5};

// ✅ Valid operations:
int *ptr = arr;        // Assign to pointer
ptr = &arr[0];         // Point to first element
sizeof(arr);           // Get total array size
*arr;                  // Dereference (get first element)
arr + 1;               // Pointer arithmetic
\`\`\`

### **What You CANNOT Do**

\`\`\`c
int arr[5] = {1, 2, 3, 4, 5};
int arr2[5] = {6, 7, 8, 9, 10};

// ❌ Invalid operations:
// arr = arr2;           // Cannot reassign array name
// arr++;                // Cannot increment array name
// int arr3 = arr;       // Cannot assign to non-pointer
\`\`\`

---

## 🔧 Passing Arrays to Functions

### **Method 1: Array Parameter (Decays to Pointer)**

\`\`\`c
#include <stdio.h>

void print_array(int arr[], int size) {
    printf("Array elements: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

void modify_array(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        arr[i] *= 2;  // Modifies original array
    }
}

int main(void) {
    int numbers[5] = {1, 2, 3, 4, 5};

    print_array(numbers, 5);
    modify_array(numbers, 5);
    print_array(numbers, 5);

    return 0;
}
\`\`\`

### **Method 2: Pointer Parameter**

\`\`\`c
#include <stdio.h>

void process_data(int *data, int count) {
    for (int i = 0; i < count; i++) {
        *(data + i) = *(data + i) + 10;
    }
}

int main(void) {
    int values[4] = {5, 15, 25, 35};
    process_data(values, 4);

    printf("Processed values: ");
    for (int i = 0; i < 4; i++) {
        printf("%d ", values[i]);
    }
    printf("\\n");

    return 0;
}
\`\`\`

### **Method 3: Fixed-Size Array Parameter**

\`\`\`c
#include <stdio.h>

// Function expects exactly 5 elements
void process_fixed_array(int arr[5]) {
    for (int i = 0; i < 5; i++) {
        arr[i] += 100;
    }
}

int main(void) {
    int data[5] = {1, 2, 3, 4, 5};
    process_fixed_array(data);

    printf("Result: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", data[i]);
    }
    printf("\\n");

    return 0;
}
\`\`\`

---

## 📊 Multidimensional Arrays and Pointers

### **2D Arrays**

\`\`\`c
#include <stdio.h>

void print_matrix(int matrix[][3], int rows) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\\n");
    }
}

void print_matrix_ptr(int (*matrix)[3], int rows) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\\n");
    }
}

int main(void) {
    int data[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };

    print_matrix(data, 2);
    printf("\\n");
    print_matrix_ptr(data, 2);

    return 0;
}
\`\`\`

---

## 🔄 Array of Pointers

### **Pointers to Arrays**

\`\`\`c
#include <stdio.h>

int main(void) {
    int arr1[3] = {1, 2, 3};
    int arr2[3] = {4, 5, 6};
    int arr3[3] = {7, 8, 9};

    // Array of pointers to arrays
    int *ptr_array[3] = {arr1, arr2, arr3};

    printf("Accessing through pointer array:\\n");
    for (int i = 0; i < 3; i++) {
        printf("Array %d: ", i + 1);
        for (int j = 0; j < 3; j++) {
            printf("%d ", ptr_array[i][j]);
        }
        printf("\\n");
    }

    return 0;
}
\`\`\`

---

## 🎯 String Arrays and Pointers

### **Array of Strings**

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    // Method 1: 2D char array
    char names1[3][20] = {
        "Alice",
        "Bob",
        "Charlie"
    };

    // Method 2: Array of string pointers
    char *names2[3] = {
        "Alice",
        "Bob",
        "Charlie"
    };

    printf("Method 1 (2D array):\\n");
    for (int i = 0; i < 3; i++) {
        printf("%s\\n", names1[i]);
    }

    printf("\\nMethod 2 (pointer array):\\n");
    for (int i = 0; i < 3; i++) {
        printf("%s\\n", names2[i]);
    }

    return 0;
}
\`\`\`

---

## 🔧 Advanced Pointer-Array Techniques

### **Function Returning Array Pointer**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

// Function returning pointer to dynamically allocated array
int* create_range(int start, int end) {
    int size = end - start + 1;
    int *arr = (int*)malloc(size * sizeof(int));

    if (arr == NULL) return NULL;

    for (int i = 0; i < size; i++) {
        arr[i] = start + i;
    }

    return arr;
}

int main(void) {
    int *range = create_range(5, 10);
    if (range == NULL) {
        printf("Memory allocation failed\\n");
        return 1;
    }

    printf("Range: ");
    for (int i = 0; i <= 5; i++) {  // 10 - 5 + 1 = 6 elements
        printf("%d ", range[i]);
    }
    printf("\\n");

    free(range);
    return 0;
}
\`\`\`

### **Pointer to Array**

\`\`\`c
#include <stdio.h>

void print_array_info(int arr[], int size) {
    printf("Array size: %zu bytes\\n", sizeof(arr));  // Size of pointer!
    printf("Element count: %d\\n", size);
    printf("First element: %d\\n", *arr);
}

void print_real_array_info(int (*arr)[10]) {  // Pointer to array of 10 ints
    printf("Real array size: %zu bytes\\n", sizeof(*arr));  // Size of actual array
    printf("First element: %d\\n", (*arr)[0]);
}

int main(void) {
    int arr[10] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    printf("Function 1 (decayed pointer):\\n");
    print_array_info(arr, 10);

    printf("\\nFunction 2 (pointer to array):\\n");
    print_real_array_info(&arr);

    return 0;
}
\`\`\`

---

## 🎯 Practical Examples

### **Example 1: Array Utilities Library**

\`\`\`c
#include <stdio.h>

// Find maximum value
int array_max(int arr[], int size) {
    int max = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}

// Calculate sum
int array_sum(int arr[], int size) {
    int sum = 0;
    for (int i = 0; i < size; i++) {
        sum += arr[i];
    }
    return sum;
}

// Reverse array in place
void array_reverse(int arr[], int size) {
    for (int i = 0; i < size / 2; i++) {
        int temp = arr[i];
        arr[i] = arr[size - 1 - i];
        arr[size - 1 - i] = temp;
    }
}

// Copy array
void array_copy(int dest[], const int src[], int size) {
    for (int i = 0; i < size; i++) {
        dest[i] = src[i];
    }
}

int main(void) {
    int numbers[6] = {3, 7, 2, 9, 5, 1};
    int copy[6];

    printf("Original: ");
    for (int i = 0; i < 6; i++) printf("%d ", numbers[i]);
    printf("\\n");

    printf("Maximum: %d\\n", array_max(numbers, 6));
    printf("Sum: %d\\n", array_sum(numbers, 6));

    array_reverse(numbers, 6);
    printf("Reversed: ");
    for (int i = 0; i < 6; i++) printf("%d ", numbers[i]);
    printf("\\n");

    array_copy(copy, numbers, 6);
    printf("Copied:   ");
    for (int i = 0; i < 6; i++) printf("%d ", copy[i]);
    printf("\\n");

    return 0;
}
\`\`\`

### **Example 2: Matrix Operations**

\`\`\`c
#include <stdio.h>

#define ROWS 3
#define COLS 3

// Add two matrices
void matrix_add(int result[ROWS][COLS],
                int a[ROWS][COLS],
                int b[ROWS][COLS]) {
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            result[i][j] = a[i][j] + b[i][j];
        }
    }
}

// Matrix multiplication (simplified for square matrices)
void matrix_multiply(int result[ROWS][COLS],
                     int a[ROWS][COLS],
                     int b[ROWS][COLS]) {
    // Initialize result to zero
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            result[i][j] = 0;
        }
    }

    // Perform multiplication
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            for (int k = 0; k < COLS; k++) {
                result[i][j] += a[i][k] * b[k][j];
            }
        }
    }
}

// Print matrix
void print_matrix(int matrix[ROWS][COLS]) {
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            printf("%3d ", matrix[ROWS][COLS]);
        }
        printf("\\n");
    }
}

int main(void) {
    int a[ROWS][COLS] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    int b[ROWS][COLS] = {
        {9, 8, 7},
        {6, 5, 4},
        {3, 2, 1}
    };

    int sum[ROWS][COLS];
    int product[ROWS][COLS];

    matrix_add(sum, a, b);
    matrix_multiply(product, a, b);

    printf("Matrix A:\\n");
    print_matrix(a);
    printf("\\nMatrix B:\\n");
    print_matrix(b);
    printf("\\nA + B:\\n");
    print_matrix(sum);
    printf("\\nA × B:\\n");
    print_matrix(product);

    return 0;
}
\`\`\`

---

## ⚠️ Common Array-Pointer Mistakes

### **sizeof() Confusion**

\`\`\`c
#include <stdio.h>

void func(int arr[]) {
    printf("sizeof(arr): %zu\\n", sizeof(arr));    // Size of pointer!
}

int main(void) {
    int arr[10];
    printf("sizeof(arr): %zu\\n", sizeof(arr));    // Size of array
    func(arr);

    return 0;
}
\`\`\`

### **Array Bounds Confusion**

\`\`\`c
int arr[5] = {1, 2, 3, 4, 5};

// ❌ Dangerous: no bounds checking
for (int i = 0; i <= 5; i++) {  // i goes to 5 (invalid!)
    printf("%d ", arr[i]);
}

// ✅ Safe: proper bounds
for (int i = 0; i < 5; i++) {
    printf("%d ", arr[i]);
}
\`\`\`

### **String Confusion**

\`\`\`c
char str[10] = "Hello";
char *ptr = str;

// ✅ Both work for reading
printf("%c\\n", str[0]);    // 'H'
printf("%c\\n", *ptr);      // 'H'

// ❌ But this is wrong:
printf("%s\\n", str);       // OK
printf("%s\\n", ptr);       // OK - but ptr could be modified
\`\`\`

---

## 🎓 Key Takeaways

1. **Arrays decay to pointers** when passed to functions
2. **Array names are constant pointers** to the first element
3. **\`arr[i]\` ≡ \`*(arr + i)\`** - both access the same element
4. **\`sizeof()\` works differently** on arrays vs pointers
5. **Pointer arithmetic** enables efficient array traversal
6. **Multidimensional arrays** are arrays of arrays
7. **Array parameters** need size information separately
8. **Bounds checking** is your responsibility in C

Mastering the relationship between arrays and pointers unlocks the full power of C programming! 🔗✨`;
    return contentString;
  })()
};
