import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_3: SubLesson = {
  id: "4.3",
  title: 'Arrays (Declaration, Initialization, Access)',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 📊 Arrays in C

Arrays are collections of elements of the same data type stored in contiguous memory locations. They allow you to store and manipulate multiple values efficiently using a single variable name.

---

## 📋 What is an Array?

**An array is a collection of items stored at contiguous memory locations.** Key characteristics:

- **Fixed size**: Size determined at declaration time
- **Same data type**: All elements must be the same type
- **Indexed access**: Elements accessed using indices (starting from 0)
- **Contiguous memory**: Elements stored sequentially in memory

---

## 📝 Array Declaration

### **Basic Array Declaration**

\`\`\`c
#include <stdio.h>

int main(void) {
    // Declare an array of 5 integers
    int numbers[5];

    // Declare an array of 10 floats
    float prices[10];

    // Declare an array of 20 characters
    char letters[20];

    printf("Arrays declared successfully!\\n");

    return 0;
}
\`\`\`

### **Array Declaration Syntax**

\`\`\`c
data_type array_name[array_size];
\`\`\`

**Components:**
- \`data_type\`: Type of elements (int, float, char, etc.)
- \`array_name\`: Identifier for the array
- \`array_size\`: Number of elements (must be constant)

---

## 🔧 Array Initialization

### **Method 1: Initialize with Values**

\`\`\`c
#include <stdio.h>

int main(void) {
    // Initialize with specific values
    int scores[5] = {85, 92, 78, 96, 88};

    // Initialize with fewer values (remaining elements = 0)
    int partial[5] = {1, 2, 3};  // partial[3] and partial[4] = 0

    // Initialize all elements to 0
    int zeros[5] = {0};

    printf("Arrays initialized!\\n");

    return 0;
}
\`\`\`

### **Method 2: Initialize with Size Omitted**

\`\`\`c
#include <stdio.h>

int main(void) {
    // Compiler determines size from initializer list
    int numbers[] = {10, 20, 30, 40, 50};  // Size = 5

    char vowels[] = {'a', 'e', 'i', 'o', 'u'};  // Size = 5

    float constants[] = {3.14f, 2.71f, 1.41f};  // Size = 3

    printf("Size determined automatically!\\n");

    return 0;
}
\`\`\`

---

## 🔍 Array Access

### **Accessing Array Elements**

\`\`\`c
#include <stdio.h>

int main(void) {
    int numbers[5] = {10, 20, 30, 40, 50};

    // Access individual elements using indices
    printf("First element: %d\\n", numbers[0]);   // 10
    printf("Third element: %d\\n", numbers[2]);   // 30
    printf("Last element: %d\\n", numbers[4]);    // 50

    // Modify elements
    numbers[1] = 25;  // Change second element
    printf("Modified second element: %d\\n", numbers[1]);

    return 0;
}
\`\`\`

**Output:**
\`\`\`
First element: 10
Third element: 30
Last element: 50
Modified second element: 25
\`\`\`

---

## 🔄 Iterating Through Arrays

### **Using for Loops**

\`\`\`c
#include <stdio.h>

int main(void) {
    int scores[5] = {85, 92, 78, 96, 88};
    int sum = 0;

    printf("Individual scores:\\n");
    for (int i = 0; i < 5; i++) {
        printf("Score %d: %d\\n", i + 1, scores[i]);
        sum += scores[i];
    }

    float average = (float)sum / 5;
    printf("\\nTotal: %d\\n", sum);
    printf("Average: %.2f\\n", average);

    return 0;
}
\`\`\`

### **Using while Loops**

\`\`\`c
#include <stdio.h>

int main(void) {
    char letters[6] = {'H', 'e', 'l', 'l', 'o', '\\0'};
    int i = 0;

    printf("Letters: ");
    while (letters[i] != '\\0') {
        printf("%c ", letters[i]);
        i++;
    }
    printf("\\n");

    return 0;
}
\`\`\`

---

## 📏 Array Size and Bounds

### **Array Bounds Checking**

\`\`\`c
#include <stdio.h>

int main(void) {
    int arr[5] = {1, 2, 3, 4, 5};

    // Valid indices: 0 to 4
    printf("Valid access: arr[0] = %d\\n", arr[0]);
    printf("Valid access: arr[4] = %d\\n", arr[4]);

    // ⚠️ Dangerous: Out of bounds access (undefined behavior!)
    // printf("Invalid: arr[5] = %d\\n", arr[5]);  // Beyond array size
    // printf("Invalid: arr[-1] = %d\\n", arr[-1]); // Negative index

    return 0;
}
\`\`\`

### **Getting Array Size**

\`\`\`c
#include <stdio.h>

int main(void) {
    int numbers[10] = {1, 2, 3, 4, 5};

    // Calculate size using sizeof
    int total_elements = sizeof(numbers) / sizeof(numbers[0]);
    int total_bytes = sizeof(numbers);

    printf("Array has %d elements\\n", total_elements);
    printf("Array occupies %d bytes\\n", total_bytes);
    printf("Each element is %d bytes\\n", sizeof(numbers[0]));

    return 0;
}
\`\`\`

---

## 🔄 Array Operations

### **Copying Arrays**

\`\`\`c
#include <stdio.h>

int main(void) {
    int source[5] = {1, 2, 3, 4, 5};
    int destination[5];

    // Manual copy using loop
    for (int i = 0; i < 5; i++) {
        destination[i] = source[i];
    }

    printf("Copied array: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", destination[i]);
    }
    printf("\\n");

    return 0;
}
\`\`\`

### **Finding Maximum/Minimum**

\`\`\`c
#include <stdio.h>

int main(void) {
    int numbers[7] = {23, 45, 12, 67, 89, 34, 56};
    int max = numbers[0];
    int min = numbers[0];

    for (int i = 1; i < 7; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
        if (numbers[i] < min) {
            min = numbers[i];
        }
    }

    printf("Maximum: %d\\n", max);
    printf("Minimum: %d\\n", min);

    return 0;
}
\`\`\`

---

## 🎯 Practical Examples

### **Example 1: Student Grade Processor**

\`\`\`c
#include <stdio.h>

int main(void) {
    float grades[5];
    float sum = 0.0f;

    printf("Enter 5 student grades:\\n");
    for (int i = 0; i < 5; i++) {
        printf("Grade %d: ", i + 1);
        scanf("%f", &grades[i]);
        sum += grades[i];
    }

    printf("\\nGrade Report:\\n");
    printf("Individual grades: ");
    for (int i = 0; i < 5; i++) {
        printf("%.1f ", grades[i]);
    }
    printf("\\n");

    printf("Average grade: %.2f\\n", sum / 5);

    // Count passing grades (>= 60)
    int passing_count = 0;
    for (int i = 0; i < 5; i++) {
        if (grades[i] >= 60) {
            passing_count++;
        }
    }
    printf("Students passing: %d out of 5\\n", passing_count);

    return 0;
}
\`\`\`

### **Example 2: Simple Search**

\`\`\`c
#include <stdio.h>

int main(void) {
    int numbers[10] = {12, 45, 23, 67, 89, 34, 56, 78, 90, 11};
    int search_value;
    int found = 0;

    printf("Array contents: ");
    for (int i = 0; i < 10; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\\n\\n");

    printf("Enter value to search for: ");
    scanf("%d", &search_value);

    for (int i = 0; i < 10; i++) {
        if (numbers[i] == search_value) {
            printf("Found %d at position %d\\n", search_value, i + 1);
            found = 1;
            break;  // Exit loop once found
        }
    }

    if (!found) {
        printf("%d not found in array\\n", search_value);
    }

    return 0;
}
\`\`\`

### **Example 3: Array Reversal**

\`\`\`c
#include <stdio.h>

int main(void) {
    int arr[8] = {1, 2, 3, 4, 5, 6, 7, 8};
    int temp;

    printf("Original array: ");
    for (int i = 0; i < 8; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    // Reverse the array
    for (int i = 0; i < 8 / 2; i++) {
        temp = arr[i];
        arr[i] = arr[7 - i];
        arr[7 - i] = temp;
    }

    printf("Reversed array: ");
    for (int i = 0; i < 8; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    return 0;
}
\`\`\`

### **Example 4: Character Array (String)**

\`\`\`c
#include <stdio.h>

int main(void) {
    char message[20] = "Hello, World!";

    printf("Message: %s\\n", message);
    printf("Length: %d characters\\n", strlen(message));

    // Access individual characters
    printf("First character: %c\\n", message[0]);
    printf("Last character: %c\\n", message[strlen(message) - 1]);

    // Modify characters
    message[7] = 'C';  // Change 'W' to 'C'
    printf("Modified: %s\\n", message);

    return 0;
}
\`\`\`

---

## ⚠️ Common Array Mistakes

### **Array Size Issues**

\`\`\`c
// ❌ Declaring array with variable size (not allowed in standard C)
int size;
scanf("%d", &size);
int arr[size];  // Error: Variable length arrays are optional

// ✅ Use constant size or dynamic allocation
#define SIZE 100
int arr[SIZE];
\`\`\`

### **Off-by-One Errors**

\`\`\`c
int arr[5] = {1, 2, 3, 4, 5};

// ❌ Accessing beyond bounds
for (int i = 0; i <= 5; i++) {  // i goes to 5 (invalid!)
    printf("%d ", arr[i]);
}

// ✅ Correct bounds
for (int i = 0; i < 5; i++) {  // i goes from 0 to 4
    printf("%d ", arr[i]);
}
\`\`\`

### **Uninitialized Arrays**

\`\`\`c
// ❌ Using uninitialized array (garbage values)
int arr[5];
printf("%d\\n", arr[0]);  // Undefined behavior!

// ✅ Initialize or set values before use
int arr[5] = {0};  // Initialize all to 0
// or
for (int i = 0; i < 5; i++) {
    arr[i] = 0;
}
\`\`\`

---

## 📊 Array Memory Layout

### **Contiguous Memory**

\`\`\`c
#include <stdio.h>

int main(void) {
    int arr[3] = {10, 20, 30};

    printf("Array address: %p\\n", (void*)&arr[0]);
    printf("Element 0: %p, value: %d\\n", (void*)&arr[0], arr[0]);
    printf("Element 1: %p, value: %d\\n", (void*)&arr[1], arr[1]);
    printf("Element 2: %p, value: %d\\n", (void*)&arr[2], arr[2]);

    // Calculate difference between adjacent elements
    printf("Address difference: %d bytes\\n",
           (int)&arr[1] - (int)&arr[0]);

    return 0;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Arrays** store multiple elements of the same type in contiguous memory
2. **Declaration**: \`type name[size]\`
3. **Initialization**: \`int arr[] = {1, 2, 3}\` or \`int arr[3] = {1, 2, 3}\`
4. **Access**: Use indices starting from 0 (\`arr[0]\`, \`arr[1]\`, etc.)
5. **Bounds**: Valid indices are 0 to size-1
6. **Size**: Use \`sizeof(array) / sizeof(array[0])\` to get element count
7. **Iteration**: Use loops to process all elements
8. **Memory**: Arrays are stored contiguously for efficient access

Master arrays to handle collections of data efficiently! 📊✨`;
    return contentString;
  })()
};
