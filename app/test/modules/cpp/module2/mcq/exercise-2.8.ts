import { Exercise } from '../../../../data/lessonsData';

export const exercise_2_8: Exercise = {
  id: "2.8",
  title: 'MCQ - I/O, Namespaces & Preprocessor',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is the correct way to read a full line of text including spaces in C++?",
      options: ["cin >> line;", "getline(cin, line);", "cin.getline(line);", "readline(cin, line);"],
      correctAnswer: 1,
      explanation: "std::getline(cin, line) reads an entire line including spaces, while cin >> stops at the first whitespace."
    },
    {
      id: "q2",
      question: "What does 'using namespace std;' do?",
      options: ["Includes the standard library", "Brings all std namespace items into global scope", "Declares a new namespace", "Imports a header file"],
      correctAnswer: 1,
      explanation: "using namespace std; brings all items from the std namespace into the current scope, allowing unqualified access to standard library functions."
    },
    {
      id: "q3",
      question: "Which preprocessor directive is used to include header files?",
      options: ["#define", "#include", "#ifdef", "#pragma"],
      correctAnswer: 1,
      explanation: "#include is used to include header files. #define creates macros, #ifdef is for conditional compilation, #pragma gives compiler-specific instructions."
    },
    {
      id: "q4",
      question: "What is the purpose of include guards in header files?",
      options: ["To prevent multiple inclusion of the same header", "To encrypt header files", "To compress header files", "To validate header syntax"],
      correctAnswer: 0,
      explanation: "Include guards prevent the same header file from being included multiple times, which would cause redefinition errors."
    },
    {
      id: "q5",
      question: "Which of the following is a predefined macro in C++?",
      options: ["__cplusplus", "__version__", "__compiler__", "__system__"],
      correctAnswer: 0,
      explanation: "__cplusplus is a predefined macro that indicates the C++ standard version. The others are not standard predefined macros."
    },
    {
      id: "q6",
      question: "What does the #define directive do?",
      options: ["Includes a file", "Defines a macro or constant", "Starts conditional compilation", "Undefines a macro"],
      correctAnswer: 1,
      explanation: "#define creates macros or constants that are replaced by the preprocessor before compilation."
    },
    {
      id: "q7",
      question: "Which is generally considered bad practice?",
      options: ["Using const for constants", "Using #include <iostream>", "Using 'using namespace std;' globally", "Using meaningful variable names"],
      correctAnswer: 2,
      explanation: "Using 'using namespace std;' globally can cause name conflicts and hide which standard library functions are being used."
    }
  ]
};