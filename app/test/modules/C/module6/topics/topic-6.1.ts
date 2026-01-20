import { SubLesson } from '../../../../data/lessonsData';

export const topic_6_1: SubLesson = {
  id: "6.1",
  title: 'String Basics & Null Termination',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🔤 String Basics & Null Termination in C

Strings in C are arrays of characters terminated by a null character (\`\\0\`). Understanding how strings work is crucial for text processing and is a common source of bugs for beginners.

---

## 📋 What is a String in C?

**A string in C is an array of characters ending with a null terminator (\`\\0\`)**. Unlike other languages, C doesn't have a built-in string type - strings are just character arrays with a special ending marker.

### **Key Characteristics**

- **Character array** - stored as consecutive bytes in memory
- **Null-terminated** - ends with \`\\0\` (ASCII 0)
- **Variable length** - determined by position of null terminator
- **No bounds checking** - programmer responsibility

---

## 📝 String Declaration and Initialization

### **Method 1: Character Array with Size**

\`\`\`c
#include <stdio.h>

int main(void) {
    // Declare a character array with size
    char greeting[20];

    // Initialize with string literal
    char message[50] = "Hello, World!";

    // Partially initialize (rest are null)
    char name[10] = "Alice";

    printf("Message: %s\\n", message);
    printf("Name: %s\\n", name);

    // Show individual characters
    printf("First char of message: %c\\n", message[0]);
    printf("Last char before null: %c\\n", message[12]);

    return 0;
}
\`\`\`

### **Method 2: Size Determined by Compiler**

\`\`\`c
#include <stdio.h>

int main(void) {
    // Compiler determines size (including null terminator)
    char text[] = "This is a string";

    // Size includes space for null terminator
    printf("Text: %s\\n", text);
    printf("Size of array: %zu bytes\\n", sizeof(text));
    printf("String length: %zu characters\\n", strlen(text));

    return 0;
}
\`\`\`

### **Method 3: Pointer to String Literal**

\`\`\`c
#include <stdio.h>

int main(void) {
    // Pointer to string literal (read-only)
    char *str_ptr = "Hello from pointer";

    printf("String: %s\\n", str_ptr);
    printf("First character: %c\\n", str_ptr[0]);

    // This would be dangerous - string literals are read-only
    // str_ptr[0] = 'h';  // DON'T DO THIS!

    return 0;
}
\`\`\`

---

## 🔚 Null Termination

### **The Null Terminator (\`\\0\`)**

\`\`\`c
#include <stdio.h>

int main(void) {
    // Manual null termination
    char manual[10];
    manual[0] = 'H';
    manual[1] = 'i';
    manual[2] = '!';
    manual[3] = '\\0';  // Null terminator

    // Automatic null termination with string literal
    char automatic[] = "Hi!";  // Compiler adds \\0

    printf("Manual: %s\\n", manual);
    printf("Automatic: %s\\n", automatic);

    // Show ASCII values
    printf("Last char of manual: ASCII %d\\n", (int)manual[3]);
    printf("Last char of automatic: ASCII %d\\n", (int)automatic[3]);

    return 0;
}
\`\`\`

### **Why Null Termination Matters**

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char broken[10] = {'H', 'e', 'l', 'l', 'o'};  // No null terminator!

    printf("Broken string: %s\\n", broken);  // Undefined behavior!

    // Fix it
    broken[5] = '\\0';  // Add null terminator
    printf("Fixed string: %s\\n", broken);

    return 0;
}
\`\`\`

---

## 📏 String Length vs Array Size

### **Understanding the Difference**

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char buffer[100] = "Hello";

    printf("Array size: %zu bytes\\n", sizeof(buffer));
    printf("String length: %zu characters\\n", strlen(buffer));

    // Fill more of the buffer
    strcpy(buffer, "This is a longer string");
    printf("\\nAfter strcpy:\\n");
    printf("Array size: %zu bytes\\n", sizeof(buffer));
    printf("String length: %zu characters\\n", strlen(buffer));

    return 0;
}
\`\`\`

---

## 🔍 Memory Layout of Strings

### **Visualizing String Storage**

\`\`\`c
#include <stdio.h>

void print_string_memory(const char *str) {
    printf("String: %s\\n", str);
    printf("Memory layout:\\n");

    for (int i = 0; ; i++) {
        printf("Index %d: '%c' (ASCII %d)\\n", i, str[i], (int)str[i]);
        if (str[i] == '\\0') break;
    }
    printf("\\n");
}

int main(void) {
    char example[] = "Hi!";
    char *ptr_str = "Hello";

    printf("Character array:\\n");
    print_string_memory(example);

    printf("String literal pointer:\\n");
    print_string_memory(ptr_str);

    return 0;
}
\`\`\`

---

## 🚫 Common String Mistakes

### **Mistake 1: Buffer Overflow**

\`\`\`c
#include <stdio.h>

int main(void) {
    char small_buffer[5];

    // This is dangerous - no bounds checking!
    // strcpy(small_buffer, "This string is too long for the buffer");

    // Safe alternative with bounds checking
    char safe_buffer[20];
    strcpy(safe_buffer, "Short string");  // OK
    printf("Safe: %s\\n", safe_buffer);

    return 0;
}
\`\`\`

### **Mistake 2: Missing Null Terminator**

\`\`\`c
#include <stdio.h>

int main(void) {
    char buffer[10];

    // Manual character assignment
    buffer[0] = 'A';
    buffer[1] = 'B';
    buffer[2] = 'C';
    // Forgot to add null terminator!

    // printf("%s\\n", buffer);  // Dangerous!

    // Fix: Add null terminator
    buffer[3] = '\\0';
    printf("Fixed: %s\\n", buffer);

    return 0;
}
\`\`\`

### **Mistake 3: String Literal Modification**

\`\`\`c
#include <stdio.h>

int main(void) {
    char *str = "Hello";

    // String literals are read-only!
    // str[0] = 'h';  // CRASH or undefined behavior!

    // Safe way: Use modifiable array
    char modifiable[] = "Hello";
    modifiable[0] = 'h';  // OK
    printf("Modified: %s\\n", modifiable);

    return 0;
}
\`\`\`

---

## 🔄 String Copying and Assignment

### **Proper String Copying**

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char source[] = "Original text";
    char destination[50];

    // Method 1: strcpy (copy until null terminator)
    strcpy(destination, source);
    printf("Copied: %s\\n", destination);

    // Method 2: strncpy (copy limited characters)
    char limited[10];
    strncpy(limited, "This is a very long string", sizeof(limited) - 1);
    limited[sizeof(limited) - 1] = '\\0';  // Ensure null termination
    printf("Limited copy: %s\\n", limited);

    // Array assignment doesn't work for strings
    // destination = source;  // ERROR!

    return 0;
}
\`\`\`

---

## 🎯 Practical Examples

### **Example 1: String Analysis**

\`\`\`c
#include <stdio.h>

void analyze_string(const char *str) {
    int length = 0;
    int vowels = 0;
    int consonants = 0;
    int digits = 0;
    int spaces = 0;

    for (int i = 0; str[i] != '\\0'; i++) {
        length++;
        char c = str[i];

        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' ||
            c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U') {
            vowels++;
        } else if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
            consonants++;
        } else if (c >= '0' && c <= '9') {
            digits++;
        } else if (c == ' ') {
            spaces++;
        }
    }

    printf("String: %s\\n", str);
    printf("Length: %d\\n", length);
    printf("Vowels: %d\\n", vowels);
    printf("Consonants: %d\\n", consonants);
    printf("Digits: %d\\n", digits);
    printf("Spaces: %d\\n", spaces);
}

int main(void) {
    analyze_string("Hello World 123!");
    return 0;
}
\`\`\`

### **Example 2: String Building**

\`\`\`c
#include <stdio.h>
#include <string.h>

void build_greeting(char *buffer, size_t size, const char *name, const char *time_of_day) {
    // Safe string building with bounds checking
    int written = snprintf(buffer, size, "Good %s, %s!", time_of_day, name);

    if (written >= size) {
        printf("Warning: String was truncated\\n");
    }
}

int main(void) {
    char greeting[50];

    build_greeting(greeting, sizeof(greeting), "Alice", "morning");
    printf("%s\\n", greeting);

    build_greeting(greeting, sizeof(greeting), "Very Long Name That Might Cause Issues", "afternoon");
    printf("%s\\n", greeting);

    return 0;
}
\`\`\`

### **Example 3: Character Frequency Counter**

\`\`\`c
#include <stdio.h>
#include <string.h>

void count_characters(const char *str) {
    int frequency[256] = {0};  // ASCII character frequencies

    // Count each character
    for (int i = 0; str[i] != '\\0'; i++) {
        frequency[(unsigned char)str[i]]++;
    }

    // Display frequencies for printable characters
    printf("Character frequencies in: %s\\n", str);
    for (int i = 32; i < 127; i++) {  // Printable ASCII range
        if (frequency[i] > 0) {
            printf("'%c': %d\\n", i, frequency[i]);
        }
    }
}

int main(void) {
    count_characters("Hello, World!");
    return 0;
}
\`\`\`

---

## 🔧 String Constants and Literals

### **String Literal Storage**

\`\`\`c
#include <stdio.h>

int main(void) {
    // Multiple pointers can point to same string literal
    char *str1 = "Hello";
    char *str2 = "Hello";

    printf("str1: %p\\n", (void*)str1);
    printf("str2: %p\\n", (void*)str2);
    printf("Same address? %s\\n", str1 == str2 ? "Yes" : "No");

    // But arrays create separate copies
    char arr1[] = "Hello";
    char arr2[] = "Hello";

    printf("arr1: %p\\n", (void*)arr1);
    printf("arr2: %p\\n", (void*)arr2);
    printf("Same address? %s\\n", arr1 == arr2 ? "Yes" : "No");

    return 0;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Strings are null-terminated character arrays** - end with \`\\0\`
2. **Array size ≠ string length** - array includes space for \`\\0\`
3. **String literals are read-only** - stored in read-only memory
4. **Always ensure null termination** - manual strings need explicit \`\\0\`
5. **Bounds checking is your responsibility** - C doesn't prevent overflows
6. **Use library functions safely** - \`strncpy\` instead of \`strcpy\` when possible
7. **String length** is determined by \`strlen()\`, array size by \`sizeof()\`

Mastering string basics prevents countless bugs and security issues! 🔤✨`;
    return contentString;
  })()
};
