import { Exercise } from '../../../../data/lessonsData';

export const exercise_7_7: Exercise = {
  id: "7.7",
  title: 'Structures & Unions MCQ',
  status: 'demo',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is the size of this structure?\n\n```c\nstruct Example {\n    char c;\n    int i;\n    char d;\n};\n```",
      options: [
        "6 bytes (1+4+1)",
        "7 bytes (1+4+1+1 for padding)",
        "8 bytes (1+4+1+2 for padding)",
        "12 bytes (due to alignment)"
      ],
      correctAnswer: 3,
      explanation: "Structures are padded for alignment. char(1) + padding(3) + int(4) + char(1) + padding(3) = 12 bytes."
    },
    {
      id: "q2",
      question: "What is the difference between a structure and a union?",
      options: [
        "Structures use more memory than unions",
        "Unions can only store one member at a time",
        "Structures are faster than unions",
        "Unions are used for functions, structures for data"
      ],
      correctAnswer: 1,
      explanation: "Union members share the same memory location, so only one member can hold a valid value at a time."
    },
    {
      id: "q3",
      question: "How do you access a structure member using a pointer?",
      options: [
        "ptr.member",
        "ptr->member",
        "*ptr.member",
        "&ptr->member"
      ],
      correctAnswer: 1,
      explanation: "The arrow operator (->) is used to access structure members through pointers."
    },
    {
      id: "q4",
      question: "What does typedef do?",
      options: [
        "Defines a new data type",
        "Creates an alias for existing types",
        "Declares a function",
        "Allocates memory"
      ],
      correctAnswer: 1,
      explanation: "typedef creates type aliases, making code more readable and allowing abstraction of complex types."
    },
    {
      id: "q5",
      question: "Which is true about structure assignment?",
      options: [
        "You can only assign individual members",
        "Structure assignment copies all members",
        "You need memcpy() for structure assignment",
        "Structure assignment is not allowed in C"
      ],
      correctAnswer: 1,
      explanation: "C allows direct structure assignment, which copies all members from one structure to another."
    },
    {
      id: "q6",
      question: "What is a self-referential structure?",
      options: [
        "A structure that refers to itself",
        "A structure with pointers to the same structure type",
        "A structure defined inside another structure",
        "A structure with function pointers"
      ],
      correctAnswer: 1,
      explanation: "Self-referential structures contain pointers to objects of the same type, enabling linked data structures."
    },
    {
      id: "q7",
      question: "How do you declare a typedef for a structure?",
      options: [
        "typedef struct { int x; } Point;",
        "typedef struct Point { int x; };",
        "Both are correct",
        "Neither is correct"
      ],
      correctAnswer: 2,
      explanation: "Both syntaxes are valid: with and without the tag name. The second form allows self-referencing."
    },
    {
      id: "q8",
      question: "What is the size of this union?\n\n```c\nunion Data {\n    char c;\n    int i;\n    double d;\n};\n```",
      options: [
        "1 byte",
        "4 bytes",
        "8 bytes",
        "13 bytes"
      ],
      correctAnswer: 2,
      explanation: "Union size equals the size of the largest member. double is 8 bytes, so the union is 8 bytes."
    },
    {
      id: "q9",
      question: "Which of these is a valid nested structure access?",
      options: [
        "person.address.street",
        "person->address->street",
        "*person.address.street",
        "person.address->street"
      ],
      correctAnswer: 0,
      explanation: "For nested structures, use dot notation for all levels: outer.inner.member"
    },
    {
      id: "q10",
      question: "What is the purpose of bit fields in structures?",
      options: [
        "To save memory by using individual bits",
        "To create floating point numbers",
        "To store strings efficiently",
        "To perform bitwise operations"
      ],
      correctAnswer: 0,
      explanation: "Bit fields allow packing multiple small values into a single integer, saving memory when you need many small flags or values."
    }
  ]
};
