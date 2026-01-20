import { SubLesson } from '../../../../data/lessonsData';

export const topic_15_2: SubLesson = {
  id: '15.2',
  title: 'I/O Functions (<stdio.h>, <fcntl.h>)',
  status: 'demo',
  content: `# I/O Functions (<stdio.h>, <fcntl.h>)

## Standard I/O Streams

### Predefined Streams
\`\`\`c
#include <stdio.h>

int main() {
    // Standard streams
    FILE *stdin_stream = stdin;    // Standard input
    FILE *stdout_stream = stdout;  // Standard output
    FILE *stderr_stream = stderr;  // Standard error

    // Writing to stdout
    fprintf(stdout, "This goes to stdout\\n");
    printf("This also goes to stdout\\n");  // Same as above

    // Writing to stderr
    fprintf(stderr, "This goes to stderr\\n");

    // Reading from stdin
    char buffer[100];
    printf("Enter something: ");
    if (fgets(buffer, sizeof(buffer), stdin) != NULL) {
        printf("You entered: %s", buffer);
    }

    return 0;
}
\`\`\`

### Stream Buffering
\`\`\`c
#include <stdio.h>

int main() {
    // Check buffering mode
    int stdout_mode = -1;
    setvbuf(stdout, NULL, _IONBF, 0);  // Unbuffered
    setvbuf(stdout, NULL, _IOLBF, 0);  // Line buffered
    setvbuf(stdout, NULL, _IOFBF, 0);  // Fully buffered

    // Custom buffering
    char buffer[1024];
    setvbuf(stdout, buffer, _IOFBF, sizeof(buffer));

    // Force flush
    fflush(stdout);

    // Line buffering example
    printf("This will be buffered");
    printf(" until newline\\n");  // Now it flushes

    return 0;
}
\`\`\`

## File Operations

### Opening and Closing Files
\`\`\`c
#include <stdio.h>

int main() {
    // Open file for reading
    FILE *fp_read = fopen("input.txt", "r");
    if (fp_read == NULL) {
        perror("Error opening file for reading");
        return 1;
    }

    // Open file for writing (creates/truncates)
    FILE *fp_write = fopen("output.txt", "w");
    if (fp_write == NULL) {
        perror("Error opening file for writing");
        fclose(fp_read);
        return 1;
    }

    // Open file for appending
    FILE *fp_append = fopen("log.txt", "a");
    if (fp_append == NULL) {
        perror("Error opening file for appending");
        fclose(fp_read);
        fclose(fp_write);
        return 1;
    }

    // Close all files
    fclose(fp_read);
    fclose(fp_write);
    fclose(fp_append);

    return 0;
}
\`\`\`

### File Positioning
\`\`\`c
#include <stdio.h>

int main() {
    FILE *fp = fopen("data.bin", "rb");
    if (fp == NULL) return 1;

    // Get current position
    long pos = ftell(fp);
    printf("Current position: %ld\\n", pos);

    // Seek to specific position
    fseek(fp, 100, SEEK_SET);  // From beginning
    fseek(fp, 50, SEEK_CUR);   // From current position
    fseek(fp, -10, SEEK_END);  // From end

    // Rewind to beginning
    rewind(fp);

    // Advanced positioning (C95)
    fpos_t file_pos;
    fgetpos(fp, &file_pos);
    // ... do some operations ...
    fsetpos(fp, &file_pos);

    fclose(fp);
    return 0;
}
\`\`\`

## Character I/O

### Character-Based I/O
\`\`\`c
#include <stdio.h>

int main() {
    FILE *fp = fopen("chars.txt", "w+");
    if (fp == NULL) return 1;

    // Write characters
    fputc('H', fp);
    fputc('e', fp);
    fputc('l', fp);
    fputc('l', fp);
    fputc('o', fp);

    // Read characters
    rewind(fp);  // Go back to beginning

    int ch;
    while ((ch = fgetc(fp)) != EOF) {
        putchar(ch);
    }

    // Ungetc - push character back
    rewind(fp);
    ch = fgetc(fp);  // Read 'H'
    ungetc(ch, fp);  // Push back 'H'
    ch = fgetc(fp);  // Read 'H' again

    fclose(fp);
    return 0;
}
\`\`\`

## Formatted I/O

### printf Family
\`\`\`c
#include <stdio.h>

int main() {
    int i = 42;
    double d = 3.14159;
    char c = 'A';
    char *str = "Hello";

    // Basic formatting
    printf("Integer: %d\\n", i);
    printf("Double: %f\\n", d);
    printf("Character: %c\\n", c);
    printf("String: %s\\n", str);

    // Width and precision
    printf("Width 5: %5d\\n", i);
    printf("Precision 2: %.2f\\n", d);
    printf("Left align: %-10s\\n", str);

    // Different bases
    printf("Decimal: %d\\n", 255);
    printf("Hexadecimal: %x\\n", 255);
    printf("Octal: %o\\n", 255);

    // Size modifiers
    printf("Short: %hd\\n", (short)32767);
    printf("Long: %ld\\n", 123456789L);
    printf("Long long: %lld\\n", 123456789012345LL);

    return 0;
}
\`\`\`

### scanf Family
\`\`\`c
#include <stdio.h>

int main() {
    int i;
    double d;
    char str[100];

    // Basic input
    printf("Enter an integer: ");
    scanf("%d", &i);

    printf("Enter a double: ");
    scanf("%lf", &d);

    printf("Enter a string: ");
    scanf("%s", str);

    printf("Read: int=%d, double=%f, string=%s\\n", i, d, str);

    // Pattern matching
    int day, month, year;
    printf("Enter date (dd/mm/yyyy): ");
    if (scanf("%d/%d/%d", &day, &month, &year) == 3) {
        printf("Parsed date: %02d/%02d/%04d\\n", day, month, year);
    }

    // Width specification
    char limited_str[10];
    scanf("%9s", limited_str);  // Read max 9 chars + null

    return 0;
}
\`\`\`

## Line-Based I/O

### gets/fputs (Avoid gets!)
\`\`\`c
#include <stdio.h>

int main() {
    FILE *fp = fopen("lines.txt", "w+");
    if (fp == NULL) return 1;

    // Write lines
    fputs("First line\\n", fp);
    fputs("Second line\\n", fp);

    // Read lines (unsafe - don't use gets!)
    rewind(fp);
    char buffer[100];

    // Safe alternatives
    if (fgets(buffer, sizeof(buffer), fp) != NULL) {
        printf("Read: %s", buffer);
    }

    if (fgets(buffer, sizeof(buffer), fp) != NULL) {
        printf("Read: %s", buffer);
    }

    fclose(fp);
    return 0;
}
\`\`\`

## Block I/O

### fread/fwrite
\`\`\`c
#include <stdio.h>

typedef struct {
    int id;
    char name[50];
    double salary;
} Employee;

int main() {
    FILE *fp = fopen("employees.dat", "wb");
    if (fp == NULL) return 1;

    // Write binary data
    Employee emp = {1, "John Doe", 50000.0};
    size_t written = fwrite(&emp, sizeof(Employee), 1, fp);
    printf("Wrote %zu records\\n", written);

    fclose(fp);

    // Read binary data
    fp = fopen("employees.dat", "rb");
    if (fp == NULL) return 1;

    Employee read_emp;
    size_t read_count = fread(&read_emp, sizeof(Employee), 1, fp);
    if (read_count == 1) {
        printf("Read: ID=%d, Name=%s, Salary=%.2f\\n",
               read_emp.id, read_emp.name, read_emp.salary);
    }

    fclose(fp);
    return 0;
}
\`\`\`

## File System Operations

### POSIX File System Functions
\`\`\`c
#include <unistd.h>
#include <fcntl.h>
#include <sys/stat.h>

int main() {
    // Low-level file opening
    int fd = open("test.txt", O_RDWR | O_CREAT, 0644);
    if (fd == -1) {
        perror("open failed");
        return 1;
    }

    // Write using file descriptor
    const char *text = "Hello, file descriptor!";
    ssize_t written = write(fd, text, strlen(text));

    // Read using file descriptor
    char buffer[100];
    lseek(fd, 0, SEEK_SET);  // Go to beginning
    ssize_t read_bytes = read(fd, buffer, sizeof(buffer));

    if (read_bytes > 0) {
        buffer[read_bytes] = '\\0';
        printf("Read: %s\\n", buffer);
    }

    // File status
    struct stat file_stat;
    if (fstat(fd, &file_stat) == 0) {
        printf("File size: %lld bytes\\n", (long long)file_stat.st_size);
        printf("Permissions: %o\\n", file_stat.st_mode & 0777);
    }

    close(fd);

    // File operations
    unlink("test.txt");  // Delete file

    return 0;
}
\`\`\`

## Temporary Files

### tmpfile and tmpnam
\`\`\`c
#include <stdio.h>

int main() {
    // Create temporary file (automatically deleted on close)
    FILE *temp_fp = tmpfile();
    if (temp_fp == NULL) {
        perror("tmpfile failed");
        return 1;
    }

    // Use temporary file
    fprintf(temp_fp, "Temporary data\\n");
    rewind(temp_fp);

    char buffer[100];
    if (fgets(buffer, sizeof(buffer), temp_fp) != NULL) {
        printf("From temp file: %s", buffer);
    }

    // File automatically deleted when closed
    fclose(temp_fp);

    // Generate temporary filename
    char temp_name[L_tmpnam];
    if (tmpnam(temp_name) != NULL) {
        printf("Generated temp name: %s\\n", temp_name);
    }

    return 0;
}
\`\`\`

## Error Handling

### perror and strerror
\`\`\`c
#include <stdio.h>
#include <string.h>
#include <errno.h>

int main() {
    FILE *fp = fopen("nonexistent.txt", "r");
    if (fp == NULL) {
        // Print error message with description
        perror("fopen failed");

        // Get error string
        printf("Error code %d: %s\\n", errno, strerror(errno));
    }

    // Clear error
    errno = 0;

    // Check for stream errors
    FILE *fp2 = fopen("test.txt", "r");
    if (fp2) {
        int ch = fgetc(fp2);
        if (ferror(fp2)) {
            perror("Error reading file");
        }
        if (feof(fp2)) {
            printf("End of file reached\\n");
        }
        fclose(fp2);
    }

    return 0;
}
\`\`\`

## Memory Streams

### fmemopen (POSIX)
\`\`\`c
#include <stdio.h>

int main() {
    char buffer[100];

    // Open memory as stream
    FILE *mem_stream = fmemopen(buffer, sizeof(buffer), "w+");
    if (mem_stream == NULL) {
        perror("fmemopen failed");
        return 1;
    }

    // Write to memory stream
    fprintf(mem_stream, "Hello, memory stream!");

    // Read from memory stream
    rewind(mem_stream);
    char read_buffer[50];
    if (fgets(read_buffer, sizeof(read_buffer), mem_stream) != NULL) {
        printf("Read from memory: %s\\n", read_buffer);
    }

    printf("Buffer contents: %s\\n", buffer);

    fclose(mem_stream);
    return 0;
}
\`\`\`

The I/O functions in <stdio.h> and <fcntl.h> provide comprehensive file and stream handling capabilities essential for C programming. Understanding buffering, error handling, and the different I/O modes is crucial for robust file operations.`
};

