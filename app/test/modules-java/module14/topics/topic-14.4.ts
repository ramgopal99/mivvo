import { SubLesson } from '../../../data/lessonsData';

export const topic_14_4: SubLesson = {
  id: 14.4,
  title: 'Recursion vs Iteration',
  status: 'completed',
  content: `# 🔄 Recursion vs Iteration in Java

Learn when to use recursion and when to prefer iteration!

---

## ⚖️ Comparison Overview

| Aspect | Recursion | Iteration |
|--------|-----------|-----------|
| **Definition** | Function calls itself | Loop structure |
| **Memory** | Stack frames | Constant space |
| **Performance** | Function call overhead | Usually faster |
| **Readability** | Often cleaner | Sometimes more verbose |
| **Debugging** | Harder (deep stack) | Easier (single frame) |

---

## 📊 Performance Analysis

### **1. Time Complexity**
Both can achieve same time complexity, but recursion has overhead:

\`\`\`java
public class PerformanceComparison {
    // Recursive factorial
    public static long factorialRecursive(int n) {
        if (n <= 1) return 1;
        return n * factorialRecursive(n - 1);
    }

    // Iterative factorial
    public static long factorialIterative(int n) {
        long result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    public static void main(String[] args) {
        int n = 20;

        // Time recursive version
        long start = System.nanoTime();
        long result1 = factorialRecursive(n);
        long end = System.nanoTime();
        System.out.println("Recursive: " + result1 + " in " +
                         (end - start) / 1000 + " microseconds");

        // Time iterative version
        start = System.nanoTime();
        long result2 = factorialIterative(n);
        end = System.nanoTime();
        System.out.println("Iterative: " + result2 + " in " +
                         (end - start) / 1000 + " microseconds");
    }
}
\`\`\`

### **2. Space Complexity**
\`\`\`java
public class SpaceComparison {
    // Recursive: O(n) space for call stack
    public static int sumRecursive(int n) {
        if (n == 0) return 0;
        return n + sumRecursive(n - 1); // Each call waits on stack
    }

    // Iterative: O(1) space
    public static int sumIterative(int n) {
        int sum = 0;
        for (int i = 1; i <= n; i++) {
            sum += i; // No additional space needed
        }
        return sum;
    }

    public static void main(String[] args) {
        int n = 100000;

        // Recursive will likely cause StackOverflowError
        try {
            System.out.println("Recursive sum: " + sumRecursive(n));
        } catch (StackOverflowError e) {
            System.out.println("StackOverflowError: Recursion too deep!");
        }

        // Iterative works fine
        System.out.println("Iterative sum: " + sumIterative(n));
    }
}
\`\`\`

---

## 🎯 When to Use Recursion

### **✅ Perfect for Recursion:**

#### **1. Tree and Graph Traversals**
\`\`\`java
// Tree traversal is naturally recursive
public void inorderTraversal(TreeNode node) {
    if (node != null) {
        inorderTraversal(node.left);
        System.out.print(node.value + " ");
        inorderTraversal(node.right);
    }
}
\`\`\`

#### **2. Divide and Conquer Algorithms**
\`\`\`java
// Merge sort naturally divides problem
public void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = (left + right) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}
\`\`\`

#### **3. Problems with Recursive Structure**
- Factorial, Fibonacci
- Tower of Hanoi
- Directory traversal
- Expression evaluation

#### **4. Backtracking Problems**
\`\`\`java
// N-Queens, Sudoku, Maze solving
public boolean solveNQueens(int[][] board, int col) {
    if (col >= N) return true; // Base case

    for (int i = 0; i < N; i++) {
        if (isSafe(board, i, col)) {
            board[i][col] = 1; // Place queen
            if (solveNQueens(board, col + 1)) return true;
            board[i][col] = 0; // Backtrack
        }
    }
    return false;
}
\`\`\`

---

## 🎯 When to Use Iteration

### **✅ Perfect for Iteration:**

#### **1. Simple Loops**
\`\`\`java
// Array operations are naturally iterative
public int findMax(int[] arr) {
    int max = arr[0];
    for (int num : arr) {
        if (num > max) max = num;
    }
    return max;
}
\`\`\`

#### **2. Performance-Critical Code**
\`\`\`java
// Iterative version is faster for large inputs
public long fibonacciIterative(int n) {
    if (n <= 1) return n;
    long a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        long temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}
\`\`\`

#### **3. Large Input Sizes**
- Avoid stack overflow
- Better memory efficiency
- Predictable performance

#### **4. State-Machine Problems**
\`\`\`java
// Finite state machines work well iteratively
public boolean validateString(String s) {
    int state = 0;
    for (char c : s.toCharArray()) {
        switch (state) {
            case 0: state = (c == 'a') ? 1 : 0; break;
            case 1: state = (c == 'b') ? 2 : 0; break;
            case 2: return true; // Valid string "ab"
        }
    }
    return state == 2;
}
\`\`\`

---

## 🔄 Converting Between Recursion and Iteration

### **1. Factorial Example**
\`\`\`java
// Recursive
public long factorialRec(int n) {
    if (n <= 1) return 1;
    return n * factorialRec(n - 1);
}

// Iterative
public long factorialIter(int n) {
    long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
\`\`\`

### **2. Fibonacci Example**
\`\`\`java
// Recursive
public long fibonacciRec(int n) {
    if (n <= 1) return n;
    return fibonacciRec(n - 1) + fibonacciRec(n - 2);
}

// Iterative
public long fibonacciIter(int n) {
    if (n <= 1) return n;
    long a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        long temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}
\`\`\`

### **3. Tree Traversal Example**
\`\`\`java
// Recursive inorder
public void inorderRec(TreeNode node) {
    if (node != null) {
        inorderRec(node.left);
        System.out.print(node.value + " ");
        inorderRec(node.right);
    }
}

// Iterative inorder using stack
public void inorderIter(TreeNode root) {
    Stack<TreeNode> stack = new Stack<>();
    TreeNode current = root;

    while (current != null || !stack.isEmpty()) {
        while (current != null) {
            stack.push(current);
            current = current.left;
        }

        current = stack.pop();
        System.out.print(current.value + " ");
        current = current.right;
    }
}
\`\`\`

---

## 🛠️ Tail Recursion Optimization

### **1. What is Tail Recursion?**
\`\`\`java
// Tail recursive: recursive call is last operation
public int factorialTail(int n, int accumulator) {
    if (n == 0) return accumulator;
    return factorialTail(n - 1, n * accumulator); // Tail call
}

// Not tail recursive: multiplication after recursive call
public int factorialNonTail(int n) {
    if (n == 0) return 1;
    return n * factorialNonTail(n - 1); // Not tail call
}
\`\`\`

### **2. Java and Tail Recursion**
- Java doesn't optimize tail recursion automatically
- But we can manually convert to iteration
- Modern JVMs may optimize simple cases

---

## 🎯 Best Practices

### **Choosing the Right Approach:**

#### **Use Recursion when:**
- Problem has natural recursive structure
- Depth is limited (n < 1000)
- Code clarity is priority
- Working with trees/graphs
- Implementing backtracking

#### **Use Iteration when:**
- Performance is critical
- Working with large datasets
- Simple linear operations
- Memory is limited
- Debugging needs to be easy

#### **Convert Recursion to Iteration when:**
- Stack overflow occurs
- Performance profiling shows recursion as bottleneck
- Need to handle very large inputs

---

## 🔧 Practical Guidelines

### **1. Maximum Recursion Depth**
\`\`\`java
public class RecursionLimits {
    public static void main(String[] args) {
        // Test recursion depth limit
        try {
            testDepth(0);
        } catch (StackOverflowError e) {
            System.out.println("Stack overflow at depth: " + depth);
        }
    }

    static int depth = 0;
    static void testDepth(int n) {
        depth = n;
        testDepth(n + 1);
    }
}
\`\`\`

### **2. Hybrid Approach**
\`\`\`java
// Use recursion for clarity, iteration for performance
public long fibonacci(int n) {
    if (n < 40) {
        return fibonacciRecursive(n); // Small n: recursion OK
    } else {
        return fibonacciIterative(n); // Large n: iteration better
    }
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Recursion**: Clean, natural for trees/graphs, but watch stack limits
2. **Iteration**: Faster, less memory, but can be more complex
3. **Choose wisely**: Based on problem structure and constraints
4. **Convert when needed**: Recursion ↔ Iteration conversion patterns exist
5. **Performance matters**: Profile both approaches for critical code
6. **Depth limits**: Java has ~1000-10000 call stack limit

**Master both techniques for optimal problem-solving!** 🚀`
};
