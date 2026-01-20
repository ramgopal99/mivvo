import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_2: SubLesson = {
  id: "3.2",
  title: 'Loops (while, for, do-while)',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🔄 Loops in C

Loops allow you to repeat code execution multiple times. C provides three main types of loops: \`while\`, \`for\`, and \`do-while\`. Each has its own use cases and advantages.

---

## 🔂 \`while\` Loop

### **Basic while Loop**

\`\`\`c
#include <stdio.h>

int main(void) {
    int count = 1;

    while (count <= 5) {
        printf("Count: %d\\n", count);
        count++;  // Increment counter
    }

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Count: 1
Count: 2
Count: 3
Count: 4
Count: 5
\`\`\`

**How it works:**
1. Check condition (\`count <= 5\`)
2. If true, execute loop body
3. Repeat until condition becomes false

---

## 🔢 \`for\` Loop

### **Basic for Loop**

\`\`\`c
#include <stdio.h>

int main(void) {
    int i;

    for (i = 1; i <= 5; i++) {
        printf("Iteration: %d\\n", i);
    }

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Iteration: 1
Iteration: 2
Iteration: 3
Iteration: 4
Iteration: 5
\`\`\`

### **for Loop Components**

\`\`\`c
for (initialization; condition; increment/decrement) {
    // loop body
}
\`\`\`

**Example breakdown:**
\`\`\`c
for (int i = 0; i < 10; i++) {  // i goes from 0 to 9
    printf("%d ", i);
}
// Output: 0 1 2 3 4 5 6 7 8 9
\`\`\`

---

## 🔄 \`do-while\` Loop

### **Basic do-while Loop**

\`\`\`c
#include <stdio.h>

int main(void) {
    int count = 1;

    do {
        printf("Count: %d\\n", count);
        count++;
    } while (count <= 5);

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Count: 1
Count: 2
Count: 3
Count: 4
Count: 5
\`\`\`

**Key difference:** The body executes **at least once**, even if condition is initially false.

---

## 📊 Loop Comparison

| Loop Type | When to Use | Condition Check | Minimum Executions |
|-----------|-------------|-----------------|-------------------|
| \`while\` | When you don't know iterations in advance | Before body | 0 |
| \`for\` | When you know exact number of iterations | Before body | 0 |
| \`do-while\` | When body must execute at least once | After body | 1 |

---

## 🔧 Loop Control

### **break Statement**

Exits the loop immediately:

\`\`\`c
#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 10; i++) {
        if (i == 6) {
            break;  // Exit loop when i equals 6
        }
        printf("%d ", i);
    }
    printf("\\nLoop ended\\n");

    return 0;
}
\`\`\`

**Output:**
\`\`\`
1 2 3 4 5
Loop ended
\`\`\`

### **continue Statement**

Skips current iteration and continues with next:

\`\`\`c
#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 5; i++) {
        if (i == 3) {
            continue;  // Skip when i equals 3
        }
        printf("%d ", i);
    }
    printf("\\nDone\\n");

    return 0;
}
\`\`\`

**Output:**
\`\`\`
1 2 4 5
Done
\`\`\`

---

## 🧮 Practical Examples

### **Example 1: Sum of Numbers**

\`\`\`c
#include <stdio.h>

int main(void) {
    int n, sum = 0;

    printf("Enter a positive integer: ");
    scanf("%d", &n);

    for (int i = 1; i <= n; i++) {
        sum += i;
    }

    printf("Sum of first %d natural numbers: %d\\n", n, sum);

    return 0;
}
\`\`\`

**Sample Run:**
\`\`\`
Enter a positive integer: 5
Sum of first 5 natural numbers: 15
\`\`\`

### **Example 2: Multiplication Table**

\`\`\`c
#include <stdio.h>

int main(void) {
    int num;

    printf("Enter a number: ");
    scanf("%d", &num);

    printf("Multiplication table of %d:\\n", num);
    for (int i = 1; i <= 10; i++) {
        printf("%d × %d = %d\\n", num, i, num * i);
    }

    return 0;
}
\`\`\`

### **Example 3: Factorial Calculation**

\`\`\`c
#include <stdio.h>

int main(void) {
    int n;
    long long factorial = 1;

    printf("Enter a positive integer: ");
    scanf("%d", &n);

    if (n < 0) {
        printf("Factorial of negative number doesn't exist.\\n");
    } else {
        for (int i = 1; i <= n; i++) {
            factorial *= i;
        }
        printf("Factorial of %d = %lld\\n", n, factorial);
    }

    return 0;
}
\`\`\`

### **Example 4: Number Guessing Game**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void) {
    int secret, guess, attempts = 0;

    // Generate random number between 1 and 100
    srand(time(0));
    secret = (rand() % 100) + 1;

    printf("Guess the number (1-100):\\n");

    do {
        printf("Enter your guess: ");
        scanf("%d", &guess);
        attempts++;

        if (guess > secret) {
            printf("Too high!\\n");
        } else if (guess < secret) {
            printf("Too low!\\n");
        } else {
            printf("Congratulations! You guessed it in %d attempts.\\n", attempts);
        }
    } while (guess != secret);

    return 0;
}
\`\`\`

### **Example 5: Prime Number Check**

\`\`\`c
#include <stdio.h>

int main(void) {
    int n, isPrime = 1;

    printf("Enter a positive integer: ");
    scanf("%d", &n);

    if (n <= 1) {
        isPrime = 0;
    } else {
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                isPrime = 0;
                break;
            }
        }
    }

    if (isPrime) {
        printf("%d is a prime number.\\n", n);
    } else {
        printf("%d is not a prime number.\\n", n);
    }

    return 0;
}
\`\`\`

---

## 🔄 Nested Loops

### **Multiplication Table Grid**

\`\`\`c
#include <stdio.h>

int main(void) {
    printf("Multiplication Table (1-5):\\n\\n");

    for (int i = 1; i <= 5; i++) {
        for (int j = 1; j <= 5; j++) {
            printf("%3d ", i * j);
        }
        printf("\\n");
    }

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Multiplication Table (1-5):

  1   2   3   4   5
  2   4   6   8  10
  3   6   9  12  15
  4   8  12  16  20
  5  10  15  20  25
\`\`\`

---

## ⚠️ Common Loop Mistakes

### **Infinite Loops**

\`\`\`c
// ❌ Infinite loop: condition never becomes false
while (1) {  // Always true
    printf("This will run forever!\\n");
}

// ❌ Missing increment
int i = 0;
while (i < 5) {
    printf("%d ", i);
    // Forgot: i++;
}
\`\`\`

### **Off-by-One Errors**

\`\`\`c
// ❌ Off-by-one: loops 11 times instead of 10
for (int i = 0; i <= 10; i++) {
    printf("%d ", i);  // Prints 0 to 10
}

// ✅ Correct: loops 10 times
for (int i = 0; i < 10; i++) {
    printf("%d ", i);  // Prints 0 to 9
}
\`\`\`

### **Wrong Loop Type**

\`\`\`c
// ❌ Using while when for would be better
int i = 0;
while (i < 10) {
    printf("%d ", i);
    i++;
}

// ✅ Cleaner with for
for (int i = 0; i < 10; i++) {
    printf("%d ", i);
}
\`\`\`

---

## 🎯 Loop Best Practices

1. **Use \`for\` loops** when you know the number of iterations
2. **Use \`while\` loops** when condition depends on runtime data
3. **Use \`do-while\` loops** when body must execute at least once
4. **Initialize loop variables** properly
5. **Update loop variables** correctly to avoid infinite loops
6. **Use meaningful variable names** (\`i\`, \`j\`, \`k\` for simple counters)
7. **Consider loop efficiency** - minimize work inside loops
8. **Use \`break\` and \`continue\`** judiciously

---

## 🎓 Key Takeaways

1. **\`while\` loop** - checks condition before execution (0+ times)
2. **\`for\` loop** - initialization, condition, increment in one line (0+ times)
3. **\`do-while\` loop** - checks condition after execution (1+ times)
4. **\`break\`** exits the loop completely
5. **\`continue\`** skips current iteration
6. **Nested loops** execute inner loop for each outer loop iteration
7. **Avoid infinite loops** by ensuring termination conditions

Master loops to handle repetitive tasks efficiently! 🔄✨`;
    return contentString;
  })()
};
