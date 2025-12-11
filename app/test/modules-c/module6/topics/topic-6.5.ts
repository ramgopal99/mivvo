import { SubLesson } from '../../../data/lessonsData';

export const topic_6_5: SubLesson = {
  id: 6.5,
  title: 'Pointers and Functions',
  status: 'completed',
  content: `# 🎛️ Pointers and Functions

Master how pointers enhance function capabilities through pass-by-reference, dynamic returns, and function pointers.

---

## 📥 Pass-by-Reference with Pointers

### Modifying Variables Through Functions

\`\`\`c
#include <stdio.h>

// Function that modifies its argument
void increment(int* num) {
    (*num)++;  // Dereference and increment
}

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 5, y = 10;

    printf("Before increment: x = %d\\n", x);
    increment(&x);
    printf("After increment: x = %d\\n", x);

    printf("\\nBefore swap: x = %d, y = %d\\n", x, y);
    swap(&x, &y);
    printf("After swap: x = %d, y = %d\\n", x, y);

    return 0;
}
\`\`\`

### Multiple Return Values

\`\`\`c
#include <stdio.h>

// Function that returns multiple values through pointers
void divide_with_remainder(int dividend, int divisor, int* quotient, int* remainder) {
    *quotient = dividend / divisor;
    *remainder = dividend % divisor;
}

int main() {
    int a = 17, b = 5;
    int q, r;

    divide_with_remainder(a, b, &q, &r);

    printf("%d ÷ %d = %d remainder %d\\n", a, b, q, r);

    return 0;
}
\`\`\`

---

## 📤 Returning Pointers from Functions

### Safe Pointer Return Techniques

#### Method 1: Return Pointer to Static Variable

\`\`\`c
#include <stdio.h>

// Returns pointer to static buffer
char* get_greeting() {
    static char buffer[50];  // Static - persists after function returns
    strcpy(buffer, "Hello from static buffer!");
    return buffer;
}

int main() {
    char* message = get_greeting();
    printf("%s\\n", message);

    // Can call again - same buffer
    char* message2 = get_greeting();
    printf("%s\\n", message2);

    return 0;
}
\`\`\`

#### Method 2: Dynamic Memory Allocation

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Returns pointer to dynamically allocated memory
char* create_message(const char* prefix, int number) {
    char* buffer = (char*)malloc(100 * sizeof(char));

    if (buffer != NULL) {
        sprintf(buffer, "%s: %d", prefix, number);
    }

    return buffer;  // Caller must free this memory!
}

int main() {
    char* message = create_message("Count", 42);

    if (message != NULL) {
        printf("%s\\n", message);
        free(message);  // Don't forget to free!
    }

    return 0;
}
\`\`\`

#### Method 3: Return Input Pointer (No Allocation)

\`\`\`c
#include <stdio.h>
#include <string.h>

// Returns pointer to existing memory
char* find_substring(char* str, const char* substr) {
    return strstr(str, substr);  // Returns pointer into str
}

int main() {
    char text[] = "The quick brown fox jumps over the lazy dog";
    char* result = find_substring(text, "fox");

    if (result != NULL) {
        printf("Found 'fox' at position: %ld\\n", result - text);
        printf("Substring: %s\\n", result);
    }

    return 0;
}
\`\`\`

---

## 🎯 Function Pointers

### Declaring Function Pointers

\`\`\`c
#include <stdio.h>

// Function pointer declaration
int (*operation)(int, int);

// Functions to point to
int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
int multiply(int a, int b) { return a * b; }

int main() {
    int x = 10, y = 5;

    // Point to different functions
    operation = add;
    printf("10 + 5 = %d\\n", operation(x, y));

    operation = subtract;
    printf("10 - 5 = %d\\n", operation(x, y));

    operation = multiply;
    printf("10 * 5 = %d\\n", operation(x, y));

    return 0;
}
\`\`\`

### Function Pointer Syntax

\`\`\`c
// General syntax: return_type (*pointer_name)(parameter_types);

// Examples
int (*func_ptr)(int, int);                    // Takes 2 ints, returns int
void (*callback)(void);                       // Takes nothing, returns nothing
double (*math_func)(double);                  // Takes double, returns double
char* (*string_func)(const char*, const char*); // Takes 2 strings, returns string

// Using typedef for clarity
typedef int (*BinaryOperation)(int, int);

BinaryOperation op1 = add;
BinaryOperation op2 = multiply;
\`\`\`

---

## 🧪 Callback Functions

### Using Function Pointers as Parameters

\`\`\`c
#include <stdio.h>

// Function that takes a function pointer as parameter
void process_array(int arr[], int size, int (*operation)(int)) {
    printf("Processing array: ");
    for (int i = 0; i < size; i++) {
        arr[i] = operation(arr[i]);
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

// Operation functions
int square(int x) { return x * x; }
int increment(int x) { return x + 1; }
int negate(int x) { return -x; }

int main() {
    int numbers[] = {1, 2, 3, 4, 5};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    process_array(numbers, size, square);
    process_array(numbers, size, increment);
    process_array(numbers, size, negate);

    return 0;
}
\`\`\`

### Generic Sort Function

\`\`\`c
#include <stdio.h>

// Comparison function type
typedef int (*CompareFunc)(const void*, const void*);

// Simple bubble sort with custom comparison
void bubble_sort(void* arr, int size, int element_size, CompareFunc compare) {
    char* array = (char*)arr;

    for (int i = 0; i < size - 1; i++) {
        for (int j = 0; j < size - i - 1; j++) {
            char* elem1 = array + j * element_size;
            char* elem2 = array + (j + 1) * element_size;

            if (compare(elem1, elem2) > 0) {
                // Swap elements
                for (int k = 0; k < element_size; k++) {
                    char temp = elem1[k];
                    elem1[k] = elem2[k];
                    elem2[k] = temp;
                }
            }
        }
    }
}

// Comparison functions for different types
int compare_int(const void* a, const void* b) {
    return *(int*)a - *(int*)b;
}

int compare_float(const void* a, const void* b) {
    float fa = *(float*)a;
    float fb = *(float*)b;
    if (fa < fb) return -1;
    if (fa > fb) return 1;
    return 0;
}

int main() {
    // Sort integers
    int int_arr[] = {64, 34, 25, 12, 22, 11, 90};
    int int_size = sizeof(int_arr) / sizeof(int_arr[0]);

    bubble_sort(int_arr, int_size, sizeof(int), compare_int);

    printf("Sorted integers: ");
    for (int i = 0; i < int_size; i++) {
        printf("%d ", int_arr[i]);
    }
    printf("\\n");

    // Sort floats
    float float_arr[] = {3.14f, 1.41f, 2.71f, 0.58f};
    int float_size = sizeof(float_arr) / sizeof(float_arr[0]);

    bubble_sort(float_arr, float_size, sizeof(float), compare_float);

    printf("Sorted floats: ");
    for (int i = 0; i < float_size; i++) {
        printf("%.2f ", float_arr[i]);
    }
    printf("\\n");

    return 0;
}
\`\`\`

---

## 📊 Array of Function Pointers

### Menu System with Function Pointers

\`\`\`c
#include <stdio.h>

// Function pointer type
typedef void (*MenuFunction)(void);

// Menu functions
void show_help(void) {
    printf("This is the help system.\\n");
}

void show_version(void) {
    printf("Version 1.0.0\\n");
}

void exit_program(void) {
    printf("Goodbye!\\n");
    exit(0);
}

void invalid_choice(void) {
    printf("Invalid choice. Please try again.\\n");
}

int main() {
    // Array of function pointers
    MenuFunction menu_functions[] = {
        show_help,      // 0
        show_version,   // 1
        exit_program,   // 2
        invalid_choice  // 3 (default)
    };

    int choice;

    while (1) {
        printf("\\nMenu:\\n");
        printf("0. Help\\n");
        printf("1. Version\\n");
        printf("2. Exit\\n");
        printf("Enter choice: ");
        scanf("%d", &choice);

        // Call appropriate function
        if (choice >= 0 && choice <= 2) {
            menu_functions[choice]();
        } else {
            menu_functions[3]();  // Invalid choice
        }
    }

    return 0;
}
\`\`\`

---

## 🛡️ Pointer Parameter Safety

### const Pointer Parameters

\`\`\`c
#include <stdio.h>

// Function promises not to modify the pointed-to data
int find_length(const char* str) {
    int length = 0;
    while (*str != '\\0') {
        length++;
        str++;  // Can modify the pointer itself
    }
    return length;
}

// Function promises not to modify the pointer either
int compare_strings(const char* str1, const char* str2) {
    while (*str1 && *str2) {
        if (*str1 != *str2) {
            return *str1 - *str2;
        }
        str1++;  // Cannot modify str1 (would change caller's copy)
        str2++;  // Cannot modify str2
    }
    return *str1 - *str2;
}

int main() {
    char text[] = "Hello, World!";
    printf("Length: %d\\n", find_length(text));

    char str1[] = "apple";
    char str2[] = "banana";
    int result = compare_strings(str1, str2);

    if (result < 0) {
        printf("'%s' comes before '%s'\\n", str1, str2);
    } else if (result > 0) {
        printf("'%s' comes after '%s'\\n", str1, str2);
    } else {
        printf("Strings are equal\\n");
    }

    return 0;
}
\`\`\`

---

## 🧪 Advanced Examples

### Command Parser

\`\`\`c
#include <stdio.h>
#include <string.h>

// Command function type
typedef void (*CommandFunc)(char* args);

// Command functions
void cmd_help(char* args) {
    printf("Available commands: help, quit, echo\\n");
}

void cmd_quit(char* args) {
    printf("Goodbye!\\n");
    exit(0);
}

void cmd_echo(char* args) {
    if (args && strlen(args) > 0) {
        printf("%s\\n", args);
    } else {
        printf("Echo: (no arguments)\\n");
    }
}

int main() {
    // Command table
    struct {
        char* name;
        CommandFunc function;
    } commands[] = {
        {"help", cmd_help},
        {"quit", cmd_quit},
        {"echo", cmd_echo},
        {NULL, NULL}  // End marker
    };

    char input[100];

    while (1) {
        printf("> ");
        if (fgets(input, sizeof(input), stdin) == NULL) {
            break;
        }

        // Remove newline
        input[strcspn(input, "\\n")] = 0;

        // Parse command and arguments
        char* command = strtok(input, " ");
        char* args = strtok(NULL, "");  // Rest of the line

        if (command != NULL) {
            int found = 0;

            // Find and execute command
            for (int i = 0; commands[i].name != NULL; i++) {
                if (strcmp(command, commands[i].name) == 0) {
                    commands[i].function(args);
                    found = 1;
                    break;
                }
            }

            if (!found) {
                printf("Unknown command: %s\\n", command);
            }
        }
    }

    return 0;
}
\`\`\`

### Mathematical Operations Table

\`\`\`c
#include <stdio.h>

// Operation function type
typedef double (*MathOperation)(double, double);

// Math operation functions
double add_op(double a, double b) { return a + b; }
double subtract_op(double a, double b) { return a - b; }
double multiply_op(double a, double b) { return a * b; }
double divide_op(double a, double b) { return b != 0 ? a / b : 0; }

int main() {
    // Table of operations
    struct {
        char* name;
        char symbol;
        MathOperation function;
    } operations[] = {
        {"Addition", '+', add_op},
        {"Subtraction", '-', subtract_op},
        {"Multiplication", '*', multiply_op},
        {"Division", '/', divide_op}
    };

    int num_operations = sizeof(operations) / sizeof(operations[0]);

    double a = 10.0, b = 3.0;

    printf("Mathematical Operations:\\n");
    printf("a = %.1f, b = %.1f\\n\\n", a, b);

    for (int i = 0; i < num_operations; i++) {
        double result = operations[i].function(a, b);
        printf("%s: %.1f %c %.1f = %.2f\\n",
               operations[i].name, a, operations[i].symbol, b, result);
    }

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Pass-by-reference** allows functions to modify caller variables
2. **Multiple return values** can be achieved with pointer parameters
3. **Function pointers** store addresses of functions for dynamic behavior
4. **Callback functions** enable flexible, reusable code
5. **const pointers** protect data from accidental modification
6. **Dynamic allocation** enables functions to return variable-sized data
7. **Function pointer arrays** create dispatch tables and menus

---

## 🚀 Preview: Dynamic Memory Allocation

In the next topic, you'll learn about:
- **malloc, calloc, realloc, free** functions
- **Memory management** best practices
- **Common memory errors** and debugging
- **Dynamic data structures** like linked lists

**Dynamic memory allocation gives programs unlimited flexibility!** 💾
