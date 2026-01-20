import { SubLesson } from '../../../../data/lessonsData';

export const topic_5_2: SubLesson = {
  id: "5.2",
  title: 'Pointer Arithmetic',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# ➕➖ Pointer Arithmetic in C

Pointer arithmetic allows you to perform mathematical operations on pointers. This is one of the most powerful features of C and is essential for working with arrays and dynamic memory.

---

## 📋 What is Pointer Arithmetic?

**Pointer arithmetic involves performing mathematical operations on pointers.** When you add or subtract from a pointer, it moves to different memory locations based on the size of the data type it points to.

### **Why Pointer Arithmetic Matters**

- **Array traversal** - Moving through array elements efficiently
- **Dynamic memory** - Navigating allocated memory blocks
- **String manipulation** - Character-by-character processing
- **Data structures** - Implementing linked lists, trees, etc.

---

## ➕ Addition with Pointers

### **Pointer + Integer**

\`\`\`c
#include <stdio.h>

int main(void) {
    int arr[5] = {10, 20, 30, 40, 50};
    int *ptr = arr;  // Points to arr[0]

    printf("Original pointer: %p, value: %d\\n", (void*)ptr, *ptr);

    // Move pointer forward
    ptr = ptr + 1;  // Now points to arr[1]
    printf("After ptr + 1: %p, value: %d\\n", (void*)ptr, *ptr);

    ptr = ptr + 2;  // Now points to arr[3]
    printf("After ptr + 2: %p, value: %d\\n", (void*)ptr, *ptr);

    return 0;
}
\`\`\`

**How it works:** \`ptr + n\` moves the pointer forward by \`n × sizeof(data_type)\` bytes.

---

## ➖ Subtraction with Pointers

### **Pointer - Integer**

\`\`\`c
#include <stdio.h>

int main(void) {
    int arr[5] = {10, 20, 30, 40, 50};
    int *ptr = &arr[4];  // Points to arr[4] (last element)

    printf("Original pointer: %p, value: %d\\n", (void*)ptr, *ptr);

    // Move pointer backward
    ptr = ptr - 1;  // Now points to arr[3]
    printf("After ptr - 1: %p, value: %d\\n", (void*)ptr, *ptr);

    ptr = ptr - 2;  // Now points to arr[1]
    printf("After ptr - 2: %p, value: %d\\n", (void*)ptr, *ptr);

    return 0;
}
\`\`\`

---

## 🔄 Increment/Decrement Operators

### **++ and -- with Pointers**

\`\`\`c
#include <stdio.h>

int main(void) {
    int arr[5] = {10, 20, 30, 40, 50};
    int *ptr = arr;

    printf("Starting at: %d\\n", *ptr);

    // Increment pointer
    ptr++;  // Move to next element
    printf("After ++: %d\\n", *ptr);

    ptr++;  // Move to next element
    printf("After ++: %d\\n", *ptr);

    // Decrement pointer
    ptr--;  // Move back
    printf("After --: %d\\n", *ptr);

    return 0;
}
\`\`\`

---

## ➖ Pointer - Pointer

### **Calculating Distance**

\`\`\`c
#include <stdio.h>

int main(void) {
    int arr[10] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    int *start = arr;
    int *end = &arr[9];

    // Calculate number of elements between pointers
    long long distance = end - start;

    printf("start points to: %d\\n", *start);
    printf("end points to: %d\\n", *end);
    printf("Distance: %lld elements\\n", distance);

    // This only works for pointers to the same array!
    return 0;
}
\`\`\`

**Output:**
\`\`\`
start points to: 0
end points to: 9
Distance: 9 elements
\`\`\`

---

## 🎯 Pointer Arithmetic with Different Types

### **Type-Specific Movement**

\`\`\`c
#include <stdio.h>

int main(void) {
    int int_arr[3] = {100, 200, 300};
    char char_arr[3] = {'A', 'B', 'C'};
    double double_arr[3] = {1.1, 2.2, 3.3};

    int *int_ptr = int_arr;
    char *char_ptr = char_arr;
    double *double_ptr = double_arr;

    printf("Original positions:\\n");
    printf("int_ptr: %p, *int_ptr: %d\\n", (void*)int_ptr, *int_ptr);
    printf("char_ptr: %p, *char_ptr: %c\\n", (void*)char_ptr, *char_ptr);
    printf("double_ptr: %p, *double_ptr: %.1f\\n", (void*)double_ptr, *double_ptr);

    // Move each pointer by 1
    int_ptr++;
    char_ptr++;
    double_ptr++;

    printf("\\nAfter +1:\\n");
    printf("int_ptr: %p, *int_ptr: %d (moved %d bytes)\\n",
           (void*)int_ptr, *int_ptr, (int)(int_ptr - int_arr));
    printf("char_ptr: %p, *char_ptr: %c (moved %d bytes)\\n",
           (void*)char_ptr, *char_ptr, (int)(char_ptr - char_arr));
    printf("double_ptr: %p, *double_ptr: %.1f (moved %d bytes)\\n",
           (void*)double_ptr, *double_ptr, (int)(double_ptr - double_arr));

    return 0;
}
\`\`\`

---

## 📊 Pointer Arithmetic and Arrays

### **Arrays are Pointers in Disguise**

\`\`\`c
#include <stdio.h>

int main(void) {
    int arr[5] = {10, 20, 30, 40, 50};

    printf("Method 1 - Array indexing:\\n");
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d\\n", i, arr[i]);
    }

    printf("\\nMethod 2 - Pointer arithmetic:\\n");
    for (int i = 0; i < 5; i++) {
        printf("*(arr + %d) = %d\\n", i, *(arr + i));
    }

    printf("\\nMethod 3 - Pointer traversal:\\n");
    int *ptr = arr;
    for (int i = 0; i < 5; i++) {
        printf("*ptr = %d\\n", *ptr);
        ptr++;  // Move to next element
    }

    return 0;
}
\`\`\`

---

## 🔍 Pointer Arithmetic with Functions

### **Passing Arrays as Pointers**

\`\`\`c
#include <stdio.h>

// Function that modifies array using pointer arithmetic
void double_array(int *arr, int size) {
    for (int i = 0; i < size; i++) {
        *(arr + i) = *(arr + i) * 2;
    }
}

// Function that finds maximum using pointer arithmetic
int find_max(int *arr, int size) {
    int max = *arr;  // First element
    for (int i = 1; i < size; i++) {
        if (*(arr + i) > max) {
            max = *(arr + i);
        }
    }
    return max;
}

int main(void) {
    int numbers[5] = {3, 7, 2, 9, 5};

    printf("Original array: ");
    for (int i = 0; i < 5; i++) printf("%d ", numbers[i]);
    printf("\\n");

    double_array(numbers, 5);
    printf("Doubled array: ");
    for (int i = 0; i < 5; i++) printf("%d ", numbers[i]);
    printf("\\n");

    int maximum = find_max(numbers, 5);
    printf("Maximum value: %d\\n", maximum);

    return 0;
}
\`\`\`

---

## ⚠️ Pointer Arithmetic Rules

### **What You CAN Do**

\`\`\`c
int arr[10];
int *ptr = arr;

// ✅ Valid operations:
ptr++;           // Move to next element
ptr--;           // Move to previous element
ptr + 5;         // Point 5 elements ahead
ptr - 3;         // Point 3 elements back
ptr2 - ptr1;     // Distance between pointers (same array)
\`\`\`

### **What You CANNOT Do**

\`\`\`c
int *ptr;

// ❌ Invalid operations:
ptr + ptr;       // Adding two pointers
ptr * 2;         // Multiplying pointer
ptr / 2;         // Dividing pointer
ptr & ptr2;      // Bitwise AND of pointers
\`\`\`

---

## 🎯 Advanced Examples

### **Example 1: String Reversal**

\`\`\`c
#include <stdio.h>

void reverse_string(char *str) {
    if (!str) return;  // NULL check

    char *start = str;
    char *end = str;

    // Find end of string
    while (*end != '\\0') {
        end++;
    }
    end--;  // Point to last character

    // Reverse using pointer arithmetic
    while (start < end) {
        char temp = *start;
        *start = *end;
        *end = temp;

        start++;
        end--;
    }
}

int main(void) {
    char text[] = "Hello, World!";
    printf("Original: %s\\n", text);

    reverse_string(text);
    printf("Reversed: %s\\n", text);

    return 0;
}
\`\`\`

### **Example 2: Array Copy Function**

\`\`\`c
#include <stdio.h>

// Copy n elements from source to destination
void array_copy(int *dest, const int *src, int n) {
    for (int i = 0; i < n; i++) {
        *(dest + i) = *(src + i);
    }
}

// Copy elements in reverse order
void array_reverse_copy(int *dest, const int *src, int n) {
    for (int i = 0; i < n; i++) {
        *(dest + i) = *(src + (n - 1 - i));
    }
}

int main(void) {
    int original[5] = {1, 2, 3, 4, 5};
    int copy[5];
    int reversed[5];

    array_copy(copy, original, 5);
    array_reverse_copy(reversed, original, 5);

    printf("Original: ");
    for (int i = 0; i < 5; i++) printf("%d ", original[i]);
    printf("\\n");

    printf("Copy:     ");
    for (int i = 0; i < 5; i++) printf("%d ", copy[i]);
    printf("\\n");

    printf("Reversed: ");
    for (int i = 0; i < 5; i++) printf("%d ", reversed[i]);
    printf("\\n");

    return 0;
}
\`\`\`

### **Example 3: Memory Block Zero Function**

\`\`\`c
#include <stdio.h>

// Set n bytes starting at ptr to zero
void zero_memory(char *ptr, int n) {
    for (int i = 0; i < n; i++) {
        *(ptr + i) = 0;
    }
}

int main(void) {
    int arr[5] = {1, 2, 3, 4, 5};

    printf("Before zeroing: ");
    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);
    printf("\\n");

    // Zero the entire array
    zero_memory((char*)arr, sizeof(arr));

    printf("After zeroing:  ");
    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);
    printf("\\n");

    return 0;
}
\`\`\`

---

## 🔧 Best Practices

### **Pointer Arithmetic Guidelines**

1. **Stay within bounds** - Don't access memory outside allocated regions
2. **Use array notation when possible** - \`arr[i]\` is clearer than \`*(arr + i)\`
3. **Document pointer arithmetic** - Make intent clear in comments
4. **Prefer pre-increment** - \`++ptr\` vs \`ptr++\` (slight performance difference)
5. **Validate pointers** - Check for NULL before arithmetic operations
6. **Use const for read-only** - \`const int *ptr\` prevents accidental modification

---

## 🎓 Key Takeaways

1. **Pointer arithmetic** moves pointers by element size, not bytes
2. **Addition/Subtraction** (\`ptr + n\`, \`ptr - n\`) moves n elements
3. **Increment/Decrement** (\`ptr++\`, \`ptr--\`) moves one element
4. **Subtraction** of pointers gives element distance
5. **Arrays decay to pointers** - \`arr[i]\` ≡ \`*(arr + i)\`
6. **Type matters** - Different types move different byte distances
7. **Bounds checking** is your responsibility - C won't prevent errors

Pointer arithmetic is the foundation of efficient C programming - master it to write high-performance code! ⚡✨`;
    return contentString;
  })()
};
