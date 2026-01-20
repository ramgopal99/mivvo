import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_6: SubLesson = {
  id: "7.6",
  title: 'Typedef and Structure Applications',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 📝 Typedef and Structure Applications in C

Typedef allows creating aliases for existing types, making code more readable and maintainable. Combined with structures, typedef enables clean, self-documenting code and advanced programming patterns.

---

## 📋 What is Typedef?

**Typedef creates type aliases - alternative names for existing types.** This improves code readability and allows abstracting complex type declarations.

### **Basic Typedef Syntax**

\`\`\`c
typedef existing_type new_type_name;

// Examples:
typedef int Integer;           // Integer is now an alias for int
typedef char* String;          // String is now an alias for char*
typedef struct Point Point2D;  // Shorter name for structure
\`\`\`

---

## 🔧 Typedef with Structures

### **Simplifying Structure Declarations**

\`\`\`c
#include <stdio.h>

// Without typedef
struct Point {
    int x, y;
};

struct Point p1;  // Must use 'struct'

// With typedef
typedef struct {
    int x, y;
} Point;

Point p2;  // Clean, no 'struct' needed

// Or combine both approaches
typedef struct Point {
    int x, y;
} Point;

struct Point p3;  // Still works
Point p4;         // Also works

int main(void) {
    struct Point p1 = {10, 20};
    Point p2 = {30, 40};

    printf("p1: (%d, %d)\\n", p1.x, p1.y);
    printf("p2: (%d, %d)\\n", p2.x, p2.y);

    return 0;
}
\`\`\`

---

## 🎯 Advanced Typedef Patterns

### **Function Pointer Typedefs**

\`\`\`c
#include <stdio.h>

// Typedef for function pointer
typedef int (*MathOperation)(int, int);

// Functions matching the typedef
int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }
int subtract(int a, int b) { return a - b; }

void perform_operation(MathOperation op, int a, int b) {
    int result = op(a, b);
    printf("Result: %d\\n", result);
}

int main(void) {
    MathOperation ops[3] = {add, multiply, subtract};

    int a = 10, b = 5;

    perform_operation(ops[0], a, b);  // Addition
    perform_operation(ops[1], a, b);  // Multiplication
    perform_operation(ops[2], a, b);  // Subtraction

    return 0;
}
\`\`\`

---

### **Complex Type Aliases**

\`\`\`c
#include <stdio.h>

// Array typedefs
typedef int IntArray[10];
typedef char String[50];

// Function pointer typedefs
typedef void (*Callback)(int);
typedef int (*Comparator)(const void*, const void*);

// Complex structure typedefs
typedef struct {
    char name[50];
    int id;
    float salary;
} Employee;

typedef struct Node {
    int data;
    struct Node *next;
} Node, *NodePtr;  // Both structure and pointer

int main(void) {
    IntArray numbers = {1, 2, 3, 4, 5};
    String greeting = "Hello";

    Employee emp = {"John", 123, 50000.0f};
    NodePtr head = NULL;

    printf("Array: %d, %d\\n", numbers[0], numbers[1]);
    printf("String: %s\\n", greeting);
    printf("Employee: %s (ID: %d)\\n", emp.name, emp.id);

    return 0;
}
\`\`\`

---

## 🏗️ Building Data Structures with Typedef

### **Stack Implementation**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_STACK 100

typedef int StackElement;
typedef struct {
    StackElement data[MAX_STACK];
    int top;
} Stack;

void stack_init(Stack *s) {
    s->top = -1;
}

bool stack_push(Stack *s, StackElement value) {
    if (s->top >= MAX_STACK - 1) return false;
    s->data[++s->top] = value;
    return true;
}

bool stack_pop(Stack *s, StackElement *value) {
    if (s->top < 0) return false;
    *value = s->data[s->top--];
    return true;
}

bool stack_peek(const Stack *s, StackElement *value) {
    if (s->top < 0) return false;
    *value = s->data[s->top];
    return true;
}

bool stack_is_empty(const Stack *s) {
    return s->top < 0;
}

int main(void) {
    Stack s;
    stack_init(&s);

    // Push elements
    for (int i = 1; i <= 5; i++) {
        stack_push(&s, i * 10);
    }

    // Pop and print
    StackElement value;
    printf("Stack contents (LIFO): ");
    while (stack_pop(&s, &value)) {
        printf("%d ", value);
    }
    printf("\\n");

    return 0;
}
\`\`\`

---

### **Queue Implementation**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_QUEUE 100

typedef char QueueElement;
typedef struct {
    QueueElement data[MAX_QUEUE];
    int front, rear, count;
} Queue;

void queue_init(Queue *q) {
    q->front = 0;
    q->rear = -1;
    q->count = 0;
}

bool queue_enqueue(Queue *q, QueueElement value) {
    if (q->count >= MAX_QUEUE) return false;
    q->rear = (q->rear + 1) % MAX_QUEUE;
    q->data[q->rear] = value;
    q->count++;
    return true;
}

bool queue_dequeue(Queue *q, QueueElement *value) {
    if (q->count <= 0) return false;
    *value = q->data[q->front];
    q->front = (q->front + 1) % MAX_QUEUE;
    q->count--;
    return true;
}

bool queue_is_empty(const Queue *q) {
    return q->count == 0;
}

int main(void) {
    Queue q;
    queue_init(&q);

    const char *message = "Hello, Queue!";

    // Enqueue characters
    for (int i = 0; message[i] != '\\0'; i++) {
        queue_enqueue(&q, message[i]);
    }

    // Dequeue and print
    printf("Queue contents (FIFO): ");
    QueueElement ch;
    while (queue_dequeue(&q, &ch)) {
        printf("%c", ch);
    }
    printf("\\n");

    return 0;
}
\`\`\`

---

## 📊 Real-World Structure Applications

### **Example 1: Configuration System**

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <stdbool.h>

typedef struct {
    char server_ip[16];
    int server_port;
    bool enable_ssl;
    int timeout_seconds;
} NetworkConfig;

typedef struct {
    char database_host[64];
    int database_port;
    char database_name[32];
    char username[32];
    char password[32];
} DatabaseConfig;

typedef struct {
    char log_file[256];
    int log_level;  // 0=ERROR, 1=WARN, 2=INFO, 3=DEBUG
    bool log_to_console;
    size_t max_file_size;  // in bytes
} LoggingConfig;

typedef struct {
    NetworkConfig network;
    DatabaseConfig database;
    LoggingConfig logging;
} AppConfig;

// Default configuration
AppConfig create_default_config(void) {
    AppConfig config = {
        .network = {
            .server_ip = "127.0.0.1",
            .server_port = 8080,
            .enable_ssl = false,
            .timeout_seconds = 30
        },
        .database = {
            .database_host = "localhost",
            .database_port = 5432,
            .database_name = "myapp",
            .username = "user",
            .password = "password"
        },
        .logging = {
            .log_file = "/var/log/myapp.log",
            .log_level = 2,
            .log_to_console = true,
            .max_file_size = 10 * 1024 * 1024  // 10MB
        }
    };
    return config;
}

void print_config(const AppConfig *config) {
    printf("=== Application Configuration ===\\n");
    printf("Network:\\n");
    printf("  Server: %s:%d\\n", config->network.server_ip, config->network.server_port);
    printf("  SSL: %s\\n", config->network.enable_ssl ? "Enabled" : "Disabled");
    printf("  Timeout: %d seconds\\n", config->network.timeout_seconds);

    printf("\\nDatabase:\\n");
    printf("  Host: %s:%d\\n", config->database.database_host, config->database.database_port);
    printf("  Database: %s\\n", config->database.database_name);
    printf("  User: %s\\n", config->database.username);

    printf("\\nLogging:\\n");
    printf("  File: %s\\n", config->logging.log_file);
    printf("  Level: %d\\n", config->logging.log_level);
    printf("  Console: %s\\n", config->logging.log_to_console ? "Yes" : "No");
    printf("  Max size: %zu bytes\\n", config->logging.max_file_size);
}

int main(void) {
    AppConfig config = create_default_config();
    print_config(&config);

    return 0;
}
\`\`\`

---

### **Example 2: Event System**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Event types
typedef enum {
    MOUSE_CLICK,
    KEY_PRESS,
    WINDOW_RESIZE,
    TIMER_TICK
} EventType;

// Event data structures
typedef struct {
    int x, y;
    int button;  // 1=left, 2=middle, 3=right
} MouseEvent;

typedef struct {
    int key_code;
    bool shift_pressed;
    bool ctrl_pressed;
    bool alt_pressed;
} KeyEvent;

typedef struct {
    int width, height;
} ResizeEvent;

typedef struct {
    int timer_id;
    int elapsed_ms;
} TimerEvent;

// Union for event data
typedef union {
    MouseEvent mouse;
    KeyEvent key;
    ResizeEvent resize;
    TimerEvent timer;
} EventData;

// Main event structure
typedef struct {
    EventType type;
    EventData data;
    long timestamp;  // milliseconds since start
} Event;

// Event handler function type
typedef void (*EventHandler)(const Event*);

// Event system
#define MAX_EVENTS 100
typedef struct {
    Event events[MAX_EVENTS];
    int event_count;
    EventHandler handlers[4];  // One for each event type
} EventSystem;

void event_system_init(EventSystem *system) {
    system->event_count = 0;
    memset(system->handlers, 0, sizeof(system->handlers));
}

bool event_system_add(EventSystem *system, EventType type, EventData data) {
    if (system->event_count >= MAX_EVENTS) return false;

    Event *event = &system->events[system->event_count++];
    event->type = type;
    event->data = data;
    event->timestamp = system->event_count * 100;  // Simulate timestamps

    return true;
}

void event_system_set_handler(EventSystem *system, EventType type, EventHandler handler) {
    system->handlers[type] = handler;
}

void event_system_process(EventSystem *system) {
    for (int i = 0; i < system->event_count; i++) {
        const Event *event = &system->events[i];
        EventHandler handler = system->handlers[event->type];

        if (handler != NULL) {
            handler(event);
        }
    }
}

// Event handler functions
void handle_mouse_click(const Event *event) {
    printf("Mouse click at (%d, %d), button %d\\n",
           event->data.mouse.x, event->data.mouse.y, event->data.mouse.button);
}

void handle_key_press(const Event *event) {
    printf("Key pressed: %d", event->data.key.key_code);
    if (event->data.key.ctrl_pressed) printf(" (Ctrl)");
    if (event->data.key.alt_pressed) printf(" (Alt)");
    if (event->data.key.shift_pressed) printf(" (Shift)");
    printf("\\n");
}

void handle_window_resize(const Event *event) {
    printf("Window resized to %d x %d\\n",
           event->data.resize.width, event->data.resize.height);
}

void handle_timer_tick(const Event *event) {
    printf("Timer %d ticked: %d ms elapsed\\n",
           event->data.timer.timer_id, event->data.timer.elapsed_ms);
}

int main(void) {
    EventSystem event_system;
    event_system_init(&event_system);

    // Set up event handlers
    event_system_set_handler(&event_system, MOUSE_CLICK, handle_mouse_click);
    event_system_set_handler(&event_system, KEY_PRESS, handle_key_press);
    event_system_set_handler(&event_system, WINDOW_RESIZE, handle_window_resize);
    event_system_set_handler(&event_system, TIMER_TICK, handle_timer_tick);

    // Add some events
    EventData data;

    // Mouse click
    data.mouse = (MouseEvent){100, 50, 1};
    event_system_add(&event_system, MOUSE_CLICK, data);

    // Key press
    data.key = (KeyEvent){'A', false, true, false};
    event_system_add(&event_system, KEY_PRESS, data);

    // Window resize
    data.resize = (ResizeEvent){800, 600};
    event_system_add(&event_system, WINDOW_RESIZE, data);

    // Timer tick
    data.timer = (TimerEvent){1, 500};
    event_system_add(&event_system, TIMER_TICK, data);

    // Process all events
    printf("Processing events:\\n");
    event_system_process(&event_system);

    return 0;
}
\`\`\`

---

## 🔧 Advanced Typedef Techniques

### **Opaque Pointers (Incomplete Types)**

\`\`\`c
// Header file (database.h)
typedef struct Database Database;  // Incomplete type

Database* database_create(const char *filename);
void database_destroy(Database *db);
int database_insert(Database *db, const char *key, const char *value);
const char* database_get(Database *db, const char *key);

// Implementation file (database.c)
// struct Database {
//     // Private implementation details
//     FILE *file;
//     // ... other fields
// };

#include "database.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Database {
    char filename[256];
    FILE *file;
    // Private implementation
};

Database* database_create(const char *filename) {
    Database *db = (Database*)malloc(sizeof(Database));
    if (db == NULL) return NULL;

    strcpy(db->filename, filename);
    db->file = fopen(filename, "w+");
    if (db->file == NULL) {
        free(db);
        return NULL;
    }

    return db;
}

void database_destroy(Database *db) {
    if (db != NULL) {
        if (db->file != NULL) {
            fclose(db->file);
        }
        free(db);
    }
}

int database_insert(Database *db, const char *key, const char *value) {
    if (db == NULL || db->file == NULL) return -1;

    fprintf(db->file, "%s=%s\\n", key, value);
    return 0;
}

const char* database_get(Database *db, const char *key) {
    // Simplified implementation - would need proper key-value storage
    static char buffer[256];
    sprintf(buffer, "Value for %s (simulated)", key);
    return buffer;
}

// Usage
int main(void) {
    Database *db = database_create("data.txt");
    if (db == NULL) return 1;

    database_insert(db, "name", "Alice");
    database_insert(db, "age", "25");

    printf("Retrieved: %s\\n", database_get(db, "name"));

    database_destroy(db);
    return 0;
}
\`\`\`

---

## 🎯 Best Practices with Typedef

### **When to Use Typedef**

✅ **Good uses:**
- Complex type names (function pointers, arrays)
- Platform abstraction
- Self-documenting code
- Generic programming
- Opaque types for encapsulation

❌ **Avoid overuse:**
- Simple types (\`typedef int bool\` - use stdbool.h)
- Hiding complexity unnecessarily
- Creating confusing aliases

### **Naming Conventions**

\`\`\`c
// Good naming
typedef struct Point2D Point2D;           // Type name matches struct
typedef void (*EventCallback)(int);      // Clear purpose
typedef char* String;                    // Descriptive

// Avoid
typedef struct point POINT;              // Inconsistent case
typedef int a;                          // Too generic
typedef void (*fp)(void);               // Unclear purpose
\`\`\`

---

## 🔄 Typedef and Code Organization

### **Header File Organization**

\`\`\`c
// types.h - Common type definitions
#ifndef TYPES_H
#define TYPES_H

#include <stdbool.h>

// Basic types
typedef unsigned char byte;
typedef unsigned int uint;

// Function pointers
typedef void (*Callback)(void);
typedef int (*CompareFunc)(const void*, const void*);

// Structure types
typedef struct {
    int x, y;
} Point;

typedef struct {
    char name[50];
    Point position;
} Player;

#endif // TYPES_H
\`\`\`

### **Using the Types**

\`\`\`c
#include "types.h"
#include <stdio.h>

void print_player(const Player *player) {
    printf("Player: %s at (%d, %d)\\n",
           player->name, player->position.x, player->position.y);
}

int main(void) {
    Player player = {"Hero", {10, 20}};
    print_player(&player);

    return 0;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Typedef creates type aliases** for cleaner, more readable code
2. **Combine with structures** for self-documenting data types
3. **Use for complex types** like function pointers and arrays
4. **Enable abstraction** and encapsulation with opaque types
5. **Follow naming conventions** for maintainable code
6. **Don't overuse** - keep simple types simple
7. **Organize in header files** for reusability
8. **Improve code documentation** through meaningful type names

Typedef transforms C code into more readable, maintainable programs! 📝✨`;
    return contentString;
  })()
};
