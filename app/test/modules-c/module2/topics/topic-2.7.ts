import { SubLesson } from '../../../data/lessonsData';

export const topic_2_7: SubLesson = {
  id: 2.7,
  title: 'Comments and Documentation',
  status: 'completed',
  content: `# 📝 Comments and Documentation

Learn how to add comments and documentation to make your C code readable and maintainable.

---

## 💬 What are Comments?

**Comments are explanatory text in code that is ignored by the compiler.**

\`\`\`c
// This is a single-line comment
printf("Hello\\n");  // This prints a message

/*
 * This is a multi-line comment
 * that spans several lines
 */
\`\`\`

---

## 🔧 Comment Syntax in C

### Single-Line Comments
\`\`\`c
#include <stdio.h>

int main() {
    // Declare variables
    int age = 25;

    // Calculate next year
    int next_year = age + 1;

    // Display result
    printf("Next year you will be %d\\n", next_year);

    return 0;  // End of program
}
\`\`\`

### Multi-Line Comments
\`\`\`c
#include <stdio.h>

/*
 * Program: Age Calculator
 * Author: Your Name
 * Date: 2024
 * Description: This program calculates age in days
 */

int main() {
    int age_years;

    /* Get user input */
    printf("Enter your age in years: ");
    scanf("%d", &age_years);

    /* Calculate age in days (approximately) */
    int age_days = age_years * 365;

    /* Display result */
    printf("You are approximately %d days old\\n", age_days);

    return 0;
}
\`\`\`

### Inline Comments
\`\`\`c
#define PI 3.14159        // Mathematical constant
#define MAX_USERS 100     // Maximum number of users
#define DEBUG 0           // Debug mode flag

int calculate_area(int radius) {
    return (int)(PI * radius * radius + 0.5);  // +0.5 for rounding
}
\`\`\`

---

## 📚 Documentation Standards

### Function Documentation
\`\`\`c
/*
 * calculate_circle_area - Calculate the area of a circle
 * @radius: The radius of the circle
 *
 * Returns: The area as an integer (rounded)
 */
int calculate_circle_area(int radius) {
    const double PI = 3.14159;
    return (int)(PI * radius * radius + 0.5);
}
\`\`\`

### File Header Documentation
\`\`\`c
/*
 * circle_utils.c - Utility functions for circle calculations
 *
 * This file contains functions to perform various circle-related
 * mathematical calculations including area, circumference, etc.
 *
 * Author: Your Name
 * Created: 2024-01-01
 * Version: 1.0
 */

#include <stdio.h>
#include "circle_utils.h"

// Function implementations...
\`\`\`

### TODO Comments
\`\`\`c
int main() {
    // TODO: Add input validation
    // FIXME: Handle negative radius values
    // NOTE: This is an approximation, not exact
    // HACK: Temporary workaround for precision issues

    return 0;
}
\`\`\`

---

## 🎯 Best Practices

### When to Comment
\`\`\`c
// ✅ Good comments
int days_in_month = 30;  // Average days (not accounting for February)

// ✅ Explain complex logic
if (temperature > 100 && pressure < 50) {
    // Critical safety condition: high temp + low pressure = danger
    activate_alarm();
}

// ✅ Document function purpose
/*
 * validate_input - Check if user input is within acceptable range
 * @value: Input value to validate
 * @min: Minimum acceptable value
 * @max: Maximum acceptable value
 *
 * Returns: 1 if valid, 0 if invalid
 */
int validate_input(int value, int min, int max) {
    return (value >= min && value <= max);
}
\`\`\`

### When NOT to Comment
\`\`\`c
// ❌ Obvious comments (redundant)
int age = 25;  // Set age to 25

// ❌ Commented-out code (use version control)
// printf("Debug: %d\\n", x);

// ❌ Wrong comments (misleading)
int radius = 5;
int area = radius * radius;  // Calculate circumference (WRONG!)

// ❌ Over-commenting
i = i + 1;  // Increment i by 1
\`\`\`

---

## 🏗️ Code Structure with Comments

### Program Structure
\`\`\`c
/*
 * ============================================================================
 * Temperature Converter Program
 * ============================================================================
 */

#include <stdio.h>

/*
 * Global Constants
 */
#define FREEZING_POINT 0
#define BOILING_POINT 100

/*
 * Function Prototypes
 */
double celsius_to_fahrenheit(double celsius);
double fahrenheit_to_celsius(double fahrenheit);

/*
 * Main Program
 */
int main() {
    // Program logic here
    return 0;
}

/*
 * Function Implementations
 */

// Convert Celsius to Fahrenheit
double celsius_to_fahrenheit(double celsius) {
    return (celsius * 9.0/5.0) + 32.0;
}

// Convert Fahrenheit to Celsius
double fahrenheit_to_celsius(double fahrenheit) {
    return (fahrenheit - 32.0) * 5.0/9.0;
}
\`\`\`

### Algorithm Documentation
\`\`\`c
/*
 * Binary Search Algorithm
 * Searches for a target value in a sorted array
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
int binary_search(int arr[], int size, int target) {
    int left = 0;
    int right = size - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;  // Avoid overflow

        if (arr[mid] == target) {
            return mid;  // Found target
        } else if (arr[mid] < target) {
            left = mid + 1;  // Search right half
        } else {
            right = mid - 1;  // Search left half
        }
    }

    return -1;  // Target not found
}
\`\`\`

---

## 🐛 Common Comment Mistakes

### Outdated Comments
\`\`\`c
int calculate_tax(int income) {
    return income * 0.15;  // Calculate 15% tax (WRONG! Now it's 20%)
}

// Later someone changed the tax rate but forgot to update comment
int calculate_tax(int income) {
    return income * 0.20;  // Still says 15%!
}
\`\`\`

### Commented-Out Code
\`\`\`c
int main() {
    int x = 5;
    // x = 10;  // This was the old value
    x = 15;    // Now it's 15

    // printf("Debug: %d\\n", x);  // Remove when done
    return x;
}
\`\`\`

**Better approach: Use version control instead of commenting out code.**

---

## 📋 Comment Style Guide

### Consistent Style
\`\`\`c
// Function comments
/* Single line multi-line comment */

/*
 * Multi-line comment
 * with proper formatting
 */

// End-of-line comments
int result = calculate();  // Calculate the final result

// Section separators
// ==================
// User Input Section
// ==================
\`\`\`

### Professional Standards
\`\`\`c
/*
 * FILE: calculator.c
 * AUTHOR: John Doe
 * DATE: 2024-01-01
 * VERSION: 1.0
 *
 * DESCRIPTION:
 * This file implements a basic calculator with support for
 * addition, subtraction, multiplication, and division operations.
 *
 * DEPENDENCIES:
 * - stdio.h for input/output operations
 * - math.h for advanced mathematical functions
 */

/* Function: add_numbers
 * Parameters:
 *   a - First number to add
 *   b - Second number to add
 * Returns:
 *   Sum of a and b
 * Side Effects:
 *   None
 */
int add_numbers(int a, int b) {
    return a + b;
}
\`\`\`

---

## 🛠️ Commenting Tools and IDE Features

### Automatic Documentation Generation
\`\`\`c
/**
 * @brief Calculate the factorial of a number
 * @param n The number to calculate factorial for
 * @return The factorial of n
 * @note This function uses recursion
 */
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
\`\`\`

### Code Folding with Comments
\`\`\`c
// ============================================================================
// USER INTERFACE FUNCTIONS
// ============================================================================

// Function implementations...

// ============================================================================
// MATHEMATICAL FUNCTIONS
// ============================================================================

// Function implementations...

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Function implementations...
\`\`\`

---

## 🧪 Practical Examples

### Well-Documented Program
\`\`\`c
/*
 * Student Grade Calculator
 *
 * This program calculates the final grade for a student
 * based on homework, midterm, and final exam scores.
 */

#include <stdio.h>

#define HOMEWORK_WEIGHT 0.30  // 30% of final grade
#define MIDTERM_WEIGHT 0.30   // 30% of final grade
#define FINAL_WEIGHT 0.40     // 40% of final grade

/*
 * calculate_final_grade - Compute weighted final grade
 * @homework: Homework average (0-100)
 * @midterm: Midterm exam score (0-100)
 * @final: Final exam score (0-100)
 *
 * Returns: Final grade as a percentage (0-100)
 */
double calculate_final_grade(double homework, double midterm, double final) {
    return (homework * HOMEWORK_WEIGHT) +
           (midterm * MIDTERM_WEIGHT) +
           (final * FINAL_WEIGHT);
}

/*
 * get_letter_grade - Convert percentage to letter grade
 * @percentage: Grade as percentage (0-100)
 *
 * Returns: Letter grade (A, B, C, D, F)
 */
char get_letter_grade(double percentage) {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
}

int main() {
    double homework, midterm, final, final_grade;
    char letter_grade;

    // Get input from user
    printf("Enter homework average: ");
    scanf("%lf", &homework);

    printf("Enter midterm score: ");
    scanf("%lf", &midterm);

    printf("Enter final exam score: ");
    scanf("%lf", &final);

    // Calculate final grade
    final_grade = calculate_final_grade(homework, midterm, final);
    letter_grade = get_letter_grade(final_grade);

    // Display results
    printf("\\nFinal Grade: %.2f%% (%c)\\n", final_grade, letter_grade);

    return 0;
}
\`\`\`

---

## 📚 Comment Types Summary

| Comment Type | Syntax | Use Case |
|-------------|--------|----------|
| **Single-line** | \`// comment\` | Quick explanations |
| **Multi-line** | \`/* comment */\` | Detailed documentation |
| **Function docs** | \`/*\\n * description\\n */\` | API documentation |
| **File headers** | Top of file | File-level documentation |
| **TODO** | \`// TODO: task\` | Future work reminders |
| **Section dividers** | \`// === Section ===\` | Code organization |

---

## 🧪 Practice Exercises

### Exercise 1: Comment Your Code
Take a simple program and add comprehensive comments explaining each part.

### Exercise 2: Function Documentation
Write documentation comments for functions you've created.

### Exercise 3: Code Review Comments
Review a piece of code and suggest where comments should be added.

### Exercise 4: Documentation Standards
Create a documentation template for your future C programs.

---

## 🎯 Key Takeaways

1. **Comments explain code** to other developers (including future you!)
2. **Use single-line** for quick explanations, **multi-line** for detailed docs
3. **Document functions** with purpose, parameters, and return values
4. **Keep comments current** - update when code changes
5. **Don't comment obvious code** - focus on complex logic
6. **Use consistent style** throughout your codebase
7. **Comments are ignored** by compiler but crucial for maintenance

---

## 🚀 Module 2 Complete!

**Congratulations!** You've learned the fundamentals of C programming:

- ✅ **Basic structure** and syntax
- ✅ **Variables** and data types  
- ✅ **Operators** for calculations
- ✅ **Input/Output** with printf/scanf
- ✅ **Constants** and literals
- ✅ **Type conversion** techniques
- ✅ **Comments** and documentation

**Ready for Module 3: Control Structures?** Let's learn about making decisions with if/else and loops! 🎯`
};
