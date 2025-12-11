import { SubLesson } from '../../../data/lessonsData';

export const topic_8_7: SubLesson = {
  id: 8.7,
  title: 'Binary vs Text Files',
  status: 'completed',
  content: `# 🔄 Binary vs Text Files

Master the crucial differences between text and binary file formats, understand when to use each approach, and handle portability issues for robust file I/O.

---

## 🎯 Text vs Binary Files

### Text Files

**Human-readable files containing character data**

**Characteristics:**
- ✅ Human readable
- ✅ Platform-independent text representation
- ✅ Can be edited with text editors
- ✅ Standard formats (CSV, JSON, XML, etc.)
- ❌ Larger file sizes
- ❌ Slower I/O operations
- ❌ Precision loss for floating-point numbers
- ❌ Limited data type support

**Examples:**
- Configuration files (.ini, .conf)
- Log files (.log)
- Source code files (.c, .h, .txt)
- CSV data files

### Binary Files

**Machine-readable files containing raw binary data**

**Characteristics:**
- ✅ Compact storage (exact byte representation)
- ✅ Fast I/O operations
- ✅ Preserves exact data values
- ✅ Supports all data types
- ❌ Not human readable
- ❌ Platform-dependent (endianness, data sizes)
- ❌ Cannot be edited with text editors
- ❌ Requires specific programs to read

**Examples:**
- Executable files (.exe, .bin)
- Image files (.jpg, .png, .bmp)
- Database files (.db, .sqlite)
- Serialized object files

---

## 📖 Text File Operations

### Writing Text Data

\`\`\`c
#include <stdio.h>

typedef struct {
    char name[50];
    int age;
    float gpa;
} Student;

void save_students_text(const char* filename, const Student* students, int count) {
    FILE* file = fopen(filename, "w");

    if (file == NULL) {
        perror("Error opening file");
        return;
    }

    // Write header
    fprintf(file, "# Student Records\\n");
    fprintf(file, "# Name,Age,GPA\\n");

    // Write data
    for (int i = 0; i < count; i++) {
        fprintf(file, "%s,%d,%.2f\\n",
               students[i].name,
               students[i].age,
               students[i].gpa);
    }

    fclose(file);
    printf("Students saved as text (%d records)\\n", count);
}

int main() {
    Student students[] = {
        {"Alice", 20, 3.8},
        {"Bob", 19, 3.5},
        {"Charlie", 21, 4.0}
    };

    save_students_text("students.txt", students, 3);

    return 0;
}
\`\`\`

### Reading Text Data

\`\`\`c
#include <stdio.h>
#include <string.h>

#define MAX_STUDENTS 100

typedef struct {
    char name[50];
    int age;
    float gpa;
} Student;

int load_students_text(const char* filename, Student* students, int max_count) {
    FILE* file = fopen(filename, "r");

    if (file == NULL) {
        perror("Error opening file");
        return -1;
    }

    char line[256];
    int count = 0;

    while (fgets(line, sizeof(line), file) != NULL && count < max_count) {
        // Skip comments
        if (line[0] == '#') continue;

        // Remove newline
        line[strcspn(line, "\\n")] = 0;

        // Parse CSV
        char* name = strtok(line, ",");
        char* age_str = strtok(NULL, ",");
        char* gpa_str = strtok(NULL, ",");

        if (name && age_str && gpa_str) {
            strcpy(students[count].name, name);
            students[count].age = atoi(age_str);
            students[count].gpa = atof(gpa_str);
            count++;
        }
    }

    fclose(file);
    return count;
}

int main() {
    Student students[MAX_STUDENTS];
    int count = load_students_text("students.txt", students, MAX_STUDENTS);

    if (count > 0) {
        printf("Loaded %d students from text file:\\n", count);

        for (int i = 0; i < count; i++) {
            printf("  %s (age %d, GPA %.2f)\\n",
                   students[i].name,
                   students[i].age,
                   students[i].gpa);
        }
    }

    return 0;
}
\`\`\`

---

## 📦 Binary File Operations

### Writing Binary Data

\`\`\`c
#include <stdio.h>

typedef struct {
    char name[50];
    int age;
    float gpa;
} Student;

void save_students_binary(const char* filename, const Student* students, int count) {
    FILE* file = fopen(filename, "wb");

    if (file == NULL) {
        perror("Error opening file");
        return;
    }

    // Write record count first
    fwrite(&count, sizeof(int), 1, file);

    // Write all student records
    fwrite(students, sizeof(Student), count, file);

    fclose(file);
    printf("Students saved as binary (%d records, %zu bytes each)\\n",
           count, sizeof(Student));
}

int main() {
    Student students[] = {
        {"Alice", 20, 3.8},
        {"Bob", 19, 3.5},
        {"Charlie", 21, 4.0}
    };

    save_students_binary("students.bin", students, 3);

    return 0;
}
\`\`\`

### Reading Binary Data

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    char name[50];
    int age;
    float gpa;
} Student;

Student* load_students_binary(const char* filename, int* count) {
    FILE* file = fopen(filename, "rb");

    if (file == NULL) {
        perror("Error opening file");
        return NULL;
    }

    // Read record count
    int record_count;
    if (fread(&record_count, sizeof(int), 1, file) != 1) {
        perror("Error reading record count");
        fclose(file);
        return NULL;
    }

    // Allocate memory for students
    Student* students = malloc(record_count * sizeof(Student));

    if (students == NULL) {
        printf("Memory allocation failed\\n");
        fclose(file);
        return NULL;
    }

    // Read all student records
    if (fread(students, sizeof(Student), record_count, file) != (size_t)record_count) {
        perror("Error reading student records");
        free(students);
        fclose(file);
        return NULL;
    }

    fclose(file);
    *count = record_count;
    return students;
}

int main() {
    int count;
    Student* students = load_students_binary("students.bin", &count);

    if (students != NULL) {
        printf("Loaded %d students from binary file:\\n", count);

        for (int i = 0; i < count; i++) {
            printf("  %s (age %d, GPA %.2f)\\n",
                   students[i].name,
                   students[i].age,
                   students[i].gpa);
        }

        free(students);
    }

    return 0;
}
\`\`\`

---

## ⚖️ Text vs Binary Comparison

### File Size Comparison

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

long get_file_size(const char* filename) {
    FILE* file = fopen(filename, "rb");

    if (file == NULL) return -1;

    fseek(file, 0, SEEK_END);
    long size = ftell(file);
    fclose(file);

    return size;
}

int main() {
    // Create test data
    Student students[] = {
        {"Alice Johnson", 20, 3.8},
        {"Bob Smith", 19, 3.5},
        {"Charlie Brown", 21, 4.0},
        {"Diana Prince", 22, 3.9},
        {"Edward Norton", 18, 3.2}
    };

    int count = sizeof(students) / sizeof(students[0]);

    // Save as text
    save_students_text("students.txt", students, count);

    // Save as binary
    save_students_binary("students.bin", students, count);

    // Compare sizes
    long text_size = get_file_size("students.txt");
    long binary_size = get_file_size("students.bin");

    printf("Text file size: %ld bytes\\n", text_size);
    printf("Binary file size: %ld bytes\\n", binary_size);
    printf("Binary is %.1f%% of text size\\n",
           (double)binary_size / text_size * 100);

    printf("\\nPer record:\\n");
    printf("Text: ~%ld bytes\\n", text_size / count);
    printf("Binary: %zu bytes\\n", sizeof(Student));

    return 0;
}
\`\`\`

### Performance Comparison

\`\`\`c
#include <stdio.h>
#include <time.h>

#define NUM_RECORDS 10000

typedef struct {
    int id;
    double data[10];
} Record;

double time_operation(void (*func)(void*), void* arg) {
    clock_t start = clock();
    func(arg);
    clock_t end = clock();

    return (double)(end - start) / CLOCKS_PER_SEC;
}

void save_text(void* arg) {
    Record* records = (Record*)arg;

    FILE* file = fopen("perf_text.txt", "w");

    if (file != NULL) {
        for (int i = 0; i < NUM_RECORDS; i++) {
            fprintf(file, "%d,", records[i].id);

            for (int j = 0; j < 10; j++) {
                fprintf(file, "%.6f%c",
                       records[i].data[j],
                       j < 9 ? ',' : '\\n');
            }
        }

        fclose(file);
    }
}

void save_binary(void* arg) {
    Record* records = (Record*)arg;

    FILE* file = fopen("perf_bin.dat", "wb");

    if (file != NULL) {
        fwrite(records, sizeof(Record), NUM_RECORDS, file);
        fclose(file);
    }
}

void load_text(void* arg) {
    Record* records = (Record*)arg;

    FILE* file = fopen("perf_text.txt", "r");

    if (file != NULL) {
        char line[1024];

        for (int i = 0; i < NUM_RECORDS && fgets(line, sizeof(line), file); i++) {
            // Parse line (simplified)
            sscanf(line, "%d,%lf,%lf,%lf,%lf,%lf,%lf,%lf,%lf,%lf,%lf",
                   &records[i].id,
                   &records[i].data[0], &records[i].data[1], &records[i].data[2],
                   &records[i].data[3], &records[i].data[4], &records[i].data[5],
                   &records[i].data[6], &records[i].data[7], &records[i].data[8],
                   &records[i].data[9]);
        }

        fclose(file);
    }
}

void load_binary(void* arg) {
    Record* records = (Record*)arg;

    FILE* file = fopen("perf_bin.dat", "rb");

    if (file != NULL) {
        fread(records, sizeof(Record), NUM_RECORDS, file);
        fclose(file);
    }
}

int main() {
    // Create test data
    Record* records = malloc(NUM_RECORDS * sizeof(Record));

    if (records == NULL) {
        printf("Memory allocation failed\\n");
        return 1;
    }

    for (int i = 0; i < NUM_RECORDS; i++) {
        records[i].id = i;

        for (int j = 0; j < 10; j++) {
            records[i].data[j] = (double)i * 3.14159 + j;
        }
    }

    printf("Performance test with %d records:\\n\\n", NUM_RECORDS);

    // Test writing
    double text_write_time = time_operation(save_text, records);
    double binary_write_time = time_operation(save_binary, records);

    printf("Write performance:\\n");
    printf("  Text:   %.3f seconds\\n", text_write_time);
    printf("  Binary: %.3f seconds (%.1fx faster)\\n\\n",
           binary_write_time, text_write_time / binary_write_time);

    // Test reading
    Record* read_records = malloc(NUM_RECORDS * sizeof(Record));

    if (read_records != NULL) {
        double text_read_time = time_operation(load_text, read_records);
        double binary_read_time = time_operation(load_binary, read_records);

        printf("Read performance:\\n");
        printf("  Text:   %.3f seconds\\n", text_read_time);
        printf("  Binary: %.3f seconds (%.1fx faster)\\n",
               binary_read_time, text_read_time / binary_read_time);

        free(read_records);
    }

    free(records);

    // Show file sizes
    long text_size = get_file_size("perf_text.txt");
    long binary_size = get_file_size("perf_bin.dat");

    printf("\\nFile sizes:\\n");
    printf("  Text:   %ld bytes\\n", text_size);
    printf("  Binary: %ld bytes (%.1f%% of text)\\n",
           binary_size, (double)binary_size / text_size * 100);

    return 0;
}
\`\`\`

---

## 🔄 Portability Issues

### Endianness Problems

**Different CPU architectures store multi-byte values differently**

\`\`\`c
#include <stdio.h>

// Detect system endianness
int is_little_endian() {
    unsigned int x = 1;
    return *(unsigned char*)&x == 1;
}

void write_portable_int(FILE* file, int value) {
    // Write in big-endian (network byte order)
    unsigned char bytes[4];

    bytes[0] = (value >> 24) & 0xFF;
    bytes[1] = (value >> 16) & 0xFF;
    bytes[2] = (value >> 8) & 0xFF;
    bytes[3] = value & 0xFF;

    fwrite(bytes, 1, 4, file);
}

int read_portable_int(FILE* file) {
    unsigned char bytes[4];

    if (fread(bytes, 1, 4, file) != 4) {
        return 0; // Error
    }

    // Reconstruct from big-endian
    return (bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3];
}

int main() {
    printf("System is %s endian\\n",
           is_little_endian() ? "little" : "big");

    // Demonstrate portable I/O
    FILE* file = fopen("portable.bin", "wb");

    if (file != NULL) {
        write_portable_int(file, 0x12345678);
        fclose(file);

        file = fopen("portable.bin", "rb");

        if (file != NULL) {
            int value = read_portable_int(file);
            printf("Read portable int: 0x%08X\\n", value);
            fclose(file);
        }
    }

    return 0;
}
\`\`\`

### Data Type Size Issues

\`\`\`c
#include <stdio.h>
#include <stdint.h>

// Use fixed-size types for portability
typedef struct {
    uint32_t id;        // Always 32 bits
    uint16_t age;       // Always 16 bits
    uint8_t flags;      // Always 8 bits
} PortableRecord;

int main() {
    printf("Data type sizes on this system:\\n");
    printf("  int: %zu bytes\\n", sizeof(int));
    printf("  long: %zu bytes\\n", sizeof(long));
    printf("  uint32_t: %zu bytes\\n", sizeof(uint32_t));
    printf("  uint16_t: %zu bytes\\n", sizeof(uint16_t));
    printf("  uint8_t: %zu bytes\\n", sizeof(uint8_t));

    return 0;
}
\`\`\`

---

## 🎯 Choosing the Right Format

### When to Use Text Files

✅ **Use text files when:**
- Data needs to be human readable
- Files will be edited by humans
- Interoperability with other programs
- Simple data structures
- Debugging and logging
- Configuration files
- Source code and scripts

### When to Use Binary Files

✅ **Use binary files when:**
- Performance is critical
- Exact data representation needed
- Large amounts of data
- Complex data structures
- Internal application data
- Multimedia files (images, audio, video)
- Database files

### Hybrid Approaches

\`\`\`c
// Text-based binary format (e.g., hex dump)
void save_hex_dump(const char* filename, const void* data, size_t size) {
    FILE* file = fopen(filename, "w");

    if (file != NULL) {
        const unsigned char* bytes = (const unsigned char*)data;

        for (size_t i = 0; i < size; i++) {
            if (i % 16 == 0) fprintf(file, "%08zX: ", i);

            fprintf(file, "%02X ", bytes[i]);

            if (i % 16 == 15 || i == size - 1) {
                fprintf(file, "\\n");
            }
        }

        fclose(file);
    }
}

// Structured text formats (JSON-like)
void save_json_students(const char* filename, const Student* students, int count) {
    FILE* file = fopen(filename, "w");

    if (file != NULL) {
        fprintf(file, "{\\n");
        fprintf(file, "  \\"students\\": [\\n");

        for (int i = 0; i < count; i++) {
            fprintf(file, "    {");
            fprintf(file, "\\"name\\": \\"%s\\", ", students[i].name);
            fprintf(file, "\\"age\\": %d, ", students[i].age);
            fprintf(file, "\\"gpa\\": %.2f", students[i].gpa);
            fprintf(file, "}");

            if (i < count - 1) {
                fprintf(file, ",");
            }

            fprintf(file, "\\n");
        }

        fprintf(file, "  ]\\n");
        fprintf(file, "}\\n");

        fclose(file);
    }
}
\`\`\`

---

## 🧪 Complete Examples

### Universal File Format Handler

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

typedef enum {
    FORMAT_TEXT,
    FORMAT_BINARY,
    FORMAT_UNKNOWN
} FileFormat;

typedef struct {
    char name[50];
    uint32_t age;
    float gpa;
} StudentRecord;

// Detect file format
FileFormat detect_format(const char* filename) {
    FILE* file = fopen(filename, "rb");

    if (file == NULL) {
        return FORMAT_UNKNOWN;
    }

    // Check for text indicators
    char buffer[256];
    size_t bytes_read = fread(buffer, 1, sizeof(buffer), file);
    fclose(file);

    // Look for non-printable characters (indicates binary)
    int has_binary = 0;

    for (size_t i = 0; i < bytes_read; i++) {
        if (buffer[i] < 32 && buffer[i] != '\\n' && buffer[i] != '\\r' && buffer[i] != '\\t') {
            has_binary = 1;
            break;
        }
    }

    if (has_binary) {
        return FORMAT_BINARY;
    }

    // Check for text patterns
    if (strstr(buffer, "#") == buffer || strstr(buffer, "name") != NULL) {
        return FORMAT_TEXT;
    }

    return FORMAT_UNKNOWN;
}

// Universal save function
int save_students(const char* filename, const StudentRecord* students,
                 int count, FileFormat format) {
    if (format == FORMAT_TEXT) {
        FILE* file = fopen(filename, "w");

        if (file == NULL) return 0;

        fprintf(file, "# Student Records\\n");
        fprintf(file, "# Name,Age,GPA\\n");

        for (int i = 0; i < count; i++) {
            fprintf(file, "%s,%u,%.2f\\n",
                   students[i].name,
                   students[i].age,
                   students[i].gpa);
        }

        fclose(file);

    } else if (format == FORMAT_BINARY) {
        FILE* file = fopen(filename, "wb");

        if (file == NULL) return 0;

        // Write header for validation
        uint32_t magic = 0x53545544; // "STUD"
        uint32_t version = 1;
        uint32_t record_count = count;

        fwrite(&magic, sizeof(uint32_t), 1, file);
        fwrite(&version, sizeof(uint32_t), 1, file);
        fwrite(&record_count, sizeof(uint32_t), 1, file);

        // Write records in portable format
        for (int i = 0; i < count; i++) {
            // Write name as counted string
            uint16_t name_len = strlen(students[i].name);
            fwrite(&name_len, sizeof(uint16_t), 1, file);
            fwrite(students[i].name, 1, name_len, file);

            // Write age and GPA in big-endian
            uint32_t be_age = __builtin_bswap32(students[i].age);
            uint32_t be_gpa = students[i].gpa * 100; // Store as integer
            be_gpa = __builtin_bswap32(be_gpa);

            fwrite(&be_age, sizeof(uint32_t), 1, file);
            fwrite(&be_gpa, sizeof(uint32_t), 1, file);
        }

        fclose(file);
    }

    return 1;
}

// Universal load function
StudentRecord* load_students(const char* filename, int* count, FileFormat* detected_format) {
    *detected_format = detect_format(filename);

    if (*detected_format == FORMAT_TEXT) {
        FILE* file = fopen(filename, "r");

        if (file == NULL) return NULL;

        // Count records first
        char line[256];
        int record_count = 0;

        while (fgets(line, sizeof(line), file) != NULL) {
            if (line[0] != '#' && strlen(line) > 1) {
                record_count++;
            }
        }

        rewind(file);

        StudentRecord* students = malloc(record_count * sizeof(StudentRecord));

        if (students == NULL) {
            fclose(file);
            return NULL;
        }

        int index = 0;

        while (fgets(line, sizeof(line), file) != NULL && index < record_count) {
            if (line[0] != '#') {
                line[strcspn(line, "\\n")] = 0;

                char* name = strtok(line, ",");
                char* age_str = strtok(NULL, ",");
                char* gpa_str = strtok(NULL, ",");

                if (name && age_str && gpa_str) {
                    strcpy(students[index].name, name);
                    students[index].age = atoi(age_str);
                    students[index].gpa = atof(gpa_str);
                    index++;
                }
            }
        }

        fclose(file);
        *count = record_count;
        return students;

    } else if (*detected_format == FORMAT_BINARY) {
        FILE* file = fopen(filename, "rb");

        if (file == NULL) return NULL;

        // Read and validate header
        uint32_t magic, version, record_count;

        if (fread(&magic, sizeof(uint32_t), 1, file) != 1 ||
            fread(&version, sizeof(uint32_t), 1, file) != 1 ||
            fread(&record_count, sizeof(uint32_t), 1, file) != 1) {
            fclose(file);
            return NULL;
        }

        if (magic != 0x53545544 || version != 1) {
            fclose(file);
            return NULL;
        }

        StudentRecord* students = malloc(record_count * sizeof(StudentRecord));

        if (students == NULL) {
            fclose(file);
            return NULL;
        }

        for (uint32_t i = 0; i < record_count; i++) {
            // Read name
            uint16_t name_len;

            if (fread(&name_len, sizeof(uint16_t), 1, file) != 1) {
                free(students);
                fclose(file);
                return NULL;
            }

            if (fread(students[i].name, 1, name_len, file) != name_len) {
                free(students);
                fclose(file);
                return NULL;
            }

            students[i].name[name_len] = '\\0';

            // Read age and GPA
            uint32_t be_age, be_gpa;

            if (fread(&be_age, sizeof(uint32_t), 1, file) != 1 ||
                fread(&be_gpa, sizeof(uint32_t), 1, file) != 1) {
                free(students);
                fclose(file);
                return NULL;
            }

            students[i].age = __builtin_bswap32(be_age);
            students[i].gpa = (float)__builtin_bswap32(be_gpa) / 100.0f;
        }

        fclose(file);
        *count = record_count;
        return students;
    }

    return NULL;
}

int main() {
    StudentRecord students[] = {
        {"Alice Johnson", 20, 3.8},
        {"Bob Smith", 19, 3.5},
        {"Charlie Brown", 21, 4.0}
    };

    int count = sizeof(students) / sizeof(students[0]);

    // Save in both formats
    save_students("students.txt", students, count, FORMAT_TEXT);
    save_students("students.bin", students, count, FORMAT_BINARY);

    // Load and compare
    printf("Original data:\\n");

    for (int i = 0; i < count; i++) {
        printf("  %s (age %u, GPA %.2f)\\n",
               students[i].name, students[i].age, students[i].gpa);
    }

    // Load from text file
    FileFormat format;
    int loaded_count;
    StudentRecord* loaded = load_students("students.txt", &loaded_count, &format);

    if (loaded != NULL) {
        printf("\\nLoaded from text file (format: %s):\\n",
               format == FORMAT_TEXT ? "text" : "binary");

        for (int i = 0; i < loaded_count; i++) {
            printf("  %s (age %u, GPA %.2f)\\n",
                   loaded[i].name, loaded[i].age, loaded[i].gpa);
        }

        free(loaded);
    }

    // Load from binary file
    loaded = load_students("students.bin", &loaded_count, &format);

    if (loaded != NULL) {
        printf("\\nLoaded from binary file (format: %s):\\n",
               format == FORMAT_TEXT ? "text" : "binary");

        for (int i = 0; i < loaded_count; i++) {
            printf("  %s (age %u, GPA %.2f)\\n",
                   loaded[i].name, loaded[i].age, loaded[i].gpa);
        }

        free(loaded);
    }

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Text files** are human-readable but slower and larger
2. **Binary files** are compact and fast but not human-readable
3. **Choose based on use case**: text for interchange, binary for performance
4. **Consider portability**: binary files have endianness and size issues
5. **Use portable formats** when cross-platform compatibility matters
6. **Validate file formats** before reading to prevent corruption
7. **Document binary formats** clearly for maintenance

---

## 🚀 Module 8 Complete!

**Congratulations!** You've mastered file I/O in C:

- ✅ **File I/O introduction** and stream concepts
- ✅ **Opening and closing files** with proper error handling
- ✅ **Reading from files** (character, line, formatted, binary)
- ✅ **Writing to files** (character, string, formatted, binary)
- ✅ **File positioning** with fseek(), ftell(), and random access
- ✅ **Error handling** with ferror(), feof(), and recovery patterns
- ✅ **Binary vs text files** and when to use each format

**Ready for the remaining modules!** We still have:
- Module 9: Preprocessor
- Module 10: Memory Management (advanced)
- Module 11: Command Line Arguments
- Module 12: Bit Manipulation
- Module 13: Data Structures
- Module 14: Algorithms
- Module 15: Advanced Pointers
- Module 16: Multi-file Programs
- Module 17: System Programming
- Modules 18-20: Projects

**Your C programming course is becoming comprehensive!** 🎓

