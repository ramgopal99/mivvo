import { SubLesson } from '../../../data/lessonsData';

export const topic_8_4: SubLesson = {
  id: 8.4,
  title: 'Writing to Files',
  status: 'completed',
  content: `# ✍️ Writing to Files

Master various techniques for writing data to files, from simple text output to complex binary data serialization.

---

## 🔤 Character-Based Writing

### fputc() - Write Single Character

\`\`\`c
#include <stdio.h>

int main() {
    FILE* file = fopen("output.txt", "w");

    if (file == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Write characters one by one
    fputc('H', file);
    fputc('e', file);
    fputc('l', file);
    fputc('l', file);
    fputc('o', file);
    fputc('\\n', file);

    fclose(file);
    printf("Character written to file\\n");

    return 0;
}
\`\`\`

**Parameters:**
- `char`: Character to write (converted to `unsigned char`)
- `stream`: File to write to

**Returns:**
- The character written on success
- `EOF` on error

### Character Filter Example

\`\`\`c
#include <stdio.h>
#include <ctype.h>

// Copy file, converting lowercase to uppercase
void copy_with_uppercase(const char* input_file, const char* output_file) {
    FILE* in = fopen(input_file, "r");
    FILE* out = fopen(output_file, "w");

    if (in == NULL || out == NULL) {
        perror("Error opening files");
        if (in) fclose(in);
        if (out) fclose(out);
        return;
    }

    int ch;
    while ((ch = fgetc(in)) != EOF) {
        // Convert lowercase to uppercase
        if (islower(ch)) {
            ch = toupper(ch);
        }

        if (fputc(ch, out) == EOF) {
            perror("Error writing to file");
            break;
        }
    }

    fclose(in);
    fclose(out);
}

int main() {
    copy_with_uppercase("input.txt", "output.txt");
    printf("File processed\\n");

    return 0;
}
\`\`\`

---

## 📝 String and Line-Based Writing

### fputs() - Write String

\`\`\`c
#include <stdio.h>

int main() {
    FILE* file = fopen("message.txt", "w");

    if (file == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Write strings (without automatic newline)
    fputs("Hello, World!\\n", file);
    fputs("This is line 2.\\n", file);
    fputs("This is line 3.", file);  // No newline at end

    fclose(file);
    printf("Strings written to file\\n");

    return 0;
}
\`\`\`

**Note:** `fputs()` does NOT add a newline automatically

### Writing Multiple Lines

\`\`\`c
#include <stdio.h>

// Write array of strings to file
void write_lines(FILE* file, const char* lines[], int count) {
    for (int i = 0; i < count; i++) {
        if (fputs(lines[i], file) == EOF) {
            perror("Error writing line");
            return;
        }

        // Add newline after each line (except possibly last)
        if (i < count - 1) {
            if (fputc('\\n', file) == EOF) {
                perror("Error writing newline");
                return;
            }
        }
    }
}

int main() {
    const char* poem[] = {
        "Roses are red,",
        "Violets are blue,",
        "Files are fun,",
        "And so are you!"
    };

    FILE* file = fopen("poem.txt", "w");

    if (file != NULL) {
        write_lines(file, poem, 4);
        fclose(file);
        printf("Poem written to file\\n");
    }

    return 0;
}
\`\`\`

---

## 🔢 Formatted Output Writing

### fprintf() - Formatted Writing

\`\`\`c
#include <stdio.h>

typedef struct {
    char name[50];
    int age;
    float gpa;
} Student;

int main() {
    FILE* file = fopen("students.txt", "w");

    if (file == NULL) {
        perror("Error opening file");
        return 1;
    }

    Student students[] = {
        {"Alice", 20, 3.8},
        {"Bob", 19, 3.5},
        {"Charlie", 21, 4.0}
    };

    int count = sizeof(students) / sizeof(students[0]);

    // Write header
    fprintf(file, "Student Records\\n");
    fprintf(file, "================\\n\\n");

    // Write formatted data
    for (int i = 0; i < count; i++) {
        fprintf(file, "Name: %-10s Age: %2d GPA: %.2f\\n",
               students[i].name, students[i].age, students[i].gpa);
    }

    // Write summary
    fprintf(file, "\\nTotal students: %d\\n", count);

    fclose(file);
    printf("Student data written to file\\n");

    return 0;
}
\`\`\`

**Format specifiers work exactly like `printf()`:**
- `%d`, `%i` - integers
- `%f`, `%g` - floating point
- `%c` - characters
- `%s` - strings
- `%x`, `%X` - hexadecimal
- `%%` - literal percent sign

### CSV File Writing

\`\`\`c
#include <stdio.h>

typedef struct {
    char name[50];
    int age;
    char city[30];
    float salary;
} Employee;

void write_csv_header(FILE* file) {
    fprintf(file, "Name,Age,City,Salary\\n");
}

void write_employee_csv(FILE* file, const Employee* emp) {
    // Escape commas in strings if needed
    fprintf(file, "%s,%d,%s,%.2f\\n",
           emp->name, emp->age, emp->city, emp->salary);
}

int main() {
    Employee employees[] = {
        {"John Doe", 30, "New York", 75000.50},
        {"Jane Smith", 25, "Los Angeles", 68000.00},
        {"Bob Johnson", 35, "Chicago", 82000.75}
    };

    FILE* file = fopen("employees.csv", "w");

    if (file != NULL) {
        write_csv_header(file);

        int count = sizeof(employees) / sizeof(employees[0]);
        for (int i = 0; i < count; i++) {
            write_employee_csv(file, &employees[i]);
        }

        fclose(file);
        printf("CSV file written\\n");
    }

    return 0;
}
\`\`\`

---

## 📦 Binary File Writing

### fwrite() - Write Binary Data

\`\`\`c
#include <stdio.h>

typedef struct {
    int id;
    char name[50];
    float salary;
} Employee;

int main() {
    Employee employees[] = {
        {1001, "Alice Johnson", 75000.50},
        {1002, "Bob Smith", 68000.00},
        {1003, "Charlie Brown", 72000.25}
    };

    FILE* file = fopen("employees.bin", "wb");

    if (file == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Write entire array at once
    size_t elements_written = fwrite(employees, sizeof(Employee),
                                   sizeof(employees) / sizeof(employees[0]), file);

    printf("Wrote %zu employee records\\n", elements_written);

    fclose(file);
    return 0;
}
\`\`\`

**Parameters:**
- `ptr`: Pointer to data to write
- `size`: Size of each element
- `count`: Number of elements to write
- `stream`: File to write to

**Returns:** Number of elements successfully written

### Writing Mixed Data Types

\`\`\`c
#include <stdio.h>

// Write binary header + data
typedef struct {
    char magic[4];      // "DATA"
    int version;
    int record_count;
} FileHeader;

typedef struct {
    int id;
    double value;
    char name[32];
} DataRecord;

void write_data_file(const char* filename, const DataRecord* records, int count) {
    FILE* file = fopen(filename, "wb");

    if (file == NULL) {
        perror("Error opening file");
        return;
    }

    // Write header
    FileHeader header = {"DATA", 1, count};
    fwrite(&header, sizeof(FileHeader), 1, file);

    // Write records
    fwrite(records, sizeof(DataRecord), count, file);

    fclose(file);
    printf("Data file written with %d records\\n", count);
}

int main() {
    DataRecord records[] = {
        {1, 3.14159, "Pi"},
        {2, 2.71828, "Euler"},
        {3, 1.41421, "Sqrt(2)"}
    };

    write_data_file("math_data.bin", records, 3);

    return 0;
}
\`\`\`

---

## 🎯 Writing Strategies and Patterns

### Buffered vs Unbuffered Writing

\`\`\`c
#include <stdio.h>
#include <time.h>

// Compare writing speeds
void write_characters_slow(FILE* file, int count) {
    for (int i = 0; i < count; i++) {
        fputc('A' + (i % 26), file);
        fflush(file);  // Force write after each character
    }
}

void write_characters_fast(FILE* file, int count) {
    for (int i = 0; i < count; i++) {
        fputc('A' + (i % 26), file);
        // Let buffering handle writes
    }
}

double time_write(void (*write_func)(FILE*, int), const char* filename, int count) {
    FILE* file = fopen(filename, "w");

    if (file == NULL) return -1;

    clock_t start = clock();
    write_func(file, count);
    clock_t end = clock();

    fclose(file);

    return (double)(end - start) / CLOCKS_PER_SEC;
}

int main() {
    int char_count = 10000;

    printf("Writing %d characters:\\n", char_count);

    double slow_time = time_write(write_characters_slow, "slow.txt", char_count);
    printf("Slow (fflush each): %.3f seconds\\n", slow_time);

    double fast_time = time_write(write_characters_fast, "fast.txt", char_count);
    printf("Fast (buffered): %.3f seconds\\n", fast_time);

    printf("Speedup: %.1fx\\n", slow_time / fast_time);

    return 0;
}
\`\`\`

### Appending to Files

\`\`\`c
#include <stdio.h>
#include <time.h>

// Log function that appends to file
void log_message(const char* filename, const char* message) {
    FILE* file = fopen(filename, "a");  // Append mode

    if (file == NULL) {
        perror("Error opening log file");
        return;
    }

    // Get current time
    time_t now = time(NULL);
    char* time_str = ctime(&now);
    time_str[strlen(time_str) - 1] = '\\0';  // Remove newline

    // Write log entry
    fprintf(file, "[%s] %s\\n", time_str, message);

    fclose(file);
}

int main() {
    log_message("app.log", "Application started");
    log_message("app.log", "Processing data...");
    log_message("app.log", "Data processing complete");
    log_message("app.log", "Application finished");

    printf("Log messages written\\n");

    return 0;
}
\`\`\`

---

## 🧪 Complete File Writing Examples

### Configuration File Writer

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char key[50];
    char value[100];
    char comment[200];
} ConfigEntry;

void write_config_entry(FILE* file, const ConfigEntry* entry) {
    // Write comment if present
    if (strlen(entry->comment) > 0) {
        fprintf(file, "# %s\\n", entry->comment);
    }

    // Write key-value pair
    fprintf(file, "%s = %s\\n", entry->key, entry->value);

    // Add blank line after commented entries
    if (strlen(entry->comment) > 0) {
        fprintf(file, "\\n");
    }
}

void write_config_file(const char* filename, const ConfigEntry* entries, int count) {
    FILE* file = fopen(filename, "w");

    if (file == NULL) {
        perror("Error creating config file");
        return;
    }

    // Write header
    fprintf(file, "# Application Configuration\\n");
    fprintf(file, "# Generated automatically\\n\\n");

    // Write entries
    for (int i = 0; i < count; i++) {
        write_config_entry(file, &entries[i]);
    }

    fclose(file);
    printf("Configuration written to %s\\n", filename);
}

int main() {
    ConfigEntry config[] = {
        {"app_name", "MyApplication", "Application settings"},
        {"version", "1.0.0", ""},
        {"debug_mode", "false", ""},
        {"max_connections", "100", "Server settings"},
        {"timeout", "30", ""},
        {"log_level", "INFO", "Logging settings"},
        {"log_file", "app.log", ""}
    };

    write_config_file("app.config",
                     config, sizeof(config) / sizeof(config[0]));

    return 0;
}
\`\`\`

### Binary Image Writer

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char magic[4];      // "IMG\\0"
    int width;
    int height;
    int channels;       // 1=gray, 3=RGB, 4=RGBA
    size_t data_size;
} ImageHeader;

typedef struct {
    ImageHeader header;
    unsigned char* data;
} Image;

Image* create_image(int width, int height, int channels) {
    Image* image = malloc(sizeof(Image));

    if (image == NULL) return NULL;

    // Initialize header
    memcpy(image->header.magic, "IMG\\0", 4);
    image->header.width = width;
    image->header.height = height;
    image->header.channels = channels;
    image->header.data_size = (size_t)width * height * channels;

    // Allocate data
    image->data = malloc(image->header.data_size);

    if (image->data == NULL) {
        free(image);
        return NULL;
    }

    // Initialize to black/clear
    memset(image->data, 0, image->header.data_size);

    return image;
}

void destroy_image(Image* image) {
    if (image != NULL) {
        free(image->data);
        free(image);
    }
}

int save_image(const Image* image, const char* filename) {
    FILE* file = fopen(filename, "wb");

    if (file == NULL) {
        perror("Error opening file for writing");
        return 0;
    }

    // Write header
    if (fwrite(&image->header, sizeof(ImageHeader), 1, file) != 1) {
        perror("Error writing header");
        fclose(file);
        return 0;
    }

    // Write pixel data
    if (fwrite(image->data, 1, image->header.data_size, file) != image->header.data_size) {
        perror("Error writing image data");
        fclose(file);
        return 0;
    }

    fclose(file);
    return 1;
}

void set_pixel(Image* image, int x, int y, unsigned char r, unsigned char g, unsigned char b) {
    if (x < 0 || x >= image->header.width || y < 0 || y >= image->header.height) {
        return;
    }

    size_t offset = (y * image->header.width + x) * image->header.channels;

    if (image->header.channels >= 3) {
        image->data[offset] = r;
        image->data[offset + 1] = g;
        image->data[offset + 2] = b;
    }
}

int main() {
    // Create a simple RGB image
    Image* image = create_image(100, 100, 3);

    if (image != NULL) {
        // Draw a simple pattern
        for (int y = 0; y < 100; y++) {
            for (int x = 0; x < 100; x++) {
                unsigned char r = (unsigned char)(x * 255 / 99);
                unsigned char g = (unsigned char)(y * 255 / 99);
                unsigned char b = 128;

                set_pixel(image, x, y, r, g, b);
            }
        }

        if (save_image(image, "gradient.img")) {
            printf("Image saved successfully\\n");
        }

        destroy_image(image);
    }

    return 0;
}
\`\`\`

---

## 🎯 Writing Methods Comparison

| Method | Use Case | Advantages | Disadvantages |
|--------|----------|------------|---------------|
| `fputc()` | Character output | Simple, precise control | Slow for large amounts |
| `fputs()` | String output | Efficient for strings | No automatic formatting |
| `fprintf()` | Formatted output | Flexible formatting | Slower than binary |
| `fwrite()` | Binary output | Fast, exact data | No text conversion |

### Best Practices

1. **Choose appropriate method** for your data type
2. **Use text mode** for human-readable data, binary for performance
3. **Always check return values** for write errors
4. **Flush buffers** when immediate writing is needed
5. **Use append mode** for log files and incremental writes
6. **Close files** to ensure data is written

---

## 🚀 Preview: File Positioning

In the next topic, you'll learn about:
- **File position indicators** and current position
- **Seeking** to specific positions with `fseek()`
- **Positioning modes** (SEEK_SET, SEEK_CUR, SEEK_END)
- **Getting file size** and position
- **Random access** file operations

**File positioning enables efficient random access and file size calculation!** 📍

