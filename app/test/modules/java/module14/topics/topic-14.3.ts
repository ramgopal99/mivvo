import { SubLesson } from '../../../../data/lessonsData';

export const topic_14_3: SubLesson = {
  id: 14.3,
  title: 'Advanced Recursion Techniques',
  status: 'completed',
  content: `# 🔄 Advanced Recursion Techniques in Java

Master complex recursive patterns and optimization techniques!

---

## 🎯 Divide and Conquer Recursion

### **1. Merge Sort Implementation**
\`\`\`java
import java.util.Arrays;

public class AdvancedRecursion {
    // Merge two sorted arrays
    public static void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;

        int[] leftArr = new int[n1];
        int[] rightArr = new int[n2];

        // Copy data to temp arrays
        for (int i = 0; i < n1; i++) {
            leftArr[i] = arr[left + i];
        }
        for (int j = 0; j < n2; j++) {
            rightArr[j] = arr[mid + 1 + j];
        }

        // Merge temp arrays
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

    // Recursive merge sort
    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;

            // Sort first and second halves
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);

            // Merge sorted halves
            merge(arr, left, mid, right);
        }
    }

    public static void mergeSort(int[] arr) {
        mergeSort(arr, 0, arr.length - 1);
    }

    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6, 7};
        System.out.println("Original: " + Arrays.toString(arr));
        mergeSort(arr);
        System.out.println("Sorted: " + Arrays.toString(arr));
    }
}
\`\`\`

### **2. Quick Sort Implementation**
\`\`\`java
import java.util.Arrays;

public class AdvancedRecursion {
    // Partition function for quicksort
    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;

        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
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

        return i + 1;
    }

    // Recursive quicksort
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            // Partition and get pivot index
            int pi = partition(arr, low, high);

            // Sort elements before and after partition
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

---

## 🔄 Backtracking Recursion

### **1. N-Queens Problem**
\`\`\`java
import java.util.Arrays;

public class BacktrackingRecursion {
    private static final int N = 4; // Board size

    // Check if queen can be placed at board[row][col]
    public static boolean isSafe(int[][] board, int row, int col) {
        // Check left side of current row
        for (int i = 0; i < col; i++) {
            if (board[row][i] == 1) {
                return false;
            }
        }

        // Check upper diagonal on left
        for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] == 1) {
                return false;
            }
        }

        // Check lower diagonal on left
        for (int i = row, j = col; j >= 0 && i < N; i++, j--) {
            if (board[i][j] == 1) {
                return false;
            }
        }

        return true;
    }

    // Recursive function to solve N-Queens
    public static boolean solveNQueens(int[][] board, int col) {
        // Base case: all queens placed
        if (col >= N) {
            return true;
        }

        // Try placing queen in each row of current column
        for (int i = 0; i < N; i++) {
            if (isSafe(board, i, col)) {
                // Place queen
                board[i][col] = 1;

                // Recurse to place next queen
                if (solveNQueens(board, col + 1)) {
                    return true;
                }

                // Backtrack: remove queen
                board[i][col] = 0;
            }
        }

        return false; // No solution found
    }

    public static void printBoard(int[][] board) {
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                System.out.print(board[i][j] + " ");
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        int[][] board = new int[N][N];

        if (solveNQueens(board, 0)) {
            System.out.println("Solution found:");
            printBoard(board);
        } else {
            System.out.println("No solution exists");
        }
    }
}
\`\`\`

### **2. Subset Sum Problem**
\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class BacktrackingRecursion {
    // Find subsets that sum to target
    public static void findSubsets(int[] nums, int target, int index,
                                   List<Integer> current, List<List<Integer>> result) {
        // Base case: target reached
        if (target == 0) {
            result.add(new ArrayList<>(current));
            return;
        }

        // Try each number from current index
        for (int i = index; i < nums.length; i++) {
            if (nums[i] <= target) {
                current.add(nums[i]);
                findSubsets(nums, target - nums[i], i + 1, current, result);
                current.remove(current.size() - 1); // Backtrack
            }
        }
    }

    public static List<List<Integer>> subsetSum(int[] nums, int target) {
        List<List<Integer>> result = new ArrayList<>();
        findSubsets(nums, target, 0, new ArrayList<>(), result);
        return result;
    }

    public static void main(String[] args) {
        int[] nums = {3, 34, 4, 12, 5, 2};
        int target = 9;

        List<List<Integer>> subsets = subsetSum(nums, target);
        System.out.println("Subsets that sum to " + target + ":");
        for (List<Integer> subset : subsets) {
            System.out.println(subset);
        }
    }
}
\`\`\`

---

## 🔢 Mathematical Recursion

### **1. Tower of Hanoi**
\`\`\`java
public class MathematicalRecursion {
    // Tower of Hanoi recursive solution
    public static void towerOfHanoi(int n, char fromRod, char toRod, char auxRod) {
        // Base case: only one disk
        if (n == 1) {
            System.out.println("Move disk 1 from " + fromRod + " to " + toRod);
            return;
        }

        // Move n-1 disks from source to auxiliary
        towerOfHanoi(n - 1, fromRod, auxRod, toRod);

        // Move nth disk from source to destination
        System.out.println("Move disk " + n + " from " + fromRod + " to " + toRod);

        // Move n-1 disks from auxiliary to destination
        towerOfHanoi(n - 1, auxRod, toRod, fromRod);
    }

    public static void main(String[] args) {
        int n = 3; // Number of disks
        towerOfHanoi(n, 'A', 'C', 'B'); // A=source, B=auxiliary, C=destination
    }
}
\`\`\`

### **2. Fibonacci with Memoization**
\`\`\`java
import java.util.HashMap;
import java.util.Map;

public class MathematicalRecursion {
    private static Map<Integer, Long> memo = new HashMap<>();

    // Fibonacci with memoization
    public static long fibonacci(int n) {
        // Base cases
        if (n <= 1) {
            return n;
        }

        // Check if already computed
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        // Compute and store
        long result = fibonacci(n - 1) + fibonacci(n - 2);
        memo.put(n, result);
        return result;
    }

    // Standard recursive Fibonacci (inefficient)
    public static long fibonacciSlow(int n) {
        if (n <= 1) {
            return n;
        }
        return fibonacciSlow(n - 1) + fibonacciSlow(n - 2);
    }

    public static void main(String[] args) {
        int n = 40;

        long startTime = System.nanoTime();
        long result1 = fibonacciSlow(n);
        long endTime = System.nanoTime();
        System.out.println("Slow Fibonacci(" + n + ") = " + result1 +
                         " took " + (endTime - startTime) / 1000000 + "ms");

        startTime = System.nanoTime();
        long result2 = fibonacci(n);
        endTime = System.nanoTime();
        System.out.println("Memoized Fibonacci(" + n + ") = " + result2 +
                         " took " + (endTime - startTime) / 1000000 + "ms");
    }
}
\`\`\`

---

## ⚡ Tail Recursion Optimization

### **1. Tail Recursive Factorial**
\`\`\`java
public class TailRecursion {
    // Tail recursive factorial helper
    public static long factorialTail(int n, long accumulator) {
        // Base case
        if (n == 0) {
            return accumulator;
        }

        // Tail recursive call
        return factorialTail(n - 1, n * accumulator);
    }

    public static long factorial(int n) {
        return factorialTail(n, 1);
    }

    public static void main(String[] args) {
        System.out.println("Factorial of 5: " + factorial(5)); // 120
    }
}
\`\`\`

### **2. Tail Recursive Sum**
\`\`\`java
public class TailRecursion {
    // Tail recursive array sum
    public static int arraySumTail(int[] arr, int index, int accumulator) {
        // Base case: end of array
        if (index == arr.length) {
            return accumulator;
        }

        // Tail recursive call
        return arraySumTail(arr, index + 1, accumulator + arr[index]);
    }

    public static int arraySum(int[] arr) {
        return arraySumTail(arr, 0, 0);
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        System.out.println("Sum: " + arraySum(arr)); // 15
    }
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Divide & Conquer**: Break problems into subproblems (Merge Sort, Quick Sort)
2. **Backtracking**: Try solutions, undo when they fail (N-Queens, Subsets)
3. **Memoization**: Cache results to avoid recomputation (Fibonacci)
4. **Tail Recursion**: Last operation is recursive call (compiler optimization)
5. **Base Cases**: Always define clear stopping conditions
6. **Problem Analysis**: Identify recursive structure before implementing

**Next:** Learn recursion vs iteration comparison! 🚀`
};
