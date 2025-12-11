import { SubLesson } from '../../../data/lessonsData';

export const topic_5_4: SubLesson = {
  id: 5.4,
  title: 'Array Operations',
  status: 'completed',
  content: `# ⚡ Array Operations

Master advanced array manipulation techniques, algorithms, and utility functions for efficient data processing in C.

---

## 🔄 Array Copying and Cloning

### Shallow Copy (Same Array)

\`\`\`c
#include <stdio.h>

int main() {
    int original[] = {1, 2, 3, 4, 5};
    int copy[5];

    // Method 1: Element-by-element copy
    for (int i = 0; i < 5; i++) {
        copy[i] = original[i];
    }

    // Method 2: Using memcpy (from string.h)
    #include <string.h>
    memcpy(copy, original, sizeof(original));

    printf("Original: ");
    for (int i = 0; i < 5; i++) printf("%d ", original[i]);

    printf("\\nCopy: ");
    for (int i = 0; i < 5; i++) printf("%d ", copy[i]);

    return 0;
}
\`\`\`

### Partial Copy

\`\`\`c
void copy_range(int dest[], int src[], int start, int end, int dest_start) {
    for (int i = start, j = dest_start; i <= end; i++, j++) {
        dest[j] = src[i];
    }
}

int main() {
    int source[] = {10, 20, 30, 40, 50, 60, 70};
    int destination[10] = {0};

    // Copy elements 2-5 from source to destination starting at index 3
    copy_range(destination, source, 2, 5, 3);

    printf("Destination: ");
    for (int i = 0; i < 10; i++) printf("%d ", destination[i]);

    return 0;
}
\`\`\`

---

## 🔍 Array Searching and Finding

### Linear Search with Position Tracking

\`\`\`c
#include <stdio.h>

// Return index of first occurrence
int find_first(int arr[], int size, int target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}

// Return index of last occurrence
int find_last(int arr[], int size, int target) {
    for (int i = size - 1; i >= 0; i--) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}

// Count occurrences
int count_occurrences(int arr[], int size, int target) {
    int count = 0;
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) {
            count++;
        }
    }
    return count;
}

int main() {
    int numbers[] = {1, 5, 3, 5, 2, 5, 8};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    int target = 5;
    printf("First occurrence of %d: index %d\\n", target, find_first(numbers, size, target));
    printf("Last occurrence of %d: index %d\\n", target, find_last(numbers, size, target));
    printf("Total occurrences of %d: %d\\n", target, count_occurrences(numbers, size, target));

    return 0;
}
\`\`\`

### Finding Multiple Elements

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

#define MAX_RESULTS 100

// Find all indices of target value
int* find_all(int arr[], int size, int target, int* result_count) {
    static int results[MAX_RESULTS];  // Static to persist after function
    *result_count = 0;

    for (int i = 0; i < size && *result_count < MAX_RESULTS; i++) {
        if (arr[i] == target) {
            results[*result_count] = i;
            (*result_count)++;
        }
    }

    return results;
}

int main() {
    int numbers[] = {1, 5, 3, 5, 2, 5, 8, 5};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    int count;
    int* indices = find_all(numbers, size, 5, &count);

    printf("Indices of value 5: ");
    for (int i = 0; i < count; i++) {
        printf("%d ", indices[i]);
    }
    printf("\\nTotal found: %d\\n", count);

    return 0;
}
\`\`\`

---

## 🔀 Array Sorting Algorithms

### Quick Sort Implementation

\`\`\`c
#include <stdio.h>

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);

    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}

void quick_sort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);

        quick_sort(arr, low, pi - 1);
        quick_sort(arr, pi + 1, high);
    }
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);

    quick_sort(arr, 0, n - 1);

    printf("\\nSorted array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);

    return 0;
}
\`\`\`

### Merge Sort Implementation

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int left, int mid, int right) {
    int i, j, k;
    int n1 = mid - left + 1;
    int n2 = right - mid;

    // Create temporary arrays
    int* L = (int*)malloc(n1 * sizeof(int));
    int* R = (int*)malloc(n2 * sizeof(int));

    // Copy data to temporary arrays
    for (i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];

    // Merge the temporary arrays back
    i = 0; j = 0; k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy remaining elements
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }

    free(L);
    free(R);
}

void merge_sort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;

        merge_sort(arr, left, mid);
        merge_sort(arr, mid + 1, right);

        merge(arr, left, mid, right);
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int arr_size = sizeof(arr) / sizeof(arr[0]);

    printf("Original array: ");
    for (int i = 0; i < arr_size; i++) printf("%d ", arr[i]);

    merge_sort(arr, 0, arr_size - 1);

    printf("\\nSorted array: ");
    for (int i = 0; i < arr_size; i++) printf("%d ", arr[i]);

    return 0;
}
\`\`\`

---

## 🔗 Array Merging and Splitting

### Merging Two Sorted Arrays

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int* merge_sorted_arrays(int arr1[], int size1, int arr2[], int size2, int* result_size) {
    *result_size = size1 + size2;
    int* result = (int*)malloc(*result_size * sizeof(int));

    if (result == NULL) return NULL;

    int i = 0, j = 0, k = 0;

    // Merge while both arrays have elements
    while (i < size1 && j < size2) {
        if (arr1[i] <= arr2[j]) {
            result[k++] = arr1[i++];
        } else {
            result[k++] = arr2[j++];
        }
    }

    // Copy remaining elements
    while (i < size1) {
        result[k++] = arr1[i++];
    }
    while (j < size2) {
        result[k++] = arr2[j++];
    }

    return result;
}

int main() {
    int arr1[] = {1, 3, 5, 7};
    int arr2[] = {2, 4, 6, 8, 10};
    int size1 = sizeof(arr1) / sizeof(arr1[0]);
    int size2 = sizeof(arr2) / sizeof(arr2[0]);
    int result_size;

    int* merged = merge_sorted_arrays(arr1, size1, arr2, size2, &result_size);

    if (merged != NULL) {
        printf("Merged array: ");
        for (int i = 0; i < result_size; i++) {
            printf("%d ", merged[i]);
        }
        printf("\\n");

        free(merged);
    }

    return 0;
}
\`\`\`

### Splitting Arrays

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

// Split array into two halves
void split_array(int arr[], int size, int** left, int* left_size, int** right, int* right_size) {
    *left_size = size / 2;
    *right_size = size - *left_size;

    *left = (int*)malloc(*left_size * sizeof(int));
    *right = (int*)malloc(*right_size * sizeof(int));

    if (*left == NULL || *right == NULL) {
        free(*left);
        free(*right);
        *left = *right = NULL;
        return;
    }

    // Copy left half
    for (int i = 0; i < *left_size; i++) {
        (*left)[i] = arr[i];
    }

    // Copy right half
    for (int i = 0; i < *right_size; i++) {
        (*right)[i] = arr[*left_size + i];
    }
}

int main() {
    int arr[] = {1, 2, 3, 4, 5, 6, 7};
    int size = sizeof(arr) / sizeof(arr[0]);

    int *left, *right;
    int left_size, right_size;

    split_array(arr, size, &left, &left_size, &right, &right_size);

    if (left && right) {
        printf("Left half: ");
        for (int i = 0; i < left_size; i++) printf("%d ", left[i]);

        printf("\\nRight half: ");
        for (int i = 0; i < right_size; i++) printf("%d ", right[i]);
        printf("\\n");

        free(left);
        free(right);
    }

    return 0;
}
\`\`\`

---

## 🔄 Array Transformation

### Removing Duplicates

\`\`\`c
#include <stdio.h>

int remove_duplicates(int arr[], int size) {
    if (size <= 1) return size;

    int write_index = 1;

    for (int read_index = 1; read_index < size; read_index++) {
        int is_duplicate = 0;

        // Check if current element already exists in result
        for (int check_index = 0; check_index < write_index; check_index++) {
            if (arr[read_index] == arr[check_index]) {
                is_duplicate = 1;
                break;
            }
        }

        if (!is_duplicate) {
            arr[write_index] = arr[read_index];
            write_index++;
        }
    }

    return write_index;
}

int main() {
    int arr[] = {1, 2, 2, 3, 4, 4, 4, 5, 5};
    int size = sizeof(arr) / sizeof(arr[0]);

    printf("Original array: ");
    for (int i = 0; i < size; i++) printf("%d ", arr[i]);

    int new_size = remove_duplicates(arr, size);

    printf("\\nAfter removing duplicates: ");
    for (int i = 0; i < new_size; i++) printf("%d ", arr[i]);
    printf("\\nNew size: %d\\n", new_size);

    return 0;
}
\`\`\`

### Array Filtering

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

// Filter array based on condition
int* filter_array(int arr[], int size, int (*condition)(int), int* result_size) {
    // First pass: count valid elements
    int count = 0;
    for (int i = 0; i < size; i++) {
        if (condition(arr[i])) {
            count++;
        }
    }

    // Allocate result array
    int* result = (int*)malloc(count * sizeof(int));
    if (result == NULL) {
        *result_size = 0;
        return NULL;
    }

    // Second pass: copy valid elements
    int result_index = 0;
    for (int i = 0; i < size; i++) {
        if (condition(arr[i])) {
            result[result_index++] = arr[i];
        }
    }

    *result_size = count;
    return result;
}

// Condition functions
int is_even(int x) { return x % 2 == 0; }
int is_positive(int x) { return x > 0; }
int greater_than_5(int x) { return x > 5; }

int main() {
    int arr[] = {1, -2, 3, 4, -5, 6, 7, 8, -9, 10};
    int size = sizeof(arr) / sizeof(arr[0]);
    int result_size;
    int* filtered;

    // Filter even numbers
    filtered = filter_array(arr, size, is_even, &result_size);
    if (filtered) {
        printf("Even numbers: ");
        for (int i = 0; i < result_size; i++) printf("%d ", filtered[i]);
        printf("\\n");
        free(filtered);
    }

    // Filter positive numbers
    filtered = filter_array(arr, size, is_positive, &result_size);
    if (filtered) {
        printf("Positive numbers: ");
        for (int i = 0; i < result_size; i++) printf("%d ", filtered[i]);
        printf("\\n");
        free(filtered);
    }

    return 0;
}
\`\`\`

---

## 📊 Array Statistics

### Advanced Statistical Functions

\`\`\`c
#include <stdio.h>
#include <math.h>
#include <stdlib.h>

// Calculate mean
double calculate_mean(int arr[], int size) {
    if (size == 0) return 0.0;

    double sum = 0.0;
    for (int i = 0; i < size; i++) {
        sum += arr[i];
    }
    return sum / size;
}

// Calculate median
double calculate_median(int arr[], int size) {
    if (size == 0) return 0.0;

    // Create a copy to sort
    int* sorted = (int*)malloc(size * sizeof(int));
    if (sorted == NULL) return 0.0;

    for (int i = 0; i < size; i++) {
        sorted[i] = arr[i];
    }

    // Simple bubble sort for median
    for (int i = 0; i < size - 1; i++) {
        for (int j = 0; j < size - i - 1; j++) {
            if (sorted[j] > sorted[j + 1]) {
                int temp = sorted[j];
                sorted[j] = sorted[j + 1];
                sorted[j + 1] = temp;
            }
        }
    }

    double median;
    if (size % 2 == 0) {
        median = (sorted[size/2 - 1] + sorted[size/2]) / 2.0;
    } else {
        median = sorted[size/2];
    }

    free(sorted);
    return median;
}

// Calculate standard deviation
double calculate_std_dev(int arr[], int size) {
    if (size <= 1) return 0.0;

    double mean = calculate_mean(arr, size);
    double sum_squared_diff = 0.0;

    for (int i = 0; i < size; i++) {
        double diff = arr[i] - mean;
        sum_squared_diff += diff * diff;
    }

    return sqrt(sum_squared_diff / (size - 1));
}

int main() {
    int scores[] = {85, 92, 78, 96, 88, 73, 95, 89, 91, 84};
    int size = sizeof(scores) / sizeof(scores[0]);

    printf("Scores: ");
    for (int i = 0; i < size; i++) printf("%d ", scores[i]);
    printf("\\n");

    printf("Mean: %.2f\\n", calculate_mean(scores, size));
    printf("Median: %.2f\\n", calculate_median(scores, size));
    printf("Standard Deviation: %.2f\\n", calculate_std_dev(scores, size));

    return 0;
}
\`\`\`

---

## 🔧 Array Utility Library

### Complete Array Utilities

\`\`\`c
#ifndef ARRAY_UTILS_H
#define ARRAY_UTILS_H

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

// Array creation and destruction
int* create_int_array(int size, int initial_value);
void free_int_array(int* arr);

// Array manipulation
void fill_array(int arr[], int size, int value);
void copy_array(int dest[], const int src[], int size);
void reverse_array(int arr[], int size);
void shuffle_array(int arr[], int size);

// Array searching
int linear_search(const int arr[], int size, int target);
int binary_search(const int arr[], int size, int target);
bool contains(const int arr[], int size, int target);

// Array sorting
void bubble_sort(int arr[], int size);
void selection_sort(int arr[], int size);
void insertion_sort(int arr[], int size);

// Array statistics
int find_max(const int arr[], int size);
int find_min(const int arr[], int size);
double calculate_sum(const int arr[], int size);
double calculate_mean(const int arr[], int size);

// Array comparison
bool arrays_equal(const int arr1[], const int arr2[], int size);
void print_array(const int arr[], int size);

#endif

// Implementation would go in array_utils.c
\`\`\`

---

## 🎯 Key Takeaways

1. **Array operations** include copying, searching, sorting, and merging
2. **Sorting algorithms** have different time/space complexity trade-offs
3. **Linear search** works on any array, **binary search** requires sorted arrays
4. **Array merging** combines multiple arrays while maintaining order
5. **Filtering** creates subsets based on conditions
6. **Statistics** provide insights into array data distributions
7. **Utility functions** improve code reusability and maintainability

---

## 🚀 Preview: Introduction to Strings

In the next topic, you'll learn about:
- **String fundamentals** and character arrays
- **String literals** and null termination
- **String input/output** functions
- **Basic string operations** and manipulation

**Array operations provide powerful data processing - strings are specialized character arrays!** 📝
