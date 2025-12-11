import { Exercise } from '../../../data/lessonsData';

export const exercise_5_8: Exercise = {
  id: 5.8,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is the correct way to declare a string in C?",
      options: ["string str = \"Hello\";", "char str[] = \"Hello\";", "String str = \"Hello\";", "char* str = \"Hello\";"],
      correctAnswer: 1,
      explanation: "Strings in C are arrays of characters, so char str[] = \"Hello\"; is the correct declaration."
    },
    {
      id: "q2",
      question: "What does strlen() function return?",
      options: ["Size of the string array", "Length of the string excluding null terminator", "Length of the string including null terminator", "Number of words in the string"],
      correctAnswer: 1,
      explanation: "strlen() returns the number of characters in the string, not counting the null terminator."
    },
    {
      id: "q3",
      question: "What is the output of strcmp(\"Hello\", \"Hello\")?",
      options: ["1", "0", "-1", "Error"],
      correctAnswer: 1,
      explanation: "strcmp() returns 0 when the strings are equal."
    },
    {
      id: "q4",
      question: "Which function is used to copy strings safely?",
      options: ["strcpy()", "strncpy()", "memcpy()", "strcat()"],
      correctAnswer: 1,
      explanation: "strncpy() allows you to specify the maximum number of characters to copy, making it safer than strcpy()."
    },
    {
      id: "q5",
      question: "What does the following code do?\n\nint arr[5] = {1, 2, 3};",
      options: ["Creates array with values {1, 2, 3, 0, 0}", "Creates array with values {1, 2, 3, garbage, garbage}", "Compilation error", "Runtime error"],
      correctAnswer: 0,
      explanation: "Unspecified elements in partial initialization are automatically set to 0."
    },
    {
      id: "q6",
      question: "What is a 2D array in C?",
      options: ["Array of arrays", "Array of pointers", "Pointer to array", "Dynamic array"],
      correctAnswer: 0,
      explanation: "A 2D array in C is essentially an array of arrays."
    },
    {
      id: "q7",
      question: "Which of the following correctly accesses the element in the 2nd row, 3rd column of a 2D array 'matrix'?",
      options: ["matrix[2][3]", "matrix[1][2]", "matrix[3][2]", "matrix[2][2]"],
      correctAnswer: 1,
      explanation: "Array indices start from 0, so 2nd row is index 1 and 3rd column is index 2."
    },
    {
      id: "q8",
      question: "What is the purpose of the null terminator ('\\0') in C strings?",
      options: ["To indicate the start of the string", "To indicate the end of the string", "To store the string length", "To store the string type"],
      correctAnswer: 1,
      explanation: "The null terminator marks the end of a C string, allowing functions to know where the string ends."
    },
    {
      id: "q9",
      question: "Which function would you use to find the first occurrence of a character in a string?",
      options: ["strchr()", "strstr()", "strcmp()", "strcpy()"],
      correctAnswer: 0,
      explanation: "strchr() finds the first occurrence of a character in a string and returns a pointer to it."
    },
    {
      id: "q10",
      question: "What does the strstr() function do?",
      options: ["Compares two strings", "Copies one string to another", "Finds a substring within a string", "Concatenates two strings"],
      correctAnswer: 2,
      explanation: "strstr() searches for the first occurrence of a substring within a string."
    }
  ]
};
