import { SubLesson } from '../../../data/lessonsData';

export const topic_9_3: SubLesson = {
  id: 9.3,
  title: '#include Directive',
  status: 'completed',
  content: `# 📁 #include Directive

Master file inclusion with #include, understanding search paths, header organization, include guards, and modular programming practices.

---

## 🎯 File Inclusion Basics

### #include Syntax

\`\`\`c
// Two forms of include directive
#include <filename>    // System headers
#include "filename"    // User headers

// Examples
#include <stdio.h>           // Standard library
#include <stdlib.h>          // Standard library
#include "myheader.h"        // User-defined header
#include "utils/math.h"      // User header in subdirectory
\`\`\`

### What #include Does

The preprocessor **replaces** the #include line with the **entire contents** of the specified file.

\`\`\`c
// Before preprocessing
#include <stdio.h>
int main() { printf("Hello\\n"); }

// After preprocessing (simplified)
// [Contents of stdio.h inserted here]
// int main() { printf("Hello\\n"); }
\`\`\`

---

## 🔍 Include Search Paths

### System Headers (< >)

\`\`\`c
// Searched in system include directories
#include <stdio.h>      // /usr/include/stdio.h (Unix/Linux)
#include <windows.h>    // C:\Program Files\Microsoft SDKs\Windows\...
#include <GL/gl.h>      // OpenGL headers
\`\`\`

**System include paths typically:**
- `/usr/include` (Unix/Linux)
- `/usr/local/include`
- `C:\Program Files\Microsoft Visual Studio\...` (Windows)
- Compiler-specific directories

### User Headers (" ")

\`\`\`c
// Searched relative to source file first, then system paths
#include "myheader.h"        // Same directory as source
#include "utils/math.h"      // utils/ subdirectory
#include "../shared/common.h" // Parent directory
\`\`\`

**Search order for "filename":**
1. Same directory as the source file
2. Parent directories (some compilers)
3. Current working directory
4. System include directories

---

## 🛡️ Include Guards

### The Multiple Inclusion Problem

\`\`\`c
// math.h
void add(int a, int b);
void multiply(int a, int b);

// geometry.h
#include "math.h"  // Includes math.h
void calculate_area(double radius);

// main.c
#include "math.h"     // Includes math.h
#include "geometry.h" // Includes geometry.h, which includes math.h again!

// Result: math.h included twice - errors!
\`\`\`

### Classic Include Guards

\`\`\`c
// math.h
#ifndef MATH_H
#define MATH_H

// Header contents
void add(int a, int b);
void multiply(int a, int b);

#endif // MATH_H

// geometry.h
#ifndef GEOMETRY_H
#define GEOMETRY_H

#include "math.h"  // Safe - guarded

void calculate_area(double radius);

#endif // GEOMETRY_H
\`\`\`

### #pragma once (Modern Alternative)

\`\`\`c
// math.h
#pragma once

// Header contents
void add(int a, int b);
void multiply(int a, int b);

// geometry.h
#pragma once

#include "math.h"  // Safe - pragma once prevents re-inclusion

void calculate_area(double radius);
\`\`\`

**#pragma once advantages:**
- ✅ Simpler syntax
- ✅ Faster compilation (compiler handles it)
- ✅ No risk of macro name conflicts
- ❌ Not universally supported (though most modern compilers support it)

---

## 📋 Header File Organization

### Header File Structure

\`\`\`c
// example.h
#ifndef EXAMPLE_H
#define EXAMPLE_H

// 1. System includes (if needed in header)
#include <stdint.h>

// 2. Forward declarations (if needed)
struct Point;

// 3. Type definitions
typedef struct {
    int x, y;
} Point;

// 4. Function declarations
void point_init(Point* p, int x, int y);
void point_move(Point* p, int dx, int dy);
void point_print(const Point* p);

// 5. Inline functions (if simple)
static inline int point_get_x(const Point* p) { return p->x; }
static inline int point_get_y(const Point* p) { return p->y; }

// 6. Global constants (if needed)
#define POINT_DEFAULT_X 0
#define POINT_DEFAULT_Y 0

#endif // EXAMPLE_H
\`\`\`

### Corresponding Implementation

\`\`\`c
// example.c
#include "example.h"  // Include own header first
#include <stdio.h>    // Then system headers

// Implementations
void point_init(Point* p, int x, int y) {
    p->x = x;
    p->y = y;
}

void point_move(Point* p, int dx, int dy) {
    p->x += dx;
    p->y += dy;
}

void point_print(const Point* p) {
    printf("(%d, %d)\\n", p->x, p->y);
}
\`\`\`

### Include Order Best Practices

\`\`\`c
// main.c - Correct include order

// 1. Own header first (self-test)
#include "config.h"

// 2. Project headers (in dependency order)
#include "database.h"
#include "network.h"
#include "ui.h"

// 3. Third-party library headers
#include "sqlite3.h"
#include "curl/curl.h"

// 4. System headers (alphabetically)
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Implementation...
\`\`\`

---

## 🔧 Advanced Include Techniques

### Computed Includes

\`\`\`c
// Conditional includes based on platform
#ifdef _WIN32
    #include "win32_specific.h"
#elif defined(__linux__)
    #include "linux_specific.h"
#else
    #include "generic.h"
#endif

// Include based on configuration
#ifdef USE_OPENGL
    #include <GL/gl.h>
#endif

#ifdef USE_DIRECTX
    #include <d3d11.h>
#endif
\`\`\`

### Include Path Management

\`\`\`c
// Compiler command line options
// GCC/Clang: -I/path/to/headers -I/another/path
// MSVC: /I"path\to\headers" /I"another\path"

// Makefile example
CC = gcc
CFLAGS = -Iinclude -I../shared -I/usr/local/include
LDFLAGS = -L/usr/local/lib

program: main.o utils.o
    $(CC) $(LDFLAGS) -o program main.o utils.o

main.o: src/main.c include/config.h
    $(CC) $(CFLAGS) -c src/main.c -o main.o
\`\`\`

### Nested Includes

\`\`\`c
// Project structure:
// include/
//   ├── common.h
//   ├── math/
//   │   ├── vector.h
//   │   └── matrix.h
//   └── graphics/
//       ├── renderer.h
//       └── shader.h

// common.h
#ifndef COMMON_H
#define COMMON_H

#include <stdint.h>
#include <stdbool.h>

// Common types and macros

#endif

// math/vector.h
#ifndef MATH_VECTOR_H
#define MATH_VECTOR_H

#include "../common.h"  // Reference to parent

typedef struct {
    float x, y, z;
} Vector3;

#endif

// graphics/renderer.h
#ifndef GRAPHICS_RENDERER_H
#define GRAPHICS_RENDERER_H

#include "../common.h"
#include "../math/vector.h"  // Include math headers

void render_vector(const Vector3* vec);

#endif
\`\`\`

---

## 🧪 Complete Header Examples

### Comprehensive Library Header

\`\`\`c
// mylib.h
#ifndef MYLIB_H
#define MYLIB_H

#ifdef __cplusplus
extern "C" {
#endif

// Version information
#define MYLIB_VERSION_MAJOR 1
#define MYLIB_VERSION_MINOR 0
#define MYLIB_VERSION_PATCH 0

// Platform detection
#if defined(_WIN32) || defined(_WIN64)
    #define MYLIB_PLATFORM_WINDOWS
#elif defined(__APPLE__)
    #define MYLIB_PLATFORM_MACOS
#elif defined(__linux__)
    #define MYLIB_PLATFORM_LINUX
#endif

// Export/import macros for Windows DLLs
#ifdef MYLIB_PLATFORM_WINDOWS
    #ifdef MYLIB_BUILDING_DLL
        #define MYLIB_API __declspec(dllexport)
    #else
        #define MYLIB_API __declspec(dllimport)
    #endif
#else
    #define MYLIB_API
#endif

// Basic types
typedef struct {
    int x, y;
} Point;

typedef struct {
    Point start, end;
} Line;

// Function declarations
MYLIB_API void mylib_init(void);
MYLIB_API void mylib_cleanup(void);

MYLIB_API Point* point_create(int x, int y);
MYLIB_API void point_destroy(Point* p);
MYLIB_API void point_move(Point* p, int dx, int dy);

MYLIB_API Line* line_create(const Point* start, const Point* end);
MYLIB_API void line_destroy(Line* line);
MYLIB_API double line_length(const Line* line);

// Error codes
typedef enum {
    MYLIB_SUCCESS = 0,
    MYLIB_ERROR_MEMORY,
    MYLIB_ERROR_INVALID_PARAM,
    MYLIB_ERROR_FILE_NOT_FOUND
} MylibError;

// Error handling
MYLIB_API const char* mylib_error_string(MylibError error);
MYLIB_API MylibError mylib_get_last_error(void);

// Inline utility functions
static inline int point_get_x(const Point* p) { return p->x; }
static inline int point_get_y(const Point* p) { return p->y; }

static inline void point_set_x(Point* p, int x) { p->x = x; }
static inline void point_set_y(Point* p, int y) { p->y = y; }

#ifdef __cplusplus
}
#endif

#endif // MYLIB_H
\`\`\`

### Implementation File

\`\`\`c
// mylib.c
#include "mylib.h"
#include <stdlib.h>
#include <math.h>
#include <stdio.h>

// Static variables
static MylibError last_error = MYLIB_SUCCESS;

// Internal helper functions
static void set_error(MylibError error) {
    last_error = error;
}

// Public API implementations
void mylib_init(void) {
    // Initialization code
    set_error(MYLIB_SUCCESS);
}

void mylib_cleanup(void) {
    // Cleanup code
}

Point* point_create(int x, int y) {
    Point* p = malloc(sizeof(Point));
    if (p == NULL) {
        set_error(MYLIB_ERROR_MEMORY);
        return NULL;
    }

    p->x = x;
    p->y = y;
    set_error(MYLIB_SUCCESS);
    return p;
}

void point_destroy(Point* p) {
    if (p != NULL) {
        free(p);
    }
}

void point_move(Point* p, int dx, int dy) {
    if (p == NULL) {
        set_error(MYLIB_ERROR_INVALID_PARAM);
        return;
    }

    p->x += dx;
    p->y += dy;
    set_error(MYLIB_SUCCESS);
}

Line* line_create(const Point* start, const Point* end) {
    if (start == NULL || end == NULL) {
        set_error(MYLIB_ERROR_INVALID_PARAM);
        return NULL;
    }

    Line* line = malloc(sizeof(Line));
    if (line == NULL) {
        set_error(MYLIB_ERROR_MEMORY);
        return NULL;
    }

    line->start = *start;
    line->end = *end;
    set_error(MYLIB_SUCCESS);
    return line;
}

void line_destroy(Line* line) {
    if (line != NULL) {
        free(line);
    }
}

double line_length(const Line* line) {
    if (line == NULL) {
        set_error(MYLIB_ERROR_INVALID_PARAM);
        return 0.0;
    }

    int dx = line->end.x - line->start.x;
    int dy = line->end.y - line->start.y;

    set_error(MYLIB_SUCCESS);
    return sqrt(dx * dx + dy * dy);
}

const char* mylib_error_string(MylibError error) {
    switch (error) {
        case MYLIB_SUCCESS: return "Success";
        case MYLIB_ERROR_MEMORY: return "Memory allocation failed";
        case MYLIB_ERROR_INVALID_PARAM: return "Invalid parameter";
        case MYLIB_ERROR_FILE_NOT_FOUND: return "File not found";
        default: return "Unknown error";
    }
}

MylibError mylib_get_last_error(void) {
    return last_error;
}
\`\`\`

### Usage Example

\`\`\`c
// main.c
#include "mylib.h"
#include <stdio.h>

int main() {
    mylib_init();

    // Create points
    Point* p1 = point_create(10, 20);
    Point* p2 = point_create(30, 40);

    if (p1 == NULL || p2 == NULL) {
        fprintf(stderr, "Error: %s\\n", mylib_error_string(mylib_get_last_error()));
        return 1;
    }

    // Create line
    Line* line = line_create(p1, p2);
    if (line == NULL) {
        fprintf(stderr, "Error: %s\\n", mylib_error_string(mylib_get_last_error()));
        point_destroy(p1);
        point_destroy(p2);
        return 1;
    }

    // Use line
    printf("Line length: %.2f\\n", line_length(line));

    // Move point
    point_move(p1, 5, 5);
    printf("Point 1 moved to: (%d, %d)\\n", point_get_x(p1), point_get_y(p1));

    // Cleanup
    line_destroy(line);
    point_destroy(p1);
    point_destroy(p2);

    mylib_cleanup();

    return 0;
}
\`\`\`

---

## 🎯 Include Best Practices

### 1. Use Include Guards or #pragma once

\`\`\`c
// ✅ Good
#ifndef MYHEADER_H
#define MYHEADER_H
// content
#endif

// Or
#pragma once
// content
\`\`\`

### 2. Minimize Includes in Headers

\`\`\`c
// ❌ Bad - includes in header
#include <stdio.h>
#include <stdlib.h>

struct Data {
    FILE* file;
    void* buffer;
};

// ✅ Good - forward declarations
struct Data;  // Forward declaration

// Include in .c file instead
\`\`\`

### 3. Order Includes Properly

\`\`\`c
// 1. Own header first
#include "myheader.h"

// 2. Project headers
#include "database.h"
#include "network.h"

// 3. Third-party headers
#include "sqlite3.h"

// 4. System headers
#include <stdio.h>
#include <stdlib.h>
\`\`\`

### 4. Use Angle Brackets for System Headers

\`\`\`c
// ✅ System headers with <>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// ✅ User headers with ""
#include "myheader.h"
#include "utils/math.h"
\`\`\`

### 5. Avoid Deep Include Hierarchies

\`\`\`c
// ❌ Deep nesting
// main.c includes a.h
// a.h includes b.h
// b.h includes c.h, d.h, e.h
// Each level adds includes...

// ✅ Shallow hierarchy
// main.c includes what it needs directly
// Headers include only what's necessary
\`\`\`

---

## 🛠️ Include Debugging

### Finding Include Issues

\`\`\`bash
# GCC: Show include search path
gcc -v -E file.c

# GCC: Show all included files
gcc -H file.c

# MSVC: Show includes
cl /showIncludes file.c
\`\`\`

### Common Include Problems

\`\`\`c
// Problem 1: Missing include guard
// Solution: Add #ifndef/#define/#endif

// Problem 2: Wrong include path
// Solution: Check -I compiler flags, use correct "" vs <>

// Problem 3: Circular includes
// Solution: Use forward declarations, restructure headers

// Problem 4: Include order dependencies
// Solution: Include own header first, order carefully
\`\`\`

---

## 🎯 Key Takeaways

1. **#include <file>** searches system paths, **#include "file"** searches local paths first
2. **Include guards** prevent multiple inclusion errors
3. **#pragma once** is a modern alternative to include guards
4. **Headers** should contain declarations, **.c files** contain definitions
5. **Include own header first** for self-testing
6. **Minimize header includes** to reduce dependencies
7. **Use consistent include ordering** for maintainability

---

## 🚀 Preview: Macros (Function-like)

In the next topic, you'll learn about:
- **Advanced function-like macros** with variable arguments
- **Macro debugging** and expansion visualization
- **Common macro patterns** and idioms
- **Macro vs function** trade-offs
- **Preprocessor operators** and advanced techniques

**Function-like macros are incredibly powerful but require careful use!** ⚙️

