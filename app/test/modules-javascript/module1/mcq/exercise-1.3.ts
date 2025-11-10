import { Exercise } from '../../../data/lessonsData';

export const exercise_1_3: Exercise = {
  id: 1.3,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Who created the JavaScript programming language?",
      options: ["James Gosling", "Brendan Eich", "Dennis Ritchie", "Guido van Rossum"],
      correctAnswer: 1,
      explanation: "JavaScript was created by Brendan Eich in 1995 while working at Netscape Communications."
    },
    {
      id: "q2",
      question: "Which of the following is NOT a JavaScript data type?",
      options: ["string", "boolean", "integer", "undefined"],
      correctAnswer: 2,
      explanation: "JavaScript does not have an 'integer' data type. All numbers in JavaScript are of type 'number' (double-precision floating-point)."
    },
    {
      id: "q3",
      question: "What does the '===' operator do in JavaScript?",
      options: ["Assignment", "Loose equality comparison", "Strict equality comparison", "Concatenation"],
      correctAnswer: 2,
      explanation: "'===' performs strict equality comparison, checking both value and type, unlike '==' which performs type coercion."
    },
    {
      id: "q4",
      question: "Which ES6 feature allows you to extract values from arrays and objects?",
      options: ["Template literals", "Arrow functions", "Destructuring", "Promises"],
      correctAnswer: 2,
      explanation: "Destructuring allows you to unpack values from arrays or properties from objects into distinct variables."
    },
    {
      id: "q5",
      question: "What is the correct syntax for an arrow function?",
      options: ["function() => {}", "() => {}", "=> () => {}", "function => ()"],
      correctAnswer: 1,
      explanation: "Arrow functions use the syntax: (parameters) => { statements } or just () => { statements } for no parameters."
    },
    {
      id: "q6",
      question: "What does 'async/await' allow you to do in JavaScript?",
      options: ["Create asynchronous functions", "Write asynchronous code that looks synchronous", "Handle promises", "Both B and C"],
      correctAnswer: 3,
      explanation: "Async/await allows you to write asynchronous code that looks synchronous and is used for handling promises."
    },
    {
      id: "q7",
      question: "Which method is used to add an event listener to a DOM element?",
      options: ["addEvent()", "attachEvent()", "addEventListener()", "onEvent()"],
      correctAnswer: 2,
      explanation: "addEventListener() is the standard method for attaching event handlers to DOM elements."
    },
    {
      id: "q8",
      question: "What is the purpose of the 'use strict' directive?",
      options: ["Makes code run faster", "Enables strict mode for better error checking", "Prevents variable hoisting", "Enables ES6 features"],
      correctAnswer: 1,
      explanation: "'use strict' enables strict mode, which provides better error checking and prevents certain problematic JavaScript behaviors."
    },
    {
      id: "q9",
      question: "Which of these is NOT a valid way to declare a variable in modern JavaScript?",
      options: ["let x = 5;", "const y = 10;", "var z = 15;", "variable w = 20;"],
      correctAnswer: 3,
      explanation: "'variable' is not a valid keyword for declaring variables in JavaScript. Use let, const, or var."
    },
    {
      id: "q10",
      question: "What does the 'map()' method do in JavaScript?",
      options: ["Modifies the original array", "Creates a new array with transformed elements", "Finds an element in the array", "Sorts the array"],
      correctAnswer: 1,
      explanation: "map() creates a new array by calling a function on every element of the original array, transforming each element."
    },
    {
      id: "q11",
      question: "Which statement about closures is correct?",
      options: ["Closures prevent memory leaks", "Closures allow functions to access variables from their outer scope", "Closures are only used in ES6", "Closures make code slower"],
      correctAnswer: 1,
      explanation: "Closures allow functions to access and manipulate variables from their containing (outer) scope even after the outer function has finished executing."
    },
    {
      id: "q12",
      question: "What is the output of: console.log(typeof null)?",
      options: ["null", "undefined", "object", "boolean"],
      correctAnswer: 2,
      explanation: "In JavaScript, typeof null returns 'object', which is a well-known bug/feature that has been kept for backward compatibility."
    }
  ]
};
