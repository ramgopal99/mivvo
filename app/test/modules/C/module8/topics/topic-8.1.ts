import { SubLesson } from '../../../../data/lessonsData';

export const topic_8_1: SubLesson = {
  id: "8.1",
  title: 'Introduction to File I/O',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 📁 Introduction to File Input/Output in C

Files allow programs to persist data beyond program execution. File I/O enables reading from and writing to files on disk, making programs much more powerful and practical.

---

## 📋 What is File I/O?

**File Input/Output (I/O) refers to the operations of reading data from files and writing data to files.** Key concepts:

- **Persistent Storage**: Data survives program termination
- **Sequential/Direct Access**: Files can be read sequentially or accessed randomly
- **Text vs Binary**: Files can store human-readable text or binary data
- **File Streams**: Abstraction layer between program and physical files

---

## 🔧 File Operations Overview

### **Basic File Operations**

1. **Opening a file** - Establish connection to file
2. **Reading from file** - Get data from file
3. **Writing to file** - Put data into file
4. **Closing a file** - Terminate connection to file

---

## 📝 Opening and Closing Files

### **The FILE Structure**

C uses the \`FILE\` structure to represent file streams:

\`\`\`c
#include <stdio.h>

int main(void) {
    FILE *file_pointer;  // Pointer to FILE structure

    // File operations here

    return 0;
}
\`\`\`

### **Opening Files with fopen()**

\`\`\`c
FILE *fopen(const char *filename, const char *mode);
\`\`\`

**Parameters:**
- \`filename\`: Path to the file (string)
- \`mode\`: How to open the file (string)

**Common modes:**
- \`"r"\`: Read (file must exist)
- \`"w"\`: Write (creates new file or truncates existing)
- \`"a"\`: Append (adds to end of file)
- \`"r+"\`: Read and write (file must exist)
- \`"w+"\`: Read and write (creates new file or truncates)
- \`"a+"\`: Read and append

### **Basic File Open/Close Example**

\`\`\`c
#include <stdio.h>

int main(void) {
    FILE *file;

    // Open file for writing
    file = fopen("example.txt", "w");

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    printf("File opened successfully!\\n");

    // Close the file
    fclose(file);

    printf("File closed.\\n");

    return 0;
}
\`\`\`

---

## ✍️ Writing to Files

### **fprintf() - Formatted Output**

Similar to \`printf()\` but writes to file:

\`\`\`c
#include <stdio.h>

int main(void) {
    FILE *file = fopen("data.txt", "w");

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    // Write formatted data to file
    fprintf(file, "Name: %s\\n", "John Doe");
    fprintf(file, "Age: %d\\n", 25);
    fprintf(file, "GPA: %.2f\\n", 3.75);

    fclose(file);
    printf("Data written to file.\\n");

    return 0;
}
\`\`\`

### **fputs() - String Output**

Write entire strings to file:

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
    fputs("This is a test file.\\n", file);
    fputs("File I/O in C is powerful!\\n", file);

    fclose(file);
    printf("Strings written to file.\\n");

    return 0;
}
\`\`\`

### **fputc() - Character Output**

Write single characters:

\`\`\`c
#include <stdio.h>

int main(void) {
    FILE *file = fopen("chars.txt", "w");

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    // Write characters one by one
    for (char ch = 'A'; ch <= 'Z'; ch++) {
        fputc(ch, file);
        fputc('\\n', file);  // Newline after each letter
    }

    fclose(file);
    printf("Characters written to file.\\n");

    return 0;
}
\`\`\`

---

## 📖 Reading from Files

### **fscanf() - Formatted Input**

Similar to \`scanf()\` but reads from file:

\`\`\`c
#include <stdio.h>

int main(void) {
    FILE *file = fopen("data.txt", "r");

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    char name[50];
    int age;
    float gpa;

    // Read formatted data from file
    fscanf(file, "Name: %s\\n", name);
    fscanf(file, "Age: %d\\n", &age);
    fscanf(file, "GPA: %f\\n", &gpa);

    printf("Read from file:\\n");
    printf("Name: %s\\n", name);
    printf("Age: %d\\n", age);
    printf("GPA: %.2f\\n", gpa);

    fclose(file);

    return 0;
}
\`\`\`

### **fgets() - String Input**

Read entire lines from file:

\`\`\`c
#include <stdio.h>

int main(void) {
    FILE *file = fopen("message.txt", "r");
    char buffer[100];

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    printf("File contents:\\n");

    // Read lines from file
    while (fgets(buffer, sizeof(buffer), file) != NULL) {
        printf("%s", buffer);  // fgets includes newline
    }

    fclose(file);

    return 0;
}
\`\`\`

### **fgetc() - Character Input**

Read single characters:

\`\`\`c
#include <stdio.h>

int main(void) {
    FILE *file = fopen("chars.txt", "r");
    int ch;

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    printf("Characters from file: ");

    // Read characters one by one
    while ((ch = fgetc(file)) != EOF) {
        putchar(ch);
    }

    printf("\\n");
    fclose(file);

    return 0;
}
\`\`\`

---

## 🔍 End-of-File Detection

### **EOF (End of File)**

\`\`\`c
#include <stdio.h>

int main(void) {
    FILE *file = fopen("numbers.txt", "r");
    int number;

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    printf("Numbers from file: ");

    // Read until EOF
    while (fscanf(file, "%d", &number) != EOF) {
        printf("%d ", number);
    }

    printf("\\n");
    fclose(file);

    return 0;
}
\`\`\`

### **feof() Function**

\`\`\`c
#include <stdio.h>

int main(void) {
    FILE *file = fopen("data.txt", "r");
    char buffer[100];

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    // Read lines until end of file
    while (!feof(file)) {
        if (fgets(buffer, sizeof(buffer), file) != NULL) {
            printf("%s", buffer);
        }
    }

    fclose(file);

    return 0;
}
\`\`\`

---

## ⚠️ File I/O Best Practices

### **Always Check for NULL**

\`\`\`c
FILE *file = fopen("example.txt", "r");
if (file == NULL) {
    printf("Error: Could not open file!\\n");
    return 1;
}
\`\`\`

### **Always Close Files**

\`\`\`c
FILE *file = fopen("example.txt", "w");
// ... file operations ...
fclose(file);  // Always close!
\`\`\`

### **Handle Errors Gracefully**

\`\`\`c
if (fprintf(file, "%d\\n", value) < 0) {
    printf("Error writing to file!\\n");
    fclose(file);
    return 1;
}
\`\`\`

### **Buffer Size Considerations**

\`\`\`c
#define BUFFER_SIZE 1024
char buffer[BUFFER_SIZE];

// Safe reading with proper buffer size
while (fgets(buffer, BUFFER_SIZE, file) != NULL) {
    // Process buffer
}
\`\`\`

---

## 🎯 Practical Examples

### **Example 1: Student Record System**

\`\`\`c
#include <stdio.h>
#include <string.h>

#define MAX_NAME 50
#define FILENAME "students.txt"

typedef struct {
    char name[MAX_NAME];
    int id;
    float gpa;
} Student;

void save_student(Student s) {
    FILE *file = fopen(FILENAME, "a");

    if (file == NULL) {
        printf("Error opening file!\\n");
        return;
    }

    fprintf(file, "%s,%d,%.2f\\n", s.name, s.id, s.gpa);
    fclose(file);
}

void display_all_students() {
    FILE *file = fopen(FILENAME, "r");
    char line[100];

    if (file == NULL) {
        printf("No student records found.\\n");
        return;
    }

    printf("\\nStudent Records:\\n");
    printf("================\\n");

    while (fgets(line, sizeof(line), file) != NULL) {
        char name[MAX_NAME];
        int id;
        float gpa;

        // Parse CSV format: Name,ID,GPA
        sscanf(line, "%[^,],%d,%f", name, &id, &gpa);
        printf("Name: %s, ID: %d, GPA: %.2f\\n", name, id, gpa);
    }

    fclose(file);
}

int main(void) {
    Student s1 = {"Alice Johnson", 1001, 3.8};
    Student s2 = {"Bob Smith", 1002, 3.5};

    save_student(s1);
    save_student(s2);

    display_all_students();

    return 0;
}
\`\`\`

### **Example 2: Text File Word Counter**

\`\`\`c
#include <stdio.h>
#include <ctype.h>

int main(void) {
    FILE *file = fopen("document.txt", "r");

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    int characters = 0, words = 0, lines = 0;
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

    printf("File Statistics:\\n");
    printf("Characters: %d\\n", characters);
    printf("Words: %d\\n", words);
    printf("Lines: %d\\n", lines);

    fclose(file);

    return 0;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **File I/O** enables data persistence beyond program execution
2. **fopen()** opens files with specific modes (r, w, a, etc.)
3. **Always check** for NULL when opening files
4. **Always close** files with fclose()
5. **fprintf/fscanf** for formatted I/O (like printf/scanf)
6. **fgets/fputs** for string I/O
7. **fgetc/fputc** for character I/O
8. **EOF detection** prevents reading past end of file

File I/O transforms your programs from temporary utilities to powerful applications that can store and retrieve data! 📁✨`;

    return contentString;
  })()
};
