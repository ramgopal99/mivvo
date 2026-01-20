import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_1: SubLesson = {
  id: "7.1",
  title: 'Structures Basics & Declaration',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🏗️ Structures Basics & Declaration in C

Structures allow you to group related data together into a single unit. They are fundamental to creating complex data types and are essential for organizing data in C programs.

---

## 📋 What is a Structure?

**A structure is a user-defined data type that groups related variables of different types.** Structures allow you to:

- Group related data together
- Create custom data types
- Represent complex objects (like a person, car, student, etc.)
- Pass multiple related values as a single unit
- Organize code more logically

---

## 🔧 Structure Declaration

### **Basic Structure Syntax**

\`\`\`c
// Structure declaration
struct structure_name {
    data_type member1;
    data_type member2;
    // ... more members
};

// Structure variable declaration
struct structure_name variable_name;
\`\`\`

### **Example: Student Structure**

\`\`\`c
#include <stdio.h>

// Structure declaration
struct Student {
    char name[50];
    int roll_number;
    float marks;
    char grade;
};

int main(void) {
    // Structure variable declaration
    struct Student student1;

    printf("Structure declared successfully!\\n");
    printf("Size of Student structure: %zu bytes\\n", sizeof(struct Student));

    return 0;
}
\`\`\`

---

## 📝 Structure Initialization

### **Method 1: Initialize Members Individually**

\`\`\`c
#include <stdio.h>

struct Point {
    int x;
    int y;
};

int main(void) {
    struct Point p1;

    // Initialize members individually
    p1.x = 10;
    p1.y = 20;

    printf("Point: (%d, %d)\\n", p1.x, p1.y);

    return 0;
}
\`\`\`

### **Method 2: Initialize with Designated Initializers (C99)**

\`\`\`c
#include <stdio.h>

struct Employee {
    char name[50];
    int id;
    float salary;
};

int main(void) {
    // Designated initialization
    struct Employee emp1 = {
        .name = "John Doe",
        .id = 12345,
        .salary = 50000.0f
    };

    printf("Employee: %s\\n", emp1.name);
    printf("ID: %d\\n", emp1.id);
    printf("Salary: %.2f\\n", emp1.salary);

    return 0;
}
\`\`\`

### **Method 3: Initialize at Declaration**

\`\`\`c
#include <stdio.h>

struct Rectangle {
    int length;
    int width;
};

int main(void) {
    // Initialize at declaration
    struct Rectangle rect = {10, 5};

    printf("Rectangle: %d x %d\\n", rect.length, rect.width);
    printf("Area: %d\\n", rect.length * rect.width);

    return 0;
}
\`\`\`

---

## 🔍 Structure Memory Layout

### **Understanding Structure Size**

\`\`\`c
#include <stdio.h>

struct Example {
    char c;      // 1 byte
    int i;       // 4 bytes
    char d;      // 1 byte
};

int main(void) {
    struct Example ex;

    printf("Size of char: %zu\\n", sizeof(char));
    printf("Size of int: %zu\\n", sizeof(int));
    printf("Size of struct Example: %zu\\n", sizeof(struct Example));

    // Structure padding may add extra bytes for alignment
    printf("Expected size (naive): %zu\\n", sizeof(char) + sizeof(int) + sizeof(char));
    printf("Actual size: %zu\\n", sizeof(struct Example));

    return 0;
}
\`\`\`

### **Structure Padding and Alignment**

\`\`\`c
#include <stdio.h>

// Show memory alignment
struct Aligned {
    char a;      // 1 byte
    // 3 bytes padding
    int b;       // 4 bytes
    char c;      // 1 byte
    // 3 bytes padding
};

#pragma pack(1)  // Disable padding
struct Packed {
    char a;      // 1 byte
    int b;       // 4 bytes
    char c;      // 1 byte
};
#pragma pack()   // Restore default

int main(void) {
    printf("Aligned struct size: %zu\\n", sizeof(struct Aligned));
    printf("Packed struct size: %zu\\n", sizeof(struct Packed));

    return 0;
}
\`\`\`

---

## 🎯 Practical Examples

### **Example 1: Person Information System**

\`\`\`c
#include <stdio.h>
#include <string.h>

struct Person {
    char name[50];
    int age;
    char gender;
    float height;  // in meters
    float weight;  // in kg
};

void print_person(struct Person p) {
    printf("Name: %s\\n", p.name);
    printf("Age: %d\\n", p.age);
    printf("Gender: %c\\n", p.gender);
    printf("Height: %.2f m\\n", p.height);
    printf("Weight: %.2f kg\\n", p.weight);
    printf("BMI: %.2f\\n", p.weight / (p.height * p.height));
}

int main(void) {
    struct Person person1;

    // Input person data
    printf("Enter name: ");
    fgets(person1.name, sizeof(person1.name), stdin);
    // Remove newline
    person1.name[strcspn(person1.name, "\\n")] = '\\0';

    printf("Enter age: ");
    scanf("%d", &person1.age);

    printf("Enter gender (M/F): ");
    scanf(" %c", &person1.gender);

    printf("Enter height (m): ");
    scanf("%f", &person1.height);

    printf("Enter weight (kg): ");
    scanf("%f", &person1.weight);

    printf("\\nPerson Information:\\n");
    print_person(person1);

    return 0;
}
\`\`\`

### **Example 2: Date Structure**

\`\`\`c
#include <stdio.h>
#include <stdbool.h>

struct Date {
    int day;
    int month;
    int year;
};

// Function to validate date
bool is_valid_date(struct Date d) {
    if (d.year < 1900 || d.year > 2100) return false;
    if (d.month < 1 || d.month > 12) return false;

    int days_in_month[] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

    // Check for leap year
    if (d.month == 2 && d.year % 4 == 0 &&
        (d.year % 100 != 0 || d.year % 400 == 0)) {
        days_in_month[2] = 29;
    }

    if (d.day < 1 || d.day > days_in_month[d.month]) return false;

    return true;
}

// Function to print date
void print_date(struct Date d) {
    printf("%02d/%02d/%04d\\n", d.day, d.month, d.year);
}

// Function to compare dates
int compare_dates(struct Date d1, struct Date d2) {
    if (d1.year != d2.year) return d1.year - d2.year;
    if (d1.month != d2.month) return d1.month - d2.month;
    return d1.day - d2.day;
}

int main(void) {
    struct Date today = {15, 12, 2024};
    struct Date birthday = {25, 6, 1990};

    printf("Today: ");
    print_date(today);

    printf("Birthday: ");
    print_date(birthday);

    if (is_valid_date(today)) {
        printf("Today is a valid date\\n");
    }

    int comparison = compare_dates(today, birthday);
    if (comparison > 0) {
        printf("Today is after birthday\\n");
    } else if (comparison < 0) {
        printf("Today is before birthday\\n");
    } else {
        printf("Today is birthday!\\n");
    }

    return 0;
}
\`\`\`

### **Example 3: Book Catalog**

\`\`\`c
#include <stdio.h>
#include <string.h>

#define MAX_TITLE 100
#define MAX_AUTHOR 50

struct Book {
    char title[MAX_TITLE];
    char author[MAX_AUTHOR];
    int publication_year;
    float price;
    bool available;
};

void print_book(struct Book b) {
    printf("Title: %s\\n", b.title);
    printf("Author: %s\\n", b.author);
    printf("Year: %d\\n", b.publication_year);
    printf("Price: $%.2f\\n", b.price);
    printf("Status: %s\\n", b.available ? "Available" : "Checked out");
    printf("---\\n");
}

int main(void) {
    struct Book library[3] = {
        {"The C Programming Language", "Kernighan & Ritchie", 1978, 45.99, true},
        {"Clean Code", "Robert C. Martin", 2008, 39.99, false},
        {"The Pragmatic Programmer", "Hunt & Thomas", 1999, 35.50, true}
    };

    printf("Library Catalog:\\n\\n");

    for (int i = 0; i < 3; i++) {
        printf("Book %d:\\n", i + 1);
        print_book(library[i]);
    }

    return 0;
}
\`\`\`

---

## 🔄 Structure Assignment

### **Copying Structures**

\`\`\`c
#include <stdio.h>
#include <string.h>

struct Point {
    int x, y;
};

int main(void) {
    struct Point p1 = {10, 20};
    struct Point p2;

    // Structure assignment (copies all members)
    p2 = p1;

    printf("p1: (%d, %d)\\n", p1.x, p1.y);
    printf("p2: (%d, %d)\\n", p2.x, p2.y);

    // Modify p2
    p2.x = 100;

    printf("After modifying p2:\\n");
    printf("p1: (%d, %d)\\n", p1.x, p1.y);  // p1 unchanged
    printf("p2: (%d, %d)\\n", p2.x, p2.y);

    return 0;
}
\`\`\`

---

## 🎯 Structure vs Arrays

### **When to Use Structures vs Arrays**

\`\`\`c
// Array: Same data type, accessed by index
int scores[100];  // All elements are int

// Structure: Different data types, accessed by name
struct Student {
    char name[50];    // string
    int id;          // int
    float gpa;       // float
    bool active;     // bool
};

// Array of structures: Multiple students
struct Student class[30];  // 30 students, each with name, id, gpa, active
\`\`\`

---

## ⚠️ Common Structure Mistakes

### **Uninitialized Structures**

\`\`\`c
struct Point p;  // Members have garbage values
// printf("%d, %d\\n", p.x, p.y);  // Undefined behavior!
\`\`\`

### **Incomplete Initialization**

\`\`\`c
struct Student s = {"John"};  // Only name initialized
// id, gpa, grade have garbage values!
\`\`\`

### **Wrong Member Access**

\`\`\`c
struct Point p = {10, 20};
// printf("%d\\n", p.z);  // Error: no member 'z'
\`\`\`

---

## 🎓 Key Takeaways

1. **Structures group related data** of different types together
2. **Declare with \`struct name { members }\`** syntax
3. **Access members using dot operator** (\`structure.member\`)
4. **Initialize with braces** \`{value1, value2, ...}\` or designated initializers
5. **Structure assignment** copies all members automatically
6. **Padding affects structure size** - compiler adds bytes for alignment
7. **Use structures** when you need to represent complex objects
8. **Arrays of structures** allow storing multiple complex objects

Structures are the foundation of complex data organization in C! 🏗️✨`;
    return contentString;
  })()
};
