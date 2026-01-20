import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_5: SubLesson = {
  id: "2.5",
  title: 'Arithmetic Operators',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# ➕➖✖️➗ Arithmetic Operators in C

C provides operators for performing mathematical calculations. Understanding these operators is fundamental to writing any C program.

---

## 🔢 Basic Arithmetic Operators

### **Addition (\`+\`)**

\`\`\`c
#include <stdio.h>

int main(void) {
    int a = 10, b = 5;
    int sum = a + b;
    
    printf("%d + %d = %d\\n", a, b, sum);  // 10 + 5 = 15
    
    float x = 3.5f, y = 2.1f;
    float result = x + y;
    printf("%.1f + %.1f = %.1f\\n", x, y, result);  // 3.5 + 2.1 = 5.6
    
    return 0;
}
\`\`\`

### **Subtraction (\`-\`)**

\`\`\`c
#include <stdio.h>

int main(void) {
    int a = 10, b = 5;
    int diff = a - b;
    
    printf("%d - %d = %d\\n", a, b, diff);  // 10 - 5 = 5
    
    // Negative result
    int result = b - a;
    printf("%d - %d = %d\\n", b, a, result);  // 5 - 10 = -5
    
    return 0;
}
\`\`\`

### **Multiplication (\`*\`)**

\`\`\`c
#include <stdio.h>

int main(void) {
    int a = 6, b = 7;
    int product = a * b;
    
    printf("%d × %d = %d\\n", a, b, product);  // 6 × 7 = 42
    
    float x = 2.5f, y = 4.0f;
    float result = x * y;
    printf("%.1f × %.1f = %.1f\\n", x, y, result);  // 2.5 × 4.0 = 10.0
    
    return 0;
}
\`\`\`

### **Division (\`/\`)**

\`\`\`c
#include <stdio.h>

int main(void) {
    // Integer division
    int a = 10, b = 3;
    int result = a / b;
    printf("%d / %d = %d\\n", a, b, result);  // 10 / 3 = 3 (truncated!)
    
    // Float division (need at least one float)
    float x = 10.0f, y = 3.0f;
    float float_result = x / y;
    printf("%.1f / %.1f = %.2f\\n", x, y, float_result);  // 10.0 / 3.0 = 3.33
    
    // Mixed types
    float mixed = 10 / 3.0f;  // int / float = float
    printf("10 / 3.0 = %.2f\\n", mixed);  // 3.33
    
    return 0;
}
\`\`\`

**⚠️ Important**: Integer division truncates (removes decimal part)!

### **Modulo (\`%\`) - Remainder**

\`\`\`c
#include <stdio.h>

int main(void) {
    int a = 10, b = 3;
    int remainder = a % b;
    
    printf("%d %% %d = %d\\n", a, b, remainder);  // 10 % 3 = 1
    
    // Common uses
    printf("10 is %s\\n", (10 % 2 == 0) ? "even" : "odd");  // even
    printf("7 is %s\\n", (7 % 2 == 0) ? "even" : "odd");    // odd
    
    return 0;
}
\`\`\`

**Note**: Modulo only works with integers!

---

## 📊 Operator Precedence

Operators have different priorities. When multiple operators are in an expression, some are evaluated first:

| Priority | Operator | Description |
|----------|----------|-------------|
| 1 (Highest) | \`()\` | Parentheses |
| 2 | \`*\`, \`/\`, \`%\` | Multiplication, Division, Modulo |
| 3 (Lowest) | \`+\`, \`-\` | Addition, Subtraction |

**Evaluation is left-to-right for same precedence!**

\`\`\`c
#include <stdio.h>

int main(void) {
    int result;
    
    // Multiplication before addition
    result = 2 + 3 * 4;  // = 2 + 12 = 14
    printf("2 + 3 * 4 = %d\\n", result);
    
    // Parentheses override precedence
    result = (2 + 3) * 4;  // = 5 * 4 = 20
    printf("(2 + 3) * 4 = %d\\n", result);
    
    // Left-to-right for same precedence
    result = 10 - 3 - 2;  // = (10 - 3) - 2 = 5
    printf("10 - 3 - 2 = %d\\n", result);
    
    return 0;
}
\`\`\`

---

## 🔄 Increment and Decrement Operators

### **Postfix Increment (\`i++\`)**

\`\`\`c
#include <stdio.h>

int main(void) {
    int i = 5;
    int result;
    
    result = i++;  // Use i, then increment
    printf("i = %d, result = %d\\n", i, result);  // i = 6, result = 5
    
    return 0;
}
\`\`\`

### **Prefix Increment (\`++i\`)**

\`\`\`c
#include <stdio.h>

int main(void) {
    int i = 5;
    int result;
    
    result = ++i;  // Increment first, then use i
    printf("i = %d, result = %d\\n", i, result);  // i = 6, result = 6
    
    return 0;
}
\`\`\`

### **Postfix Decrement (\`i--\`)**

\`\`\`c
#include <stdio.h>

int main(void) {
    int i = 5;
    int result;
    
    result = i--;  // Use i, then decrement
    printf("i = %d, result = %d\\n", i, result);  // i = 4, result = 5
    
    return 0;
}
\`\`\`

### **Prefix Decrement (\`--i\`)**

\`\`\`c
#include <stdio.h>

int main(void) {
    int i = 5;
    int result;
    
    result = --i;  // Decrement first, then use i
    printf("i = %d, result = %d\\n", i, result);  // i = 4, result = 4
    
    return 0;
}
\`\`\`

---

## 🔄 Compound Assignment Operators

Shortcuts for operations with assignment:

\`\`\`c
#include <stdio.h>

int main(void) {
    int x = 10;
    
    x += 5;   // Same as: x = x + 5;  // x = 15
    x -= 3;   // Same as: x = x - 3;  // x = 12
    x *= 2;   // Same as: x = x * 2;  // x = 24
    x /= 4;   // Same as: x = x / 4;  // x = 6
    x %= 4;   // Same as: x = x % 4;  // x = 2
    
    printf("Final value: %d\\n", x);  // 2
    
    return 0;
}
\`\`\`

---

## 🎯 Practical Examples

### **Example 1: Simple Calculator**

\`\`\`c
#include <stdio.h>

int main(void) {
    float num1, num2;
    float sum, diff, product, quotient;
    
    printf("Enter two numbers: ");
    scanf("%f %f", &num1, &num2);
    
    sum = num1 + num2;
    diff = num1 - num2;
    product = num1 * num2;
    quotient = (num2 != 0) ? num1 / num2 : 0;
    
    printf("\\nResults:\\n");
    printf("Sum: %.2f\\n", sum);
    printf("Difference: %.2f\\n", diff);
    printf("Product: %.2f\\n", product);
    if (num2 != 0) {
        printf("Quotient: %.2f\\n", quotient);
    } else {
        printf("Cannot divide by zero!\\n");
    }
    
    return 0;
}
\`\`\`

### **Example 2: Circle Area and Circumference**

\`\`\`c
#include <stdio.h>

#define PI 3.14159f

int main(void) {
    float radius, area, circumference;
    
    printf("Enter radius: ");
    scanf("%f", &radius);
    
    area = PI * radius * radius;
    circumference = 2 * PI * radius;
    
    printf("\\nCircle Calculations:\\n");
    printf("Radius: %.2f\\n", radius);
    printf("Area: %.2f\\n", area);
    printf("Circumference: %.2f\\n", circumference);
    
    return 0;
}
\`\`\`

### **Example 3: Even/Odd Checker**

\`\`\`c
#include <stdio.h>

int main(void) {
    int number;
    
    printf("Enter a number: ");
    scanf("%d", &number);
    
    if (number % 2 == 0) {
        printf("%d is even\\n", number);
    } else {
        printf("%d is odd\\n", number);
    }
    
    return 0;
}
\`\`\`

### **Example 4: Counter with Increment**

\`\`\`c
#include <stdio.h>

int main(void) {
    int count = 0;
    
    printf("Initial count: %d\\n", count);
    
    count++;  // Increment
    printf("After count++: %d\\n", count);  // 1
    
    ++count;  // Increment
    printf("After ++count: %d\\n", count);  // 2
    
    count += 5;  // Add 5
    printf("After count += 5: %d\\n", count);  // 7
    
    return 0;
}
\`\`\`

---

## ⚠️ Common Mistakes

### **Integer Division Truncation**

\`\`\`c
// ❌ Wrong: integer division
int a = 10, b = 3;
int result = a / b;  // Result: 3 (not 3.33!)

// ✅ Correct: use float
float result = 10.0f / 3.0f;  // Result: 3.33
\`\`\`

### **Modulo with Float**

\`\`\`c
// ❌ Error: modulo only works with integers
float a = 10.5f, b = 3.0f;
// float result = a % b;  // Compiler error!

// ✅ Correct: use integers for modulo
int a = 10, b = 3;
int result = a % b;  // Result: 1
\`\`\`

### **Operator Precedence Confusion**

\`\`\`c
// ❌ Might not be what you expect
int result = 2 + 3 * 4;  // = 14, not 20!

// ✅ Use parentheses for clarity
int result = (2 + 3) * 4;  // = 20
\`\`\`

---

## 📚 Operator Summary

| Operator | Operation | Example | Result |
|----------|-----------|---------|--------|
| \`+\` | Addition | \`5 + 3\` | \`8\` |
| \`-\` | Subtraction | \`5 - 3\` | \`2\` |
| \`*\` | Multiplication | \`5 * 3\` | \`15\` |
| \`/\` | Division | \`10 / 3\` | \`3\` (int) or \`3.33\` (float) |
| \`%\` | Modulo | \`10 % 3\` | \`1\` |
| \`++\` | Increment | \`i++\` or \`++i\` | Increments by 1 |
| \`--\` | Decrement | \`i--\` or \`--i\` | Decrements by 1 |
| \`+=\` | Add and assign | \`x += 5\` | \`x = x + 5\` |
| \`-=\` | Subtract and assign | \`x -= 5\` | \`x = x - 5\` |
| \`*=\` | Multiply and assign | \`x *= 5\` | \`x = x * 5\` |
| \`/=\` | Divide and assign | \`x /= 5\` | \`x = x / 5\` |
| \`%=\` | Modulo and assign | \`x %= 5\` | \`x = x % 5\` |

---

## 🎓 Key Takeaways

1. **Basic operators**: \`+\`, \`-\`, \`*\`, \`/\`, \`%\`
2. **Integer division truncates** - use floats for decimal results
3. **Modulo (\`%\`)** only works with integers
4. **Operator precedence** matters - use parentheses when in doubt
5. **Increment/decrement** can be prefix or postfix
6. **Compound operators** provide convenient shortcuts

Master arithmetic operations to build more complex programs! ➕➖✖️➗✨`;
    return contentString;
  })()
};

