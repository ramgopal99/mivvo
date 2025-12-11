import { SubLesson } from '../../../data/lessonsData';

export const topic_2_6: SubLesson = {
  id: 2.6,
  title: 'Type Conversion',
  status: 'completed',
  content: `# 🔄 Type Conversion in C

Learn how to convert between different data types in C, both automatically and manually.

---

## 📊 Type Conversion Types

### Implicit Conversion (Automatic)
**C automatically converts types when needed, usually without data loss.**

\`\`\`c
#include <stdio.h>

int main() {
    int integer = 42;
    float floating;

    // int to float (automatic)
    floating = integer;
    printf("Integer: %d\\n", integer);
    printf("Float: %.2f\\n", floating);

    // Smaller to larger type (safe)
    short small = 100;
    long big = small;  // short to long
    printf("Small: %d\\n", small);
    printf("Big: %ld\\n", big);

    return 0;
}
\`\`\`

### Explicit Conversion (Casting)
**Manually convert types using cast operators.**

\`\`\`c
#include <stdio.h>

int main() {
    float pi = 3.14159f;
    int truncated;

    // float to int (manual casting)
    truncated = (int)pi;
    printf("Original: %.5f\\n", pi);
    printf("Truncated: %d\\n", truncated);

    // Division with casting
    int a = 5, b = 2;
    float result = (float)a / b;  // Cast a to float for decimal division
    printf("5 / 2 = %.2f\\n", result);

    return 0;
}
\`\`\`

---

## 📈 Type Promotion

### Automatic Promotion in Expressions
\`\`\`c
#include <stdio.h>

int main() {
    int a = 5;
    float b = 2.5f;

    // int promoted to float for calculation
    float result = a + b;
    printf("5 + 2.5 = %.2f\\n", result);

    // Character arithmetic (char promoted to int)
    char c = 'A';
    int ascii = c + 1;  // 'A' (65) + 1 = 66
    printf("'A' + 1 = %d ('%c')\\n", ascii, ascii);

    return 0;
}
\`\`\`

### Promotion Hierarchy
\`\`\`c
// Promotion order: char → short → int → long → float → double → long double

char c = 'A';      // 1 byte
short s = c;       // 2 bytes (promoted)
int i = s;         // 4 bytes (promoted)
long l = i;        // 4/8 bytes (promoted)
float f = l;       // 4 bytes (promoted)
double d = f;      // 8 bytes (promoted)
\`\`\`

---

## 📉 Type Demotion (Narrowing)

### Potential Data Loss
\`\`\`c
#include <stdio.h>

int main() {
    // Large to small conversion (dangerous)
    long big_number = 1000000L;
    short small;

    small = (short)big_number;  // Data loss possible
    printf("Big: %ld\\n", big_number);
    printf("Small: %d\\n", small);  // May show wrong value

    // Float to int (loses decimal part)
    float precise = 3.999f;
    int rounded = (int)precise;
    printf("Float: %.3f\\n", precise);
    printf("Int: %d\\n", rounded);

    return 0;
}
\`\`\`

---

## 🔧 Casting Operators

### Basic Casting Syntax
\`\`\`c
// (type_name)expression

int x = 42;
double result;

// int to double
result = (double)x;

// char to int
char letter = 'A';
int ascii = (int)letter;

// float to int (truncates)
float pi = 3.14159f;
int whole = (int)pi;
\`\`\`

### Casting in Calculations
\`\`\`c
#include <stdio.h>

int main() {
    int a = 7, b = 2;

    // Without casting: integer division
    float result1 = a / b;
    printf("7 / 2 = %.2f (integer division)\\n", result1);

    // With casting: floating-point division
    float result2 = (float)a / b;
    printf("7 / 2 = %.2f (floating-point division)\\n", result2);

    // Multiple castings
    double precise = (double)a / (double)b;
    printf("7 / 2 = %.10f (double precision)\\n", precise);

    return 0;
}
\`\`\`

---

## 🧮 Arithmetic Conversions

### Usual Arithmetic Conversions
\`\`\`c
#include <stdio.h>

int main() {
    short a = 10;
    int b = 20;
    long c = 30;
    float d = 4.0f;
    double e = 5.0;

    // All operands promoted to double (largest type)
    double result = a + b + c + d + e;
    printf("Result: %.1f\\n", result);

    // Character arithmetic
    char x = '0';  // ASCII 48
    int y = 5;
    int sum = x + y;  // '0' + 5 = 48 + 5 = 53
    printf("'0' + 5 = %d\\n", sum);

    return 0;
}
\`\`\`

---

## ⚠️ Common Conversion Issues

### Overflow and Underflow
\`\`\`c
#include <stdio.h>
#include <limits.h>

int main() {
    // Integer overflow
    int max_int = INT_MAX;
    int overflow = max_int + 1;
    printf("Max int: %d\\n", max_int);
    printf("Overflow: %d\\n", overflow);  // Undefined behavior!

    // Float precision loss
    float large = 1e20f;
    float small = 1.0f;
    float result = large + small;
    printf("Large + small = %.0f\\n", result);  // small is lost!

    return 0;
}
\`\`\`

### Signed/Unsigned Conversion
\`\`\`c
#include <stdio.h>

int main() {
    signed int signed_num = -10;
    unsigned int unsigned_num;

    // Dangerous conversion
    unsigned_num = (unsigned int)signed_num;
    printf("Signed: %d\\n", signed_num);
    printf("Unsigned: %u\\n", unsigned_num);  // Large positive number!

    return 0;
}
\`\`\`

---

## 🛠️ Practical Examples

### Temperature Conversion Program
\`\`\`c
#include <stdio.h>

int main() {
    float celsius, fahrenheit;
    int choice;

    printf("Temperature Converter\\n");
    printf("1. Celsius to Fahrenheit\\n");
    printf("2. Fahrenheit to Celsius\\n");
    printf("Choice: ");
    scanf("%d", &choice);

    if (choice == 1) {
        printf("Enter Celsius: ");
        scanf("%f", &celsius);
        fahrenheit = (float)9/5 * celsius + 32;  // Cast for precision
        printf("%.2f°C = %.2f°F\\n", celsius, fahrenheit);
    } else {
        printf("Enter Fahrenheit: ");
        scanf("%f", &fahrenheit);
        celsius = (float)5/9 * (fahrenheit - 32);
        printf("%.2f°F = %.2f°C\\n", fahrenheit, celsius);
    }

    return 0;
}
\`\`\`

### Unit Conversion Calculator
\`\`\`c
#include <stdio.h>

int main() {
    double meters, feet;

    printf("Length Converter\\n");
    printf("Enter length in meters: ");
    scanf("%lf", &meters);

    // Convert meters to feet (1 meter = 3.28084 feet)
    feet = meters * 3.28084;

    printf("%.2f meters = %.2f feet\\n", meters, feet);
    printf("%.2f feet = %.2f meters\\n", feet, meters);

    return 0;
}
\`\`\`

---

## 📋 Conversion Best Practices

### Safe Conversion Guidelines
\`\`\`c
// 1. Check ranges before conversion
#include <limits.h>

int safe_conversion(long value) {
    if (value > INT_MAX || value < INT_MIN) {
        printf("Value out of int range!\\n");
        return 0;
    }
    return (int)value;
}

// 2. Use explicit casting for clarity
float result = (float)numerator / denominator;

// 3. Prefer larger types for calculations
double precise_calc = (double)a * b / c;

// 4. Avoid unnecessary conversions
int sum = a + b;  // No conversion needed
\`\`\`

### Type Conversion Hierarchy
\`\`\`c
// Safe conversions (no data loss):
char → short → int → long → float → double

// Potentially unsafe (may lose data):
double → float → long → int → short → char
\`\`\`

---

## 🧪 Practice Exercises

### Exercise 1: Average Calculator
Write a program that calculates the average of three integers, ensuring decimal precision.

### Exercise 2: Time Converter
Create a program that converts seconds to minutes and seconds, using proper type conversion.

### Exercise 3: Currency Calculator
Build a program that converts between dollars and euros with floating-point precision.

### Exercise 4: ASCII Converter
Write a program that converts characters to their ASCII values and vice versa.

---

## 🎯 Key Takeaways

1. **Implicit conversion** happens automatically in expressions
2. **Explicit casting** uses \` (type) \` syntax for manual conversion
3. **Type promotion** converts smaller to larger types safely
4. **Type demotion** can cause data loss
5. **Arithmetic operations** promote operands to common types
6. **Check ranges** before dangerous conversions
7. **Use explicit casting** for clarity and precision

---

## 🚀 Preview: Comments and Documentation

In the next topic, you'll learn about:
- **Single-line comments** with \`//\`
- **Multi-line comments** with \`/* */\`
- **Documentation standards**
- **Comment best practices**

**Type conversion ensures compatibility - comments ensure maintainability!** 📝`
};
