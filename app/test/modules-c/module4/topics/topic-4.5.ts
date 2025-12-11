import { SubLesson } from '../../../data/lessonsData';

export const topic_4_5: SubLesson = {
  id: 4.5,
  title: 'Function Prototypes',
  status: 'completed',
  content: `# 📄 Function Prototypes

Learn about function prototypes (forward declarations), header files, and how to organize large C programs across multiple files.

---

## 🔍 What are Function Prototypes?

**Function prototypes declare the interface of a function without providing its implementation.**

\`\`\`c
// Function prototype (declaration)
int add_numbers(int a, int b);

// Function definition (implementation)
int add_numbers(int a, int b) {
    return a + b;
}
\`\`\`

---

## 📋 Why Prototypes Matter

### Problem Without Prototypes

\`\`\`c
#include <stdio.h>

int main() {
    // Compiler doesn't know about multiply function yet
    int result = multiply(5, 3);  // ❌ Implicit declaration warning

    printf("Result: %d\\n", result);
    return 0;
}

// Function defined later
int multiply(int a, int b) {
    return a * b;
}
\`\`\`

### Solution with Prototypes

\`\`\`c
#include <stdio.h>

// Function prototype tells compiler about multiply
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

## 🏗️ Prototype Syntax

### Basic Prototype Structure

\`\`\`c
return_type function_name(parameter_types);
\`\`\`

### Examples

\`\`\`c
// No parameters
void initialize_system(void);

// Single parameter
void print_number(int num);

// Multiple parameters
int calculate_sum(int a, int b, int c);

// Array parameter
double calculate_average(int scores[], int count);

// Pointer parameters
void swap(int* a, int* b);

// Mixed parameters
char* format_string(const char* format, int value);
\`\`\`

### Parameter Names (Optional in Prototypes)

\`\`\`c
// ✅ With parameter names (recommended for clarity)
int divide(int dividend, int divisor);

// ✅ Without parameter names (valid but less clear)
int divide(int, int);

// ❌ Wrong: parameter names don't match definition
int divide(int a, int b);  // Declaration
int divide(int x, int y) { // Definition - names can differ
    return x / y;
}
\`\`\`

---

## 📁 Header Files (.h)

### Creating Header Files

#### math_operations.h
\`\`\`c
#ifndef MATH_OPERATIONS_H
#define MATH_OPERATIONS_H

// Function prototypes
int add(int a, int b);
int subtract(int a, int b);
int multiply(int a, int b);
double divide(int a, int b);

#endif
\`\`\`

#### math_operations.c
\`\`\`c
#include "math_operations.h"

// Function definitions
int add(int a, int b) {
    return a + b;
}

int subtract(int a, int b) {
    return a - b;
}

int multiply(int a, int b) {
    return a * b;
}

double divide(int a, int b) {
    if (b != 0) {
        return (double)a / b;
    }
    return 0.0;  // Error case
}
\`\`\`

#### main.c
\`\`\`c
#include <stdio.h>
#include "math_operations.h"  // Include our header

int main() {
    int x = 10, y = 5;

    printf("Add: %d\\n", add(x, y));
    printf("Subtract: %d\\n", subtract(x, y));
    printf("Multiply: %d\\n", multiply(x, y));
    printf("Divide: %.2f\\n", divide(x, y));

    return 0;
}
\`\`\`

---

## 🔧 Compilation and Linking

### Separate Compilation Process

\`\`\`bash
# Compile each source file separately
gcc -c main.c              # Creates main.o
gcc -c math_operations.c   # Creates math_operations.o

# Link object files together
gcc main.o math_operations.o -o calculator
\`\`\`

### Using Makefiles

#### Makefile
\`\`\`makefile
# Makefile for calculator program

CC = gcc
CFLAGS = -Wall -g

# Object files
OBJS = main.o math_operations.o

# Executable name
TARGET = calculator

# Default target
all: $(TARGET)

# Link object files
$(TARGET): $(OBJS)
	$(CC) $(OBJS) -o $(TARGET)

# Compile main.c
main.o: main.c math_operations.h
	$(CC) $(CFLAGS) -c main.c

# Compile math_operations.c
math_operations.o: math_operations.c math_operations.h
	$(CC) $(CFLAGS) -c math_operations.c

# Clean build files
clean:
	rm -f $(OBJS) $(TARGET)

# Run the program
run: $(TARGET)
	./$(TARGET)
\`\`\`

#### Usage
\`\`\`bash
make          # Build the program
make clean    # Remove build files
make run      # Build and run
\`\`\`

---

## 🏗️ Organizing Large Programs

### Project Structure

\`\`\`
my_project/
├── include/           # Header files (.h)
│   ├── math_utils.h
│   ├── string_utils.h
│   └── file_utils.h
├── src/              # Source files (.c)
│   ├── main.c
│   ├── math_utils.c
│   ├── string_utils.c
│   └── file_utils.c
├── obj/              # Object files (.o) - generated
├── bin/              # Executables - generated
└── Makefile
\`\`\`

### Header File Organization

#### include/math_utils.h
\`\`\`c
#ifndef MATH_UTILS_H
#define MATH_UTILS_H

#include <stdbool.h>

// Mathematical constants
#define PI 3.141592653589793
#define E  2.718281828459045

// Function prototypes
double degrees_to_radians(double degrees);
double radians_to_degrees(double radians);
bool is_prime(int number);
long long factorial(int n);
double power(double base, int exponent);

#endif
\`\`\`

#### include/string_utils.h
\`\`\`c
#ifndef STRING_UTILS_H
#define STRING_UTILS_H

// Function prototypes for string operations
int string_length(const char* str);
void string_copy(char* dest, const char* src, int max_length);
int string_compare(const char* str1, const char* str2);
char* string_concatenate(char* dest, const char* src, int max_length);
bool is_palindrome(const char* str);

#endif
\`\`\`

#### src/main.c
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <stdbool.h>

// Include our custom headers
#include "include/math_utils.h"
#include "include/string_utils.h"

int main() {
    // Test math functions
    printf("PI: %.10f\\n", PI);
    printf("45 degrees in radians: %.4f\\n", degrees_to_radians(45));
    printf("Is 17 prime? %s\\n", is_prime(17) ? "Yes" : "No");

    // Test string functions
    char str1[] = "Hello";
    char str2[] = "World";
    char result[20];

    printf("Length of '%s': %d\\n", str1, string_length(str1));
    string_concatenate(result, str1, sizeof(result));
    string_concatenate(result, " ", sizeof(result));
    string_concatenate(result, str2, sizeof(result));
    printf("Concatenated: %s\\n", result);

    return 0;
}
\`\`\`

---

## 🛡️ Include Guards

### The Include Guard Problem

\`\`\`c
// math.h
void add(int a, int b);

// utils.h
#include "math.h"  // Includes math.h
void print_result(int x);

// main.c
#include "math.h"  // Direct include
#include "utils.h"  // Indirect include - math.h included twice!
\`\`\`

### Solution: Include Guards

\`\`\`c
// math.h
#ifndef MATH_H
#define MATH_H

void add(int a, int b);
// Other declarations...

#endif  // MATH_H
\`\`\`

\`\`\`c
// utils.h
#ifndef UTILS_H
#define UTILS_H

#include "math.h"  // Safe to include

void print_result(int x);
// Other declarations...

#endif  // UTILS_H
\`\`\`

### Modern Alternative: #pragma once

\`\`\`c
// math.h
#pragma once

void add(int a, int b);
// Other declarations...
\`\`\`

**Note:** `#pragma once` is widely supported but not part of the C standard. Include guards are more portable.

---

## 🔄 Forward Declarations vs Prototypes

### When to Use Forward Declarations

\`\`\`c
// Forward declaration for mutually recursive functions
struct Node;  // Forward declaration of struct

void process_node(struct Node* node);

// Now define the struct
struct Node {
    int data;
    struct Node* next;
};

// Function definition
void process_node(struct Node* node) {
    if (node != NULL) {
        printf("Data: %d\\n", node->data);
        process_node(node->next);  // Recursive call
    }
}
\`\`\`

### Circular Dependencies

\`\`\`c
// file1.h
#ifndef FILE1_H
#define FILE1_H

struct TypeB;  // Forward declaration

struct TypeA {
    int data;
    struct TypeB* ptr;
};

void process_a(struct TypeA* a);

#endif
\`\`\`

\`\`\`c
// file2.h
#ifndef FILE2_H
#define FILE2_H

struct TypeA;  // Forward declaration

struct TypeB {
    double value;
    struct TypeA* ptr;
};

void process_b(struct TypeB* b);

#endif
\`\`\`

---

## 🧪 Complete Multi-File Example

### Student Management System

#### include/student.h
\`\`\`c
#ifndef STUDENT_H
#define STUDENT_H

#define MAX_NAME_LENGTH 50
#define MAX_SUBJECTS 10

typedef struct {
    char name[MAX_NAME_LENGTH];
    int id;
    int grades[MAX_SUBJECTS];
    int num_subjects;
} Student;

// Function prototypes
void initialize_student(Student* student, const char* name, int id);
void add_grade(Student* student, int grade);
double calculate_average(const Student* student);
char get_letter_grade(double average);
void print_student(const Student* student);

#endif
\`\`\`

#### include/database.h
\`\`\`c
#ifndef DATABASE_H
#define DATABASE_H

#include "student.h"

#define MAX_STUDENTS 100

typedef struct {
    Student students[MAX_STUDENTS];
    int count;
} StudentDatabase;

// Function prototypes
void initialize_database(StudentDatabase* db);
int add_student(StudentDatabase* db, const char* name, int id);
Student* find_student(StudentDatabase* db, int id);
void print_all_students(const StudentDatabase* db);
double get_class_average(const StudentDatabase* db);

#endif
\`\`\`

#### src/student.c
\`\`\`c
#include <stdio.h>
#include <string.h>
#include "student.h"

void initialize_student(Student* student, const char* name, int id) {
    strcpy(student->name, name);
    student->id = id;
    student->num_subjects = 0;
}

void add_grade(Student* student, int grade) {
    if (student->num_subjects < MAX_SUBJECTS) {
        student->grades[student->num_subjects] = grade;
        student->num_subjects++;
    }
}

double calculate_average(const Student* student) {
    if (student->num_subjects == 0) return 0.0;

    int sum = 0;
    for (int i = 0; i < student->num_subjects; i++) {
        sum += student->grades[i];
    }

    return (double)sum / student->num_subjects;
}

char get_letter_grade(double average) {
    if (average >= 90) return 'A';
    if (average >= 80) return 'B';
    if (average >= 70) return 'C';
    if (average >= 60) return 'D';
    return 'F';
}

void print_student(const Student* student) {
    printf("ID: %d, Name: %s\\n", student->id, student->name);
    printf("Grades: ");

    for (int i = 0; i < student->num_subjects; i++) {
        printf("%d ", student->grades[i]);
    }

    double average = calculate_average(student);
    char letter = get_letter_grade(average);

    printf("\\nAverage: %.2f, Grade: %c\\n\\n", average, letter);
}
\`\`\`

#### src/database.c
\`\`\`c
#include <stdio.h>
#include "database.h"

void initialize_database(StudentDatabase* db) {
    db->count = 0;
}

int add_student(StudentDatabase* db, const char* name, int id) {
    if (db->count >= MAX_STUDENTS) {
        return -1;  // Database full
    }

    // Check if ID already exists
    for (int i = 0; i < db->count; i++) {
        if (db->students[i].id == id) {
            return -2;  // ID already exists
        }
    }

    initialize_student(&db->students[db->count], name, id);
    db->count++;

    return 0;  // Success
}

Student* find_student(StudentDatabase* db, int id) {
    for (int i = 0; i < db->count; i++) {
        if (db->students[i].id == id) {
            return &db->students[i];
        }
    }

    return NULL;  // Not found
}

void print_all_students(const StudentDatabase* db) {
    printf("\\n=== All Students ===\\n");

    for (int i = 0; i < db->count; i++) {
        print_student(&db->students[i]);
    }
}

double get_class_average(const StudentDatabase* db) {
    if (db->count == 0) return 0.0;

    double total_average = 0.0;

    for (int i = 0; i < db->count; i++) {
        total_average += calculate_average(&db->students[i]);
    }

    return total_average / db->count;
}
\`\`\`

#### src/main.c
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include "database.h"

int main() {
    StudentDatabase db;
    initialize_database(&db);

    // Add some students
    add_student(&db, "Alice Johnson", 1001);
    add_student(&db, "Bob Smith", 1002);
    add_student(&db, "Charlie Brown", 1003);

    // Add grades for students
    Student* alice = find_student(&db, 1001);
    if (alice != NULL) {
        add_grade(alice, 95);
        add_grade(alice, 87);
        add_grade(alice, 92);
    }

    Student* bob = find_student(&db, 1002);
    if (bob != NULL) {
        add_grade(bob, 78);
        add_grade(bob, 85);
        add_grade(bob, 88);
    }

    Student* charlie = find_student(&db, 1003);
    if (charlie != NULL) {
        add_grade(charlie, 91);
        add_grade(charlie, 89);
        add_grade(charlie, 94);
    }

    // Display results
    print_all_students(&db);

    printf("Class Average: %.2f\\n", get_class_average(&db));

    return 0;
}
\`\`\`

#### Makefile
\`\`\`makefile
CC = gcc
CFLAGS = -Wall -g -Iinclude
OBJDIR = obj
BINDIR = bin

# Source files
SRCS = src/main.c src/student.c src/database.c
OBJS = $(patsubst src/%.c, $(OBJDIR)/%.o, $(SRCS))
TARGET = $(BINDIR)/student_management

$(TARGET): $(OBJS)
	@mkdir -p $(BINDIR)
	$(CC) $(OBJS) -o $(TARGET)

$(OBJDIR)/%.o: src/%.c
	@mkdir -p $(OBJDIR)
	$(CC) $(CFLAGS) -c $< -o $@

.PHONY: clean run

clean:
	rm -rf $(OBJDIR) $(BINDIR)

run: $(TARGET)
	./$(TARGET)
\`\`\`

---

## 🎯 Key Takeaways

1. **Function prototypes** declare function interfaces before use
2. **Header files** (.h) contain declarations, source files (.c) contain definitions
3. **Include guards** prevent multiple inclusion of headers
4. **Separate compilation** allows building large programs
5. **Makefiles** automate the build process
6. **Forward declarations** resolve circular dependencies
7. **Organize code** into logical modules for maintainability

---

## 🚀 Preview: Scope and Lifetime of Variables

In the next topic, you'll learn about:
- **Local vs global variables** and their scope
- **Variable lifetime** (when variables exist)
- **Storage classes** (auto, static, extern, register)
- **Scope resolution** and name conflicts

**Understanding scope prevents bugs and improves code organization!** 🎯`
};
