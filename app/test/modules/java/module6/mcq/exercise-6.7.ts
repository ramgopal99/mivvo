import { Exercise } from '../../../../data/lessonsData';

export const exercise_6_7: Exercise = {
  id: "6.7",
  title: 'Java Classes and Objects - Basic Concepts',
  type: 'mcq',
  questions: [
    {
      question: 'What is the primary difference between a class and an object?',
      options: [
        'A class is a template, an object is an instance of that template',
        'A class contains data, an object contains methods',
        'A class is created at compile-time, an object at runtime',
        'A class is mutable, an object is immutable'
      ],
      correctAnswer: 0,
      explanation: 'A class is a blueprint or template that defines structure and behavior, while an object is a concrete instance created from that class.'
    },
    {
      question: 'Which of the following is true about object references in Java?',
      options: [
        'Multiple references can point to the same object',
        'Each object can have only one reference',
        'References store the actual object data',
        'References cannot be reassigned'
      ],
      correctAnswer: 0,
      explanation: 'Multiple reference variables can point to the same object in memory, allowing different parts of the code to access the same object.'
    },
    {
      question: 'What is encapsulation in object-oriented programming?',
      options: [
        'The ability to create multiple objects from one class',
        'The bundling of data and methods that operate on that data',
        'The creation of objects using the new keyword',
        'The inheritance of properties from parent classes'
      ],
      correctAnswer: 1,
      explanation: 'Encapsulation is the practice of bundling data (fields) and methods that operate on that data within a single unit (class).'
    },
    {
      question: 'Which keyword is used to create an object in Java?',
      options: [
        'create',
        'new',
        'instance',
        'object'
      ],
      correctAnswer: 1,
      explanation: 'The new keyword is used to create new instances (objects) of a class.'
    },
    {
      question: 'What happens when you assign one object reference to another?',
      options: [
        'A new object is created',
        'The object is copied',
        'Both references point to the same object',
        'A compilation error occurs'
      ],
      correctAnswer: 2,
      explanation: 'When you assign one object reference to another, both references point to the same object in memory.'
    },
    {
      question: 'Which of the following statements about classes is correct?',
      options: [
        'A class can be instantiated directly',
        'A class defines the structure and behavior of objects',
        'A class contains actual data values',
        'A class is created at runtime'
      ],
      correctAnswer: 1,
      explanation: 'A class serves as a blueprint that defines the fields (data) and methods (behavior) that objects of that class will have.'
    },
    {
      question: 'What is the purpose of a constructor in Java?',
      options: [
        'To destroy objects',
        'To initialize objects when they are created',
        'To compare two objects',
        'To convert objects to strings'
      ],
      correctAnswer: 1,
      explanation: 'A constructor is a special method that is called when an object is created, used to initialize the object\'s state.'
    },
    {
      question: 'Which statement about object creation is true?',
      options: [
        'Objects can be created without using the new keyword',
        'The new keyword allocates memory for the object',
        'Objects are created at compile-time',
        'All objects have the same memory size'
      ],
      correctAnswer: 1,
      explanation: 'The new keyword allocates memory for the object on the heap and calls the appropriate constructor.'
    },
    {
      question: 'What is abstraction in object-oriented programming?',
      options: [
        'Hiding implementation details and showing only essential features',
        'Creating multiple instances of a class',
        'Converting objects to different types',
        'Combining data and methods in a class'
      ],
      correctAnswer: 0,
      explanation: 'Abstraction focuses on the essential characteristics of an object while hiding unnecessary implementation details.'
    },
    {
      question: 'Which of the following can be included in a class definition?',
      options: [
        'Fields only',
        'Methods only',
        'Fields, methods, constructors, and nested classes',
        'Objects only'
      ],
      correctAnswer: 2,
      explanation: 'A class can contain fields (data), methods (behavior), constructors (initialization), and even nested classes.'
    },
    {
      question: 'What is the relationship between a class and its objects?',
      options: [
        'One-to-one: each class can have only one object',
        'One-to-many: one class can create many objects',
        'Many-to-one: many classes can create one object',
        'Many-to-many: multiple classes can share multiple objects'
      ],
      correctAnswer: 1,
      explanation: 'One class definition can be used to create multiple objects (instances) of that class.'
    },
    {
      question: 'Which principle of OOP is demonstrated by using private fields with public getter/setter methods?',
      options: [
        'Inheritance',
        'Polymorphism',
        'Encapsulation',
        'Abstraction'
      ],
      correctAnswer: 2,
      explanation: 'Using private fields with public getter/setter methods demonstrates encapsulation by hiding the internal representation.'
    },
    {
      question: 'What happens to an object when there are no more references to it?',
      options: [
        'It is immediately destroyed',
        'It becomes eligible for garbage collection',
        'It is moved to a different memory location',
        'Its memory is automatically freed'
      ],
      correctAnswer: 1,
      explanation: 'When an object has no more references pointing to it, it becomes eligible for garbage collection by the JVM.'
    },
    {
      question: 'Which of the following is NOT a characteristic of objects?',
      options: [
        'Objects have state (fields)',
        'Objects have behavior (methods)',
        'Objects have identity (unique reference)',
        'Objects are defined at compile-time'
      ],
      correctAnswer: 3,
      explanation: 'Objects are created at runtime using the new keyword. Classes are defined at compile-time.'
    },
    {
      question: 'What is the main benefit of using classes and objects?',
      options: [
        'Faster program execution',
        'Easier code organization and reusability',
        'Reduced memory usage',
        'Automatic error handling'
      ],
      correctAnswer: 1,
      explanation: 'Classes and objects provide better code organization, reusability, and maintainability through encapsulation and abstraction.'
    }
  ]
};



