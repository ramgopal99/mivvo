import { Exercise } from '../../../../data/lessonsData';

export const exercise_1_3: Exercise = {
  id: "1.3",
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Who created the C++ programming language?",
      options: ["Dennis Ritchie", "Bjarne Stroustrup", "James Gosling", "Guido van Rossum"],
      correctAnswer: 1,
      explanation: "Bjarne Stroustrup created C++ in 1979 at Bell Labs. He designed it as an extension of the C programming language with object-oriented features."
    },
    {
      id: "q2",
      question: "What does 'C++' mean literally?",
      options: ["C enhanced", "C plus plus", "C incremented by 1", "C advanced"],
      correctAnswer: 2,
      explanation: "'C++' is a play on the C increment operator (++). It means 'C incremented by 1', suggesting it's one step beyond C."
    },
    {
      id: "q3",
      question: "In which year was C++ first commercially released?",
      options: ["1979", "1983", "1985", "1998"],
      correctAnswer: 2,
      explanation: "C++ was first commercially released in 1985. The language was initially called 'C with Classes' before being renamed to C++."
    },
    {
      id: "q4",
      question: "Which of the following is NOT a primary use case for C++?",
      options: ["Game development", "System programming", "Web development", "Embedded systems"],
      correctAnswer: 2,
      explanation: "While C++ can be used for web development (with frameworks like Wt or through CGI), it's not considered a primary use case. JavaScript, Python, and other languages are more commonly used for web development."
    },
    {
      id: "q5",
      question: "Which compiler is commonly used on macOS for C++ development?",
      options: ["MSVC", "GCC", "Clang", "MinGW"],
      correctAnswer: 2,
      explanation: "Clang is the default C++ compiler on macOS, especially when using Xcode Command Line Tools. It's also available on other platforms and is known for its fast compilation and detailed error messages."
    },
    {
      id: "q6",
      question: "What is the correct file extension for C++ source files?",
      options: [".c", ".cc", ".cpp", ".cxx"],
      correctAnswer: 2,
      explanation: ".cpp is the most common and widely recognized file extension for C++ source files. Other extensions like .cc, .cxx are also valid but less common."
    },
    {
      id: "q7",
      question: "Which build system is cross-platform and widely used in C++ projects?",
      options: ["Make", "CMake", "Ninja", "Bazel"],
      correctAnswer: 1,
      explanation: "CMake is a cross-platform build system that generates build files for different platforms and compilers. It's widely used in C++ projects for its flexibility and cross-platform nature."
    }
  ]
};