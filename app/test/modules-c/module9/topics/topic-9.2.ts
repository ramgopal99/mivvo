import { SubLesson } from '../../../data/lessonsData';

export const topic_9_2: SubLesson = {
  id: 9.2,
  title: '#define and #undef',
  status: 'completed',
  content: `# ⚡ #define and #undef

Master macro definition and removal with #define and #undef, understanding object-like and function-like macros, and avoiding common pitfalls.

---

## 🎯 Object-Like Macros

### Simple Constant Macros

\`\`\`c
#include <stdio.h>

// Basic constant definitions
#define PI 3.141592653589793
#define MAX_BUFFER_SIZE 1024
#define ERROR_MESSAGE "An error occurred"
#define TRUE 1
#define FALSE 0

int main() {
    double radius = 5.0;
    double area = PI * radius * radius;
    
    printf("Area of circle with radius %.1f: %.2f\\n", radius, area);
    printf("Max buffer size: %d\\n", MAX_BUFFER_SIZE);
    
    return 0;
}
\`\`\`

### Expression Macros

\`\`\`c
#include <stdio.h>

// Mathematical constants and expressions
#define E 2.718281828459045
#define GRAVITY 9.80665
#define SPEED_OF_LIGHT 299792458
#define BYTES_PER_KB 1024
#define BYTES_PER_MB (BYTES_PER_KB * 1024)
#define BYTES_PER_GB (BYTES_PER_MB * 1024)

// String constants
#define PROGRAM_NAME "MyApplication"
#define VERSION "1.2.3"
#define AUTHOR "John Doe"

// File paths (platform-dependent)
#ifdef _WIN32
    #define CONFIG_FILE "C:\\\\Program Files\\\\MyApp\\\\config.ini"
#else
    #define CONFIG_FILE "/etc/myapp/config.ini"
#endif

int main() {
    printf("Program: %s v%s\\n", PROGRAM_NAME, VERSION);
    printf("Author: %s\\n", AUTHOR);
    printf("Config file: %s\\n", CONFIG_FILE);
    
    printf("Memory sizes:\\n");
    printf("  1 KB = %d bytes\\n", BYTES_PER_KB);
    printf("  1 MB = %d bytes\\n", BYTES_PER_MB);
    printf("  1 GB = %ld bytes\\n", BYTES_PER_GB);
    
    return 0;
}
\`\`\`

---

## 🔧 Function-Like Macros

### Basic Function Macros

\`\`\`c
#include <stdio.h>

// Simple function-like macros
#define SQUARE(x) ((x) * (x))
#define CUBE(x) ((x) * (x) * (x))
#define ABS(x) ((x) < 0 ? -(x) : (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define MIN(a, b) ((a) < (b) ? (a) : (b))

int main() {
    int x = 5, y = -3;
    
    printf("SQUARE(%d) = %d\\n", x, SQUARE(x));
    printf("CUBE(%d) = %d\\n", x, CUBE(x));
    printf("ABS(%d) = %d\\n", y, ABS(y));
    printf("MAX(%d, %d) = %d\\n", x, y, MAX(x, y));
    printf("MIN(%d, %d) = %d\\n", x, y, MIN(x, y));
    
    return 0;
}
\`\`\`

### Multi-Parameter Macros

\`\`\`c
#include <stdio.h>

// Macros with multiple parameters
#define PRINT_COORDS(x, y, z) printf("(%d, %d, %d)\\n", x, y, z)
#define CREATE_POINT(x, y) ((Point){x, y})
#define SWAP(a, b) do { typeof(a) temp = a; a = b; b = temp; } while(0)
#define CLAMP(value, min, max) ((value) < (min) ? (min) : (value) > (max) ? (max) : (value))

typedef struct {
    int x, y;
} Point;

int main() {
    int a = 10, b = 20;
    int value = 15;
    
    printf("Before swap: a=%d, b=%d\\n", a, b);
    SWAP(a, b);
    printf("After swap: a=%d, b=%d\\n", a, b);
    
    PRINT_COORDS(1, 2, 3);
    
    Point p = CREATE_POINT(5, 10);
    printf("Point: (%d, %d)\\n", p.x, p.y);
    
    printf("CLAMP(%d, 0, 10) = %d\\n", value, CLAMP(value, 0, 10));
    printf("CLAMP(%d, 20, 30) = %d\\n", value, CLAMP(value, 20, 30));
    
    return 0;
}
\`\`\`

---

## ⚠️ Macro Pitfalls and Solutions

### Parentheses Problems

\`\`\`c
#include <stdio.h>

// ❌ Wrong - no parentheses around parameters
#define BAD_SQUARE(x) x * x
#define BAD_ADD(a, b) a + b

// ❌ Wrong - no parentheses around expression
#define BAD_DOUBLE(x) 2 * x

int main() {
    int result1 = BAD_SQUARE(3 + 1);  // Expands to: 3 + 1 * 3 + 1 = 7
    int result2 = BAD_ADD(5, 3) * 2;  // Expands to: 5 + 3 * 2 = 11
    
    printf("BAD_SQUARE(3 + 1) = %d (expected 16)\\n", result1);
    printf("BAD_ADD(5, 3) * 2 = %d (expected 16)\\n", result2);
    
    return 0;
}
\`\`\`

**Solutions:**

\`\`\`c
// ✅ Correct - parentheses around parameters and expression
#define SQUARE(x) ((x) * (x))
#define ADD(a, b) ((a) + (b))
#define DOUBLE(x) (2 * (x))

int main() {
    int result1 = SQUARE(3 + 1);  // Expands to: ((3 + 1) * (3 + 1)) = 16
    int result2 = ADD(5, 3) * 2;  // Expands to: ((5 + 3) * 2) = 16
    
    printf("SQUARE(3 + 1) = %d\\n", result1);
    printf("ADD(5, 3) * 2 = %d\\n", result2);
    
    return 0;
}
\`\`\`

### Multiple Evaluation Issues

\`\`\`c
#include <stdio.h>

// ❌ Dangerous - parameter evaluated multiple times
#define BAD_MAX(a, b) ((a) > (b) ? (a) : (b))

int get_random() {
    static int counter = 0;
    counter++;
    printf("Function called %d times\\n", counter);
    return rand() % 100;
}

int main() {
    // get_random() gets called twice!
    int result = BAD_MAX(get_random(), get_random());
    printf("Result: %d\\n", result);
    
    return 0;
}
\`\`\`

**Solutions:**

\`\`\`c
// ✅ Safe - use inline function instead of macro
static inline int safe_max(int a, int b) {
    return a > b ? a : b;
}

// Or use statement expressions (GCC extension)
#define SAFE_MAX(a, b) ({ \\
    typeof(a) _a = (a); \\
    typeof(b) _b = (b); \\
    _a > _b ? _a : _b; \\
})

int main() {
    int result = safe_max(get_random(), get_random());
    printf("Safe result: %d\\n", result);
    
    return 0;
}
\`\`\`

### Semicolon Issues

\`\`\`c
#include <stdio.h>

// ❌ Problematic - missing do-while wrapper
#define BAD_PRINT(x) printf("%d\\n", x)

int main() {
    if (1)
        BAD_PRINT(42);  // Only printf gets conditional
    else
        printf("Not printed\\n");
    
    return 0;
}
\`\`\`

**Solutions:**

\`\`\`c
// ✅ Good - do-while(0) wrapper for multi-statement macros
#define PRINT_INT(x) do { \\
    printf("%d\\n", x); \\
} while(0)

// ✅ Good - single statement macro
#define PRINT_DOUBLE(x) printf("%.2f\\n", x)

int main() {
    if (1)
        PRINT_INT(42);  // Entire block is conditional
    else
        printf("Not printed\\n");
    
    return 0;
}
\`\`\`

---

## 🔄 Macro Expansion Process

### Step-by-Step Expansion

\`\`\`c
#define PI 3.14159
#define CIRCLE_AREA(r) (PI * (r) * (r))
#define PRINT_RESULT(x) printf("Result: %f\\n", x)

int main() {
    double area = CIRCLE_AREA(5.0);
    PRINT_RESULT(area);
    
    return 0;
}
\`\`\`

**Expansion steps:**

1. `CIRCLE_AREA(5.0)` → `(PI * (5.0) * (5.0))`
2. `PI` → `3.14159`
3. Result: `(3.14159 * (5.0) * (5.0))`

4. `PRINT_RESULT(area)` → `printf("Result: %f\\n", area)`

### Recursive Expansion Prevention

\`\`\`c
#define A B
#define B A  // ❌ Infinite recursion prevented

// The preprocessor detects cycles and doesn't expand
int main() {
    int x = A;  // Stays as A, not expanded
    return 0;
}
\`\`\`

### Token Pasting and Stringification

\`\`\`c
#include <stdio.h>

// Stringification operator (#)
#define PRINT_VAR(x) printf(#x " = %d\\n", x)

// Token pasting operator (##)
#define DECLARE_VAR(type, name) type var_##name
#define CREATE_GETTER(type, name) type get_##name() { return var_##name; }

// Generic variable creation
#define VAR(type, name, value) \\
    type var_##name = value; \\
    type get_##name() { return var_##name; } \\
    void set_##name(type value) { var_##name = value; }

int main() {
    int x = 42;
    PRINT_VAR(x);  // Expands to: printf("x" " = %d\\n", x)
    
    // Create variables with getters/setters
    VAR(int, counter, 0);
    VAR(char*, name, "Alice");
    
    printf("Counter: %d\\n", get_counter());
    set_counter(100);
    printf("Counter: %d\\n", get_counter());
    
    printf("Name: %s\\n", get_name());
    
    return 0;
}
\`\`\`

---

## 🗑️ #undef Directive

### Removing Macro Definitions

\`\`\`c
#include <stdio.h>

#define DEBUG 1
#define VERSION "1.0"

#ifdef DEBUG
    #define LOG(msg) printf("DEBUG: %s\\n", msg)
#else
    #define LOG(msg) /* nothing */
#endif

int main() {
    LOG("Program starting");
    printf("Version: %s\\n", VERSION);
    
    // Remove DEBUG definition
    #undef DEBUG
    
    // Redefine LOG (now empty)
    #ifdef DEBUG
        #define LOG(msg) printf("DEBUG: %s\\n", msg)
    #else
        #define LOG(msg) /* nothing */
    #endif
    
    LOG("This won't print");  // No output
    printf("Version: %s\\n", VERSION);
    
    return 0;
}
\`\`\`

### Undef for Conditional Compilation

\`\`\`c
// Temporarily undefine for testing
#undef assert

// Define custom assert for testing
#define assert(condition) \\
    do { \\
        if (!(condition)) { \\
            printf("TEST ASSERT FAILED\\n"); \\
        } \\
    } while(0)

void test_function() {
    assert(1 + 1 == 2);  // Will print success message
    assert(1 + 1 == 3);  // Will print failure message
}

// Restore original assert
#undef assert
#include <assert.h>  // Reincludes standard assert
\`\`\`

---

## 🎯 Advanced Macro Techniques

### Variadic Macros (C99)

\`\`\`c
#include <stdio.h>

// Macros with variable arguments
#define LOG_INFO(...) printf("[INFO] " __VA_ARGS__)
#define LOG_ERROR(...) fprintf(stderr, "[ERROR] " __VA_ARGS__)

// Safe printf wrapper
#define SAFE_PRINTF(format, ...) \\
    do { \\
        if (format != NULL) { \\
            printf(format, ##__VA_ARGS__); \\
        } \\
    } while(0)

int main() {
    LOG_INFO("Program started\\n");
    LOG_INFO("Counter = %d, Status = %s\\n", 42, "OK");
    
    LOG_ERROR("Invalid input: %d\\n", -1);
    
    SAFE_PRINTF("Hello %s\\n", "World");
    SAFE_PRINTF(NULL);  // Safe - no crash
    
    return 0;
}
\`\`\`

### Conditional Macros

\`\`\`c
#include <stdio.h>

// Platform-specific macros
#ifdef _WIN32
    #define PATH_SEPARATOR "\\\\"
    #define CLEAR_SCREEN "cls"
#else
    #define PATH_SEPARATOR "/"
    #define CLEAR_SCREEN "clear"
#endif

// Debug/release macros
#ifdef NDEBUG
    #define LOG_DEBUG(...)
#else
    #define LOG_DEBUG(...) printf("[DEBUG] " __VA_ARGS__)
#endif

// Compiler-specific macros
#if defined(__GNUC__)
    #define LIKELY(x) __builtin_expect(!!(x), 1)
    #define UNLIKELY(x) __builtin_expect(!!(x), 0)
#else
    #define LIKELY(x) (x)
    #define UNLIKELY(x) (x)
#endif

int main() {
    printf("Path separator: %s\\n", PATH_SEPARATOR);
    
    LOG_DEBUG("This is debug info\\n");
    
    int x = 10;
    if (LIKELY(x > 5)) {
        printf("x is likely > 5\\n");
    }
    
    return 0;
}
\`\`\`

---

## 🧪 Complete Macro Examples

### Generic Data Structure Macros

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

// Generic array macros
#define ARRAY_SIZE(arr) (sizeof(arr) / sizeof((arr)[0]))

#define DECLARE_ARRAY(type, name, size) \\
    type name[size]; \\
    size_t name##_size = size; \\
    size_t name##_count = 0;

#define ARRAY_ADD(arr, value) \\
    do { \\
        if (arr##_count < arr##_size) { \\
            arr[arr##_count++] = value; \\
        } \\
    } while(0)

#define ARRAY_FOREACH(type, item, arr) \\
    for (size_t i = 0; i < arr##_count && ((item) = arr[i], 1); i++)

// Generic stack macros
#define DECLARE_STACK(type, name, max_size) \\
    type name##_stack[max_size]; \\
    size_t name##_top = 0;

#define STACK_PUSH(stack, value) \\
    do { \\
        if (stack##_top < ARRAY_SIZE(stack##_stack)) { \\
            stack##_stack[stack##_top++] = value; \\
        } \\
    } while(0)

#define STACK_POP(stack, result) \\
    ((stack##_top > 0) ? ((result) = stack##_stack[--stack##_top], 1) : 0)

#define STACK_IS_EMPTY(stack) (stack##_top == 0)

int main() {
    // Declare generic array
    DECLARE_ARRAY(int, numbers, 10);
    
    // Add elements
    ARRAY_ADD(numbers, 10);
    ARRAY_ADD(numbers, 20);
    ARRAY_ADD(numbers, 30);
    
    printf("Array elements: ");
    int item;
    ARRAY_FOREACH(int, item, numbers) {
        printf("%d ", item);
    }
    printf("\\n");
    
    // Declare generic stack
    DECLARE_STACK(char, chars, 5);
    
    // Push characters
    STACK_PUSH(chars, 'A');
    STACK_PUSH(chars, 'B');
    STACK_PUSH(chars, 'C');
    
    // Pop and print
    printf("Stack elements (LIFO): ");
    char popped;
    while (STACK_POP(chars, popped)) {
        printf("%c ", popped);
    }
    printf("\\n");
    
    return 0;
}
\`\`\`

### Build System Macros

\`\`\`c
#include <stdio.h>

// Version macros
#define VERSION_MAJOR 1
#define VERSION_MINOR 2
#define VERSION_PATCH 3

#define VERSION_TO_STRING(major, minor, patch) \\
    #major "." #minor "." #patch

#define VERSION VERSION_TO_STRING(VERSION_MAJOR, VERSION_MINOR, VERSION_PATCH)

// Build type detection
#ifndef NDEBUG
    #define BUILD_TYPE "Debug"
    #define ENABLE_ASSERTS 1
    #define ENABLE_LOGGING 1
#else
    #define BUILD_TYPE "Release"
    #define ENABLE_ASSERTS 0
    #define ENABLE_LOGGING 0
#endif

// Logging macros
#if ENABLE_LOGGING
    #define LOG_LEVEL_INFO  0
    #define LOG_LEVEL_WARN  1
    #define LOG_LEVEL_ERROR 2
    
    #define LOG(level, ...) \\
        do { \\
            const char* level_str[] = {"INFO", "WARN", "ERROR"}; \\
            printf("[%s] ", level_str[level]); \\
            printf(__VA_ARGS__); \\
            printf("\\n"); \\
        } while(0)
#else
    #define LOG(level, ...)
#endif

// Assertion macros
#if ENABLE_ASSERTS
    #define ASSERT(condition) \\
        do { \\
            if (!(condition)) { \\
                fprintf(stderr, "ASSERTION FAILED: %s at %s:%d\\n", \\
                       #condition, __FILE__, __LINE__); \\
                abort(); \\
            } \\
        } while(0)
#else
    #define ASSERT(condition)
#endif

// Function entry/exit logging (debug only)
#if ENABLE_LOGGING && !defined(NDEBUG)
    #define FUNC_ENTRY() LOG(LOG_LEVEL_INFO, "Entering %s", __func__)
    #define FUNC_EXIT()  LOG(LOG_LEVEL_INFO, "Exiting %s", __func__)
#else
    #define FUNC_ENTRY()
    #define FUNC_EXIT()
#endif

void some_function() {
    FUNC_ENTRY();
    
    LOG(LOG_LEVEL_INFO, "Doing some work...");
    
    int x = 10;
    ASSERT(x > 5);
    
    LOG(LOG_LEVEL_WARN, "This is a warning");
    
    FUNC_EXIT();
}

int main() {
    printf("Program: %s\\n", "MyApp");
    printf("Version: %s\\n", VERSION);
    printf("Build: %s\\n", BUILD_TYPE);
    printf("Asserts: %s\\n", ENABLE_ASSERTS ? "Enabled" : "Disabled");
    printf("Logging: %s\\n", ENABLE_LOGGING ? "Enabled" : "Disabled");
    
    LOG(LOG_LEVEL_INFO, "Program started");
    
    some_function();
    
    LOG(LOG_LEVEL_INFO, "Program finished");
    
    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Object-like macros** replace identifiers with values/expressions
2. **Function-like macros** take parameters and expand to code
3. **Always parenthesize** macro parameters and expressions
4. **Use do-while(0)** for multi-statement macros to avoid semicolon issues
5. **#undef** removes macro definitions
6. **Token pasting (##)** and stringification (#) enable advanced macros
7. **Variadic macros** accept variable number of arguments
8. **Beware of multiple evaluation** in macro parameters

---

## 🚀 Preview: #include Directive

In the next topic, you'll learn about:
- **File inclusion** mechanisms and search paths
- **Header file organization** and include guards
- **System vs user headers** and angle brackets vs quotes
- **Include order** and dependency management
- **Pragma once** as an alternative to include guards

**Proper includes are crucial for modular C programming!** 📁

