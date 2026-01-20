import { SubLesson } from '../../../../data/lessonsData';

export const topic_16_3: SubLesson = {
  id: '16.3',
  title: 'Advanced Debugging Techniques',
  status: 'demo',
  content: `# Advanced Debugging Techniques in C

## Runtime Assertion and Validation

### Enhanced Assertions with Context
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <stdarg.h>
#include <string.h>

// Enhanced assertion macro
#define ASSERT(condition, ...) \\
    do { \\
        if (!(condition)) { \\
            fprintf(stderr, "ASSERTION FAILED: %s\\n", #condition); \\
            fprintf(stderr, "File: %s, Line: %d\\n", __FILE__, __LINE__); \\
            fprintf(stderr, "Function: %s\\n", __func__); \\
            fprintf(stderr, "Message: "); \\
            fprintf(stderr, __VA_ARGS__); \\
            fprintf(stderr, "\\n"); \\
            abort(); \\
        } \\
    } while (0)

// Precondition and postcondition macros
#define PRECONDITION(condition) ASSERT(condition, "Precondition failed")
#define POSTCONDITION(condition) ASSERT(condition, "Postcondition failed")
#define INVARIANT(condition) ASSERT(condition, "Invariant violated")

// Usage example
double divide(double numerator, double denominator) {
    PRECONDITION(denominator != 0.0, "Division by zero");

    double result = numerator / denominator;

    POSTCONDITION(!isnan(result) && !isinf(result), "Invalid result");

    return result;
}

void process_array(int *array, size_t size) {
    PRECONDITION(array != NULL, "Array cannot be NULL");
    PRECONDITION(size > 0, "Array size must be positive");

    // Process array...

    INVARIANT(size > 0, "Array size corrupted during processing");
}
\`\`\`

### Debug Logging System
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>

// Debug levels
typedef enum {
    LOG_DEBUG,
    LOG_INFO,
    LOG_WARNING,
    LOG_ERROR,
    LOG_FATAL
} LogLevel;

static LogLevel current_log_level = LOG_DEBUG;
static FILE *log_file = NULL;

// Initialize logging
void log_init(const char *filename) {
    if (log_file) fclose(log_file);
    log_file = fopen(filename, "a");
    if (!log_file) {
        fprintf(stderr, "Failed to open log file: %s\\n", filename);
    }
}

// Set log level
void log_set_level(LogLevel level) {
    current_log_level = level;
}

// Get current timestamp
static const char *get_timestamp(void) {
    static char buffer[20];
    time_t now = time(NULL);
    struct tm *tm_info = localtime(&now);
    strftime(buffer, sizeof(buffer), "%Y-%m-%d %H:%M:%S", tm_info);
    return buffer;
}

// Log function
void log_message(LogLevel level, const char *file, int line,
                const char *func, const char *format, ...) {
    if (level < current_log_level) return;

    const char *level_names[] = {"DEBUG", "INFO", "WARN", "ERROR", "FATAL"};
    const char *level_colors[] = {"\\x1b[36m", "\\x1b[32m", "\\x1b[33m", "\\x1b[31m", "\\x1b[35m"};

    FILE *output = log_file ? log_file : stderr;

    fprintf(output, "%s[%s] %s:%d %s%s\\x1b[0m ",
            level_colors[level], get_timestamp(), file, line,
            level_names[level], level >= LOG_WARNING ? "" : "");

    va_list args;
    va_start(args, format);
    vfprintf(output, format, args);
    va_end(args);

    fprintf(output, "\\n");
    fflush(output);
}

// Logging macros
#define LOG_DEBUG(format, ...) \\
    log_message(LOG_DEBUG, __FILE__, __LINE__, __func__, format, ##__VA_ARGS__)

#define LOG_INFO(format, ...) \\
    log_message(LOG_INFO, __FILE__, __LINE__, __func__, format, ##__VA_ARGS__)

#define LOG_WARNING(format, ...) \\
    log_message(LOG_WARNING, __FILE__, __LINE__, __func__, format, ##__VA_ARGS__)

#define LOG_ERROR(format, ...) \\
    log_message(LOG_ERROR, __FILE__, __LINE__, __func__, format, ##__VA_ARGS__)

#define LOG_FATAL(format, ...) \\
    log_message(LOG_FATAL, __FILE__, __LINE__, __func__, format, ##__VA_ARGS__)

// Usage
int main() {
    log_init("debug.log");

    LOG_INFO("Application started");

    int value = 42;
    LOG_DEBUG("Processing value: %d", value);

    if (value < 0) {
        LOG_WARNING("Unexpected negative value: %d", value);
    }

    // Simulate error
    if (value > 100) {
        LOG_ERROR("Value exceeds maximum allowed: %d", value);
    }

    LOG_INFO("Application finished");

    if (log_file) fclose(log_file);

    return 0;
}
\`\`\`

## Memory Debugging with Valgrind

### Memory Error Detection
\`\`\`bash
# Compile with debug information
gcc -g -O0 program.c -o program

# Run with Valgrind
valgrind --leak-check=full ./program

# Track origins of uninitialized values
valgrind --track-origins=yes ./program

# Use custom malloc/free
valgrind --malloc-fill=0xFF --free-fill=0xFE ./program
\`\`\`

### Custom Memory Debugging
\`\`\`c
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

// Memory debugging wrapper
typedef struct {
    void *ptr;
    size_t size;
    const char *file;
    int line;
    const char *func;
} MemInfo;

#define MAX_ALLOCATIONS 10000
static MemInfo allocations[MAX_ALLOCATIONS];
static size_t allocation_count = 0;

// Debug malloc
void *debug_malloc(size_t size, const char *file, int line, const char *func) {
    void *ptr = malloc(size);
    if (ptr && allocation_count < MAX_ALLOCATIONS) {
        allocations[allocation_count].ptr = ptr;
        allocations[allocation_count].size = size;
        allocations[allocation_count].file = file;
        allocations[allocation_count].line = line;
        allocations[allocation_count].func = func;
        allocation_count++;
    }
    return ptr;
}

// Debug free
void debug_free(void *ptr, const char *file, int line, const char *func) {
    if (!ptr) return;

    for (size_t i = 0; i < allocation_count; i++) {
        if (allocations[i].ptr == ptr) {
            // Remove from tracking
            allocations[i] = allocations[--allocation_count];
            free(ptr);
            return;
        }
    }

    fprintf(stderr, "DOUBLE FREE or INVALID FREE at %s:%d in %s\\n",
            file, line, func);
}

// Memory report
void debug_memory_report(void) {
    printf("\\n=== MEMORY REPORT ===\\n");
    printf("Total allocations: %zu\\n", allocation_count);

    for (size_t i = 0; i < allocation_count; i++) {
        printf("LEAK: %zu bytes at %s:%d in %s\\n",
               allocations[i].size, allocations[i].file,
               allocations[i].line, allocations[i].func);
    }

    if (allocation_count == 0) {
        printf("No memory leaks detected!\\n");
    }
}

// Override standard functions
#define malloc(size) debug_malloc(size, __FILE__, __LINE__, __func__)
#define free(ptr) debug_free(ptr, __FILE__, __LINE__, __func__)
\`\`\`

## Static Analysis Tools

### Using GCC Static Analysis
\`\`\`bash
# Compile with warnings
gcc -Wall -Wextra -Wpedantic program.c -o program

# Enable additional warnings
gcc -Wshadow -Wconversion -Wsign-conversion program.c -o program

# Static analysis with clang
clang --analyze program.c

# Use cppcheck
cppcheck --enable=all program.c
\`\`\`

### Code Coverage Analysis
\`\`\`bash
# Compile with coverage
gcc -fprofile-arcs -ftest-coverage program.c -o program

# Run program
./program

# Generate coverage report
gcov program.c

# View coverage
cat program.c.gcov
\`\`\`

## Runtime Debugging Techniques

### Signal Handlers for Debugging
\`\`\`c
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <execinfo.h>

// Signal handler for segmentation faults
void segfault_handler(int sig) {
    fprintf(stderr, "Segmentation fault caught!\\n");

    // Print backtrace (if available)
    void *array[10];
    size_t size = backtrace(array, 10);
    backtrace_symbols_fd(array, size, STDERR_FILENO);

    exit(1);
}

// Setup signal handlers
void setup_debug_handlers(void) {
    signal(SIGSEGV, segfault_handler);
    signal(SIGABRT, segfault_handler);
    signal(SIGFPE, segfault_handler);  // Floating point exception
    signal(SIGILL, segfault_handler);  // Illegal instruction
}
\`\`\`

### Conditional Breakpoints with GDB
\`\`\`bash
# Compile with debug info
gcc -g program.c -o program

# Start GDB
gdb ./program

# Set breakpoint
break main

# Conditional breakpoint
break my_function if x > 100

# Watchpoint
watch variable_name

# Run program
run

# Print backtrace
bt

# Print variables
print x
print *array@10

# Continue execution
continue
\`\`\`

## Unit Testing Frameworks

### Simple Unit Testing Framework
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Test result
typedef struct {
    const char *name;
    int passed;
    int failed;
    char *failures[100];
    int failure_count;
} TestResult;

// Global test result
static TestResult global_result;

// Test assertion macro
#define TEST_ASSERT(condition, message) \\
    do { \\
        if (!(condition)) { \\
            global_result.failed++; \\
            if (global_result.failure_count < 100) { \\
                char *msg = malloc(strlen(message) + 100); \\
                sprintf(msg, "%s:%d - %s", __FILE__, __LINE__, message); \\
                global_result.failures[global_result.failure_count++] = msg; \\
            } \\
        } else { \\
            global_result.passed++; \\
        } \\
    } while (0)

// Test function macro
#define TEST_FUNCTION(func) \\
    do { \\
        printf("Running %s...\\n", #func); \\
        func(); \\
    } while (0)

// Initialize test result
void test_init(const char *test_name) {
    global_result.name = test_name;
    global_result.passed = 0;
    global_result.failed = 0;
    global_result.failure_count = 0;
}

// Print test results
void test_report(void) {
    printf("\\n=== Test Results: %s ===\\n", global_result.name);
    printf("Passed: %d\\n", global_result.passed);
    printf("Failed: %d\\n", global_result.failed);

    if (global_result.failed > 0) {
        printf("\\nFailures:\\n");
        for (int i = 0; i < global_result.failure_count; i++) {
            printf("  %s\\n", global_result.failures[i]);
            free(global_result.failures[i]);
        }
    }

    printf("===========================\\n");
}

// Example tests
void test_string_functions(void) {
    char buffer[100];

    // Test strcpy
    strcpy(buffer, "Hello");
    TEST_ASSERT(strcmp(buffer, "Hello") == 0, "strcpy failed");

    // Test strlen
    TEST_ASSERT(strlen("Hello") == 5, "strlen failed");

    // Test concatenation
    strcat(buffer, " World");
    TEST_ASSERT(strcmp(buffer, "Hello World") == 0, "strcat failed");
}

void test_math_functions(void) {
    // Test basic math
    TEST_ASSERT(abs(-5) == 5, "abs failed");

    // Test floating point (with epsilon)
    double result = sin(M_PI / 2);
    TEST_ASSERT(fabs(result - 1.0) < 1e-6, "sin(π/2) should be 1.0");
}

int main() {
    test_init("C Standard Library Tests");

    TEST_FUNCTION(test_string_functions);
    TEST_FUNCTION(test_math_functions);

    test_report();

    return global_result.failed > 0 ? 1 : 0;
}
\`\`\`

## Performance Profiling

### Simple Performance Timer
\`\`\`c
#include <time.h>
#include <stdio.h>

// High-resolution timer
typedef struct {
    struct timespec start;
    struct timespec end;
} PerfTimer;

void timer_start(PerfTimer *timer) {
    clock_gettime(CLOCK_MONOTONIC, &timer->start);
}

double timer_stop(PerfTimer *timer) {
    clock_gettime(CLOCK_MONOTONIC, &timer->end);

    double start_sec = timer->start.tv_sec + timer->start.tv_nsec / 1e9;
    double end_sec = timer->end.tv_sec + timer->end.tv_nsec / 1e9;

    return end_sec - start_sec;
}

// Usage
double benchmark_function(void (*func)(void)) {
    PerfTimer timer;
    timer_start(&timer);
    func();
    return timer_stop(&timer);
}

// Example usage
void slow_function(void) {
    volatile long sum = 0;
    for (long i = 0; i < 10000000; i++) {
        sum += i;
    }
}

int main() {
    double time_taken = benchmark_function(slow_function);
    printf("Function took %.6f seconds\\n", time_taken);

    return 0;
}
\`\`\`

Advanced debugging techniques in C involve static analysis, runtime checks, memory debugging, and comprehensive testing. These methods help identify and fix bugs before they cause problems in production code.`
};

