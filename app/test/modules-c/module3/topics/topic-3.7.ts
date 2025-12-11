import { SubLesson } from '../../../data/lessonsData';

export const topic_3_7: SubLesson = {
  id: 3.7,
  title: 'Nested Control Structures',
  status: 'completed',
  content: `# 🏗️ Nested Control Structures

Master complex program logic by combining control structures - nesting if statements inside loops, loops inside each other, and mixing different control flow constructs.

---

## 📋 What is Nesting?

**Nesting means placing one control structure inside another**

\`\`\`c
// Outer structure
for (int i = 0; i < 3; i++) {

    // Inner structure (nested)
    if (i % 2 == 0) {
        printf("Even: %d\\n", i);
    } else {
        printf("Odd: %d\\n", i);
    }
}
\`\`\`

---

## 🔀 Nested if Statements

### Basic Nesting
\`\`\`c
#include <stdio.h>

int main() {
    int age;
    char hasLicense;

    printf("Enter age: ");
    scanf("%d", &age);

    if (age >= 18) {
        printf("Do you have a driver's license? (y/n): ");
        scanf(" %c", &hasLicense);

        if (hasLicense == 'y' || hasLicense == 'Y') {
            printf("You can drive legally.\\n");
        } else {
            printf("You need a license to drive.\\n");
        }
    } else {
        printf("You are too young to drive.\\n");
    }

    return 0;
}
\`\`\`

### Complex Decision Tree
\`\`\`c
#include <stdio.h>

int main() {
    int income, credit_score;
    char employment_status;

    printf("Enter annual income: ");
    scanf("%d", &income);

    printf("Enter credit score (300-850): ");
    scanf("%d", &credit_score);

    printf("Employment status (f=full-time, p=part-time, u=unemployed): ");
    scanf(" %c", &employment_status);

    if (income >= 50000) {
        if (credit_score >= 700) {
            printf("Loan approved with excellent terms.\\n");
        } else if (credit_score >= 600) {
            printf("Loan approved with standard terms.\\n");
        } else {
            printf("Loan denied - poor credit score.\\n");
        }
    } else if (income >= 30000) {
        if (employment_status == 'f') {
            if (credit_score >= 650) {
                printf("Loan approved with higher interest.\\n");
            } else {
                printf("Loan denied - insufficient credit.\\n");
            }
        } else {
            printf("Loan denied - requires full-time employment.\\n");
        }
    } else {
        printf("Loan denied - insufficient income.\\n");
    }

    return 0;
}
\`\`\`

---

## 🔁 Nested Loops

### Basic Nested Loops
\`\`\`c
#include <stdio.h>

int main() {
    // Outer loop (rows)
    for (int i = 1; i <= 3; i++) {
        printf("Row %d: ", i);

        // Inner loop (columns)
        for (int j = 1; j <= 4; j++) {
            printf("%d ", j);
        }

        printf("\\n");
    }

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Row 1: 1 2 3 4
Row 2: 1 2 3 4
Row 3: 1 2 3 4
\`\`\`

### Multiplication Table
\`\`\`c
#include <stdio.h>

int main() {
    printf("Multiplication Table:\\n");
    printf("   ");

    // Header row
    for (int i = 1; i <= 10; i++) {
        printf("%4d", i);
    }
    printf("\\n");

    // Separator
    printf("   ");
    for (int i = 1; i <= 10; i++) {
        printf("----");
    }
    printf("\\n");

    // Table content
    for (int i = 1; i <= 10; i++) {
        printf("%2d|", i);

        for (int j = 1; j <= 10; j++) {
            printf("%4d", i * j);
        }

        printf("\\n");
    }

    return 0;
}
\`\`\`

### Pattern Printing
\`\`\`c
#include <stdio.h>

int main() {
    int rows = 5;

    // Right triangle
    printf("Right Triangle:\\n");
    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= i; j++) {
            printf("* ");
        }
        printf("\\n");
    }

    printf("\\n");

    // Number pyramid
    printf("Number Pyramid:\\n");
    for (int i = 1; i <= rows; i++) {
        // Print spaces
        for (int space = 1; space <= rows - i; space++) {
            printf("  ");
        }

        // Print numbers
        for (int j = 1; j <= i; j++) {
            printf("%d ", j);
        }

        printf("\\n");
    }

    return 0;
}
\`\`\`

---

## 🎛️ Mixed Control Structures

### Loop with if-else Inside
\`\`\`c
#include <stdio.h>

int main() {
    for (int i = 1; i <= 20; i++) {
        if (i % 15 == 0) {
            printf("%d: FizzBuzz\\n", i);
        } else if (i % 3 == 0) {
            printf("%d: Fizz\\n", i);
        } else if (i % 5 == 0) {
            printf("%d: Buzz\\n", i);
        } else {
            printf("%d\\n", i);
        }
    }

    return 0;
}
\`\`\`

### if-else with Loops Inside
\`\`\`c
#include <stdio.h>

int main() {
    int choice;

    printf("Choose a pattern:\\n");
    printf("1. Stars\\n");
    printf("2. Numbers\\n");
    printf("3. Alphabets\\n");
    scanf("%d", &choice);

    if (choice == 1) {
        // Star pattern
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= i; j++) {
                printf("* ");
            }
            printf("\\n");
        }
    } else if (choice == 2) {
        // Number pattern
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= i; j++) {
                printf("%d ", j);
            }
            printf("\\n");
        }
    } else if (choice == 3) {
        // Alphabet pattern
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j <= i; j++) {
                printf("%c ", 'A' + j);
            }
            printf("\\n");
        }
    } else {
        printf("Invalid choice!\\n");
    }

    return 0;
}
\`\`\`

---

## 🧪 Advanced Examples

### Matrix Operations
\`\`\`c
#include <stdio.h>

#define ROWS 3
#define COLS 3

int main() {
    int matrix[ROWS][COLS] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    printf("Matrix:\\n");
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\\n");
    }

    // Find maximum in each row
    printf("\\nMaximum in each row:\\n");
    for (int i = 0; i < ROWS; i++) {
        int max = matrix[i][0];
        for (int j = 1; j < COLS; j++) {
            if (matrix[i][j] > max) {
                max = matrix[i][j];
            }
        }
        printf("Row %d: %d\\n", i + 1, max);
    }

    return 0;
}
\`\`\`

### Student Grade Processing
\`\`\`c
#include <stdio.h>

int main() {
    int num_students, num_subjects;

    printf("Enter number of students: ");
    scanf("%d", &num_students);

    printf("Enter number of subjects: ");
    scanf("%d", &num_subjects);

    // Process each student
    for (int student = 1; student <= num_students; student++) {
        printf("\\nStudent %d:\\n", student);

        int total = 0;
        int passed_subjects = 0;

        // Process each subject for this student
        for (int subject = 1; subject <= num_subjects; subject++) {
            int marks;

            printf("  Subject %d marks: ", subject);
            scanf("%d", &marks);

            total += marks;

            // Check if passed (assuming 40 is passing)
            if (marks >= 40) {
                passed_subjects++;
            } else {
                printf("    Failed in subject %d\\n", subject);
            }
        }

        float average = (float)total / num_subjects;
        char result[20];

        // Determine overall result
        if (passed_subjects == num_subjects) {
            if (average >= 75) {
                strcpy(result, "Distinction");
            } else if (average >= 60) {
                strcpy(result, "First Class");
            } else if (average >= 50) {
                strcpy(result, "Second Class");
            } else {
                strcpy(result, "Pass");
            }
        } else {
            strcpy(result, "Failed");
        }

        printf("  Total: %d\\n", total);
        printf("  Average: %.2f\\n", average);
        printf("  Result: %s\\n", result);
    }

    return 0;
}
\`\`\`

---

## 🐛 Common Nesting Problems

### Missing Braces
\`\`\`c
// ❌ Bug: only first statement is conditional
for (int i = 0; i < 3; i++)
    if (i % 2 == 0)
        printf("Even\\n");
    else
        printf("Odd\\n");  // This belongs to the if, not the for!

// ✅ Correct
for (int i = 0; i < 3; i++) {
    if (i % 2 == 0) {
        printf("Even\\n");
    } else {
        printf("Odd\\n");
    }
}
\`\`\`

### Loop Variable Shadowing
\`\`\`c
// ❌ Inner loop variable shadows outer
for (int i = 0; i < 3; i++) {
    for (int i = 0; i < 3; i++) {  // Wrong! i is already declared
        printf("%d ", i);
    }
}

// ✅ Use different variable names
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        printf("%d ", j);
    }
    printf("\\n");
}
\`\`\`

### Deep Nesting Issues
\`\`\`c
// ❌ Too deeply nested - hard to read
if (condition1) {
    for (int i = 0; i < 10; i++) {
        if (condition2) {
            while (condition3) {
                if (condition4) {
                    // Deep nesting - confusing!
                    do_something();
                }
            }
        }
    }
}

// ✅ Break into functions
void process_data() {
    // Handle the complex logic in a separate function
    if (condition4) {
        do_something();
    }
}

int main() {
    if (condition1) {
        for (int i = 0; i < 10; i++) {
            if (condition2) {
                while (condition3) {
                    process_data();
                }
            }
        }
    }
    return 0;
}
\`\`\`

---

## 💡 Best Practices

### Limit Nesting Depth
\`\`\`c
// ✅ Keep nesting shallow (max 3-4 levels)
for (int i = 0; i < rows; i++) {
    if (is_valid_row(i)) {
        for (int j = 0; j < cols; j++) {
            if (is_valid_cell(i, j)) {
                process_cell(i, j);
            }
        }
    }
}
\`\`\`

### Use Early Returns
\`\`\`c
// ✅ Early return reduces nesting
int validate_input(int value) {
    if (value < MIN_VALUE) {
        return ERROR_TOO_SMALL;
    }

    if (value > MAX_VALUE) {
        return ERROR_TOO_LARGE;
    }

    // Continue with valid input
    return process_valid_input(value);
}
\`\`\`

### Extract Complex Conditions
\`\`\`c
// ✅ Extract complex conditions
bool is_eligible_for_loan(int income, int credit_score, char employment) {
    return income >= 30000 &&
           credit_score >= 650 &&
           (employment == 'f' || employment == 's');
}

int main() {
    // Simple if statement
    if (is_eligible_for_loan(income, credit_score, employment)) {
        approve_loan();
    }
    return 0;
}
\`\`\`

### Consistent Indentation
\`\`\`c
// ✅ Consistent 4-space indentation
if (condition1) {
    for (int i = 0; i < 10; i++) {
        if (condition2) {
            do_something();
        }
    }
}
\`\`\`

---

## 🔧 break and continue in Nested Structures

### Breaking Out of Nested Loops
\`\`\`c
#include <stdio.h>

int main() {
    int found = 0;
    int target = 42;

    for (int i = 0; i < 10 && !found; i++) {
        for (int j = 0; j < 10; j++) {
            int value = i * 10 + j;

            if (value == target) {
                printf("Found %d at position (%d, %d)\\n", target, i, j);
                found = 1;
                break;  // Break inner loop
            }
        }
    }

    return 0;
}
\`\`\`

### Using goto for Deep Breaks (Advanced)
\`\`\`c
// Sometimes goto is acceptable for breaking out of deep nesting
for (int i = 0; i < 10; i++) {
    for (int j = 0; j < 10; j++) {
        for (int k = 0; k < 10; k++) {
            if (some_condition) {
                goto exit_loops;  // Emergency exit
            }
        }
    }
}

exit_loops:
printf("Exited all loops\\n");
\`\`\`

---

## 🧪 Complex Program Example

### Tic-Tac-Toe Game
\`\`\`c
#include <stdio.h>
#include <stdbool.h>

#define SIZE 3

char board[SIZE][SIZE];
char current_player = 'X';

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
            for (int j = 0; j < SIZE; j++) {
                printf("---");
                if (j < SIZE - 1) printf("+");
            }
            printf("\\n");
        }
    }
    printf("\\n");
}

bool make_move(int row, int col) {
    if (row >= 0 && row < SIZE && col >= 0 && col < SIZE && board[row][col] == ' ') {
        board[row][col] = current_player;
        return true;
    }
    return false;
}

bool check_win() {
    // Check rows and columns
    for (int i = 0; i < SIZE; i++) {
        if ((board[i][0] == current_player && board[i][1] == current_player && board[i][2] == current_player) ||
            (board[0][i] == current_player && board[1][i] == current_player && board[2][i] == current_player)) {
            return true;
        }
    }

    // Check diagonals
    if ((board[0][0] == current_player && board[1][1] == current_player && board[2][2] == current_player) ||
        (board[0][2] == current_player && board[1][1] == current_player && board[2][0] == current_player)) {
        return true;
    }

    return false;
}

bool check_draw() {
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
    int moves = 0;

    while (true) {
        print_board();
        printf("Player %c's turn\\n", current_player);

        int row, col;
        do {
            printf("Enter row (0-2) and column (0-2): ");
            scanf("%d %d", &row, &col);
        } while (!make_move(row, col));

        moves++;

        if (check_win()) {
            print_board();
            printf("Player %c wins!\\n", current_player);
            break;
        }

        if (check_draw()) {
            print_board();
            printf("It's a draw!\\n");
            break;
        }

        // Switch players
        current_player = (current_player == 'X') ? 'O' : 'X';
    }

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Nesting** combines control structures for complex logic
2. **Limit depth** to 3-4 levels maximum for readability
3. **Use consistent indentation** (4 spaces recommended)
4. **Extract complex conditions** into separate functions
5. **Use early returns** to reduce nesting
6. **Choose meaningful variable names** for nested loops
7. **Test nested logic** thoroughly with different inputs

---

## 🚀 Module 3 Complete!

**Congratulations!** You've mastered control structures in C:

- ✅ **Introduction** to control flow concepts
- ✅ **if-else statements** for conditional execution
- ✅ **switch statements** for multiple choices
- ✅ **for loops** for fixed iterations
- ✅ **while and do-while loops** for conditional repetition
- ✅ **break and continue** for loop control
- ✅ **Nested structures** for complex program logic

**Ready for Module 4: Functions?** Functions let you organize code into reusable blocks with parameters and return values! 📦`
};
