import { Exercise } from '../../../data/lessonsData';

export const exercise_14_1: Exercise = {
  id: 14.1,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is the primary purpose of the base case in a recursive function?",
      options: ["To make the function run faster", "To prevent infinite recursion and provide a stopping condition", "To handle exceptions", "To initialize variables"],
      correctAnswer: 1,
      explanation: "The base case stops the recursion by providing a condition where the function returns without making another recursive call, preventing infinite recursion."
    },
    {
      id: "q2",
      question: "Which of the following is NOT a component of recursion?",
      options: ["Base case", "Recursive case", "Loop counter", "Stack memory"],
      correctAnswer: 2,
      explanation: "Loop counter is used in iteration, not recursion. Recursion uses base case, recursive case, and stack memory for function calls."
    },
    {
      id: "q3",
      question: "What will happen if a recursive function has no base case?",
      options: ["It will run faster", "It will cause a compilation error", "It will cause a StackOverflowError", "It will return null"],
      correctAnswer: 2,
      explanation: "Without a base case, the function will keep calling itself infinitely until the call stack overflows, causing a StackOverflowError."
    },
    {
      id: "q4",
      question: "Which recursion technique involves breaking a problem into subproblems of the same type?",
      options: ["Backtracking", "Divide and conquer", "Dynamic programming", "Greedy algorithm"],
      correctAnswer: 1,
      explanation: "Divide and conquer, as seen in algorithms like Merge Sort and Quick Sort, breaks problems into smaller subproblems of the same type."
    },
    {
      id: "q5",
      question: "In Java, what is the typical maximum depth for recursive calls before getting a StackOverflowError?",
      options: ["100", "1000", "10000", "Unlimited"],
      correctAnswer: 2,
      explanation: "Java typically allows around 1000-10000 recursive calls before the stack overflows, depending on the JVM configuration and available memory."
    },
    {
      id: "q6",
      question: "Which of the following is an example of tail recursion?",
      options: ["return n * factorial(n - 1);", "return factorial(n - 1) + factorial(n - 2);", "return factorialTail(n - 1, n * accumulator);", "return Math.max(n, factorial(n - 1));"],
      correctAnswer: 2,
      explanation: "Tail recursion occurs when the recursive call is the last operation, as in factorialTail where the recursive call is returned directly."
    },
    {
      id: "q7",
      question: "What is the time complexity of the recursive Fibonacci implementation without memoization?",
      options: ["O(n)", "O(log n)", "O(2^n)", "O(n^2)"],
      correctAnswer: 2,
      explanation: "The naive recursive Fibonacci has exponential time complexity O(2^n) because it recomputes the same subproblems multiple times."
    },
    {
      id: "q8",
      question: "Which data structure is commonly used to convert recursive algorithms to iterative ones?",
      options: ["Array", "LinkedList", "Stack", "Queue"],
      correctAnswer: 2,
      explanation: "A stack is used to simulate the call stack in recursive algorithms, making it the primary data structure for converting recursion to iteration."
    },
    {
      id: "q9",
      question: "In the Tower of Hanoi problem, how many moves are required for n disks?",
      options: ["n", "n^2", "2^n - 1", "n!"],
      correctAnswer: 2,
      explanation: "The Tower of Hanoi requires 2^n - 1 moves to solve for n disks, demonstrating the exponential nature of some recursive problems."
    },
    {
      id: "q10",
      question: "Which statement about recursion vs iteration is true?",
      options: ["Recursion is always faster than iteration", "Iteration uses more memory than recursion", "Recursion can be more elegant for tree traversals", "Iteration cannot solve problems that recursion can solve"],
      correctAnswer: 2,
      explanation: "Recursion is often more elegant and natural for problems with recursive structures like tree traversals, though it may not always be the most efficient."
    },
    {
      id: "q11",
      question: "What technique can optimize recursive Fibonacci to avoid recomputing subproblems?",
      options: ["Backtracking", "Memoization", "Greedy approach", "Brute force"],
      correctAnswer: 1,
      explanation: "Memoization stores the results of expensive function calls and returns the cached result when the same inputs occur again."
    },
    {
      id: "q12",
      question: "Which recursive algorithm is used to sort an array by repeatedly dividing it into halves?",
      options: ["Bubble Sort", "Quick Sort", "Merge Sort", "Insertion Sort"],
      correctAnswer: 2,
      explanation: "Merge Sort recursively divides the array into halves, sorts each half, and then merges the sorted halves back together."
    },
    {
      id: "q13",
      question: "In backtracking algorithms like N-Queens, what happens when a solution path fails?",
      options: ["The program terminates", "The algorithm continues without backtracking", "The algorithm backtracks to try different choices", "A new thread is created"],
      correctAnswer: 2,
      explanation: "Backtracking algorithms undo the current partial solution when it cannot lead to a valid solution and try different choices."
    },
    {
      id: "q14",
      question: "What is the space complexity of recursive tree traversal?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
      correctAnswer: 1,
      explanation: "For a balanced binary tree, recursive traversal uses O(log n) space for the call stack, as the maximum depth is logarithmic."
    },
    {
      id: "q15",
      question: "Which of the following is a disadvantage of recursion in Java?",
      options: ["It makes code more readable", "It can cause stack overflow for deep recursion", "It automatically optimizes performance", "It uses less memory than iteration"],
      correctAnswer: 1,
      explanation: "Deep recursion can cause StackOverflowError in Java due to the limited call stack size, making iteration preferable for such cases."
    }
  ]
};
