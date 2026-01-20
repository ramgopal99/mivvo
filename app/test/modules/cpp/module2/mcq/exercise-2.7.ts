import { Exercise } from '../../../../data/lessonsData';

export const exercise_2_7: Exercise = {
  id: "2.7",
  title: 'MCQ - Variables & Data Types',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which of the following is NOT a valid C++ data type?",
      options: ["int", "double", "string", "real"],
      correctAnswer: 3,
      explanation: "C++ does not have a built-in 'real' data type. 'string' is a class from the standard library (std::string), not a built-in type."
    },
    {
      id: "q2",
      question: "What is the size of an int variable in C++?",
      options: ["Always 4 bytes", "Always 8 bytes", "Platform dependent", "Always 2 bytes"],
      correctAnswer: 2,
      explanation: "The size of int is platform dependent. On most modern systems it's 4 bytes (32 bits), but it can be 2 bytes on some embedded systems or 8 bytes on some architectures."
    },
    {
      id: "q3",
      question: "Which of the following variable declarations is correct?",
      options: ["int x, y, z;", "int x y z;", "int x,y,z", "int x; y; z;"],
      correctAnswer: 0,
      explanation: "Multiple variables of the same type can be declared in a single statement separated by commas. The semicolon at the end is required."
    },
    {
      id: "q4",
      question: "What is the correct way to declare a constant in C++?",
      options: ["constant int x = 5;", "const int x = 5;", "int const x = 5;", "Both b and c"],
      correctAnswer: 3,
      explanation: "Both 'const int x = 5;' and 'int const x = 5;' are correct. The const keyword can appear before or after the type."
    },
    {
      id: "q5",
      question: "Which operator has the highest precedence?",
      options: ["+", "-", "*", "()"],
      correctAnswer: 3,
      explanation: "Parentheses () have the highest precedence in C++, followed by unary operators, then multiplication/division, then addition/subtraction."
    },
    {
      id: "q6",
      question: "What does the sizeof operator return?",
      options: ["The value of a variable", "The memory address", "The size in bytes", "The type name"],
      correctAnswer: 2,
      explanation: "The sizeof operator returns the size of a variable or type in bytes as a size_t value."
    },
    {
      id: "q7",
      question: "Which of these is a valid floating-point literal?",
      options: ["3.14159", "3,14159", "3.14159f", "All of the above"],
      correctAnswer: 3,
      explanation: "All are valid: 3.14159 (double), 3.14159f (float). The comma notation is not valid in C++."
    }
  ]
};