import { SubLesson } from '../../../../data/lessonsData';

export const topic_14_1: SubLesson = {
  id: '14.1',
  title: 'C Preprocessor Deep Dive',
  status: 'demo',
  content: `# C Preprocessor Deep Dive

## Preprocessor Directives Overview

The C preprocessor is a text substitution tool that runs before compilation. It processes directives starting with '#'.

### File Inclusion
\`\`\`c
// Include standard header
#include <stdio.h>

// Include user-defined header
#include "myheader.h"

// Include with path
#include "../include/utils.h"

// Include guards in headers
#ifndef MYHEADER_H
#define MYHEADER_H

// Header content here

#endif // MYHEADER_H
\`\`\`

### Conditional Compilation
\`\`\`c
// Basic conditional compilation
#define DEBUG 1

#if DEBUG
    printf("Debug mode enabled\\n");
#endif

// Multiple conditions
#if defined(WINDOWS) && defined(DEBUG)
    // Windows debug code
#elif defined(LINUX)
    // Linux code
#else
    // Default code
#endif

// Alternative syntax
#ifdef DEBUG
    // Debug code
#endif

#ifndef PRODUCTION
    // Non-production code
#endif

// Nested conditions
#if defined(OS) && OS == WINDOWS
    #if ARCH == 64
        // Windows 64-bit code
    #endif
#endif
\`\`\`

## Macro Definitions

### Object-like Macros
\`\`\`c
// Simple constants
#define PI 3.14159
#define MAX_SIZE 100
#define BUFFER_SIZE (1024 * 4)

// String constants
#define GREETING "Hello, World!"
#define VERSION "1.0.0"

// Character constants
#define NEWLINE '\\n'
#define TAB '\\t'
\`\`\`

### Function-like Macros
\`\`\`c
// Basic function macro
#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define MIN(a, b) ((a) < (b) ? (a) : (b))

// Usage
int result = SQUARE(5);        // ((5) * (5)) = 25
int larger = MAX(x, y);        // ((x) > (y) ? (x) : (y))

// Multi-line macros
#define SWAP(a, b) do { \\
    typeof(a) temp = a; \\
    a = b; \\
    b = temp; \\
} while(0)

// Complex macros
#define PRINTF_DEBUG(fmt, ...) \\
    do { \\
        if (DEBUG) { \\
            printf("DEBUG %s:%d: " fmt, __FILE__, __LINE__, ##__VA_ARGS__); \\
        } \\
    } while(0)
\`\`\`

### Variadic Macros (C99)
\`\`\`c
#include <stdio.h>

// Simple variadic macro
#define LOG(fmt, ...) printf(fmt, ##__VA_ARGS__)

// Named variadic macro
#define ERROR(fmt, ...) \\
    fprintf(stderr, "ERROR: " fmt "\\n", ##__VA_ARGS__)

// With function name and line
#define TRACE(...) \\
    printf("%s:%d ", __func__, __LINE__); \\
    printf(__VA_ARGS__)

// Usage
LOG("Value: %d\\n", 42);
ERROR("Failed to open file: %s", filename);
TRACE("Entering function with param %d\\n", param);
\`\`\`

## Predefined Macros

### Standard Predefined Macros
\`\`\`c
printf("__FILE__: %s\\n", __FILE__);        // Current file name
printf("__LINE__: %d\\n", __LINE__);        // Current line number
printf("__func__: %s\\n", __func__);        // Current function name (C99)
printf("__DATE__: %s\\n", __DATE__);        // Compilation date
printf("__TIME__: %s\\n", __TIME__);        // Compilation time

// C standard version
#ifdef __STDC__
    printf("Standard C\\n");
#endif

#ifdef __STDC_VERSION__
    #if __STDC_VERSION__ >= 201112L
        printf("C11 or later\\n");
    #elif __STDC_VERSION__ >= 199901L
        printf("C99\\n");
    #else
        printf("C89/C90\\n");
    #endif
#endif
\`\`\`

### Compiler-specific Macros
\`\`\`c
// GCC-specific
#ifdef __GNUC__
    printf("GCC version: %d.%d.%d\\n", __GNUC__, __GNUC_MINOR__, __GNUC_PATCHLEVEL__);
#endif

// Clang
#ifdef __clang__
    printf("Clang compiler\\n");
#endif

// Microsoft Visual C++
#ifdef _MSC_VER
    printf("MSVC version: %d\\n", _MSC_VER);
#endif

// Architecture
#ifdef __x86_64__
    printf("x86-64 architecture\\n");
#elif defined(__i386__)
    printf("x86 architecture\\n");
#elif defined(__arm__)
    printf("ARM architecture\\n");
#endif

// Operating system
#ifdef _WIN32
    printf("Windows\\n");
#elif defined(__linux__)
    printf("Linux\\n");
#elif defined(__APPLE__)
    printf("macOS\\n");
#endif
\`\`\`

## Advanced Macro Techniques

### Token Pasting (##)
\`\`\`c
#define CONCAT(a, b) a##b
#define MAKE_VAR(name, num) var##name##num

// Usage
int CONCAT(ab, c);        // int abc;
int MAKE_VAR(x, 1);       // int varx1;

// Generic variable creation
#define DECLARE_VAR(type, name) type var_##name
DECLARE_VAR(int, counter);    // int var_counter;

// Function name generation
#define FUNC_NAME(prefix, action) prefix##_##action
int FUNC_NAME(math, add)(int a, int b) { return a + b; }
\`\`\`

### Stringification (#)
\`\`\`c
#define STRINGIFY(x) #x
#define TO_STRING(x) STRINGIFY(x)

// Usage
printf("%s\\n", STRINGIFY(hello world));    // "hello world"
printf("%s\\n", TO_STRING(__LINE__));       // "123" (current line)

// Debug macro
#define DEBUG_VAR(var) printf(#var " = %d\\n", var)
int x = 42;
DEBUG_VAR(x);    // "x = 42"
\`\`\`

### Recursive Macros and Expansion Control
\`\`\`c
// Self-referential macros (dangerous!)
#define INFINITY INFINITY + 1    // Infinite expansion!

// Controlled recursion
#define EAT(...) EAT2(__VA_ARGS__)
#define EAT2(...) /* nothing */

// Argument counting
#define COUNT_ARGS(...) COUNT_ARGS_(,##__VA_ARGS__,7,6,5,4,3,2,1,0)
#define COUNT_ARGS_(_0,_1,_2,_3,_4,_5,_6,_7,N,...) N

// Usage
COUNT_ARGS()        // 0
COUNT_ARGS(a)       // 1
COUNT_ARGS(a,b,c)   // 3
\`\`\`

## Macro Pitfalls and Best Practices

### Common Issues
\`\`\`c
// Problem 1: Missing parentheses
#define DOUBLE(x) x * 2
int result = DOUBLE(3 + 4);    // 3 + 4 * 2 = 11, not 14!

// Problem 2: Multiple evaluation
#define MAX(a, b) ((a) > (b) ? (a) : (b))
int max_val = MAX(++x, ++y);   // x or y incremented twice!

// Problem 3: Semicolon insertion
#define FOREACH(item, array) \\
    for(size_t i = 0; i < sizeof(array)/sizeof(array[0]); i++) { \\
        item = array[i];

FOREACH(int num, numbers) {    // Extra semicolon causes empty statement
    printf("%d\\n", num);
}

// Problem 4: Operator precedence
#define MULTIPLY(a, b) a * b
int result = MULTIPLY(2 + 3, 4 + 5);    // 2 + 3 * 4 + 5 = 19, not 45!
\`\`\`

### Solutions and Best Practices
\`\`\`c
// Solution 1: Proper parentheses
#define DOUBLE(x) ((x) * 2)
#define MAX(a, b) (((a) > (b)) ? (a) : (b))

// Solution 2: Use inline functions instead of macros for complex operations
static inline int safe_max(int a, int b) {
    return a > b ? a : b;
}

// Solution 3: Do-while-zero idiom
#define FOREACH(item, array, size) \\
    do { \\
        for(size_t i = 0; i < (size); i++) { \\
            item = array[i]; \\
            // User code goes here

FOREACH(int num, numbers, ARRAY_SIZE(numbers)) {
    printf("%d\\n", num);
} while(0)

// Solution 4: Careful with complex expressions
#define MULTIPLY(a, b) ((a) * (b))
\`\`\`

## Advanced Preprocessor Features

### #pragma Directive
\`\`\`c
// Common pragmas
#pragma once                    // Include guard alternative
#pragma pack(1)                 // Structure packing
#pragma pack(pop)               // Restore packing
#pragma warning(disable: 4996)  // Disable specific warnings (MSVC)

// GCC-specific pragmas
#pragma GCC diagnostic ignored "-Wunused-variable"
#pragma GCC optimize("O3")

// Alignment
#pragma pack(push, 1)
struct PackedStruct {
    char a;
    int b;    // Normally 4-byte aligned, now packed
};
#pragma pack(pop)
\`\`\`

### _Pragma Operator (C99)
\`\`\`c
// _Pragma is like #pragma but can be used in macros
#define DISABLE_WARNING(warning) _Pragma(#warning)

// Usage
DISABLE_WARNING(GCC diagnostic ignored "-Wunused-variable")
\`\`\`

### #line Directive
\`\`\`c
// Change reported file and line
#line 100 "generated.c"

// Useful for code generators
#define LOCATION() printf("File: %s, Line: %d\\n", __FILE__, __LINE__)
\`\`\`

### #error and #warning
\`\`\`c
// Compilation errors
#ifndef __STDC_VERSION__
    #error "C99 or later required"
#endif

#if defined(WINDOWS) && defined(LINUX)
    #error "Cannot define both WINDOWS and LINUX"
#endif

// Compilation warnings
#warning "This code is deprecated, consider using new_function() instead"

// Platform checks
#ifndef __x86_64__
    #warning "This code is optimized for x86-64"
#endif
\`\`\`

## Conditional Compilation Strategies

### Feature Toggles
\`\`\`c
// Feature flags
#define ENABLE_LOGGING 1
#define ENABLE_PROFILING 0
#define ENABLE_DEBUG_MEMORY 1

// Conditional compilation based on features
#if ENABLE_LOGGING
    #define LOG(...) printf(__VA_ARGS__)
#else
    #define LOG(...) /* no-op */
#endif

#if ENABLE_PROFILING
    #define PROFILE_START() start_timer()
    #define PROFILE_END(name) printf("%s took %f seconds\\n", name, stop_timer())
#else
    #define PROFILE_START() /* no-op */
    #define PROFILE_END(name) /* no-op */
#endif
\`\`\`

### Platform-specific Code
\`\`\`c
// Platform detection and conditional compilation
#ifdef _WIN32
    #include <windows.h>
    #define PATH_SEPARATOR "\\\\"
    #define SLEEP_MS(ms) Sleep(ms)
#elif defined(__linux__)
    #include <unistd.h>
    #define PATH_SEPARATOR "/"
    #define SLEEP_MS(ms) usleep((ms) * 1000)
#else
    #error "Unsupported platform"
#endif

// Architecture-specific optimizations
#if defined(__x86_64__) || defined(__i386__)
    // x86-specific code
    #define USE_SIMD 1
    #include <immintrin.h>
#elif defined(__arm__) || defined(__aarch64__)
    // ARM-specific code
    #define USE_NEON 1
    #include <arm_neon.h>
#endif
\`\`\`

The C preprocessor is a powerful tool for conditional compilation, code generation, and platform abstraction. Understanding its features and pitfalls is crucial for writing maintainable, portable C code.`
};

