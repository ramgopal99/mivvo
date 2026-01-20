import { SubLesson } from '../../../../data/lessonsData';

export const topic_10_2: SubLesson = {
  id: "10.2",
  title: 'Sorting Algorithms',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🔄 Sorting Algorithms in C

Sorting algorithms are fundamental to computer science and essential for efficient data processing. Different algorithms offer various trade-offs between time complexity, space usage, and stability.

---

## 📊 Algorithm Complexity

### **Time Complexity Comparison**

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | No |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No |

---

## 🫧 Bubble Sort

### **Algorithm Overview**

Bubble sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.

### **Implementation**

\`\`\`c
#include <stdio.h>
#include <stdbool.h>

void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;

        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }

        // If no swapping occurred, array is sorted
        if (!swapped) {
            break;
        }
    }
}

void print_array(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original array: ");
    print_array(arr, n);

    bubble_sort(arr, n);

    printf("Sorted array: ");
    print_array(arr, n);

    return 0;
}
\`\`\`

### **Optimized Bubble Sort**

The optimized version stops early if no swaps occur in a pass.

---

## 🎯 Selection Sort

### **Algorithm Overview**

Selection sort divides the array into sorted and unsorted regions. It repeatedly finds the minimum element from the unsorted region and moves it to the sorted region.

### **Implementation**

\`\`\`c
#include <stdio.h>

void selection_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_index = i;

        // Find minimum element in unsorted array
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_index]) {
                min_index = j;
            }
        }

        // Swap minimum element with first element of unsorted array
        if (min_index != i) {
            int temp = arr[i];
            arr[i] = arr[min_index];
            arr[min_index] = temp;
        }
    }
}

void print_array(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original array: ");
    print_array(arr, n);

    selection_sort(arr, n);

    printf("Sorted array: ");
    print_array(arr, n);

    return 0;
}
\`\`\`

---

## 📝 Insertion Sort

### **Algorithm Overview**

Insertion sort builds the sorted array one element at a time. It takes each element and inserts it into its correct position in the already sorted part of the array.

### **Implementation**

\`\`\`c
#include <stdio.h>

void insertion_sort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;

        // Move elements of arr[0..i-1] that are greater than key
        // to one position ahead of their current position
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;
    }
}

void print_array(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original array: ");
    print_array(arr, n);

    insertion_sort(arr, n);

    printf("Sorted array: ");
    print_array(arr, n);

    return 0;
}
\`\`\`

---

## ⚡ Quick Sort

### **Algorithm Overview**

Quick sort is a divide-and-conquer algorithm that picks a pivot element and partitions the array around it. It recursively sorts the subarrays.

### **Implementation**

\`\`\`c
#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];  // Choose last element as pivot
    int i = (low - 1);      // Index of smaller element

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

void print_array(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original array: ");
    print_array(arr, n);

    quick_sort(arr, 0, n - 1);

    printf("Sorted array: ");
    print_array(arr, n);

    return 0;
}
\`\`\`

---

## 🔀 Merge Sort

### **Algorithm Overview**

Merge sort is a divide-and-conquer algorithm that divides the array into halves, sorts them recursively, and then merges the sorted halves.

### **Implementation**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    // Create temporary arrays
    int *L = (int*)malloc(n1 * sizeof(int));
    int *R = (int*)malloc(n2 * sizeof(int));

    if (L == NULL || R == NULL) {
        printf("Memory allocation failed\\n");
        exit(1);
    }

    // Copy data to temporary arrays
    for (int i = 0; i < n1; i++) {
        L[i] = arr[left + i];
    }
    for (int j = 0; j < n2; j++) {
        R[j] = arr[mid + 1 + j];
    }

    // Merge the temporary arrays back
    int i = 0, j = 0, k = left;

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

void print_array(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original array: ");
    print_array(arr, n);

    merge_sort(arr, 0, n - 1);

    printf("Sorted array: ");
    print_array(arr, n);

    return 0;
}
\`\`\`

---

## 🏗️ Heap Sort

### **Algorithm Overview**

Heap sort uses a binary heap data structure. It builds a max heap from the array and repeatedly extracts the maximum element.

### **Implementation**

\`\`\`c
#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        heapify(arr, n, largest);
    }
}

void heap_sort(int arr[], int n) {
    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // Extract elements one by one
    for (int i = n - 1; i > 0; i--) {
        swap(&arr[0], &arr[i]);
        heapify(arr, i, 0);
    }
}

void print_array(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original array: ");
    print_array(arr, n);

    heap_sort(arr, n);

    printf("Sorted array: ");
    print_array(arr, n);

    return 0;
}
\`\`\`

---

## 🔍 Searching Algorithms

### **Linear Search**

\`\`\`c
#include <stdio.h>

int linear_search(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}

int main() {
    int arr[] = {2, 3, 4, 10, 40};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 10;

    int result = linear_search(arr, n, target);

    if (result != -1) {
        printf("Element found at index %d\\n", result);
    } else {
        printf("Element not found\\n");
    }

    return 0;
}
\`\`\`

### **Binary Search**

\`\`\`c
#include <stdio.h>

int binary_search(int arr[], int left, int right, int target) {
    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (arr[mid] == target) {
            return mid;
        }

        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}

int main() {
    int arr[] = {2, 3, 4, 10, 40};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 10;

    int result = binary_search(arr, 0, n - 1, target);

    if (result != -1) {
        printf("Element found at index %d\\n", result);
    } else {
        printf("Element not found\\n");
    }

    return 0;
}
\`\`\`

---

## 🎯 Practical Examples

### **Student Grade Sorter**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char name[50];
    int grade;
} Student;

int compare_students(const void *a, const void *b) {
    Student *s1 = (Student*)a;
    Student *s2 = (Student*)b;
    return s2->grade - s1->grade;  // Descending order
}

void sort_students(Student students[], int n) {
    qsort(students, n, sizeof(Student), compare_students);
}

void print_students(Student students[], int n) {
    printf("\\nStudent Grades (sorted by grade):\\n");
    for (int i = 0; i < n; i++) {
        printf("%s: %d\\n", students[i].name, students[i].grade);
    }
}

int main() {
    Student students[] = {
        {"Alice", 85},
        {"Bob", 92},
        {"Charlie", 78},
        {"Diana", 96},
        {"Eve", 88}
    };

    int n = sizeof(students) / sizeof(Student);

    printf("Original order:");
    print_students(students, n);

    sort_students(students, n);

    printf("\\nAfter sorting:");
    print_students(students, n);

    return 0;
}
\`\`\`

### **Performance Comparison**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define ARRAY_SIZE 10000
#define NUM_TESTS 5

void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

void quick_sort_helper(int arr[], int low, int high) {
    if (low < high) {
        int pivot = arr[high];
        int i = low - 1;

        for (int j = low; j <= high - 1; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        quick_sort_helper(arr, low, i);
        quick_sort_helper(arr, i + 2, high);
    }
}

void quick_sort(int arr[], int n) {
    quick_sort_helper(arr, 0, n - 1);
}

double benchmark_sort(void (*sort_func)(int[], int), int arr[], int n, const char *name) {
    int *test_arr = (int*)malloc(n * sizeof(int));
    if (test_arr == NULL) return -1;

    double total_time = 0;

    for (int test = 0; test < NUM_TESTS; test++) {
        // Copy original array
        memcpy(test_arr, arr, n * sizeof(int));

        clock_t start = clock();
        sort_func(test_arr, n);
        clock_t end = clock();

        total_time += (double)(end - start) / CLOCKS_PER_SEC;
    }

    free(test_arr);

    double avg_time = total_time / NUM_TESTS;
    printf("%-12s: %.6f seconds\\n", name, avg_time);

    return avg_time;
}

int main() {
    // Create random array
    int *arr = (int*)malloc(ARRAY_SIZE * sizeof(int));
    if (arr == NULL) {
        printf("Memory allocation failed\\n");
        return 1;
    }

    srand(time(NULL));
    for (int i = 0; i < ARRAY_SIZE; i++) {
        arr[i] = rand() % 1000;
    }

    printf("Benchmarking sorting algorithms (%d elements):\\n", ARRAY_SIZE);

    benchmark_sort(bubble_sort, arr, ARRAY_SIZE, "Bubble Sort");
    benchmark_sort(quick_sort, arr, ARRAY_SIZE, "Quick Sort");

    free(arr);

    return 0;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Choose algorithms based on requirements**: time, space, stability
2. **Bubble, Selection, Insertion** are simple but O(n²) for worst case
3. **Quick, Merge, Heap** sort offer O(n log n) performance
4. **Quick sort** is fast in practice but has worst-case O(n²)
5. **Merge sort** is stable and consistent O(n log n)
6. **Heap sort** sorts in-place with O(n log n) worst case
7. **Linear search** is O(n), **binary search** is O(log n) on sorted arrays
8. **qsort()** from stdlib.h provides efficient general-purpose sorting

Master sorting algorithms to efficiently organize data! 🔄✨`;

    return contentString;
  })()
};
