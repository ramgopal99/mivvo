import { SubLesson } from '../../../data/lessonsData';

export const topic_9_1: SubLesson = {
  id: 9.1,
  title: 'Introduction to the Preprocessor',
  status: 'completed',
  content: `# 🔧 Introduction to the Preprocessor

Discover the first phase of C compilation that transforms your source code before the actual compilation begins.

---

## 🎯 What is the Preprocessor?

### The Preprocessor's Role

**The preprocessor is a text processing tool that modifies your C source code before the compiler sees it.**

\`\`\`c
// Source code (what you write)
#include <stdio.h>
#define PI 3.14159

int main() {
    printf("Pi is approximately %.5f\\n", PI);
    return 0;
}
\`\`\`

**After preprocessing:**
\`\`\`c
// Preprocessed code (what the compiler sees)
// ... contents of stdio.h inserted here ...

int main() {
    printf("Pi is approximately %.5f\\n", 3.14159);
    return 0;
}
\`\`\`

### Why "Preprocessor"?

The preprocessor runs **before** the actual compiler:
1. **Source Code** → 2. **Preprocessor** → 3. **Compiler** → 4. **Assembler** → 5. **Linker** → 6. **Executable**

---

## 📝 Preprocessor Directives

### What are Directives?

**Preprocessor directives are special commands that begin with `#` and control how the preprocessor modifies your code.**

\`\`\`c
// All preprocessor directives start with #
#include <stdio.h>    // File inclusion
#define PI 3.14159    // Macro definition
#ifdef DEBUG         // Conditional compilation
    printf("Debug mode\\n");
#endif
\`\`\`

### Directive Syntax Rules

1. **Must start with `#`** at the beginning of a line
2. **No semicolon** at the end (unlike C statements)
3. **Case sensitive** (`#define` ≠ `#Define`)
4. **Can span multiple lines** with backslash continuation
5. **Comments allowed** on directive lines

\`\`\`c
// ✅ Correct
#define MAX_SIZE 100
#include <stdio.h>

// ❌ Wrong - semicolon
#define MAX_SIZE 100;

// ✅ Multi-line directive
#define LONG_MACRO(a, b, c) \\
    do { \\
        printf("%d %d %d\\n", a, b, c); \\
    } while(0)

// ✅ Comment allowed
#define DEBUG 1  // Enable debug mode
\`\`\`

---

## 🔄 Phases of C Compilation

### The Complete Build Process

#### Phase 1: Preprocessing
- **Input**: Source code with preprocessor directives
- **Output**: Modified source code (translation unit)
- **Tools**: `cpp`, `gcc -E`, `cl /P`

**Commands to see preprocessing output:**
\`\`\`bash
# GCC
gcc -E program.c -o program.i

# Microsoft Visual C++
cl /P program.c

# Just preprocessor
cpp program.c
\`\`\`

#### Phase 2: Compilation
- **Input**: Preprocessed source code
- **Output**: Assembly code
- **Tools**: `gcc -S`, `cl /S`

#### Phase 3: Assembly
- **Input**: Assembly code
- **Output**: Object files (.o, .obj)
- **Tools**: `as`, `nasm`

#### Phase 4: Linking
- **Input**: Object files + libraries
- **Output**: Executable program
- **Tools**: `ld`, `gcc` (final link)

### Practical Demonstration

\`\`\`c
// Create a simple program
#include <stdio.h>
#define VERSION "1.0"
#define DEBUG

int main() {
    printf("Program version: %s\\n", VERSION);
    
#ifdef DEBUG
    printf("Debug mode enabled\\n");
#endif
    
    return 0;
}
\`\`\`

**Preprocessed output (simplified):**
\`\`\`c
// Contents of stdio.h inserted here...

int main() {
    printf("Program version: %s\\n", "1.0");
    
    printf("Debug mode enabled\\n");
    
    return 0;
}
\`\`\`

---

## 🛠️ Common Preprocessor Directives

### File Inclusion

\`\`\`c
// Include standard library headers
#include <stdio.h>      // System header
#include "myheader.h"   // User header

// Include another source file (uncommon)
#include "utils.c"
\`\`\`

### Macro Definition

\`\`\`c
// Object-like macros
#define PI 3.14159
#define MAX_BUFFER_SIZE 1024
#define ERROR_MESSAGE "An error occurred"

// Function-like macros
#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define PRINT_INT(x) printf("%d\\n", x)
\`\`\`

### Conditional Compilation

\`\`\`c
// Basic conditional compilation
#ifdef DEBUG
    printf("Debug: x = %d\\n", x);
#endif

// If-else conditional
#if defined(WINDOWS)
    system("cls");
#elif defined(UNIX)
    system("clear");
#else
    printf("\\n\\n");
#endif

// Version checking
#if __STDC_VERSION__ >= 201112L
    // C11 features available
#endif
\`\`\`

### Other Directives

\`\`\`c
// Undefine a macro
#undef PI

// Line control (for debugging/error messages)
#line 100 "original_file.c"

// Error directive (compilation stops)
#error "This feature is not implemented"

// Warning directive (if supported)
#warning "This code is deprecated"

// Pragma (compiler-specific directives)
#pragma once        // Include guard alternative
#pragma pack(1)     // Structure packing
\`\`\`

---

## 🎮 Practical Preprocessor Examples

### Debug Build System

\`\`\`c
#include <stdio.h>

// Define debug level
#define DEBUG_LEVEL 2

// Debug macros
#if DEBUG_LEVEL >= 1
    #define DEBUG_PRINT(fmt, ...) printf("DEBUG: " fmt, ##__VA_ARGS__)
#else
    #define DEBUG_PRINT(fmt, ...)
#endif

#if DEBUG_LEVEL >= 2
    #define DEBUG_VERBOSE(fmt, ...) printf("VERBOSE: " fmt, ##__VA_ARGS__)
#else
    #define DEBUG_VERBOSE(fmt, ...)
#endif

#define ASSERT(condition, message) \\
    do { \\
        if (!(condition)) { \\
            fprintf(stderr, "ASSERTION FAILED: %s\\n", message); \\
            fprintf(stderr, "File: %s, Line: %d\\n", __FILE__, __LINE__); \\
            exit(1); \\
        } \\
    } while(0)

int main() {
    int x = 42;
    
    DEBUG_PRINT("Starting program\\n");
    DEBUG_VERBOSE("Variable x initialized to %d\\n", x);
    
    ASSERT(x > 0, "x must be positive");
    
    DEBUG_PRINT("Program completed successfully\\n");
    
    return 0;
}
\`\`\`

### Platform Detection

\`\`\`c
// Platform detection macros
#if defined(_WIN32) || defined(_WIN64)
    #define PLATFORM_WINDOWS
    #define PATH_SEPARATOR "\\\\"
#elif defined(__APPLE__)
    #define PLATFORM_MACOS
    #define PATH_SEPARATOR "/"
#elif defined(__linux__)
    #define PLATFORM_LINUX
    #define PATH_SEPARATOR "/"
#else
    #define PLATFORM_UNKNOWN
    #define PATH_SEPARATOR "/"
#endif

// Architecture detection
#if defined(__x86_64__) || defined(_M_X64)
    #define ARCHITECTURE_64BIT
#else
    #define ARCHITECTURE_32BIT
#endif

// Compiler detection
#if defined(__GNUC__)
    #define COMPILER_GCC
    #define COMPILER_VERSION_MAJOR __GNUC__
    #define COMPILER_VERSION_MINOR __GNUC_MINOR__
#elif defined(_MSC_VER)
    #define COMPILER_MSVC
    #define COMPILER_VERSION _MSC_VER
#endif

#include <stdio.h>

int main() {
    printf("Platform: ");
    
#ifdef PLATFORM_WINDOWS
    printf("Windows\\n");
#elif defined(PLATFORM_MACOS)
    printf("macOS\\n");
#elif defined(PLATFORM_LINUX)
    printf("Linux\\n");
#else
    printf("Unknown\\n");
#endif

    printf("Architecture: ");
#ifdef ARCHITECTURE_64BIT
    printf("64-bit\\n");
#else
    printf("32-bit\\n");
#endif

    printf("Compiler: ");
#ifdef COMPILER_GCC
    printf("GCC %d.%d\\n", COMPILER_VERSION_MAJOR, COMPILER_VERSION_MINOR);
#elif defined(COMPILER_MSVC)
    printf("MSVC %d\\n", COMPILER_VERSION);
#else
    printf("Unknown\\n");
#endif

    printf("Path separator: '%s'\\n", PATH_SEPARATOR);

    return 0;
}
\`\`\`

### Code Generation Macros

\`\`\`c
#include <stdio.h>

// Simple getter/setter generation
#define DECLARE_PROPERTY(type, name) \\
    type name; \\
    type get_##name(void) { return name; } \\
    void set_##name(type value) { name = value; }

// Array utilities
#define ARRAY_SIZE(arr) (sizeof(arr) / sizeof((arr)[0]))
#define ARRAY_FOREACH(item, array) \\
    for (size_t i = 0, size = ARRAY_SIZE(array); \\
         i < size && ((item) = array[i], 1); \\
         i++)

// String utilities
#define STRINGIFY(x) #x
#define TO_STRING(x) STRINGIFY(x)

// Concatenation
#define CONCAT(a, b) a ## b
#define MAKE_UNIQUE_NAME(prefix) CONCAT(prefix, __LINE__)

// Function attributes (GCC)
#ifdef __GNUC__
    #define UNUSED __attribute__((unused))
    #define NORETURN __attribute__((noreturn))
#else
    #define UNUSED
    #define NORETURN
#endif

// Example usage
struct Person {
    DECLARE_PROPERTY(char*, name)
    DECLARE_PROPERTY(int, age)
};

void UNUSED example_function(void) {
    printf("This function is marked as unused\\n");
}

NORETURN void fatal_error(const char* message) {
    fprintf(stderr, "Fatal error: %s\\n", message);
    exit(1);
}

int main() {
    // Property usage
    struct Person person;
    set_name(&person, "John Doe");
    set_age(&person, 30);
    
    printf("Name: %s\\n", get_name(&person));
    printf("Age: %d\\n", get_age(&person));
    
    // Array utilities
    int numbers[] = {1, 2, 3, 4, 5};
    int item;
    
    printf("Array elements: ");
    ARRAY_FOREACH(item, numbers) {
        printf("%d ", item);
    }
    printf("\\n");
    
    // String conversion
    printf("The value of PI is: %s\\n", TO_STRING(3.14159));
    
    // Unique names
    int MAKE_UNIQUE_NAME(temp_var) = 42;
    printf("Unique variable: %d\\n", temp_var);
    
    return 0;
}
\`\`\`

---

## 🎯 Preprocessor Best Practices

### 1. Use Include Guards

\`\`\`c
// ❌ Bad - no include guards
// myheader.h
void function1(void);
void function2(void);

// main.c
#include "myheader.h"
#include "myheader.h"  // Duplicate inclusion!

// ✅ Good - include guards
// myheader.h
#ifndef MYHEADER_H
#define MYHEADER_H

void function1(void);
void function2(void);

#endif // MYHEADER_H
\`\`\`

### 2. Parenthesize Macro Parameters

\`\`\`c
// ❌ Bad - no parentheses
#define SQUARE(x) x * x

int result = SQUARE(3 + 1);  // Expands to: 3 + 1 * 3 + 1 = 7

// ✅ Good - parentheses around parameters
#define SQUARE(x) ((x) * (x))

int result = SQUARE(3 + 1);  // Expands to: ((3 + 1) * (3 + 1)) = 16
\`\`\`

### 3. Use do-while(0) for Multi-statement Macros

\`\`\`c
// ❌ Bad - semicolon issues
#define SWAP(a, b) { int temp = a; a = b; b = temp; }

if (condition)
    SWAP(x, y);  // Only the first statement is conditional!
else
    printf("No swap\\n");

// ✅ Good - do-while(0) wrapper
#define SWAP(a, b) do { \\
    int temp = a; \\
    a = b; \\
    b = temp; \\
} while(0)

if (condition)
    SWAP(x, y);  // Entire macro is conditional
else
    printf("No swap\\n");
\`\`\`

### 4. Check for Macro Existence

\`\`\`c
// Check if macro is defined
#ifdef DEBUG
    printf("Debug mode\\n");
#endif

// Check if macro is not defined
#ifndef RELEASE
    printf("Not release mode\\n");
#endif

// Check if macro has a specific value
#if MAX_SIZE > 1000
    printf("Large buffer\\n");
#endif
\`\`\`

---

## 🧪 Complete Preprocessor Example

### Build Configuration System

\`\`\`c
// config.h - Configuration header
#ifndef CONFIG_H
#define CONFIG_H

// Version information
#define VERSION_MAJOR 1
#define VERSION_MINOR 2
#define VERSION_PATCH 3

#define VERSION_STRING TO_STRING(VERSION_MAJOR) "." \\
                       TO_STRING(VERSION_MINOR) "." \\
                       TO_STRING(VERSION_PATCH)

// Build type detection
#if defined(NDEBUG)
    #define BUILD_TYPE "Release"
    #define ENABLE_DEBUG 0
#else
    #define BUILD_TYPE "Debug"
    #define ENABLE_DEBUG 1
#endif

// Feature flags
#define ENABLE_LOGGING 1
#define ENABLE_NETWORK 1
#define ENABLE_GUI 0

// Platform-specific configuration
#ifdef _WIN32
    #define PLATFORM "Windows"
    #define PATH_SEPARATOR "\\\\"
    #define LINE_ENDING "\\r\\n"
#elif defined(__APPLE__)
    #define PLATFORM "macOS"
    #define PATH_SEPARATOR "/"
    #define LINE_ENDING "\\n"
#elif defined(__linux__)
    #define PLATFORM "Linux"
    #define PATH_SEPARATOR "/"
    #define LINE_ENDING "\\n"
#else
    #define PLATFORM "Unknown"
    #define PATH_SEPARATOR "/"
    #define LINE_ENDING "\\n"
#endif

// Compiler detection
#if defined(__GNUC__)
    #define COMPILER "GCC"
    #define COMPILER_VERSION_MAJOR __GNUC__
    #define COMPILER_VERSION_MINOR __GNUC_MINOR__
    #define COMPILER_VERSION_PATCH __GNUC_PATCHLEVEL__
#elif defined(_MSC_VER)
    #define COMPILER "MSVC"
    #define COMPILER_VERSION_MAJOR (_MSC_VER / 100)
    #define COMPILER_VERSION_MINOR (_MSC_VER % 100)
    #define COMPILER_VERSION_PATCH 0
#else
    #define COMPILER "Unknown"
    #define COMPILER_VERSION_MAJOR 0
    #define COMPILER_VERSION_MINOR 0
    #define COMPILER_VERSION_PATCH 0
#endif

// Utility macros
#define TO_STRING(x) #x
#define CONCAT(a, b) a ## b
#define UNUSED_PARAM(x) (void)(x)

// Logging macros
#if ENABLE_LOGGING
    #define LOG_INFO(fmt, ...) printf("[INFO] " fmt "\\n", ##__VA_ARGS__)
    #define LOG_ERROR(fmt, ...) fprintf(stderr, "[ERROR] " fmt "\\n", ##__VA_ARGS__)
    #define LOG_DEBUG(fmt, ...) do { \\
        if (ENABLE_DEBUG) \\
            printf("[DEBUG] %s:%d: " fmt "\\n", __FILE__, __LINE__, ##__VA_ARGS__); \\
    } while(0)
#else
    #define LOG_INFO(fmt, ...)
    #define LOG_ERROR(fmt, ...)
    #define LOG_DEBUG(fmt, ...)
#endif

// Assertion macro
#if ENABLE_DEBUG
    #define ASSERT(condition) \\
        do { \\
            if (!(condition)) { \\
                LOG_ERROR("Assertion failed: %s at %s:%d", \\
                         #condition, __FILE__, __LINE__); \\
                abort(); \\
            } \\
        } while(0)
#else
    #define ASSERT(condition) ((void)0)
#endif

#endif // CONFIG_H
\`\`\`

\`\`\`c
// main.c - Main program
#include "config.h"
#include <stdio.h>
#include <stdlib.h>

int main() {
    printf("Program Information:\\n");
    printf("  Version: %s\\n", VERSION_STRING);
    printf("  Build: %s\\n", BUILD_TYPE);
    printf("  Platform: %s\\n", PLATFORM);
    printf("  Compiler: %s %d.%d.%d\\n", COMPILER,
           COMPILER_VERSION_MAJOR, COMPILER_VERSION_MINOR, COMPILER_VERSION_PATCH);
    printf("  Path separator: '%s'\\n", PATH_SEPARATOR);
    printf("  Line ending: '%s'\\n", LINE_ENDING);

    printf("\\nFeatures:\\n");
    printf("  Debug: %s\\n", ENABLE_DEBUG ? "Enabled" : "Disabled");
    printf("  Logging: %s\\n", ENABLE_LOGGING ? "Enabled" : "Disabled");
    printf("  Network: %s\\n", ENABLE_NETWORK ? "Enabled" : "Disabled");
    printf("  GUI: %s\\n", ENABLE_GUI ? "Enabled" : "Disabled");

    LOG_INFO("Program started successfully");
    LOG_DEBUG("Debug information: x = %d", 42);

    // Test assertion
    int x = 10;
    ASSERT(x > 5);  // Should pass
    LOG_INFO("All assertions passed");

    // Test unused parameter macro
    void func(int UNUSED_PARAM(param)) {
        LOG_DEBUG("Function called with parameter %d", param);
    }

    func(123);

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Preprocessor** runs before compilation and modifies source code
2. **Directives** start with `#` and control code transformation
3. **Macros** can define constants, functions, and complex expressions
4. **Conditional compilation** enables platform-specific and debug code
5. **Include guards** prevent multiple header inclusion
6. **Parenthesize** macro parameters to avoid operator precedence issues
7. **Use do-while(0)** for multi-statement macros

---

## 🚀 Preview: #define and #undef

In the next topic, you'll learn about:
- **Object-like macros** for constants and simple substitutions
- **Function-like macros** with parameters
- **Macro expansion** rules and evaluation order
- **#undef directive** for removing macro definitions
- **Macro pitfalls** and best practices

**Macros are powerful but dangerous - master them carefully!** ⚡

