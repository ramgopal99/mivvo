import { Exercise } from '../../../../data/lessonsData';

export const exercise_5_7: Exercise = {
  id: "5.7",
  title: 'Pointers & Memory Management MCQ',
  status: 'demo',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What does the '*' operator do when used in a declaration?",
      options: [
        "Multiplies two values",
        "Declares a pointer variable",
        "Dereferences a pointer",
        "Creates a reference"
      ],
      correctAnswer: 1,
      explanation: "In declarations, '*' indicates that the variable is a pointer. For example, 'int *ptr;' declares ptr as a pointer to int."
    },
    {
      id: "q2",
      question: "What is the output of this code?\n\n```c\n#include <stdio.h>\nint main() {\n    int x = 10;\n    int *ptr = &x;\n    printf(\"%d\", *ptr);\n    return 0;\n}\n```",
      options: [
        "Address of x",
        "10",
        "Garbage value",
        "Compilation error"
      ],
      correctAnswer: 1,
      explanation: "*ptr dereferences the pointer, giving us the value stored at the address that ptr points to, which is 10."
    },
    {
      id: "q3",
      question: "Which function is used to allocate memory dynamically?",
      options: [
        "malloc()",
        "alloc()",
        "new()",
        "create()"
      ],
      correctAnswer: 0,
      explanation: "malloc() (memory allocate) is the standard C function for dynamic memory allocation."
    },
    {
      id: "q4",
      question: "What happens if you forget to free dynamically allocated memory?",
      options: [
        "The program crashes immediately",
        "Memory leak occurs",
        "The memory is automatically freed",
        "The program becomes faster"
      ],
      correctAnswer: 1,
      explanation: "Forgetting to free dynamically allocated memory causes a memory leak, where memory cannot be reused by the program."
    },
    {
      id: "q5",
      question: "What is pointer arithmetic?",
      options: [
        "Mathematical operations on pointer values",
        "Adding or subtracting integers from pointers",
        "Multiplying two pointers",
        "Converting pointers to numbers"
      ],
      correctAnswer: 1,
      explanation: "Pointer arithmetic involves adding or subtracting integers from pointers to navigate through arrays or allocated memory."
    },
    {
      id: "q6",
      question: "Which of the following is true about NULL pointers?",
      options: [
        "NULL pointers point to valid memory",
        "Dereferencing NULL causes undefined behavior",
        "NULL is the same as zero",
        "NULL pointers can be used like regular pointers"
      ],
      correctAnswer: 1,
      explanation: "Dereferencing a NULL pointer causes undefined behavior, often resulting in program crashes."
    },
    {
      id: "q7",
      question: "What is the difference between malloc() and calloc()?",
      options: [
        "malloc allocates from stack, calloc from heap",
        "malloc initializes memory to zero, calloc doesn't",
        "malloc doesn't initialize memory, calloc initializes to zero",
        "They are identical in functionality"
      ],
      correctAnswer: 2,
      explanation: "malloc() allocates memory without initialization, while calloc() allocates and initializes all bytes to zero."
    },
    {
      id: "q8",
      question: "What does the '&' operator do?",
      options: [
        "Logical AND operation",
        "Bitwise AND operation",
        "Gets the address of a variable",
        "Dereferences a pointer"
      ],
      correctAnswer: 2,
      explanation: "The address-of operator (&) returns the memory address of a variable."
    },
    {
      id: "q9",
      question: "Which of these is a correct way to declare a pointer to a pointer?",
      options: [
        "int **ptr;",
        "int *ptr*;",
        "int ptr**;",
        "int &ptr;"
      ],
      correctAnswer: 0,
      explanation: "A pointer to a pointer is declared with double asterisks: int **ptr; (pointer to pointer to int)."
    },
    {
      id: "q10",
      question: "What is the correct way to free a dynamically allocated array?",
      options: [
        "free(array);",
        "delete array;",
        "dealloc(array);",
        "free(&array);"
      ],
      correctAnswer: 0,
      explanation: "Use free() with the same pointer that was returned by malloc/calloc. Don't use &array as that would be the address of the pointer variable."
    }
  ]
};
