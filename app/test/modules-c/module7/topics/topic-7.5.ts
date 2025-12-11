import { SubLesson } from '../../../data/lessonsData';

export const topic_7_5: SubLesson = {
  id: 7.5,
  title: 'Structures and Functions',
  status: 'completed',
  content: `# 🎛️ Structures and Functions

Learn how to effectively pass structures to and from functions, and how structures can contain function pointers for advanced patterns.

---

## 📥 Passing Structures to Functions

### Pass by Value

\`\`\`c
#include <stdio.h>

struct Point {
    int x, y;
};

// Function receives a copy of the structure
void print_point(struct Point p) {
    printf("Point: (%d, %d)\\n", p.x, p.y);

    // Modifying the copy doesn't affect the original
    p.x = 999;
    p.y = 999;
}

int main() {
    struct Point my_point = {10, 20};

    printf("Before: (%d, %d)\\n", my_point.x, my_point.y);
    print_point(my_point);
    printf("After: (%d, %d)\\n", my_point.x, my_point.y);  // Unchanged!

    return 0;
}
\`\`\`

**Pros:**
- ✅ Function cannot modify original data
- ✅ Safe from side effects

**Cons:**
- ❌ Inefficient for large structures
- ❌ Copies entire structure

### Pass by Reference

\`\`\`c
#include <stdio.h>

struct Point {
    int x, y;
};

// Function receives a pointer to the structure
void move_point(struct Point* p, int dx, int dy) {
    p->x += dx;  // Modifies original
    p->y += dy;  // Modifies original
}

void print_point(const struct Point* p) {
    // const prevents modification
    printf("Point: (%d, %d)\\n", p->x, p->y);
}

int main() {
    struct Point my_point = {10, 20};

    printf("Before: ");
    print_point(&my_point);

    move_point(&my_point, 5, 8);

    printf("After: ");
    print_point(&my_point);  // Modified!

    return 0;
}
\`\`\`

**Pros:**
- ✅ Efficient (no copying)
- ✅ Can modify original data

**Cons:**
- ❌ Function can have side effects
- ❌ Must check for NULL pointers

---

## 📤 Returning Structures from Functions

### Return by Value

\`\`\`c
#include <stdio.h>
#include <math.h>

struct Point {
    double x, y;
};

// Return a new point
struct Point create_point(double x, double y) {
    struct Point p = {x, y};
    return p;  // Returns a copy
}

// Return result of calculation
struct Point midpoint(const struct Point* p1, const struct Point* p2) {
    struct Point mid = {
        (p1->x + p2->x) / 2.0,
        (p1->y + p2->y) / 2.0
    };
    return mid;
}

int main() {
    struct Point a = {0, 0};
    struct Point b = {10, 10};

    struct Point mid = midpoint(&a, &b);

    printf("Midpoint: (%.1f, %.1f)\\n", mid.x, mid.y);

    return 0;
}
\`\`\`

### Return by Reference

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

struct Student {
    char name[50];
    int age;
};

// Return pointer to dynamically allocated structure
struct Student* create_student(const char* name, int age) {
    struct Student* s = malloc(sizeof(struct Student));

    if (s != NULL) {
        strcpy(s->name, name);
        s->age = age;
    }

    return s;  // Caller must free this!
}

int main() {
    struct Student* student = create_student("Alice", 20);

    if (student != NULL) {
        printf("Created: %s, age %d\\n", student->name, student->age);
        free(student);  // Don't forget to free!
    }

    return 0;
}
\`\`\`

---

## 🔄 Function Pointers in Structures

### Structures with Function Pointers

\`\`\`c
#include <stdio.h>

struct Calculator {
    int (*add)(int, int);
    int (*subtract)(int, int);
    int (*multiply)(int, int);
    double (*divide)(int, int);
};

// Implementation functions
int add_impl(int a, int b) { return a + b; }
int sub_impl(int a, int b) { return a - b; }
int mul_impl(int a, int b) { return a * b; }
double div_impl(int a, int b) { return b != 0 ? (double)a / b : 0; }

int main() {
    struct Calculator calc = {
        .add = add_impl,
        .subtract = sub_impl,
        .multiply = mul_impl,
        .divide = div_impl
    };

    printf("5 + 3 = %d\\n", calc.add(5, 3));
    printf("5 - 3 = %d\\n", calc.subtract(5, 3));
    printf("5 * 3 = %d\\n", calc.multiply(5, 3));
    printf("5 / 3 = %.2f\\n", calc.divide(5, 3));

    return 0;
}
\`\`\`

### Callback Systems

\`\`\`c
#include <stdio.h>

// Event handler type
typedef void (*EventHandler)(void* data);

struct Button {
    char label[20];
    EventHandler on_click;
    void* user_data;
};

// Event handler functions
void save_file(void* data) {
    char* filename = (char*)data;
    printf("Saving to file: %s\\n", filename);
}

void exit_app(void* data) {
    printf("Exiting application\\n");
    exit(0);
}

void simulate_click(struct Button* button) {
    if (button->on_click != NULL) {
        button->on_click(button->user_data);
    }
}

int main() {
    struct Button save_button = {
        .label = "Save",
        .on_click = save_file,
        .user_data = "document.txt"
    };

    struct Button exit_button = {
        .label = "Exit",
        .on_click = exit_app,
        .user_data = NULL
    };

    // Simulate button clicks
    simulate_click(&save_button);
    simulate_click(&exit_button);

    return 0;
}
\`\`\`

---

## 🧪 Advanced Function-Structure Patterns

### Structure Methods

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char* buffer;
    size_t size;
    size_t capacity;
} StringBuilder;

// Method functions
void sb_init(StringBuilder* sb, size_t capacity) {
    sb->buffer = malloc(capacity);
    sb->size = 0;
    sb->capacity = capacity;

    if (sb->buffer != NULL) {
        sb->buffer[0] = '\\0';
    }
}

void sb_append(StringBuilder* sb, const char* str) {
    size_t str_len = strlen(str);

    if (sb->size + str_len + 1 > sb->capacity) {
        // Resize buffer
        size_t new_capacity = sb->capacity * 2;
        char* new_buffer = realloc(sb->buffer, new_capacity);

        if (new_buffer == NULL) return;

        sb->buffer = new_buffer;
        sb->capacity = new_capacity;
    }

    strcpy(sb->buffer + sb->size, str);
    sb->size += str_len;
}

void sb_destroy(StringBuilder* sb) {
    free(sb->buffer);
    sb->buffer = NULL;
    sb->size = 0;
    sb->capacity = 0;
}

int main() {
    StringBuilder sb;
    sb_init(&sb, 10);

    sb_append(&sb, "Hello");
    sb_append(&sb, ", ");
    sb_append(&sb, "World");
    sb_append(&sb, "!");

    printf("Built string: '%s'\\n", sb.buffer);
    printf("Size: %zu, Capacity: %zu\\n", sb.size, sb.capacity);

    sb_destroy(&sb);

    return 0;
}
\`\`\`

### Virtual Method Tables

\`\`\`c
#include <stdio.h>

typedef struct Shape Shape;

typedef struct {
    double (*area)(const Shape* shape);
    void (*draw)(const Shape* shape);
    void (*destroy)(Shape* shape);
} ShapeVTable;

struct Shape {
    const ShapeVTable* vtable;
    // Common data
};

typedef struct {
    Shape base;
    double radius;
} Circle;

typedef struct {
    Shape base;
    double width;
    double height;
} Rectangle;

// Circle methods
double circle_area(const Shape* shape) {
    const Circle* circle = (const Circle*)shape;
    return 3.14159 * circle->radius * circle->radius;
}

void circle_draw(const Shape* shape) {
    const Circle* circle = (const Circle*)shape;
    printf("Drawing circle with radius %.2f\\n", circle->radius);
}

void circle_destroy(Shape* shape) {
    free(shape);
}

// Rectangle methods
double rect_area(const Shape* shape) {
    const Rectangle* rect = (const Rectangle*)shape;
    return rect->width * rect->height;
}

void rect_draw(const Shape* shape) {
    const Rectangle* rect = (const Rectangle*)shape;
    printf("Drawing rectangle %.2f x %.2f\\n", rect->width, rect->height);
}

void rect_destroy(Shape* shape) {
    free(shape);
}

// Virtual tables
const ShapeVTable circle_vtable = {
    .area = circle_area,
    .draw = circle_draw,
    .destroy = circle_destroy
};

const ShapeVTable rect_vtable = {
    .area = rect_area,
    .draw = rect_draw,
    .destroy = rect_destroy
};

// Constructor functions
Shape* create_circle(double radius) {
    Circle* circle = malloc(sizeof(Circle));
    if (circle != NULL) {
        circle->base.vtable = &circle_vtable;
        circle->radius = radius;
    }
    return (Shape*)circle;
}

Shape* create_rectangle(double width, double height) {
    Rectangle* rect = malloc(sizeof(Rectangle));
    if (rect != NULL) {
        rect->base.vtable = &rect_vtable;
        rect->width = width;
        rect->height = height;
    }
    return (Shape*)rect;
}

int main() {
    Shape* shapes[2];

    shapes[0] = create_circle(5.0);
    shapes[1] = create_rectangle(10.0, 20.0);

    for (int i = 0; i < 2; i++) {
        Shape* shape = shapes[i];

        shape->vtable->draw(shape);
        printf("Area: %.2f\\n", shape->vtable->area(shape));
        printf("\\n");
    }

    // Clean up
    for (int i = 0; i < 2; i++) {
        shapes[i]->vtable->destroy(shapes[i]);
    }

    return 0;
}
\`\`\`

---

## 🛡️ Best Practices for Structures and Functions

### Choose the Right Parameter Passing Method

\`\`\`c
struct LargeData {
    int data[1000];  // Large structure
};

void process_small(struct SmallData sd) {}  // OK - pass by value
void process_large(const struct LargeData* ld) {}  // Better - pass by reference

struct SmallData get_small() {}  // OK - return by value
struct LargeData* get_large() {}  // Better - return by reference
\`\`\`

### Use const Correctly

\`\`\`c
// Function promises not to modify the structure
void print_student(const struct Student* s) {
    printf("Name: %s\\n", s->name);
    // s->name = "New";  // ❌ Compiler error
}

// Function can modify the structure
void update_student(struct Student* s, const char* new_name) {
    strcpy(s->name, new_name);  // ✅ OK to modify
    // new_name[0] = 'X';  // ❌ Compiler error (const parameter)
}
\`\`\`

### Handle NULL Pointers

\`\`\`c
struct Student* find_student(const char* name) {
    // Search logic...
    return NULL;  // Not found
}

void print_student_safe(const struct Student* s) {
    if (s == NULL) {
        printf("Student not found\\n");
        return;
    }

    printf("Name: %s\\n", s->name);
}

int main() {
    struct Student* s = find_student("John");

    print_student_safe(s);  // Safe even if s is NULL

    return 0;
}
\`\`\`

---

## 🎯 Function Pointer Best Practices

### Type Safety with typedef

\`\`\`c
// ✅ Good: Use typedef for function pointer types
typedef void (*PrintCallback)(const char* message);

struct Logger {
    PrintCallback print_func;
};

// ❌ Bad: Raw function pointer syntax
struct LoggerBad {
    void (*print_func)(const char* message);
};
\`\`\`

### Function Pointer Initialization

\`\`\`c
#include <stdio.h>

void print_to_stdout(const char* msg) { printf("%s\\n", msg); }
void print_to_stderr(const char* msg) { fprintf(stderr, "%s\\n", msg); }

typedef void (*PrintFunc)(const char*);

struct Printer {
    PrintFunc func;
    const char* prefix;
};

int main() {
    struct Printer stdout_printer = {
        .func = print_to_stdout,
        .prefix = "INFO"
    };

    struct Printer stderr_printer = {
        .func = print_to_stderr,
        .prefix = "ERROR"
    };

    // Use function pointers
    stdout_printer.func("This is info");
    stderr_printer.func("This is error");

    return 0;
}
\`\`\`

---

## 🧪 Complete Examples

### Student Management System

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_STUDENTS 100

typedef struct {
    char name[50];
    int id;
    float gpa;
} Student;

typedef struct {
    Student students[MAX_STUDENTS];
    int count;
    // Function pointers for operations
    void (*add_student)(void* self, Student s);
    Student* (*find_student)(void* self, int id);
    void (*print_all)(void* self);
} StudentDatabase;

// Forward declarations
void db_add_student(void* self, Student s);
Student* db_find_student(void* self, int id);
void db_print_all(void* self);

StudentDatabase* create_database() {
    StudentDatabase* db = malloc(sizeof(StudentDatabase));

    if (db != NULL) {
        db->count = 0;
        db->add_student = db_add_student;
        db->find_student = db_find_student;
        db->print_all = db_print_all;
    }

    return db;
}

void db_add_student(void* self, Student s) {
    StudentDatabase* db = (StudentDatabase*)self;

    if (db->count < MAX_STUDENTS) {
        db->students[db->count] = s;
        db->count++;
    }
}

Student* db_find_student(void* self, int id) {
    StudentDatabase* db = (StudentDatabase*)self;

    for (int i = 0; i < db->count; i++) {
        if (db->students[i].id == id) {
            return &db->students[i];
        }
    }

    return NULL;
}

void db_print_all(void* self) {
    StudentDatabase* db = (StudentDatabase*)self;

    printf("Student Database (%d students):\\n", db->count);
    for (int i = 0; i < db->count; i++) {
        Student* s = &db->students[i];
        printf("  %s (ID: %d, GPA: %.1f)\\n", s->name, s->id, s->gpa);
    }
}

void destroy_database(StudentDatabase* db) {
    free(db);
}

int main() {
    StudentDatabase* db = create_database();

    if (db != NULL) {
        // Add students
        db->add_student(db, (Student){"Alice", 1001, 3.8});
        db->add_student(db, (Student){"Bob", 1002, 3.5});
        db->add_student(db, (Student){"Charlie", 1003, 4.0});

        // Print all
        db->print_all(db);

        // Find student
        Student* s = db->find_student(db, 1002);
        if (s != NULL) {
            printf("\\nFound student: %s\\n", s->name);
        }

        destroy_database(db);
    }

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Pass by value** creates copies (safe but slow for large structures)
2. **Pass by reference** is efficient but allows modification
3. **Return by value** is simple but may be slow for large structures
4. **Function pointers** in structures enable polymorphism and callbacks
5. **Virtual method tables** provide object-oriented behavior in C
6. **const parameters** protect data from unintended modification
7. **NULL checks** prevent crashes from invalid pointers

---

## 🚀 Preview: Unions

In the next topic, you'll learn about:
- **Union declaration** and syntax
- **Memory sharing** in unions
- **When to use unions** vs structures
- **Type punning** and union tricks
- **Anonymous unions** and advanced patterns

**Unions enable memory-efficient data storage with multiple interpretations!** 🔄

