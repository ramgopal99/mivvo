import { Exercise } from '../../../data/lessonsData';

export const exercise_2_8: Exercise = {
  id: 2.8,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which of the following is NOT a valid Python comment?",
      options: ["# This is a comment", "'''This is a comment'''", "/* This is a comment */", "// This is a comment"],
      correctAnswer: 2,
      explanation: "Python uses # for single-line comments and triple quotes for multi-line comments. /* */ and // are used in other languages like C/C++/Java."
    },
    {
      id: "q2",
      question: "What will be the output of: print(f'Hello, {name}!') where name = 'Alice'?",
      options: ["Hello, {name}!", "Hello, Alice!", "f'Hello, Alice!'", "Error"],
      correctAnswer: 1,
      explanation: "F-strings (formatted string literals) automatically replace {variable} with the variable's value."
    },
    {
      id: "q3",
      question: "Which data type is returned by the expression: type(42.0)?",
      options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'bool'>"],
      correctAnswer: 1,
      explanation: "42.0 is a floating-point number, so type() returns <class 'float'>."
    },
    {
      id: "q4",
      question: "What is the correct way to convert the string '123' to an integer?",
      options: ["str('123')", "float('123')", "int('123')", "bool('123')"],
      correctAnswer: 2,
      explanation: "int() function converts a string representation of a number to an integer."
    },
    {
      id: "q5",
      question: "Which conditional statement executes when ALL preceding conditions are false?",
      options: ["if", "elif", "else", "while"],
      correctAnswer: 2,
      explanation: "The else clause executes only when all if and elif conditions above it evaluate to False."
    },
    {
      id: "q6",
      question: "What does the range(3, 8, 2) function generate?",
      options: ["[3, 4, 5, 6, 7, 8]", "[3, 5, 7]", "[2, 3, 4, 5, 6, 7, 8]", "[3, 8]"],
      correctAnswer: 1,
      explanation: "range(3, 8, 2) generates numbers from 3 to 7 (not including 8) with a step of 2: 3, 5, 7."
    },
    {
      id: "q7",
      question: "Which loop control statement immediately exits the current loop iteration and continues with the next one?",
      options: ["break", "continue", "pass", "return"],
      correctAnswer: 1,
      explanation: "continue skips the rest of the current iteration and jumps to the next iteration of the loop."
    },
    {
      id: "q8",
      question: "What will 'Hello123'.isalpha() return?",
      options: ["True", "False", "'Hello123'", "Error"],
      correctAnswer: 1,
      explanation: "isalpha() returns True only if ALL characters in the string are letters. 'Hello123' contains numbers, so it returns False."
    },
    {
      id: "q9",
      question: "Which of these converts 19.99 to an integer?",
      options: ["str(19.99)", "float(19.99)", "int(19.99)", "bool(19.99)"],
      correctAnswer: 2,
      explanation: "int() truncates the decimal part and converts 19.99 to 19."
    },
    {
      id: "q10",
      question: "What does the input() function always return?",
      options: ["An integer", "A float", "A string", "A boolean"],
      correctAnswer: 2,
      explanation: "The input() function always returns a string, even if the user enters a number. You need to convert it if you want other types."
    },
    {
      id: "q11",
      question: "What is the output of this code?\n\nage = 20\nif age >= 18:\n    status = 'Adult'\nelse:\n    status = 'Minor'\nprint(status)",
      options: ["Adult", "Minor", "20", "Error"],
      correctAnswer: 0,
      explanation: "Since age (20) is greater than or equal to 18, the condition is True, so status is set to 'Adult'."
    },
    {
      id: "q12",
      question: "Which of these is a valid variable name in Python?",
      options: ["1name", "user-name", "user_name", "class"],
      correctAnswer: 2,
      explanation: "user_name is valid (snake_case). Variable names cannot start with numbers, contain hyphens, or be Python keywords like 'class'."
    },
    {
      id: "q13",
      question: "What does '123'.isdigit() return?",
      options: ["True", "False", "'123'", "Error"],
      correctAnswer: 0,
      explanation: "isdigit() returns True if ALL characters in the string are digits. '123' contains only digits, so it returns True."
    },
    {
      id: "q14",
      question: "What is the purpose of the 'else' clause in a loop?",
      options: ["It executes if the loop condition is never met", "It executes after every iteration", "It executes only when break is called", "It replaces the loop condition"],
      correctAnswer: 0,
      explanation: "The else clause in a loop executes only when the loop completes normally (without hitting a break statement)."
    },
    {
      id: "q15",
      question: "Which of these creates a list of squares from 0 to 4?",
      options: ["[x**2 for x in range(5)]", "[x^2 for x in range(5)]", "[x*2 for x in range(5)]", "[x**2 in range(5)]"],
      correctAnswer: 0,
      explanation: "List comprehensions use [expression for item in iterable]. x**2 squares each number, and range(5) gives [0,1,2,3,4]."
    }
  ]
};
