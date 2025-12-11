import { SubLesson } from '../../../data/lessonsData';

export const topic_2_2: SubLesson = {
  id: 2.2,
  title: 'Variables and Data Types',
  status: 'completed',
  content: `# 📦 Variables and Data Types

Learn how to store and manipulate data in C using variables and different data types.

---

## 🔍 What are Variables?

**Variables are named memory locations that store data values.**

\`\`\`c
// Variable declaration
int age;

// Variable assignment
age = 25;

// Variable initialization
int height = 175;
\`\`\`

---

## 📊 C Data Types

### Primitive Data Types

#### Integer Types
\`\`\`c
// Signed integers
int number = 42;           // Typically 4 bytes (-2,147,483,648 to 2,147,483,647)
short int small = 32767;   // Typically 2 bytes
long int big = 2147483647; // Typically 4 or 8 bytes

// Unsigned integers (only positive)
unsigned int positive = 42;           // 0 to 4,294,967,295
unsigned short ushort = 65535;        // 0 to 65,535
unsigned long ulong = 4294967295;     // 0 to 4,294,967,295
\`\`\`

#### Floating-Point Types
\`\`\`c
float pi_float = 3.14159f;     // 4 bytes, ~6-7 decimal digits
double pi_double = 3.141592653589793;  // 8 bytes, ~15 decimal digits
\`\`\`

#### Character Type
\`\`\`c
char letter = 'A';        // Single character
char newline = '\\n';     // Escape sequences
char tab = '\\t';         // Tab character
\`\`\`

---

## 🔧 Variable Declaration and Initialization

### Declaration Syntax
\`\`\`c
// datatype variable_name;
int age;
float salary;
char grade;

// Multiple variables of same type
int x, y, z;
float a, b, c;
\`\`\`

### Initialization Methods
\`\`\`c
// Method 1: Declare then assign
int age;
age = 25;

// Method 2: Declare and initialize
int age = 25;

// Method 3: Multiple initialization
int x = 1, y = 2, z = 3;
\`\`\`

---

## 📏 Size and Range of Data Types

| Data Type | Size (bytes) | Range | Format Specifier |
|-----------|-------------|-------|------------------|
| \`char\` | 1 | -128 to 127 | \`%c\` |
| \`unsigned char\` | 1 | 0 to 255 | \`%c\` |
| \`short\` | 2 | -32,768 to 32,767 | \`%hd\` |
| \`unsigned short\` | 2 | 0 to 65,535 | \`%hu\` |
| \`int\` | 4 | -2,147,483,648 to 2,147,483,647 | \`%d\` |
| \`unsigned int\` | 4 | 0 to 4,294,967,295 | \`%u\` |
| \`long\` | 4 or 8 | -2,147,483,648 to 2,147,483,647 | \`%ld\` |
| \`unsigned long\` | 4 or 8 | 0 to 4,294,967,295 | \`%lu\` |
| \`float\` | 4 | ±3.4e-38 to ±3.4e+38 | \`%f\` |
| \`double\` | 8 | ±1.7e-308 to ±1.7e+308 | \`%lf\` |

---

## 🧪 Variable Examples

### Integer Variables
\`\`\`c
#include <stdio.h>

int main() {
    // Integer variables
    int age = 25;
    int temperature = -10;
    int score = 95;

    printf("Age: %d\\n", age);
    printf("Temperature: %d°C\\n", temperature);
    printf("Score: %d%%\\n", score);

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Age: 25
Temperature: -10°C
Score: 95%
\`\`\`

### Floating-Point Variables
\`\`\`c
#include <stdio.h>

int main() {
    // Floating-point variables
    float pi = 3.14159f;
    double gravity = 9.80665;
    float price = 19.99f;

    printf("Pi: %.2f\\n", pi);
    printf("Gravity: %.5f m/s²\\n", gravity);
    printf("Price: $%.2f\\n", price);

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Pi: 3.14
Gravity: 9.80665 m/s²
Price: $19.99
\`\`\`

### Character Variables
\`\`\`c
#include <stdio.h>

int main() {
    // Character variables
    char grade = 'A';
    char initial = 'J';
    char symbol = '@';

    printf("Grade: %c\\n", grade);
    printf("Initial: %c\\n", initial);
    printf("Symbol: %c\\n", symbol);

    // ASCII values
    printf("ASCII of 'A': %d\\n", grade);
    printf("ASCII of '@': %d\\n", symbol);

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Grade: A
Initial: J
Symbol: @
ASCII of 'A': 65
ASCII of '@': 64
\`\`\`

---

## 🔄 Type Conversion

### Implicit Conversion (Automatic)
\`\`\`c
#include <stdio.h>

int main() {
    int num = 10;
    float result = num;  // int to float

    printf("Integer: %d\\n", num);
    printf("Float: %.2f\\n", result);

    return 0;
}
\`\`\`

### Explicit Conversion (Casting)
\`\`\`c
#include <stdio.h>

int main() {
    float pi = 3.14159f;
    int truncated = (int)pi;  // float to int

    printf("Original: %.5f\\n", pi);
    printf("Truncated: %d\\n", truncated);

    return 0;
}
\`\`\`

---

## 📝 Variable Naming Rules

### Valid Names
\`\`\`c
int age;
int student_count;
int _private_var;
int var123;
\`\`\`

### Invalid Names
\`\`\`c
int 123var;     // ❌ Starts with number
int my-var;     // ❌ Contains hyphen
int my var;     // ❌ Contains space
int int;        // ❌ Reserved keyword
\`\`\`

### Naming Conventions
\`\`\`c
// Good practices
int user_age;           // snake_case
int maxValue;           // camelCase
int TOTAL_ITEMS;        // UPPER_CASE for constants

// Avoid
int x, y, z;           // Meaningless names
int a, b, c;           // Not descriptive
\`\`\`

---

## 🧠 Memory and Variables

### Memory Allocation
\`\`\`c
#include <stdio.h>

int main() {
    int x = 42;        // 4 bytes allocated
    char c = 'A';       // 1 byte allocated
    double d = 3.14;    // 8 bytes allocated

    // Print memory addresses
    printf("Address of x: %p\\n", &x);
    printf("Address of c: %p\\n", &c);
    printf("Address of d: %p\\n", &d);

    return 0;
}
\`\`\`

---

## 🐛 Common Mistakes

### Uninitialized Variables
\`\`\`c
#include <stdio.h>

int main() {
    int x;  // ❌ Uninitialized - contains garbage value
    printf("x = %d\\n", x);  // Undefined behavior!

    return 0;
}
\`\`\`

**Fix:**
\`\`\`c
int x = 0;  // ✓ Initialize with default value
int x; x = 10;  // ✓ Or assign before use
\`\`\`

### Wrong Data Types
\`\`\`c
#include <stdio.h>

int main() {
    int age = 25.5;  // ❌ Assigning float to int (loses precision)
    printf("Age: %d\\n", age);  // Prints 25, not 25.5

    return 0;
}
\`\`\`

**Fix:**
\`\`\`c
float age = 25.5f;  // ✓ Use correct data type
printf("Age: %.1f\\n", age);
\`\`\`

---

## 🧪 Practice Exercises

### Exercise 1: Personal Information
Create variables to store your name (as char), age (int), height (float), and print them.

### Exercise 2: Calculations
Create variables for length and width, calculate area and perimeter of a rectangle.

### Exercise 3: Type Conversion
Take a float value, convert it to int, and display both values.

---

## 🎯 Key Takeaways

1. **Choose appropriate data types** for your data
2. **Initialize variables** before use
3. **Use meaningful variable names**
4. **Be careful with type conversions**
5. **Different data types have different memory requirements**

---

## 🚀 Preview: Operators

In the next topic, you'll learn about:
- **Arithmetic operators** (+, -, *, /, %)
- **Assignment operators** (=, +=, -=, etc.)
- **Comparison operators** (==, !=, <, >, etc.)
- **Logical operators** (&&, ||, !)

**Variables are the foundation - operators bring them to life!** ⚡`
};
