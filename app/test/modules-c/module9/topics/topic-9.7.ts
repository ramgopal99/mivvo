import { SubLesson } from '../../../data/lessonsData';

export const topic_9_7: SubLesson = {
  id: 9.7,
  title: 'Best Practices',
  status: 'completed',
  content: `# 🏆 Best Practices

Master preprocessor best practices, avoid common pitfalls, and write maintainable, robust preprocessor code.

---

## 🎯 Macro Hygiene

### Parenthesize Everything

\`\`\`c
// ❌ Dangerous - no parentheses
#define SQUARE(x) x * x
#define ADD(a, b) a + b

int result = SQUARE(3 + 1);  // Expands to: 3 + 1 * 3 + 1 = 7 (wrong!)
int sum = ADD(5, 3) * 2;    // Expands to: 5 + 3 * 2 = 11 (wrong!)

// ✅ Safe - fully parenthesized
#define SQUARE(x) ((x) * (x))
#define ADD(a, b) ((a) + (b))

int result = SQUARE(3 + 1);  // Expands to: ((3 + 1) * (3 + 1)) = 16 ✓
int sum = ADD(5, 3) * 2;    // Expands to: ((5 + 3) * 2) = 16 ✓
\`\`\`

### Avoid Side Effects in Macros

\`\`\`c
// ❌ Dangerous - parameter used multiple times
#define MAX(a, b) ((a) > (b) ? (a) : (b))

int get_value() {
    static int counter = 0;
    return counter++;
}

int main() {
    int result = MAX(get_value(), get_value());
    // get_value() called twice! Result may be wrong.
    printf("Result: %d\\n", result);
    return 0;
}

// ✅ Safe - evaluate once
#define MAX(a, b) ({ \\
    typeof(a) _a = (a); \\
    typeof(b) _b = (b); \\
    _a > _b ? _a : _b; \\
})

int main() {
    int result = MAX(get_value(), get_value());
    // Each parameter evaluated once ✓
    printf("Result: %d\\n", result);
    return 0;
}
\`\`\`

---

## 🛡️ Multi-Statement Macros

### Use do-while(0) Pattern

\`\`\`c
// ❌ Problematic - semicolon issues
#define SWAP(a, b) { int temp = a; a = b; b = temp; }

if (condition)
    SWAP(x, y);  // Only first statement conditional!
else
    printf("No swap\\n");

// ✅ Correct - do-while(0) wrapper
#define SWAP(a, b) do { \\
    typeof(a) temp = (a); \\
    (a) = (b); \\
    (b) = temp; \\
} while(0)

if (condition)
    SWAP(x, y);  // Entire macro conditional ✓
else
    printf("No swap\\n");
\`\`\`

### Proper Macro Termination

\`\`\`c
// ✅ Good - explicit return for single expressions
#define CLAMP(value, min, max) \\
    ((value) < (min) ? (min) : (value) > (max) ? (max) : (value))

// ✅ Good - do-while(0) for statements
#define LOG_ERROR(msg) do { \\
    fprintf(stderr, "ERROR: %s\\n", msg); \\
    error_count++; \\
} while(0)

// ❌ Bad - missing semicolon
#define PRINT_INT(x) printf("%d", x)

// ❌ Bad - extra semicolon
#define DECLARE_VAR(type, name) type name;;
\`\`\`

---

## 🔍 Debugging Preprocessor Issues

### View Preprocessed Output

\`\`\`bash
# GCC: Show preprocessed output
gcc -E program.c -o program.i

# GCC: Show macro definitions
gcc -E -dM program.c

# MSVC: Show preprocessed output
cl /P program.c

# View specific file after preprocessing
gcc -E header.h | less
\`\`\`

### Common Debugging Techniques

\`\`\`c
// 1. Use #error to check if code path is taken
#ifdef SOME_CONDITION
    #error "This code path is being compiled"
#endif

// 2. Use #pragma message for compile-time info
#pragma message("Compiling with DEBUG=" TO_STRING(DEBUG))

// 3. Check macro expansion manually
#define DEBUG_EXPAND(x) printf(#x " = %s\\n", TO_STRING(x))

int main() {
    DEBUG_EXPAND(__LINE__);  // Shows expansion
    return 0;
}
\`\`\`

### Debugging Complex Macros

\`\`\`c
// Break complex macros into simpler ones for debugging
#define PART1(x) ((x) + 1)
#define PART2(x) ((x) * 2)
#define COMPLEX(x) PART2(PART1(x))

// Test individual parts
#define TEST_PART1(x) printf("PART1(" #x ") = %d\\n", PART1(x))
#define TEST_PART2(x) printf("PART2(" #x ") = %d\\n", PART2(x))
#define TEST_COMPLEX(x) printf("COMPLEX(" #x ") = %d\\n", COMPLEX(x))

int main() {
    TEST_PART1(5);     // PART1(5) = 6
    TEST_PART2(6);     // PART2(6) = 12
    TEST_COMPLEX(5);   // COMPLEX(5) = 12

    return 0;
}
\`\`\`

---

## 🌐 Cross-Platform Compatibility

### Platform Detection Macros

\`\`\`c
// Comprehensive platform detection
#if defined(_WIN32) || defined(_WIN64) || defined(__WIN32__)
    #define PLATFORM_WINDOWS
    #define PATH_SEPARATOR "\\\\"
    #define LINE_ENDING "\\r\\n"
#elif defined(__APPLE__) || defined(__MACH__)
    #define PLATFORM_APPLE
    #include <TargetConditionals.h>
    #if TARGET_OS_MAC
        #define PLATFORM_MACOS
    #endif
    #define PATH_SEPARATOR "/"
    #define LINE_ENDING "\\n"
#elif defined(__linux__) || defined(__unix__)
    #define PLATFORM_LINUX
    #define PATH_SEPARATOR "/"
    #define LINE_ENDING "\\n"
#elif defined(__FreeBSD__) || defined(__NetBSD__) || defined(__OpenBSD__)
    #define PLATFORM_BSD
    #define PATH_SEPARATOR "/"
    #define LINE_ENDING "\\n"
#else
    #define PLATFORM_UNKNOWN
    #define PATH_SEPARATOR "/"
    #define LINE_ENDING "\\n"
#endif
\`\`\`

### Compiler-Specific Code

\`\`\`c
// Compiler feature detection
#ifdef __GNUC__
    #define COMPILER_GCC (__GNUC__ * 100 + __GNUC_MINOR__)
    #define GCC_VERSION COMPILER_GCC
#endif

#ifdef __clang__
    #define COMPILER_CLANG 1
#endif

#ifdef _MSC_VER
    #define COMPILER_MSVC _MSC_VER
#endif

// Feature availability
#ifndef __cplusplus
    #if __STDC_VERSION__ >= 199901L
        #define HAS_C99 1
    #endif
    #if __STDC_VERSION__ >= 201112L
        #define HAS_C11 1
    #endif
#endif

// Safe attribute usage
#if defined(__GNUC__) || defined(__clang__)
    #define UNUSED __attribute__((unused))
    #define NORETURN __attribute__((noreturn))
    #define PURE __attribute__((pure))
#else
    #define UNUSED
    #define NORETURN
    #define PURE
#endif
\`\`\`

---

## 📋 Include Best Practices

### Header Organization

\`\`\`c
// 1. Include guards or #pragma once
#pragma once

// 2. System includes first (alphabetically)
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 3. Project includes (with paths)
#include "config.h"
#include "utils/math.h"
#include "../shared/common.h"

// 4. Declarations (not definitions)
extern int global_variable;
void public_function(void);

// 5. Type definitions
typedef struct {
    int x, y;
} Point;

// 6. Inline functions
static inline int point_get_x(const Point* p) { return p->x; }

// 7. Macros (if necessary in header)
#define POINT_DEFAULT_X 0
#define POINT_DEFAULT_Y 0
\`\`\`

### Forward Declarations

\`\`\`c
// Use forward declarations to reduce dependencies
struct Database;  // Forward declaration

// Function prototype using incomplete type
void db_connect(struct Database* db);

// Complete definition in implementation
struct Database {
    char filename[256];
    int connection_count;
};
\`\`\`

---

## ⚠️ Common Pitfalls to Avoid

### 1. Multiple Evaluation

\`\`\`c
// ❌ Bad - rand() called multiple times
#define DICE_ROLL() (rand() % 6 + 1)
#define MAX_DICE(a, b) ((a) > (b) ? (a) : (b))

int result = MAX_DICE(DICE_ROLL(), DICE_ROLL());  // Unpredictable!

// ✅ Good - evaluate once
#define MAX_DICE_SAFE(a, b) ({ \\
    int _a = (a), _b = (b); \\
    _a > _b ? _a : _b; \\
})
\`\`\`

### 2. Operator Precedence

\`\`\`c
// ❌ Bad - wrong precedence
#define ADD_BITS(flags, mask) flags | mask
#define TEST_BIT(value, bit) value & bit

// Unexpected behavior:
int result = ADD_BITS(1, 2) & 4;  // ((1 | 2) & 4) = 0, not (1 | (2 & 4))

// ✅ Good - proper parentheses
#define ADD_BITS(flags, mask) ((flags) | (mask))
#define TEST_BIT(value, bit) ((value) & (bit))
\`\`\`

### 3. String Literal Concatenation

\`\`\`c
// ✅ Good - automatic concatenation
#define ERROR_MSG "Error: " "File not found"
#define GREETING "Hello, " NAME "!"

// ❌ Bad - missing spaces
#define BAD_MSG "Error:" "File not found"  // "Error:File not found"

// ✅ Good - use stringification
#define MAKE_MSG(x) "Value: " TO_STRING(x)
\`\`\`

---

## 🧪 Complete Best Practices Example

### Production-Ready Header File

\`\`\`c
// mylib.h - Production-ready header
#pragma once

// Version and metadata
#define MYLIB_VERSION_MAJOR 2
#define MYLIB_VERSION_MINOR 1
#define MYLIB_VERSION_PATCH 0

#define MYLIB_VERSION_STRING \\
    TO_STRING(MYLIB_VERSION_MAJOR) "." \\
    TO_STRING(MYLIB_VERSION_MINOR) "." \\
    TO_STRING(MYLIB_VERSION_PATCH)

// Platform detection
#if defined(_WIN32) || defined(_WIN64)
    #define MYLIB_PLATFORM_WINDOWS
    #define MYLIB_EXPORT __declspec(dllexport)
    #define MYLIB_IMPORT __declspec(dllimport)
    #ifdef MYLIB_BUILDING
        #define MYLIB_API MYLIB_EXPORT
    #else
        #define MYLIB_API MYLIB_IMPORT
    #endif
#else
    #define MYLIB_API
#endif

// Compiler features
#if defined(__GNUC__) || defined(__clang__)
    #define MYLIB_UNUSED __attribute__((unused))
    #define MYLIB_NONNULL __attribute__((nonnull))
    #define MYLIB_PURE __attribute__((pure))
#else
    #define MYLIB_UNUSED
    #define MYLIB_NONNULL
    #define MYLIB_PURE
#endif

// C standard detection
#if defined(__STDC__)
    #if defined(__STDC_VERSION__)
        #if __STDC_VERSION__ >= 201112L
            #define MYLIB_C11
        #elif __STDC_VERSION__ >= 199901L
            #define MYLIB_C99
        #endif
    #endif
#endif

// Feature flags
#define MYLIB_ENABLE_LOGGING 1
#define MYLIB_ENABLE_ASSERTS 1
#define MYLIB_THREAD_SAFE 0

// Requirements check
#ifndef MYLIB_C99
    #error "C99 or later required"
#endif

// Logging macros
#if MYLIB_ENABLE_LOGGING
    #define MYLIB_LOG(level, ...) \\
        mylib_log(level, __FILE__, __LINE__, __VA_ARGS__)
    #define MYLIB_LOG_DEBUG(...) MYLIB_LOG(MYLIB_LOG_DEBUG, __VA_ARGS__)
    #define MYLIB_LOG_INFO(...)  MYLIB_LOG(MYLIB_LOG_INFO,  __VA_ARGS__)
    #define MYLIB_LOG_WARN(...)  MYLIB_LOG(MYLIB_LOG_WARN,  __VA_ARGS__)
    #define MYLIB_LOG_ERROR(...) MYLIB_LOG(MYLIB_LOG_ERROR, __VA_ARGS__)
#else
    #define MYLIB_LOG(...)
    #define MYLIB_LOG_DEBUG(...)
    #define MYLIB_LOG_INFO(...)
    #define MYLIB_LOG_WARN(...)
    #define MYLIB_LOG_ERROR(...)
#endif

// Assertion macros
#if MYLIB_ENABLE_ASSERTS
    #define MYLIB_ASSERT(condition) \\
        do { \\
            if (!(condition)) { \\
                MYLIB_LOG_ERROR("Assertion failed: %s", #condition); \\
                abort(); \\
            } \\
        } while(0)
    #define MYLIB_ASSERT_MSG(condition, msg) \\
        do { \\
            if (!(condition)) { \\
                MYLIB_LOG_ERROR("Assertion failed: %s (%s)", #condition, msg); \\
                abort(); \\
            } \\
        } while(0)
#else
    #define MYLIB_ASSERT(condition)
    #define MYLIB_ASSERT_MSG(condition, msg)
#endif

// Utility macros
#define MYLIB_ARRAY_SIZE(arr) (sizeof(arr) / sizeof((arr)[0]))
#define MYLIB_MIN(a, b) ((a) < (b) ? (a) : (b))
#define MYLIB_MAX(a, b) ((a) > (b) ? (a) : (b))
#define MYLIB_CLAMP(value, min, max) \\
    ((value) < (min) ? (min) : (value) > (max) ? (max) : (value))
#define MYLIB_SWAP(a, b) \\
    do { \\
        typeof(a) temp = (a); \\
        (a) = (b); \\
        (b) = temp; \\
    } while(0)

// Error codes
typedef enum {
    MYLIB_SUCCESS = 0,
    MYLIB_ERROR_MEMORY,
    MYLIB_ERROR_FILE_NOT_FOUND,
    MYLIB_ERROR_INVALID_PARAM,
    MYLIB_ERROR_IO
} MylibError;

// Core types
typedef struct MylibContext MylibContext;

// Function declarations
#ifdef __cplusplus
extern "C" {
#endif

MYLIB_API MylibError mylib_init(MylibContext** ctx);
MYLIB_API void mylib_cleanup(MylibContext* ctx);
MYLIB_API const char* mylib_error_string(MylibError error);

// Utility functions
MYLIB_API MYLIB_PURE int mylib_version_major(void);
MYLIB_API MYLIB_PURE int mylib_version_minor(void);
MYLIB_API MYLIB_PURE int mylib_version_patch(void);

#ifdef __cplusplus
}
#endif

#endif // MYLIB_H
\`\`\`

### Implementation with Best Practices

\`\`\`c
// mylib.c - Implementation following best practices
#include "mylib.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

// Internal constants
#define INTERNAL_BUFFER_SIZE 1024
#define MAX_ERROR_MESSAGE_LENGTH 256

// Internal types
struct MylibContext {
    char error_message[MAX_ERROR_MESSAGE_LENGTH];
    int initialized;
    time_t start_time;
};

// Static variables
static const char* error_messages[] = {
    [MYLIB_SUCCESS] = "Success",
    [MYLIB_ERROR_MEMORY] = "Memory allocation failed",
    [MYLIB_ERROR_FILE_NOT_FOUND] = "File not found",
    [MYLIB_ERROR_INVALID_PARAM] = "Invalid parameter",
    [MYLIB_ERROR_IO] = "I/O operation failed"
};

// Logging levels
typedef enum {
    MYLIB_LOG_DEBUG,
    MYLIB_LOG_INFO,
    MYLIB_LOG_WARN,
    MYLIB_LOG_ERROR
} MylibLogLevel;

// Internal functions
static void set_error(MylibContext* ctx, MylibError error, const char* details) {
    if (ctx != NULL) {
        snprintf(ctx->error_message, sizeof(ctx->error_message),
                "%s: %s", error_messages[error], details ? details : "");
    }
}

static void mylib_log(MylibLogLevel level MYLIB_UNUSED,
                     const char* file, int line,
                     const char* format, ...) {
    #if MYLIB_ENABLE_LOGGING
        const char* level_names[] = {"DEBUG", "INFO", "WARN", "ERROR"};

        fprintf(stderr, "[%s] %s:%d: ", level_names[level], file, line);

        va_list args;
        va_start(args, format);
        vfprintf(stderr, format, args);
        va_end(args);

        fprintf(stderr, "\\n");
    #endif
}

// Public API implementations
MylibError mylib_init(MylibContext** ctx) {
    MYLIB_ASSERT(ctx != NULL);
    MYLIB_ASSERT(*ctx == NULL);

    *ctx = calloc(1, sizeof(MylibContext));
    if (*ctx == NULL) {
        return MYLIB_ERROR_MEMORY;
    }

    (*ctx)->initialized = 1;
    (*ctx)->start_time = time(NULL);

    MYLIB_LOG_INFO("Library initialized successfully");
    return MYLIB_SUCCESS;
}

void mylib_cleanup(MylibContext* ctx) {
    if (ctx != NULL) {
        MYLIB_LOG_INFO("Cleaning up library context");
        free(ctx);
    }
}

const char* mylib_error_string(MylibError error) {
    if (error >= 0 && error < MYLIB_ARRAY_SIZE(error_messages)) {
        return error_messages[error];
    }
    return "Unknown error";
}

// Version functions
int mylib_version_major(void) { return MYLIB_VERSION_MAJOR; }
int mylib_version_minor(void) { return MYLIB_VERSION_MINOR; }
int mylib_version_patch(void) { return MYLIB_VERSION_PATCH; }

// Example usage function
MylibError mylib_example_function(MylibContext* ctx, int value) {
    MYLIB_ASSERT(ctx != NULL);
    MYLIB_ASSERT(ctx->initialized);

    if (value < 0) {
        set_error(ctx, MYLIB_ERROR_INVALID_PARAM, "value must be non-negative");
        return MYLIB_ERROR_INVALID_PARAM;
    }

    if (value > 1000) {
        MYLIB_LOG_WARN("Large value provided: %d", value);
    }

    MYLIB_LOG_DEBUG("Processing value: %d", value);

    // Simulate some work
    int result = MYLIB_CLAMP(value, 0, 100);

    MYLIB_LOG_INFO("Function completed with result: %d", result);
    return MYLIB_SUCCESS;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Parenthesize** all macro parameters and expressions
2. **Use do-while(0)** for multi-statement macros
3. **Avoid side effects** in macro parameters
4. **Include guards** or #pragma once prevent multiple inclusion
5. **Cross-platform compatibility** requires careful platform detection
6. **Debug macros** by examining preprocessed output
7. **Consistent naming** and organization improve maintainability

---

## 🚀 Module 9 Complete!

**Congratulations!** You've mastered the C preprocessor:

- ✅ **Introduction** to preprocessor concepts and phases
- ✅ **#define and #undef** for macro creation and removal
- ✅ **#include directive** for file inclusion and modular programming
- ✅ **Function-like macros** with variable arguments and safety
- ✅ **Conditional compilation** for platform-specific and debug code
- ✅ **#pragma and other directives** for compiler control
- ✅ **Best practices** for robust, maintainable preprocessor code

**Ready for Module 10: Memory Management (Advanced)?** We'll dive deep into dynamic memory allocation, custom allocators, and memory debugging techniques! 💾

