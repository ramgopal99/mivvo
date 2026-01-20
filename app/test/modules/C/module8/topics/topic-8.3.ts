import { SubLesson } from '../../../../data/lessonsData';

export const topic_8_3: SubLesson = {
  id: "8.3",
  title: 'Binary File Operations',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🔢 Binary File Operations in C

Binary files store data in raw machine format, making them efficient for structured data and large files. Binary I/O preserves exact data representation without text conversion.

---

## 📊 Binary vs Text Files

### **Text Files**
- Human-readable
- Character-based
- Platform-dependent line endings
- Slower for large data
- Automatic type conversion

### **Binary Files**
- Machine-readable only
- Byte-based storage
- Platform-independent
- Faster for large data
- Preserves exact binary representation

---

## 📖 Binary Reading Functions

### **fread() - Read Binary Data**

Reads raw bytes from file into memory:

\`\`\`c
#include <stdio.h>

size_t fread(void *ptr, size_t size, size_t count, FILE *stream);
\`\`\`

**Parameters:**
- \`ptr\`: Pointer to buffer to store data
- \`size\`: Size of each element in bytes
- \`count\`: Number of elements to read
- \`stream\`: File pointer

**Returns:** Number of elements successfully read

### **Reading Integers**

\`\`\`c
#include <stdio.h>

int main(void) {
    FILE *file = fopen("numbers.bin", "rb");

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    int numbers[5];
    size_t elements_read = fread(numbers, sizeof(int), 5, file);

    printf("Read %zu integers:\\n", elements_read);
    for (int i = 0; i < elements_read; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\\n");

    fclose(file);

    return 0;
}
\`\`\`

### **Reading Structures**

\`\`\`c
#include <stdio.h>
#include <string.h>

typedef struct {
    char name[50];
    int age;
    float salary;
} Employee;

int main(void) {
    FILE *file = fopen("employees.bin", "rb");

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    Employee emp;
    size_t bytes_read = fread(&emp, sizeof(Employee), 1, file);

    if (bytes_read == 1) {
        printf("Employee: %s, Age: %d, Salary: %.2f\\n",
               emp.name, emp.age, emp.salary);
    }

    fclose(file);

    return 0;
}
\`\`\`

---

## ✍️ Binary Writing Functions

### **fwrite() - Write Binary Data**

Writes raw bytes to file:

\`\`\`c
#include <stdio.h>

size_t fwrite(const void *ptr, size_t size, size_t count, FILE *stream);
\`\`\`

**Parameters:**
- \`ptr\`: Pointer to data to write
- \`size\`: Size of each element in bytes
- \`count\`: Number of elements to write
- \`stream\`: File pointer

**Returns:** Number of elements successfully written

### **Writing Arrays**

\`\`\`c
#include <stdio.h>

int main(void) {
    FILE *file = fopen("data.bin", "wb");

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    int data[] = {10, 20, 30, 40, 50};
    size_t elements_written = fwrite(data, sizeof(int), 5, file);

    printf("Wrote %zu integers to file.\\n", elements_written);

    fclose(file);

    return 0;
}
\`\`\`

### **Writing Structures**

\`\`\`c
#include <stdio.h>
#include <string.h>

typedef struct {
    int id;
    char name[30];
    double price;
} Product;

int main(void) {
    FILE *file = fopen("products.bin", "wb");

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    Product products[3] = {
        {1, "Laptop", 999.99},
        {2, "Mouse", 29.99},
        {3, "Keyboard", 79.99}
    };

    size_t elements_written = fwrite(products, sizeof(Product), 3, file);

    printf("Wrote %zu products to file.\\n", elements_written);

    fclose(file);

    return 0;
}
\`\`\`

---

## 🔄 Binary File Copy

### **Efficient Binary Copy**

\`\`\`c
#include <stdio.h>

#define BUFFER_SIZE 4096

int main(int argc, char *argv[]) {
    if (argc != 3) {
        printf("Usage: %s <source> <destination>\\n", argv[0]);
        return 1;
    }

    FILE *source = fopen(argv[1], "rb");
    FILE *dest = fopen(argv[2], "wb");

    if (source == NULL || dest == NULL) {
        printf("Error opening files!\\n");
        return 1;
    }

    char buffer[BUFFER_SIZE];
    size_t bytes_read;
    size_t total_bytes = 0;

    while ((bytes_read = fread(buffer, 1, BUFFER_SIZE, source)) > 0) {
        size_t bytes_written = fwrite(buffer, 1, bytes_read, dest);
        if (bytes_written != bytes_read) {
            printf("Write error!\\n");
            break;
        }
        total_bytes += bytes_read;
    }

    printf("Copied %zu bytes.\\n", total_bytes);

    fclose(source);
    fclose(dest);

    return 0;
}
\`\`\`

---

## 🏗️ Binary Data Structures

### **Student Database**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define DB_FILE "students.db"

typedef struct {
    int id;
    char name[50];
    int age;
    float gpa;
} Student;

// Add student to database
void add_student(Student s) {
    FILE *file = fopen(DB_FILE, "ab");  // Append binary

    if (file == NULL) {
        printf("Error opening database!\\n");
        return;
    }

    fwrite(&s, sizeof(Student), 1, file);
    fclose(file);
}

// Display all students
void display_students() {
    FILE *file = fopen(DB_FILE, "rb");

    if (file == NULL) {
        printf("Database not found.\\n");
        return;
    }

    Student s;
    printf("\\nStudent Database:\\n");
    printf("================\\n");

    while (fread(&s, sizeof(Student), 1, file) == 1) {
        printf("ID: %d, Name: %-15s Age: %2d GPA: %.2f\\n",
               s.id, s.name, s.age, s.gpa);
    }

    fclose(file);
}

// Find student by ID
Student* find_student(int id) {
    FILE *file = fopen(DB_FILE, "rb");

    if (file == NULL) return NULL;

    static Student s;  // Static to persist after function return

    while (fread(&s, sizeof(Student), 1, file) == 1) {
        if (s.id == id) {
            fclose(file);
            return &s;
        }
    }

    fclose(file);
    return NULL;
}

int main(void) {
    // Add sample students
    Student students[3] = {
        {1001, "Alice Johnson", 20, 3.8},
        {1002, "Bob Smith", 22, 3.5},
        {1003, "Charlie Brown", 19, 3.9}
    };

    for (int i = 0; i < 3; i++) {
        add_student(students[i]);
    }

    display_students();

    // Search for student
    Student *found = find_student(1002);
    if (found != NULL) {
        printf("\\nFound: %s (GPA: %.2f)\\n", found->name, found->gpa);
    }

    return 0;
}
\`\`\`

---

## 📊 Image Data Processing

### **Simple BMP Header Reader**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

// BMP file header structure (simplified)
typedef struct {
    unsigned short type;      // Magic identifier: 0x4d42
    unsigned int size;        // File size in bytes
    unsigned short reserved1; // Not used
    unsigned short reserved2; // Not used
    unsigned int offset;      // Offset to image data
} BMPHeader;

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Usage: %s <bmp_file>\\n", argv[0]);
        return 1;
    }

    FILE *file = fopen(argv[1], "rb");

    if (file == NULL) {
        printf("Error opening BMP file!\\n");
        return 1;
    }

    BMPHeader header;

    // Read BMP header (first 14 bytes)
    size_t bytes_read = fread(&header, sizeof(BMPHeader), 1, file);

    if (bytes_read != 1) {
        printf("Error reading BMP header!\\n");
        fclose(file);
        return 1;
    }

    // Check if it's a valid BMP file
    if (header.type != 0x4D42) {
        printf("Not a valid BMP file!\\n");
        fclose(file);
        return 1;
    }

    printf("BMP File Information:\\n");
    printf("File Size: %u bytes\\n", header.size);
    printf("Data Offset: %u bytes\\n", header.offset);

    fclose(file);

    return 0;
}
\`\`\`

---

## ⚠️ Binary File Considerations

### **Endianness Issues**

\`\`\`c
// Little-endian to big-endian conversion
unsigned int little_to_big(unsigned int value) {
    return ((value & 0xFF) << 24) |
           ((value & 0xFF00) << 8) |
           ((value & 0xFF0000) >> 8) |
           ((value & 0xFF000000) >> 24);
}

// When reading network data or different architectures
unsigned int network_value;
fread(&network_value, sizeof(unsigned int), 1, file);
network_value = little_to_big(network_value);
\`\`\`

### **Structure Padding**

\`\`\`c
// Structures may have padding for alignment
typedef struct {
    char c;     // 1 byte
    // 3 bytes padding
    int i;      // 4 bytes
} PaddedStruct;

// Size might be 8 bytes instead of 5 due to padding

// To avoid padding issues in binary files:
#pragma pack(1)  // Disable padding
typedef struct {
    char c;
    int i;
} PackedStruct;
#pragma pack()   // Restore default
\`\`\`

### **Error Handling**

\`\`\`c
size_t safe_fread(void *ptr, size_t size, size_t count, FILE *stream) {
    size_t result = fread(ptr, size, count, stream);

    if (result != count) {
        if (feof(stream)) {
            printf("Unexpected end of file\\n");
        } else {
            printf("Read error\\n");
        }
    }

    return result;
}

// Usage
int data[10];
if (safe_fread(data, sizeof(int), 10, file) != 10) {
    // Handle error
}
\`\`\`

---

## 🔄 Text vs Binary Conversion

### **Text File Issues**

\`\`\`c
// Problem: Text conversion loses precision
double value = 1.0 / 3.0;
fprintf(file, "%.20f\\n", value);  // Approximate decimal
fscanf(file, "%lf", &value);       // Precision lost!

// Better: Use binary for exact representation
fwrite(&value, sizeof(double), 1, file);
fread(&value, sizeof(double), 1, file);
\`\`\`

### **Performance Comparison**

\`\`\`c
#include <stdio.h>
#include <time.h>

#define NUM_INTEGERS 100000

void test_text_io() {
    FILE *file = fopen("text_test.txt", "w");

    for (int i = 0; i < NUM_INTEGERS; i++) {
        fprintf(file, "%d\\n", i);
    }

    fclose(file);
}

void test_binary_io() {
    FILE *file = fopen("binary_test.bin", "wb");

    for (int i = 0; i < NUM_INTEGERS; i++) {
        fwrite(&i, sizeof(int), 1, file);
    }

    fclose(file);
}

int main() {
    clock_t start, end;

    start = clock();
    test_text_io();
    end = clock();
    printf("Text I/O: %.2f seconds\\n",
           (double)(end - start) / CLOCKS_PER_SEC);

    start = clock();
    test_binary_io();
    end = clock();
    printf("Binary I/O: %.2f seconds\\n",
           (double)(end - start) / CLOCKS_PER_SEC);

    return 0;
}
\`\`\`

---

## 🎯 Practical Applications

### **Save Game State**

\`\`\`c
#include <stdio.h>
#include <string.h>

typedef struct {
    char player_name[30];
    int level;
    int score;
    int health;
    int position_x;
    int position_y;
} GameState;

void save_game(GameState state) {
    FILE *file = fopen("savegame.dat", "wb");

    if (file == NULL) {
        printf("Error saving game!\\n");
        return;
    }

    fwrite(&state, sizeof(GameState), 1, file);
    fclose(file);
    printf("Game saved!\\n");
}

int load_game(GameState *state) {
    FILE *file = fopen("savegame.dat", "rb");

    if (file == NULL) {
        printf("No save file found.\\n");
        return 0;
    }

    size_t bytes_read = fread(state, sizeof(GameState), 1, file);
    fclose(file);

    if (bytes_read == 1) {
        printf("Game loaded!\\n");
        return 1;
    } else {
        printf("Error loading game.\\n");
        return 0;
    }
}

int main() {
    GameState game = {"Player1", 5, 12500, 85, 100, 200};

    // Save game
    save_game(game);

    // Load game (in new session)
    GameState loaded_game;
    if (load_game(&loaded_game)) {
        printf("Welcome back %s!\\n", loaded_game.player_name);
        printf("Level: %d, Score: %d\\n", loaded_game.level, loaded_game.score);
    }

    return 0;
}
\`\`\`

### **Database Index File**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define INDEX_FILE "index.dat"
#define DATA_FILE "data.dat"

typedef struct {
    int id;
    long data_offset;  // Position in data file
} IndexEntry;

// Create index for fast lookups
void create_index() {
    FILE *data_file = fopen(DATA_FILE, "rb");
    FILE *index_file = fopen(INDEX_FILE, "wb");

    if (data_file == NULL || index_file == NULL) {
        printf("Error opening files!\\n");
        return;
    }

    int id;
    long offset = 0;

    while (fread(&id, sizeof(int), 1, data_file) == 1) {
        IndexEntry entry = {id, offset};
        fwrite(&entry, sizeof(IndexEntry), 1, index_file);

        // Skip data record (assume fixed size)
        fseek(data_file, sizeof(int) * 10, SEEK_CUR);  // Skip 10 integers
        offset = ftell(data_file);
    }

    fclose(data_file);
    fclose(index_file);
}

// Find record using index
long find_record(int target_id) {
    FILE *index_file = fopen(INDEX_FILE, "rb");

    if (index_file == NULL) return -1;

    IndexEntry entry;

    while (fread(&entry, sizeof(IndexEntry), 1, index_file) == 1) {
        if (entry.id == target_id) {
            fclose(index_file);
            return entry.data_offset;
        }
    }

    fclose(index_file);
    return -1;
}

int main() {
    // Create sample data file
    FILE *data_file = fopen(DATA_FILE, "wb");

    for (int i = 1; i <= 5; i++) {
        int record[11] = {i};  // ID + 10 data integers
        for (int j = 1; j <= 10; j++) {
            record[j] = i * j;
        }
        fwrite(record, sizeof(int), 11, data_file);
    }

    fclose(data_file);

    // Create index
    create_index();

    // Find and display record
    long offset = find_record(3);
    if (offset != -1) {
        data_file = fopen(DATA_FILE, "rb");
        fseek(data_file, offset, SEEK_SET);

        int record[11];
        fread(record, sizeof(int), 11, data_file);

        printf("Record ID %d: ", record[0]);
        for (int i = 1; i <= 10; i++) {
            printf("%d ", record[i]);
        }
        printf("\\n");

        fclose(data_file);
    }

    return 0;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Binary files** store data in raw machine format for efficiency
2. **fread/fwrite** handle binary data without text conversion
3. **Binary I/O** preserves exact data representation
4. **Structure padding** can affect binary file compatibility
5. **Error handling** is crucial for robust binary operations
6. **Binary files** are faster and more space-efficient for structured data
7. **Consider endianness** when sharing binary files across platforms
8. **Use binary** for exact numerical data and performance-critical applications

Binary file operations unlock high-performance data storage and retrieval! 🔢✨`;

    return contentString;
  })()
};
