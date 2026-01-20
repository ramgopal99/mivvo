import { Exercise } from '../../../../data/lessonsData';

export const exercise_2_9: Exercise = {
  id: "2.9",
  title: 'MCQ',
  status: 'demo',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is the format specifier for printing a float with 2 decimal places?",
      options: [
        "%f",
        "%.2f",
        "%2f",
        "%float"
      ],
      correctAnswer: 1,
      explanation: "The format specifier `%.2f` prints a float with exactly 2 decimal places. The `.2` specifies the precision, and `f` indicates a float."
    },
    {
      id: "q2",
      question: "Which character is used to access the address of a variable in C?",
      options: [
        "*",
        "&",
        "@",
        "#"
      ],
      correctAnswer: 1,
      explanation: "The `&` (ampersand) operator is the address-of operator in C. It is required when passing variables to `scanf()` because `scanf()` needs the memory address to store the input value."
    },
    {
      id: "q3",
      question: "What is the difference between `float` and `double` in C?",
      options: [
        "There is no difference",
        "float has higher precision than double",
        "double has higher precision than float",
        "float is for integers, double is for decimals"
      ],
      correctAnswer: 2,
      explanation: "`double` has higher precision than `float`. `float` typically uses 4 bytes with ~7 decimal digits of precision, while `double` uses 8 bytes with ~15 decimal digits of precision."
    },
    {
      id: "q4",
      question: "What will be the output of: `printf(\"%d\", 5 / 2);`?",
      options: [
        "2.5",
        "2",
        "3",
        "2.0"
      ],
      correctAnswer: 1,
      explanation: "When dividing two integers in C using `/`, the result is integer division. `5 / 2` equals `2` (the decimal part is truncated, not rounded). To get 2.5, you would need to use float division: `5.0 / 2.0`."
    },
    {
      id: "q5",
      question: "Which of the following correctly declares and initializes a character variable?",
      options: [
        "char letter = \"A\";",
        "char letter = 'A';",
        "char letter = A;",
        "char letter = (A);"
      ],
      correctAnswer: 1,
      explanation: "Character literals in C use single quotes (`'A'`), while strings use double quotes (`\"A\"`). The correct syntax is `char letter = 'A';`"
    },
    {
      id: "q6",
      question: "What is the purpose of the `sizeof` operator in C?",
      options: [
        "To check if a variable is initialized",
        "To return the size in bytes of a data type or variable",
        "To count the number of elements in an array",
        "To determine the memory address of a variable"
      ],
      correctAnswer: 1,
      explanation: "The `sizeof` operator returns the size in bytes of a data type or variable. For example, `sizeof(int)` typically returns 4 on most systems."
    },
    {
      id: "q7",
      question: "What happens if you forget to include `#include <stdio.h>` in your program?",
      options: [
        "The program will run but produce no output",
        "You'll get compilation errors when using printf() or scanf()",
        "Nothing, it's optional",
        "The program will crash at runtime"
      ],
      correctAnswer: 1,
      explanation: "Without `#include <stdio.h>`, the compiler won't know about `printf()` and `scanf()` functions, resulting in compilation errors like 'implicit declaration' or 'undeclared function'."
    },
    {
      id: "q8",
      question: "Which escape sequence represents a tab character?",
      options: [
        "\\t",
        "\\tab",
        "\\space",
        "\\indent"
      ],
      correctAnswer: 0,
      explanation: "The escape sequence `\\t` represents a horizontal tab character. When used in a string with `printf()`, it inserts a tab space."
    },
    {
      id: "q9",
      question: "What is the correct syntax to read a float value using scanf?",
      options: [
        "scanf(\"%f\", &variable);",
        "scanf(\"%d\", &variable);",
        "scanf(\"%c\", &variable);",
        "scanf(\"float\", &variable);"
      ],
      correctAnswer: 0,
      explanation: "To read a float value with `scanf()`, you use `scanf(\"%f\", &variable);`. The format specifier `%f` is for float, and `&variable` provides the address where the value should be stored."
    },
    {
      id: "q10",
      question: "What is the difference between `unsigned int` and `int`?",
      options: [
        "unsigned int can store negative numbers, int cannot",
        "unsigned int cannot store negative numbers, int can",
        "There is no difference",
        "unsigned int uses less memory"
      ],
      correctAnswer: 1,
      explanation: "An `unsigned int` can only store non-negative values (0 and positive numbers), while a regular `int` (which is signed by default) can store both positive and negative values. This means `unsigned int` has a higher maximum positive value."
    },
    {
      id: "q11",
      question: "What will `printf(\"%.1f\", 3.14159);` output?",
      options: [
        "3.14159",
        "3.1",
        "3.14",
        "3"
      ],
      correctAnswer: 1,
      explanation: "The format specifier `%.1f` prints a float with exactly 1 decimal place. So `3.14159` is rounded to `3.1` when printed."
    },
    {
      id: "q12",
      question: "Which compilation command is correct to compile a file named `program.c`?",
      options: [
        "gcc program.c -o program",
        "gcc -o program program.c",
        "Both of the above",
        "gcc compile program.c"
      ],
      correctAnswer: 2,
      explanation: "Both commands are correct. The `-o` flag specifies the output filename. The order of `-o output` and the source file doesn't matter: `gcc program.c -o program` and `gcc -o program program.c` both work."
    }
  ]
};

