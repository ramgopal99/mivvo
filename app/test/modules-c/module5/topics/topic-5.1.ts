import { SubLesson } from '../../../data/lessonsData';

export const topic_5_1: SubLesson = {
  id: 5.1,
  title: 'Introduction to Arrays',
  status: 'completed',
  content: `# 📊 Introduction to Arrays

Learn why arrays are essential for handling collections of data in C and understand their fundamental concepts.

---

## 🎯 Why Arrays Matter

### The Problem Without Arrays

Imagine you need to store and process grades for 100 students:

\`\`\`c
#include <stdio.h>

int main() {
    // Without arrays - 100 separate variables!
    int grade1, grade2, grade3, /* ... 97 more variables ... */;

    // Input each grade individually
    printf("Enter grade 1: ");
    scanf("%d", &grade1);
    printf("Enter grade 2: ");
    scanf("%d", &grade2);
    printf("Enter grade 3: ");
    scanf("%d", &grade3);
    // ... 97 more scanf calls!

    // Calculate average - repetitive code
    int sum = grade1 + grade2 + grade3; // + 97 more additions
    float average = (float)sum / 100;

    // Display results - repetitive code
    printf("Grade 1: %d\\n", grade1);
    printf("Grade 2: %d\\n", grade2);
    printf("Grade 3: %d\\n", grade3);
    // ... 97 more printf calls!

    return 0;
}
\`\`\`

**Problems:**
- ❌ Code repetition (DRY principle violation)
- ❌ Hard to maintain (changes in 100 places)
- ❌ Error-prone (inconsistent variable names)
- ❌ Scalability issues (what if we need 1000 students?)
- ❌ No easy way to perform operations on all data

---

## ✅ The Solution: Arrays

### With Arrays

\`\`\`c
#include <stdio.h>

#define NUM_STUDENTS 100

int main() {
    int grades[NUM_STUDENTS];  // One variable holds all grades!
    int sum = 0;

    // Input all grades with a loop
    for (int i = 0; i < NUM_STUDENTS; i++) {
        printf("Enter grade for student %d: ", i + 1);
        scanf("%d", &grades[i]);
        sum += grades[i];
    }

    // Calculate average
    float average = (float)sum / NUM_STUDENTS;
    printf("Class average: %.2f\\n", average);

    // Display all grades with a loop
    printf("\\nAll grades:\\n");
    for (int i = 0; i < NUM_STUDENTS; i++) {
        printf("Student %d: %d\\n", i + 1, grades[i]);
    }

    return 0;
}
\`\`\`

**Benefits:**
- ✅ **Organized storage**: One variable holds multiple values
- ✅ **Easy processing**: Loops can operate on all elements
- ✅ **Maintainable**: Changes affect all elements consistently
- ✅ **Scalable**: Easy to change array size
- ✅ **Readable**: Clear intent and structure

---

## 🏗️ What is an Array?

### Definition
**An array is a collection of elements of the same data type stored in contiguous memory locations.**

### Key Characteristics

#### 1. **Homogeneous Elements**
All elements must be the same data type.

\`\`\`c
// ✅ Valid: all integers
int numbers[5] = {1, 2, 3, 4, 5};

// ❌ Invalid: mixed types not allowed
// int mixed[3] = {1, 3.14, 'A'};  // Compilation error
\`\`\`

#### 2. **Fixed Size**
Array size must be known at compile time (in standard C).

\`\`\`c
#define SIZE 10

int fixed_size[SIZE];        // ✅ Constant size
int also_fixed[5];           // ✅ Literal constant

// int variable_size[n];     // ❌ Variable size (C99 allows this)
\`\`\`

#### 3. **Contiguous Memory**
Elements are stored in consecutive memory locations.

\`\`\`c
#include <stdio.h>

int main() {
    int arr[3] = {10, 20, 30};

    printf("Address of arr[0]: %p\\n", &arr[0]);
    printf("Address of arr[1]: %p\\n", &arr[1]);
    printf("Address of arr[2]: %p\\n", &arr[2]);

    // Each int is typically 4 bytes, so addresses differ by 4
    return 0;
}
\`\`\`

#### 4. **Zero-Based Indexing**
First element is at index 0, last element at index size-1.

\`\`\`c
int scores[5] = {85, 92, 78, 96, 88};

// Index:    0   1   2   3   4
// Values:  85, 92, 78, 96, 88

printf("First score: %d\\n", scores[0]);      // 85
printf("Last score: %d\\n", scores[4]);       // 88
printf("Third score: %d\\n", scores[2]);      // 78
\`\`\`

---

## 📋 Array Declaration and Initialization

### Declaration Syntax

\`\`\`c
data_type array_name[array_size];
\`\`\`

### Examples

\`\`\`c
// Integer arrays
int numbers[10];           // Array of 10 integers
int scores[100];           // Array of 100 integers

// Other data types
float prices[50];          // Array of 50 floats
char letters[26];          // Array of 26 characters
double measurements[20];   // Array of 20 doubles
\`\`\`

### Initialization Methods

#### 1. **Complete Initialization**

\`\`\`c
// Initialize all elements
int arr1[5] = {1, 2, 3, 4, 5};
int arr2[] = {10, 20, 30};        // Size inferred from initializer
\`\`\`

#### 2. **Partial Initialization**

\`\`\`c
// Unspecified elements initialized to 0
int arr[5] = {1, 2};              // arr = {1, 2, 0, 0, 0}
int arr2[3] = {0};                // arr2 = {0, 0, 0}
\`\`\`

#### 3. **No Initialization**

\`\`\`c
int arr[5];                       // Contains garbage values
\`\`\`

#### 4. **String Initialization** (Special Case)

\`\`\`c
char greeting[6] = {'H', 'e', 'l', 'l', 'o'};  // No null terminator
char greeting2[] = "Hello";                     // Includes null terminator
\`\`\`

---

## 🔍 Accessing Array Elements

### Using Index Notation

\`\`\`c
int numbers[5] = {10, 20, 30, 40, 50};

// Access individual elements
printf("First: %d\\n", numbers[0]);     // 10
printf("Third: %d\\n", numbers[2]);     // 30

// Modify elements
numbers[1] = 25;                        // Change 20 to 25
numbers[4] = numbers[0] + numbers[2];   // 10 + 30 = 40
\`\`\`

### Array Size and Bounds

\`\`\`c
#include <stdio.h>

int main() {
    int arr[5] = {1, 2, 3, 4, 5};

    // Valid indices: 0 to 4
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d\\n", i, arr[i]);
    }

    // arr[5] would be out of bounds - undefined behavior!
    // arr[-1] would also be out of bounds!

    return 0;
}
\`\`\`

---

## 🧪 Basic Array Operations

### Traversing Arrays

\`\`\`c
#include <stdio.h>

int main() {
    int numbers[5] = {10, 20, 30, 40, 50};
    int sum = 0;

    // Forward traversal
    printf("Array elements:\\n");
    for (int i = 0; i < 5; i++) {
        printf("%d ", numbers[i]);
        sum += numbers[i];
    }

    printf("\\nSum: %d\\n", sum);
    printf("Average: %.2f\\n", (float)sum / 5);

    return 0;
}
\`\`\`

### Finding Elements

\`\`\`c
#include <stdio.h>

int main() {
    int numbers[] = {12, 45, 23, 67, 89, 34};
    int search_value = 67;
    int found = 0;

    // Linear search
    for (int i = 0; i < 6; i++) {
        if (numbers[i] == search_value) {
            printf("Found %d at index %d\\n", search_value, i);
            found = 1;
            break;
        }
    }

    if (!found) {
        printf("%d not found in array\\n", search_value);
    }

    return 0;
}
\`\`\`

### Finding Maximum/Minimum

\`\`\`c
#include <stdio.h>

int main() {
    int scores[] = {85, 92, 78, 96, 88, 73, 95};
    int size = sizeof(scores) / sizeof(scores[0]);

    int max_score = scores[0];
    int min_score = scores[0];

    for (int i = 1; i < size; i++) {
        if (scores[i] > max_score) {
            max_score = scores[i];
        }
        if (scores[i] < min_score) {
            min_score = scores[i];
        }
    }

    printf("Maximum score: %d\\n", max_score);
    printf("Minimum score: %d\\n", min_score);

    return 0;
}
\`\`\`

---

## 🏷️ Array Naming Conventions

### Good Array Names

\`\`\`c
// Descriptive names
int student_grades[100];
float product_prices[50];
char customer_names[200][50];  // 2D array
int matrix[10][10];

// Clear size indication
#define MAX_STUDENTS 100
int student_ids[MAX_STUDENTS];

// Consistent naming
int source_array[10];
int destination_array[10];
int temp_array[10];
\`\`\`

### Poor Array Names

\`\`\`c
// ❌ Unclear purpose
int arr[10];
int x[5];
int data[100];

// ❌ Misleading names
int names[10];        // Should be name_list or similar
int single_value[1];  // Not really an array
\`\`\`

---

## 📊 Array Memory Layout

### Understanding Memory

\`\`\`c
#include <stdio.h>

int main() {
    int arr[3] = {10, 20, 30};

    printf("Array address: %p\\n", arr);
    printf("arr[0] address: %p, value: %d\\n", &arr[0], arr[0]);
    printf("arr[1] address: %p, value: %d\\n", &arr[1], arr[1]);
    printf("arr[2] address: %p, value: %d\\n", &arr[2], arr[2]);

    // Calculate memory differences
    printf("Size of int: %zu bytes\\n", sizeof(int));
    printf("Difference between &arr[1] and &arr[0]: %ld bytes\\n",
           (char*)&arr[1] - (char*)&arr[0]);

    return 0;
}
\`\`\`

---

## 🐛 Common Array Mistakes

### Array Bounds Violation

\`\`\`c
int arr[5] = {1, 2, 3, 4, 5};

// ❌ Out of bounds access
for (int i = 0; i <= 5; i++) {  // i goes to 5, which is invalid!
    printf("%d ", arr[i]);
}

// ✅ Correct bounds
for (int i = 0; i < 5; i++) {
    printf("%d ", arr[i]);
}
\`\`\`

### Uninitialized Arrays

\`\`\`c
int arr[5];  // Contains garbage values

// ❌ Using uninitialized values
int sum = 0;
for (int i = 0; i < 5; i++) {
    sum += arr[i];  // Sum includes garbage!
}

// ✅ Initialize or set values
int arr[5] = {0};  // All elements 0
// or
memset(arr, 0, sizeof(arr));  // Set all to 0
\`\`\`

### Wrong Size Calculation

\`\`\`c
int arr[10] = {1, 2, 3};

// ❌ Wrong way to get size
int wrong_size = sizeof(arr) / sizeof(int);  // Works here

// But if arr is passed to a function:
void process_array(int arr[]) {
    int size = sizeof(arr) / sizeof(int);  // ❌ Wrong! sizeof(arr) is pointer size
}
\`\`\`

---

## 🎯 Array Applications

### Data Storage
- Student grades, employee salaries
- Sensor readings, measurement data
- Game scores, leaderboard data

### Mathematical Operations
- Matrix operations, vector calculations
- Statistical analysis (mean, median, mode)
- Signal processing, image data

### Text Processing
- Character arrays (strings)
- Word processing, text analysis
- Buffer management

### Algorithm Implementation
- Sorting algorithms (bubble, quick, merge sort)
- Searching algorithms (linear, binary search)
- Data structures (stacks, queues)

---

## 🧪 Practical Example: Grade Analyzer

\`\`\`c
#include <stdio.h>

#define MAX_STUDENTS 50

int main() {
    int grades[MAX_STUDENTS];
    int num_students;
    int sum = 0, max_grade = 0, min_grade = 100;
    int pass_count = 0, distinction_count = 0;

    printf("Enter number of students (max %d): ", MAX_STUDENTS);
    scanf("%d", &num_students);

    if (num_students > MAX_STUDENTS || num_students <= 0) {
        printf("Invalid number of students!\\n");
        return 1;
    }

    // Input grades
    printf("Enter grades for %d students:\\n", num_students);
    for (int i = 0; i < num_students; i++) {
        printf("Student %d: ", i + 1);
        scanf("%d", &grades[i]);

        // Validate grade
        if (grades[i] < 0 || grades[i] > 100) {
            printf("Invalid grade! Must be 0-100.\\n");
            i--;  // Re-enter this grade
            continue;
        }

        // Update statistics
        sum += grades[i];
        if (grades[i] > max_grade) max_grade = grades[i];
        if (grades[i] < min_grade) min_grade = grades[i];
        if (grades[i] >= 60) pass_count++;
        if (grades[i] >= 85) distinction_count++;
    }

    // Display results
    printf("\\n=== Grade Analysis ===\\n");
    printf("Total students: %d\\n", num_students);
    printf("Average grade: %.2f\\n", (float)sum / num_students);
    printf("Highest grade: %d\\n", max_grade);
    printf("Lowest grade: %d\\n", min_grade);
    printf("Pass rate: %.1f%% (%d/%d)\\n",
           (float)pass_count / num_students * 100, pass_count, num_students);
    printf("Distinction rate: %.1f%% (%d/%d)\\n",
           (float)distinction_count / num_students * 100, distinction_count, num_students);

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Arrays** store multiple values of the same type in contiguous memory
2. **Zero-based indexing**: First element at index 0
3. **Fixed size**: Array size must be known at compile time
4. **Homogeneous**: All elements must be the same data type
5. **Bounds checking**: Always ensure indices are within valid range
6. **Initialization**: Uninitialized arrays contain garbage values
7. **Memory layout**: Elements stored consecutively in memory

---

## 🚀 Preview: One-Dimensional Arrays

In the next topic, you'll learn about:
- **Detailed 1D array operations** and manipulation
- **Array algorithms** (searching, sorting, etc.)
- **Array parameters** in functions
- **Common 1D array patterns** and techniques

**Arrays are the foundation of data structures - master them and you master data manipulation!** 🏗️
