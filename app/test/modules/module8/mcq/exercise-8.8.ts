import { Exercise } from '../../../data/lessonsData';

export const exercise_8_8: Exercise = {
  id: 8.8,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What does the len() function return?",
      options: ["The first element of a sequence", "The number of elements in a sequence", "The last element of a sequence", "The sum of all elements"],
      correctAnswer: 1,
      explanation: "len() returns the number of elements in a sequence (string, list, tuple, etc.)."
    },
    {
      id: "q2",
      question: "Which function converts a string to an integer?",
      options: ["str()", "float()", "int()", "list()"],
      correctAnswer: 2,
      explanation: "int() converts a string or number to an integer. str() converts to string, float() to float, list() to list."
    },
    {
      id: "q3",
      question: "What does max([1, 5, 3, 9, 2]) return?",
      options: ["1", "2", "5", "9"],
      correctAnswer: 3,
      explanation: "max() returns the largest item in an iterable or the largest of two or more arguments."
    },
    {
      id: "q4",
      question: "Which function returns the smallest item in an iterable?",
      options: ["smallest()", "min()", "lowest()", "minimum()"],
      correctAnswer: 1,
      explanation: "min() returns the smallest item in an iterable or the smallest of two or more arguments."
    },
    {
      id: "q5",
      question: "What does sum([1, 2, 3, 4, 5]) return?",
      options: ["10", "15", "20", "25"],
      correctAnswer: 1,
      explanation: "sum() returns the sum of all items in an iterable, optionally plus a start value."
    },
    {
      id: "q6",
      question: "Which function sorts a list in place?",
      options: ["sort()", "sorted()", "arrange()", "order()"],
      correctAnswer: 0,
      explanation: "list.sort() sorts the list in place and returns None. sorted() returns a new sorted list."
    },
    {
      id: "q7",
      question: "What does sorted([3, 1, 4, 1, 5]) return?",
      options: ["[3, 1, 4, 1, 5]", "[1, 1, 3, 4, 5]", "[5, 4, 3, 1, 1]", "Error"],
      correctAnswer: 1,
      explanation: "sorted() returns a new sorted list from the elements of any iterable."
    },
    {
      id: "q8",
      question: "Which function reverses a list in place?",
      options: ["reverse()", "reversed()", "backwards()", "invert()"],
      correctAnswer: 0,
      explanation: "list.reverse() reverses the list in place. reversed() returns a reverse iterator."
    },
    {
      id: "q9",
      question: "What does range(3, 8) create?",
      options: ["[3, 4, 5, 6, 7, 8]", "[3, 4, 5, 6, 7]", "[4, 5, 6, 7, 8]", "[3, 5, 7]"],
      correctAnswer: 1,
      explanation: "range(start, stop) creates a range from start to stop-1. range(3, 8) creates 3, 4, 5, 6, 7."
    },
    {
      id: "q10",
      question: "Which function converts an iterable to a list?",
      options: ["tuple()", "dict()", "list()", "set()"],
      correctAnswer: 2,
      explanation: "list() converts any iterable (string, tuple, set, etc.) to a list."
    },
    {
      id: "q11",
      question: "What does abs(-5) return?",
      options: ["-5", "0", "5", "Error"],
      correctAnswer: 2,
      explanation: "abs() returns the absolute value of a number, which is always non-negative."
    },
    {
      id: "q12",
      question: "Which function rounds a number to the nearest integer?",
      options: ["round()", "ceil()", "floor()", "trunc()"],
      correctAnswer: 0,
      explanation: "round() rounds a number to the nearest integer. ceil() rounds up, floor() rounds down, trunc() truncates."
    },
    {
      id: "q13",
      question: "What does type(42) return?",
      options: ["42", "'int'", "<class 'int'>", "integer"],
      correctAnswer: 2,
      explanation: "type() returns the type of an object as a type object, displayed as <class 'typename'>."
    },
    {
      id: "q14",
      question: "Which function gets user input?",
      options: ["input()", "read()", "get()", "ask()"],
      correctAnswer: 0,
      explanation: "input() reads a line from user input and returns it as a string."
    },
    {
      id: "q15",
      question: "What does enumerate(['a', 'b', 'c']) return?",
      options: ["['a', 'b', 'c']", "[(0, 'a'), (1, 'b'), (2, 'c')]", "[0, 1, 2]", "Error"],
      correctAnswer: 1,
      explanation: "enumerate() returns an enumerate object that yields (index, value) pairs for each item in the iterable."
    }
  ]
};
