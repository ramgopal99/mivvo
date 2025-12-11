import { SubLesson } from '../../../data/lessonsData';

export const topic_7_1: SubLesson = {
  id: 7.1,
  title: 'Introduction to Structures',
  status: 'completed',
  content: `# 📦 Introduction to Structures

Learn why structures are essential for organizing complex data and how they enable you to create custom data types in C.

---

## 🎯 Why Structures Matter

### The Problem with Basic Data Types

Without structures, related data is scattered across multiple variables:

\`\`\`c
#include <stdio.h>

int main() {
    // Student information scattered across variables
    char student_name[50] = "John Doe";
    int student_age = 20;
    float student_gpa = 3.7;
    int student_id = 12345;

    // Hard to pass around or manage as a unit
    // Easy to mix up parameters in functions
    // No logical grouping of related data

    printf("Student: %s, Age: %d, GPA: %.1f, ID: %d\\n",
           student_name, student_age, student_gpa, student_id);

    return 0;
}
\`\`\`

**Problems:**
- ❌ Related data is disconnected
- ❌ Function parameters become unwieldy
- ❌ Easy to make mistakes with parameter order
- ❌ No logical grouping of data
- ❌ Difficult to maintain and extend

### The Structure Solution

Structures group related data into a single logical unit:

\`\`\`c
#include <stdio.h>

// Define a structure for student data
struct Student {
    char name[50];
    int age;
    float gpa;
    int id;
};

int main() {
    // Create a single variable that holds all student data
    struct Student student1;

    // Initialize the structure
    strcpy(student1.name, "John Doe");
    student1.age = 20;
    student1.gpa = 3.7;
    student1.id = 12345;

    // Easy to pass around and manage
    printf("Student: %s, Age: %d, GPA: %.1f, ID: %d\\n",
           student1.name, student1.age, student1.gpa, student1.id);

    return 0;
}
\`\`\`

**Benefits:**
- ✅ Related data is logically grouped
- ✅ Single variable represents complex data
- ✅ Easy to pass to functions
- ✅ Self-documenting code
- ✅ Extensible and maintainable

---

## 🏗️ Understanding Structures

### What is a Structure?

**A structure is a user-defined data type that groups related variables of different types under a single name.**

\`\`\`c
// Structure definition
struct StructureName {
    data_type member1;
    data_type member2;
    // ... more members
};

// Structure usage
struct StructureName variable_name;
\`\`\`

### Real-World Analogy

Think of a structure like a **form** or **record card**:

```
STUDENT RECORD CARD
===================
Name: [John Doe        ]
Age:  [20              ]
GPA:  [3.7             ]
ID:   [12345           ]
```

Each field holds different types of information, but they're all part of one logical entity.

---

## 📝 Basic Structure Syntax

### Structure Definition

\`\`\`c
// Complete structure definition
struct Student {
    char name[50];     // String member
    int age;          // Integer member
    float gpa;        // Float member
    int id;           // Integer member
};
\`\`\`

### Structure Declaration

\`\`\`c
// Declare structure variables
struct Student student1;        // Single variable
struct Student student2;

// Declare and initialize
struct Student student3 = {"Alice", 19, 3.9, 67890};
\`\`\`

### Accessing Members

\`\`\`c
#include <stdio.h>
#include <string.h>

struct Student {
    char name[50];
    int age;
    float gpa;
    int id;
};

int main() {
    struct Student s1;

    // Access members using dot operator
    strcpy(s1.name, "Bob Wilson");
    s1.age = 21;
    s1.gpa = 3.2;
    s1.id = 54321;

    // Access for reading
    printf("Name: %s\\n", s1.name);
    printf("Age: %d\\n", s1.age);
    printf("GPA: %.1f\\n", s1.gpa);
    printf("ID: %d\\n", s1.id);

    return 0;
}
\`\`\`

---

## 🌟 Structure Applications

### Representing Real-World Entities

#### Person Information

\`\`\`c
struct Person {
    char first_name[30];
    char last_name[30];
    int age;
    char gender;
    char address[100];
    char phone[15];
};

int main() {
    struct Person person1;

    strcpy(person1.first_name, "Jane");
    strcpy(person1.last_name, "Smith");
    person1.age = 28;
    person1.gender = 'F';
    strcpy(person1.address, "123 Main St, City, State");
    strcpy(person1.phone, "555-0123");

    printf("Person: %s %s, Age: %d, Phone: %s\\n",
           person1.first_name, person1.last_name,
           person1.age, person1.phone);

    return 0;
}
\`\`\`

#### Point in 2D Space

\`\`\`c
struct Point {
    int x;
    int y;
};

int main() {
    struct Point p1 = {10, 20};
    struct Point p2 = {30, 40};

    printf("Point 1: (%d, %d)\\n", p1.x, p1.y);
    printf("Point 2: (%d, %d)\\n", p2.x, p2.y);

    return 0;
}
\`\`\`

#### Date Representation

\`\`\`c
struct Date {
    int day;
    int month;
    int year;
};

int main() {
    struct Date today = {15, 12, 2024};

    printf("Today: %02d/%02d/%04d\\n",
           today.day, today.month, today.year);

    return 0;
}
\`\`\`

---

## 📊 Structure Memory Layout

### How Structures are Stored

\`\`\`c
#include <stdio.h>

struct Example {
    char c;      // 1 byte
    int i;       // 4 bytes
    double d;    // 8 bytes
};

int main() {
    struct Example ex;

    printf("Size of struct: %zu bytes\\n", sizeof(struct Example));
    printf("Size of char: %zu\\n", sizeof(char));
    printf("Size of int: %zu\\n", sizeof(int));
    printf("Size of double: %zu\\n", sizeof(double));

    // Total should be 1 + 4 + 8 = 13 bytes, but...
    // Structures may have padding for alignment!

    return 0;
}
\`\`\`

### Structure Padding

**Compilers add padding bytes between structure members to optimize memory access.**

\`\`\`c
struct PaddedExample {
    char c;      // 1 byte
    // 3 bytes padding (to align int on 4-byte boundary)
    int i;       // 4 bytes
    double d;    // 8 bytes (may need 8-byte alignment)
};

// Total size: 1 + 3 + 4 + 8 = 16 bytes
\`\`\`

---

## 🔄 Structure Assignment

### Copying Structures

\`\`\`c
#include <stdio.h>
#include <string.h>

struct Student {
    char name[50];
    int age;
    float gpa;
};

int main() {
    struct Student s1 = {"John", 20, 3.5};
    struct Student s2;

    // Structure assignment (copies all members)
    s2 = s1;

    // Modify s1
    strcpy(s1.name, "Jane");
    s1.age = 19;

    // s2 remains unchanged
    printf("s1: %s, %d years old\\n", s1.name, s1.age);
    printf("s2: %s, %d years old\\n", s2.name, s2.age);

    return 0;
}
\`\`\`

---

## 🏷️ Structure Tags and typedef

### Structure Tags

\`\`\`c
// Define structure with tag
struct Car {
    char make[20];
    char model[20];
    int year;
    float price;
};

// Use the tag to declare variables
struct Car my_car;
struct Car your_car;
\`\`\`

### Anonymous Structures

\`\`\`c
// Define and declare in one step
struct {
    char name[30];
    int age;
} person1, person2;

// But you can't declare more variables later!
// struct person3;  // ❌ Error - no tag
\`\`\`

### typedef for Convenience

\`\`\`c
// Create an alias for struct Student
typedef struct Student {
    char name[50];
    int age;
    float gpa;
} Student;

// Now you can use Student instead of struct Student
Student s1;  // Instead of: struct Student s1;
Student s2 = {"Alice", 19, 3.8};
\`\`\`

---

## 🎮 Practical Structure Examples

### Employee Database

\`\`\`c
#include <stdio.h>
#include <string.h>

typedef struct {
    int id;
    char name[50];
    char department[30];
    float salary;
    struct {
        int day;
        int month;
        int year;
    } hire_date;
} Employee;

void print_employee(Employee emp) {
    printf("ID: %d\\n", emp.id);
    printf("Name: %s\\n", emp.name);
    printf("Department: %s\\n", emp.department);
    printf("Salary: $%.2f\\n", emp.salary);
    printf("Hire Date: %02d/%02d/%04d\\n",
           emp.hire_date.day, emp.hire_date.month, emp.hire_date.year);
}

int main() {
    Employee emp1 = {
        1001,
        "John Smith",
        "Engineering",
        75000.00,
        {15, 3, 2020}
    };

    print_employee(emp1);

    return 0;
}
\`\`\`

### Rectangle with Methods

\`\`\`c
#include <stdio.h>

typedef struct {
    float width;
    float height;
} Rectangle;

float calculate_area(Rectangle r) {
    return r.width * r.height;
}

float calculate_perimeter(Rectangle r) {
    return 2 * (r.width + r.height);
}

int main() {
    Rectangle rect = {10.5, 20.3};

    printf("Rectangle: %.1f x %.1f\\n", rect.width, rect.height);
    printf("Area: %.2f\\n", calculate_area(rect));
    printf("Perimeter: %.2f\\n", calculate_perimeter(rect));

    return 0;
}
\`\`\`

---

## 🔍 Structure Limitations

### No Built-in Operations

\`\`\`c
struct Point {
    int x, y;
};

int main() {
    struct Point p1 = {1, 2};
    struct Point p2 = {3, 4};

    // ❌ These don't work
    // struct Point p3 = p1 + p2;  // No addition
    // if (p1 > p2) { ... }        // No comparison
    // p1 * 2;                     // No multiplication

    // ✅ You must define your own functions
    return 0;
}
\`\`\`

### Memory Overhead

\`\`\`c
struct SmallStruct {
    char c;    // 1 byte
    // 3 bytes padding
    int i;     // 4 bytes
    // Total: 8 bytes (3x larger than needed!)
};
\`\`\`

---

## 🎯 Structure Design Principles

### 1. Logical Grouping

Group related data that represents a single concept:

\`\`\`c
// ✅ Good: Single concept
struct Address {
    char street[50];
    char city[30];
    char state[3];
    char zip[11];
};

// ❌ Bad: Unrelated data mixed together
struct RandomData {
    char name[30];
    int temperature;
    float price;
    char color[10];
};
\`\`\`

### 2. Consistent Naming

\`\`\`c
// ✅ Good naming conventions
struct EmployeeRecord { /* ... */ };
typedef struct EmployeeRecord Employee;

Employee emp;  // Clear and concise
\`\`\`

### 3. Consider Memory Layout

\`\`\`c
// ✅ Good: Ordered by size for minimal padding
struct Optimized {
    double d;    // 8 bytes
    int i;       // 4 bytes
    short s;     // 2 bytes
    char c;      // 1 byte
};

// ❌ Bad: Poor ordering causes more padding
struct WastedSpace {
    char c;      // 1 byte
    double d;    // 8 bytes (with 7 bytes padding)
    short s;     // 2 bytes (with 6 bytes padding)
    int i;       // 4 bytes
};
\`\`\`

---

## 🚀 Preview: Structure Declaration and Definition

In the next topic, you'll learn about:
- **Detailed structure declaration syntax** and rules
- **Structure definition placement** (global vs local)
- **Incomplete structure declarations** for self-referencing
- **Structure member naming** and scope rules
- **Multiple structure definitions** and forward declarations

**Mastering structure declaration is the foundation for all structure usage!** 🏗️

