import { SubLesson } from '../../../data/lessonsData';

export const topic_3_2: SubLesson = {
  id: 3.2,
  title: 'if-else Statements',
  status: 'completed',
  content: `# 🔀 if-else Statements

Master conditional execution in C using if, else if, and else statements to make decisions in your programs.

---

## 📋 Basic if Statement

### Syntax
\`\`\`c
if (condition) {
    // Code to execute if condition is true
    statement1;
    statement2;
}
\`\`\`

### Simple Example
\`\`\`c
#include <stdio.h>

int main() {
    int age = 20;

    if (age >= 18) {
        printf("You are eligible to vote!\\n");
    }

    printf("Program continues...\\n");
    return 0;
}
\`\`\`

**Output:**
\`\`\`
You are eligible to vote!
Program continues...
\`\`\`

---

## 📊 if-else Statement

### Syntax
\`\`\`c
if (condition) {
    // Code to execute if condition is true
} else {
    // Code to execute if condition is false
}
\`\`\`

### Example
\`\`\`c
#include <stdio.h>

int main() {
    int number = 5;

    if (number % 2 == 0) {
        printf("%d is even\\n", number);
    } else {
        printf("%d is odd\\n", number);
    }

    return 0;
}
\`\`\`

**Output:**
\`\`\`
5 is odd
\`\`\`

---

## 🔗 if-else if-else Chain

### Syntax
\`\`\`c
if (condition1) {
    // Execute if condition1 is true
} else if (condition2) {
    // Execute if condition1 is false and condition2 is true
} else if (condition3) {
    // Execute if previous conditions are false and condition3 is true
} else {
    // Execute if all conditions are false
}
\`\`\`

### Grade Classification Example
\`\`\`c
#include <stdio.h>

int main() {
    int score;

    printf("Enter your score (0-100): ");
    scanf("%d", &score);

    if (score >= 90) {
        printf("Grade: A - Excellent!\\n");
    } else if (score >= 80) {
        printf("Grade: B - Good job!\\n");
    } else if (score >= 70) {
        printf("Grade: C - Satisfactory\\n");
    } else if (score >= 60) {
        printf("Grade: D - Needs improvement\\n");
    } else {
        printf("Grade: F - Failed\\n");
    }

    return 0;
}
\`\`\`

---

## 🎯 Boolean Expressions in Conditions

### Comparison Operators
\`\`\`c
int a = 10, b = 20;

// Equal to
if (a == b) { printf("Equal\\n"); }

// Not equal to
if (a != b) { printf("Not equal\\n"); }

// Greater than
if (a > b) { printf("a is greater\\n"); }

// Less than
if (a < b) { printf("a is smaller\\n"); }

// Greater than or equal
if (a >= b) { printf("a is greater or equal\\n"); }

// Less than or equal
if (a <= b) { printf("a is smaller or equal\\n"); }
\`\`\`

### Logical Operators
\`\`\`c
int age = 25;
int hasLicense = 1; // 1 = true, 0 = false

// AND operator (both must be true)
if (age >= 18 && hasLicense) {
    printf("Can drive legally\\n");
}

// OR operator (at least one must be true)
if (age >= 18 || hasLicense) {
    printf("Either adult or has license\\n");
}

// NOT operator (reverses condition)
if (!(age < 18)) {
    printf("Is not a minor\\n");
}
\`\`\`

---

## 🧪 Practical Examples

### Number Classification
\`\`\`c
#include <stdio.h>

int main() {
    int number;

    printf("Enter a number: ");
    scanf("%d", &number);

    if (number > 0) {
        printf("%d is positive\\n", number);
    } else if (number < 0) {
        printf("%d is negative\\n", number);
    } else {
        printf("The number is zero\\n");
    }

    return 0;
}
\`\`\`

### Temperature Advisor
\`\`\`c
#include <stdio.h>

int main() {
    float temperature;

    printf("Enter temperature in Celsius: ");
    scanf("%f", &temperature);

    if (temperature >= 40) {
        printf("🔥 Extremely hot! Stay indoors.\\n");
    } else if (temperature >= 30) {
        printf("☀️ Hot weather. Stay hydrated.\\n");
    } else if (temperature >= 20) {
        printf("🌤️ Pleasant weather.\\n");
    } else if (temperature >= 10) {
        printf("❄️ Cool weather. Wear a jacket.\\n");
    } else if (temperature >= 0) {
        printf("🧊 Cold weather. Bundle up!\\n");
    } else {
        printf("🥶 Freezing! Stay warm.\\n");
    }

    return 0;
}
\`\`\`

### BMI Calculator
\`\`\`c
#include <stdio.h>

int main() {
    float weight, height, bmi;

    printf("Enter weight (kg): ");
    scanf("%f", &weight);

    printf("Enter height (m): ");
    scanf("%f", &height);

    if (height > 0) {
        bmi = weight / (height * height);

        printf("Your BMI is: %.2f\\n", bmi);

        if (bmi < 18.5) {
            printf("Category: Underweight\\n");
        } else if (bmi < 25) {
            printf("Category: Normal weight\\n");
        } else if (bmi < 30) {
            printf("Category: Overweight\\n");
        } else {
            printf("Category: Obese\\n");
        }
    } else {
        printf("Error: Height must be positive!\\n");
    }

    return 0;
}
\`\`\`

---

## 🏗️ Nested if Statements

### Basic Nesting
\`\`\`c
#include <stdio.h>

int main() {
    int age;
    char hasPermission;

    printf("Enter age: ");
    scanf("%d", &age);

    if (age >= 18) {
        printf("Do you have parental permission? (y/n): ");
        scanf(" %c", &hasPermission);

        if (hasPermission == 'y' || hasPermission == 'Y') {
            printf("Access granted with permission.\\n");
        } else {
            printf("Adult access granted.\\n");
        }
    } else {
        printf("Access denied. Must be 18 or older.\\n");
    }

    return 0;
}
\`\`\`

### Complex Nesting Example
\`\`\`c
#include <stdio.h>

int main() {
    int score;
    char grade;

    printf("Enter exam score (0-100): ");
    scanf("%d", &score);

    if (score >= 0 && score <= 100) {
        if (score >= 90) {
            grade = 'A';
            printf("Excellent work! ");
        } else if (score >= 80) {
            grade = 'B';
            printf("Good job! ");
        } else if (score >= 70) {
            grade = 'C';
            printf("Satisfactory. ");
        } else if (score >= 60) {
            grade = 'D';
            printf("Needs improvement. ");
        } else {
            grade = 'F';
            printf("Failed. ");
        }

        printf("Grade: %c\\n", grade);
    } else {
        printf("Invalid score! Must be between 0 and 100.\\n");
    }

    return 0;
}
\`\`\`

---

## 💡 Common Patterns

### Range Checking
\`\`\`c
int value = 75;

// Check if value is in range [0, 100]
if (value >= 0 && value <= 100) {
    printf("Value is in valid range\\n");
} else {
    printf("Value is out of range\\n");
}
\`\`\`

### Multiple Conditions
\`\`\`c
int age = 25;
int income = 50000;
char citizen = 'Y';

// Complex condition for loan approval
if ((age >= 21 && age <= 65) && (income >= 30000) && (citizen == 'Y' || citizen == 'y')) {
    printf("Loan approved\\n");
} else {
    printf("Loan denied\\n");
}
\`\`\`

### Input Validation
\`\`\`c
char choice;

printf("Enter Y or N: ");
scanf(" %c", &choice);

if (choice == 'Y' || choice == 'y') {
    printf("You chose Yes\\n");
} else if (choice == 'N' || choice == 'n') {
    printf("You chose No\\n");
} else {
    printf("Invalid choice\\n");
}
\`\`\`

---

## 🐛 Common if-else Mistakes

### Missing Braces
\`\`\`c
// ❌ Bug: only first printf is conditional
if (x > 0)
    printf("Positive\\n");
    printf("This always prints!\\n");

// ✅ Correct
if (x > 0) {
    printf("Positive\\n");
    printf("This only prints if positive\\n");
}
\`\`\`

### Assignment Instead of Comparison
\`\`\`c
int x = 5;

// ❌ Wrong: assignment returns the assigned value (always true)
if (x = 10) {
    printf("x is 10\\n");  // This always executes!
}

// ✅ Correct: comparison
if (x == 10) {
    printf("x is 10\\n");
}
\`\`\`

### Floating Point Comparison Issues
\`\`\`c
float a = 0.1f;
float b = 0.2f;
float sum = a + b;

// ❌ Dangerous: exact comparison of floats
if (sum == 0.3f) {
    printf("Sum is 0.3\\n");
}

// ✅ Better: use epsilon comparison
if (fabs(sum - 0.3f) < 0.0001f) {
    printf("Sum is approximately 0.3\\n");
}
\`\`\`

---

## 🎯 Best Practices

### Clear Conditions
\`\`\`c
// ✅ Clear and readable
#define MIN_AGE 18
#define MAX_AGE 65

if (age >= MIN_AGE && age <= MAX_AGE) {
    approveLoan();
}

// ❌ Unclear
if (age >= 18 && age <= 65) {
    approveLoan();
}
\`\`\`

### Consistent Structure
\`\`\`c
// ✅ Consistent formatting
if (condition1) {
    action1();
} else if (condition2) {
    action2();
} else {
    defaultAction();
}
\`\`\`

### Avoid Deep Nesting
\`\`\`c
// ✅ Early return to reduce nesting
if (inputInvalid) {
    printf("Error\\n");
    return 1;
}

// Process valid input
processData();

// ❌ Deep nesting
if (!inputInvalid) {
    if (anotherCondition) {
        if (thirdCondition) {
            processData();
        }
    }
}
\`\`\`

---

## 🧪 Practice Exercises

### Exercise 1: Leap Year Checker
Write a program that checks if a year is a leap year.

### Exercise 2: Triangle Type
Create a program that determines if three sides can form a triangle and what type it is.

### Exercise 3: Discount Calculator
Build a program that calculates discount based on purchase amount.

### Exercise 4: Password Strength
Write a program that evaluates password strength based on criteria.

---

## 🎯 Key Takeaways

1. **if statements** execute code when conditions are true
2. **else if** chains multiple conditions in order
3. **else** handles all remaining cases
4. **Conditions** use comparison and logical operators
5. **Braces** are required for multiple statements
6. **Nested ifs** create complex decision trees
7. **Clear logic** and consistent formatting improve readability

---

## 🚀 Preview: switch Statements

In the next topic, you'll learn about:
- **switch statements** for multiple choices
- **case labels** and break statements
- **default case** for unmatched values
- **When to use switch vs if-else**

**if-else makes binary choices - switch handles multiple options elegantly!** 🔄`
};
