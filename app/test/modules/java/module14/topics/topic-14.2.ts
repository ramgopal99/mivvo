import { SubLesson } from '../../../../data/lessonsData';

export const topic_14_2: SubLesson = {
  id: "14.2",
  title: 'Recursion with Arrays & Strings',
  status: 'completed',
  content: "`# ðŸ”„ Recursion with Arrays & Strings in Java

Learn how to solve array and string problems using recursive techniques!

---

## ðŸŽ¯ Array Recursion

### **1. Array Sum (Linear Recursion)**
\`"\`\`java
public class ArrayRecursion {
    // Recursive sum of array elements
    public static int arraySum(int[] arr, int index) {
        // Base case: end of array
        if (index == arr.length) {
            return 0;
        }

        // Recursive case: current element + sum of rest
        return arr[index] + arraySum(arr, index + 1);
    }

    // Wrapper method for easier use
    public static int arraySum(int[] arr) {
        return arraySum(arr, 0);
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        System.out.println("Sum: " + arraySum(arr)); // 15
    }
}
\`\`\`

### **2. Find Maximum Element**
\`\`\`java
public class ArrayRecursion {
    // Find maximum element recursively
    public static int findMax(int[] arr, int index, int currentMax) {
        // Base case: end of array
        if (index == arr.length) {
            return currentMax;
        }

        // Recursive case: compare current with max of rest
        int newMax = Math.max(currentMax, arr[index]);
        return findMax(arr, index + 1, newMax);
    }

    public static int findMax(int[] arr) {
        if (arr.length == 0) return Integer.MIN_VALUE;
        return findMax(arr, 0, arr[0]);
    }

    public static void main(String[] args) {
        int[] arr = {3, 7, 2, 9, 1};
        System.out.println("Max: " + findMax(arr)); // 9
    }
}
\`\`\`

### **3. Check if Array is Sorted**
\`\`\`java
public class ArrayRecursion {
    // Check if array is sorted in ascending order
    public static boolean isSorted(int[] arr, int index) {
        // Base case: single element or empty array
        if (index >= arr.length - 1) {
            return true;
        }

        // Check current pair and recurse
        if (arr[index] > arr[index + 1]) {
            return false;
        }

        return isSorted(arr, index + 1);
    }

    public static boolean isSorted(int[] arr) {
        return arr.length <= 1 || isSorted(arr, 0);
    }

    public static void main(String[] args) {
        int[] sorted = {1, 2, 3, 4, 5};
        int[] unsorted = {1, 3, 2, 4, 5};

        System.out.println("Sorted: " + isSorted(sorted));     // true
        System.out.println("Unsorted: " + isSorted(unsorted)); // false
    }
}
\`\`\`

---

## ðŸ”¤ String Recursion

### **1. String Length**
\`\`\`java
public class StringRecursion {
    // Calculate string length recursively
    public static int stringLength(String str) {
        // Base case: empty string
        if (str.isEmpty()) {
            return 0;
        }

        // Recursive case: 1 + length of substring
        return 1 + stringLength(str.substring(1));
    }

    public static void main(String[] args) {
        String str = "Hello";
        System.out.println("Length: " + stringLength(str)); // 5
    }
}
\`\`\`

### **2. Check Palindrome**
\`\`\`java
public class StringRecursion {
    // Check if string is palindrome
    public static boolean isPalindrome(String str, int start, int end) {
        // Base case: single character or empty
        if (start >= end) {
            return true;
        }

        // Check first and last characters
        if (str.charAt(start) != str.charAt(end)) {
            return false;
        }

        // Recursive case: check inner substring
        return isPalindrome(str, start + 1, end - 1);
    }

    public static boolean isPalindrome(String str) {
        if (str == null) return false;
        return isPalindrome(str, 0, str.length() - 1);
    }

    public static void main(String[] args) {
        System.out.println(isPalindrome("radar"));    // true
        System.out.println(isPalindrome("hello"));    // false
        System.out.println(isPalindrome("a"));        // true
        System.out.println(isPalindrome(""));         // true
    }
}
\`\`\`

### **3. Print All Substrings**
\`\`\`java
public class StringRecursion {
    // Print all possible substrings
    public static void printSubstrings(String str, int start, int end) {
        // Base case: invalid range
        if (start > end) {
            return;
        }

        // Print current substring
        System.out.println(str.substring(start, end + 1));

        // Try next starting position
        if (start < str.length() - 1) {
            printSubstrings(str, start + 1, end);
        }
    }

    public static void printAllSubstrings(String str) {
        for (int len = 1; len <= str.length(); len++) {
            for (int start = 0; start <= str.length() - len; start++) {
                printSubstrings(str, start, start + len - 1);
            }
        }
    }

    public static void main(String[] args) {
        printAllSubstrings("abc");
        // Output: a, b, c, ab, bc, abc
    }
}
\`\`\`

### **4. Reverse String**
\`\`\`java
public class StringRecursion {
    // Reverse string recursively
    public static String reverseString(String str) {
        // Base case: empty or single character
        if (str.length() <= 1) {
            return str;
        }

        // Recursive case: last char + reverse of rest
        return str.charAt(str.length() - 1) +
               reverseString(str.substring(0, str.length() - 1));
    }

    public static void main(String[] args) {
        System.out.println(reverseString("hello")); // "olleh"
        System.out.println(reverseString("Java"));  // "avaJ"
    }
}
\`\`\`

---

## ðŸ” Search Problems

### **1. Linear Search (Recursive)**
\`\`\`java
public class SearchRecursion {
    // Recursive linear search
    public static int linearSearch(int[] arr, int target, int index) {
        // Base case: element not found
        if (index >= arr.length) {
            return -1;
        }

        // Base case: element found
        if (arr[index] == target) {
            return index;
        }

        // Recursive case: search in rest of array
        return linearSearch(arr, target, index + 1);
    }

    public static int linearSearch(int[] arr, int target) {
        return linearSearch(arr, target, 0);
    }

    public static void main(String[] args) {
        int[] arr = {3, 7, 2, 9, 1};
        System.out.println("Index of 9: " + linearSearch(arr, 9)); // 3
        System.out.println("Index of 5: " + linearSearch(arr, 5)); // -1
    }
}
\`\`\`

### **2. Binary Search (Recursive)**
\`\`\`java
public class SearchRecursion {
    // Recursive binary search (array must be sorted)
    public static int binarySearch(int[] arr, int target, int left, int right) {
        // Base case: element not found
        if (left > right) {
            return -1;
        }

        int mid = left + (right - left) / 2;

        // Base case: element found
        if (arr[mid] == target) {
            return mid;
        }

        // Recursive case: search left or right half
        if (target < arr[mid]) {
            return binarySearch(arr, target, left, mid - 1);
        } else {
            return binarySearch(arr, target, mid + 1, right);
        }
    }

    public static int binarySearch(int[] arr, int target) {
        return binarySearch(arr, target, 0, arr.length - 1);
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 7, 9};
        System.out.println("Index of 4: " + binarySearch(arr, 4)); // 3
        System.out.println("Index of 6: " + binarySearch(arr, 6)); // -1
    }
}
\`\`\`

---

## ðŸ”¢ Pattern Recognition

### **1. Print Pattern**
\`\`\`java
public class PatternRecursion {
    // Print triangle pattern
    public static void printTriangle(int n, int current) {
        // Base case
        if (current > n) {
            return;
        }

        // Print current row
        for (int i = 0; i < current; i++) {
            System.out.print("* ");
        }
        System.out.println();

        // Recursive call for next row
        printTriangle(n, current + 1);
    }

    public static void printTriangle(int n) {
        printTriangle(n, 1);
    }

    public static void main(String[] args) {
        printTriangle(4);
        // Output:
        // *
        // * *
        // * * *
        // * * * *
    }
}
\`\`\`

### **2. Print Numbers in Range**
\`\`\`java
public class NumberRecursion {
    // Print numbers from start to end
    public static void printRange(int start, int end) {
        // Base case
        if (start > end) {
            return;
        }

        System.out.print(start + " ");
        printRange(start + 1, end);
    }

    // Print numbers from end to start
    public static void printRangeReverse(int start, int end) {
        // Base case
        if (start > end) {
            return;
        }

        printRangeReverse(start + 1, end);
        System.out.print(start + " ");
    }

    public static void main(String[] args) {
        System.out.print("Forward: ");
        printRange(1, 5); // 1 2 3 4 5
        System.out.println();

        System.out.print("Reverse: ");
        printRangeReverse(1, 5); // 5 4 3 2 1
        System.out.println();
    }
}
\`\`\`

---

## ðŸŽ¯ Key Takeaways

1. **Array problems**: Use index parameter to track position
2. **String problems**: Use substring() or start/end indices
3. **Search problems**: Choose binary search for sorted arrays
4. **Pattern problems**: Use parameters to control output
5. **Base cases**: Always handle empty/null inputs
6. **Recursive cases**: Break problem into smaller subproblems

**Next:** Learn advanced recursion techniques! ðŸš€`
};


