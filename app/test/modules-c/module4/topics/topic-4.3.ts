import { SubLesson } from '../../../data/lessonsData';

export const topic_4_3: SubLesson = {
  id: 4.3,
  title: 'Function Parameters and Arguments',
  status: 'completed',
  content: `# 📥📤 Function Parameters and Arguments

Learn how to pass data to functions and understand the crucial difference between passing by value and passing by reference in C.

---

## 🔍 Parameters vs Arguments

### Parameters
**Variables declared in the function definition that receive values.**

\`\`\`c
// Parameters in function definition
int add(int a, int b) {  // a and b are parameters
    return a + b;
}
\`\`\`

### Arguments
**Actual values passed to the function when calling it.**

\`\`\`c
int result = add(5, 10);  // 5 and 10 are arguments
\`\`\`

---

## 📋 Parameter Passing Methods

### 1. Pass by Value (Default in C)

**A copy of the argument is passed to the function.**

\`\`\`c
#include <stdio.h>

void modify_value(int x) {
    x = x * 2;  // Modifies the copy, not the original
    printf("Inside function: x = %d\\n", x);
}

int main() {
    int number = 5;

    printf("Before function: number = %d\\n", number);
    modify_value(number);  // Pass by value
    printf("After function: number = %d\\n", number);  // Unchanged!

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Before function: number = 5
Inside function: x = 10
After function: number = 5
\`\`\`

### 2. Pass by Reference (Using Pointers)

**A reference (pointer) to the original variable is passed.**

\`\`\`c
#include <stdio.h>

void modify_value(int* x) {
    *x = *x * 2;  // Modifies the original through pointer
    printf("Inside function: x = %d\\n", *x);
}

int main() {
    int number = 5;

    printf("Before function: number = %d\\n", number);
    modify_value(&number);  // Pass address (reference)
    printf("After function: number = %d\\n", number);  // Changed!

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Before function: number = 5
Inside function: x = 10
After function: number = 10
\`\`\`

---

## 🧪 Parameter Types and Examples

### Value Parameters

\`\`\`c
#include <stdio.h>

// All parameters are passed by value
int calculate_sum(int a, int b, int c) {
    return a + b + c;
}

double calculate_average(int total, int count) {
    return (double)total / count;  // Cast for decimal division
}

int main() {
    printf("Sum: %d\\n", calculate_sum(10, 20, 30));
    printf("Average: %.2f\\n", calculate_average(100, 5));
    return 0;
}
\`\`\`

### Pointer Parameters (Reference)

\`\`\`c
#include <stdio.h>

// Functions that modify their arguments
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void get_user_input(int* age, char* name) {
    printf("Enter your age: ");
    scanf("%d", age);

    printf("Enter your name: ");
    scanf("%s", name);
}

int main() {
    int x = 5, y = 10;
    int age;
    char name[50];

    printf("Before swap: x=%d, y=%d\\n", x, y);
    swap(&x, &y);
    printf("After swap: x=%d, y=%d\\n", x, y);

    get_user_input(&age, name);
    printf("Hello %s, you are %d years old.\\n", name, age);

    return 0;
}
\`\`\`

### Array Parameters

\`\`\`c
#include <stdio.h>

// Arrays are always passed by reference (as pointers)
void print_array(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

void modify_array(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        arr[i] *= 2;  // Modifies original array
    }
}

int find_max(int arr[], int size) {
    int max = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

int main() {
    int numbers[] = {1, 2, 3, 4, 5};
    int size = 5;

    printf("Original array: ");
    print_array(numbers, size);

    modify_array(numbers, size);
    printf("Modified array: ");
    print_array(numbers, size);

    printf("Maximum value: %d\\n", find_max(numbers, size));

    return 0;
}
\`\`\`

---

## 🔧 Advanced Parameter Techniques

### Default-Like Behavior with Optional Parameters

\`\`\`c
// C doesn't have true default parameters, but we can simulate them
void print_number(int num, int width) {
    if (width == 0) width = 5;  // Default width
    printf("%*d\\n", width, num);
}

// Better approach: provide different function names
void print_number_default(int num) {
    print_number(num, 5);
}

void print_number_width(int num, int width) {
    printf("%*d\\n", width, num);
}
\`\`\`

### Function Pointer Parameters

\`\`\`c
#include <stdio.h>

// Function that takes another function as parameter
void process_array(int arr[], int size, int (*operation)(int)) {
    for (int i = 0; i < size; i++) {
        arr[i] = operation(arr[i]);
    }
}

// Functions to pass as arguments
int square(int x) { return x * x; }
int increment(int x) { return x + 1; }

int main() {
    int numbers[] = {1, 2, 3, 4, 5};

    // Apply square function to each element
    process_array(numbers, 5, square);

    printf("Squared: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", numbers[i]);
    }

    // Apply increment function to each element
    process_array(numbers, 5, increment);

    printf("\\nIncremented: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", numbers[i]);
    }

    return 0;
}
\`\`\`

---

## 🛡️ Parameter Validation

### Input Validation

\`\`\`c
#include <stdio.h>

// Function with parameter validation
int divide_numbers(int dividend, int divisor) {
    if (divisor == 0) {
        printf("Error: Division by zero!\\n");
        return 0;  // Return safe value
    }

    return dividend / divisor;
}

void set_age(int age) {
    if (age < 0 || age > 150) {
        printf("Error: Invalid age %d\\n", age);
        return;
    }

    printf("Age set to: %d\\n", age);
}

int main() {
    printf("Division result: %d\\n", divide_numbers(10, 2));
    printf("Division by zero: %d\\n", divide_numbers(10, 0));

    set_age(25);    // Valid
    set_age(-5);    // Invalid
    set_age(200);   // Invalid

    return 0;
}
\`\`\`

### Array Bounds Checking

\`\`\`c
#include <stdio.h>

// Safe array access with bounds checking
int get_array_element(int arr[], int size, int index) {
    if (index < 0 || index >= size) {
        printf("Error: Index %d out of bounds (0-%d)\\n", index, size-1);
        return 0;  // Return safe value
    }

    return arr[index];
}

void set_array_element(int arr[], int size, int index, int value) {
    if (index < 0 || index >= size) {
        printf("Error: Index %d out of bounds (0-%d)\\n", index, size-1);
        return;
    }

    arr[index] = value;
}

int main() {
    int numbers[5] = {10, 20, 30, 40, 50};

    // Valid access
    printf("Element at index 2: %d\\n", get_array_element(numbers, 5, 2));

    // Invalid access
    printf("Element at index 10: %d\\n", get_array_element(numbers, 5, 10));

    return 0;
}
\`\`\`

---

## 🎯 Parameter Passing Guidelines

### When to Use Pass by Value

\`\`\`c
// ✅ Good for pass by value
int add(int a, int b) {  // Small, primitive types
    return a + b;
}

double calculate_circle_area(double radius) {  // Single value
    return 3.14159 * radius * radius;
}

char is_even(int number) {  // Simple calculation
    return (number % 2 == 0) ? 'Y' : 'N';
}
\`\`\`

### When to Use Pass by Reference

\`\`\`c
// ✅ Good for pass by reference
void swap(int* a, int* b) {  // Need to modify originals
    int temp = *a;
    *a = *b;
    *b = temp;
}

void read_user_input(int* age, char name[]) {  // Multiple return values
    scanf("%d", age);
    scanf("%s", name);
}

void modify_array(int arr[], int size) {  // Large data structures
    for (int i = 0; i < size; i++) {
        arr[i] *= 2;
    }
}
\`\`\`

---

## 🐛 Common Parameter Errors

### Forgetting Address-of Operator

\`\`\`c
#include <stdio.h>

void get_number(int* num) {
    scanf("%d", num);  // Correct
}

int main() {
    int value;

    // ❌ Wrong: passing value instead of address
    get_number(value);  // Compiler error or undefined behavior

    // ✅ Correct: pass address
    get_number(&value);

    return 0;
}
\`\`\`

### Modifying Const Parameters

\`\`\`c
// Function promises not to modify the array
void print_array(const int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
        // arr[i] = 0;  // ❌ Error: cannot modify const parameter
    }
}
\`\`\`

### Array Size Confusion

\`\`\`c
#include <stdio.h>

// ❌ Wrong: sizeof doesn't work for array parameters
void print_size(int arr[]) {
    printf("Size: %zu\\n", sizeof(arr));  // Prints pointer size, not array size!
}

// ✅ Correct: pass size as separate parameter
void print_size_correct(int arr[], int size) {
    printf("Size: %d\\n", size);
}

int main() {
    int numbers[10];
    print_size(numbers);          // Wrong
    print_size_correct(numbers, 10);  // Correct
    return 0;
}
\`\`\`

---

## 🧪 Complete Examples

### Student Grade Management

\`\`\`c
#include <stdio.h>
#include <string.h>

#define MAX_STUDENTS 100
#define NAME_LENGTH 50

// Structure to hold student data
typedef struct {
    char name[NAME_LENGTH];
    int grades[5];  // 5 subjects
    int num_grades;
} Student;

// Functions with different parameter types
void add_student(Student students[], int* count);
void display_student(const Student* student);
void calculate_average(const int grades[], int count, double* average, char* letter);
int find_student(const Student students[], int count, const char* name);

int main() {
    Student students[MAX_STUDENTS];
    int student_count = 0;
    char choice;

    do {
        printf("\\n=== Student Management System ===\\n");
        printf("1. Add student\\n");
        printf("2. Display all students\\n");
        printf("3. Find student\\n");
        printf("4. Exit\\n");
        printf("Enter choice: ");
        scanf(" %c", &choice);

        switch (choice) {
            case '1':
                add_student(students, &student_count);
                break;
            case '2':
                for (int i = 0; i < student_count; i++) {
                    display_student(&students[i]);
                }
                break;
            case '3': {
                char search_name[NAME_LENGTH];
                printf("Enter student name: ");
                scanf("%s", search_name);

                int index = find_student(students, student_count, search_name);
                if (index != -1) {
                    display_student(&students[index]);
                } else {
                    printf("Student not found.\\n");
                }
                break;
            }
            case '4':
                printf("Goodbye!\\n");
                break;
            default:
                printf("Invalid choice.\\n");
        }
    } while (choice != '4');

    return 0;
}

void add_student(Student students[], int* count) {
    if (*count >= MAX_STUDENTS) {
        printf("Maximum students reached!\\n");
        return;
    }

    Student* student = &students[*count];

    printf("Enter student name: ");
    scanf("%s", student->name);

    printf("Enter number of grades (1-5): ");
    scanf("%d", &student->num_grades);

    if (student->num_grades < 1 || student->num_grades > 5) {
        printf("Invalid number of grades!\\n");
        return;
    }

    printf("Enter %d grades: ", student->num_grades);
    for (int i = 0; i < student->num_grades; i++) {
        scanf("%d", &student->grades[i]);
    }

    (*count)++;
    printf("Student added successfully!\\n");
}

void display_student(const Student* student) {
    printf("\\n--- Student: %s ---\\n", student->name);
    printf("Grades: ");

    for (int i = 0; i < student->num_grades; i++) {
        printf("%d ", student->grades[i]);
    }

    double average;
    char letter;
    calculate_average(student->grades, student->num_grades, &average, &letter);

    printf("\\nAverage: %.2f\\n", average);
    printf("Letter Grade: %c\\n", letter);
}

void calculate_average(const int grades[], int count, double* average, char* letter) {
    int sum = 0;
    for (int i = 0; i < count; i++) {
        sum += grades[i];
    }

    *average = (double)sum / count;

    if (*average >= 90) *letter = 'A';
    else if (*average >= 80) *letter = 'B';
    else if (*average >= 70) *letter = 'C';
    else if (*average >= 60) *letter = 'D';
    else *letter = 'F';
}

int find_student(const Student students[], int count, const char* name) {
    for (int i = 0; i < count; i++) {
        if (strcmp(students[i].name, name) == 0) {
            return i;
        }
    }
    return -1;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Pass by value**: Creates copies, original unchanged
2. **Pass by reference**: Uses pointers to modify originals
3. **Arrays**: Always passed by reference (as pointers)
4. **Validate parameters**: Check for invalid inputs
5. **Use const**: Protect parameters from accidental modification
6. **Choose method wisely**: Based on whether you need to modify the original
7. **Document parameters**: Use clear names and add validation

---

## 🚀 Preview: Return Values and Types

In the next topic, you'll learn about:
- **Different return types** (void, int, pointers, etc.)
- **Returning multiple values** from functions
- **Return value validation** and error handling
- **Best practices** for function returns

**Master return values and your functions become complete input-output systems!** 🔄`
};
