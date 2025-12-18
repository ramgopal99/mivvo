import { Exercise } from '../../../../data/lessonsData';

export const exercise_7_8: Exercise = {
  id: 7.8,
  title: 'Java Inheritance - Advanced Concepts',
  type: 'mcq',
  questions: [
    {
      question: 'What is the diamond problem in multiple inheritance?',
      options: [
        'A problem with method overloading',
        'Ambiguity when a class inherits from two classes that have a common ancestor',
        'A problem with constructor chaining',
        'An issue with abstract classes'
      ],
      correctAnswer: 1,
      explanation: 'The diamond problem occurs when a class inherits from two classes that have a common ancestor, creating ambiguity about which implementation to use.'
    },
    {
      question: 'Which of the following is a correct way to implement multiple inheritance in Java?',
      options: [
        'Using the extends keyword with multiple classes',
        'Using interfaces',
        'Using abstract classes only',
        'Java does not support multiple inheritance'
      ],
      correctAnswer: 1,
      explanation: 'Java supports multiple inheritance through interfaces - a class can implement multiple interfaces.'
    },
    {
      question: 'What is the output of this code?\n```java\nclass A {\n    void method() { System.out.println("A"); }\n}\nclass B extends A {\n    void method() { System.out.println("B"); }\n}\nA obj = new B();\nobj.method();\n```',
      options: [
        'A',
        'B',
        'Compilation error',
        'Runtime error'
      ],
      correctAnswer: 1,
      explanation: 'This demonstrates polymorphism - the method called depends on the actual object type (B), not the reference type (A).'
    },
    {
      question: 'Which statement about composition vs inheritance is correct?',
      options: [
        'Inheritance is always better than composition',
        'Composition provides more flexibility than inheritance',
        'Composition cannot achieve the same results as inheritance',
        'Inheritance is more flexible than composition'
      ],
      correctAnswer: 1,
      explanation: 'Composition is generally more flexible than inheritance because it allows you to change behavior at runtime and avoid tight coupling.'
    },
    {
      question: 'What is a covariant return type?',
      options: [
        'A return type that changes based on input parameters',
        'An overridden method that returns a more specific type than the parent method',
        'A method that returns different types in different situations',
        'A return type that is compatible with multiple inheritance'
      ],
      correctAnswer: 1,
      explanation: 'Covariant return types allow an overridden method to return a more specific type than the method it overrides.'
    },
    {
      question: 'Which design pattern commonly uses inheritance?',
      options: [
        'Strategy pattern',
        'Decorator pattern',
        'Template Method pattern',
        'Observer pattern'
      ],
      correctAnswer: 2,
      explanation: 'The Template Method pattern uses inheritance - an abstract base class defines the algorithm structure, and subclasses implement specific steps.'
    },
    {
      question: 'What is method hiding in Java?',
      options: [
        'When a subclass method is not accessible',
        'When a static method in subclass has the same signature as a static method in superclass',
        'When a method is declared private',
        'When a method is declared final'
      ],
      correctAnswer: 1,
      explanation: 'Method hiding occurs when a static method in a subclass has the same signature as a static method in the superclass.'
    },
    {
      question: 'Which of the following violates the Liskov Substitution Principle?',
      options: [
        'A Square class extending Rectangle where setWidth() and setHeight() maintain square properties',
        'A Car class extending Vehicle with drive() method',
        'A Dog class extending Animal with makeSound() method',
        'A Student class extending Person with study() method'
      ],
      correctAnswer: 0,
      explanation: 'The Square-Rectangle example violates LSP because a Square cannot be substituted for a Rectangle without changing expected behavior.'
    },
    {
      question: 'What is the purpose of the super keyword in method overriding?',
      options: [
        'To call the overridden method in the superclass',
        'To prevent method overriding',
        'To make the method static',
        'To change method visibility'
      ],
      correctAnswer: 0,
      explanation: 'super.methodName() can be used in an overridden method to call the parent class implementation.'
    },
    {
      question: 'Which inheritance hierarchy depth is generally considered acceptable?',
      options: [
        '1-2 levels',
        '3-5 levels',
        '6-8 levels',
        'As deep as needed'
      ],
      correctAnswer: 0,
      explanation: 'Shallow inheritance hierarchies (1-2 levels) are generally preferred as deep hierarchies become hard to understand and maintain.'
    },
    {
      question: 'What happens when you try to instantiate an abstract class?',
      options: [
        'It creates an object with default implementations',
        'It creates an object but abstract methods throw exceptions',
        'Compilation error occurs',
        'Runtime error occurs'
      ],
      correctAnswer: 2,
      explanation: 'Attempting to instantiate an abstract class directly results in a compilation error.'
    },
    {
      question: 'Which of the following is true about final methods?',
      options: [
        'Final methods can be overridden in subclasses',
        'Final methods cannot be overridden in subclasses',
        'Final methods can only be static',
        'Final methods cannot have parameters'
      ],
      correctAnswer: 1,
      explanation: 'Final methods cannot be overridden in subclasses - they provide the final implementation.'
    },
    {
      question: 'What is the benefit of using abstract classes over interfaces?',
      options: [
        'Abstract classes allow multiple inheritance',
        'Abstract classes can provide default implementations',
        'Abstract classes are more flexible than interfaces',
        'Abstract classes can be instantiated'
      ],
      correctAnswer: 1,
      explanation: 'Abstract classes can provide both abstract and concrete methods, allowing code reuse through inheritance.'
    },
    {
      question: 'Which statement about protected access is correct?',
      options: [
        'Protected members are only accessible within the same package',
        'Protected members are accessible within the same package and by subclasses',
        'Protected members are accessible everywhere',
        'Protected members are less accessible than default members'
      ],
      correctAnswer: 1,
      explanation: 'Protected members are accessible within the same package and by subclasses in other packages.'
    },
    {
      question: 'What is runtime polymorphism?',
      options: [
        'Method overloading resolved at compile time',
        'Method overriding resolved at runtime based on actual object type',
        'Constructor overloading',
        'Static method binding'
      ],
      correctAnswer: 1,
      explanation: 'Runtime polymorphism occurs when method overriding is resolved at runtime based on the actual object type, not the reference type.'
    },
    {
      question: 'Which of the following should NOT be made final?',
      options: [
        'Utility classes like Math',
        'Classes with sensitive security logic',
        'Classes that might need extension in the future',
        'Immutable value classes'
      ],
      correctAnswer: 2,
      explanation: 'Classes that might need extension in the future should not be made final, as final prevents inheritance.'
    },
    {
      question: 'What is the difference between extends and implements?',
      options: [
        'extends is for interfaces, implements is for classes',
        'extends creates inheritance, implements creates interface implementation',
        'extends allows multiple inheritance, implements does not',
        'There is no difference'
      ],
      correctAnswer: 1,
      explanation: 'extends creates class inheritance relationships, while implements creates interface implementation relationships.'
    },
    {
      question: 'Which inheritance pattern should be preferred?',
      options: [
        'Deep inheritance hierarchies',
        'Composition over inheritance',
        'Multiple inheritance',
        'Final classes everywhere'
      ],
      correctAnswer: 1,
      explanation: 'Composition over inheritance is generally preferred as it provides better flexibility and avoids tight coupling.'
    },
    {
      question: 'What is the result of casting a superclass reference to a subclass?',
      options: [
        'Always successful',
        'May cause ClassCastException if the object is not of the target type',
        'Changes the object type permanently',
        'Creates a new object'
      ],
      correctAnswer: 1,
      explanation: 'Downcasting from superclass to subclass may cause ClassCastException if the object is not actually of the target subclass type.'
    },
    {
      question: 'Which of the following promotes code reuse through inheritance?',
      options: [
        'Method overriding',
        'Method overloading',
        'Constructor chaining',
        'All of the above'
      ],
      correctAnswer: 3,
      explanation: 'All of these features (method overriding, overloading, constructor chaining) promote code reuse through inheritance.'
    }
  ]
};


