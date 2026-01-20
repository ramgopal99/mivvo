import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_4: SubLesson = {
  id: "4.4",
  title: 'Multidimensional Arrays',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 📐 Multidimensional Arrays in C

Multidimensional arrays are arrays of arrays. They allow you to represent complex data structures like matrices, tables, and grids. The most common type is the 2D array (matrix).

---

## 📋 What are Multidimensional Arrays?

**Multidimensional arrays store data in a tabular form with rows and columns.** Key concepts:

- **2D Arrays**: Tables with rows and columns
- **3D Arrays**: Cubes or collections of 2D arrays
- **Memory Layout**: Stored in row-major order (contiguous memory)
- **Access**: Multiple indices (\`arr[row][col]\`)

---

## 📊 2D Arrays (Matrices)

### **Declaration**

\`\`\`c
#include <stdio.h>

int main(void) {
    // Declare a 2D array with 3 rows and 4 columns
    int matrix[3][4];

    // Declare and initialize a 2x3 matrix
    int table[2][3] = {
        {1, 2, 3},    // Row 0
        {4, 5, 6}     // Row 1
    };

    printf("2D arrays declared successfully!\\n");

    return 0;
}
\`\`\`

### **Declaration Syntax**

\`\`\`c
data_type array_name[rows][columns];
\`\`\`

**Components:**
- \`rows\`: Number of rows
- \`columns\`: Number of columns per row

---

## 🔧 2D Array Initialization

### **Method 1: Complete Initialization**

\`\`\`c
#include <stdio.h>

int main(void) {
    // 3x3 matrix
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    // 2x4 matrix
    float grades[2][4] = {
        {85.5, 92.0, 78.5, 88.0},  // Student 1 grades
        {91.0, 87.5, 93.0, 89.5}   // Student 2 grades
    };

    printf("Matrices initialized!\\n");

    return 0;
}
\`\`\`

### **Method 2: Partial Initialization**

\`\`\`c
#include <stdio.h>

int main(void) {
    // Remaining elements initialized to 0
    int arr[2][3] = {
        {1, 2},      // Row 0: {1, 2, 0}
        {3}          // Row 1: {3, 0, 0}
    };

    // Initialize all to 0
    int zeros[3][3] = {0};

    printf("Partial initialization complete!\\n");

    return 0;
}
\`\`\`

---

## 🔍 Accessing 2D Array Elements

### **Element Access**

\`\`\`c
#include <stdio.h>

int main(void) {
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    // Access individual elements
    printf("Element at [0][0]: %d\\n", matrix[0][0]);  // 1
    printf("Element at [1][2]: %d\\n", matrix[1][2]);  // 6
    printf("Element at [2][1]: %d\\n", matrix[2][1]);  // 8

    // Modify elements
    matrix[0][2] = 10;
    printf("Modified [0][2] to: %d\\n", matrix[0][2]);

    return 0;
}
\`\`\`

---

## 🔄 Iterating Through 2D Arrays

### **Nested Loops**

\`\`\`c
#include <stdio.h>

int main(void) {
    int matrix[3][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };

    printf("Matrix contents:\\n");
    for (int i = 0; i < 3; i++) {        // Rows
        for (int j = 0; j < 4; j++) {    // Columns
            printf("%3d ", matrix[i][j]);
        }
        printf("\\n");
    }

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Matrix contents:
  1   2   3   4
  5   6   7   8
  9  10  11  12
\`\`\`

---

## 🔢 Matrix Operations

### **Matrix Addition**

\`\`\`c
#include <stdio.h>

#define ROWS 3
#define COLS 3

int main(void) {
    int matrix1[ROWS][COLS] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    int matrix2[ROWS][COLS] = {
        {9, 8, 7},
        {6, 5, 4},
        {3, 2, 1}
    };

    int result[ROWS][COLS];

    // Add matrices
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            result[i][j] = matrix1[i][j] + matrix2[i][j];
        }
    }

    printf("Matrix Addition Result:\\n");
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            printf("%3d ", result[i][j]);
        }
        printf("\\n");
    }

    return 0;
}
\`\`\`

### **Matrix Transpose**

\`\`\`c
#include <stdio.h>

#define ROWS 3
#define COLS 2

int main(void) {
    int matrix[ROWS][COLS] = {
        {1, 2},
        {3, 4},
        {5, 6}
    };

    int transpose[COLS][ROWS];

    // Transpose the matrix
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            transpose[j][i] = matrix[i][j];
        }
    }

    printf("Original Matrix (%dx%d):\\n", ROWS, COLS);
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            printf("%3d ", matrix[i][j]);
        }
        printf("\\n");
    }

    printf("\\nTransposed Matrix (%dx%d):\\n", COLS, ROWS);
    for (int i = 0; i < COLS; i++) {
        for (int j = 0; j < ROWS; j++) {
            printf("%3d ", transpose[i][j]);
        }
        printf("\\n");
    }

    return 0;
}
\`\`\`

---

## 📐 3D Arrays

### **Declaration and Usage**

\`\`\`c
#include <stdio.h>

int main(void) {
    // 3D array: 2 layers, 3 rows, 4 columns
    int cube[2][3][4];

    // Initialize a 3D array
    int data[2][2][3] = {
        {   // Layer 0
            {1, 2, 3},    // Row 0
            {4, 5, 6}     // Row 1
        },
        {   // Layer 1
            {7, 8, 9},    // Row 0
            {10, 11, 12}  // Row 1
        }
    };

    printf("3D Array Access:\\n");
    printf("data[0][0][0] = %d\\n", data[0][0][0]);  // 1
    printf("data[1][1][2] = %d\\n", data[1][1][2]);  // 12

    return 0;
}
\`\`\`

---

## 🎯 Practical Examples

### **Example 1: Student Grade Book**

\`\`\`c
#include <stdio.h>

#define STUDENTS 3
#define SUBJECTS 4

int main(void) {
    // Rows: students, Columns: subjects
    int grades[STUDENTS][SUBJECTS] = {
        {85, 92, 78, 88},  // Student 0
        {91, 87, 93, 89},  // Student 1
        {76, 82, 79, 84}   // Student 2
    };

    char *subjects[] = {"Math", "Science", "English", "History"};

    printf("Student Grade Book\\n");
    printf("==================\\n\\n");

    // Print header
    printf("%-8s ", "Student");
    for (int j = 0; j < SUBJECTS; j++) {
        printf("%-8s ", subjects[j]);
    }
    printf("Average\\n");

    // Print data
    for (int i = 0; i < STUDENTS; i++) {
        printf("%-8d ", i + 1);

        int sum = 0;
        for (int j = 0; j < SUBJECTS; j++) {
            printf("%-8d ", grades[i][j]);
            sum += grades[i][j];
        }

        float average = (float)sum / SUBJECTS;
        printf("%.1f\\n", average);
    }

    return 0;
}
\`\`\`

### **Example 2: Tic-Tac-Toe Board**

\`\`\`c
#include <stdio.h>

#define BOARD_SIZE 3

void print_board(char board[BOARD_SIZE][BOARD_SIZE]) {
    printf("\\n");
    for (int i = 0; i < BOARD_SIZE; i++) {
        for (int j = 0; j < BOARD_SIZE; j++) {
            printf(" %c ", board[i][j]);
            if (j < BOARD_SIZE - 1) printf("|");
        }
        printf("\\n");
        if (i < BOARD_SIZE - 1) {
            printf("-----------\\n");
        }
    }
    printf("\\n");
}

int main(void) {
    char board[BOARD_SIZE][BOARD_SIZE] = {
        {'X', 'O', 'X'},
        {'O', 'X', ' '},
        {' ', 'O', 'X'}
    };

    printf("Tic-Tac-Toe Board:");
    print_board(board);

    // Make a move
    board[1][2] = 'O';
    board[2][0] = 'X';

    printf("After moves:");
    print_board(board);

    return 0;
}
\`\`\`

### **Example 3: Image Processing (Simplified)**

\`\`\`c
#include <stdio.h>

#define HEIGHT 5
#define WIDTH 5

void apply_blur(int image[HEIGHT][WIDTH]) {
    int blurred[HEIGHT][WIDTH];

    for (int i = 0; i < HEIGHT; i++) {
        for (int j = 0; j < WIDTH; j++) {
            int sum = 0;
            int count = 0;

            // Average with neighboring pixels
            for (int di = -1; di <= 1; di++) {
                for (int dj = -1; dj <= 1; dj++) {
                    int ni = i + di;
                    int nj = j + dj;

                    if (ni >= 0 && ni < HEIGHT && nj >= 0 && nj < WIDTH) {
                        sum += image[ni][nj];
                        count++;
                    }
                }
            }

            blurred[i][j] = sum / count;
        }
    }

    // Copy back
    for (int i = 0; i < HEIGHT; i++) {
        for (int j = 0; j < WIDTH; j++) {
            image[i][j] = blurred[i][j];
        }
    }
}

int main(void) {
    int image[HEIGHT][WIDTH] = {
        {100, 105, 110, 105, 100},
        {105, 110, 115, 110, 105},
        {110, 115, 120, 115, 110},
        {105, 110, 115, 110, 105},
        {100, 105, 110, 105, 100}
    };

    printf("Original Image:\\n");
    for (int i = 0; i < HEIGHT; i++) {
        for (int j = 0; j < WIDTH; j++) {
            printf("%3d ", image[i][j]);
        }
        printf("\\n");
    }

    apply_blur(image);

    printf("\\nBlurred Image:\\n");
    for (int i = 0; i < HEIGHT; i++) {
        for (int j = 0; j < WIDTH; j++) {
            printf("%3d ", image[i][j]);
        }
        printf("\\n");
    }

    return 0;
}
\`\`\`

---

## 🔍 Array Size and Memory

### **Getting Dimensions**

\`\`\`c
#include <stdio.h>

#define ROWS 3
#define COLS 4

int main(void) {
    int matrix[ROWS][COLS] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };

    // Calculate dimensions
    int rows = sizeof(matrix) / sizeof(matrix[0]);
    int cols = sizeof(matrix[0]) / sizeof(matrix[0][0]);

    printf("Matrix dimensions: %dx%d\\n", rows, cols);
    printf("Total elements: %d\\n", rows * cols);
    printf("Memory used: %d bytes\\n", sizeof(matrix));

    return 0;
}
\`\`\`

### **Memory Layout**

\`\`\`c
#include <stdio.h>

int main(void) {
    int arr[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };

    printf("Memory addresses:\\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            printf("arr[%d][%d] = %p\\n", i, j, (void*)&arr[i][j]);
        }
    }

    return 0;
}
\`\`\`

---

## ⚠️ Common 2D Array Mistakes

### **Incorrect Declaration**

\`\`\`c
// ❌ Wrong: missing brackets
int matrix[3, 4];  // Error!

// ✅ Correct: separate brackets
int matrix[3][4];
\`\`\`

### **Wrong Loop Bounds**

\`\`\`c
int matrix[3][4];

// ❌ Wrong bounds
for (int i = 0; i <= 3; i++) {     // i goes to 3 (invalid!)
    for (int j = 0; j <= 4; j++) { // j goes to 4 (invalid!)
        // ...
    }
}

// ✅ Correct bounds
for (int i = 0; i < 3; i++) {      // i: 0 to 2
    for (int j = 0; j < 4; j++) {  // j: 0 to 3
        // ...
    }
}
\`\`\`

### **Partial Initialization Confusion**

\`\`\`c
// Careful with partial initialization
int arr[2][3] = {
    {1, 2},      // Row 0: {1, 2, 0}
    {3}          // Row 1: {3, 0, 0}
};

// This is different:
int arr2[2][3] = {1, 2, 3, 4, 5, 6};  // Fills row-major order
\`\`\`

---

## 🎯 Advanced Patterns

### **Jagged Arrays (Simulated)**

\`\`\`c
#include <stdio.h>

int main(void) {
    // Simulate jagged array using array of pointers
    int row0[] = {1, 2, 3};
    int row1[] = {4, 5};
    int row2[] = {6, 7, 8, 9};

    int *jagged[] = {row0, row1, row2};
    int row_lengths[] = {3, 2, 4};

    printf("Jagged Array:\\n");
    for (int i = 0; i < 3; i++) {
        printf("Row %d: ", i);
        for (int j = 0; j < row_lengths[i]; j++) {
            printf("%d ", jagged[i][j]);
        }
        printf("\\n");
    }

    return 0;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **2D Arrays** use syntax \`type name[rows][cols]\`
2. **Initialization** uses nested braces \`{{1,2},{3,4}}\`
3. **Access** uses \`array[row][col]\` (0-based indexing)
4. **Iteration** requires nested loops
5. **Memory** is stored in row-major order
6. **3D Arrays** extend the concept: \`type name[x][y][z]\`
7. **Bounds checking** is your responsibility
8. **Operations** work element-by-element

Master multidimensional arrays to handle complex data structures! 📐✨`;
    return contentString;
  })()
};
