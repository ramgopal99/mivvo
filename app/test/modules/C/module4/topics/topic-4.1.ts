import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_1: SubLesson = {
  id: "4.1",
  title: 'Introduction to Functions',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🔧 Introduction to Functions in C

Functions are the building blocks of C programs. They allow you to organize code into reusable, modular pieces. Understanding functions is crucial for writing maintainable and efficient programs.

---

## 📋 What is a Function?

**A function is a named block of code that performs a specific task.** Functions help you:

- **Organize code** into logical units
- **Reuse code** instead of duplicating it
- **Modularize programs** for easier maintenance
- **Test code** in smaller, isolated pieces
- **Hide complexity** from the main program

---

## 🔧 Function Structure

### **Basic Function Syntax**

\`\`\`c
return_type function_name(parameter_list) {
    // Function body
    // Code to execute
    return value;  // Optional
}
\`\`\`

### **Function Components**

1. **Return type**: Type of value the function returns (\`int\`, \`float\`, \`void\`, etc.)
2. **Function name**: Identifier for the function (follows variable naming rules)
3. **Parameter list**: Input values the function receives (optional)
4. **Function body**: Code that executes when function is called
5. **Return statement**: Value sent back to caller (optional for \`void\` functions)

---

## 📝 Simple Function Example

### **Function Declaration and Definition**

\`\`\`c
#include <stdio.h>

// Function declaration (prototype)
void greet(void);

int main(void) {
    printf("Calling the greet function:\\n");
    greet();  // Function call
    printf("Back in main function\\n");

    return 0;
}

// Function definition
void greet(void) {
    printf("Hello, World!\\n");
    printf("Welcome to C programming!\\n");
}
\`\`\`

**Output:**
\`\`\`
Calling the greet function:
Hello, World!
Welcome to C programming!
Back in main function
\`\`\`

---

## 🔄 Function with Return Value

### **Function that Returns a Value**

\`\`\`c
#include <stdio.h>

// Function that returns the square of a number
int square(int x) {
    int result = x * x;
    return result;
}

int main(void) {
    int number = 5;
    int result = square(number);  // Function call with return value

    printf("%d squared is %d\\n", number, result);

    // Can also use directly in expressions
    printf("7 squared is %d\\n", square(7));

    return 0;
}
\`\`\`

**Output:**
\`\`\`
5 squared is 25
7 squared is 49
\`\`\`

---

## 📊 Function Declaration vs Definition

### **Function Declaration (Prototype)**

\`\`\`c
// Function prototype - tells compiler about function
int add(int a, int b);  // Declaration only

int main(void) {
    int result = add(3, 5);  // Can call function here
    printf("Result: %d\\n", result);
    return 0;
}

// Function definition - actual implementation
int add(int a, int b) {
    return a + b;
}
\`\`\`

**Why use prototypes?**
- Allows calling functions before they are defined
- Helps catch parameter type mismatches
- Enables separate compilation

---

## 🔀 Multiple Functions

### **Program with Multiple Functions**

\`\`\`c
#include <stdio.h>

// Function prototypes
void print_header(void);
int get_larger(int x, int y);
float calculate_average(int a, int b, int c);

int main(void) {
    print_header();

    int num1 = 10, num2 = 20;
    int larger = get_larger(num1, num2);
    printf("The larger number between %d and %d is %d\\n", num1, num2, larger);

    float avg = calculate_average(85, 92, 78);
    printf("Average score: %.2f\\n", avg);

    return 0;
}

void print_header(void) {
    printf("=== Function Demonstration ===\\n\\n");
}

int get_larger(int x, int y) {
    if (x > y) {
        return x;
    } else {
        return y;
    }
}

float calculate_average(int a, int b, int c) {
    return (a + b + c) / 3.0f;
}
\`\`\`

**Output:**
\`\`\`
=== Function Demonstration ===

The larger number between 10 and 20 is 20
Average score: 85.00
\`\`\`

---

## 🎯 Function Naming Conventions

### **Good Function Names**

\`\`\`c
// ✅ Clear and descriptive
int calculate_area(int length, int width);
void print_student_record(Student s);
float compute_interest(float principal, float rate, int time);

// ❌ Unclear or misleading
int func(int x, int y);           // Too generic
void process(void);               // What does it process?
int get_number(void);             // Could be confused with input
\`\`\`

### **Naming Rules**
- Start with letter or underscore
- Contain letters, digits, underscores
- Case-sensitive
- Should be descriptive and follow \`snake_case\` or \`camelCase\`

---

## 📏 Function Length

### **Good Practice: Keep Functions Small**

\`\`\`c
// ✅ Good: Single responsibility
int is_valid_age(int age) {
    return age >= 0 && age <= 150;
}

void print_error(char *message) {
    fprintf(stderr, "Error: %s\\n", message);
}

// ❌ Bad: Too many responsibilities
void process_user_data(void) {
    // Read user input
    // Validate data
    // Process data
    // Save to file
    // Send confirmation email
    // Log results
    // ... all in one function!
}
\`\`\`

---

## 🔍 Function Documentation

### **Comment Your Functions**

\`\`\`c
/**
 * Calculates the area of a rectangle
 * @param length The length of the rectangle
 * @param width The width of the rectangle
 * @return The area (length * width)
 */
int calculate_rectangle_area(int length, int width) {
    return length * width;
}

/*
 * Simple greeting function
 * Prints a welcome message to the console
 */
void greet_user(void) {
    printf("Welcome to our program!\\n");
}
\`\`\`

---

## 🎯 Practical Examples

### **Example 1: Temperature Converter**

\`\`\`c
#include <stdio.h>

// Function to convert Celsius to Fahrenheit
float celsius_to_fahrenheit(float celsius) {
    return (celsius * 9.0f / 5.0f) + 32.0f;
}

// Function to convert Fahrenheit to Celsius
float fahrenheit_to_celsius(float fahrenheit) {
    return (fahrenheit - 32.0f) * 5.0f / 9.0f;
}

int main(void) {
    float temp;

    printf("Enter temperature in Celsius: ");
    scanf("%f", &temp);

    float fahrenheit = celsius_to_fahrenheit(temp);
    printf("%.2f°C = %.2f°F\\n", temp, fahrenheit);

    printf("Enter temperature in Fahrenheit: ");
    scanf("%f", &temp);

    float celsius = fahrenheit_to_celsius(temp);
    printf("%.2f°F = %.2f°C\\n", temp, celsius);

    return 0;
}
\`\`\`

### **Example 2: Number Utilities**

\`\`\`c
#include <stdio.h>
#include <stdbool.h>

// Function to check if a number is even
bool is_even(int number) {
    return number % 2 == 0;
}

// Function to check if a number is prime
bool is_prime(int number) {
    if (number <= 1) return false;
    if (number <= 3) return true;
    if (number % 2 == 0 || number % 3 == 0) return false;

    for (int i = 5; i * i <= number; i += 6) {
        if (number % i == 0 || number % (i + 2) == 0) {
            return false;
        }
    }

    return true;
}

int main(void) {
    int number;

    printf("Enter a number: ");
    scanf("%d", &number);

    printf("%d is %s\\n", number, is_even(number) ? "even" : "odd");
    printf("%d is %s\\n", number, is_prime(number) ? "prime" : "not prime");

    return 0;
}
\`\`\`

---

## ⚠️ Common Function Mistakes

### **Missing Return Statement**

\`\`\`c
// ❌ Error: Non-void function must return a value
int add(int a, int b) {
    int sum = a + b;
    // Missing return statement!
}

// ✅ Correct
int add(int a, int b) {
    return a + b;
}
\`\`\`

### **Wrong Return Type**

\`\`\`c
// ❌ Error: Returning wrong type
float divide(int a, int b) {
    return a / b;  // Integer division, returns int but function expects float
}

// ✅ Correct
float divide(int a, int b) {
    return (float)a / b;  // Cast to float for proper division
}
\`\`\`

### **Function Prototype Mismatch**

\`\`\`c
// ❌ Prototype doesn't match definition
int multiply(int x, int y);  // Prototype says 2 parameters

int multiply(int x, int y, int z) {  // Definition has 3 parameters!
    return x * y * z;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Functions** organize code into reusable blocks
2. **Function prototype** declares function signature
3. **Function definition** contains the actual implementation
4. **Parameters** are inputs to functions
5. **Return values** are outputs from functions
6. **void functions** don't return values
7. **Keep functions small** and focused on single tasks
8. **Use descriptive names** and document your functions

Functions are the foundation of modular programming - master them to write better code! 🔧✨`;
    return contentString;
  })()
};
