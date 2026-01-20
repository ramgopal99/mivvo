import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_1: SubLesson = {
  id: "3.1",
  title: 'If-Else Statements',
  status: 'completed',
  content: `\`# 🔀 If-Else Statements

Conditional statements allow your program to make decisions and execute different code based on conditions. The if-else statement is the most fundamental control flow construct in C++.

---

## 🎯 Basic If Statement

### **Syntax**
\`\`\`cpp
if (condition) {
    // Code to execute if condition is true
}
\`\`\`

### **Example**
\`\`\`cpp
#include <iostream>

int main() {
    int age = 18;

    if (age >= 18) {
        std::cout << "You are eligible to vote!" << std::endl;
    }

    return 0;
}
\`\`\`

---

## 🔀 If-Else Statement

### **Syntax**
\`\`\`cpp
if (condition) {
    // Code to execute if condition is true
} else {
    // Code to execute if condition is false
}
\`\`\`

### **Example**
\`\`\`cpp
int temperature = 25;

if (temperature > 30) {
    std::cout << "It's hot outside!" << std::endl;
} else {
    std::cout << "The temperature is comfortable." << std::endl;
}
\`\`\`

---

## 🔄 If-Else If-Else Ladder

### **Syntax**
\`\`\`cpp
if (condition1) {
    // Code for condition1
} else if (condition2) {
    // Code for condition2
} else if (condition3) {
    // Code for condition3
} else {
    // Code if none of the above conditions are true
}
\`\`\`

### **Example**
\`\`\`cpp
int score = 85;

if (score >= 90) {
    std::cout << "Grade: A" << std::endl;
} else if (score >= 80) {
    std::cout << "Grade: B" << std::endl;
} else if (score >= 70) {
    std::cout << "Grade: C" << std::endl;
} else if (score >= 60) {
    std::cout << "Grade: D" << std::endl;
} else {
    std::cout << "Grade: F" << std::endl;
}
\`\`\`

---

## ❓ Conditions in C++

### **Comparison Operators**
| Operator | Meaning | Example |
|----------|---------|---------|
| \`==\` | Equal to | \`a == b\` |
| \`!=\` | Not equal to | \`a != b\` |
| \`<\` | Less than | \`a < b\` |
| \`>\` | Greater than | \`a > b\` |
| \`<=\` | Less than or equal to | \`a <= b\` |
| \`>=\` | Greater than or equal to | \`a >= b\` |

### **Logical Operators**
| Operator | Meaning | Example |
|----------|---------|---------|
| \`&&\` | Logical AND | \`a && b\` |
| \`\\|\\|\` | Logical OR | \`a \\|\\| b\` |
| \`!\` | Logical NOT | \`!a\` |

### **Examples**
\`\`\`cpp
int age = 25;
bool hasLicense = true;

// Complex conditions
if (age >= 18 && hasLicense) {
    std::cout << "You can drive!" << std::endl;
}

if (age < 18 || !hasLicense) {
    std::cout << "You cannot drive." << std::endl;
}
\`\`\`

---

## 🎨 Best Practices

### **Use Braces Even for Single Statements**
\`\`\`cpp
// ✅ Good practice
if (age >= 18) {
    std::cout << "Adult" << std::endl;
    canVote = true;
}

// ❌ Avoid (can lead to bugs)
if (age >= 18)
    std::cout << "Adult" << std::endl;
    canVote = true;  // This always executes!
\`\`\`

### **Clear Condition Formatting**
\`\`\`cpp
// ✅ Clear and readable
if (temperature > 30 && humidity > 70) {
    std::cout << "Uncomfortable weather" << std::endl;
}

// ❌ Hard to read
if (temperature>30&&humidity>70) {
    std::cout << "Uncomfortable weather" << std::endl;
}
\`\`\`

### **Avoid Deep Nesting**
\`\`\`cpp
// ✅ Use early returns or logical operators
if (age < 18) {
    std::cout << "Too young" << std::endl;
    return;
}

if (!hasLicense) {
    std::cout << "Need license" << std::endl;
    return;
}

std::cout << "You can drive!" << std::endl;

// ❌ Deep nesting (hard to read)
if (age >= 18) {
    if (hasLicense) {
        std::cout << "You can drive!" << std::endl;
    } else {
        std::cout << "Need license" << std::endl;
    }
} else {
    std::cout << "Too young" << std::endl;
}
\`\`\`

---

## 🚨 Common Mistakes

### **Assignment vs Comparison**
\`\`\`cpp
int x = 5;

// ❌ Wrong: assignment in condition
if (x = 10) {  // Always true, assigns 10 to x
    std::cout << "This always executes" << std::endl;
}

// ✅ Correct: comparison
if (x == 10) {
    std::cout << "x equals 10" << std::endl;
}
\`\`\`

### **Floating-Point Comparison**
\`\`\`cpp
double x = 0.1 + 0.2;  // May not exactly equal 0.3

// ❌ Unreliable floating-point comparison
if (x == 0.3) {
    std::cout << "Equal" << std::endl;
}

// ✅ Better approach (with epsilon)
const double EPSILON = 1e-9;
if (std::abs(x - 0.3) < EPSILON) {
    std::cout << "Approximately equal" << std::endl;
}
\`\`\`

### **Integer Division**
\`\`\`cpp
int a = 5, b = 2;

// ❌ Unexpected result
if (a / b == 2.5) {  // 5/2 = 2 (integer division)
    // This won't execute
}

// ✅ Correct
if (static_cast<double>(a) / b == 2.5) {
    std::cout << "Equal" << std::endl;
}
\`\`\`

---

## 🎯 Summary

**If-Else Statement Components:**
- **Condition**: Expression that evaluates to true or false
- **If block**: Executes when condition is true
- **Else block**: Executes when condition is false
- **Else-if**: Chains multiple conditions

**Key Points:**
- Always use braces for clarity and to prevent bugs
- Conditions can be simple or complex expressions
- Logical operators combine multiple conditions
- Avoid deep nesting when possible
- Be careful with assignment vs comparison operators

**Next:** Now that you understand if-else statements, let's explore loops for repetitive execution! 🔄\``
};