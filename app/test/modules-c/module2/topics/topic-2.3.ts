import { SubLesson } from '../../../data/lessonsData';

export const topic_2_3: SubLesson = {
  id: 2.3,
  title: 'Operators',
  status: 'completed',
  content: `# ⚡ Operators in C

Learn how to perform operations on variables and values using C operators.

---

## 🔢 Arithmetic Operators

### Basic Arithmetic
\`\`\`c
#include <stdio.h>

int main() {
    int a = 10, b = 3;

    printf("a = %d, b = %d\\n", a, b);
    printf("Addition: %d + %d = %d\\n", a, b, a + b);
    printf("Subtraction: %d - %d = %d\\n", a, b, a - b);
    printf("Multiplication: %d * %d = %d\\n", a, b, a * b);
    printf("Division: %d / %d = %d\\n", a, b, a / b);
    printf("Modulus: %d %% %d = %d\\n", a, b, a % b);

    return 0;
}
\`\`\`

**Output:**
\`\`\`
a = 10, b = 3
Addition: 10 + 3 = 13
Subtraction: 10 - 3 = 7
Multiplication: 10 * 3 = 30
Division: 10 / 3 = 3
Modulus: 10 % 3 = 1
\`\`\`

### Operator Precedence
\`\`\`c
#include <stdio.h>

int main() {
    int result1 = 10 + 3 * 2;    // Multiplication first: 10 + 6 = 16
    int result2 = (10 + 3) * 2;  // Parentheses first: 13 * 2 = 26

    printf("10 + 3 * 2 = %d\\n", result1);
    printf("(10 + 3) * 2 = %d\\n", result2);

    return 0;
}
\`\`\`

---

## 📊 Assignment Operators

### Basic Assignment
\`\`\`c
int x = 5;    // Assign 5 to x
int y; y = 10; // Declare then assign
\`\`\`

### Compound Assignment
\`\`\`c
#include <stdio.h>

int main() {
    int x = 10;

    printf("Initial x = %d\\n", x);

    x += 5;   // x = x + 5 → x = 15
    printf("x += 5 → %d\\n", x);

    x -= 3;   // x = x - 3 → x = 12
    printf("x -= 3 → %d\\n", x);

    x *= 2;   // x = x * 2 → x = 24
    printf("x *= 2 → %d\\n", x);

    x /= 4;   // x = x / 4 → x = 6
    printf("x /= 4 → %d\\n", x);

    x %= 5;   // x = x % 5 → x = 1
    printf("x %%= 5 → %d\\n", x);

    return 0;
}
\`\`\`

---

## 🔍 Comparison Operators

### Relational Operators
\`\`\`c
#include <stdio.h>

int main() {
    int a = 10, b = 20;

    printf("a = %d, b = %d\\n\\n", a, b);

    // Comparison results: 1 (true) or 0 (false)
    printf("a == b : %d\\n", a == b);  // Equal to
    printf("a != b : %d\\n", a != b);  // Not equal to
    printf("a < b  : %d\\n", a < b);   // Less than
    printf("a > b  : %d\\n", a > b);   // Greater than
    printf("a <= b : %d\\n", a <= b);  // Less than or equal
    printf("a >= b : %d\\n", a >= b);  // Greater than or equal

    return 0;
}
\`\`\`

**Output:**
\`\`\`
a = 10, b = 20

a == b : 0
a != b : 1
a < b  : 1
a > b  : 0
a <= b : 1
a >= b : 0
\`\`\`

---

## 🔗 Logical Operators

### Logical AND (&&), OR (||), NOT (!)
\`\`\`c
#include <stdio.h>

int main() {
    int age = 25;
    int hasLicense = 1;  // 1 = true, 0 = false

    printf("Age: %d, Has License: %s\\n\\n", age, hasLicense ? "Yes" : "No");

    // Logical AND: both conditions must be true
    int canDrive = (age >= 18) && (hasLicense == 1);
    printf("Can drive? %s\\n", canDrive ? "Yes" : "No");

    // Logical OR: at least one condition must be true
    int needsID = (age < 18) || (hasLicense == 0);
    printf("Needs ID? %s\\n", needsID ? "Yes" : "No");

    // Logical NOT: reverses the condition
    int isMinor = !(age >= 18);
    printf("Is minor? %s\\n", isMinor ? "Yes" : "No");

    return 0;
}
\`\`\`

---

## 🔄 Increment and Decrement Operators

### Pre-increment and Post-increment
\`\`\`c
#include <stdio.h>

int main() {
    int x = 5, y = 5;

    printf("Initial: x = %d, y = %d\\n", x, y);

    // Post-increment: use then increment
    printf("Post-increment: x++ = %d, ", x++);  // Prints 5, then x becomes 6
    printf("now x = %d\\n", x);

    // Pre-increment: increment then use
    printf("Pre-increment: ++y = %d, ", ++y);   // y becomes 6, then prints 6
    printf("now y = %d\\n", y);

    return 0;
}
\`\`\`

### Pre-decrement and Post-decrement
\`\`\`c
#include <stdio.h>

int main() {
    int a = 10, b = 10;

    printf("Initial: a = %d, b = %d\\n", a, b);

    // Post-decrement
    printf("Post-decrement: a-- = %d, ", a--);  // Prints 10, then a becomes 9
    printf("now a = %d\\n", a);

    // Pre-decrement
    printf("Pre-decrement: --b = %d, ", --b);   // b becomes 9, then prints 9
    printf("now b = %d\\n", b);

    return 0;
}
\`\`\`

---

## ❓ Conditional (Ternary) Operator

### Syntax: condition ? true_value : false_value
\`\`\`c
#include <stdio.h>

int main() {
    int age = 20;

    // Ternary operator
    char* status = (age >= 18) ? "Adult" : "Minor";
    printf("Age %d: %s\\n", age, status);

    // Equivalent if-else
    if (age >= 18) {
        status = "Adult";
    } else {
        status = "Minor";
    }
    printf("Age %d: %s\\n", age, status);

    // Finding maximum
    int a = 10, b = 20;
    int max = (a > b) ? a : b;
    printf("Maximum of %d and %d is %d\\n", a, b, max);

    return 0;
}
\`\`\`

---

## 📏 Sizeof Operator

### Finding size of variables and types
\`\`\`c
#include <stdio.h>

int main() {
    int integer = 42;
    float floating = 3.14f;
    char character = 'A';
    double double_prec = 3.14159;

    printf("Size of int: %zu bytes\\n", sizeof(int));
    printf("Size of float: %zu bytes\\n", sizeof(float));
    printf("Size of char: %zu bytes\\n", sizeof(char));
    printf("Size of double: %zu bytes\\n\\n", sizeof(double));

    printf("Size of variable integer: %zu bytes\\n", sizeof(integer));
    printf("Size of variable floating: %zu bytes\\n", sizeof(floating));
    printf("Size of variable character: %zu bytes\\n", sizeof(character));
    printf("Size of variable double_prec: %zu bytes\\n", sizeof(double_prec));

    return 0;
}
\`\`\`

---

## 🧪 Practical Examples

### Calculator Program
\`\`\`c
#include <stdio.h>

int main() {
    float num1, num2, result;
    char operator;

    printf("Enter first number: ");
    scanf("%f", &num1);

    printf("Enter operator (+, -, *, /): ");
    scanf(" %c", &operator);

    printf("Enter second number: ");
    scanf("%f", &num2);

    switch(operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 != 0)
                result = num1 / num2;
            else {
                printf("Error: Division by zero!\\n");
                return 1;
            }
            break;
        default:
            printf("Error: Invalid operator!\\n");
            return 1;
    }

    printf("%.2f %c %.2f = %.2f\\n", num1, operator, num2, result);
    return 0;
}
\`\`\`

### Grade Calculator
\`\`\`c
#include <stdio.h>

int main() {
    int score;
    char grade;

    printf("Enter your score (0-100): ");
    scanf("%d", &score);

    // Using conditional operator
    grade = (score >= 90) ? 'A' :
            (score >= 80) ? 'B' :
            (score >= 70) ? 'C' :
            (score >= 60) ? 'D' : 'F';

    printf("Score: %d, Grade: %c\\n", score, grade);

    // Using logical operators for pass/fail
    printf("Result: %s\\n", (score >= 60) ? "PASS" : "FAIL");

    return 0;
}
\`\`\`

---

## 🐛 Common Operator Mistakes

### Division by Zero
\`\`\`c
int x = 10, y = 0;
// result = x / y;  // ❌ Runtime error!
\`\`\`

### Modulus with Floating Point
\`\`\`c
float a = 10.5f, b = 3.0f;
// float result = a % b;  // ❌ Compilation error!
\`\`\`

### Assignment vs Comparison
\`\`\`c
int x = 5;
// if (x = 10)  // ❌ Wrong! This assigns 10 to x
if (x == 10)  // ✓ Correct! This compares x with 10
\`\`\`

---

## 📋 Operator Precedence Table

| Precedence | Operator | Description | Associativity |
|------------|----------|-------------|---------------|
| 1 | \`()\` \`[]\` \`->\` \`. \` | Parentheses, brackets | Left to right |
| 2 | \`++\` \`--\` \`!\` \`~\` \`+\` \`-\` \`*\` \`&\` \`sizeof\` | Unary operators | Right to left |
| 3 | \`*\` \`/\` \`%\` | Multiplicative | Left to right |
| 4 | \`+\` \`-\` | Additive | Left to right |
| 5 | \`<<\` \`>>\` | Bitwise shift | Left to right |
| 6 | \`<\` \`>\` \`<\`=\` \`>\`=\` | Relational | Left to right |
| 7 | \`==\` \`!=\` | Equality | Left to right |
| 8 | \`&\` | Bitwise AND | Left to right |
| 9 | \`^\` | Bitwise XOR | Left to right |
| 10 | \`|\` | Bitwise OR | Left to right |
| 11 | \`&&\` | Logical AND | Left to right |
| 12 | \`||\` | Logical OR | Left to right |
| 13 | \`?:\` | Conditional | Right to left |
| 14 | \`=\` \`+=\` \`-=\` \`*=\` \`/=\` \`%=\` | Assignment | Right to left |
| 15 | \`,\` | Comma | Left to right |

---

## 🧪 Practice Exercises

### Exercise 1: Temperature Converter
Create a program that converts Celsius to Fahrenheit and vice versa.

### Exercise 2: Even/Odd Checker
Write a program that checks if a number is even or odd using operators.

### Exercise 3: Simple Calculator
Build a calculator that performs basic arithmetic operations.

### Exercise 4: Grade Classifier
Create a program that classifies grades using conditional operators.

---

## 🎯 Key Takeaways

1. **Arithmetic operators** perform mathematical calculations
2. **Assignment operators** store values in variables
3. **Comparison operators** compare values and return true/false
4. **Logical operators** combine conditions
5. **Increment/decrement** modify variables by 1
6. **Ternary operator** provides conditional assignment
7. **Operator precedence** determines evaluation order

---

## 🚀 Preview: Input/Output

In the next topic, you'll learn about:
- **printf()** - formatted output
- **scanf()** - formatted input
- **Format specifiers** - controlling display
- **Input validation** - handling user input safely

**Operators perform the calculations - I/O makes programs interactive!** 🎮`
};
