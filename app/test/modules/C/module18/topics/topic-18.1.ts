import { SubLesson } from '../../../../data/lessonsData';

export const topic_18_1: SubLesson = {
  id: '18.1',
  title: 'Beginner C Programming Projects',
  status: 'demo',
  content: `# 🎯 Beginner C Programming Projects

This module contains complete beginner-level C programming projects that demonstrate practical applications of the concepts learned in previous modules. Each project includes detailed explanations, complete source code, and step-by-step implementation guides to help you understand how to approach and build these applications from scratch.

## 🎯 Development Approach for Beginner Projects

### How to Approach C Programming Projects:

1. **Planning Phase:**
   - Define the problem and requirements clearly
   - Break down the functionality into smaller functions
   - Identify the data structures and algorithms needed
   - Plan the program flow and user interaction

2. **Implementation Phase:**
   - Start with basic structure (main function, includes)
   - Implement helper functions one by one
   - Test each component as you build
   - Handle errors and edge cases

3. **Testing Phase:**
   - Test normal operation scenarios
   - Test error conditions and invalid inputs
   - Verify memory management (no leaks)
   - Get feedback and iterate

4. **Documentation Phase:**
   - Add comments explaining complex logic
   - Document function purposes and parameters
   - Include usage examples

## Project 1: Number Guessing Game

### 🎯 Project Overview
**Description:** A simple interactive game where the computer generates a random number and the player tries to guess it with hints.

**Learning Objectives:**
- Understand random number generation in C
- Practice input validation and error handling
- Implement game loops and state management
- Use functions to organize code

**Concepts Used:**
- Variables and data types (\`"int\`, \`bool\`)
- Control structures (while/do-while loops, if-else)
- Random number generation (\`rand()\`, \`srand()\`)
- User input/output (\`scanf()\`, \`printf()\`)
- Function decomposition and modular design

**Features:**
- Random number generation between 1-100
- Input validation with error messages
- Guess counter and performance feedback
- Play again functionality with clean restart

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <stdbool.h>

// Function prototypes
int generate_random_number(int min, int max);
int get_user_guess(void);
void display_hint(int guess, int target);
bool play_again(void);

int main() {
    printf("🎯 Welcome to the Number Guessing Game!\\n");
    printf("I'm thinking of a number between 1 and 100.\\n\\n");

    // Seed random number generator
    srand(time(NULL));

    do {
        int target = generate_random_number(1, 100);
        int guess_count = 0;
        int user_guess;

        printf("Try to guess my number!\\n");

        do {
            user_guess = get_user_guess();
            guess_count++;

            if (user_guess == target) {
                printf("🎉 Congratulations! You guessed it in %d attempts!\\n", guess_count);
            } else {
                display_hint(user_guess, target);
            }
        } while (user_guess != target);

    } while (play_again());

    printf("\\nThanks for playing! 👋\\n");
    return 0;
}

int generate_random_number(int min, int max) {
    return rand() % (max - min + 1) + min;
}

int get_user_guess(void) {
    int guess;
    int valid_input = 0;

    do {
        printf("Enter your guess (1-100): ");
        if (scanf("%d", &guess) == 1) {
            if (guess >= 1 && guess <= 100) {
                valid_input = 1;
            } else {
                printf("❌ Please enter a number between 1 and 100.\\n");
            }
        } else {
            printf("❌ Invalid input. Please enter a number.\\n");
            // Clear invalid input from buffer
            while (getchar() != '\\n');
        }
    } while (!valid_input);

    return guess;
}

void display_hint(int guess, int target) {
    int difference = abs(guess - target);

    if (difference <= 5) {
        printf("🔥 Very hot! ");
    } else if (difference <= 15) {
        printf("🌡️ Hot! ");
    } else if (difference <= 30) {
        printf("😊 Warm! ");
    } else {
        printf("❄️ Cold! ");
    }

    if (guess < target) {
        printf("Try higher!\\n");
    } else {
        printf("Try lower!\\n");
    }
}

bool play_again(void) {
    char response;
    printf("\\nWould you like to play again? (y/n): ");

    // Clear any remaining input
    while (getchar() != '\\n');

    response = getchar();

    return (response == 'y' || response == 'Y');
}
\`\`\`

## Project 2: Simple Calculator

**Description:** A command-line calculator that performs basic arithmetic operations with input validation and history tracking.

**Concepts Used:**
- Functions and modular design
- Arrays and dynamic memory
- String processing
- Error handling
- Switch statements

**Features:**
- Basic arithmetic operations (+, -, *, /)
- Input validation and error handling
- Operation history
- Memory functions (store/recall)
- Clear and exit commands

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <stdbool.h>

#define MAX_HISTORY 100
#define MAX_EXPRESSION 100

// Calculator history entry
typedef struct {
    char expression[MAX_EXPRESSION];
    double result;
} HistoryEntry;

// Global calculator state
static HistoryEntry history[MAX_HISTORY];
static int history_count = 0;
static double memory = 0.0;

// Function prototypes
double calculate(double num1, double num2, char operator);
bool is_valid_operator(char op);
void display_history(void);
void display_help(void);
bool process_command(char *input);

int main() {
    char input[MAX_EXPRESSION];

    printf("🧮 Simple Calculator\\n");
    printf("Type 'help' for available commands or 'exit' to quit.\\n\\n");

    while (true) {
        printf("> ");
        if (fgets(input, sizeof(input), stdin) == NULL) {
            break;
        }

        // Remove trailing newline
        input[strcspn(input, "\\n")] = 0;

        // Skip empty input
        if (strlen(input) == 0) {
            continue;
        }

        // Process commands
        if (process_command(input)) {
            continue;
        }

        // Parse arithmetic expression (simplified: num1 op num2)
        double num1, num2;
        char operator;

        if (sscanf(input, "%lf %c %lf", &num1, &operator, &num2) == 3) {
            if (is_valid_operator(operator)) {
                double result = calculate(num1, num2, operator);

                // Add to history
                if (history_count < MAX_HISTORY) {
                    strcpy(history[history_count].expression, input);
                    history[history_count].result = result;
                    history_count++;
                }

                printf("= %.6f\\n", result);
            } else {
                printf("❌ Invalid operator. Use +, -, *, or /\\n");
            }
        } else {
            printf("❌ Invalid expression. Use format: number operator number\\n");
            printf("Example: 5 + 3\\n");
        }
    }

    printf("\\nGoodbye! 👋\\n");
    return 0;
}

double calculate(double num1, double num2, char operator) {
    switch (operator) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/':
            if (num2 == 0) {
                printf("❌ Division by zero!\\n");
                return 0.0;
            }
            return num1 / num2;
        default:
            return 0.0;
    }
}

bool is_valid_operator(char op) {
    return (op == '+' || op == '-' || op == '*' || op == '/');
}

void display_history(void) {
    if (history_count == 0) {
        printf("No calculations in history.\\n");
        return;
    }

    printf("\\n📜 Calculation History:\\n");
    for (int i = 0; i < history_count; i++) {
        printf("%d. %s = %.6f\\n", i + 1,
               history[i].expression, history[i].result);
    }
    printf("\\n");
}

void display_help(void) {
    printf("\\nℹ️ Available Commands:\\n");
    printf("  help          - Show this help message\\n");
    printf("  history       - Show calculation history\\n");
    printf("  clear         - Clear calculation history\\n");
    printf("  mem           - Display memory value\\n");
    printf("  mem = <num>   - Store number in memory\\n");
    printf("  exit          - Exit the calculator\\n");
    printf("\\nArithmetic Operations:\\n");
    printf("  +  Addition\\n");
    printf("  -  Subtraction\\n");
    printf("  *  Multiplication\\n");
    printf("  /  Division\\n");
    printf("\\nExample: 5 + 3\\n\\n");
}

bool process_command(char *input) {
    // Convert to lowercase for case-insensitive comparison
    for (char *p = input; *p; p++) {
        *p = tolower(*p);
    }

    if (strcmp(input, "help") == 0) {
        display_help();
        return true;
    } else if (strcmp(input, "history") == 0) {
        display_history();
        return true;
    } else if (strcmp(input, "clear") == 0) {
        history_count = 0;
        printf("History cleared.\\n");
        return true;
    } else if (strcmp(input, "exit") == 0) {
        return false; // Signal to exit main loop
    } else if (strcmp(input, "mem") == 0) {
        printf("Memory: %.6f\\n", memory);
        return true;
    } else if (strncmp(input, "mem = ", 6) == 0) {
        double value;
        if (sscanf(input + 6, "%lf", &value) == 1) {
            memory = value;
            printf("Stored %.6f in memory.\\n", value);
        } else {
            printf("❌ Invalid memory assignment.\\n");
        }
        return true;
    }

    return false; // Not a command, process as arithmetic expression
}
\`\`\`

## Project 3: Student Grade Management System

**Description:** A simple console-based application for managing student grades with file storage capabilities.

**Concepts Used:**
- Structures and data organization
- Dynamic memory allocation
- File I/O operations
- Arrays and searching
- String manipulation

**Features:**
- Add/remove students and grades
- Calculate averages and statistics
- Save/load data to/from files
- Search and sort functionality
- Grade validation and error handling

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <stdbool.h>

#define MAX_NAME_LENGTH 50
#define MAX_STUDENTS 100
#define GRADES_FILE "grades.txt"

// Student structure
typedef struct {
    char name[MAX_NAME_LENGTH];
    int id;
    double grades[10];  // Up to 10 grades per student
    int grade_count;
    double average;
} Student;

// Grade management system
typedef struct {
    Student students[MAX_STUDENTS];
    int student_count;
    char filename[MAX_NAME_LENGTH];
} GradeSystem;

// Function prototypes
void initialize_system(GradeSystem *system, const char *filename);
void display_menu(void);
void add_student(GradeSystem *system);
void add_grade(GradeSystem *system);
void display_students(const GradeSystem *system);
void calculate_averages(GradeSystem *system);
void save_grades(const GradeSystem *system);
void load_grades(GradeSystem *system);
Student *find_student_by_id(GradeSystem *system, int id);
void sort_students_by_average(GradeSystem *system);

int main() {
    GradeSystem system;
    initialize_system(&system, GRADES_FILE);

    // Try to load existing data
    load_grades(&system);

    int choice;
    bool running = true;

    printf("🎓 Student Grade Management System\\n\\n");

    while (running) {
        display_menu();
        printf("Enter your choice: ");
        scanf("%d", &choice);

        // Clear input buffer
        while (getchar() != '\\n');

        switch (choice) {
            case 1:
                add_student(&system);
                break;
            case 2:
                add_grade(&system);
                break;
            case 3:
                display_students(&system);
                break;
            case 4:
                calculate_averages(&system);
                display_students(&system);
                break;
            case 5:
                save_grades(&system);
                break;
            case 6:
                load_grades(&system);
                break;
            case 7:
                sort_students_by_average(&system);
                display_students(&system);
                break;
            case 8:
                printf("Saving data...\\n");
                save_grades(&system);
                running = false;
                break;
            default:
                printf("❌ Invalid choice. Please try again.\\n");
        }
        printf("\\n");
    }

    printf("Goodbye! 👋\\n");
    return 0;
}

void initialize_system(GradeSystem *system, const char *filename) {
    system->student_count = 0;
    strcpy(system->filename, filename);
}

void display_menu(void) {
    printf("📋 Menu:\\n");
    printf("1. Add Student\\n");
    printf("2. Add Grade to Student\\n");
    printf("3. Display All Students\\n");
    printf("4. Calculate Averages\\n");
    printf("5. Save Grades\\n");
    printf("6. Load Grades\\n");
    printf("7. Sort by Average\\n");
    printf("8. Exit\\n");
}

void add_student(GradeSystem *system) {
    if (system->student_count >= MAX_STUDENTS) {
        printf("❌ Maximum number of students reached.\\n");
        return;
    }

    Student *student = &system->students[system->student_count];

    printf("Enter student name: ");
    fgets(student->name, sizeof(student->name), stdin);
    student->name[strcspn(student->name, "\\n")] = 0; // Remove newline

    // Generate simple ID based on student count
    student->id = system->student_count + 1;
    student->grade_count = 0;
    student->average = 0.0;

    system->student_count++;
    printf("✅ Student '%s' added with ID %d.\\n", student->name, student->id);
}

void add_grade(GradeSystem *system) {
    int id;
    printf("Enter student ID: ");
    scanf("%d", &id);

    Student *student = find_student_by_id(system, id);
    if (!student) {
        printf("❌ Student with ID %d not found.\\n", id);
        return;
    }

    if (student->grade_count >= 10) {
        printf("❌ Maximum grades reached for this student.\\n");
        return;
    }

    double grade;
    printf("Enter grade (0-100): ");
    scanf("%lf", &grade);

    if (grade < 0 || grade > 100) {
        printf("❌ Invalid grade. Must be between 0 and 100.\\n");
        return;
    }

    student->grades[student->grade_count++] = grade;
    printf("✅ Grade %.2f added to %s.\\n", grade, student->name);
}

void display_students(const GradeSystem *system) {
    if (system->student_count == 0) {
        printf("📝 No students in the system.\\n");
        return;
    }

    printf("\\n📊 Student Information:\\n");
    printf("%-5s %-20s %-10s %-15s\\n", "ID", "Name", "Grades", "Average");
    printf("----- -------------------- ---------- ---------------\\n");

    for (int i = 0; i < system->student_count; i++) {
        const Student *student = &system->students[i];

        printf("%-5d %-20s ", student->id, student->name);

        if (student->grade_count > 0) {
            printf("%d grades", student->grade_count);
        } else {
            printf("No grades");
        }

        printf("   %.2f\\n", student->average);
    }
}

void calculate_averages(GradeSystem *system) {
    for (int i = 0; i < system->student_count; i++) {
        Student *student = &system->students[i];

        if (student->grade_count > 0) {
            double sum = 0.0;
            for (int j = 0; j < student->grade_count; j++) {
                sum += student->grades[j];
            }
            student->average = sum / student->grade_count;
        } else {
            student->average = 0.0;
        }
    }
    printf("✅ Averages calculated.\\n");
}

void save_grades(const GradeSystem *system) {
    FILE *file = fopen(system->filename, "w");
    if (!file) {
        perror("❌ Failed to open file for saving");
        return;
    }

    fprintf(file, "%d\\n", system->student_count);

    for (int i = 0; i < system->student_count; i++) {
        const Student *student = &system->students[i];

        fprintf(file, "%d\\n%s\\n%d\\n",
                student->id, student->name, student->grade_count);

        for (int j = 0; j < student->grade_count; j++) {
            fprintf(file, "%.2f\\n", student->grades[j]);
        }
    }

    fclose(file);
    printf("✅ Grades saved to %s.\\n", system->filename);
}

void load_grades(GradeSystem *system) {
    FILE *file = fopen(system->filename, "r");
    if (!file) {
        printf("™️ No existing grade file found.\\n");
        return;
    }

    fscanf(file, "%d", &system->student_count);

    for (int i = 0; i < system->student_count; i++) {
        Student *student = &system->students[i];

        fscanf(file, "%d", &student->id);

        // Read name (handle spaces)
        fgetc(file); // consume newline
        fgets(student->name, sizeof(student->name), file);
        student->name[strcspn(student->name, "\\n")] = 0;

        fscanf(file, "%d", &student->grade_count);

        for (int j = 0; j < student->grade_count; j++) {
            fscanf(file, "%lf", &student->grades[j]);
        }
    }

    fclose(file);
    calculate_averages(system);
    printf("✅ Grades loaded from %s.\\n", system->filename);
}

Student *find_student_by_id(GradeSystem *system, int id) {
    for (int i = 0; i < system->student_count; i++) {
        if (system->students[i].id == id) {
            return &system->students[i];
        }
    }
    return NULL;
}

void sort_students_by_average(GradeSystem *system) {
    for (int i = 0; i < system->student_count - 1; i++) {
        for (int j = 0; j < system->student_count - i - 1; j++) {
            if (system->students[j].average < system->students[j + 1].average) {
                // Swap students (descending order - highest average first)
                Student temp = system->students[j];
                system->students[j] = system->students[j + 1];
                system->students[j + 1] = temp;
            }
        }
    }
    printf("✅ Students sorted by average (highest first).\\n");
}
\`\`\`

## Project Extensions

**Challenge Exercises:**
1. **Add networking capabilities** to the task manager for multi-user collaboration
2. **Implement a GUI version** of any project using GTK or another toolkit
3. **Add encryption** to the grade management system for secure data storage
4. **Create a web API** for the calculator using a simple HTTP server
5. **Implement multithreading** in the text analyzer for better performance

These beginner projects demonstrate fundamental C programming concepts while creating useful, real-world applications. Each project builds progressively more complex features and integrates multiple programming concepts.`
};
