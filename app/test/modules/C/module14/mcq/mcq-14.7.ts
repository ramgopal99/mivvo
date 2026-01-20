import { Exercise } from '../../../../data/lessonsData';

export const exercise_14_7: Exercise = {
  id: "14.7",
  title: 'Advanced C Features MCQs',
  status: 'demo',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which preprocessor directive is used to prevent multiple inclusion of header files?",
      options: [
        "#define",
        "#ifndef",
        "#pragma once",
        "#include guard"
      ],
      correctAnswer: 2,
      explanation: "#pragma once is a modern way to prevent multiple inclusion of header files, supported by most compilers."
    },
    {
      id: "q2",
      question: "What does the restrict keyword indicate in C?",
      options: [
        "The pointer is constant",
        "The pointer is volatile",
        "The pointer has no aliases",
        "The pointer is aligned"
      ],
      correctAnswer: 2,
      explanation: "restrict tells the compiler that the pointer is the only way to access the object it points to, enabling optimizations."
    },
    {
      id: "q3",
      question: "Which GCC attribute forces a function to never return?",
      options: [
        "__attribute__((noreturn))",
        "__attribute__((noinline))",
        "__attribute__((always_inline))",
        "__attribute__((pure))"
      ],
      correctAnswer: 0,
      explanation: "__attribute__((noreturn)) tells the compiler that the function never returns, allowing optimizations."
    },
    {
      id: "q4",
      question: "What does _Static_assert do in C11?",
      options: [
        "Checks assertions at runtime",
        "Checks assertions at compile time",
        "Creates dynamic assertions",
        "Asserts for static variables only"
      ],
      correctAnswer: 1,
      explanation: "_Static_assert performs compile-time assertion checking, failing compilation if the condition is false."
    },
    {
      id: "q5",
      question: "Which built-in function counts the number of set bits in an integer?",
      options: [
        "__builtin_clz",
        "__builtin_popcount",
        "__builtin_ctz",
        "__builtin_parity"
      ],
      correctAnswer: 1,
      explanation: "__builtin_popcount returns the number of 1 bits in the binary representation of the argument."
    },
    {
      id: "q6",
      question: "What is the purpose of _Generic in C11?",
      options: [
        "Generic programming support",
        "Type-generic expressions",
        "Template metaprogramming",
        "Dynamic typing"
      ],
      correctAnswer: 1,
      explanation: "_Generic provides type-generic expressions, allowing different behavior based on the type of an expression."
    },
    {
      id: "q7",
      question: "Which atomic memory order provides sequential consistency?",
      options: [
        "memory_order_relaxed",
        "memory_order_acquire",
        "memory_order_seq_cst",
        "memory_order_release"
      ],
      correctAnswer: 2,
      explanation: "memory_order_seq_cst provides sequential consistency, the strongest memory ordering guarantee."
    },
    {
      id: "q8",
      question: "What does __builtin_expect do?",
      options: [
        "Forces function inlining",
        "Provides branch prediction hints",
        "Checks for null pointers",
        "Optimizes memory allocation"
      ],
      correctAnswer: 1,
      explanation: "__builtin_expect provides hints to the compiler about likely/unlikely branch outcomes for optimization."
    },
    {
      id: "q9",
      question: "Which keyword creates thread-local storage in C11?",
      options: [
        "thread_local",
        "_Thread_local",
        "__thread",
        "tls"
      ],
      correctAnswer: 1,
      explanation: "_Thread_local (or thread_local in C23) creates thread-local storage variables."
    },
    {
      id: "q10",
      question: "What is the purpose of X-macros in C?",
      options: [
        "Execute macros in parallel",
        "Create cross-platform code",
        "Generate repetitive code patterns",
        "Optimize macro expansion"
      ],
      correctAnswer: 2,
      explanation: "X-macros use preprocessor tricks to generate repetitive code patterns, reducing duplication and maintenance."
    }
  ]
};
