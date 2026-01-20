import { SubLesson } from '../../../../data/lessonsData';

export const topic_6_3: SubLesson = {
  id: "6.3",
  title: 'String Manipulation Functions',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🔧 String Manipulation Functions in C

C provides a rich set of functions for manipulating strings. These functions are declared in \`<string.h>\` and include copying, concatenation, searching, and more.

---

## 📋 Essential String Functions

### **strlen() - String Length**

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char str[] = "Hello, World!";
    size_t length = strlen(str);

    printf("String: %s\\n", str);
    printf("Length: %zu characters\\n", length);
    printf("Array size: %zu bytes\\n", sizeof(str));

    return 0;
}
\`\`\`

**Note:** \`strlen()\` counts characters until null terminator, \`sizeof()\` gives total array size.

---

### **strcpy() & strncpy() - String Copy**

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char source[] = "Original text";
    char destination[50];

    // strcpy - copy entire string
    strcpy(destination, source);
    printf("Copied: %s\\n", destination);

    // strncpy - copy limited characters
    char limited[10];
    strncpy(limited, "This is a very long string", sizeof(limited) - 1);
    limited[sizeof(limited) - 1] = '\\0';  // Ensure null termination
    printf("Limited copy: %s\\n", limited);

    return 0;
}
\`\`\`

**Safety Note:** \`strncpy()\` doesn't guarantee null termination if the limit is reached.

---

### **strcat() & strncat() - String Concatenation**

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char result[100] = "Hello";

    // strcat - append entire string
    strcat(result, " World");
    printf("After strcat: %s\\n", result);

    // strncat - append limited characters
    strncat(result, " This is a very long string", 10);
    printf("After strncat: %s\\n", result);

    return 0;
}
\`\`\`

**Important:** Destination must have enough space for both strings plus null terminator.

---

## 🔍 String Comparison Functions

### **strcmp() & strncmp() - String Comparison**

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char str1[] = "apple";
    char str2[] = "banana";
    char str3[] = "apple";

    // strcmp returns: negative (<), zero (=), positive (>)
    int result1 = strcmp(str1, str2);  // "apple" < "banana"
    int result2 = strcmp(str1, str3);  // "apple" == "apple"
    int result3 = strcmp(str2, str1);  // "banana" > "apple"

    printf("strcmp('%s', '%s') = %d\\n", str1, str2, result1);
    printf("strcmp('%s', '%s') = %d\\n", str1, str3, result2);
    printf("strcmp('%s', '%s') = %d\\n", str2, str1, result3);

    // strncmp - compare first n characters
    int partial = strncmp("hello", "help", 3);  // Compare "hel" vs "hel"
    printf("strncmp('hello', 'help', 3) = %d\\n", partial);

    return 0;
}
\`\`\`

---

### **Case-Insensitive Comparison**

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

// Custom case-insensitive comparison
int strcmp_ignore_case(const char *s1, const char *s2) {
    while (*s1 && *s2) {
        int diff = tolower(*s1) - tolower(*s2);
        if (diff != 0) return diff;
        s1++;
        s2++;
    }
    return tolower(*s1) - tolower(*s2);
}

int main(void) {
    char str1[] = "Hello";
    char str2[] = "HELLO";

    int case_sensitive = strcmp(str1, str2);
    int case_insensitive = strcmp_ignore_case(str1, str2);

    printf("Case sensitive: strcmp('%s', '%s') = %d\\n", str1, str2, case_sensitive);
    printf("Case insensitive: %d\\n", case_insensitive);

    return 0;
}
\`\`\`

---

## 🔎 String Search Functions

### **strchr() & strrchr() - Find Character**

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char text[] = "Hello, World!";

    // strchr - find first occurrence
    char *first_o = strchr(text, 'o');
    if (first_o) {
        printf("First 'o' found at position: %ld\\n", first_o - text);
    }

    // strrchr - find last occurrence
    char *last_o = strrchr(text, 'o');
    if (last_o) {
        printf("Last 'o' found at position: %ld\\n", last_o - text);
    }

    // Find character that doesn't exist
    char *not_found = strchr(text, 'z');
    if (not_found == NULL) {
        printf("'z' not found in string\\n");
    }

    return 0;
}
\`\`\`

---

### **strstr() - Find Substring**

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char text[] = "The quick brown fox jumps over the lazy dog";

    // Find substring
    char *position = strstr(text, "fox");
    if (position) {
        printf("Found 'fox' at position: %ld\\n", position - text);
        printf("Context: %.20s\\n", position);
    }

    // Find all occurrences
    char *search = text;
    while ((search = strstr(search, "the")) != NULL) {
        printf("Found 'the' at position: %ld\\n", search - text);
        search++;  // Move past current find
    }

    return 0;
}
\`\`\`

---

## 🔄 String Tokenization

### **strtok() - Split String**

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char text[] = "apple,banana,cherry,grape";
    char *token;

    printf("Original string: %s\\n", text);
    printf("Tokens:\\n");

    // First call to strtok
    token = strtok(text, ",");
    while (token != NULL) {
        printf("  %s\\n", token);
        // Subsequent calls with NULL
        token = strtok(NULL, ",");
    }

    return 0;
}
\`\`\`

**Warning:** \`strtok()\` modifies the original string by replacing delimiters with null characters.

---

### **strtok() with Multiple Delimiters**

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char sentence[] = "Hello, world! How are you today?";

    printf("Original: %s\\n", sentence);
    printf("Words:\\n");

    // Tokenize on spaces, commas, and exclamation marks
    char *word = strtok(sentence, " ,!");
    while (word != NULL) {
        printf("  %s\\n", word);
        word = strtok(NULL, " ,!");
    }

    return 0;
}
\`\`\`

---

## 🔧 String Transformation Functions

### **strlwr() & strupr() - Case Conversion**

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

// Manual case conversion (strlwr/strupr not standard)
void to_uppercase(char *str) {
    for (int i = 0; str[i]; i++) {
        str[i] = toupper(str[i]);
    }
}

void to_lowercase(char *str) {
    for (int i = 0; str[i]; i++) {
        str[i] = tolower(str[i]);
    }
}

int main(void) {
    char text[] = "Hello, World!";

    printf("Original: %s\\n", text);

    to_uppercase(text);
    printf("Uppercase: %s\\n", text);

    to_lowercase(text);
    printf("Lowercase: %s\\n", text);

    return 0;
}
\`\`\`

---

### **strrev() - String Reversal**

\`\`\`c
#include <stdio.h>
#include <string.h>

// Manual string reversal (strrev not standard)
void reverse_string(char *str) {
    size_t len = strlen(str);
    for (size_t i = 0; i < len / 2; i++) {
        char temp = str[i];
        str[i] = str[len - 1 - i];
        str[len - 1 - i] = temp;
    }
}

int main(void) {
    char text[] = "Hello, World!";

    printf("Original: %s\\n", text);

    reverse_string(text);
    printf("Reversed: %s\\n", text);

    return 0;
}
\`\`\`

---

## 🎯 Practical Examples

### **Example 1: Text Analysis Program**

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

void analyze_text(const char *text) {
    int char_count = 0;
    int word_count = 0;
    int sentence_count = 0;
    int vowel_count = 0;
    int consonant_count = 0;

    // Count characters and words
    char_count = strlen(text);

    // Count words, sentences, vowels, consonants
    int in_word = 0;
    for (int i = 0; text[i]; i++) {
        char c = tolower(text[i]);

        // Word counting
        if (isspace(c) || ispunct(c)) {
            in_word = 0;
        } else if (!in_word) {
            in_word = 1;
            word_count++;
        }

        // Sentence counting
        if (c == '.' || c == '!' || c == '?') {
            sentence_count++;
        }

        // Vowel/consonant counting
        if (isalpha(c)) {
            if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
                vowel_count++;
            } else {
                consonant_count++;
            }
        }
    }

    printf("Text Analysis:\\n");
    printf("Characters: %d\\n", char_count);
    printf("Words: %d\\n", word_count);
    printf("Sentences: %d\\n", sentence_count);
    printf("Vowels: %d\\n", vowel_count);
    printf("Consonants: %d\\n", consonant_count);
}

int main(void) {
    char text[1000];

    printf("Enter text to analyze: ");
    fgets(text, sizeof(text), stdin);

    // Remove trailing newline
    size_t len = strlen(text);
    if (len > 0 && text[len - 1] == '\\n') {
        text[len - 1] = '\\0';
    }

    analyze_text(text);

    return 0;
}
\`\`\`

### **Example 2: Simple Text Search and Replace**

\`\`\`c
#include <stdio.h>
#include <string.h>

void replace_word(char *text, const char *old_word, const char *new_word) {
    char *position = strstr(text, old_word);
    if (position) {
        size_t old_len = strlen(old_word);
        size_t new_len = strlen(new_word);

        if (old_len == new_len) {
            // Same length - can replace in place
            memcpy(position, new_word, new_len);
        } else {
            printf("Replacement length differs - complex replacement needed\\n");
        }
    }
}

int main(void) {
    char text[] = "The quick brown fox jumps over the lazy dog";

    printf("Original: %s\\n", text);

    replace_word(text, "brown", "red");
    printf("After replacement: %s\\n", text);

    return 0;
}
\`\`\`

### **Example 3: CSV Parser**

\`\`\`c
#include <stdio.h>
#include <string.h>

#define MAX_FIELDS 10
#define MAX_FIELD_LENGTH 50

int parse_csv_line(char *line, char fields[MAX_FIELDS][MAX_FIELD_LENGTH]) {
    int field_count = 0;
    char *token = strtok(line, ",");

    while (token != NULL && field_count < MAX_FIELDS) {
        // Trim whitespace
        while (*token == ' ') token++;
        char *end = token + strlen(token) - 1;
        while (end > token && *end == ' ') end--;
        *(end + 1) = '\\0';

        strncpy(fields[field_count], token, MAX_FIELD_LENGTH - 1);
        fields[field_count][MAX_FIELD_LENGTH - 1] = '\\0';

        field_count++;
        token = strtok(NULL, ",");
    }

    return field_count;
}

int main(void) {
    char csv_line[] = "John Doe, 25, New York, Engineer";
    char fields[MAX_FIELDS][MAX_FIELD_LENGTH];

    int count = parse_csv_line(csv_line, fields);

    printf("Parsed %d fields:\\n", count);
    for (int i = 0; i < count; i++) {
        printf("Field %d: %s\\n", i + 1, fields[i]);
    }

    return 0;
}
\`\`\`

---

## ⚠️ Common String Function Mistakes

### **Mistake 1: Buffer Overflow**

\`\`\`c
// ❌ Dangerous - no size checking
char dest[10];
strcpy(dest, "This is a very long string");  // Overflow!

// ✅ Safe - use strncpy
strncpy(dest, "This is a very long string", sizeof(dest) - 1);
dest[sizeof(dest) - 1] = '\\0';
\`\`\`

### **Mistake 2: Forgetting Null Termination**

\`\`\`c
// ❌ May not be null terminated
char dest[10];
strncpy(dest, "hello", 3);  // Copies "hel" but no null terminator!

// ✅ Ensure null termination
strncpy(dest, "hello", sizeof(dest) - 1);
dest[sizeof(dest) - 1] = '\\0';
\`\`\`

### **Mistake 3: Using Modified String with strtok()**

\`\`\`c
// ❌ Original string is modified
char text[] = "one,two,three";
char *token = strtok(text, ",");
printf("%s\\n", text);  // "one" - original modified!

// ✅ Make a copy if you need original
char text[] = "one,two,three";
char copy[50];
strcpy(copy, text);
char *token = strtok(copy, ",");
// text is unchanged
\`\`\`

---

## 🔧 Safe String Function Alternatives

### **Custom Safe Functions**

\`\`\`c
#include <stdio.h>
#include <string.h>

// Safe string copy
char* safe_strcpy(char *dest, size_t dest_size, const char *src) {
    if (dest == NULL || src == NULL || dest_size == 0) {
        return NULL;
    }

    // Use strlcpy if available, otherwise implement safely
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
    size_t dest_len = strlen(dest);
    size_t src_len = strlen(src);

    if (dest_len + src_len >= dest_size) {
        // Not enough space
        return NULL;
    }

    strcat(dest, src);
    return dest;
}

int main(void) {
    char buffer[20];

    safe_strcpy(buffer, sizeof(buffer), "Hello");
    printf("After copy: %s\\n", buffer);

    if (safe_strcat(buffer, sizeof(buffer), " World") != NULL) {
        printf("After concat: %s\\n", buffer);
    } else {
        printf("Concatenation failed - not enough space\\n");
    }

    return 0;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Include \`<string.h>\`** for string functions
2. **Check buffer sizes** before copying/concatenating
3. **Use strn*** functions** for safer string operations
4. **strcmp() returns** negative/zero/positive for ordering
5. **strtok() modifies** the original string
6. **strchr()/strstr()** return pointers or NULL if not found
7. **Always ensure** null termination after string operations

Master string manipulation functions to build robust text-processing programs! 🔧✨`;
    return contentString;
  })()
};
