import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_3: SubLesson = {
  id: "7.3",
  title: 'Nested Structures',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🏗️ Nested Structures in C

Nested structures allow you to create complex data hierarchies by placing structures inside other structures. This enables modeling of real-world relationships and complex data organization.

---

## 📋 What are Nested Structures?

**Nested structures contain other structures as members.** This allows you to:

- Model hierarchical relationships (company → department → employee)
- Group related data at multiple levels
- Create complex data representations
- Organize data more logically and intuitively

---

## 🔧 Basic Nested Structures

### **Structure Containing Another Structure**

\`\`\`c
#include <stdio.h>

// Inner structure
struct Address {
    char street[50];
    char city[30];
    char state[20];
    int zip_code;
};

// Outer structure containing the inner one
struct Person {
    char name[50];
    int age;
    struct Address address;  // Nested structure
};

int main(void) {
    struct Person person;

    // Initialize nested structure
    strcpy(person.name, "John Doe");
    person.age = 30;

    // Access nested structure members
    strcpy(person.address.street, "123 Main St");
    strcpy(person.address.city, "Anytown");
    strcpy(person.address.state, "CA");
    person.address.zip_code = 12345;

    // Print information
    printf("Name: %s\\n", person.name);
    printf("Age: %d\\n", person.age);
    printf("Address: %s, %s, %s %d\\n",
           person.address.street,
           person.address.city,
           person.address.state,
           person.address.zip_code);

    return 0;
}
\`\`\`

---

## 📍 Accessing Nested Members

### **Dot Operator for Multiple Levels**

\`\`\`c
// Access pattern: outer_structure.inner_structure.member

struct Person person;
person.address.street    // Access street in address
person.address.city      // Access city in address
person.address.zip_code  // Access zip_code in address
\`\`\`

### **Arrow Operator with Pointers**

\`\`\`c
struct Person *person_ptr = &person;

// Access with arrow operator
person_ptr->address.street      // Pointer to outer, dot for inner
person_ptr->address.city        // Same pattern

// Alternative: dereference then dot
(*person_ptr).address.street    // Equivalent but more verbose
\`\`\`

---

## 🏢 Complex Hierarchical Structures

### **Company Organization Example**

\`\`\`c
#include <stdio.h>
#include <string.h>

struct Date {
    int day, month, year;
};

struct Employee {
    char name[50];
    int id;
    float salary;
    struct Date hire_date;
};

struct Department {
    char name[30];
    char manager[50];
    struct Employee employees[10];  // Array of employees
    int employee_count;
};

struct Company {
    char name[50];
    struct Department departments[5];
    int department_count;
};

void print_employee(const struct Employee *emp) {
    printf("  Name: %s\\n", emp->name);
    printf("  ID: %d\\n", emp->id);
    printf("  Salary: $%.2f\\n", emp->salary);
    printf("  Hire Date: %02d/%02d/%04d\\n",
           emp->hire_date.day, emp->hire_date.month, emp->hire_date.year);
}

void print_department(const struct Department *dept) {
    printf("Department: %s\\n", dept->name);
    printf("Manager: %s\\n", dept->manager);
    printf("Employees (%d):\\n", dept->employee_count);

    for (int i = 0; i < dept->employee_count; i++) {
        print_employee(&dept->employees[i]);
        printf("\\n");
    }
}

int main(void) {
    struct Company company = {"Tech Corp"};

    // Add a department
    struct Department *it_dept = &company.departments[0];
    strcpy(it_dept->name, "Information Technology");
    strcpy(it_dept->manager, "Jane Smith");
    company.department_count = 1;

    // Add employees to department
    struct Employee *emp1 = &it_dept->employees[0];
    strcpy(emp1->name, "Bob Johnson");
    emp1->id = 1001;
    emp1->salary = 75000.0f;
    emp1->hire_date = (struct Date){15, 3, 2020};

    struct Employee *emp2 = &it_dept->employees[1];
    strcpy(emp2->name, "Alice Brown");
    emp2->id = 1002;
    emp2->salary = 80000.0f;
    emp2->hire_date = (struct Date){1, 7, 2019};

    it_dept->employee_count = 2;

    // Print company structure
    printf("Company: %s\\n\\n", company.name);
    for (int i = 0; i < company.department_count; i++) {
        print_department(&company.departments[i]);
    }

    return 0;
}
\`\`\`

---

## 🔄 Structure Initialization with Nesting

### **Nested Structure Initialization**

\`\`\`c
#include <stdio.h>

struct Address {
    char street[50];
    char city[20];
    int zip;
};

struct Person {
    char name[50];
    int age;
    struct Address address;
};

int main(void) {
    // Method 1: Nested initialization
    struct Person person1 = {
        "John Doe",           // name
        30,                   // age
        {                     // address (nested)
            "123 Main St",    // street
            "Anytown",        // city
            12345             // zip
        }
    };

    // Method 2: Designated initializers (C99)
    struct Person person2 = {
        .name = "Jane Smith",
        .age = 25,
        .address = {
            .street = "456 Oak Ave",
            .city = "Somewhere",
            .zip = 67890
        }
    };

    printf("Person 1:\\n");
    printf("Name: %s\\n", person1.name);
    printf("Address: %s, %s %d\\n\\n",
           person1.address.street,
           person1.address.city,
           person1.address.zip);

    printf("Person 2:\\n");
    printf("Name: %s\\n", person2.name);
    printf("Address: %s, %s %d\\n",
           person2.address.street,
           person2.address.city,
           person2.address.zip);

    return 0;
}
\`\`\`

---

## 📊 Arrays of Nested Structures

### **Complex Data Organization**

\`\`\`c
#include <stdio.h>
#include <string.h>

#define MAX_STUDENTS 50
#define MAX_COURSES 5

struct Course {
    char name[30];
    int credits;
    float grade;  // GPA points: 4.0, 3.7, etc.
};

struct Student {
    char name[50];
    int id;
    struct Course courses[MAX_COURSES];
    int course_count;
};

float calculate_gpa(const struct Student *student) {
    if (student->course_count == 0) return 0.0f;

    float total_points = 0;
    int total_credits = 0;

    for (int i = 0; i < student->course_count; i++) {
        const struct Course *course = &student->courses[i];
        total_points += course->grade * course->credits;
        total_credits += course->credits;
    }

    return total_credits > 0 ? total_points / total_credits : 0.0f;
}

void print_student(const struct Student *student) {
    printf("Student: %s (ID: %d)\\n", student->name, student->id);
    printf("Courses:\\n");

    for (int i = 0; i < student->course_count; i++) {
        const struct Course *course = &student->courses[i];
        printf("  %s (%d credits): %.1f\\n",
               course->name, course->credits, course->grade);
    }

    printf("GPA: %.2f\\n\\n", calculate_gpa(student));
}

int main(void) {
    struct Student students[MAX_STUDENTS];
    int student_count = 0;

    // Add first student
    struct Student *s1 = &students[student_count++];
    strcpy(s1->name, "Alice Johnson");
    s1->id = 1001;

    // Add courses for student 1
    strcpy(s1->courses[0].name, "Computer Science");
    s1->courses[0].credits = 3;
    s1->courses[0].grade = 4.0;

    strcpy(s1->courses[1].name, "Mathematics");
    s1->courses[1].credits = 4;
    s1->courses[1].grade = 3.7;

    s1->course_count = 2;

    // Add second student
    struct Student *s2 = &students[student_count++];
    strcpy(s2->name, "Bob Smith");
    s2->id = 1002;

    strcpy(s2->courses[0].name, "Physics");
    s2->courses[0].credits = 4;
    s2->courses[0].grade = 3.3;

    strcpy(s2->courses[1].name, "Chemistry");
    s2->courses[1].credits = 3;
    s2->courses[1].grade = 4.0;

    strcpy(s2->courses[2].name, "Biology");
    s2->courses[2].credits = 3;
    s2->courses[2].grade = 3.0;

    s2->course_count = 3;

    // Print all students
    for (int i = 0; i < student_count; i++) {
        print_student(&students[i]);
    }

    return 0;
}
\`\`\`

---

## 🔗 Self-Referential Structures

### **Structures That Reference Themselves**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

// Self-referential structure (for linked lists)
struct Node {
    int data;
    struct Node *next;  // Points to another Node
};

// Function to create a new node
struct Node* create_node(int data) {
    struct Node *node = (struct Node*)malloc(sizeof(struct Node));
    if (node == NULL) return NULL;

    node->data = data;
    node->next = NULL;
    return node;
}

// Function to print the list
void print_list(struct Node *head) {
    struct Node *current = head;
    while (current != NULL) {
        printf("%d -> ", current->data);
        current = current->next;
    }
    printf("NULL\\n");
}

// Function to free the list
void free_list(struct Node *head) {
    struct Node *current = head;
    while (current != NULL) {
        struct Node *temp = current;
        current = current->next;
        free(temp);
    }
}

int main(void) {
    // Create a linked list: 10 -> 20 -> 30 -> NULL
    struct Node *head = create_node(10);
    head->next = create_node(20);
    head->next->next = create_node(30);

    printf("Linked list: ");
    print_list(head);

    free_list(head);
    return 0;
}
\`\`\`

---

## 🎯 Practical Examples

### **Example 1: Library Management System**

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define MAX_BOOKS 100
#define MAX_TITLE 100
#define MAX_AUTHOR 50

struct Date {
    int day, month, year;
};

struct Book {
    char title[MAX_TITLE];
    char author[MAX_AUTHOR];
    struct Date publication_date;
    int isbn;
    int available_copies;
};

struct Library {
    char name[50];
    struct Book books[MAX_BOOKS];
    int book_count;
};

void add_book(struct Library *lib, const char *title, const char *author,
              int day, int month, int year, int isbn, int copies) {
    if (lib->book_count >= MAX_BOOKS) {
        printf("Library is full!\\n");
        return;
    }

    struct Book *book = &lib->books[lib->book_count++];
    strcpy(book->title, title);
    strcpy(book->author, author);
    book->publication_date.day = day;
    book->publication_date.month = month;
    book->publication_date.year = year;
    book->isbn = isbn;
    book->available_copies = copies;
}

void print_book(const struct Book *book) {
    printf("Title: %s\\n", book->title);
    printf("Author: %s\\n", book->author);
    printf("Publication: %02d/%02d/%04d\\n",
           book->publication_date.day,
           book->publication_date.month,
           book->publication_date.year);
    printf("ISBN: %d\\n", book->isbn);
    printf("Available copies: %d\\n", book->available_copies);
}

void print_library(const struct Library *lib) {
    printf("Library: %s\\n", lib->name);
    printf("Total books: %d\\n\\n", lib->book_count);

    for (int i = 0; i < lib->book_count; i++) {
        printf("Book %d:\\n", i + 1);
        print_book(&lib->books[i]);
        printf("\\n");
    }
}

int main(void) {
    struct Library my_library;
    strcpy(my_library.name, "City Library");
    my_library.book_count = 0;

    // Add some books
    add_book(&my_library, "C Programming", "Dennis Ritchie",
             1, 1, 1978, 123456, 5);

    add_book(&my_library, "The C Programming Language", "Kernighan & Ritchie",
             15, 3, 1988, 234567, 3);

    add_book(&my_library, "Clean Code", "Robert Martin",
             1, 8, 2008, 345678, 2);

    print_library(&my_library);

    return 0;
}
\`\`\`

### **Example 2: Game Character System**

\`\`\`c
#include <stdio.h>
#include <string.h>

struct Stats {
    int health;
    int mana;
    int strength;
    int agility;
};

struct Equipment {
    char weapon[30];
    char armor[30];
    int weapon_damage;
    int armor_defense;
};

struct Character {
    char name[50];
    char class[20];
    int level;
    struct Stats stats;
    struct Equipment equipment;
};

void print_character(const struct Character *character) {
    printf("=== Character Sheet ===\\n");
    printf("Name: %s\\n", character->name);
    printf("Class: %s (Level %d)\\n", character->class, character->level);
    printf("\\nStats:\\n");
    printf("  Health: %d\\n", character->stats.health);
    printf("  Mana: %d\\n", character->stats.mana);
    printf("  Strength: %d\\n", character->stats.strength);
    printf("  Agility: %d\\n", character->stats.agility);
    printf("\\nEquipment:\\n");
    printf("  Weapon: %s (%d damage)\\n",
           character->equipment.weapon,
           character->equipment.weapon_damage);
    printf("  Armor: %s (%d defense)\\n",
           character->equipment.armor,
           character->equipment.armor_defense);
}

int main(void) {
    struct Character hero = {
        "Aragorn",
        "Warrior",
        10,
        {120, 30, 18, 14},  // stats
        {"Sword of Elendil", "Mithril Armor", 25, 20}  // equipment
    };

    print_character(&hero);

    return 0;
}
\`\`\`

---

## 🔍 Deep Structure Copying

### **Copying Nested Structures**

\`\`\`c
#include <stdio.h>
#include <string.h>

struct Address {
    char street[50];
    char city[30];
    int zip;
};

struct Person {
    char name[50];
    struct Address address;
};

// Function to copy a person (deep copy)
void copy_person(struct Person *dest, const struct Person *src) {
    strcpy(dest->name, src->name);
    strcpy(dest->address.street, src->address.street);
    strcpy(dest->address.city, src->address.city);
    dest->address.zip = src->address.zip;
}

int main(void) {
    struct Person original = {
        "John Doe",
        {"123 Main St", "Anytown", 12345}
    };

    struct Person copy;

    // Deep copy
    copy_person(&copy, &original);

    // Modify copy
    strcpy(copy.name, "Jane Smith");
    copy.address.zip = 67890;

    printf("Original:\\n");
    printf("Name: %s\\n", original.name);
    printf("Address: %s, %s %d\\n\\n",
           original.address.street,
           original.address.city,
           original.address.zip);

    printf("Copy (modified):\\n");
    printf("Name: %s\\n", copy.name);
    printf("Address: %s, %s %d\\n",
           copy.address.street,
           copy.address.city,
           copy.address.zip);

    return 0;
}
\`\`\`

---

## ⚠️ Nested Structure Considerations

### **Memory Layout**

\`\`\`c
struct Inner {
    int a;      // 4 bytes
    char b;     // 1 byte + 3 padding
};

struct Outer {
    char x;     // 1 byte + 3 padding
    struct Inner inner;  // 8 bytes
    int y;      // 4 bytes
};

// Total size: 1 + 3 + 8 + 4 = 16 bytes
// (with padding for alignment)
\`\`\`

### **Initialization Order**

\`\`\`c
struct Outer obj = {
    'A',              // x
    {42, 'B'},        // inner (a, b)
    100               // y
};
\`\`\`

---

## 🎓 Key Takeaways

1. **Nested structures** allow hierarchical data organization
2. **Access nested members** using multiple dot/arrow operators
3. **Initialize nested structures** with nested braces or designated initializers
4. **Arrays of structures** can contain other structures
5. **Self-referential structures** enable linked data structures
6. **Deep copying** required when structures contain pointers
7. **Memory alignment** affects total structure size
8. **Choose nesting** based on logical relationships between data

Nested structures enable complex, real-world data modeling! 🏗️✨`;
    return contentString;
  })()
};
