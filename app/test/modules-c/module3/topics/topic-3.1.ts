import { SubLesson } from '../../../data/lessonsData';

export const topic_3_1: SubLesson = {
  id: 3.1,
  title: 'Introduction to Control Structures',
  status: 'completed',
  content: `# 🎛️ Introduction to Control Structures

Learn how to control the flow of your C programs using decision-making and looping constructs.

---

## 🌟 Why Control Structures Matter

**Control structures determine how and when code executes.**

### Without Control Structures
\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello\\n");
    printf("World\\n");
    printf("Goodbye\\n");
    // Everything runs in sequence - boring!
    return 0;
}
\`\`\`

### With Control Structures
\`\`\`c
#include <stdio.h>

int main() {
    int temperature = 25;

    if (temperature > 30) {
        printf("It's hot!\\n");
    } else if (temperature > 20) {
        printf("It's pleasant.\\n");
    } else {
        printf("It's cold.\\n");
    }

    // This creates different behavior based on conditions!
    return 0;
}
\`\`\`

---

## 📊 Types of Control Structures

### 1. **Decision-Making Structures**
Make choices based on conditions:
- **if-else**: Simple conditions
- **switch**: Multiple choices

### 2. **Looping Structures**
Repeat code multiple times:
- **for**: Fixed number of iterations
- **while**: Condition-based repetition
- **do-while**: Execute at least once

### 3. **Jump Statements**
Control flow within loops:
- **break**: Exit loop immediately
- **continue**: Skip to next iteration

---

## 🔍 Flow Control Concepts

### Sequential Execution
\`\`\`c
int main() {
    printf("Step 1\\n");    // Executes first
    printf("Step 2\\n");    // Executes second
    printf("Step 3\\n");    // Executes third
    return 0;
}
\`\`\`

### Conditional Execution
\`\`\`c
int main() {
    int x = 10;

    if (x > 5) {
        printf("x is greater than 5\\n");  // Executes only if true
    }

    printf("This always executes\\n");     // Always executes
    return 0;
}
\`\`\`

### Loop Execution
\`\`\`c
int main() {
    int i;

    for (i = 1; i <= 3; i++) {
        printf("Count: %d\\n", i);  // Executes 3 times
    }

    printf("Loop finished\\n");    // Executes once after loop
    return 0;
}
\`\`\`

---

## 🎯 Real-World Examples

### Menu-Driven Program
\`\`\`c
#include <stdio.h>

int main() {
    int choice;

    printf("Menu:\\n");
    printf("1. Add numbers\\n");
    printf("2. Subtract numbers\\n");
    printf("3. Exit\\n");
    printf("Enter choice: ");
    scanf("%d", &choice);

    // Decision based on user input
    if (choice == 1) {
        printf("Addition selected\\n");
    } else if (choice == 2) {
        printf("Subtraction selected\\n");
    } else if (choice == 3) {
        printf("Goodbye!\\n");
    } else {
        printf("Invalid choice\\n");
    }

    return 0;
}
\`\`\`

### Counting Program
\`\`\`c
#include <stdio.h>

int main() {
    int i;

    // Loop to count from 1 to 5
    for (i = 1; i <= 5; i++) {
        printf("Count: %d\\n", i);
    }

    return 0;
}
\`\`\`

### Password Validation
\`\`\`c
#include <stdio.h>
#include <string.h>

int main() {
    char password[20];

    printf("Enter password: ");
    scanf("%s", password);

    // Decision based on condition
    if (strcmp(password, "secret") == 0) {
        printf("Access granted!\\n");
    } else {
        printf("Access denied!\\n");
    }

    return 0;
}
\`\`\`

---

## 🏗️ Control Structure Components

### Conditions
**Expressions that evaluate to true (non-zero) or false (zero)**

\`\`\`c
// Boolean conditions
if (age >= 18) { /* adult */ }
if (temperature < 0) { /* freezing */ }

// Comparison conditions
if (x == y) { /* equal */ }
if (x != y) { /* not equal */ }
if (x < y) { /* less than */ }

// Logical conditions
if (age >= 18 && hasLicense) { /* can drive */ }
if (score >= 90 || extraCredit) { /* grade A */ }
\`\`\`

### Code Blocks
**Statements grouped with curly braces**

\`\`\`c
if (condition) {
    // Multiple statements
    printf("First action\\n");
    printf("Second action\\n");
    result = calculate();
}
\`\`\`

### Single Statements
**No braces needed for single statements**

\`\`\`c
if (x > 0)
    printf("Positive\\n");

for (i = 0; i < 5; i++)
    printf("%d ", i);
\`\`\`

---

## 🔄 Control Flow Patterns

### Linear Flow
\`\`\`
Start → Statement 1 → Statement 2 → Statement 3 → End
\`\`\`

### Conditional Flow
\`\`\`
Start → Condition?
    ├── True → Action A → End
    └── False → Action B → End
\`\`\`

### Loop Flow
\`\`\`
Start → Condition?
    ├── True → Action → Back to Condition
    └── False → End
\`\`\`

### Complex Flow
\`\`\`
Start → Outer Condition?
    ├── True → Inner Condition?
    │     ├── True → Action X → End
    │     └── False → Action Y → End
    └── False → Action Z → End
\`\`\`

---

## 📋 Best Practices

### Clear Logic
\`\`\`c
// ✅ Clear and readable
if (age >= 18 && age <= 65) {
    printf("Working age adult\\n");
}

// ❌ Confusing
if (age >= 18) {
    if (age <= 65) {
        printf("Working age adult\\n");
    }
}
\`\`\`

### Consistent Formatting
\`\`\`c
// ✅ Consistent braces
if (condition) {
    action1();
    action2();
}

// ✅ Consistent indentation
for (i = 0; i < 10; i++) {
    if (i % 2 == 0) {
        printf("%d is even\\n", i);
    }
}
\`\`\`

### Meaningful Conditions
\`\`\`c
// ✅ Self-documenting
#define MAX_STUDENTS 50
#define PASSING_GRADE 60

if (studentCount < MAX_STUDENTS && grade >= PASSING_GRADE) {
    enrollStudent();
}

// ❌ Magic numbers
if (count < 50 && score >= 60) {
    enrollStudent();
}
\`\`\`

---

## 🐛 Common Control Structure Mistakes

### Missing Braces
\`\`\`c
// ❌ Bug: only first statement is conditional
if (x > 0)
    printf("Positive\\n");
    printf("This always prints\\n");  // Wrong indentation!

// ✅ Correct
if (x > 0) {
    printf("Positive\\n");
    printf("This only prints if positive\\n");
}
\`\`\`

### Assignment vs Comparison
\`\`\`c
int x = 5;

// ❌ Wrong: assignment in condition
if (x = 10) {  // This assigns 10 to x, always true
    printf("x is 10\\n");
}

// ✅ Correct: comparison
if (x == 10) {
    printf("x is 10\\n");
}
\`\`\`

### Off-by-One Errors
\`\`\`c
// ❌ Loop runs 11 times (0 to 10 inclusive)
for (int i = 0; i <= 10; i++) {
    printf("%d ", i);
}

// ✅ Loop runs 10 times (0 to 9)
for (int i = 0; i < 10; i++) {
    printf("%d ", i);
}
\`\`\`

---

## 🎯 Control Structure Selection Guide

| Situation | Best Choice | Reason |
|-----------|-------------|---------|
| **Two choices** | \`if-else\` | Simple binary decision |
| **Multiple choices** | \`switch\` | Clean for many options |
| **Fixed iterations** | \`for\` | Known number of repetitions |
| **Unknown iterations** | \`while\` | Condition-based looping |
| **At least once execution** | \`do-while\` | Execute before checking |
| **Early exit from loop** | \`break\` | Exit immediately |
| **Skip current iteration** | \`continue\` | Jump to next iteration |

---

## 🧪 Simple Examples

### Grade Calculator
\`\`\`c
#include <stdio.h>

int main() {
    int score;

    printf("Enter score (0-100): ");
    scanf("%d", &score);

    // Decision structure
    if (score >= 90) {
        printf("Grade: A\\n");
    } else if (score >= 80) {
        printf("Grade: B\\n");
    } else if (score >= 70) {
        printf("Grade: C\\n");
    } else if (score >= 60) {
        printf("Grade: D\\n");
    } else {
        printf("Grade: F\\n");
    }

    return 0;
}
\`\`\`

### Sum Calculator
\`\`\`c
#include <stdio.h>

int main() {
    int n, sum = 0, i;

    printf("Enter a number: ");
    scanf("%d", &n);

    // Loop structure
    for (i = 1; i <= n; i++) {
        sum += i;
    }

    printf("Sum of numbers from 1 to %d is %d\\n", n, sum);
    return 0;
}
\`\`\`

---

## 🚀 Preview: if-else Statements

In the next topic, you'll learn about:
- **if statements** for basic conditions
- **if-else statements** for binary choices
- **if-else if-else** chains for multiple conditions
- **Nested if statements** for complex logic
- **Common if-else patterns** and best practices

**Control structures make programs intelligent - they can make decisions and repeat actions!** 🧠✨

---

## 🧪 Practice Exercise

Create a simple program that:
1. Asks for a number
2. Tells if it's positive, negative, or zero
3. Uses proper control structures

**Ready to dive into specific control structures? Let's start with if-else statements!** 📈`
};
