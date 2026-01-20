import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_5: SubLesson = {
  id: "4.5",
  title: 'Array Operations and Functions',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🔧 Array Operations and Functions

Arrays become much more powerful when combined with functions. This lesson shows how to pass arrays to functions, return arrays from functions, and implement common array operations.

---

## 📥 Passing Arrays to Functions

### **Method 1: Array Parameter**

\`\`\`c
#include <stdio.h>

// Function that takes an array parameter
void print_array(int arr[], int size) {
    printf("Array elements: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main(void) {
    int numbers[5] = {1, 2, 3, 4, 5};
    print_array(numbers, 5);  // Pass array and size

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Array elements: 1 2 3 4 5
\`\`\`

### **Method 2: Pointer Parameter**

\`\`\`c
#include <stdio.h>

// Function using pointer notation
void print_array_ptr(int *arr, int size) {
    printf("Array elements: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", *(arr + i));  // Pointer arithmetic
    }
    printf("\\n");
}

int main(void) {
    int numbers[5] = {1, 2, 3, 4, 5};
    print_array_ptr(numbers, 5);

    return 0;
}
\`\`\`

---

## 🔍 Array Size in Functions

### **Size Parameter Required**

\`\`\`c
#include <stdio.h>

// ❌ sizeof doesn't work in functions (array decays to pointer)
void wrong_size_function(int arr[]) {
    // This gives size of pointer, not array!
    int size = sizeof(arr) / sizeof(arr[0]);
    printf("Size (wrong): %d\\n", size);
}

// ✅ Pass size as parameter
void correct_size_function(int arr[], int size) {
    printf("Size (correct): %d\\n", size);
    printf("Elements: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main(void) {
    int numbers[5] = {1, 2, 3, 4, 5};

    wrong_size_function(numbers);    // Wrong size
    correct_size_function(numbers, 5);  // Correct

    return 0;
}
\`\`\`

---

## 🔧 Common Array Operations

### **Find Maximum Value**

\`\`\`c
#include <stdio.h>

int find_max(int arr[], int size) {
    if (size <= 0) return 0;  // Error case

    int max = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

int main(void) {
    int numbers[7] = {23, 45, 12, 67, 89, 34, 56};
    int maximum = find_max(numbers, 7);
    printf("Maximum value: %d\\n", maximum);

    return 0;
}
\`\`\`

### **Calculate Sum and Average**

\`\`\`c
#include <stdio.h>

int calculate_sum(int arr[], int size) {
    int sum = 0;
    for (int i = 0; i < size; i++) {
        sum += arr[i];
    }
    return sum;
}

float calculate_average(int arr[], int size) {
    if (size <= 0) return 0.0f;
    return (float)calculate_sum(arr, size) / size;
}

int main(void) {
    float scores[5] = {85.5, 92.0, 78.5, 88.0, 91.5};
    float average = calculate_average(scores, 5);
    printf("Average score: %.2f\\n", average);

    return 0;
}
\`\`\`

### **Linear Search**

\`\`\`c
#include <stdio.h>

// Returns index if found, -1 if not found
int linear_search(int arr[], int size, int target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) {
            return i;  // Found at index i
        }
    }
    return -1;  // Not found
}

int main(void) {
    int numbers[8] = {12, 45, 23, 67, 89, 34, 56, 78};
    int target = 67;

    int index = linear_search(numbers, 8, target);
    if (index != -1) {
        printf("%d found at index %d\\n", target, index);
    } else {
        printf("%d not found\\n", target);
    }

    return 0;
}
\`\`\`

### **Array Reversal**

\`\`\`c
#include <stdio.h>

void reverse_array(int arr[], int size) {
    for (int i = 0; i < size / 2; i++) {
        int temp = arr[i];
        arr[i] = arr[size - 1 - i];
        arr[size - 1 - i] = temp;
    }
}

void print_array(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main(void) {
    int numbers[6] = {1, 2, 3, 4, 5, 6};

    printf("Original: ");
    print_array(numbers, 6);

    reverse_array(numbers, 6);

    printf("Reversed: ");
    print_array(numbers, 6);

    return 0;
}
\`\`\`

---

## 🔄 Array Manipulation Functions

### **Copy Array**

\`\`\`c
#include <stdio.h>

void copy_array(int source[], int destination[], int size) {
    for (int i = 0; i < size; i++) {
        destination[i] = source[i];
    }
}

int main(void) {
    int original[5] = {1, 2, 3, 4, 5};
    int copy[5];

    copy_array(original, copy, 5);

    printf("Original: ");
    for (int i = 0; i < 5; i++) printf("%d ", original[i]);
    printf("\\n");

    printf("Copy:     ");
    for (int i = 0; i < 5; i++) printf("%d ", copy[i]);
    printf("\\n");

    return 0;
}
\`\`\`

### **Bubble Sort**

\`\`\`c
#include <stdio.h>

void bubble_sort(int arr[], int size) {
    for (int i = 0; i < size - 1; i++) {
        for (int j = 0; j < size - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

void print_array(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main(void) {
    int numbers[8] = {64, 34, 25, 12, 22, 11, 90, 5};

    printf("Unsorted: ");
    print_array(numbers, 8);

    bubble_sort(numbers, 8);

    printf("Sorted:   ");
    print_array(numbers, 8);

    return 0;
}
\`\`\`

---

## 📊 2D Array Functions

### **2D Array Operations**

\`\`\`c
#include <stdio.h>

#define ROWS 3
#define COLS 4

void print_matrix(int matrix[ROWS][COLS]) {
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            printf("%3d ", matrix[i][j]);
        }
        printf("\\n");
    }
}

void add_matrices(int a[ROWS][COLS], int b[ROWS][COLS], int result[ROWS][COLS]) {
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            result[i][j] = a[i][j] + b[i][j];
        }
    }
}

int main(void) {
    int matrix1[ROWS][COLS] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };

    int matrix2[ROWS][COLS] = {
        {12, 11, 10, 9},
        {8, 7, 6, 5},
        {4, 3, 2, 1}
    };

    int sum[ROWS][COLS];

    add_matrices(matrix1, matrix2, sum);

    printf("Matrix 1:\\n");
    print_matrix(matrix1);
    printf("\\nMatrix 2:\\n");
    print_matrix(matrix2);
    printf("\\nSum:\\n");
    print_matrix(sum);

    return 0;
}
\`\`\`

---

## 🔧 Advanced Array Functions

### **Filter Array**

\`\`\`c
#include <stdio.h>

// Filter function that keeps only even numbers
int filter_even(int source[], int result[], int size) {
    int count = 0;
    for (int i = 0; i < size; i++) {
        if (source[i] % 2 == 0) {
            result[count++] = source[i];
        }
    }
    return count;  // Return new size
}

int main(void) {
    int numbers[10] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int even_numbers[10];
    int even_count;

    even_count = filter_even(numbers, even_numbers, 10);

    printf("Even numbers: ");
    for (int i = 0; i < even_count; i++) {
        printf("%d ", even_numbers[i]);
    }
    printf("\\n");

    return 0;
}
\`\`\`

### **Find Duplicates**

\`\`\`c
#include <stdio.h>

void find_duplicates(int arr[], int size) {
    printf("Duplicate elements: ");

    for (int i = 0; i < size; i++) {
        int count = 0;

        // Check if this element was already counted
        for (int k = 0; k < i; k++) {
            if (arr[k] == arr[i]) {
                count = 1;
                break;
            }
        }

        if (count == 1) continue;  // Skip if already counted

        // Count occurrences
        for (int j = i + 1; j < size; j++) {
            if (arr[i] == arr[j]) {
                printf("%d ", arr[i]);
                break;
            }
        }
    }
    printf("\\n");
}

int main(void) {
    int numbers[8] = {1, 2, 3, 2, 4, 3, 5, 6};
    find_duplicates(numbers, 8);

    return 0;
}
\`\`\`

---

## 🎯 Practical Examples

### **Example 1: Student Grade Analyzer**

\`\`\`c
#include <stdio.h>

#define MAX_STUDENTS 50

void input_grades(float grades[], int *count) {
    printf("Enter number of students: ");
    scanf("%d", count);

    if (*count > MAX_STUDENTS) {
        printf("Too many students! Limiting to %d\\n", MAX_STUDENTS);
        *count = MAX_STUDENTS;
    }

    printf("Enter grades:\\n");
    for (int i = 0; i < *count; i++) {
        printf("Student %d: ", i + 1);
        scanf("%f", &grades[i]);
    }
}

float calculate_average(float grades[], int count) {
    float sum = 0;
    for (int i = 0; i < count; i++) {
        sum += grades[i];
    }
    return sum / count;
}

void print_statistics(float grades[], int count) {
    float average = calculate_average(grades, count);
    int above_average = 0, below_average = 0;

    for (int i = 0; i < count; i++) {
        if (grades[i] > average) above_average++;
        else if (grades[i] < average) below_average++;
    }

    printf("\\nGrade Statistics:\\n");
    printf("Average: %.2f\\n", average);
    printf("Above average: %d\\n", above_average);
    printf("At average: %d\\n", count - above_average - below_average);
    printf("Below average: %d\\n", below_average);
}

int main(void) {
    float grades[MAX_STUDENTS];
    int count;

    input_grades(grades, &count);
    print_statistics(grades, count);

    return 0;
}
\`\`\`

### **Example 2: Simple Database**

\`\`\`c
#include <stdio.h>
#include <string.h>

#define MAX_RECORDS 100
#define NAME_LENGTH 50

typedef struct {
    int id;
    char name[NAME_LENGTH];
    int age;
} Person;

void add_person(Person people[], int *count, int id, char name[], int age) {
    if (*count >= MAX_RECORDS) {
        printf("Database full!\\n");
        return;
    }

    people[*count].id = id;
    strcpy(people[*count].name, name);
    people[*count].age = age;
    (*count)++;
}

void print_people(Person people[], int count) {
    printf("\\n%-5s %-20s %-5s\\n", "ID", "Name", "Age");
    printf("===================================\\n");

    for (int i = 0; i < count; i++) {
        printf("%-5d %-20s %-5d\\n",
               people[i].id, people[i].name, people[i].age);
    }
}

int find_person(Person people[], int count, int id) {
    for (int i = 0; i < count; i++) {
        if (people[i].id == id) {
            return i;
        }
    }
    return -1;
}

int main(void) {
    Person database[MAX_RECORDS];
    int record_count = 0;

    // Add some people
    add_person(database, &record_count, 1, "Alice", 25);
    add_person(database, &record_count, 2, "Bob", 30);
    add_person(database, &record_count, 3, "Charlie", 35);

    print_people(database, record_count);

    // Search for a person
    int search_id = 2;
    int index = find_person(database, record_count, search_id);
    if (index != -1) {
        printf("\\nFound: %s (Age: %d)\\n",
               database[index].name, database[index].age);
    }

    return 0;
}
\`\`\`

---

## ⚠️ Common Array Function Mistakes

### **Missing Size Parameter**

\`\`\`c
// ❌ Dangerous: no size parameter
void process_array(int arr[]) {
    for (int i = 0; i < 100; i++) {  // Assumes size 100!
        // ...
    }
}

// ✅ Safe: include size parameter
void process_array(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        // ...
    }
}
\`\`\`

### **Modifying Read-Only Arrays**

\`\`\`c
// ❌ Modifies the caller's array (usually okay)
// But if you don't want to modify, use const
void print_array(int arr[], int size) {
    arr[0] = 999;  // Modifies caller's array!
    // ...
}

// ✅ Clearly indicates no modification
void print_array(const int arr[], int size) {
    // arr[0] = 999;  // Compiler error!
    // ...
}
\`\`\`

### **Returning Local Arrays**

\`\`\`c
// ❌ Dangerous: returning local array
int* create_array(void) {
    int local_array[5] = {1, 2, 3, 4, 5};
    return local_array;  // Local array destroyed!
}

// ✅ Caller provides the array
void create_array(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        arr[i] = i + 1;
    }
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Arrays decay to pointers** when passed to functions
2. **Always pass array size** as a separate parameter
3. **Use const** for arrays you don't want to modify
4. **Return values** for results, modify arrays for multiple outputs
5. **Validate inputs** in array functions
6. **Document array parameters** clearly (size, modification)
7. **Consider performance** when designing array operations

Master array functions to build powerful, reusable code! 🔧✨`;
    return contentString;
  })()
};
