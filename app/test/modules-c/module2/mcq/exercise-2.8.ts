import { Exercise } from '../../../data/lessonsData';

export const exercise_2_8: Exercise = {
  id: 2.8,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which of the following is the correct way to declare a variable in C?",
      options: ["variable int x;", "int x variable;", "int x;", "x as int;"],
      correctAnswer: 2,
      explanation: "In C, variables are declared with the data type first, followed by the variable name and semicolon: 'int x;'"
    },
    {
      id: "q2",
      question: "What is the size of an int data type in C (on most 32-bit systems)?",
      options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"],
      correctAnswer: 2,
      explanation: "On most 32-bit systems, int is typically 4 bytes (32 bits) long."
    },
    {
      id: "q3",
      question: "Which format specifier is used to print a floating-point number in printf?",
      options: ["%d", "%c", "%f", "%s"],
      correctAnswer: 2,
      explanation: "%f is used for float and double values in printf statements."
    },
    {
      id: "q4",
      question: "What does the scanf function return?",
      options: ["The input value", "Number of successfully read items", "Nothing (void)", "An error code"],
      correctAnswer: 1,
      explanation: "scanf returns the number of input items that were successfully read and assigned to variables."
    },
    {
      id: "q5",
      question: "Which operator is used for addition in C?",
      options: ["-", "*", "+", "="],
      correctAnswer: 2,
      explanation: "The + operator is used for addition in C."
    },
    {
      id: "q6",
      question: "What is the result of 10 % 3 in C?",
      options: ["3", "3.33", "1", "0"],
      correctAnswer: 2,
      explanation: "The modulus operator % returns the remainder of division: 10 divided by 3 is 9 with remainder 1."
    },
    {
      id: "q7",
      question: "Which of these creates a constant in C?",
      options: ["int const PI = 3.14;", "const int PI = 3.14;", "Both are correct", "Neither is correct"],
      correctAnswer: 2,
      explanation: "Both 'int const PI = 3.14;' and 'const int PI = 3.14;' are valid ways to declare a constant integer."
    },
    {
      id: "q8",
      question: "What is the correct way to declare a character variable?",
      options: ["char x = 'A';", "character x = 'A';", "char x = \"A\";", "string x = 'A';"],
      correctAnswer: 0,
      explanation: "Characters are declared with char and use single quotes: char x = 'A';"
    },
    {
      id: "q9",
      question: "Which statement about type conversion is correct?",
      options: ["Implicit conversion never loses data", "Explicit casting is done with (type)", "Float to int conversion always rounds up", "Type conversion is not possible in C"],
      correctAnswer: 1,
      explanation: "Explicit type casting in C is done using the syntax (type)expression, like (int)3.14"
    },
    {
      id: "q10",
      question: "What does the ++ operator do?",
      options: ["Multiplies by 2", "Adds 1 to the variable", "Subtracts 1 from the variable", "Divides by 2"],
      correctAnswer: 1,
      explanation: "The increment operator ++ adds 1 to the value of the variable."
    }
  ]
};
