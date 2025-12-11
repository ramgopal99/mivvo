import { SubLesson } from '../../../data/lessonsData';

export const topic_8_2: SubLesson = {
  id: 8.2,
  title: 'Opening and Closing Files',
  status: 'completed',
  content: `# 🔐 Opening and Closing Files

Master the critical skills of safely opening files with proper error handling and ensuring files are closed to prevent resource leaks.

---

## 📂 The fopen() Function

### Function Signature

\`\`\`c
#include <stdio.h>

FILE* fopen(const char* filename, const char* mode);
\`\`\`

**Parameters:**
- `filename`: Path to the file (relative or absolute)
- `mode`: String specifying how to open the file

**Returns:**
- Valid `FILE*` pointer on success
- `NULL` on failure

### Basic Usage

\`\`\`c
#include <stdio.h>

int main() {
    // Open file for writing
    FILE* file = fopen("example.txt", "w");

    if (file == NULL) {
        printf("Failed to open file\\n");
        return 1;
    }

    fprintf(file, "Hello, World!\\n");
    fclose(file);

    return 0;
}
\`\`\`

---

## 📖 File Access Modes

### Text Mode (Default)

| Mode | Description | File Exists | File Doesn't Exist |
|------|-------------|-------------|-------------------|
| `"r"` | Read only | Opens file | Returns NULL |
| `"w"` | Write only | Truncates to 0 | Creates new file |
| `"a"` | Append only | Opens file | Creates new file |
| `"r+"` | Read + Write | Opens file | Returns NULL |
| `"w+"` | Read + Write | Truncates to 0 | Creates new file |
| `"a+"` | Read + Append | Opens file | Creates new file |

### Binary Mode (with 'b' flag)

| Mode | Description |
|------|-------------|
| `"rb"` | Read binary |
| `"wb"` | Write binary |
| `"ab"` | Append binary |
| `"r+b"` or `"rb+"` | Read + Write binary |
| `"w+b"` or `"wb+"` | Read + Write binary |
| `"a+b"` or `"ab+"` | Read + Append binary |

### Mode Examples

\`\`\`c
#include <stdio.h>

int main() {
    // Text modes
    FILE* read_file = fopen("existing.txt", "r");
    FILE* write_file = fopen("output.txt", "w");
    FILE* append_file = fopen("log.txt", "a");

    // Binary modes
    FILE* bin_read = fopen("data.bin", "rb");
    FILE* bin_write = fopen("output.bin", "wb");

    // Read + Write modes
    FILE* update_file = fopen("data.txt", "r+");
    FILE* create_update = fopen("new.txt", "w+");

    // Close all files
    fclose(read_file);
    fclose(write_file);
    fclose(append_file);
    fclose(bin_read);
    fclose(bin_write);
    fclose(update_file);
    fclose(create_update);

    return 0;
}
\`\`\`

---

## 🛡️ Error Handling with fopen()

### Basic Error Checking

\`\`\`c
#include <stdio.h>

FILE* open_file_safe(const char* filename, const char* mode) {
    FILE* file = fopen(filename, mode);

    if (file == NULL) {
        printf("Error: Cannot open file '%s' in mode '%s'\\n",
               filename, mode);
        return NULL;
    }

    return file;
}

int main() {
    FILE* file = open_file_safe("nonexistent.txt", "r");

    if (file == NULL) {
        printf("Failed to open file, continuing...\\n");
        return 1;
    }

    // Use file...
    fclose(file);

    return 0;
}
\`\`\`

### Using perror() for System Errors

\`\`\`c
#include <stdio.h>

int main() {
    FILE* file = fopen("/root/secret.txt", "r");

    if (file == NULL) {
        perror("Error opening file");  // Prints: Error opening file: Permission denied
        return 1;
    }

    fclose(file);
    return 0;
}
\`\`\`

### Using errno for Detailed Errors

\`\`\`c
#include <stdio.h>
#include <errno.h>
#include <string.h>

void print_file_error(const char* filename) {
    printf("Error opening '%s': ", filename);

    switch (errno) {
        case ENOENT:
            printf("File does not exist\\n");
            break;
        case EACCES:
            printf("Permission denied\\n");
            break;
        case EISDIR:
            printf("Is a directory\\n");
            break;
        case EMFILE:
            printf("Too many open files\\n");
            break;
        default:
            printf("Unknown error (%d): %s\\n", errno, strerror(errno));
    }
}

int main() {
    FILE* file = fopen("readonly.txt", "w");

    if (file == NULL) {
        print_file_error("readonly.txt");
        return 1;
    }

    fclose(file);
    return 0;
}
\`\`\`

---

## 🔒 The fclose() Function

### Function Signature

\`\`\`c
int fclose(FILE* stream);
\`\`\`

**Parameters:**
- `stream`: FILE pointer to close

**Returns:**
- 0 on success
- EOF on error

### Proper File Closing

\`\`\`c
#include <stdio.h>

int main() {
    FILE* file = fopen("data.txt", "w");

    if (file == NULL) {
        perror("Open failed");
        return 1;
    }

    fprintf(file, "Important data\\n");

    // Always check fclose return value
    if (fclose(file) != 0) {
        perror("Close failed");
        return 1;
    }

    printf("File closed successfully\\n");
    return 0;
}
\`\`\`

---

## 🧹 Resource Management Patterns

### Early Return Pattern

\`\`\`c
#include <stdio.h>

int process_file(const char* filename) {
    FILE* file = fopen(filename, "r");

    if (file == NULL) {
        perror("Failed to open file");
        return -1;  // Early return, no leak
    }

    // Process file...

    if (fclose(file) != 0) {
        perror("Failed to close file");
        return -1;
    }

    return 0;
}
\`\`\`

### Nested Resource Management

\`\`\`c
#include <stdio.h>

int copy_file(const char* source, const char* dest) {
    FILE* src = fopen(source, "rb");
    if (src == NULL) {
        perror("Failed to open source");
        return -1;
    }

    FILE* dst = fopen(dest, "wb");
    if (dst == NULL) {
        perror("Failed to open destination");
        fclose(src);  // Clean up already opened file
        return -1;
    }

    // Copy data...

    // Close both files
    fclose(src);
    fclose(dst);

    return 0;
}
\`\`\`

### RAII-like Pattern with goto

\`\`\`c
#include <stdio.h>

#define CLEANUP goto cleanup

int complex_file_operation(const char* filename) {
    FILE* file1 = NULL;
    FILE* file2 = NULL;
    int* buffer = NULL;
    int result = -1;

    file1 = fopen(filename, "r");
    if (file1 == NULL) CLEANUP;

    file2 = fopen("temp.txt", "w");
    if (file2 == NULL) CLEANUP;

    buffer = malloc(1024);
    if (buffer == NULL) CLEANUP;

    // Do work...
    result = 0;  // Success

cleanup:
    free(buffer);
    if (file2) fclose(file2);
    if (file1) fclose(file1);

    return result;
}
\`\`\`

---

## 📂 Working with File Paths

### Relative vs Absolute Paths

\`\`\`c
#include <stdio.h>

int main() {
    // Relative paths (relative to current working directory)
    FILE* file1 = fopen("data.txt", "r");           // File in current directory
    FILE* file2 = fopen("subdir/data.txt", "r");    // File in subdirectory
    FILE* file3 = fopen("../data.txt", "r");        // File in parent directory

    // Absolute paths (full path from root)
    FILE* file4 = fopen("/home/user/data.txt", "r");     // Unix/Linux
    FILE* file5 = fopen("C:\\\\Users\\\\User\\\\data.txt", "r");  // Windows

    // Close files...
    fclose(file1); fclose(file2); fclose(file3);
    fclose(file4); fclose(file5);

    return 0;
}
\`\`\`

### Path Handling Best Practices

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Safe path construction
char* build_path(const char* dir, const char* filename) {
    size_t dir_len = strlen(dir);
    size_t file_len = strlen(filename);
    size_t total_len = dir_len + file_len + 2;  // +1 for '/', +1 for '\\0'

    char* path = malloc(total_len);
    if (path == NULL) return NULL;

    strcpy(path, dir);

    // Add directory separator if needed
    if (dir[dir_len - 1] != '/' && dir[dir_len - 1] != '\\\\') {
        strcat(path, "/");  // Use "/" for cross-platform compatibility
    }

    strcat(path, filename);

    return path;
}

int main() {
    char* path = build_path("data", "scores.txt");

    if (path != NULL) {
        FILE* file = fopen(path, "r");

        if (file != NULL) {
            printf("Opened: %s\\n", path);
            fclose(file);
        }

        free(path);
    }

    return 0;
}
\`\`\`

---

## 🔍 File Existence and Permissions

### Checking File Existence

\`\`\`c
#include <stdio.h>

// Method 1: Try to open for reading
int file_exists(const char* filename) {
    FILE* file = fopen(filename, "r");

    if (file != NULL) {
        fclose(file);
        return 1;
    }

    return 0;
}

// Method 2: Using access() (POSIX)
#include <unistd.h>

int file_exists_access(const char* filename) {
    return access(filename, F_OK) == 0;
}

int main() {
    if (file_exists("existing.txt")) {
        printf("File exists\\n");
    } else {
        printf("File does not exist\\n");
    }

    return 0;
}
\`\`\`

### Checking File Accessibility

\`\`\`c
#include <unistd.h>

void check_file_permissions(const char* filename) {
    if (access(filename, F_OK) != 0) {
        printf("File does not exist\\n");
        return;
    }

    printf("File exists\\n");

    if (access(filename, R_OK) == 0) {
        printf("  Readable\\n");
    }

    if (access(filename, W_OK) == 0) {
        printf("  Writable\\n");
    }

    if (access(filename, X_OK) == 0) {
        printf("  Executable\\n");
    }
}

int main() {
    check_file_permissions("test.txt");
    return 0;
}
\`\`\`

---

## 🎯 Multiple File Handling

### Processing Multiple Files

\`\`\`c
#include <stdio.h>

int concatenate_files(const char* output, const char* input1, const char* input2) {
    FILE* out = fopen(output, "w");
    if (out == NULL) return -1;

    FILE* in1 = fopen(input1, "r");
    FILE* in2 = fopen(input2, "r");

    if (in1 == NULL || in2 == NULL) {
        if (out) fclose(out);
        if (in1) fclose(in1);
        if (in2) fclose(in2);
        return -1;
    }

    // Copy first file
    char buffer[1024];
    size_t bytes;
    while ((bytes = fread(buffer, 1, sizeof(buffer), in1)) > 0) {
        fwrite(buffer, 1, bytes, out);
    }

    // Copy second file
    while ((bytes = fread(buffer, 1, sizeof(buffer), in2)) > 0) {
        fwrite(buffer, 1, bytes, out);
    }

    fclose(in1);
    fclose(in2);
    fclose(out);

    return 0;
}

int main() {
    if (concatenate_files("combined.txt", "file1.txt", "file2.txt") == 0) {
        printf("Files concatenated successfully\\n");
    }

    return 0;
}
\`\`\`

### File Array Management

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

#define MAX_FILES 10

typedef struct {
    FILE* files[MAX_FILES];
    int count;
} FileManager;

void fm_init(FileManager* fm) {
    fm->count = 0;
    for (int i = 0; i < MAX_FILES; i++) {
        fm->files[i] = NULL;
    }
}

int fm_open(FileManager* fm, const char* filename, const char* mode) {
    if (fm->count >= MAX_FILES) return -1;

    FILE* file = fopen(filename, mode);
    if (file == NULL) return -1;

    fm->files[fm->count++] = file;
    return fm->count - 1;  // Return index
}

void fm_close_all(FileManager* fm) {
    for (int i = 0; i < fm->count; i++) {
        if (fm->files[i] != NULL) {
            fclose(fm->files[i]);
            fm->files[i] = NULL;
        }
    }
    fm->count = 0;
}

int main() {
    FileManager fm;
    fm_init(&fm);

    // Open multiple files
    int idx1 = fm_open(&fm, "file1.txt", "r");
    int idx2 = fm_open(&fm, "file2.txt", "w");

    if (idx1 >= 0 && idx2 >= 0) {
        // Use files...
        fprintf(fm.files[idx2], "Data from file1\\n");
    }

    // Close all files automatically
    fm_close_all(&fm);

    return 0;
}
\`\`\`

---

## 🛡️ Comprehensive Error Handling

### Robust File Operations

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>

typedef enum {
    FILE_SUCCESS = 0,
    FILE_OPEN_ERROR,
    FILE_READ_ERROR,
    FILE_WRITE_ERROR,
    FILE_CLOSE_ERROR,
    FILE_MEMORY_ERROR
} FileError;

const char* file_error_message(FileError error) {
    switch (error) {
        case FILE_SUCCESS: return "Success";
        case FILE_OPEN_ERROR: return "Failed to open file";
        case FILE_READ_ERROR: return "Failed to read from file";
        case FILE_WRITE_ERROR: return "Failed to write to file";
        case FILE_CLOSE_ERROR: return "Failed to close file";
        case FILE_MEMORY_ERROR: return "Memory allocation failed";
        default: return "Unknown error";
    }
}

FileError safe_file_copy(const char* source, const char* dest) {
    FILE* src = fopen(source, "rb");
    if (src == NULL) return FILE_OPEN_ERROR;

    FILE* dst = fopen(dest, "wb");
    if (dst == NULL) {
        fclose(src);
        return FILE_OPEN_ERROR;
    }

    char* buffer = malloc(8192);
    if (buffer == NULL) {
        fclose(src);
        fclose(dst);
        return FILE_MEMORY_ERROR;
    }

    size_t bytes_read;
    while ((bytes_read = fread(buffer, 1, 8192, src)) > 0) {
        if (fwrite(buffer, 1, bytes_read, dst) != bytes_read) {
            free(buffer);
            fclose(src);
            fclose(dst);
            return FILE_WRITE_ERROR;
        }
    }

    if (ferror(src)) {
        free(buffer);
        fclose(src);
        fclose(dst);
        return FILE_READ_ERROR;
    }

    free(buffer);

    if (fclose(dst) != 0) {
        fclose(src);
        return FILE_CLOSE_ERROR;
    }

    if (fclose(src) != 0) {
        return FILE_CLOSE_ERROR;
    }

    return FILE_SUCCESS;
}

int main() {
    FileError result = safe_file_copy("source.bin", "dest.bin");

    if (result != FILE_SUCCESS) {
        fprintf(stderr, "Copy failed: %s\\n", file_error_message(result));
        return 1;
    }

    printf("File copied successfully\\n");
    return 0;
}
\`\`\`

---

## 🎯 Best Practices Summary

### File Opening
1. **Always check** `fopen()` return value for NULL
2. **Use appropriate modes** (r, w, a, rb, wb, etc.)
3. **Handle errors** with `perror()` or `errno`
4. **Close files** immediately when no longer needed

### Resource Management
1. **One responsible function** per file operation
2. **Clean up on errors** - close files and free memory
3. **Use RAII patterns** or goto for cleanup
4. **Check fclose()** return values

### Error Handling
1. **Fail fast** - return early on errors
2. **Provide context** - include filenames in error messages
3. **Clean up resources** before returning on error
4. **Use consistent error codes** or enums

### Path Handling
1. **Validate paths** before use
2. **Handle separators** cross-platform
3. **Use absolute paths** when necessary
4. **Check file existence** and permissions

---

## 🚀 Preview: Reading from Files

In the next topic, you'll learn about:
- **Character-based reading** with `fgetc()` and `fputc()`
- **Line-based reading** with `fgets()` and `fputs()`
- **Formatted input** with `fscanf()` and `scanf()`
- **Binary reading** with `fread()`
- **Reading strategies** and error handling

**Reading data from files is the key to data persistence!** 📖

