import { Exercise } from '../../../data/lessonsData';

export const exercise_4_8: Exercise = {
  id: 4.8,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is a function prototype in C?",
      options: ["The first line of a function", "A declaration that tells the compiler about a function's interface", "The body of a function", "A function that creates other functions"],
      correctAnswer: 1,
      explanation: "A function prototype is a declaration that tells the compiler about a function's return type, name, and parameters without providing the implementation."
    },
    {
      id: "q2",
      question: "What is the difference between pass by value and pass by reference?",
      options: ["Pass by value copies the value, pass by reference passes the address", "Pass by value is faster than pass by reference", "Pass by reference copies the value, pass by value passes the address", "There is no difference"],
      correctAnswer: 0,
      explanation: "Pass by value creates a copy of the argument, while pass by reference (using pointers) allows the function to modify the original variable."
    },
    {
      id: "q3",
      question: "What does the 'void' return type indicate?",
      options: ["The function returns nothing", "The function returns a null value", "The function has no parameters", "The function is empty"],
      correctAnswer: 0,
      explanation: "'void' as a return type means the function does not return any value."
    },
    {
      id: "q4",
      question: "What is recursion?",
      options: ["A function that calls itself", "A function that calls other functions", "A function that returns void", "A function with no parameters"],
      correctAnswer: 0,
      explanation: "Recursion is when a function calls itself to solve a problem by breaking it down into smaller subproblems."
    },
    {
      id: "q5",
      question: "What is a base case in recursion?",
      options: ["The first recursive call", "The condition that stops the recursion", "The return value of the function", "The function parameters"],
      correctAnswer: 1,
      explanation: "A base case is the condition in a recursive function that stops the recursion and prevents infinite calls."
    },
    {
      id: "q6",
      question: "What happens if a recursive function has no base case?",
      options: ["It runs faster", "It causes a compilation error", "It causes infinite recursion and stack overflow", "It returns immediately"],
      correctAnswer: 2,
      explanation: "Without a base case, the recursive function will keep calling itself indefinitely, eventually causing a stack overflow."
    },
    {
      id: "q7",
      question: "What is the scope of a local variable in a function?",
      options: ["The entire program", "The entire file", "Only within the function where it's declared", "Only within the block where it's declared"],
      correctAnswer: 2,
      explanation: "Local variables in a function are only accessible within that function."
    },
    {
      id: "q8",
      question: "What is a static variable in a function?",
      options: ["A variable that cannot be modified", "A variable that retains its value between function calls", "A variable that is only accessible within the function", "A global variable"],
      correctAnswer: 1,
      explanation: "A static variable inside a function retains its value between function calls and is initialized only once."
    },
    {
      id: "q9",
      question: "Which of the following is NOT a valid return type for a function?",
      options: ["int", "float", "void", "function"],
      correctAnswer: 3,
      explanation: "Functions cannot return other functions in C. Valid return types include int, float, void, pointers, etc."
    },
    {
      id: "q10",
      question: "What is tail recursion?",
      options: ["Recursion that calls itself at the beginning", "Recursion that calls itself at the end", "Recursion with multiple base cases", "Recursion that doesn't use parameters"],
      correctAnswer: 1,
      explanation: "Tail recursion is when the recursive call is the last operation in the function, which can be optimized by some compilers."
    }
  ]
};
