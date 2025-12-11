import { SubLesson } from '../../../data/lessonsData';

export const topic_6_3: SubLesson = {
  id: 6.3,
  title: 'Pointer Operations and Arithmetic',
  status: 'completed',
  content: `# ➕ Pointer Operations and Arithmetic

Master pointer arithmetic, increment/decrement operations, and pointer comparisons to unlock the full power of pointers in C.

---

## 🔢 Pointer Arithmetic Basics

### Understanding Pointer Math

**Pointer arithmetic automatically scales by the size of the pointed-to type.**

\`\`\`c
#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int* ptr = arr;  // Points to arr[0]

    printf("ptr points to: %d\\n", *ptr);
    printf("Address of ptr: %p\\n", ptr);

    // Pointer arithmetic
    ptr = ptr + 1;  // Move to next int (4 bytes on most systems)
    printf("After ptr + 1: %d\\n", *ptr);
    printf("New address: %p\\n", ptr);

    // Subtract to go back
    ptr = ptr - 1;
    printf("After ptr - 1: %d\\n", *ptr);

    return 0;
}
\`\`\`

**Key insight:** `ptr + 1` moves forward by `sizeof(*ptr)` bytes, not just 1 byte.

---

## 📊 Pointer Arithmetic Operations

### Addition and Subtraction

\`\`\`c
#include <stdio.h>

int main() {
    double arr[4] = {1.1, 2.2, 3.3, 4.4};
    double* ptr = arr;

    printf("Starting at: %.1f\\n", *ptr);

    // Move forward
    ptr = ptr + 2;  // Skip 2 doubles (16 bytes on most systems)
    printf("After +2: %.1f\\n", *ptr);

    // Move backward
    ptr = ptr - 1;  // Go back 1 double (8 bytes)
    printf("After -1: %.1f\\n", *ptr);

    // Reset to beginning
    ptr = arr;
    printf("Back to start: %.1f\\n", *ptr);

    return 0;
}
\`\`\`

### Scaling by Data Type Size

\`\`\`c
#include <stdio.h>

int main() {
    char char_arr[5] = {'A', 'B', 'C', 'D', 'E'};
    int int_arr[5] = {10, 20, 30, 40, 50};
    double double_arr[5] = {1.1, 2.2, 3.3, 4.4, 5.5};

    char* char_ptr = char_arr;
    int* int_ptr = int_arr;
    double* double_ptr = double_arr;

    printf("Char pointer arithmetic:\\n");
    printf("Original: %p -> %c\\n", char_ptr, *char_ptr);
    printf("After +1: %p -> %c\\n", char_ptr + 1, *(char_ptr + 1));

    printf("\\nInt pointer arithmetic:\\n");
    printf("Original: %p -> %d\\n", int_ptr, *int_ptr);
    printf("After +1: %p -> %d\\n", int_ptr + 1, *(int_ptr + 1));

    printf("\\nDouble pointer arithmetic:\\n");
    printf("Original: %p -> %.1f\\n", double_ptr, *double_ptr);
    printf("After +1: %p -> %.1f\\n", double_ptr + 1, *(double_ptr + 1));

    return 0;
}
\`\`\`

---

## 🔄 Increment and Decrement Operators

### Pre-increment and Post-increment

\`\`\`c
#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int* ptr = arr;

    printf("Original: %d\\n", *ptr);

    // Post-increment: use then increment
    printf("Post-increment: %d\\n", *ptr++);  // Prints 10, then ptr moves
    printf("Now points to: %d\\n", *ptr);     // Prints 20

    // Pre-increment: increment then use
    printf("Pre-increment: %d\\n", *++ptr);   // ptr moves, then prints 30
    printf("Now points to: %d\\n", *ptr);     // Prints 30

    return 0;
}
\`\`\`

### Traversing Arrays with Pointers

\`\`\`c
#include <stdio.h>

void print_array_forward(int* arr, int size) {
    printf("Forward traversal: ");
    for (int* ptr = arr; ptr < arr + size; ptr++) {
        printf("%d ", *ptr);
    }
    printf("\\n");
}

void print_array_reverse(int* arr, int size) {
    printf("Reverse traversal: ");
    for (int* ptr = arr + size - 1; ptr >= arr; ptr--) {
        printf("%d ", *ptr);
    }
    printf("\\n");
}

int main() {
    int numbers[] = {1, 2, 3, 4, 5};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    print_array_forward(numbers, size);
    print_array_reverse(numbers, size);

    return 0;
}
\`\`\`

---

## 🔍 Pointer Comparisons

### Relational Operators

\`\`\`c
#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int* ptr1 = &arr[1];  // Points to 20
    int* ptr2 = &arr[3];  // Points to 40
    int* ptr3 = &arr[1];  // Also points to 20

    printf("ptr1 == ptr3: %s\\n", ptr1 == ptr3 ? "true" : "false");
    printf("ptr1 != ptr2: %s\\n", ptr1 != ptr2 ? "true" : "false");
    printf("ptr1 < ptr2: %s\\n", ptr1 < ptr2 ? "true" : "false");
    printf("ptr2 > ptr1: %s\\n", ptr2 > ptr1 ? "true" : "false");

    // Only meaningful within same array
    if (ptr1 >= arr && ptr1 < arr + 5) {
        printf("ptr1 points within array bounds\\n");
    }

    return 0;
}
\`\`\`

### Valid Pointer Comparisons

\`\`\`c
int arr[10];
int* ptr1 = &arr[2];
int* ptr2 = &arr[7];

// ✅ Valid: same array, can compare
if (ptr1 < ptr2) {
    printf("ptr1 comes before ptr2 in memory\\n");
}

// ❌ Invalid: different arrays, comparison undefined
int arr2[5];
int* ptr3 = &arr2[0];
if (ptr1 < ptr3) {  // Meaningless comparison!
    // Don't do this
}

// ✅ Valid: compare with NULL
if (ptr1 != NULL) {
    printf("ptr1 is not NULL\\n");
}
\`\`\`

---

## 🧮 Advanced Pointer Arithmetic

### Pointer Subtraction

\`\`\`c
#include <stdio.h>

int main() {
    int arr[10] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    int* start = arr;
    int* end = arr + 9;  // Points to element 9

    printf("Array has %ld elements\\n", end - start + 1);
    printf("Distance between pointers: %ld\\n", end - start);

    // Find middle
    int* middle = start + (end - start) / 2;
    printf("Middle element: %d\\n", *middle);

    return 0;
}
\`\`\`

### Generic Pointer Arithmetic with void*

\`\`\`c
#include <stdio.h>

void print_bytes(void* ptr, size_t size) {
    unsigned char* byte_ptr = (unsigned char*)ptr;

    printf("Memory bytes: ");
    for (size_t i = 0; i < size; i++) {
        printf("%02X ", byte_ptr[i]);
    }
    printf("\\n");
}

int main() {
    int x = 0x12345678;    // Example value
    double y = 3.14159;

    printf("int x = %d\\n", x);
    print_bytes(&x, sizeof(x));

    printf("double y = %.5f\\n", y);
    print_bytes(&y, sizeof(y));

    return 0;
}
\`\`\`

---

## 🎯 Array Indexing vs Pointer Arithmetic

### Equivalent Operations

\`\`\`c
#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int* ptr = arr;

    printf("Using array indexing:\\n");
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d\\n", i, arr[i]);
    }

    printf("\\nUsing pointer arithmetic:\\n");
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

### Performance Comparison

\`\`\`c
#include <stdio.h>
#include <time.h>

#define ARRAY_SIZE 1000000

int main() {
    int arr[ARRAY_SIZE];
    int* ptr = arr;

    // Initialize array
    for (int i = 0; i < ARRAY_SIZE; i++) {
        arr[i] = i;
    }

    clock_t start, end;

    // Method 1: Array indexing
    start = clock();
    long long sum1 = 0;
    for (int i = 0; i < ARRAY_SIZE; i++) {
        sum1 += arr[i];
    }
    end = clock();
    double time1 = (double)(end - start) / CLOCKS_PER_SEC;

    // Method 2: Pointer arithmetic
    start = clock();
    long long sum2 = 0;
    int* current = ptr;
    for (int i = 0; i < ARRAY_SIZE; i++) {
        sum2 += *current++;
    }
    end = clock();
    double time2 = (double)(end - start) / CLOCKS_PER_SEC;

    printf("Array indexing: %.6f seconds, sum = %lld\\n", time1, sum1);
    printf("Pointer arithmetic: %.6f seconds, sum = %lld\\n", time2, sum2);

    return 0;
}
\`\`\`

---

## 🛡️ Pointer Arithmetic Safety

### Bounds Checking

\`\`\`c
#include <stdio.h>

int safe_array_access(int* arr, int size, int index) {
    if (index < 0 || index >= size) {
        printf("Error: Index %d out of bounds (0-%d)\\n", index, size - 1);
        return 0;  // Safe default
    }
    return arr[index];
}

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int* ptr = arr;

    // Safe access
    printf("Valid access: %d\\n", safe_array_access(ptr, 5, 2));
    printf("Valid access: %d\\n", safe_array_access(ptr, 5, 0));

    // Unsafe access (but caught)
    printf("Invalid access: %d\\n", safe_array_access(ptr, 5, 10));
    printf("Invalid access: %d\\n", safe_array_access(ptr, 5, -1));

    return 0;
}
\`\`\`

### Valid Pointer Arithmetic

\`\`\`c
int arr[10];
int* ptr = arr;

// ✅ Valid operations
ptr + 1;      // Move to next element
ptr - 1;      // Move to previous element
ptr += 5;     // Move forward 5 elements
ptr -= 2;     // Move backward 2 elements

// ✅ Valid comparisons (same array)
int* ptr2 = &arr[5];
if (ptr < ptr2) { /* valid */ }

// ❌ Invalid operations
ptr * 2;      // Can't multiply pointers
ptr / 2;      // Can't divide pointers
ptr + ptr2;   // Can't add two pointers
\`\`\`

---

## 🧪 Practical Examples

### String Processing with Pointers

\`\`\`c
#include <stdio.h>
#include <ctype.h>

// Convert string to uppercase using pointer arithmetic
void string_to_upper(char* str) {
    for (char* ptr = str; *ptr != '\\0'; ptr++) {
        *ptr = toupper(*ptr);
    }
}

// Count words in string
int count_words(const char* str) {
    int count = 0;
    const char* ptr = str;

    // Skip leading whitespace
    while (*ptr && isspace(*ptr)) ptr++;

    while (*ptr) {
        count++;  // Found start of word

        // Skip to end of word
        while (*ptr && !isspace(*ptr)) ptr++;

        // Skip whitespace between words
        while (*ptr && isspace(*ptr)) ptr++;
    }

    return count;
}

int main() {
    char text[] = "Hello World C Programming";

    printf("Original: %s\\n", text);
    string_to_upper(text);
    printf("Uppercase: %s\\n", text);

    printf("Word count: %d\\n", count_words(text));

    return 0;
}
\`\`\`

### Binary Search with Pointers

\`\`\`c
#include <stdio.h>

int* binary_search(int* arr, int size, int target) {
    int* left = arr;
    int* right = arr + size - 1;

    while (left <= right) {
        int* mid = left + (right - left) / 2;

        if (*mid == target) {
            return mid;  // Found
        } else if (*mid < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return NULL;  // Not found
}

int main() {
    int sorted_arr[] = {1, 3, 5, 7, 9, 11, 13, 15};
    int size = sizeof(sorted_arr) / sizeof(sorted_arr[0]);

    int target = 7;
    int* result = binary_search(sorted_arr, size, target);

    if (result != NULL) {
        printf("%d found at index %ld\\n", target, result - sorted_arr);
    } else {
        printf("%d not found\\n", target);
    }

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Pointer arithmetic** scales by the size of the pointed-to type
2. **Increment/decrement** moves pointers by element size, not bytes
3. **Pointer comparisons** only valid within the same array
4. **Array indexing** (`arr[i]`) is equivalent to pointer arithmetic (`*(arr + i)`)
5. **Bounds checking** is essential to prevent undefined behavior
6. **void pointers** require explicit casting for arithmetic
7. **Pointer subtraction** gives the number of elements between pointers

---

## 🚀 Preview: Pointers and Arrays

In the next topic, you'll learn about:
- **Array names as pointers** and their special properties
- **Passing arrays to functions** using pointers
- **Multi-dimensional arrays** and pointer arithmetic
- **String literals** and character pointer relationships

**Pointers and arrays are inseparable in C - master their relationship!** 🔗
