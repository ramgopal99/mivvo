import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_4: SubLesson = {
  id: "7.4",
  title: 'Structures and Pointers',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🔗 Structures and Pointers in C

Combining structures with pointers unlocks the full power of C programming. Structure pointers enable efficient parameter passing, dynamic data structures, and memory-efficient operations.

---

## 📍 Pointers to Structures

### **Declaring Structure Pointers**

\`\`\`c
#include <stdio.h>

struct Point {
    int x, y;
};

int main(void) {
    struct Point point = {10, 20};
    struct Point *ptr = &point;  // Pointer to structure

    // Access members using arrow operator
    printf("Coordinates: (%d, %d)\\n", ptr->x, ptr->y);

    // Modify through pointer
    ptr->x = 50;
    ptr->y = 75;

    printf("After modification: (%d, %d)\\n", point.x, point.y);

    return 0;
}
\`\`\`

---

## ➡️ Arrow vs Dot Operator

### **When to Use Each Operator**

\`\`\`c
struct Point point;
struct Point *ptr = &point;

// ✅ Correct usage:
point.x = 10;     // Dot: structure variable
ptr->y = 20;      // Arrow: structure pointer

// ❌ Wrong usage:
// ptr.x = 10;     // ERROR: ptr is pointer
// point->y = 20;  // ERROR: point is not pointer

// ✅ Equivalent expressions:
ptr->x ≡ (*ptr).x  // Arrow is shorthand for dereference + dot
\`\`\`

---

## 🎯 Passing Structures to Functions

### **Method 1: Pass by Value (Copy)**

\`\`\`c
#include <stdio.h>

struct Point {
    int x, y;
};

void print_point(struct Point p) {
    printf("Point: (%d, %d)\\n", p.x, p.y);
}

void move_point(struct Point p, int dx, int dy) {
    p.x += dx;  // Only modifies local copy
    p.y += dy;
    printf("Inside function: (%d, %d)\\n", p.x, p.y);
}

int main(void) {
    struct Point point = {10, 20};

    print_point(point);
    move_point(point, 5, 10);

    printf("Original point unchanged: (%d, %d)\\n", point.x, point.y);

    return 0;
}
\`\`\`

**Advantages of pass by value:**
- Function can't modify original data
- Simple to use
- Thread-safe

**Disadvantages:**
- Copies entire structure (expensive for large structures)
- Wastes memory and time

---

### **Method 2: Pass by Reference (Pointer)**

\`\`\`c
#include <stdio.h>

struct Point {
    int x, y;
};

void print_point(const struct Point *p) {
    printf("Point: (%d, %d)\\n", p->x, p->y);
}

void move_point(struct Point *p, int dx, int dy) {
    p->x += dx;  // Modifies original structure
    p->y += dy;
}

int main(void) {
    struct Point point = {10, 20};

    print_point(&point);
    move_point(&point, 5, 10);

    printf("Original point modified: (%d, %d)\\n", point.x, point.y);

    return 0;
}
\`\`\`

**Advantages of pass by reference:**
- No copying overhead
- Function can modify original data
- Efficient for large structures

**Disadvantages:**
- Function can accidentally modify data
- Need to check for NULL pointers

---

### **Method 3: Const Pointers for Read-Only**

\`\`\`c
void print_point(const struct Point *p) {
    if (p == NULL) return;

    // Can read members
    printf("Point: (%d, %d)\\n", p->x, p->y);

    // Cannot modify (compiler error)
    // p->x = 10;  // ERROR!
}
\`\`\`

---

## 💾 Dynamic Structure Allocation

### **Allocating Structures on Heap**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

struct Person {
    char name[50];
    int age;
    float salary;
};

struct Person* create_person(const char *name, int age, float salary) {
    // Allocate memory for structure
    struct Person *person = (struct Person*)malloc(sizeof(struct Person));

    if (person == NULL) {
        printf("Memory allocation failed\\n");
        return NULL;
    }

    // Initialize members
    strcpy(person->name, name);
    person->age = age;
    person->salary = salary;

    return person;
}

void print_person(const struct Person *person) {
    if (person == NULL) return;

    printf("Name: %s\\n", person->name);
    printf("Age: %d\\n", person->age);
    printf("Salary: $%.2f\\n", person->salary);
}

int main(void) {
    // Create person on heap
    struct Person *employee = create_person("John Doe", 30, 50000.0f);

    if (employee != NULL) {
        print_person(employee);

        // Modify through pointer
        employee->salary *= 1.1f;  // 10% raise
        printf("\\nAfter raise:\\n");
        print_person(employee);

        // Free memory
        free(employee);
        employee = NULL;  // Prevent dangling pointer
    }

    return 0;
}
\`\`\`

---

## 📊 Arrays of Structure Pointers

### **Managing Collections of Structures**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Student {
    char name[50];
    int id;
    float gpa;
};

struct Student* create_student(const char *name, int id, float gpa) {
    struct Student *student = (struct Student*)malloc(sizeof(struct Student));
    if (student == NULL) return NULL;

    strcpy(student->name, name);
    student->id = id;
    student->gpa = gpa;

    return student;
}

void print_student(const struct Student *student) {
    printf("Name: %s, ID: %d, GPA: %.2f\\n",
           student->name, student->id, student->gpa);
}

int main(void) {
    const int MAX_STUDENTS = 3;
    struct Student *students[MAX_STUDENTS];

    // Create students
    students[0] = create_student("Alice", 1001, 3.8);
    students[1] = create_student("Bob", 1002, 3.5);
    students[2] = create_student("Charlie", 1003, 4.0);

    // Print all students
    printf("Student List:\\n");
    for (int i = 0; i < MAX_STUDENTS; i++) {
        if (students[i] != NULL) {
            print_student(students[i]);
        }
    }

    // Find student with highest GPA
    struct Student *top_student = NULL;
    for (int i = 0; i < MAX_STUDENTS; i++) {
        if (students[i] != NULL) {
            if (top_student == NULL ||
                students[i]->gpa > top_student->gpa) {
                top_student = students[i];
            }
        }
    }

    if (top_student != NULL) {
        printf("\\nTop student: ");
        print_student(top_student);
    }

    // Free all students
    for (int i = 0; i < MAX_STUDENTS; i++) {
        free(students[i]);
        students[i] = NULL;
    }

    return 0;
}
\`\`\`

---

## 🔗 Structure Pointers in Linked Lists

### **Implementing Linked Lists**

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

void append_node(struct Node **head, int data) {
    struct Node *new_node = create_node(data);
    if (new_node == NULL) return;

    if (*head == NULL) {
        *head = new_node;
        return;
    }

    // Find last node
    struct Node *current = *head;
    while (current->next != NULL) {
        current = current->next;
    }

    current->next = new_node;
}

void print_list(const struct Node *head) {
    const struct Node *current = head;
    while (current != NULL) {
        printf("%d -> ", current->data);
        current = current->next;
    }
    printf("NULL\\n");
}

void free_list(struct Node **head) {
    struct Node *current = *head;
    while (current != NULL) {
        struct Node *temp = current;
        current = current->next;
        free(temp);
    }
    *head = NULL;
}

int main(void) {
    struct Node *head = NULL;

    // Build list: 10 -> 20 -> 30 -> 40
    append_node(&head, 10);
    append_node(&head, 20);
    append_node(&head, 30);
    append_node(&head, 40);

    printf("Linked list: ");
    print_list(head);

    // Insert at beginning
    struct Node *new_head = create_node(5);
    if (new_head != NULL) {
        new_head->next = head;
        head = new_head;
    }

    printf("After inserting 5 at beginning: ");
    print_list(head);

    free_list(&head);
    return 0;
}
\`\`\`

---

## 🎯 Advanced Structure Pointer Techniques

### **Function Pointers in Structures**

\`\`\`c
#include <stdio.h>

struct Calculator {
    int (*add)(int, int);
    int (*subtract)(int, int);
    int (*multiply)(int, int);
    float (*divide)(float, float);
};

// Calculator functions
int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
int multiply(int a, int b) { return a * b; }
float divide(float a, float b) { return b != 0 ? a / b : 0; }

struct Calculator* create_calculator(void) {
    struct Calculator *calc = (struct Calculator*)malloc(sizeof(struct Calculator));
    if (calc == NULL) return NULL;

    calc->add = add;
    calc->subtract = subtract;
    calc->multiply = multiply;
    calc->divide = divide;

    return calc;
}

int main(void) {
    struct Calculator *calc = create_calculator();
    if (calc == NULL) return 1;

    int a = 20, b = 4;

    printf("%d + %d = %d\\n", a, b, calc->add(a, b));
    printf("%d - %d = %d\\n", a, b, calc->subtract(a, b));
    printf("%d * %d = %d\\n", a, b, calc->multiply(a, b));
    printf("%.1f / %.1f = %.2f\\n", (float)a, (float)b, calc->divide(a, b));

    free(calc);
    return 0;
}
\`\`\`

---

### **Structure Pointers as Function Parameters**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

// Generic comparison function type
typedef int (*CompareFunc)(const void*, const void*);

// Generic sort function for any structure array
void sort_structures(void *array, size_t count, size_t elem_size, CompareFunc compare) {
    char *arr = (char*)array;

    for (size_t i = 0; i < count - 1; i++) {
        for (size_t j = 0; j < count - i - 1; j++) {
            char *elem1 = arr + j * elem_size;
            char *elem2 = arr + (j + 1) * elem_size;

            if (compare(elem1, elem2) > 0) {
                // Swap elements
                for (size_t k = 0; k < elem_size; k++) {
                    char temp = elem1[k];
                    elem1[k] = elem2[k];
                    elem2[k] = temp;
                }
            }
        }
    }
}

// Example structure
struct Item {
    char name[20];
    int value;
};

// Comparison function for Item structures
int compare_items(const void *a, const void *b) {
    const struct Item *item1 = (const struct Item*)a;
    const struct Item *item2 = (const struct Item*)b;
    return item1->value - item2->value;
}

void print_items(const struct Item *items, size_t count) {
    for (size_t i = 0; i < count; i++) {
        printf("%s: %d\\n", items[i].name, items[i].value);
    }
}

int main(void) {
    struct Item items[] = {
        {"Sword", 150},
        {"Shield", 100},
        {"Potion", 25},
        {"Armor", 200}
    };

    size_t count = sizeof(items) / sizeof(items[0]);

    printf("Before sorting:\\n");
    print_items(items, count);

    // Sort by value using generic function
    sort_structures(items, count, sizeof(struct Item), compare_items);

    printf("\\nAfter sorting by value:\\n");
    print_items(items, count);

    return 0;
}
\`\`\`

---

## 🎯 Practical Examples

### **Example 1: Dynamic Employee Database**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Employee {
    char name[50];
    int id;
    float salary;
    struct Employee *next;  // For linked list
};

struct Employee* create_employee(const char *name, int id, float salary) {
    struct Employee *emp = (struct Employee*)malloc(sizeof(struct Employee));
    if (emp == NULL) return NULL;

    strcpy(emp->name, name);
    emp->id = id;
    emp->salary = salary;
    emp->next = NULL;

    return emp;
}

void add_employee(struct Employee **head, struct Employee *new_emp) {
    if (*head == NULL) {
        *head = new_emp;
        return;
    }

    struct Employee *current = *head;
    while (current->next != NULL) {
        current = current->next;
    }
    current->next = new_emp;
}

void print_employees(const struct Employee *head) {
    const struct Employee *current = head;
    while (current != NULL) {
        printf("Name: %s, ID: %d, Salary: $%.2f\\n",
               current->name, current->id, current->salary);
        current = current->next;
    }
}

float calculate_total_salary(const struct Employee *head) {
    float total = 0;
    const struct Employee *current = head;
    while (current != NULL) {
        total += current->salary;
        current = current->next;
    }
    return total;
}

void free_employees(struct Employee **head) {
    struct Employee *current = *head;
    while (current != NULL) {
        struct Employee *temp = current;
        current = current->next;
        free(temp);
    }
    *head = NULL;
}

int main(void) {
    struct Employee *head = NULL;

    // Add employees
    add_employee(&head, create_employee("Alice", 1001, 50000));
    add_employee(&head, create_employee("Bob", 1002, 55000));
    add_employee(&head, create_employee("Charlie", 1003, 48000));

    printf("Employee Database:\\n");
    print_employees(head);

    printf("\\nTotal salary budget: $%.2f\\n", calculate_total_salary(head));

    free_employees(&head);
    return 0;
}
\`\`\`

### **Example 2: Binary Tree with Structure Pointers**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

struct TreeNode {
    int data;
    struct TreeNode *left;
    struct TreeNode *right;
};

struct TreeNode* create_node(int data) {
    struct TreeNode *node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    if (node == NULL) return NULL;

    node->data = data;
    node->left = NULL;
    node->right = NULL;
    return node;
}

void insert_node(struct TreeNode **root, int data) {
    if (*root == NULL) {
        *root = create_node(data);
        return;
    }

    if (data < (*root)->data) {
        insert_node(&(*root)->left, data);
    } else {
        insert_node(&(*root)->right, data);
    }
}

void inorder_traversal(const struct TreeNode *root) {
    if (root != NULL) {
        inorder_traversal(root->left);
        printf("%d ", root->data);
        inorder_traversal(root->right);
    }
}

void free_tree(struct TreeNode **root) {
    if (*root != NULL) {
        free_tree(&(*root)->left);
        free_tree(&(*root)->right);
        free(*root);
        *root = NULL;
    }
}

int main(void) {
    struct TreeNode *root = NULL;

    // Insert values
    int values[] = {50, 30, 70, 20, 40, 60, 80};
    for (int i = 0; i < 7; i++) {
        insert_node(&root, values[i]);
    }

    printf("Inorder traversal: ");
    inorder_traversal(root);
    printf("\\n");

    free_tree(&root);
    return 0;
}
\`\`\`

---

## ⚠️ Common Pointer Structure Mistakes

### **Mistake 1: NULL Pointer Dereference**

\`\`\`c
struct Point *ptr = NULL;
// ptr->x = 10;  // CRASH!

// Always check before use
if (ptr != NULL) {
    ptr->x = 10;
}
\`\`\`

### **Mistake 2: Memory Leaks**

\`\`\`c
struct Node *node = create_node(42);
// Use node...
// Forgot to free: free(node);
// Memory leak!
\`\`\`

### **Mistake 3: Dangling Pointers**

\`\`\`c
struct Point *ptr = (struct Point*)malloc(sizeof(struct Point));
free(ptr);
// ptr is now dangling!
// *ptr = something;  // Undefined behavior

ptr = NULL;  // Safe
\`\`\`

---

## 🎓 Key Takeaways

1. **Structure pointers** use arrow operator (->) for member access
2. **Pass by reference** is efficient for large structures
3. **Dynamic allocation** enables flexible data structures
4. **Linked structures** form the basis of complex data structures
5. **Function pointers in structures** enable polymorphism
6. **Always check for NULL** before dereferencing
7. **Free allocated memory** to prevent leaks
8. **Set pointers to NULL** after freeing

Structure pointers enable efficient, flexible C programming! 🔗✨`;
    return contentString;
  })()
};
