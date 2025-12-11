import { SubLesson } from '../../../data/lessonsData';

export const topic_9_4: SubLesson = {
  id: 9.4,
  title: 'Macros (Function-like)',
  status: 'completed',
  content: `# ⚙️ Macros (Function-like)

Master advanced function-like macros with variable arguments, debugging techniques, and the critical macro vs function decision.

---

## 🎯 Advanced Function-Like Macros

### Variadic Macros (C99)

\`\`\`c
#include <stdio.h>

// Basic variadic macro
#define LOG(format, ...) printf("[LOG] " format "\\n", ##__VA_ARGS__)

// Type-safe logging
#define LOG_INFO(...) LOG("INFO: " __VA_ARGS__)
#define LOG_ERROR(...) LOG("ERROR: " __VA_ARGS__)

// Conditional logging
#define DEBUG_LOG(...) do { \\
    if (DEBUG_ENABLED) \\
        LOG("DEBUG: " __VA_ARGS__); \\
} while(0)

int main() {
    LOG("Simple message");
    LOG_INFO("Program started with %d arguments", 2);
    LOG_ERROR("Failed to open file: %s", "data.txt");
    
    return 0;
}
\`\`\`

### Argument Counting

\`\`\`c
#include <stdio.h>

// Count arguments (GCC extension)
#define NUM_ARGS(...) (sizeof((int[]){__VA_ARGS__}) / sizeof(int))

#define SUM(...) sum_function((double[]){__VA_ARGS__}, \\
                             sizeof((double[]){__VA_ARGS__}) / sizeof(double))

double sum_function(double* arr, int count) {
    double total = 0;
    for (int i = 0; i < count; i++) {
        total += arr[i];
    }
    return total;
}

int main() {
    printf("SUM(1, 2, 3) = %.1f\\n", SUM(1, 2, 3));
    printf("SUM(10, 20, 30, 40) = %.1f\\n", SUM(10, 20, 30, 40));
    
    return 0;
}
\`\`\`

---

## 🔍 Macro Debugging and Visualization

### Preprocessing Output

\`\`\`bash
# GCC: Show preprocessed output
gcc -E program.c -o program.i

# MSVC: Show preprocessed output
cl /P program.c

# View specific macro expansion
gcc -E -dM program.c
\`\`\`

### Step-by-Step Expansion

\`\`\`c
#define ADD(a, b) ((a) + (b))
#define MULTIPLY(a, b) ((a) * (b))
#define COMPLEX_OP(x, y) ADD(MULTIPLY(x, 2), y)

// COMPLEX_OP(3, 4) expands to:
// ADD(MULTIPLY(3, 2), 4)
// ADD(((3) * (2)), 4)  
// (((3) * (2)) + (4))
// ((6) + (4))
// (10)
\`\`\`

### Debug Macros

\`\`\`c
#include <stdio.h>

// Stringify arguments for debugging
#define STRINGIFY(x) #x
#define TO_STRING(x) STRINGIFY(x)

// Show macro expansion
#define SHOW_EXPANSION(x) printf(#x " -> %s\\n", TO_STRING(x))

// Debug function entry (GCC)
#define FUNC_ENTRY() printf("Entering %s() at %s:%d\\n", \\
                           __func__, __FILE__, __LINE__)

int main() {
    SHOW_EXPANSION(__LINE__);  // __LINE__ -> 15
    SHOW_EXPANSION(__FILE__);  // __FILE__ -> main.c
    
    FUNC_ENTRY();
    
    return 0;
}
\`\`\`

---

## ⚖️ Macro vs Function Comparison

### Performance Comparison

\`\`\`c
#include <stdio.h>
#include <time.h>

// Macro version (inline expansion)
#define SQUARE_MACRO(x) ((x) * (x))

// Function version
int square_function(int x) {
    return x * x;
}

// Inline function (C99)
static inline int square_inline(int x) {
    return x * x;
}

#define ITERATIONS 100000000

double time_function(int (*func)(int), int arg) {
    clock_t start = clock();
    
    volatile int result = 0;
    for (int i = 0; i < ITERATIONS; i++) {
        result = func(arg);
    }
    
    clock_t end = clock();
    return (double)(end - start) / CLOCKS_PER_SEC;
}

int main() {
    printf("Performance comparison (100M iterations):\\n\\n");
    
    double macro_time = time_function(square_function, 5);
    printf("Macro:     %.3f seconds\\n", macro_time);
    
    double func_time = time_function(square_function, 5);
    printf("Function:  %.3f seconds\\n", func_time);
    
    double inline_time = time_function(square_inline, 5);
    printf("Inline:    %.3f seconds\\n", inline_time);
    
    printf("\\nMacro speedup vs function: %.1fx\\n", func_time / macro_time);
    printf("Inline speedup vs function: %.1fx\\n", func_time / inline_time);
    
    return 0;
}
\`\`\`

### When to Use Macros

**✅ Use macros for:**
- **Performance-critical code** (no function call overhead)
- **Generic programming** (before C11 generics)
- **Compile-time computation**
- **Debugging and logging**
- **Platform abstraction**

**❌ Don't use macros for:**
- **Complex logic** (hard to debug)
- **Type safety** (no type checking)
- **Large code blocks** (code bloat)
- **Public APIs** (confusing to users)

### Safe Macro Patterns

\`\`\`c
// ✅ Good: Type-safe wrapper
#define SAFE_FREE(ptr) do { \\
    if ((ptr) != NULL) { \\
        free(ptr); \\
        (ptr) = NULL; \\
    } \\
} while(0)

// ✅ Good: Compile-time assertion
#define COMPILE_TIME_ASSERT(condition, message) \\
    typedef char compile_time_assert[(condition) ? 1 : -1]

// ✅ Good: Generic swap (with typeof)
#define SWAP(a, b) do { \\
    typeof(a) temp = (a); \\
    (a) = (b); \\
    (b) = temp; \\
} while(0)

int main() {
    int x = 10, y = 20;
    SWAP(x, y);  // Works with any type
    
    COMPILE_TIME_ASSERT(sizeof(int) == 4, "int must be 4 bytes");
    
    int* ptr = malloc(sizeof(int));
    SAFE_FREE(ptr);  // ptr set to NULL automatically
    
    return 0;
}
\`\`\`

---

## 🔧 Preprocessor Operators

### Stringification Operator (#)

\`\`\`c
#include <stdio.h>

#define PRINT_VAR(var) printf(#var " = %d\\n", var)
#define CREATE_STRING(str) #str

#define PRINT_TYPE(var) printf("Type of " #var ": %s\\n", \\
                              sizeof(var) == 1 ? "char" : \\
                              sizeof(var) == 4 ? "int" : "unknown")

int main() {
    int counter = 42;
    PRINT_VAR(counter);  // Expands to: printf("counter" " = %d\\n", counter)
    
    printf("Hello %s\\n", CREATE_STRING(World));
    
    PRINT_TYPE(counter);
    
    return 0;
}
\`\`\`

### Token Pasting Operator (##)

\`\`\`c
#include <stdio.h>

// Create identifiers
#define DECLARE_VAR(type, name) type var_##name
#define INIT_VAR(name, value) var_##name = value
#define PRINT_VAR(name) printf(#name ": %d\\n", var_##name)

// Generic functions
#define MAKE_GETTER(type, name) \\
    type get_##name(void) { return name; }

#define MAKE_SETTER(type, name) \\
    void set_##name(type value) { name = value; }

// Enum generation
#define MAKE_ENUM(name, ...) \\
    typedef enum { \\
        __VA_ARGS__ \\
    } name; \\
    \\
    const char* name##_to_string(name value) { \\
        static const char* strings[] = { \\
            #__VA_ARGS__ \\
        }; \\
        return strings[value]; \\
    }

int main() {
    // Variable creation
    DECLARE_VAR(int, counter);
    INIT_VAR(counter, 10);
    PRINT_VAR(counter);
    
    // Function generation
    static int global_value = 42;
    MAKE_GETTER(int, global_value);
    MAKE_SETTER(int, global_value);
    
    printf("Value: %d\\n", get_global_value());
    set_global_value(100);
    printf("New value: %d\\n", get_global_value());
    
    // Enum generation
    MAKE_ENUM(Color, RED, GREEN, BLUE);
    
    Color c = GREEN;
    printf("Color: %s\\n", Color_to_string(c));
    
    return 0;
}
\`\`\`

---

## 🧪 Advanced Macro Examples

### Generic Container Macros

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

// Generic array macros
#define DECLARE_ARRAY(type, name, capacity) \\
    type name##_array[capacity]; \\
    size_t name##_size = 0; \\
    size_t name##_capacity = capacity;

#define ARRAY_ADD(name, value) \\
    do { \\
        if (name##_size < name##_capacity) { \\
            name##_array[name##_size++] = value; \\
        } \\
    } while(0)

#define ARRAY_FOREACH(name, var) \\
    for (size_t i = 0; i < name##_size && ((var) = name##_array[i], 1); i++)

// Generic stack
#define DECLARE_STACK(type, name, max_size) \\
    type name##_stack[max_size]; \\
    int name##_top = -1;

#define STACK_PUSH(name, value) \\
    do { \\
        if (name##_top < (int)(sizeof(name##_stack)/sizeof(name##_stack[0]) - 1)) { \\
            name##_stack[++name##_top] = value; \\
        } \\
    } while(0)

#define STACK_POP(name, result_ptr) \\
    ((name##_top >= 0) ? (*(result_ptr) = name##_stack[name##_top--], 1) : 0)

#define STACK_IS_EMPTY(name) (name##_top < 0)

int main() {
    // Integer array
    DECLARE_ARRAY(int, numbers, 10);
    
    ARRAY_ADD(numbers, 10);
    ARRAY_ADD(numbers, 20);
    ARRAY_ADD(numbers, 30);
    
    printf("Numbers: ");
    int num;
    ARRAY_FOREACH(numbers, num) {
        printf("%d ", num);
    }
    printf("\\n");
    
    // Character stack
    DECLARE_STACK(char, chars, 5);
    
    STACK_PUSH(chars, 'H');
    STACK_PUSH(chars, 'E');
    STACK_PUSH(chars, 'L');
    STACK_PUSH(chars, 'L');
    STACK_PUSH(chars, 'O');
    
    printf("Reversed: ");
    char c;
    while (STACK_POP(chars, &c)) {
        printf("%c", c);
    }
    printf("\\n");
    
    return 0;
}
\`\`\`

### Advanced Logging System

\`\`\`c
#include <stdio.h>
#include <time.h>

// Log levels
typedef enum {
    LOG_DEBUG,
    LOG_INFO,
    LOG_WARN,
    LOG_ERROR,
    LOG_FATAL
} LogLevel;

// Configuration
#ifndef LOG_LEVEL
    #define LOG_LEVEL LOG_INFO
#endif

#define LOG_ENABLED(level) ((level) >= LOG_LEVEL)

// Timestamp macro
#define TIMESTAMP() ({ \\
    time_t t = time(NULL); \\
    ctime(&t); \\
})

// Generic logging macro
#define LOG(level, format, ...) do { \\
    if (LOG_ENABLED(level)) { \\
        const char* level_names[] = {"DEBUG", "INFO", "WARN", "ERROR", "FATAL"}; \\
        char* timestamp = TIMESTAMP(); \\
        timestamp[strlen(timestamp) - 1] = '\\0'; /* Remove newline */ \\
        fprintf(stderr, "[%s] %s %s:%d: " format "\\n", \\
               timestamp, level_names[level], __FILE__, __LINE__, ##__VA_ARGS__); \\
    } \\
} while(0)

// Convenience macros
#define LOG_DEBUG(...) LOG(LOG_DEBUG, __VA_ARGS__)
#define LOG_INFO(...)  LOG(LOG_INFO,  __VA_ARGS__)
#define LOG_WARN(...)  LOG(LOG_WARN,  __VA_ARGS__)
#define LOG_ERROR(...) LOG(LOG_ERROR, __VA_ARGS__)
#define LOG_FATAL(...) LOG(LOG_FATAL, __VA_ARGS__)

// Conditional logging
#define LOG_IF(condition, level, ...) \\
    do { \\
        if ((condition) && LOG_ENABLED(level)) { \\
            LOG(level, __VA_ARGS__); \\
        } \\
    } while(0)

// Performance timing
#define TIME_BLOCK(name) \\
    for (clock_t _start = clock(), _end = 0; \\
         _end == 0; \\
         LOG_INFO("%s took %.3f seconds", name, (double)(_end = clock()) / CLOCKS_PER_SEC - (double)_start / CLOCKS_PER_SEC))

int main() {
    LOG_INFO("Program started");
    
    int x = 42;
    LOG_DEBUG("Variable x initialized to %d", x);
    
    LOG_IF(x > 40, LOG_WARN, "x is getting large: %d", x);
    
    {
        TIME_BLOCK("some computation") {
            // Simulate work
            for (volatile int i = 0; i < 1000000; i++) {
                x += i % 10;
            }
        }
    }
    
    LOG_INFO("Program finished with x = %d", x);
    
    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Function-like macros** can take parameters and expand to complex code
2. **Variadic macros** accept variable numbers of arguments
3. **Always parenthesize** parameters and expressions
4. **Use do-while(0)** for multi-statement macros
5. **Macros are faster** but less type-safe than functions
6. **Stringification (#)** converts tokens to strings
7. **Token pasting (##)** combines tokens into identifiers
8. **Debug macros** by examining preprocessed output

---

## 🚀 Preview: Conditional Compilation

In the next topic, you'll learn about:
- **#if, #ifdef, #ifndef** directives for conditional compilation
- **#else, #elif, #endif** for complex conditions
- **defined()** operator and predefined macros
- **Platform-specific code** and feature toggles
- **Debug vs release** build configurations

**Conditional compilation enables platform-independent and configurable code!** 🔀

