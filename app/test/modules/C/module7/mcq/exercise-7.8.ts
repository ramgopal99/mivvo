import { Exercise } from '../../../../data/lessonsData';

export const exercise_7_8: Exercise = {
  id: "7.8",
  title: 'Structures & Unions Coding Exercises',
  status: 'demo',
  type: 'code',
  codeQuestions: [
    {
      id: "code1",
      question: "Define a structure for a student with name, roll number, and marks. Write a function to display student information.\n\nExample:\nName: Alice\nRoll: 101\nMarks: 85.5",
      solution: `#include <stdio.h>

typedef struct {
    char name[50];
    int roll_number;
    float marks;
} Student;

void display_student(const Student *student) {
    printf("Name: %s\\n", student->name);
    printf("Roll: %d\\n", student->roll_number);
    printf("Marks: %.1f\\n", student->marks);
}

int main() {
    Student student = {"Alice", 101, 85.5f};

    display_student(&student);

    return 0;
}`
    },
    {
      id: "code2",
      question: "Create a union that can store either an integer, float, or string. Write a program that demonstrates storing different types.\n\nExample Output:\nInteger: 42\nFloat: 3.14\nString: Hello",
      solution: `#include <stdio.h>
#include <string.h>

typedef union {
    int int_val;
    float float_val;
    char string_val[20];
} Value;

int main() {
    Value data;

    // Store integer
    data.int_val = 42;
    printf("Integer: %d\\n", data.int_val);

    // Store float (overwrites integer)
    data.float_val = 3.14f;
    printf("Float: %.2f\\n", data.float_val);

    // Store string (overwrites float)
    strcpy(data.string_val, "Hello");
    printf("String: %s\\n", data.string_val);

    return 0;
}`
    },
    {
      id: "code3",
      question: "Write a function that takes two points (structures with x,y coordinates) and calculates the distance between them.\n\nFormula: distance = sqrt((x2-x1)² + (y2-y1)²)\n\nExample:\nPoint 1: (0, 0)\nPoint 2: (3, 4)\nDistance: 5.0",
      solution: `#include <stdio.h>
#include <math.h>

typedef struct {
    double x, y;
} Point;

double calculate_distance(const Point *p1, const Point *p2) {
    double dx = p2->x - p1->x;
    double dy = p2->y - p1->y;
    return sqrt(dx * dx + dy * dy);
}

int main() {
    Point p1 = {0.0, 0.0};
    Point p2 = {3.0, 4.0};

    double distance = calculate_distance(&p1, &p2);

    printf("Point 1: (%.1f, %.1f)\\n", p1.x, p1.y);
    printf("Point 2: (%.1f, %.1f)\\n", p2.x, p2.y);
    printf("Distance: %.1f\\n", distance);

    return 0;
}`
    },
    {
      id: "code4",
      question: "Create a linked list node structure and implement functions to add nodes and display the list.\n\nExample:\nList: 10 -> 20 -> 30 -> NULL",
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node* create_node(int data) {
    Node *node = (Node*)malloc(sizeof(Node));
    if (node == NULL) return NULL;

    node->data = data;
    node->next = NULL;
    return node;
}

void add_node(Node **head, int data) {
    Node *new_node = create_node(data);
    if (new_node == NULL) return;

    if (*head == NULL) {
        *head = new_node;
        return;
    }

    Node *current = *head;
    while (current->next != NULL) {
        current = current->next;
    }
    current->next = new_node;
}

void display_list(const Node *head) {
    const Node *current = head;
    while (current != NULL) {
        printf("%d", current->data);
        if (current->next != NULL) {
            printf(" -> ");
        }
        current = current->next;
    }
    printf(" -> NULL\\n");
}

void free_list(Node **head) {
    Node *current = *head;
    while (current != NULL) {
        Node *temp = current;
        current = current->next;
        free(temp);
    }
    *head = NULL;
}

int main() {
    Node *head = NULL;

    add_node(&head, 10);
    add_node(&head, 20);
    add_node(&head, 30);

    printf("List: ");
    display_list(head);

    free_list(&head);

    return 0;
}`
    },
    {
      id: "code5",
      question: "Define a structure for an employee with nested structures for address and date of birth. Initialize and display the information.\n\nExample:\nName: John Doe\nAddress: 123 Main St, Anytown\nDOB: 15/06/1990",
      solution: `#include <stdio.h>

typedef struct {
    int day, month, year;
} Date;

typedef struct {
    char street[50];
    char city[30];
    int zip_code;
} Address;

typedef struct {
    char name[50];
    Address address;
    Date date_of_birth;
    float salary;
} Employee;

void display_employee(const Employee *emp) {
    printf("Name: %s\\n", emp->name);
    printf("Address: %s, %s %d\\n",
           emp->address.street,
           emp->address.city,
           emp->address.zip_code);
    printf("DOB: %02d/%02d/%04d\\n",
           emp->date_of_birth.day,
           emp->date_of_birth.month,
           emp->date_of_birth.year);
    printf("Salary: $%.2f\\n", emp->salary);
}

int main() {
    Employee emp = {
        "John Doe",
        {"123 Main St", "Anytown", 12345},
        {15, 6, 1990},
        50000.0f
    };

    display_employee(&emp);

    return 0;
}`
    }
  ]
};
