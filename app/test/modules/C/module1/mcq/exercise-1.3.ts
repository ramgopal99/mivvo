import { Exercise } from '../../../../data/lessonsData';

export const exercise_1_3: Exercise = {
  id: "1.3",
  title: 'MCQ',
  status: 'demo',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Who is the creator of the C programming language?",
      options: [
        "Guido van Rossum",
        "Bjarne Stroustrup",
        "Dennis Ritchie",
        "James Gosling"
      ],
      correctAnswer: 2,
      explanation:
        "C was created by Dennis Ritchie at Bell Labs in the early 1970s."
    },
    {
      id: "q2",
      question: "What was one of the original main purposes of the C language?",
      options: [
        "To build web applications",
        "To implement the Unix operating system",
        "To create mobile apps",
        "To design graphical user interfaces"
      ],
      correctAnswer: 1,
      explanation:
        "C was designed primarily to implement the Unix operating system in a portable and efficient way."
    },
    {
      id: "q3",
      question: "Which of the following best describes C?",
      options: [
        "A purely object-oriented, high-level language",
        "A low-level, assembly-only language",
        "A general-purpose, procedural, compiled language",
        "A scripting language with automatic memory management"
      ],
      correctAnswer: 2,
      explanation:
        "C is a general-purpose, procedural, compiled language that provides low-level access to memory while remaining relatively portable."
    },
    {
      id: "q4",
      question: "Which feature is a major reason C is used for systems programming?",
      options: [
        "Automatic garbage collection",
        "Dynamic typing",
        "Direct access to memory via pointers",
        "Built-in GUI components"
      ],
      correctAnswer: 2,
      explanation:
        "C provides direct access to memory through pointers, which is crucial for systems programming and working close to the hardware."
    },
    {
      id: "q5",
      question: "Which of these is a correct statement about C and other languages?",
      options: [
        "Most modern languages are interpreted and unrelated to C",
        "Many languages are influenced by C's syntax and concepts",
        "C can only be used on Linux systems",
        "C is rarely used in modern software"
      ],
      correctAnswer: 1,
      explanation:
        "Many modern languages (C++, Java, C#, JavaScript, etc.) use C-like syntax and were heavily influenced by C."
    }
  ]
};


