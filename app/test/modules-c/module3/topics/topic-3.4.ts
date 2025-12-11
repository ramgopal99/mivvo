import { SubLesson } from '../../../data/lessonsData';

export const topic_3_4: SubLesson = {
  id: 3.4,
  title: 'for Loops',
  status: 'completed',
  content: `# 🔁 for Loops

Master fixed-iteration loops in C using for statements to repeat code a specific number of times.

---

## 📋 Basic for Loop Syntax

### Structure
\`\`\`c
for (initialization; condition; increment/decrement) {
    // Code to repeat
    statement1;
    statement2;
}
\`\`\`

### Simple Counting Example
\`\`\`c
#include <stdio.h>

int main() {
    // Count from 1 to 5
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\\n");

    return 0;
}
\`\`\`

**Output:**
\`\`\`
1 2 3 4 5
\`\`\`

---

## 🔍 for Loop Components

### 1. Initialization
**Executed once at the start**
\`\`\`c
// Initialize counter variable
for (int i = 0; /* ... */)

// Initialize multiple variables
for (int i = 0, j = 10; /* ... */)

// Use existing variable
int counter = 5;
for (counter = 0; /* ... */)
\`\`\`

### 2. Condition
**Checked before each iteration**
\`\`\`c
// Loop while condition is true
for (int i = 0; i < 10; /* ... */)  // Loops 10 times (0-9)

for (int i = 1; i <= 10; /* ... */) // Loops 10 times (1-10)

for (int i = 10; i > 0; /* ... */)  // Loops 10 times (10-1)
\`\`\`

### 3. Increment/Decrement
**Executed after each iteration**
\`\`\`c
// Increment by 1
for (int i = 0; i < 5; i++)

// Increment by 2
for (int i = 0; i < 10; i += 2)

// Decrement
for (int i = 10; i > 0; i--)

// Complex increment
for (int i = 0; i < 100; i = i * 2 + 1)
\`\`\`

---

## 🧪 Practical Examples

### Sum Calculation
\`\`\`c
#include <stdio.h>

int main() {
    int sum = 0;
    int n = 10;

    // Calculate sum of first n natural numbers
    for (int i = 1; i <= n; i++) {
        sum += i;
    }

    printf("Sum of first %d natural numbers: %d\\n", n, sum);
    return 0;
}
\`\`\`

**Output:**
\`\`\`
Sum of first 10 natural numbers: 55
\`\`\`

### Multiplication Table
\`\`\`c
#include <stdio.h>

int main() {
    int number = 5;

    printf("Multiplication table for %d:\\n", number);
    for (int i = 1; i <= 10; i++) {
        printf("%d × %d = %d\\n", number, i, number * i);
    }

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Multiplication table for 5:
5 × 1 = 5
5 × 2 = 10
5 × 3 = 15
5 × 4 = 20
5 × 5 = 25
5 × 6 = 30
5 × 7 = 35
5 × 8 = 40
5 × 9 = 45
5 × 10 = 50
\`\`\`

### Array Processing
\`\`\`c
#include <stdio.h>

int main() {
    int numbers[] = {10, 20, 30, 40, 50};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    printf("Array elements:\\n");
    for (int i = 0; i < size; i++) {
        printf("Index %d: %d\\n", i, numbers[i]);
    }

    return 0;
}
\`\`\`

---

## 🔄 Loop Control Flow

### How for Loop Executes
\`\`\`c
for (int i = 1; i <= 3; i++) {
    printf("Iteration %d\\n", i);
}

/*
Execution order:
1. int i = 1;          // Initialization (once)
2. i <= 3;             // Check condition (true)
3. printf("Iteration 1"); // Execute body
4. i++ (i becomes 2)   // Increment
5. i <= 3;             // Check condition (true)
6. printf("Iteration 2"); // Execute body
7. i++ (i becomes 3)   // Increment
8. i <= 3;             // Check condition (true)
9. printf("Iteration 3"); // Execute body
10. i++ (i becomes 4)  // Increment
11. i <= 3;            // Check condition (false)
12. Exit loop
*/
\`\`\`

### Infinite Loop (Careful!)
\`\`\`c
// ❌ Infinite loop - no condition change
for (int i = 1; ; i++) {
    printf("%d ", i);
}

// ❌ Infinite loop - condition always true
for (int i = 1; i > 0; i++) {
    printf("%d ", i);
}

// ❌ Infinite loop - no increment
for (int i = 1; i <= 10; ) {
    printf("%d ", i);
}
\`\`\`

---

## 🏗️ Advanced for Loop Patterns

### Multiple Variables
\`\`\`c
#include <stdio.h>

int main() {
    // Multiple initialization and increment
    for (int i = 0, j = 10; i < 5; i++, j--) {
        printf("i=%d, j=%d\\n", i, j);
    }

    return 0;
}
\`\`\`

**Output:**
\`\`\`
i=0, j=10
i=1, j=9
i=2, j=8
i=3, j=7
i=4, j=6
\`\`\`

### Empty Sections
\`\`\`c
#include <stdio.h>

int main() {
    int i = 0;

    // Initialization outside loop
    for (; i < 5; i++) {
        printf("%d ", i);
    }
    printf("\\n");

    // All parts empty - infinite loop (don't do this!)
    // for (;;) {
    //     printf("Infinite!\\n");
    // }

    return 0;
}
\`\`\`

### Nested Loops
\`\`\`c
#include <stdio.h>

int main() {
    // Multiplication table grid
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 3; j++) {
            printf("%d×%d=%d ", i, j, i*j);
        }
        printf("\\n");
    }

    return 0;
}
\`\`\`

**Output:**
\`\`\`
1×1=1 1×2=2 1×3=3
2×1=2 2×2=4 2×3=6
3×1=3 3×2=6 3×3=9
\`\`\`

---

## 🔢 Common for Loop Patterns

### Counting Up
\`\`\`c
// 0 to n-1 (common for arrays)
for (int i = 0; i < n; i++) {
    // process element i
}

// 1 to n (natural counting)
for (int i = 1; i <= n; i++) {
    // process number i
}
\`\`\`

### Counting Down
\`\`\`c
// n-1 to 0
for (int i = n-1; i >= 0; i--) {
    // process element i
}

// n to 1
for (int i = n; i >= 1; i--) {
    // process number i
}
\`\`\`

### Stepping
\`\`\`c
// Even numbers
for (int i = 0; i <= 10; i += 2) {
    printf("%d ", i);
}

// Odd numbers
for (int i = 1; i <= 10; i += 2) {
    printf("%d ", i);
}
\`\`\`

---

## 🐛 Common for Loop Mistakes

### Off-by-One Errors
\`\`\`c
int array[10];

// ❌ Access beyond array bounds
for (int i = 0; i <= 10; i++) {  // i goes to 10!
    array[i] = 0;  // Error when i=10
}

// ✅ Correct range
for (int i = 0; i < 10; i++) {
    array[i] = 0;
}
\`\`\`

### Missing Braces
\`\`\`c
// ❌ Only first statement is looped
for (int i = 0; i < 3; i++)
    printf("Count: %d\\n", i);
    printf("This is not looped!\\n");  // Executes only once

// ✅ Correct
for (int i = 0; i < 3; i++) {
    printf("Count: %d\\n", i);
    printf("This is looped too!\\n");
}
\`\`\`

### Modifying Loop Variable Inside Loop
\`\`\`c
// ❌ Dangerous - modifying loop counter inside loop
for (int i = 0; i < 10; i++) {
    if (someCondition) {
        i = 5;  // Messes up loop control
    }
}

// ✅ Better approach
for (int i = 0; i < 10; i++) {
    if (someCondition) {
        // Handle condition without modifying i
        break;  // or continue
    }
}
\`\`\`

---

## 🧪 Complex Examples

### Prime Number Checker
\`\`\`c
#include <stdio.h>
#include <stdbool.h>

int main() {
    int number;
    bool isPrime = true;

    printf("Enter a positive integer: ");
    scanf("%d", &number);

    if (number <= 1) {
        isPrime = false;
    } else {
        for (int i = 2; i * i <= number; i++) {
            if (number % i == 0) {
                isPrime = false;
                break;
            }
        }
    }

    if (isPrime) {
        printf("%d is a prime number.\\n", number);
    } else {
        printf("%d is not a prime number.\\n", number);
    }

    return 0;
}
\`\`\`

### Factorial Calculator
\`\`\`c
#include <stdio.h>

int main() {
    int n;
    long long factorial = 1;

    printf("Enter a positive integer: ");
    scanf("%d", &n);

    if (n < 0) {
        printf("Error: Factorial of negative number doesn't exist.\\n");
    } else {
        for (int i = 1; i <= n; i++) {
            factorial *= i;
        }
        printf("Factorial of %d = %lld\\n", n, factorial);
    }

    return 0;
}
\`\`\`

### Pattern Printing
\`\`\`c
#include <stdio.h>

int main() {
    int rows = 5;

    // Right triangle pattern
    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= i; j++) {
            printf("* ");
        }
        printf("\\n");
    }

    printf("\\n");

    // Number pattern
    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= i; j++) {
            printf("%d ", j);
        }
        printf("\\n");
    }

    return 0;
}
\`\`\`

**Output:**
\`\`\`
*
* *
* * *
* * * *
* * * * *

1
1 2
1 2 3
1 2 3 4
1 2 3 4 5
\`\`\`

---

## 🎯 Key Takeaways

1. **for loops** repeat code a fixed number of times
2. **Initialization** sets up loop variables
3. **Condition** determines when to continue looping
4. **Increment** updates loop variables each iteration
5. **Use for loops** when you know the number of iterations
6. **Avoid modifying** the loop counter inside the loop
7. **Watch for off-by-one** errors in loop bounds

---

## 🚀 Preview: while and do-while Loops

In the next topic, you'll learn about:
- **while loops** for condition-based repetition
- **do-while loops** that execute at least once
- **Converting between** for, while, and do-while loops
- **When to use each** type of loop

**for loops count iterations - while loops check conditions!** 🔄`
};
