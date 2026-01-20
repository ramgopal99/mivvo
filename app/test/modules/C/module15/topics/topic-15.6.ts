import { SubLesson } from '../../../../data/lessonsData';

export const topic_15_6: SubLesson = {
  id: '15.6',
  title: 'Other Standard Library Components (<assert.h>, <errno.h>, <limits.h>, <float.h>)',
  status: 'demo',
  content: `# Other Standard Library Components

## Assertions (<assert.h>)

### Basic Assertions
\`\`\`c
#include <assert.h>
#include <stdio.h>

int divide(int a, int b) {
    // Precondition: divisor must not be zero
    assert(b != 0 && "Division by zero");

    return a / b;
}

void process_array(int *array, size_t size) {
    // Preconditions
    assert(array != NULL && "Array pointer is NULL");
    assert(size > 0 && "Array size must be positive");

    for (size_t i = 0; i < size; i++) {
        // Loop invariant: index is within bounds
        assert(i < size && "Index out of bounds");

        // Process array[i]
        printf("%d ", array[i]);
    }
    printf("\\n");
}

int main() {
    // This will pass
    int result = divide(10, 2);
    printf("10 / 2 = %d\\n", result);

    // This will trigger assertion (in debug mode)
    // result = divide(10, 0);

    int numbers[] = {1, 2, 3, 4, 5};
    process_array(numbers, 5);

    return 0;
}
\`\`\`

### Static Assertions (C11)
\`\`\`c
#include <assert.h>

// Compile-time assertions
_Static_assert(sizeof(int) >= 4, "int must be at least 32 bits");
_Static_assert(CHAR_BIT == 8, "char must be 8 bits");

// Array size validation
#define ARRAY_SIZE 10
int array[ARRAY_SIZE];
_Static_assert(ARRAY_SIZE > 0, "Array size must be positive");

// Structure size checks
struct Data {
    int id;
    char name[50];
    double value;
};
_Static_assert(sizeof(struct Data) <= 64, "Data structure too large");

// Pointer size validation
_Static_assert(sizeof(void *) == 8, "64-bit pointers required");

// Type size relationships
_Static_assert(sizeof(long) >= sizeof(int), "long should be at least as big as int");
\`\`\`

### Custom Assertion Handler
\`\`\`c
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>

// Custom assertion failure handler
void custom_assert_handler(const char *file, int line, const char *func,
                          const char *expr) {
    fprintf(stderr, "Custom assertion failed:\\n");
    fprintf(stderr, "  File: %s\\n", file);
    fprintf(stderr, "  Line: %d\\n", line);
    fprintf(stderr, "  Function: %s\\n", func);
    fprintf(stderr, "  Expression: %s\\n", expr);

    // Log to file
    FILE *log = fopen("assert.log", "a");
    if (log) {
        fprintf(log, "Assertion failed: %s:%d %s: %s\\n",
                file, line, func, expr);
        fclose(log);
    }

    // Don't abort - return to caller
    // abort();  // Uncomment to abort on assertion failure
}

// This would normally be set with assert_set_handler
// But this is implementation-specific
\`\`\`

## Error Handling (<errno.h>)

### errno Usage
\`\`\`c
#include <errno.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void safe_file_operation(const char *filename) {
    FILE *fp = fopen(filename, "r");

    if (fp == NULL) {
        // errno contains the error code
        printf("Failed to open '%s': %s\\n", filename, strerror(errno));

        // Handle specific errors
        switch (errno) {
            case ENOENT:
                printf("File does not exist\\n");
                break;
            case EACCES:
                printf("Permission denied\\n");
                break;
            case EISDIR:
                printf("Path is a directory\\n");
                break;
            default:
                printf("Other error\\n");
        }
    } else {
        printf("File opened successfully\\n");
        fclose(fp);
    }
}

double safe_sqrt(double x) {
    if (x < 0) {
        errno = EDOM;  // Domain error
        return -1.0;
    }

    // Clear errno before math operation
    errno = 0;
    double result = sqrt(x);

    // Check for range error
    if (errno == ERANGE) {
        printf("Range error in sqrt\\n");
        return -1.0;
    }

    return result;
}

int main() {
    safe_file_operation("nonexistent.txt");
    safe_file_operation("/etc/passwd");  // May be restricted

    double result = safe_sqrt(-1.0);
    if (result == -1.0 && errno == EDOM) {
        printf("Cannot take square root of negative number\\n");
    }

    return 0;
}
\`\`\`

### Thread-Safe errno (POSIX)
\`\`\`c
// In multi-threaded programs, errno may be thread-local
#include <errno.h>

// On POSIX systems, errno is thread-local by default
// On Windows, _errno() function may be needed

#ifdef _WIN32
    #define errno_get() _errno()
    #define errno_set(val) _set_errno(val)
#else
    #define errno_get() errno
    #define errno_set(val) (errno = (val))
#endif
\`\`\`

## Implementation Limits (<limits.h>, <float.h>)

### Integer Limits
\`\`\`c
#include <limits.h>
#include <stdio.h>

int main() {
    printf("Character types:\\n");
    printf("  CHAR_BIT: %d\\n", CHAR_BIT);
    printf("  CHAR_MIN: %d\\n", CHAR_MIN);
    printf("  CHAR_MAX: %d\\n", CHAR_MAX);
    printf("  SCHAR_MIN: %d\\n", SCHAR_MIN);
    printf("  SCHAR_MAX: %d\\n", SCHAR_MAX);
    printf("  UCHAR_MAX: %u\\n", UCHAR_MAX);

    printf("\\nInteger types:\\n");
    printf("  SHRT_MIN: %d\\n", SHRT_MIN);
    printf("  SHRT_MAX: %d\\n", SHRT_MAX);
    printf("  USHRT_MAX: %u\\n", USHRT_MAX);
    printf("  INT_MIN: %d\\n", INT_MIN);
    printf("  INT_MAX: %d\\n", INT_MAX);
    printf("  UINT_MAX: %u\\n", UINT_MAX);

    printf("\\nLong types:\\n");
    printf("  LONG_MIN: %ld\\n", LONG_MIN);
    printf("  LONG_MAX: %ld\\n", LONG_MAX);
    printf("  ULONG_MAX: %lu\\n", ULONG_MAX);

    #ifdef LLONG_MIN
    printf("\\nLong long types:\\n");
    printf("  LLONG_MIN: %lld\\n", LLONG_MIN);
    printf("  LLONG_MAX: %lld\\n", LLONG_MAX);
    printf("  ULLONG_MAX: %llu\\n", ULLONG_MAX);
    #endif

    return 0;
}
\`\`\`

### Floating-Point Limits
\`\`\`c
#include <float.h>

int main() {
    printf("Float limits:\\n");
    printf("  FLT_MIN: %e\\n", FLT_MIN);
    printf("  FLT_MAX: %e\\n", FLT_MAX);
    printf("  FLT_EPSILON: %e\\n", FLT_EPSILON);
    printf("  FLT_DIG: %d\\n", FLT_DIG);
    printf("  FLT_MANT_DIG: %d\\n", FLT_MANT_DIG);
    printf("  FLT_MIN_EXP: %d\\n", FLT_MIN_EXP);
    printf("  FLT_MAX_EXP: %d\\n", FLT_MAX_EXP);

    printf("\\nDouble limits:\\n");
    printf("  DBL_MIN: %e\\n", DBL_MIN);
    printf("  DBL_MAX: %e\\n", DBL_MAX);
    printf("  DBL_EPSILON: %e\\n", DBL_EPSILON);
    printf("  DBL_DIG: %d\\n", DBL_DIG);
    printf("  DBL_MANT_DIG: %d\\n", DBL_MANT_DIG);
    printf("  DBL_MIN_EXP: %d\\n", DBL_MIN_EXP);
    printf("  DBL_MAX_EXP: %d\\n", DBL_MAX_EXP);

    #ifdef LDBL_MIN
    printf("\\nLong double limits:\\n");
    printf("  LDBL_MIN: %Le\\n", LDBL_MIN);
    printf("  LDBL_MAX: %Le\\n", LDBL_MAX);
    printf("  LDBL_EPSILON: %Le\\n", LDBL_EPSILON);
    printf("  LDBL_DIG: %d\\n", LDBL_DIG);
    printf("  LDBL_MANT_DIG: %d\\n", LDBL_MANT_DIG);
    printf("  LDBL_MIN_EXP: %d\\n", LDBL_MIN_EXP);
    printf("  LDBL_MAX_EXP: %d\\n", LDBL_MAX_EXP);
    #endif

    return 0;
}
\`\`\`

## Signal Handling (<signal.h>)

### Basic Signal Handling
\`\`\`c
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>

volatile sig_atomic_t signal_received = 0;

void signal_handler(int signal) {
    signal_received = signal;
    printf("Received signal: %d\\n", signal);
}

int main() {
    // Set up signal handlers
    signal(SIGINT, signal_handler);   // Ctrl+C
    signal(SIGTERM, signal_handler);  // Termination request

    printf("Program running. Press Ctrl+C to send SIGINT.\\n");

    // Wait for signal
    while (signal_received == 0) {
        // Busy wait (in real code, use sigsuspend or similar)
    }

    printf("Signal %d received, exiting.\\n", signal_received);

    return 0;
}
\`\`\`

### Signal Actions
\`\`\`c
#include <signal.h>

int main() {
    // Ignore SIGINT
    signal(SIGINT, SIG_IGN);
    printf("SIGINT is now ignored. Press Ctrl+C.\\n");

    // Sleep for 5 seconds
    sleep(5);

    // Restore default SIGINT handler
    signal(SIGINT, SIG_DFL);
    printf("SIGINT handler restored.\\n");

    return 0;
}
\`\`\`

## Program Termination (<stdlib.h>)

### Exit Functions
\`\`\`c
#include <stdlib.h>
#include <stdio.h>

void cleanup_function(void) {
    printf("Cleanup function called\\n");
}

int main() {
    // Register cleanup functions (called in reverse order)
    atexit(cleanup_function);
    atexit(cleanup_function);
    atexit(cleanup_function);

    printf("Program starting...\\n");

    // Normal exit
    printf("Calling exit(0)...\\n");
    exit(0);  // Calls atexit functions and terminates

    // This code is never reached
    printf("This will never be printed\\n");

    return 0;
}
\`\`\`

### Abnormal Termination
\`\`\`c
#include <stdlib.h>

void fatal_error(const char *message) {
    fprintf(stderr, "Fatal error: %s\\n", message);

    // abort() - abnormal termination, may generate core dump
    abort();
}

void quick_exit_example(void) {
    fprintf(stderr, "Quick exit called\\n");

    // _Exit() - immediate exit, no cleanup
    _Exit(1);
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s <option>\\n", argv[0]);
        fprintf(stderr, "Options: abort, exit, _Exit\\n");
        return 1;
    }

    if (strcmp(argv[1], "abort") == 0) {
        fatal_error("Testing abort");
    } else if (strcmp(argv[1], "exit") == 0) {
        exit(42);
    } else if (strcmp(argv[1], "_Exit") == 0) {
        quick_exit_example();
    }

    return 0;
}
\`\`\`

## Environment Communication (<stdlib.h>)

### System Command Execution
\`\`\`c
#include <stdlib.h>

int main() {
    // Execute system command
    int result = system("echo 'Hello from system command'");
    printf("system() returned: %d\\n", result);

    // Check if system() is available
    if (system(NULL) == 0) {
        printf("system() is not available\\n");
    } else {
        printf("system() is available\\n");
    }

    // Execute different commands based on platform
    #ifdef _WIN32
        system("dir");
    #else
        system("ls -la");
    #endif

    return 0;
}
\`\`\`

## Non-local Jumps (<setjmp.h>)

### setjmp/longjmp
\`\`\`c
#include <setjmp.h>
#include <stdio.h>

jmp_buf jump_buffer;

void nested_function(int level) {
    printf("Entering level %d\\n", level);

    if (level == 3) {
        printf("Performing long jump from level %d\\n", level);
        longjmp(jump_buffer, level);  // Jump back to setjmp
    }

    nested_function(level + 1);
    printf("Returning from level %d\\n", level);
}

int main() {
    int jump_value = setjmp(jump_buffer);

    if (jump_value == 0) {
        printf("setjmp returned 0, calling nested function\\n");
        nested_function(1);
        printf("This will not be printed\\n");
    } else {
        printf("longjmp called with value: %d\\n", jump_value);
    }

    return 0;
}
\`\`\`

### Exception-like Handling
\`\`\`c
#include <setjmp.h>
#include <stdio.h>

#define TRY do { jmp_buf exception_buffer; switch(setjmp(exception_buffer)) { case 0:
#define CATCH(x) break; case x:
#define END_TRY } } while(0)
#define THROW(x) longjmp(exception_buffer, x)

#define EXCEPTION_DIVIDE_BY_ZERO 1
#define EXCEPTION_INVALID_INPUT 2

double safe_divide(double a, double b) {
    if (b == 0) {
        THROW(EXCEPTION_DIVIDE_BY_ZERO);
    }
    return a / b;
}

int main() {
    TRY {
        double result = safe_divide(10.0, 0.0);
        printf("Result: %f\\n", result);
    }
    CATCH(EXCEPTION_DIVIDE_BY_ZERO) {
        printf("Caught divide by zero exception\\n");
    }
    END_TRY;

    return 0;
}
\`\`\`

## Variable Arguments (<stdarg.h>)

### Variadic Functions
\`\`\`c
#include <stdarg.h>
#include <stdio.h>

// Simple sum function
double sum(int count, ...) {
    va_list args;
    double total = 0.0;

    va_start(args, count);
    for (int i = 0; i < count; i++) {
        total += va_arg(args, double);
    }
    va_end(args);

    return total;
}

// Print function with format
void debug_print(const char *format, ...) {
    va_list args;
    va_start(args, format);
    vprintf(format, args);
    va_end(args);
}

int main() {
    printf("Sum of 1.0, 2.0, 3.0: %f\\n", sum(3, 1.0, 2.0, 3.0));
    printf("Sum of 5 values: %f\\n", sum(5, 1.0, 2.0, 3.0, 4.0, 5.0));

    debug_print("Debug: %s %d %f\\n", "test", 42, 3.14);

    return 0;
}
\`\`\`

These headers provide essential utilities for error handling, system limits, signal processing, program termination, and advanced control flow mechanisms that complement the core C Standard Library functionality.`
};

