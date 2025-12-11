import { SubLesson } from '../../../data/lessonsData';

export const topic_8_1: SubLesson = {
  id: 8.1,
  title: 'Introduction to File I/O',
  status: 'completed',
  content: `# 💾 Introduction to File I/O

Learn why file input/output is crucial for real-world programs and understand the fundamental concepts of file streams and file pointers.

---

## 🎯 Why Files Matter

### The Problem with Console I/O

**Console input/output is temporary - data disappears when the program ends.**

\`\`\`c
#include <stdio.h>

int main() {
    int scores[5];

    printf("Enter 5 scores: ");
    for (int i = 0; i < 5; i++) {
        scanf("%d", &scores[i]);
    }

    printf("Average: %.1f\\n", average(scores, 5));

    return 0;  // ❌ All data is lost!
}
\`\`\`

**Problems:**
- ❌ Data exists only during program execution
- ❌ Cannot share data between program runs
- ❌ Limited data size (console buffer constraints)
- ❌ No persistence across system restarts

### Files Solve Persistence

**Files allow data to persist beyond program execution.**

\`\`\`c
#include <stdio.h>

int main() {
    FILE* file = fopen("scores.txt", "w");

    if (file != NULL) {
        // Save data to file
        fprintf(file, "95 87 92 88 96\\n");
        fclose(file);
        printf("Data saved to file!\\n");
    }

    return 0;  // ✅ Data persists in file
}

// Later, another program can read the data:
int main() {
    FILE* file = fopen("scores.txt", "r");

    if (file != NULL) {
        int score;
        while (fscanf(file, "%d", &score) == 1) {
            printf("Score: %d\\n", score);
        }
        fclose(file);
    }

    return 0;
}
\`\`\`

**Benefits:**
- ✅ Data persists after program ends
- ✅ Can share data between programs
- ✅ Unlimited data size (limited by disk space)
- ✅ Survives system restarts and crashes

---

## 🌊 Understanding Streams

### What is a Stream?

**A stream is a sequence of bytes flowing between a program and a file or device.**

\`\`\`
Program ↔ Stream ↔ File/Device

Input Stream:  File → Program
Output Stream: Program → File
\`\`\`

### Types of Streams

#### Text Streams
- Handle text data (characters)
- Automatic conversion between internal and external representations
- Platform-specific line endings
- Formatted I/O functions (`fprintf`, `fscanf`)

#### Binary Streams
- Handle raw binary data
- No character conversion
- Exact byte representation
- Direct I/O functions (`fread`, `fwrite`)

### Standard Streams

**C provides three standard streams that are always available:**

\`\`\`c
#include <stdio.h>

int main() {
    // Standard input (keyboard)
    int age;
    printf("Enter age: ");
    scanf("%d", &age);  // Reads from stdin

    // Standard output (console)
    printf("You entered: %d\\n", age);  // Writes to stdout

    // Standard error (console, for errors)
    fprintf(stderr, "This is an error message\\n");  // Writes to stderr

    return 0;
}
\`\`\`

**Standard stream pointers:**
- `stdin` - Standard input stream
- `stdout` - Standard output stream  
- `stderr` - Standard error stream

---

## 📁 File Pointers

### What is a FILE Pointer?

**A FILE pointer is a handle that represents an open file stream.**

\`\`\`c
#include <stdio.h>

int main() {
    // FILE* is a pointer to a FILE structure
    FILE* input_file;
    FILE* output_file;

    // The FILE structure contains information about the stream:
    // - Current position in file
    // - Buffer information
    // - File status flags
    // - etc.

    return 0;
}
\`\`\`

### File Opening Process

\`\`\`c
#include <stdio.h>

int main() {
    // 1. Declare FILE pointer
    FILE* file;

    // 2. Open file (associate with stream)
    file = fopen("data.txt", "r");

    // 3. Check if opening succeeded
    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    // 4. Use file for I/O operations
    fprintf(file, "Hello, File!\\n");

    // 5. Close file (disconnect stream)
    fclose(file);

    return 0;
}
\`\`\`

---

## 📖 File Access Modes

### Common File Modes

| Mode | Description | Creates File? | Position |
|------|-------------|---------------|----------|
| `"r"` | Read only | No | Beginning |
| `"w"` | Write only | Yes | Beginning (truncates) |
| `"a"` | Append only | Yes | End |
| `"r+"` | Read + Write | No | Beginning |
| `"w+"` | Read + Write | Yes | Beginning (truncates) |
| `"a+"` | Read + Append | Yes | End |

### Text vs Binary Modes

**Text Modes (default):**
- `"r"`, `"w"`, `"a"`, `"r+"`, `"w+"`, `"a+"`

**Binary Modes (with 'b' flag):**
- `"rb"`, `"wb"`, `"ab"`, `"r+b"`, `"w+b"`, `"a+b"`

\`\`\`c
// Text mode (automatic line ending conversion)
FILE* text_file = fopen("data.txt", "w");

// Binary mode (no conversion, raw bytes)
FILE* binary_file = fopen("data.bin", "wb");
\`\`\`

### Mode Examples

\`\`\`c
#include <stdio.h>

int main() {
    // Read existing file
    FILE* read_file = fopen("existing.txt", "r");

    // Create new file for writing (overwrites if exists)
    FILE* write_file = fopen("new.txt", "w");

    // Append to existing file or create new
    FILE* append_file = fopen("log.txt", "a");

    // Read and write existing file
    FILE* update_file = fopen("data.txt", "r+");

    // Create new file for read/write
    FILE* create_file = fopen("scratch.txt", "w+");

    // Always close files when done
    fclose(read_file);
    fclose(write_file);
    fclose(append_file);
    fclose(update_file);
    fclose(create_file);

    return 0;
}
\`\`\`

---

## 🔄 File Operations Overview

### Basic File Workflow

\`\`\`c
#include <stdio.h>

int main() {
    // 1. Open file
    FILE* file = fopen("example.txt", "w");

    if (file == NULL) {
        printf("Failed to open file\\n");
        return 1;
    }

    // 2. Perform I/O operations
    fprintf(file, "Hello, World!\\n");
    fprintf(file, "This is line 2.\\n");

    // 3. Close file
    fclose(file);

    // 4. File is now closed and data is saved
    printf("File written successfully\\n");

    return 0;
}
\`\`\`

### Error Handling

\`\`\`c
#include <stdio.h>

int main() {
    FILE* file = fopen("readonly.txt", "w");

    if (file == NULL) {
        perror("Error opening file");  // Print system error message
        return 1;
    }

    // Check for errors during I/O
    if (fprintf(file, "test") < 0) {
        perror("Error writing to file");
        fclose(file);
        return 1;
    }

    // Close and check for close errors
    if (fclose(file) != 0) {
        perror("Error closing file");
        return 1;
    }

    return 0;
}
\`\`\`

---

## 📊 File I/O Functions

### High-Level Functions (Formatted I/O)

| Function | Purpose | Example |
|----------|---------|---------|
| `fprintf()` | Write formatted text | `fprintf(file, "%d %s", num, str);` |
| `fscanf()` | Read formatted text | `fscanf(file, "%d %s", &num, str);` |
| `fputs()` | Write string | `fputs("Hello", file);` |
| `fgets()` | Read line | `fgets(buffer, size, file);` |
| `fputc()` | Write character | `fputc('A', file);` |
| `fgetc()` | Read character | `char c = fgetc(file);` |

### Low-Level Functions (Binary I/O)

| Function | Purpose | Example |
|----------|---------|---------|
| `fread()` | Read binary data | `fread(buffer, size, count, file);` |
| `fwrite()` | Write binary data | `fwrite(buffer, size, count, file);` |

### File Positioning

| Function | Purpose | Example |
|----------|---------|---------|
| `ftell()` | Get current position | `long pos = ftell(file);` |
| `fseek()` | Set position | `fseek(file, offset, SEEK_SET);` |
| `rewind()` | Reset to beginning | `rewind(file);` |

---

## 🎮 Practical File I/O Examples

### Simple Text File Writer

\`\`\`c
#include <stdio.h>

int main() {
    FILE* file = fopen("poem.txt", "w");

    if (file == NULL) {
        printf("Error creating file\\n");
        return 1;
    }

    // Write poem to file
    fprintf(file, "Roses are red,\\n");
    fprintf(file, "Violets are blue,\\n");
    fprintf(file, "Files are fun,\\n");
    fprintf(file, "And so are you!\\n");

    fclose(file);
    printf("Poem written to file\\n");

    return 0;
}
\`\`\`

### Simple Text File Reader

\`\`\`c
#include <stdio.h>

int main() {
    FILE* file = fopen("poem.txt", "r");

    if (file == NULL) {
        printf("Error opening file\\n");
        return 1;
    }

    char line[100];

    // Read and print each line
    while (fgets(line, sizeof(line), file) != NULL) {
        printf("%s", line);  // fgets includes newline
    }

    fclose(file);

    return 0;
}
\`\`\`

### File Copy Program

\`\`\`c
#include <stdio.h>

int main() {
    FILE* source = fopen("source.txt", "r");
    FILE* destination = fopen("copy.txt", "w");

    if (source == NULL || destination == NULL) {
        printf("Error opening files\\n");
        if (source) fclose(source);
        if (destination) fclose(destination);
        return 1;
    }

    char ch;
    while ((ch = fgetc(source)) != EOF) {
        fputc(ch, destination);
    }

    fclose(source);
    fclose(destination);

    printf("File copied successfully\\n");

    return 0;
}
\`\`\`

---

## 🛡️ File I/O Safety

### Always Check Return Values

\`\`\`c
// ❌ Dangerous - no error checking
FILE* file = fopen("data.txt", "r");
fscanf(file, "%d", &value);  // Crash if file is NULL!

// ✅ Safe - check all operations
FILE* file = fopen("data.txt", "r");
if (file == NULL) {
    perror("Failed to open file");
    return 1;
}

if (fscanf(file, "%d", &value) != 1) {
    printf("Failed to read integer\\n");
    fclose(file);
    return 1;
}

fclose(file);
\`\`\`

### Resource Management

\`\`\`c
// ❌ Resource leak - file not closed on error
FILE* file = fopen("data.txt", "w");
if (file == NULL) {
    return 1;  // File handle lost!
}
fprintf(file, "data");
// Forgot to close...

// ✅ Proper resource management
FILE* file = fopen("data.txt", "w");
if (file == NULL) {
    perror("Failed to open file");
    return 1;
}

// Use file...

fclose(file);  // Always close
\`\`\`

### Buffer Safety

\`\`\`c
// ✅ Safe string operations
char buffer[100];
FILE* file = fopen("data.txt", "r");

if (fgets(buffer, sizeof(buffer), file) != NULL) {
    // Buffer won't overflow - fgets respects size
    printf("Read: %s", buffer);
}

fclose(file);
\`\`\`

---

## 🎯 File I/O Concepts Summary

### Key Concepts

1. **Streams** - Byte sequences connecting program to files/devices
2. **FILE pointers** - Handles for open file streams  
3. **Access modes** - Control how files are opened (r, w, a, etc.)
4. **Text vs Binary** - Character conversion vs raw byte handling
5. **Error handling** - Always check return values and handle failures
6. **Resource management** - Close files when done, check for NULL

### File I/O Workflow

1. **Open** file with `fopen()` - get FILE pointer
2. **Check** if open succeeded (not NULL)
3. **Perform** I/O operations (read/write)
4. **Check** for I/O errors
5. **Close** file with `fclose()`
6. **Handle** any close errors

### Common Mistakes to Avoid

- ❌ Forgetting to close files (resource leaks)
- ❌ Not checking if `fopen()` returns NULL
- ❌ Ignoring return values from I/O functions
- ❌ Using wrong access modes
- ❌ Buffer overflows with unsafe string functions

---

## 🚀 Preview: Opening and Closing Files

In the next topic, you'll learn about:
- **Detailed fopen()** function usage and modes
- **Safe file opening** patterns and error handling
- **fclose()** and proper resource cleanup
- **Multiple file handling** techniques
- **File existence checking** and permissions

**Proper file opening and closing is the foundation of reliable file I/O!** 🔐

