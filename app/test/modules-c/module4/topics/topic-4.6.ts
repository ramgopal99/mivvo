import { SubLesson } from '../../../data/lessonsData';

export const topic_4_6: SubLesson = {
  id: 4.6,
  title: 'Scope and Lifetime of Variables',
  status: 'completed',
  content: `# 🎯 Scope and Lifetime of Variables

Master where variables are visible and how long they exist in C programs. Understanding scope and lifetime prevents bugs and improves code organization.

---

## 🔍 What is Variable Scope?

**Scope determines where a variable can be accessed in the program.**

### Local Scope (Block Scope)

\`\`\`c
#include <stdio.h>

int main() {
    int x = 10;  // x is visible from here...

    if (x > 5) {
        int y = 20;  // y is visible only in this block
        printf("x = %d, y = %d\\n", x, y);
    }

    // printf("%d\\n", y);  // ❌ Error: y is not visible here

    return 0;
}  // ...until here
\`\`\`

### Global Scope (File Scope)

\`\`\`c
#include <stdio.h>

// Global variable - visible throughout the file
int global_counter = 0;

void increment_counter() {
    global_counter++;  // Can access global variable
    printf("Counter: %d\\n", global_counter);
}

int main() {
    increment_counter();  // Counter: 1
    increment_counter();  // Counter: 2
    global_counter = 10;  // Can modify global variable
    increment_counter();  // Counter: 11

    return 0;
}
\`\`\`

---

## ⏰ Variable Lifetime

**Lifetime determines how long a variable exists in memory.**

### Automatic Variables (Local Variables)

\`\`\`c
void example_function() {
    int local_var = 42;  // Created when function starts
    printf("%d\\n", local_var);
    // local_var is destroyed when function ends
}

int main() {
    example_function();  // local_var is created and destroyed here
    example_function();  // local_var is created again
    return 0;
}
\`\`\`

### Static Variables

\`\`\`c
void counter_function() {
    static int count = 0;  // Created once, persists between calls
    count++;
    printf("Call #%d\\n", count);
}

int main() {
    counter_function();  // Call #1
    counter_function();  // Call #2
    counter_function();  // Call #3
    return 0;
}
\`\`\`

### Global Variables

\`\`\`c
// Global variable - exists for entire program lifetime
int program_counter = 0;

void increment_global() {
    program_counter++;
}

int main() {
    increment_global();  // program_counter becomes 1
    increment_global();  // program_counter becomes 2
    printf("Final count: %d\\n", program_counter);
    return 0;
}  // program_counter is destroyed when program ends
\`\`\`

---

## 📦 Storage Classes in C

### 1. auto (Automatic Storage)

\`\`\`c
void function() {
    auto int x = 10;  // Explicit auto (same as just int x = 10)
    // x exists only during function execution
}
\`\`\`

**Characteristics:**
- Default for local variables
- Created when block is entered
- Destroyed when block is exited
- Uninitialized auto variables contain garbage values

### 2. static (Static Storage)

\`\`\`c
void counter() {
    static int count = 0;  // Initialized once
    count++;
    printf("Count: %d\\n", count);
}

int main() {
    counter();  // Count: 1
    counter();  // Count: 2
    counter();  // Count: 3
    return 0;
}
\`\`\`

**Characteristics:**
- Retains value between function calls
- Initialized to 0 by default (if not explicitly initialized)
- Lifetime is entire program execution
- Scope is limited to the block where declared

### 3. extern (External Storage)

#### file1.c
\`\`\`c
int global_var = 42;  // Definition

void set_global(int value) {
    global_var = value;
}
\`\`\`

#### file2.c
\`\`\`c
extern int global_var;  // Declaration (not definition)

void print_global() {
    printf("Global: %d\\n", global_var);
}

int main() {
    print_global();  // Global: 42
    set_global(100);
    print_global();  // Global: 100
    return 0;
}
\`\`\`

**Characteristics:**
- Declares that variable is defined elsewhere
- Used for global variables across multiple files
- No memory allocated by extern declaration

### 4. register (Register Storage)

\`\`\`c
void fast_loop() {
    register int i;  // Hint to store in CPU register

    for (i = 0; i < 1000000; i++) {
        // Fast access to i (if possible)
    }
}
\`\`\`

**Characteristics:**
- Hint to compiler to store variable in CPU register
- Cannot take address of register variables
- Usually ignored by modern compilers (they optimize automatically)

---

## 🏗️ Scope Rules

### Block Scope

\`\`\`c
int main() {
    int outer = 10;

    {
        int inner = 20;
        printf("Inner block: outer=%d, inner=%d\\n", outer, inner);
    }

    // printf("%d\\n", inner);  // ❌ inner is not visible here

    return 0;
}
\`\`\`

### Function Scope

\`\`\`c
void function1() {
    int local_to_function1 = 1;
    // Can access global variables here
}

void function2() {
    int local_to_function2 = 2;
    // local_to_function1 is not visible here
}
\`\`\`

### File Scope (Global)

\`\`\`c
// Global variables - visible in all functions in this file
int global_var = 42;
static int file_static = 100;  // Visible only in this file

void func1() {
    global_var = 50;  // Can modify
}

void func2() {
    printf("%d\\n", global_var);  // Can access
}
\`\`\`

### Shadowing

\`\`\`c
int global_var = 100;

void example() {
    int global_var = 200;  // Shadows global variable

    printf("Local: %d\\n", global_var);  // Prints 200

    {
        int global_var = 300;  // Shadows again
        printf("Inner: %d\\n", global_var);  // Prints 300
    }

    printf("Back to local: %d\\n", global_var);  // Prints 200
}

int main() {
    example();
    printf("Global: %d\\n", global_var);  // Prints 100
    return 0;
}
\`\`\`

---

## 🧪 Practical Examples

### Static Variables for State

\`\`\`c
#include <stdio.h>

int generate_id() {
    static int next_id = 1000;  // Persists between calls
    return next_id++;
}

int main() {
    printf("ID 1: %d\\n", generate_id());  // 1000
    printf("ID 2: %d\\n", generate_id());  // 1001
    printf("ID 3: %d\\n", generate_id());  // 1002
    return 0;
}
\`\`\`

### Function with Internal State

\`\`\`c
#include <stdio.h>

double calculate_running_average(int new_value) {
    static int sum = 0;
    static int count = 0;

    sum += new_value;
    count++;

    return (double)sum / count;
}

int main() {
    printf("Average after 10: %.2f\\n", calculate_running_average(10));
    printf("Average after 20: %.2f\\n", calculate_running_average(20));
    printf("Average after 30: %.2f\\n", calculate_running_average(30));
    return 0;
}
\`\`\`

### File-Scoped Static Variables

\`\`\`c
// file1.c
static int file_counter = 0;  // Only visible in this file

void increment_file_counter() {
    file_counter++;
}

int get_file_counter() {
    return file_counter;
}

// file2.c
// static int file_counter = 0;  // This would be a different variable

void other_function() {
    // Cannot access file_counter from file1.c
    // Must use get_file_counter() function
}
\`\`\`

---

## 🐛 Common Scope and Lifetime Issues

### Accessing Out-of-Scope Variables

\`\`\`c
void bad_function() {
    int local_var = 42;

    if (local_var > 0) {
        int temp = local_var * 2;
        // temp is only valid in this block
    }

    // printf("%d\\n", temp);  // ❌ temp is out of scope
}
\`\`\`

### Returning Local Variable Addresses

\`\`\`c
int* bad_pointer_function() {
    int local_var = 42;
    return &local_var;  // ❌ Dangerous! local_var dies when function returns
}

int main() {
    int* ptr = bad_pointer_function();
    // *ptr is now undefined behavior - could crash or give wrong values
    return 0;
}
\`\`\`

**Fix:** Use static variables or dynamic allocation

\`\`\`c
int* good_pointer_function() {
    static int static_var = 42;  // Persists after function returns
    return &static_var;
}

// Or use dynamic allocation
int* dynamic_function() {
    int* heap_var = (int*)malloc(sizeof(int));
    *heap_var = 42;
    return heap_var;  // Caller must free()
}
\`\`\`

### Global Variable Name Conflicts

\`\`\`c
// file1.c
int counter = 0;  // Global

// file2.c
int counter = 0;  // ❌ Multiple definition error!

// Fix: Use static or different names
static int counter = 0;  // File scope only
\`\`\`

### Uninitialized Static Variables

\`\`\`c
void function() {
    static int uninitialized_static;  // Initialized to 0 automatically
    auto int uninitialized_auto;      // Contains garbage value

    printf("Static: %d, Auto: %d\\n", uninitialized_static, uninitialized_auto);
}
\`\`\`

---

## 💡 Best Practices

### Minimize Global Variables

\`\`\`c
// ❌ Too many globals
int error_count = 0;
char* last_error = NULL;
int debug_mode = 0;

// ✅ Encapsulate in functions or structures
typedef struct {
    int error_count;
    char* last_error;
    int debug_mode;
} ProgramState;

ProgramState* get_program_state() {
    static ProgramState state = {0, NULL, 0};
    return &state;
}
\`\`\`

### Use Meaningful Names to Avoid Conflicts

\`\`\`c
// ✅ Specific names
int student_count;
int teacher_count;

// ❌ Generic names that might conflict
int count;  // Too generic
\`\`\`

### Prefer Local Variables

\`\`\`c
// ✅ Local variables are safer
void process_data(int data) {
    int processed_data = data * 2;  // Local variable
    // Use processed_data...
}

// ❌ Global variables can cause unexpected interactions
int processed_data;  // Global - can be modified anywhere
\`\`\`

### Use static for Internal State

\`\`\`c
// ✅ Good use of static
int generate_unique_id() {
    static int next_id = 1000;
    return next_id++;
}

// ❌ Bad: global for the same purpose
int next_id = 1000;  // Can be modified by any function
int generate_unique_id_bad() {
    return next_id++;
}
\`\`\`

---

## 🧪 Complete Examples

### Memory Pool with Static Variables

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define POOL_SIZE 100

// Memory pool implementation
typedef struct {
    char pool[POOL_SIZE];
    int used;
} MemoryPool;

MemoryPool* get_memory_pool() {
    static MemoryPool pool = {{0}, 0};  // Static initialization
    return &pool;
}

char* allocate_string(const char* str) {
    MemoryPool* pool = get_memory_pool();
    int len = strlen(str) + 1;  // +1 for null terminator

    if (pool->used + len > POOL_SIZE) {
        return NULL;  // No space left
    }

    char* result = &pool->pool[pool->used];
    strcpy(result, str);
    pool->used += len;

    return result;
}

void reset_memory_pool() {
    MemoryPool* pool = get_memory_pool();
    pool->used = 0;
}

int main() {
    // Allocate strings from the pool
    char* str1 = allocate_string("Hello");
    char* str2 = allocate_string("World");

    if (str1 && str2) {
        printf("%s %s\\n", str1, str2);
    }

    // Strings persist until reset
    reset_memory_pool();

    return 0;
}
\`\`\`

### Function Call Counter

\`\`\`c
#include <stdio.h>

// Function to demonstrate different scopes
void demonstrate_scopes() {
    // Local to function
    int function_local = 42;

    // Static local - persists between calls
    static int call_count = 0;
    call_count++;

    printf("Function call #%d\\n", call_count);
    printf("Function local: %d\\n", function_local);

    if (call_count == 1) {
        // Block scope
        int block_local = 100;
        printf("Block local: %d\\n", block_local);
    }

    // printf("%d\\n", block_local);  // ❌ Out of scope
}

int main() {
    demonstrate_scopes();
    printf("---\\n");
    demonstrate_scopes();
    printf("---\\n");
    demonstrate_scopes();

    return 0;
}
\`\`\`

### Multi-File Variable Scope

#### globals.h
\`\`\`c
#ifndef GLOBALS_H
#define GLOBALS_H

// External declarations
extern int global_counter;
extern const char* program_name;

// Function declarations
void increment_counter(void);
void print_counter(void);

#endif
\`\`\`

#### globals.c
\`\`\`c
#include <stdio.h>
#include "globals.h"

// Global variable definitions
int global_counter = 0;
const char* program_name = "Scope Demo";

// Static global - only visible in this file
static int internal_counter = 100;

void increment_counter(void) {
    global_counter++;
    internal_counter++;
}

void print_counter(void) {
    printf("Global counter: %d\\n", global_counter);
    printf("Internal counter: %d\\n", internal_counter);
}
\`\`\`

#### main.c
\`\`\`c
#include <stdio.h>
#include "globals.h"

int main() {
    printf("Program: %s\\n", program_name);

    increment_counter();
    print_counter();

    increment_counter();
    print_counter();

    // printf("%d\\n", internal_counter);  // ❌ Not visible here

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Scope** determines where variables are accessible
2. **Lifetime** determines how long variables exist
3. **Local variables** are created/destroyed with function calls
4. **Static variables** persist between function calls
5. **Global variables** are visible throughout the program
6. **Storage classes** control variable behavior
7. **Avoid global variables** when possible - they can cause bugs
8. **Use static** for variables that need to persist but stay local

---

## 🚀 Preview: Recursive Functions

In the next topic, you'll learn about:
- **Recursive function calls** and base cases
- **Recursion vs iteration** trade-offs
- **Stack overflow** and recursion limits
- **Tail recursion** and optimization
- **Common recursive algorithms**

**Recursion turns complex problems into elegant solutions!** 🔄`
};
