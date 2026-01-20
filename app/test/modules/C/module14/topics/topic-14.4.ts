import { SubLesson } from '../../../../data/lessonsData';

export const topic_14_4: SubLesson = {
  id: '14.4',
  title: 'Code Generation and Metaprogramming',
  status: 'demo',
  content: `# Code Generation and Metaprogramming in C

## X-Macros (X Macros)

### Basic X-Macro Pattern
\`\`\`c
// Define the list of items
#define COLORS \\
    X(RED, "red", 0xFF0000) \\
    X(GREEN, "green", 0x00FF00) \\
    X(BLUE, "blue", 0x0000FF) \\
    X(WHITE, "white", 0xFFFFFF) \\
    X(BLACK, "black", 0x000000)

// Generate enum
#define X(name, string, hex) name,
enum Color {
    COLORS
};
#undef X

// Generate string array
#define X(name, string, hex) string,
const char *color_names[] = {
    COLORS
};
#undef X

// Generate hex value array
#define X(name, string, hex) hex,
const unsigned int color_values[] = {
    COLORS
};
#undef X

// Usage
int main() {
    enum Color c = RED;
    printf("Color: %s, Value: 0x%06X\\n",
           color_names[c], color_values[c]);

    return 0;
}
\`\`\`

### Advanced X-Macro Applications
\`\`\`c
// Command definitions
#define COMMANDS \\
    X(CMD_QUIT, "quit", handle_quit) \\
    X(CMD_HELP, "help", handle_help) \\
    X(CMD_SAVE, "save", handle_save) \\
    X(CMD_LOAD, "load", handle_load)

// Command enum
#define X(cmd, str, handler) cmd,
enum Command {
    COMMANDS
    CMD_COUNT
};
#undef X

// Command strings
#define X(cmd, str, handler) str,
const char *command_strings[] = {
    COMMANDS
};
#undef X

// Command handlers
#define X(cmd, str, handler) handler,
void (*command_handlers[])(void) = {
    COMMANDS
};
#undef X

// Command lookup function
int find_command(const char *cmd_str) {
    for (int i = 0; i < CMD_COUNT; i++) {
        if (strcmp(cmd_str, command_strings[i]) == 0) {
            return i;
        }
    }
    return -1;
}

// Usage
void process_command(const char *cmd_str) {
    int cmd_index = find_command(cmd_str);
    if (cmd_index >= 0) {
        command_handlers[cmd_index]();
    } else {
        printf("Unknown command: %s\\n", cmd_str);
    }
}
\`\`\`

## Template-like Code Generation

### Generic Data Structures
\`\`\`c
// Generic vector template
#define DEFINE_VECTOR(type) \\
typedef struct { \\
    type *data; \\
    size_t size; \\
    size_t capacity; \\
} vector_##type; \\
\\
void vector_init_##type(vector_##type *vec) { \\
    vec->data = NULL; \\
    vec->size = 0; \\
    vec->capacity = 0; \\
} \\
\\
void vector_push_##type(vector_##type *vec, type value) { \\
    if (vec->size >= vec->capacity) { \\
        vec->capacity = vec->capacity ? vec->capacity * 2 : 1; \\
        vec->data = realloc(vec->data, vec->capacity * sizeof(type)); \\
    } \\
    vec->data[vec->size++] = value; \\
} \\
\\
type vector_get_##type(vector_##type *vec, size_t index) { \\
    return vec->data[index]; \\
} \\
\\
void vector_free_##type(vector_##type *vec) { \\
    free(vec->data); \\
    vec->data = NULL; \\
    vec->size = 0; \\
    vec->capacity = 0; \\
}

// Instantiate for specific types
DEFINE_VECTOR(int)
DEFINE_VECTOR(double)
DEFINE_VECTOR(char)

// Usage
int main() {
    vector_int int_vec;
    vector_init_int(&int_vec);

    vector_push_int(&int_vec, 10);
    vector_push_int(&int_vec, 20);

    printf("First element: %d\\n", vector_get_int(&int_vec, 0));

    vector_free_int(&int_vec);

    return 0;
}
\`\`\`

### Callback System Generation
\`\`\`c
// Event system generator
#define DEFINE_EVENT_SYSTEM(name) \\
typedef void (*name##_callback_t)(void *data); \\
\\
typedef struct name##_listener { \\
    name##_callback_t callback; \\
    void *user_data; \\
    struct name##_listener *next; \\
} name##_listener_t; \\
\\
typedef struct { \\
    name##_listener_t *listeners; \\
} name##_event_t; \\
\\
void name##_init(name##_event_t *event) { \\
    event->listeners = NULL; \\
} \\
\\
void name##_add_listener(name##_event_t *event, \\
                        name##_callback_t callback, \\
                        void *user_data) { \\
    name##_listener_t *listener = malloc(sizeof(name##_listener_t)); \\
    listener->callback = callback; \\
    listener->user_data = user_data; \\
    listener->next = event->listeners; \\
    event->listeners = listener; \\
} \\
\\
void name##_trigger(name##_event_t *event) { \\
    name##_listener_t *current = event->listeners; \\
    while (current) { \\
        current->callback(current->user_data); \\
        current = current->next; \\
    } \\
} \\
\\
void name##_cleanup(name##_event_t *event) { \\
    name##_listener_t *current = event->listeners; \\
    while (current) { \\
        name##_listener_t *next = current->next; \\
        free(current); \\
        current = next; \\
    } \\
    event->listeners = NULL; \\
}

// Create event systems
DEFINE_EVENT_SYSTEM(button_click)
DEFINE_EVENT_SYSTEM(network_receive)
DEFINE_EVENT_SYSTEM(timer_tick)

// Usage
void on_button_click(void *data) {
    printf("Button clicked!\\n");
}

int main() {
    button_click_event_t button_event;
    button_click_init(&button_event);

    button_click_add_listener(&button_event, on_button_click, NULL);

    // Simulate button click
    button_click_trigger(&button_event);

    button_click_cleanup(&button_event);

    return 0;
}
\`\`\`

## Build System Integration

### Conditional Compilation with Makefiles
\`\`\`makefile
# Makefile with conditional compilation
CC=gcc
CFLAGS=-Wall -Wextra -std=c11

# Debug build
debug: CFLAGS += -g -O0 -DDEBUG
debug: all

# Release build
release: CFLAGS += -O3 -DNDEBUG
release: all

# Profile build
profile: CFLAGS += -pg -O2
profile: all

all: program

program: main.o utils.o
	$(CC) $(CFLAGS) -o $@ $^

clean:
	rm -f *.o program
\`\`\`

### Autotools Integration
\`\`\`m4
# configure.ac
AC_INIT([myprogram], [1.0])
AC_PROG_CC
AC_CHECK_HEADERS([stdlib.h string.h])
AC_CHECK_FUNCS([strdup])

# Check for optional features
AC_ARG_ENABLE([debug],
              [AS_HELP_STRING([--enable-debug], [enable debug mode])],
              [AC_DEFINE([DEBUG], [1], [Debug mode])])

AC_CONFIG_FILES([Makefile])
AC_OUTPUT
\`\`\`

## Reflection-like Capabilities

### Structure Introspection
\`\`\`c
#include <stddef.h>

// Structure field information
#define FIELD_INFO(type, name) {#name, offsetof(type, name), sizeof(((type *)0)->name)}

// Example structure
typedef struct {
    int id;
    char name[50];
    double salary;
} Employee;

typedef struct {
    const char *name;
    size_t offset;
    size_t size;
} FieldInfo;

// Employee field information
FieldInfo employee_fields[] = {
    FIELD_INFO(Employee, id),
    FIELD_INFO(Employee, name),
    FIELD_INFO(Employee, salary),
};

#define NUM_EMPLOYEE_FIELDS (sizeof(employee_fields) / sizeof(employee_fields[0]))

// Generic field access
void *get_field(void *obj, size_t field_index) {
    if (field_index >= NUM_EMPLOYEE_FIELDS) return NULL;

    FieldInfo *field = &employee_fields[field_index];
    return (char *)obj + field->offset;
}

const char *get_field_name(size_t field_index) {
    if (field_index >= NUM_EMPLOYEE_FIELDS) return NULL;
    return employee_fields[field_index].name;
}

// Usage
int main() {
    Employee emp = {123, "John Doe", 50000.0};

    // Access fields by index
    int *id_ptr = get_field(&emp, 0);
    char *name_ptr = get_field(&emp, 1);
    double *salary_ptr = get_field(&emp, 2);

    printf("ID: %d\\n", *id_ptr);
    printf("Name: %s\\n", name_ptr);
    printf("Salary: %f\\n", *salary_ptr);

    // Print field names
    for (size_t i = 0; i < NUM_EMPLOYEE_FIELDS; i++) {
        printf("Field %zu: %s\\n", i, get_field_name(i));
    }

    return 0;
}
\`\`\`

## Code Obfuscation Techniques

### Macro-based Obfuscation
\`\`\`c
// Obfuscated code (don't do this in real code!)
#define O(o) o
#define l(o) O(o)
#define I(o) l(o)
#define t(o) I(o)
#define n(o) t(o)
#define _(o) n(o)
#define D(o) _(o)
#define E(o) D(o)
#define F(o) E(o)

// Usage
F(int) F(main)(F(void)) {
    F(printf)("Hello, World!\\n");
    F(return) 0;
}
\`\`\`

### String Obfuscation
\`\`\`c
// Compile-time string obfuscation
#define XOR_KEY 0x42

#define OBFUSCATE(str) \\
    (char []) { \\
        str[0] ^ XOR_KEY, str[1] ^ XOR_KEY, str[2] ^ XOR_KEY, \\
        str[3] ^ XOR_KEY, str[4] ^ XOR_KEY, str[5] ^ XOR_KEY, \\
        str[6] ^ XOR_KEY, str[7] ^ XOR_KEY, str[8] ^ XOR_KEY, \\
        str[9] ^ XOR_KEY, str[10] ^ XOR_KEY, str[11] ^ XOR_KEY, \\
        0 \\
    }

// Deobfuscate function
char *deobfuscate(char *str) {
    for (int i = 0; str[i]; i++) {
        str[i] ^= XOR_KEY;
    }
    return str;
}

// Usage
int main() {
    char obfuscated[] = OBFUSCATE("Hello World");
    printf("%s\\n", deobfuscate(obfuscated));
    return 0;
}
\`\`\`

## Advanced Debugging Macros

### Enhanced Logging Macros
\`\`\`c
#include <stdio.h>
#include <time.h>

// Color codes for console output
#define COLOR_RESET   "\\x1b[0m"
#define COLOR_RED     "\\x1b[31m"
#define COLOR_GREEN   "\\x1b[32m"
#define COLOR_YELLOW  "\\x1b[33m"
#define COLOR_BLUE    "\\x1b[34m"

// Log levels
typedef enum {
    LOG_TRACE,
    LOG_DEBUG,
    LOG_INFO,
    LOG_WARN,
    LOG_ERROR,
    LOG_FATAL
} LogLevel;

const char *log_colors[] = {
    COLOR_BLUE,    // TRACE
    COLOR_GREEN,   // DEBUG
    COLOR_RESET,   // INFO
    COLOR_YELLOW,  // WARN
    COLOR_RED,     // ERROR
    COLOR_RED      // FATAL
};

const char *log_names[] = {
    "TRACE", "DEBUG", "INFO", "WARN", "ERROR", "FATAL"
};

// Current log level (can be changed at runtime)
LogLevel current_log_level = LOG_DEBUG;

// Enhanced logging macro
#define LOG(level, format, ...) \\
    do { \\
        if (level >= current_log_level) { \\
            time_t now = time(NULL); \\
            struct tm *tm_info = localtime(&now); \\
            char timestamp[20]; \\
            strftime(timestamp, sizeof(timestamp), "%H:%M:%S", tm_info); \\
            \\
            fprintf(stderr, "%s[%s] %s:%d %s " format COLOR_RESET "\\n", \\
                    log_colors[level], timestamp, __FILE__, __LINE__, \\
                    log_names[level], ##__VA_ARGS__); \\
        } \\
    } while (0)

// Convenience macros
#define LOG_TRACE(format, ...) LOG(LOG_TRACE, format, ##__VA_ARGS__)
#define LOG_DEBUG(format, ...) LOG(LOG_DEBUG, format, ##__VA_ARGS__)
#define LOG_INFO(format, ...)  LOG(LOG_INFO, format, ##__VA_ARGS__)
#define LOG_WARN(format, ...)  LOG(LOG_WARN, format, ##__VA_ARGS__)
#define LOG_ERROR(format, ...) LOG(LOG_ERROR, format, ##__VA_ARGS__)
#define LOG_FATAL(format, ...) LOG(LOG_FATAL, format, ##__VA_ARGS__)

// Conditional logging
#define LOG_IF(condition, level, format, ...) \\
    do { \\
        if (condition) { \\
            LOG(level, format, ##__VA_ARGS__); \\
        } \\
    } while (0)

// Usage
int main() {
    LOG_INFO("Application started");
    LOG_DEBUG("Debug information: %d", 42);

    int error_code = -1;
    LOG_IF(error_code < 0, LOG_ERROR, "Error occurred: %d", error_code);

    return 0;
}
\`\`\`

## Build-time Code Generation

### Header File Generation
\`\`\`c
// generate_headers.c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char *name;
    char *type;
} StructField;

void generate_header(const char *struct_name, StructField *fields, int num_fields) {
    printf("// Generated header for %s\\n", struct_name);
    printf("#ifndef %s_H\\n", struct_name);
    printf("#define %s_H\\n\\n", struct_name);

    // Structure definition
    printf("typedef struct {\\n");
    for (int i = 0; i < num_fields; i++) {
        printf("    %s %s;\\n", fields[i].type, fields[i].name);
    }
    printf("} %s;\\n\\n", struct_name);

    // Function declarations
    printf("%s* %s_create(void);\\n", struct_name, struct_name);
    printf("void %s_destroy(%s *obj);\\n", struct_name, struct_name);
    printf("void %s_print(const %s *obj);\\n\\n", struct_name, struct_name);

    printf("#endif // %s_H\\n", struct_name);
}

int main() {
    StructField person_fields[] = {
        {"name", "char[50]"},
        {"age", "int"},
        {"salary", "double"}
    };

    generate_header("Person", person_fields, 3);
    return 0;
}
\`\`\`

Code generation and metaprogramming techniques in C allow for creating maintainable, type-safe, and efficient code. These techniques bridge the gap between C's low-level nature and higher-level programming constructs.`
};

