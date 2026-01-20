import { SubLesson } from '../../../../data/lessonsData';

export const topic_6_6: SubLesson = {
  id: "6.6",
  title: 'String Safety and Best Practices',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🛡️ String Safety and Best Practices in C

String handling is one of the most common sources of bugs and security vulnerabilities in C programs. Understanding safe string practices prevents crashes, data corruption, and security exploits.

---

## 🚨 The Dangers of Unsafe Strings

### **Buffer Overflow - The Silent Killer**

\`\`\`c
#include <stdio.h>
#include <string.h>

void unsafe_function(char *input) {
    char buffer[10];  // Only 10 bytes

    strcpy(buffer, input);  // No bounds checking!
    printf("Copied: %s\\n", buffer);
}

int main(void) {
    // This will overflow the buffer
    char dangerous_input[] = "This string is way too long for the buffer";

    unsafe_function(dangerous_input);

    printf("Program continues... but memory is corrupted!\\n");

    return 0;
}
\`\`\`

**Consequences:**
- Memory corruption
- Program crashes
- Security vulnerabilities
- Unpredictable behavior

---

## ✅ Safe String Functions

### **strncpy() with Null Termination**

\`\`\`c
#include <stdio.h>
#include <string.h>

void safe_copy(char *dest, size_t dest_size, const char *src) {
    // Copy at most dest_size - 1 characters
    strncpy(dest, src, dest_size - 1);

    // Ensure null termination
    dest[dest_size - 1] = '\\0';
}

int main(void) {
    char buffer[20];
    char long_input[] = "This is a very long string that would overflow";

    safe_copy(buffer, sizeof(buffer), long_input);

    printf("Safe copy result: %s\\n", buffer);
    printf("Buffer size: %zu, String length: %zu\\n",
           sizeof(buffer), strlen(buffer));

    return 0;
}
\`\`\`

---

### **strncat() for Safe Concatenation**

\`\`\`c
#include <stdio.h>
#include <string.h>

void safe_concat(char *dest, size_t dest_size, const char *src) {
    // Find current length
    size_t dest_len = strlen(dest);

    // Calculate how much more we can add
    size_t available = dest_size - dest_len - 1;

    if (available > 0) {
        strncat(dest, src, available);
    }

    // Ensure null termination (strncat does this automatically)
    dest[dest_size - 1] = '\\0';
}

int main(void) {
    char buffer[20] = "Hello";

    safe_concat(buffer, sizeof(buffer), " World!");
    printf("Result: %s\\n", buffer);

    // Try to add more (should be truncated)
    safe_concat(buffer, sizeof(buffer), " This is too much text");
    printf("After truncation: %s\\n", buffer);

    return 0;
}
\`\`\`

---

### **Custom Safe String Library**

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <stdarg.h>

// Safe string copy
char* safe_strcpy(char *dest, size_t dest_size, const char *src) {
    if (dest == NULL || src == NULL || dest_size == 0) {
        return NULL;
    }

    size_t src_len = strlen(src);
    if (src_len >= dest_size) {
        // Truncate
        memcpy(dest, src, dest_size - 1);
        dest[dest_size - 1] = '\\0';
    } else {
        strcpy(dest, src);
    }

    return dest;
}

// Safe string concatenation
char* safe_strcat(char *dest, size_t dest_size, const char *src) {
    if (dest == NULL || src == NULL || dest_size == 0) {
        return NULL;
    }

    size_t dest_len = strlen(dest);
    size_t src_len = strlen(src);

    if (dest_len + src_len >= dest_size) {
        // Not enough space
        return NULL;
    }

    strcat(dest, src);
    return dest;
}

// Safe formatted string
int safe_sprintf(char *dest, size_t dest_size, const char *format, ...) {
    if (dest == NULL || format == NULL || dest_size == 0) {
        return -1;
    }

    va_list args;
    va_start(args, format);

    int result = vsnprintf(dest, dest_size, format, args);

    va_end(args);

    // Ensure null termination
    dest[dest_size - 1] = '\\0';

    return result;
}

int main(void) {
    char buffer[50];

    // Test safe copy
    safe_strcpy(buffer, sizeof(buffer), "Hello");
    printf("Copy: %s\\n", buffer);

    // Test safe concatenation
    if (safe_strcat(buffer, sizeof(buffer), " World!") != NULL) {
        printf("Concat: %s\\n", buffer);
    }

    // Test safe sprintf
    safe_sprintf(buffer, sizeof(buffer), "Number: %d, Float: %.2f", 42, 3.14);
    printf("Format: %s\\n", buffer);

    return 0;
}
\`\`\`

---

## 🔍 Input Validation

### **Safe String Input**

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

// Safe string input with validation
int get_valid_string(char *buffer, size_t buffer_size,
                     const char *prompt, int (*validator)(const char*)) {
    while (1) {
        printf("%s", prompt);
        fflush(stdout);

        if (fgets(buffer, buffer_size, stdin) == NULL) {
            return 0;  // EOF
        }

        // Remove trailing newline
        size_t len = strlen(buffer);
        if (len > 0 && buffer[len - 1] == '\\n') {
            buffer[len - 1] = '\\0';
            len--;
        }

        // Check for truncation
        if (len == buffer_size - 1 && buffer[len - 1] != '\\n') {
            printf("Input too long! Please try again.\\n");
            // Clear remaining input
            int c;
            while ((c = getchar()) != '\\n' && c != EOF);
            continue;
        }

        // Validate input
        if (validator && !validator(buffer)) {
            printf("Invalid input! Please try again.\\n");
            continue;
        }

        return 1;  // Success
    }
}

// Validators
int is_not_empty(const char *str) {
    return strlen(str) > 0;
}

int is_alphabetic(const char *str) {
    if (*str == '\\0') return 0;
    while (*str) {
        if (!isalpha(*str) && *str != ' ') {
            return 0;
        }
        str++;
    }
    return 1;
}

int is_numeric(const char *str) {
    if (*str == '\\0') return 0;
    while (*str) {
        if (!isdigit(*str)) {
            return 0;
        }
        str++;
    }
    return 1;
}

int main(void) {
    char name[50];
    char age_str[10];

    if (get_valid_string(name, sizeof(name),
                        "Enter your name: ", is_alphabetic)) {
        printf("Hello, %s!\\n", name);
    }

    if (get_valid_string(age_str, sizeof(age_str),
                        "Enter your age: ", is_numeric)) {
        int age = atoi(age_str);
        printf("You are %d years old.\\n", age);
    }

    return 0;
}
\`\`\`

---

## 🛡️ Preventing Common Attacks

### **SQL Injection Prevention (Conceptual)**

\`\`\`c
#include <stdio.h>
#include <string.h>

// Simple SQL-like query builder (conceptual)
void build_safe_query(char *query, size_t query_size,
                      const char *username, const char *password) {

    // Escape single quotes to prevent SQL injection
    char escaped_username[100];
    char escaped_password[100];

    escape_sql_string(escaped_username, sizeof(escaped_username), username);
    escape_sql_string(escaped_password, sizeof(escaped_password), password);

    safe_sprintf(query, query_size,
                "SELECT * FROM users WHERE username='%s' AND password='%s'",
                escaped_username, escaped_password);
}

void escape_sql_string(char *dest, size_t dest_size, const char *src) {
    size_t i = 0, j = 0;

    while (src[i] && j < dest_size - 1) {
        if (src[i] == '\\'') {
            // Escape single quote
            if (j < dest_size - 2) {
                dest[j++] = '\\'';
                dest[j++] = '\\'';
            }
        } else {
            dest[j++] = src[i];
        }
        i++;
    }

    dest[j] = '\\0';
}

int main(void) {
    char query[200];

    // Safe query building
    build_safe_query(query, sizeof(query), "admin", "pass'word");
    printf("Safe query: %s\\n", query);

    return 0;
}
\`\`\`

---

### **Format String Protection**

\`\`\`c
#include <stdio.h>
#include <string.h>

// Safe printf wrapper
void safe_printf(const char *format, ...) {
    // Check format string for suspicious patterns
    if (strstr(format, "%n") != NULL) {
        printf("Error: Dangerous format string\\n");
        return;
    }

    if (strstr(format, "%s") != NULL && strstr(format, "%s") != strrchr(format, '%')) {
        printf("Warning: Multiple %s specifiers\\n");
    }

    va_list args;
    va_start(args, format);
    vprintf(format, args);
    va_end(args);
}

int main(void) {
    char user_input[100] = "%s%s%s";  // Potentially dangerous

    // This could be dangerous if user_input contains format specifiers
    // safe_printf(user_input, "arg1", "arg2", "arg3");

    // Safe way: don't use user input as format string
    printf("User said: %s\\n", user_input);

    return 0;
}
\`\`\`

---

## 📊 Memory-Safe String Operations

### **Bounds-Checked String Functions**

\`\`\`c
#include <stdio.h>
#include <string.h>

// Bounds-checked string comparison
int safe_strcmp(const char *s1, const char *s2, size_t max_len) {
    if (s1 == NULL || s2 == NULL) {
        return s1 == s2 ? 0 : (s1 == NULL ? -1 : 1);
    }

    size_t i = 0;
    while (i < max_len && s1[i] && s2[i]) {
        if (s1[i] != s2[i]) {
            return (unsigned char)s1[i] - (unsigned char)s2[i];
        }
        i++;
    }

    if (i == max_len) {
        return 0;  // Strings equal up to max_len
    }

    return (unsigned char)s1[i] - (unsigned char)s2[i];
}

// Bounds-checked string search
char* safe_strstr(const char *haystack, const char *needle, size_t haystack_len) {
    if (haystack == NULL || needle == NULL || haystack_len == 0) {
        return NULL;
    }

    size_t needle_len = strlen(needle);
    if (needle_len == 0) return (char*)haystack;

    for (size_t i = 0; i <= haystack_len - needle_len; i++) {
        if (safe_strcmp(haystack + i, needle, needle_len) == 0) {
            return (char*)(haystack + i);
        }
    }

    return NULL;
}

int main(void) {
    char text[50] = "The quick brown fox jumps";
    char search[] = "fox";

    int result = safe_strcmp(text, "The quick brown", 15);
    printf("Comparison result: %d\\n", result);

    char *found = safe_strstr(text, search, strlen(text));
    if (found) {
        printf("Found '%s' at position: %ld\\n", search, found - text);
    }

    return 0;
}
\`\`\`

---

## 🎯 Secure Coding Practices

### **Defense in Depth**

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// Comprehensive safe string handling example
typedef struct {
    char *data;
    size_t size;
    size_t capacity;
} SafeString;

SafeString* safe_string_create(size_t initial_capacity) {
    SafeString *str = (SafeString*)malloc(sizeof(SafeString));
    if (str == NULL) return NULL;

    str->data = (char*)malloc(initial_capacity);
    if (str->data == NULL) {
        free(str);
        return NULL;
    }

    str->data[0] = '\\0';
    str->size = 0;
    str->capacity = initial_capacity;

    return str;
}

void safe_string_destroy(SafeString *str) {
    if (str) {
        // Secure cleanup - overwrite sensitive data
        memset(str->data, 0, str->capacity);
        free(str->data);
        free(str);
    }
}

int safe_string_append(SafeString *str, const char *append_str) {
    if (str == NULL || append_str == NULL) return 0;

    size_t append_len = strlen(append_str);
    size_t needed = str->size + append_len + 1;

    if (needed > str->capacity) {
        // Grow capacity
        size_t new_capacity = needed * 2;
        char *new_data = (char*)realloc(str->data, new_capacity);
        if (new_data == NULL) return 0;

        str->data = new_data;
        str->capacity = new_capacity;
    }

    strcpy(str->data + str->size, append_str);
    str->size += append_len;

    return 1;
}

int safe_string_validate(SafeString *str) {
    if (str == NULL) return 0;
    if (str->data == NULL) return 0;
    if (str->size >= str->capacity) return 0;

    // Check null termination
    if (str->data[str->size] != '\\0') return 0;

    return 1;
}

const char* safe_string_get(SafeString *str) {
    return safe_string_validate(str) ? str->data : NULL;
}

int main(void) {
    SafeString *str = safe_string_create(20);
    if (str == NULL) {
        printf("Failed to create safe string\\n");
        return 1;
    }

    safe_string_append(str, "Hello");
    safe_string_append(str, " ");
    safe_string_append(str, "World");

    const char *result = safe_string_get(str);
    if (result) {
        printf("Result: %s\\n", result);
        printf("Length: %zu, Capacity: %zu\\n", strlen(result), str->capacity);
    }

    safe_string_destroy(str);

    return 0;
}
\`\`\`

---

## 🛠️ String Security Checklist

### **Before Using Any String Function:**

1. **Check for NULL pointers** - Don't pass NULL to string functions
2. **Verify buffer sizes** - Ensure destination has enough space
3. **Validate input** - Check user input for expected format
4. **Handle encoding** - Be aware of character encoding issues
5. **Monitor resource usage** - Watch for memory exhaustion attacks

### **String Function Safety:**

| Function | Safe Alternative | Notes |
|----------|------------------|-------|
| \`strcpy\` | \`strncpy\` + null termination | Always check bounds |
| \`strcat\` | \`strncat\` | Check available space |
| \`sprintf\` | \`snprintf\` | Use size parameter |
| \`gets\` | \`fgets\` | Never use gets() |
| \`scanf\` | Width specifiers | Always limit input |

---

## 🎯 Practical Security Examples

### **Example 1: Safe Command Line Argument Processing**

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define MAX_ARGS 10
#define MAX_ARG_LENGTH 100

int parse_arguments(int argc, char *argv[], char args[MAX_ARGS][MAX_ARG_LENGTH]) {
    int arg_count = 0;

    for (int i = 1; i < argc && arg_count < MAX_ARGS; i++) {
        size_t len = strlen(argv[i]);

        if (len >= MAX_ARG_LENGTH) {
            fprintf(stderr, "Argument too long: %s\\n", argv[i]);
            return -1;
        }

        // Safe copy with null termination
        strncpy(args[arg_count], argv[i], MAX_ARG_LENGTH - 1);
        args[arg_count][MAX_ARG_LENGTH - 1] = '\\0';

        // Basic validation - no control characters
        int valid = 1;
        for (size_t j = 0; j < len; j++) {
            if (argv[i][j] < 32 && argv[i][j] != '\\t') {
                valid = 0;
                break;
            }
        }

        if (!valid) {
            fprintf(stderr, "Invalid characters in argument: %s\\n", argv[i]);
            return -1;
        }

        arg_count++;
    }

    return arg_count;
}

int main(int argc, char *argv[]) {
    char args[MAX_ARGS][MAX_ARG_LENGTH];

    int count = parse_arguments(argc, argv, args);
    if (count < 0) {
        return 1;
    }

    printf("Parsed %d arguments:\\n", count);
    for (int i = 0; i < count; i++) {
        printf("  %d: %s\\n", i + 1, args[i]);
    }

    return 0;
}
\`\`\`

### **Example 2: Safe File Path Handling**

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define MAX_PATH 260

// Validate and sanitize file path
int validate_file_path(const char *path, char *sanitized, size_t sanitized_size) {
    if (path == NULL || sanitized == NULL || sanitized_size == 0) {
        return 0;
    }

    size_t len = strlen(path);
    if (len >= sanitized_size) {
        return 0;  // Too long
    }

    // Check for dangerous characters
    const char *dangerous = "<>\"|?*";
    for (size_t i = 0; i < len; i++) {
        if (strchr(dangerous, path[i]) != NULL) {
            return 0;  // Dangerous character
        }
        // Prevent directory traversal
        if (i <= len - 3 && strncmp(path + i, "../", 3) == 0) {
            return 0;  // Directory traversal attempt
        }
    }

    // Copy to sanitized buffer
    strcpy(sanitized, path);

    return 1;
}

// Safe file opening
FILE* safe_fopen(const char *filename, const char *mode) {
    char sanitized_path[MAX_PATH];

    if (!validate_file_path(filename, sanitized_path, sizeof(sanitized_path))) {
        fprintf(stderr, "Invalid file path: %s\\n", filename);
        return NULL;
    }

    // Additional validation for mode
    if (strcmp(mode, "r") != 0 && strcmp(mode, "w") != 0 &&
        strcmp(mode, "a") != 0 && strcmp(mode, "r+") != 0 &&
        strcmp(mode, "w+") != 0 && strcmp(mode, "a+") != 0) {
        fprintf(stderr, "Invalid file mode: %s\\n", mode);
        return NULL;
    }

    return fopen(sanitized_path, mode);
}

int main(void) {
    char filename[MAX_PATH];

    printf("Enter filename to open: ");
    if (fgets(filename, sizeof(filename), stdin) == NULL) {
        return 1;
    }

    // Remove newline
    size_t len = strlen(filename);
    if (len > 0 && filename[len - 1] == '\\n') {
        filename[len - 1] = '\\0';
    }

    FILE *file = safe_fopen(filename, "r");
    if (file) {
        printf("File opened successfully\\n");
        fclose(file);
    } else {
        printf("Failed to open file\\n");
    }

    return 0;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Always validate string inputs** - Never trust user data
2. **Use bounds-checked functions** - \`strncpy\`, \`snprintf\`, etc.
3. **Ensure null termination** - Every string must end with \`\\0\`
4. **Check buffer sizes** before operations
5. **Handle encoding properly** - Be aware of character sets
6. **Validate file paths** - Prevent directory traversal attacks
7. **Use safe memory management** - Avoid leaks and corruption
8. **Test edge cases** - Empty strings, very long strings, special characters

String safety is fundamental to secure C programming - always prioritize safety over convenience! 🛡️✨`;
    return contentString;
  })()
};
