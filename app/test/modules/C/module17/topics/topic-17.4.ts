import { SubLesson } from '../../../../data/lessonsData';

export const topic_17_4: SubLesson = {
  id: '17.4',
  title: 'Development Tools and IDEs',
  status: 'demo',
  content: `# Development Tools and IDEs for C

## Code Analysis Tools

### Static Analysis with cppcheck
\`\`\`bash
# Basic analysis
cppcheck --enable=all --std=c11 src/

# Generate XML output
cppcheck --xml --xml-version=2 src/ > cppcheck_results.xml

# Check specific standards
cppcheck --std=c99 --enable=warning,style,performance,portability src/

# Inline suppressions
// cppcheck-suppress nullPointer
char *ptr = NULL;

// Configuration file
[project]
title = MyProject
scan = src/
exclude = src/third_party/

[library]
defines = MY_MACRO=1
includes = include/
\`\`\`

### Clang Static Analyzer
\`\`\`bash
# Run static analyzer
scan-build gcc -c source.c

# With make
scan-build make

# Generate HTML reports
scan-build -o reports/ make

# Cross-translation unit analysis
scan-build --ctu make
\`\`\`

## Code Formatting and Style

### clang-format
\`\`\`bash
# Format single file
clang-format -i source.c

# Format all C files
find src/ -name "*.c" -o -name "*.h" | xargs clang-format -i

# Check formatting without changes
clang-format --dry-run source.c
\`\`\`

**.clang-format configuration:**
\`\`\`yaml
BasedOnStyle: LLVM
IndentWidth: 4
UseTab: Never
ColumnLimit: 100
BreakBeforeBraces: Linux
AllowShortIfStatementsOnASingleLine: true
AllowShortFunctionsOnASingleLine: true
IndentCaseLabels: true
\`\`\`

### Artistic Style (astyle)
\`\`\`bash
# Format with astyle
astyle --style=linux --indent=spaces=4 --convert-tabs source.c

# In-place formatting
astyle --style=ansi --indent=spaces=4 -n source.c
\`\`\`

## Documentation Generation

### Doxygen
\`\`\`c
/**
 * @file mylibrary.h
 * @brief Main header file for my library
 * @author John Doe
 * @date 2024
 */

/**
 * @brief Calculate factorial
 * @param n Input number
 * @return Factorial of n
 * @note This function uses iteration for efficiency
 *
 * Example usage:
 * @code
 * int result = factorial(5); // result = 120
 * @endcode
 */
int factorial(int n);

/**
 * @struct Point
 * @brief 2D point structure
 */
typedef struct {
    double x; /**< X coordinate */
    double y; /**< Y coordinate */
} Point;

/**
 * @enum ErrorCode
 * @brief Error codes for the library
 */
typedef enum {
    ERROR_NONE = 0,     /**< No error */
    ERROR_INVALID_ARG,  /**< Invalid argument */
    ERROR_MEMORY       /**< Memory allocation failed */
} ErrorCode;
\`\`\`

**Doxyfile configuration:**
\`\`\`makefile
PROJECT_NAME = "My C Library"
INPUT = src/ include/
OUTPUT_DIRECTORY = docs/
EXTRACT_ALL = YES
EXTRACT_PRIVATE = YES
EXTRACT_STATIC = YES
GENERATE_HTML = YES
GENERATE_LATEX = NO
HAVE_DOT = YES
CALL_GRAPH = YES
CALLER_GRAPH = YES
\`\`\`

### Sphinx with Breathe
\`\`\`python
# conf.py for Sphinx
extensions = ['breathe']
breathe_projects = {'myproject': 'xml'}
breathe_default_project = 'myproject'

# Generate XML for breathe
doxygen -g Doxyfile
echo "INPUT = src/ include/" >> Doxyfile
echo "GENERATE_XML = YES" >> Doxyfile
doxygen Doxyfile
\`\`\`

## Version Control Integration

### Git Hooks for Code Quality
\`\`\`bash
# .git/hooks/pre-commit
#!/bin/bash

# Run static analysis
cppcheck --quiet --enable=all src/
if [ $? -ne 0 ]; then
    echo "Static analysis failed"
    exit 1
fi

# Check formatting
if ! clang-format --dry-run --Werror source.c >/dev/null 2>&1; then
    echo "Code formatting issues found"
    exit 1
fi

# Run tests
make test
if [ $? -ne 0 ]; then
    echo "Tests failed"
    exit 1
fi

echo "Pre-commit checks passed"
\`\`\`

### Git Attributes for C Projects
\`\`\`.gitattributes
# Auto-detect text files and perform LF normalization
* text=auto eol=lf

# C source files
*.c text
*.h text

# Binary files
*.o binary
*.a binary
*.so binary
*.dll binary

# Generated files
*.doxygen binary
*~ text

# Language-specific settings
*.c linguist-language=C
*.h linguist-language=C
\`\`\`

## Integrated Development Environments

### Visual Studio Code Configuration

**c_cpp_properties.json:**
\`\`\`json
{
    "configurations": [
        {
            "name": "Linux",
            "includePath": [
                "\${workspaceFolder}/include",
                "\${workspaceFolder}/src",
                "/usr/include",
                "/usr/local/include"
            ],
            "defines": [
                "DEBUG",
                "_GNU_SOURCE"
            ],
            "compilerPath": "/usr/bin/gcc",
            "cStandard": "c11",
            "cppStandard": "c++11",
            "intelliSenseMode": "gcc-x64"
        }
    ],
    "version": 4
}
\`\`\`

**settings.json for C development:**
\`\`\`json
{
    "C_Cpp.clang_format_path": "clang-format",
    "C_Cpp.clang_format_style": "file",
    "C_Cpp.errorSquiggles": "Enabled",
    "C_Cpp.intelliSenseEngine": "default",
    "C_Cpp.autocomplete": "Default",
    "C_Cpp.formatting": "Default",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.clang": "explicit"
    },
    "files.associations": {
        "*.h": "c",
        "*.c": "c"
    }
}
\`\`\`

### Eclipse CDT Configuration

**Project properties for C/C++ Build:**
\`\`\`
# Compiler settings
GCC C Compiler -> Miscellaneous -> Other flags: -std=c11 -Wall -Wextra

# Linker settings
GCC C Linker -> Libraries: Add "m" for math library

# Include paths
GCC C Compiler -> Includes: Add workspace include paths
\`\`\`

### CLion Configuration

**CMakeLists.txt for CLion:**
\`\`\`cmake
cmake_minimum_required(VERSION 3.15)
project(myproject C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_C_STANDARD_REQUIRED ON)

# Compiler warnings
add_compile_options(-Wall -Wextra -Wpedantic)

# Sanitizers for debug builds
set(CMAKE_C_FLAGS_DEBUG "\${CMAKE_C_FLAGS_DEBUG} -fsanitize=address -fsanitize=undefined")

# Source files
file(GLOB_RECURSE SOURCES CONFIGURE_DEPENDS "src/*.c")
file(GLOB_RECURSE HEADERS CONFIGURE_DEPENDS "include/*.h")

add_executable(\${PROJECT_NAME} \${SOURCES} \${HEADERS})
target_include_directories(\${PROJECT_NAME} PRIVATE include)

# Link libraries
target_link_libraries(\${PROJECT_NAME} m pthread)
\`\`\`

## Debugging Tools Integration

### gdbgui - Web-based GDB
\`\`\`bash
# Install gdbgui
pip install gdbgui

# Run with your program
gdbgui program

# Advanced usage
gdbgui --gdb-args="--tui" program
\`\`\`

### Valgrind Integration with IDEs

**VS Code Valgrind Extension:**
\`\`\`json
{
    "valgrind.memcheck": {
        "tool": "memcheck",
        "leakCheck": "full",
        "trackOrigins": true,
        "showReachable": true
    }
}
\`\`\`

### AddressSanitizer Integration
\`\`\`cmake
# CMakeLists.txt
option(ENABLE_ASAN "Enable AddressSanitizer" OFF)

if(ENABLE_ASAN)
    add_compile_options(-fsanitize=address -fno-omit-frame-pointer)
    add_link_options(-fsanitize=address)
endif()
\`\`\`

## Code Coverage Analysis

### gcov with lcov
\`\`\`bash
# Compile with coverage
gcc --coverage -O0 -g test.c -o test

# Run tests
./test

# Generate coverage data
lcov --capture --directory . --output-file coverage.info

# Generate HTML report
genhtml coverage.info --output-directory coverage_report/

# View report
firefox coverage_report/index.html
\`\`\`

### gcovr for XML/JSON output
\`\`\`bash
# Generate Cobertura XML
gcovr --xml --output=coverage.xml

# Generate JSON
gcovr --json --output=coverage.json

# Generate summary
gcovr --print-summary
\`\`\`

## Continuous Integration Setup

### GitHub Actions for C
\`\`\`yaml
name: C CI

on: [push, pull_request]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Install dependencies
      run: |
        sudo apt-get update
        sudo apt-get install -y build-essential cmake valgrind cppcheck clang-format

    - name: Configure
      run: |
        mkdir build
        cd build
        cmake -DCMAKE_BUILD_TYPE=Debug ..

    - name: Build
      run: |
        cd build
        make -j$(nproc)

    - name: Format check
      run: |
        find src/ -name "*.c" -o -name "*.h" | xargs clang-format --dry-run --Werror

    - name: Static analysis
      run: |
        cppcheck --enable=all --std=c11 --error-exitcode=1 src/

    - name: Run tests
      run: |
        cd build
        ctest --output-on-failure

    - name: Memory check
      run: |
        cd build
        valgrind --error-exitcode=1 --leak-check=full ./test_program

    - name: Generate coverage
      run: |
        cd build
        lcov --capture --directory . --output-file coverage.info
        lcov --remove coverage.info '/usr/*' --output-file coverage.info
        lcov --list coverage.info
\`\`\`

## Code Review Tools

### Git Integration
\`\`\`bash
# Create patch for review
git format-patch -1 HEAD

# Apply patch
git am 0001-fix-bug.patch

# Interactive rebase for cleaning commits
git rebase -i HEAD~5
\`\`\`

### Gerrit Code Review
\`\`\`bash
# Install git-review
pip install git-review

# Configure for Gerrit
git config remote.origin.push HEAD:refs/for/master

# Submit for review
git review
\`\`\`

Development tools and IDEs significantly enhance C programming productivity. Understanding static analysis, code formatting, documentation generation, and CI/CD integration creates professional development workflows.`
};

