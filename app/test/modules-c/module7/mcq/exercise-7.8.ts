import { Exercise } from '../../../data/lessonsData';

export const exercise_7_8: Exercise = {
  id: 7.8,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is the key difference between a structure and a union?",
      options: ["Structures are larger than unions", "Structure members share memory, union members don't", "Union members share memory, structure members don't", "There is no difference"],
      correctAnswer: 2,
      explanation: "In a union, all members share the same memory location, while in a structure, each member has its own memory location."
    },
    {
      id: "q2",
      question: "How do you access a structure member using a pointer?",
      options: ["ptr.member", "ptr->member", "Both ptr.member and ptr->member", "(*ptr).member"],
      correctAnswer: 1,
      explanation: "The arrow operator (->) is used to access structure members through pointers. The expression ptr->member is equivalent to (*ptr).member."
    },
    {
      id: "q3",
      question: "What is a bit field in C?",
      options: ["A field that can only store 0 or 1", "A way to specify the exact number of bits a structure member should occupy", "A field that stores binary data", "A field that can store multiple values"],
      correctAnswer: 1,
      explanation: "Bit fields allow you to specify exactly how many bits each structure member should occupy, enabling compact storage of flags and small integer values."
    },
    {
      id: "q4",
      question: "Which of these is correct syntax for designating initializers?",
      options: ["struct Point p = {x: 1, y: 2};", "struct Point p = {.x = 1, .y = 2};", "struct Point p = {x => 1, y => 2};", "struct Point p = {1 -> x, 2 -> y};"],
      correctAnswer: 1,
      explanation: "Designated initializers use the .member = value syntax to specify which member to initialize, allowing out-of-order initialization."
    },
    {
      id: "q5",
      question: "What does typedef do?",
      options: ["Creates a new data type", "Creates an alias for an existing type", "Defines a structure", "Declares a variable"],
      correctAnswer: 1,
      explanation: "typedef creates an alias for an existing type, allowing you to use a more convenient or descriptive name for complex types."
    },
    {
      id: "q6",
      question: "Why might a compiler add padding to structures?",
      options: ["To make them larger", "To align members on memory boundaries for better performance", "To waste memory", "To make them smaller"],
      correctAnswer: 1,
      explanation: "Compilers add padding between structure members to align them on memory boundaries, which can improve access performance on many architectures."
    },
    {
      id: "q7",
      question: "What is a flexible array member?",
      options: ["An array with variable size", "An array that can grow and shrink", "An array declared without a size as the last member of a structure", "An array that can store different types"],
      correctAnswer: 2,
      explanation: "A flexible array member is an array declared without a size as the last member of a structure, allowing variable-sized structures."
    },
    {
      id: "q8",
      question: "In a union, if you store a value in one member and then read from a different member, what happens?",
      options: ["The value is automatically converted", "You get the same value in the new type", "The behavior is undefined", "The program crashes"],
      correctAnswer: 2,
      explanation: "Reading from a different union member than the one last written to results in undefined behavior, though type punning through unions is sometimes used intentionally."
    },
    {
      id: "q9",
      question: "What is the purpose of a tagged union?",
      options: ["To tag union members for garbage collection", "To use a union with an enum to track which member is currently valid", "To add metadata to union members", "To make unions thread-safe"],
      correctAnswer: 1,
      explanation: "A tagged union combines a union with an enum or other type field to track which member is currently valid, making the union safe to use."
    },
    {
      id: "q10",
      question: "Which of these typedef declarations is correct?",
      options: ["typedef struct { int x; } Point;", "typedef Point struct { int x; };", "typedef struct Point { int x; };", "Both A and C are correct"],
      correctAnswer: 3,
      explanation: "Both typedef struct { int x; } Point; and typedef struct Point { int x; } Point; are correct. The first creates an alias for an anonymous structure, the second creates both a structure tag and an alias."
    }
  ]
};

