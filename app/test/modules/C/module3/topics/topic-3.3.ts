import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_3: SubLesson = {
  id: "3.3",
  title: 'Switch Statements',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🔀 Switch Statements in C

The \`switch\` statement provides an elegant way to handle multiple conditions based on the value of a single expression. It's often a cleaner alternative to long \`if-else if\` chains.

---

## 📋 Basic \`switch\` Statement

### **Simple Switch Example**

\`\`\`c
#include <stdio.h>

int main(void) {
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
        case 6:
            printf("Saturday\\n");
            break;
        case 7:
            printf("Sunday\\n");
            break;
        default:
            printf("Invalid day\\n");
    }

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Wednesday
\`\`\`

---

## 🔧 Switch Components

### **Expression**
The value to be tested against case labels:

\`\`\`c
int choice = 2;
char grade = 'B';
char operation = '+';
\`\`\`

### **Case Labels**
Constant values that the expression is compared against:

\`\`\`c
case 1:    // integer constant
case 'A':  // character constant
case 3.14: // floating-point constant (uncommon)
\`\`\`

### **Break Statement**
Exits the switch block. **Very important!**

### **Default Case**
Executes when no case matches (optional but recommended):

---

## 🎯 Fall-Through Behavior

### **Without break (Intentional Fall-Through)**

\`\`\`c
#include <stdio.h>

int main(void) {
    int level = 2;

    switch (level) {
        case 1:
            printf("Basic features\\n");
            // No break - falls through to next case
        case 2:
            printf("Advanced features\\n");
            // No break - falls through to next case
        case 3:
            printf("Premium features\\n");
            break;
        default:
            printf("Invalid level\\n");
    }

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Advanced features
Premium features
\`\`\`

---

## 🔄 Switch with Characters

### **Grade Calculator**

\`\`\`c
#include <stdio.h>

int main(void) {
    char grade;

    printf("Enter your grade (A, B, C, D, F): ");
    scanf(" %c", &grade);  // Note the space before %c

    switch (grade) {
        case 'A':
            printf("Excellent work!\\n");
            break;
        case 'B':
            printf("Good job!\\n");
            break;
        case 'C':
            printf("Satisfactory\\n");
            break;
        case 'D':
            printf("Needs improvement\\n");
            break;
        case 'F':
            printf("Failed\\n");
            break;
        default:
            printf("Invalid grade\\n");
    }

    return 0;
}
\`\`\`

---

## 🔢 Switch with Multiple Cases

### **Grouping Cases**

\`\`\`c
#include <stdio.h>

int main(void) {
    int month;

    printf("Enter month (1-12): ");
    scanf("%d", &month);

    switch (month) {
        case 12:
        case 1:
        case 2:
            printf("Winter\\n");
            break;
        case 3:
        case 4:
        case 5:
            printf("Spring\\n");
            break;
        case 6:
        case 7:
        case 8:
            printf("Summer\\n");
            break;
        case 9:
        case 10:
        case 11:
            printf("Fall\\n");
            break;
        default:
            printf("Invalid month\\n");
    }

    return 0;
}
\`\`\`

---

## 🧮 Calculator with Switch

### **Simple Calculator**

\`\`\`c
#include <stdio.h>

int main(void) {
    float num1, num2, result;
    char operator;

    printf("Enter first number: ");
    scanf("%f", &num1);

    printf("Enter operator (+, -, *, /): ");
    scanf(" %c", &operator);

    printf("Enter second number: ");
    scanf("%f", &num2);

    switch (operator) {
        case '+':
            result = num1 + num2;
            printf("%.2f + %.2f = %.2f\\n", num1, num2, result);
            break;
        case '-':
            result = num1 - num2;
            printf("%.2f - %.2f = %.2f\\n", num1, num2, result);
            break;
        case '*':
            result = num1 * num2;
            printf("%.2f * %.2f = %.2f\\n", num1, num2, result);
            break;
        case '/':
            if (num2 != 0) {
                result = num1 / num2;
                printf("%.2f / %.2f = %.2f\\n", num1, num2, result);
            } else {
                printf("Error: Division by zero\\n");
            }
            break;
        default:
            printf("Invalid operator\\n");
    }

    return 0;
}
\`\`\`

---

## 📊 Switch vs if-else

### **When to Use Switch**

✅ **Use switch when:**
- Testing single variable against multiple constant values
- Many cases to check
- Cases are mostly integers or characters
- Performance matters (switch can be faster)

❌ **Use if-else when:**
- Complex conditions with logical operators
- Range checking (>, <, >=, <=)
- Floating-point comparisons
- String comparisons

### **Comparison Example**

\`\`\`c
// Better with switch
int day = 3;
switch (day) {
    case 1: printf("Monday"); break;
    case 2: printf("Tuesday"); break;
    // ...
}

// Better with if-else
int age = 25;
if (age >= 18 && age <= 65) {
    printf("Working age");
} else if (age < 18) {
    printf("Minor");
} else {
    printf("Retired");
}
\`\`\`

---

## 🎯 Advanced Switch Patterns

### **Menu System**

\`\`\`c
#include <stdio.h>

int main(void) {
    int choice;

    printf("Menu:\\n");
    printf("1. Check balance\\n");
    printf("2. Deposit\\n");
    printf("3. Withdraw\\n");
    printf("4. Exit\\n");
    printf("Enter choice: ");
    scanf("%d", &choice);

    switch (choice) {
        case 1:
            printf("Your balance is $1000\\n");
            break;
        case 2:
            printf("Deposit functionality\\n");
            break;
        case 3:
            printf("Withdraw functionality\\n");
            break;
        case 4:
            printf("Goodbye!\\n");
            break;
        default:
            printf("Invalid choice\\n");
    }

    return 0;
}
\`\`\`

### **Traffic Light Simulator**

\`\`\`c
#include <stdio.h>

int main(void) {
    char color;

    printf("Enter traffic light color (R/G/Y): ");
    scanf(" %c", &color);

    switch (color) {
        case 'R':
        case 'r':
            printf("🛑 STOP!\\n");
            break;
        case 'G':
        case 'g':
            printf("🟢 GO!\\n");
            break;
        case 'Y':
        case 'y':
            printf("🟡 SLOW DOWN!\\n");
            break;
        default:
            printf("Invalid color\\n");
    }

    return 0;
}
\`\`\`

---

## ⚠️ Common Switch Mistakes

### **Forgetting break**

\`\`\`c
// ❌ All cases after matching case will execute
switch (x) {
    case 1:
        printf("One\\n");
        // Missing break!
    case 2:
        printf("Two\\n");  // This executes if x == 1
        break;
}
\`\`\`

### **Variable Declaration Issues**

\`\`\`c
// ❌ Variable declared in one case can't be used in another
switch (x) {
    case 1: {
        int y = 10;  // y only exists in this case
        break;
    }
    case 2: {
        // y is not accessible here
        break;
    }
}
\`\`\`

### **Float Constants (Rare)**

\`\`\`c
// ⚠️ Possible but uncommon and error-prone
float value = 3.14f;
switch ((int)value) {  // Cast to int first
    case 3:
        printf("Approximately 3\\n");
        break;
}
\`\`\`

---

## 🔧 Switch Best Practices

1. **Always include \`break\`** unless intentional fall-through
2. **Always include \`default\`** case for error handling
3. **Use curly braces** for multi-statement cases
4. **Keep switch expressions simple** - avoid complex calculations
5. **Group related cases** together without breaks when appropriate
6. **Consider if-else** for complex conditions or ranges
7. **Comment intentional fall-through** cases

---

## 🎓 Key Takeaways

1. **\`switch\`** tests one expression against multiple constant values
2. **\`case\` labels** specify the values to match
3. **\`break\`** exits the switch (prevents fall-through)
4. **\`default\`** handles unmatched cases
5. **Fall-through** executes multiple cases (use carefully)
6. **Better than if-else** for many constant comparisons
7. **Works best with** integers and characters

Master switch statements for clean, efficient multi-way branching! 🔀✨`;
    return contentString;
  })()
};
