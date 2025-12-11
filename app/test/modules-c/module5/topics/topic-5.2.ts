import { SubLesson } from '../../../data/lessonsData';

export const topic_5_2: SubLesson = {
  id: 5.2,
  title: 'One-Dimensional Arrays',
  status: 'completed',
  content: `# 📏 One-Dimensional Arrays

Master the essential operations, algorithms, and techniques for working with one-dimensional arrays in C.

---

## 🔧 Array Declaration and Initialization

### Complete Declaration Syntax

\`\`\`c
// data_type array_name[size] = {value1, value2, ..., valueN};
int numbers[5] = {1, 2, 3, 4, 5};
float prices[3] = {19.99, 29.99, 39.99};
char vowels[5] = {'a', 'e', 'i', 'o', 'u'};
\`\`\`

### Size Inference

\`\`\`c
// Compiler determines size from initializer
int primes[] = {2, 3, 5, 7, 11, 13};        // Size: 6
char greeting[] = "Hello";                   // Size: 6 (includes '\\0')
double constants[] = {3.14159, 2.71828};     // Size: 2
\`\`\`

### Partial Initialization

\`\`\`c
int arr1[5] = {1, 2};         // {1, 2, 0, 0, 0}
int arr2[5] = {0};            // {0, 0, 0, 0, 0}
int arr3[5];                  // Uninitialized (garbage values)
\`\`\`

---

## 📊 Array Size and Bounds

### Getting Array Size

\`\`\`c
#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int size;

    // Method 1: sizeof operator
    size = sizeof(arr) / sizeof(arr[0]);
    printf("Array size: %d\\n", size);

    // Method 2: Define constant
    #define ARRAY_SIZE 5
    int arr2[ARRAY_SIZE] = {1, 2, 3, 4, 5};

    return 0;
}
\`\`\`

### Bounds Checking

\`\`\`c
#include <stdio.h>

#define SIZE 5

int main() {
    int arr[SIZE] = {10, 20, 30, 40, 50};

    // ✅ Safe access
    for (int i = 0; i < SIZE; i++) {
        printf("arr[%d] = %d\\n", i, arr[i]);
    }

    // ❌ Dangerous access (undefined behavior)
    // printf("%d\\n", arr[5]);    // Out of bounds
    // printf("%d\\n", arr[-1]);   // Out of bounds

    return 0;
}
\`\`\`

---

## 🔄 Array Traversal Techniques

### Forward Traversal

\`\`\`c
void print_array(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}
\`\`\`

### Reverse Traversal

\`\`\`c
void print_reverse(int arr[], int size) {
    for (int i = size - 1; i >= 0; i--) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}
\`\`\`

### Skipping Elements

\`\`\`c
void print_even_indices(int arr[], int size) {
    for (int i = 0; i < size; i += 2) {
        printf("Index %d: %d\\n", i, arr[i]);
    }
}
\`\`\`

---

## 🔍 Array Searching Algorithms

### Linear Search

\`\`\`c
#include <stdio.h>

int linear_search(int arr[], int size, int target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) {
            return i;  // Found at index i
        }
    }
    return -1;  // Not found
}

int main() {
    int numbers[] = {12, 45, 23, 67, 89, 34};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    int target = 67;
    int result = linear_search(numbers, size, target);

    if (result != -1) {
        printf("%d found at index %d\\n", target, result);
    } else {
        printf("%d not found\\n", target);
    }

    return 0;
}
\`\`\`

### Binary Search (Sorted Array)

\`\`\`c
int binary_search(int arr[], int size, int target) {
    int left = 0, right = size - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;  // Not found
}

// Usage requires sorted array
int main() {
    int sorted_numbers[] = {12, 23, 34, 45, 67, 89};
    int size = sizeof(sorted_numbers) / sizeof(sorted_numbers[0]);

    int target = 45;
    int result = binary_search(sorted_numbers, size, target);

    printf("%d found at index %d\\n", target, result);
    return 0;
}
\`\`\`

---

## 🔀 Array Sorting Algorithms

### Bubble Sort

\`\`\`c
void bubble_sort(int arr[], int size) {
    for (int i = 0; i < size - 1; i++) {
        for (int j = 0; j < size - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int numbers[] = {64, 34, 25, 12, 22, 11, 90};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    printf("Original array: ");
    for (int i = 0; i < size; i++) printf("%d ", numbers[i]);

    bubble_sort(numbers, size);

    printf("\\nSorted array: ");
    for (int i = 0; i < size; i++) printf("%d ", numbers[i]);

    return 0;
}
\`\`\`

### Selection Sort

\`\`\`c
void selection_sort(int arr[], int size) {
    for (int i = 0; i < size - 1; i++) {
        int min_idx = i;

        // Find minimum element in unsorted part
        for (int j = i + 1; j < size; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }

        // Swap minimum element with first unsorted element
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}
\`\`\`

### Insertion Sort

\`\`\`c
void insertion_sort(int arr[], int size) {
    for (int i = 1; i < size; i++) {
        int key = arr[i];
        int j = i - 1;

        // Move elements greater than key one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;
    }
}
\`\`\`

---

## 📈 Array Analysis Functions

### Finding Maximum and Minimum

\`\`\`c
void find_min_max(int arr[], int size, int* min, int* max) {
    *min = *max = arr[0];

    for (int i = 1; i < size; i++) {
        if (arr[i] < *min) *min = arr[i];
        if (arr[i] > *max) *max = arr[i];
    }
}

int main() {
    int numbers[] = {12, 45, 23, 67, 89, 34};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    int min_val, max_val;

    find_min_max(numbers, size, &min_val, &max_val);

    printf("Minimum: %d\\n", min_val);
    printf("Maximum: %d\\n", max_val);

    return 0;
}
\`\`\`

### Calculating Statistics

\`\`\`c
void calculate_statistics(int arr[], int size, double* average, int* median) {
    int sum = 0;

    // Calculate sum
    for (int i = 0; i < size; i++) {
        sum += arr[i];
    }

    *average = (double)sum / size;

    // For median, need sorted array (simplified version)
    *median = arr[size / 2];  // Middle element
}

int main() {
    int scores[] = {85, 92, 78, 96, 88};
    int size = sizeof(scores) / sizeof(scores[0]);
    double avg;
    int med;

    calculate_statistics(scores, size, &avg, &med);

    printf("Average: %.2f\\n", avg);
    printf("Median: %d\\n", med);

    return 0;
}
\`\`\`

---

## 🔄 Array Manipulation Functions

### Reversing an Array

\`\`\`c
void reverse_array(int arr[], int size) {
    int start = 0;
    int end = size - 1;

    while (start < end) {
        // Swap elements
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;

        start++;
        end--;
    }
}

int main() {
    int numbers[] = {1, 2, 3, 4, 5};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    printf("Original: ");
    for (int i = 0; i < size; i++) printf("%d ", numbers[i]);

    reverse_array(numbers, size);

    printf("\\nReversed: ");
    for (int i = 0; i < size; i++) printf("%d ", numbers[i]);

    return 0;
}
\`\`\`

### Rotating an Array

\`\`\`c
void rotate_left(int arr[], int size, int positions) {
    positions = positions % size;  // Handle large rotations

    for (int i = 0; i < positions; i++) {
        int first = arr[0];

        // Shift all elements left
        for (int j = 0; j < size - 1; j++) {
            arr[j] = arr[j + 1];
        }

        arr[size - 1] = first;  // Put first element at end
    }
}

void rotate_right(int arr[], int size, int positions) {
    positions = positions % size;

    for (int i = 0; i < positions; i++) {
        int last = arr[size - 1];

        // Shift all elements right
        for (int j = size - 1; j > 0; j--) {
            arr[j] = arr[j - 1];
        }

        arr[0] = last;  // Put last element at beginning
    }
}
\`\`\`

---

## 🧪 Array as Function Parameters

### Passing Arrays to Functions

\`\`\`c
#include <stdio.h>

// Method 1: Array notation (decays to pointer)
void print_array(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

// Method 2: Pointer notation (explicit)
void print_array_ptr(int* arr, int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", *(arr + i));  // Pointer arithmetic
    }
    printf("\\n");
}

// Method 3: With const (prevent modification)
void print_array_const(const int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
        // arr[i] = 0;  // ❌ Error: cannot modify const array
    }
    printf("\\n");
}

int main() {
    int numbers[] = {1, 2, 3, 4, 5};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    print_array(numbers, size);
    print_array_ptr(numbers, size);
    print_array_const(numbers, size);

    return 0;
}
\`\`\`

### Returning Arrays from Functions

\`\`\`c
#include <stdlib.h>

// Method 1: Return static array (persists after function returns)
int* get_static_array() {
    static int arr[5] = {1, 2, 3, 4, 5};
    return arr;
}

// Method 2: Dynamic allocation (caller must free)
int* create_dynamic_array(int size) {
    int* arr = (int*)malloc(size * sizeof(int));
    if (arr == NULL) return NULL;

    for (int i = 0; i < size; i++) {
        arr[i] = i + 1;
    }

    return arr;
}

int main() {
    // Static array
    int* static_arr = get_static_array();
    printf("Static array: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", static_arr[i]);
    }
    printf("\\n");

    // Dynamic array
    int* dynamic_arr = create_dynamic_array(5);
    if (dynamic_arr != NULL) {
        printf("Dynamic array: ");
        for (int i = 0; i < 5; i++) {
            printf("%d ", dynamic_arr[i]);
        }
        printf("\\n");
        free(dynamic_arr);  // Don't forget to free!
    }

    return 0;
}
\`\`\`

---

## 🏗️ Advanced Array Techniques

### Array of Pointers

\`\`\`c
#include <stdio.h>

int main() {
    int arr1[] = {1, 2, 3};
    int arr2[] = {4, 5, 6};
    int arr3[] = {7, 8, 9};

    // Array of pointers to arrays
    int* arrays[] = {arr1, arr2, arr3};
    int num_arrays = 3;
    int array_size = 3;

    // Access elements through pointer array
    for (int i = 0; i < num_arrays; i++) {
        printf("Array %d: ", i + 1);
        for (int j = 0; j < array_size; j++) {
            printf("%d ", arrays[i][j]);
        }
        printf("\\n");
    }

    return 0;
}
\`\`\`

### Function Pointer Arrays

\`\`\`c
#include <stdio.h>

// Different operations
int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
int multiply(int a, int b) { return a * b; }

int main() {
    // Array of function pointers
    int (*operations[])(int, int) = {add, subtract, multiply};
    char* op_names[] = {"Addition", "Subtraction", "Multiplication"};

    int a = 10, b = 5;

    for (int i = 0; i < 3; i++) {
        int result = operations[i](a, b);
        printf("%s: %d %s %d = %d\\n", op_names[i], a,
               (i == 0 ? "+" : i == 1 ? "-" : "*"), b, result);
    }

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Array size** should be calculated as \`sizeof(arr) / sizeof(arr[0])\`
2. **Bounds checking** is crucial to prevent undefined behavior
3. **Linear search** works on unsorted arrays, **binary search** requires sorted arrays
4. **Bubble, selection, insertion sort** are fundamental sorting algorithms
5. **Arrays are passed by reference** to functions (as pointers)
6. **Use const** in function parameters to prevent accidental modification
7. **Dynamic allocation** allows variable-sized arrays at runtime

---

## 🚀 Preview: Multi-Dimensional Arrays

In the next topic, you'll learn about:
- **2D and 3D arrays** and their memory layout
- **Matrix operations** and algorithms
- **Passing multi-dimensional arrays** to functions
- **Real-world applications** like image processing and game boards

**1D arrays are powerful - multi-dimensional arrays unlock even more possibilities!** 📐
