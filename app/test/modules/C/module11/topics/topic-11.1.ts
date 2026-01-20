import { SubLesson } from '../../../../data/lessonsData';

export const topic_11_1: SubLesson = {
  id: '11.1',
  title: 'File Operations in C',
  status: 'demo',
  content: `# File Operations in C

## Overview
File I/O is essential for persistent data storage and communication with external devices. C provides a comprehensive set of functions for file operations.

## Key Concepts

### File Streams
- **Text Mode**: Characters are translated (e.g., \\n → \\r\\n on Windows)
- **Binary Mode**: Data is read/written as-is, no translation
- **Buffered I/O**: Data is temporarily stored in memory buffers

### File Pointers
- **FILE***: Opaque structure representing an open file
- Maintains current position, mode, buffer information
- Created by fopen(), destroyed by fclose()

## File Opening Modes

| Mode | Description | Creates file? | Position |
|------|-------------|---------------|----------|
| "r"  | Read only   | No           | Beginning |
| "w"  | Write only  | Yes          | Beginning |
| "a"  | Append      | Yes          | End       |
| "r+" | Read/Write  | No           | Beginning |
| "w+" | Read/Write  | Yes          | Beginning |
| "a+" | Read/Append | Yes          | End       |

### Binary Mode Variants
- "rb", "wb", "ab", "r+b", "w+b", "a+b"

## Basic File Operations

### Opening Files
\`\`\`c
#include <stdio.h>

int main() {
    FILE *fp;

    // Open file for reading
    fp = fopen("data.txt", "r");
    if (fp == NULL) {
        printf("Error opening file\\n");
        return 1;
    }

    // File operations here...

    fclose(fp);
    return 0;
}
\`\`\`

### Error Handling
\`\`\`c
FILE *fp = fopen("file.txt", "r");
if (fp == NULL) {
    perror("Error opening file");
    // perror() prints the system error message
    return 1;
}
\`\`\`

### Character I/O
- **fgetc()**: Read single character
- **fputc()**: Write single character
- **ungetc()**: Push character back to stream

### Line I/O
- **fgets()**: Read line with buffer limit
- **fputs()**: Write null-terminated string

### Formatted I/O
- **fprintf()**: Formatted output to file
- **fscanf()**: Formatted input from file

## Best Practices

### Always Check Return Values
\`\`\`c
if (fclose(fp) != 0) {
    perror("Error closing file");
}
\`\`\`

### Handle File Paths Carefully
- Use absolute paths when necessary
- Be aware of platform differences (/, \\)
- Consider MAX_PATH limitations

### Buffer Management
- Files are buffered by default
- **fflush()** forces buffer write
- **setbuf()**/**setvbuf()** control buffering

## Common Pitfalls

1. **Forgetting to close files** → Resource leaks
2. **Not checking fopen() return** → Null pointer dereference
3. **Mixing text and binary modes** → Data corruption
4. **Assuming file operations succeed** → Silent failures`
};



