import { Exercise } from '../../../../data/lessonsData';

export const exercise_14_5: Exercise = {
  id: 14.5,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is the most important component of a recursive function?",
      options: ["Loop statement", "Base case", "Global variable", "Exception handler"],
      correctAnswer: 1,
      explanation: "The base case is crucial in recursion as it prevents infinite recursion by providing a stopping condition."
    },
    {
      id: "q2",
      question: "What happens if a recursive function doesn't have a base case?",
      options: ["It runs faster", "It uses less memory", "It causes infinite recursion", "It returns None"],
      correctAnswer: 2,
      explanation: "Without a base case, the function will keep calling itself indefinitely, leading to infinite recursion and eventually a stack overflow."
    },
    {
      id: "q3",
      question: "Which of the following is NOT a characteristic of recursion?",
      options: ["Function calls itself", "Uses stack memory", "More efficient than iteration", "Breaks problem into smaller subproblems"],
      correctAnswer: 2,
      explanation: "Recursion is often less efficient than iteration due to function call overhead and stack usage."
    },
    {
      id: "q4",
      question: "What is tail recursion?",
      options: ["Recursion that never ends", "Recursion where the recursive call is the last operation", "Recursion with multiple base cases", "Recursion that uses loops"],
      correctAnswer: 1,
      explanation: "Tail recursion occurs when the recursive call is the last operation performed in the function, allowing some compilers to optimize it."
    },
    {
      id: "q5",
      question: "What is the time complexity of a recursive function that makes two recursive calls?",
      options: ["O(n)", "O(n²)", "O(2^n)", "O(log n)"],
      correctAnswer: 2,
      explanation: "A recursive function with two recursive calls typically has exponential time complexity O(2^n)."
    },
    {
      id: "q6",
      question: "Which data structure is implicitly used in recursion?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correctAnswer: 1,
      explanation: "Recursion uses the call stack to keep track of function calls and their states."
    },
    {
      id: "q7",
      question: "What is direct recursion?",
      options: ["Function calls another function", "Function calls itself", "Function calls two other functions", "Function never calls itself"],
      correctAnswer: 1,
      explanation: "Direct recursion occurs when a function calls itself directly."
    },
    {
      id: "q8",
      question: "What is the maximum depth of recursion in Python by default?",
      options: ["100", "1000", "10000", "Unlimited"],
      correctAnswer: 1,
      explanation: "Python has a default recursion limit of 1000 to prevent stack overflow."
    },
    {
      id: "q9",
      question: "Which problem is typically solved using recursion?",
      options: ["Finding maximum in sorted array", "Computing factorial", "Linear search", "Array reversal with loop"],
      correctAnswer: 1,
      explanation: "Factorial is a classic example of a problem that can be elegantly solved using recursion."
    },
    {
      id: "q10",
      question: "What is memoization in the context of recursion?",
      options: ["Converting recursive to iterative", "Caching results of expensive function calls", "Increasing recursion depth", "Reducing base cases"],
      correctAnswer: 1,
      explanation: "Memoization is a technique to cache the results of expensive recursive function calls to avoid redundant calculations."
    },
    {
      id: "q11",
      question: "Which traversal algorithm is naturally recursive?",
      options: ["Breadth-first search", "Depth-first search", "Linear search", "Binary search"],
      correctAnswer: 1,
      explanation: "Depth-first search algorithms like tree traversals are naturally implemented recursively."
    },
    {
      id: "q12",
      question: "What is the space complexity of recursive factorial function?",
      options: ["O(1)", "O(n)", "O(n²)", "O(2^n)"],
      correctAnswer: 1,
      explanation: "The recursive factorial function uses O(n) space on the call stack."
    },
    {
      id: "q13",
      question: "Which of these can be optimized using tail recursion?",
      options: ["Tree traversal", "Factorial calculation", "Fibonacci sequence", "Matrix multiplication"],
      correctAnswer: 1,
      explanation: "Factorial calculation can be written in tail-recursive form, allowing compiler optimization."
    },
    {
      id: "q14",
      question: "What is indirect recursion?",
      options: ["Function calls itself twice", "Two functions call each other", "Function calls its parent", "Function calls without base case"],
      correctAnswer: 1,
      explanation: "Indirect recursion occurs when function A calls function B, and function B calls function A."
    },
    {
      id: "q15",
      question: "Which recursive algorithm has the best time complexity for searching?",
      options: ["Linear search", "Binary search", "Exponential search", "Fibonacci search"],
      correctAnswer: 1,
      explanation: "Binary search has O(log n) time complexity, making it the most efficient recursive search algorithm."
    }
  ]
};
