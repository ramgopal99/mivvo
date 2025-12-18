import { Exercise } from '../../../../data/lessonsData';

export const exercise_7_7: Exercise = {
  id: 7.7,
  title: 'Java Inheritance - Basic Concepts',
  type: 'mcq',
  questions: [
    {
      question: 'What is inheritance in Java?',
      options: [
        'A way to create multiple instances of a class',
        'A mechanism where one class acquires the properties and behaviors of another class',
        'A way to hide implementation details',
        'A method of organizing code into packages'
      ],
      correctAnswer: 1,
      explanation: 'Inheritance allows a class (subclass) to acquire the properties and behaviors of another class (superclass).'
    },
    {
      question: 'Which keyword is used to create a subclass in Java?',
      options: [
        'implements',
        'extends',
        'inherits',
        'super'
      ],
      correctAnswer: 1,
      explanation: 'The extends keyword is used to create a subclass that inherits from a superclass.'
    },
    {
      question: 'What is the relationship between a superclass and subclass?',
      options: [
        'Superclass inherits from subclass',
        'Subclass inherits from superclass',
        'They are independent classes',
        'Superclass contains subclass'
      ],
      correctAnswer: 1,
      explanation: 'In inheritance, the subclass inherits properties and methods from the superclass.'
    },
    {
      question: 'Which of the following is true about method overriding?',
      options: [
        'It allows a subclass to define a method with the same name but different parameters',
        'It allows a subclass to provide a specific implementation of a method already defined in its superclass',
        'It creates a new method in the subclass',
        'It hides the superclass method completely'
      ],
      correctAnswer: 1,
      explanation: 'Method overriding allows a subclass to provide its own implementation of a method defined in the superclass.'
    },
    {
      question: 'What does the super() keyword do?',
      options: [
        'Creates a new instance of the superclass',
        'Calls the superclass constructor',
        'Accesses superclass methods and fields',
        'All of the above'
      ],
      correctAnswer: 3,
      explanation: 'super() calls the superclass constructor, and super can access superclass methods and fields.'
    },
    {
      question: 'Which access modifier allows subclass access but not external access?',
      options: [
        'public',
        'private',
        'protected',
        'default'
      ],
      correctAnswer: 2,
      explanation: 'Protected members are accessible within the same package and by subclasses in other packages.'
    },
    {
      question: 'What is polymorphism in the context of inheritance?',
      options: [
        'The ability of a class to have multiple constructors',
        'The ability of objects of different classes to be treated as objects of a common superclass',
        'The ability to create multiple inheritance',
        'The ability to override static methods'
      ],
      correctAnswer: 1,
      explanation: 'Polymorphism allows objects of different classes to be treated as objects of a common superclass.'
    },
    {
      question: 'Which statement about final classes is correct?',
      options: [
        'Final classes can be extended',
        'Final classes cannot be extended',
        'Final classes can only have final methods',
        'Final classes cannot have constructors'
      ],
      correctAnswer: 1,
      explanation: 'Final classes cannot be extended (inherited from) by other classes.'
    },
    {
      question: 'What is the purpose of the @Override annotation?',
      options: [
        'Forces the method to be overridden',
        'Provides compile-time checking that the method is actually overriding a parent method',
        'Makes the method final',
        'Changes the method visibility'
      ],
      correctAnswer: 1,
      explanation: '@Override provides compile-time checking to ensure the method is actually overriding a parent method.'
    },
    {
      question: 'Which of the following can be inherited?',
      options: [
        'Private fields and methods',
        'Public and protected fields and methods',
        'Constructors',
        'Static methods'
      ],
      correctAnswer: 1,
      explanation: 'Public and protected fields and methods can be inherited, while private members and constructors cannot be directly inherited.'
    },
    {
      question: 'What is the difference between method overriding and method overloading?',
      options: [
        'Overriding changes method signature, overloading keeps it the same',
        'Overriding occurs in the same class, overloading in different classes',
        'Overriding provides different implementation, overloading provides same implementation',
        'Overriding has same method signature, overloading has different parameters'
      ],
      correctAnswer: 3,
      explanation: 'Method overriding has the same method signature but different implementation, while method overloading has different parameters but same method name.'
    },
    {
      question: 'Which inheritance relationship is NOT supported in Java?',
      options: [
        'Single inheritance',
        'Multiple inheritance',
        'Multilevel inheritance',
        'Hierarchical inheritance'
      ],
      correctAnswer: 1,
      explanation: 'Java does not support multiple inheritance (a class inheriting from multiple classes) to avoid the diamond problem.'
    },
    {
      question: 'What happens when a subclass constructor is called?',
      options: [
        'Only the subclass constructor executes',
        'The superclass constructor is called automatically',
        'The subclass must explicitly call the superclass constructor',
        'No constructors are called'
      ],
      correctAnswer: 1,
      explanation: 'When a subclass constructor is called, the superclass constructor is called automatically (unless super() is explicitly called).'
    },
    {
      question: 'Which of the following statements about abstract classes is correct?',
      options: [
        'Abstract classes can be instantiated',
        'Abstract classes cannot have concrete methods',
        'Abstract classes can have abstract methods',
        'Abstract classes cannot have constructors'
      ],
      correctAnswer: 2,
      explanation: 'Abstract classes can have abstract methods (which must be implemented by subclasses) and can also have concrete methods.'
    },
    {
      question: 'What is the Liskov Substitution Principle?',
      options: [
        'Subclasses should not override parent methods',
        'Objects of subclasses should be substitutable for objects of the superclass',
        'Superclasses should not have abstract methods',
        'Inheritance hierarchies should be deep'
      ],
      correctAnswer: 1,
      explanation: 'The Liskov Substitution Principle states that objects of subclasses should be substitutable for objects of the superclass without affecting program correctness.'
    }
  ]
};


