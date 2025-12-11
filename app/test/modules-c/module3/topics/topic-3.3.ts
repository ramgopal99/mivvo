import { SubLesson } from '../../../data/lessonsData';

export const topic_3_3: SubLesson = {
  id: 3.3,
  title: 'switch Statements',
  status: 'completed',
  content: `# 🔄 switch Statements

Learn how to handle multiple choices elegantly using switch statements instead of long if-else chains.

---

## 📋 Basic switch Syntax

### Structure
\`\`\`c
switch (expression) {
    case value1:
        // Code for value1
        break;

    case value2:
        // Code for value2
        break;

    default:
        // Code for unmatched values
        break;
}
\`\`\`

### Simple Example
\`\`\`c
#include <stdio.h>

int main() {
    int day = 3;

    switch (day) {
        case 1:
            printf("Monday\\n");
            break;

        case 2:
            printf("Tuesday\\n");
            break;

        case 3:
            printf("Wednesday\\n");
            break;

        case 4:
            printf("Thursday\\n");
            break;

        case 5:
            printf("Friday\\n");
            break;

        default:
            printf("Invalid day\\n");
            break;
    }

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Wednesday
\`\`\`

---

## 🔍 How switch Works

### Expression Evaluation
\`\`\`c
int choice = 2;

// Expression is evaluated once
switch (choice) {
    case 1:
        printf("Option 1\\n");
        break;

    case 2:  // This case matches
        printf("Option 2\\n");
        break;

    case 3:
        printf("Option 3\\n");
        break;
}
\`\`\`

### Fall-Through Behavior
\`\`\`c
#include <stdio.h>

int main() {
    int number = 2;

    switch (number) {
        case 1:
            printf("One\\n");
            // No break - execution continues!

        case 2:
            printf("Two\\n");
            // No break - continues to next case!

        case 3:
            printf("Three\\n");
            break;

        default:
            printf("Other\\n");
    }

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Two
Three
\`\`\`

---

## 🧪 Practical Examples

### Menu System
\`\`\`c
#include <stdio.h>

int main() {
    int choice;

    printf("=== Calculator Menu ===\\n");
    printf("1. Addition\\n");
    printf("2. Subtraction\\n");
    printf("3. Multiplication\\n");
    printf("4. Division\\n");
    printf("5. Exit\\n");
    printf("Enter your choice: ");
    scanf("%d", &choice);

    switch (choice) {
        case 1:
            printf("Addition selected\\n");
            break;

        case 2:
            printf("Subtraction selected\\n");
            break;

        case 3:
            printf("Multiplication selected\\n");
            break;

        case 4:
            printf("Division selected\\n");
            break;

        case 5:
            printf("Goodbye!\\n");
            break;

        default:
            printf("Invalid choice! Please select 1-5.\\n");
            break;
    }

    return 0;
}
\`\`\`

### Grade Converter
\`\`\`c
#include <stdio.h>

int main() {
    char grade;

    printf("Enter letter grade (A-F): ");
    scanf(" %c", &grade);

    switch (grade) {
        case 'A':
        case 'a':
            printf("Excellent! 90-100%%\\n");
            break;

        case 'B':
        case 'b':
            printf("Good job! 80-89%%\\n");
            break;

        case 'C':
        case 'c':
            printf("Satisfactory. 70-79%%\\n");
            break;

        case 'D':
        case 'd':
            printf("Needs improvement. 60-69%%\\n");
            break;

        case 'F':
        case 'f':
            printf("Failed. Below 60%%\\n");
            break;

        default:
            printf("Invalid grade entered.\\n");
            break;
    }

    return 0;
}
\`\`\`

### Month Name Display
\`\`\`c
#include <stdio.h>

int main() {
    int month;

    printf("Enter month number (1-12): ");
    scanf("%d", &month);

    switch (month) {
        case 1:
            printf("January\\n");
            break;
        case 2:
            printf("February\\n");
            break;
        case 3:
            printf("March\\n");
            break;
        case 4:
            printf("April\\n");
            break;
        case 5:
            printf("May\\n");
            break;
        case 6:
            printf("June\\n");
            break;
        case 7:
            printf("July\\n");
            break;
        case 8:
            printf("August\\n");
            break;
        case 9:
            printf("September\\n");
            break;
        case 10:
            printf("October\\n");
            break;
        case 11:
            printf("November\\n");
            break;
        case 12:
            printf("December\\n");
            break;
        default:
            printf("Invalid month!\\n");
            break;
    }

    return 0;
}
\`\`\`

---

## 🎯 Advanced switch Features

### Multiple Cases for Same Action
\`\`\`c
#include <stdio.h>

int main() {
    char vowel;

    printf("Enter a character: ");
    scanf(" %c", &vowel);

    switch (vowel) {
        case 'a':
        case 'A':
        case 'e':
        case 'E':
        case 'i':
        case 'I':
        case 'o':
        case 'O':
        case 'u':
        case 'U':
            printf("%c is a vowel.\\n", vowel);
            break;

        default:
            printf("%c is a consonant.\\n", vowel);
            break;
    }

    return 0;
}
\`\`\`

### Range Checking with switch
\`\`\`c
#include <stdio.h>

int main() {
    int score;

    printf("Enter exam score (0-100): ");
    scanf("%d", &score);

    // Convert score to grade category
    switch (score / 10) {
        case 10:
        case 9:
            printf("Grade: A\\n");
            break;
        case 8:
            printf("Grade: B\\n");
            break;
        case 7:
            printf("Grade: C\\n");
            break;
        case 6:
            printf("Grade: D\\n");
            break;
        case 5:
        case 4:
        case 3:
        case 2:
        case 1:
        case 0:
            printf("Grade: F\\n");
            break;
        default:
            printf("Invalid score!\\n");
            break;
    }

    return 0;
}
\`\`\`

---

## 🔄 switch vs if-else Comparison

### When to Use switch
\`\`\`c
// ✅ Good for switch: single variable, multiple discrete values
int day = 3;
switch (day) {
    case 1: printf("Monday\\n"); break;
    case 2: printf("Tuesday\\n"); break;
    case 3: printf("Wednesday\\n"); break;
    // ...
}
\`\`\`

### When to Use if-else
\`\`\`c
// ✅ Good for if-else: ranges, complex conditions
int age = 25;
if (age >= 0 && age <= 12) {
    printf("Child\\n");
} else if (age <= 19) {
    printf("Teenager\\n");
} else if (age <= 64) {
    printf("Adult\\n");
} else {
    printf("Senior\\n");
}
\`\`\`

### Equivalent Code Comparison
\`\`\`c
// Using switch
int choice = 2;
switch (choice) {
    case 1: printf("One\\n"); break;
    case 2: printf("Two\\n"); break;
    case 3: printf("Three\\n"); break;
}

// Equivalent if-else
int choice = 2;
if (choice == 1) {
    printf("One\\n");
} else if (choice == 2) {
    printf("Two\\n");
} else if (choice == 3) {
    printf("Three\\n");
}
\`\`\`

---

## 🐛 Common switch Mistakes

### Forgetting break
\`\`\`c
// ❌ Fall-through bug
switch (x) {
    case 1:
        printf("One\\n");
        // Missing break!
    case 2:
        printf("Two\\n");  // This executes for both 1 and 2!
        break;
}

// ✅ Correct
switch (x) {
    case 1:
        printf("One\\n");
        break;
    case 2:
        printf("Two\\n");
        break;
}
\`\`\`

### No Default Case
\`\`\`c
// ❌ No handling for invalid values
switch (month) {
    case 1: printf("Jan\\n"); break;
    case 2: printf("Feb\\n"); break;
    // ...
}

// ✅ Include default
switch (month) {
    case 1: printf("Jan\\n"); break;
    case 2: printf("Feb\\n"); break;
    // ...
    default: printf("Invalid month\\n"); break;
}
\`\`\`

### Wrong Data Types
\`\`\`c
// ❌ Float in switch (not allowed)
float value = 3.14f;
switch (value) {  // Compilation error!
    case 3.14f: printf("Pi\\n"); break;
}

// ✅ Use int or char
int choice = 3;
switch (choice) {
    case 1: /* ... */ break;
    case 2: /* ... */ break;
    case 3: /* ... */ break;
}
\`\`\`

---

## 💡 switch Best Practices

### Consistent Formatting
\`\`\`c
// ✅ Good alignment
switch (value) {
    case 1:
        action1();
        break;

    case 2:
        action2();
        break;

    default:
        defaultAction();
        break;
}
\`\`\`

### Comment Fall-Through
\`\`\`c
switch (grade) {
    case 'A':
    case 'a':  // Fall through to lowercase
        printf("Excellent\\n");
        break;

    case 'B':
    case 'b':  // Fall through to lowercase
        printf("Good\\n");
        break;
}
\`\`\`

### Group Related Cases
\`\`\`c
// Group weekdays vs weekend
switch (day) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
        printf("Weekday\\n");
        break;

    case 6:
    case 7:
        printf("Weekend\\n");
        break;

    default:
        printf("Invalid day\\n");
        break;
}
\`\`\`

---

## 🧪 Complex Examples

### Calculator with switch
\`\`\`c
#include <stdio.h>

int main() {
    double num1, num2, result;
    char operator;

    printf("Enter first number: ");
    scanf("%lf", &num1);

    printf("Enter operator (+, -, *, /): ");
    scanf(" %c", &operator);

    printf("Enter second number: ");
    scanf("%lf", &num2);

    switch (operator) {
        case '+':
            result = num1 + num2;
            printf("%.2lf + %.2lf = %.2lf\\n", num1, num2, result);
            break;

        case '-':
            result = num1 - num2;
            printf("%.2lf - %.2lf = %.2lf\\n", num1, num2, result);
            break;

        case '*':
            result = num1 * num2;
            printf("%.2lf * %.2lf = %.2lf\\n", num1, num2, result);
            break;

        case '/':
            if (num2 != 0) {
                result = num1 / num2;
                printf("%.2lf / %.2lf = %.2lf\\n", num1, num2, result);
            } else {
                printf("Error: Division by zero!\\n");
            }
            break;

        default:
            printf("Error: Invalid operator!\\n");
            break;
    }

    return 0;
}
\`\`\`

### Roman Numeral Converter
\`\`\`c
#include <stdio.h>

int main() {
    int number;

    printf("Enter a number (1-10): ");
    scanf("%d", &number);

    printf("Roman numeral: ");
    switch (number) {
        case 1: printf("I\\n"); break;
        case 2: printf("II\\n"); break;
        case 3: printf("III\\n"); break;
        case 4: printf("IV\\n"); break;
        case 5: printf("V\\n"); break;
        case 6: printf("VI\\n"); break;
        case 7: printf("VII\\n"); break;
        case 8: printf("VIII\\n"); break;
        case 9: printf("IX\\n"); break;
        case 10: printf("X\\n"); break;
        default: printf("Number out of range!\\n"); break;
    }

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **switch** handles multiple discrete values elegantly
2. **case labels** match specific values
3. **break** prevents fall-through to next case
4. **default** handles unmatched values
5. **Fall-through** can be intentional (document it!)
6. **Use switch** for single variable with multiple choices
7. **Use if-else** for ranges and complex conditions

---

## 🚀 Preview: for Loops

In the next topic, you'll learn about:
- **for loops** for fixed iteration counts
- **Loop initialization, condition, and increment**
- **Nested loops** for multi-dimensional processing
- **Common for loop patterns**

**switch makes multiple choices - loops repeat actions!** 🔁`
};
