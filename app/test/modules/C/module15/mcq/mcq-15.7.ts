import { Exercise } from '../../../../data/lessonsData';

export const exercise_15_7: Exercise = {
  id: "15.7",
  title: 'C Standard Library MCQs',
  status: 'demo',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which header file contains the malloc() function?",
      options: [
        "<stdio.h>",
        "<stdlib.h>",
        "<string.h>",
        "<memory.h>"
      ],
      correctAnswer: 1,
      explanation: "malloc() and other dynamic memory functions are declared in <stdlib.h>."
    },
    {
      id: "q2",
      question: "What does the strerror() function do?",
      options: [
        "Sets the errno value",
        "Converts errno to a string message",
        "Clears error conditions",
        "Logs error messages to a file"
      ],
      correctAnswer: 1,
      explanation: "strerror() converts an errno value to a human-readable error message string."
    },
    {
      id: "q3",
      question: "Which function is used to sort an array in C?",
      options: [
        "sort()",
        "qsort()",
        "bsort()",
        "isort()"
      ],
      correctAnswer: 1,
      explanation: "qsort() is the standard C library function for sorting arrays using quicksort algorithm."
    },
    {
      id: "q4",
      question: "What is the purpose of the assert() macro?",
      options: [
        "To check for runtime errors",
        "To validate function preconditions and postconditions",
        "To handle exceptions",
        "To log debug information"
      ],
      correctAnswer: 1,
      explanation: "assert() is used to check for programming errors by testing conditions that should always be true."
    },
    {
      id: "q5",
      question: "Which header contains mathematical functions like sin(), cos(), sqrt()?",
      options: [
        "<stdlib.h>",
        "<string.h>",
        "<math.h>",
        "<cmath>"
      ],
      correctAnswer: 2,
      explanation: "Mathematical functions are declared in <math.h>."
    },
    {
      id: "q6",
      question: "What does fopen() return when it fails to open a file?",
      options: [
        "EOF",
        "NULL",
        "-1",
        "0"
      ],
      correctAnswer: 1,
      explanation: "fopen() returns NULL on failure, and sets errno to indicate the specific error."
    },
    {
      id: "q7",
      question: "Which function converts a string to an integer?",
      options: [
        "atoi()",
        "atol()",
        "atof()",
        "All of the above"
      ],
      correctAnswer: 0,
      explanation: "atoi() converts a string to int, atol() to long, atof() to double."
    },
    {
      id: "q8",
      question: "What is the purpose of the time_t type?",
      options: [
        "To represent calendar dates",
        "To represent time intervals",
        "To represent time in seconds since epoch",
        "To represent time zones"
      ],
      correctAnswer: 2,
      explanation: "time_t represents time as the number of seconds elapsed since the Unix epoch (January 1, 1970)."
    },
    {
      id: "q9",
      question: "Which header contains character classification functions like isalpha(), isdigit()?",
      options: [
        "<string.h>",
        "<stdlib.h>",
        "<ctype.h>",
        "<character.h>"
      ],
      correctAnswer: 2,
      explanation: "Character classification and conversion functions are in <ctype.h>."
    },
    {
      id: "q10",
      question: "What does the setjmp()/longjmp() combination provide?",
      options: [
        "Thread synchronization",
        "Non-local jumps for error recovery",
        "Memory management",
        "File I/O operations"
      ],
      correctAnswer: 1,
      explanation: "setjmp()/longjmp() allow non-local jumps, useful for error recovery and implementing exceptions."
    }
  ]
};
