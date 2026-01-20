import { SubLesson } from '../../../../data/lessonsData';

export const topic_6_4: SubLesson = {
  id: "6.4",
  title: 'String Comparison and Searching',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🔍 String Comparison and Searching in C

String comparison and searching are fundamental operations for text processing. C provides several functions for comparing strings and finding substrings or characters within strings.

---

## 📊 String Comparison Functions

### **strcmp() - Compare Entire Strings**

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char str1[] = "apple";
    char str2[] = "banana";
    char str3[] = "apple";

    // Compare strings lexicographically
    int result1 = strcmp(str1, str2);
    int result2 = strcmp(str1, str3);
    int result3 = strcmp(str2, str1);

    printf("strcmp('%s', '%s') = %d\\n", str1, str2, result1);  // negative
    printf("strcmp('%s', '%s') = %d\\n", str1, str3, result2);  // zero
    printf("strcmp('%s', '%s') = %d\\n", str2, str1, result3);  // positive

    // Practical usage
    if (strcmp(str1, str3) == 0) {
        printf("'%s' and '%s' are identical\\n", str1, str3);
    }

    return 0;
}
\`\`\`

**Return Values:**
- **Negative:** first string < second string
- **Zero:** strings are equal
- **Positive:** first string > second string

---

### **strncmp() - Compare First N Characters**

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char str1[] = "hello";
    char str2[] = "help";

    // Compare first 3 characters
    int result = strncmp(str1, str2, 3);
    printf("strncmp('%s', '%s', 3) = %d\\n", str1, str2, result);

    // They match for first 3 chars ("hel")
    if (result == 0) {
        printf("First 3 characters match\\n");
    }

    // Compare first 4 characters
    result = strncmp(str1, str2, 4);
    printf("strncmp('%s', '%s', 4) = %d\\n", str1, str2, result);

    return 0;
}
\`\`\`

---

## 🔄 Case-Insensitive Comparison

### **Custom Case-Insensitive Functions**

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

// Case-insensitive string comparison
int strcmp_ignore_case(const char *s1, const char *s2) {
    while (*s1 && *s2) {
        int diff = tolower(*s1) - tolower(*s2);
        if (diff != 0) {
            return diff;
        }
        s1++;
        s2++;
    }
    return tolower(*s1) - tolower(*s2);
}

// Case-insensitive comparison of first n characters
int strncmp_ignore_case(const char *s1, const char *s2, size_t n) {
    for (size_t i = 0; i < n && *s1 && *s2; i++) {
        int diff = tolower(*s1) - tolower(*s2);
        if (diff != 0) {
            return diff;
        }
        s1++;
        s2++;
    }

    if (n > 0) {
        return tolower(*s1) - tolower(*s2);
    }

    return 0;
}

int main(void) {
    char str1[] = "Hello";
    char str2[] = "HELLO";
    char str3[] = "help";

    printf("Case-sensitive: strcmp('%s', '%s') = %d\\n",
           str1, str2, strcmp(str1, str2));

    printf("Case-insensitive: %d\\n",
           strcmp_ignore_case(str1, str2));

    printf("Case-insensitive first 3: %d\\n",
           strncmp_ignore_case(str1, str3, 3));

    return 0;
}
\`\`\`

---

## 🔎 String Search Functions

### **strchr() - Find First Occurrence of Character**

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char text[] = "Hello, World!";

    // Find first 'o'
    char *first_o = strchr(text, 'o');
    if (first_o) {
        printf("First 'o' found at position: %ld\\n", first_o - text);
        printf("Character: %c\\n", *first_o);
    }

    // Find character that doesn't exist
    char *not_found = strchr(text, 'z');
    if (not_found == NULL) {
        printf("'z' not found in string\\n");
    }

    // Find all occurrences of 'o'
    char *pos = text;
    int count = 0;
    while ((pos = strchr(pos, 'o')) != NULL) {
        count++;
        printf("Found 'o' at position: %ld\\n", pos - text);
        pos++;  // Move past current find
    }
    printf("Total 'o's found: %d\\n", count);

    return 0;
}
\`\`\`

---

### **strrchr() - Find Last Occurrence of Character**

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char filename[] = "document.txt.backup";

    // Find last dot (file extension)
    char *last_dot = strrchr(filename, '.');
    if (last_dot) {
        printf("File extension starts at: %s\\n", last_dot);
    }

    // Find last directory separator (Unix-style)
    char path[] = "/home/user/documents/file.txt";
    char *last_slash = strrchr(path, '/');
    if (last_slash) {
        printf("Filename: %s\\n", last_slash + 1);
        printf("Directory: %.*s\\n", (int)(last_slash - path), path);
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
    char *found = strstr(text, "fox");
    if (found) {
        printf("Found 'fox' at position: %ld\\n", found - text);
        printf("Context: %.20s\\n", found);
    }

    // Find all occurrences
    char *search_pos = text;
    int occurrences = 0;

    while ((search_pos = strstr(search_pos, "the")) != NULL) {
        occurrences++;
        printf("Found 'the' #%d at position: %ld\\n",
               occurrences, search_pos - text);
        search_pos += 3;  // Move past "the"
    }

    printf("Total occurrences of 'the': %d\\n", occurrences);

    return 0;
}
\`\`\`

---

## 🔍 Advanced Search Techniques

### **Finding Words in Text**

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

int find_word(const char *text, const char *word) {
    char *found = strstr(text, word);
    if (found == NULL) return 0;

    // Check word boundaries (not part of another word)
    size_t word_len = strlen(word);

    // Check character before word
    if (found > text && isalnum(*(found - 1))) {
        return 0;  // Part of larger word
    }

    // Check character after word
    if (isalnum(*(found + word_len))) {
        return 0;  // Part of larger word
    }

    return 1;  // Found as separate word
}

int count_words(const char *text, const char *word) {
    int count = 0;
    char *pos = (char*)text;

    while ((pos = strstr(pos, word)) != NULL) {
        if (find_word(text, word)) {
            count++;
        }
        pos += strlen(word);
    }

    return count;
}

int main(void) {
    char text[] = "The cat sat on the mat. The cat was happy.";

    printf("Text: %s\\n\\n", text);

    printf("Searching for 'cat':\\n");
    if (find_word(text, "cat")) {
        printf("Found 'cat' as a separate word\\n");
    }

    printf("Count of 'the': %d\\n", count_words(text, "the"));
    printf("Count of 'cat': %d\\n", count_words(text, "cat"));
    printf("Count of 'and': %d\\n", count_words(text, "and"));

    return 0;
}
\`\`\`

---

## 📊 String Sorting and Comparison

### **Sorting Array of Strings**

\`\`\`c
#include <stdio.h>
#include <string.h>

void sort_strings(char arr[][50], int n) {
    char temp[50];

    for (int i = 0; i < n - 1; i++) {
        for (int j = i + 1; j < n; j++) {
            if (strcmp(arr[i], arr[j]) > 0) {
                // Swap
                strcpy(temp, arr[i]);
                strcpy(arr[i], arr[j]);
                strcpy(arr[j], temp);
            }
        }
    }
}

int main(void) {
    char names[5][50] = {
        "Charlie",
        "Alice",
        "Bob",
        "David",
        "Eve"
    };

    printf("Before sorting:\\n");
    for (int i = 0; i < 5; i++) {
        printf("%s\\n", names[i]);
    }

    sort_strings(names, 5);

    printf("\\nAfter sorting:\\n");
    for (int i = 0; i < 5; i++) {
        printf("%s\\n", names[i]);
    }

    return 0;
}
\`\`\`

---

## 🎯 Practical Examples

### **Example 1: Simple Text Search Engine**

\`\`\`c
#include <stdio.h>
#include <string.h>

#define MAX_TEXT_LENGTH 1000
#define MAX_QUERY_LENGTH 100

void search_text(const char *text, const char *query) {
    char *found = strstr(text, query);

    if (found == NULL) {
        printf("Query '%s' not found in text.\\n", query);
        return;
    }

    // Find position
    int position = found - text;

    // Show context (up to 30 chars before and after)
    int start = (position > 30) ? position - 30 : 0;
    int end = position + strlen(query) + 30;

    if (end > strlen(text)) end = strlen(text);

    printf("Found '%s' at position %d:\\n", query, position);
    printf("...%.*s...\\n", end - start, text + start);

    // Highlight the found text
    for (int i = start; i < end; i++) {
        if (i >= position && i < position + strlen(query)) {
            putchar('[');
            putchar(text[i]);
            putchar(']');
        } else {
            putchar(text[i]);
        }
    }
    printf("\\n");
}

int main(void) {
    char text[MAX_TEXT_LENGTH];
    char query[MAX_QUERY_LENGTH];

    printf("Enter text to search in:\\n");
    fgets(text, sizeof(text), stdin);

    // Remove newline
    size_t len = strlen(text);
    if (len > 0 && text[len - 1] == '\\n') {
        text[len - 1] = '\\0';
    }

    while (1) {
        printf("\\nEnter search query (or 'quit' to exit): ");
        fgets(query, sizeof(query), stdin);

        len = strlen(query);
        if (len > 0 && query[len - 1] == '\\n') {
            query[len - 1] = '\\0';
        }

        if (strcmp(query, "quit") == 0) {
            break;
        }

        if (strlen(query) > 0) {
            search_text(text, query);
        }
    }

    return 0;
}
\`\`\`

### **Example 2: Password Strength Checker**

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

int has_uppercase(const char *str) {
    while (*str) {
        if (isupper(*str)) return 1;
        str++;
    }
    return 0;
}

int has_lowercase(const char *str) {
    while (*str) {
        if (islower(*str)) return 1;
        str++;
    }
    return 0;
}

int has_digit(const char *str) {
    while (*str) {
        if (isdigit(*str)) return 1;
        str++;
    }
    return 0;
}

int has_special_char(const char *str) {
    const char *special = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    while (*str) {
        if (strchr(special, *str)) return 1;
        str++;
    }
    return 0;
}

void check_password_strength(const char *password) {
    int score = 0;
    int length = strlen(password);

    printf("Password: %s\\n", password);
    printf("Length: %d\\n", length);

    // Length check
    if (length >= 8) {
        score += 2;
        printf("✓ Good length\\n");
    } else if (length >= 6) {
        score += 1;
        printf("⚠ Acceptable length\\n");
    } else {
        printf("✗ Too short\\n");
    }

    // Character variety
    if (has_uppercase(password)) {
        score += 1;
        printf("✓ Has uppercase letters\\n");
    } else {
        printf("✗ Missing uppercase letters\\n");
    }

    if (has_lowercase(password)) {
        score += 1;
        printf("✓ Has lowercase letters\\n");
    } else {
        printf("✗ Missing lowercase letters\\n");
    }

    if (has_digit(password)) {
        score += 1;
        printf("✓ Has digits\\n");
    } else {
        printf("✗ Missing digits\\n");
    }

    if (has_special_char(password)) {
        score += 1;
        printf("✓ Has special characters\\n");
    } else {
        printf("⚠ No special characters\\n");
    }

    // Overall rating
    printf("\\nStrength Score: %d/6\\n", score);
    if (score >= 5) {
        printf("Rating: Very Strong\\n");
    } else if (score >= 4) {
        printf("Rating: Strong\\n");
    } else if (score >= 3) {
        printf("Rating: Medium\\n");
    } else if (score >= 2) {
        printf("Rating: Weak\\n");
    } else {
        printf("Rating: Very Weak\\n");
    }
}

int main(void) {
    char password[100];

    printf("Enter a password to check its strength: ");
    fgets(password, sizeof(password), stdin);

    // Remove newline
    size_t len = strlen(password);
    if (len > 0 && password[len - 1] == '\\n') {
        password[len - 1] = '\\0';
    }

    check_password_strength(password);

    return 0;
}
\`\`\`

### **Example 3: File Extension Checker**

\`\`\`c
#include <stdio.h>
#include <string.h>

const char* get_file_extension(const char *filename) {
    const char *dot = strrchr(filename, '.');
    if (dot && dot != filename) {
        return dot + 1;  // Return part after dot
    }
    return "";  // No extension
}

int is_image_file(const char *filename) {
    const char *ext = get_file_extension(filename);
    const char *image_exts[] = {"jpg", "jpeg", "png", "gif", "bmp", "tiff"};

    for (int i = 0; i < 6; i++) {
        if (strcmp(ext, image_exts[i]) == 0) {
            return 1;
        }
    }
    return 0;
}

int is_text_file(const char *filename) {
    const char *ext = get_file_extension(filename);
    const char *text_exts[] = {"txt", "c", "h", "cpp", "py", "java", "html", "css"};

    for (int i = 0; i < 8; i++) {
        if (strcmp(ext, text_exts[i]) == 0) {
            return 1;
        }
    }
    return 0;
}

int main(void) {
    char filename[100];

    printf("Enter a filename: ");
    scanf("%99s", filename);

    printf("File: %s\\n", filename);
    printf("Extension: %s\\n", get_file_extension(filename));

    if (is_image_file(filename)) {
        printf("This is an image file.\\n");
    } else if (is_text_file(filename)) {
        printf("This is a text/code file.\\n");
    } else {
        printf("Unknown file type.\\n");
    }

    return 0;
}
\`\`\`

---

## ⚠️ Common Comparison and Search Mistakes

### **Mistake 1: Using == for String Comparison**

\`\`\`c
// ❌ Wrong: compares pointers, not content
char str1[] = "hello";
char str2[] = "hello";
if (str1 == str2) {  // Compares addresses!
    printf("Equal\\n");
}

// ✅ Correct: use strcmp
if (strcmp(str1, str2) == 0) {
    printf("Equal\\n");
}
\`\`\`

### **Mistake 2: Forgetting Case Sensitivity**

\`\`\`c
// ❌ Case-sensitive comparison
char input[] = "Yes";
if (strcmp(input, "yes") == 0) {  // Won't match!
    printf("User said yes\\n");
}

// ✅ Case-insensitive or normalize input
if (strcmp_ignore_case(input, "yes") == 0) {
    printf("User said yes\\n");
}
\`\`\`

### **Mistake 3: Not Checking Search Results**

\`\`\`c
// ❌ Crashes if not found
char text[] = "hello";
char *found = strchr(text, 'z');  // Returns NULL
*found = 'x';  // CRASH!

// ✅ Check before using
char *found = strchr(text, 'z');
if (found != NULL) {
    *found = 'x';
}
\`\`\`

---

## 🎓 Key Takeaways

1. **strcmp()** compares entire strings lexicographically
2. **strncmp()** compares first n characters only
3. **strchr()** finds first character occurrence
4. **strrchr()** finds last character occurrence
5. **strstr()** finds substring within string
6. **All search functions** return NULL if not found
7. **Never use ==** for string content comparison
8. **Case-sensitive** by default - implement case-insensitive if needed

Master string comparison and searching to build powerful text processing applications! 🔍✨`;
    return contentString;
  })()
};
