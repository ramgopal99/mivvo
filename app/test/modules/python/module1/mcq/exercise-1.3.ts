import { Exercise } from '../../../data/lessonsData';

export const exercise_1_3: Exercise = {
  id: 1.3,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Who created Python programming language?",
      options: ["James Gosling", "Guido van Rossum", "Dennis Ritchie", "Bjarne Stroustrup"],
      correctAnswer: 1,
      explanation: "Python was created by Guido van Rossum in the late 1980s while working at CWI (Centrum Wiskunde & Informatica) in the Netherlands."
    },
    {
      id: "q2",
      question: "Why was Python named 'Python'?",
      options: ["Because it was as dangerous as a snake", "After the Python snake species", "After 'Monty Python's Flying Circus'", "Because it was developed in Australia"],
      correctAnswer: 2,
      explanation: "Guido van Rossum named Python after 'Monty Python's Flying Circus', the British comedy group, not after the snake."
    },
    {
      id: "q3",
      question: "In which year was Python first released to the public?",
      options: ["1989", "1991", "1994", "1996"],
      correctAnswer: 1,
      explanation: "Python was first released in February 1991. Version 0.9.0 was made available to the public."
    },
    {
      id: "q4",
      question: "What was Python's original design philosophy?",
      options: ["Make it run as fast as C", "There's only one way to do it", "Make it work on every platform", "Keep it simple and readable"],
      correctAnswer: 1,
      explanation: "Python's design philosophy emphasizes 'There's only one way to do it' - meaning there should be one obvious way to solve a problem."
    },
    {
      id: "q5",
      question: "Which of the following is part of 'The Zen of Python'?",
      options: ["'Code should be written in C for speed'", "'Beautiful is better than ugly'", "'Programs should be compiled'", "'Memory management is programmer's job'"],
      correctAnswer: 1,
      explanation: "'Beautiful is better than ugly' is one of the guiding principles from 'The Zen of Python'. You can read all principles by typing 'import this' in Python."
    }
  ]
};
