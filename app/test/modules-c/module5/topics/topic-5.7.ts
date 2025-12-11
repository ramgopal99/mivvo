import { SubLesson } from '../../../data/lessonsData';

export const topic_5_7: SubLesson = {
  id: 5.7,
  title: 'String Manipulation',
  status: 'completed',
  content: `# 🎨 String Manipulation

Master advanced string processing techniques, parsing, formatting, and algorithms for complex text manipulation in C.

---

## 🔄 Advanced String Operations

### String Reversal

\`\`\`c
#include <stdio.h>
#include <string.h>

// Method 1: Using two pointers
void reverse_string(char* str) {
    int len = strlen(str);
    int start = 0;
    int end = len - 1;

    while (start < end) {
        // Swap characters
        char temp = str[start];
        str[start] = str[end];
        str[end] = temp;

        start++;
        end--;
    }
}

// Method 2: Using recursion
void reverse_recursive(char* str, int start, int end) {
    if (start >= end) return;

    // Swap and recurse
    char temp = str[start];
    str[start] = str[end];
    str[end] = temp;

    reverse_recursive(str, start + 1, end - 1);
}

int main() {
    char text[] = "Hello, World!";

    printf("Original: %s\\n", text);

    reverse_string(text);
    printf("Reversed: %s\\n", text);

    // Reset and try recursive version
    strcpy(text, "Hello, World!");
    reverse_recursive(text, 0, strlen(text) - 1);
    printf("Recursive reverse: %s\\n", text);

    return 0;
}
\`\`\`

### Word Reversal in Sentence

\`\`\`c
#include <stdio.h>
#include <string.h>

// Reverse words in a sentence
void reverse_words(char* sentence) {
    int len = strlen(sentence);
    int start = 0;

    // First, reverse the entire string
    reverse_string(sentence);

    // Then reverse each word
    for (int i = 0; i <= len; i++) {
        if (sentence[i] == ' ' || sentence[i] == '\\0') {
            // Reverse the current word
            int end = i - 1;
            int word_start = start;

            while (word_start < end) {
                char temp = sentence[word_start];
                sentence[word_start] = sentence[end];
                sentence[end] = temp;
                word_start++;
                end--;
            }

            start = i + 1;
        }
    }
}

void reverse_string(char* str) {
    int len = strlen(str);
    for (int i = 0; i < len / 2; i++) {
        char temp = str[i];
        str[i] = str[len - 1 - i];
        str[len - 1 - i] = temp;
    }
}

int main() {
    char sentence[] = "Hello World C Programming";

    printf("Original: %s\\n", sentence);
    reverse_words(sentence);
    printf("Words reversed: %s\\n", sentence);

    return 0;
}
\`\`\`

---

## 🔍 String Parsing and Tokenization

### CSV Parser

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define MAX_FIELDS 10
#define MAX_FIELD_LENGTH 50

int parse_csv_line(char* line, char fields[][MAX_FIELD_LENGTH], int max_fields) {
    int field_count = 0;
    char* token;

    // Use strtok to split by commas
    token = strtok(line, ",");

    while (token != NULL && field_count < max_fields) {
        // Remove leading/trailing whitespace
        while (*token == ' ') token++;  // Skip leading spaces

        // Copy to fields array
        strcpy(fields[field_count], token);

        // Remove trailing spaces
        int len = strlen(fields[field_count]);
        while (len > 0 && fields[field_count][len - 1] == ' ') {
            fields[field_count][len - 1] = '\\0';
            len--;
        }

        field_count++;
        token = strtok(NULL, ",");
    }

    return field_count;
}

int main() {
    char csv_line[] = "Alice, 25, Engineer, New York";
    char fields[MAX_FIELDS][MAX_FIELD_LENGTH];

    int num_fields = parse_csv_line(csv_line, fields, MAX_FIELDS);

    printf("Parsed %d fields:\\n", num_fields);
    for (int i = 0; i < num_fields; i++) {
        printf("Field %d: '%s'\\n", i + 1, fields[i]);
    }

    return 0;
}
\`\`\`

### Command Line Parser

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

#define MAX_ARGS 10
#define MAX_ARG_LENGTH 50

typedef struct {
    char command[MAX_ARG_LENGTH];
    char args[MAX_ARGS][MAX_ARG_LENGTH];
    int arg_count;
} ParsedCommand;

ParsedCommand parse_command(char* input) {
    ParsedCommand cmd = {0};
    char* token;
    int arg_index = 0;

    // Skip leading whitespace
    while (*input && isspace(*input)) input++;

    // Get command
    token = strtok(input, " \\t\\n");
    if (token != NULL) {
        strcpy(cmd.command, token);

        // Get arguments
        while ((token = strtok(NULL, " \\t\\n")) != NULL && arg_index < MAX_ARGS) {
            strcpy(cmd.args[arg_index], token);
            arg_index++;
        }
        cmd.arg_count = arg_index;
    }

    return cmd;
}

int main() {
    char input[] = "copy file1.txt file2.txt -overwrite";

    ParsedCommand cmd = parse_command(input);

    printf("Command: %s\\n", cmd.command);
    printf("Arguments (%d):\\n", cmd.arg_count);

    for (int i = 0; i < cmd.arg_count; i++) {
        printf("  %d: %s\\n", i + 1, cmd.args[i]);
    }

    return 0;
}
\`\`\`

---

## 🔢 Number Formatting and Conversion

### Integer to String with Formatting

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// Convert integer to formatted string
void int_to_formatted_string(int number, char* buffer, int buffer_size, int width, char fill_char) {
    char temp[50];
    sprintf(temp, "%d", number);

    int len = strlen(temp);
    int padding = width - len;

    if (padding > 0 && buffer_size > padding + len + 1) {
        // Add padding
        memset(buffer, fill_char, padding);
        strcpy(buffer + padding, temp);
    } else {
        strcpy(buffer, temp);
    }
}

// Format number with thousands separator
void format_with_commas(long number, char* buffer, int buffer_size) {
    char temp[50];
    sprintf(temp, "%ld", number);

    int len = strlen(temp);
    int comma_count = (len - 1) / 3;  // Number of commas needed
    int result_len = len + comma_count;

    if (result_len + 1 > buffer_size) {
        buffer[0] = '\\0';
        return;
    }

    int temp_idx = len - 1;
    int buffer_idx = result_len - 1;

    buffer[result_len] = '\\0';

    for (int i = 0; i < len; i++) {
        buffer[buffer_idx--] = temp[temp_idx--];

        // Add comma every 3 digits (except at the end)
        if (i % 3 == 2 && i < len - 1) {
            buffer[buffer_idx--] = ',';
        }
    }
}

int main() {
    char formatted[50];

    // Test padding
    int_to_formatted_string(42, formatted, sizeof(formatted), 8, '0');
    printf("Padded: '%s'\\n", formatted);

    // Test commas
    format_with_commas(1234567, formatted, sizeof(formatted));
    printf("With commas: '%s'\\n", formatted);

    return 0;
}
\`\`\`

---

## 🔍 String Searching and Pattern Matching

### Simple Pattern Search

\`\`\`c
#include <stdio.h>
#include <string.h>

// Find all occurrences of a pattern in text
void find_pattern(const char* text, const char* pattern) {
    int text_len = strlen(text);
    int pattern_len = strlen(pattern);
    int found_count = 0;

    printf("Searching for '%s' in '%s'\\n", pattern, text);

    for (int i = 0; i <= text_len - pattern_len; i++) {
        int j;

        // Check if pattern matches at position i
        for (j = 0; j < pattern_len; j++) {
            if (text[i + j] != pattern[j]) {
                break;
            }
        }

        // If we reached the end of pattern, we found a match
        if (j == pattern_len) {
            printf("Found at position %d\\n", i);
            found_count++;
        }
    }

    printf("Total occurrences: %d\\n", found_count);
}

int main() {
    char text[] = "the cat sat on the mat";
    char pattern[] = "at";

    find_pattern(text, pattern);

    return 0;
}
\`\`\`

### Anagram Detection

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

// Sort string characters
void sort_string(char* str) {
    int len = strlen(str);

    for (int i = 0; i < len - 1; i++) {
        for (int j = i + 1; j < len; j++) {
            if (str[i] > str[j]) {
                char temp = str[i];
                str[i] = str[j];
                str[j] = temp;
            }
        }
    }
}

// Check if two strings are anagrams
int are_anagrams(const char* str1, const char* str2) {
    char copy1[100], copy2[100];

    // Make copies and convert to lowercase
    strcpy(copy1, str1);
    strcpy(copy2, str2);

    for (int i = 0; copy1[i]; i++) copy1[i] = tolower(copy1[i]);
    for (int i = 0; copy2[i]; i++) copy2[i] = tolower(copy2[i]);

    // Sort both strings
    sort_string(copy1);
    sort_string(copy2);

    // Compare sorted strings
    return strcmp(copy1, copy2) == 0;
}

int main() {
    char word1[] = "listen";
    char word2[] = "silent";

    if (are_anagrams(word1, word2)) {
        printf("'%s' and '%s' are anagrams\\n", word1, word2);
    } else {
        printf("'%s' and '%s' are not anagrams\\n", word1, word2);
    }

    return 0;
}
\`\`\`

---

## 🔄 Text Processing Algorithms

### Word Frequency Counter

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

#define MAX_WORDS 100
#define MAX_WORD_LENGTH 50

typedef struct {
    char word[MAX_WORD_LENGTH];
    int count;
} WordCount;

// Simple word frequency counter
void count_words(const char* text, WordCount words[], int* word_count) {
    char temp[1000];
    strcpy(temp, text);

    char* token = strtok(temp, " .,;!?\\n\\t");
    *word_count = 0;

    while (token != NULL && *word_count < MAX_WORDS) {
        // Convert to lowercase
        for (int i = 0; token[i]; i++) {
            token[i] = tolower(token[i]);
        }

        // Check if word already exists
        int found = 0;
        for (int i = 0; i < *word_count; i++) {
            if (strcmp(words[i].word, token) == 0) {
                words[i].count++;
                found = 1;
                break;
            }
        }

        // Add new word
        if (!found) {
            strcpy(words[*word_count].word, token);
            words[*word_count].count = 1;
            (*word_count)++;
        }

        token = strtok(NULL, " .,;!?\\n\\t");
    }
}

int main() {
    char text[] = "The cat sat on the mat. The dog chased the cat.";
    WordCount words[MAX_WORDS];
    int word_count;

    count_words(text, words, &word_count);

    printf("Word frequencies:\\n");
    for (int i = 0; i < word_count; i++) {
        printf("'%s': %d\\n", words[i].word, words[i].count);
    }

    return 0;
}
\`\`\`

### Palindrome Checker

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

// Check if string is palindrome (ignoring case and non-letters)
int is_palindrome(const char* str) {
    int len = strlen(str);
    int start = 0;
    int end = len - 1;

    while (start < end) {
        // Skip non-alphabetic characters
        while (start < end && !isalpha(str[start])) start++;
        while (start < end && !isalpha(str[end])) end--;

        // Compare characters (case insensitive)
        if (tolower(str[start]) != tolower(str[end])) {
            return 0;  // Not a palindrome
        }

        start++;
        end--;
    }

    return 1;  // Is a palindrome
}

// Remove non-alphabetic characters and convert to lowercase
void clean_string(const char* input, char* output) {
    int j = 0;
    for (int i = 0; input[i]; i++) {
        if (isalpha(input[i])) {
            output[j++] = tolower(input[i]);
        }
    }
    output[j] = '\\0';
}

int main() {
    char phrases[][100] = {
        "A man, a plan, a canal: Panama",
        "race car",
        "hello world",
        "Madam, in Eden, I'm Adam"
    };

    for (int i = 0; i < 4; i++) {
        char cleaned[100];
        clean_string(phrases[i], cleaned);

        printf("'%s'\\n", phrases[i]);
        printf("Cleaned: '%s'\\n", cleaned);
        printf("Palindrome: %s\\n\\n", is_palindrome(phrases[i]) ? "Yes" : "No");
    }

    return 0;
}
\`\`\`

---

## 🛡️ Advanced String Security

### SQL Injection Prevention (Conceptual)

\`\`\`c
#include <stdio.h>
#include <string.h>

// Simple SQL sanitization (conceptual - not production ready)
void sanitize_sql_input(char* input) {
    // Remove dangerous characters
    char* src = input;
    char* dst = input;

    while (*src) {
        if (*src != '\\'' && *src != '"' && *src != ';') {
            *dst++ = *src;
        }
        src++;
    }
    *dst = '\\0';
}

// Escape SQL strings (basic)
void escape_sql_string(const char* input, char* output, int output_size) {
    int j = 0;

    for (int i = 0; input[i] && j < output_size - 3; i++) {
        if (input[i] == '\\'') {
            output[j++] = '\\'';
            output[j++] = '\\'';
        } else {
            output[j++] = input[i];
        }
    }

    output[j] = '\\0';
}

int main() {
    char dangerous[] = "user'; DROP TABLE users; --";
    char safe_input[100];
    char escaped[200];

    printf("Dangerous input: %s\\n", dangerous);

    strcpy(safe_input, dangerous);
    sanitize_sql_input(safe_input);
    printf("Sanitized: %s\\n", safe_input);

    escape_sql_string(dangerous, escaped, sizeof(escaped));
    printf("Escaped: %s\\n", escaped);

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **String manipulation** involves parsing, formatting, and transforming text
2. **Tokenization** breaks strings into meaningful parts
3. **Pattern matching** finds substrings and character sequences
4. **Text processing** includes word counting, palindrome detection, and frequency analysis
5. **Security** is crucial when processing user input
6. **Memory management** is important for dynamic string operations
7. **Regular expressions** (if available) can simplify complex pattern matching

---

## 🚀 Module 5 Complete!

**Congratulations!** You've mastered arrays and strings in C:

- ✅ **Array fundamentals** and memory layout
- ✅ **One-dimensional arrays** with operations and algorithms
- ✅ **Multi-dimensional arrays** for matrices and tables
- ✅ **Array operations** including sorting, searching, and merging
- ✅ **String basics** with null termination and literals
- ✅ **String functions** from the standard library
- ✅ **String manipulation** with parsing and algorithms

**Ready for Module 6: Pointers?** Pointers are the most challenging but most powerful feature of C! 🎯
