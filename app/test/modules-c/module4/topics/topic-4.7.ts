import { SubLesson } from '../../../data/lessonsData';

export const topic_4_7: SubLesson = {
  id: 4.7,
  title: 'Recursive Functions',
  status: 'completed',
  content: `# 🔄 Recursive Functions

Master the art of functions that call themselves. Recursion can solve complex problems with elegant, concise code.

---

## 🎯 What is Recursion?

**Recursion is when a function calls itself to solve a problem by breaking it down into smaller, similar subproblems.**

### Classic Example: Factorial

\`\`\`c
#include <stdio.h>

// Recursive factorial function
int factorial(int n) {
    if (n <= 1) {
        return 1;  // Base case
    } else {
        return n * factorial(n - 1);  // Recursive call
    }
}

int main() {
    printf("5! = %d\\n", factorial(5));  // 120
    printf("3! = %d\\n", factorial(3));  // 6
    return 0;
}
\`\`\`

**How it works:**
- \`factorial(5)\` = 5 × \`factorial(4)\`
- \`factorial(4)\` = 4 × \`factorial(3)\`
- \`factorial(3)\` = 3 × \`factorial(2)\`
- \`factorial(2)\` = 2 × \`factorial(1)\`
- \`factorial(1)\` = 1 (base case)
- Result: 5 × 4 × 3 × 2 × 1 = 120

---

## 🏗️ Components of Recursive Functions

### 1. Base Case
**The condition that stops the recursion.**

\`\`\`c
int factorial(int n) {
    if (n <= 1) {        // Base case: when to stop
        return 1;
    }
    return n * factorial(n - 1);  // Recursive case
}
\`\`\`

### 2. Recursive Case
**The part that calls the function again with a smaller problem.**

\`\`\`c
int factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);  // Calls itself with n-1
}
\`\`\`

### 3. Progress Toward Base Case
**Each recursive call must get closer to the base case.**

\`\`\`c
// ✅ Good: n decreases toward 0
int sum(int n) {
    if (n == 0) return 0;
    return n + sum(n - 1);
}

// ❌ Bad: n stays the same or increases
int bad_function(int n) {
    if (n == 0) return 0;
    return n + bad_function(n);  // Infinite recursion!
}
\`\`\`

---

## 🧪 Classic Recursive Examples

### Fibonacci Sequence

\`\`\`c
#include <stdio.h>

int fibonacci(int n) {
    if (n <= 1) {
        return n;  // Base cases: fib(0) = 0, fib(1) = 1
    }
    return fibonacci(n - 1) + fibonacci(n - 2);  // Recursive case
}

int main() {
    printf("Fibonacci sequence:\\n");
    for (int i = 0; i < 10; i++) {
        printf("fib(%d) = %d\\n", i, fibonacci(i));
    }
    return 0;
}
\`\`\`

**Output:**
\`\`\`
Fibonacci sequence:
fib(0) = 0
fib(1) = 1
fib(2) = 1
fib(3) = 2
fib(4) = 3
fib(5) = 5
fib(6) = 8
fib(7) = 13
fib(8) = 21
fib(9) = 34
\`\`\`

### Binary Search (Recursive)

\`\`\`c
#include <stdio.h>

int binary_search(int arr[], int left, int right, int target) {
    if (left > right) {
        return -1;  // Base case: not found
    }

    int mid = left + (right - left) / 2;

    if (arr[mid] == target) {
        return mid;  // Base case: found
    } else if (arr[mid] > target) {
        return binary_search(arr, left, mid - 1, target);  // Search left half
    } else {
        return binary_search(arr, mid + 1, right, target);  // Search right half
    }
}

int main() {
    int arr[] = {1, 3, 5, 7, 9, 11, 13, 15};
    int size = sizeof(arr) / sizeof(arr[0]);

    int target = 7;
    int result = binary_search(arr, 0, size - 1, target);

    if (result != -1) {
        printf("%d found at index %d\\n", target, result);
    } else {
        printf("%d not found\\n", target);
    }

    return 0;
}
\`\`\`

### Tower of Hanoi

\`\`\`c
#include <stdio.h>

void tower_of_hanoi(int n, char from_rod, char to_rod, char aux_rod) {
    if (n == 1) {
        printf("Move disk 1 from %c to %c\\n", from_rod, to_rod);
        return;
    }

    // Move n-1 disks from A to B using C as auxiliary
    tower_of_hanoi(n - 1, from_rod, aux_rod, to_rod);

    // Move nth disk from A to C
    printf("Move disk %d from %c to %c\\n", n, from_rod, to_rod);

    // Move n-1 disks from B to C using A as auxiliary
    tower_of_hanoi(n - 1, aux_rod, to_rod, from_rod);
}

int main() {
    int n = 3;  // Number of disks
    printf("Tower of Hanoi solution for %d disks:\\n\\n", n);
    tower_of_hanoi(n, 'A', 'C', 'B');  // A = source, C = destination, B = auxiliary

    return 0;
}
\`\`\`

---

## 🔄 Recursion vs Iteration

### Recursive Sum

\`\`\`c
// Recursive approach
int recursive_sum(int n) {
    if (n == 0) return 0;
    return n + recursive_sum(n - 1);
}
\`\`\`

### Iterative Sum

\`\`\`c
// Iterative approach
int iterative_sum(int n) {
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
\`\`\`

### When to Use Recursion

| **Use Recursion When:** | **Use Iteration When:** |
|--------------------------|--------------------------|
| Problem breaks into similar subproblems | Simple counting/loops |
| Natural recursive structure (trees, graphs) | Performance is critical |
| Code clarity is more important than efficiency | Limited stack space |
| Working with recursive data structures | Need to modify loop variables |

---

## 🛡️ Handling Recursion Dangers

### Stack Overflow

\`\`\`c
#include <stdio.h>

// ❌ Dangerous: no base case or wrong condition
void infinite_recursion(int n) {
    printf("%d\\n", n);
    infinite_recursion(n + 1);  // Stack overflow!
}

int main() {
    // infinite_recursion(1);  // Don't run this!
    return 0;
}
\`\`\`

### Maximum Recursion Depth

\`\`\`c
#include <stdio.h>

void limited_recursion(int n, int max_depth) {
    if (n >= max_depth) {
        printf("Maximum depth reached\\n");
        return;
    }

    printf("Depth: %d\\n", n);
    limited_recursion(n + 1, max_depth);
}

int main() {
    limited_recursion(1, 10);  // Safe with depth limit
    return 0;
}
\`\`\`

### Tail Recursion

\`\`\`c
// ✅ Tail recursive: recursive call is the last operation
int factorial_tail(int n, int accumulator) {
    if (n <= 1) {
        return accumulator;
    }
    return factorial_tail(n - 1, n * accumulator);  // Tail call
}

// ❌ Not tail recursive: multiplication after recursive call
int factorial_not_tail(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial_not_tail(n - 1);  // Multiplication after call
}

int main() {
    printf("Tail recursive: %d\\n", factorial_tail(5, 1));
    printf("Not tail recursive: %d\\n", factorial_not_tail(5));
    return 0;
}
\`\`\`

---

## 🧪 Advanced Recursive Techniques

### Indirect Recursion (Mutual Recursion)

\`\`\`c
#include <stdio.h>

// Function prototypes for mutual recursion
void function_a(int n);
void function_b(int n);

void function_a(int n) {
    if (n > 0) {
        printf("A: %d\\n", n);
        function_b(n - 1);  // Calls function_b
    }
}

void function_b(int n) {
    if (n > 0) {
        printf("B: %d\\n", n);
        function_a(n - 1);  // Calls function_a
    }
}

int main() {
    function_a(5);
    return 0;
}
\`\`\`

**Output:**
\`\`\`
A: 5
B: 4
A: 3
B: 2
A: 1
\`\`\`

### Nested Recursion

\`\`\`c
#include <stdio.h>

// Nested recursion: function calls itself with recursive result
int nested_recursion(int n) {
    if (n > 100) {
        return n - 10;
    }
    return nested_recursion(nested_recursion(n + 11));
}

int main() {
    for (int i = 0; i <= 10; i++) {
        printf("nested_recursion(%d) = %d\\n", i, nested_recursion(i));
    }
    return 0;
}
\`\`\`

### Memoization (Optimization)

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

#define MAX_N 100
long long memo[MAX_N];

// Recursive Fibonacci with memoization
long long fibonacci_memo(int n) {
    if (n <= 1) {
        return n;
    }

    if (memo[n] != -1) {
        return memo[n];  // Return cached result
    }

    memo[n] = fibonacci_memo(n - 1) + fibonacci_memo(n - 2);
    return memo[n];
}

int main() {
    // Initialize memo array
    for (int i = 0; i < MAX_N; i++) {
        memo[i] = -1;
    }

    printf("Fibonacci numbers:\\n");
    for (int i = 0; i < 50; i++) {
        printf("fib(%d) = %lld\\n", i, fibonacci_memo(i));
    }

    return 0;
}
\`\`\`

---

## 🎯 Common Recursive Algorithms

### Tree Traversal (Conceptual)

\`\`\`c
// Conceptual tree structure
typedef struct Node {
    int data;
    struct Node* left;
    struct Node* right;
} Node;

// Inorder traversal
void inorder_traversal(Node* root) {
    if (root != NULL) {
        inorder_traversal(root->left);    // Visit left subtree
        printf("%d ", root->data);        // Visit root
        inorder_traversal(root->right);   // Visit right subtree
    }
}
\`\`\`

### String Reversal

\`\`\`c
#include <stdio.h>
#include <string.h>

void reverse_string(char str[], int start, int end) {
    if (start >= end) {
        return;  // Base case
    }

    // Swap characters
    char temp = str[start];
    str[start] = str[end];
    str[end] = temp;

    // Recurse for remaining string
    reverse_string(str, start + 1, end - 1);
}

int main() {
    char str[] = "Hello, World!";
    printf("Original: %s\\n", str);

    reverse_string(str, 0, strlen(str) - 1);
    printf("Reversed: %s\\n", str);

    return 0;
}
\`\`\`

### GCD (Greatest Common Divisor)

\`\`\`c
#include <stdio.h>

// Recursive GCD using Euclidean algorithm
int gcd(int a, int b) {
    if (b == 0) {
        return a;  // Base case
    }
    return gcd(b, a % b);  // Recursive case
}

int main() {
    printf("GCD of 48 and 18: %d\\n", gcd(48, 18));
    printf("GCD of 100 and 75: %d\\n", gcd(100, 75));
    printf("GCD of 17 and 13: %d\\n", gcd(17, 13));  // Prime numbers

    return 0;
}
\`\`\`

### Power Function

\`\`\`c
#include <stdio.h>

// Recursive power function
double power(double base, int exponent) {
    if (exponent == 0) {
        return 1.0;  // Base case: x^0 = 1
    }

    if (exponent < 0) {
        return 1.0 / power(base, -exponent);  // Handle negative exponents
    }

    return base * power(base, exponent - 1);  // Recursive case
}

int main() {
    printf("2^5 = %.0f\\n", power(2, 5));
    printf("3^4 = %.0f\\n", power(3, 4));
    printf("2^-3 = %.4f\\n", power(2, -3));

    return 0;
}
\`\`\`

---

## 🐛 Recursion Pitfalls and Solutions

### Multiple Recursion Calls

\`\`\`c
// ❌ Expensive: fibonacci calls itself twice each time
int fibonacci_bad(int n) {
    if (n <= 1) return n;
    return fibonacci_bad(n - 1) + fibonacci_bad(n - 2);  // Two calls!
}

// ✅ Better: memoization
#define MAX_FIB 100
long long fib_memo[MAX_FIB];

long long fibonacci_good(int n) {
    if (n <= 1) return n;
    if (fib_memo[n] != -1) return fib_memo[n];

    fib_memo[n] = fibonacci_good(n - 1) + fibonacci_good(n - 2);
    return fib_memo[n];
}
\`\`\`

### Converting Recursion to Iteration

\`\`\`c
// Recursive factorial
int factorial_rec(int n) {
    if (n <= 1) return 1;
    return n * factorial_rec(n - 1);
}

// Iterative factorial (more efficient)
int factorial_iter(int n) {
    int result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Recursion** breaks problems into smaller subproblems
2. **Base case** stops the recursion, **recursive case** continues it
3. **Each call** must progress toward the base case
4. **Stack overflow** occurs with too many recursive calls
5. **Tail recursion** can be optimized by compilers
6. **Memoization** caches results to improve performance
7. **Choose recursion** when the problem has natural recursive structure
8. **Consider iteration** when performance or stack limits are concerns

---

## 🚀 Module 4 Complete!

**Congratulations!** You've mastered functions in C:

- ✅ **Function introduction** and why they matter
- ✅ **Declarations and definitions** with prototypes
- ✅ **Parameters and arguments** (pass by value/reference)
- ✅ **Return values and types** (void, int, pointers, etc.)
- ✅ **Function prototypes** and header files
- ✅ **Scope and lifetime** of variables
- ✅ **Recursive functions** and their applications

**Ready for Module 5: Arrays and Strings?** Arrays let you work with collections of data, and strings are arrays of characters! 📊`
};
