import { Exercise } from '../../../../data/lessonsData';

export const exercise_7_7: Exercise = {
  id: 7.7,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which keyword is used to define a function in Python?",
      options: ["function", "def", "func", "define"],
      correctAnswer: 1,
      explanation: "The 'def' keyword is used to define a function in Python. The syntax is: def function_name():"
    },
    {
      id: "q2",
      question: "What does this function return?\n\ndef greet():\n    return \"Hello\"\nprint(greet())",
      options: ["Nothing", "\"Hello\"", "greet", "Error"],
      correctAnswer: 1,
      explanation: "The function returns the string \"Hello\" using the return statement, so print(greet()) outputs \"Hello\"."
    },
    {
      id: "q3",
      question: "What happens if a function doesn't have a return statement?",
      options: ["It returns an error", "It returns None", "It returns the last line", "It returns True"],
      correctAnswer: 1,
      explanation: "Functions without a return statement automatically return None in Python."
    },
    {
      id: "q4",
      question: "Which of these is the correct way to call a function named 'calculate'?",
      options: ["calculate", "calculate()", "call calculate()", "run calculate"],
      correctAnswer: 1,
      explanation: "Functions are called using parentheses: function_name(). The parentheses are required even if there are no arguments."
    },
    {
      id: "q5",
      question: "What does this code output?\n\ndef add(a, b):\n    return a + b\nprint(add(3, 5))",
      options: ["8", "ab", "[3, 5]", "Error"],
      correctAnswer: 0,
      explanation: "The function adds the two parameters (3 and 5) and returns 8, which is then printed."
    },
    {
      id: "q6",
      question: "Which of these is a valid function definition?",
      options: ["def my function():", "def my_function():", "def my-function():", "def my.function():"],
      correctAnswer: 1,
      explanation: "Function names can contain letters, numbers, and underscores, but cannot contain spaces or hyphens."
    },
    {
      id: "q7",
      question: "What are function parameters?",
      options: ["Values returned by functions", "Variables defined inside functions", "Inputs passed to functions", "Names of functions"],
      correctAnswer: 2,
      explanation: "Parameters are the variables listed in the function definition that receive values when the function is called."
    },
    {
      id: "q8",
      question: "What does this code do?\n\ndef square(x):\n    return x * x\nresult = square(4)",
      options: ["Prints 16", "Returns 16 to result", "Creates a list [4, 4]", "Nothing"],
      correctAnswer: 1,
      explanation: "The function returns 4 * 4 = 16, which is assigned to the variable 'result'."
    },
    {
      id: "q9",
      question: "Which statement is true about function arguments?",
      options: ["Arguments must be strings", "Arguments are passed in the order defined", "Functions can only have one argument", "Arguments cannot be changed inside functions"],
      correctAnswer: 1,
      explanation: "Arguments are passed to functions in the order they are defined in the parameter list."
    },
    {
      id: "q10",
      question: "What is a function call?",
      options: ["Defining a function", "Writing function code", "Executing a function", "Naming a function"],
      correctAnswer: 2,
      explanation: "A function call is when you execute (run) a function by using its name followed by parentheses."
    },
    {
      id: "q11",
      question: "Can functions be called before they are defined?",
      options: ["Yes, always", "No, never", "Only if they have no parameters", "Only in Python 3.8+"],
      correctAnswer: 1,
      explanation: "In Python, functions must be defined before they are called. You cannot call a function before it exists."
    },
    {
      id: "q12",
      question: "What does this function do?\n\ndef greet(name):\n    return f\"Hello, {name}!\"\nprint(greet(\"Alice\"))",
      options: ["Prints \"Hello, name!\"", "Prints \"Hello, Alice!\"", "Returns \"Hello, name!\"", "Creates a variable called greet"],
      correctAnswer: 1,
      explanation: "The function uses an f-string to format \"Hello, {name}!\" where name is \"Alice\", so it prints \"Hello, Alice!\"."
    },
    {
      id: "q13",
      question: "Which of these is NOT a valid function name?",
      options: ["calculate_total", "get_user_data", "print-result", "find_maximum"],
      correctAnswer: 2,
      explanation: "Function names cannot contain hyphens. Use underscores instead: print_result."
    },
    {
      id: "q14",
      question: "What happens when you call a function with the wrong number of arguments?",
      options: ["It works anyway", "It returns None", "It raises a TypeError", "It uses default values"],
      correctAnswer: 2,
      explanation: "Python raises a TypeError if you call a function with the wrong number of arguments."
    },
    {
      id: "q15",
      question: "Which keyword is used to return a value from a function?",
      options: ["output", "send", "return", "give"],
      correctAnswer: 2,
      explanation: "The 'return' keyword is used to return a value from a function and end the function's execution."
    }
  ]
};
