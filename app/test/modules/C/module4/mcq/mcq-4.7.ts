import { Exercise } from '../../../../data/lessonsData';

export const exercise_4_7: Exercise = {
  id: "4.7",
  title: 'Functions & Arrays MCQ',
  status: 'demo',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is the correct way to declare a function that takes two integers and returns their sum?",
      options: [
        "int sum(int a, int b) { return a + b; }",
        "sum(int a, int b) { return a + b; }",
        "int sum(a, b) { return a + b; }",
        "function sum(int a, int b) { return a + b; }"
      ],
      correctAnswer: 0,
      explanation: "The correct function declaration includes return type (int), function name (sum), and parameter types (int a, int b)."
    },
    {
      id: "q2",
      question: "How do you pass an array to a function in C?",
      options: [
        "By value (copies the entire array)",
        "By reference (passes the address)",
        "By using the array name directly",
        "Arrays cannot be passed to functions"
      ],
      correctAnswer: 1,
      explanation: "Arrays are passed by reference in C. The function receives the address of the first element."
    },
    {
      id: "q3",
      question: "What is the output of this code?\n\n```c\n#include <stdio.h>\nint main() {\n    int arr[3] = {1, 2, 3};\n    printf(\"%d\", arr[3]);\n    return 0;\n}\n```",
      options: [
        "3",
        "Garbage value",
        "0",
        "Compilation error"
      ],
      correctAnswer: 1,
      explanation: "Array indices start from 0. arr[3] is out of bounds for an array of size 3 (valid indices: 0, 1, 2), so it accesses undefined memory."
    },
    {
      id: "q4",
      question: "Which of the following correctly declares a 2D array?",
      options: [
        "int matrix[3][4];",
        "int matrix[3, 4];",
        "int matrix[12];",
        "int matrix[][];"
      ],
      correctAnswer: 0,
      explanation: "2D arrays are declared with two sets of square brackets, specifying rows and columns: [rows][columns]."
    },
    {
      id: "q5",
      question: "What does the 'return' statement do in a function?",
      options: [
        "Ends the program execution",
        "Exits the current function and returns control to caller",
        "Skips to the next iteration in a loop",
        "Prints a value to the console"
      ],
      correctAnswer: 1,
      explanation: "The return statement exits the current function and optionally returns a value to the calling function."
    },
    {
      id: "q6",
      question: "How do you initialize an array with all elements set to 0?",
      options: [
        "int arr[5] = {0, 0, 0, 0, 0};",
        "int arr[5] = {0};",
        "int arr[5] = {};",
        "memset(arr, 0, sizeof(arr));"
      ],
      correctAnswer: 1,
      explanation: "In C, when you provide fewer initializers than array size, remaining elements are automatically set to 0."
    },
    {
      id: "q7",
      question: "What is function prototyping?",
      options: [
        "Writing the function implementation",
        "Declaring the function signature before its definition",
        "Calling a function",
        "Returning from a function"
      ],
      correctAnswer: 1,
      explanation: "Function prototyping is declaring the function signature (return type, name, parameters) before the function is defined or called."
    },
    {
      id: "q8",
      question: "Which of the following is true about multidimensional arrays?",
      options: [
        "They are stored in row-major order",
        "They are stored in column-major order",
        "Memory is allocated dynamically",
        "They cannot be passed to functions"
      ],
      correctAnswer: 0,
      explanation: "Multidimensional arrays in C are stored in row-major order, meaning elements of each row are stored contiguously in memory."
    },
    {
      id: "q9",
      question: "What happens when you call a function without declaring it first?",
      options: [
        "The program crashes",
        "The compiler assumes int return type and may give warnings",
        "The function is automatically created",
        "Nothing happens"
      ],
      correctAnswer: 1,
      explanation: "In older C standards, undeclared functions were assumed to return int, but modern compilers require function declarations."
    },
    {
      id: "q10",
      question: "How do you find the size of an array parameter in a function?",
      options: [
        "Use sizeof() operator",
        "Arrays decay to pointers, so you need a separate size parameter",
        "Use strlen() function",
        "Arrays maintain their size information"
      ],
      correctAnswer: 1,
      explanation: "When passed to functions, arrays decay to pointers, losing size information. You must pass the size as a separate parameter."
    }
  ]
};
