import { Exercise } from '../../../../data/lessonsData';

export const exercise_6_8: Exercise = {
  id: "6.8",
  title: 'Strings & Character Arrays Coding Exercises',
  status: 'demo',
  type: 'code',
  codeQuestions: [
    {
      id: "code1",
      question: "Write a function that counts the number of vowels in a string (case insensitive).\n\nExample:\nInput: \"Hello World\"\nOutput: 3 (e, o, o)",
      solution: `#include <stdio.h>
#include <ctype.h>

int count_vowels(const char *str) {
    int count = 0;

    while (*str != '\\0') {
        char ch = tolower(*str);
        if (ch == 'a' || ch == 'e' || ch == 'i' ||
            ch == 'o' || ch == 'u') {
            count++;
        }
        str++;
    }

    return count;
}

int main() {
    char text[] = "Hello World";

    int vowels = count_vowels(text);
    printf("String: %s\\n", text);
    printf("Number of vowels: %d\\n", vowels);

    return 0;
}`
    },
    {
      id: "code2",
      question: "Write a function that reverses a string in place (modifies the original string).\n\nExample:\nInput: \"Hello\"\nOutput: \"olleH\"",
      solution: `#include <stdio.h>
#include <string.h>

void reverse_string(char *str) {
    int length = strlen(str);
    int start = 0;
    int end = length - 1;

    while (start < end) {
        // Swap characters
        char temp = str[start];
        str[start] = str[end];
        str[end] = temp;

        start++;
        end--;
    }
}

int main() {
    char text[] = "Hello";

    printf("Original: %s\\n", text);

    reverse_string(text);

    printf("Reversed: %s\\n", text);

    return 0;
}`
    },
    {
      id: "code3",
      question: "Write a function that checks if a string is a palindrome (reads the same forwards and backwards, ignoring case).\n\nExample:\nInput: \"Racecar\"\nOutput: Palindrome\n\nInput: \"Hello\"\nOutput: Not a palindrome",
      solution: `#include <stdio.h>
#include <ctype.h>
#include <string.h>

int is_palindrome(const char *str) {
    int length = strlen(str);
    int start = 0;
    int end = length - 1;

    while (start < end) {
        // Skip non-alphanumeric characters
        while (start < end && !isalnum(str[start])) {
            start++;
        }
        while (start < end && !isalnum(str[end])) {
            end--;
        }

        // Compare characters (case insensitive)
        if (tolower(str[start]) != tolower(str[end])) {
            return 0; // Not a palindrome
        }

        start++;
        end--;
    }

    return 1; // Is a palindrome
}

int main() {
    char test1[] = "Racecar";
    char test2[] = "Hello";

    printf("'%s' is %s palindrome\\n", test1,
           is_palindrome(test1) ? "a" : "not a");

    printf("'%s' is %s palindrome\\n", test2,
           is_palindrome(test2) ? "a" : "not a");

    return 0;
}`
    },
    {
      id: "code4",
      question: "Write a program that tokenizes a sentence into words using strtok() and counts the words.\n\nExample:\nInput: \"This is a sample sentence.\"\nOutput: 5 words",
      solution: `#include <stdio.h>
#include <string.h>

int count_words(const char *sentence) {
    char copy[100];
    strcpy(copy, sentence); // strtok modifies the string

    int count = 0;
    char *token = strtok(copy, " .,;!?\\n\\t");

    while (token != NULL) {
        count++;
        token = strtok(NULL, " .,;!?\\n\\t");
    }

    return count;
}

int main() {
    char sentence[] = "This is a sample sentence.";

    printf("Sentence: %s\\n", sentence);
    printf("Word count: %d\\n", count_words(sentence));

    return 0;
}`
    },
    {
      id: "code5",
      question: "Write a function that safely concatenates two strings with a maximum buffer size.\n\nExample:\nString 1: \"Hello \"\nString 2: \"World!\"\nResult: \"Hello World!\"",
      solution: `#include <stdio.h>
#include <string.h>

char* safe_concat(char *dest, size_t dest_size, const char *src) {
    // Find current length
    size_t dest_len = strlen(dest);

    // Check if there's space for concatenation
    if (dest_len >= dest_size - 1) {
        return NULL; // No space left
    }

    // Calculate how much we can copy
    size_t available = dest_size - dest_len - 1;
    size_t src_len = strlen(src);

    if (src_len > available) {
        // Truncate source if too long
        strncat(dest, src, available);
    } else {
        // Safe to copy all
        strcat(dest, src);
    }

    return dest;
}

int main() {
    char buffer[20] = "Hello ";

    printf("Original: '%s'\\n", buffer);

    if (safe_concat(buffer, sizeof(buffer), "World!")) {
        printf("Concatenated: '%s'\\n", buffer);
    } else {
        printf("Concatenation failed\\n");
    }

    // Try with a very long string
    char long_string[] = "This is a very long string that won't fit";
    if (safe_concat(buffer, sizeof(buffer), long_string)) {
        printf("Long concat: '%s'\\n", buffer);
    } else {
        printf("Long concatenation failed\\n");
    }

    return 0;
}`
    }
  ]
};
