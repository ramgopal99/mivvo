import { Exercise } from '../../../data/lessonsData';

export const exercise_1_3: Exercise = {
  id: 1.3,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Who created the C programming language?",
      options: ["James Gosling", "Dennis Ritchie", "Bjarne Stroustrup", "Guido van Rossum"],
      correctAnswer: 1,
      explanation: "C was created by Dennis Ritchie at Bell Labs in the early 1970s as part of the UNIX operating system development."
    },
    {
      id: "q2",
      question: "In which year was the C programming language first released?",
      options: ["1969", "1972", "1978", "1989"],
      correctAnswer: 1,
      explanation: "C was first released in 1972 by Dennis Ritchie at Bell Labs."
    },
    {
      id: "q3",
      question: "What is the correct way to declare the main function in C?",
      options: ["void main()", "int main(void)", "main()", "int main(int argc, char *argv[])"],
      correctAnswer: 1,
      explanation: "The standard way to declare main in C is 'int main(void)' for programs that don't use command line arguments."
    },
    {
      id: "q4",
      question: "Which of the following is NOT a valid C data type?",
      options: ["int", "float", "string", "char"],
      correctAnswer: 2,
      explanation: "C does not have a built-in 'string' data type. Strings are represented as arrays of characters (char arrays)."
    },
    {
      id: "q5",
      question: "What does the 'printf' function do in C?",
      options: ["Read input from keyboard", "Print formatted output to screen", "Calculate mathematical expressions", "Allocate memory"],
      correctAnswer: 1,
      explanation: "'printf' is used to print formatted output to the standard output (usually the screen)."
    },
    {
      id: "q6",
      question: "Which header file must be included to use the 'printf' function?",
      options: ["<stdlib.h>", "<stdio.h>", "<string.h>", "<math.h>"],
      correctAnswer: 1,
      explanation: "'printf' is declared in <stdio.h> (standard input/output header)."
    },
    {
      id: "q7",
      question: "What is the purpose of the 'return 0;' statement at the end of main()?",
      options: ["Exit the program", "Return success status to the operating system", "Free memory", "Close all files"],
      correctAnswer: 1,
      explanation: "Returning 0 from main() indicates successful program execution to the operating system."
    },
    {
      id: "q8",
      question: "Which symbol is used for single-line comments in C?",
      options: ["//", "/* */", "#", "--"],
      correctAnswer: 0,
      explanation: "C supports single-line comments using '//' (this was added in C99 standard)."
    },
    {
      id: "q9",
      question: "What does the 'include' directive do in C?",
      options: ["Executes external programs", "Links to external libraries", "Includes header files with function declarations", "Imports data from files"],
      correctAnswer: 2,
      explanation: "#include tells the preprocessor to include the contents of the specified header file."
    },
    {
      id: "q10",
      question: "Which of these is the correct way to declare a variable in C?",
      options: ["variable int x;", "int x variable;", "int x;", "x int;"],
      correctAnswer: 2,
      explanation: "In C, variables are declared with the data type first, followed by the variable name: 'int x;'"
    }
  ]
};
