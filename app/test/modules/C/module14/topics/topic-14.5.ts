import { SubLesson } from '../../../../data/lessonsData';

export const topic_14_5: SubLesson = {
  id: '14.5',
  title: 'GCC Extensions and Compiler-Specific Features',
  status: 'demo',
  content: `# GCC Extensions and Compiler-Specific Features

## GCC-Specific Attributes

### Function Attributes
\`\`\`c
// Common GCC function attributes
__attribute__((noreturn)) void fatal_error(const char *msg) {
    fprintf(stderr, "Fatal: %s\\n", msg);
    exit(1);
}

__attribute__((deprecated("Use new_function instead")))
void old_function(void) {
    printf("This function is deprecated\\n");
}

__attribute__((warn_unused_result))
int check_error(void) {
    return 0; // Compiler warns if return value ignored
}

__attribute__((always_inline))
inline int fast_operation(int x) {
    return x * x;
}

__attribute__((noinline))
int slow_operation(int x) {
    // Complex computation
    return x * x * x;
}

// Constructor/destructor attributes
__attribute__((constructor))
void init_library(void) {
    printf("Library initialized\\n");
}

__attribute__((destructor))
void cleanup_library(void) {
    printf("Library cleaned up\\n");
}

// Format checking
__attribute__((format(printf, 1, 2)))
int my_printf(const char *format, ...) {
    va_list args;
    va_start(args, format);
    int result = vprintf(format, args);
    va_end(args);
    return result;
}
\`\`\`

### Variable Attributes
\`\`\`c
// Alignment
__attribute__((aligned(16))) char buffer[1024];

// Section placement
int global_var __attribute__((section(".my_section"))) = 42;

// Visibility
__attribute__((visibility("hidden")))
void internal_function(void) {
    // Not exported from shared library
}

__attribute__((visibility("default")))
void public_function(void) {
    // Exported from shared library
}

// Cleanup attribute
void cleanup_resource(void *ptr) {
    free(*(void **)ptr);
}

void __attribute__((cleanup(cleanup_resource))) *auto_free_ptr = NULL;
\`\`\`

## GCC Built-in Functions

### Mathematical Built-ins
\`\`\`c
#include <math.h>

// Fast math operations
double fast_sqrt = __builtin_sqrt(16.0);    // sqrt(16.0)
double fast_sin = __builtin_sin(1.57);      // sin(1.57)
double fast_cos = __builtin_cos(0.0);       // cos(0.0)

// Overflow detection
int result;
int overflow = __builtin_add_overflow(2147483647, 1, &result);

// Bit manipulation
int popcount = __builtin_popcount(0x12345678);    // Count set bits
int clz = __builtin_clz(0x0000FFFF);              // Count leading zeros
int ctz = __builtin_ctz(0xFFFF0000);              // Count trailing zeros

// Min/max operations
int minimum = __builtin_min(10, 20);
int maximum = __builtin_max(10, 20);
\`\`\`

### Atomic Operations
\`\`\`c
// Atomic load/store
int value = __atomic_load_n(&shared_var, __ATOMIC_SEQ_CST);
__atomic_store_n(&shared_var, new_value, __ATOMIC_RELAXED);

// Atomic fetch and modify
int old_value = __atomic_fetch_add(&counter, 1, __ATOMIC_SEQ_CST);
int old_value2 = __atomic_fetch_sub(&counter, 1, __ATOMIC_ACQUIRE);

// Compare and exchange
int expected = 10;
int desired = 20;
int success = __atomic_compare_exchange_n(&shared_var, &expected,
                                         desired, 0, __ATOMIC_SEQ_CST,
                                         __ATOMIC_SEQ_CST);

// Memory barriers
__atomic_thread_fence(__ATOMIC_SEQ_CST);
__atomic_signal_fence(__ATOMIC_ACQ_REL);
\`\`\`

### Expectation Hints
\`\`\`c
// Branch prediction hints
#define likely(x)   __builtin_expect(!!(x), 1)
#define unlikely(x) __builtin_expect(!!(x), 0)

// Usage
if (likely(error_code == 0)) {
    // Fast path - likely to execute
    process_data();
} else {
    // Slow path - unlikely to execute
    handle_error(error_code);
}

// Loop optimization
for (int i = 0; i < n; i++) {
    if (unlikely(special_case(&data[i]))) {
        handle_special_case(&data[i]);
    } else {
        normal_processing(&data[i]);
    }
}
\`\`\`

## Statement Expressions

### GCC Statement Expressions
\`\`\`c
// Statement expression returning a value
#define MAX(a, b) \\
    ({ \\
        typeof(a) _a = (a); \\
        typeof(b) _b = (b); \\
        _a > _b ? _a : _b; \\
    })

// Complex statement expressions
#define ALLOC_AND_INIT(type, ...) \\
    ({ \\
        type *ptr = malloc(sizeof(type)); \\
        if (ptr) { \\
            *ptr = (type){ __VA_ARGS__ }; \\
        } \\
        ptr; \\
    })

// Usage
int main() {
    int max_val = MAX(10, 20);
    printf("Max: %d\\n", max_val);

    struct Point *p = ALLOC_AND_INIT(struct Point, .x = 10, .y = 20);
    if (p) {
        printf("Point: (%d, %d)\\n", p->x, p->y);
        free(p);
    }

    return 0;
}
\`\`\`

## Designated Initializers (Extended)

### GCC Extended Designated Initializers
\`\`\`c
struct Point {
    int x, y, z;
};

struct Person {
    char name[50];
    int age;
    struct Point location;
};

// Range initialization
int array[10] = {
    [0 ... 4] = 1,      // indices 0-4 = 1
    [5 ... 9] = 2       // indices 5-9 = 2
};

// Nested designated initializers
struct Person person = {
    .name = "John",
    .age = 30,
    .location = {
        .x = 10,
        .y = 20,
        .z = 0
    }
};

// Array of structs with designated initializers
struct Person people[] = {
    [0] = {.name = "Alice", .age = 25},
    [1] = {.name = "Bob", .age = 30},
    [2 ... 4] = {.name = "Unknown", .age = 0}
};
\`\`\`

## Computed GotOs

### Threaded Code with Computed GotOs
\`\`\`c
// Virtual machine with computed goto
typedef enum {
    OP_ADD,
    OP_SUB,
    OP_JMP,
    OP_HALT
} Opcode;

typedef struct {
    Opcode opcode;
    int operand;
} Instruction;

void execute_vm(Instruction *code, int code_size) {
    static void *dispatch_table[] = {
        &&do_add,
        &&do_sub,
        &&do_jmp,
        &&do_halt
    };

    int pc = 0;
    int accumulator = 0;

    #define DISPATCH() goto *dispatch_table[code[pc++].opcode]

    DISPATCH();

    do_add:
        accumulator += code[pc++].operand;
        DISPATCH();

    do_sub:
        accumulator -= code[pc++].operand;
        DISPATCH();

    do_jmp:
        pc = code[pc].operand;
        DISPATCH();

    do_halt:
        printf("Final result: %d\\n", accumulator);
        return;
}

// Usage
int main() {
    Instruction program[] = {
        {OP_ADD, 10},
        {OP_ADD, 20},
        {OP_SUB, 5},
        {OP_HALT, 0}
    };

    execute_vm(program, sizeof(program) / sizeof(program[0]));
    return 0;
}
\`\`\`

## Nested Functions

### GCC Nested Functions
\`\`\`c
#include <stdio.h>

typedef int (*operation_func)(int, int);

operation_func get_operation(char op) {
    int add(int a, int b) { return a + b; }
    int subtract(int a, int b) { return a - b; }
    int multiply(int a, int b) { return a * b; }

    switch (op) {
        case '+': return add;
        case '-': return subtract;
        case '*': return multiply;
        default: return NULL;
    }
}

int main() {
    operation_func op = get_operation('+');
    if (op) {
        printf("5 + 3 = %d\\n", op(5, 3));
    }

    return 0;
}
\`\`\`

## Vector Extensions

### GCC Vector Types
\`\`\`c
typedef int v4si __attribute__((vector_size(16)));  // 4 ints
typedef float v4sf __attribute__((vector_size(16))); // 4 floats

// Vector operations
v4si vec_add(v4si a, v4si b) {
    return a + b;
}

v4si vec_multiply(v4si a, v4si b) {
    return a * b;
}

// Vector shuffling
v4si vec_shuffle(v4si a, v4si b) {
    return __builtin_shuffle(a, b, (v4si){0, 4, 1, 5});
}

// Usage
int main() {
    v4si a = {1, 2, 3, 4};
    v4si b = {5, 6, 7, 8};
    v4si result = vec_add(a, b);

    printf("Result: {%d, %d, %d, %d}\\n",
           result[0], result[1], result[2], result[3]);

    return 0;
}
\`\`\`

## Sanitizers

### AddressSanitizer
\`\`\`bash
# Compile with AddressSanitizer
gcc -fsanitize=address -g program.c -o program

# Run program
./program
# ASan will detect memory errors
\`\`\`

### UndefinedBehaviorSanitizer
\`\`\`bash
# Compile with UBSan
gcc -fsanitize=undefined -g program.c -o program

# Run program
./program
# UBSan will detect undefined behavior
\`\`\`

### ThreadSanitizer
\`\`\`bash
# Compile with ThreadSanitizer
gcc -fsanitize=thread -g program.c -pthread -o program

# Run program
./program
# TSan will detect data races
\`\`\`

## GCC-Specific Optimizations

### Function Cloning
\`\`\`c
// Function with different optimization levels
__attribute__((optimize("O3")))
int fast_function(int x) {
    return x * x * x;
}

__attribute__((optimize("Os")))
int small_function(int x) {
    return x * x * x;
}
\`\`\`

### Target-Specific Code
\`\`\`c
// SSE instructions
#ifdef __SSE__
#include <xmmintrin.h>

__attribute__((target("sse")))
void sse_function(float *data, int n) {
    for (int i = 0; i < n; i += 4) {
        __m128 vec = _mm_load_ps(&data[i]);
        vec = _mm_mul_ps(vec, vec);
        _mm_store_ps(&data[i], vec);
    }
}
#endif

// AVX instructions
#ifdef __AVX__
#include <immintrin.h>

__attribute__((target("avx")))
void avx_function(double *data, int n) {
    for (int i = 0; i < n; i += 4) {
        __m256d vec = _mm256_load_pd(&data[i]);
        vec = _mm256_mul_pd(vec, vec);
        _mm256_store_pd(&data[i], vec);
    }
}
#endif
\`\`\`

GCC extensions provide powerful capabilities beyond standard C, enabling high-performance, platform-specific optimizations and advanced language features.`
};

