import { Exercise } from '../../../../data/lessonsData';

export const exercise_9_8: Exercise = {
  id: "9.8",
  title: 'Dynamic Memory Allocation Coding Exercises',
  status: 'demo',
  type: 'code',
  codeQuestions: [
    {
      id: "code1",
      question: "Write a C program that dynamically allocates memory for an array of integers based on user input size, fills it with values from 1 to n, and then prints the array.\n\nExample Input:\n5\n\nExample Output:\n1 2 3 4 5",
      solution: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n;

    printf("Enter array size: ");
    scanf("%d", &n);

    // Dynamic allocation
    int *array = (int*)malloc(n * sizeof(int));

    if (array == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    // Fill array with values 1 to n
    for (int i = 0; i < n; i++) {
        array[i] = i + 1;
    }

    // Print array
    for (int i = 0; i < n; i++) {
        printf("%d ", array[i]);
    }
    printf("\\n");

    // Free memory
    free(array);

    return 0;
}`
    },
    {
      id: "code2",
      question: "Write a C program that uses calloc() to create a dynamic array of floats, initializes them to zero, reads values from user input, and calculates the average.\n\nExample Input:\n3\n2.5\n4.0\n1.5\n\nExample Output:\nAverage: 2.67",
      solution: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n;

    printf("Enter number of values: ");
    scanf("%d", &n);

    // Use calloc for zero-initialized memory
    float *values = (float*)calloc(n, sizeof(float));

    if (values == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    // Read values from user
    printf("Enter %d values:\\n", n);
    for (int i = 0; i < n; i++) {
        scanf("%f", &values[i]);
    }

    // Calculate average
    float sum = 0.0f;
    for (int i = 0; i < n; i++) {
        sum += values[i];
    }

    printf("Average: %.2f\\n", sum / n);

    // Free memory
    free(values);

    return 0;
}`
    },
    {
      id: "code3",
      question: "Write a C program that demonstrates realloc() by starting with a small array and expanding it as more elements are added.\n\nExample Output:\nInitial array: 1 2 3\nAfter expansion: 1 2 3 4 5 6",
      solution: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int initial_size = 3;
    int final_size = 6;

    // Initial allocation
    int *array = (int*)malloc(initial_size * sizeof(int));

    if (array == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    // Initialize initial elements
    for (int i = 0; i < initial_size; i++) {
        array[i] = i + 1;
    }

    printf("Initial array: ");
    for (int i = 0; i < initial_size; i++) {
        printf("%d ", array[i]);
    }
    printf("\\n");

    // Expand using realloc
    int *new_array = (int*)realloc(array, final_size * sizeof(int));

    if (new_array == NULL) {
        printf("Memory reallocation failed!\\n");
        free(array);
        return 1;
    }

    array = new_array;

    // Initialize new elements
    for (int i = initial_size; i < final_size; i++) {
        array[i] = i + 1;
    }

    printf("After expansion: ");
    for (int i = 0; i < final_size; i++) {
        printf("%d ", array[i]);
    }
    printf("\\n");

    // Free memory
    free(array);

    return 0;
}`
    },
    {
      id: "code4",
      question: "Write a C program that creates a dynamic 2D array (matrix) using double pointers, fills it with values, and prints it.\n\nExample Output:\n1 2 3\n4 5 6\n7 8 9",
      solution: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int rows = 3, cols = 3;

    // Allocate array of pointers (rows)
    int **matrix = (int**)malloc(rows * sizeof(int*));

    if (matrix == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    // Allocate each row
    for (int i = 0; i < rows; i++) {
        matrix[i] = (int*)malloc(cols * sizeof(int));
        if (matrix[i] == NULL) {
            // Free previously allocated rows
            for (int j = 0; j < i; j++) {
                free(matrix[j]);
            }
            free(matrix);
            printf("Memory allocation failed!\\n");
            return 1;
        }
    }

    // Fill matrix with values
    int value = 1;
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            matrix[i][j] = value++;
        }
    }

    // Print matrix
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\\n");
    }

    // Free memory (reverse order)
    for (int i = 0; i < rows; i++) {
        free(matrix[i]);
    }
    free(matrix);

    return 0;
}`
    },
    {
      id: "code5",
      question: "Write a C program that implements a simple dynamic array (vector-like) with functions to add elements and resize automatically.\n\nExample Output:\nArray: 10 20 30\nSize: 3, Capacity: 4\nAdded 40, auto-resized\nArray: 10 20 30 40\nSize: 4, Capacity: 4",
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *data;
    int size;
    int capacity;
} DynamicArray;

DynamicArray* create_array(int initial_capacity) {
    DynamicArray *arr = (DynamicArray*)malloc(sizeof(DynamicArray));
    if (arr == NULL) return NULL;

    arr->data = (int*)malloc(initial_capacity * sizeof(int));
    if (arr->data == NULL) {
        free(arr);
        return NULL;
    }

    arr->size = 0;
    arr->capacity = initial_capacity;

    return arr;
}

void add_element(DynamicArray *arr, int value) {
    // Resize if needed
    if (arr->size >= arr->capacity) {
        int new_capacity = arr->capacity * 2;
        int *new_data = (int*)realloc(arr->data, new_capacity * sizeof(int));

        if (new_data == NULL) return;

        arr->data = new_data;
        arr->capacity = new_capacity;
        printf("Added %d, auto-resized\\n", value);
    }

    arr->data[arr->size++] = value;
}

void print_array(DynamicArray *arr) {
    printf("Array: ");
    for (int i = 0; i < arr->size; i++) {
        printf("%d ", arr->data[i]);
    }
    printf("\\nSize: %d, Capacity: %d\\n", arr->size, arr->capacity);
}

void free_array(DynamicArray *arr) {
    if (arr != NULL) {
        free(arr->data);
        free(arr);
    }
}

int main() {
    DynamicArray *arr = create_array(2);

    if (arr == NULL) {
        printf("Failed to create array\\n");
        return 1;
    }

    // Add elements (will trigger resize)
    add_element(arr, 10);
    add_element(arr, 20);
    add_element(arr, 30);

    print_array(arr);

    add_element(arr, 40);  // This should trigger resize

    print_array(arr);

    free_array(arr);

    return 0;
}`
    }
  ]
};
