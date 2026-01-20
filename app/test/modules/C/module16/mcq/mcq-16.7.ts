import { Exercise } from '../../../../data/lessonsData';

export const exercise_16_7: Exercise = {
  id: "16.7",
  title: 'C Advanced Concepts MCQs',
  status: 'demo',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which design pattern uses function pointers to provide different behaviors for the same interface?",
      options: [
        "Factory Pattern",
        "Strategy Pattern",
        "Observer Pattern",
        "Singleton Pattern"
      ],
      correctAnswer: 1,
      explanation: "Strategy Pattern allows selecting an algorithm at runtime using function pointers as the strategy interface."
    },
    {
      id: "q2",
      question: "What is the primary benefit of using arena allocators?",
      options: [
        "Thread safety",
        "Memory defragmentation",
        "Fast allocation/deallocation",
        "Type safety"
      ],
      correctAnswer: 2,
      explanation: "Arena allocators provide very fast allocation by simply incrementing a pointer, with bulk deallocation."
    },
    {
      id: "q3",
      question: "Which GCC attribute tells the compiler that a function never returns?",
      options: [
        "__attribute__((noreturn))",
        "__attribute__((noinline))",
        "__attribute__((always_inline))",
        "__attribute__((pure))"
      ],
      correctAnswer: 0,
      explanation: "__attribute__((noreturn)) informs the compiler that the function never returns, enabling optimizations."
    },
    {
      id: "q4",
      question: "What does the assert() macro do in release builds when NDEBUG is defined?",
      options: [
        "Still checks the condition",
        "Logs assertion failures",
        "Becomes a no-op",
        "Calls abort()"
      ],
      correctAnswer: 2,
      explanation: "When NDEBUG is defined, assert() becomes a no-op, removing all assertion overhead in release builds."
    },
    {
      id: "q5",
      question: "Which memory allocation strategy is best for objects that are frequently allocated and freed?",
      options: [
        "Arena allocator",
        "Pool allocator",
        "System malloc/free",
        "Static allocation"
      ],
      correctAnswer: 1,
      explanation: "Pool allocators excel with frequent allocation/deallocation of same-sized objects by reusing memory blocks."
    },
    {
      id: "q6",
      question: "What is the purpose of __builtin_expect in GCC?",
      options: [
        "Force function inlining",
        "Provide branch prediction hints",
        "Check for null pointers",
        "Optimize memory allocation"
      ],
      correctAnswer: 1,
      explanation: "__builtin_expect helps the compiler optimize branch prediction by indicating likely/unlikely code paths."
    },
    {
      id: "q7",
      question: "Which pattern uses callbacks to notify multiple observers of state changes?",
      options: [
        "Factory Pattern",
        "Observer Pattern",
        "Strategy Pattern",
        "Command Pattern"
      ],
      correctAnswer: 1,
      explanation: "Observer Pattern maintains a list of observers and notifies them when the subject's state changes."
    },
    {
      id: "q8",
      question: "What does the restrict keyword indicate to the compiler?",
      options: [
        "The pointer is constant",
        "The pointer is volatile",
        "No other pointer aliases this memory",
        "The pointer is aligned"
      ],
      correctAnswer: 2,
      explanation: "restrict tells the compiler that the pointer is the only way to access the pointed-to memory, enabling optimizations."
    },
    {
      id: "q9",
      question: "Which debugging technique helps detect memory leaks at runtime?",
      options: [
        "Static analysis",
        "Memory tracking wrappers",
        "Unit testing",
        "Code review"
      ],
      correctAnswer: 1,
      explanation: "Memory tracking wrappers around malloc/free can track allocations and detect leaks at program exit."
    },
    {
      id: "q10",
      question: "What is the benefit of using function pointers for implementing design patterns in C?",
      options: [
        "Automatic memory management",
        "Runtime polymorphism",
        "Compile-time optimization",
        "Type safety"
      ],
      correctAnswer: 1,
      explanation: "Function pointers enable runtime polymorphism in C, allowing different behaviors for the same interface."
    }
  ]
};
