import { SubLesson } from '../../../data/lessonsData';

export const topic_7_3: SubLesson = {
  id: 7.3,
  title: 'Accessing Structure Members',
  status: 'completed',
  content: `# 🔍 Accessing Structure Members

Master the dot operator (.) and arrow operator (->) to access and manipulate structure members effectively.

---

## 🎯 Member Access Operators

### The Dot Operator (.)

**The dot operator accesses members of a structure variable directly.**

\`\`\`c
#include <stdio.h>
#include <string.h>

struct Student {
    char name[50];
    int age;
    float gpa;
};

int main() {
    struct Student student;

    // Using dot operator to access members
    strcpy(student.name, "John Doe");
    student.age = 20;
    student.gpa = 3.7;

    // Reading members
    printf("Name: %s\\n", student.name);
    printf("Age: %d\\n", student.age);
    printf("GPA: %.1f\\n", student.gpa);

    return 0;
}
\`\`\`

### The Arrow Operator (->)

**The arrow operator accesses members of a structure through a pointer.**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Student {
    char name[50];
    int age;
    float gpa;
};

int main() {
    // Create a pointer to structure
    struct Student* student_ptr = malloc(sizeof(struct Student));

    if (student_ptr != NULL) {
        // Using arrow operator to access members
        strcpy(student_ptr->name, "Jane Smith");
        student_ptr->age = 19;
        student_ptr->gpa = 3.9;

        // Reading members
        printf("Name: %s\\n", student_ptr->name);
        printf("Age: %d\\n", student_ptr->age);
        printf("GPA: %.1f\\n", student_ptr->gpa);

        free(student_ptr);
    }

    return 0;
}
\`\`\`

---

## 🔄 Dot vs Arrow Operator

### When to Use Each Operator

\`\`\`c
struct Student {
    char name[50];
    int age;
};

void demonstrate_access(struct Student* ptr, struct Student var) {
    // ❌ Wrong: Using dot on pointer
    // ptr.name = "John";  // Error!

    // ❌ Wrong: Using arrow on variable
    // var->age = 20;     // Error!

    // ✅ Correct usage
    strcpy(ptr->name, "John");  // Arrow for pointer
    var.age = 20;              // Dot for variable
}

int main() {
    struct Student s1;
    struct Student* s2_ptr = &s1;

    // Both access the same structure
    strcpy(s1.name, "Alice");
    strcpy(s2_ptr->name, "Alice");  // Same as above

    s1.age = 21;
    s2_ptr->age = 21;  // Same as above

    return 0;
}
\`\`\`

### Equivalent Operations

\`\`\`c
struct Student {
    char name[50];
    int age;
};

int main() {
    struct Student s;
    struct Student* ptr = &s;

    // These are equivalent:
    s.age = 20;
    (*ptr).age = 20;    // Dereference then dot
    ptr->age = 20;      // Arrow operator (shorthand)

    // Arrow is just syntactic sugar for (*ptr).member
    return 0;
}
\`\`\`

---

## 🏗️ Nested Structure Access

### Accessing Nested Structures

\`\`\`c
#include <stdio.h>
#include <string.h>

struct Address {
    char street[50];
    char city[30];
    char state[3];
    char zip[11];
};

struct Person {
    char name[50];
    int age;
    struct Address address;
};

int main() {
    struct Person person;

    // Access nested structure members
    strcpy(person.name, "John Doe");
    person.age = 30;

    // Deep nesting with dot operator
    strcpy(person.address.street, "123 Main St");
    strcpy(person.address.city, "Anytown");
    strcpy(person.address.state, "CA");
    strcpy(person.address.zip, "12345");

    printf("Name: %s\\n", person.name);
    printf("Address: %s, %s, %s %s\\n",
           person.address.street,
           person.address.city,
           person.address.state,
           person.address.zip);

    return 0;
}
\`\`\`

### Nested Pointer Access

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Address {
    char street[50];
    char city[30];
};

struct Person {
    char name[50];
    struct Address* address;  // Pointer to nested structure
};

int main() {
    struct Person* person = malloc(sizeof(struct Person));

    if (person != NULL) {
        // Allocate nested structure
        person->address = malloc(sizeof(struct Address));

        if (person->address != NULL) {
            strcpy(person->name, "Jane Smith");

            // Access through double arrow
            strcpy(person->address->street, "456 Oak Ave");
            strcpy(person->address->city, "Somewhere");

            printf("Name: %s\\n", person->name);
            printf("Street: %s\\n", person->address->street);
            printf("City: %s\\n", person->address->city);

            free(person->address);
        }

        free(person);
    }

    return 0;
}
\`\`\`

---

## 📊 Array of Structures

### Accessing Array Elements

\`\`\`c
#include <stdio.h>
#include <string.h>

#define MAX_STUDENTS 3

struct Student {
    char name[50];
    int id;
    float gpa;
};

int main() {
    struct Student class[MAX_STUDENTS];

    // Initialize array of structures
    strcpy(class[0].name, "Alice");
    class[0].id = 1001;
    class[0].gpa = 3.8;

    strcpy(class[1].name, "Bob");
    class[1].id = 1002;
    class[1].gpa = 3.5;

    strcpy(class[2].name, "Charlie");
    class[2].id = 1003;
    class[2].gpa = 4.0;

    // Access array elements
    for (int i = 0; i < MAX_STUDENTS; i++) {
        printf("Student %d: %s (ID: %d, GPA: %.1f)\\n",
               i + 1, class[i].name, class[i].id, class[i].gpa);
    }

    return 0;
}
\`\`\`

### Pointer to Array of Structures

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Student {
    char name[50];
    int id;
};

void print_students(struct Student* students, int count) {
    for (int i = 0; i < count; i++) {
        printf("Student %d: %s (ID: %d)\\n",
               i + 1, students[i].name, students[i].id);
    }
}

int main() {
    int num_students = 3;
    struct Student* class = malloc(num_students * sizeof(struct Student));

    if (class != NULL) {
        // Initialize through pointer
        strcpy(class[0].name, "Alice");
        class[0].id = 1001;

        strcpy(class[1].name, "Bob");
        class[1].id = 1002;

        strcpy(class[2].name, "Charlie");
        class[2].id = 1003;

        print_students(class, num_students);

        free(class);
    }

    return 0;
}
\`\`\`

---

## 🔗 Structure Pointers and Access

### Structure Pointer Arithmetic

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

struct Point {
    int x, y;
};

int main() {
    struct Point* points = malloc(3 * sizeof(struct Point));

    if (points != NULL) {
        // Initialize points
        points[0].x = 1; points[0].y = 2;
        points[1].x = 3; points[1].y = 4;
        points[2].x = 5; points[2].y = 6;

        // Pointer arithmetic
        struct Point* ptr = points;

        for (int i = 0; i < 3; i++) {
            printf("Point %d: (%d, %d)\\n", i + 1, ptr->x, ptr->y);
            ptr++;  // Move to next structure
        }

        free(points);
    }

    return 0;
}
\`\`\`

### Function Parameters with Structures

\`\`\`c
#include <stdio.h>

struct Rectangle {
    int width, height;
};

// Pass by value (copies entire structure)
int area_by_value(struct Rectangle rect) {
    return rect.width * rect.height;
}

// Pass by reference (efficient)
int area_by_reference(const struct Rectangle* rect) {
    return rect->width * rect->height;
}

int main() {
    struct Rectangle rect = {10, 20};

    printf("Area by value: %d\\n", area_by_value(rect));
    printf("Area by reference: %d\\n", area_by_reference(&rect));

    return 0;
}
\`\`\`

---

## 🧪 Advanced Access Patterns

### Conditional Member Access

\`\`\`c
#include <stdio.h>

struct Employee {
    char name[50];
    int salary;
    int has_bonus;
    int bonus_amount;
};

int get_total_compensation(const struct Employee* emp) {
    int total = emp->salary;

    // Conditional access
    if (emp->has_bonus) {
        total += emp->bonus_amount;
    }

    return total;
}

int main() {
    struct Employee emp1 = {"John", 50000, 1, 5000};
    struct Employee emp2 = {"Jane", 55000, 0, 0};

    printf("John's total: $%d\\n", get_total_compensation(&emp1));
    printf("Jane's total: $%d\\n", get_total_compensation(&emp2));

    return 0;
}
\`\`\`

### Chained Access

\`\`\`c
struct Department {
    char name[50];
    struct Employee* manager;
};

struct Employee {
    char name[50];
    struct Department* dept;
};

void print_manager_info(const struct Employee* emp) {
    if (emp->dept && emp->dept->manager) {
        printf("Department: %s\\n", emp->dept->name);
        printf("Manager: %s\\n", emp->dept->manager->name);
    }
}

int main() {
    struct Department engineering = {"Engineering"};
    struct Employee manager = {"Alice", &engineering};
    struct Employee worker = {"Bob", &engineering};

    engineering.manager = &manager;

    print_manager_info(&worker);

    return 0;
}
\`\`\`

---

## 🛡️ Safe Member Access

### Null Pointer Checks

\`\`\`c
struct Person {
    char name[50];
    struct Person* spouse;
};

void print_spouse_name(const struct Person* person) {
    // Safe access with null check
    if (person != NULL && person->spouse != NULL) {
        printf("Spouse: %s\\n", person->spouse->name);
    } else {
        printf("No spouse information\\n");
    }
}

int main() {
    struct Person john = {"John"};
    struct Person jane = {"Jane"};

    john.spouse = &jane;
    // jane.spouse = &john;  // Could add this too

    print_spouse_name(&john);
    print_spouse_name(&jane);

    return 0;
}
\`\`\`

### Bounds Checking for Arrays

\`\`\`c
#define MAX_EMPLOYEES 10

struct Company {
    struct Employee employees[MAX_EMPLOYEES];
    int count;
};

struct Employee* get_employee(struct Company* company, int index) {
    if (company != NULL && index >= 0 && index < company->count) {
        return &company->employees[index];
    }
    return NULL;
}

int main() {
    struct Company company = {.count = 3};

    // Initialize employees
    strcpy(company.employees[0].name, "Alice");
    strcpy(company.employees[1].name, "Bob");
    strcpy(company.employees[2].name, "Charlie");

    // Safe access
    struct Employee* emp = get_employee(&company, 1);
    if (emp != NULL) {
        printf("Employee: %s\\n", emp->name);
    }

    // Out of bounds
    emp = get_employee(&company, 10);
    if (emp == NULL) {
        printf("Invalid employee index\\n");
    }

    return 0;
}
\`\`\`

---

## 🎯 Access Performance Considerations

### Direct vs Pointer Access

\`\`\`c
#include <stdio.h>
#include <time.h>

#define ITERATIONS 10000000

struct Data {
    int values[100];
};

void access_direct(struct Data data) {
    long long sum = 0;
    for (int i = 0; i < ITERATIONS; i++) {
        sum += data.values[i % 100];
    }
}

void access_pointer(const struct Data* data) {
    long long sum = 0;
    for (int i = 0; i < ITERATIONS; i++) {
        sum += data->values[i % 100];
    }
}

int main() {
    struct Data data;
    for (int i = 0; i < 100; i++) {
        data.values[i] = i;
    }

    clock_t start, end;

    start = clock();
    access_direct(data);
    end = clock();
    printf("Direct access: %.3f seconds\\n",
           (double)(end - start) / CLOCKS_PER_SEC);

    start = clock();
    access_pointer(&data);
    end = clock();
    printf("Pointer access: %.3f seconds\\n",
           (double)(end - start) / CLOCKS_PER_SEC);

    return 0;
}
\`\`\`

---

## 🧪 Complete Examples

### Student Grade Management System

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_SUBJECTS 5
#define MAX_STUDENTS 100

typedef struct {
    char subject_name[30];
    float grade;
} SubjectGrade;

typedef struct {
    char name[50];
    int id;
    SubjectGrade subjects[MAX_SUBJECTS];
    int subject_count;
} Student;

typedef struct {
    Student students[MAX_STUDENTS];
    int count;
} Classroom;

// Function to add a grade to a student
void add_grade(Student* student, const char* subject, float grade) {
    if (student->subject_count < MAX_SUBJECTS) {
        strcpy(student->subjects[student->subject_count].subject_name, subject);
        student->subjects[student->subject_count].grade = grade;
        student->subject_count++;
    }
}

// Function to calculate GPA
float calculate_gpa(const Student* student) {
    if (student->subject_count == 0) return 0.0f;

    float total = 0.0f;
    for (int i = 0; i < student->subject_count; i++) {
        total += student->subjects[i].grade;
    }

    return total / student->subject_count;
}

// Function to print student report
void print_student_report(const Student* student) {
    printf("\\nStudent Report\\n");
    printf("Name: %s\\n", student->name);
    printf("ID: %d\\n", student->id);
    printf("GPA: %.2f\\n", calculate_gpa(student));

    printf("Grades:\\n");
    for (int i = 0; i < student->subject_count; i++) {
        printf("  %s: %.1f\\n",
               student->subjects[i].subject_name,
               student->subjects[i].grade);
    }
}

int main() {
    Classroom classroom = {0};

    // Add students
    Student* s1 = &classroom.students[classroom.count++];
    strcpy(s1->name, "Alice Johnson");
    s1->id = 1001;

    Student* s2 = &classroom.students[classroom.count++];
    strcpy(s2->name, "Bob Smith");
    s2->id = 1002;

    // Add grades
    add_grade(s1, "Math", 95.0);
    add_grade(s1, "Science", 87.5);
    add_grade(s1, "English", 92.0);

    add_grade(s2, "Math", 88.5);
    add_grade(s2, "Science", 91.0);
    add_grade(s2, "History", 85.5);

    // Print reports
    for (int i = 0; i < classroom.count; i++) {
        print_student_report(&classroom.students[i]);
    }

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Dot operator (.)** accesses members of structure variables
2. **Arrow operator (->)** accesses members of structure pointers
3. **Nested access** uses multiple operators: `person.address.street`
4. **Array access** combines indexing with member access: `students[i].name`
5. **Null checks** are essential before pointer member access
6. **Performance** is similar between dot and arrow operators
7. **Bounds checking** prevents array access errors

---

## 🚀 Preview: Structure Initialization

In the next topic, you'll learn about:
- **Designated initializers** for precise member initialization
- **Partial initialization** and default values
- **Nested structure initialization** patterns
- **Array of structures** initialization
- **Runtime initialization** techniques

**Proper initialization is crucial for reliable structure usage!** 🎯

