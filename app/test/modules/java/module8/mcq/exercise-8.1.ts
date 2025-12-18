import { Exercise } from '../../../data/lessonsData';

export const exercise_8_1: Exercise = {
  id: 8.1,
  title: 'Classes and Objects MCQ',
  status: 'completed',
  questions: [
    {
      id: 1,
      question: 'What is the primary purpose of a class in Java?',
      options: [
        'To store primitive data types',
        'To define the blueprint for creating objects',
        'To perform mathematical calculations',
        'To handle user input'
      ],
      correctAnswer: 1,
      explanation: 'A class serves as a blueprint or template for creating objects, defining their properties and behaviors.'
    },
    {
      id: 2,
      question: 'Which keyword is used to create an instance of a class?',
      options: ['class', 'new', 'instance', 'create'],
      correctAnswer: 1,
      explanation: 'The `new` keyword is used to create a new instance (object) of a class.'
    },
    {
      id: 3,
      question: 'What is an object in Java?',
      options: [
        'A primitive data type',
        'An instance of a class',
        'A method definition',
        'A package name'
      ],
      correctAnswer: 1,
      explanation: 'An object is a concrete instance of a class, created using the `new` keyword.'
    },
    {
      id: 4,
      question: 'Which of the following is true about instance variables?',
      options: [
        'They are shared among all instances of a class',
        'Each object has its own copy of instance variables',
        'They can only store primitive types',
        'They must be initialized at declaration'
      ],
      correctAnswer: 1,
      explanation: 'Instance variables are unique to each object instance and can store both primitive and reference types.'
    },
    {
      id: 5,
      question: 'What is a constructor in Java?',
      options: [
        'A method that destroys objects',
        'A special method used to initialize objects',
        'A static method that creates classes',
        'A method that converts objects to strings'
      ],
      correctAnswer: 1,
      explanation: 'A constructor is a special method that is called when an object is created, used to initialize the object\'s state.'
    },
    {
      id: 6,
      question: 'Which of the following statements about the `this` keyword is correct?',
      options: [
        'It refers to the parent class',
        'It refers to the current instance of the class',
        'It is used to create new objects',
        'It can only be used in static methods'
      ],
      correctAnswer: 1,
      explanation: 'The `this` keyword refers to the current instance of the class and is used to access instance variables and methods.'
    },
    {
      id: 7,
      question: 'What is the default access modifier for class members if none is specified?',
      options: ['public', 'private', 'protected', 'package-private'],
      correctAnswer: 3,
      explanation: 'If no access modifier is specified, class members have package-private access (accessible within the same package).'
    },
    {
      id: 8,
      question: 'Which of the following can be used to initialize instance variables?',
      options: [
        'Only constructors',
        'Only instance initializer blocks',
        'Only at declaration',
        'Constructors, instance initializer blocks, or at declaration'
      ],
      correctAnswer: 3,
      explanation: 'Instance variables can be initialized in constructors, instance initializer blocks, or at the time of declaration.'
    },
    {
      id: 9,
      question: 'What happens when you try to access a method or variable that doesn\'t exist?',
      options: [
        'The program continues with default values',
        'A compilation error occurs',
        'A NullPointerException is thrown',
        'The program terminates silently'
      ],
      correctAnswer: 1,
      explanation: 'Attempting to access non-existent methods or variables results in a compilation error.'
    },
    {
      id: 10,
      question: 'Which of the following is true about the `new` keyword?',
      options: [
        'It can be used to create primitive variables',
        'It allocates memory for objects on the heap',
        'It can only be used with built-in classes',
        'It automatically initializes all object fields to null'
      ],
      correctAnswer: 1,
      explanation: 'The `new` keyword allocates memory on the heap for objects and calls the appropriate constructor.'
    }
  ]
};


