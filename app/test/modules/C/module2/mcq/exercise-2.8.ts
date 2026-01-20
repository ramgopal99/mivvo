import { Exercise } from '../../../../data/lessonsData';

export const exercise_2_8: Exercise = {
  id: "2.8",
  title: 'MCQ',
  status: 'demo',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is the purpose of the `#include <stdio.h>` directive in a C program?",
      options: [
        "It defines the main function",
        "It includes the Standard Input/Output library",
        "It declares all variables",
        "It initializes the program"
      ],
      correctAnswer: 1,
      explanation: "The `#include <stdio.h>` directive includes the Standard Input/Output library, which provides functions like `printf()` and `scanf()` for input/output operations."
    },
    {
      id: "q2",
      question: "Which function is the entry point of every C program?",
      options: [
        "start()",
        "begin()",
        "main()",
        "entry()"
      ],
      correctAnswer: 2,
      explanation: "The `main()` function is the entry point of every C program. Execution begins here when the program runs."
    },
    {
      id: "q3",
      question: "What does `return 0;` in the main function indicate?",
      options: [
        "The program has an error",
        "The program completed successfully",
        "The program needs to restart",
        "The program returned to the beginning"
      ],
      correctAnswer: 1,
      explanation: "In C, `return 0;` from `main()` indicates successful program execution. By convention, 0 means success and non-zero values indicate errors."
    },
    {
      id: "q4",
      question: "What is the correct way to print a newline in C?",
      options: [
        "\\n",
        "/n",
        "newline",
        "\\newline"
      ],
      correctAnswer: 0,
      explanation: "The escape sequence `\\n` represents a newline character in C. When used in a string, it moves the cursor to the beginning of the next line."
    },
    {
      id: "q5",
      question: "Which of the following is a valid variable declaration in C?",
      options: [
        "int 2count;",
        "int count-2;",
        "int count_2;",
        "int count 2;"
      ],
      correctAnswer: 2,
      explanation: "Valid C variable names can contain letters, digits, and underscores, but cannot start with a digit, contain spaces, or use hyphens. `count_2` follows all naming rules."
    },
    {
      id: "q6",
      question: "What is the size of an `int` variable on most modern 32-bit systems?",
      options: [
        "1 byte",
        "2 bytes",
        "4 bytes",
        "8 bytes"
      ],
      correctAnswer: 2,
      explanation: "On most modern systems, an `int` is 4 bytes (32 bits) in size. The actual size can vary between platforms but 4 bytes is standard on 32-bit and 64-bit systems."
    },
    {
      id: "q7",
      question: "Which data type should you use for storing decimal numbers like 3.14?",
      options: [
        "int",
        "char",
        "float",
        "bool"
      ],
      correctAnswer: 2,
      explanation: "The `float` data type is used for storing single-precision floating-point numbers (decimal numbers). For higher precision, you can use `double`."
    },
    {
      id: "q8",
      question: "What is the format specifier for printing an integer variable with printf?",
      options: [
        "%i",
        "%d",
        "%int",
        "%integer"
      ],
      correctAnswer: 1,
      explanation: "The format specifier `%d` is used to print integer values with `printf()`. `%i` also works for integers, but `%d` is more commonly used."
    },
    {
      id: "q9",
      question: "How do you read an integer from the user using scanf?",
      options: [
        "scanf(\"%d\", &variable);",
        "scanf(\"%d\", variable);",
        "scanf(\"integer\", &variable);",
        "scanf(\"%i\", variable);"
      ],
      correctAnswer: 0,
      explanation: "To read an integer with `scanf()`, you use `scanf(\"%d\", &variable);`. The `&` operator is required to pass the address of the variable, and `%d` is the format specifier for integers."
    },
    {
      id: "q10",
      question: "What happens if you use a variable before initializing it in C?",
      options: [
        "It will always be 0",
        "It will contain a garbage/undefined value",
        "It will cause a compilation error",
        "It will be automatically initialized to NULL"
      ],
      correctAnswer: 1,
      explanation: "Uninitialized variables in C contain garbage values (whatever was in that memory location before). Unlike some languages, C does not automatically initialize variables to 0, which can lead to unpredictable behavior."
    }
  ]
};

