import { SubLesson } from '../../../data/lessonsData';

export const topic_9_6: SubLesson = {
  id: 9.6,
  title: '#pragma and Other Directives',
  status: 'completed',
  content: `# ⚙️ #pragma and Other Directives

Master #pragma directives, #error/#warning, and advanced preprocessor features for compiler control and code quality.

---

## 🎯 #pragma Directive

### #pragma once (Include Guard Alternative)

\`\`\`c
// Alternative to traditional include guards
#pragma once

// Header content here
void function1(void);
void function2(void);

// No need for #ifndef/#define/#endif
\`\`\`

**Advantages:**
- ✅ Simpler syntax
- ✅ Faster compilation (compiler handles it)
- ✅ No risk of macro name conflicts
- ❌ Not universally supported (most modern compilers support it)

### #pragma pack (Structure Packing)

\`\`\`c
#include <stdio.h>

// Normal structure (may have padding)
struct Normal {
    char c;    // 1 byte
    int i;     // 4 bytes (with 3 bytes padding)
};             // Total: 8 bytes

// Packed structure (no padding)
#pragma pack(push, 1)  // Pack with 1-byte alignment
struct Packed {
    char c;    // 1 byte
    int i;     // 4 bytes (no padding)
};             // Total: 5 bytes
#pragma pack(pop)      // Restore previous packing

int main() {
    printf("Normal size: %zu\\n", sizeof(struct Normal));
    printf("Packed size: %zu\\n", sizeof(struct Packed));

    return 0;
}
\`\`\`

### #pragma message (Compilation Messages)

\`\`\`c
#pragma message("Compiling module: " __FILE__)

#ifdef __GNUC__
    #pragma message("Compiled with GCC")
#endif

// TODO reminders
#pragma message("TODO: Implement error handling")

int main() {
    #pragma message("Entering main function")
    return 0;
}
\`\`\`

---

## 🚨 #error and #warning Directives

### #error (Compilation Stopper)

\`\`\`c
// config.h
#ifndef PLATFORM_DEFINED
    #error "Platform not defined! Define _WIN32, __linux__, or __APPLE__"
#endif

// Check for incompatible options
#if defined(USE_OPENGL) && defined(USE_DIRECTX)
    #error "Cannot use both OpenGL and DirectX simultaneously"
#endif

// Version requirements
#if __STDC_VERSION__ < 199901L
    #error "C99 or later required"
#endif
\`\`\`

### #warning (Compilation Warning)

\`\`\`c
// Deprecation warnings
#pragma warning("This header is deprecated, use new_header.h instead")

// Configuration warnings
#ifndef OPTIMIZATION_LEVEL
    #pragma warning("OPTIMIZATION_LEVEL not defined, using default")
#endif

// Platform-specific warnings
#ifdef __GNUC__
    #if __GNUC__ < 7
        #pragma warning("GCC 7+ recommended for best performance")
    #endif
#endif
\`\`\`

---

## 🔧 _Pragma Operator (C99)

### Programmatic Pragmas

\`\`\`c
#include <stdio.h>

// _Pragma is like #pragma but can be used in macros
#define PACK_STRUCT(n) _Pragma(#n) struct Packed

#define CREATE_PACKED_STRUCT(name, alignment) \\
    _Pragma("pack(push, " #alignment ")") \\
    struct name { \\
        char c; \\
        int i; \\
    }; \\
    _Pragma("pack(pop)")

// Conditional pragmas
#define OPTIMIZE_FUNCTION(level) \\
    _Pragma("GCC optimize(\"" #level "\")") \\
    _Pragma("clang optimize(" #level ")")

OPTIMIZE_FUNCTION(3)
int fast_function(int x) {
    return x * x + 2 * x + 1;
}

int main() {
    CREATE_PACKED_STRUCT(MyStruct, 1);

    printf("Packed struct size: %zu\\n", sizeof(struct MyStruct));

    return 0;
}
\`\`\`

---

## 🛠️ Other Preprocessor Directives

### #line (Line Control)

\`\`\`c
// Change reported line number and filename
#line 100 "generated.c"

// This will report as line 100 in generated.c
printf("Hello\\n");  // Error would show line 100, file generated.c
\`\`\`

### # (Null Directive)

\`\`\`c
// Empty directive (does nothing)
// Used for spacing or comments
#

// Before macros
#define MACRO \\
    # /* Empty line */ \\
    printf("Hello\\n");

// In conditional compilation
#ifdef SOMETHING
    printf("Something\\n");
#else
    #  // Empty else branch
#endif
\`\`\`

---

## 🎯 Best Practices

### Include Guard Patterns

\`\`\`c
// Traditional include guards
#ifndef MYHEADER_H
#define MYHEADER_H
// content
#endif

// Modern pragma once
#pragma once
// content

// Combined approach (pragma once with fallback)
#pragma once
#ifndef MYHEADER_H
#define MYHEADER_H
// content
#endif
\`\`\`

### Platform-Specific Pragmas

\`\`\`c
// Compiler-specific optimizations
#ifdef __GNUC__
    #pragma GCC optimize("O3")
    #pragma GCC diagnostic ignored "-Wunused-parameter"
#endif

#ifdef _MSC_VER
    #pragma optimize("t", on)  // Favor code speed
    #pragma warning(disable: 4100)  // Unused parameter
#endif

// Cross-platform alignment
#if defined(__GNUC__) || defined(__clang__)
    #define ALIGN(n) __attribute__((aligned(n)))
#elif defined(_MSC_VER)
    #define ALIGN(n) __declspec(align(n))
#else
    #define ALIGN(n)
#endif

ALIGN(16) struct AlignedStruct {
    int data;
};
\`\`\`

---

## 🧪 Complete Examples

### Advanced Configuration System

\`\`\`c
// build_config.h
#pragma once

// Build type detection
#ifndef NDEBUG
    #define BUILD_DEBUG
    #pragma message("Building in DEBUG mode")
#else
    #define BUILD_RELEASE
    #pragma message("Building in RELEASE mode")
#endif

// Platform detection
#if defined(_WIN32) || defined(_WIN64)
    #define PLATFORM_WINDOWS
    #pragma message("Target platform: Windows")
    #define PATH_SEPARATOR "\\\\"
    #define LIBRARY_PREFIX ""
    #define LIBRARY_SUFFIX ".dll"
#elif defined(__APPLE__)
    #define PLATFORM_MACOS
    #pragma message("Target platform: macOS")
    #define PATH_SEPARATOR "/"
    #define LIBRARY_PREFIX "lib"
    #define LIBRARY_SUFFIX ".dylib"
#elif defined(__linux__)
    #define PLATFORM_LINUX
    #pragma message("Target platform: Linux")
    #define PATH_SEPARATOR "/"
    #define LIBRARY_PREFIX "lib"
    #define LIBRARY_SUFFIX ".so"
#else
    #pragma warning("Unknown platform - using generic settings")
    #define PLATFORM_UNKNOWN
    #define PATH_SEPARATOR "/"
    #define LIBRARY_PREFIX "lib"
    #define LIBRARY_SUFFIX ".so"
#endif

// Architecture detection
#if defined(__x86_64__) || defined(_M_X64)
    #define ARCH_X64
    #pragma message("Architecture: x64")
#elif defined(__i386__) || defined(_M_IX86)
    #define ARCH_X86
    #pragma message("Architecture: x86")
#elif defined(__arm__) || defined(_M_ARM)
    #define ARCH_ARM
    #pragma message("Architecture: ARM")
#else
    #pragma message("Architecture: Unknown")
#endif

// Compiler feature detection
#ifdef __cplusplus
    #pragma message("Compiling as C++")
    #define EXTERN_C extern "C"
#else
    #define EXTERN_C
#endif

// C standard detection
#if defined(__STDC__)
    #if defined(__STDC_VERSION__)
        #if __STDC_VERSION__ >= 201112L
            #pragma message("C11 standard")
            #define HAS_C11
        #elif __STDC_VERSION__ >= 199901L
            #pragma message("C99 standard")
            #define HAS_C99
        #else
            #pragma message("C89/C90 standard")
        #endif
    #else
        #pragma message("Pre-C99 standard")
    #endif
#endif

// Feature flags with validation
#define FEATURE_NETWORK 1
#define FEATURE_GUI 0
#define FEATURE_DEBUG 1

// Validate configuration
#if FEATURE_NETWORK && !defined(PLATFORM_WINDOWS) && !defined(PLATFORM_LINUX) && !defined(PLATFORM_MACOS)
    #error "Network feature requires Windows, Linux, or macOS"
#endif

#if FEATURE_GUI && !defined(PLATFORM_WINDOWS) && !defined(PLATFORM_LINUX) && !defined(PLATFORM_MACOS)
    #error "GUI feature requires Windows, Linux, or macOS"
#endif

// Export macros
#ifdef PLATFORM_WINDOWS
    #ifdef BUILDING_DLL
        #define EXPORT __declspec(dllexport)
    #else
        #define EXPORT __declspec(dllimport)
    #endif
#else
    #define EXPORT
#endif

// Optimization pragmas
#if defined(BUILD_RELEASE)
    #if defined(__GNUC__) || defined(__clang__)
        #pragma GCC optimize("O3", "inline-functions")
    #elif defined(_MSC_VER)
        #pragma optimize("t", on)
    #endif
#endif

// Warning control
#if defined(__GNUC__) || defined(__clang__)
    #pragma GCC diagnostic ignored "-Wunused-function"
    #pragma GCC diagnostic ignored "-Wunused-variable"
#endif
\`\`\`

### Portable Library Interface

\`\`\`c
// mylib.h
#pragma once

#include "build_config.h"

EXTERN_C {

// Version info
#define MYLIB_VERSION_MAJOR 1
#define MYLIB_VERSION_MINOR 0
#define MYLIB_VERSION_PATCH 0

#define MYLIB_VERSION (MYLIB_VERSION_MAJOR * 10000 + \\
                       MYLIB_VERSION_MINOR * 100 + \\
                       MYLIB_VERSION_PATCH)

// Platform-specific exports
EXPORT void mylib_init(void);
EXPORT void mylib_cleanup(void);

// Feature-specific functions
#if FEATURE_NETWORK
    EXPORT int mylib_connect(const char* host, int port);
    EXPORT void mylib_disconnect(void);
#endif

#if FEATURE_GUI
    EXPORT void mylib_show_window(void);
    EXPORT void mylib_hide_window(void);
#endif

// Debug functions
#if defined(BUILD_DEBUG) || defined(FEATURE_DEBUG)
    EXPORT void mylib_debug_info(void);
#endif

// Architecture-specific optimizations
#ifdef ARCH_X64
    #pragma message("Using x64 optimizations")
    EXPORT void mylib_process_data_x64(void* data, size_t size);
#endif

}

// Error checking
#ifndef HAS_C99
    #error "C99 or later required for this library"
#endif

// Deprecation warnings
#pragma warning("mylib_init() is deprecated, use mylib_initialize() instead")

// Packing control for structures
#pragma pack(push, 1)
struct EXPORT PackedData {
    uint32_t id;
    uint16_t flags;
    uint8_t data[100];
};
#pragma pack(pop)
\`\`\`

---

## 🎯 Key Takeaways

1. **#pragma once** provides modern include guards
2. **#pragma pack** controls structure alignment and padding
3. **#pragma message** outputs compilation-time messages
4. **#error** stops compilation with an error message
5. **#warning** issues compilation warnings
6. **_Pragma()** allows programmatic pragma usage
7. **Pragmas are compiler-specific** but widely supported

---

## 🚀 Preview: Best Practices

In the final topic, you'll learn about:
- **Preprocessor best practices** and common pitfalls
- **Macro hygiene** and safe macro patterns
- **Debugging preprocessor issues**
- **Cross-platform compatibility** techniques
- **Advanced preprocessor patterns** and idioms

**Master these best practices for robust, maintainable preprocessor code!** 🏆

