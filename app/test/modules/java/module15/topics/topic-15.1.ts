import { SubLesson } from '../../../../data/lessonsData';

export const topic_15_1: SubLesson = {
  id: "15.1",
  title: 'Introduction to Sorting Algorithms',
  status: 'completed',
  content: "`# ðŸ”„ Introduction to Sorting Algorithms in Java

Learn the fundamentals of sorting algorithms and their importance in programming!

---

## ðŸŽ¯ What is Sorting?

**Sorting** is the process of arranging elements in a specific order - typically ascending or descending. It's one of the most fundamental operations in computer science.

### **Why Sorting Matters:**
- **Search Efficiency**: Binary search requires sorted data
- **Data Analysis**: Finding median, percentiles
- **Database Operations**: ORDER BY clauses
- **Algorithm Foundations**: Many algorithms assume sorted input

---

## ðŸ“Š Classification of Sorting Algorithms

### **1. Comparison-Based vs Non-Comparison-Based**

#### **Comparison-Based Sorting**
- Compare elements using comparison operators (<, >, ==)
- Time complexity lower bound: Î©(n log n)
- Examples: Quick Sort, Merge Sort, Bubble Sort

#### **Non-Comparison-Based Sorting**
- Use additional information about elements
- Can achieve better than O(n log n) in special cases
- Examples: Counting Sort, Radix Sort, Bucket Sort

### **2. Stability in Sorting**

#### **Stable Sort**
- Maintains relative order of equal elements
- Example: [3a, 2, 3b, 1] â†’ [1, 2, 3a, 3b]

#### **Unstable Sort**
- May change relative order of equal elements
- Example: [3a, 2, 3b, 1] â†’ [1, 2, 3b, 3a]

---

## â±ï¸ Time and Space Complexity

### **Big O Notation Quick Reference:**
- **O(1)**: Constant time
- **O(log n)**: Logarithmic time
- **O(n)**: Linear time
- **O(n log n)**: Linearithmic time
- **O(nÂ²)**: Quadratic time

### **Space Complexity:**
- **In-place**: O(1) extra space
- **Out-of-place**: O(n) or more extra space

---

## ðŸ† Popular Sorting Algorithms

| Algorithm | Best | Average | Worst | Space | Stable | In-Place |
|-----------|------|---------|-------|-------|--------|----------|
| **Bubble Sort** | O(n) | O(nÂ²) | O(nÂ²) | O(1) | Yes | Yes |
| **Selection Sort** | O(nÂ²) | O(nÂ²) | O(nÂ²) | O(1) | No | Yes |
| **Insertion Sort** | O(n) | O(nÂ²) | O(nÂ²) | O(1) | Yes | Yes |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes | No |
| **Quick Sort** | O(n log n) | O(n log n) | O(nÂ²) | O(log n) | No | Yes |
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | O(1) | No | Yes |
| **Counting Sort** | O(n + k) | O(n + k) | O(n + k) | O(k) | Yes | No |

---

## ðŸ§ª Basic Sorting Algorithms

### **1. Bubble Sort - O(nÂ²)**

#### **How it Works:**
1. Compare adjacent elements
2. Swap if they are in wrong order
3. Repeat until no swaps needed

\`"\`\`java
public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        boolean swapped;

        for (int i = 0; i < n - 1; i++) {
            swapped = false;

            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap arr[j] and arr[j+1]
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }

            // If no two elements were swapped, array is sorted
            if (!swapped) {
                break;
            }
        }
    }

    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original: " + Arrays.toString(arr));
        bubbleSort(arr);
        System.out.println("Sorted: " + Arrays.toString(arr));
    }
}
\`\`\`

### **2. Selection Sort - O(nÂ²)**

#### **How it Works:**
1. Find the minimum element in unsorted portion
2. Swap it with the first unsorted element
3. Repeat for remaining elements

\`\`\`java
public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;

        for (int i = 0; i < n - 1; i++) {
            // Find the minimum element in unsorted array
            int minIndex = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }

            // Swap the found minimum element with the first element
            int temp = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = temp;
        }
    }

    public static void main(String[] args) {
        int[] arr = {64, 25, 12, 22, 11};
        System.out.println("Original: " + Arrays.toString(arr));
        selectionSort(arr);
        System.out.println("Sorted: " + Arrays.toString(arr));
    }
}
\`\`\`

### **3. Insertion Sort - O(nÂ²)**

#### **How it Works:**
1. Consider first element as sorted
2. Take next element and insert it in correct position
3. Shift larger elements to make space

\`\`\`java
public class InsertionSort {
    public static void insertionSort(int[] arr) {
        int n = arr.length;

        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;

            // Move elements of arr[0..i-1] that are greater than key
            // to one position ahead of their current position
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }

    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6};
        System.out.println("Original: " + Arrays.toString(arr));
        insertionSort(arr);
        System.out.println("Sorted: " + Arrays.toString(arr));
    }
}
\`\`\`

---

## âš¡ Advanced Sorting Algorithms

### **4. Merge Sort - O(n log n)**

#### **How it Works:**
1. Divide array into two halves
2. Recursively sort both halves
3. Merge the sorted halves

\`\`\`java
public class MergeSort {
    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            // Find the middle point
            int mid = left + (right - left) / 2;

            // Sort first and second halves
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);

            // Merge the sorted halves
            merge(arr, left, mid, right);
        }
    }

    public static void merge(int[] arr, int left, int mid, int right) {
        // Sizes of two subarrays to be merged
        int n1 = mid - left + 1;
        int n2 = right - mid;

        // Create temp arrays
        int[] leftArr = new int[n1];
        int[] rightArr = new int[n2];

        // Copy data to temp arrays
        for (int i = 0; i < n1; i++) {
            leftArr[i] = arr[left + i];
        }
        for (int j = 0; j < n2; j++) {
            rightArr[j] = arr[mid + 1 + j];
        }

        // Merge the temp arrays
        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            k++;
        }

        // Copy remaining elements
        while (i < n1) {
            arr[k] = leftArr[i];
            i++;
            k++;
        }
        while (j < n2) {
            arr[k] = rightArr[j];
            j++;
            k++;
        }
    }

    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6, 7};
        System.out.println("Original: " + Arrays.toString(arr));
        mergeSort(arr, 0, arr.length - 1);
        System.out.println("Sorted: " + Arrays.toString(arr));
    }
}
\`\`\`

---

## ðŸ§ª Testing Sorting Algorithms

### **Performance Comparison**
\`\`\`java
import java.util.Arrays;
import java.util.Random;

public class SortingComparison {
    public static void main(String[] args) {
        int[] sizes = {100, 1000, 10000};

        for (int size : sizes) {
            System.out.println("\\nArray size: " + size);

            // Create random array
            int[] arr = new Random().ints(size, 0, 10000).toArray();

            // Test Bubble Sort
            int[] bubbleArr = Arrays.copyOf(arr, arr.length);
            long start = System.nanoTime();
            bubbleSort(bubbleArr);
            long end = System.nanoTime();
            System.out.println("Bubble Sort: " + (end - start) / 1000000 + "ms");

            // Test Merge Sort
            int[] mergeArr = Arrays.copyOf(arr, arr.length);
            start = System.nanoTime();
            mergeSort(mergeArr, 0, mergeArr.length - 1);
            end = System.nanoTime();
            System.out.println("Merge Sort: " + (end - start) / 1000000 + "ms");
        }
    }

    // Include the sorting methods from above
    public static void bubbleSort(int[] arr) { /* ... */ }
    public static void mergeSort(int[] arr, int left, int right) { /* ... */ }
}
\`\`\`

---

## ðŸŽ¯ Key Takeaways

1. **Bubble Sort**: Simple but inefficient (O(nÂ²))
2. **Selection Sort**: Always O(nÂ²), good for small arrays
3. **Insertion Sort**: Efficient for nearly sorted data
4. **Merge Sort**: Consistent O(n log n), stable, but uses O(n) space
5. **Choose wisely**: Based on data size, distribution, and requirements
6. **Java Arrays.sort()**: Uses optimized hybrid algorithm (TimSort)

**Next:** Learn Quick Sort and Heap Sort! ðŸš€`
};


