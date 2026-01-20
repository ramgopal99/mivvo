import { Exercise } from '../../../../data/lessonsData';

export const exercise_5_8: Exercise = {
  id: "5.8",
  title: 'Pointers & Memory Management Coding Exercises',
  status: 'demo',
  type: 'code',
  codeQuestions: [
    {
      id: "code1",
      question: "Write a function that swaps two integers using pointers.\n\nExample:\nBefore: a = 5, b = 10\nAfter: a = 10, b = 5",
      solution: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 5, y = 10;

    printf("Before swap: x = %d, y = %d\\n", x, y);

    swap(&x, &y);

    printf("After swap: x = %d, y = %d\\n", x, y);

    return 0;
}`
    },
    {
      id: "code2",
      question: "Write a function that dynamically allocates an array of integers, fills it with values from 1 to n, and returns the pointer.\n\nExample:\nInput: 5\nOutput: [1, 2, 3, 4, 5]",
      solution: `#include <stdio.h>
#include <stdlib.h>

int* create_array(int n) {
    // Allocate memory for n integers
    int *arr = (int*)malloc(n * sizeof(int));

    if (arr == NULL) {
        printf("Memory allocation failed\\n");
        return NULL;
    }

    // Fill array with values 1 to n
    for (int i = 0; i < n; i++) {
        arr[i] = i + 1;
    }

    return arr;
}

int main() {
    int n = 5;
    int *array = create_array(n);

    if (array != NULL) {
        printf("Array: [");
        for (int i = 0; i < n; i++) {
            printf("%d", array[i]);
            if (i < n - 1) printf(", ");
        }
        printf("]\\n");

        // Don't forget to free!
        free(array);
    }

    return 0;
}`
    },
    {
      id: "code3",
      question: "Write a function that copies a string using pointers (don't use strcpy).\n\nExample:\nInput: \"Hello\"\nOutput: \"Hello\" (copied)",
      solution: `#include <stdio.h>
#include <stdlib.h>

char* string_copy(const char *source) {
    if (source == NULL) return NULL;

    // Calculate length
    int length = 0;
    const char *temp = source;
    while (*temp != '\\0') {
        length++;
        temp++;
    }

    // Allocate memory for copy (+1 for null terminator)
    char *copy = (char*)malloc((length + 1) * sizeof(char));
    if (copy == NULL) return NULL;

    // Copy characters
    char *dest = copy;
    temp = source;
    while (*temp != '\\0') {
        *dest = *temp;
        dest++;
        temp++;
    }
    *dest = '\\0'; // Null terminate

    return copy;
}

int main() {
    const char *original = "Hello, World!";
    char *duplicate = string_copy(original);

    if (duplicate != NULL) {
        printf("Original: %s\\n", original);
        printf("Copy: %s\\n", duplicate);

        free(duplicate);
    }

    return 0;
}`
    },
    {
      id: "code4",
      question: "Write a function that takes a pointer to an integer and modifies its value to be twice the original value.\n\nExample:\nInput: 7\nOutput: 14",
      solution: `#include <stdio.h>

void double_value(int *num) {
    if (num != NULL) {
        *num = *num * 2;
    }
}

int main() {
    int value = 7;

    printf("Original value: %d\\n", value);

    double_value(&value);

    printf("Doubled value: %d\\n", value);

    return 0;
}`
    },
    {
      id: "code5",
      question: "Write a program that demonstrates pointer arithmetic with arrays. Create an array and use pointer arithmetic to traverse and print its elements.\n\nExample:\nArray: [10, 20, 30, 40, 50]\nOutput: 10 20 30 40 50",
      solution: `#include <stdio.h>

int main() {
    int array[] = {10, 20, 30, 40, 50};
    int size = sizeof(array) / sizeof(array[0]);

    // Method 1: Array indexing
    printf("Using array indexing: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", array[i]);
    }
    printf("\\n");

    // Method 2: Pointer arithmetic
    printf("Using pointer arithmetic: ");
    int *ptr = array;  // Points to first element
    for (int i = 0; i < size; i++) {
        printf("%d ", *ptr);
        ptr++;  // Move to next element
    }
    printf("\\n");

    // Method 3: Pointer arithmetic with original pointer
    printf("Using pointer arithmetic (alternative): ");
    ptr = array;  // Reset pointer
    for (int i = 0; i < size; i++) {
        printf("%d ", *(ptr + i));
    }
    printf("\\n");

    return 0;
}`
    }
  ]
};
