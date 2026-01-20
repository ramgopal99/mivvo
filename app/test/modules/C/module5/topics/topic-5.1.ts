import { SubLesson } from '../../../../data/lessonsData';

export const topic_5_1: SubLesson = {
  id: "5.1",
  title: 'Introduction to Pointers',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 📍 Introduction to Pointers in C

Pointers are one of the most powerful and important features in C programming. They allow direct memory access and manipulation, making C both powerful and potentially dangerous. Understanding pointers is crucial for effective C programming.

---

## 📋 What is a Pointer?

**A pointer is a variable that stores the memory address of another variable.** Instead of storing a value directly, a pointer stores the location where that value is stored in memory.

### **Why Pointers Matter**

- **Direct memory access** - Read/write to specific memory locations
- **Efficient parameter passing** - Pass large data structures by reference
- **Dynamic memory management** - Allocate/deallocate memory at runtime
- **Data structures** - Build linked lists, trees, graphs, etc.
- **System programming** - Interface with hardware and operating systems

---

## 📝 Declaring Pointers

### **Pointer Declaration Syntax**

\`\`\`c
data_type *pointer_name;
\`\`\`

**Components:**
- \`data_type\`: Type of data the pointer points to (int, float, char, etc.)
- \`*\`: Asterisk indicates this is a pointer
- \`pointer_name\`: Name of the pointer variable

### **Examples**

\`\`\`c
#include <stdio.h>

int main(void) {
    // Declare pointers
    int *int_ptr;      // Pointer to integer
    float *float_ptr;  // Pointer to float
    char *char_ptr;    // Pointer to character
    double *double_ptr; // Pointer to double

    printf("Pointers declared successfully!\\n");

    return 0;
}
\`\`\`

---

## 🔗 Address-of Operator (&)

### **Getting Memory Addresses**

The \`&\` operator returns the memory address of a variable:

\`\`\`c
#include <stdio.h>

int main(void) {
    int number = 42;
    float price = 19.99f;
    char letter = 'A';

    printf("Value of number: %d\\n", number);
    printf("Address of number: %p\\n", (void*)&number);

    printf("Value of price: %.2f\\n", price);
    printf("Address of price: %p\\n", (void*)&price);

    printf("Value of letter: %c\\n", letter);
    printf("Address of letter: %p\\n", (void*)&letter);

    return 0;
}
\`\`\`

**Sample Output:**
\`\`\`
Value of number: 42
Address of number: 0x7ffc5c8a8a4c
Value of price: 19.99
Address of price: 0x7ffc5c8a8a50
Value of letter: A
Address of letter: 0x7ffc5c8a8a53
\`\`\`

---

## 🎯 Dereference Operator (*)

### **Accessing Values Through Pointers**

The \`*\` operator (when used with a pointer) accesses the value at the memory address stored in the pointer:

\`\`\`c
#include <stdio.h>

int main(void) {
    int number = 42;
    int *ptr = &number;  // ptr now stores address of number

    printf("Value of number: %d\\n", number);
    printf("Address stored in ptr: %p\\n", (void*)ptr);
    printf("Value pointed to by ptr: %d\\n", *ptr);

    // Modify value through pointer
    *ptr = 100;
    printf("After modification:\\n");
    printf("Value of number: %d\\n", number);
    printf("Value pointed to by ptr: %d\\n", *ptr);

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Value of number: 42
Address stored in ptr: 0x7ffc5c8a8a4c
Value pointed to by ptr: 42
After modification:
Value of number: 100
Value pointed to by ptr: 100
\`\`\`

---

## 🔄 Pointer Assignment

### **Assigning Addresses to Pointers**

\`\`\`c
#include <stdio.h>

int main(void) {
    int a = 10, b = 20;
    int *ptr1, *ptr2;

    // Assign addresses
    ptr1 = &a;
    ptr2 = &b;

    printf("a = %d, b = %d\\n", a, b);
    printf("*ptr1 = %d, *ptr2 = %d\\n", *ptr1, *ptr2);

    // Make both pointers point to the same variable
    ptr2 = ptr1;  // ptr2 now points to a

    *ptr2 = 99;   // This modifies a
    printf("After *ptr2 = 99:\\n");
    printf("a = %d, b = %d\\n", a, b);
    printf("*ptr1 = %d, *ptr2 = %d\\n", *ptr1, *ptr2);

    return 0;
}
\`\`\`

---

## 🚫 NULL Pointers

### **Pointer Safety**

\`\`\`c
#include <stdio.h>

int main(void) {
    int *ptr = NULL;  // NULL pointer (points to nothing)

    printf("ptr value: %p\\n", (void*)ptr);

    // Always check for NULL before dereferencing
    if (ptr != NULL) {
        printf("Value: %d\\n", *ptr);
    } else {
        printf("Pointer is NULL - safe to ignore\\n");
    }

    // NULL is defined in stdio.h, stdlib.h, etc.
    // It's good practice to set unused pointers to NULL

    return 0;
}
\`\`\`

---

## 📊 Pointer Types and Sizes

### **Pointer Characteristics**

\`\`\`c
#include <stdio.h>

int main(void) {
    int num = 42;
    float price = 3.14f;
    char letter = 'A';

    int *int_ptr = &num;
    float *float_ptr = &price;
    char *char_ptr = &letter;

    printf("Sizes:\\n");
    printf("int: %zu bytes\\n", sizeof(int));
    printf("float: %zu bytes\\n", sizeof(float));
    printf("char: %zu bytes\\n", sizeof(char));
    printf("int*: %zu bytes\\n", sizeof(int_ptr));
    printf("float*: %zu bytes\\n", sizeof(float_ptr));
    printf("char*: %zu bytes\\n", sizeof(char_ptr));

    printf("\\nValues:\\n");
    printf("*int_ptr: %d\\n", *int_ptr);
    printf("*float_ptr: %.2f\\n", *float_ptr);
    printf("*char_ptr: %c\\n", *char_ptr);

    return 0;
}
\`\`\`

**Important:** All pointers (regardless of type) are the same size on a given system!

---

## 🎯 Common Pointer Patterns

### **Pattern 1: Swapping Values**

\`\`\`c
#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int x = 10, y = 20;

    printf("Before swap: x = %d, y = %d\\n", x, y);
    swap(&x, &y);
    printf("After swap: x = %d, y = %d\\n", x, y);

    return 0;
}
\`\`\`

### **Pattern 2: Modifying Variables**

\`\`\`c
#include <stdio.h>

void double_value(int *ptr) {
    *ptr = *ptr * 2;
}

int main(void) {
    int number = 5;
    printf("Original: %d\\n", number);

    double_value(&number);
    printf("Doubled: %d\\n", number);

    return 0;
}
\`\`\`

---

## ⚠️ Pointer Pitfalls

### **Uninitialized Pointers**

\`\`\`c
// ❌ DANGEROUS: Uninitialized pointer
int *ptr;        // Points to random memory location
// *ptr = 42;    // CRASH: Writing to unknown location!
\`\`\`

### **Dangling Pointers**

\`\`\`c
// ❌ DANGEROUS: Dangling pointer
int *ptr;
{
    int local_var = 42;
    ptr = &local_var;
} // local_var goes out of scope here
// *ptr = 99;  // CRASH: local_var no longer exists!
\`\`\`

### **Type Mismatches**

\`\`\`c
// ❌ Wrong: Type mismatch
int num = 42;
float *ptr = &num;  // Wrong: int* assigned to float*
// *ptr = 3.14f;     // Undefined behavior!
\`\`\`

---

## 🎓 Key Takeaways

1. **Pointers store memory addresses** using the \`&\` operator
2. **Dereference with \`*\`** to access values at those addresses
3. **Declare pointers** with \`type *name\` syntax
4. **NULL pointers** are safe and indicate "no valid address"
5. **All pointers are the same size** regardless of data type
6. **Always initialize pointers** before use
7. **Check for NULL** before dereferencing
8. **Pointers enable efficient data manipulation** but require careful handling

Pointers are the key to C's power - master them to unlock advanced programming techniques! 🚀✨`;
    return contentString;
  })()
};
