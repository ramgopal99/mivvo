import { Exercise } from '../../../data/lessonsData';

export const exercise_9_9: Exercise = {
  id: 9.9,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is the main purpose of the C preprocessor?",
      options: ["To compile C code into machine code", "To process source code before compilation, handling macros and includes", "To link multiple object files together", "To optimize the generated machine code"],
      correctAnswer: 1,
      explanation: "The preprocessor runs before the actual compiler and transforms the source code by expanding macros, including files, and performing conditional compilation."
    },
    {
      id: "q2",
      question: "Which of these is a correct way to define a function-like macro?",
      options: ["#define SQUARE(x) x * x", "#define SQUARE(x) ((x) * (x))", "#define SQUARE x * x", "define SQUARE(x) ((x) * (x))"],
      correctAnswer: 1,
      explanation: "Function-like macros use the syntax #define MACRO_NAME(parameters) replacement_text. The second option correctly parenthesizes both the parameter and the entire expression."
    },
    {
      id: "q3",
      question: "What does #include <stdio.h> do?",
      options: ["Copies the contents of stdio.h into the source file", "Links the stdio.h library to the program", "Declares functions from stdio.h", "Compiles stdio.h separately"],
      correctAnswer: 0,
      explanation: "#include directives are replaced by the preprocessor with the entire contents of the specified file, effectively copying the file's content into the source."
    },
    {
      id: "q4",
      question: "Which directive should be used to conditionally compile code based on whether a macro is defined?",
      options: ["#if", "#ifdef", "#pragma", "#error"],
      correctAnswer: 1,
      explanation: "#ifdef checks if a macro is defined, while #if evaluates constant expressions."
    },
    {
      id: "q5",
      question: "What is the advantage of #pragma once over traditional include guards?",
      options: ["It's shorter to type", "It's handled by the compiler and faster", "It works with all compilers", "It allows multiple inclusions"],
      correctAnswer: 1,
      explanation: "#pragma once is handled directly by the compiler and can be faster than traditional include guards, plus it avoids potential macro name conflicts."
    },
    {
      id: "q6",
      question: "What does the ## operator do in macros?",
      options: ["Creates comments", "Concatenates tokens", "Stringifies tokens", "Evaluates expressions"],
      correctAnswer: 1,
      explanation: "The ## operator performs token pasting, combining two tokens into a single token during macro expansion."
    },
    {
      id: "q7",
      question: "Which of these macro definitions has a potential problem?",
      options: ["#define MAX(a,b) ((a) > (b) ? (a) : (b))", "#define SQUARE(x) x * x", "#define PI 3.14159", "#define DEBUG_PRINT printf"],
      correctAnswer: 1,
      explanation: "#define SQUARE(x) x * x lacks parentheses around the parameter and expression, which can cause operator precedence issues like SQUARE(3 + 1) becoming 3 + 1 * 3 + 1."
    },
    {
      id: "q8",
      question: "What is the purpose of #error directive?",
      options: ["To display warning messages", "To stop compilation with an error message", "To include error handling code", "To define error macros"],
      correctAnswer: 1,
      explanation: "#error causes the preprocessor to stop compilation and display the specified error message, useful for enforcing build requirements."
    },
    {
      id: "q9",
      question: "Which pattern should be used for multi-statement macros to avoid semicolon issues?",
      options: ["#define MACRO { statements }", "#define MACRO do { statements } while(0)", "#define MACRO (statements)", "#define MACRO statements"],
      correctAnswer: 1,
      explanation: "The do { statements } while(0) pattern ensures that multi-statement macros are treated as a single statement and work correctly in all control flow contexts."
    },
    {
      id: "q10",
      question: "What does __FILE__ and __LINE__ provide?",
      options: ["Current function name and parameters", "Current file name and line number", "Compilation date and time", "Compiler version information"],
      correctAnswer: 1,
      explanation: "__FILE__ expands to the current source file name as a string, and __LINE__ expands to the current line number as an integer."
    }
  ]
};

