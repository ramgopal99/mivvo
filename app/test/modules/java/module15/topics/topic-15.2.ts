import { SubLesson } from '../../../data/lessonsData';

export const topic_15_2: SubLesson = {
  id: 15.2,
  title: 'Quick Sort & Heap Sort',
  status: 'completed',
  content: `# ⚡ Quick Sort & Heap Sort in Java

Master two of the most important sorting algorithms!

---

## 🚀 Quick Sort - O(n log n) Average

### **How Quick Sort Works:**
1. **Choose a pivot** element
2. **Partition** array around pivot (smaller left, larger right)
3. **Recursively sort** left and right subarrays

### **Partitioning Process:**
\`\`\`java
public class QuickSort {
    // Partition function
    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[high]; // Choose last element as pivot
        int i = low - 1; // Index of smaller element

        for (int j = low; j < high; j++) {
            // If current element is smaller than or equal to pivot
            if (arr[j] <= pivot) {
                i++;

                // Swap arr[i] and arr[j]
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        // Swap arr[i+1] and arr[high] (pivot)
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        return i + 1; // Return pivot index
    }

    // Quick sort recursive function
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            // Find pivot position
            int pi = partition(arr, low, high);

            // Sort left and right subarrays
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    public static void quickSort(int[] arr) {
        quickSort(arr, 0, arr.length - 1);
    }

    public static void main(String[] args) {
        int[] arr = {10, 7, 8, 9, 1, 5};
        System.out.println("Original: " + Arrays.toString(arr));
        quickSort(arr);
        System.out.println("Sorted: " + Arrays.toString(arr));
    }
}
\`\`\`

### **Quick Sort Analysis:**
- **Best/Average Case**: O(n log n)
- **Worst Case**: O(n²) - when pivot is always smallest/largest
- **Space**: O(log n) for recursion stack
- **In-place**: Yes
- **Stable**: No

### **Optimizations:**
1. **Randomized Pivot**: Choose random pivot to avoid worst case
2. **Median-of-Three**: Choose median of first, middle, last elements
3. **Hybrid Approach**: Use insertion sort for small subarrays

---

## 🏗️ Heap Sort - O(n log n) Worst Case

### **Heap Data Structure:**
- **Complete Binary Tree** where each node ≥ its children (Max Heap)
- **Array Representation**: Parent at i, children at 2i+1 and 2i+2

### **Heap Sort Steps:**
1. **Build Max Heap** from array
2. **Swap** root (largest) with last element
3. **Heapify** remaining elements
4. **Repeat** until sorted

\`\`\`java
public class HeapSort {
    // Heapify a subtree rooted at node i
    public static void heapify(int[] arr, int n, int i) {
        int largest = i; // Initialize largest as root
        int left = 2 * i + 1; // Left child
        int right = 2 * i + 2; // Right child

        // If left child is larger than root
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        // If right child is larger than largest so far
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        // If largest is not root
        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;

            // Recursively heapify the affected sub-tree
            heapify(arr, n, largest);
        }
    }

    // Build max heap
    public static void buildMaxHeap(int[] arr) {
        int n = arr.length;

        // Start from last non-leaf node and heapify each
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
    }

    // Heap sort
    public static void heapSort(int[] arr) {
        int n = arr.length;

        // Build max heap
        buildMaxHeap(arr);

        // Extract elements one by one
        for (int i = n - 1; i > 0; i--) {
            // Move current root to end
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;

            // Call max heapify on the reduced heap
            heapify(arr, i, 0);
        }
    }

    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6, 7};
        System.out.println("Original: " + Arrays.toString(arr));
        heapSort(arr);
        System.out.println("Sorted: " + Arrays.toString(arr));
    }
}
\`\`\`

### **Heap Sort Analysis:**
- **Time Complexity**: O(n log n) in all cases
- **Space Complexity**: O(1) auxiliary space
- **In-place**: Yes
- **Stable**: No
- **Cache-friendly**: No (jumps around in array)

---

## 🧮 Non-Comparison Sorts

### **Counting Sort - O(n + k)**

#### **When to Use:**
- When range of input (k) is small compared to n
- When elements are integers
- Stability matters

\`\`\`java
public class CountingSort {
    public static void countingSort(int[] arr) {
        int n = arr.length;
        if (n == 0) return;

        // Find the maximum and minimum values
        int max = Arrays.stream(arr).max().getAsInt();
        int min = Arrays.stream(arr).min().getAsInt();
        int range = max - min + 1;

        // Initialize count array
        int[] count = new int[range];
        int[] output = new int[n];

        // Count occurrences
        for (int num : arr) {
            count[num - min]++;
        }

        // Cumulative count
        for (int i = 1; i < count.length; i++) {
            count[i] += count[i - 1];
        }

        // Build output array
        for (int i = n - 1; i >= 0; i--) {
            output[count[arr[i] - min] - 1] = arr[i];
            count[arr[i] - min]--;
        }

        // Copy back to original array
        System.arraycopy(output, 0, arr, 0, n);
    }

    public static void main(String[] args) {
        int[] arr = {4, 2, 2, 8, 3, 3, 1};
        System.out.println("Original: " + Arrays.toString(arr));
        countingSort(arr);
        System.out.println("Sorted: " + Arrays.toString(arr));
    }
}
\`\`\`

### **Radix Sort - O(n * d)**

#### **How it Works:**
1. Sort by least significant digit
2. Sort by next digit
3. Continue until most significant digit

\`\`\`java
public class RadixSort {
    // Get maximum value
    public static int getMax(int[] arr) {
        return Arrays.stream(arr).max().getAsInt();
    }

    // Counting sort by digit
    public static void countSort(int[] arr, int exp) {
        int n = arr.length;
        int[] output = new int[n];
        int[] count = new int[10];

        // Count occurrences
        for (int num : arr) {
            count[(num / exp) % 10]++;
        }

        // Cumulative count
        for (int i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        // Build output
        for (int i = n - 1; i >= 0; i--) {
            output[count[(arr[i] / exp) % 10] - 1] = arr[i];
            count[(arr[i] / exp) % 10]--;
        }

        // Copy back
        System.arraycopy(output, 0, arr, 0, n);
    }

    public static void radixSort(int[] arr) {
        int max = getMax(arr);

        // Sort by each digit
        for (int exp = 1; max / exp > 0; exp *= 10) {
            countSort(arr, exp);
        }
    }

    public static void main(String[] args) {
        int[] arr = {170, 45, 75, 90, 802, 24, 2, 66};
        System.out.println("Original: " + Arrays.toString(arr));
        radixSort(arr);
        System.out.println("Sorted: " + Arrays.toString(arr));
    }
}
\`\`\`

---

## 🏆 Algorithm Comparison

| Algorithm | Time | Space | Stable | In-Place | Best For |
|-----------|------|-------|--------|----------|----------|
| **Quick Sort** | O(n log n) avg | O(log n) | No | Yes | General purpose |
| **Merge Sort** | O(n log n) | O(n) | Yes | No | Large datasets |
| **Heap Sort** | O(n log n) | O(1) | No | Yes | Memory constrained |
| **Counting Sort** | O(n + k) | O(k) | Yes | No | Small range integers |
| **Radix Sort** | O(n * d) | O(n + k) | Yes | No | Fixed-length keys |

---

## 🎯 Key Takeaways

1. **Quick Sort**: Fast average case, in-place, but worst case O(n²)
2. **Heap Sort**: Guaranteed O(n log n), in-place, but not cache-friendly
3. **Merge Sort**: Stable, predictable, but uses extra space
4. **Non-comparison sorts**: Can be faster when constraints allow
5. **Java's Arrays.sort()**: Uses dual-pivot quicksort for primitives, Timsort for objects

**Master these algorithms for optimal sorting performance!** 🚀`
};
