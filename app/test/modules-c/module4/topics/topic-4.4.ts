import { SubLesson } from '../../../data/lessonsData';

export const topic_4_4: SubLesson = {
  id: 4.4,
  title: 'Return Values and Types',
  status: 'completed',
  content: `# ↩️ Return Values and Types

Master how functions return data to their callers and learn about different return types and techniques in C.

---

## 📋 Return Statement Basics

### Basic Return Syntax

\`\`\`c
return expression;  // Return a value
return;            // Return from void function
\`\`\`

### Simple Return Examples

\`\`\`c
#include <stdio.h>

// Function that returns an integer
int get_five(void) {
    return 5;
}

// Function that returns a calculation
int add(int a, int b) {
    return a + b;
}

// Void function (no return value)
void print_hello(void) {
    printf("Hello, World!\\n");
    return;  // Optional for void functions
}

int main() {
    int five = get_five();
    int sum = add(3, 4);

    printf("Five: %d\\n", five);
    printf("Sum: %d\\n", sum);
    print_hello();  // No return value to capture

    return 0;
}
\`\`\`

---

## 🔄 Return Types in C

### 1. void - No Return Value

\`\`\`c
void display_menu(void) {
    printf("1. Add\\n");
    printf("2. Subtract\\n");
    printf("3. Exit\\n");
}

void log_error(const char* message) {
    fprintf(stderr, "Error: %s\\n", message);
}

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
    // No return needed - modifies through pointers
}
\`\`\`

### 2. int - Integer Return Values

\`\`\`c
int get_user_choice(void) {
    int choice;
    scanf("%d", &choice);
    return choice;
}

int find_maximum(int a, int b) {
    return (a > b) ? a : b;
}

int validate_age(int age) {
    if (age >= 0 && age <= 150) {
        return 1;  // Success
    } else {
        return 0;  // Failure
    }
}
\`\`\`

### 3. Floating-Point Types

\`\`\`c
float calculate_area(float radius) {
    const float PI = 3.14159f;
    return PI * radius * radius;
}

double calculate_compound_interest(double principal, double rate, int years) {
    return principal * pow(1 + rate, years);
}
\`\`\`

### 4. char - Character Return Values

\`\`\`c
char get_grade(int score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
}

char to_uppercase(char c) {
    if (c >= 'a' && c <= 'z') {
        return c - ('a' - 'A');
    }
    return c;
}
\`\`\`

### 5. Pointer Types

\`\`\`c
#include <stdlib.h>

// Return dynamically allocated memory
int* create_array(int size) {
    int* arr = (int*)malloc(size * sizeof(int));
    if (arr == NULL) {
        return NULL;  // Error condition
    }

    // Initialize array
    for (int i = 0; i < size; i++) {
        arr[i] = 0;
    }

    return arr;  // Return pointer to allocated memory
}

// Return pointer to existing data
const char* get_error_message(int error_code) {
    switch (error_code) {
        case 0: return "Success";
        case 1: return "File not found";
        case 2: return "Permission denied";
        default: return "Unknown error";
    }
}
\`\`\`

---

## 🧪 Advanced Return Techniques

### Returning Multiple Values

#### Method 1: Using Pointer Parameters

\`\`\`c
#include <stdio.h>

// Return multiple values through pointer parameters
void divide_numbers(int dividend, int divisor, int* quotient, int* remainder) {
    *quotient = dividend / divisor;
    *remainder = dividend % divisor;
}

int main() {
    int a = 17, b = 5;
    int q, r;

    divide_numbers(a, b, &q, &r);

    printf("%d ÷ %d = %d remainder %d\\n", a, b, q, r);
    return 0;
}
\`\`\`

#### Method 2: Using Structures

\`\`\`c
#include <stdio.h>

typedef struct {
    int quotient;
    int remainder;
} DivisionResult;

// Return multiple values in a structure
DivisionResult divide_numbers(int dividend, int divisor) {
    DivisionResult result;
    result.quotient = dividend / divisor;
    result.remainder = dividend % divisor;
    return result;
}

int main() {
    DivisionResult result = divide_numbers(17, 5);

    printf("Quotient: %d, Remainder: %d\\n", result.quotient, result.remainder);
    return 0;
}
\`\`\`

### Returning Arrays

#### Method 1: Return Pointer (Static Array)

\`\`\`c
// Return pointer to static array (lifetime extends beyond function)
int* get_fibonacci_sequence(int n) {
    static int fib[20];  // Static array persists

    if (n > 20) n = 20;

    fib[0] = 0;
    fib[1] = 1;

    for (int i = 2; i < n; i++) {
        fib[i] = fib[i-1] + fib[i-2];
    }

    return fib;
}

int main() {
    int* fib = get_fibonacci_sequence(10);

    for (int i = 0; i < 10; i++) {
        printf("%d ", fib[i]);
    }

    return 0;
}
\`\`\`

#### Method 2: Dynamic Allocation

\`\`\`c
#include <stdlib.h>

// Return dynamically allocated array
int* create_range(int start, int end) {
    int size = end - start + 1;
    int* arr = (int*)malloc(size * sizeof(int));

    if (arr == NULL) {
        return NULL;
    }

    for (int i = 0; i < size; i++) {
        arr[i] = start + i;
    }

    return arr;  // Caller must free() this memory
}

int main() {
    int* range = create_range(5, 10);

    if (range != NULL) {
        for (int i = 0; i <= 5; i++) {
            printf("%d ", range[i]);
        }
        printf("\\n");

        free(range);  // Don't forget to free!
    }

    return 0;
}
\`\`\`

---

## ⚠️ Return Value Handling

### Checking Return Values

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

// Function that can fail
int* allocate_array(int size) {
    if (size <= 0) {
        return NULL;  // Indicate failure
    }

    int* arr = (int*)malloc(size * sizeof(int));
    return arr;  // NULL if malloc failed
}

int main() {
    int* array = allocate_array(10);

    if (array == NULL) {
        printf("Failed to allocate memory!\\n");
        return 1;
    }

    // Use the array...
    array[0] = 42;
    printf("Success: %d\\n", array[0]);

    free(array);
    return 0;
}
\`\`\`

### Error Codes vs Return Values

\`\`\`c
// Method 1: Return error code, use pointer for result
int safe_divide(int a, int b, double* result) {
    if (b == 0) {
        return -1;  // Error code
    }

    *result = (double)a / b;
    return 0;  // Success code
}

// Method 2: Return success/failure, use global error variable
static const char* last_error = NULL;

const char* get_last_error(void) {
    return last_error;
}

int process_file(const char* filename) {
    FILE* file = fopen(filename, "r");

    if (file == NULL) {
        last_error = "Could not open file";
        return 0;  // Failure
    }

    // Process file...
    fclose(file);
    return 1;  // Success
}
\`\`\`

---

## 🎯 Best Practices for Return Values

### Consistent Return Types

\`\`\`c
// ✅ Consistent: all paths return same type
int process_data(int value) {
    if (value < 0) {
        return -1;  // Error
    } else if (value == 0) {
        return 0;   // Special case
    } else {
        return 1;   // Success
    }
}

// ❌ Inconsistent: mixing return types
double calculate(int operation) {
    if (operation == 1) {
        return 42;      // int
    } else {
        return 3.14;    // double
    }
}
\`\`\`

### Early Returns for Error Cases

\`\`\`c
// ✅ Early return for errors (reduces nesting)
int validate_and_process(int value) {
    if (value < 0) {
        printf("Error: Negative value\\n");
        return -1;
    }

    if (value > 100) {
        printf("Error: Value too large\\n");
        return -1;
    }

    // Process valid value
    return value * 2;
}

// ❌ Deep nesting
int validate_and_process_bad(int value) {
    if (value >= 0) {
        if (value <= 100) {
            return value * 2;
        } else {
            printf("Error: Value too large\\n");
            return -1;
        }
    } else {
        printf("Error: Negative value\\n");
        return -1;
    }
}
\`\`\`

### Document Return Values

\`\`\`c
/*
 * calculate_tax - Calculate income tax
 * @income: Annual income in dollars
 * @brackets: Number of tax brackets
 *
 * Returns: Tax amount in dollars, or -1.0 on error
 */
double calculate_tax(double income, int brackets) {
    if (income < 0 || brackets < 1) {
        return -1.0;  // Error indicator
    }

    // Calculate tax...
    return income * 0.25;
}
\`\`\`

---

## 🧪 Complete Examples

### File Processing with Return Values

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Error codes
#define SUCCESS 0
#define FILE_NOT_FOUND -1
#define MEMORY_ERROR -2
#define INVALID_FORMAT -3

// Structure to hold file statistics
typedef struct {
    int lines;
    int words;
    int characters;
} FileStats;

// Function that returns status code and fills structure
int analyze_file(const char* filename, FileStats* stats) {
    FILE* file = fopen(filename, "r");

    if (file == NULL) {
        return FILE_NOT_FOUND;
    }

    // Initialize stats
    memset(stats, 0, sizeof(FileStats));

    char ch;
    int in_word = 0;

    while ((ch = fgetc(file)) != EOF) {
        stats->characters++;

        if (ch == '\\n') {
            stats->lines++;
        }

        if (ch == ' ' || ch == '\\t' || ch == '\\n') {
            in_word = 0;
        } else if (!in_word) {
            in_word = 1;
            stats->words++;
        }
    }

    fclose(file);
    return SUCCESS;
}

// Function that returns error message string
const char* get_error_message(int error_code) {
    switch (error_code) {
        case SUCCESS: return "Success";
        case FILE_NOT_FOUND: return "File not found";
        case MEMORY_ERROR: return "Memory allocation failed";
        case INVALID_FORMAT: return "Invalid file format";
        default: return "Unknown error";
    }
}

int main(int argc, char* argv[]) {
    if (argc != 2) {
        printf("Usage: %s <filename>\\n", argv[0]);
        return 1;
    }

    FileStats stats;
    int result = analyze_file(argv[1], &stats);

    if (result != SUCCESS) {
        printf("Error: %s\\n", get_error_message(result));
        return 1;
    }

    printf("File analysis complete:\\n");
    printf("Lines: %d\\n", stats.lines);
    printf("Words: %d\\n", stats.words);
    printf("Characters: %d\\n", stats.characters);

    return 0;
}
\`\`\`

### Math Library with Error Handling

\`\`\`c
#include <stdio.h>
#include <math.h>

// Custom result structure for operations that might fail
typedef struct {
    double value;
    int error_code;
} MathResult;

// Error codes
#define MATH_SUCCESS 0
#define MATH_DOMAIN_ERROR 1  // Invalid input range
#define MATH_RANGE_ERROR 2   // Result out of range

// Safe square root function
MathResult safe_sqrt(double x) {
    MathResult result;

    if (x < 0) {
        result.error_code = MATH_DOMAIN_ERROR;
        result.value = 0.0;
    } else {
        result.error_code = MATH_SUCCESS;
        result.value = sqrt(x);
    }

    return result;
}

// Safe logarithm function
MathResult safe_log(double x) {
    MathResult result;

    if (x <= 0) {
        result.error_code = MATH_DOMAIN_ERROR;
        result.value = 0.0;
    } else {
        result.error_code = MATH_SUCCESS;
        result.value = log(x);
    }

    return result;
}

void print_math_result(const char* operation, MathResult result) {
    printf("%s: ", operation);

    if (result.error_code != MATH_SUCCESS) {
        printf("Error (code: %d)\\n", result.error_code);
    } else {
        printf("%.6f\\n", result.value);
    }
}

int main() {
    // Test various mathematical operations
    print_math_result("sqrt(16)", safe_sqrt(16));
    print_math_result("sqrt(-4)", safe_sqrt(-4));
    print_math_result("log(10)", safe_log(10));
    print_math_result("log(0)", safe_log(0));

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Return types** specify what a function sends back to the caller
2. **void functions** don't return values, others return specific types
3. **Multiple return values** can be achieved with pointers or structures
4. **Error handling** is crucial - use return codes or special values
5. **Document return values** clearly in comments
6. **Check return values** from functions that can fail
7. **Use early returns** for error cases to reduce nesting

---

## 🚀 Preview: Function Prototypes

In the next topic, you'll learn about:
- **Function prototypes** and forward declarations
- **Header files** for function declarations
- **Separate compilation** and linking
- **Organizing large programs** with multiple files

**Function prototypes make large programs manageable and maintainable!** 📁`
};
