import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_6: SubLesson = {
  id: "2.6",
  title: 'Preprocessor Directives & Macros',
  status: 'completed',
  content: `\`# ⚙️ Preprocessor Directives & Macros

The C++ preprocessor is a powerful tool that runs before your code is compiled. It processes directives (commands starting with \`#\`) and can transform your source code through macros, conditional compilation, and file inclusion. Understanding the preprocessor is essential for effective C++ programming.

---

## 🔧 What is the Preprocessor?

### **Preprocessing Phase**
\`\`\`cpp
// Source code (hello.cpp)
#include <iostream>
#define MESSAGE "Hello, World!"

int main() {
    std::cout << MESSAGE << std::endl;
    return 0;
}

// After preprocessing:
//
// int main() {
//     std::cout << "Hello, World!" << std::endl;
//     return 0;
// }
\`\`\`

### **When Preprocessing Happens**
1. **Source code** → Preprocessor
2. **Preprocessed code** → Compiler
3. **Object code** → Linker
4. **Executable** → Final program

---

## 📁 File Inclusion

### **#include Directive**

#### **Standard Library Headers**
\`\`\`cpp
#include <iostream>     // Standard library (system paths)
#include <string>       // String class
#include <vector>       // Dynamic arrays
#include <algorithm>    // Algorithms
#include <cmath>        // Math functions
\`\`\`

#### **User-Defined Headers**
\`\`\`cpp
#include "myheader.h"   // User files (project paths)
#include "utils/math.h" // Subdirectories
\`\`\`

### **Include Guards**
\`\`\`cpp
// math_functions.h
#ifndef MATH_FUNCTIONS_H
#define MATH_FUNCTIONS_H

// Header content here
double add(double a, double b);

#endif // MATH_FUNCTIONS_H
\`\`\`

#### **Modern Include Guards (C++17)**
\`\`\`cpp
// math_functions.h
#pragma once

// Header content here
double add(double a, double b);
\`\`\`

---

## 🔧 Macro Definitions

### **Object-like Macros**
\`\`\`cpp
#define PI 3.14159
#define MAX_BUFFER_SIZE 1024
#define DEBUG_MODE

int main() {
    double area = PI * radius * radius;

    #ifdef DEBUG_MODE
        std::cout << "Debug: Area calculated" << std::endl;
    #endif

    return 0;
}
\`\`\`

### **Function-like Macros**
\`\`\`cpp
#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define MIN(a, b) ((a) < (b) ? (a) : (b))

int main() {
    int x = 5;
    int result = SQUARE(x);  // ((5) * (5)) = 25

    int larger = MAX(10, 20);  // ((10) > (20) ? (10) : (20)) = 20

    return 0;
}
\`\`\`

### **Multi-line Macros**
\`\`\`cpp
#define LOG_ERROR(msg) \\
    do { \\
        std::cerr << "ERROR [" << __FILE__ << ":" << __LINE__ << "] " \\
                  << msg << std::endl; \\
    } while(0)

// Usage
LOG_ERROR("Something went wrong!");
\`\`\`

---

## ❓ Conditional Compilation

### **#ifdef, #ifndef, #endif**
\`\`\`cpp
#define DEBUG 1

void debugFunction() {
    #ifdef DEBUG
        std::cout << "Debug mode enabled" << std::endl;
    #endif
}

void releaseFunction() {
    #ifndef DEBUG
        std::cout << "Release mode" << std::endl;
    #endif
}
\`\`\`

### **#if, #elif, #else**
\`\`\`cpp
#define VERSION 2

void versionSpecificCode() {
    #if VERSION == 1
        std::cout << "Version 1 features" << std::endl;
    #elif VERSION == 2
        std::cout << "Version 2 features" << std::endl;
    #else
        std::cout << "Unknown version" << std::endl;
    #endif
}
\`\`\`

### **#defined() Operator**
\`\`\`cpp
#if defined(DEBUG) && defined(WINDOWS)
    // Code for debug builds on Windows
#endif

// Equivalent to:
#ifdef DEBUG
    #ifdef WINDOWS
        // Code for debug builds on Windows
    #endif
#endif
\`\`\`

---

## 🔍 Predefined Macros

### **Standard Predefined Macros**
\`\`\`cpp
#include <iostream>

int main() {
    std::cout << "File: " << __FILE__ << std::endl;
    std::cout << "Line: " << __LINE__ << std::endl;
    std::cout << "Function: " << __func__ << std::endl;  // C++11
    std::cout << "Date: " << __DATE__ << std::endl;
    std::cout << "Time: " << __TIME__ << std::endl;

    // C++ standard version
    std::cout << "C++ version: " << __cplusplus << std::endl;

    return 0;
}
\`\`\`

### **Common Predefined Macros**
| Macro | Description | Example Output |
|-------|-------------|----------------|
| \`__FILE__\` | Current source file name | \`main.cpp\` |
| \`__LINE__\` | Current line number | \`42\` |
| \`__func__\` | Current function name (C++11) | \`main\` |
| \`__DATE__\` | Compilation date | \`Jan 13 2026\` |
| \`__TIME__\` | Compilation time | \`14:30:00\` |
| \`__cplusplus\` | C++ standard version | \`202002\` (C++20) |

### **Compiler-Specific Macros**
\`\`\`cpp
#ifdef _MSC_VER
    // Microsoft Visual C++
    #pragma message("Compiling with MSVC")
#elif defined(__GNUC__)
    // GCC
    #warning "Compiling with GCC"
#elif defined(__clang__)
    // Clang
    #pragma clang diagnostic push
#endif
\`\`\`

---

## 🔧 Macro Best Practices

### **Parentheses in Macros**
\`\`\`cpp
// ❌ Wrong: operator precedence issues
#define SQUARE(x) x * x

int result = SQUARE(3 + 2);  // 3 + 2 * 3 + 2 = 11 (wrong!)

// ✅ Correct: proper parentheses
#define SQUARE(x) ((x) * (x))

int result = SQUARE(3 + 2);  // ((3 + 2) * (3 + 2)) = 25 (correct!)
\`\`\`

### **Avoid Side Effects in Macros**
\`\`\`cpp
// ❌ Dangerous: side effects
#define MAX(a, b) ((a) > (b) ? (a) : (b))

int x = 5, y = 10;
int result = MAX(x++, y++);  // x or y incremented twice!

// ✅ Safe: use inline functions instead
inline int max(int a, int b) {
    return (a > b) ? a : b;
}
\`\`\`

### **Multi-statement Macros**
\`\`\`cpp
// ❌ Wrong: semicolon issues
#define LOG(msg) \\
    std::cout << msg << std::endl

if (error)
    LOG("Error occurred");  // Only first line executed in if

// ✅ Correct: do-while wrapper
#define LOG(msg) \\
    do { \\
        std::cout << msg << std::endl; \\
    } while(0)

if (error)
    LOG("Error occurred");  // Full macro executed
\`\`\`

---

## 🔄 Undefining Macros

### **#undef Directive**
\`\`\`cpp
#define DEBUG 1

#ifdef DEBUG
    void debugFunction() {}
#endif

#undef DEBUG  // Remove macro definition

// DEBUG is no longer defined
#ifndef DEBUG
    void releaseFunction() {}
#endif
\`\`\`

---

## 🎨 Advanced Preprocessor Techniques

### **Stringification (#)**
\`\`\`cpp
#define STRINGIFY(x) #x
#define TO_STRING(x) STRINGIFY(x)

#define VERSION_MAJOR 1
#define VERSION_MINOR 2

std::cout << "Version: " << TO_STRING(VERSION_MAJOR) << "."
                              << TO_STRING(VERSION_MINOR) << std::endl;
// Output: Version: 1.2
\`\`\`

### **Token Pasting (##)**
\`\`\`cpp
#define DECLARE_VARIABLE(type, name) type variable_##name
#define CREATE_FUNCTION(name) void function_##name() { std::cout << #name << std::endl; }

DECLARE_VARIABLE(int, counter);  // int variable_counter;
CREATE_FUNCTION(hello);          // void function_hello() { ... }

int main() {
    variable_counter = 42;
    function_hello();  // Output: hello
    return 0;
}
\`\`\`

### **Variadic Macros (C++11)**
\`\`\`cpp
#define LOG(...) \\
    do { \\
        std::cout << "[" << __func__ << "] "; \\
        log_helper(__VA_ARGS__); \\
    } while(0)

void log_helper() {
    std::cout << std::endl;
}

template<typename T, typename... Args>
void log_helper(T first, Args... args) {
    std::cout << first;
    log_helper(args...);
}

// Usage
LOG("Value: ", 42, " Status: ", "OK");
// Output: [main] Value: 42 Status: OK
\`\`\`

---

## 🔧 Practical Applications

### **Debug Logging**
\`\`\`cpp
#ifdef DEBUG
    #define LOG_DEBUG(msg) \\
        do { \\
            std::cout << "[DEBUG] " << __FILE__ << ":" << __LINE__ \\
                      << " " << msg << std::endl; \\
        } while(0)
#else
    #define LOG_DEBUG(msg) do { } while(0)
#endif

int main() {
    LOG_DEBUG("Starting application");
    // In debug builds: [DEBUG] main.cpp:15 Starting application
    // In release builds: nothing printed
    return 0;
}
\`\`\`

### **Platform-Specific Code**
\`\`\`cpp
// Platform detection
#if defined(_WIN32) || defined(_WIN64)
    #define PLATFORM_WINDOWS
    #define PATH_SEPARATOR "\\\\"
#elif defined(__APPLE__)
    #define PLATFORM_MACOS
    #define PATH_SEPARATOR "/"
#elif defined(__linux__)
    #define PLATFORM_LINUX
    #define PATH_SEPARATOR "/"
#endif

// Platform-specific includes
#ifdef PLATFORM_WINDOWS
    #include <windows.h>
#elif defined(PLATFORM_MACOS)
    #include <unistd.h>
#endif

// Cross-platform code
std::string getPathSeparator() {
    return PATH_SEPARATOR;
}
\`\`\`

### **Configuration Management**
\`\`\`cpp
// config.h
#ifndef CONFIG_H
#define CONFIG_H

// Build configuration
#define APP_NAME "MyApplication"
#define APP_VERSION "1.0.0"

// Feature flags
#define ENABLE_LOGGING 1
#define ENABLE_NETWORKING 1
#define MAX_CONNECTIONS 100

// Platform-specific settings
#ifdef PLATFORM_WINDOWS
    #define DEFAULT_CONFIG_PATH "C:\\\\ProgramData\\\\MyApp\\\\config.ini"
#else
    #define DEFAULT_CONFIG_PATH "/etc/myapp/config.ini"
#endif

#endif // CONFIG_H
\`\`\`

### **Compile-Time Assertions**
\`\`\`cpp
// Compile-time size checks
#define STATIC_ASSERT(condition, message) \\
    typedef char static_assertion_##__LINE__[(condition) ? 1 : -1]

STATIC_ASSERT(sizeof(int) == 4, "int must be 4 bytes");
STATIC_ASSERT(sizeof(void*) >= 4, "pointer size too small");

// Better: use static_assert (C++11)
static_assert(sizeof(int) == 4, "int must be 4 bytes");
static_assert(sizeof(void*) >= 4, "pointer size too small");
\`\`\`

---

## 🚨 Common Macro Pitfalls

### **Multiple Evaluation**
\`\`\`cpp
// ❌ Function called multiple times
#define MAX(a, b) ((a) > (b) ? (a) : (b))

int result = MAX(rand(), rand());  // rand() called twice!

// ✅ Safe version
int max(int a, int b) { return a > b ? a : b; }
\`\`\`

### **Operator Precedence**
\`\`\`cpp
// ❌ Wrong precedence
#define DOUBLE(x) x * 2

int result = DOUBLE(3 + 4);  // 3 + 4 * 2 = 11 (wrong!)

// ✅ Correct precedence
#define DOUBLE(x) ((x) * 2)

int result = DOUBLE(3 + 4);  // (3 + 4) * 2 = 14 (correct!)
\`\`\`

### **Semicolon Issues**
\`\`\`cpp
// ❌ Missing semicolon in macro
#define DECLARE_VAR(type, name) type name

int main() {
    DECLARE_VAR(int, x)  // Missing semicolon - compile error!
    return 0;
}

// ✅ Include semicolon in usage
#define DECLARE_VAR(type, name) type name

int main() {
    DECLARE_VAR(int, x);  // Semicolon provided by user
    return 0;
}
\`\`\`

### **Name Collisions**
\`\`\`cpp
// ❌ Short macro names cause conflicts
#define i 42  // Conflicts with loop variables!

for(int i = 0; i < 10; i++) {  // Error!
    // ...
}

// ✅ Use descriptive names
#define MAX_ITERATIONS 42
\`\`\`

---

## 🎯 When to Use Macros vs Alternatives

### **Prefer Alternatives to Macros**

#### **Constants**
\`\`\`cpp
// ❌ Macro constant
#define PI 3.14159

// ✅ Const variable
const double PI = 3.14159;

// ✅ Constexpr (C++11)
constexpr double PI = 3.14159;
\`\`\`

#### **Functions**
\`\`\`cpp
// ❌ Macro function
#define SQUARE(x) ((x) * (x))

// ✅ Inline function
inline int square(int x) { return x * x; }

// ✅ Template function
template<typename T>
T square(T x) { return x * x; }
\`\`\`

#### **Conditional Compilation**
\`\`\`cpp
// ✅ Use macros for conditional compilation
// (macros are still useful here)

// ❌ Don't use macros for runtime conditions
#define CHECK_DEBUG if(DEBUG)  // Bad!

// ✅ Use runtime checks
if (debugEnabled) {  // Good!
    // debug code
}
\`\`\`

---

## 🔍 Preprocessor Output

### **Viewing Preprocessed Code**
\`\`\`bash
# GCC
g++ -E main.cpp -o main.i

# MSVC
cl /E main.cpp > main.i

# Clang
clang -E main.cpp -o main.i
\`\`\`

### **Inspecting Preprocessor Output**
\`\`\`cpp
// Original code
#include <iostream>
#define ADD(a, b) ((a) + (b))

int main() {
    std::cout << ADD(5, 3) << std::endl;
    return 0;
}

// Preprocessed output (simplified)
int main() {
    std::cout << ((5) + (3)) << std::endl;
    return 0;
}
\`\`\`

---

## 📚 Summary

**Key Preprocessor Concepts:**
- **#include** - File inclusion
- **#define** - Macro definition
- **#ifdef/#ifndef** - Conditional compilation
- **#undef** - Remove macro definition
- **Predefined macros** - __FILE__, __LINE__, etc.

**Macro Best Practices:**
- Use parentheses to avoid precedence issues
- Avoid side effects in macro arguments
- Use do-while(0) for multi-statement macros
- Prefer inline functions over function macros
- Use descriptive macro names

**Common Applications:**
- **Include guards** - Prevent multiple inclusion
- **Conditional compilation** - Platform-specific code
- **Debug logging** - Compile-time debug control
- **Configuration management** - Build-time settings

**When to Use Macros:**
- ✅ Conditional compilation
- ✅ Include guards
- ✅ Stringification/token pasting
- ✅ Simple constants (with caution)

**When to Avoid Macros:**
- ❌ Function-like macros (use inline functions)
- ❌ Complex expressions (use functions)
- ❌ Generic programming (use templates)

**Next:** Congratulations! You've completed the basic syntax module. Now let's move to control flow statements to make your programs more dynamic! 🔀\``
};