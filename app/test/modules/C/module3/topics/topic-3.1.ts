import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_1: SubLesson = {
  id: "3.1",
  title: 'Conditional Statements (if/else)',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🔀 Conditional Statements in C

Conditional statements allow your program to make decisions and execute different code based on conditions. The most important conditional statement in C is the \`if\` statement.

---

## 📋 Basic \`if\` Statement

### **Simple if Statement**

\`\`\`c
#include <stdio.h>

int main(void) {
    int age = 18;

    if (age >= 18) {
        printf("You are an adult!\\n");
    }

    return 0;
}
\`\`\`

**Output:**
\`\`\`
You are an adult!
\`\`\`

---

## 🔀 \`if-else\` Statement

### **Basic if-else**

\`\`\`c
#include <stdio.h>

int main(void) {
    int age = 16;

    if (age >= 18) {
        printf("You can vote!\\n");
    } else {
        printf("You cannot vote yet.\\n");
    }

    return 0;
}
\`\`\`

**Output:**
\`\`\`
You cannot vote yet.
\`\`\`

---

## 🌳 \`if-else if-else\` Chain

### **Multiple Conditions**

\`\`\`c
#include <stdio.h>

int main(void) {
    int score = 85;

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

**Output:**
\`\`\`
Grade: B
\`\`\`

---

## 🔄 Nested if Statements

### **if Inside if**

\`\`\`c
#include <stdio.h>

int main(void) {
    int age = 25;
    int hasLicense = 1;  // 1 = true, 0 = false

    if (age >= 18) {
        if (hasLicense) {
            printf("You can drive!\\n");
        } else {
            printf("You need to get a license first.\\n");
        }
    } else {
        printf("You are too young to drive.\\n");
    }

    return 0;
}
\`\`\`

**Output:**
\`\`\`
You can drive!
\`\`\`

---

## 📊 Comparison Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| \`==\` | Equal to | \`a == b\` |
| \`!=\` | Not equal to | \`a != b\` |
| \`<\` | Less than | \`a < b\` |
| \`>\` | Greater than | \`a > b\` |
| \`<=\` | Less than or equal to | \`a <= b\` |
| \`>=\` | Greater than or equal to | \`a >= b\` |

### **Examples with Comparison Operators**

\`\`\`c
#include <stdio.h>

int main(void) {
    int a = 10, b = 20;

    printf("a = %d, b = %d\\n\\n", a, b);

    if (a == b) printf("a equals b\\n");
    if (a != b) printf("a is not equal to b\\n");
    if (a < b) printf("a is less than b\\n");
    if (a > b) printf("a is greater than b\\n");
    if (a <= b) printf("a is less than or equal to b\\n");
    if (a >= b) printf("a is greater than or equal to b\\n");

    return 0;
}
\`\`\`

**Output:**
\`\`\`
a = 10, b = 20

a is not equal to b
a is less than b
a is less than or equal to b
\`\`\`

---

## 🎯 Practical Examples

### **Example 1: Temperature Check**

\`\`\`c
#include <stdio.h>

int main(void) {
    float temperature;

    printf("Enter temperature in Celsius: ");
    scanf("%f", &temperature);

    if (temperature > 30) {
        printf("It's hot! Stay hydrated.\\n");
    } else if (temperature > 20) {
        printf("Nice weather!\\n");
    } else if (temperature > 10) {
        printf("A bit chilly.\\n");
    } else {
        printf("It's cold! Wear warm clothes.\\n");
    }

    return 0;
}
\`\`\`

### **Example 2: Even or Odd Number**

\`\`\`c
#include <stdio.h>

int main(void) {
    int number;

    printf("Enter a number: ");
    scanf("%d", &number);

    if (number % 2 == 0) {
        printf("%d is even.\\n", number);
    } else {
        printf("%d is odd.\\n", number);
    }

    return 0;
}
\`\`\`

### **Example 3: Grade Calculator**

\`\`\`c
#include <stdio.h>

int main(void) {
    float score;

    printf("Enter your score (0-100): ");
    scanf("%f", &score);

    if (score < 0 || score > 100) {
        printf("Invalid score!\\n");
    } else if (score >= 90) {
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

---

## ⚠️ Common Mistakes

### **Using = Instead of ==**

\`\`\`c
// ❌ Wrong: assignment instead of comparison
int x = 5;
if (x = 10) {  // This assigns 10 to x and is always true!
    printf("This will always print!\\n");
}

// ✅ Correct: comparison
if (x == 10) {
    printf("x equals 10\\n");
}
\`\`\`

### **Missing Curly Braces**

\`\`\`c
// ❌ Wrong: only first statement is conditional
if (x > 0)
    printf("x is positive\\n");
    printf("This always prints!\\n");  // Not conditional!

// ✅ Correct: both statements are conditional
if (x > 0) {
    printf("x is positive\\n");
    printf("Good job!\\n");
}
\`\`\`

### **Floating Point Comparison Issues**

\`\`\`c
// ❌ Problematic: floating point precision
float x = 0.1 + 0.2;  // x might be 0.30000001
if (x == 0.3) {  // This might not work as expected!
    printf("x equals 0.3\\n");
}

// ✅ Better: use epsilon comparison (covered later)
\`\`\`

---

## 🎓 Key Takeaways

1. **\`if\` statement** executes code when condition is true
2. **\`else\` clause** executes when condition is false
3. **\`else if\` chains** test multiple conditions
4. **Comparison operators** (\`==\`, \`!=\`, \`<\`, \`>\`, \`<=\`, \`>=\`) compare values
5. **Always use \`==\` for comparison**, \`=\` is for assignment
6. **Use curly braces** \`{}\` for multi-statement blocks
7. **Conditions evaluate to** \`0\` (false) or non-zero (true)

Master conditional statements to make your programs intelligent and responsive! 🎯✨`;
    return contentString;
  })()
};
