import { SubLesson } from '../../../data/lessonsData';

export const topic_8_6: SubLesson = {
  id: 8.6,
  title: 'Error Handling',
  status: 'completed',
  content: `# ⚠️ Error Handling

Master robust error detection, recovery, and handling patterns for reliable file operations using ferror(), feof(), clearerr(), and comprehensive error management strategies.

---

## 🎯 Understanding File Errors

### Types of File Errors

**Read/Write Errors:**
- Disk full during writing
- Permission denied
- Network drive disconnected
- Corrupted file system

**Positioning Errors:**
- Seeking beyond file boundaries
- Invalid seek operations
- File position corrupted

**Stream State Errors:**
- Mixing text/binary operations
- Buffer overflow
- Encoding conversion failures

### Error Detection Functions

#### ferror() - Check for Errors

\`\`\`c
#include <stdio.h>

int ferror(FILE* stream);
\`\`\`

**Returns:**
- Non-zero if error occurred
- 0 if no error

#### feof() - Check for End of File

\`\`\`c
#include <stdio.h>

int feof(FILE* stream);
\`\`\`

**Returns:**
- Non-zero if EOF reached
- 0 if not at EOF

#### clearerr() - Clear Error State

\`\`\`c
#include <stdio.h>

void clearerr(FILE* stream);
\`\`\`

**Clears both error and EOF flags**

---

## 🔍 Error Detection Examples

### Basic Error Checking

\`\`\`c
#include <stdio.h>

void demonstrate_error_detection(FILE* file) {
    char buffer[100];

    // Attempt to read
    size_t bytes_read = fread(buffer, 1, sizeof(buffer), file);

    printf("Bytes read: %zu\\n", bytes_read);

    // Check for errors
    if (ferror(file)) {
        printf("Read error occurred\\n");
    }

    if (feof(file)) {
        printf("End of file reached\\n");
    }

    // Clear any error state
    clearerr(file);
}

int main() {
    FILE* file = fopen("example.txt", "r");

    if (file != NULL) {
        demonstrate_error_detection(file);
        fclose(file);
    }

    return 0;
}
\`\`\`

### Distinguishing EOF from Errors

\`\`\`c
#include <stdio.h>

// Safe character reading with error distinction
int safe_fgetc(FILE* file, int* error_occurred) {
    int ch = fgetc(file);

    if (ch == EOF) {
        if (feof(file)) {
            *error_occurred = 0;  // Normal EOF
        } else if (ferror(file)) {
            *error_occurred = 1;  // Error occurred
        }
    } else {
        *error_occurred = 0;  // Normal character
    }

    return ch;
}

void process_file_safely(const char* filename) {
    FILE* file = fopen(filename, "r");

    if (file == NULL) {
        perror("Failed to open file");
        return;
    }

    int ch;
    int error_flag;

    while ((ch = safe_fgetc(file, &error_flag)) != EOF) {
        putchar(ch);
    }

    if (error_flag) {
        printf("\\n\\nError occurred while reading file\\n");
    } else {
        printf("\\n\\nReached end of file normally\\n");
    }

    fclose(file);
}

int main() {
    process_file_safely("example.txt");
    return 0;
}
\`\`\`

---

## 🛡️ Comprehensive Error Handling Patterns

### Robust File Copy with Error Recovery

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef enum {
    COPY_SUCCESS = 0,
    COPY_OPEN_SOURCE_ERROR,
    COPY_OPEN_DEST_ERROR,
    COPY_READ_ERROR,
    COPY_WRITE_ERROR,
    COPY_CLOSE_ERROR,
    COPY_MEMORY_ERROR
} CopyError;

const char* copy_error_message(CopyError error) {
    switch (error) {
        case COPY_SUCCESS: return "Success";
        case COPY_OPEN_SOURCE_ERROR: return "Failed to open source file";
        case COPY_OPEN_DEST_ERROR: return "Failed to open destination file";
        case COPY_READ_ERROR: return "Failed to read from source";
        case COPY_WRITE_ERROR: return "Failed to write to destination";
        case COPY_CLOSE_ERROR: return "Failed to close files";
        case COPY_MEMORY_ERROR: return "Memory allocation failed";
        default: return "Unknown error";
    }
}

CopyError copy_file_robust(const char* source, const char* dest) {
    FILE* src = NULL;
    FILE* dst = NULL;
    char* buffer = NULL;
    CopyError result = COPY_SUCCESS;

    // Open source file
    src = fopen(source, "rb");
    if (src == NULL) {
        result = COPY_OPEN_SOURCE_ERROR;
        goto cleanup;
    }

    // Open destination file
    dst = fopen(dest, "wb");
    if (dst == NULL) {
        result = COPY_OPEN_DEST_ERROR;
        goto cleanup;
    }

    // Allocate buffer
    buffer = malloc(8192);
    if (buffer == NULL) {
        result = COPY_MEMORY_ERROR;
        goto cleanup;
    }

    // Copy data with error checking
    size_t bytes_read;
    while ((bytes_read = fread(buffer, 1, 8192, src)) > 0) {
        if (ferror(src)) {
            result = COPY_READ_ERROR;
            goto cleanup;
        }

        size_t bytes_written = fwrite(buffer, 1, bytes_read, dst);
        if (bytes_written != bytes_read || ferror(dst)) {
            result = COPY_WRITE_ERROR;
            goto cleanup;
        }
    }

    // Check for read error vs EOF
    if (ferror(src)) {
        result = COPY_READ_ERROR;
        goto cleanup;
    }

cleanup:
    // Clean up resources (in reverse order)
    free(buffer);

    if (dst && fclose(dst) != 0 && result == COPY_SUCCESS) {
        result = COPY_CLOSE_ERROR;
    }

    if (src && fclose(src) != 0 && result == COPY_SUCCESS) {
        result = COPY_CLOSE_ERROR;
    }

    return result;
}

int main() {
    CopyError result = copy_file_robust("source.txt", "dest.txt");

    if (result == COPY_SUCCESS) {
        printf("File copied successfully\\n");
    } else {
        fprintf(stderr, "Copy failed: %s\\n", copy_error_message(result));
        return 1;
    }

    return 0;
}
\`\`\`

---

## 🔄 Error Recovery Strategies

### Retry on Temporary Errors

\`\`\`c
#include <stdio.h>
#include <errno.h>

#define MAX_RETRIES 3

FILE* open_with_retry(const char* filename, const char* mode, int max_retries) {
    FILE* file = NULL;

    for (int attempt = 1; attempt <= max_retries; attempt++) {
        file = fopen(filename, mode);

        if (file != NULL) {
            return file;  // Success
        }

        // Check if error is retryable
        if (errno == EMFILE || errno == ENFILE) {
            // Too many open files - wait and retry
            printf("Attempt %d failed, retrying...\\n", attempt);
            sleep(1);  // Wait 1 second
            continue;
        } else {
            // Non-retryable error
            break;
        }
    }

    return NULL;  // All attempts failed
}

int main() {
    FILE* file = open_with_retry("data.txt", "r", MAX_RETRIES);

    if (file != NULL) {
        printf("File opened successfully\\n");
        fclose(file);
    } else {
        printf("Failed to open file after retries\\n");
    }

    return 0;
}
\`\`\`

### Graceful Degradation

\`\`\`c
#include <stdio.h>

// Try multiple file locations
FILE* open_config_file() {
    const char* locations[] = {
        "config.ini",           // Current directory
        "/etc/app/config.ini",  // System config
        "./config.ini",         // Explicit current directory
        NULL
    };

    for (int i = 0; locations[i] != NULL; i++) {
        FILE* file = fopen(locations[i], "r");

        if (file != NULL) {
            printf("Config loaded from: %s\\n", locations[i]);
            return file;
        }

        printf("Failed to load from: %s\\n", locations[i]);
    }

    // All locations failed - use defaults
    printf("Using default configuration\\n");
    return NULL;
}

int main() {
    FILE* config = open_config_file();

    if (config != NULL) {
        // Process config file
        fclose(config);
    } else {
        // Use default settings
        printf("Proceeding with defaults\\n");
    }

    return 0;
}
\`\`\`

---

## 🎯 Advanced Error Handling Techniques

### Error Context Preservation

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    FILE* file;
    char filename[256];
    char operation[64];
    int line_number;
} FileOperationContext;

#define FILE_OP_CTX(file_ptr, filename_str, operation_str) \
    (FileOperationContext){file_ptr, filename_str, operation_str, __LINE__}

void report_file_error(const FileOperationContext* ctx, const char* additional_info) {
    fprintf(stderr, "File operation failed:\\n");
    fprintf(stderr, "  File: %s\\n", ctx->filename);
    fprintf(stderr, "  Operation: %s\\n", ctx->operation);
    fprintf(stderr, "  Line: %d\\n", ctx->line_number);

    if (additional_info) {
        fprintf(stderr, "  Info: %s\\n", additional_info);
    }

    // Report system error if available
    perror("  System error");
}

int safe_fread(void* buffer, size_t size, size_t count, FileOperationContext* ctx) {
    size_t result = fread(buffer, size, count, ctx->file);

    if (result != count) {
        if (ferror(ctx->file)) {
            report_file_error(ctx, "Read error occurred");
            return 0;
        } else if (feof(ctx->file)) {
            report_file_error(ctx, "Unexpected end of file");
            return 0;
        }
    }

    return 1;
}

int main() {
    const char* filename = "data.bin";
    FILE* file = fopen(filename, "rb");

    if (file == NULL) {
        FileOperationContext ctx = FILE_OP_CTX(NULL, filename, "fopen");
        report_file_error(&ctx, "File not found or permission denied");
        return 1;
    }

    FileOperationContext ctx = FILE_OP_CTX(file, filename, "fread");
    int data[10];

    if (!safe_fread(data, sizeof(int), 10, &ctx)) {
        fclose(file);
        return 1;
    }

    fclose(file);
    printf("Data read successfully\\n");

    return 0;
}
\`\`\`

---

## 📊 Error State Management

### Error State Inspection

\`\`\`c
#include <stdio.h>

void inspect_file_state(FILE* file, const char* operation) {
    printf("After %s:\\n", operation);

    if (feof(file)) {
        printf("  EOF flag set\\n");
    } else {
        printf("  EOF flag clear\\n");
    }

    if (ferror(file)) {
        printf("  Error flag set\\n");
    } else {
        printf("  Error flag clear\\n");
    }

    long pos = ftell(file);
    if (pos != -1L) {
        printf("  Position: %ld\\n", pos);
    } else {
        printf("  Position: unknown (error)\\n");
    }
}

int main() {
    FILE* file = fopen("example.txt", "r");

    if (file != NULL) {
        inspect_file_state(file, "opening");

        // Try to read past EOF
        char buffer[100];
        while (fgets(buffer, sizeof(buffer), file) != NULL) {
            // Process line
        }

        inspect_file_state(file, "reading to EOF");

        // Try another read
        if (fgets(buffer, sizeof(buffer), file) == NULL) {
            inspect_file_state(file, "reading past EOF");
        }

        // Clear error state
        clearerr(file);
        inspect_file_state(file, "clearerr()");

        fclose(file);
    }

    return 0;
}
\`\`\`

---

## 🧪 Complete Error Handling Examples

### Robust Configuration File Parser

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <errno.h>

typedef enum {
    CONFIG_SUCCESS = 0,
    CONFIG_FILE_NOT_FOUND,
    CONFIG_PARSE_ERROR,
    CONFIG_MEMORY_ERROR,
    CONFIG_IO_ERROR
} ConfigError;

typedef struct {
    char key[64];
    char value[256];
    int line_number;
} ConfigEntry;

typedef struct {
    ConfigEntry* entries;
    size_t count;
    size_t capacity;
} Config;

const char* config_error_string(ConfigError error) {
    switch (error) {
        case CONFIG_SUCCESS: return "Success";
        case CONFIG_FILE_NOT_FOUND: return "Configuration file not found";
        case CONFIG_PARSE_ERROR: return "Parse error in configuration";
        case CONFIG_MEMORY_ERROR: return "Memory allocation failed";
        case CONFIG_IO_ERROR: return "I/O error reading configuration";
        default: return "Unknown error";
    }
}

ConfigError config_load(Config* config, const char* filename) {
    FILE* file = fopen(filename, "r");

    if (file == NULL) {
        if (errno == ENOENT) {
            return CONFIG_FILE_NOT_FOUND;
        } else {
            return CONFIG_IO_ERROR;
        }
    }

    char line[512];
    int line_num = 0;
    ConfigError result = CONFIG_SUCCESS;

    while (fgets(line, sizeof(line), file) != NULL) {
        line_num++;

        // Check for I/O errors
        if (ferror(file)) {
            result = CONFIG_IO_ERROR;
            goto cleanup;
        }

        // Skip comments and empty lines
        if (line[0] == '#' || line[0] == ';' || line[0] == '\\n') {
            continue;
        }

        // Remove newline
        line[strcspn(line, "\\n")] = 0;

        // Find equals sign
        char* equals = strchr(line, '=');

        if (equals == NULL) {
            fprintf(stderr, "Parse error at line %d: missing '='\\n", line_num);
            result = CONFIG_PARSE_ERROR;
            goto cleanup;
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

        // Validate key and value
        if (strlen(key) == 0) {
            fprintf(stderr, "Parse error at line %d: empty key\\n", line_num);
            result = CONFIG_PARSE_ERROR;
            goto cleanup;
        }

        // Resize entries array if needed
        if (config->count >= config->capacity) {
            size_t new_capacity = config->capacity == 0 ? 16 : config->capacity * 2;
            ConfigEntry* new_entries = realloc(config->entries,
                                             new_capacity * sizeof(ConfigEntry));

            if (new_entries == NULL) {
                result = CONFIG_MEMORY_ERROR;
                goto cleanup;
            }

            config->entries = new_entries;
            config->capacity = new_capacity;
        }

        // Add entry
        ConfigEntry* entry = &config->entries[config->count++];
        strncpy(entry->key, key, sizeof(entry->key) - 1);
        strncpy(entry->value, value, sizeof(entry->value) - 1);
        entry->line_number = line_num;
    }

    // Check for read errors
    if (ferror(file)) {
        result = CONFIG_IO_ERROR;
    }

cleanup:
    if (file) {
        if (fclose(file) != 0 && result == CONFIG_SUCCESS) {
            result = CONFIG_IO_ERROR;
        }
    }

    return result;
}

void config_free(Config* config) {
    free(config->entries);
    config->entries = NULL;
    config->count = 0;
    config->capacity = 0;
}

const char* config_get(const Config* config, const char* key) {
    for (size_t i = 0; i < config->count; i++) {
        if (strcmp(config->entries[i].key, key) == 0) {
            return config->entries[i].value;
        }
    }

    return NULL;
}

int main() {
    Config config = {0};
    ConfigError error = config_load(&config, "app.config");

    if (error != CONFIG_SUCCESS) {
        fprintf(stderr, "Failed to load config: %s\\n", config_error_string(error));
        return 1;
    }

    printf("Configuration loaded (%zu entries):\\n", config.count);

    for (size_t i = 0; i < config.count; i++) {
        printf("  %s = %s\\n", config.entries[i].key, config.entries[i].value);
    }

    // Test lookup
    const char* port = config_get(&config, "port");
    if (port) {
        printf("\\nPort setting: %s\\n", port);
    }

    config_free(&config);
    return 0;
}
\`\`\`

### Safe File Backup with Error Recovery

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef enum {
    BACKUP_SUCCESS = 0,
    BACKUP_OPEN_SOURCE_ERROR,
    BACKUP_OPEN_BACKUP_ERROR,
    BACKUP_READ_ERROR,
    BACKUP_WRITE_ERROR,
    BACKUP_RENAME_ERROR,
    BACKUP_CLEANUP_ERROR
} BackupError;

BackupError create_backup(const char* filename) {
    char backup_name[256];
    snprintf(backup_name, sizeof(backup_name), "%s.bak", filename);

    FILE* source = fopen(filename, "rb");
    if (source == NULL) {
        return BACKUP_OPEN_SOURCE_ERROR;
    }

    FILE* backup = fopen(backup_name, "wb");
    if (backup == NULL) {
        fclose(source);
        return BACKUP_OPEN_BACKUP_ERROR;
    }

    char buffer[8192];
    size_t bytes_read;
    BackupError result = BACKUP_SUCCESS;

    // Copy file contents
    while ((bytes_read = fread(buffer, 1, sizeof(buffer), source)) > 0) {
        if (ferror(source)) {
            result = BACKUP_READ_ERROR;
            goto cleanup;
        }

        size_t bytes_written = fwrite(buffer, 1, bytes_read, backup);
        if (bytes_written != bytes_read || ferror(backup)) {
            result = BACKUP_WRITE_ERROR;
            goto cleanup;
        }
    }

    // Check for read error
    if (ferror(source)) {
        result = BACKUP_READ_ERROR;
        goto cleanup;
    }

cleanup:
    // Close files
    if (fclose(backup) != 0 && result == BACKUP_SUCCESS) {
        result = BACKUP_CLEANUP_ERROR;
    }

    if (fclose(source) != 0 && result == BACKUP_SUCCESS) {
        result = BACKUP_CLEANUP_ERROR;
    }

    // Remove failed backup
    if (result != BACKUP_SUCCESS) {
        remove(backup_name);
    }

    return result;
}

int main(int argc, char* argv[]) {
    if (argc != 2) {
        printf("Usage: %s <filename>\\n", argv[0]);
        return 1;
    }

    BackupError result = create_backup(argv[1]);

    if (result == BACKUP_SUCCESS) {
        printf("Backup created successfully\\n");
        return 0;
    } else {
        fprintf(stderr, "Backup failed\\n");
        return 1;
    }
}
\`\`\`

---

## 🎯 Key Takeaways

1. **ferror()** detects read/write errors, **feof()** detects end-of-file
2. **clearerr()** resets error and EOF flags
3. **Always check return values** from file operations
4. **Distinguish between EOF and errors** when reading
5. **Use goto cleanup pattern** for robust resource management
6. **Preserve error context** with detailed error reporting
7. **Implement retry logic** for transient failures
8. **Provide graceful degradation** when operations fail

---

## 🚀 Preview: Binary vs Text Files

In the final topic, you'll learn about:
- **Text file characteristics** and formatting
- **Binary file structure** and data representation
- **When to use each format** and conversion issues
- **Portable binary formats** and endianness
- **Mixed text/binary file handling**

**Choosing the right file format is crucial for data integrity and portability!** 🔄

