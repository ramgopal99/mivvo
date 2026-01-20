import { Exercise } from '../../../../data/lessonsData';

export const exercise_4_8: Exercise = {
  id: "4.8",
  title: 'Functions & Arrays Coding Exercises',
  status: 'demo',
  type: 'code',
  codeQuestions: [
    {
      id: "code1",
      question: "Write a function that takes an array of integers and its size, and returns the maximum value in the array.\n\nExample:\nInput: [3, 8, 2, 10, 5], size = 5\nOutput: 10",
      solution: `#include <stdio.h>

int find_max(int arr[], int size) {
    if (size <= 0) return -1; // Error case

    int max = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

int main() {
    int numbers[] = {3, 8, 2, 10, 5};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    int max = find_max(numbers, size);
    printf("Maximum value: %d\\n", max);

    return 0;
}`
    },
    {
      id: "code2",
      question: "Write a function that reverses an array in place (modifies the original array).\n\nExample:\nInput: [1, 2, 3, 4, 5]\nOutput: [5, 4, 3, 2, 1]",
      solution: `#include <stdio.h>

void reverse_array(int arr[], int size) {
    for (int i = 0; i < size / 2; i++) {
        // Swap elements
        int temp = arr[i];
        arr[i] = arr[size - 1 - i];
        arr[size - 1 - i] = temp;
    }
}

void print_array(int arr[], int size) {
    printf("[");
    for (int i = 0; i < size; i++) {
        printf("%d", arr[i]);
        if (i < size - 1) printf(", ");
    }
    printf("]\\n");
}

int main() {
    int numbers[] = {1, 2, 3, 4, 5};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    printf("Original: ");
    print_array(numbers, size);

    reverse_array(numbers, size);

    printf("Reversed: ");
    print_array(numbers, size);

    return 0;
}`
    },
    {
      id: "code3",
      question: "Write a function that takes a 2D array (matrix) and finds the sum of each row.\n\nExample:\nMatrix:\n1 2 3\n4 5 6\nOutput:\nRow 0 sum: 6\nRow 1 sum: 15",
      solution: `#include <stdio.h>

#define ROWS 2
#define COLS 3

void sum_rows(int matrix[ROWS][COLS]) {
    for (int i = 0; i < ROWS; i++) {
        int row_sum = 0;
        for (int j = 0; j < COLS; j++) {
            row_sum += matrix[i][j];
        }
        printf("Row %d sum: %d\\n", i, row_sum);
    }
}

int main() {
    int matrix[ROWS][COLS] = {
        {1, 2, 3},
        {4, 5, 6}
    };

    sum_rows(matrix);

    return 0;
}`
    },
    {
      id: "code4",
      question: "Write a recursive function to calculate the factorial of a number.\n\nExample:\nInput: 5\nOutput: 120 (5! = 5 × 4 × 3 × 2 × 1 = 120)",
      solution: `#include <stdio.h>

int factorial(int n) {
    if (n == 0 || n == 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

int main() {
    int num;

    printf("Enter a positive integer: ");
    scanf("%d", &num);

    if (num < 0) {
        printf("Factorial is not defined for negative numbers.\\n");
    } else {
        int result = factorial(num);
        printf("%d! = %d\\n", num, result);
    }

    return 0;
}`
    },
    {
      id: "code5",
      question: "Write a function that searches for a specific value in an array and returns its index (or -1 if not found).\n\nExample:\nArray: [10, 20, 30, 40, 50]\nSearch for: 30\nOutput: Found at index 2\n\nSearch for: 60\nOutput: Not found (-1)",
      solution: `#include <stdio.h>

int search_array(int arr[], int size, int target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) {
            return i; // Found at index i
        }
    }
    return -1; // Not found
}

int main() {
    int numbers[] = {10, 20, 30, 40, 50};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    int target = 30;
    int index = search_array(numbers, size, target);

    if (index != -1) {
        printf("Found %d at index %d\\n", target, index);
    } else {
        printf("%d not found in array\\n", target);
    }

    // Search for non-existent value
    target = 60;
    index = search_array(numbers, size, target);

    if (index != -1) {
        printf("Found %d at index %d\\n", target, index);
    } else {
        printf("%d not found in array\\n", target);
    }

    return 0;
}`
    }
  ]
};
