import { SubLesson } from '../../../data/lessonsData';

export const topic_3_6: SubLesson = {
  id: 3.6,
  title: 'break and continue Statements',
  status: 'completed',
  content: `# 🎛️ break and continue Statements

Learn how to control loop execution flow using break and continue statements to exit loops or skip iterations.

---

## 🛑 break Statement

### Basic Usage
**Immediately exits the loop, regardless of the loop condition**

\`\`\`c
while (condition) {
    // Code before break

    if (some_condition) {
        break;  // Exit loop immediately
    }

    // Code after break (not executed if break triggered)
}
\`\`\`

### Simple break Example
\`\`\`c
#include <stdio.h>

int main() {
    int i;

    printf("Counting to 10, but stopping at 5:\\n");

    for (i = 1; i <= 10; i++) {
        printf("%d ", i);

        if (i == 5) {
            printf("\\nReached 5, stopping!\\n");
            break;  // Exit the loop
        }
    }

    printf("Loop ended.\\n");
    return 0;
}
\`\`\`

**Output:**
\`\`\`
Counting to 10, but stopping at 5:
1 2 3 4 5
Reached 5, stopping!
Loop ended.
\`\`\`

---

## ⏭️ continue Statement

### Basic Usage
**Skips the rest of the current iteration and moves to the next iteration**

\`\`\`c
while (condition) {
    // Code before continue

    if (skip_condition) {
        continue;  // Skip to next iteration
    }

    // Code after continue (skipped if continue triggered)
}
\`\`\`

### Simple continue Example
\`\`\`c
#include <stdio.h>

int main() {
    int i;

    printf("Numbers 1-10, skipping multiples of 3:\\n");

    for (i = 1; i <= 10; i++) {
        if (i % 3 == 0) {
            continue;  // Skip multiples of 3
        }

        printf("%d ", i);
    }

    printf("\\n");
    return 0;
}
\`\`\`

**Output:**
\`\`\`
Numbers 1-10, skipping multiples of 3:
1 2 4 5 7 8 10
\`\`\`

---

## 🧪 Practical Examples

### Search with Early Exit
\`\`\`c
#include <stdio.h>

int main() {
    int numbers[] = {12, 45, 23, 67, 89, 34};
    int search_value = 67;
    int found = 0;

    for (int i = 0; i < 6; i++) {
        if (numbers[i] == search_value) {
            printf("Found %d at index %d\\n", search_value, i);
            found = 1;
            break;  // No need to search further
        }
    }

    if (!found) {
        printf("%d not found in array\\n", search_value);
    }

    return 0;
}
\`\`\`

### Skip Invalid Data
\`\`\`c
#include <stdio.h>

int main() {
    int scores[5];
    int valid_count = 0;

    printf("Enter 5 test scores (0-100):\\n");

    for (int i = 0; i < 5; i++) {
        int score;
        scanf("%d", &score);

        // Skip invalid scores
        if (score < 0 || score > 100) {
            printf("Invalid score %d, skipping...\\n", score);
            continue;
        }

        scores[valid_count] = score;
        valid_count++;
    }

    printf("\\nValid scores entered: %d\\n", valid_count);
    return 0;
}
\`\`\`

### Menu System with Exit
\`\`\`c
#include <stdio.h>

int main() {
    int choice;

    while (1) {  // Infinite loop
        printf("\\n=== Calculator Menu ===\\n");
        printf("1. Add\\n");
        printf("2. Subtract\\n");
        printf("3. Exit\\n");
        printf("Enter choice: ");
        scanf("%d", &choice);

        if (choice == 3) {
            printf("Goodbye!\\n");
            break;  // Exit the menu loop
        }

        // Process other choices...
        switch (choice) {
            case 1:
                printf("Addition selected\\n");
                break;
            case 2:
                printf("Subtraction selected\\n");
                break;
            default:
                printf("Invalid choice\\n");
        }
    }

    return 0;
}
\`\`\`

---

## 🔄 break and continue in Different Loops

### In for Loops
\`\`\`c
for (int i = 0; i < 10; i++) {
    if (i == 3) {
        continue;  // Skip i=3, but continue counting
    }

    if (i == 7) {
        break;    // Exit loop when i=7
    }

    printf("%d ", i);
}
// Output: 0 1 2 4 5 6
\`\`\`

### In while Loops
\`\`\`c
int i = 0;
while (i < 10) {
    i++;

    if (i % 2 == 0) {
        continue;  // Skip even numbers
    }

    if (i > 7) {
        break;    // Stop after 7
    }

    printf("%d ", i);
}
// Output: 1 3 5 7
\`\`\`

### In do-while Loops
\`\`\`c
int num;
do {
    printf("Enter a positive number (0 to exit): ");
    scanf("%d", &num);

    if (num < 0) {
        printf("Negative number, try again\\n");
        continue;  // Skip rest and ask again
    }

    if (num == 0) {
        break;    // Exit the loop
    }

    printf("You entered: %d\\n", num);

} while (1);  // Infinite loop, controlled by break
\`\`\`

---

## 🏗️ Nested Loops with break and continue

### Breaking Out of Nested Loops
\`\`\`c
#include <stdio.h>

int main() {
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 3; j++) {
            if (i == 2 && j == 2) {
                printf("Breaking at i=%d, j=%d\\n", i, j);
                goto exit_loops;  // Need goto for nested break
            }
            printf("i=%d, j=%d\\n", i, j);
        }
    }

    exit_loops:
    printf("Exited nested loops\\n");

    return 0;
}
\`\`\`

### Using Flag Variables
\`\`\`c
#include <stdio.h>

int main() {
    int found = 0;

    for (int i = 1; i <= 5 && !found; i++) {
        for (int j = 1; j <= 5; j++) {
            if (i == 3 && j == 3) {
                printf("Found at i=%d, j=%d\\n", i, j);
                found = 1;
                break;  // Break inner loop
            }
            printf("Checking i=%d, j=%d\\n", i, j);
        }
    }

    return 0;
}
\`\`\`

---

## 🐛 Common Mistakes and Solutions

### break in switch vs break in loop
\`\`\`c
// ✅ Correct: break in switch
switch (choice) {
    case 1:
        printf("One\\n");
        break;  // Exits switch
    case 2:
        printf("Two\\n");
        break;
}

// ✅ Correct: break in loop
for (int i = 0; i < 10; i++) {
    if (i == 5) {
        break;  // Exits loop
    }
    printf("%d ", i);
}
\`\`\`

### continue After Critical Code
\`\`\`c
// ❌ Wrong: continue skips important cleanup
for (int i = 0; i < 10; i++) {
    process_data(i);

    if (error_condition) {
        continue;  // Skips cleanup!
    }

    cleanup_data(i);  // Never executed when error
}

// ✅ Correct: structure the code properly
for (int i = 0; i < 10; i++) {
    process_data(i);

    if (!error_condition) {
        cleanup_data(i);
    }
}
\`\`\`

### Multiple breaks in Complex Logic
\`\`\`c
// ❌ Confusing multiple breaks
while (condition1) {
    if (condition2) {
        break;
    }
    // More code...
    if (condition3) {
        break;
    }
}

// ✅ Clearer with single exit point
while (condition1) {
    int should_break = 0;

    if (condition2) {
        should_break = 1;
    }

    // More code...

    if (condition3) {
        should_break = 1;
    }

    if (should_break) {
        break;
    }
}
\`\`\`

---

## 💡 Best Practices

### Use break for Early Exit
\`\`\`c
// ✅ Good: early exit when found
for (int i = 0; i < size; i++) {
    if (array[i] == target) {
        found_index = i;
        break;  // Found it, no need to search more
    }
}
\`\`\`

### Use continue for Skipping
\`\`\`c
// ✅ Good: skip invalid items
for (int i = 0; i < size; i++) {
    if (array[i] < 0) {
        continue;  // Skip negative values
    }
    process_positive_value(array[i]);
}
\`\`\`

### Avoid Deep Nesting with break
\`\`\`c
// ✅ Good: shallow nesting
int found = 0;
for (int i = 0; i < rows && !found; i++) {
    for (int j = 0; j < cols; j++) {
        if (matrix[i][j] == target) {
            found = 1;
            break;
        }
    }
}
\`\`\`

### Comment break and continue
\`\`\`c
while (processing_data) {
    read_next_item();

    if (item_is_invalid) {
        continue;  // Skip invalid items and try next
    }

    process_item();

    if (enough_items_processed) {
        break;  // We have enough data, stop processing
    }
}
\`\`\`

---

## 🧪 Advanced Examples

### Prime Number Generator with continue
\`\`\`c
#include <stdio.h>
#include <stdbool.h>

int main() {
    int limit = 50;

    printf("Prime numbers up to %d:\\n", limit);

    for (int num = 2; num <= limit; num++) {
        bool is_prime = true;

        // Check if num is divisible by any number less than itself
        for (int divisor = 2; divisor * divisor <= num; divisor++) {
            if (num % divisor == 0) {
                is_prime = false;
                break;  // No need to check further divisors
            }
        }

        if (!is_prime) {
            continue;  // Skip non-prime numbers
        }

        printf("%d ", num);
    }

    printf("\\n");
    return 0;
}
\`\`\`

### Input Validation with break
\`\`\`c
#include <stdio.h>

int main() {
    const int MAX_ATTEMPTS = 3;
    int attempts = 0;
    char password[20];

    printf("Enter password (max %d attempts):\\n", MAX_ATTEMPTS);

    while (attempts < MAX_ATTEMPTS) {
        attempts++;

        printf("Attempt %d: ", attempts);
        scanf("%s", password);

        // Simple password check
        if (strcmp(password, "secret123") == 0) {
            printf("Access granted!\\n");
            break;  // Success, exit loop
        } else {
            printf("Wrong password.\\n");

            if (attempts < MAX_ATTEMPTS) {
                printf("Try again.\\n");
            } else {
                printf("Too many failed attempts. Access denied.\\n");
            }
        }
    }

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **break** immediately exits the current loop
2. **continue** skips to the next iteration of the loop
3. **break** is useful for early exit when condition is met
4. **continue** is useful for skipping invalid or unwanted items
5. **Both work** in for, while, and do-while loops
6. **Use flag variables** to break out of nested loops cleanly
7. **Comment break and continue** statements for clarity

---

## 🚀 Preview: Nested Control Structures

In the next topic, you'll learn about:
- **Nested if statements** inside loops
- **Nested loops** for multi-dimensional processing
- **Complex control flow** patterns
- **Best practices** for nested structures

**break and continue control single loops - nested structures create complex program logic!** 🏗️`
};
