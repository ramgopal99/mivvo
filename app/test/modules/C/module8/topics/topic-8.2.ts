import { SubLesson } from '../../../../data/lessonsData';

export const topic_8_2: SubLesson = {
  id: "8.2",
  title: 'Text File Operations',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 📄 Text File Operations in C

Text files store human-readable data and are essential for data exchange, configuration files, and user data storage. C provides powerful functions for reading and writing text files.

---

## 📖 Text File Reading Functions

### **fgets() - Read Line by Line**

Reads a line from a file, including the newline character:

\`\`\`c
#include <stdio.h>

int main(void) {
    FILE *file = fopen("data.txt", "r");

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    char buffer[100];

    // Read lines from file
    while (fgets(buffer, sizeof(buffer), file) != NULL) {
        printf("Read: %s", buffer);  // fgets includes newline
    }

    fclose(file);

    return 0;
}
\`\`\`

### **fscanf() - Formatted Input**

Reads formatted data from file, similar to scanf():

\`\`\`c
#include <stdio.h>

int main(void) {
    FILE *file = fopen("students.txt", "r");

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    char name[50];
    int age;
    float gpa;

    // Read formatted data
    while (fscanf(file, "%s %d %f", name, &age, &gpa) != EOF) {
        printf("Student: %s, Age: %d, GPA: %.2f\\n", name, age, gpa);
    }

    fclose(file);

    return 0;
}
\`\`\`

### **fgetc() - Character by Character**

Reads one character at a time:

\`\`\`c
#include <stdio.h>

int main(void) {
    FILE *file = fopen("letter.txt", "r");

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    int ch;
    int char_count = 0;

    // Read character by character
    while ((ch = fgetc(file)) != EOF) {
        putchar(ch);  // Echo to screen
        char_count++;
    }

    printf("\\nTotal characters: %d\\n", char_count);

    fclose(file);

    return 0;
}
\`\`\`

---

## ✍️ Text File Writing Functions

### **fputs() - Write String**

Writes a string to file:

\`\`\`c
#include <stdio.h>

int main(void) {
    FILE *file = fopen("message.txt", "w");

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    // Write strings to file
    fputs("Hello, World!\\n", file);
    fputs("This is a text file.\\n", file);
    fputs("Created with fputs() function.\\n", file);

    fclose(file);
    printf("Text written to file.\\n");

    return 0;
}
\`\`\`

### **fprintf() - Formatted Output**

Writes formatted data to file:

\`\`\`c
#include <stdio.h>

int main(void) {
    FILE *file = fopen("report.txt", "w");

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    char *products[] = {"Laptop", "Mouse", "Keyboard"};
    int quantities[] = {5, 20, 15};
    float prices[] = {999.99, 25.50, 75.00};

    // Write formatted report
    fprintf(file, "Product Inventory Report\\n");
    fprintf(file, "========================\\n\\n");

    for (int i = 0; i < 3; i++) {
        fprintf(file, "%-12s Quantity: %2d Price: $%7.2f Total: $%9.2f\\n",
                products[i], quantities[i], prices[i],
                quantities[i] * prices[i]);
    }

    fclose(file);
    printf("Report generated.\\n");

    return 0;
}
\`\`\`

### **fputc() - Character Output**

Writes single characters:

\`\`\`c
#include <stdio.h>

int main(void) {
    FILE *file = fopen("alphabet.txt", "w");

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    // Write alphabet to file
    for (char ch = 'A'; ch <= 'Z'; ch++) {
        fputc(ch, file);
        fputc('\\n', file);
    }

    fclose(file);
    printf("Alphabet written to file.\\n");

    return 0;
}
\`\`\`

---

## 🔄 Reading and Writing Examples

### **Copy Text File**

\`\`\`c
#include <stdio.h>

int main(void) {
    FILE *source = fopen("source.txt", "r");
    FILE *destination = fopen("copy.txt", "w");

    if (source == NULL || destination == NULL) {
        printf("Error opening files!\\n");
        return 1;
    }

    int ch;
    while ((ch = fgetc(source)) != EOF) {
        fputc(ch, destination);
    }

    fclose(source);
    fclose(destination);

    printf("File copied successfully.\\n");

    return 0;
}
\`\`\`

### **Student Records System**

\`\`\`c
#include <stdio.h>
#include <string.h>

#define MAX_NAME 50
#define MAX_RECORDS 100

typedef struct {
    char name[MAX_NAME];
    int id;
    float gpa;
} Student;

// Save student to file
void save_student(Student s) {
    FILE *file = fopen("students.dat", "a");

    if (file == NULL) {
        printf("Error opening file!\\n");
        return;
    }

    fprintf(file, "%s,%d,%.2f\\n", s.name, s.id, s.gpa);
    fclose(file);
}

// Load and display all students
void display_students() {
    FILE *file = fopen("students.dat", "r");

    if (file == NULL) {
        printf("No student records found.\\n");
        return;
    }

    char line[100];
    printf("\\nStudent Records:\\n");
    printf("================\\n");

    while (fgets(line, sizeof(line), file) != NULL) {
        char name[MAX_NAME];
        int id;
        float gpa;

        // Parse CSV format
        if (sscanf(line, "%[^,],%d,%f", name, &id, &gpa) == 3) {
            printf("Name: %-15s ID: %3d GPA: %.2f\\n", name, id, gpa);
        }
    }

    fclose(file);
}

int main(void) {
    Student students[3] = {
        {"Alice Johnson", 1001, 3.8},
        {"Bob Smith", 1002, 3.5},
        {"Charlie Brown", 1003, 3.9}
    };

    // Save all students
    for (int i = 0; i < 3; i++) {
        save_student(students[i]);
    }

    display_students();

    return 0;
}
\`\`\`

---

## 📊 Text File Analysis

### **Word Count Program**

\`\`\`c
#include <stdio.h>
#include <ctype.h>

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Usage: %s <filename>\\n", argv[0]);
        return 1;
    }

    FILE *file = fopen(argv[1], "r");

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    int lines = 0, words = 0, characters = 0;
    int in_word = 0;
    int ch;

    while ((ch = fgetc(file)) != EOF) {
        characters++;

        if (ch == '\\n') {
            lines++;
        }

        if (isspace(ch)) {
            in_word = 0;
        } else if (!in_word) {
            in_word = 1;
            words++;
        }
    }

    // Count last line if file doesn't end with newline
    if (characters > 0 && ch != '\\n') {
        lines++;
    }

    fclose(file);

    printf("File Statistics:\\n");
    printf("Lines: %d\\n", lines);
    printf("Words: %d\\n", words);
    printf("Characters: %d\\n", characters);

    return 0;
}
\`\`\`

### **Find and Replace**

\`\`\`c
#include <stdio.h>
#include <string.h>

#define MAX_LINE 1000

void find_replace_in_file(const char *filename, const char *old_word, const char *new_word) {
    FILE *file = fopen(filename, "r");
    FILE *temp = fopen("temp.txt", "w");

    if (file == NULL || temp == NULL) {
        printf("Error opening files!\\n");
        return;
    }

    char line[MAX_LINE];
    int replacements = 0;

    while (fgets(line, sizeof(line), file) != NULL) {
        char *pos = line;

        // Replace all occurrences in the line
        while ((pos = strstr(pos, old_word)) != NULL) {
            // Write part before match
            fwrite(line, 1, pos - line, temp);
            // Write replacement
            fputs(new_word, temp);
            // Move past the old word
            pos += strlen(old_word);
            // Update line pointer
            memmove(line, pos, strlen(pos) + 1);
            pos = line;
            replacements++;
        }

        // Write remaining part of line
        fputs(line, temp);
    }

    fclose(file);
    fclose(temp);

    // Replace original file
    remove(filename);
    rename("temp.txt", filename);

    printf("Replaced %d occurrences.\\n", replacements);
}

int main(void) {
    find_replace_in_file("document.txt", "old_text", "new_text");
    return 0;
}
\`\`\`

---

## ⚠️ Text File Best Practices

### **Buffer Size Management**

\`\`\`c
// Good: Proper buffer size
char buffer[1024];
while (fgets(buffer, sizeof(buffer), file) != NULL) {
    // Process buffer
}

// Bad: Fixed size without protection
char buffer[100];
fgets(buffer, 100, file);  // No NULL check
\`\`\`

### **Error Handling**

\`\`\`c
FILE *file = fopen("data.txt", "r");
if (file == NULL) {
    perror("Error opening file");
    return 1;
}

// Check for read/write errors
if (fputs("Hello", file) == EOF) {
    printf("Write error!\\n");
}
\`\`\`

### **Resource Management**

\`\`\`c
// Good: Immediate cleanup
FILE *file = fopen("data.txt", "r");
if (file != NULL) {
    // Use file
    fclose(file);
}

// Better: Use goto for cleanup
int process_file(const char *filename) {
    FILE *file = NULL;

    file = fopen(filename, "r");
    if (file == NULL) {
        goto cleanup;
    }

    // Process file
    if (some_error) {
        goto cleanup;
    }

cleanup:
    if (file != NULL) {
        fclose(file);
    }
    return error_code;
}
\`\`\`

---

## 🎯 Practical Applications

### **Configuration File Reader**

\`\`\`c
#include <stdio.h>
#include <string.h>

#define MAX_CONFIG 50

typedef struct {
    char key[50];
    char value[100];
} ConfigEntry;

int load_config(const char *filename, ConfigEntry config[], int max_entries) {
    FILE *file = fopen(filename, "r");

    if (file == NULL) {
        return 0;
    }

    char line[200];
    int count = 0;

    while (fgets(line, sizeof(line), file) != NULL && count < max_entries) {
        // Skip comments and empty lines
        if (line[0] == '#' || line[0] == '\\n') {
            continue;
        }

        // Parse key=value format
        char *equals = strchr(line, '=');
        if (equals != NULL) {
            *equals = '\\0';  // Split the line

            strcpy(config[count].key, line);
            strcpy(config[count].value, equals + 1);

            // Remove trailing newline
            config[count].value[strcspn(config[count].value, "\\n")] = '\\0';

            count++;
        }
    }

    fclose(file);
    return count;
}

int main(void) {
    ConfigEntry config[MAX_CONFIG];
    int count = load_config("config.txt", config, MAX_CONFIG);

    printf("Configuration loaded:\\n");
    for (int i = 0; i < count; i++) {
        printf("%s = %s\\n", config[i].key, config[i].value);
    }

    return 0;
}
\`\`\`

### **Simple Text Editor Simulation**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_LINES 1000
#define MAX_LINE_LENGTH 200

void load_file(char *lines[], int *line_count, const char *filename) {
    FILE *file = fopen(filename, "r");

    if (file == NULL) {
        *line_count = 0;
        return;
    }

    char buffer[MAX_LINE_LENGTH];
    *line_count = 0;

    while (fgets(buffer, sizeof(buffer), file) != NULL && *line_count < MAX_LINES) {
        lines[*line_count] = (char*)malloc(strlen(buffer) + 1);
        if (lines[*line_count] != NULL) {
            strcpy(lines[*line_count], buffer);
            (*line_count)++;
        }
    }

    fclose(file);
}

void save_file(char *lines[], int line_count, const char *filename) {
    FILE *file = fopen(filename, "w");

    if (file == NULL) {
        printf("Error saving file!\\n");
        return;
    }

    for (int i = 0; i < line_count; i++) {
        fputs(lines[i], file);
    }

    fclose(file);
}

void free_lines(char *lines[], int line_count) {
    for (int i = 0; i < line_count; i++) {
        free(lines[i]);
    }
}

int main(void) {
    char *lines[MAX_LINES];
    int line_count;

    load_file(lines, &line_count, "document.txt");

    printf("Loaded %d lines from file.\\n", line_count);

    // Simple modification: add line numbers
    for (int i = 0; i < line_count; i++) {
        char temp[MAX_LINE_LENGTH + 10];
        sprintf(temp, "%3d: %s", i + 1, lines[i]);
        free(lines[i]);
        lines[i] = (char*)malloc(strlen(temp) + 1);
        strcpy(lines[i], temp);
    }

    save_file(lines, line_count, "numbered.txt");
    free_lines(lines, line_count);

    printf("File saved with line numbers.\\n");

    return 0;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Text files** store human-readable data using standard encoding
2. **fgets/fputs** work with strings and lines
3. **fprintf/fscanf** provide formatted I/O like printf/scanf
4. **fgetc/fputc** handle character-level operations
5. **Always check** return values for error detection
6. **Buffer sizes** must be managed carefully to prevent overflow
7. **Resource cleanup** is essential - always close files
8. **Error handling** makes programs robust and user-friendly

Text file operations form the foundation of most data processing applications! 📄✨`;

    return contentString;
  })()
};
