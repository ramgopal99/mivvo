import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_3: SubLesson = {
  id: "2.3",
  title: 'Input & Output (printf & scanf)',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 📥📤 Input & Output in C

C uses functions from \`stdio.h\` for input and output operations. The most important ones are \`printf()\` for output and \`scanf()\` for input.

---

## 📤 Output with \`printf()\`

### **Basic \`printf()\` Usage**

\`\`\`c
#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}
\`\`\`

### **Printing Variables with Format Specifiers**

\`\`\`c
#include <stdio.h>

int main(void) {
    int age = 25;
    float height = 5.9f;
    char grade = 'A';

    printf("Age: %d\\n", age);          // %d for integers
    printf("Height: %.1f\\n", height);  // %.1f for float with 1 decimal
    printf("Grade: %c\\n", grade);      // %c for characters

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Age: 25
Height: 5.9
Grade: A
\`\`\`

---

## 📋 Format Specifiers

Format specifiers tell \`printf()\` how to format the output:

| Specifier | Type | Example |
|-----------|------|---------|
| \`%d\` or \`%i\` | Integer | \`printf("%d", 42);\` |
| \`%f\` | Float | \`printf("%f", 3.14);\` |
| \`%lf\` | Double | \`printf("%lf", 3.14159);\` |
| \`%c\` | Character | \`printf("%c", 'A');\` |
| \`%s\` | String | \`printf("%s", "Hello");\` |
| \`%u\` | Unsigned int | \`printf("%u", 100);\` |
| \`%x\` or \`%X\` | Hexadecimal | \`printf("%x", 255);\` |
| \`%o\` | Octal | \`printf("%o", 64);\` |
| \`%p\` | Pointer | \`printf("%p", &var);\` |
| \`%%\` | Literal % | \`printf("%%");\` |

---

## 🎨 Formatting Options

### **Width and Precision**

\`\`\`c
#include <stdio.h>

int main(void) {
    int num = 42;
    float pi = 3.14159f;

    // Width: minimum number of characters
    printf("|%5d|\\n", num);      // |   42|
    printf("|%-5d|\\n", num);     // |42   | (left-aligned)

    // Precision for floats
    printf("%.2f\\n", pi);        // 3.14 (2 decimal places)
    printf("%.4f\\n", pi);        // 3.1416 (4 decimal places)

    // Width and precision together
    printf("|%8.2f|\\n", pi);     // |    3.14| (8 width, 2 decimals)

    return 0;
}
\`\`\`

### **Multiple Variables**

\`\`\`c
#include <stdio.h>

int main(void) {
    int age = 25;
    float height = 5.9f;
    char name[] = "John";

    printf("Name: %s, Age: %d, Height: %.1f\\n", name, age, height);

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Name: John, Age: 25, Height: 5.9
\`\`\`

---

## 📥 Input with \`scanf()\`

### **Reading a Single Value**

\`\`\`c
#include <stdio.h>

int main(void) {
    int age;

    printf("Enter your age: ");
    scanf("%d", &age);  // Note: &age (address of age)

    printf("You are %d years old.\\n", age);

    return 0;
}
\`\`\`

**Important**: Use \`&\` (address-of operator) before variable name in \`scanf()\`!

### **Reading Multiple Values**

\`\`\`c
#include <stdio.h>

int main(void) {
    int age, height;

    printf("Enter age and height: ");
    scanf("%d %d", &age, &height);

    printf("Age: %d, Height: %d\\n", age, height);

    return 0;
}
\`\`\`

### **Reading Different Data Types**

\`\`\`c
#include <stdio.h>

int main(void) {
    int age;
    float gpa;
    char grade;
    char name[50];

    printf("Enter age: ");
    scanf("%d", &age);

    printf("Enter GPA: ");
    scanf("%f", &gpa);

    printf("Enter grade: ");
    scanf(" %c", &grade);  // Note: space before %c to skip whitespace

    printf("Enter name: ");
    scanf("%s", name);     // Note: no & for arrays/strings

    printf("\\nStudent Info:\\n");
    printf("Name: %s\\n", name);
    printf("Age: %d\\n", age);
    printf("GPA: %.2f\\n", gpa);
    printf("Grade: %c\\n", grade);

    return 0;
}
\`\`\`

---

## ⚠️ Common \`scanf()\` Issues

### **Issue 1: Forgetting \`&\` for non-array variables**

\`\`\`c
// ❌ Wrong
int age;
scanf("%d", age);  // Missing &

// ✅ Correct
int age;
scanf("%d", &age);  // Correct
\`\`\`

### **Issue 2: Using \`&\` for strings/arrays**

\`\`\`c
// ❌ Wrong
char name[50];
scanf("%s", &name);  // Don't use & for arrays

// ✅ Correct
char name[50];
scanf("%s", name);   // Correct (array name is already a pointer)
\`\`\`

### **Issue 3: Newline left in buffer**

\`\`\`c
// Problem: scanf may leave \\n in buffer
int num;
char ch;
scanf("%d", &num);    // User enters 5 and presses Enter
scanf("%c", &ch);     // ch might capture the newline!

// Solution: Add space before %c
scanf(" %c", &ch);    // Space skips whitespace
\`\`\`

---

## 🔄 Complete Input/Output Example

\`\`\`c
#include <stdio.h>

int main(void) {
    char name[50];
    int age;
    float height;

    // Get input
    printf("Enter your name: ");
    scanf("%s", name);

    printf("Enter your age: ");
    scanf("%d", &age);

    printf("Enter your height (in feet): ");
    scanf("%f", &height);

    // Display output
    printf("\\n=== Personal Information ===\\n");
    printf("Name: %s\\n", name);
    printf("Age: %d years\\n", age);
    printf("Height: %.1f feet\\n", height);

    return 0;
}
\`\`\`

**Sample Run:**
\`\`\`
Enter your name: Alice
Enter your age: 25
Enter your height (in feet): 5.6

=== Personal Information ===
Name: Alice
Age: 25 years
Height: 5.6 feet
\`\`\`

---

## 🎯 Format Specifiers for \`scanf()\`

| Specifier | Type | Example |
|-----------|------|---------|
| \`%d\` | Integer | \`scanf("%d", &num);\` |
| \`%f\` | Float | \`scanf("%f", &price);\` |
| \`%lf\` | Double | \`scanf("%lf", &value);\` |
| \`%c\` | Character | \`scanf(" %c", &ch);\` |
| \`%s\` | String | \`scanf("%s", name);\` |
| \`%u\` | Unsigned int | \`scanf("%u", &count);\` |

**Note**: For strings with spaces, use \`fgets()\` (covered later) instead of \`scanf()\`.

---

## 📝 Practice Example: Calculator

\`\`\`c
#include <stdio.h>

int main(void) {
    float num1, num2, result;

    printf("=== Simple Calculator ===\\n");
    printf("Enter first number: ");
    scanf("%f", &num1);

    printf("Enter second number: ");
    scanf("%f", &num2);

    result = num1 + num2;
    printf("\\n%.2f + %.2f = %.2f\\n", num1, num2, result);

    result = num1 - num2;
    printf("%.2f - %.2f = %.2f\\n", num1, num2, result);

    result = num1 * num2;
    printf("%.2f * %.2f = %.2f\\n", num1, num2, result);

    if (num2 != 0) {
        result = num1 / num2;
        printf("%.2f / %.2f = %.2f\\n", num1, num2, result);
    } else {
        printf("Cannot divide by zero!\\n");
    }

    return 0;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **\`printf()\`** is for output, **\`scanf()\`** is for input
2. **Format specifiers** tell C how to format/read data
3. **Always use \`&\`** before variable names in \`scanf()\` (except arrays/strings)
4. **Match format specifiers** with variable types
5. **Test your input** to handle edge cases

Mastering I/O is essential for interactive C programs! 🚀✨`;
    return contentString;
  })()
};

