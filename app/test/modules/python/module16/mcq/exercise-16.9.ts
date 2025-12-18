import { Exercise } from '../../../../data/lessonsData';

export const exercise_16_9: Exercise = {
  id: 16.9,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is a decorator in Python?",
      options: ["A function that modifies another function", "A class that inherits from another class", "A variable that stores multiple values", "A loop that iterates over a sequence"],
      correctAnswer: 0,
      explanation: "A decorator is a function that takes another function as an argument and extends its behavior without modifying the original function."
    },
    {
      id: "q2",
      question: "What is the difference between a generator and a regular function?",
      options: ["Generators use more memory", "Generators return values one at a time", "Generators cannot take arguments", "Generators are faster than regular functions"],
      correctAnswer: 1,
      explanation: "Generators use the yield keyword to return values one at a time, allowing for memory-efficient iteration over potentially large datasets."
    },
    {
      id: "q3",
      question: "What is the purpose of the __enter__ and __exit__ methods in a context manager?",
      options: ["To create and destroy objects", "To handle setup and cleanup operations", "To compare objects", "To iterate over objects"],
      correctAnswer: 1,
      explanation: "The __enter__ method sets up the context and __exit__ handles cleanup operations, even when exceptions occur."
    },
    {
      id: "q4",
      question: "What does the @property decorator do?",
      options: ["Makes a method private", "Creates a getter method for an attribute", "Deletes an attribute", "Makes a method static"],
      correctAnswer: 1,
      explanation: "The @property decorator allows you to access a method like an attribute, providing a clean interface for computed properties."
    },
    {
      id: "q5",
      question: "What is a metaclass in Python?",
      options: ["A base class for all classes", "A class that creates other classes", "A special type of function", "A built-in data type"],
      correctAnswer: 1,
      explanation: "A metaclass is a class that creates other classes. It defines how classes behave and can modify class creation."
    },
    {
      id: "q6",
      question: "What does the 'with' statement do?",
      options: ["Creates a loop", "Handles exceptions", "Manages context for resources", "Defines a function"],
      correctAnswer: 2,
      explanation: "The 'with' statement provides a clean way to manage resources, ensuring proper setup and cleanup."
    },
    {
      id: "q7",
      question: "What is the purpose of the __call__ method?",
      options: ["To compare objects", "To make objects callable like functions", "To iterate over objects", "To create objects"],
      correctAnswer: 1,
      explanation: "The __call__ method allows an object to be called like a function, enabling function-like behavior for class instances."
    },
    {
      id: "q8",
      question: "What does the re.match() function do?",
      options: ["Finds all matches in a string", "Matches from the beginning of a string", "Replaces text in a string", "Splits a string"],
      correctAnswer: 1,
      explanation: "re.match() attempts to match a pattern only at the beginning of the string, unlike re.search() which searches anywhere."
    },
    {
      id: "q9",
      question: "What is a closure in Python?",
      options: ["A way to close files", "A function that remembers variables from its enclosing scope", "A type of loop", "A method to end programs"],
      correctAnswer: 1,
      explanation: "A closure is a function that captures and remembers variables from its enclosing scope, even after the outer function has finished executing."
    },
    {
      id: "q10",
      question: "What does the @staticmethod decorator do?",
      options: ["Makes a method that belongs to the class", "Makes a method that belongs to instances", "Makes a method that takes self as parameter", "Makes a method that takes cls as parameter"],
      correctAnswer: 0,
      explanation: "A static method belongs to the class rather than any instance, and it doesn't take self or cls as the first parameter."
    },
    {
      id: "q11",
      question: "What is the difference between __init__ and __new__?",
      options: ["__init__ creates objects, __new__ initializes them", "__new__ creates objects, __init__ initializes them", "They do the same thing", "__new__ is for old-style classes"],
      correctAnswer: 1,
      explanation: "__new__ is responsible for creating a new instance, while __init__ initializes the newly created object."
    },
    {
      id: "q12",
      question: "What does the yield keyword do?",
      options: ["Ends a function", "Returns a value and pauses execution", "Creates a loop", "Handles exceptions"],
      correctAnswer: 1,
      explanation: "The yield keyword returns a value from a generator function and pauses execution, allowing the function to be resumed later."
    },
    {
      id: "q13",
      question: "What is monkey patching in Python?",
      options: ["Patching security vulnerabilities", "Dynamically modifying classes or modules at runtime", "Creating patches for bugs", "Patching memory leaks"],
      correctAnswer: 1,
      explanation: "Monkey patching refers to the dynamic modification of classes or modules at runtime, allowing you to change their behavior without altering the source code."
    },
    {
      id: "q14",
      question: "What does the @functools.lru_cache decorator do?",
      options: ["Caches function results based on arguments", "Limits function execution time", "Logs function calls", "Optimizes function parameters"],
      correctAnswer: 0,
      explanation: "functools.lru_cache implements memoization by caching function results based on their arguments, improving performance for expensive function calls."
    },
    {
      id: "q15",
      question: "What is duck typing in Python?",
      options: ["A way to make objects quack like ducks", "A type system based on object interfaces rather than explicit types", "A method for creating duck objects", "A typing system for waterfowl"],
      correctAnswer: 1,
      explanation: "Duck typing is a concept where the type of an object is determined by its behavior (methods and properties) rather than its class inheritance."
    }
  ]
};
