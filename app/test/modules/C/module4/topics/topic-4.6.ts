import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_6: SubLesson = {
  id: "4.6",
  title: 'Combining Functions and Arrays',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🎯 Combining Functions and Arrays

This lesson brings together everything you've learned about functions and arrays. We'll build complete programs that demonstrate practical applications of these concepts working together.

---

## 🏗️ Building a Complete Program

### **Student Grade Management System**

\`\`\`c
#include <stdio.h>
#include <string.h>

#define MAX_STUDENTS 50
#define MAX_NAME_LENGTH 30
#define MAX_SUBJECTS 5

typedef struct {
    int id;
    char name[MAX_NAME_LENGTH];
    float grades[MAX_SUBJECTS];
    int num_grades;
    float average;
} Student;

// Function prototypes
void add_student(Student students[], int *count);
void calculate_averages(Student students[], int count);
void display_students(Student students[], int count);
void find_top_student(Student students[], int count);
void search_student(Student students[], int count);
void sort_by_average(Student students[], int count);

int main(void) {
    Student students[MAX_STUDENTS];
    int student_count = 0;
    int choice;

    printf("=== Student Grade Management System ===\\n\\n");

    do {
        printf("\\nMenu:\\n");
        printf("1. Add student\\n");
        printf("2. Display all students\\n");
        printf("3. Find top student\\n");
        printf("4. Search student\\n");
        printf("5. Sort by average\\n");
        printf("6. Exit\\n");
        printf("Choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                add_student(students, &student_count);
                calculate_averages(students, student_count);
                break;
            case 2:
                display_students(students, student_count);
                break;
            case 3:
                find_top_student(students, student_count);
                break;
            case 4:
                search_student(students, student_count);
                break;
            case 5:
                sort_by_average(students, student_count);
                printf("Students sorted by average!\\n");
                break;
            case 6:
                printf("Goodbye!\\n");
                break;
            default:
                printf("Invalid choice!\\n");
        }

        // Clear input buffer
        while (getchar() != '\\n');
    } while (choice != 6);

    return 0;
}

void add_student(Student students[], int *count) {
    if (*count >= MAX_STUDENTS) {
        printf("Maximum students reached!\\n");
        return;
    }

    Student *s = &students[*count];

    printf("Enter student ID: ");
    scanf("%d", &s->id);

    printf("Enter student name: ");
    scanf(" %[^\n]", s->name);  // Read until newline

    printf("Enter number of subjects (1-%d): ", MAX_SUBJECTS);
    scanf("%d", &s->num_grades);

    if (s->num_grades < 1 || s->num_grades > MAX_SUBJECTS) {
        printf("Invalid number of subjects!\\n");
        return;
    }

    printf("Enter grades:\\n");
    for (int i = 0; i < s->num_grades; i++) {
        printf("Subject %d: ", i + 1);
        scanf("%f", &s->grades[i]);
    }

    (*count)++;
    printf("Student added successfully!\\n");
}

void calculate_averages(Student students[], int count) {
    for (int i = 0; i < count; i++) {
        Student *s = &students[i];
        float sum = 0;

        for (int j = 0; j < s->num_grades; j++) {
            sum += s->grades[j];
        }

        s->average = sum / s->num_grades;
    }
}

void display_students(Student students[], int count) {
    if (count == 0) {
        printf("No students registered.\\n");
        return;
    }

    printf("\\n%-5s %-20s %-8s %-10s\\n", "ID", "Name", "Average", "Grades");
    printf("==================================================\\n");

    for (int i = 0; i < count; i++) {
        Student *s = &students[i];

        printf("%-5d %-20s %-8.2f ", s->id, s->name, s->average);

        for (int j = 0; j < s->num_grades; j++) {
            printf("%.1f", s->grades[j]);
            if (j < s->num_grades - 1) printf(",");
        }
        printf("\\n");
    }
}

void find_top_student(Student students[], int count) {
    if (count == 0) {
        printf("No students registered.\\n");
        return;
    }

    int top_index = 0;
    float highest_avg = students[0].average;

    for (int i = 1; i < count; i++) {
        if (students[i].average > highest_avg) {
            highest_avg = students[i].average;
            top_index = i;
        }
    }

    Student *top = &students[top_index];
    printf("\\n🏆 Top Student:\\n");
    printf("Name: %s\\n", top->name);
    printf("ID: %d\\n", top->id);
    printf("Average: %.2f\\n", top->average);
}

void search_student(Student students[], int count) {
    char search_name[MAX_NAME_LENGTH];
    int found = 0;

    printf("Enter student name to search: ");
    scanf(" %[^\n]", search_name);

    for (int i = 0; i < count; i++) {
        if (strcmp(students[i].name, search_name) == 0) {
            Student *s = &students[i];
            printf("\\nStudent Found:\\n");
            printf("ID: %d\\n", s->id);
            printf("Name: %s\\n", s->name);
            printf("Average: %.2f\\n", s->average);
            printf("Grades: ");
            for (int j = 0; j < s->num_grades; j++) {
                printf("%.1f", s->grades[j]);
                if (j < s->num_grades - 1) printf(", ");
            }
            printf("\\n");
            found = 1;
            break;
        }
    }

    if (!found) {
        printf("Student not found.\\n");
    }
}

void sort_by_average(Student students[], int count) {
    for (int i = 0; i < count - 1; i++) {
        for (int j = 0; j < count - i - 1; j++) {
            if (students[j].average < students[j + 1].average) {
                // Swap students
                Student temp = students[j];
                students[j] = students[j + 1];
                students[j + 1] = temp;
            }
        }
    }
}
\`\`\`

---

## 🎮 Number Guessing Game with Statistics

### **Enhanced Game with Array Tracking**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>

#define MAX_GAMES 100

typedef struct {
    int game_number;
    int secret_number;
    int attempts;
    int won;
} GameRecord;

// Function prototypes
void play_game(GameRecord records[], int *game_count);
void display_statistics(GameRecord records[], int game_count);
void save_records(GameRecord records[], int game_count);
int load_records(GameRecord records[]);

int main(void) {
    GameRecord records[MAX_GAMES];
    int game_count = 0;
    int choice;

    // Load previous records
    game_count = load_records(records);

    printf("=== Enhanced Number Guessing Game ===\\n\\n");

    do {
        printf("\\nMenu:\\n");
        printf("1. Play Game\\n");
        printf("2. View Statistics\\n");
        printf("3. Exit\\n");
        printf("Choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                play_game(records, &game_count);
                break;
            case 2:
                display_statistics(records, game_count);
                break;
            case 3:
                save_records(records, game_count);
                printf("Records saved. Goodbye!\\n");
                break;
            default:
                printf("Invalid choice!\\n");
        }
    } while (choice != 3);

    return 0;
}

void play_game(GameRecord records[], int *game_count) {
    if (*game_count >= MAX_GAMES) {
        printf("Maximum games reached!\\n");
        return;
    }

    int secret_number, guess, attempts = 0;
    int min_range = 1, max_range = 100;

    // Generate secret number
    srand(time(NULL));
    secret_number = rand() % (max_range - min_range + 1) + min_range;

    printf("\\n🎯 I'm thinking of a number between %d and %d\\n",
           min_range, max_range);

    while (1) {
        printf("Enter your guess: ");
        scanf("%d", &guess);
        attempts++;

        if (guess == secret_number) {
            printf("🎉 Congratulations! You got it in %d attempts!\\n", attempts);

            // Save record
            records[*game_count].game_number = *game_count + 1;
            records[*game_count].secret_number = secret_number;
            records[*game_count].attempts = attempts;
            records[*game_count].won = 1;
            (*game_count)++;

            break;
        } else if (guess < secret_number) {
            printf("📉 Too low! ");
        } else {
            printf("📈 Too high! ");
        }

        // Provide hints
        int diff = abs(guess - secret_number);
        if (diff <= 5) {
            printf("You're very close!\\n");
        } else if (diff <= 15) {
            printf("You're getting warmer.\\n");
        } else {
            printf("Try again.\\n");
        }

        // Give up option after many attempts
        if (attempts >= 10) {
            printf("Want to give up? (y/n): ");
            char give_up;
            scanf(" %c", &give_up);
            if (give_up == 'y' || give_up == 'Y') {
                printf("The number was %d\\n", secret_number);

                // Save record
                records[*game_count].game_number = *game_count + 1;
                records[*game_count].secret_number = secret_number;
                records[*game_count].attempts = attempts;
                records[*game_count].won = 0;
                (*game_count)++;

                break;
            }
        }
    }
}

void display_statistics(GameRecord records[], int game_count) {
    if (game_count == 0) {
        printf("\\nNo games played yet.\\n");
        return;
    }

    printf("\\n📊 Game Statistics\\n");
    printf("===================\\n");
    printf("Total games: %d\\n", game_count);

    int wins = 0, total_attempts = 0;
    int best_game = 0, worst_game = 0;

    for (int i = 0; i < game_count; i++) {
        if (records[i].won) {
            wins++;
            total_attempts += records[i].attempts;

            if (records[i].attempts < records[best_game].attempts ||
                best_game == 0) {
                best_game = i;
            }

            if (records[i].attempts > records[worst_game].attempts) {
                worst_game = i;
            }
        }
    }

    printf("Games won: %d\\n", wins);
    printf("Games lost: %d\\n", game_count - wins);
    printf("Win rate: %.1f%%\\n", (float)wins / game_count * 100);

    if (wins > 0) {
        printf("Average attempts per win: %.1f\\n",
               (float)total_attempts / wins);
        printf("Best game: Game %d (%d attempts)\\n",
               records[best_game].game_number, records[best_game].attempts);
        printf("Worst game: Game %d (%d attempts)\\n",
               records[worst_game].game_number, records[worst_game].attempts);
    }

    // Show recent games
    printf("\\nRecent Games:\\n");
    int start = (game_count > 5) ? game_count - 5 : 0;
    for (int i = start; i < game_count; i++) {
        printf("Game %d: %d attempts, %s\\n",
               records[i].game_number,
               records[i].attempts,
               records[i].won ? "Won" : "Lost");
    }
}

void save_records(GameRecord records[], int game_count) {
    FILE *file = fopen("game_records.txt", "w");
    if (file == NULL) {
        printf("Error saving records.\\n");
        return;
    }

    fprintf(file, "%d\\n", game_count);
    for (int i = 0; i < game_count; i++) {
        fprintf(file, "%d %d %d %d\\n",
                records[i].game_number,
                records[i].secret_number,
                records[i].attempts,
                records[i].won);
    }

    fclose(file);
}

int load_records(GameRecord records[]) {
    FILE *file = fopen("game_records.txt", "r");
    if (file == NULL) {
        return 0;  // No saved records
    }

    int game_count;
    fscanf(file, "%d", &game_count);

    for (int i = 0; i < game_count && i < MAX_GAMES; i++) {
        fscanf(file, "%d %d %d %d",
               &records[i].game_number,
               &records[i].secret_number,
               &records[i].attempts,
               &records[i].won);
    }

    fclose(file);
    return game_count;
}
\`\`\`

---

## 🧮 Matrix Calculator

### **Complete Matrix Operations**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 10

// Function prototypes
void input_matrix(int matrix[MAX_SIZE][MAX_SIZE], int *rows, int *cols);
void display_matrix(int matrix[MAX_SIZE][MAX_SIZE], int rows, int cols);
void add_matrices(int a[MAX_SIZE][MAX_SIZE], int b[MAX_SIZE][MAX_SIZE],
                  int result[MAX_SIZE][MAX_SIZE], int rows, int cols);
void multiply_matrices(int a[MAX_SIZE][MAX_SIZE], int b[MAX_SIZE][MAX_SIZE],
                       int result[MAX_SIZE][MAX_SIZE], int rows_a, int cols_a, int cols_b);
void transpose_matrix(int matrix[MAX_SIZE][MAX_SIZE],
                      int result[MAX_SIZE][MAX_SIZE], int rows, int cols);
int determinant_2x2(int matrix[2][2]);

int main(void) {
    int matrix1[MAX_SIZE][MAX_SIZE], matrix2[MAX_SIZE][MAX_SIZE];
    int result[MAX_SIZE][MAX_SIZE];
    int rows1, cols1, rows2, cols2;
    int choice;

    printf("=== Matrix Calculator ===\\n\\n");

    do {
        printf("\\nOperations:\\n");
        printf("1. Add matrices\\n");
        printf("2. Multiply matrices\\n");
        printf("3. Transpose matrix\\n");
        printf("4. Calculate 2x2 determinant\\n");
        printf("5. Exit\\n");
        printf("Choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1: {
                printf("\\nMatrix Addition\\n");
                printf("Enter first matrix:\\n");
                input_matrix(matrix1, &rows1, &cols1);

                printf("Enter second matrix:\\n");
                input_matrix(matrix2, &rows2, &cols2);

                if (rows1 != rows2 || cols1 != cols2) {
                    printf("Matrices must have same dimensions!\\n");
                    break;
                }

                add_matrices(matrix1, matrix2, result, rows1, cols1);

                printf("\\nResult:\\n");
                display_matrix(result, rows1, cols1);
                break;
            }

            case 2: {
                printf("\\nMatrix Multiplication\\n");
                printf("Enter first matrix:\\n");
                input_matrix(matrix1, &rows1, &cols1);

                printf("Enter second matrix:\\n");
                input_matrix(matrix2, &rows2, &cols2);

                if (cols1 != rows2) {
                    printf("Invalid dimensions for multiplication!\\n");
                    printf("Columns of first matrix must equal rows of second.\\n");
                    break;
                }

                multiply_matrices(matrix1, matrix2, result, rows1, cols1, cols2);

                printf("\\nResult:\\n");
                display_matrix(result, rows1, cols2);
                break;
            }

            case 3: {
                printf("\\nMatrix Transpose\\n");
                printf("Enter matrix:\\n");
                input_matrix(matrix1, &rows1, &cols1);

                transpose_matrix(matrix1, result, rows1, cols1);

                printf("\\nTransposed Matrix:\\n");
                display_matrix(result, cols1, rows1);
                break;
            }

            case 4: {
                printf("\\n2x2 Determinant\\n");
                printf("Enter 2x2 matrix:\\n");

                input_matrix(matrix1, &rows1, &cols1);

                if (rows1 != 2 || cols1 != 2) {
                    printf("Matrix must be 2x2!\\n");
                    break;
                }

                int det = determinant_2x2(matrix1);
                printf("\\nDeterminant: %d\\n", det);
                break;
            }

            case 5:
                printf("Goodbye!\\n");
                break;

            default:
                printf("Invalid choice!\\n");
        }
    } while (choice != 5);

    return 0;
}

void input_matrix(int matrix[MAX_SIZE][MAX_SIZE], int *rows, int *cols) {
    printf("Enter rows and columns: ");
    scanf("%d %d", rows, cols);

    if (*rows > MAX_SIZE || *cols > MAX_SIZE || *rows < 1 || *cols < 1) {
        printf("Invalid dimensions!\\n");
        *rows = *cols = 0;
        return;
    }

    printf("Enter matrix elements:\\n");
    for (int i = 0; i < *rows; i++) {
        for (int j = 0; j < *cols; j++) {
            scanf("%d", &matrix[i][j]);
        }
    }
}

void display_matrix(int matrix[MAX_SIZE][MAX_SIZE], int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            printf("%4d ", matrix[i][j]);
        }
        printf("\\n");
    }
}

void add_matrices(int a[MAX_SIZE][MAX_SIZE], int b[MAX_SIZE][MAX_SIZE],
                  int result[MAX_SIZE][MAX_SIZE], int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            result[i][j] = a[i][j] + b[i][j];
        }
    }
}

void multiply_matrices(int a[MAX_SIZE][MAX_SIZE], int b[MAX_SIZE][MAX_SIZE],
                       int result[MAX_SIZE][MAX_SIZE], int rows_a, int cols_a, int cols_b) {
    // Initialize result matrix to 0
    for (int i = 0; i < rows_a; i++) {
        for (int j = 0; j < cols_b; j++) {
            result[i][j] = 0;
        }
    }

    // Perform multiplication
    for (int i = 0; i < rows_a; i++) {
        for (int j = 0; j < cols_b; j++) {
            for (int k = 0; k < cols_a; k++) {
                result[i][j] += a[i][k] * b[k][j];
            }
        }
    }
}

void transpose_matrix(int matrix[MAX_SIZE][MAX_SIZE],
                      int result[MAX_SIZE][MAX_SIZE], int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            result[j][i] = matrix[i][j];
        }
    }
}

int determinant_2x2(int matrix[2][2]) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
}
\`\`\`

---

## 🏆 Final Project: Library Management System

### **Complete Application**

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define MAX_BOOKS 100
#define MAX_TITLE_LENGTH 100
#define MAX_AUTHOR_LENGTH 50
#define FILENAME "library.txt"

typedef struct {
    int id;
    char title[MAX_TITLE_LENGTH];
    char author[MAX_AUTHOR_LENGTH];
    int year;
    int available;  // 1 = available, 0 = borrowed
} Book;

// Function prototypes
void add_book(Book books[], int *count);
void display_books(Book books[], int count);
void search_book(Book books[], int count);
void borrow_book(Book books[], int count);
void return_book(Book books[], int count);
void save_library(Book books[], int count);
int load_library(Book books[]);
int find_book_by_id(Book books[], int count, int id);

int main(void) {
    Book library[MAX_BOOKS];
    int book_count = 0;
    int choice;

    // Load library from file
    book_count = load_library(library);

    printf("=== Library Management System ===\\n\\n");

    do {
        printf("\\nMenu:\\n");
        printf("1. Add book\\n");
        printf("2. Display all books\\n");
        printf("3. Search book\\n");
        printf("4. Borrow book\\n");
        printf("5. Return book\\n");
        printf("6. Save and exit\\n");
        printf("Choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                add_book(library, &book_count);
                break;
            case 2:
                display_books(library, book_count);
                break;
            case 3:
                search_book(library, book_count);
                break;
            case 4:
                borrow_book(library, book_count);
                break;
            case 5:
                return_book(library, book_count);
                break;
            case 6:
                save_library(library, book_count);
                printf("Library saved. Goodbye!\\n");
                break;
            default:
                printf("Invalid choice!\\n");
        }
    } while (choice != 6);

    return 0;
}

void add_book(Book books[], int *count) {
    if (*count >= MAX_BOOKS) {
        printf("Library is full!\\n");
        return;
    }

    Book *b = &books[*count];

    printf("Enter book ID: ");
    scanf("%d", &b->id);

    // Check if ID already exists
    if (find_book_by_id(books, *count, b->id) != -1) {
        printf("Book with this ID already exists!\\n");
        return;
    }

    printf("Enter book title: ");
    scanf(" %[^\n]", b->title);

    printf("Enter author: ");
    scanf(" %[^\n]", b->author);

    printf("Enter publication year: ");
    scanf("%d", &b->year);

    b->available = 1;
    (*count)++;

    printf("Book added successfully!\\n");
}

void display_books(Book books[], int count) {
    if (count == 0) {
        printf("Library is empty.\\n");
        return;
    }

    printf("\\n%-5s %-30s %-20s %-6s %-10s\\n",
           "ID", "Title", "Author", "Year", "Status");
    printf("==================================================================\\n");

    for (int i = 0; i < count; i++) {
        Book *b = &books[i];
        printf("%-5d %-30s %-20s %-6d %-10s\\n",
               b->id,
               strlen(b->title) > 29 ? strncat(strncpy(malloc(30), b->title, 26), "...", 3) : b->title,
               strlen(b->author) > 19 ? strncat(strncpy(malloc(20), b->author, 17), "...", 3) : b->author,
               b->year,
               b->available ? "Available" : "Borrowed");
    }
}

void search_book(Book books[], int count) {
    char search_term[MAX_TITLE_LENGTH];
    int found = 0;

    printf("Enter book title or author to search: ");
    scanf(" %[^\n]", search_term);

    printf("\\nSearch Results:\\n");
    for (int i = 0; i < count; i++) {
        Book *b = &books[i];
        if (strstr(b->title, search_term) || strstr(b->author, search_term)) {
            printf("ID: %d, Title: %s, Author: %s, Status: %s\\n",
                   b->id, b->title, b->author,
                   b->available ? "Available" : "Borrowed");
            found = 1;
        }
    }

    if (!found) {
        printf("No books found matching '%s'\\n", search_term);
    }
}

void borrow_book(Book books[], int count) {
    int id;

    printf("Enter book ID to borrow: ");
    scanf("%d", &id);

    int index = find_book_by_id(books, count, id);
    if (index == -1) {
        printf("Book not found!\\n");
        return;
    }

    if (!books[index].available) {
        printf("Book is already borrowed!\\n");
        return;
    }

    books[index].available = 0;
    printf("Book '%s' borrowed successfully!\\n", books[index].title);
}

void return_book(Book books[], int count) {
    int id;

    printf("Enter book ID to return: ");
    scanf("%d", &id);

    int index = find_book_by_id(books, count, id);
    if (index == -1) {
        printf("Book not found!\\n");
        return;
    }

    if (books[index].available) {
        printf("Book was not borrowed!\\n");
        return;
    }

    books[index].available = 1;
    printf("Book '%s' returned successfully!\\n", books[index].title);
}

void save_library(Book books[], int count) {
    FILE *file = fopen(FILENAME, "w");
    if (file == NULL) {
        printf("Error saving library!\\n");
        return;
    }

    fprintf(file, "%d\\n", count);
    for (int i = 0; i < count; i++) {
        fprintf(file, "%d\\n%s\\n%s\\n%d\\n%d\\n",
                books[i].id,
                books[i].title,
                books[i].author,
                books[i].year,
                books[i].available);
    }

    fclose(file);
}

int load_library(Book books[]) {
    FILE *file = fopen(FILENAME, "r");
    if (file == NULL) {
        return 0;  // No saved library
    }

    int count;
    fscanf(file, "%d\\n", &count);

    for (int i = 0; i < count && i < MAX_BOOKS; i++) {
        fscanf(file, "%d\\n", &books[i].id);
        fscanf(file, "%[^\n]\\n", books[i].title);
        fscanf(file, "%[^\n]\\n", books[i].author);
        fscanf(file, "%d\\n", &books[i].year);
        fscanf(file, "%d\\n", &books[i].available);
    }

    fclose(file);
    return count;
}

int find_book_by_id(Book books[], int count, int id) {
    for (int i = 0; i < count; i++) {
        if (books[i].id == id) {
            return i;
        }
    }
    return -1;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Functions and arrays work together** to create powerful programs
2. **Modular design** breaks complex problems into manageable pieces
3. **Data structures** (arrays of structs) organize related information
4. **File I/O** enables data persistence across program runs
5. **User interfaces** make programs interactive and user-friendly
6. **Error handling** prevents crashes and improves reliability
7. **Code reusability** reduces duplication and maintenance effort

You've mastered functions and arrays - you're now ready for advanced C programming! 🎯✨`;
    return contentString;
  })()
};
