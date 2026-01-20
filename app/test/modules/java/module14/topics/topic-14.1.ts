import { SubLesson } from '../../../../data/lessonsData';

export const topic_14_1: SubLesson = {
  id: "14.1",
  title: 'Introduction to Recursion',
  status: 'completed',
  content: "`# ðŸ”„ Introduction to Recursion in Java

Recursion is a powerful programming technique where a method calls itself to solve problems!

---

## ðŸŽ¯ What is Recursion?

**Recursion** is a programming technique where a method calls itself directly or indirectly to solve a problem by breaking it down into smaller, similar subproblems.

### **Key Components of Recursion**

#### **1. Base Case**
The condition that stops the recursion - prevents infinite loops!

#### **2. Recursive Case**
The part where the method calls itself with a smaller problem

#### **3. Progress Toward Base Case**
Each recursive call must get closer to the base case

---

## ðŸ“ Simple Recursive Method

### **Factorial Example**
\`"\`\`java
public class RecursionExamples {
    // Recursive factorial method
    public static long factorial(int n) {
        // Base case: factorial of 0 or 1 is 1
        if (n <= 1) {
            return 1;
        }

        // Recursive case: n! = n * (n-1)!
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        System.out.println(factorial(5)); // 120
        System.out.println(factorial(3)); // 6
    }
}
\`\`\`

### **How it works:**
\`\`\`
factorial(5) = 5 * factorial(4)
factorial(4) = 4 * factorial(3)
factorial(3) = 3 * factorial(2)
factorial(2) = 2 * factorial(1)
factorial(1) = 1
factorial(2) = 2 * 1 = 2
factorial(3) = 3 * 2 = 6
factorial(4) = 4 * 6 = 24
factorial(5) = 5 * 24 = 120
\`\`\`

---

## ðŸ›‘ Call Stack

Each recursive call creates a new **stack frame** in memory:

\`\`\`
main()
  factorial(5)
    factorial(4)
      factorial(3)
        factorial(2)
          factorial(1) â† Base case reached
          factorial(2) â† Returns 2
        factorial(3) â† Returns 6
      factorial(4) â† Returns 24
    factorial(5) â† Returns 120
  main() â† Prints result
\`\`\`

---

## âš ï¸ Common Pitfalls

### **1. Missing Base Case**
\`\`\`java
public static int badFactorial(int n) {
    return n * badFactorial(n - 1); // StackOverflowError!
}
\`\`\`

### **2. Wrong Base Case**
\`\`\`java
public static int wrongFactorial(int n) {
    if (n == 2) return 2; // Wrong! Should be 0 or 1
    return n * wrongFactorial(n - 1);
}
\`\`\`

### **3. No Progress to Base Case**
\`\`\`java
public static int infiniteLoop(int n) {
    if (n == 0) return 1;
    return n * infiniteLoop(n); // Never reaches base case!
}
\`\`\`

---

## ðŸ”„ Types of Recursion

### **1. Direct Recursion**
Method calls itself directly:
\`\`\`java
public static void directRecursion(int n) {
    if (n > 0) {
        System.out.println(n);
        directRecursion(n - 1);
    }
}
\`\`\`

### **2. Indirect Recursion**
Method A calls Method B, Method B calls Method A:
\`\`\`java
public static void methodA(int n) {
    if (n > 0) {
        System.out.println("A: " + n);
        methodB(n - 1);
    }
}

public static void methodB(int n) {
    if (n > 0) {
        System.out.println("B: " + n);
        methodA(n - 1);
    }
}
\`\`\`

### **3. Tail Recursion**
Recursive call is the last operation:
\`\`\`java
public static void tailRecursion(int n) {
    if (n > 0) {
        System.out.println(n);
        tailRecursion(n - 1); // Last operation
    }
}
\`\`\`

---

## ðŸŽ¯ When to Use Recursion?

### **Perfect for:**
- **Tree/Graph traversals** (DFS)
- **Divide and conquer algorithms** (Merge Sort, Quick Sort)
- **Problems with recursive structure** (Fibonacci, factorial)
- **Backtracking problems** (N-Queens, Sudoku)

### **Avoid when:**
- **Simple iteration** would work better
- **Deep recursion** (risk of stack overflow)
- **Performance-critical code** (function call overhead)

---

## ðŸ§ª Practice Examples

### **1. Sum of Natural Numbers**
\`\`\`java
public static int sum(int n) {
    if (n == 0) return 0;
    return n + sum(n - 1);
}

// sum(3) = 3 + sum(2) = 3 + (2 + sum(1)) = 3 + (2 + (1 + sum(0))) = 3 + 2 + 1 + 0 = 6
\`\`\`

### **2. Power Function**
\`\`\`java
public static int power(int base, int exp) {
    if (exp == 0) return 1;
    return base * power(base, exp - 1);
}

// power(2, 3) = 2 * power(2, 2) = 2 * (2 * power(2, 1)) = 2 * (2 * (2 * power(2, 0))) = 2 * 2 * 2 * 1 = 8
\`\`\`

---

## ðŸŽ¯ Key Takeaways

1. **Base case** stops recursion and prevents infinite loops
2. **Recursive case** breaks problem into smaller subproblems
3. **Call stack** manages method execution order
4. **Choose recursion** for naturally recursive problems
5. **Consider stack limits** for deep recursion

**Next:** Learn advanced recursion techniques! ðŸš€`
};


