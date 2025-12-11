import { SubLesson } from '../../../data/lessonsData';

export const topic_3_5: SubLesson = {
  id: 3.5,
  title: 'while and do-while Loops',
  status: 'completed',
  content: `# 🔄 while and do-while Loops

Learn condition-based loops in C that repeat until a condition becomes false.

---

## 📋 while Loop Syntax

### Basic Structure
\`\`\`c
while (condition) {
    // Code to repeat while condition is true
    statement1;
    statement2;
    // Don't forget to change the condition!
}
\`\`\`

### Simple Counting Example
\`\`\`c
#include <stdio.h>

int main() {
    int i = 1;

    while (i <= 5) {
        printf("%d ", i);
        i++;  // Important: change the condition!
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

## 🔄 while vs do-while

### while Loop
**Checks condition BEFORE executing body**
\`\`\`c
while (condition) {
    // Body executes only if condition is true
    // May execute 0 times
}
\`\`\`

### do-while Loop
**Executes body ONCE, then checks condition**
\`\`\`c
do {
    // Body always executes at least once
} while (condition);
\`\`\`

### Comparison Example
\`\`\`c
#include <stdio.h>

int main() {
    int x = 10;

    printf("while loop: ");
    while (x < 10) {  // Condition false initially
        printf("%d ", x);
        x++;
    }
    printf("(executed 0 times)\\n");

    x = 10;  // Reset

    printf("do-while loop: ");
    do {
        printf("%d ", x);  // Executes once before checking
        x++;
    } while (x < 10);  // Condition false, but already executed
    printf("(executed 1 time)\\n");

    return 0;
}
\`\`\`

**Output:**
\`\`\`
while loop: (executed 0 times)
do-while loop: 10 (executed 1 time)
\`\`\`

---

## 🧪 Practical while Loop Examples

### User Input Validation
\`\`\`c
#include <stdio.h>

int main() {
    int age;

    printf("Enter your age (1-120): ");
    scanf("%d", &age);

    while (age < 1 || age > 120) {
        printf("Invalid age! Enter age (1-120): ");
        scanf("%d", &age);
    }

    printf("Valid age: %d\\n", age);
    return 0;
}
\`\`\`

### Sum Until User Says Stop
\`\`\`c
#include <stdio.h>

int main() {
    int number, sum = 0;
    char choice;

    do {
        printf("Enter a number: ");
        scanf("%d", &number);
        sum += number;

        printf("Add another number? (y/n): ");
        scanf(" %c", &choice);

    } while (choice == 'y' || choice == 'Y');

    printf("Total sum: %d\\n", sum);
    return 0;
}
\`\`\`

### Password Input (with attempt limit)
\`\`\`c
#include <stdio.h>
#include <string.h>

int main() {
    char password[20];
    int attempts = 0;
    const int MAX_ATTEMPTS = 3;

    while (attempts < MAX_ATTEMPTS) {
        printf("Enter password: ");
        scanf("%s", password);

        if (strcmp(password, "secret") == 0) {
            printf("Access granted!\\n");
            return 0;
        } else {
            attempts++;
            printf("Wrong password. %d attempts remaining.\\n", MAX_ATTEMPTS - attempts);
        }
    }

    printf("Too many failed attempts. Access denied.\\n");
    return 1;
}
\`\`\`

---

## 🔄 Converting Between Loop Types

### for to while
\`\`\`c
// for loop
for (int i = 1; i <= 5; i++) {
    printf("%d ", i);
}

// Equivalent while loop
int i = 1;
while (i <= 5) {
    printf("%d ", i);
    i++;
}
\`\`\`

### while to do-while (when appropriate)
\`\`\`c
// This while loop...
int x = 10;
while (x > 0) {
    printf("%d ", x);
    x--;
}

// ...becomes this do-while (executes at least once)
int x = 10;
do {
    printf("%d ", x);
    x--;
} while (x > 0);
\`\`\`

### Menu System with do-while
\`\`\`c
#include <stdio.h>

int main() {
    int choice;

    do {
        printf("\\n=== Menu ===\\n");
        printf("1. Add\\n");
        printf("2. Subtract\\n");
        printf("3. Exit\\n");
        printf("Enter choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Addition\\n");
                break;
            case 2:
                printf("Subtraction\\n");
                break;
            case 3:
                printf("Goodbye!\\n");
                break;
            default:
                printf("Invalid choice\\n");
        }
    } while (choice != 3);

    return 0;
}
\`\`\`

---

## 🐛 Common while Loop Mistakes

### Infinite Loops
\`\`\`c
// ❌ Infinite loop - condition never becomes false
int i = 1;
while (i <= 5) {
    printf("%d ", i);
    // Forgot to increment i!
}

// ❌ Infinite loop - condition always true
int x = 1;
while (x > 0) {
    printf("Infinite!\\n");
    // x is always positive
}
\`\`\`

### Off-by-One Errors
\`\`\`c
// ❌ Loop runs one extra time
int i = 1;
while (i < 6) {  // Condition should be i <= 5
    printf("%d ", i);
    i++;
}

// ✅ Correct
int i = 1;
while (i <= 5) {
    printf("%d ", i);
    i++;
}
\`\`\`

### Input Buffer Issues
\`\`\`c
// ❌ Problematic input in loop
while (scanf("%d", &num) == 1) {
    // Process num
}

// ✅ Better approach
int result;
while ((result = scanf("%d", &num)) == 1) {
    // Process num
}
\`\`\`

---

## 🧪 Advanced Examples

### Number Guessing Game
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
    int secret, guess, attempts = 0;
    const int MAX_ATTEMPTS = 10;

    // Generate random number
    srand(time(NULL));
    secret = rand() % 100 + 1;

    printf("Guess the number (1-100). You have %d attempts.\\n", MAX_ATTEMPTS);

    do {
        printf("Enter your guess: ");
        scanf("%d", &guess);
        attempts++;

        if (guess < secret) {
            printf("Too low!\\n");
        } else if (guess > secret) {
            printf("Too high!\\n");
        } else {
            printf("Congratulations! You guessed it in %d attempts.\\n", attempts);
            return 0;
        }
    } while (attempts < MAX_ATTEMPTS);

    printf("Game over! The number was %d.\\n", secret);
    return 0;
}
\`\`\`

### Fibonacci Sequence
\`\`\`c
#include <stdio.h>

int main() {
    int n, first = 0, second = 1, next;

    printf("Enter the number of terms: ");
    scanf("%d", &n);

    printf("Fibonacci Sequence: ");

    int i = 1;
    while (i <= n) {
        printf("%d ", first);

        next = first + second;
        first = second;
        second = next;

        i++;
    }

    printf("\\n");
    return 0;
}
\`\`\`

### Input Processing
\`\`\`c
#include <stdio.h>

int main() {
    int number, sum = 0, count = 0;
    double average;

    printf("Enter numbers (enter 0 to stop):\\n");

    while (scanf("%d", &number) == 1 && number != 0) {
        sum += number;
        count++;

        if (count % 5 == 0) {
            printf("Processed %d numbers so far.\\n", count);
        }
    }

    if (count > 0) {
        average = (double)sum / count;
        printf("\\nSum: %d\\n", sum);
        printf("Count: %d\\n", count);
        printf("Average: %.2f\\n", average);
    } else {
        printf("No numbers entered.\\n");
    }

    return 0;
}
\`\`\`

---

## 🎯 Loop Type Selection Guide

| Situation | Best Loop Type | Reason |
|-----------|----------------|---------|
| **Known iterations** | \`for\` | Clean, all control in one place |
| **Unknown iterations, check first** | \`while\` | Condition checked before execution |
| **At least one execution needed** | \`do-while\` | Body executes before condition check |
| **Simple counting** | \`for\` | Initialization, condition, increment together |
| **Input validation** | \`do-while\` | Get input at least once, then validate |
| **Menu systems** | \`do-while\` | Show menu at least once |
| **File processing** | \`while\` | Read until end of file |
| **Game loops** | \`while\` | Continue until game over condition |

---

## 🧪 Practice Exercises

### Exercise 1: Sum Calculator
Write a program that keeps asking for numbers and sums them until the user enters 0.

### Exercise 2: Factorial Calculator
Create a program that calculates factorial using a loop (not recursion).

### Exercise 3: Average Calculator
Write a program that reads numbers until -1 is entered, then displays the average.

### Exercise 4: Prime Number Finder
Create a program that finds all prime numbers up to a given limit.

---

## 🎯 Key Takeaways

1. **while loops** check condition before executing body
2. **do-while loops** execute body at least once, then check condition
3. **Always modify** the condition variable inside the loop
4. **Choose do-while** when body must execute at least once
5. **Choose while** when condition might be false initially
6. **Be careful** of infinite loops - ensure exit condition
7. **Use proper input validation** to prevent infinite loops

---

## 🚀 Preview: break and continue Statements

In the next topic, you'll learn about:
- **break** statement to exit loops immediately
- **continue** statement to skip current iteration
- **Using break and continue** in different loop types
- **Common patterns** and best practices

**while and do-while control repetition - break and continue control flow within loops!** 🎛️`
};
