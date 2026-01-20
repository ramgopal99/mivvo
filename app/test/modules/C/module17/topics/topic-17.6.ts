import { SubLesson } from '../../../../data/lessonsData';

export const topic_17_6: SubLesson = {
  id: '17.6',
  title: 'C Development Workflows and Best Practices',
  status: 'demo',
  content: `# C Development Workflows and Best Practices

## Project Structure and Organization

### Standard C Project Layout
\`\`\`
myproject/
├── CMakeLists.txt          # Build configuration
├── README.md              # Project documentation
├── LICENSE                # License information
├── .gitignore            # Git ignore patterns
├── include/              # Public headers
│   ├── mylib.h
│   └── mylib/
│       ├── types.h
│       └── config.h
├── src/                  # Source files
│   ├── main.c
│   ├── lib/
│   │   ├── core.c
│   │   ├── utils.c
│   │   └── io.c
│   └── tests/
│       ├── test_core.c
│       └── test_utils.c
├── build/                # Build artifacts (generated)
├── docs/                 # Documentation
├── scripts/              # Build/deployment scripts
├── examples/             # Example programs
├── tests/                # Test suite
└── third_party/          # External dependencies
\`\`\`

### Modular Library Structure
\`\`\`c
// include/mylib.h (Public API)
#ifndef MYLIB_H
#define MYLIB_H

#include <stddef.h>
#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

// Version information
#define MYLIB_VERSION_MAJOR 1
#define MYLIB_VERSION_MINOR 0
#define MYLIB_VERSION_PATCH 0

// Error codes
typedef enum {
    MYLIB_SUCCESS = 0,
    MYLIB_ERROR_INVALID_ARGUMENT = -1,
    MYLIB_ERROR_MEMORY = -2,
    MYLIB_ERROR_IO = -3,
    MYLIB_ERROR_NOT_FOUND = -4
} mylib_error_t;

// Opaque types for data hiding
typedef struct mylib_context mylib_context_t;
typedef struct mylib_data mylib_data_t;

// Lifecycle functions
mylib_context_t *mylib_create(void);
void mylib_destroy(mylib_context_t *ctx);

// Core functionality
mylib_error_t mylib_process_data(mylib_context_t *ctx,
                                const void *input, size_t input_size,
                                void *output, size_t *output_size);

// Utility functions
const char *mylib_error_string(mylib_error_t error);
const char *mylib_version_string(void);

#ifdef __cplusplus
}
#endif

#endif // MYLIB_H
\`\`\`

\`\`\`c
// src/lib/core.c (Implementation)
#include "mylib.h"
#include <stdlib.h>
#include <string.h>
#include <assert.h>

// Internal structures
struct mylib_context {
    int initialized;
    char *buffer;
    size_t buffer_size;
    // Private data...
};

struct mylib_data {
    uint32_t id;
    char *content;
    size_t content_size;
};

// Static error messages
static const char *error_messages[] = {
    "Success",
    "Invalid argument",
    "Memory allocation failed",
    "I/O operation failed",
    "Resource not found"
};

// Static functions
static mylib_error_t validate_input(const void *input, size_t size) {
    if (!input || size == 0) {
        return MYLIB_ERROR_INVALID_ARGUMENT;
    }
    return MYLIB_SUCCESS;
}

static void set_context_error(mylib_context_t *ctx, mylib_error_t error) {
    // Store error for later retrieval
    (void)ctx;  // Not implemented in this example
    (void)error;
}

// Public API implementations
mylib_context_t *mylib_create(void) {
    mylib_context_t *ctx = calloc(1, sizeof(mylib_context_t));
    if (!ctx) return NULL;

    ctx->buffer_size = 4096;
    ctx->buffer = malloc(ctx->buffer_size);
    if (!ctx->buffer) {
        free(ctx);
        return NULL;
    }

    ctx->initialized = 1;
    return ctx;
}

void mylib_destroy(mylib_context_t *ctx) {
    if (ctx) {
        free(ctx->buffer);
        free(ctx);
    }
}

mylib_error_t mylib_process_data(mylib_context_t *ctx,
                                const void *input, size_t input_size,
                                void *output, size_t *output_size) {
    if (!ctx || !ctx->initialized) {
        return MYLIB_ERROR_INVALID_ARGUMENT;
    }

    mylib_error_t error = validate_input(input, input_size);
    if (error != MYLIB_SUCCESS) {
        set_context_error(ctx, error);
        return error;
    }

    // Ensure output buffer is large enough
    if (*output_size < input_size) {
        set_context_error(ctx, MYLIB_ERROR_INVALID_ARGUMENT);
        return MYLIB_ERROR_INVALID_ARGUMENT;
    }

    // Process data (simple copy in this example)
    memcpy(output, input, input_size);
    *output_size = input_size;

    return MYLIB_SUCCESS;
}

const char *mylib_error_string(mylib_error_t error) {
    int index = -error;  // Convert negative error to positive index
    if (index >= 0 && index < (int)(sizeof(error_messages) / sizeof(error_messages[0]))) {
        return error_messages[index];
    }
    return "Unknown error";
}

const char *mylib_version_string(void) {
    static char version[32];
    snprintf(version, sizeof(version), "%d.%d.%d",
             MYLIB_VERSION_MAJOR, MYLIB_VERSION_MINOR, MYLIB_VERSION_PATCH);
    return version;
}
\`\`\`

## Testing Strategies

### Unit Testing Framework
\`\`\`c
// test_framework.h
#ifndef TEST_FRAMEWORK_H
#define TEST_FRAMEWORK_H

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    const char *name;
    int (*test_func)(void);
    int passed;
    int failed;
} TestCase;

typedef struct {
    const char *suite_name;
    TestCase *tests;
    size_t test_count;
    size_t passed;
    size_t failed;
} TestSuite;

// Test assertion macros
#define TEST_ASSERT(condition) \\
    do { \\
        if (!(condition)) { \\
            fprintf(stderr, "ASSERTION FAILED: %s at %s:%d\\n", \\
                    #condition, __FILE__, __LINE__); \\
            return 0; \\
        } \\
    } while (0)

#define TEST_ASSERT_EQUAL(a, b) \\
    do { \\
        if ((a) != (b)) { \\
            fprintf(stderr, "ASSERTION FAILED: %s != %s (%d != %d) at %s:%d\\n", \\
                    #a, #b, (int)(a), (int)(b), __FILE__, __LINE__); \\
            return 0; \\
        } \\
    } while (0)

#define TEST_ASSERT_STR_EQUAL(a, b) \\
    do { \\
        if (strcmp((a), (b)) != 0) { \\
            fprintf(stderr, "ASSERTION FAILED: strings not equal at %s:%d\\n", \\
                    __FILE__, __LINE__); \\
            return 0; \\
        } \\
    } while (0)

// Test runner
int run_test_suite(TestSuite *suite);

#endif // TEST_FRAMEWORK_H
\`\`\`

\`\`\`c
// test_framework.c
#include "test_framework.h"

int run_test_suite(TestSuite *suite) {
    printf("Running test suite: %s\\n", suite->suite_name);
    printf("=======================================\\n");

    suite->passed = 0;
    suite->failed = 0;

    for (size_t i = 0; i < suite->test_count; i++) {
        TestCase *test = &suite->tests[i];
        printf("  Running %s... ", test->name);
        fflush(stdout);

        int result = test->test_func();
        if (result) {
            printf("PASSED\\n");
            suite->passed++;
            test->passed++;
        } else {
            printf("FAILED\\n");
            suite->failed++;
            test->failed++;
        }
    }

    printf("\\nResults: %zu passed, %zu failed\\n",
           suite->passed, suite->failed);

    return suite->failed == 0 ? 0 : 1;
}
\`\`\`

\`\`\`c
// Example usage in test_main.c
#include "test_framework.h"
#include "mylib.h"

// Test functions
int test_mylib_create_destroy(void) {
    mylib_context_t *ctx = mylib_create();
    TEST_ASSERT(ctx != NULL);

    mylib_destroy(ctx);
    return 1;
}

int test_mylib_process_data(void) {
    mylib_context_t *ctx = mylib_create();
    TEST_ASSERT(ctx != NULL);

    const char *input = "Hello, World!";
    char output[50];
    size_t output_size = sizeof(output);

    mylib_error_t result = mylib_process_data(ctx, input, strlen(input),
                                             output, &output_size);

    TEST_ASSERT(result == MYLIB_SUCCESS);
    TEST_ASSERT_STR_EQUAL(input, output);

    mylib_destroy(ctx);
    return 1;
}

int main() {
    TestCase tests[] = {
        {"create_destroy", test_mylib_create_destroy, 0, 0},
        {"process_data", test_mylib_process_data, 0, 0}
    };

    TestSuite suite = {
        "MyLib Tests",
        tests,
        sizeof(tests) / sizeof(tests[0]),
        0, 0
    };

    return run_test_suite(&suite);
}
\`\`\`

## Continuous Integration Setup

### GitHub Actions CI/CD Pipeline
\`\`\`yaml
name: C/C++ CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: \${{ matrix.os }}

    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
        compiler: [gcc, clang]
        exclude:
          - os: windows-latest
            compiler: clang

    steps:
    - uses: actions/checkout@v3

    - name: Install dependencies (Linux)
      if: runner.os == 'Linux'
      run: |
        sudo apt-get update
        sudo apt-get install -y build-essential cmake ninja-build

    - name: Install dependencies (macOS)
      if: runner.os == 'macOS'
      run: |
        brew install cmake ninja

    - name: Configure
      run: |
        mkdir build
        cd build
        cmake -G Ninja -DCMAKE_C_COMPILER=\${{ matrix.compiler }} ..

    - name: Build
      run: |
        cd build
        ninja

    - name: Static Analysis
      if: runner.os == 'Linux' && matrix.compiler == 'gcc'
      run: |
        sudo apt-get install -y cppcheck
        cppcheck --enable=all --std=c11 --error-exitcode=1 src/

    - name: Run Tests
      run: |
        cd build
        ctest --output-on-failure

    - name: Memory Check (Linux)
      if: runner.os == 'Linux'
      run: |
        sudo apt-get install -y valgrind
        cd build
        valgrind --error-exitcode=1 --leak-check=full ./test_suite

    - name: Code Coverage (Linux)
      if: runner.os == 'Linux' && matrix.compiler == 'gcc'
      run: |
        cd build
        # Generate coverage report
        gcovr --xml --output=coverage.xml
        gcovr --print-summary
\`\`\`

## Package Management and Distribution

### Creating Debian Packages
\`\`\`bash
# Create package directory structure
mkdir -p mypackage-1.0.0/DEBIAN
mkdir -p mypackage-1.0.0/usr/local/bin
mkdir -p mypackage-1.0.0/usr/local/lib
mkdir -p mypackage-1.0.0/usr/local/include

# Copy files
cp build/myprogram mypackage-1.0.0/usr/local/bin/
cp build/libmylib.so mypackage-1.0.0/usr/local/lib/
cp include/*.h mypackage-1.0.0/usr/local/include/

# Create control file
cat > mypackage-1.0.0/DEBIAN/control << EOF
Package: mypackage
Version: 1.0.0
Section: devel
Priority: optional
Architecture: amd64
Depends: libc6 (>= 2.15)
Maintainer: Your Name <your.email@example.com>
Description: My C Library and Tools
 A comprehensive C library with command-line tools.
EOF

# Build package
dpkg-deb --build mypackage-1.0.0

# Install package
sudo dpkg -i mypackage-1.0.0.deb
\`\`\`

### Creating RPM Packages
\`\`\`spec
# mypackage.spec
Name:           mypackage
Version:        1.0.0
Release:        1%{?dist}
Summary:        My C Library and Tools

License:        MIT
URL:            https://github.com/user/mypackage
Source0:        %{name}-%{version}.tar.gz

BuildRequires:  gcc, make, cmake
Requires:       glibc

%description
A comprehensive C library with command-line tools.

%prep
%autosetup

%build
mkdir build
cd build
cmake ..
make %{?_smp_mflags}

%install
cd build
make install DESTDIR=%{buildroot}

%files
%license LICENSE
%doc README.md
%{_bindir}/myprogram
%{_libdir}/libmylib.so*
%{_includedir}/*.h

%changelog
* Mon Jan 1 2024 Your Name <your.email@example.com> - 1.0.0-1
- Initial package
\`\`\`

## Documentation and Code Quality

### Doxygen Configuration
\`\`\`doxygen
# Doxyfile
PROJECT_NAME           = "My C Library"
PROJECT_NUMBER         = 1.0.0
OUTPUT_DIRECTORY       = docs/
INPUT                  = src/ include/
RECURSIVE              = YES
EXTRACT_ALL            = YES
EXTRACT_PRIVATE        = YES
EXTRACT_STATIC         = YES
GENERATE_HTML          = YES
GENERATE_LATEX         = NO
HAVE_DOT               = YES
CALL_GRAPH             = YES
CALLER_GRAPH           = YES
UML_LOOK               = YES
TEMPLATE_RELATIONS     = YES
\`\`\`

### Code Quality Checklist
\`\`\`bash
#!/bin/bash
# code_quality_check.sh

echo "Running code quality checks..."

# Compile with warnings as errors
echo "1. Compilation check..."
gcc -Wall -Wextra -Werror -std=c11 -pedantic src/*.c -Iinclude/ -o /dev/null
if [ $? -ne 0 ]; then
    echo "❌ Compilation failed"
    exit 1
fi
echo "✅ Compilation successful"

# Static analysis
echo "2. Static analysis..."
cppcheck --enable=all --std=c11 --error-exitcode=1 src/
if [ $? -ne 0 ]; then
    echo "❌ Static analysis failed"
    exit 1
fi
echo "✅ Static analysis passed"

# Unit tests
echo "3. Unit tests..."
make test
if [ $? -ne 0 ]; then
    echo "❌ Unit tests failed"
    exit 1
fi
echo "✅ Unit tests passed"

# Memory checks
echo "4. Memory checks..."
valgrind --error-exitcode=1 --leak-check=full ./test_suite
if [ $? -ne 0 ]; then
    echo "❌ Memory leaks detected"
    exit 1
fi
echo "✅ No memory leaks"

# Code formatting
echo "5. Code formatting..."
find src/ include/ -name "*.c" -o -name "*.h" | xargs clang-format --dry-run --Werror
if [ $? -ne 0 ]; then
    echo "❌ Code formatting issues"
    exit 1
fi
echo "✅ Code formatting correct"

# Documentation
echo "6. Documentation..."
doxygen Doxyfile >/dev/null 2>&1
if [ ! -f docs/html/index.html ]; then
    echo "❌ Documentation generation failed"
    exit 1
fi
echo "✅ Documentation generated"

echo ""
echo "🎉 All quality checks passed!"
\`\`\`

## Version Control Best Practices

### Git Workflow for C Projects
\`\`\`bash
# Initialize repository
git init
git add .
git commit -m "Initial commit"

# Create develop branch
git checkout -b develop

# Feature branches
git checkout -b feature/new-algorithm
# Implement feature
git commit -m "Implement new sorting algorithm"
git checkout develop
git merge feature/new-algorithm

# Release process
git checkout main
git merge develop
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin main --tags
\`\`\`

### Commit Message Conventions
\`\`\`bash
# Good commit messages
git commit -m "feat: add binary search algorithm"
git commit -m "fix: correct memory leak in hash table"
git commit -m "docs: update API documentation"
git commit -m "refactor: simplify error handling in file I/O"
git commit -m "test: add unit tests for string utilities"
\`\`\`

## Performance Profiling Workflow

### Profiling Session
\`\`\`bash
# Build with profiling
gcc -pg -O2 -o program program.c

# Run program to generate gmon.out
./program

# Analyze with gprof
gprof program gmon.out > profile.txt

# View results
cat profile.txt
\`\`\`

### Cache Profiling
\`\`\`bash
# Build with cachegrind
gcc -g -O2 -o program program.c

# Run cachegrind
valgrind --tool=cachegrind ./program

# View results
cg_annotate cachegrind.out.*
\`\`\`

Professional C development requires structured project organization, comprehensive testing, continuous integration, and adherence to best practices. These workflows ensure code quality, maintainability, and reliable software delivery.`
};

