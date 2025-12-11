import { SubLesson } from '../../../data/lessonsData';

export const topic_2_4: SubLesson = {
  id: 2.4,
  title: 'Basic Input/Output',
  status: 'completed',
  content: `# 📥📤 Basic Input/Output in C

Learn how to interact with users through input and output operations in C.

---

## 📤 Output with printf()

### Basic Printing
\`\`\`c
#include <stdio.h>

int main() {
    // Simple text output
    printf("Hello, World!\\n");
    printf("Welcome to C programming.\\n");

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Hello, World!
Welcome to C programming.
\`\`\`

### Format Specifiers
\`\`\`c
#include <stdio.h>

int main() {
    int age = 25;
    float height = 5.9f;
    char grade = 'A';
    char name[] = "John";

    // Format specifiers for different data types
    printf("Name: %s\\n", name);
    printf("Age: %d years\\n", age);
    printf("Height: %.1f feet\\n", height);
    printf("Grade: %c\\n", grade);

    return 0;
}
\`\`\`

---

## 📥 Input with scanf()

### Basic Input Reading
\`\`\`c
#include <stdio.h>

int main() {
    int age;
    char name[50];

    printf("Enter your name: ");
    scanf("%s", name);

    printf("Enter your age: ");
    scanf("%d", &age);

    printf("\\nHello %s! You are %d years old.\\n", name, age);

    return 0;
}
\`\`\`

**Sample Input/Output:**
\`\`\`
Enter your name: Alice
Enter your age: 30

Hello Alice! You are 30 years old.
\`\`\`

---

## 🔧 Format Specifiers Reference

| Data Type | Format Specifier | Example |
|-----------|------------------|---------|
| \`int\` | \`%d\` | \`printf("%d", 42);\` → \`42\` |
| \`unsigned int\` | \`%u\` | \`printf("%u", 42);\` → \`42\` |
| \`long\` | \`%ld\` | \`printf("%ld", 123456);\` → \`123456\` |
| \`float\` | \`%f\` | \`printf("%f", 3.14);\` → \`3.140000\` |
| \`double\` | \`%lf\` | \`printf("%lf", 3.14159);\` → \`3.141590\` |
| \`char\` | \`%c\` | \`printf("%c", 'A');\` → \`A\` |
| \`string\` | \`%s\` | \`printf("%s", "Hello");\` → \`Hello\` |

---

## 🎨 Formatting Output

### Precision and Width
\`\`\`c
#include <stdio.h>

int main() {
    float pi = 3.14159265359f;
    int number = 42;

    // Precision for floating point
    printf("Pi (2 decimals): %.2f\\n", pi);
    printf("Pi (4 decimals): %.4f\\n", pi);

    // Field width
    printf("Number with width 5: %5d\\n", number);
    printf("Number with width 10: %10d\\n", number);

    // Left alignment
    printf("Left aligned: %-10d\\n", number);

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Pi (2 decimals): 3.14
Pi (4 decimals): 3.1416
Number with width 5:    42
Number with width 10:         42
Left aligned: 42
\`\`\`

---

## 📝 Special Characters (Escape Sequences)

### Common Escape Sequences
\`\`\`c
#include <stdio.h>

int main() {
    printf("Line 1\\n");           // New line
    printf("Tab\\tseparated\\n");  // Tab
    printf("Quote: \\"Hello\\"\\n"); // Double quote
    printf("Apostrophe: \\'Hi\\'\\n"); // Single quote
    printf("Backslash: \\\\\\n");     // Backslash
    printf("Bell sound: \\a\\n");     // Bell (beep)

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Line 1
Tab	separated
Quote: "Hello"
Apostrophe: 'Hi'
Backslash: \
Bell sound: [beep sound]
\`\`\`

---

## 🧪 Input Examples

### Reading Different Data Types
\`\`\`c
#include <stdio.h>

int main() {
    int age;
    float salary;
    char grade;
    char name[50];

    printf("Enter your name: ");
    scanf("%s", name);

    printf("Enter your age: ");
    scanf("%d", &age);

    printf("Enter your salary: ");
    scanf("%f", &salary);

    printf("Enter your grade: ");
    scanf(" %c", &grade);  // Note the space before %c

    printf("\\n--- Employee Information ---\\n");
    printf("Name: %s\\n", name);
    printf("Age: %d\\n", age);
    printf("Salary: %.2f\\n", salary);
    printf("Grade: %c\\n", grade);

    return 0;
}
\`\`\`

### Multiple Values in One scanf()
\`\`\`c
#include <stdio.h>

int main() {
    int day, month, year;
    float x, y, z;

    printf("Enter date (dd mm yyyy): ");
    scanf("%d %d %d", &day, &month, &year);

    printf("Enter coordinates (x y z): ");
    scanf("%f %f %f", &x, &y, &z);

    printf("\\nDate: %02d/%02d/%04d\\n", day, month, year);
    printf("Coordinates: (%.2f, %.2f, %.2f)\\n", x, y, z);

    return 0;
}
\`\`\`

---

## ⚠️ Input Issues and Solutions

### Problem: Extra Characters in Input Buffer
\`\`\`c
#include <stdio.h>

int main() {
    int age;
    char name[50];

    printf("Enter name: ");
    scanf("%s", name);  // Leaves newline in buffer

    printf("Enter age: ");
    scanf("%d", &age);  // May not work properly

    return 0;
}
\`\`\`

**Solution 1: Use space before %c**
\`\`\`c
scanf(" %c", &grade);  // Space consumes whitespace
\`\`\`

**Solution 2: Clear input buffer**
\`\`\`c
#include <stdio.h>

int main() {
    int age;
    char name[50];

    printf("Enter name: ");
    scanf("%s", name);

    // Clear input buffer
    while (getchar() != '\\n');

    printf("Enter age: ");
    scanf("%d", &age);

    return 0;
}
\`\`\`

---

## 🛠️ Advanced Formatting

### Multiple Arguments
\`\`\`c
#include <stdio.h>

int main() {
    char name[] = "Alice";
    int age = 25;
    float gpa = 3.75f;

    printf("%s is %d years old with GPA %.2f\\n", name, age, gpa);

    return 0;
}
\`\`\`

### Table Formatting
\`\`\`c
#include <stdio.h>

int main() {
    printf("%-10s %-5s %-5s\\n", "Name", "Age", "GPA");
    printf("%-10s %-5s %-5s\\n", "--------", "---", "---");
    printf("%-10s %-5d %-5.2f\\n", "Alice", 25, 3.75);
    printf("%-10s %-5d %-5.2f\\n", "Bob", 22, 3.50);
    printf("%-10s %-5d %-5.2f\\n", "Charlie", 28, 4.00);

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Name       Age   GPA
--------   ---   ---
Alice      25    3.75
Bob        22    3.50
Charlie    28    4.00
\`\`\`

---

## 🧪 Complete Programs

### Temperature Converter
\`\`\`c
#include <stdio.h>

int main() {
    float celsius, fahrenheit;
    int choice;

    printf("Temperature Converter\\n");
    printf("1. Celsius to Fahrenheit\\n");
    printf("2. Fahrenheit to Celsius\\n");
    printf("Enter choice (1 or 2): ");
    scanf("%d", &choice);

    if (choice == 1) {
        printf("Enter temperature in Celsius: ");
        scanf("%f", &celsius);
        fahrenheit = (celsius * 9/5) + 32;
        printf("%.2f°C = %.2f°F\\n", celsius, fahrenheit);
    } else if (choice == 2) {
        printf("Enter temperature in Fahrenheit: ");
        scanf("%f", &fahrenheit);
        celsius = (fahrenheit - 32) * 5/9;
        printf("%.2f°F = %.2f°C\\n", fahrenheit, celsius);
    } else {
        printf("Invalid choice!\\n");
    }

    return 0;
}
\`\`\`

### Simple Calculator
\`\`\`c
#include <stdio.h>

int main() {
    float num1, num2, result;
    char operator;

    printf("Simple Calculator\\n");
    printf("Enter first number: ");
    scanf("%f", &num1);

    printf("Enter operator (+, -, *, /): ");
    scanf(" %c", &operator);

    printf("Enter second number: ");
    scanf("%f", &num2);

    printf("\\n%.2f %c %.2f = ", num1, operator, num2);

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
            if (num2 != 0) {
                result = num1 / num2;
            } else {
                printf("Error: Division by zero!\\n");
                return 1;
            }
            break;
        default:
            printf("Error: Invalid operator!\\n");
            return 1;
    }

    printf("%.2f\\n", result);
    return 0;
}
\`\`\`

---

## 🐛 Common I/O Mistakes

### Forgetting Ampersand (&)
\`\`\`c
int age;
// scanf("%d", age);  // ❌ Wrong! Missing &
scanf("%d", &age);     // ✓ Correct!
\`\`\`

### Wrong Format Specifier
\`\`\`c
int x = 42;
float y = 3.14f;

// printf("%f", x);  // ❌ Wrong specifier for int
printf("%d", x);      // ✓ Correct

// printf("%d", y);  // ❌ Wrong specifier for float
printf("%f", y);      // ✓ Correct
\`\`\`

### Buffer Overflow
\`\`\`c
char name[10];  // Only 10 characters
// scanf("%s", name);  // ❌ Dangerous if input > 10 chars
// Use fgets() or limit input instead
\`\`\`

---

## 📚 Additional I/O Functions

### puts() and gets() (Simple)
\`\`\`c
#include <stdio.h>

int main() {
    char name[50];

    puts("Enter your name:");
    gets(name);  // ⚠️ Unsafe! Use fgets() instead

    puts("Hello");
    puts(name);

    return 0;
}
\`\`\`

### Safer Input with fgets()
\`\`\`c
#include <stdio.h>
#include <string.h>

int main() {
    char name[50];

    printf("Enter your name: ");
    fgets(name, sizeof(name), stdin);

    // Remove trailing newline
    name[strcspn(name, "\\n")] = 0;

    printf("Hello %s!\\n", name);

    return 0;
}
\`\`\`

---

## 🧪 Practice Exercises

### Exercise 1: Personal Profile
Create a program that asks for name, age, and favorite color, then displays a profile.

### Exercise 2: Rectangle Calculator
Write a program that calculates area and perimeter of a rectangle using user input.

### Exercise 3: Grade Calculator
Create a program that takes marks for 3 subjects and calculates average and grade.

### Exercise 4: Currency Converter
Build a program that converts between different currencies using exchange rates.

---

## 🎯 Key Takeaways

1. **printf()** displays formatted output to screen
2. **scanf()** reads formatted input from keyboard
3. **Format specifiers** control how data is displayed/read
4. **& operator** is required before variables in scanf()
5. **Escape sequences** add special characters
6. **Input validation** prevents program crashes
7. **Clear input buffer** when mixing input types

---

## 🚀 Preview: Constants and Literals

In the next topic, you'll learn about:
- **Constants** - values that don't change
- **Literals** - fixed values in code
- **const keyword** - declaring constant variables
- **#define** - preprocessor constants

**I/O makes programs interactive - constants make them reliable!** 🔒`
};
