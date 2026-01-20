import { SubLesson } from '../../../../data/lessonsData';

export const topic_14_2: SubLesson = {
  id: '14.2',
  title: 'Inline Functions and Optimization',
  status: 'demo',
  content: `# Inline Functions and Optimization

## Function Inlining

### inline Keyword (C99)
\`\`\`c
#include <stdio.h>

// Inline function definition
static inline int max(int a, int b) {
    return a > b ? a : b;
}

// Inline function in header
inline double square(double x) {
    return x * x;
}

// Usage
int main() {
    int result = max(5, 10);        // Likely inlined
    double sq = square(3.14);       // Likely inlined

    printf("Max: %d, Square: %f\\n", result, sq);
    return 0;
}
\`\`\`

### When to Use Inline Functions
- **Small functions**: Trivial operations
- **Frequently called functions**: Performance-critical code
- **Header-only libraries**: Template-like functionality
- **Eliminate function call overhead**: For hot paths

### When NOT to Use Inline Functions
- **Large functions**: Increases code size
- **Recursive functions**: Cannot be inlined
- **Virtual functions**: Dynamic dispatch needed
- **Rarely called functions**: No benefit

## Compiler Optimization Techniques

### Optimization Levels
\`\`\`bash
# GCC optimization levels
gcc -O0 file.c    # No optimization
gcc -O1 file.c    # Basic optimization
gcc -O2 file.c    # Advanced optimization
gcc -O3 file.c    # Aggressive optimization
gcc -Os file.c    # Optimize for size
gcc -Ofast file.c # Fastest, may break standards
\`\`\`

### Profile-Guided Optimization (PGO)
\`\`\`bash
# Step 1: Compile with profiling instrumentation
gcc -O2 -fprofile-generate program.c -o program

# Step 2: Run program to generate profile data
./program

# Step 3: Recompile using profile data
gcc -O2 -fprofile-use program.c -o program_optimized
\`\`\`

### Link-Time Optimization (LTO)
\`\`\`bash
# Compile with LTO
gcc -flto -O2 file1.c file2.c -o program

# Or separate compilation
gcc -flto -O2 -c file1.c -o file1.o
gcc -flto -O2 -c file2.c -o file2.o
gcc -flto -O2 file1.o file2.o -o program
\`\`\`

## Function Attributes

### GCC Function Attributes
\`\`\`c
// Pure function - no side effects, depends only on arguments
int __attribute__((pure)) is_even(int x) {
    return x % 2 == 0;
}

// Const function - no side effects, doesn't access global memory
int __attribute__((const)) multiply_by_two(int x) {
    return x * 2;
}

// No return function
void __attribute__((noreturn)) fatal_error(const char *msg) {
    fprintf(stderr, "Fatal error: %s\\n", msg);
    exit(1);
}

// Always inline
int __attribute__((always_inline)) fast_max(int a, int b) {
    return a > b ? a : b;
}

// No inline
int __attribute__((noinline)) slow_function(int x) {
    // Complex computation
    return x * x * x;
}

// Hot function (likely to be called frequently)
void __attribute__((hot)) process_request(void *data) {
    // Request processing logic
}

// Cold function (unlikely to be called)
void __attribute__((cold)) error_handler(int error_code) {
    // Error handling logic
}

// Function alignment
void __attribute__((aligned(16))) aligned_function() {
    // Function aligned to 16-byte boundary
}
\`\`\`

### Format Function Attributes
\`\`\`c
// printf-like function
int __attribute__((format(printf, 1, 2)))
my_printf(const char *format, ...) {
    va_list args;
    va_start(args, format);
    int result = vprintf(format, args);
    va_end(args);
    return result;
}

// scanf-like function
int __attribute__((format(scanf, 1, 2)))
my_scanf(const char *format, ...) {
    va_list args;
    va_start(args, format);
    int result = vscanf(format, args);
    va_end(args);
    return result;
}
\`\`\`

## Variable Attributes

### Variable Attributes
\`\`\`c
// Aligned variables
int __attribute__((aligned(16))) aligned_var;

// Packed structures
struct __attribute__((packed)) PackedStruct {
    char a;
    int b;    // No padding
};

// Deprecated variables
int old_var __attribute__((deprecated("Use new_var instead")));

// Unused variables (suppress warnings)
int __attribute__((unused)) temp_var;

// Section placement
int global_var __attribute__((section(".data.fast"))) = 42;
\`\`\`

### Thread-local Variables (C11)
\`\`\`c
#include <threads.h>

// Thread-local storage
thread_local int thread_counter = 0;

void *worker_thread(void *arg) {
    thread_counter++;  // Each thread has its own copy
    printf("Thread counter: %d\\n", thread_counter);
    return NULL;
}

// GCC __thread extension
__thread int gcc_thread_var = 0;
\`\`\`

## Restrict Keyword (C99)

### restrict Qualifier
\`\`\`c
// Function with restrict pointers
void copy_array(int *restrict dest, const int *restrict src, size_t n) {
    for (size_t i = 0; i < n; i++) {
        dest[i] = src[i];
    }
}

// Compiler can optimize assuming no aliasing
void matrix_multiply(double *restrict C,
                    const double *restrict A,
                    const double *restrict B,
                    size_t n) {
    // Compiler can vectorize and optimize memory access
    for (size_t i = 0; i < n; i++) {
        for (size_t j = 0; j < n; j++) {
            C[i * n + j] = 0.0;
            for (size_t k = 0; k < n; k++) {
                C[i * n + j] += A[i * n + k] * B[k * n + j];
            }
        }
    }
}
\`\`\`

### When to Use restrict
- **Performance-critical code**: Enables better optimization
- **No pointer aliasing**: Pointers point to different memory regions
- **Array operations**: Copying, arithmetic operations
- **Mathematical computations**: Matrix operations, signal processing

## Variadic Functions

### stdarg.h Usage
\`\`\`c
#include <stdarg.h>
#include <stdio.h>

// Simple variadic function
double average(int count, ...) {
    va_list args;
    double sum = 0.0;

    va_start(args, count);
    for (int i = 0; i < count; i++) {
        sum += va_arg(args, double);
    }
    va_end(args);

    return sum / count;
}

// Print function with multiple types
void print_values(const char *format, ...) {
    va_list args;
    va_start(args, format);

    const char *ptr = format;
    while (*ptr) {
        if (*ptr == '%') {
            ptr++;
            switch (*ptr) {
                case 'd':
                    printf("%d", va_arg(args, int));
                    break;
                case 'f':
                    printf("%f", va_arg(args, double));
                    break;
                case 's':
                    printf("%s", va_arg(args, char *));
                    break;
                case 'c':
                    printf("%c", va_arg(args, int));
                    break;
            }
        } else {
            putchar(*ptr);
        }
        ptr++;
    }

    va_end(args);
}

// Usage
int main() {
    double avg = average(4, 1.0, 2.5, 3.7, 4.2);
    printf("Average: %f\\n", avg);

    print_values("Name: %s, Age: %d, Score: %f\\n",
                "Alice", 25, 95.5);

    return 0;
}
\`\`\`

### Type-safe Variadic Functions
\`\`\`c
// Type-safe printf-like function
#define LOG(format, ...) \\
    log_message(__FILE__, __LINE__, __func__, format, ##__VA_ARGS__)

void log_message(const char *file, int line, const char *func,
                const char *format, ...) {
    printf("[%s:%d %s] ", file, line, func);

    va_list args;
    va_start(args, format);
    vprintf(format, args);
    va_end(args);
}

// Type-safe sum function
int sum_integers(size_t count, ...) {
    va_list args;
    va_start(args, count);

    int sum = 0;
    for (size_t i = 0; i < count; i++) {
        sum += va_arg(args, int);
    }

    va_end(args);
    return sum;
}
\`\`\`

## Generic Programming in C

### _Generic (C11)
\`\`\`c
#include <math.h>

// Generic square root function
#define sqrt_generic(x) \\
    _Generic((x), \\
        float: sqrtf, \\
        double: sqrt, \\
        long double: sqrtl, \\
        default: sqrt \\
    )(x)

// Generic print function
#define print_value(x) \\
    _Generic((x), \\
        int: printf("%d\\n", x), \\
        float: printf("%f\\n", x), \\
        double: printf("%f\\n", x), \\
        char *: printf("%s\\n", x), \\
        default: printf("Unknown type\\n") \\
    )

// Usage
int main() {
    float f = 4.0f;
    double d = 9.0;
    int i = 16;
    char *s = "Hello";

    printf("sqrt(%.1f) = %.1f\\n", f, sqrt_generic(f));
    printf("sqrt(%.1f) = %.1f\\n", d, sqrt_generic(d));

    print_value(i);
    print_value(f);
    print_value(s);

    return 0;
}
\`\`\`

### Function Overloading Simulation
\`\`\`c
// Function overloading using _Generic
#define add(a, b) \\
    _Generic((a), \\
        int: add_int, \\
        float: add_float, \\
        double: add_double \\
    )(a, b)

int add_int(int a, int b) { return a + b; }
float add_float(float a, float b) { return a + b; }
double add_double(double a, double b) { return a + b; }

// Usage
int result1 = add(1, 2);           // add_int
float result2 = add(1.0f, 2.0f);   // add_float
double result3 = add(1.0, 2.0);    // add_double
\`\`\`

## Compiler Built-in Functions

### GCC Built-ins
\`\`\`c
#include <stdint.h>

// Bit manipulation
int bit_count = __builtin_popcount(0x12345678);    // Count set bits
int leading_zeros = __builtin_clz(0x0000FFFF);     // Count leading zeros
int trailing_zeros = __builtin_ctz(0xFFFF0000);    // Count trailing zeros

// Overflow detection
int result;
int overflow = __builtin_add_overflow(a, b, &result);

// Atomic operations
int old_value = __atomic_load_n(&shared_var, __ATOMIC_SEQ_CST);
__atomic_store_n(&shared_var, new_value, __ATOMIC_SEQ_CST);
__atomic_fetch_add(&counter, 1, __ATOMIC_RELAXED);

// Memory barriers
__atomic_thread_fence(__ATOMIC_SEQ_CST);

// Expectation hints (branch prediction)
if (__builtin_expect(x == 0, 1)) {  // Likely case
    // Fast path
} else {
    // Slow path
}

// Unreachable code
if (x < 0) {
    printf("Negative value\\n");
    __builtin_unreachable();  // Tells compiler this point is never reached
}
\`\`\`

### Memory Operations
\`\`\`c
// Safe memory operations
void *safe_memcpy(void *dest, const void *src, size_t n) {
    if (__builtin_object_size(dest, 0) < n) {
        // Buffer overflow detected
        abort();
    }
    return memcpy(dest, src, n);
}

// Constant expression evaluation
#define IS_POWER_OF_TWO(n) ((n) && ((n) & ((n) - 1)) == 0)

static_assert(IS_POWER_OF_TWO(8), "Must be power of 2");
static_assert(IS_POWER_OF_TWO(7), "Must be power of 2");  // Compile error
\`\`\`

## Static Assertions (C11)

### _Static_assert
\`\`\`c
#include <assert.h>

// Compile-time assertions
_Static_assert(sizeof(int) == 4, "int must be 4 bytes");
_Static_assert(CHAR_BIT == 8, "char must be 8 bits");

// Array size validation
#define ARRAY_SIZE(arr) (sizeof(arr) / sizeof((arr)[0]))

int array[10];
_Static_assert(ARRAY_SIZE(array) >= 5, "Array too small");

// Structure alignment checks
struct __attribute__((packed)) PackedStruct {
    char a;
    int b;
};

_Static_assert(sizeof(struct PackedStruct) == 5,
               "Structure not properly packed");

// Platform-specific checks
#ifdef __x86_64__
    _Static_assert(sizeof(void *) == 8, "64-bit pointers expected");
#else
    _Static_assert(sizeof(void *) == 4, "32-bit pointers expected");
#endif
\`\`\`

Advanced C features like inline functions, compiler attributes, and optimization techniques allow for writing high-performance, portable code. Understanding these features is essential for professional C programming.`
};

