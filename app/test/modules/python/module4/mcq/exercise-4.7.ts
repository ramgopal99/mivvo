import { Exercise } from '../../../../data/lessonsData';

export const exercise_4_7: Exercise = {
  id: "4.7",
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which of the following correctly creates an empty tuple?",
      options: ["empty = {}", "empty = []", "empty = ()", "empty = null"],
      correctAnswer: 2,
      explanation: "Empty tuples are created using parentheses with nothing inside: (). Curly braces {} create dictionaries, square brackets [] create lists."
    },
    {
      id: "q2",
      question: "What will be the output of: print((1, 2, 3)[1])?",
      options: ["1", "2", "3", "(1, 2, 3)", "Error"],
      correctAnswer: 1,
      explanation: "Tuple indexing starts at 0, so (1, 2, 3)[1] returns the second element which is 2."
    },
    {
      id: "q3",
      question: "Which statement about tuples is correct?",
      options: ["Tuples are mutable", "Tuples cannot be changed after creation", "Tuples have append() method", "Tuples are slower than lists"],
      correctAnswer: 1,
      explanation: "Tuples are immutable - they cannot be changed after creation. This is their key difference from lists."
    },
    {
      id: "q4",
      question: "How do you create a tuple with a single element?",
      options: ["single = (5)", "single = [5]", "single = (5,)", "single = {5}"],
      correctAnswer: 2,
      explanation: "Single-element tuples need a comma after the element: (5,). Without the comma, (5) is just an integer in parentheses."
    },
    {
      id: "q5",
      question: "What does tuple([1, 2, 3, 4]) create?",
      options: ["[1, 2, 3, 4]", "(1, 2, 3, 4)", "Error", "None"],
      correctAnswer: 1,
      explanation: "The tuple() function converts other iterables (like lists) to tuples. So tuple([1, 2, 3, 4]) creates (1, 2, 3, 4)."
    },
    {
      id: "q6",
      question: "What is tuple packing?",
      options: ["Creating tuples with parentheses", "Converting lists to tuples", "Creating tuples without parentheses", "Using the tuple() function"],
      correctAnswer: 2,
      explanation: "Tuple packing is creating tuples without parentheses: point = 10, 20, 30 creates the tuple (10, 20, 30)."
    },
    {
      id: "q7",
      question: "Which of these operations is NOT allowed on tuples?",
      options: ["Accessing elements by index", "Finding length with len()", "Adding elements with append()", "Slicing"],
      correctAnswer: 2,
      explanation: "Tuples are immutable, so you cannot add elements with append(). All other operations work on tuples."
    },
    {
      id: "q8",
      question: "What does (1, 2, 3) + (4, 5, 6) create?",
      options: ["(1, 2, 3, 4, 5, 6)", "(5, 7, 9)", "Error", "[1, 2, 3, 4, 5, 6]"],
      correctAnswer: 0,
      explanation: "The + operator concatenates tuples, creating a new tuple with elements from both tuples."
    },
    {
      id: "q9",
      question: "Which method can be used on tuples?",
      options: ["append()", "remove()", "count()", "insert()"],
      correctAnswer: 2,
      explanation: "Tuples have count() and index() methods, but not append(), remove(), or insert() since they are immutable."
    },
    {
      id: "q10",
      question: "What does (\"hello\",) * 3 create?",
      options: ["(\"hello\", \"hello\", \"hello\")", "(\"hellohellohello\",)", "Error", "[\"hello\", \"hello\", \"hello\"]"],
      correctAnswer: 0,
      explanation: "The * operator repeats tuples. (\"hello\",) * 3 creates (\"hello\", \"hello\", \"hello\")."
    },
    {
      id: "q11",
      question: "How do you access the last element of a tuple named 'colors'?",
      options: ["colors[len(colors)]", "colors[-1]", "colors[len(colors)-1]", "Both b and c"],
      correctAnswer: 3,
      explanation: "Both colors[-1] and colors[len(colors)-1] access the last element. Negative indexing is more Pythonic."
    },
    {
      id: "q12",
      question: "What does tuple unpacking allow you to do?",
      options: ["Change tuple elements", "Assign tuple elements to multiple variables", "Convert tuples to lists", "Sort tuple elements"],
      correctAnswer: 1,
      explanation: "Tuple unpacking allows you to assign tuple elements to multiple variables: x, y, z = (10, 20, 30)."
    },
    {
      id: "q13",
      question: "Which of these is a good use case for tuples?",
      options: ["A shopping list that users can modify", "RGB color values that should never change", "A todo list where items are added/removed", "User input that needs validation"],
      correctAnswer: 1,
      explanation: "RGB color values are constants that should never change, making tuples perfect for this use case."
    },
    {
      id: "q14",
      question: "What does (1, 2, 3, 4, 5)[1:4] return?",
      options: ["(1, 2, 3)", "(2, 3, 4)", "(3, 4, 5)", "(2, 3, 4, 5)"],
      correctAnswer: 1,
      explanation: "Slicing [1:4] returns elements from index 1 up to (but not including) index 4, so (2, 3, 4)."
    },
    {
      id: "q15",
      question: "Can tuples be used as dictionary keys?",
      options: ["No, only strings can be keys", "No, only immutable types can be keys", "Yes, because tuples are immutable", "Yes, but only for small tuples"],
      correctAnswer: 2,
      explanation: "Tuples can be used as dictionary keys because they are immutable (hashable). Lists cannot be used as keys because they are mutable."
    }
  ]
};

