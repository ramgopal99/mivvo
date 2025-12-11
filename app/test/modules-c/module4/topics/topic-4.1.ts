import { SubLesson } from '../../../data/lessonsData';

export const topic_4_1: SubLesson = {
  id: 4.1,
  title: 'Introduction to Functions',
  status: 'completed',
  content: `# 🔧 Introduction to Functions

Learn why functions are essential for writing maintainable, reusable, and organized C programs.

---

## 🎯 Why Functions Matter

### The Problem Without Functions

Imagine writing a program to calculate grades for 100 students:

\`\`\`c
#include <stdio.h>

int main() {
    // Student 1
    int score1 = 85;
    char grade1;
    if (score1 >= 90) grade1 = 'A';
    else if (score1 >= 80) grade1 = 'B';
    else if (score1 >= 70) grade1 = 'C';
    else if (score1 >= 60) grade1 = 'D';
    else grade1 = 'F';
    printf("Student 1: %d → %c\\n", score1, grade1);

    // Student 2 - Same code repeated!
    int score2 = 78;
    char grade2;
    if (score2 >= 90) grade2 = 'A';
    else if (score2 >= 80) grade2 = 'B';
    else if (score2 >= 70) grade2 = 'C';
    else if (score2 >= 60) grade2 = 'D';
    else grade2 = 'F';
    printf("Student 2: %d → %c\\n", score2, grade2);

    // ... 98 more times!

    return 0;
}
\`\`\`

**Problems:**
- ❌ Code repetition (violates DRY principle)
- ❌ Hard to maintain (change logic in 100 places)
- ❌ Difficult to read and understand
- ❌ Error-prone (inconsistent changes)

---

## ✅ The Solution: Functions

### With Functions

\`\`\`c
#include <stdio.h>

// Function to calculate grade
char calculate_grade(int score) {
    if (score >= 90) return 'A';
    else if (score >= 80) return 'B';
    else if (score >= 70) return 'C';
    else if (score >= 60) return 'D';
    else return 'F';
}

int main() {
    // Much cleaner and maintainable!
    printf("Student 1: %d → %c\\n", 85, calculate_grade(85));
    printf("Student 2: %d → %c\\n", 78, calculate_grade(78));
    // ... easy to add more students

    return 0;
}
\`\`\`

**Benefits:**
- ✅ **Reusable**: Call the same logic multiple times
- ✅ **Maintainable**: Change logic in one place
- ✅ **Readable**: Self-documenting code
- ✅ **Modular**: Break complex problems into smaller pieces
- ✅ **Testable**: Test functions independently

---

## 🏗️ What is a Function?

### Definition
**A function is a named block of code that performs a specific task.**

\`\`\`c
return_type function_name(parameters) {
    // Function body
    // Code to execute
    return value;  // Optional
}
\`\`\`

### Components

#### 1. **Return Type**
- What the function returns (int, char, void, etc.)
- \`void\` means no return value

#### 2. **Function Name**
- Identifier following C naming rules
- Should be descriptive (calculate_grade, not cg)

#### 3. **Parameters**
- Input values the function receives
- Can be zero or more parameters
- Each parameter has type and name

#### 4. **Function Body**
- The actual code that executes
- Enclosed in curly braces \`{\` \`}\`

#### 5. **Return Statement**
- Sends a value back to the caller
- Optional if return type is void

---

## 🧪 Function Examples

### Function with No Parameters, No Return Value

\`\`\`c
#include <stdio.h>

// Function declaration
void greet_user(void) {
    printf("Hello, welcome to our program!\\n");
    printf("We hope you enjoy learning C.\\n");
}

int main() {
    greet_user();  // Function call
    greet_user();  // Can call multiple times
    return 0;
}
\`\`\`

### Function with Parameters, No Return Value

\`\`\`c
#include <stdio.h>

// Function to display student info
void display_student(char name[], int age, float gpa) {
    printf("Student Information:\\n");
    printf("Name: %s\\n", name);
    printf("Age: %d\\n", age);
    printf("GPA: %.2f\\n", gpa);
}

int main() {
    display_student("Alice", 20, 3.8);
    display_student("Bob", 19, 3.5);
    return 0;
}
\`\`\`

### Function with Parameters and Return Value

\`\`\`c
#include <stdio.h>

// Function to calculate rectangle area
float calculate_area(float length, float width) {
    float area = length * width;
    return area;  // Return the calculated value
}

int main() {
    float area1 = calculate_area(5.0, 3.0);
    float area2 = calculate_area(7.5, 4.2);

    printf("Area 1: %.2f\\n", area1);
    printf("Area 2: %.2f\\n", area2);
    printf("Total area: %.2f\\n", area1 + area2);

    return 0;
}
\`\`\`

---

## 📊 Function Advantages

### Code Reusability
\`\`\`c
#include <stdio.h>

// One function, used in multiple places
int find_maximum(int a, int b) {
    return (a > b) ? a : b;
}

int main() {
    int x = find_maximum(5, 10);      // Returns 10
    int y = find_maximum(15, 8);      // Returns 15
    int z = find_maximum(x, y);       // Returns 15

    printf("Maximum values: %d, %d, %d\\n", x, y, z);
    return 0;
}
\`\`\`

### Code Organization
\`\`\`c
#include <stdio.h>

// Separate functions for separate concerns
void get_user_input(int* num1, int* num2) {
    printf("Enter two numbers: ");
    scanf("%d %d", num1, num2);
}

int add_numbers(int a, int b) {
    return a + b;
}

void display_result(int result) {
    printf("The sum is: %d\\n", result);
}

int main() {
    int num1, num2, sum;

    get_user_input(&num1, &num2);     // Input
    sum = add_numbers(num1, num2);    // Processing
    display_result(sum);              // Output

    return 0;  // Clear separation of concerns
}
\`\`\`

### Easier Debugging
\`\`\`c
#include <stdio.h>

// Each function can be tested independently
int is_prime(int number) {
    if (number <= 1) return 0;

    for (int i = 2; i * i <= number; i++) {
        if (number % i == 0) return 0;
    }

    return 1;  // Prime
}

void test_primes(void) {
    // Test the function with different inputs
    printf("7 is prime: %s\\n", is_prime(7) ? "Yes" : "No");
    printf("10 is prime: %s\\n", is_prime(10) ? "Yes" : "No");
    printf("13 is prime: %s\\n", is_prime(13) ? "Yes" : "No");
}

int main() {
    test_primes();
    return 0;
}
\`\`\`

---

## 🔄 Function Workflow

### Function Call Process

1. **Program encounters function call**
   \`\`\`c
   result = calculate_sum(5, 10);
   \`\`\`

2. **Control transfers to function**
   - Parameters are copied (passed by value)
   - Function body executes

3. **Function returns**
   - Return value sent back (if any)
   - Control returns to caller

### Execution Flow Example

\`\`\`c
#include <stdio.h>

int add(int a, int b) {
    printf("Inside add function: %d + %d\\n", a, b);
    return a + b;
}

int main() {
    printf("Before function call\\n");

    int result = add(5, 3);  // Function call

    printf("After function call\\n");
    printf("Result: %d\\n", result);

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Before function call
Inside add function: 5 + 3
After function call
Result: 8
\`\`\`

---

## 🏷️ Function Naming Conventions

### Good Function Names
\`\`\`c
// ✅ Descriptive and clear
int calculate_average(int scores[], int count);
void display_menu(void);
char get_grade_letter(int score);
int is_valid_email(char email[]);

// ❌ Poor function names
int calc(int x[], int y);    // Too vague
void menu(void);             // Too generic
char grade(int s);           // Abbreviations unclear
int check(char e[]);         // What is being checked?
\`\`\`

### Naming Best Practices
- **Use verbs** for actions: \`calculate\`, \`display\`, \`validate\`
- **Be specific**: \`calculate_circle_area\` not just \`calculate\`
- **Follow camelCase**: \`calculateStudentGrade\`
- **Start with lowercase**: \`printReport\` not \`PrintReport\`

---

## 📋 Function Categories

### User-Defined Functions
**Functions you create yourself**
\`\`\`c
// Examples we've seen
int add(int a, int b) { return a + b; }
void print_hello(void) { printf("Hello\\n"); }
\`\`\`

### Library Functions
**Pre-written functions in standard libraries**
\`\`\`c
#include <stdio.h>   // printf, scanf
#include <math.h>    // sqrt, pow, sin
#include <string.h>  // strlen, strcpy

int main() {
    // Using library functions
    printf("Square root of 16: %.0f\\n", sqrt(16.0));
    printf("Length of 'hello': %zu\\n", strlen("hello"));

    return 0;
}
\`\`\`

### System Functions
**Functions provided by the operating system**
\`\`\`c
#include <stdlib.h>  // exit, system

int main() {
    printf("Program starting...\\n");

    // Exit program with success code
    exit(0);

    // This line never executes
    printf("This won't print\\n");
}
\`\`\`

---

## 🎯 When to Use Functions

### ✅ Good Reasons to Create Functions

#### Code Reusability
\`\`\`c
// Same calculation used in multiple places
float convert_celsius_to_fahrenheit(float celsius) {
    return (celsius * 9/5) + 32;
}
\`\`\`

#### Code Organization
\`\`\`c
// Break complex task into smaller steps
void process_student_data(void) {
    get_student_info();
    calculate_grades();
    generate_report();
    save_to_file();
}
\`\`\`

#### Improved Readability
\`\`\`c
// Self-documenting code
if (is_valid_password(password) && is_account_active(username)) {
    grant_access();
}
\`\`\`

#### Easier Testing
\`\`\`c
// Test individual components
void test_calculator_functions(void) {
    assert(add(2, 3) == 5);
    assert(subtract(5, 3) == 2);
    assert(multiply(4, 5) == 20);
}
\`\`\`

### ❌ Avoid Unnecessary Functions

#### Too Simple
\`\`\`c
// ❌ Overkill for simple operations
int add_two_numbers(int a, int b) {
    return a + b;
}
// Just use: result = a + b;
\`\`\`

#### Too Specific
\`\`\`c
// ❌ Only used once
void print_alice_grade(void) {
    printf("Alice's grade: A\\n");
}
// Just inline: printf("Alice's grade: A\\n");
\`\`\`

---

## 🧪 Complete Example Program

### Student Grade Management System

\`\`\`c
#include <stdio.h>
#include <string.h>

// Function declarations (prototypes)
void display_menu(void);
void add_student(char names[][50], float grades[], int* count);
void display_students(char names[][50], float grades[], int count);
float calculate_average(float grades[], int count);
char get_letter_grade(float grade);

int main() {
    const int MAX_STUDENTS = 100;
    char names[MAX_STUDENTS][50];
    float grades[MAX_STUDENTS];
    int student_count = 0;
    int choice;

    do {
        display_menu();
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                add_student(names, grades, &student_count);
                break;
            case 2:
                display_students(names, grades, student_count);
                break;
            case 3:
                if (student_count > 0) {
                    printf("Class average: %.2f\\n", calculate_average(grades, student_count));
                } else {
                    printf("No students to calculate average.\\n");
                }
                break;
            case 4:
                printf("Goodbye!\\n");
                break;
            default:
                printf("Invalid choice. Try again.\\n");
        }
    } while (choice != 4);

    return 0;
}

void display_menu(void) {
    printf("\\n=== Student Grade Management ===\\n");
    printf("1. Add student\\n");
    printf("2. Display all students\\n");
    printf("3. Calculate class average\\n");
    printf("4. Exit\\n");
    printf("Enter your choice: ");
}

void add_student(char names[][50], float grades[], int* count) {
    if (*count >= 100) {
        printf("Maximum students reached!\\n");
        return;
    }

    printf("Enter student name: ");
    scanf("%s", names[*count]);

    printf("Enter grade (0-100): ");
    scanf("%f", &grades[*count]);

    (*count)++;
    printf("Student added successfully!\\n");
}

void display_students(char names[][50], float grades[], int count) {
    if (count == 0) {
        printf("No students to display.\\n");
        return;
    }

    printf("\\n=== Student List ===\\n");
    for (int i = 0; i < count; i++) {
        char letter = get_letter_grade(grades[i]);
        printf("%-20s %.2f (%c)\\n", names[i], grades[i], letter);
    }
}

float calculate_average(float grades[], int count) {
    float sum = 0;
    for (int i = 0; i < count; i++) {
        sum += grades[i];
    }
    return sum / count;
}

char get_letter_grade(float grade) {
    if (grade >= 90) return 'A';
    if (grade >= 80) return 'B';
    if (grade >= 70) return 'C';
    if (grade >= 60) return 'D';
    return 'F';
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Functions** break programs into smaller, manageable pieces
2. **Reusable code** eliminates repetition and improves maintainability
3. **Modular design** makes programs easier to understand and test
4. **Function components**: return type, name, parameters, body
5. **Choose descriptive names** that explain what the function does
6. **Use functions** for code that will be used multiple times
7. **Keep functions focused** on a single responsibility

---

## 🚀 Preview: Function Declaration and Definition

In the next topic, you'll learn about:
- **Function prototypes** and forward declarations
- **Function definitions** vs declarations
- **Header files** and separate compilation
- **Best practices** for organizing functions

**Functions are the building blocks of C programs - master them and you master C!** 🏗️`
};
