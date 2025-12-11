import { SubLesson } from '../../../data/lessonsData';

export const topic_7_4: SubLesson = {
  id: 7.4,
  title: 'Structure Initialization',
  status: 'completed',
  content: `# 🎯 Structure Initialization

Master various techniques to initialize structures properly, from simple to complex initialization patterns.

---

## 🎯 Basic Structure Initialization

### Initialization with Values

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
    // Complete initialization
    struct Student s1 = {"John Doe", 20, 3.7, 12345};

    // Partial initialization (remaining members set to 0/NULL)
    struct Student s2 = {"Jane Smith", 19};  // gpa = 0.0, id = 0

    printf("Student 1: %s, age %d, GPA %.1f, ID %d\\n",
           s1.name, s1.age, s1.gpa, s1.id);

    printf("Student 2: %s, age %d, GPA %.1f, ID %d\\n",
           s2.name, s2.age, s2.gpa, s2.id);

    return 0;
}
\`\`\`

### Default Initialization Rules

\`\`\`c
struct Example {
    int a;        // 0
    float b;      // 0.0
    char c;       // '\\0'
    char str[10]; // All '\\0'
    int* ptr;     // NULL
};

int main() {
    // Uninitialized members get default values
    struct Example ex = {42};  // Only first member initialized

    printf("a = %d\\n", ex.a);      // 42
    printf("b = %.1f\\n", ex.b);    // 0.0
    printf("c = '%c'\\n", ex.c);    // '\\0'
    printf("str = '%s'\\n", ex.str); // ""
    printf("ptr = %p\\n", ex.ptr);   // NULL

    return 0;
}
\`\`\`

---

## 🔍 Designated Initializers (C99)

### Named Member Initialization

\`\`\`c
#include <stdio.h>

struct Point {
    int x, y, z;
};

struct Person {
    char name[50];
    int age;
    float height;
    char gender;
};

int main() {
    // Designated initializers - specify which members to initialize
    struct Point p1 = {.x = 10, .y = 20, .z = 30};
    struct Point p2 = {.x = 5, .z = 15};  // y gets 0

    // Out of order initialization
    struct Person person = {
        .age = 25,
        .name = "Alice Johnson",
        .height = 5.8,
        .gender = 'F'
    };

    printf("Point 1: (%d, %d, %d)\\n", p1.x, p1.y, p1.z);
    printf("Point 2: (%d, %d, %d)\\n", p2.x, p2.y, p2.z);
    printf("Person: %s, age %d, height %.1f, gender %c\\n",
           person.name, person.age, person.height, person.gender);

    return 0;
}
\`\`\`

### Mixing Designated and Positional

\`\`\`c
struct Student {
    char name[50];
    int age;
    float gpa;
    int id;
};

int main() {
    // Mix positional and designated (positional first)
    struct Student s1 = {
        "John",      // positional
        .gpa = 3.8,  // designated
        .id = 1001   // designated
    };

    // All positional up to a point, then designated
    struct Student s2 = {
        "Jane",
        19,
        .id = 1002   // gpa gets default value
    };

    printf("Student 1: %s, age %d, GPA %.1f, ID %d\\n",
           s1.name, s1.age, s1.gpa, s1.id);

    printf("Student 2: %s, age %d, GPA %.1f, ID %d\\n",
           s2.name, s2.age, s2.gpa, s2.id);

    return 0;
}
\`\`\`

---

## 🏗️ Nested Structure Initialization

### Nested Designated Initializers

\`\`\`c
#include <stdio.h>

struct Address {
    char street[50];
    char city[30];
    char state[3];
    int zip;
};

struct Person {
    char name[50];
    int age;
    struct Address address;
};

int main() {
    // Nested initialization
    struct Person person1 = {
        .name = "John Doe",
        .age = 30,
        .address = {
            .street = "123 Main St",
            .city = "Anytown",
            .state = "CA",
            .zip = 12345
        }
    };

    // Partial nested initialization
    struct Person person2 = {
        "Jane Smith",
        25,
        {"456 Oak Ave", "Somewhere", "NY"}  // zip gets 0
    };

    printf("Person 1:\\n");
    printf("  Name: %s\\n", person1.name);
    printf("  Address: %s, %s, %s %d\\n",
           person1.address.street, person1.address.city,
           person1.address.state, person1.address.zip);

    return 0;
}
\`\`\`

### Array of Structures Initialization

\`\`\`c
#include <stdio.h>

struct Point {
    int x, y;
};

int main() {
    // Array of structures with initialization
    struct Point points[3] = {
        {1, 2},      // positional
        {.x = 3, .y = 4},  // designated
        {5}          // partial (y = 0)
    };

    for (int i = 0; i < 3; i++) {
        printf("Point %d: (%d, %d)\\n", i + 1, points[i].x, points[i].y);
    }

    return 0;
}
\`\`\`

---

## 🔄 Runtime Initialization

### Member-by-Member Initialization

\`\`\`c
#include <stdio.h>
#include <string.h>

struct Employee {
    char name[50];
    int id;
    float salary;
    char department[30];
};

void initialize_employee(struct Employee* emp,
                        const char* name,
                        int id,
                        float salary,
                        const char* dept) {
    strcpy(emp->name, name);
    emp->id = id;
    emp->salary = salary;
    strcpy(emp->department, dept);
}

int main() {
    struct Employee emp;

    // Runtime initialization
    initialize_employee(&emp, "Alice Johnson", 1001, 75000.0, "Engineering");

    printf("Employee: %s\\n", emp.name);
    printf("ID: %d\\n", emp.id);
    printf("Salary: $%.2f\\n", emp.salary);
    printf("Department: %s\\n", emp.department);

    return 0;
}
\`\`\`

### Dynamic Structure Initialization

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Student {
    char* name;  // Dynamic string
    int age;
    float* grades;  // Dynamic array
    int num_grades;
};

struct Student* create_student(const char* name, int age) {
    struct Student* student = malloc(sizeof(struct Student));

    if (student != NULL) {
        // Allocate and copy name
        student->name = malloc(strlen(name) + 1);
        if (student->name != NULL) {
            strcpy(student->name, name);
        }

        student->age = age;
        student->grades = NULL;
        student->num_grades = 0;
    }

    return student;
}

void add_grade(struct Student* student, float grade) {
    // Resize grades array
    float* new_grades = realloc(student->grades,
                               (student->num_grades + 1) * sizeof(float));

    if (new_grades != NULL) {
        student->grades = new_grades;
        student->grades[student->num_grades] = grade;
        student->num_grades++;
    }
}

void destroy_student(struct Student* student) {
    if (student != NULL) {
        free(student->name);
        free(student->grades);
        free(student);
    }
}

int main() {
    struct Student* student = create_student("Bob Smith", 20);

    if (student != NULL) {
        add_grade(student, 85.5);
        add_grade(student, 92.0);
        add_grade(student, 88.7);

        printf("Student: %s, Age: %d\\n", student->name, student->age);
        printf("Grades: ");
        for (int i = 0; i < student->num_grades; i++) {
            printf("%.1f ", student->grades[i]);
        }
        printf("\\n");

        destroy_student(student);
    }

    return 0;
}
\`\`\`

---

## 🧪 Advanced Initialization Patterns

### Conditional Initialization

\`\`\`c
#include <stdio.h>
#include <string.h>

struct Config {
    char filename[100];
    int debug_mode;
    int max_connections;
    char log_level[10];
};

struct Config load_config(int production) {
    struct Config config;

    if (production) {
        // Production configuration
        strcpy(config.filename, "/etc/app/config.ini");
        config.debug_mode = 0;
        config.max_connections = 1000;
        strcpy(config.log_level, "ERROR");
    } else {
        // Development configuration
        strcpy(config.filename, "config.ini");
        config.debug_mode = 1;
        config.max_connections = 10;
        strcpy(config.log_level, "DEBUG");
    }

    return config;
}

int main() {
    struct Config dev_config = load_config(0);
    struct Config prod_config = load_config(1);

    printf("Development config:\\n");
    printf("  Debug: %s\\n", dev_config.debug_mode ? "ON" : "OFF");
    printf("  Max connections: %d\\n", dev_config.max_connections);

    printf("Production config:\\n");
    printf("  Debug: %s\\n", prod_config.debug_mode ? "ON" : "OFF");
    printf("  Max connections: %d\\n", prod_config.max_connections);

    return 0;
}
\`\`\`

### Structure Copy Initialization

\`\`\`c
#include <stdio.h>
#include <string.h>

struct Vector3D {
    float x, y, z;
};

struct Particle {
    char name[20];
    struct Vector3D position;
    struct Vector3D velocity;
    float mass;
};

int main() {
    struct Particle prototype = {
        .name = "Electron",
        .position = {0.0, 0.0, 0.0},
        .velocity = {1.0, 2.0, 3.0},
        .mass = 9.11e-31
    };

    // Create new particle by copying prototype
    struct Particle particle1 = prototype;
    struct Particle particle2 = prototype;

    // Modify copies
    strcpy(particle1.name, "Proton");
    particle1.mass = 1.67e-27;
    particle1.position.x = 10.0;

    strcpy(particle2.name, "Neutron");
    particle2.mass = 1.68e-27;
    particle2.position.y = 20.0;

    printf("Prototype: %s, mass=%.2e\\n", prototype.name, prototype.mass);
    printf("Particle 1: %s, mass=%.2e, pos=(%.1f,%.1f,%.1f)\\n",
           particle1.name, particle1.mass,
           particle1.position.x, particle1.position.y, particle1.position.z);
    printf("Particle 2: %s, mass=%.2e, pos=(%.1f,%.1f,%.1f)\\n",
           particle2.name, particle2.mass,
           particle2.position.x, particle2.position.y, particle2.position.z);

    return 0;
}
\`\`\`

---

## 🛡️ Initialization Safety

### Avoiding Uninitialized Structures

\`\`\`c
#include <stdio.h>

struct Dangerous {
    int value;
    int* ptr;
};

int main() {
    struct Dangerous bad;  // Uninitialized!

    // This might crash or give wrong results
    // printf("%d\\n", bad.value);    // Garbage value
    // if (bad.ptr != NULL) { ... }   // Unpredictable

    // Safe initialization
    struct Dangerous good = {0};  // All members zeroed

    printf("Good value: %d\\n", good.value);
    printf("Good ptr: %p\\n", good.ptr);

    return 0;
}
\`\`\`

### Zero Initialization

\`\`\`c
struct Complex {
    int array[100];
    char buffer[256];
    void* pointers[10];
};

int main() {
    // Zero all members
    struct Complex c1 = {0};

    // Or explicitly zero
    struct Complex c2;
    memset(&c2, 0, sizeof(c2));

    // Check if zeroed
    printf("First array element: %d\\n", c1.array[0]);
    printf("First buffer char: %d\\n", c1.buffer[0]);
    printf("First pointer: %p\\n", c1.pointers[0]);

    return 0;
}
\`\`\`

---

## 🎯 Initialization Best Practices

### 1. Use Designated Initializers for Clarity

\`\`\`c
// ✅ Clear and maintainable
struct ServerConfig config = {
    .port = 8080,
    .max_clients = 100,
    .timeout_seconds = 30,
    .debug_enabled = false
};

// ❌ Error-prone and hard to maintain
struct ServerConfig config = {8080, 100, 30, 0};
\`\`\`

### 2. Initialize All Members

\`\`\`c
struct Data {
    int important_value;
    int* buffer;
    size_t buffer_size;
};

// ✅ Complete initialization
struct Data d1 = {
    .important_value = 42,
    .buffer = NULL,
    .buffer_size = 0
};

// ❌ Partial initialization (buffer_size uninitialized!)
struct Data d2 = {42, NULL};  // buffer_size undefined
\`\`\`

### 3. Use Consistent Patterns

\`\`\`c
// Define initialization macros for complex structures
#define INIT_POINT(x_val, y_val) {.x = (x_val), .y = (y_val)}
#define INIT_RECT(w, h) {.width = (w), .height = (h)}

struct Point p1 = INIT_POINT(10, 20);
struct Rectangle r1 = INIT_RECT(100, 200);
\`\`\`

---

## 🧪 Complete Examples

### Configuration File Parser

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

typedef struct {
    char database_host[100];
    int database_port;
    char database_name[50];
    char username[50];
    char password[50];
    int max_connections;
    bool enable_ssl;
    int timeout_seconds;
} DatabaseConfig;

DatabaseConfig load_default_config() {
    return (DatabaseConfig){
        .database_host = "localhost",
        .database_port = 5432,
        .database_name = "myapp",
        .username = "",
        .password = "",
        .max_connections = 10,
        .enable_ssl = false,
        .timeout_seconds = 30
    };
}

void print_config(const DatabaseConfig* config) {
    printf("Database Configuration:\\n");
    printf("  Host: %s\\n", config->database_host);
    printf("  Port: %d\\n", config->database_port);
    printf("  Database: %s\\n", config->database_name);
    printf("  Username: %s\\n", config->username);
    printf("  Password: %s\\n", strlen(config->password) > 0 ? "***" : "(not set)");
    printf("  Max Connections: %d\\n", config->max_connections);
    printf("  SSL: %s\\n", config->enable_ssl ? "Enabled" : "Disabled");
    printf("  Timeout: %d seconds\\n", config->timeout_seconds);
}

int main() {
    // Load defaults
    DatabaseConfig config = load_default_config();

    // Override some settings
    strcpy(config.username, "admin");
    strcpy(config.password, "secret123");
    config.max_connections = 50;
    config.enable_ssl = true;

    print_config(&config);

    // Create development config (copy and modify)
    DatabaseConfig dev_config = config;
    strcpy(dev_config.database_name, "myapp_dev");
    dev_config.max_connections = 5;
    dev_config.enable_ssl = false;

    printf("\\nDevelopment Configuration:\\n");
    print_config(&dev_config);

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Basic initialization** uses braces: `struct Type var = {val1, val2, ...};`
2. **Designated initializers** specify members: `.member = value`
3. **Partial initialization** sets remaining members to zero
4. **Nested structures** can be initialized recursively
5. **Runtime initialization** allows dynamic setup
6. **Structure copying** creates complete duplicates
7. **Zero initialization** ensures safe defaults

---

## 🚀 Preview: Structures and Functions

In the next topic, you'll learn about:
- **Passing structures to functions** by value vs reference
- **Returning structures** from functions
- **Structure pointers** as function parameters
- **Function pointers** in structures
- **Callback functions** with structures

**Functions are where structures really shine in organizing code!** 🎛️

