import { SubLesson } from '../../../../data/lessonsData';

export const topic_17_2: SubLesson = {
  id: '17.2',
  title: 'Build Systems and Toolchains',
  status: 'demo',
  content: `# Build Systems and Toolchains in C

## GNU Make

### Basic Makefile Structure
\`\`\`makefile
# Variables
CC = gcc
CFLAGS = -Wall -Wextra -std=c11 -O2
LDFLAGS = -lm
TARGET = myprogram
SOURCES = main.c utils.c math.c
OBJECTS = $(SOURCES:.c=.o)

# Default target
all: $(TARGET)

# Link object files
$(TARGET): $(OBJECTS)
	$(CC) $(OBJECTS) -o $@ $(LDFLAGS)

# Compile source files
%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

# Clean build artifacts
clean:
	rm -f $(OBJECTS) $(TARGET)

# Install program
install: $(TARGET)
	install -m 755 $(TARGET) /usr/local/bin/

# Uninstall program
uninstall:
	rm -f /usr/local/bin/$(TARGET)

# Run tests
test: $(TARGET)
	./$(TARGET) --test

# Generate documentation
docs:
	doxygen Doxyfile

.PHONY: all clean install uninstall test docs
\`\`\`

### Advanced Makefile Features

**Automatic Dependency Generation:**
\`\`\`makefile
# Generate dependencies automatically
DEPDIR = .deps
DEPFLAGS = -MT $@ -MMD -MP -MF $(DEPDIR)/$*.d

# Compile rule with dependencies
%.o: %.c | $(DEPDIR)
	$(CC) $(CFLAGS) $(DEPFLAGS) -c $< -o $@

# Include dependency files
-include $(wildcard $(DEPDIR)/*.d)

# Create dependency directory
$(DEPDIR):
	mkdir -p $(DEPDIR)
\`\`\`

**Conditional Compilation:**
\`\`\`makefile
# Debug build
debug: CFLAGS += -g -O0 -DDEBUG
debug: all

# Release build
release: CFLAGS += -O3 -DNDEBUG
release: all

# Profile build
profile: CFLAGS += -pg
profile: LDFLAGS += -pg
profile: all

# Platform-specific flags
ifeq ($(OS),Windows_NT)
    TARGET_EXT = .exe
    RM = del /Q
else
    TARGET_EXT =
    RM = rm -f
endif

TARGET = myprogram$(TARGET_EXT)
\`\`\`

**Multi-directory Builds:**
\`\`\`makefile
# Source directories
SRC_DIRS = src core utils
BUILD_DIR = build

# Find all source files
SOURCES = $(foreach dir, $(SRC_DIRS), $(wildcard $(dir)/*.c))
OBJECTS = $(patsubst %.c, $(BUILD_DIR)/%.o, $(SOURCES))

# Create build directories
$(BUILD_DIR)/%.o: %.c | $(BUILD_DIR)
	@mkdir -p $(dir $@)
	$(CC) $(CFLAGS) -c $< -o $@

$(BUILD_DIR):
	@mkdir -p $(BUILD_DIR)

# Main target
$(TARGET): $(OBJECTS)
	$(CC) $^ -o $@ $(LDFLAGS)
\`\`\`

## CMake Build System

### Basic CMakeLists.txt
\`\`\`cmake
cmake_minimum_required(VERSION 3.10)
project(MyProject C)

# Set C standard
set(CMAKE_C_STANDARD 11)
set(CMAKE_C_STANDARD_REQUIRED ON)

# Find required packages
find_package(PkgConfig REQUIRED)
pkg_check_modules(GLIB REQUIRED glib-2.0)
pkg_check_modules(SQLITE3 REQUIRED sqlite3)

# Include directories
include_directories(include)
include_directories(\${GLIB_INCLUDE_DIRS})
include_directories(\${SQLITE3_INCLUDE_DIRS})

# Source files
file(GLOB SOURCES "src/*.c")
file(GLOB HEADERS "include/*.h")

# Create executable
add_executable(\${PROJECT_NAME} \${SOURCES} \${HEADERS})

# Link libraries
target_link_libraries(\${PROJECT_NAME}
    \${GLIB_LIBRARIES}
    \${SQLITE3_LIBRARIES}
    m  # math library
)

# Compiler flags
target_compile_options(\${PROJECT_NAME} PRIVATE
    -Wall
    -Wextra
    -Wpedantic
)

# Install target
install(TARGETS \${PROJECT_NAME}
    RUNTIME DESTINATION bin
)

# Enable testing
enable_testing()

# Add test
add_test(NAME unit_tests
    COMMAND \${PROJECT_NAME} --test
)
\`\`\`

### Advanced CMake Features

**Library Creation:**
\`\`\`cmake
# Create static library
add_library(mylib STATIC
    src/lib1.c
    src/lib2.c
)

# Create shared library
add_library(myshared SHARED
    src/shared1.c
    src/shared2.c
)

# Link executable with libraries
add_executable(myapp src/main.c)
target_link_libraries(myapp mylib myshared)
\`\`\`

**Cross-Platform Configuration:**
\`\`\`cmake
# Platform detection
if(WIN32)
    set(PLATFORM_WINDOWS TRUE)
    add_definitions(-DPLATFORM_WINDOWS)
elseif(UNIX AND NOT APPLE)
    set(PLATFORM_LINUX TRUE)
    add_definitions(-DPLATFORM_LINUX)
elseif(APPLE)
    set(PLATFORM_MACOS TRUE)
    add_definitions(-DPLATFORM_MACOS)
endif()

# Compiler-specific settings
if(CMAKE_C_COMPILER_ID MATCHES "GNU|Clang")
    add_compile_options(-Wall -Wextra)
elseif(MSVC)
    add_compile_options(/W4)
endif()

# Architecture detection
if(CMAKE_SIZEOF_VOID_P EQUAL 8)
    add_definitions(-DARCH_64BIT)
else()
    add_definitions(-DARCH_32BIT)
endif()
\`\`\`

## GNU Autotools

### Basic Autotools Setup

**configure.ac:**
\`\`\`m4
AC_INIT([myproject], [1.0])
AM_INIT_AUTOMAKE([-Wall -Werror foreign])
AC_PROG_CC
AC_CONFIG_HEADERS([config.h])
AC_CONFIG_FILES([
 Makefile
 src/Makefile
])
AC_OUTPUT
\`\`\`

**Makefile.am (root):**
\`\`\`makefile
SUBDIRS = src
ACLOCAL_AMFLAGS = -I m4
\`\`\`

**src/Makefile.am:**
\`\`\`makefile
bin_PROGRAMS = myprogram
myprogram_SOURCES = main.c utils.c
myprogram_LDADD = $(LIBM)
\`\`\`

**Build Process:**
\`\`\`bash
# Generate configure script
autoreconf -fiv

# Configure for build
./configure

# Build
make

# Install
make install

# Clean
make clean
\`\`\`

## Integrated Development Environments (IDEs)

### Visual Studio Code Configuration

**tasks.json:**
\`\`\`json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "build",
            "type": "shell",
            "command": "gcc",
            "args": [
                "-g",
                "-Wall",
                "-Wextra",
                "-std=c11",
                "main.c",
                "utils.c",
                "-o",
                "program"
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            }
        },
        {
            "label": "debug",
            "type": "shell",
            "command": "gdb",
            "args": ["./program"],
            "group": "test"
        }
    ]
}
\`\`\`

**launch.json:**
\`\`\`json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug C Program",
            "type": "cppdbg",
            "request": "launch",
            "program": "\${workspaceFolder}/program",
            "args": [],
            "stopAtEntry": false,
            "cwd": "\${workspaceFolder}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "gdb",
            "setupCommands": [
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
            ]
        }
    ]
}
\`\`\`

### CLion (JetBrains IDE)

**CMakeLists.txt for CLion:**
\`\`\`cmake
cmake_minimum_required(VERSION 3.15)
project(myproject C)

set(CMAKE_C_STANDARD 11)

# Add executable
add_executable(myproject main.c utils.c)

# Add include directories
target_include_directories(myproject PRIVATE include)

# Add compile definitions
target_compile_definitions(myproject PRIVATE DEBUG)

# Add link libraries
target_link_libraries(myproject m)
\`\`\`

## Compiler Toolchains

### GCC Toolchain Components

**Preprocessor (cpp):**
\`\`\`bash
# Preprocess only
gcc -E main.c -o main.i

# Define macros
gcc -DMY_MACRO=42 -E main.c

# Include paths
gcc -I/include/path -E main.c
\`\`\`

**Compiler (cc1):**
\`\`\`bash
# Compile to assembly
gcc -S main.c -o main.s

# Optimize for speed
gcc -O3 -S main.c

# Generate debugging info
gcc -g -S main.c
\`\`\`

**Assembler (as):**
\`\`\`bash
# Assemble to object file
gcc -c main.s -o main.o

# List symbols
nm main.o
\`\`\`

**Linker (ld):**
\`\`\`bash
# Link object files
gcc main.o utils.o -o program -lm

# Link with libraries
gcc main.o -L/lib/path -lmylib -o program

# Create shared library
gcc -shared obj1.o obj2.o -o libmylib.so
\`\`\`

## Continuous Integration

### GitHub Actions for C Projects
\`\`\`yaml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Install dependencies
      run: |
        sudo apt-get update
        sudo apt-get install -y build-essential cmake

    - name: Configure
      run: |
        mkdir build
        cd build
        cmake ..

    - name: Build
      run: |
        cd build
        make -j$(nproc)

    - name: Test
      run: |
        cd build
        ctest --output-on-failure

    - name: Static Analysis
      run: |
        sudo apt-get install -y cppcheck
        cppcheck --enable=all --std=c11 src/
\`\`\`

## Debugging Tools

### GDB Advanced Features

**Breakpoints and Watchpoints:**
\`\`\`bash
# Conditional breakpoint
break myfunction if x > 10

# Watchpoint
watch variable_name
watch *(int *)0xdeadbeef

# Catch system calls
catch syscall

# Temporary breakpoint
tbreak main
\`\`\`

**Advanced Commands:**
\`\`\`bash
# Print in different formats
print /x variable    # Hex
print /d variable    # Decimal
print /t variable    # Binary
print /c variable    # Character

# Examine memory
x/10xw 0xdeadbeef    # 10 words in hex
x/20cb buffer        # 20 bytes as characters

# Reverse debugging
record
reverse-step
reverse-continue

# Python scripting
python print("Hello from GDB")
\`\`\`

### Valgrind Memory Analysis
\`\`\`bash
# Memory leak detection
valgrind --leak-check=full ./program

# Detailed leak report
valgrind --leak-check=full --show-leak-kinds=all ./program

# Track origins of invalid memory
valgrind --track-origins=yes ./program

# Cache profiling
valgrind --tool=cachegrind ./program
cg_annotate cachegrind.out.*
\`\`\`

### Sanitizers
\`\`\`bash
# Address sanitizer
gcc -fsanitize=address -g program.c -o program
./program

# Undefined behavior sanitizer
gcc -fsanitize=undefined -g program.c -o program
./program

# Thread sanitizer
gcc -fsanitize=thread -g -pthread program.c -o program
./program
\`\`\`

Build systems and toolchains are essential for managing complex C projects. Understanding Make, CMake, IDEs, and debugging tools enables efficient development workflows and robust software delivery.`
};

