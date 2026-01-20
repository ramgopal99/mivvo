import { SubLesson } from '../../../../data/lessonsData';

export const topic_8_5: SubLesson = {
  id: "8.5",
  title: 'Error Handling and File Validation',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# ⚠️ Error Handling and File Validation in C

Robust file I/O requires comprehensive error handling and validation. Files can fail to open, read operations can encounter errors, and data corruption can occur. Proper error handling ensures reliable file operations.

---

## 🚨 File Operation Errors

### **Common File Errors**

1. **File Not Found**: Attempting to open non-existent file for reading
2. **Permission Denied**: Insufficient permissions to access file
3. **Disk Full**: No space available for writing
4. **File Locked**: Another process has exclusive access
5. **Path Too Long**: File path exceeds system limits
6. **Invalid Path**: Malformed or invalid path syntax

### **Error Detection Functions**

#### **ferror() - Check for I/O Errors**

\`\`\`c
#include <stdio.h>

int ferror(FILE *stream);
\`\`\`

**Returns:** Non-zero if error occurred, 0 if no error

#### **feof() - Check for End of File**

\`\`\`c
#include <stdio.h>

int feof(FILE *stream);
\`\`\`

**Returns:** Non-zero if EOF reached, 0 otherwise

#### **clearerr() - Clear Error Flags**

\`\`\`c
#include <stdio.h>

void clearerr(FILE *stream);
\`\`\`

**Clears:** Both error and EOF flags

### **Comprehensive Error Checking**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

#define SAFE_FILE_OP(operation) \\
    do { \\
        if (!(operation)) { \\
            fprintf(stderr, "File operation failed at %s:%d\\n", __FILE__, __LINE__); \\
            goto error_cleanup; \\
        } \\
    } while(0)

int read_file_safely(const char *filename, char **buffer, size_t *size) {
    FILE *file = NULL;
    char *temp_buffer = NULL;
    size_t file_size = 0;
    size_t bytes_read = 0;

    // Open file
    SAFE_FILE_OP(file = fopen(filename, "rb"));

    // Get file size
    SAFE_FILE_OP(fseek(file, 0, SEEK_END) == 0);
    SAFE_FILE_OP((file_size = ftell(file)) != -1);
    SAFE_FILE_OP(fseek(file, 0, SEEK_SET) == 0);

    // Allocate buffer
    SAFE_FILE_OP(temp_buffer = (char*)malloc(file_size + 1));
    temp_buffer[file_size] = '\\0';  // Null terminate

    // Read file
    SAFE_FILE_OP((bytes_read = fread(temp_buffer, 1, file_size, file)) == file_size);

    // Close file
    SAFE_FILE_OP(fclose(file) == 0);

    *buffer = temp_buffer;
    *size = file_size;
    return 1;

error_cleanup:
    if (file) fclose(file);
    if (temp_buffer) free(temp_buffer);
    return 0;
}

int main() {
    char *content = NULL;
    size_t size = 0;

    if (read_file_safely("example.txt", &content, &size)) {
        printf("File read successfully (%zu bytes)\\n", size);
        printf("Content: %.*s\\n", (int)size, content);
        free(content);
    } else {
        printf("Failed to read file\\n");
    }

    return 0;
}
\`\`\`

---

## 🔍 File Validation

### **File Existence Check**

\`\`\`c
#include <stdio.h>

int file_exists(const char *filename) {
    FILE *file = fopen(filename, "r");
    if (file != NULL) {
        fclose(file);
        return 1;
    }
    return 0;
}

int main() {
    const char *filename = "test.txt";

    if (file_exists(filename)) {
        printf("File '%s' exists\\n", filename);
    } else {
        printf("File '%s' does not exist\\n", filename);
    }

    return 0;
}
\`\`\`

### **File Size Validation**

\`\`\`c
#include <stdio.h>

long get_file_size(const char *filename) {
    FILE *file = fopen(filename, "rb");
    if (file == NULL) return -1;

    if (fseek(file, 0, SEEK_END) != 0) {
        fclose(file);
        return -1;
    }

    long size = ftell(file);
    fclose(file);

    return size;
}

int validate_file_size(const char *filename, long min_size, long max_size) {
    long size = get_file_size(filename);

    if (size == -1) return 0;  // Error

    if (size < min_size) {
        printf("File too small (%ld < %ld bytes)\\n", size, min_size);
        return 0;
    }

    if (size > max_size) {
        printf("File too large (%ld > %ld bytes)\\n", size, max_size);
        return 0;
    }

    return 1;
}

int main() {
    if (validate_file_size("data.bin", 100, 10000)) {
        printf("File size is valid\\n");
    } else {
        printf("File size validation failed\\n");
    }

    return 0;
}
\`\`\`

### **File Type Validation**

\`\`\`c
#include <stdio.h>
#include <string.h>

// Check if file is a text file
int is_text_file(const char *filename) {
    FILE *file = fopen(filename, "rb");
    if (file == NULL) return 0;

    // Check for null bytes (indicates binary)
    int ch;
    int is_text = 1;

    while ((ch = fgetc(file)) != EOF) {
        if (ch == 0) {
            is_text = 0;
            break;
        }
    }

    fclose(file);
    return is_text;
}

// Check file signature (magic numbers)
int validate_file_type(const char *filename, const char *expected_signature, size_t sig_len) {
    FILE *file = fopen(filename, "rb");
    if (file == NULL) return 0;

    char signature[sig_len];
    size_t bytes_read = fread(signature, 1, sig_len, file);
    fclose(file);

    if (bytes_read != sig_len) return 0;

    return memcmp(signature, expected_signature, sig_len) == 0;
}

int is_png_file(const char *filename) {
    const char png_sig[] = {0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A};
    return validate_file_type(filename, png_sig, sizeof(png_sig));
}

int is_jpeg_file(const char *filename) {
    const char jpeg_sig1[] = {0xFF, 0xD8, 0xFF};
    const char jpeg_sig2[] = {0xFF, 0xD8, 0xFF, 0xE0};
    const char jpeg_sig3[] = {0xFF, 0xD8, 0xFF, 0xE1};

    return validate_file_type(filename, jpeg_sig1, sizeof(jpeg_sig1)) ||
           validate_file_type(filename, jpeg_sig2, sizeof(jpeg_sig2)) ||
           validate_file_type(filename, jpeg_sig3, sizeof(jpeg_sig3));
}

int main() {
    const char *filename = "image.png";

    if (is_png_file(filename)) {
        printf("'%s' is a valid PNG file\\n", filename);
    } else if (is_jpeg_file(filename)) {
        printf("'%s' is a valid JPEG file\\n", filename);
    } else {
        printf("'%s' is not a recognized image format\\n", filename);
    }

    return 0;
}
\`\`\`

---

## 🛡️ Robust File Operations

### **Safe File Reading with Timeouts**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define READ_TIMEOUT_SECONDS 5

size_t safe_fread(void *ptr, size_t size, size_t count, FILE *stream) {
    if (stream == NULL || ptr == NULL) return 0;

    time_t start_time = time(NULL);
    size_t total_read = 0;

    while (total_read < count * size) {
        size_t bytes_to_read = count * size - total_read;
        if (bytes_to_read > 4096) bytes_to_read = 4096;  // Read in chunks

        size_t bytes_read = fread((char*)ptr + total_read, 1, bytes_to_read, stream);

        if (bytes_read == 0) {
            if (feof(stream)) break;  // End of file
            if (ferror(stream)) return total_read;  // Error
        }

        total_read += bytes_read;

        // Check for timeout
        if (difftime(time(NULL), start_time) > READ_TIMEOUT_SECONDS) {
            fprintf(stderr, "Read operation timed out\\n");
            break;
        }
    }

    return total_read / size;  // Return number of elements read
}

int main() {
    FILE *file = fopen("large_file.dat", "rb");
    if (file == NULL) return 1;

    const int BUFFER_SIZE = 1024;
    char buffer[BUFFER_SIZE];

    printf("Reading file with timeout protection...\\n");

    size_t elements_read = safe_fread(buffer, 1, BUFFER_SIZE, file);

    printf("Read %zu bytes safely\\n", elements_read);

    fclose(file);

    return 0;
}
\`\`\`

### **Atomic File Operations**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Atomic write using temporary file
int atomic_write(const char *filename, const char *content) {
    // Create temporary filename
    char temp_filename[256];
    snprintf(temp_filename, sizeof(temp_filename), "%s.tmp", filename);

    // Write to temporary file
    FILE *temp_file = fopen(temp_filename, "w");
    if (temp_file == NULL) return 0;

    size_t content_len = strlen(content);
    size_t written = fwrite(content, 1, content_len, temp_file);

    if (written != content_len || ferror(temp_file)) {
        fclose(temp_file);
        remove(temp_filename);
        return 0;
    }

    fclose(temp_file);

    // Atomic rename (most systems support this atomically)
    if (rename(temp_filename, filename) != 0) {
        remove(temp_filename);
        return 0;
    }

    return 1;
}

int main() {
    const char *filename = "important_data.txt";
    const char *content = "This is critical data that must be written atomically.\\n";

    if (atomic_write(filename, content)) {
        printf("Data written atomically to '%s'\\n", filename);
    } else {
        printf("Failed to write data atomically\\n");
    }

    return 0;
}
\`\`\`

---

## 🔄 Recovery and Rollback

### **File Backup and Restore**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BACKUP_SUFFIX ".backup"

// Create backup before modification
int create_backup(const char *filename) {
    char backup_name[256];
    snprintf(backup_name, sizeof(backup_name), "%s%s", filename, BACKUP_SUFFIX);

    // Copy file
    FILE *original = fopen(filename, "rb");
    FILE *backup = fopen(backup_name, "wb");

    if (original == NULL || backup == NULL) {
        if (original) fclose(original);
        if (backup) fclose(backup);
        return 0;
    }

    char buffer[4096];
    size_t bytes_read;

    while ((bytes_read = fread(buffer, 1, sizeof(buffer), original)) > 0) {
        if (fwrite(buffer, 1, bytes_read, backup) != bytes_read) {
            fclose(original);
            fclose(backup);
            remove(backup_name);
            return 0;
        }
    }

    fclose(original);
    fclose(backup);
    return 1;
}

// Restore from backup
int restore_backup(const char *filename) {
    char backup_name[256];
    snprintf(backup_name, sizeof(backup_name), "%s%s", filename, BACKUP_SUFFIX);

    // Check if backup exists
    FILE *backup = fopen(backup_name, "rb");
    if (backup == NULL) return 0;
    fclose(backup);

    // Remove corrupted file and rename backup
    remove(filename);
    if (rename(backup_name, filename) != 0) {
        return 0;
    }

    return 1;
}

// Safe file update with rollback
int safe_update_file(const char *filename, const char *new_content) {
    // Step 1: Create backup
    if (!create_backup(filename)) {
        fprintf(stderr, "Failed to create backup\\n");
        return 0;
    }

    // Step 2: Write new content
    FILE *file = fopen(filename, "w");
    if (file == NULL) {
        restore_backup(filename);
        return 0;
    }

    if (fputs(new_content, file) == EOF) {
        fclose(file);
        restore_backup(filename);
        return 0;
    }

    fclose(file);

    // Step 3: Remove backup (update successful)
    char backup_name[256];
    snprintf(backup_name, sizeof(backup_name), "%s%s", filename, BACKUP_SUFFIX);
    remove(backup_name);

    return 1;
}

int main() {
    const char *filename = "config.txt";

    if (safe_update_file(filename, "new_configuration_data\\nversion=2.0\\n")) {
        printf("File updated successfully with rollback protection\\n");
    } else {
        printf("File update failed, original file preserved\\n");
    }

    return 0;
}
\`\`\`

---

## 📊 File Integrity and Checksums

### **Simple Checksum Calculation**

\`\`\`c
#include <stdio.h>
#include <stdint.h>

uint32_t calculate_checksum(const char *filename) {
    FILE *file = fopen(filename, "rb");
    if (file == NULL) return 0;

    uint32_t checksum = 0;
    int ch;

    while ((ch = fgetc(file)) != EOF) {
        checksum = ((checksum << 5) + checksum) + (uint8_t)ch;  // Simple hash
    }

    fclose(file);
    return checksum;
}

int verify_file_integrity(const char *filename, uint32_t expected_checksum) {
    uint32_t actual_checksum = calculate_checksum(filename);
    return actual_checksum == expected_checksum;
}

int main() {
    const char *filename = "important.dat";

    // Calculate initial checksum
    uint32_t checksum = calculate_checksum(filename);
    printf("File checksum: 0x%08X\\n", checksum);

    // Later verification
    if (verify_file_integrity(filename, checksum)) {
        printf("File integrity verified\\n");
    } else {
        printf("File corruption detected!\\n");
    }

    return 0;
}
\`\`\`

### **File Corruption Detection**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    uint32_t checksum;
    size_t data_size;
    char data[];  // Flexible array member
} FileHeader;

// Write file with integrity check
int write_protected_file(const char *filename, const void *data, size_t size) {
    FILE *file = fopen(filename, "wb");
    if (file == NULL) return 0;

    // Calculate checksum
    uint32_t checksum = 0;
    const uint8_t *bytes = (const uint8_t*)data;
    for (size_t i = 0; i < size; i++) {
        checksum = ((checksum << 5) + checksum) + bytes[i];
    }

    // Write header
    FileHeader header = {checksum, size};
    if (fwrite(&header, sizeof(FileHeader), 1, file) != 1) {
        fclose(file);
        return 0;
    }

    // Write data
    if (fwrite(data, 1, size, file) != size) {
        fclose(file);
        return 0;
    }

    fclose(file);
    return 1;
}

// Read and verify file integrity
void* read_protected_file(const char *filename, size_t *out_size) {
    FILE *file = fopen(filename, "rb");
    if (file == NULL) return NULL;

    // Read header
    FileHeader header;
    if (fread(&header, sizeof(FileHeader), 1, file) != 1) {
        fclose(file);
        return NULL;
    }

    // Allocate buffer
    void *data = malloc(header.data_size);
    if (data == NULL) {
        fclose(file);
        return NULL;
    }

    // Read data
    if (fread(data, 1, header.data_size, file) != header.data_size) {
        free(data);
        fclose(file);
        return NULL;
    }

    fclose(file);

    // Verify checksum
    uint32_t calculated_checksum = 0;
    const uint8_t *bytes = (const uint8_t*)data;
    for (size_t i = 0; i < header.data_size; i++) {
        calculated_checksum = ((calculated_checksum << 5) + calculated_checksum) + bytes[i];
    }

    if (calculated_checksum != header.checksum) {
        printf("File corruption detected!\\n");
        free(data);
        return NULL;
    }

    *out_size = header.data_size;
    return data;
}

int main() {
    const char *filename = "protected.dat";
    const char *test_data = "This is important data that must remain intact.";

    // Write with protection
    if (write_protected_file(filename, test_data, strlen(test_data) + 1)) {
        printf("Protected file written\\n");

        // Read and verify
        size_t size;
        char *read_data = (char*)read_protected_file(filename, &size);

        if (read_data != NULL) {
            printf("Verified data: %s\\n", read_data);
            free(read_data);
        }
    }

    return 0;
}
\`\`\`

---

## 🎯 Practical Applications

### **Configuration File Manager**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define MAX_CONFIG_ENTRIES 100
#define MAX_KEY_LENGTH 50
#define MAX_VALUE_LENGTH 200

typedef struct {
    char key[MAX_KEY_LENGTH];
    char value[MAX_VALUE_LENGTH];
} ConfigEntry;

typedef struct {
    ConfigEntry entries[MAX_CONFIG_ENTRIES];
    int count;
    char filename[256];
    uint32_t checksum;  // For integrity checking
} ConfigManager;

int config_load(ConfigManager *config, const char *filename) {
    FILE *file = fopen(filename, "r");
    if (file == NULL) return 0;

    strcpy(config->filename, filename);
    config->count = 0;
    config->checksum = 0;

    char line[300];
    int line_num = 0;

    while (fgets(line, sizeof(line), file) != NULL) {
        line_num++;

        // Skip comments and empty lines
        if (line[0] == '#' || line[0] == '\\n' || line[0] == '\\0') continue;

        // Parse key=value
        char *equals = strchr(line, '=');
        if (equals == NULL) {
            fprintf(stderr, "Invalid config format at line %d\\n", line_num);
            continue;
        }

        *equals = '\\0';
        char *key = line;
        char *value = equals + 1;

        // Trim whitespace
        while (isspace(*key)) key++;
        char *key_end = key + strlen(key) - 1;
        while (key_end > key && isspace(*key_end)) *key_end-- = '\\0';

        while (isspace(*value)) value++;
        char *value_end = value + strlen(value) - 1;
        while (value_end > value && isspace(*value_end)) *value_end-- = '\\0';

        // Remove trailing newline
        value_end = value + strlen(value) - 1;
        if (*value_end == '\\n') *value_end = '\\0';

        // Add entry
        if (config->count < MAX_CONFIG_ENTRIES) {
            strncpy(config->entries[config->count].key, key, MAX_KEY_LENGTH - 1);
            strncpy(config->entries[config->count].value, value, MAX_VALUE_LENGTH - 1);
            config->entries[config->count].key[MAX_KEY_LENGTH - 1] = '\\0';
            config->entries[config->count].value[MAX_VALUE_LENGTH - 1] = '\\0';
            config->count++;
        }
    }

    fclose(file);
    config->checksum = calculate_checksum(filename);
    return 1;
}

const char* config_get(ConfigManager *config, const char *key) {
    for (int i = 0; i < config->count; i++) {
        if (strcmp(config->entries[i].key, key) == 0) {
            return config->entries[i].value;
        }
    }
    return NULL;
}

int config_save(ConfigManager *config) {
    // Create backup first
    char backup_name[256];
    snprintf(backup_name, sizeof(backup_name), "%s.backup", config->filename);

    if (rename(config->filename, backup_name) != 0) {
        // If no original file exists, that's okay
    }

    FILE *file = fopen(config->filename, "w");
    if (file == NULL) {
        // Restore backup
        rename(backup_name, config->filename);
        return 0;
    }

    fprintf(file, "# Configuration file\\n");
    fprintf(file, "# Auto-generated\\n\\n");

    for (int i = 0; i < config->count; i++) {
        fprintf(file, "%s = %s\\n", config->entries[i].key, config->entries[i].value);
    }

    fclose(file);

    // Verify integrity
    uint32_t new_checksum = calculate_checksum(config->filename);
    if (new_checksum != config->checksum) {
        // Restore backup
        remove(config->filename);
        rename(backup_name, config->filename);
        return 0;
    }

    // Remove backup
    remove(backup_name);
    config->checksum = new_checksum;

    return 1;
}

int main() {
    ConfigManager config;

    if (config_load(&config, "app.config")) {
        printf("Configuration loaded (%d entries)\\n", config.count);

        const char *value = config_get(&config, "database_host");
        if (value != NULL) {
            printf("Database host: %s\\n", value);
        }

        // Modify configuration
        for (int i = 0; i < config.count; i++) {
            if (strcmp(config.entries[i].key, "version") == 0) {
                strcpy(config.entries[i].value, "2.1");
                break;
            }
        }

        if (config_save(&config)) {
            printf("Configuration saved successfully\\n");
        }
    }

    return 0;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Error handling** is crucial for robust file operations
2. **Validate inputs** before file operations
3. **Check return values** of all file functions
4. **Use atomic operations** to prevent data corruption
5. **Implement backups** for critical file updates
6. **Verify file integrity** with checksums
7. **Handle timeouts** for reliable I/O operations
8. **Clean up resources** properly on errors

Error handling and validation transform file operations from fragile utilities to reliable, production-ready code! ⚠️✨`;

    return contentString;
  })()
};
