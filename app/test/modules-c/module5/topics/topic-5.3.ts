import { SubLesson } from '../../../data/lessonsData';

export const topic_5_3: SubLesson = {
  id: 5.3,
  title: 'Multi-Dimensional Arrays',
  status: 'completed',
  content: `# 📐 Multi-Dimensional Arrays

Master two-dimensional and higher-dimensional arrays in C for matrix operations, tables, and complex data structures.

---

## 🎯 Why Multi-Dimensional Arrays?

### Real-World Applications

#### Game Boards
\`\`\`c
// Chess board: 8x8 grid
char chess_board[8][8];

// Tic-tac-toe: 3x3 grid
char tic_tac_toe[3][3] = {
    {'X', 'O', 'X'},
    {'O', 'X', 'O'},
    {'X', ' ', 'O'}
};
\`\`\`

#### Image Processing
\`\`\`c
// Grayscale image: height x width
#define HEIGHT 480
#define WIDTH 640
unsigned char image[HEIGHT][WIDTH];  // Pixel values 0-255
\`\`\`

#### Mathematical Matrices
\`\`\`c
// Matrix operations
double matrix_a[3][3];
double matrix_b[3][3];
double result[3][3];
\`\`\`

#### Tables and Spreadsheets
\`\`\`c
// Student grades: students x subjects
#define NUM_STUDENTS 30
#define NUM_SUBJECTS 5
int grades_table[NUM_STUDENTS][NUM_SUBJECTS];
\`\`\`

---

## 🏗️ 2D Array Declaration and Initialization

### Declaration Syntax

\`\`\`c
// data_type array_name[rows][columns];
int matrix[3][4];           // 3 rows, 4 columns
float table[5][3];          // 5 rows, 3 columns
char board[8][8];           // 8x8 chess board
\`\`\`

### Initialization Methods

#### Complete Initialization

\`\`\`c
int matrix[2][3] = {
    {1, 2, 3},      // Row 0
    {4, 5, 6}       // Row 1
};

char tic_tac_toe[3][3] = {
    {'X', 'O', 'X'},
    {'O', 'X', ' '},
    {'X', ' ', 'O'}
};
\`\`\`

#### Partial Initialization

\`\`\`c
int matrix[3][3] = {
    {1, 2},         // Row 0: {1, 2, 0}
    {4}             // Row 1: {4, 0, 0}
    // Row 2: {0, 0, 0} (all zeros)
};
\`\`\`

#### Row-by-Row Initialization

\`\`\`c
int identity[3][3] = {
    {1, 0, 0},
    {0, 1, 0},
    {0, 0, 1}
};
\`\`\`

---

## 🔍 Accessing 2D Array Elements

### Index Notation

\`\`\`c
int matrix[3][3] = {
    {11, 12, 13},
    {21, 22, 23},
    {31, 32, 33}
};

// Access individual elements
printf("%d\\n", matrix[0][0]);  // 11 (row 0, column 0)
printf("%d\\n", matrix[1][2]);  // 23 (row 1, column 2)
printf("%d\\n", matrix[2][1]);  // 32 (row 2, column 1)

// Modify elements
matrix[0][1] = 99;             // Change 12 to 99
\`\`\`

### Row-Major vs Column-Major

\`\`\`c
#include <stdio.h>

int main() {
    int matrix[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };

    printf("Matrix addresses:\\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            printf("matrix[%d][%d] = %d at %p\\n",
                   i, j, matrix[i][j], &matrix[i][j]);
        }
    }

    return 0;
}
\`\`\`

**Output shows row-major order: elements in same row are contiguous in memory.**

---

## 🔄 2D Array Traversal

### Row-wise Traversal

\`\`\`c
void print_matrix(int matrix[][3], int rows) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\\n");
    }
}

int main() {
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    print_matrix(matrix, 3);
    return 0;
}
\`\`\`

### Column-wise Traversal

\`\`\`c
void print_columns_first(int matrix[][3], int rows) {
    for (int j = 0; j < 3; j++) {        // Columns first
        for (int i = 0; i < rows; i++) {  // Then rows
            printf("%d ", matrix[i][j]);
        }
        printf("\\n");
    }
}
\`\`\`

### Diagonal Traversal

\`\`\`c
void print_diagonal(int matrix[][3]) {
    printf("Main diagonal: ");
    for (int i = 0; i < 3; i++) {
        printf("%d ", matrix[i][i]);
    }
    printf("\\n");

    printf("Anti-diagonal: ");
    for (int i = 0; i < 3; i++) {
        printf("%d ", matrix[i][2-i]);
    }
    printf("\\n");
}
\`\`\`

---

## 🧮 Matrix Operations

### Matrix Addition

\`\`\`c
void add_matrices(int a[][3], int b[][3], int result[][3], int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            result[i][j] = a[i][j] + b[i][j];
        }
    }
}

int main() {
    int matrix1[2][3] = {{1, 2, 3}, {4, 5, 6}};
    int matrix2[2][3] = {{6, 5, 4}, {3, 2, 1}};
    int sum[2][3];

    add_matrices(matrix1, matrix2, sum, 2, 3);

    printf("Sum matrix:\\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", sum[i][j]);
        }
        printf("\\n");
    }

    return 0;
}
\`\`\`

### Matrix Multiplication

\`\`\`c
void multiply_matrices(int a[][3], int b[][2], int result[][2], int r1, int c1, int c2) {
    // Matrix a is r1 x c1, matrix b is c1 x c2, result is r1 x c2

    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c2; j++) {
            result[i][j] = 0;
            for (int k = 0; k < c1; k++) {
                result[i][j] += a[i][k] * b[k][j];
            }
        }
    }
}

int main() {
    int a[2][3] = {{1, 2, 3}, {4, 5, 6}};    // 2x3
    int b[3][2] = {{7, 8}, {9, 10}, {11, 12}}; // 3x2
    int result[2][2];                           // 2x2

    multiply_matrices(a, b, result, 2, 3, 2);

    printf("Product matrix:\\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            printf("%d ", result[i][j]);
        }
        printf("\\n");
    }

    return 0;
}
\`\`\`

### Matrix Transpose

\`\`\`c
void transpose_matrix(int matrix[][3], int result[][2], int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            result[j][i] = matrix[i][j];
        }
    }
}

int main() {
    int matrix[2][3] = {{1, 2, 3}, {4, 5, 6}};
    int transpose[3][2];

    transpose_matrix(matrix, transpose, 2, 3);

    printf("Original matrix:\\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\\n");
    }

    printf("\\nTransposed matrix:\\n");
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 2; j++) {
            printf("%d ", transpose[i][j]);
        }
        printf("\\n");
    }

    return 0;
}
\`\`\`

---

## 🎮 Game Board Applications

### Tic-Tac-Toe Game

\`\`\`c
#include <stdio.h>
#include <stdbool.h>

#define SIZE 3
char board[SIZE][SIZE];

void initialize_board() {
    for (int i = 0; i < SIZE; i++) {
        for (int j = 0; j < SIZE; j++) {
            board[i][j] = ' ';
        }
    }
}

void print_board() {
    printf("\\n");
    for (int i = 0; i < SIZE; i++) {
        for (int j = 0; j < SIZE; j++) {
            printf(" %c ", board[i][j]);
            if (j < SIZE - 1) printf("|");
        }
        printf("\\n");
        if (i < SIZE - 1) {
            printf("-----------\\n");
        }
    }
    printf("\\n");
}

bool make_move(int row, int col, char player) {
    if (row >= 0 && row < SIZE && col >= 0 && col < SIZE && board[row][col] == ' ') {
        board[row][col] = player;
        return true;
    }
    return false;
}

bool check_win(char player) {
    // Check rows
    for (int i = 0; i < SIZE; i++) {
        if (board[i][0] == player && board[i][1] == player && board[i][2] == player) {
            return true;
        }
    }

    // Check columns
    for (int j = 0; j < SIZE; j++) {
        if (board[0][j] == player && board[1][j] == player && board[2][j] == player) {
            return true;
        }
    }

    // Check diagonals
    if (board[0][0] == player && board[1][1] == player && board[2][2] == player) {
        return true;
    }
    if (board[0][2] == player && board[1][1] == player && board[2][0] == player) {
        return true;
    }

    return false;
}

bool is_board_full() {
    for (int i = 0; i < SIZE; i++) {
        for (int j = 0; j < SIZE; j++) {
            if (board[i][j] == ' ') {
                return false;
            }
        }
    }
    return true;
}

int main() {
    initialize_board();
    char current_player = 'X';
    int moves = 0;

    while (true) {
        print_board();
        printf("Player %c's turn\\n", current_player);

        int row, col;
        do {
            printf("Enter row and column (0-2): ");
            scanf("%d %d", &row, &col);
        } while (!make_move(row, col, current_player));

        moves++;

        if (check_win(current_player)) {
            print_board();
            printf("Player %c wins!\\n", current_player);
            break;
        }

        if (is_board_full()) {
            print_board();
            printf("It's a draw!\\n");
            break;
        }

        current_player = (current_player == 'X') ? 'O' : 'X';
    }

    return 0;
}
\`\`\`

---

## 📊 3D Arrays and Higher Dimensions

### 3D Array Declaration

\`\`\`c
// data_type array_name[depth][rows][columns];
int cube[2][3][4];  // 2 layers, 3 rows, 4 columns each

// RGB image: height x width x 3 (RGB channels)
unsigned char image[480][640][3];
\`\`\`

### 3D Array Initialization

\`\`\`c
int cube[2][2][2] = {
    {  // Layer 0
        {1, 2},  // Row 0
        {3, 4}   // Row 1
    },
    {  // Layer 1
        {5, 6},  // Row 0
        {7, 8}   // Row 1
    }
};
\`\`\`

### 3D Array Traversal

\`\`\`c
void print_3d_array(int arr[][2][2], int layers) {
    for (int k = 0; k < layers; k++) {
        printf("Layer %d:\\n", k);
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                printf("%d ", arr[k][i][j]);
            }
            printf("\\n");
        }
        printf("\\n");
    }
}
\`\`\`

---

## 🔧 Passing Multi-Dimensional Arrays to Functions

### 2D Array Parameters

\`\`\`c
// Method 1: Specify column size
void print_matrix(int matrix[][3], int rows) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\\n");
    }
}

// Method 2: Using pointer notation
void print_matrix_ptr(int (*matrix)[3], int rows) {
    // Same as method 1
}

// Method 3: Variable column size (advanced)
void print_matrix_var(int rows, int cols, int matrix[rows][cols]) {
    // C99 variable length arrays
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\\n");
    }
}

int main() {
    int matrix[2][3] = {{1, 2, 3}, {4, 5, 6}};

    print_matrix(matrix, 2);
    print_matrix_var(2, 3, matrix);

    return 0;
}
\`\`\`

### Returning Multi-Dimensional Arrays

\`\`\`c
#include <stdlib.h>

// Return pointer to 2D array (dynamic allocation)
int** create_matrix(int rows, int cols) {
    // Allocate array of pointers
    int** matrix = (int**)malloc(rows * sizeof(int*));

    if (matrix == NULL) return NULL;

    // Allocate each row
    for (int i = 0; i < rows; i++) {
        matrix[i] = (int*)malloc(cols * sizeof(int));
        if (matrix[i] == NULL) {
            // Free previously allocated rows
            for (int j = 0; j < i; j++) {
                free(matrix[j]);
            }
            free(matrix);
            return NULL;
        }
    }

    // Initialize matrix
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            matrix[i][j] = i * cols + j + 1;
        }
    }

    return matrix;
}

void free_matrix(int** matrix, int rows) {
    for (int i = 0; i < rows; i++) {
        free(matrix[i]);
    }
    free(matrix);
}

int main() {
    int rows = 3, cols = 4;
    int** matrix = create_matrix(rows, cols);

    if (matrix != NULL) {
        // Use matrix
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                printf("%d ", matrix[i][j]);
            }
            printf("\\n");
        }

        free_matrix(matrix, rows);
    }

    return 0;
}
\`\`\`

---

## 🐛 Common Multi-Dimensional Array Mistakes

### Wrong Dimension Order

\`\`\`c
// ❌ Confusing row/column order
int matrix[3][4];  // 3 rows, 4 columns

// When traversing, use correct order
for (int i = 0; i < 3; i++) {     // i for rows (0-2)
    for (int j = 0; j < 4; j++) { // j for columns (0-3)
        // Access matrix[i][j]
    }
}
\`\`\`

### Memory Layout Confusion

\`\`\`c
int matrix[2][3] = {{1, 2, 3}, {4, 5, 6}};
// Memory layout: 1, 2, 3, 4, 5, 6

// Row-major order means:
// matrix[0][0], matrix[0][1], matrix[0][2], matrix[1][0], matrix[1][1], matrix[1][2]
\`\`\`

### Function Parameter Issues

\`\`\`c
// ❌ Wrong: missing column size
void process_matrix(int matrix[][], int rows, int cols) {
    // Won't compile
}

// ✅ Correct: specify column size
void process_matrix(int matrix[][10], int rows) {
    // Column size must be constant
}

// ✅ Better: use pointer notation
void process_matrix(int (*matrix)[10], int rows) {
    // Explicit pointer to array
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Multi-dimensional arrays** use multiple indices: \`array[row][col]\`
2. **Memory layout** is row-major in C (contiguous rows)
3. **Function parameters** require column size specification
4. **Matrix operations** follow mathematical rules (addition, multiplication)
5. **Dynamic allocation** allows variable-sized multi-dimensional arrays
6. **Bounds checking** is crucial to prevent undefined behavior
7. **Applications** include games, images, tables, and mathematical computations

---

## 🚀 Preview: Array Operations

In the next topic, you'll learn about:
- **Advanced array manipulation** techniques
- **Array algorithms** (sorting, searching, merging)
- **Array utility functions** (copy, compare, search)
- **Performance considerations** and optimizations

**Multi-dimensional arrays enable complex data structures - array operations make them powerful!** ⚡
