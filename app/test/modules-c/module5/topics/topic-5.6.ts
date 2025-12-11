import { SubLesson } from '../../../data/lessonsData';

export const topic_5_6: SubLesson = {
  id: 5.6,
  title: 'String Functions',
  status: 'completed',
  content: `# 🛠️ String Functions

Master the essential string manipulation functions from the C standard library for safe and efficient string operations.

---

## 📚 String Header File

**Include `<string.h>` to access string functions:**

\`\`\`c
#include <string.h>
\`\`\`

---

## 📏 Length Functions

### strlen() - String Length

\`\`\`c
#include <stdio.h>
#include <string.h>

int main() {
    char str1[] = "Hello";
    char str2[] = "Hello, World!";
    char empty[] = "";

    printf("Length of '%s': %zu\\n", str1, strlen(str1));        // 5
    printf("Length of '%s': %zu\\n", str2, strlen(str2));        // 13
    printf("Length of '%s': %zu\\n", empty, strlen(empty));      // 0

    // strlen stops at null terminator
    char with_null[20] = "Hello";
    printf("Length of '%s': %zu\\n", with_null, strlen(with_null));  // 5 (ignores garbage after \\0)

    return 0;
}
\`\`\`

---

## 🔄 Copy Functions

### strcpy() - String Copy

\`\`\`c
#include <stdio.h>
#include <string.h>

int main() {
    char source[] = "Hello, World!";
    char destination[50];

    // Copy entire string
    strcpy(destination, source);
    printf("Copied: %s\\n", destination);

    // Copy with size limit (safer)
    char limited[10];
    strncpy(limited, source, sizeof(limited) - 1);
    limited[sizeof(limited) - 1] = '\\0';  // Ensure null termination
    printf("Limited copy: %s\\n", limited);

    return 0;
}
\`\`\`

### strdup() - Duplicate String

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main() {
    char original[] = "Hello, World!";
    char* duplicate;

    // Create a duplicate (dynamically allocated)
    duplicate = strdup(original);

    if (duplicate != NULL) {
        printf("Original: %s\\n", original);
        printf("Duplicate: %s\\n", duplicate);

        // Modify duplicate
        duplicate[0] = 'h';
        printf("After modification:\\n");
        printf("Original: %s\\n", original);
        printf("Duplicate: %s\\n", duplicate);

        free(duplicate);  // Don't forget to free!
    }

    return 0;
}
\`\`\`

---

## 🔗 Concatenation Functions

### strcat() - String Concatenation

\`\`\`c
#include <stdio.h>
#include <string.h>

int main() {
    char str1[50] = "Hello";
    char str2[] = " World!";
    char str3[] = " Welcome to C!";

    printf("Before: %s\\n", str1);

    // Append str2 to str1
    strcat(str1, str2);
    printf("After appending '%s': %s\\n", str2, str1);

    // Append str3 to str1 (limited to avoid overflow)
    strncat(str1, str3, sizeof(str1) - strlen(str1) - 1);
    printf("After appending '%s': %s\\n", str3, str1);

    return 0;
}
\`\`\`

### Custom String Building

\`\`\`c
#include <stdio.h>
#include <string.h>

void build_greeting(char* buffer, size_t size, const char* name, const char* time_of_day) {
    // Safe string building
    strncpy(buffer, "Good ", size - 1);
    strncat(buffer, time_of_day, size - strlen(buffer) - 1);
    strncat(buffer, ", ", size - strlen(buffer) - 1);
    strncat(buffer, name, size - strlen(buffer) - 1);
    strncat(buffer, "!", size - strlen(buffer) - 1);
}

int main() {
    char greeting[100];

    build_greeting(greeting, sizeof(greeting), "Alice", "morning");
    printf("%s\\n", greeting);

    build_greeting(greeting, sizeof(greeting), "Bob", "evening");
    printf("%s\\n", greeting);

    return 0;
}
\`\`\`

---

## 🔍 Comparison Functions

### strcmp() - String Comparison

\`\`\`c
#include <stdio.h>
#include <string.h>

int main() {
    char str1[] = "Hello";
    char str2[] = "Hello";
    char str3[] = "World";
    char str4[] = "hello";  // Different case

    // Compare strings
    printf("str1 vs str2: %d\\n", strcmp(str1, str2));  // 0 (equal)
    printf("str1 vs str3: %d\\n", strcmp(str1, str3));  // Negative (str1 < str3)
    printf("str1 vs str4: %d\\n", strcmp(str1, str4));  // Positive (case sensitive)

    // Practical usage
    char password[] = "secret";
    char input[50];

    printf("Enter password: ");
    scanf("%s", input);

    if (strcmp(password, input) == 0) {
        printf("Access granted!\\n");
    } else {
        printf("Access denied!\\n");
    }

    return 0;
}
\`\`\`

### strncmp() - Limited Comparison

\`\`\`c
#include <stdio.h>
#include <string.h>

int main() {
    char str1[] = "Hello, World!";
    char str2[] = "Hello, Universe!";

    // Compare first 5 characters only
    printf("First 5 chars: %d\\n", strncmp(str1, str2, 5));  // 0 (equal)

    // Compare first 7 characters
    printf("First 7 chars: %d\\n", strncmp(str1, str2, 7));  // Negative ("W" < "U")

    // Useful for version comparison
    char version1[] = "1.2.3-alpha";
    char version2[] = "1.2.3-beta";

    if (strncmp(version1, version2, 5) == 0) {
        printf("Same major.minor.patch version\\n");
    }

    return 0;
}
\`\`\`

### Case-Insensitive Comparison

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

// Case-insensitive comparison
int stricmp(const char* s1, const char* s2) {
    while (*s1 && *s2) {
        char c1 = tolower(*s1);
        char c2 = tolower(*s2);

        if (c1 != c2) {
            return c1 - c2;
        }

        s1++;
        s2++;
    }

    return tolower(*s1) - tolower(*s2);
}

int main() {
    char str1[] = "Hello";
    char str2[] = "HELLO";

    printf("Case-sensitive: %d\\n", strcmp(str1, str2));
    printf("Case-insensitive: %d\\n", stricmp(str1, str2));

    return 0;
}
\`\`\`

---

## 🔎 Search Functions

### strchr() - Find Character

\`\`\`c
#include <stdio.h>
#include <string.h>

int main() {
    char text[] = "Hello, World!";
    char target = 'o';

    // Find first occurrence
    char* first = strchr(text, target);
    if (first != NULL) {
        printf("First '%c' found at position: %ld\\n", target, first - text);
    }

    // Find all occurrences
    char* current = text;
    int count = 0;
    while ((current = strchr(current, target)) != NULL) {
        printf("'%c' at position: %ld\\n", target, current - text);
        current++;  // Move past current find
        count++;
    }
    printf("Total occurrences: %d\\n", count);

    return 0;
}
\`\`\`

### strstr() - Find Substring

\`\`\`c
#include <stdio.h>
#include <string.h>

int main() {
    char text[] = "The quick brown fox jumps over the lazy dog";
    char word1[] = "fox";
    char word2[] = "cat";

    // Find substring
    char* found1 = strstr(text, word1);
    char* found2 = strstr(text, word2);

    if (found1 != NULL) {
        printf("'%s' found at position: %ld\\n", word1, found1 - text);
    } else {
        printf("'%s' not found\\n", word1);
    }

    if (found2 != NULL) {
        printf("'%s' found at position: %ld\\n", word2, found2 - text);
    } else {
        printf("'%s' not found\\n", word2);
    }

    return 0;
}
\`\`\`

---

## ✂️ Tokenization Functions

### strtok() - String Tokenization

\`\`\`c
#include <stdio.h>
#include <string.h>

int main() {
    char sentence[] = "Hello, world! How are you today?";
    char* token;

    printf("Original: %s\\n", sentence);
    printf("Tokens:\\n");

    // First call to strtok
    token = strtok(sentence, " ,.!?");

    // Subsequent calls with NULL
    while (token != NULL) {
        printf("'%s'\\n", token);
        token = strtok(NULL, " ,.!?");
    }

    return 0;
}
\`\`\`

### Advanced Tokenization

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

char** split_string(const char* str, const char* delimiters, int* count) {
    char* str_copy = strdup(str);  // Make a copy we can modify
    char** tokens = NULL;
    *count = 0;

    char* token = strtok(str_copy, delimiters);
    while (token != NULL) {
        tokens = realloc(tokens, (*count + 1) * sizeof(char*));
        tokens[*count] = strdup(token);
        (*count)++;
        token = strtok(NULL, delimiters);
    }

    free(str_copy);
    return tokens;
}

int main() {
    char csv[] = "Alice,25,Engineer\\nBob,30,Designer\\nCharlie,35,Manager";
    int token_count;
    char** tokens = split_string(csv, ",\\n", &token_count);

    printf("CSV tokens:\\n");
    for (int i = 0; i < token_count; i++) {
        printf("%d: %s\\n", i + 1, tokens[i]);
        free(tokens[i]);
    }
    free(tokens);

    return 0;
}
\`\`\`

---

## 🔧 Memory Functions

### memset() - Set Memory

\`\`\`c
#include <stdio.h>
#include <string.h>

int main() {
    char buffer[20];

    // Set all bytes to 'A'
    memset(buffer, 'A', sizeof(buffer) - 1);
    buffer[sizeof(buffer) - 1] = '\\0';

    printf("Buffer: %s\\n", buffer);

    // Clear buffer
    memset(buffer, 0, sizeof(buffer));
    printf("Cleared buffer length: %zu\\n", strlen(buffer));

    return 0;
}
\`\`\`

### memcpy() - Copy Memory

\`\`\`c
#include <stdio.h>
#include <string.h>

int main() {
    char source[] = "Hello, World!";
    char destination[20];

    // Copy memory (faster than strcpy for known sizes)
    memcpy(destination, source, strlen(source) + 1);  // +1 for null terminator

    printf("Source: %s\\n", source);
    printf("Destination: %s\\n", destination);

    // Copy part of array
    int numbers[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int subset[5];

    memcpy(subset, &numbers[2], 5 * sizeof(int));

    printf("Subset: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", subset[i]);
    }
    printf("\\n");

    return 0;
}
\`\`\`

---

## 🛡️ Safe String Functions

### Bounds-Checked Functions

\`\`\`c
#include <stdio.h>
#include <string.h>

int main() {
    char source[] = "This is a very long string that might cause buffer overflow";
    char destination[20];

    // Safe copy with bounds checking
    strncpy(destination, source, sizeof(destination) - 1);
    destination[sizeof(destination) - 1] = '\\0';

    printf("Safe copy: %s\\n", destination);
    printf("Length: %zu\\n", strlen(destination));

    // Safe concatenation
    char buffer[50] = "Hello";
    strncat(buffer, " World!", sizeof(buffer) - strlen(buffer) - 1);

    printf("Concatenated: %s\\n", buffer);

    return 0;
}
\`\`\`

### Custom Safe Functions

\`\`\`c
#include <stdio.h>
#include <string.h>

// Safe string copy with guaranteed null termination
char* safe_strcpy(char* dest, const char* src, size_t dest_size) {
    if (dest_size == 0) return dest;

    // Leave space for null terminator
    size_t copy_size = dest_size - 1;

    // Copy at most copy_size characters
    size_t i;
    for (i = 0; i < copy_size && src[i] != '\\0'; i++) {
        dest[i] = src[i];
    }

    // Null terminate
    dest[i] = '\\0';

    return dest;
}

// Safe string concatenation
char* safe_strcat(char* dest, const char* src, size_t dest_size) {
    size_t dest_len = strlen(dest);
    size_t remaining = dest_size - dest_len - 1;  // Space for null terminator

    if (remaining == 0) return dest;

    strncat(dest, src, remaining);
    return dest;
}

int main() {
    char buffer[10];

    safe_strcpy(buffer, "Hello", sizeof(buffer));
    printf("After copy: '%s'\\n", buffer);

    safe_strcat(buffer, " World!", sizeof(buffer));
    printf("After concat: '%s'\\n", buffer);

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **String functions** from `<string.h>` provide safe string operations
2. **Always check bounds** to prevent buffer overflows
3. **Use `strncpy` and `strncat`** for safer string operations
4. **String comparison** returns 0 for equal strings
5. **strtok modifies the original string** - use carefully
6. **Memory functions** work with any data type, not just strings
7. **Custom safe functions** can prevent common string vulnerabilities

---

## 🚀 Preview: String Manipulation

In the next topic, you'll learn about:
- **Advanced string manipulation** techniques
- **String parsing and formatting**
- **Regular expressions** (if available)
- **String algorithms** and optimizations

**String functions provide the tools - manipulation techniques create the solutions!** 🎨
