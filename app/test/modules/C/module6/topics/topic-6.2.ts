import { SubLesson } from '../../../../data/lessonsData';

export const topic_6_2: SubLesson = {
  id: "6.2",
  title: 'String Input/Output Functions',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 📥📤 String Input/Output Functions in C

C provides several functions for reading and writing strings. Understanding these functions and their limitations is crucial for safe string handling.

---

## 📥 String Input Functions

### **scanf() with %s**

\`\`\`c
#include <stdio.h>

int main(void) {
    char name[50];

    printf("Enter your name: ");
    scanf("%s", name);  // Reads until whitespace

    printf("Hello, %s!\\n", name);

    return 0;
}
\`\`\`

**Limitations of scanf with %s:**
- Stops at whitespace (space, tab, newline)
- No buffer overflow protection
- Can leave newline in input buffer

---

### **fgets() - Safe String Input**

\`\`\`c
#include <stdio.h>

int main(void) {
    char buffer[100];

    printf("Enter a line of text: ");
    if (fgets(buffer, sizeof(buffer), stdin) != NULL) {
        printf("You entered: %s", buffer);
    }

    return 0;
}
\`\`\`

**fgets() advantages:**
- Reads entire line including spaces
- Built-in buffer overflow protection
- Includes newline character in buffer

---

### **Removing Newline from fgets()**

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char buffer[100];

    printf("Enter text: ");
    if (fgets(buffer, sizeof(buffer), stdin) != NULL) {
        // Remove trailing newline
        size_t len = strlen(buffer);
        if (len > 0 && buffer[len - 1] == '\\n') {
            buffer[len - 1] = '\\0';
        }

        printf("Cleaned input: %s\\n", buffer);
        printf("Length: %zu\\n", strlen(buffer));
    }

    return 0;
}
\`\`\`

---

### **gets() - DANGEROUS (Don't Use!)**

\`\`\`c
// DON'T USE gets() - it's extremely dangerous!
#include <stdio.h>

int main(void) {
    char buffer[20];

    // gets() has no buffer size limit - CRASH RISK!
    // gets(buffer);  // NEVER USE THIS!

    // Use fgets() instead
    fgets(buffer, sizeof(buffer), stdin);
    printf("Safe input: %s", buffer);

    return 0;
}
\`\`\`

---

## 📤 String Output Functions

### **printf() with %s**

\`\`\`c
#include <stdio.h>

int main(void) {
    char name[] = "Alice";

    // Basic string output
    printf("Name: %s\\n", name);

    // Field width
    printf("Name (10 chars): '%10s'\\n", name);
    printf("Name (left align): '%-10s'\\n", name);

    // Precision (limit characters)
    printf("Name (first 3): '%.3s'\\n", name);

    return 0;
}
\`\`\`

---

### **puts() - Simple String Output**

\`\`\`c
#include <stdio.h>

int main(void) {
    char message[] = "Hello, World!";

    puts(message);  // Automatically adds newline
    puts("Another line");

    return 0;
}
\`\`\`

**puts() vs printf():**
- puts() automatically adds newline
- puts() is slightly faster for simple strings
- printf() offers formatting options

---

### **fputs() - File Output**

\`\`\`c
#include <stdio.h>

int main(void) {
    char text[] = "This goes to a file";

    FILE *file = fopen("output.txt", "w");
    if (file != NULL) {
        fputs(text, file);
        fputs("\\n", file);  // Manual newline
        fclose(file);
        printf("Text written to file\\n");
    }

    return 0;
}
\`\`\`

---

## 🔄 Safe Input Patterns

### **Pattern 1: scanf with Width Limit**

\`\`\`c
#include <stdio.h>

int main(void) {
    char name[20];

    printf("Enter name (max 19 chars): ");
    scanf("%19s", name);  // Limit input to prevent overflow

    printf("Hello, %s!\\n", name);

    return 0;
}
\`\`\`

---

### **Pattern 2: fgets + sscanf**

\`\`\`c
#include <stdio.h>

int main(void) {
    char buffer[100];
    char name[50];
    int age;

    printf("Enter name and age: ");
    if (fgets(buffer, sizeof(buffer), stdin) != NULL) {
        // Parse from buffer safely
        if (sscanf(buffer, "%49s %d", name, age) == 2) {
            printf("Name: %s, Age: %d\\n", name, age);
        } else {
            printf("Invalid input format\\n");
        }
    }

    return 0;
}
\`\`\`

---

### **Pattern 3: Input Validation Loop**

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

void get_valid_string(char *buffer, size_t size, const char *prompt) {
    while (1) {
        printf("%s", prompt);
        if (fgets(buffer, size, stdin) == NULL) {
            break;  // EOF
        }

        // Remove trailing newline
        size_t len = strlen(buffer);
        if (len > 0 && buffer[len - 1] == '\\n') {
            buffer[len - 1] = '\\0';
            len--;
        }

        // Check if input was too long (truncated)
        if (len == size - 1 && buffer[len - 1] != '\\n') {
            printf("Input too long! Try again.\\n");
            // Clear remaining input
            int c;
            while ((c = getchar()) != '\\n' && c != EOF);
            continue;
        }

        // Check for empty input
        if (len == 0) {
            printf("Input cannot be empty! Try again.\\n");
            continue;
        }

        break;  // Valid input
    }
}

int main(void) {
    char name[50];

    get_valid_string(name, sizeof(name), "Enter your name: ");
    printf("Hello, %s!\\n", name);

    return 0;
}
\`\`\`

---

## 📊 Reading Multiple Strings

### **Reading Words with scanf**

\`\`\`c
#include <stdio.h>

int main(void) {
    char word1[20], word2[20], word3[20];

    printf("Enter three words: ");
    int count = scanf("%19s %19s %19s", word1, word2, word3);

    printf("Read %d words:\\n", count);
    printf("1: %s\\n", word1);
    printf("2: %s\\n", word2);
    printf("3: %s\\n", word3);

    return 0;
}
\`\`\`

---

### **Reading Entire Lines**

\`\`\`c
#include <stdio.h>

int main(void) {
    char lines[5][100];  // Array of strings
    int line_count = 0;

    printf("Enter up to 5 lines (empty line to stop):\\n");

    while (line_count < 5) {
        printf("Line %d: ", line_count + 1);
        if (fgets(lines[line_count], sizeof(lines[line_count]), stdin) == NULL) {
            break;
        }

        // Check for empty line
        if (lines[line_count][0] == '\\n') {
            break;
        }

        line_count++;
    }

    printf("\\nYou entered %d lines:\\n", line_count);
    for (int i = 0; i < line_count; i++) {
        printf("%d: %s", i + 1, lines[i]);
    }

    return 0;
}
\`\`\`

---

## 🎯 Practical Examples

### **Example 1: User Registration Form**

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

#define MAX_NAME 50
#define MAX_EMAIL 100

void get_string_safe(char *buffer, size_t size, const char *prompt) {
    while (1) {
        printf("%s", prompt);
        if (fgets(buffer, size, stdin) == NULL) {
            *buffer = '\\0';
            return;
        }

        // Remove newline
        size_t len = strlen(buffer);
        if (len > 0 && buffer[len - 1] == '\\n') {
            buffer[len - 1] = '\\0';
        }

        if (strlen(buffer) > 0) {
            break;  // Valid input
        }
        printf("Input cannot be empty.\\n");
    }
}

int validate_email(const char *email) {
    return strchr(email, '@') != NULL && strchr(email, '.') != NULL;
}

int main(void) {
    char first_name[MAX_NAME];
    char last_name[MAX_NAME];
    char email[MAX_EMAIL];
    int age;

    printf("=== User Registration ===\\n\\n");

    get_string_safe(first_name, sizeof(first_name), "First name: ");
    get_string_safe(last_name, sizeof(last_name), "Last name: ");
    get_string_safe(email, sizeof(email), "Email: ");

    // Validate email
    while (!validate_email(email)) {
        printf("Invalid email format. Please include @ and .\\n");
        get_string_safe(email, sizeof(email), "Email: ");
    }

    // Get age with validation
    char age_str[10];
    while (1) {
        get_string_safe(age_str, sizeof(age_str), "Age: ");
        if (sscanf(age_str, "%d", &age) == 1 && age >= 0 && age <= 150) {
            break;
        }
        printf("Please enter a valid age (0-150).\\n");
    }

    // Display registration summary
    printf("\\n=== Registration Complete ===\\n");
    printf("Name: %s %s\\n", first_name, last_name);
    printf("Email: %s\\n", email);
    printf("Age: %d\\n", age);
    printf("\\nThank you for registering!\\n");

    return 0;
}
\`\`\`

### **Example 2: Command Line Interface**

\`\`\`c
#include <stdio.h>
#include <string.h>

#define MAX_COMMAND 100

void process_command(const char *command) {
    if (strcmp(command, "help") == 0) {
        printf("Available commands:\\n");
        printf("  help    - Show this help\\n");
        printf("  quit    - Exit program\\n");
        printf("  hello   - Print greeting\\n");
    } else if (strcmp(command, "hello") == 0) {
        printf("Hello! How can I help you?\\n");
    } else if (strcmp(command, "quit") == 0) {
        printf("Goodbye!\\n");
    } else {
        printf("Unknown command: %s\\n", command);
        printf("Type 'help' for available commands.\\n");
    }
}

int main(void) {
    char command[MAX_COMMAND];

    printf("Simple CLI - Type 'help' for commands\\n");

    while (1) {
        printf("> ");
        if (fgets(command, sizeof(command), stdin) == NULL) {
            break;
        }

        // Remove newline
        size_t len = strlen(command);
        if (len > 0 && command[len - 1] == '\\n') {
            command[len - 1] = '\\0';
        }

        // Skip empty commands
        if (strlen(command) == 0) {
            continue;
        }

        // Process command
        process_command(command);

        // Check for quit
        if (strcmp(command, "quit") == 0) {
            break;
        }
    }

    return 0;
}
\`\`\`

### **Example 3: File Processing**

\`\`\`c
#include <stdio.h>
#include <string.h>

#define MAX_LINE 256

int count_words(const char *line) {
    int count = 0;
    int in_word = 0;

    for (size_t i = 0; line[i] != '\\0'; i++) {
        if (line[i] != ' ' && line[i] != '\\t' && line[i] != '\\n') {
            if (!in_word) {
                count++;
                in_word = 1;
            }
        } else {
            in_word = 0;
        }
    }

    return count;
}

int main(void) {
    char filename[100];
    char line[MAX_LINE];
    FILE *file;
    int line_count = 0;
    int word_count = 0;
    int char_count = 0;

    printf("Enter filename to analyze: ");
    if (fgets(filename, sizeof(filename), stdin) == NULL) {
        return 1;
    }

    // Remove newline
    size_t len = strlen(filename);
    if (len > 0 && filename[len - 1] == '\\n') {
        filename[len - 1] = '\\0';
    }

    file = fopen(filename, "r");
    if (file == NULL) {
        printf("Cannot open file: %s\\n", filename);
        return 1;
    }

    while (fgets(line, sizeof(line), file) != NULL) {
        line_count++;
        word_count += count_words(line);
        char_count += strlen(line);
    }

    fclose(file);

    printf("\\nFile Analysis:\\n");
    printf("Lines: %d\\n", line_count);
    printf("Words: %d\\n", word_count);
    printf("Characters: %d\\n", char_count);

    return 0;
}
\`\`\`

---

## ⚠️ Common I/O Mistakes

### **Mistake 1: Buffer Overflow with scanf**

\`\`\`c
// ❌ Dangerous: No width limit
char name[10];
scanf("%s", name);  // Can overflow!

// ✅ Safe: Width limit
scanf("%9s", name);  // Max 9 chars + null
\`\`\`

### **Mistake 2: scanf Leaving Newline**

\`\`\`c
// ❌ scanf leaves newline, fgets reads empty line
int num;
char str[20];

scanf("%d", &num);
fgets(str, sizeof(str), stdin);  // Gets empty line!

// ✅ Clear input buffer
scanf("%d", &num);
int c;
while ((c = getchar()) != '\\n' && c != EOF);
fgets(str, sizeof(str), stdin);
\`\`\`

### **Mistake 3: fgets Null Terminator**

\`\`\`c
// ❌ fgets may not null terminate if line is too long
char buffer[10];
fgets(buffer, sizeof(buffer), stdin);
// If input >= 10 chars, no null terminator!

// ✅ Always ensure null termination
char buffer[10];
if (fgets(buffer, sizeof(buffer), stdin) != NULL) {
    buffer[sizeof(buffer) - 1] = '\\0';  // Force null termination
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Use fgets()** for safe string input (not gets())
2. **Always specify width limits** with scanf format specifiers
3. **Remove trailing newlines** from fgets() input
4. **Validate input** before using it in your program
5. **Clear input buffer** after scanf to prevent issues
6. **Use puts()** for simple string output, printf() for formatted output
7. **Handle buffer overflows** by checking input length

Safe string I/O prevents crashes and security vulnerabilities! 📥📤✨`;
    return contentString;
  })()
};
