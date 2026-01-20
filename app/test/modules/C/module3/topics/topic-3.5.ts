import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_5: SubLesson = {
  id: "3.5",
  title: 'Break, Continue & Goto Statements',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🛑 Break, Continue & Goto Statements

Control flow statements allow you to alter the normal execution sequence of your programs. While \`break\` and \`continue\` are commonly used and generally safe, \`goto\` should be used sparingly and with caution.

---

## 🛑 \`break\` Statement

### **Exiting Loops**

The \`break\` statement immediately exits the innermost loop or switch statement:

\`\`\`c
#include <stdio.h>

int main(void) {
    printf("Finding first even number:\\n");

    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) {
            printf("Found: %d\\n", i);
            break;  // Exit loop immediately
        }
        printf("Checking: %d\\n", i);
    }

    printf("Loop ended\\n");
    return 0;
}
\`\`\`

**Output:**
\`\`\`
Finding first even number:
Checking: 1
Found: 2
Loop ended
\`\`\`

### **Exiting Switch Statements**

\`\`\`c
#include <stdio.h>

int main(void) {
    int choice = 2;

    switch (choice) {
        case 1:
            printf("Option 1\\n");
            break;
        case 2:
            printf("Option 2\\n");
            break;  // Exit switch
        case 3:
            printf("Option 3\\n");
            break;
        default:
            printf("Invalid option\\n");
    }

    return 0;
}
\`\`\`

### **Breaking Out of Nested Loops**

\`\`\`c
#include <stdio.h>

int main(void) {
    printf("Finding coordinates (2,3):\\n");

    for (int i = 1; i <= 5; i++) {
        for (int j = 1; j <= 5; j++) {
            printf("(%d,%d) ", i, j);

            if (i == 2 && j == 3) {
                printf("\\nFound target!\\n");
                goto exit_loops;  // Break out of both loops
            }
        }
        printf("\\n");
    }

    exit_loops:
    printf("Search complete\\n");

    return 0;
}
\`\`\`

---

## ⏭️ \`continue\` Statement

### **Skipping Iterations**

The \`continue\` statement skips the rest of the current iteration and moves to the next:

\`\`\`c
#include <stdio.h>

int main(void) {
    printf("Numbers 1-10, skipping multiples of 3:\\n");

    for (int i = 1; i <= 10; i++) {
        if (i % 3 == 0) {
            continue;  // Skip multiples of 3
        }
        printf("%d ", i);
    }

    printf("\\nDone\\n");
    return 0;
}
\`\`\`

**Output:**
\`\`\`
Numbers 1-10, skipping multiples of 3:
1 2 4 5 7 8 10
Done
\`\`\`

### **Input Validation Example**

\`\`\`c
#include <stdio.h>

int main(void) {
    int number;
    int validCount = 0;

    printf("Enter 5 positive numbers:\\n");

    for (int i = 1; i <= 5; i++) {
        printf("Number %d: ", i);
        scanf("%d", &number);

        if (number <= 0) {
            printf("Invalid! Must be positive.\\n");
            i--;  // Decrement counter to retry
            continue;
        }

        validCount++;
        printf("Accepted: %d\\n", number);
    }

    printf("Total valid numbers: %d\\n", validCount);
    return 0;
}
\`\`\`

---

## 🏃 \`goto\` Statement

### **Basic goto Usage**

The \`goto\` statement jumps to a labeled statement. Use with extreme caution!

\`\`\`c
#include <stdio.h>

int main(void) {
    int x = 5;

    if (x > 0) {
        goto positive;
    } else {
        goto negative;
    }

    positive:
        printf("x is positive\\n");
        goto end;

    negative:
        printf("x is negative\\n");
        goto end;

    end:
        printf("Program end\\n");

    return 0;
}
\`\`\`

### **Error Handling with goto**

\`\`\`c
#include <stdio.h>

int main(void) {
    int *ptr = NULL;
    int data = 0;

    // Simulate resource allocation
    if ((ptr = malloc(sizeof(int))) == NULL) {
        goto cleanup;
    }

    // Simulate data processing
    *ptr = 42;
    data = *ptr * 2;

    printf("Result: %d\\n", data);

    cleanup:
        if (ptr != NULL) {
            free(ptr);
            printf("Memory freed\\n");
        }

    return 0;
}
\`\`\`

---

## 🎯 Practical Examples

### **Example 1: Prime Number Finder with break**

\`\`\`c
#include <stdio.h>

int main(void) {
    int n, isPrime = 1;

    printf("Enter a number: ");
    scanf("%d", &n);

    if (n <= 1) {
        isPrime = 0;
    } else {
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                isPrime = 0;
                break;  // No need to check further
            }
        }
    }

    if (isPrime) {
        printf("%d is prime\\n", n);
    } else {
        printf("%d is not prime\\n", n);
    }

    return 0;
}
\`\`\`

### **Example 2: Menu System with continue**

\`\`\`c
#include <stdio.h>

int main(void) {
    int choice;
    int balance = 1000;

    while (1) {  // Infinite loop
        printf("\\n=== Bank Menu ===\\n");
        printf("1. Check Balance\\n");
        printf("2. Deposit\\n");
        printf("3. Withdraw\\n");
        printf("4. Exit\\n");
        printf("Choice: ");
        scanf("%d", &choice);

        if (choice == 4) {
            break;  // Exit program
        }

        switch (choice) {
            case 1:
                printf("Balance: $%d\\n", balance);
                break;
            case 2: {
                int amount;
                printf("Deposit amount: ");
                scanf("%d", &amount);
                if (amount <= 0) {
                    printf("Invalid amount\\n");
                    continue;  // Skip to next menu iteration
                }
                balance += amount;
                printf("New balance: $%d\\n", balance);
                break;
            }
            case 3: {
                int amount;
                printf("Withdraw amount: ");
                scanf("%d", &amount);
                if (amount <= 0 || amount > balance) {
                    printf("Invalid amount\\n");
                    continue;  // Skip to next menu iteration
                }
                balance -= amount;
                printf("New balance: $%d\\n", balance);
                break;
            }
            default:
                printf("Invalid choice\\n");
                continue;  // Skip to next menu iteration
        }
    }

    printf("Goodbye!\\n");
    return 0;
}
\`\`\`

### **Example 3: Input Validation with goto**

\`\`\`c
#include <stdio.h>

int main(void) {
    int age;
    char name[50];

    input_name:
        printf("Enter your name: ");
        if (scanf("%49s", name) != 1) {
            printf("Invalid input\\n");
            while (getchar() != '\\n');  // Clear input buffer
            goto input_name;
        }

    input_age:
        printf("Enter your age (0-120): ");
        if (scanf("%d", &age) != 1 || age < 0 || age > 120) {
            printf("Invalid age\\n");
            while (getchar() != '\\n');  // Clear input buffer
            goto input_age;
        }

    printf("\\nHello %s, you are %d years old!\\n", name, age);
    return 0;
}
\`\`\`

---

## ⚠️ When to Use Control Statements

### **break**
✅ **Good uses:**
- Exiting loops when condition is met
- Exiting switch statements
- Breaking out of nested loops (with goto if needed)

❌ **Avoid:**
- As a substitute for proper loop conditions
- Multiple breaks in same loop (confusing)

### **continue**
✅ **Good uses:**
- Skipping invalid data in loops
- Skipping certain iterations based on conditions
- Input validation loops

❌ **Avoid:**
- In complex nested loops (hard to follow)
- When it makes logic unclear

### **goto**
✅ **Good uses:**
- Breaking out of deeply nested loops
- Error handling and cleanup
- State machines (rare)

❌ **Avoid:**
- As general program flow control
- Creating "spaghetti code"
- When break/continue would work

---

## 🔧 Best Practices

### **Prefer Structured Programming**

\`\`\`c
// ❌ Using goto for general flow
int main(void) {
    goto start;
    middle:
        printf("Middle\\n");
        goto end;
    start:
        printf("Start\\n");
        goto middle;
    end:
        printf("End\\n");
        return 0;
}

// ✅ Using structured programming
int main(void) {
    printf("Start\\n");
    printf("Middle\\n");
    printf("End\\n");
    return 0;
}
\`\`\`

### **Use break/continue Appropriately**

\`\`\`c
// ✅ Good use of break
for (int i = 0; i < 1000; i++) {
    if (found_target) {
        break;  // Exit early when found
    }
    // Process item
}

// ✅ Good use of continue
while (processing_data) {
    read_next_item();
    if (item_is_invalid) {
        continue;  // Skip invalid items
    }
    process_item();
}
\`\`\`

### **Limit goto Scope**

\`\`\`c
// ✅ Acceptable goto usage (limited scope)
int find_element(int arr[], int size, int target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) {
            goto found;
        }
    }
    return -1;  // Not found

    found:
        return i;  // Found at index i
}
\`\`\`

---

## 🎓 Key Takeaways

1. **\`break\`** exits the innermost loop or switch statement
2. **\`continue\`** skips current iteration and continues the loop
3. **\`goto\`** jumps to a labeled statement (use sparingly)
4. **Control statements** alter normal program flow
5. **Prefer structured programming** over goto when possible
6. **Use break/continue** for clarity in loops
7. **Limit goto** to specific scenarios like error handling

Use control statements wisely to write clear, maintainable code! 🛑⏭️🏃✨`;
    return contentString;
  })()
};
