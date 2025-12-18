import { Exercise } from '../../../../data/lessonsData';

export const exercise_9_1: Exercise = {
  id: 9.1,
  title: 'Inheritance MCQ',
  status: 'completed',
  questions: [
    {
      id: 1,
      question: 'What is inheritance in Java?',
      options: [
        'Creating multiple instances of a class',
        'A mechanism where one class acquires the properties of another class',
        'Converting data types',
        'Defining static methods'
      ],
      correctAnswer: 1,
      explanation: 'Inheritance allows a class to inherit properties and methods from another class, establishing an "is-a" relationship.'
    },
    {
      id: 2,
      question: 'Which keyword is used to inherit from a class?',
      options: ['extends', 'implements', 'inherits', 'super'],
      correctAnswer: 0,
      explanation: 'The `extends` keyword is used to create a subclass that inherits from a superclass.'
    },
    {
      id: 3,
      question: 'What is a superclass?',
      options: [
        'A class that inherits from another class',
        'A class that is being inherited from',
        'A class with only static methods',
        'A class that cannot be instantiated'
      ],
      correctAnswer: 1,
      explanation: 'A superclass (or parent class) is the class being inherited from by a subclass.'
    }
  ]
};


