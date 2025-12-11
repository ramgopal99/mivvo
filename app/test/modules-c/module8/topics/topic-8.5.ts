import { SubLesson } from '../../../data/lessonsData';

export const topic_8_5: SubLesson = {
  id: 8.5,
  title: 'File Positioning',
  status: 'completed',
  content: `# 📍 File Positioning

Master file position control for random access, seeking, and efficient file navigation using ftell(), fseek(), and related functions.

---

## 🎯 Understanding File Position

### File Position Indicator

**Every open file has a "current position" - the location where the next read or write operation will occur.**

\`\`\`
File: [H][e][l][l][o][,][ ][W][o][r][l][d][!]
      ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^
      0  1  2  3  4  5  6  7  8  9 10 11 12

Position 0: 'H'
Position 7: 'W'
Position 12: End of file
\`\`\`

### Sequential vs Random Access

**Sequential Access (default):**
- Read/write from current position
- Position advances automatically
- Like reading a book from start to finish

**Random Access:**
- Jump to any position instantly
- Read/write at specific locations
- Like flipping to any page in a book

---

## 📏 Getting Current Position

### ftell() - Get Current Position

\`\`\`c
#include <stdio.h>

long ftell(FILE* stream);
\`\`\`

**Returns:**
- Current file position (offset from beginning)
- -1L on error

### Position Tracking Example

\`\`\`c
#include <stdio.h>

void track_file_position(FILE* file, const char* operation) {
    long position = ftell(file);

    if (position == -1L) {
        perror("Error getting file position");
    } else {
        printf("Position after %s: %ld bytes\\n", operation, position);
    }
}

int main() {
    FILE* file = fopen("example.txt", "w+");

    if (file == NULL) {
        perror("Error opening file");
        return 1;
    }

    track_file_position(file, "opening");  // Position: 0

    fprintf(file, "Hello, World!");
    track_file_position(file, "writing");  // Position: 13

    rewind(file);  // Back to beginning
    track_file_position(file, "rewind");  // Position: 0

    char buffer[20];
    fgets(buffer, sizeof(buffer), file);
    track_file_position(file, "reading");  // Position: 13

    fclose(file);
    return 0;
}
\`\`\`

### Getting File Size

\`\`\`c
#include <stdio.h>

long get_file_size(const char* filename) {
    FILE* file = fopen(filename, "rb");  // Binary mode for accuracy

    if (file == NULL) {
        return -1L;
    }

    // Seek to end
    if (fseek(file, 0, SEEK_END) != 0) {
        fclose(file);
        return -1L;
    }

    // Get position (which is file size)
    long size = ftell(file);

    fclose(file);
    return size;
}

int main() {
    long size = get_file_size("example.txt");

    if (size >= 0) {
        printf("File size: %ld bytes\\n", size);
    } else {
        printf("Error getting file size\\n");
    }

    return 0;
}
\`\`\`

---

## 🎯 Moving File Position

### fseek() - Seek to Position

\`\`\`c
#include <stdio.h>

int fseek(FILE* stream, long offset, int whence);
\`\`\`

**Parameters:**
- `stream`: File to seek in
- `offset`: Position offset (can be negative)
- `whence`: Reference point (SEEK_SET, SEEK_CUR, SEEK_END)

**Returns:**
- 0 on success
- Non-zero on error

### Seek Reference Points

| whence | Description | Example |
|--------|-------------|---------|
| `SEEK_SET` | From beginning of file | `fseek(file, 100, SEEK_SET)` → position 100 |
| `SEEK_CUR` | From current position | `fseek(file, 50, SEEK_CUR)` → current + 50 |
| `SEEK_END` | From end of file | `fseek(file, -10, SEEK_END)` → 10 bytes before end |

### Basic Seeking Examples

\`\`\`c
#include <stdio.h>

void demonstrate_seeking(FILE* file) {
    // Write some data
    fprintf(file, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ");

    printf("Initial position: %ld\\n", ftell(file));

    // Seek to position 10 from beginning
    fseek(file, 10, SEEK_SET);
    printf("After SEEK_SET(10): %ld\\n", ftell(file));

    // Seek 5 bytes forward from current position
    fseek(file, 5, SEEK_CUR);
    printf("After SEEK_CUR(5): %ld\\n", ftell(file));

    // Seek 3 bytes before end
    fseek(file, -3, SEEK_END);
    printf("After SEEK_END(-3): %ld\\n", ftell(file));
}

int main() {
    FILE* file = fopen("seek_demo.txt", "w+");

    if (file != NULL) {
        demonstrate_seeking(file);
        fclose(file);
    }

    return 0;
}
\`\`\`

---

## 🔄 Convenience Functions

### rewind() - Reset to Beginning

\`\`\`c
#include <stdio.h>

void rewind(FILE* stream);
\`\`\`

**Equivalent to:** `fseek(stream, 0L, SEEK_SET)`

### fgetpos() and fsetpos() - Advanced Positioning

\`\`\`c
#include <stdio.h>

int fgetpos(FILE* stream, fpos_t* pos);
int fsetpos(FILE* stream, const fpos_t* pos);
\`\`\`

**Advantages over ftell/fseek:**
- Works with large files (>2GB)
- Handles text files with multi-byte characters correctly
- More portable for complex file systems

### Position Save/Restore Example

\`\`\`c
#include <stdio.h>

int save_and_restore_position(FILE* file) {
    fpos_t saved_position;

    // Save current position
    if (fgetpos(file, &saved_position) != 0) {
        perror("Error saving position");
        return 0;
    }

    printf("Saved position: implementation defined\\n");

    // Do some operations that change position
    fseek(file, 100, SEEK_SET);
    printf("Moved to position: %ld\\n", ftell(file));

    // Restore saved position
    if (fsetpos(file, &saved_position) != 0) {
        perror("Error restoring position");
        return 0;
    }

    printf("Restored to position: %ld\\n", ftell(file));

    return 1;
}

int main() {
    FILE* file = fopen("large_file.txt", "r");

    if (file != NULL) {
        save_and_restore_position(file);
        fclose(file);
    }

    return 0;
}
\`\`\`

---

## 🎮 Random Access Operations

### Reading Records by Index

\`\`\`c
#include <stdio.h>

typedef struct {
    int id;
    char name[50];
    float salary;
} Employee;

#define RECORD_SIZE sizeof(Employee)

// Read nth employee record
Employee* read_employee(FILE* file, int index) {
    static Employee emp;

    // Calculate position: index * record_size
    long position = index * RECORD_SIZE;

    if (fseek(file, position, SEEK_SET) != 0) {
        return NULL;
    }

    if (fread(&emp, RECORD_SIZE, 1, file) != 1) {
        return NULL;
    }

    return &emp;
}

// Write employee at specific index
int write_employee(FILE* file, int index, const Employee* emp) {
    long position = index * RECORD_SIZE;

    if (fseek(file, position, SEEK_SET) != 0) {
        return 0;
    }

    if (fwrite(emp, RECORD_SIZE, 1, file) != 1) {
        return 0;
    }

    return 1;
}

int main() {
    // Create sample data
    Employee employees[] = {
        {1001, "Alice", 75000.0},
        {1002, "Bob", 68000.0},
        {1003, "Charlie", 72000.0}
    };

    FILE* file = fopen("employees.dat", "w+b");

    if (file != NULL) {
        // Write all employees
        fwrite(employees, RECORD_SIZE, 3, file);

        // Read specific employee
        Employee* emp = read_employee(file, 1);  // Read Bob
        if (emp != NULL) {
            printf("Employee 1: %s (ID: %d, Salary: %.0f)\\n",
                   emp->name, emp->id, emp->salary);
        }

        // Update employee
        Employee new_emp = {1002, "Robert", 70000.0};
        if (write_employee(file, 1, &new_emp)) {
            printf("Employee updated\\n");
        }

        fclose(file);
    }

    return 0;
}
\`\`\`

### File Patching (Updating Specific Bytes)

\`\`\`c
#include <stdio.h>

// Update a single byte at specific position
int patch_file(const char* filename, long position, unsigned char new_byte) {
    FILE* file = fopen(filename, "r+b");  // Read + write binary

    if (file == NULL) {
        return 0;
    }

    if (fseek(file, position, SEEK_SET) != 0) {
        fclose(file);
        return 0;
    }

    if (fwrite(&new_byte, 1, 1, file) != 1) {
        fclose(file);
        return 0;
    }

    fclose(file);
    return 1;
}

int main() {
    // Create a test file
    FILE* file = fopen("test.bin", "wb");

    if (file != NULL) {
        unsigned char data[] = {0x12, 0x34, 0x56, 0x78, 0x9A};
        fwrite(data, 1, 5, file);
        fclose(file);

        // Patch byte at position 2 (0x56 -> 0xFF)
        if (patch_file("test.bin", 2, 0xFF)) {
            printf("File patched successfully\\n");
        }
    }

    return 0;
}
\`\`\`

---

## 📊 Advanced Positioning Techniques

### Sparse File Creation

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

// Create a file with holes (sparse file)
int create_sparse_file(const char* filename, size_t size) {
    FILE* file = fopen(filename, "wb");

    if (file == NULL) {
        return 0;
    }

    // Write first byte
    fputc(0xFF, file);

    // Seek to end (creates hole)
    fseek(file, size - 1, SEEK_SET);

    // Write last byte
    fputc(0xAA, file);

    fclose(file);
    return 1;
}

int main() {
    if (create_sparse_file("sparse.bin", 1024 * 1024)) {  // 1MB file
        printf("Sparse file created\\n");

        // Check actual size
        long size = get_file_size("sparse.bin");
        printf("Apparent size: %ld bytes\\n", size);
        // On systems supporting sparse files, actual disk usage may be much less
    }

    return 0;
}
\`\`\`

### Log File Rotation

\`\`\`c
#include <stdio.h>
#include <string.h>

// Read last N lines from log file
void read_last_lines(const char* filename, int num_lines) {
    FILE* file = fopen(filename, "r");

    if (file == NULL) {
        perror("Error opening log file");
        return;
    }

    // Find positions of last num_lines line breaks
    long* line_positions = malloc(num_lines * sizeof(long));
    int line_count = 0;
    long pos = 0;
    int ch;

    // Scan backwards from end
    fseek(file, 0, SEEK_END);
    long file_size = ftell(file);

    for (long i = file_size - 1; i >= 0 && line_count < num_lines; i--) {
        fseek(file, i, SEEK_SET);
        ch = fgetc(file);

        if (ch == '\\n' || i == 0) {
            line_positions[line_count++] = i + (i == 0 ? 0 : 1);
        }
    }

    // Print the lines
    for (int i = line_count - 1; i >= 0; i--) {
        fseek(file, line_positions[i], SEEK_SET);

        char line[256];
        if (fgets(line, sizeof(line), file) != NULL) {
            printf("%s", line);
        }
    }

    free(line_positions);
    fclose(file);
}

int main() {
    // Create sample log file
    FILE* log = fopen("app.log", "w");

    if (log != NULL) {
        for (int i = 1; i <= 20; i++) {
            fprintf(log, "Log entry %d: Some application event\\n", i);
        }
        fclose(log);

        printf("Last 5 lines of log:\\n");
        read_last_lines("app.log", 5);
    }

    return 0;
}
\`\`\`

---

## 🛡️ Positioning Safety and Best Practices

### Error Checking

\`\`\`c
#include <stdio.h>

int safe_seek(FILE* file, long offset, int whence) {
    if (fseek(file, offset, whence) != 0) {
        perror("Seek operation failed");
        return 0;
    }

    return 1;
}

long safe_tell(FILE* file) {
    long pos = ftell(file);

    if (pos == -1L) {
        perror("Tell operation failed");
        return -1L;
    }

    return pos;
}

int main() {
    FILE* file = fopen("data.bin", "rb");

    if (file != NULL) {
        if (safe_seek(file, 100, SEEK_SET)) {
            long pos = safe_tell(file);

            if (pos != -1L) {
                printf("Successfully seeked to position %ld\\n", pos);
            }
        }

        fclose(file);
    }

    return 0;
}
\`\`\`

### Position Validation

\`\`\`c
#include <stdio.h>

// Check if position is valid for file
int is_valid_position(FILE* file, long position) {
    long current = ftell(file);

    if (current == -1L) return 0;

    // Try to seek to position
    if (fseek(file, position, SEEK_SET) != 0) {
        return 0;
    }

    // Seek back to original position
    fseek(file, current, SEEK_SET);

    return 1;
}

long get_file_size_safe(FILE* file) {
    long current = ftell(file);

    if (current == -1L) return -1L;

    if (fseek(file, 0, SEEK_END) != 0) return -1L;

    long size = ftell(file);

    // Restore original position
    fseek(file, current, SEEK_SET);

    return size;
}

int main() {
    FILE* file = fopen("test.txt", "r");

    if (file != NULL) {
        long size = get_file_size_safe(file);

        if (size >= 0) {
            printf("File size: %ld bytes\\n", size);

            // Check if we can seek to middle
            if (is_valid_position(file, size / 2)) {
                printf("Can seek to middle of file\\n");
            }
        }

        fclose(file);
    }

    return 0;
}
\`\`\`

---

## 🧪 Complete Random Access Examples

### Simple Database Implementation

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_RECORDS 1000

typedef struct {
    int id;
    char name[50];
    int age;
    int valid;  // 1 = valid record, 0 = deleted
} Record;

typedef struct {
    FILE* file;
    char filename[256];
    size_t record_count;
} Database;

Database* db_open(const char* filename) {
    Database* db = malloc(sizeof(Database));

    if (db == NULL) return NULL;

    strcpy(db->filename, filename);
    db->file = fopen(filename, "r+b");

    if (db->file == NULL) {
        // File doesn't exist, create it
        db->file = fopen(filename, "w+b");
    }

    if (db->file == NULL) {
        free(db);
        return NULL;
    }

    // Calculate record count
    fseek(db->file, 0, SEEK_END);
    db->record_count = ftell(db->file) / sizeof(Record);

    return db;
}

void db_close(Database* db) {
    if (db != NULL) {
        if (db->file) fclose(db->file);
        free(db);
    }
}

int db_insert(Database* db, const Record* record) {
    // Find empty slot or append
    Record temp;

    for (size_t i = 0; i < db->record_count; i++) {
        fseek(db->file, i * sizeof(Record), SEEK_SET);
        fread(&temp, sizeof(Record), 1, db->file);

        if (!temp.valid) {
            // Found empty slot
            fseek(db->file, i * sizeof(Record), SEEK_SET);
            fwrite(record, sizeof(Record), 1, db->file);
            return (int)i;
        }
    }

    // Append to end
    fseek(db->file, 0, SEEK_END);
    fwrite(record, sizeof(Record), 1, db->file);
    db->record_count++;

    return (int)db->record_count - 1;
}

int db_get(Database* db, int index, Record* record) {
    if (index < 0 || (size_t)index >= db->record_count) {
        return 0;
    }

    fseek(db->file, index * sizeof(Record), SEEK_SET);

    if (fread(record, sizeof(Record), 1, db->file) != 1) {
        return 0;
    }

    return record->valid;
}

int db_delete(Database* db, int index) {
    if (index < 0 || (size_t)index >= db->record_count) {
        return 0;
    }

    Record empty = {0};
    fseek(db->file, index * sizeof(Record), SEEK_SET);
    fwrite(&empty, sizeof(Record), 1, db->file);

    return 1;
}

int main() {
    Database* db = db_open("records.db");

    if (db == NULL) {
        printf("Failed to open database\\n");
        return 1;
    }

    // Insert some records
    Record r1 = {1001, "Alice", 25, 1};
    Record r2 = {1002, "Bob", 30, 1};
    Record r3 = {1003, "Charlie", 35, 1};

    int idx1 = db_insert(db, &r1);
    int idx2 = db_insert(db, &r2);
    int idx3 = db_insert(db, &r3);

    printf("Inserted records at indices: %d, %d, %d\\n", idx1, idx2, idx3);

    // Retrieve and display
    Record retrieved;
    if (db_get(db, idx2, &retrieved)) {
        printf("Retrieved: %s (age %d)\\n", retrieved.name, retrieved.age);
    }

    // Delete a record
    db_delete(db, idx1);
    printf("Deleted record at index %d\\n", idx1);

    // Try to get deleted record
    if (!db_get(db, idx1, &retrieved)) {
        printf("Record at index %d is deleted\\n", idx1);
    }

    db_close(db);
    printf("Database operations complete\\n");

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **File position** determines where reads/writes occur
2. **ftell()** returns current position, **fseek()** changes position
3. **Three seek modes**: SEEK_SET (from start), SEEK_CUR (from current), SEEK_END (from end)
4. **Random access** enables efficient record-based operations
5. **Position validation** prevents invalid seek operations
6. **fgetpos/fsetpos** handle large files and complex encodings
7. **Error checking** essential for all positioning operations

---

## 🚀 Preview: Error Handling

In the final topic, you'll learn about:
- **File error detection** with `ferror()` and `feof()`
- **Clearing error states** with `clearerr()`
- **Robust error recovery** patterns
- **File operation status** checking
- **Comprehensive error handling** strategies

**Proper error handling ensures reliable file operations in all conditions!** ⚠️

