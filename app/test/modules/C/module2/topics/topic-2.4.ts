import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_4: SubLesson = {
  id: "2.4",
  title: 'Constants & Literals',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🔒 Constants and Literals in C

Constants are values that don't change during program execution. Understanding how to use constants properly makes your code more maintainable and less error-prone.

---

## 📚 What are Constants?

**Constants** are fixed values that cannot be modified during program execution.

**Literals** are the actual values you write in your code (like \`42\`, \`3.14\`, \`'A'\`).

---

## 🔧 Ways to Define Constants

### **1. Using #define Preprocessor Directive**

\`\`\`c
#include <stdio.h>

#define PI 3.14159
#define MAX_SIZE 100
#define GREETING "Hello, World!"

int main(void) {
    float radius = 5.0f;
    float area = PI * radius * radius;
    
    printf("Area: %.2f\\n", area);
    printf("%s\\n", GREETING);
    
    return 0;
}
\`\`\`

**Characteristics:**
- Processed before compilation (text replacement)
- No type checking
- No memory allocated (it's a text replacement)
- Convention: Use UPPERCASE names

### **2. Using \`const\` Keyword (C90+)**

\`\`\`c
#include <stdio.h>

int main(void) {
    const float PI = 3.14159f;
    const int MAX_SIZE = 100;
    const char GRADE = 'A';
    
    // PI = 3.14;  // ❌ Error: cannot modify const variable
    
    float radius = 5.0f;
    float area = PI * radius * radius;
    
    printf("Area: %.2f\\n", area);
    
    return 0;
}
\`\`\`

**Characteristics:**
- Type-safe (compiler checks types)
- Memory allocated (it's a real variable)
- Cannot be modified after initialization
- Can be used like a variable (with type checking)

### **3. Comparison: #define vs const**

| Feature | \`#define\` | \`const\` |
|---------|-------------|-----------|
| **Type checking** | ❌ No | ✅ Yes |
| **Memory** | No allocation | Memory allocated |
| **Scope** | Global (unless \`#undef\`) | Follows C scope rules |
| **Debugging** | Harder | Easier (shows in debugger) |
| **Preference** | Macros, compile-time constants | Runtime constants |

---

## 📝 Literal Types

### **Integer Literals**

\`\`\`c
int decimal = 42;        // Decimal (base 10)
int octal = 052;         // Octal (base 8) - starts with 0
int hex = 0x2A;          // Hexadecimal (base 16) - starts with 0x or 0X
int binary = 0b101010;   // Binary (base 2) - C99, starts with 0b

// Suffixes
long big_num = 1000L;           // Long (L or l)
unsigned int count = 100U;      // Unsigned (U or u)
long long huge = 1000LL;        // Long long (LL or ll)
unsigned long ul = 1000UL;      // Combined
\`\`\`

### **Floating-Point Literals**

\`\`\`c
float f1 = 3.14f;        // Float (f or F suffix)
float f2 = 3.14F;
double d1 = 3.14159;     // Double (default)
double d2 = 3.14159;     // Same as above
long double ld = 3.14L;  // Long double (L or l)

// Scientific notation
float sci = 1.5e2f;      // 1.5 × 10² = 150.0
double sci2 = 2.5E-3;    // 2.5 × 10⁻³ = 0.0025
\`\`\`

### **Character Literals**

\`\`\`c
char letter = 'A';       // Single character
char digit = '5';        // Digit character
char symbol = '@';       // Special character

// Escape sequences
char newline = '\\n';    // Newline
char tab = '\\t';        // Tab
char quote = '\\'';      // Single quote
char backslash = '\\\\'; // Backslash
char null_char = '\\0';  // Null terminator
\`\`\`

### **String Literals**

\`\`\`c
char *message = "Hello, World!";  // String literal
char greeting[] = "Welcome";      // String as array

// Multi-line string (C99)
char *text = "This is a "
             "multi-line "
             "string";

// Escape sequences in strings
char *path = "C:\\\\Users\\\\Name";
char *quote = "He said \\"Hello\\"";
\`\`\`

---

## 🎯 Common Constant Patterns

### **Mathematical Constants**

\`\`\`c
#include <stdio.h>
#include <math.h>

#define PI 3.14159265359
#define E 2.718281828
#define GOLDEN_RATIO 1.6180339887

int main(void) {
    float radius = 5.0f;
    float area = PI * radius * radius;
    
    printf("Area of circle: %.2f\\n", area);
    
    return 0;
}
\`\`\`

### **Configuration Constants**

\`\`\`c
#include <stdio.h>

#define MAX_USERS 100
#define BUFFER_SIZE 1024
#define TIMEOUT_SECONDS 30

int main(void) {
    int users[MAX_USERS];
    char buffer[BUFFER_SIZE];
    
    printf("Max users: %d\\n", MAX_USERS);
    printf("Buffer size: %d\\n", BUFFER_SIZE);
    
    return 0;
}
\`\`\`

### **Status Codes**

\`\`\`c
#include <stdio.h>

#define SUCCESS 0
#define ERROR_FILE_NOT_FOUND 1
#define ERROR_PERMISSION_DENIED 2
#define ERROR_INVALID_INPUT 3

int process_file(void) {
    // ... file processing ...
    return SUCCESS;
}

int main(void) {
    int result = process_file();
    if (result == SUCCESS) {
        printf("File processed successfully\\n");
    }
    return 0;
}
\`\`\`

---

## 📊 Constants in Expressions

\`\`\`c
#include <stdio.h>

#define MIN_AGE 18
#define MAX_AGE 100
#define DEFAULT_SCORE 0

int main(void) {
    int age = 25;
    
    if (age >= MIN_AGE && age <= MAX_AGE) {
        printf("Age is valid\\n");
    }
    
    int score = DEFAULT_SCORE;
    printf("Score: %d\\n", score);
    
    return 0;
}
\`\`\`

---

## 🔍 Symbolic Constants vs Magic Numbers

### **❌ Using Magic Numbers (Bad Practice)**

\`\`\`c
// Hard to understand what these numbers mean
if (age >= 18 && age <= 100) {
    // ...
}
\`\`\`

### **✅ Using Named Constants (Good Practice)**

\`\`\`c
#define MIN_AGE 18
#define MAX_AGE 100

// Much clearer!
if (age >= MIN_AGE && age <= MAX_AGE) {
    // ...
}
\`\`\`

---

## ⚠️ Common Mistakes

### **Trying to Modify \`const\` Variables**

\`\`\`c
const int MAX = 100;
// MAX = 200;  // ❌ Error: assignment of read-only variable
\`\`\`

### **Forgetting Parentheses in #define Macros**

\`\`\`c
// ❌ Problematic
#define SQUARE(x) x * x
int result = SQUARE(3 + 2);  // Expands to: 3 + 2 * 3 + 2 = 11 (wrong!)

// ✅ Correct
#define SQUARE(x) ((x) * (x))
int result = SQUARE(3 + 2);  // Expands to: ((3 + 2) * (3 + 2)) = 25 (correct!)
\`\`\`

### **Using Wrong Type Suffix**

\`\`\`c
// ❌ Might cause precision issues
float pi = 3.14159;      // Treated as double, then converted

// ✅ Correct
float pi = 3.14159f;     // Explicitly float
\`\`\`

---

## 🎯 Practical Example: Temperature Converter

\`\`\`c
#include <stdio.h>

#define FREEZING_POINT_C 0
#define BOILING_POINT_C 100
#define FREEZING_POINT_F 32
#define FAHRENHEIT_SCALE 9.0f / 5.0f

int main(void) {
    float celsius, fahrenheit;
    
    printf("Enter temperature in Celsius: ");
    scanf("%f", &celsius);
    
    // Convert to Fahrenheit
    fahrenheit = (celsius * FAHRENHEIT_SCALE) + FREEZING_POINT_F;
    
    printf("Temperature: %.2f°C = %.2f°F\\n", celsius, fahrenheit);
    
    if (celsius <= FREEZING_POINT_C) {
        printf("Water is frozen\\n");
    } else if (celsius >= BOILING_POINT_C) {
        printf("Water is boiling\\n");
    }
    
    return 0;
}
\`\`\`

---

## 📚 Best Practices

1. **Use constants for magic numbers** - Makes code readable
2. **Use UPPERCASE for \`#define\`** - Follows C convention
3. **Use \`const\` for type safety** - Prefer over \`#define\` when possible
4. **Name constants descriptively** - \`MAX_SIZE\` not \`MS\`
5. **Group related constants** - Define them together

---

## 🎓 Key Takeaways

1. **Constants** are values that don't change
2. **\`#define\`** - Text replacement, no type checking
3. **\`const\`** - Type-safe variables that can't be modified
4. **Literals** are the actual values in code
5. **Use constants** to avoid magic numbers and improve code readability

Using constants makes your code more maintainable and less error-prone! 🔒✨`;
    return contentString;
  })()
};

