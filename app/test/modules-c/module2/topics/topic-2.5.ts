import { SubLesson } from '../../../data/lessonsData';

export const topic_2_5: SubLesson = {
  id: 2.5,
  title: 'Constants and Literals',
  status: 'completed',
  content: `# 🔒 Constants and Literals

Learn about fixed values and constants in C programming that don't change during program execution.

---

## 🔍 What are Constants?

**Constants are fixed values that cannot be changed during program execution.**

\`\`\`c
// This value never changes
const float PI = 3.14159f;

// This is also constant
#define MAX_USERS 100
\`\`\`

---

## 📝 Types of Constants

### 1. Literal Constants
\`\`\`c
#include <stdio.h>

int main() {
    // Integer literals
    int decimal = 42;       // Decimal
    int octal = 052;        // Octal (0 prefix)
    int hexadecimal = 0x2A; // Hexadecimal (0x prefix)

    // Floating-point literals
    float pi = 3.14159f;
    double gravity = 9.80665;

    // Character literals
    char letter = 'A';
    char newline = '\\n';
    char tab = '\\t';

    // String literals
    char greeting[] = "Hello, World!";

    printf("Decimal: %d\\n", decimal);
    printf("Octal: %d\\n", octal);
    printf("Hexadecimal: %d\\n", hexadecimal);
    printf("Pi: %.5f\\n", pi);
    printf("Character: %c\\n", letter);
    printf("String: %s\\n", greeting);

    return 0;
}
\`\`\`

---

## 🏷️ Named Constants with const

### const Keyword
\`\`\`c
#include <stdio.h>

int main() {
    // Constant declarations
    const int MAX_STUDENTS = 50;
    const float PI = 3.14159f;
    const char GRADE_A = 'A';

    // These values cannot be changed
    // MAX_STUDENTS = 60;  // ❌ Error!
    // PI = 3.14f;         // ❌ Error!

    printf("Max students: %d\\n", MAX_STUDENTS);
    printf("Pi value: %.5f\\n", PI);
    printf("Grade A: %c\\n", GRADE_A);

    return 0;
}
\`\`\`

### const with Different Data Types
\`\`\`c
#include <stdio.h>

int main() {
    // Integer constants
    const int DAYS_IN_WEEK = 7;
    const unsigned int MAX_UNSIGNED = 4294967295U;

    // Floating-point constants
    const float SPEED_OF_LIGHT = 299792458.0f;
    const double PLANCK_CONSTANT = 6.62607015e-34;

    // Character constants
    const char NEWLINE = '\\n';
    const char NULL_CHAR = '\\0';

    printf("Days in week: %d\\n", DAYS_IN_WEEK);
    printf("Speed of light: %.0f m/s\\n", SPEED_OF_LIGHT);
    printf("Planck constant: %.2e\\n", PLANCK_CONSTANT);

    return 0;
}
\`\`\`

---

## 🔧 Preprocessor Constants with #define

### Basic #define
\`\`\`c
#include <stdio.h>

// Preprocessor constants
#define PI 3.14159
#define MAX_SIZE 100
#define MESSAGE "Hello, World!"
#define DEBUG 1

int main() {
    printf("Pi: %.5f\\n", PI);
    printf("Max size: %d\\n", MAX_SIZE);
    printf("Message: %s\\n", MESSAGE);

    #if DEBUG
        printf("Debug mode is ON\\n");
    #endif

    return 0;
}
\`\`\`

### #define with Parameters (Macros)
\`\`\`c
#include <stdio.h>

// Simple macros
#define SQUARE(x) ((x) * (x))
#define CUBE(x) ((x) * (x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define MIN(a, b) ((a) < (b) ? (a) : (b))

int main() {
    int x = 5, y = 3;

    printf("Square of %d: %d\\n", x, SQUARE(x));
    printf("Cube of %d: %d\\n", x, CUBE(x));
    printf("Max of %d and %d: %d\\n", x, y, MAX(x, y));
    printf("Min of %d and %d: %d\\n", x, y, MIN(x, y));

    return 0;
}
\`\`\`

---

## 📊 Numeric Literals

### Integer Literals
\`\`\`c
#include <stdio.h>

int main() {
    // Decimal (base 10)
    int decimal = 42;

    // Octal (base 8) - starts with 0
    int octal = 052;      // 5*8 + 2 = 42

    // Hexadecimal (base 16) - starts with 0x or 0X
    int hex = 0x2A;       // 2*16 + 10 = 42
    int hex_upper = 0X2A; // Same as above

    // Long integers - end with L or l
    long big_number = 123456789L;

    // Unsigned integers - end with U or u
    unsigned int positive = 42U;

    printf("Decimal: %d\\n", decimal);
    printf("Octal: %d\\n", octal);
    printf("Hexadecimal: %d\\n", hex);
    printf("Long: %ld\\n", big_number);
    printf("Unsigned: %u\\n", positive);

    return 0;
}
\`\`\`

### Floating-Point Literals
\`\`\`c
#include <stdio.h>

int main() {
    // Standard notation
    float standard = 3.14159f;

    // Scientific notation
    double scientific = 6.022e23;    // 6.022 * 10^23
    double small = 1.602e-19;        // 1.602 * 10^-19

    // Long double - end with L or l
    long double precise = 3.141592653589793238L;

    printf("Standard: %.5f\\n", standard);
    printf("Scientific: %.3e\\n", scientific);
    printf("Small: %.3e\\n", small);
    printf("Precise: %.15Lf\\n", precise);

    return 0;
}
\`\`\`

---

## 🔤 Character and String Literals

### Character Literals
\`\`\`c
#include <stdio.h>

int main() {
    // Single characters
    char letter = 'A';
    char digit = '5';
    char symbol = '@';

    // Escape sequences
    char newline = '\\n';
    char tab = '\\t';
    char backslash = '\\\\';
    char single_quote = '\\'';
    char double_quote = '\\"';

    // ASCII values
    char bell = '\\a';      // Alert (bell)
    char backspace = '\\b'; // Backspace
    char form_feed = '\\f'; // Form feed
    char carriage_return = '\\r'; // Carriage return

    printf("Letter: %c (ASCII: %d)\\n", letter, letter);
    printf("Symbol: %c (ASCII: %d)\\n", symbol, symbol);

    return 0;
}
\`\`\`

### String Literals
\`\`\`c
#include <stdio.h>

int main() {
    // String literals
    char greeting[] = "Hello, World!";
    char name[] = "Alice";
    char empty[] = "";

    // Multi-line strings (concatenated automatically)
    char message[] = "This is a long message "
                     "that spans multiple lines "
                     "in the source code.";

    printf("Greeting: %s\\n", greeting);
    printf("Name: %s\\n", name);
    printf("Message: %s\\n", message);

    // String length
    printf("Greeting length: %zu\\n", sizeof(greeting) - 1); // -1 for null terminator

    return 0;
}
\`\`\`

---

## 🆚 const vs #define

| Feature | \`const\` | \`#define\` |
|---------|-----------|-------------|
| **Scope** | Block scope | Global scope |
| **Type checking** | Yes | No |
| **Debugging** | Can debug | Cannot debug |
| **Memory** | Uses memory | No memory used |
| **When to use** | Variables | Constants, macros |

### Examples
\`\`\`c
// const - better for variables
const int BUFFER_SIZE = 1024;

// #define - better for simple constants
#define PI 3.14159

// #define - better for macros
#define MAX(a, b) ((a) > (b) ? (a) : (b))
\`\`\`

---

## 🧪 Practical Examples

### Mathematical Constants
\`\`\`c
#include <stdio.h>
#include <math.h>

#define PI 3.141592653589793
#define E 2.718281828459045
#define GRAVITY 9.80665

int main() {
    double radius = 5.0;
    double area = PI * radius * radius;
    double circumference = 2 * PI * radius;

    printf("Circle with radius %.1f:\\n", radius);
    printf("Area: %.2f\\n", area);
    printf("Circumference: %.2f\\n", circumference);

    return 0;
}
\`\`\`

### Program Configuration
\`\`\`c
#include <stdio.h>

// Program configuration constants
#define PROGRAM_NAME "Calculator v1.0"
#define VERSION "1.0.0"
#define AUTHOR "Your Name"
#define MAX_OPERATIONS 1000
#define DEBUG_MODE 0

int main() {
    printf("%s\\n", PROGRAM_NAME);
    printf("Version: %s\\n", VERSION);
    printf("Author: %s\\n", AUTHOR);
    printf("Max operations: %d\\n", MAX_OPERATIONS);

    #if DEBUG_MODE
        printf("Debug mode: ON\\n");
    #else
        printf("Debug mode: OFF\\n");
    #endif

    return 0;
}
\`\`\`

---

## 🐛 Common Constant Mistakes

### Trying to Modify Constants
\`\`\`c
const int MAX_VALUE = 100;
// MAX_VALUE = 200;  // ❌ Error: cannot modify const

#define LIMIT 50
// LIMIT = 60;       // ❌ This creates a new variable, doesn't change constant
\`\`\`

### Missing const in Function Parameters
\`\`\`c
// Good practice: const parameters
void print_message(const char* message) {
    // message cannot be modified inside function
    printf("%s\\n", message);
}

int main() {
    const char* text = "Hello";
    print_message(text);
    return 0;
}
\`\`\`

### Macro Side Effects
\`\`\`c
#define SQUARE(x) (x * x)

// Problematic usage
int result = SQUARE(5 + 3);  // Expands to (5 + 3 * 5 + 3) = 23, not 64!

// Better macro
#define SQUARE(x) ((x) * (x))
int result = SQUARE(5 + 3);  // Now expands to ((5 + 3) * (5 + 3)) = 64
\`\`\`

---

## 📚 Standard Library Constants

### Limits Header
\`\`\`c
#include <stdio.h>
#include <limits.h>  // Integer limits
#include <float.h>   // Floating-point limits

int main() {
    printf("Maximum int: %d\\n", INT_MAX);
    printf("Minimum int: %d\\n", INT_MIN);
    printf("Maximum float: %f\\n", FLT_MAX);
    printf("Minimum float: %f\\n", FLT_MIN);

    return 0;
}
\`\`\`

### Math Constants (in math.h)
\`\`\`c
#include <stdio.h>
#include <math.h>

int main() {
    printf("Pi: %.10f\\n", M_PI);
    printf("E: %.10f\\n", M_E);
    printf("Square root of 2: %.10f\\n", M_SQRT2);

    return 0;
}
\`\`\`

---

## 🧪 Practice Exercises

### Exercise 1: Unit Converter
Create a program with conversion constants (e.g., inches to cm, pounds to kg).

### Exercise 2: Circle Calculator
Write a program that calculates circle properties using PI constant.

### Exercise 3: Grade Calculator
Create a grading system with predefined grade boundaries as constants.

### Exercise 4: Game Constants
Define game constants like MAX_HEALTH, SCORE_MULTIPLIER, etc.

---

## 🎯 Key Takeaways

1. **Constants** store fixed values that don't change
2. **const** keyword creates typed constants with scope
3. **#define** creates preprocessor constants and macros
4. **Literals** are fixed values written directly in code
5. **Choose const** for typed constants, **#define** for simple values
6. **Macros** can have parameters and perform calculations
7. **Use meaningful names** for constants (UPPER_CASE)

---

## 🚀 Preview: Type Conversion

In the next topic, you'll learn about:
- **Implicit conversion** - automatic type conversion
- **Explicit casting** - manual type conversion
- **Type promotion** - smaller to larger types
- **Type demotion** - larger to smaller types with data loss

**Constants provide stability - type conversion provides flexibility!** 🔄`
};
