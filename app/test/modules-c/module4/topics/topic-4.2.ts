import { SubLesson } from '../../../data/lessonsData';

export const topic_4_2: SubLesson = {
  id: 4.2,
  title: 'Function Declaration and Definition',
  status: 'completed',
  content: `# 📝 Function Declaration and Definition

Master the difference between declaring and defining functions in C, and learn how to properly organize your code.

---

## 🔍 Declaration vs Definition

### Function Declaration (Prototype)
**Tells the compiler about a function's interface without implementing it.**

\`\`\`c
// Function declaration (prototype)
int add_numbers(int a, int b);

// Also called function prototype
double calculate_average(int scores[], int count);
\`\`\`

### Function Definition
**Provides the actual implementation of the function.**

\`\`\`c
// Function definition
int add_numbers(int a, int b) {
    return a + b;
}
\`\`\`

### Key Differences

| Aspect | Declaration | Definition |
|--------|-------------|------------|
| **Purpose** | Interface specification | Implementation |
| **Body** | No body (ends with ;) | Has body with code |
| **Required** | Before first use | Once per function |
| **Location** | Header files (.h) or top of .c | Usually in .c files |

---

## 📋 Why Declarations Matter

### Problem Without Declarations

\`\`\`c
#include <stdio.h>

int main() {
    // Compiler doesn't know about multiply function yet
    int result = multiply(5, 3);  // ❌ Error: implicit declaration

    printf("Result: %d\\n", result);
    return 0;
}

// Function definition comes after use
int multiply(int a, int b) {
    return a * b;
}
\`\`\`

**Error:** \`warning: implicit declaration of function 'multiply'\`

### Solution with Declaration

\`\`\`c
#include <stdio.h>

// Function declaration - tells compiler about multiply
int multiply(int a, int b);

int main() {
    int result = multiply(5, 3);  // ✅ Compiler knows about it
    printf("Result: %d\\n", result);
    return 0;
}

// Function definition
int multiply(int a, int b) {
    return a * b;
}
\`\`\`

---

## 🏗️ Declaration Syntax

### Basic Declaration
\`\`\`c
return_type function_name(parameter_types);
\`\`\`

### Examples

#### No Parameters
\`\`\`c
void display_menu(void);
void initialize_system(void);
\`\`\`

#### With Parameters
\`\`\`c
int add(int a, int b);
double calculate_area(double radius);
char get_grade(int score);
\`\`\`

#### Array Parameters
\`\`\`c
int find_maximum(int numbers[], int size);
void sort_array(int arr[], int length);
\`\`\`

#### Multiple Parameters
\`\`\`c
float calculate_tax(float income, int dependents, char filing_status);
void draw_rectangle(int x, int y, int width, int height);
\`\`\`

---

## 📁 Organizing Code with Declarations

### Method 1: Declarations at Top of File

\`\`\`c
#include <stdio.h>

// All function declarations at the top
void greet_user(void);
int get_user_choice(void);
void process_choice(int choice);
void display_result(double result);

int main() {
    greet_user();
    int choice = get_user_choice();
    process_choice(choice);
    return 0;
}

// Function definitions
void greet_user(void) {
    printf("Welcome to the calculator!\\n");
}

int get_user_choice(void) {
    int choice;
    printf("Enter choice (1-4): ");
    scanf("%d", &choice);
    return choice;
}

void process_choice(int choice) {
    double result;
    // ... process choice and calculate result
    display_result(result);
}

void display_result(double result) {
    printf("Result: %.2f\\n", result);
}
\`\`\`

### Method 2: Header Files

#### calculator.h (Header file)
\`\`\`c
#ifndef CALCULATOR_H
#define CALCULATOR_H

// Function declarations
void greet_user(void);
int get_user_choice(void);
void process_choice(int choice);
void display_result(double result);

#endif
\`\`\`

#### calculator.c (Implementation file)
\`\`\`c
#include <stdio.h>
#include "calculator.h"  // Include declarations

// Function definitions
void greet_user(void) {
    printf("Welcome to the calculator!\\n");
}

int get_user_choice(void) {
    int choice;
    printf("Enter choice (1-4): ");
    scanf("%d", &choice);
    return choice;
}

void process_choice(int choice) {
    double result;
    // ... process choice and calculate result
    display_result(result);
}

void display_result(double result) {
    printf("Result: %.2f\\n", result);
}
\`\`\`

#### main.c (Main file)
\`\`\`c
#include "calculator.h"  // Include declarations

int main() {
    greet_user();
    int choice = get_user_choice();
    process_choice(choice);
    return 0;
}
\`\`\`

---

## 🔧 Parameter Specifications

### Complete Parameter Information

\`\`\`c
// ✅ Good: full parameter information
int calculate_sum(int first_number, int second_number);
double convert_temperature(double temperature, char from_unit, char to_unit);
void sort_array(int numbers[], int array_size);
\`\`\`

### Minimal Parameter Information

\`\`\`c
// ✅ Also valid: just parameter types
int calculate_sum(int, int);
double convert_temperature(double, char, char);
void sort_array(int[], int);
\`\`\`

### Best Practice: Use Complete Declarations

\`\`\`c
// ✅ Preferred: complete parameter information
int calculate_sum(int first_number, int second_number);  // Clear and self-documenting

// ❌ Avoid: incomplete parameter information
int calculate_sum(int, int);  // Unclear what parameters mean
\`\`\`

---

## 🧪 Complete Examples

### Mathematical Calculator

#### calculator.h
\`\`\`c
#ifndef CALCULATOR_H
#define CALCULATOR_H

// Function declarations
double add(double a, double b);
double subtract(double a, double b);
double multiply(double a, double b);
double divide(double a, double b);
void display_menu(void);
int get_operation(void);
double get_number(void);

#endif
\`\`\`

#### calculator.c
\`\`\`c
#include <stdio.h>
#include "calculator.h"

// Function definitions
double add(double a, double b) {
    return a + b;
}

double subtract(double a, double b) {
    return a - b;
}

double multiply(double a, double b) {
    return a * b;
}

double divide(double a, double b) {
    if (b != 0) {
        return a / b;
    } else {
        printf("Error: Division by zero!\\n");
        return 0.0;
    }
}

void display_menu(void) {
    printf("\\n=== Calculator ===\\n");
    printf("1. Addition\\n");
    printf("2. Subtraction\\n");
    printf("3. Multiplication\\n");
    printf("4. Division\\n");
    printf("5. Exit\\n");
}

int get_operation(void) {
    int choice;
    printf("Enter your choice: ");
    scanf("%d", &choice);
    return choice;
}

double get_number(void) {
    double number;
    printf("Enter a number: ");
    scanf("%lf", &number);
    return number;
}
\`\`\`

#### main.c
\`\`\`c
#include <stdio.h>
#include "calculator.h"

int main() {
    int operation;

    do {
        display_menu();
        operation = get_operation();

        if (operation >= 1 && operation <= 4) {
            double num1 = get_number();
            double num2 = get_number();
            double result;

            switch (operation) {
                case 1: result = add(num1, num2); break;
                case 2: result = subtract(num1, num2); break;
                case 3: result = multiply(num1, num2); break;
                case 4: result = divide(num1, num2); break;
            }

            printf("Result: %.2f\\n", result);
        } else if (operation != 5) {
            printf("Invalid operation!\\n");
        }

    } while (operation != 5);

    printf("Goodbye!\\n");
    return 0;
}
\`\`\`

---

## 🔄 Declaration Rules and Best Practices

### Declaration Before Use

\`\`\`c
#include <stdio.h>

// ✅ Declare before use
void print_message(char message[]);

int main() {
    print_message("Hello, World!");
    return 0;
}

// Define after use
void print_message(char message[]) {
    printf("%s\\n", message);
}
\`\`\`

### Consistent Parameter Names

\`\`\`c
// ✅ Consistent naming between declaration and definition
int calculate_area(int width, int height);  // Declaration

int calculate_area(int width, int height) {  // Definition - same names
    return width * height;
}
\`\`\`

### Header File Organization

\`\`\`c
/* mylibrary.h */
#ifndef MYLIBRARY_H
#define MYLIBRARY_H

/* Function declarations grouped by functionality */
void initialize_system(void);
void cleanup_system(void);

int validate_input(char input[]);
int process_data(int data[], int size);

#endif
\`\`\`

---

## 🐛 Common Declaration Errors

### Missing Declaration

\`\`\`c
#include <stdio.h>

int main() {
    // ❌ Compiler doesn't know about this function
    int result = mystery_function(5, 10);
    return 0;
}

// Function defined later - too late!
int mystery_function(int a, int b) {
    return a + b;
}
\`\`\`

**Fix:** Add declaration before main()

### Parameter Mismatch

\`\`\`c
// Declaration
int calculate(int x, int y);

// Definition - different parameter names (OK)
int calculate(int a, int b) {
    return a + b;
}

// ❌ Wrong: different parameter types
int calculate(double x, double y) {  // Doesn't match declaration
    return (int)(x + y);
}
\`\`\`

### Return Type Mismatch

\`\`\`c
// Declaration says int
int get_maximum(int a, int b);

// ❌ Definition returns double
double get_maximum(int a, int b) {  // Wrong return type
    return (a > b) ? a : b;
}
\`\`\`

---

## 📚 Advanced Declaration Features

### Function Pointers in Declarations

\`\`\`c
// Function that takes a function pointer
void process_array(int arr[], int size, int (*operation)(int));

// Usage
int square(int x) { return x * x; }
int cube(int x) { return x * x * x; }

int main() {
    int numbers[] = {1, 2, 3, 4, 5};
    process_array(numbers, 5, square);   // Apply square to each element
    process_array(numbers, 5, cube);     // Apply cube to each element
    return 0;
}
\`\`\`

### Variable Arguments

\`\`\`c
#include <stdarg.h>

// Function with variable number of arguments
double average(int count, ...) {
    va_list args;
    va_start(args, count);

    double sum = 0;
    for (int i = 0; i < count; i++) {
        sum += va_arg(args, double);
    }

    va_end(args);
    return sum / count;
}

int main() {
    printf("Average: %.2f\\n", average(3, 10.0, 20.0, 30.0));
    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Declarations** tell the compiler about function interfaces
2. **Definitions** provide the actual function implementation
3. **Declare functions** before they are used
4. **Use header files** to organize declarations
5. **Keep parameter names** consistent between declaration and definition
6. **Place declarations** at the top of files or in header files
7. **Separate interface from implementation** for better organization

---

## 🚀 Preview: Function Parameters and Arguments

In the next topic, you'll learn about:
- **Passing arguments** to functions (by value vs by reference)
- **Different parameter types** (value, pointer, array)
- **Parameter validation** and error handling
- **Default arguments** and function overloading concepts

**Master parameter passing and your functions become truly powerful!** ⚡`
};
