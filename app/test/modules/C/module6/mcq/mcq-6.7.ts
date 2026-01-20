import { Exercise } from '../../../../data/lessonsData';

export const exercise_6_7: Exercise = {
  id: "6.7",
  title: 'Strings & Character Arrays MCQ',
  status: 'demo',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is the null terminator in C strings?",
      options: [
        "'\\n' (newline character)",
        "'\\0' (null character with ASCII value 0)",
        "' ' (space character)",
        "'EOF' (end of file marker)"
      ],
      correctAnswer: 1,
      explanation: "C strings are null-terminated, ending with '\\0' (ASCII 0). This marks the end of the string."
    },
    {
      id: "q2",
      question: "Which function is used to get the length of a string?",
      options: [
        "strlen()",
        "sizeof()",
        "strsize()",
        "length()"
      ],
      correctAnswer: 0,
      explanation: "strlen() returns the number of characters in a string, excluding the null terminator."
    },
    {
      id: "q3",
      question: "What is the output of this code?\n\n```c\n#include <stdio.h>\n#include <string.h>\nint main() {\n    char str[] = \"Hello\";\n    printf(\"%zu %zu\", strlen(str), sizeof(str));\n    return 0;\n}\n```",
      options: [
        "5 5",
        "5 6",
        "6 5",
        "6 6"
      ],
      correctAnswer: 1,
      explanation: "strlen(str) returns 5 (characters before null), sizeof(str) returns 6 (5 chars + 1 null terminator)."
    },
    {
      id: "q4",
      question: "Which of these functions copies a string safely?",
      options: [
        "strcpy()",
        "strncpy()",
        "Both are equally safe",
        "Neither is safe"
      ],
      correctAnswer: 1,
      explanation: "strncpy() allows you to specify maximum characters to copy, preventing buffer overflows."
    },
    {
      id: "q5",
      question: "What does strcmp() return when comparing \"apple\" and \"banana\"?",
      options: [
        "0 (equal)",
        "Positive number",
        "Negative number",
        "Undefined"
      ],
      correctAnswer: 2,
      explanation: "strcmp() returns negative when first string comes before second in lexicographical order."
    },
    {
      id: "q6",
      question: "Which function finds the first occurrence of a character in a string?",
      options: [
        "strchr()",
        "strstr()",
        "strtok()",
        "strrchr()"
      ],
      correctAnswer: 0,
      explanation: "strchr() finds the first occurrence of a character, strstr() finds substrings."
    },
    {
      id: "q7",
      question: "What is the safest way to read a string from user input?",
      options: [
        "gets()",
        "scanf() with %s",
        "fgets()",
        "getchar()"
      ],
      correctAnswer: 2,
      explanation: "fgets() is the safest for reading strings as it prevents buffer overflows by limiting input size."
    },
    {
      id: "q8",
      question: "Which of these string functions modifies the original string?",
      options: [
        "strlen()",
        "strcmp()",
        "strtok()",
        "strchr()"
      ],
      correctAnswer: 2,
      explanation: "strtok() modifies the original string by replacing delimiters with null characters."
    },
    {
      id: "q9",
      question: "What does sprintf() do?",
      options: [
        "Prints to console",
        "Formats data into a string buffer",
        "Scans input from console",
        "Concatenates two strings"
      ],
      correctAnswer: 1,
      explanation: "sprintf() formats various data types into a string buffer, similar to printf() but writes to memory."
    },
    {
      id: "q10",
      question: "Which is true about string literals in C?",
      options: [
        "They are mutable",
        "They are stored in read-only memory",
        "They automatically resize",
        "They don't need null termination"
      ],
      correctAnswer: 1,
      explanation: "String literals are stored in read-only memory and cannot be modified. Attempting to modify them causes undefined behavior."
    }
  ]
};
