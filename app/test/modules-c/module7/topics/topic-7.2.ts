import { SubLesson } from '../../../data/lessonsData';

export const topic_7_2: SubLesson = {
  id: 7.2,
  title: 'Structure Declaration and Definition',
  status: 'completed',
  content: `# 📝 Structure Declaration and Definition

Master the complete syntax for declaring and defining structures, including advanced concepts like incomplete declarations and forward references.

---

## 📋 Complete Structure Declaration Syntax

### Basic Structure Declaration

\`\`\`c
// Full syntax: struct tag_name { member_declarations } [variable_declarations];
struct Student {
    char name[50];     // Member declaration
    int age;          // Member declaration
    float gpa;        // Member declaration
} student1, student2;  // Optional variable declarations

// Or declare variables separately
struct Student student3;
\`\`\`

### Structure Tag Rules

\`\`\`c
// ✅ Valid structure tags
struct person_info_t { /* ... */ };
struct PersonInfo { /* ... */ };
struct _Person { /* ... */ };

// ❌ Invalid structure tags (same rules as variables)
// struct 123invalid { /* ... */ };  // Cannot start with number
// struct struct { /* ... */ };      // Reserved word
// struct person-info { /* ... */ }; // Invalid character
\`\`\`

### Member Declaration Rules

\`\`\`c
struct CompleteExample {
    // ✅ Valid members
    int integer_member;
    float float_member;
    char char_member;
    double double_array[10];
    char string_member[100];

    // ✅ Structures can contain other structures
    struct {
        int day;
        int month;
        int year;
    } birth_date;

    // ✅ Pointer members
    int* pointer_member;

    // ❌ Invalid members
    // void void_member;              // Cannot have void member
    // struct Incomplete incomplete;  // Incomplete type
};
\`\`\`

---

## 🏗️ Structure Definition Placement

### Global Structure Definitions

\`\`\`c
#include <stdio.h>

// Global structure definition - visible to entire file
struct GlobalStudent {
    char name[50];
    int age;
};

// Global variable
struct GlobalStudent global_student;

void some_function() {
    // Can use global structure here
    struct GlobalStudent local_student;
}

int main() {
    // Can use global structure here too
    struct GlobalStudent main_student;
    return 0;
}
\`\`\`

### Local Structure Definitions

\`\`\`c
#include <stdio.h>

void function_with_local_struct() {
    // Local structure definition - only visible in this function
    struct LocalStudent {
        char name[50];
        int age;
    };

    struct LocalStudent student;
    // Use student...
}

int main() {
    // ❌ Error: LocalStudent not visible here
    // struct LocalStudent s;

    function_with_local_struct();
    return 0;
}
\`\`\`

### File-Scope vs Block-Scope

\`\`\`c
// File scope - entire file can see this
struct FileScope {
    int x;
} file_var;

void func1() {
    // Block scope - only this function
    struct BlockScope {
        int y;
    } block_var;

    // Nested block
    {
        // Even more local scope
        struct NestedScope {
            int z;
        } nested_var;
    }
    // nested_var not visible here
}
// block_var not visible here
\`\`\`

---

## 🔄 Incomplete Structure Declarations

### Forward Declarations

\`\`\`c
// Incomplete declaration - structure not fully defined yet
struct Person;

// Can declare pointers to incomplete structures
struct Person* person_ptr;

// But cannot declare actual structure variables yet
// struct Person p;  // ❌ Error: incomplete type

// Later, complete the definition
struct Person {
    char name[50];
    int age;
    struct Person* friend;  // Self-reference!
};

// Now we can declare variables
struct Person person1, person2;
\`\`\`

### Self-Referencing Structures

\`\`\`c
// Linked list node
struct Node {
    int data;
    struct Node* next;  // Points to another Node
};

// Binary tree node
struct TreeNode {
    int value;
    struct TreeNode* left;
    struct TreeNode* right;
};

// Network graph node
struct GraphNode {
    int id;
    struct GraphNode** neighbors;  // Array of pointers to other nodes
    int neighbor_count;
};
\`\`\`

---

## 🎯 typedef and Structure Aliases

### Basic typedef Usage

\`\`\`c
#include <stdio.h>

// Method 1: typedef with tag
typedef struct StudentTag {
    char name[50];
    int age;
} Student;

// Method 2: typedef without tag (anonymous)
typedef struct {
    char name[50];
    int age;
} Person;

// Now use the typedef names
Student student1;
Person person1;

// Can still use struct tags if they exist
struct StudentTag student2;
\`\`\`

### typedef Best Practices

\`\`\`c
// ✅ Recommended: Use typedef for cleaner code
typedef struct {
    char name[50];
    int age;
    float gpa;
} Student;

Student s1;  // Clean and readable

// ❌ Avoid: Omitting typedef makes code verbose
struct StudentTag {
    char name[50];
    int age;
    float gpa;
};

struct StudentTag s2;  // Verbose
\`\`\`

### typedef for Complex Types

\`\`\`c
// Function pointer typedef
typedef void (*PrintFunction)(void*);

// Structure with function pointer
typedef struct {
    char name[50];
    PrintFunction print_func;
} PrintableObject;

// Array typedef
typedef int IntArray[10];

// Pointer typedef
typedef char* String;

// Complex typedef
typedef struct Node {
    int data;
    struct Node* next;
} LinkedListNode, *LinkedListPtr;
\`\`\`

---

## 🏷️ Structure Member Naming

### Member Name Scope

\`\`\`c
struct A {
    int x;  // Member x in struct A
};

struct B {
    int x;  // Member x in struct B (different from A::x)
};

int main() {
    struct A a;
    struct B b;

    a.x = 10;  // Refers to A::x
    b.x = 20;  // Refers to B::x (different variable)

    printf("a.x = %d, b.x = %d\\n", a.x, b.x);

    return 0;
}
\`\`\`

### Member Name Conflicts

\`\`\`c
struct Person {
    char name[50];
};

void some_function() {
    char name[50];  // Local variable with same name as member

    struct Person p;
    // strcpy(p.name, "John");  // OK: member access
    // strcpy(name, "Jane");   // OK: local variable
}
\`\`\`

### Reserved Member Names

\`\`\`c
// Avoid these member names (reserved or commonly used)
struct BadExample {
    // ❌ Avoid these
    // int struct;    // Reserved word
    // int typedef;   // Reserved word
    // int auto;      // Reserved word
    // int break;     // Reserved word

    // ⚠️ Be careful with these (common in APIs)
    // int size;      // Might conflict with functions
    // int count;     // Very generic
    // int data;      // Very generic
};
\`\`\`

---

## 📦 Multiple Structure Definitions

### Separate Definition and Declaration

\`\`\`c
// Forward declaration
struct Point;

// Function prototype using incomplete type
void move_point(struct Point* p, int dx, int dy);

// Complete definition
struct Point {
    int x, y;
};

// Function definition
void move_point(struct Point* p, int dx, int dy) {
    p->x += dx;
    p->y += dy;
}
\`\`\`

### Multiple Files with Structures

\`\`\`c
// header.h
#ifndef HEADER_H
#define HEADER_H

// Structure declaration in header
typedef struct {
    char name[50];
    int value;
} Item;

#endif
\`\`\`

\`\`\`c
// main.c
#include "header.h"

int main() {
    Item item1;  // Structure is known from header
    return 0;
}
\`\`\`

---

## 🔧 Advanced Declaration Patterns

### Nested Structure Declarations

\`\`\`c
struct Outer {
    int outer_value;

    // Nested structure
    struct Inner {
        int inner_value;
    } inner_member;

    // Pointer to nested structure
    struct Inner* inner_ptr;
};

// Can declare Inner structures elsewhere
struct Outer::Inner inner_var;  // C++ style (not valid C)
\`\`\`

### Structure Declarations in Function Parameters

\`\`\`c
struct Point {
    int x, y;
};

// Method 1: Pass by value (copies entire structure)
void print_point(struct Point p) {
    printf("(%d, %d)\\n", p.x, p.y);
}

// Method 2: Pass by reference (efficient)
void move_point(struct Point* p, int dx, int dy) {
    p->x += dx;
    p->y += dy;
}

// Method 3: Return by value
struct Point create_point(int x, int y) {
    struct Point p = {x, y};
    return p;
}
\`\`\`

### Array of Structures

\`\`\`c
struct Student {
    char name[50];
    int age;
};

// Array declaration
struct Student class[30];

// Or with typedef
typedef struct {
    char name[50];
    int age;
} Student;

Student class[30];
\`\`\`

---

## 🛡️ Declaration Safety and Best Practices

### Avoid Incomplete Types in Declarations

\`\`\`c
// ✅ Good: Complete type before use
struct Node {
    int data;
    struct Node* next;
};

// ❌ Bad: Incomplete type used incorrectly
struct BadNode {
    int data;
    struct BadNode next;  // ❌ Cannot have structure as member
};
\`\`\`

### Consistent Naming Conventions

\`\`\`c
// ✅ Good naming patterns
typedef struct Person_s {
    char name[50];
    int age;
} Person;

typedef struct {
    int x, y;
} Point2D;

typedef struct LinkedList_s {
    int data;
    struct LinkedList_s* next;
} LinkedList;
\`\`\`

### Header File Organization

\`\`\`c
// person.h
#ifndef PERSON_H
#define PERSON_H

typedef struct Person_s Person;

Person* person_create(const char* name, int age);
void person_destroy(Person* p);
void person_print(Person* p);

#endif
\`\`\`

\`\`\`c
// person.c
#include "person.h"

struct Person_s {
    char name[50];
    int age;
};

Person* person_create(const char* name, int age) {
    Person* p = malloc(sizeof(Person));
    if (p) {
        strcpy(p->name, name);
        p->age = age;
    }
    return p;
}

// ... other functions
\`\`\`

---

## 🧪 Complete Examples

### Complex Data Structure

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Forward declarations
typedef struct Department_s Department;
typedef struct Employee_s Employee;

// Department structure
struct Department_s {
    char name[50];
    Employee* employees;
    int employee_count;
    int capacity;
};

// Employee structure
struct Employee_s {
    char name[50];
    int id;
    float salary;
    Department* department;
};

// Function declarations
Department* department_create(const char* name);
void department_destroy(Department* dept);
void department_add_employee(Department* dept, Employee* emp);

int main() {
    // Create department
    Department* engineering = department_create("Engineering");

    // Create employees
    Employee emp1 = {"Alice", 1001, 75000.0, engineering};
    Employee emp2 = {"Bob", 1002, 80000.0, engineering};

    // Add employees to department
    department_add_employee(engineering, &emp1);
    department_add_employee(engineering, &emp2);

    // Print information
    printf("Department: %s\\n", engineering->name);
    printf("Employees: %d\\n", engineering->employee_count);

    department_destroy(engineering);

    return 0;
}

Department* department_create(const char* name) {
    Department* dept = malloc(sizeof(Department));
    if (dept) {
        strcpy(dept->name, name);
        dept->employees = NULL;
        dept->employee_count = 0;
        dept->capacity = 0;
    }
    return dept;
}

void department_destroy(Department* dept) {
    if (dept) {
        free(dept->employees);
        free(dept);
    }
}

void department_add_employee(Department* dept, Employee* emp) {
    if (dept->employee_count >= dept->capacity) {
        int new_capacity = dept->capacity == 0 ? 4 : dept->capacity * 2;
        Employee* new_employees = realloc(dept->employees,
                                        new_capacity * sizeof(Employee));
        if (new_employees == NULL) return;

        dept->employees = new_employees;
        dept->capacity = new_capacity;
    }

    dept->employees[dept->employee_count] = *emp;
    dept->employee_count++;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Structure declaration syntax**: `struct Tag { members } variables;`
2. **Use typedef** for cleaner code: `typedef struct { ... } TypeName;`
3. **Forward declarations** allow self-referencing structures
4. **Incomplete types** can only be used as pointers until fully defined
5. **Member names** are scoped to their structure
6. **Structure definitions** can be global or local scope
7. **Header files** should use forward declarations for encapsulation

---

## 🚀 Preview: Accessing Structure Members

In the next topic, you'll learn about:
- **Dot operator (.)** for direct member access
- **Arrow operator (->)** for pointer member access
- **Nested structure access** patterns
- **Member access through pointers** vs direct access
- **Array of structures** member access

**Member access is the gateway to using structure data!** 🔍

