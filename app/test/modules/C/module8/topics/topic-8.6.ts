import { SubLesson } from '../../../../data/lessonsData';

export const topic_8_6: SubLesson = {
  id: "8.6",
  title: 'Advanced File Operations and File System',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🔧 Advanced File Operations and File System in C

Advanced file operations extend beyond basic I/O to include file system manipulation, directory operations, and system-level file management. These operations enable comprehensive file system control.

---

## 📁 Directory Operations

### **Creating Directories**

\`\`\`c
#include <stdio.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <errno.h>

// Cross-platform directory creation
int create_directory(const char *path) {
    #ifdef _WIN32
        return _mkdir(path);
    #else
        return mkdir(path, 0755);  // rwxr-xr-x permissions
    #endif
}

// Create directory with parent directories
int create_directories(const char *path) {
    char temp_path[1024];
    char *p = NULL;
    size_t len;

    snprintf(temp_path, sizeof(temp_path), "%s", path);
    len = strlen(temp_path);

    if (temp_path[len - 1] == '/') {
        temp_path[len - 1] = 0;
    }

    for (p = temp_path + 1; *p; p++) {
        if (*p == '/') {
            *p = 0;
            if (create_directory(temp_path) != 0 && errno != EEXIST) {
                return -1;
            }
            *p = '/';
        }
    }

    return create_directory(temp_path);
}

int main() {
    if (create_directories("data/input/images/")) {
        printf("Directories created successfully\\n");
    } else {
        printf("Failed to create directories\\n");
    }

    return 0;
}
\`\`\`

### **Reading Directory Contents**

\`\`\`c
#include <stdio.h>
#include <dirent.h>
#include <sys/stat.h>
#include <string.h>

void list_directory(const char *path) {
    DIR *dir = opendir(path);

    if (dir == NULL) {
        printf("Cannot open directory %s\\n", path);
        return;
    }

    printf("Contents of %s:\\n", path);

    struct dirent *entry;
    while ((entry = readdir(dir)) != NULL) {
        // Skip hidden files (starting with .)
        if (entry->d_name[0] == '.') continue;

        printf("  %s", entry->d_name);

        // Get file type
        char full_path[1024];
        snprintf(full_path, sizeof(full_path), "%s/%s", path, entry->d_name);

        struct stat st;
        if (stat(full_path, &st) == 0) {
            if (S_ISDIR(st.st_mode)) {
                printf(" (directory)");
            } else if (S_ISREG(st.st_mode)) {
                printf(" (file, %lld bytes)", (long long)st.st_size);
            }
        }

        printf("\\n");
    }

    closedir(dir);
}

// Recursive directory listing
void list_directory_recursive(const char *path, int depth) {
    DIR *dir = opendir(path);

    if (dir == NULL) return;

    struct dirent *entry;
    while ((entry = readdir(dir)) != NULL) {
        if (entry->d_name[0] == '.') continue;

        // Indentation
        for (int i = 0; i < depth; i++) printf("  ");
        printf("%s", entry->d_name);

        char full_path[1024];
        snprintf(full_path, sizeof(full_path), "%s/%s", path, entry->d_name);

        struct stat st;
        if (stat(full_path, &st) == 0) {
            if (S_ISDIR(st.st_mode)) {
                printf("/\\n");
                list_directory_recursive(full_path, depth + 1);
            } else {
                printf("\\n");
            }
        } else {
            printf("\\n");
        }
    }

    closedir(dir);
}

int main() {
    printf("=== Directory Listing ===\\n");
    list_directory(".");

    printf("\\n=== Recursive Directory Listing ===\\n");
    list_directory_recursive(".", 0);

    return 0;
}
\`\`\`

---

## 📋 File System Information

### **File Statistics**

\`\`\`c
#include <stdio.h>
#include <sys/stat.h>
#include <time.h>

void print_file_info(const char *filename) {
    struct stat file_stat;

    if (stat(filename, &file_stat) == -1) {
        printf("Cannot get info for %s\\n", filename);
        return;
    }

    printf("File: %s\\n", filename);
    printf("Size: %lld bytes\\n", (long long)file_stat.st_size);
    printf("Permissions: %o\\n", file_stat.st_mode & 0777);

    // File type
    if (S_ISREG(file_stat.st_mode)) printf("Type: Regular file\\n");
    else if (S_ISDIR(file_stat.st_mode)) printf("Type: Directory\\n");
    else if (S_ISLNK(file_stat.st_mode)) printf("Type: Symbolic link\\n");
    else printf("Type: Other\\n");

    // Timestamps
    char time_str[100];
    strftime(time_str, sizeof(time_str), "%Y-%m-%d %H:%M:%S",
             localtime(&file_stat.st_mtime));
    printf("Modified: %s\\n", time_str);

    strftime(time_str, sizeof(time_str), "%Y-%m-%d %H:%M:%S",
             localtime(&file_stat.st_atime));
    printf("Accessed: %s\\n", time_str);

    printf("Owner UID: %d\\n", file_stat.st_uid);
    printf("Group GID: %d\\n", file_stat.st_gid);
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("Usage: %s <filename>\\n", argv[0]);
        return 1;
    }

    print_file_info(argv[1]);

    return 0;
}
\`\`\`

### **File Permissions**

\`\`\`c
#include <stdio.h>
#include <sys/stat.h>

void print_permissions(mode_t mode) {
    printf("Permissions: ");

    // Owner permissions
    printf("%c", (mode & S_IRUSR) ? 'r' : '-');
    printf("%c", (mode & S_IWUSR) ? 'w' : '-');
    printf("%c", (mode & S_IXUSR) ? 'x' : '-');

    // Group permissions
    printf("%c", (mode & S_IRGRP) ? 'r' : '-');
    printf("%c", (mode & S_IWGRP) ? 'w' : '-');
    printf("%c", (mode & S_IXGRP) ? 'x' : '-');

    // Other permissions
    printf("%c", (mode & S_IROTH) ? 'r' : '-');
    printf("%c", (mode & S_IWOTH) ? 'w' : '-');
    printf("%c", (mode & S_IXOTH) ? 'x' : '-');

    printf("\\n");
}

int change_permissions(const char *filename, mode_t mode) {
    return chmod(filename, mode);
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("Usage: %s <filename>\\n", argv[0]);
        return 1;
    }

    struct stat st;
    if (stat(argv[1], &st) == 0) {
        print_permissions(st.st_mode);

        // Make file readable/writable by owner only
        if (change_permissions(argv[1], S_IRUSR | S_IWUSR) == 0) {
            printf("Permissions changed to 0600\\n");
        }
    }

    return 0;
}
\`\`\`

---

## 🔄 File Manipulation

### **Copying Files**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

#define BUFFER_SIZE 8192

int copy_file(const char *source, const char *destination) {
    FILE *src = fopen(source, "rb");
    FILE *dest = fopen(destination, "wb");

    if (src == NULL || dest == NULL) {
        if (src) fclose(src);
        if (dest) fclose(dest);
        return 0;
    }

    char buffer[BUFFER_SIZE];
    size_t bytes_read;

    while ((bytes_read = fread(buffer, 1, BUFFER_SIZE, src)) > 0) {
        if (fwrite(buffer, 1, bytes_read, dest) != bytes_read) {
            fclose(src);
            fclose(dest);
            return 0;
        }
    }

    fclose(src);
    fclose(dest);
    return 1;
}

// Copy with progress callback
int copy_file_with_progress(const char *source, const char *destination,
                           void (*progress_callback)(int percentage)) {
    FILE *src = fopen(source, "rb");
    FILE *dest = fopen(destination, "wb");

    if (src == NULL || dest == NULL) {
        if (src) fclose(src);
        if (dest) fclose(dest);
        return 0;
    }

    // Get file size
    fseek(src, 0, SEEK_END);
    long file_size = ftell(src);
    fseek(src, 0, SEEK_SET);

    char buffer[BUFFER_SIZE];
    size_t bytes_read;
    long total_read = 0;

    while ((bytes_read = fread(buffer, 1, BUFFER_SIZE, src)) > 0) {
        if (fwrite(buffer, 1, bytes_read, dest) != bytes_read) {
            fclose(src);
            fclose(dest);
            return 0;
        }

        total_read += bytes_read;

        if (progress_callback && file_size > 0) {
            int percentage = (int)((total_read * 100) / file_size);
            progress_callback(percentage);
        }
    }

    fclose(src);
    fclose(dest);
    return 1;
}

void print_progress(int percentage) {
    printf("\\rCopying... %d%%", percentage);
    fflush(stdout);
}

int main(int argc, char *argv[]) {
    if (argc != 3) {
        printf("Usage: %s <source> <destination>\\n", argv[0]);
        return 1;
    }

    printf("Copying %s to %s\\n", argv[1], argv[2]);

    if (copy_file_with_progress(argv[1], argv[2], print_progress)) {
        printf("\\nFile copied successfully!\\n");
    } else {
        printf("\\nFile copy failed!\\n");
    }

    return 0;
}
\`\`\`

### **Moving/Renaming Files**

\`\`\`c
#include <stdio.h>

int move_file(const char *old_path, const char *new_path) {
    // Try rename first (works within same filesystem)
    if (rename(old_path, new_path) == 0) {
        return 1;
    }

    // If rename failed, try copy and delete
    FILE *src = fopen(old_path, "rb");
    FILE *dest = fopen(new_path, "wb");

    if (src == NULL || dest == NULL) {
        if (src) fclose(src);
        if (dest) fclose(dest);
        return 0;
    }

    char buffer[4096];
    size_t bytes_read;

    while ((bytes_read = fread(buffer, 1, sizeof(buffer), src)) > 0) {
        if (fwrite(buffer, 1, bytes_read, dest) != bytes_read) {
            fclose(src);
            fclose(dest);
            remove(new_path);  // Clean up partial file
            return 0;
        }
    }

    fclose(src);
    fclose(dest);

    // Remove original file
    if (remove(old_path) != 0) {
        // Copy succeeded but remove failed
        // File exists in both locations - not ideal but not catastrophic
        return 0;
    }

    return 1;
}

int main(int argc, char *argv[]) {
    if (argc != 3) {
        printf("Usage: %s <source> <destination>\\n", argv[0]);
        return 1;
    }

    if (move_file(argv[1], argv[2])) {
        printf("File moved successfully\\n");
    } else {
        printf("File move failed\\n");
    }

    return 0;
}
\`\`\`

### **File Deletion**

\`\`\`c
#include <stdio.h>

int safe_remove(const char *filename) {
    // Check if file exists and is writable
    FILE *file = fopen(filename, "r");
    if (file == NULL) {
        printf("File does not exist or cannot be accessed\\n");
        return 0;
    }
    fclose(file);

    // Confirm deletion (in real app, might use GUI dialog)
    printf("Are you sure you want to delete '%s'? (y/n): ", filename);
    char response;
    scanf(" %c", &response);

    if (response != 'y' && response != 'Y') {
        printf("Deletion cancelled\\n");
        return 0;
    }

    if (remove(filename) == 0) {
        printf("File deleted successfully\\n");
        return 1;
    } else {
        printf("Failed to delete file\\n");
        return 0;
    }
}

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Usage: %s <filename>\\n", argv[0]);
        return 1;
    }

    safe_remove(argv[1]);

    return 0;
}
\`\`\`

---

## 🔍 File Search and Processing

### **Finding Files**

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <dirent.h>
#include <sys/stat.h>

void find_files(const char *directory, const char *pattern) {
    DIR *dir = opendir(directory);

    if (dir == NULL) {
        printf("Cannot open directory %s\\n", directory);
        return;
    }

    struct dirent *entry;
    while ((entry = readdir(dir)) != NULL) {
        if (entry->d_name[0] == '.') continue;  // Skip hidden files

        char full_path[1024];
        snprintf(full_path, sizeof(full_path), "%s/%s", directory, entry->d_name);

        struct stat st;
        if (stat(full_path, &st) == 0) {
            if (S_ISDIR(st.st_mode)) {
                // Recursively search subdirectories
                find_files(full_path, pattern);
            } else if (S_ISREG(st.st_mode)) {
                // Check if filename matches pattern
                if (strstr(entry->d_name, pattern) != NULL) {
                    printf("Found: %s\\n", full_path);
                }
            }
        }
    }

    closedir(dir);
}

int main(int argc, char *argv[]) {
    if (argc != 3) {
        printf("Usage: %s <directory> <pattern>\\n", argv[0]);
        return 1;
    }

    printf("Searching for files containing '%s' in %s\\n", argv[2], argv[1]);
    find_files(argv[1], argv[2]);

    return 0;
}
\`\`\`

### **Text File Processing**

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

typedef struct {
    int lines;
    int words;
    int characters;
    int blank_lines;
} FileStats;

FileStats analyze_text_file(const char *filename) {
    FileStats stats = {0, 0, 0, 0};

    FILE *file = fopen(filename, "r");
    if (file == NULL) return stats;

    char line[1024];
    int in_word = 0;

    while (fgets(line, sizeof(line), file) != NULL) {
        stats.lines++;
        stats.characters += strlen(line);

        // Check for blank line
        int is_blank = 1;
        for (size_t i = 0; line[i] != '\\0' && line[i] != '\\n'; i++) {
            if (!isspace(line[i])) {
                is_blank = 0;
                break;
            }
        }

        if (is_blank) {
            stats.blank_lines++;
        }

        // Count words
        for (size_t i = 0; line[i] != '\\0'; i++) {
            if (isspace(line[i])) {
                in_word = 0;
            } else if (!in_word) {
                in_word = 1;
                stats.words++;
            }
        }
    }

    fclose(file);
    return stats;
}

void print_file_analysis(const char *filename) {
    FileStats stats = analyze_text_file(filename);

    printf("Analysis of %s:\\n", filename);
    printf("Lines: %d\\n", stats.lines);
    printf("Words: %d\\n", stats.words);
    printf("Characters: %d\\n", stats.characters);
    printf("Blank lines: %d\\n", stats.blank_lines);

    if (stats.lines > 0) {
        printf("Average words per line: %.1f\\n", (float)stats.words / stats.lines);
        printf("Average characters per line: %.1f\\n", (float)stats.characters / stats.lines);
    }
}

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Usage: %s <text_file>\\n", argv[0]);
        return 1;
    }

    print_file_analysis(argv[1]);

    return 0;
}
\`\`\`

---

## 🔐 File Locking

### **Advisory File Locking**

\`\`\`c
#include <stdio.h>
#include <unistd.h>
#include <fcntl.h>

int acquire_lock(const char *filename) {
    int fd = open(filename, O_RDWR | O_CREAT, 0644);
    if (fd == -1) return -1;

    // Try to acquire lock
    struct flock lock;
    lock.l_type = F_WRLCK;    // Write lock
    lock.l_whence = SEEK_SET;
    lock.l_start = 0;
    lock.l_len = 0;           // Lock entire file

    if (fcntl(fd, F_SETLK, &lock) == -1) {
        close(fd);
        return -1;  // Lock failed
    }

    return fd;
}

void release_lock(int fd) {
    if (fd != -1) {
        struct flock lock;
        lock.l_type = F_UNLCK;
        lock.l_whence = SEEK_SET;
        lock.l_start = 0;
        lock.l_len = 0;

        fcntl(fd, F_SETLK, &lock);
        close(fd);
    }
}

int main() {
    const char *lockfile = "process.lock";

    printf("Attempting to acquire lock...\\n");

    int fd = acquire_lock(lockfile);
    if (fd == -1) {
        printf("Failed to acquire lock. Another instance may be running.\\n");
        return 1;
    }

    printf("Lock acquired. Performing exclusive operations...\\n");

    // Simulate work
    sleep(5);

    printf("Releasing lock.\\n");
    release_lock(fd);

    // Clean up lock file
    remove(lockfile);

    return 0;
}
\`\`\`

---

## 🎯 Practical Applications

### **Backup System**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <sys/stat.h>

void create_backup(const char *source_dir, const char *backup_dir) {
    // Create timestamped backup directory
    time_t now = time(NULL);
    struct tm *timeinfo = localtime(&now);

    char backup_path[512];
    strftime(backup_path, sizeof(backup_path), "%Y%m%d_%H%M%S", timeinfo);

    char full_backup_path[1024];
    snprintf(full_backup_path, sizeof(full_backup_path), "%s/%s", backup_dir, backup_path);

    create_directories(full_backup_path);

    // Copy all files from source to backup
    // (Implementation would recursively copy files)

    printf("Backup created: %s\\n", full_backup_path);
}

void restore_backup(const char *backup_path, const char *restore_dir) {
    // Restore files from backup
    // (Implementation would recursively copy files back)

    printf("Restored from backup: %s\\n", backup_path);
}

int main(int argc, char *argv[]) {
    if (argc < 3) {
        printf("Usage: %s <command> <source_dir> [backup_dir]\\n", argv[0]);
        printf("Commands: backup, restore\\n");
        return 1;
    }

    const char *command = argv[1];
    const char *source_dir = argv[2];

    if (strcmp(command, "backup") == 0) {
        const char *backup_dir = (argc > 3) ? argv[3] : "./backups";
        create_backup(source_dir, backup_dir);
    } else if (strcmp(command, "restore") == 0) {
        const char *restore_dir = (argc > 3) ? argv[3] : "./restored";
        restore_backup(source_dir, restore_dir);
    } else {
        printf("Unknown command: %s\\n", command);
        return 1;
    }

    return 0;
}
\`\`\`

### **File Organizer**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <dirent.h>
#include <sys/stat.h>

typedef struct {
    const char *extension;
    const char *folder;
} FileRule;

FileRule rules[] = {
    {".txt", "Documents/Text"},
    {".doc", "Documents/Word"},
    {".pdf", "Documents/PDF"},
    {".jpg", "Images/JPEG"},
    {".png", "Images/PNG"},
    {".mp3", "Music"},
    {".mp4", "Videos"},
    {NULL, NULL}  // Sentinel
};

const char* get_target_folder(const char *filename) {
    const char *extension = strrchr(filename, '.');
    if (extension == NULL) return "Other";

    for (int i = 0; rules[i].extension != NULL; i++) {
        if (strcmp(extension, rules[i].extension) == 0) {
            return rules[i].folder;
        }
    }

    return "Other";
}

void organize_files(const char *source_dir) {
    DIR *dir = opendir(source_dir);
    if (dir == NULL) {
        printf("Cannot open directory %s\\n", source_dir);
        return;
    }

    struct dirent *entry;
    while ((entry = readdir(dir)) != NULL) {
        if (entry->d_name[0] == '.') continue;

        const char *target_folder = get_target_folder(entry->d_name);

        // Create target directory
        char target_path[512];
        snprintf(target_path, sizeof(target_path), "%s/%s", source_dir, target_folder);
        create_directories(target_path);

        // Move file
        char source_file[512];
        char dest_file[512];

        snprintf(source_file, sizeof(source_file), "%s/%s", source_dir, entry->d_name);
        snprintf(dest_file, sizeof(dest_file), "%s/%s/%s", source_dir, target_folder, entry->d_name);

        if (move_file(source_file, dest_file)) {
            printf("Moved: %s -> %s\\n", entry->d_name, target_folder);
        }
    }

    closedir(dir);
}

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Usage: %s <directory_to_organize>\\n", argv[0]);
        return 1;
    }

    printf("Organizing files in %s\\n", argv[1]);
    organize_files(argv[1]);
    printf("Organization complete!\\n");

    return 0;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Directory operations** enable folder creation and traversal
2. **File statistics** provide metadata about files and directories
3. **File copying/moving** are essential for data management
4. **File locking** prevents concurrent access issues
5. **Search and processing** enable bulk file operations
6. **Backup systems** protect against data loss
7. **File organization** improves data management
8. **Error handling** ensures reliable file system operations

Advanced file operations transform C programs into powerful system utilities! 🔧✨`;

    return contentString;
  })()
};
