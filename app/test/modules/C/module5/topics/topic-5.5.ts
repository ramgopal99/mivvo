import { SubLesson } from '../../../../data/lessonsData';

export const topic_5_5: SubLesson = {
  id: "5.5",
  title: 'Pointers and Functions',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🔄 Pointers and Functions in C

Pointers and functions work together in powerful ways. Functions can return pointers, accept function pointers, and use pointers to modify data. This enables advanced programming patterns like callbacks, dynamic data structures, and efficient parameter passing.

---

## 📤 Functions Returning Pointers

### **Returning Pointers from Functions**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

// Function returning a pointer to int
int* create_number(int value) {
    int *ptr = (int*)malloc(sizeof(int));
    if (ptr == NULL) return NULL;

    *ptr = value;
    return ptr;
}

// Function returning pointer to largest element
int* find_max_pointer(int arr[], int size) {
    if (size <= 0) return NULL;

    int *max_ptr = &arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] > *max_ptr) {
            max_ptr = &arr[i];
        }
    }
    return max_ptr;
}

int main(void) {
    // Test create_number
    int *num = create_number(42);
    if (num) {
        printf("Created number: %d\\n", *num);
        free(num);
    }

    // Test find_max_pointer
    int numbers[5] = {3, 7, 2, 9, 5};
    int *max_ptr = find_max_pointer(numbers, 5);
    if (max_ptr) {
        printf("Maximum value: %d at index %ld\\n",
               *max_ptr, max_ptr - numbers);
    }

    return 0;
}
\`\`\`

---

## 🔧 Function Pointers

### **What are Function Pointers?**

Function pointers store the address of functions, allowing you to:
- Pass functions as arguments to other functions
- Return functions from functions
- Store functions in data structures
- Create callback mechanisms

### **Declaring Function Pointers**

\`\`\`c
// Function pointer syntax:
// return_type (*pointer_name)(parameter_types);

int (*func_ptr)(int, int);  // Pointer to function returning int, taking 2 ints
void (*callback)(void);     // Pointer to function taking no args, returning void
\`\`\`

### **Using Function Pointers**

\`\`\`c
#include <stdio.h>

// Functions to point to
int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }
int subtract(int a, int b) { return a - b; }

int main(void) {
    // Declare function pointer
    int (*operation)(int, int);

    int x = 10, y = 5;

    // Point to different functions
    operation = add;
    printf("%d + %d = %d\\n", x, y, operation(x, y));

    operation = multiply;
    printf("%d * %d = %d\\n", x, y, operation(x, y));

    operation = subtract;
    printf("%d - %d = %d\\n", x, y, operation(x, y));

    return 0;
}
\`\`\`

---

## 🎯 Passing Functions to Functions

### **Function Pointers as Parameters**

\`\`\`c
#include <stdio.h>

// Function that takes a function pointer
void process_array(int arr[], int size, int (*operation)(int)) {
    printf("Processing array: ");
    for (int i = 0; i < size; i++) {
        arr[i] = operation(arr[i]);
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

// Functions to pass
int square(int x) { return x * x; }
int cube(int x) { return x * x * x; }
int increment(int x) { return x + 1; }

int main(void) {
    int numbers[5] = {1, 2, 3, 4, 5};

    process_array(numbers, 5, square);
    process_array(numbers, 5, cube);
    process_array(numbers, 5, increment);

    return 0;
}
\`\`\`

---

## 📊 Callback Functions

### **Implementing Callbacks**

\`\`\`c
#include <stdio.h>

// Callback function type
typedef void (*ProgressCallback)(int);

// Function that performs work and calls back
void perform_task(int iterations, ProgressCallback callback) {
    for (int i = 0; i < iterations; i++) {
        // Simulate work
        for (long j = 0; j < 1000000; j++);

        // Call back with progress
        if (callback) {
            callback((i + 1) * 100 / iterations);
        }
    }
}

// Different callback implementations
void simple_progress(int percent) {
    printf("Progress: %d%%\\n", percent);
}

void fancy_progress(int percent) {
    printf("\\r[");
    for (int i = 0; i < 20; i++) {
        printf("%c", (i < percent / 5) ? '=' : ' ');
    }
    printf("] %d%%", percent);
    fflush(stdout);
}

int main(void) {
    printf("Task with simple progress:\\n");
    perform_task(5, simple_progress);

    printf("\\nTask with fancy progress:\\n");
    perform_task(10, fancy_progress);
    printf("\\nDone!\\n");

    return 0;
}
\`\`\`

---

## 🔄 Arrays of Function Pointers

### **Function Pointer Arrays**

\`\`\`c
#include <stdio.h>

// Calculator operations
int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
int multiply(int a, int b) { return a * b; }
int divide(int a, int b) { return b != 0 ? a / b : 0; }

int main(void) {
    // Array of function pointers
    int (*operations[4])(int, int) = {add, subtract, multiply, divide};

    char *names[4] = {"Add", "Subtract", "Multiply", "Divide"};

    int a = 20, b = 4;

    printf("Calculator:\\n");
    for (int i = 0; i < 4; i++) {
        printf("%s(%d, %d) = %d\\n", names[i], a, b, operations[i](a, b));
    }

    return 0;
}
\`\`\`

---

## 🎯 Advanced Function Pointer Techniques

### **Generic Sorting with Function Pointers**

\`\`\`c
#include <stdio.h>

// Comparison function type
typedef int (*CompareFunc)(const void*, const void*);

// Generic bubble sort
void bubble_sort(void *arr, int n, size_t elem_size, CompareFunc compare) {
    char *array = (char*)arr;

    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            char *elem1 = array + j * elem_size;
            char *elem2 = array + (j + 1) * elem_size;

            if (compare(elem1, elem2) > 0) {
                // Swap elements
                for (size_t k = 0; k < elem_size; k++) {
                    char temp = elem1[k];
                    elem1[k] = elem2[k];
                    elem2[k] = temp;
                }
            }
        }
    }
}

// Comparison functions
int compare_int(const void *a, const void *b) {
    return *(int*)a - *(int*)b;
}

int compare_int_desc(const void *a, const void *b) {
    return *(int*)b - *(int*)a;
}

int main(void) {
    int numbers[6] = {3, 1, 4, 1, 5, 9};

    printf("Original: ");
    for (int i = 0; i < 6; i++) printf("%d ", numbers[i]);
    printf("\\n");

    // Sort ascending
    bubble_sort(numbers, 6, sizeof(int), compare_int);
    printf("Ascending: ");
    for (int i = 0; i < 6; i++) printf("%d ", numbers[i]);
    printf("\\n");

    // Sort descending
    bubble_sort(numbers, 6, sizeof(int), compare_int_desc);
    printf("Descending: ");
    for (int i = 0; i < 6; i++) printf("%d ", numbers[i]);
    printf("\\n");

    return 0;
}
\`\`\`

---

## 🔧 Pointers to Functions with Different Signatures

### **Complex Function Pointers**

\`\`\`c
#include <stdio.h>

// Different function types
typedef int (*BinaryOp)(int, int);
typedef double (*UnaryOp)(double);
typedef void (*PrintFunc)(void*);

// Functions
int add(int a, int b) { return a + b; }
double square_root(double x) { return sqrt(x); }
void print_int(void *data) { printf("%d", *(int*)data); }
void print_double(void *data) { printf("%.2f", *(double*)data); }

int main(void) {
    // Binary operation
    BinaryOp bin_op = add;
    printf("5 + 3 = %d\\n", bin_op(5, 3));

    // Unary operation
    UnaryOp unary_op = square_root;
    printf("sqrt(16) = %.0f\\n", unary_op(16));

    // Generic printing
    PrintFunc printers[2] = {print_int, print_double};

    int int_val = 42;
    double double_val = 3.14;

    printf("Integer: ");
    printers[0](&int_val);
    printf("\\nDouble: ");
    printers[1](&double_val);
    printf("\\n");

    return 0;
}
\`\`\`

---

## 📥 Pointer Parameters for Modification

### **Passing Pointers to Modify Data**

\`\`\`c
#include <stdio.h>

// Function that modifies through pointer
void increment(int *value) {
    (*value)++;
}

// Function that swaps two values
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// Function that initializes array
void init_array(int *arr, int size, int value) {
    for (int i = 0; i < size; i++) {
        arr[i] = value;
    }
}

int main(void) {
    int x = 5, y = 10;
    int arr[5];

    printf("Before increment: x = %d\\n", x);
    increment(&x);
    printf("After increment: x = %d\\n", x);

    printf("\\nBefore swap: x = %d, y = %d\\n", x, y);
    swap(&x, &y);
    printf("After swap: x = %d, y = %d\\n", x, y);

    init_array(arr, 5, 99);
    printf("\\nInitialized array: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    return 0;
}
\`\`\`

---

## 🎯 Practical Examples

### **Example 1: Event System**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

#define MAX_EVENTS 10

typedef void (*EventHandler)(void*);

// Event system structure
typedef struct {
    EventHandler handlers[MAX_EVENTS];
    void *data[MAX_EVENTS];
    int count;
} EventSystem;

// Initialize event system
void event_init(EventSystem *system) {
    system->count = 0;
}

// Add event handler
void event_add(EventSystem *system, EventHandler handler, void *data) {
    if (system->count < MAX_EVENTS) {
        system->handlers[system->count] = handler;
        system->data[system->count] = data;
        system->count++;
    }
}

// Trigger all events
void event_trigger(EventSystem *system) {
    for (int i = 0; i < system->count; i++) {
        system->handlers[i](system->data[i]);
    }
}

// Sample event handlers
void on_button_click(void *data) {
    char *message = (char*)data;
    printf("Button clicked: %s\\n", message);
}

void on_timer_tick(void *data) {
    int *count = (int*)data;
    (*count)++;
    printf("Timer tick: %d\\n", *count);
}

int main(void) {
    EventSystem events;
    event_init(&events);

    // Add event handlers
    event_add(&events, on_button_click, "Save button");
    event_add(&events, on_button_click, "Cancel button");

    int tick_count = 0;
    event_add(&events, on_timer_tick, &tick_count);

    // Simulate events
    printf("Simulating button events:\\n");
    event_trigger(&events);

    printf("\\nSimulating timer events:\\n");
    event_trigger(&events);
    event_trigger(&events);

    return 0;
}
\`\`\`

### **Example 2: Command Pattern**

\`\`\`c
#include <stdio.h>

typedef struct {
    void (*execute)(void*);
    void (*undo)(void*);
    void *data;
} Command;

// Text editor commands
typedef struct {
    char *text;
    int position;
    char old_char;
} TextEditData;

void insert_char(void *data) {
    TextEditData *edit = (TextEditData*)data;
    // Simulate inserting character
    printf("Inserted '%c' at position %d\\n", edit->text[0], edit->position);
}

void delete_char(void *data) {
    TextEditData *edit = (TextEditData*)data;
    // Simulate deleting character
    printf("Deleted character at position %d\\n", edit->position);
}

void undo_insert(void *data) {
    TextEditData *edit = (TextEditData*)data;
    printf("Undid insert operation\\n");
}

void undo_delete(void *data) {
    TextEditData *edit = (TextEditData*)data;
    printf("Undid delete operation\\n");
}

int main(void) {
    // Create commands
    TextEditData edit_data = {"A", 5, 'X'};

    Command insert_cmd = {
        .execute = insert_char,
        .undo = undo_insert,
        .data = &edit_data
    };

    Command delete_cmd = {
        .execute = delete_char,
        .undo = undo_delete,
        .data = &edit_data
    };

    // Execute commands
    printf("Executing commands:\\n");
    insert_cmd.execute(insert_cmd.data);
    delete_cmd.execute(delete_cmd.data);

    printf("\\nUndoing commands:\\n");
    delete_cmd.undo(delete_cmd.data);
    insert_cmd.undo(insert_cmd.data);

    return 0;
}
\`\`\`

---

## ⚠️ Function Pointer Best Practices

### **Safety Guidelines**

1. **Validate function pointers** before calling
2. **Ensure correct signatures** when assigning
3. **Document callback expectations** clearly
4. **Avoid function pointer cycles** that could cause infinite loops
5. **Consider thread safety** in multi-threaded programs

### **Common Mistakes**

\`\`\`c
// ❌ Wrong: Missing parentheses in declaration
int *func_ptr(int, int);  // This is a function returning int*

// ✅ Correct: Proper parentheses
int (*func_ptr)(int, int);

// ❌ Wrong: Incompatible signatures
void (*ptr)(int) = NULL;
ptr = (void (*)(int))some_function;  // Dangerous cast

// ✅ Better: Use proper types
typedef void (*CallbackFunc)(int);
CallbackFunc ptr = some_function;
\`\`\`

---

## 🎓 Key Takeaways

1. **Functions can return pointers** to dynamically allocated memory
2. **Function pointers** store addresses of functions
3. **Function pointers enable callbacks** and generic programming
4. **Pass functions as arguments** using function pointers
5. **Arrays of function pointers** create jump tables
6. **Pointers as parameters** allow modification of caller data
7. **Typedefs simplify** complex function pointer declarations
8. **Function pointers enable** design patterns like command and observer

Function pointers unlock advanced C programming patterns - they enable flexible, modular code design! 🎯✨`;
    return contentString;
  })()
};
