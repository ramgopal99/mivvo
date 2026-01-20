import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_6: SubLesson = {
  id: "3.6",
  title: 'Putting Control Structures Together',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🎯 Putting Control Structures Together

Now that we've learned all the control structures in C, let's combine them to build more complex and practical programs. This lesson shows how \`if\` statements, loops, and logical operators work together.

---

## 🧮 Complete Calculator Program

### **Full-Featured Calculator**

\`\`\`c
#include <stdio.h>

int main(void) {
    float num1, num2, result;
    char operator;
    char continue_calc = 'y';

    printf("=== Advanced Calculator ===\\n\\n");

    while (continue_calc == 'y' || continue_calc == 'Y') {
        // Input validation loop
        int valid_input = 0;
        while (!valid_input) {
            printf("Enter first number: ");
            if (scanf("%f", &num1) == 1) {
                valid_input = 1;
            } else {
                printf("Invalid input! Please enter a number.\\n");
                while (getchar() != '\\n');  // Clear input buffer
            }
        }

        // Operator input with validation
        valid_input = 0;
        while (!valid_input) {
            printf("Enter operator (+, -, *, /, %%): ");
            scanf(" %c", &operator);

            if (operator == '+' || operator == '-' ||
                operator == '*' || operator == '/' || operator == '%') {
                valid_input = 1;
            } else {
                printf("Invalid operator! Use +, -, *, /, or %%.\\n");
            }
        }

        // Second number input with validation
        valid_input = 0;
        while (!valid_input) {
            printf("Enter second number: ");
            if (scanf("%f", &num2) == 1) {
                valid_input = 1;
            } else {
                printf("Invalid input! Please enter a number.\\n");
                while (getchar() != '\\n');
            }
        }

        // Perform calculation
        switch (operator) {
            case '+':
                result = num1 + num2;
                printf("%.2f + %.2f = %.2f\\n", num1, num2, result);
                break;
            case '-':
                result = num1 - num2;
                printf("%.2f - %.2f = %.2f\\n", num1, num2, result);
                break;
            case '*':
                result = num1 * num2;
                printf("%.2f * %.2f = %.2f\\n", num1, num2, result);
                break;
            case '/':
                if (num2 != 0) {
                    result = num1 / num2;
                    printf("%.2f / %.2f = %.2f\\n", num1, num2, result);
                } else {
                    printf("Error: Division by zero!\\n");
                }
                break;
            case '%':
                if ((int)num2 != 0) {
                    result = (int)num1 % (int)num2;
                    printf("%.0f %% %.0f = %.0f\\n", num1, num2, result);
                } else {
                    printf("Error: Modulo by zero!\\n");
                }
                break;
        }

        // Ask to continue
        printf("\\nContinue? (y/n): ");
        scanf(" %c", &continue_calc);

        while (getchar() != '\\n');  // Clear any extra input
        printf("\\n");
    }

    printf("Calculator closed. Goodbye!\\n");
    return 0;
}
\`\`\`

---

## 📊 Student Grade Management System

### **Grade Processing Program**

\`\`\`c
#include <stdio.h>
#include <string.h>

#define MAX_STUDENTS 50
#define MAX_NAME_LENGTH 50

int main(void) {
    char names[MAX_STUDENTS][MAX_NAME_LENGTH];
    float grades[MAX_STUDENTS];
    int student_count = 0;
    char choice;

    printf("=== Student Grade Management System ===\\n\\n");

    do {
        printf("Menu:\\n");
        printf("1. Add student grade\\n");
        printf("2. Display all grades\\n");
        printf("3. Calculate class average\\n");
        printf("4. Find highest/lowest grade\\n");
        printf("5. Search student\\n");
        printf("6. Exit\\n");
        printf("Choice: ");
        scanf(" %c", &choice);

        switch (choice) {
            case '1': {
                if (student_count >= MAX_STUDENTS) {
                    printf("Maximum students reached!\\n");
                    break;
                }

                printf("Enter student name: ");
                scanf(" %49[^\\n]", names[student_count]);  // Read until newline

                printf("Enter grade (0-100): ");
                scanf("%f", &grades[student_count]);

                if (grades[student_count] >= 0 && grades[student_count] <= 100) {
                    student_count++;
                    printf("Student added successfully!\\n");
                } else {
                    printf("Invalid grade! Must be 0-100.\\n");
                }
                break;
            }

            case '2':
                if (student_count == 0) {
                    printf("No students registered.\\n");
                } else {
                    printf("\\n=== Student Grades ===\\n");
                    for (int i = 0; i < student_count; i++) {
                        char grade_letter;
                        if (grades[i] >= 90) grade_letter = 'A';
                        else if (grades[i] >= 80) grade_letter = 'B';
                        else if (grades[i] >= 70) grade_letter = 'C';
                        else if (grades[i] >= 60) grade_letter = 'D';
                        else grade_letter = 'F';

                        printf("%-20s: %.1f (%c)\\n", names[i], grades[i], grade_letter);
                    }
                }
                break;

            case '3':
                if (student_count == 0) {
                    printf("No students to average.\\n");
                } else {
                    float sum = 0;
                    for (int i = 0; i < student_count; i++) {
                        sum += grades[i];
                    }
                    float average = sum / student_count;
                    printf("Class average: %.2f\\n", average);
                }
                break;

            case '4':
                if (student_count == 0) {
                    printf("No students registered.\\n");
                } else {
                    float highest = grades[0], lowest = grades[0];
                    int highest_idx = 0, lowest_idx = 0;

                    for (int i = 1; i < student_count; i++) {
                        if (grades[i] > highest) {
                            highest = grades[i];
                            highest_idx = i;
                        }
                        if (grades[i] < lowest) {
                            lowest = grades[i];
                            lowest_idx = i;
                        }
                    }

                    printf("Highest: %s (%.1f)\\n", names[highest_idx], highest);
                    printf("Lowest: %s (%.1f)\\n", names[lowest_idx], lowest);
                }
                break;

            case '5': {
                char search_name[MAX_NAME_LENGTH];
                printf("Enter student name to search: ");
                scanf(" %49[^\\n]", search_name);

                int found = 0;
                for (int i = 0; i < student_count; i++) {
                    if (strcmp(names[i], search_name) == 0) {
                        printf("Found: %s - Grade: %.1f\\n", names[i], grades[i]);
                        found = 1;
                        break;
                    }
                }

                if (!found) {
                    printf("Student not found.\\n");
                }
                break;
            }

            case '6':
                printf("Goodbye!\\n");
                break;

            default:
                printf("Invalid choice!\\n");
        }

        printf("\\n");
        while (getchar() != '\\n');  // Clear input buffer

    } while (choice != '6');

    return 0;
}
\`\`\`

---

## 🎮 Number Guessing Game

### **Interactive Game with Multiple Features**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void) {
    int secret_number, guess, attempts;
    int min_range = 1, max_range = 100;
    int max_attempts = 10;
    char play_again;

    srand(time(NULL));  // Seed random number generator

    printf("=== Number Guessing Game ===\\n\\n");

    do {
        // Generate secret number
        secret_number = rand() % (max_range - min_range + 1) + min_range;
        attempts = 0;
        int guessed_correctly = 0;

        printf("I'm thinking of a number between %d and %d.\\n", min_range, max_range);
        printf("You have %d attempts to guess it!\\n\\n", max_attempts);

        // Main guessing loop
        while (attempts < max_attempts && !guessed_correctly) {
            int valid_guess = 0;

            // Input validation
            while (!valid_guess) {
                printf("Attempt %d/%d - Enter your guess: ", attempts + 1, max_attempts);

                if (scanf("%d", &guess) == 1) {
                    if (guess >= min_range && guess <= max_range) {
                        valid_guess = 1;
                    } else {
                        printf("Please enter a number between %d and %d.\\n", min_range, max_range);
                    }
                } else {
                    printf("Invalid input! Please enter a number.\\n");
                    while (getchar() != '\\n');
                }
            }

            attempts++;

            // Check guess
            if (guess == secret_number) {
                guessed_correctly = 1;
                printf("\\n🎉 Congratulations! You guessed it in %d attempts!\\n", attempts);
            } else if (guess < secret_number) {
                printf("Too low! ");
                if (secret_number - guess <= 10) {
                    printf("You're getting warmer!\\n");
                } else {
                    printf("Try higher.\\n");
                }
            } else {
                printf("Too high! ");
                if (guess - secret_number <= 10) {
                    printf("You're getting warmer!\\n");
                } else {
                    printf("Try lower.\\n");
                }
            }

            // Provide hints based on attempts
            if (!guessed_correctly && attempts >= max_attempts / 2) {
                if (secret_number % 2 == 0) {
                    printf("Hint: The number is even.\\n");
                } else {
                    printf("Hint: The number is odd.\\n");
                }
            }
        }

        // Game over
        if (!guessed_correctly) {
            printf("\\n😞 Game over! The number was %d.\\n", secret_number);
        }

        // Statistics
        printf("\\n=== Game Statistics ===\\n");
        printf("Attempts used: %d\\n", attempts);
        printf("Max attempts: %d\\n", max_attempts);

        if (guessed_correctly) {
            if (attempts == 1) {
                printf("🎯 Perfect! First try!\\n");
            } else if (attempts <= 3) {
                printf("⭐ Excellent guessing!\\n");
            } else if (attempts <= 7) {
                printf("👍 Good job!\\n");
            } else {
                printf("🤏 You got it, but try to guess more efficiently next time!\\n");
            }
        }

        // Ask to play again
        printf("\\nPlay again? (y/n): ");
        scanf(" %c", &play_again);

        while (getchar() != '\\n');  // Clear input buffer

    } while (play_again == 'y' || play_again == 'Y');

    printf("\\nThanks for playing! Goodbye!\\n");
    return 0;
}
\`\`\`

---

## 📝 Pattern Printing Program

### **Multiple Patterns with Menu**

\`\`\`c
#include <stdio.h>

void print_square(int size) {
    for (int i = 0; i < size; i++) {
        for (int j = 0; j < size; j++) {
            printf("* ");
        }
        printf("\\n");
    }
}

void print_triangle(int size) {
    for (int i = 1; i <= size; i++) {
        for (int j = 1; j <= i; j++) {
            printf("* ");
        }
        printf("\\n");
    }
}

void print_pyramid(int size) {
    for (int i = 1; i <= size; i++) {
        // Print spaces
        for (int j = 1; j <= size - i; j++) {
            printf(" ");
        }
        // Print stars
        for (int j = 1; j <= 2 * i - 1; j++) {
            printf("*");
        }
        printf("\\n");
    }
}

void print_diamond(int size) {
    // Upper half
    for (int i = 1; i <= size; i++) {
        for (int j = 1; j <= size - i; j++) {
            printf(" ");
        }
        for (int j = 1; j <= 2 * i - 1; j++) {
            printf("*");
        }
        printf("\\n");
    }

    // Lower half
    for (int i = size - 1; i >= 1; i--) {
        for (int j = 1; j <= size - i; j++) {
            printf(" ");
        }
        for (int j = 1; j <= 2 * i - 1; j++) {
            printf("*");
        }
        printf("\\n");
    }
}

int main(void) {
    int choice, size;
    char continue_program = 'y';

    printf("=== Pattern Printing Program ===\\n\\n");

    while (continue_program == 'y' || continue_program == 'Y') {
        printf("Choose a pattern:\\n");
        printf("1. Square\\n");
        printf("2. Right Triangle\\n");
        printf("3. Pyramid\\n");
        printf("4. Diamond\\n");
        printf("5. Exit\\n");
        printf("Choice: ");
        scanf("%d", &choice);

        if (choice >= 1 && choice <= 4) {
            printf("Enter size (1-20): ");
            scanf("%d", &size);

            if (size < 1 || size > 20) {
                printf("Invalid size! Using size 5.\\n");
                size = 5;
            }

            printf("\\n");
            switch (choice) {
                case 1:
                    print_square(size);
                    break;
                case 2:
                    print_triangle(size);
                    break;
                case 3:
                    print_pyramid(size);
                    break;
                case 4:
                    print_diamond(size);
                    break;
            }
            printf("\\n");
        } else if (choice == 5) {
            printf("Goodbye!\\n");
            break;
        } else {
            printf("Invalid choice!\\n");
        }

        printf("Continue? (y/n): ");
        scanf(" %c", &continue_program);
        printf("\\n");
    }

    return 0;
}
\`\`\`

---

## 🏆 Temperature Analysis Program

### **Data Processing with Control Structures**

\`\`\`c
#include <stdio.h>
#include <limits.h>

#define MAX_READINGS 100

int main(void) {
    float temperatures[MAX_READINGS];
    int reading_count = 0;
    char choice;

    printf("=== Temperature Analysis Program ===\\n\\n");

    // Input temperature readings
    do {
        if (reading_count >= MAX_READINGS) {
            printf("Maximum readings reached!\\n");
            break;
        }

        printf("Enter temperature reading %d (or 'q' to finish): ", reading_count + 1);

        if (scanf("%f", &temperatures[reading_count]) == 1) {
            reading_count++;
        } else {
            // Check if user wants to quit
            char input[10];
            scanf("%s", input);
            if (input[0] == 'q' || input[0] == 'Q') {
                break;
            } else {
                printf("Invalid input! Please enter a number or 'q' to quit.\\n");
                while (getchar() != '\\n');
            }
        }
    } while (1);

    if (reading_count == 0) {
        printf("No readings entered. Program ending.\\n");
        return 0;
    }

    // Analyze the data
    float sum = 0, max_temp = temperatures[0], min_temp = temperatures[0];
    int max_idx = 0, min_idx = 0;
    int hot_days = 0, cold_days = 0, normal_days = 0;

    for (int i = 0; i < reading_count; i++) {
        sum += temperatures[i];

        if (temperatures[i] > max_temp) {
            max_temp = temperatures[i];
            max_idx = i;
        }

        if (temperatures[i] < min_temp) {
            min_temp = temperatures[i];
            min_idx = i;
        }

        // Categorize temperatures
        if (temperatures[i] >= 30) {
            hot_days++;
        } else if (temperatures[i] <= 10) {
            cold_days++;
        } else {
            normal_days++;
        }
    }

    float average = sum / reading_count;

    // Display results
    printf("\\n=== Temperature Analysis ===\\n");
    printf("Total readings: %d\\n", reading_count);
    printf("Average temperature: %.2f°C\\n", average);
    printf("Highest temperature: %.2f°C (reading %d)\\n", max_temp, max_idx + 1);
    printf("Lowest temperature: %.2f°C (reading %d)\\n", min_temp, min_idx + 1);

    printf("\\n=== Temperature Categories ===\\n");
    printf("Hot days (≥30°C): %d\\n", hot_days);
    printf("Cold days (≤10°C): %d\\n", cold_days);
    printf("Normal days: %d\\n", normal_days);

    // Additional analysis
    printf("\\n=== Detailed Analysis ===\\n");
    for (int i = 0; i < reading_count; i++) {
        printf("Reading %d: %.2f°C ", i + 1, temperatures[i]);

        if (temperatures[i] > average) {
            printf("(above average)");
        } else if (temperatures[i] < average) {
            printf("(below average)");
        } else {
            printf("(at average)");
        }

        if (i == max_idx) printf(" [HIGHEST]");
        if (i == min_idx) printf(" [LOWEST]");

        printf("\\n");
    }

    // Trend analysis
    int increasing = 0, decreasing = 0;
    for (int i = 1; i < reading_count; i++) {
        if (temperatures[i] > temperatures[i-1]) {
            increasing++;
        } else if (temperatures[i] < temperatures[i-1]) {
            decreasing++;
        }
    }

    printf("\\n=== Trend Analysis ===\\n");
    printf("Increasing periods: %d\\n", increasing);
    printf("Decreasing periods: %d\\n", decreasing);

    if (increasing > decreasing) {
        printf("Overall trend: Temperatures are rising\\n");
    } else if (decreasing > increasing) {
        printf("Overall trend: Temperatures are falling\\n");
    } else {
        printf("Overall trend: Temperatures are stable\\n");
    }

    return 0;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Combine control structures** for complex program logic
2. **Use loops for input validation** and repetitive tasks
3. **Apply conditional statements** for decision making
4. **Utilize switch statements** for menu systems
5. **Implement proper error handling** with input validation
6. **Break down complex problems** into manageable functions
7. **Use arrays and loops** together for data processing
8. **Create interactive programs** with user input and feedback

You've now mastered control structures - the building blocks of C programming! 🎯✨`;
    return contentString;
  })()
};
