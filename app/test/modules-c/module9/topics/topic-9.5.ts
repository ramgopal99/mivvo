import { SubLesson } from '../../../data/lessonsData';

export const topic_9_5: SubLesson = {
  id: 9.5,
  title: 'Conditional Compilation',
  status: 'completed',
  content: `# 🔀 Conditional Compilation

Master conditional compilation with #if, #ifdef, #ifndef, and related directives to create platform-independent and configurable code.

---

## 🎯 Basic Conditional Directives

### #ifdef and #ifndef

\`\`\`c
#include <stdio.h>

// Define a feature flag
#define ENABLE_DEBUG

int main() {
    // Code included only if ENABLE_DEBUG is defined
#ifdef ENABLE_DEBUG
    printf("Debug mode enabled\\n");
#endif

    // Code included only if ENABLE_DEBUG is NOT defined
#ifndef ENABLE_DEBUG
    printf("Debug mode disabled\\n");
#endif

    return 0;
}
\`\`\`

### #if, #elif, #else, #endif

\`\`\`c
#include <stdio.h>

#define LOG_LEVEL 2

int main() {
    // Multi-level conditional
    #if LOG_LEVEL >= 1
        printf("Basic logging enabled\\n");
    #endif

    #if LOG_LEVEL >= 2
        printf("Detailed logging enabled\\n");
    #elif LOG_LEVEL >= 1
        printf("Basic logging only\\n");
    #else
        printf("Logging disabled\\n");
    #endif

    return 0;
}
\`\`\`

---

## 🔍 Predefined Macros

### Standard Predefined Macros

\`\`\`c
#include <stdio.h>

int main() {
    // Standard macros
    printf("File: %s\\n", __FILE__);
    printf("Line: %d\\n", __LINE__);
    printf("Function: %s\\n", __func__);  // C99
    printf("Date: %s\\n", __DATE__);
    printf("Time: %s\\n", __TIME__);

    // Standards version
    printf("STDC: %d\\n", __STDC__);
    #ifdef __STDC_VERSION__
        printf("STDC Version: %ld\\n", __STDC_VERSION__);
    #endif

    return 0;
}
\`\`\`

### Platform Detection

\`\`\`c
#include <stdio.h>

int main() {
    // Platform detection
    #ifdef _WIN32
        printf("Windows\\n");
    #elif defined(__APPLE__)
        printf("macOS\\n");
    #elif defined(__linux__)
        printf("Linux\\n");
    #else
        printf("Unknown platform\\n");
    #endif

    // Architecture
    #ifdef __x86_64__
        printf("64-bit x86\\n");
    #elif defined(__i386__)
        printf("32-bit x86\\n");
    #elif defined(__arm__)
        printf("ARM\\n");
    #endif

    // Compiler
    #ifdef __GNUC__
        printf("GCC\\n");
    #elif defined(_MSC_VER)
        printf("MSVC\\n");
    #endif

    return 0;
}
\`\`\`

---

## 🛠️ Common Conditional Patterns

### Feature Toggles

\`\`\`c
// config.h
#ifndef CONFIG_H
#define CONFIG_H

// Feature flags
#define ENABLE_NETWORK 1
#define ENABLE_GUI 0
#define ENABLE_DEBUG 1

#endif
\`\`\`

\`\`\`c
// main.c
#include "config.h"

int main() {
    #if ENABLE_NETWORK
        printf("Network features enabled\\n");
        // Network initialization code
    #endif

    #if ENABLE_GUI
        printf("GUI features enabled\\n");
        // GUI initialization code
    #else
        printf("Console mode\\n");
    #endif

    #if ENABLE_DEBUG
        printf("Debug logging enabled\\n");
    #endif

    return 0;
}
\`\`\`

### Platform-Specific Code

\`\`\`c
#include <stdio.h>

// Platform-specific includes
#ifdef _WIN32
    #include <windows.h>
    #define SLEEP(ms) Sleep(ms)
#else
    #include <unistd.h>
    #define SLEEP(ms) usleep((ms) * 1000)
#endif

// Platform-specific functions
void clear_screen() {
    #ifdef _WIN32
        system("cls");
    #else
        system("clear");
    #endif
}

int main() {
    printf("Hello\\n");
    SLEEP(1000);  // Sleep for 1 second
    clear_screen();
    printf("Screen cleared\\n");

    return 0;
}
\`\`\`

---

## 🔧 Advanced Conditional Techniques

### Nested Conditionals

\`\`\`c
#define PLATFORM "Linux"
#define ARCH "x64"
#define COMPILER "GCC"

int main() {
    // Complex nested conditions
    #if defined(PLATFORM) && defined(ARCH)
        #if PLATFORM == "Linux" && ARCH == "x64"
            printf("Linux x64 build\\n");
        #elif PLATFORM == "Windows" && ARCH == "x86"
            printf("Windows x86 build\\n");
        #else
            printf("Other platform\\n");
        #endif
    #else
        printf("Platform/architecture not defined\\n");
    #endif

    return 0;
}
\`\`\`

### Conditional Compilation in Macros

\`\`\`c
#include <stdio.h>

#define DEBUG 1

// Conditional macro definition
#if DEBUG
    #define LOG(msg) printf("DEBUG: %s\\n", msg)
    #define ASSERT(condition) \\
        do { \\
            if (!(condition)) { \\
                printf("ASSERT FAILED: %s\\n", #condition); \\
            } \\
        } while(0)
#else
    #define LOG(msg)
    #define ASSERT(condition)
#endif

int main() {
    LOG("Program started");

    int x = 5;
    ASSERT(x > 0);

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **#ifdef/#ifndef** test if macros are defined
2. **#if/#elif/#else/#endif** allow complex conditional compilation
3. **Predefined macros** provide file, line, and platform information
4. **Conditional compilation** enables platform-specific and configurable code
5. **Feature flags** control optional functionality
6. **Nested conditionals** handle complex build configurations

---

## 🚀 Preview: #pragma and Other Directives

In the next topic, you'll learn about:
- **#pragma once** vs include guards
- **#pragma pack** for structure alignment
- **#pragma message** for compilation messages
- **#error and #warning** directives
- **_Pragma operator** for programmatic pragmas

**#pragma directives provide compiler-specific control and optimizations!** ⚙️

