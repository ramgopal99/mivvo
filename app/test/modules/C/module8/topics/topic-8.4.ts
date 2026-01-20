import { SubLesson } from '../../../../data/lessonsData';

export const topic_8_4: SubLesson = {
  id: "8.4",
  title: 'File Positioning and Random Access',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 📍 File Positioning and Random Access in C

File positioning allows reading and writing at specific locations within a file, enabling random access instead of sequential access. This is essential for databases, indexes, and complex file operations.

---

## 📏 File Position Indicator

### **What is File Position?**

Every open file has a **file position indicator** that tracks the current read/write position:

- **Sequential access**: Position advances automatically
- **Random access**: Position can be set to any location
- **Position measured in bytes** from file beginning

### **ftell() - Get Current Position**

\`\`\`c
#include <stdio.h>

long ftell(FILE *stream);
\`\`\`

**Returns:** Current file position, or -1L on error

### **Basic Position Tracking**

\`\`\`c
#include <stdio.h>

int main(void) {
    FILE *file = fopen("data.txt", "r");

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    int ch;
    long position = 0;

    while ((ch = fgetc(file)) != EOF) {
        printf("Position %ld: '%c'\\n", position, ch);
        position++;
    }

    // Get position using ftell()
    long final_pos = ftell(file);
    printf("Final position: %ld\\n", final_pos);

    fclose(file);

    return 0;
}
\`\`\`

---

## 🎯 fseek() - Set File Position

### **Function Syntax**

\`\`\`c
#include <stdio.h>

int fseek(FILE *stream, long offset, int whence);
\`\`\`

**Parameters:**
- \`stream\`: File pointer
- \`offset\`: Number of bytes to move
- \`whence\`: Starting point for offset

**Whence values:**
- \`SEEK_SET\`: Beginning of file
- \`SEEK_CUR\`: Current position
- \`SEEK_END\`: End of file

**Returns:** 0 on success, non-zero on error

### **Positioning Examples**

\`\`\`c
#include <stdio.h>

int main(void) {
    FILE *file = fopen("data.txt", "r");

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    // Seek to 10th byte from beginning
    fseek(file, 10, SEEK_SET);
    printf("Position after SEEK_SET: %ld\\n", ftell(file));

    // Move 5 bytes forward from current position
    fseek(file, 5, SEEK_CUR);
    printf("Position after SEEK_CUR: %ld\\n", ftell(file));

    // Move to 2 bytes before end
    fseek(file, -2, SEEK_END);
    printf("Position after SEEK_END: %ld\\n", ftell(file));

    fclose(file);

    return 0;
}
\`\`\`

---

## 🔄 rewind() - Reset to Beginning

### **Function Syntax**

\`\`\`c
#include <stdio.h>

void rewind(FILE *stream);
\`\`\`

**Equivalent to:** \`fseek(stream, 0L, SEEK_SET);\`

### **Usage Example**

\`\`\`c
#include <stdio.h>

int main(void) {
    FILE *file = fopen("numbers.txt", "r");

    if (file == NULL) return 1;

    // Read first number
    int num1;
    fscanf(file, "%d", &num1);
    printf("First number: %d\\n", num1);

    // Move to some position
    fseek(file, 20, SEEK_SET);

    // Reset to beginning
    rewind(file);

    // Read first number again
    int num2;
    fscanf(file, "%d", &num2);
    printf("First number again: %d\\n", num2);

    fclose(file);

    return 0;
}
\`\`\`

---

## 📖 Random Access Reading

### **Reading at Specific Positions**

\`\`\`c
#include <stdio.h>

int main(void) {
    FILE *file = fopen("data.bin", "rb");

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    int record_number;
    printf("Enter record number to read: ");
    scanf("%d", &record_number);

    // Calculate position (assuming each record is 100 bytes)
    long position = (record_number - 1) * 100;

    if (fseek(file, position, SEEK_SET) != 0) {
        printf("Error seeking to position!\\n");
        fclose(file);
        return 1;
    }

    // Read record
    char record[100];
    size_t bytes_read = fread(record, 1, 100, file);

    printf("Read %zu bytes from record %d\\n", bytes_read, record_number);

    fclose(file);

    return 0;
}
\`\`\`

### **Employee Database with Random Access**

\`\`\`c
#include <stdio.h>
#include <string.h>

#define RECORD_SIZE 100  // Fixed size per record

typedef struct {
    int id;
    char name[50];
    float salary;
    char department[20];
} Employee;

void write_employee(FILE *file, Employee emp, int record_num) {
    long position = (record_num - 1) * RECORD_SIZE;
    fseek(file, position, SEEK_SET);

    // Write fixed-size record
    fwrite(&emp.id, sizeof(int), 1, file);
    fwrite(emp.name, sizeof(char), 50, file);
    fwrite(&emp.salary, sizeof(float), 1, file);
    fwrite(emp.department, sizeof(char), 20, file);
}

void read_employee(FILE *file, int record_num) {
    long position = (record_num - 1) * RECORD_SIZE;
    fseek(file, position, SEEK_SET);

    Employee emp;

    // Read fixed-size record
    fread(&emp.id, sizeof(int), 1, file);
    fread(emp.name, sizeof(char), 50, file);
    fread(&emp.salary, sizeof(float), 1, file);
    fread(emp.department, sizeof(char), 20, file);

    // Remove null terminators for display
    emp.name[49] = '\\0';
    emp.department[19] = '\\0';

    printf("Employee ID: %d\\n", emp.id);
    printf("Name: %s\\n", emp.name);
    printf("Salary: %.2f\\n", emp.salary);
    printf("Department: %s\\n", emp.department);
}

int main(void) {
    FILE *file = fopen("employees.db", "w+b");  // Read/write binary

    if (file == NULL) {
        printf("Error creating database!\\n");
        return 1;
    }

    // Create sample employees
    Employee emp1 = {1, "Alice Johnson", 75000.50, "Engineering"};
    Employee emp2 = {2, "Bob Smith", 65000.00, "Marketing"};

    // Write records
    write_employee(file, emp1, 1);
    write_employee(file, emp2, 2);

    // Read specific record
    printf("Reading employee record 2:\\n");
    read_employee(file, 2);

    fclose(file);

    return 0;
}
\`\`\`

---

## ✍️ Random Access Writing

### **Updating Records**

\`\`\`c
#include <stdio.h>

void update_record(const char *filename, int record_num, const char *new_data) {
    FILE *file = fopen(filename, "r+");  // Read and write

    if (file == NULL) {
        printf("Error opening file!\\n");
        return;
    }

    // Position at record (assuming 80 bytes per record)
    long position = (record_num - 1) * 80;

    if (fseek(file, position, SEEK_SET) != 0) {
        printf("Error seeking to record!\\n");
        fclose(file);
        return;
    }

    // Write new data
    fprintf(file, "%-79s\\n", new_data);  // Fixed width with newline

    printf("Record %d updated.\\n", record_num);

    fclose(file);
}

int main(void) {
    // Create sample file with records
    FILE *file = fopen("records.txt", "w");

    for (int i = 1; i <= 5; i++) {
        fprintf(file, "Record %d: Original data for employee %-20d\\n", i, i);
    }

    fclose(file);

    // Update record 3
    update_record("records.txt", 3, "Record 3: Updated data for employee 3");

    return 0;
}
\`\`\`

### **Binary File Updates**

\`\`\`c
#include <stdio.h>

typedef struct {
    int id;
    char name[30];
    int age;
} Person;

void update_person_age(const char *filename, int id, int new_age) {
    FILE *file = fopen(filename, "r+b");  // Read/write binary

    if (file == NULL) {
        printf("Error opening file!\\n");
        return;
    }

    Person person;
    long position = 0;

    // Search for person by ID
    while (fread(&person, sizeof(Person), 1, file) == 1) {
        if (person.id == id) {
            // Found! Go back and update
            person.age = new_age;
            fseek(file, position, SEEK_SET);
            fwrite(&person, sizeof(Person), 1, file);
            printf("Updated age for ID %d\\n", id);
            break;
        }
        position += sizeof(Person);
    }

    fclose(file);
}

int main(void) {
    // Create sample data
    FILE *file = fopen("people.dat", "wb");

    Person people[3] = {
        {1, "Alice", 25},
        {2, "Bob", 30},
        {3, "Charlie", 35}
    };

    fwrite(people, sizeof(Person), 3, file);
    fclose(file);

    // Update Bob's age
    update_person_age("people.dat", 2, 32);

    return 0;
}
\`\`\`

---

## 📊 File Size and Validation

### **File Size Calculation**

\`\`\`c
#include <stdio.h>

long get_file_size(const char *filename) {
    FILE *file = fopen(filename, "rb");

    if (file == NULL) {
        return -1;
    }

    // Seek to end
    fseek(file, 0, SEEK_END);

    // Get position (file size)
    long size = ftell(file);

    fclose(file);

    return size;
}

int main(void) {
    long size = get_file_size("data.bin");

    if (size != -1) {
        printf("File size: %ld bytes\\n", size);
    } else {
        printf("Error getting file size\\n");
    }

    return 0;
}
\`\`\`

### **File Integrity Check**

\`\`\`c
#include <stdio.h>

unsigned long calculate_checksum(const char *filename) {
    FILE *file = fopen(filename, "rb");

    if (file == NULL) {
        return 0;
    }

    unsigned long checksum = 0;
    int ch;

    while ((ch = fgetc(file)) != EOF) {
        checksum += (unsigned char)ch;
    }

    fclose(file);

    return checksum;
}

int main(void) {
    unsigned long checksum = calculate_checksum("important.dat");

    printf("File checksum: %lu\\n", checksum);

    return 0;
}
\`\`\`

---

## 🏗️ Indexed File System

### **Simple Database with Index**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define INDEX_SIZE 100

typedef struct {
    int id;
    long position;
} IndexEntry;

typedef struct {
    int id;
    char name[50];
    char email[50];
} Record;

// Create index file
void create_index(const char *data_file, const char *index_file) {
    FILE *data = fopen(data_file, "rb");
    FILE *index = fopen(index_file, "wb");

    if (data == NULL || index == NULL) {
        printf("Error opening files!\\n");
        return;
    }

    Record record;
    long position = 0;

    while (fread(&record, sizeof(Record), 1, data) == 1) {
        IndexEntry entry = {record.id, position};
        fwrite(&entry, sizeof(IndexEntry), 1, index);
        position += sizeof(Record);
    }

    fclose(data);
    fclose(index);
}

// Find record using index
long find_record_position(const char *index_file, int id) {
    FILE *index = fopen(index_file, "rb");

    if (index == NULL) {
        return -1;
    }

    IndexEntry entry;

    while (fread(&entry, sizeof(IndexEntry), 1, index) == 1) {
        if (entry.id == id) {
            fclose(index);
            return entry.position;
        }
    }

    fclose(index);
    return -1;
}

void display_record(const char *data_file, long position) {
    FILE *data = fopen(data_file, "rb");

    if (data == NULL) {
        printf("Error opening data file!\\n");
        return;
    }

    fseek(data, position, SEEK_SET);

    Record record;
    if (fread(&record, sizeof(Record), 1, data) == 1) {
        printf("ID: %d\\n", record.id);
        printf("Name: %s\\n", record.name);
        printf("Email: %s\\n", record.email);
    }

    fclose(data);
}

int main(void) {
    // Create sample data
    FILE *data = fopen("database.dat", "wb");

    Record records[4] = {
        {101, "Alice Johnson", "alice@email.com"},
        {205, "Bob Smith", "bob@email.com"},
        {150, "Charlie Brown", "charlie@email.com"},
        {302, "Diana Prince", "diana@email.com"}
    };

    fwrite(records, sizeof(Record), 4, data);
    fclose(data);

    // Create index
    create_index("database.dat", "index.dat");

    // Find and display record
    int search_id = 205;
    long position = find_record_position("index.dat", search_id);

    if (position != -1) {
        printf("Found record for ID %d:\\n", search_id);
        display_record("database.dat", position);
    } else {
        printf("Record not found.\\n");
    }

    return 0;
}
\`\`\`

---

## ⚠️ Positioning Best Practices

### **Error Checking**

\`\`\`c
int safe_fseek(FILE *file, long offset, int whence) {
    if (fseek(file, offset, whence) != 0) {
        perror("fseek error");
        return 0;
    }
    return 1;
}

// Usage
if (!safe_fseek(file, 100, SEEK_SET)) {
    // Handle error
}
\`\`\`

### **Position Validation**

\`\`\`c
long safe_ftell(FILE *file) {
    long pos = ftell(file);
    if (pos == -1L) {
        perror("ftell error");
        return -1;
    }
    return pos;
}

// Usage
long position = safe_ftell(file);
if (position == -1) {
    // Handle error
}
\`\`\`

### **Boundary Checking**

\`\`\`c
int seek_within_bounds(FILE *file, long position, long file_size) {
    if (position < 0 || position >= file_size) {
        printf("Position out of bounds!\\n");
        return 0;
    }

    return safe_fseek(file, position, SEEK_SET);
}
\`\`\`

---

## 🎯 Practical Applications

### **Log File Analysis**

\`\`\`c
#include <stdio.h>
#include <string.h>

typedef struct {
    char timestamp[20];
    char level[10];
    char message[200];
} LogEntry;

void analyze_log_file(const char *filename) {
    FILE *file = fopen(filename, "r");

    if (file == NULL) {
        printf("Error opening log file!\\n");
        return;
    }

    LogEntry entry;
    int error_count = 0, warning_count = 0;

    // Read entries from specific positions
    fseek(file, 0, SEEK_END);
    long file_size = ftell(file);
    rewind(file);

    char line[300];
    while (fgets(line, sizeof(line), file) != NULL) {
        // Parse log entry (assuming format: timestamp level message)
        if (sscanf(line, "%s %s %[^\n]", entry.timestamp, entry.level, entry.message) == 3) {
            if (strcmp(entry.level, "ERROR") == 0) {
                error_count++;
            } else if (strcmp(entry.level, "WARNING") == 0) {
                warning_count++;
            }
        }
    }

    printf("Log Analysis:\\n");
    printf("Errors: %d\\n", error_count);
    printf("Warnings: %d\\n", warning_count);
    printf("File size: %ld bytes\\n", file_size);

    fclose(file);
}

int main(void) {
    // Create sample log file
    FILE *log = fopen("app.log", "w");

    fprintf(log, "2024-01-01 10:00:00 INFO Application started\\n");
    fprintf(log, "2024-01-01 10:05:00 WARNING Low memory\\n");
    fprintf(log, "2024-01-01 10:10:00 ERROR Database connection failed\\n");
    fprintf(log, "2024-01-01 10:15:00 INFO User login\\n");
    fprintf(log, "2024-01-01 10:20:00 ERROR File not found\\n");

    fclose(log);

    analyze_log_file("app.log");

    return 0;
}
\`\`\`

### **Sparse File Handling**

\`\`\`c
#include <stdio.h>

void create_sparse_file(const char *filename, long size) {
    FILE *file = fopen(filename, "wb");

    if (file == NULL) {
        printf("Error creating file!\\n");
        return;
    }

    // Seek to desired size (creates sparse file)
    fseek(file, size - 1, SEEK_SET);

    // Write one byte to establish size
    fputc(0, file);

    fclose(file);

    printf("Created sparse file of %ld bytes\\n", size);
}

long get_sparse_size(const char *filename) {
    FILE *file = fopen(filename, "rb");

    if (file == NULL) return 0;

    fseek(file, 0, SEEK_END);
    long size = ftell(file);

    fclose(file);

    return size;
}

int main(void) {
    create_sparse_file("sparse.dat", 1000000);  // 1MB sparse file

    long actual_size = get_sparse_size("sparse.dat");
    printf("File reports size: %ld bytes\\n", actual_size);

    return 0;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **File positioning** enables random access instead of sequential access
2. **fseek()** sets the file position indicator to any location
3. **ftell()** returns the current file position
4. **SEEK_SET/SEEK_CUR/SEEK_END** specify the reference point for positioning
5. **Random access** is essential for databases and indexed files
6. **Binary files** work well with fixed-size records and positioning
7. **Error checking** is crucial when using positioning functions
8. **Boundary validation** prevents reading/writing outside file limits

File positioning unlocks powerful random access capabilities for advanced file operations! 📍✨`;

    return contentString;
  })()
};
