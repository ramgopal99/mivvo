import { SubLesson } from '../../../data/lessonsData';

export const topic_8_3: SubLesson = {
  id: 8.3,
  title: 'Reading from Files',
  status: 'completed',
  content: `# 📖 Reading from Files

Master various techniques for reading data from files, from simple character input to complex formatted and binary data reading.

---

## 🔤 Character-Based Reading

### fgetc() - Read Single Character

\`\`\`c
#include <stdio.h>

int main() {
    FILE* file = fopen("text.txt", "r");

    if (file == NULL) {
        perror("Error opening file");
        return 1;
    }

    int ch;
    while ((ch = fgetc(file)) != EOF) {
        putchar(ch);  // Print character to console
    }

    fclose(file);
    return 0;
}
\`\`\`

**Key points:**
- Returns `int` (not `char`) to handle EOF
- Returns `EOF` when end of file is reached
- Handles all character values including `\\0`

### Character Counter Example

\`\`\`c
#include <stdio.h>

void count_characters(const char* filename) {
    FILE* file = fopen(filename, "r");

    if (file == NULL) {
        perror("Error opening file");
        return;
    }

    int chars = 0, lines = 0, words = 0;
    int ch, prev_ch = ' ';

    while ((ch = fgetc(file)) != EOF) {
        chars++;

        if (ch == '\\n') {
            lines++;
        }

        // Count word starts (space/tab/newline to non-space)
        if ((prev_ch == ' ' || prev_ch == '\\t' || prev_ch == '\\n') &&
            (ch != ' ' && ch != '\\t' && ch != '\\n')) {
            words++;
        }

        prev_ch = ch;
    }

    printf("File: %s\\n", filename);
    printf("Characters: %d\\n", chars);
    printf("Lines: %d\\n", lines);
    printf("Words: %d\\n", words);

    fclose(file);
}

int main() {
    count_characters("sample.txt");
    return 0;
}
\`\`\`

---

## 📝 Line-Based Reading

### fgets() - Read Line with Buffer

\`\`\`c
#include <stdio.h>

int main() {
    FILE* file = fopen("poem.txt", "r");

    if (file == NULL) {
        perror("Error opening file");
        return 1;
    }

    char line[256];

    while (fgets(line, sizeof(line), file) != NULL) {
        printf("Line: %s", line);  // fgets includes newline
    }

    fclose(file);
    return 0;
}
\`\`\`

**Parameters:**
- `buffer`: Where to store the read line
- `size`: Maximum characters to read (including null terminator)
- `stream`: File to read from

**Returns:**
- `buffer` on success
- `NULL` on error or end of file

### Safe Line Reading

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Read line of any length (dynamic allocation)
char* read_line(FILE* file) {
    size_t buffer_size = 128;
    size_t length = 0;
    char* buffer = malloc(buffer_size);

    if (buffer == NULL) return NULL;

    int ch;
    while ((ch = fgetc(file)) != EOF && ch != '\\n') {
        if (length + 1 >= buffer_size) {
            buffer_size *= 2;
            char* new_buffer = realloc(buffer, buffer_size);

            if (new_buffer == NULL) {
                free(buffer);
                return NULL;
            }

            buffer = new_buffer;
        }

        buffer[length++] = ch;
    }

    if (ch == EOF && length == 0) {
        free(buffer);
        return NULL;  // No data read
    }

    buffer[length] = '\\0';
    return buffer;
}

int main() {
    FILE* file = fopen("data.txt", "r");

    if (file != NULL) {
        char* line;

        while ((line = read_line(file)) != NULL) {
            printf("Read: %s\\n", line);
            free(line);
        }

        fclose(file);
    }

    return 0;
}
\`\`\`

### Line Numbering Example

\`\`\`c
#include <stdio.h>

void print_file_with_numbers(const char* filename) {
    FILE* file = fopen(filename, "r");

    if (file == NULL) {
        perror("Error opening file");
        return;
    }

    char line[1024];
    int line_num = 1;

    while (fgets(line, sizeof(line), file) != NULL) {
        printf("%4d: %s", line_num++, line);
    }

    fclose(file);
}

int main() {
    print_file_with_numbers("source.c");
    return 0;
}
\`\`\`

---

## 🔢 Formatted Input Reading

### fscanf() - Formatted Reading

\`\`\`c
#include <stdio.h>

int main() {
    FILE* file = fopen("students.txt", "r");

    if (file == NULL) {
        perror("Error opening file");
        return 1;
    }

    char name[50];
    int age;
    float gpa;

    // Read formatted data
    while (fscanf(file, "%49s %d %f", name, &age, &gpa) == 3) {
        printf("Student: %s, Age: %d, GPA: %.2f\\n", name, age, gpa);
    }

    fclose(file);
    return 0;
}
\`\`\`

**Return value:** Number of successfully matched and assigned items

### Robust Formatted Reading

\`\`\`c
#include <stdio.h>

typedef struct {
    char name[50];
    int id;
    float salary;
} Employee;

int read_employee(FILE* file, Employee* emp) {
    // Read line first to handle errors better
    char line[256];

    if (fgets(line, sizeof(line), file) == NULL) {
        return 0;  // EOF or error
    }

    // Parse the line
    int result = sscanf(line, "%49s %d %f",
                       emp->name, &emp->id, &emp->salary);

    return result == 3;  // Success if all 3 fields read
}

int main() {
    FILE* file = fopen("employees.txt", "r");

    if (file != NULL) {
        Employee emp;

        while (read_employee(file, &emp)) {
            printf("Employee: %s (ID: %d) Salary: $%.2f\\n",
                   emp->name, emp->id, emp->salary);
        }

        fclose(file);
    }

    return 0;
}
\`\`\`

### CSV File Reading

\`\`\`c
#include <stdio.h>
#include <string.h>

void parse_csv_line(char* line, char* fields[], int max_fields) {
    int field_count = 0;
    char* token = strtok(line, ",");

    while (token != NULL && field_count < max_fields) {
        // Remove leading/trailing whitespace
        while (*token == ' ') token++;
        char* end = token + strlen(token) - 1;
        while (end > token && *end == ' ') *end-- = '\\0';

        fields[field_count++] = token;
        token = strtok(NULL, ",");
    }

    // Null terminate field list
    if (field_count < max_fields) {
        fields[field_count] = NULL;
    }
}

int main() {
    FILE* file = fopen("data.csv", "r");

    if (file != NULL) {
        char line[1024];
        char* fields[10];

        while (fgets(line, sizeof(line), file) != NULL) {
            // Remove newline
            line[strcspn(line, "\\n")] = 0;

            parse_csv_line(line, fields, 10);

            if (fields[0] != NULL) {
                printf("Row: %s, %s, %s\\n",
                       fields[0],
                       fields[1] ? fields[1] : "",
                       fields[2] ? fields[2] : "");
            }
        }

        fclose(file);
    }

    return 0;
}
\`\`\`

---

## 📦 Binary File Reading

### fread() - Read Binary Data

\`\`\`c
#include <stdio.h>

typedef struct {
    int id;
    char name[50];
    float salary;
} Employee;

int main() {
    FILE* file = fopen("employees.bin", "rb");

    if (file == NULL) {
        perror("Error opening file");
        return 1;
    }

    Employee emp;

    // Read entire structure
    while (fread(&emp, sizeof(Employee), 1, file) == 1) {
        printf("ID: %d, Name: %s, Salary: %.2f\\n",
               emp.id, emp.name, emp.salary);
    }

    fclose(file);
    return 0;
}
\`\`\`

**Parameters:**
- `ptr`: Buffer to store read data
- `size`: Size of each element
- `count`: Number of elements to read
- `stream`: File to read from

**Returns:** Number of elements successfully read

### Reading Arrays and Buffers

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

size_t read_file_to_buffer(const char* filename, char** buffer) {
    FILE* file = fopen(filename, "rb");

    if (file == NULL) {
        return 0;
    }

    // Get file size
    fseek(file, 0, SEEK_END);
    size_t file_size = ftell(file);
    rewind(file);

    // Allocate buffer
    *buffer = malloc(file_size + 1);
    if (*buffer == NULL) {
        fclose(file);
        return 0;
    }

    // Read entire file
    size_t bytes_read = fread(*buffer, 1, file_size, file);
    (*buffer)[bytes_read] = '\\0';  // Null terminate

    fclose(file);
    return bytes_read;
}

int main() {
    char* content = NULL;
    size_t size = read_file_to_buffer("large_file.txt", &content);

    if (size > 0) {
        printf("Read %zu bytes\\n", size);
        printf("First 100 chars: %.100s\\n", content);
        free(content);
    }

    return 0;
}
\`\`\`

---

## 🎯 Reading Strategies and Patterns

### Reading Until Specific Condition

\`\`\`c
#include <stdio.h>
#include <string.h>

// Read until blank line
void read_paragraph(FILE* file) {
    char line[1024];

    printf("Paragraph:\\n");

    while (fgets(line, sizeof(line), file) != NULL) {
        // Remove newline
        line[strcspn(line, "\\n")] = 0;

        // Stop at blank line
        if (strlen(line) == 0) {
            break;
        }

        printf("  %s\\n", line);
    }
}

// Read fixed number of records
void read_records(FILE* file, int num_records) {
    for (int i = 0; i < num_records; i++) {
        char name[50];
        int age;

        if (fscanf(file, "%49s %d", name, &age) == 2) {
            printf("Record %d: %s, %d\\n", i + 1, name, age);
        } else {
            printf("Error reading record %d\\n", i + 1);
            break;
        }
    }
}

int main() {
    FILE* file = fopen("document.txt", "r");

    if (file != NULL) {
        read_paragraph(file);
        printf("\\n");
        read_records(file, 3);

        fclose(file);
    }

    return 0;
}
\`\`\`

### Error Handling in Reading

\`\`\`c
#include <stdio.h>

typedef enum {
    READ_SUCCESS,
    READ_EOF,
    READ_ERROR,
    READ_FORMAT_ERROR
} ReadResult;

ReadResult safe_read_int(FILE* file, int* value) {
    if (feof(file)) {
        return READ_EOF;
    }

    if (ferror(file)) {
        return READ_ERROR;
    }

    int items_read = fscanf(file, "%d", value);

    if (items_read == 1) {
        return READ_SUCCESS;
    } else if (items_read == EOF) {
        return feof(file) ? READ_EOF : READ_ERROR;
    } else {
        return READ_FORMAT_ERROR;
    }
}

void process_numbers(const char* filename) {
    FILE* file = fopen(filename, "r");

    if (file == NULL) {
        perror("Error opening file");
        return;
    }

    int number;
    int count = 0;
    ReadResult result;

    while ((result = safe_read_int(file, &number)) == READ_SUCCESS) {
        printf("Number %d: %d\\n", ++count, number);
    }

    if (result == READ_EOF) {
        printf("End of file reached\\n");
    } else if (result == READ_ERROR) {
        perror("Read error");
    } else if (result == READ_FORMAT_ERROR) {
        printf("Invalid number format\\n");
    }

    fclose(file);
}

int main() {
    process_numbers("numbers.txt");
    return 0;
}
\`\`\`

---

## 🧪 Complete File Reading Examples

### Configuration File Parser

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

typedef struct {
    char key[50];
    char value[100];
} ConfigEntry;

typedef struct {
    ConfigEntry* entries;
    int count;
    int capacity;
} Config;

Config* config_create() {
    Config* config = malloc(sizeof(Config));

    if (config != NULL) {
        config->entries = NULL;
        config->count = 0;
        config->capacity = 0;
    }

    return config;
}

void config_destroy(Config* config) {
    if (config != NULL) {
        free(config->entries);
        free(config);
    }
}

int config_parse_line(char* line, ConfigEntry* entry) {
    // Skip comments and empty lines
    if (line[0] == '#' || line[0] == ';' || strlen(line) == 0) {
        return 0;
    }

    // Find equals sign
    char* equals = strchr(line, '=');

    if (equals == NULL) {
        return 0;  // No equals sign
    }

    // Split key and value
    *equals = '\\0';
    char* key = line;
    char* value = equals + 1;

    // Trim whitespace
    while (isspace(*key)) key++;
    char* key_end = key + strlen(key) - 1;
    while (key_end > key && isspace(*key_end)) *key_end-- = '\\0';

    while (isspace(*value)) value++;
    char* value_end = value + strlen(value) - 1;
    while (value_end > value && isspace(*value_end)) *value_end-- = '\\0';

    // Copy to entry
    strncpy(entry->key, key, sizeof(entry->key) - 1);
    strncpy(entry->value, value, sizeof(entry->value) - 1);

    entry->key[sizeof(entry->key) - 1] = '\\0';
    entry->value[sizeof(entry->value) - 1] = '\\0';

    return 1;
}

int config_load(Config* config, const char* filename) {
    FILE* file = fopen(filename, "r");

    if (file == NULL) {
        return 0;
    }

    char line[256];

    while (fgets(line, sizeof(line), file) != NULL) {
        // Remove newline
        line[strcspn(line, "\\n")] = 0;

        ConfigEntry entry;

        if (config_parse_line(line, &entry)) {
            // Resize array if needed
            if (config->count >= config->capacity) {
                int new_capacity = config->capacity == 0 ? 8 : config->capacity * 2;
                ConfigEntry* new_entries = realloc(config->entries,
                                                 new_capacity * sizeof(ConfigEntry));

                if (new_entries == NULL) {
                    fclose(file);
                    return 0;
                }

                config->entries = new_entries;
                config->capacity = new_capacity;
            }

            config->entries[config->count++] = entry;
        }
    }

    fclose(file);
    return 1;
}

const char* config_get(const Config* config, const char* key) {
    for (int i = 0; i < config->count; i++) {
        if (strcmp(config->entries[i].key, key) == 0) {
            return config->entries[i].value;
        }
    }

    return NULL;
}

int main() {
    Config* config = config_create();

    if (config != NULL) {
        if (config_load(config, "app.config")) {
            printf("Configuration loaded:\\n");

            const char* port = config_get(config, "port");
            const char* debug = config_get(config, "debug");

            if (port) printf("Port: %s\\n", port);
            if (debug) printf("Debug: %s\\n", debug);
        }

        config_destroy(config);
    }

    return 0;
}
\`\`\`

### Binary File Reader

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int width;
    int height;
    unsigned char* pixels;
} Image;

Image* image_load(const char* filename) {
    FILE* file = fopen(filename, "rb");

    if (file == NULL) {
        return NULL;
    }

    Image* image = malloc(sizeof(Image));

    if (image == NULL) {
        fclose(file);
        return NULL;
    }

    // Read header
    if (fread(&image->width, sizeof(int), 1, file) != 1 ||
        fread(&image->height, sizeof(int), 1, file) != 1) {
        free(image);
        fclose(file);
        return NULL;
    }

    // Allocate pixel data
    size_t pixel_count = (size_t)image->width * image->height * 3;  // RGB
    image->pixels = malloc(pixel_count);

    if (image->pixels == NULL) {
        free(image);
        fclose(file);
        return NULL;
    }

    // Read pixel data
    if (fread(image->pixels, 1, pixel_count, file) != pixel_count) {
        free(image->pixels);
        free(image);
        fclose(file);
        return NULL;
    }

    fclose(file);
    return image;
}

void image_destroy(Image* image) {
    if (image != NULL) {
        free(image->pixels);
        free(image);
    }
}

void image_print_info(const Image* image) {
    if (image != NULL) {
        printf("Image: %dx%d\\n", image->width, image->height);
        printf("Pixel data size: %zu bytes\\n",
               (size_t)image->width * image->height * 3);
    }
}

int main() {
    Image* image = image_load("image.raw");

    if (image != NULL) {
        image_print_info(image);
        image_destroy(image);
    } else {
        printf("Failed to load image\\n");
    }

    return 0;
}
\`\`\`

---

## 🎯 Reading Methods Comparison

| Method | Use Case | Advantages | Disadvantages |
|--------|----------|------------|---------------|
| `fgetc()` | Character processing | Handles all chars, simple | Slow for large files |
| `fgets()` | Line processing | Safe buffer handling | May read partial lines |
| `fscanf()` | Formatted data | Type conversion | Fragile with bad input |
| `fread()` | Binary data | Fast, raw data | No type conversion |

### Best Practices

1. **Choose appropriate method** for your data type
2. **Always check return values** for errors
3. **Handle buffer sizes** carefully to prevent overflows
4. **Validate input data** before processing
5. **Use binary mode** for binary data, text mode for text
6. **Close files** immediately after reading

---

## 🚀 Preview: Writing to Files

In the next topic, you'll learn about:
- **Character-based writing** with `fputc()` and `fgetc()`
- **String and line writing** with `fputs()` and `fprintf()`
- **Formatted output** with `fprintf()` and `printf()`
- **Binary writing** with `fwrite()`
- **Writing strategies** and buffer management

**Writing data to files enables data persistence and sharing!** ✍️

