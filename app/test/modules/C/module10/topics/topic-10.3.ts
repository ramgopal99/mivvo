import { SubLesson } from '../../../../data/lessonsData';

export const topic_10_3: SubLesson = {
  id: "10.3",
  title: 'Recursion and Recursive Algorithms',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🔁 Recursion and Recursive Algorithms in C

Recursion is a programming technique where a function calls itself to solve problems. It's powerful for solving complex problems by breaking them into simpler subproblems.

---

## 📋 What is Recursion?

**Recursion occurs when a function calls itself directly or indirectly.** Every recursive function must have:

1. **Base case**: Condition that stops recursion
2. **Recursive case**: Calls itself with modified parameters
3. **Progress**: Each call gets closer to base case

### **Basic Structure**

\`\`\`c
return_type recursive_function(parameters) {
    if (base_case_condition) {
        // Base case: no recursion
        return base_result;
    } else {
        // Recursive case: call self with modified parameters
        return recursive_function(modified_parameters);
    }
}
\`\`\`

---

## 📊 Factorial Example

### **Recursive Factorial**

\`\`\`c
#include <stdio.h>

long long factorial(int n) {
    if (n == 0 || n == 1) {
        return 1;  // Base case
    } else {
        return n * factorial(n - 1);  // Recursive case
    }
}

int main() {
    int num = 5;
    printf("%d! = %lld\\n", num, factorial(num));

    return 0;
}
\`\`\`

### **Iterative vs Recursive Comparison**

\`\`\`c
#include <stdio.h>

// Iterative factorial
long long factorial_iterative(int n) {
    long long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Recursive factorial
long long factorial_recursive(int n) {
    if (n == 0 || n == 1) {
        return 1;
    }
    return n * factorial_recursive(n - 1);
}

int main() {
    int num = 10;

    printf("Iterative: %d! = %lld\\n", num, factorial_iterative(num));
    printf("Recursive: %d! = %lld\\n", num, factorial_recursive(num));

    return 0;
}
\`\`\`

---

## 🌳 Tree Recursion

### **Fibonacci Sequence**

\`\`\`c
#include <stdio.h>

int fibonacci(int n) {
    if (n == 0) return 0;
    if (n == 1) return 1;

    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    int n = 10;
    printf("Fibonacci(%d) = %d\\n", n, fibonacci(n));

    return 0;
}
\`\`\`

**Note**: This exponential implementation is inefficient. Each call branches into two more calls.

### **Optimized Fibonacci with Memoization**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

#define MAX_N 100

long long memo[MAX_N];

long long fibonacci_memo(int n) {
    if (memo[n] != -1) {
        return memo[n];  // Return cached result
    }

    if (n == 0) return memo[n] = 0;
    if (n == 1) return memo[n] = 1;

    return memo[n] = fibonacci_memo(n - 1) + fibonacci_memo(n - 2);
}

int main() {
    // Initialize memo array
    for (int i = 0; i < MAX_N; i++) {
        memo[i] = -1;
    }

    int n = 50;
    printf("Fibonacci(%d) = %lld\\n", n, fibonacci_memo(n));

    return 0;
}
\`\`\`

---

## 🔍 Divide and Conquer

### **Binary Search (Recursive)**

\`\`\`c
#include <stdio.h>

int binary_search_recursive(int arr[], int left, int right, int target) {
    if (left > right) {
        return -1;  // Not found
    }

    int mid = left + (right - left) / 2;

    if (arr[mid] == target) {
        return mid;
    } else if (arr[mid] > target) {
        return binary_search_recursive(arr, left, mid - 1, target);
    } else {
        return binary_search_recursive(arr, mid + 1, right, target);
    }
}

int main() {
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 45, 56, 72};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 23;

    int result = binary_search_recursive(arr, 0, n - 1, target);

    if (result != -1) {
        printf("Element found at index %d\\n", result);
    } else {
        printf("Element not found\\n");
    }

    return 0;
}
\`\`\`

### **Merge Sort (Recursive)**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    int *L = (int*)malloc(n1 * sizeof(int));
    int *R = (int*)malloc(n2 * sizeof(int));

    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }

    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];

    free(L);
    free(R);
}

void merge_sort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;

        merge_sort(arr, left, mid);
        merge_sort(arr, mid + 1, right);

        merge(arr, left, mid, right);
    }
}

void print_array(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original: ");
    print_array(arr, n);

    merge_sort(arr, 0, n - 1);

    printf("Sorted: ");
    print_array(arr, n);

    return 0;
}
\`\`\`

---

## 🌀 Backtracking Algorithms

### **N-Queens Problem**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define N 8

void print_board(int board[N][N]) {
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            printf("%c ", board[i][j] ? 'Q' : '.');
        }
        printf("\\n");
    }
    printf("\\n");
}

bool is_safe(int board[N][N], int row, int col) {
    // Check row
    for (int i = 0; i < col; i++) {
        if (board[row][i]) return false;
    }

    // Check upper diagonal
    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j]) return false;
    }

    // Check lower diagonal
    for (int i = row, j = col; i < N && j >= 0; i++, j--) {
        if (board[i][j]) return false;
    }

    return true;
}

bool solve_nqueens(int board[N][N], int col) {
    if (col >= N) return true;  // All queens placed

    for (int i = 0; i < N; i++) {
        if (is_safe(board, i, col)) {
            board[i][col] = 1;

            if (solve_nqueens(board, col + 1)) {
                return true;
            }

            board[i][col] = 0;  // Backtrack
        }
    }

    return false;
}

int main() {
    int board[N][N] = {0};

    if (solve_nqueens(board, 0)) {
        printf("Solution found:\\n");
        print_board(board);
    } else {
        printf("No solution exists\\n");
    }

    return 0;
}
\`\`\`

### **Sudoku Solver**

\`\`\`c
#include <stdio.h>
#include <stdbool.h>

#define SIZE 9

bool is_valid(int grid[SIZE][SIZE], int row, int col, int num) {
    // Check row
    for (int x = 0; x < SIZE; x++) {
        if (grid[row][x] == num) return false;
    }

    // Check column
    for (int x = 0; x < SIZE; x++) {
        if (grid[x][col] == num) return false;
    }

    // Check 3x3 box
    int start_row = row - row % 3;
    int start_col = col - col % 3;

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (grid[i + start_row][j + start_col] == num) {
                return false;
            }
        }
    }

    return true;
}

bool solve_sudoku(int grid[SIZE][SIZE]) {
    int row, col;

    // Find empty cell
    bool found = false;
    for (row = 0; row < SIZE; row++) {
        for (col = 0; col < SIZE; col++) {
            if (grid[row][col] == 0) {
                found = true;
                break;
            }
        }
        if (found) break;
    }

    if (!found) return true;  // Puzzle solved

    // Try numbers 1-9
    for (int num = 1; num <= 9; num++) {
        if (is_valid(grid, row, col, num)) {
            grid[row][col] = num;

            if (solve_sudoku(grid)) {
                return true;
            }

            grid[row][col] = 0;  // Backtrack
        }
    }

    return false;
}

void print_grid(int grid[SIZE][SIZE]) {
    for (int row = 0; row < SIZE; row++) {
        for (int col = 0; col < SIZE; col++) {
            printf("%d ", grid[row][col]);
        }
        printf("\\n");
    }
}

int main() {
    int grid[SIZE][SIZE] = {
        {5, 3, 0, 0, 7, 0, 0, 0, 0},
        {6, 0, 0, 1, 9, 5, 0, 0, 0},
        {0, 9, 8, 0, 0, 0, 0, 6, 0},
        {8, 0, 0, 0, 6, 0, 0, 0, 3},
        {4, 0, 0, 8, 0, 3, 0, 0, 1},
        {7, 0, 0, 0, 2, 0, 0, 0, 6},
        {0, 6, 0, 0, 0, 0, 2, 8, 0},
        {0, 0, 0, 4, 1, 9, 0, 0, 5},
        {0, 0, 0, 0, 8, 0, 0, 7, 9}
    };

    if (solve_sudoku(grid)) {
        printf("Sudoku solved:\\n");
        print_grid(grid);
    } else {
        printf("No solution exists\\n");
    }

    return 0;
}
\`\`\`

---

## 🏗️ Tail Recursion

### **What is Tail Recursion?**

Tail recursion occurs when the recursive call is the last operation in the function.

### **Tail Recursive Factorial**

\`\`\`c
#include <stdio.h>

long long factorial_tail(long long n, long long accumulator) {
    if (n == 0 || n == 1) {
        return accumulator;
    }
    return factorial_tail(n - 1, n * accumulator);
}

long long factorial(int n) {
    return factorial_tail(n, 1);
}

int main() {
    int num = 5;
    printf("%d! = %lld\\n", num, factorial(num));
    return 0;
}
\`\`\`

### **Tail Recursive Fibonacci**

\`\`\`c
#include <stdio.h>

long long fibonacci_tail(int n, long long a, long long b) {
    if (n == 0) return a;
    if (n == 1) return b;
    return fibonacci_tail(n - 1, b, a + b);
}

long long fibonacci(int n) {
    return fibonacci_tail(n, 0, 1);
}

int main() {
    int n = 10;
    printf("Fibonacci(%d) = %lld\\n", n, fibonacci(n));
    return 0;
}
\`\`\`

---

## ⚠️ Recursion Pitfalls

### **Stack Overflow**

\`\`\`c
#include <stdio.h>

// Dangerous: deep recursion
void infinite_recursion(int n) {
    printf("%d\\n", n);
    infinite_recursion(n + 1);  // No base case!
}

int main() {
    // This will cause stack overflow
    // infinite_recursion(1);
    return 0;
}
\`\`\`

### **Redundant Calculations**

\`\`\`c
#include <stdio.h>

// Inefficient: recalculates same values
int fibonacci_bad(int n) {
    if (n <= 1) return n;
    return fibonacci_bad(n - 1) + fibonacci_bad(n - 2);  // Exponential time
}

int main() {
    printf("Fibonacci(40) = %d\\n", fibonacci_bad(40));  // Very slow!
    return 0;
}
\`\`\`

### **Solutions to Common Problems**

#### **1. Memoization**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

#define MAX_N 100
long long memo[MAX_N];

long long fibonacci_memo(int n) {
    if (memo[n] != -1) return memo[n];
    if (n <= 1) return memo[n] = n;
    return memo[n] = fibonacci_memo(n - 1) + fibonacci_memo(n - 2);
}

int main() {
    memset(memo, -1, sizeof(memo));
    printf("Fibonacci(40) = %lld\\n", fibonacci_memo(40));  // Fast!
    return 0;
}
\`\`\`

#### **2. Iterative Solutions**

\`\`\`c
#include <stdio.h>

long long fibonacci_iterative(int n) {
    if (n <= 1) return n;

    long long a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        long long temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

int main() {
    printf("Fibonacci(40) = %lld\\n", fibonacci_iterative(40));
    return 0;
}
\`\`\`

---

## 🎯 Practical Applications

### **Directory Tree Traversal**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <dirent.h>
#include <sys/stat.h>
#include <string.h>

void print_indent(int depth) {
    for (int i = 0; i < depth; i++) {
        printf("  ");
    }
}

void traverse_directory(const char *path, int depth) {
    DIR *dir = opendir(path);
    if (dir == NULL) return;

    struct dirent *entry;
    while ((entry = readdir(dir)) != NULL) {
        if (strcmp(entry->d_name, ".") == 0 || strcmp(entry->d_name, "..") == 0) {
            continue;
        }

        print_indent(depth);
        printf("%s\\n", entry->d_name);

        char full_path[1024];
        snprintf(full_path, sizeof(full_path), "%s/%s", path, entry->d_name);

        struct stat st;
        if (stat(full_path, &st) == 0 && S_ISDIR(st.st_mode)) {
            traverse_directory(full_path, depth + 1);
        }
    }

    closedir(dir);
}

int main(int argc, char *argv[]) {
    const char *path = (argc > 1) ? argv[1] : ".";
    traverse_directory(path, 0);
    return 0;
}
\`\`\`

### **Expression Tree Evaluator**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

typedef enum { NUMBER, OPERATOR } NodeType;

typedef struct TreeNode {
    NodeType type;
    union {
        int value;
        char op;
    } data;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

TreeNode* create_number_node(int value) {
    TreeNode *node = (TreeNode*)malloc(sizeof(TreeNode));
    node->type = NUMBER;
    node->data.value = value;
    node->left = node->right = NULL;
    return node;
}

TreeNode* create_operator_node(char op) {
    TreeNode *node = (TreeNode*)malloc(sizeof(TreeNode));
    node->type = OPERATOR;
    node->data.op = op;
    node->left = node->right = NULL;
    return node;
}

int evaluate_expression_tree(TreeNode *root) {
    if (root == NULL) return 0;

    if (root->type == NUMBER) {
        return root->data.value;
    }

    int left_val = evaluate_expression_tree(root->left);
    int right_val = evaluate_expression_tree(root->right);

    switch (root->data.op) {
        case '+': return left_val + right_val;
        case '-': return left_val - right_val;
        case '*': return left_val * right_val;
        case '/': return left_val / right_val;
        default: return 0;
    }
}

void free_tree(TreeNode *root) {
    if (root == NULL) return;
    free_tree(root->left);
    free_tree(root->right);
    free(root);
}

// Simple parser for expressions like "3+5*2"
TreeNode* parse_expression(const char *expr) {
    // Simplified parser - in practice, use proper expression parsing
    if (strlen(expr) == 1 && isdigit(expr[0])) {
        return create_number_node(expr[0] - '0');
    }

    // Find last operator with lowest precedence
    int paren_depth = 0;
    int op_index = -1;
    char op = 0;

    for (int i = strlen(expr) - 1; i >= 0; i--) {
        if (expr[i] == ')') paren_depth++;
        else if (expr[i] == '(') paren_depth--;
        else if (paren_depth == 0 && (expr[i] == '+' || expr[i] == '-')) {
            op_index = i;
            op = expr[i];
            break;
        } else if (paren_depth == 0 && (expr[i] == '*' || expr[i] == '/')) {
            if (op_index == -1) {
                op_index = i;
                op = expr[i];
            }
        }
    }

    if (op_index == -1) return NULL;

    TreeNode *node = create_operator_node(op);

    char *left_expr = (char*)malloc(op_index + 1);
    char *right_expr = (char*)malloc(strlen(expr) - op_index);

    strncpy(left_expr, expr, op_index);
    left_expr[op_index] = '\\0';
    strcpy(right_expr, expr + op_index + 1);

    node->left = parse_expression(left_expr);
    node->right = parse_expression(right_expr);

    free(left_expr);
    free(right_expr);

    return node;
}

int main() {
    const char *expression = "3+5*2";

    TreeNode *tree = parse_expression(expression);
    if (tree != NULL) {
        int result = evaluate_expression_tree(tree);
        printf("%s = %d\\n", expression, result);
        free_tree(tree);
    }

    return 0;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Recursion** solves problems by breaking them into smaller subproblems
2. **Base case** prevents infinite recursion and stack overflow
3. **Tail recursion** can be optimized by compilers
4. **Memoization** caches results to avoid redundant calculations
5. **Tree recursion** creates exponential complexity - use carefully
6. **Backtracking** explores solution spaces systematically
7. **Iterative solutions** often more efficient than recursive ones
8. **Stack depth limits** practical recursion depth

Master recursion to solve complex problems elegantly! 🔁✨`;

    return contentString;
  })()
};
