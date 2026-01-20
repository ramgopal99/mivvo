import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_2: SubLesson = {
  id: "7.2",
  title: 'Accessing Structure Members',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🎯 Accessing Structure Members in C

Once you have a structure, you need to know how to access and manipulate its members. C provides the dot operator (.) and arrow operator (->) for accessing structure members.

---

## 📍 The Dot Operator (.)

### **Accessing Members of Structure Variables**

\`\`\`c
#include <stdio.h>

struct Point {
    int x;
    int y;
};

int main(void) {
    struct Point p1 = {10, 20};

    // Access members using dot operator
    printf("Point coordinates: (%d, %d)\\n", p1.x, p1.y);

    // Modify members
    p1.x = 50;
    p1.y = 75;

    printf("After modification: (%d, %d)\\n", p1.x, p1.y);

    return 0;
}
\`\`\`

---

## ➡️ The Arrow Operator (->)

### **Accessing Members Through Pointers**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

struct Point {
    int x;
    int y;
};

int main(void) {
    struct Point *ptr;

    // Allocate memory for structure
    ptr = (struct Point*)malloc(sizeof(struct Point));
    if (ptr == NULL) {
        printf("Memory allocation failed\\n");
        return 1;
    }

    // Access members using arrow operator
    ptr->x = 100;
    ptr->y = 200;

    printf("Point via pointer: (%d, %d)\\n", ptr->x, ptr->y);

    // Alternative: dereference then use dot
    (*ptr).x = 300;
    (*ptr).y = 400;

    printf("After dereference: (%d, %d)\\n", ptr->x, ptr->y);

    free(ptr);
    return 0;
}
\`\`\`

**Key Difference:**
- **Dot (.)**: Used with structure variables: \`struct_var.member\`
- **Arrow (->)**: Used with structure pointers: \`struct_ptr->member\`
- **Equivalent**: \`ptr->member\` ≡ \`(*ptr).member\`

---

## 🔄 Structure Arrays

### **Arrays of Structures**

\`\`\`c
#include <stdio.h>

#define MAX_STUDENTS 3

struct Student {
    char name[50];
    int roll_number;
    float marks;
};

int main(void) {
    struct Student class[MAX_STUDENTS];

    // Initialize array elements
    for (int i = 0; i < MAX_STUDENTS; i++) {
        printf("Enter details for student %d:\\n", i + 1);

        printf("Name: ");
        scanf(" %[^\n]", class[i].name);

        printf("Roll number: ");
        scanf("%d", &class[i].roll_number);

        printf("Marks: ");
        scanf("%f", &class[i].marks);
    }

    // Display all students
    printf("\\nStudent Details:\\n");
    for (int i = 0; i < MAX_STUDENTS; i++) {
        printf("Student %d:\\n", i + 1);
        printf("  Name: %s\\n", class[i].name);
        printf("  Roll: %d\\n", class[i].roll_number);
        printf("  Marks: %.2f\\n\\n", class[i].marks);
    }

    return 0;
}
\`\`\`

### **Accessing Array Elements**

\`\`\`c
// Access individual members
class[0].name         // First student's name
class[1].roll_number  // Second student's roll number
class[2].marks        // Third student's marks

// Loop through array
for (int i = 0; i < MAX_STUDENTS; i++) {
    printf("Student %d: %s\\n", i + 1, class[i].name);
}
\`\`\`

---

## 📊 Structure Pointers and Arrays

### **Pointer to Structure Array**

\`\`\`c
#include <stdio.h>

struct Point {
    int x, y;
};

void print_points(struct Point points[], int count) {
    for (int i = 0; i < count; i++) {
        printf("Point %d: (%d, %d)\\n", i + 1, points[i].x, points[i].y);
    }
}

void print_points_ptr(struct Point *points, int count) {
    for (int i = 0; i < count; i++) {
        printf("Point %d: (%d, %d)\\n", i + 1, points[i].x, points[i].y);
        // Or: (points + i)->x, (points + i)->y
    }
}

int main(void) {
    struct Point triangle[3] = {
        {0, 0},
        {5, 0},
        {2, 4}
    };

    printf("Using array notation:\\n");
    print_points(triangle, 3);

    printf("\\nUsing pointer notation:\\n");
    print_points_ptr(triangle, 3);

    return 0;
}
\`\`\`

---

## 🔄 Dynamic Structure Arrays

### **Allocating Arrays of Structures**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Employee {
    char name[50];
    int id;
    float salary;
};

struct Employee* create_employee_array(int count) {
    return (struct Employee*)malloc(count * sizeof(struct Employee));
}

void initialize_employees(struct Employee *employees, int count) {
    for (int i = 0; i < count; i++) {
        sprintf(employees[i].name, "Employee %d", i + 1);
        employees[i].id = 1000 + i;
        employees[i].salary = 30000.0f + (i * 5000.0f);
    }
}

void print_employees(struct Employee *employees, int count) {
    printf("Employee List:\\n");
    for (int i = 0; i < count; i++) {
        printf("%s (ID: %d) - $%.2f\\n",
               employees[i].name,
               employees[i].id,
               employees[i].salary);
    }
}

int main(void) {
    int count = 5;
    struct Employee *staff = create_employee_array(count);

    if (staff == NULL) {
        printf("Memory allocation failed\\n");
        return 1;
    }

    initialize_employees(staff, count);
    print_employees(staff, count);

    free(staff);
    return 0;
}
\`\`\`

---

## 🎯 Structure Member Functions

### **Functions Working with Structures**

\`\`\`c
#include <stdio.h>
#include <string.h>

#define MAX_TITLE 100
#define MAX_AUTHOR 50

struct Book {
    char title[MAX_TITLE];
    char author[MAX_AUTHOR];
    int year;
    float price;
};

// Function to create a book
struct Book create_book(const char *title, const char *author, int year, float price) {
    struct Book book;

    strcpy(book.title, title);
    strcpy(book.author, author);
    book.year = year;
    book.price = price;

    return book;
}

// Function to print a book
void print_book(const struct Book *book) {
    printf("Title: %s\\n", book->title);
    printf("Author: %s\\n", book->author);
    printf("Year: %d\\n", book->year);
    printf("Price: $%.2f\\n", book->price);
}

// Function to apply discount
void apply_discount(struct Book *book, float discount_percent) {
    float discount = book->price * (discount_percent / 100.0f);
    book->price -= discount;
}

int main(void) {
    struct Book my_book = create_book("C Programming", "Dennis Ritchie", 1978, 49.99f);

    printf("Original book:\\n");
    print_book(&my_book);

    apply_discount(&my_book, 20.0f);  // 20% discount

    printf("\\nAfter 20%% discount:\\n");
    print_book(&my_book);

    return 0;
}
\`\`\`

---

## 🔍 Structure Member Access Patterns

### **Pattern 1: Direct Member Access**

\`\`\`c
struct Point p = {10, 20};
int x_value = p.x;           // Direct access
p.y = 30;                    // Direct modification
\`\`\`

### **Pattern 2: Pointer Member Access**

\`\`\`c
struct Point *ptr = &p;
int x_value = ptr->x;        // Arrow operator
ptr->y = 30;                 // Arrow operator modification

// Equivalent to:
int x_value = (*ptr).x;      // Dereference then dot
(*ptr).y = 30;
\`\`\`

### **Pattern 3: Array Element Access**

\`\`\`c
struct Point points[10];
points[0].x = 10;            // Array element access
points[5].y = 20;
\`\`\`

### **Pattern 4: Function Parameter Access**

\`\`\`c
void move_point(struct Point p) {  // Pass by value
    p.x += 10;  // Only modifies local copy
}

void move_point_ptr(struct Point *p) {  // Pass by reference
    p->x += 10;  // Modifies original
}
\`\`\`

---

## 🎯 Practical Examples

### **Example 1: Student Grade Management**

\`\`\`c
#include <stdio.h>
#include <string.h>

#define MAX_STUDENTS 50
#define MAX_NAME 50

struct Student {
    char name[MAX_NAME];
    int id;
    float grades[5];  // 5 subjects
    int num_grades;
};

void add_student(struct Student students[], int *count, const char *name, int id) {
    if (*count >= MAX_STUDENTS) {
        printf("Student limit reached\\n");
        return;
    }

    struct Student *s = &students[*count];
    strcpy(s->name, name);
    s->id = id;
    s->num_grades = 0;

    (*count)++;
}

void add_grade(struct Student *student, float grade) {
    if (student->num_grades < 5) {
        student->grades[student->num_grades] = grade;
        student->num_grades++;
    }
}

float calculate_average(const struct Student *student) {
    if (student->num_grades == 0) return 0.0f;

    float sum = 0;
    for (int i = 0; i < student->num_grades; i++) {
        sum += student->grades[i];
    }
    return sum / student->num_grades;
}

void print_student(const struct Student *student) {
    printf("Name: %s\\n", student->name);
    printf("ID: %d\\n", student->id);
    printf("Grades: ");
    for (int i = 0; i < student->num_grades; i++) {
        printf("%.1f ", student->grades[i]);
    }
    printf("\\nAverage: %.2f\\n", calculate_average(student));
}

int main(void) {
    struct Student students[MAX_STUDENTS];
    int student_count = 0;

    // Add students
    add_student(students, &student_count, "Alice", 1001);
    add_student(students, &student_count, "Bob", 1002);

    // Add grades
    add_grade(&students[0], 85.5);
    add_grade(&students[0], 92.0);
    add_grade(&students[0], 78.5);

    add_grade(&students[1], 88.0);
    add_grade(&students[1], 91.5);
    add_grade(&students[1], 87.0);
    add_grade(&students[1], 93.5);

    // Print all students
    for (int i = 0; i < student_count; i++) {
        printf("Student %d:\\n", i + 1);
        print_student(&students[i]);
        printf("\\n");
    }

    return 0;
}
\`\`\`

### **Example 2: Linked List Node**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

struct Node* create_node(int data) {
    struct Node *node = (struct Node*)malloc(sizeof(struct Node));
    if (node == NULL) return NULL;

    node->data = data;
    node->next = NULL;
    return node;
}

void print_list(struct Node *head) {
    struct Node *current = head;
    while (current != NULL) {
        printf("%d -> ", current->data);
        current = current->next;
    }
    printf("NULL\\n");
}

void free_list(struct Node *head) {
    struct Node *current = head;
    while (current != NULL) {
        struct Node *temp = current;
        current = current->next;
        free(temp);
    }
}

int main(void) {
    // Create a simple linked list
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

## ⚠️ Common Member Access Mistakes

### **Mistake 1: Wrong Operator**

\`\`\`c
struct Point *ptr = &point;
// ptr.x  // ERROR: ptr is pointer, use ptr->x or (*ptr).x
\`\`\`

### **Mistake 2: Accessing Uninitialized Members**

\`\`\`c
struct Student s;  // Members uninitialized
// printf("%s\\n", s.name);  // Garbage values!
\`\`\`

### **Mistake 3: Array Bounds in Structure Arrays**

\`\`\`c
struct Student class[10];
// class[10].name  // ERROR: Index 10 is out of bounds (0-9)
\`\`\`

---

## 🎓 Key Takeaways

1. **Dot operator (.)** accesses members of structure variables
2. **Arrow operator (->)** accesses members through structure pointers
3. **Both operators** can access nested structures and arrays
4. **Structure arrays** combine array and member access
5. **Dynamic allocation** works with structure pointers
6. **Function parameters** can be structures or pointers to structures
7. **Member access** follows C's precedence rules
8. **Choose dot vs arrow** based on whether you have a variable or pointer

Master member access to effectively work with structured data! 🎯✨`;
    return contentString;
  })()
};
