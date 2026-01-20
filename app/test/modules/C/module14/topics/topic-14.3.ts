import { SubLesson } from '../../../../data/lessonsData';

export const topic_14_3: SubLesson = {
  id: '14.3',
  title: 'C11 and C18 Standards Features',
  status: 'demo',
  content: `# C11 and C18 Standards Features

## C11 Standard Features

### _Alignas and _Alignof
\`\`\`c
#include <stdalign.h>

// Alignment specifier
_Alignas(16) char buffer[1024];  // Align to 16-byte boundary

struct __attribute__((aligned(32))) AlignedStruct {
    int data;
};

// Alignment operators
size_t alignment = _Alignof(int);        // Get alignment requirement
size_t struct_align = _Alignof(struct AlignedStruct);

// Dynamic alignment
void *aligned_alloc(size_t alignment, size_t size);

// Example usage
int main() {
    printf("int alignment: %zu\\n", _Alignof(int));
    printf("double alignment: %zu\\n", _Alignof(double));

    // Allocate aligned memory
    size_t align = 64;
    size_t size = 1024;
    void *ptr = aligned_alloc(align, size);
    if (ptr) {
        printf("Allocated %zu bytes aligned to %zu bytes\\n", size, align);
        free(ptr);
    }

    return 0;
}
\`\`\`

### _Noreturn Function Specifier
\`\`\`c
#include <stdlib.h>
#include <stdnoreturn.h>

// Function that never returns
_Noreturn void fatal_error(const char *message) {
    fprintf(stderr, "Fatal error: %s\\n", message);
    exit(EXIT_FAILURE);
}

// Alternative spelling
noreturn void abort_program(void) {
    // Clean up resources
    fatal_error("Program aborted");
}

// Usage in conditional compilation
_Noreturn void unreachable_code(void) {
    // This function should never return
    abort();
}
\`\`\`

### _Static_assert (Compile-time Assertions)
\`\`\`c
// Basic static assertions
_Static_assert(sizeof(int) >= 4, "int too small");
_Static_assert(CHAR_BIT == 8, "char not 8 bits");

// Structure size checks
struct DataPacket {
    uint32_t id;
    uint16_t length;
    char data[100];
};

_Static_assert(sizeof(struct DataPacket) == 106,
               "DataPacket size incorrect");

// Array bounds checking
#define ARRAY_SIZE 10
int array[ARRAY_SIZE];
_Static_assert(ARRAY_SIZE > 0, "Array size must be positive");

// Platform-specific checks
#ifdef __x86_64__
    _Static_assert(sizeof(void *) == 8, "64-bit pointers required");
#endif
\`\`\`

### Anonymous Structures and Unions
\`\`\`c
struct Person {
    char name[50];
    struct {        // Anonymous structure
        int day;
        int month;
        int year;
    };              // No member name

    union {         // Anonymous union
        int employee_id;
        char department[20];
    };              // No member name
};

// Usage
struct Person p;
strcpy(p.name, "John Doe");
p.day = 15;        // Direct access to anonymous struct members
p.month = 6;
p.employee_id = 12345;  // Union member

printf("Name: %s\\n", p.name);
printf("Birth: %d/%d/%d\\n", p.day, p.month, p.year);
printf("ID: %d\\n", p.employee_id);
\`\`\`

## C18 Standard Features

### Minor updates and clarifications in C18
- Mostly bug fixes and clarifications
- No major new features
- Improved Unicode support
- Better Annex K (bounds-checking interfaces) specification

## Advanced Type Qualifiers

### _Atomic (C11)
\`\`\`c
#include <stdatomic.h>

// Atomic types
atomic_int counter = ATOMIC_VAR_INIT(0);
atomic_flag lock = ATOMIC_FLAG_INIT;

// Atomic operations
void atomic_increment(atomic_int *value) {
    atomic_fetch_add(value, 1);
}

void atomic_decrement(atomic_int *value) {
    atomic_fetch_sub(value, 1);
}

int atomic_get(atomic_int *value) {
    return atomic_load(value);
}

void atomic_set(atomic_int *value, int new_val) {
    atomic_store(value, new_val);
}

// Memory ordering
void atomic_increment_relaxed(atomic_int *value) {
    atomic_fetch_add_explicit(value, 1, memory_order_relaxed);
}

void atomic_increment_acquire(atomic_int *value) {
    atomic_fetch_add_explicit(value, 1, memory_order_acquire);
}

// Compare and exchange
bool compare_and_exchange(atomic_int *value, int expected, int desired) {
    return atomic_compare_exchange_weak(value, &expected, desired);
}

// Example usage
int main() {
    atomic_int shared_counter = ATOMIC_VAR_INIT(0);

    // Thread-safe increment
    atomic_increment(&shared_counter);

    // Get current value
    int current = atomic_get(&shared_counter);
    printf("Counter: %d\\n", current);

    return 0;
}
\`\`\`

### Complex Numbers (C99, enhanced in C11)
\`\`\`c
#include <complex.h>

// Complex types
double complex z1 = 1.0 + 2.0 * I;    // 1 + 2i
float complex z2 = 3.0f + 4.0f * I;   // 3 + 4i
long double complex z3 = 5.0L + 6.0L * I;  // 5 + 6i

// Complex operations
double complex sum = z1 + z2;
double complex product = z1 * z2;
double complex quotient = z1 / z2;

// Accessing real and imaginary parts
double real_part = creal(z1);
double imag_part = cimag(z1);

// Magnitude and phase
double magnitude = cabs(z1);
double phase = carg(z1);

// Exponential and logarithmic functions
double complex exp_z = cexp(z1);
double complex log_z = clog(z1);

// Trigonometric functions
double complex sin_z = csin(z1);
double complex cos_z = ccos(z1);

// Power functions
double complex pow_z = cpow(z1, z2);
double complex sqrt_z = csqrt(z1);

// Example: Mandelbrot set calculation
double complex mandelbrot_iterate(double complex c, int max_iter) {
    double complex z = 0.0 + 0.0 * I;

    for (int i = 0; i < max_iter; i++) {
        if (cabs(z) > 2.0) {
            break;
        }
        z = z * z + c;
    }

    return z;
}

int main() {
    double complex c = -0.7 + 0.3 * I;
    double complex result = mandelbrot_iterate(c, 100);

    printf("Mandelbrot result: %f + %fi\\n", creal(result), cimag(result));

    return 0;
}
\`\`\`

## Unicode and Wide Character Support

### Wide Characters and Strings
\`\`\`c
#include <wchar.h>
#include <wctype.h>

// Wide character types
wchar_t wide_char = L'Ω';              // Greek omega
const wchar_t *wide_string = L"Hello, 世界!";  // Unicode string

// Wide character functions
wint_t w_lower = towlower(wide_char);
wint_t w_upper = towupper(wide_char);

// Wide string functions
size_t str_len = wcslen(wide_string);
wchar_t *str_copy = wcsdup(wide_string);

// File I/O with wide characters
FILE *fp = fopen("unicode.txt", "w");
fwprintf(fp, L"Unicode text: %ls\\n", wide_string);
fclose(fp);
\`\`\`

### UTF-8 Support
\`\`\`c
#include <uchar.h>  // C11

// UTF-8 character types
char8_t utf8_char;           // UTF-8 character
char16_t utf16_char;         // UTF-16 character
char32_t utf32_char;         // UTF-32 character

// Multibyte conversion
mbstate_t state = {0};
char utf8_buffer[MB_LEN_MAX];
wchar_t wide_char = L'Ω';

// Convert wide char to UTF-8
size_t result = wcrtomb(utf8_buffer, wide_char, &state);
if (result != (size_t)-1) {
    printf("UTF-8 bytes: ");
    for (size_t i = 0; i < result; i++) {
        printf("%02x ", (unsigned char)utf8_buffer[i]);
    }
    printf("\\n");
}
\`\`\`

## Bounds-Checking Interfaces (Annex K)

### Secure String Functions
\`\`\`c
#define __STDC_WANT_LIB_EXT1__ 1
#include <string.h>

// Bounds-checking string functions
errno_t strcpy_s(char *restrict dest, rsize_t destsz,
                 const char *restrict src);

errno_t strcat_s(char *restrict dest, rsize_t destsz,
                 const char *restrict src);

// Example usage
int main() {
    char buffer[10];

    // Safe copy - checks bounds
    errno_t result = strcpy_s(buffer, sizeof(buffer), "Hello");

    if (result == 0) {
        printf("Copy successful: %s\\n", buffer);
    } else {
        printf("Copy failed with error: %d\\n", result);
    }

    // This would fail - string too long
    result = strcpy_s(buffer, sizeof(buffer), "This is a very long string");

    return 0;
}
\`\`\`

### Safe Memory Functions
\`\`\`c
// Safe memcpy
errno_t memcpy_s(void *restrict dest, rsize_t destsz,
                 const void *restrict src, rsize_t count);

// Safe memmove
errno_t memmove_s(void *dest, rsize_t destsz,
                  const void *src, rsize_t count);

// Safe memset
errno_t memset_s(void *dest, rsize_t destsz, int ch, rsize_t count);

// Example
struct Data {
    int id;
    char name[20];
};

int main() {
    struct Data dest, src = {123, "Example"};

    errno_t result = memcpy_s(&dest, sizeof(dest), &src, sizeof(src));

    if (result == 0) {
        printf("Safe copy successful\\n");
    }

    return 0;
}
\`\`\`

## Thread-Local Storage (C11)

### _Thread_local
\`\`\`c
#include <threads.h>

// Thread-local variables
_Thread_local int thread_counter = 0;
thread_local double thread_precision = 0.001;

// Thread-local function
void increment_counter(void) {
    thread_counter++;
    printf("Thread %lu counter: %d\\n",
           (unsigned long)thrd_current(), thread_counter);
}

// Thread function
int worker_thread(void *arg) {
    for (int i = 0; i < 5; i++) {
        increment_counter();
        thrd_sleep(&(struct timespec){0, 100000000}, NULL);  // 100ms
    }

    return 0;
}

int main() {
    thrd_t threads[3];

    // Create threads
    for (int i = 0; i < 3; i++) {
        thrd_create(&threads[i], worker_thread, NULL);
    }

    // Wait for threads
    for (int i = 0; i < 3; i++) {
        thrd_join(threads[i], NULL);
    }

    return 0;
}
\`\`\`

## Quick Exit Functions

### _Exit and quick_exit
\`\`\`c
#include <stdlib.h>

// Normal exit - calls atexit handlers and flushes streams
void normal_exit(void) {
    printf("Normal exit\\n");
    exit(0);
}

// Quick exit - calls at_quick_exit handlers, no stream flushing
void quick_exit_func(void) {
    printf("Quick exit handler\\n");
}

void quick_exit_example(void) {
    at_quick_exit(quick_exit_func);
    quick_exit(0);  // Calls quick_exit handlers only
}

// Immediate exit - no cleanup
void immediate_exit(void) {
    _Exit(1);  // Immediate termination
}
\`\`\`

## Timespec Functions

### High-Resolution Time
\`\`\`c
#include <time.h>

// Get current time with nanosecond precision
int timespec_get(struct timespec *ts, int base);

// Example
struct timespec current_time;
timespec_get(&current_time, TIME_UTC);

printf("Current time: %ld.%09ld seconds since epoch\\n",
       current_time.tv_sec, current_time.tv_nsec);

// Time difference calculation
struct timespec start, end;
timespec_get(&start, TIME_UTC);

// Some operation
timespec_get(&end, TIME_UTC);

// Calculate elapsed time
time_t elapsed_sec = end.tv_sec - start.tv_sec;
long elapsed_nsec = end.tv_nsec - start.tv_nsec;

if (elapsed_nsec < 0) {
    elapsed_sec--;
    elapsed_nsec += 1000000000L;
}

printf("Elapsed time: %ld.%09ld seconds\\n", elapsed_sec, elapsed_nsec);
\`\`\`

C11 and C18 introduced many modern features that improve type safety, performance, and code maintainability. These standards bring C closer to modern programming language features while maintaining backward compatibility.`
};

