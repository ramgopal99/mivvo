import { SubLesson } from '../../../data/lessonsData';

export const topic_5_5: SubLesson = {
  id: 5.5,
  title: 'Introduction to Strings',
  status: 'completed',
  content: `# 📝 Introduction to Strings

Learn the fundamentals of strings in C - how they're stored, manipulated, and processed as character arrays.

---

## 🔤 What are Strings?

**Strings in C are arrays of characters terminated by a null character ('\\0').**

### Character Array Representation

\`\`\`c
#include <stdio.h>

int main() {
    // Method 1: Character array with manual null terminator
    char str1[6] = {'H', 'e', 'l', 'l', 'o', '\\0'};

    // Method 2: String literal (automatic null terminator)
    char str2[] = "Hello";

    // Method 3: Pointer to string literal
    char* str3 = "Hello";

    printf("str1: %s\\n", str1);
    printf("str2: %s\\n", str2);
    printf("str3: %s\\n", str3);

    // Show memory layout
    printf("str1 memory: ");
    for (int i = 0; i < 6; i++) {
        if (str1[i] == '\\0') {
            printf("\\\\0 ");
        } else {
            printf("%c ", str1[i]);
        }
    }
    printf("\\n");

    return 0;
}
\`\`\`

**Output:**
\`\`\`
str1: Hello
str2: Hello
str3: Hello
str1 memory: H e l l o \0
\`\`\`

---

## 🏗️ String Storage and Null Termination

### Null Terminator Importance

\`\`\`c
#include <stdio.h>

int main() {
    char with_null[6] = {'H', 'e', 'l', 'l', 'o', '\\0'};
    char without_null[5] = {'H', 'e', 'l', 'l', 'o'};  // No null terminator!

    printf("With null terminator: %s\\n", with_null);
    printf("Without null terminator: %s\\n", without_null);  // Undefined behavior!

    // Manual null termination
    without_null[5] = '\\0';  // Add null terminator
    printf("After adding null: %s\\n", without_null);

    return 0;
}
\`\`\`

### String Length vs Array Size

\`\`\`c
#include <stdio.h>

int main() {
    char str[20] = "Hello";  // Array size: 20, string length: 5

    printf("String: %s\\n", str);
    printf("Array size: %zu\\n", sizeof(str));  // 20 bytes
    printf("String length: %zu\\n", strlen(str));  // 5 characters

    // Memory layout
    printf("Memory: ");
    for (int i = 0; i < sizeof(str); i++) {
        if (str[i] == '\\0') {
            printf("\\\\0 ");
        } else if (str[i] == '\\0' && i > 5) {
            printf("[ ] ");  // Uninitialized memory
        } else {
            printf("%c ", str[i]);
        }
    }
    printf("\\n");

    return 0;
}
\`\`\`

---

## 📝 String Literals

### String Constants

\`\`\`c
#include <stdio.h>

int main() {
    // String literals are stored in read-only memory
    char* greeting = "Hello, World!";
    const char* message = "This is a constant string";

    printf("%s\\n", greeting);
    printf("%s\\n", message);

    // String literals can be used directly
    printf("Direct literal: %s\\n", "No variable needed!");

    // Multiple string literals are concatenated
    printf("This is " "a multi-line " "string literal.\\n");

    return 0;
}
\`\`\`

### Multi-line String Literals

\`\`\`c
#include <stdio.h>

int main() {
    // Multi-line strings using concatenation
    char* poem = "Roses are red,\\n"
                 "Violets are blue,\\n"
                 "C strings are fun,\\n"
                 "And so are you!";

    printf("Poem:\\n%s\\n", poem);

    // Or using arrays
    char story[] = "Once upon a time, "
                   "there was a programmer "
                   "who loved C strings. "
                   "The end.";

    printf("\\nStory: %s\\n", story);

    return 0;
}
\`\`\`

---

## 🔄 String Input and Output

### Reading Strings

\`\`\`c
#include <stdio.h>

int main() {
    char name[50];
    char sentence[100];

    // Method 1: scanf (stops at whitespace)
    printf("Enter your name: ");
    scanf("%s", name);
    printf("Hello, %s!\\n\\n", name);

    // Method 2: fgets (reads entire line including spaces)
    printf("Enter a sentence: ");
    getchar();  // Consume leftover newline from scanf
    fgets(sentence, sizeof(sentence), stdin);

    // Remove trailing newline if present
    size_t len = strlen(sentence);
    if (len > 0 && sentence[len - 1] == '\\n') {
        sentence[len - 1] = '\\0';
    }

    printf("You said: %s\\n", sentence);

    return 0;
}
\`\`\`

### Output Formatting

\`\`\`c
#include <stdio.h>

int main() {
    char str[] = "Hello";

    // Basic output
    printf("String: %s\\n", str);

    // Field width
    printf("Right aligned: |%10s|\\n", str);
    printf("Left aligned: |%-10s|\\n", str);

    // Precision (limits output length)
    printf("Limited: %.3s\\n", str);

    // Multiple strings
    char first[] = "Hello";
    char second[] = "World";

    printf("%s %s!\\n", first, second);

    return 0;
}
\`\`\`

---

## 🔍 Character Access and Traversal

### Individual Character Access

\`\`\`c
#include <stdio.h>

int main() {
    char text[] = "Hello, World!";

    // Access individual characters
    printf("First character: %c\\n", text[0]);
    printf("Last character: %c\\n", text[strlen(text) - 1]);

    // Modify characters
    text[0] = 'h';  // Change 'H' to 'h'
    printf("Modified: %s\\n", text);

    // Character-by-character traversal
    printf("Characters: ");
    for (size_t i = 0; i < strlen(text); i++) {
        printf("'%c' ", text[i]);
    }
    printf("\\n");

    return 0;
}
\`\`\`

### Finding Characters

\`\`\`c
#include <stdio.h>

int main() {
    char text[] = "Hello, World!";
    char target = 'o';

    printf("String: %s\\n", text);
    printf("Finding character '%c':\\n", target);

    // Find all occurrences
    for (size_t i = 0; i < strlen(text); i++) {
        if (text[i] == target) {
            printf("Found at index %zu\\n", i);
        }
    }

    // Find first occurrence
    char* first_occurrence = strchr(text, target);
    if (first_occurrence != NULL) {
        printf("First occurrence at index %ld\\n", first_occurrence - text);
    }

    return 0;
}
\`\`\`

---

## 🔧 Basic String Operations

### String Length

\`\`\`c
#include <stdio.h>
#include <string.h>  // For strlen

int main() {
    char str1[] = "Hello";
    char str2[] = "Hello, World!";
    char str3[] = "";  // Empty string

    printf("Length of '%s': %zu\\n", str1, strlen(str1));
    printf("Length of '%s': %zu\\n", str2, strlen(str2));
    printf("Length of '%s': %zu\\n", str3, strlen(str3));

    // Manual length calculation
    size_t manual_len = 0;
    while (str1[manual_len] != '\\0') {
        manual_len++;
    }
    printf("Manual length of '%s': %zu\\n", str1, manual_len);

    return 0;
}
\`\`\`

### String Copying

\`\`\`c
#include <stdio.h>
#include <string.h>

int main() {
    char source[] = "Hello, World!";
    char destination[50];

    // Method 1: strcpy (from string.h)
    strcpy(destination, source);
    printf("Copied: %s\\n", destination);

    // Method 2: Manual copying
    char manual_copy[50];
    int i = 0;
    while (source[i] != '\\0') {
        manual_copy[i] = source[i];
        i++;
    }
    manual_copy[i] = '\\0';  // Don't forget null terminator!

    printf("Manual copy: %s\\n", manual_copy);

    // Method 3: Limited copying (safer)
    char limited[10];
    strncpy(limited, source, sizeof(limited) - 1);
    limited[sizeof(limited) - 1] = '\\0';  // Ensure null termination
    printf("Limited copy: %s\\n", limited);

    return 0;
}
\`\`\`

---

## ⚠️ String Pitfalls and Safety

### Buffer Overflow

\`\`\`c
#include <stdio.h>

int main() {
    char small_buffer[10];

    printf("Enter text: ");
    scanf("%s", small_buffer);  // Dangerous! No bounds checking

    // If user enters more than 9 characters, buffer overflow occurs!
    printf("You entered: %s\\n", small_buffer);

    return 0;
}
\`\`\`

### Safe Input Methods

\`\`\`c
#include <stdio.h>

int main() {
    char buffer[50];

    // Method 1: Limit input with scanf
    printf("Enter text (max 49 chars): ");
    scanf("%49s", buffer);  // Limits to 49 chars + null
    printf("Safe input: %s\\n", buffer);

    // Method 2: Use fgets for line input
    printf("Enter a line: ");
    getchar();  // Consume leftover newline
    if (fgets(buffer, sizeof(buffer), stdin) != NULL) {
        // Remove trailing newline
        size_t len = strlen(buffer);
        if (len > 0 && buffer[len - 1] == '\\n') {
            buffer[len - 1] = '\\0';
        }
        printf("Line input: %s\\n", buffer);
    }

    return 0;
}
\`\`\`

### Null Terminator Issues

\`\`\`c
#include <stdio.h>
#include <string.h>

int main() {
    char str[10] = "Hello";

    // Problem: no null terminator after modification
    str[5] = '!';  // Overwrites null terminator!
    str[6] = '\\0'; // Must add null terminator

    printf("Modified: %s\\n", str);

    // Always ensure null termination
    char safe_str[10];
    strcpy(safe_str, "Hi");
    // strcpy automatically adds null terminator

    printf("Safe: %s\\n", safe_str);

    return 0;
}
\`\`\`

---

## 🔄 String Conversion

### Numbers to Strings

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int number = 42;
    double pi = 3.14159;
    char str[50];

    // Method 1: sprintf
    sprintf(str, "Number: %d", number);
    printf("%s\\n", str);

    sprintf(str, "Pi: %.2f", pi);
    printf("%s\\n", str);

    // Method 2: itoa (non-standard, but common)
    // itoa(number, str, 10);  // Convert to decimal string

    return 0;
}
\`\`\`

### Strings to Numbers

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main() {
    char num_str[] = "123";
    char float_str[] = "3.14";

    // String to integer
    int number = atoi(num_str);
    printf("String '%s' to int: %d\\n", num_str, number);

    // String to long
    long big_num = atol("123456789");
    printf("String to long: %ld\\n", big_num);

    // String to double
    double pi = atof(float_str);
    printf("String '%s' to double: %.2f\\n", float_str, pi);

    return 0;
}
\`\`\`

---

## 🧪 String Comparison

### Basic Comparison

\`\`\`c
#include <stdio.h>
#include <string.h>

int main() {
    char str1[] = "Hello";
    char str2[] = "Hello";
    char str3[] = "World";
    char str4[] = "hello";  // Different case

    // Using strcmp
    printf("str1 vs str2: %d\\n", strcmp(str1, str2));  // 0 (equal)
    printf("str1 vs str3: %d\\n", strcmp(str1, str3));  // Negative (str1 < str3)
    printf("str1 vs str4: %d\\n", strcmp(str1, str4));  // Negative (case sensitive)

    // Using strncmp (compare first n characters)
    printf("First 3 chars of str1 vs str4: %d\\n", strncmp(str1, str4, 3));

    return 0;
}
\`\`\`

### Case-Insensitive Comparison

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

// Case-insensitive comparison
int strcmp_ignore_case(const char* s1, const char* s2) {
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
    printf("Case-insensitive: %d\\n", strcmp_ignore_case(str1, str2));

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Strings are null-terminated character arrays**
2. **String literals** automatically include null terminators
3. **Always ensure null termination** when manipulating strings
4. **Buffer overflow** is a major security risk with strings
5. **Use safe input functions** like \`fgets\` instead of \`gets\`
6. **String functions** from \`string.h\` provide safe operations
7. **String comparison** returns 0 for equal, non-zero for different

---

## 🚀 Preview: String Functions

In the next topic, you'll learn about:
- **Standard string library functions** (\`strcpy\`, \`strcat\`, \`strcmp\`, etc.)
- **String searching and manipulation**
- **Memory functions** for string operations
- **Safe string handling** techniques

**String fundamentals provide the foundation - library functions add powerful capabilities!** 🛠️
