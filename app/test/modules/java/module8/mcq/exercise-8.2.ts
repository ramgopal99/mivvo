import { Exercise } from '../../../../data/lessonsData';

export const exercise_8_2: Exercise = {
  id: "8.2",
  title: 'Classes & Objects Project',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which of the following correctly creates an object in Java?",
      options: ["MyClass obj = MyClass();", "MyClass obj = new MyClass();", "MyClass obj = MyClass.new();", "new obj = MyClass();"],
      correctAnswer: 1,
      explanation: "Objects are created using the 'new' keyword followed by the constructor call: MyClass obj = new MyClass();"
    },
    {
      id: "q2",
      question: "What is the correct way to define a constructor in Java?",
      options: ["public void MyClass() {}", "public MyClass() {}", "public static MyClass() {}", "public MyClass void() {}"],
      correctAnswer: 1,
      explanation: "Constructors have the same name as the class and no return type: public MyClass() {}"
    },
    {
      id: "q3",
      question: "Which access modifier makes a member accessible only within the same class?",
      options: ["public", "protected", "private", "default"],
      correctAnswer: 2,
      explanation: "The 'private' access modifier restricts access to only within the same class."
    },
    {
      id: "q4",
      question: "What is method overloading in Java?",
      options: ["Multiple methods with the same name but different return types", "Multiple methods with the same name but different parameters", "Multiple methods with different names but same parameters", "Methods that override parent class methods"],
      correctAnswer: 1,
      explanation: "Method overloading allows multiple methods with the same name but different parameter lists in the same class."
    },
    {
      id: "q5",
      question: "Which keyword is used to access the current object in Java?",
      options: ["self", "this", "super", "current"],
      correctAnswer: 1,
      explanation: "'this' keyword refers to the current instance of the class and is used to access instance variables and methods."
    },
    {
      id: "q6",
      question: "What is the purpose of static methods in Java?",
      options: ["They belong to instances of the class", "They belong to the class itself and can be called without creating an object", "They are automatically final", "They cannot access instance variables"],
      correctAnswer: 1,
      explanation: "Static methods belong to the class itself, not to any instance, and can be called using the class name without creating an object."
    },
    {
      id: "q7",
      question: "Which of the following can be declared as final in Java?",
      options: ["Variables, methods, and classes", "Only variables", "Only methods", "Only classes"],
      correctAnswer: 0,
      explanation: "The 'final' keyword can be applied to variables (making them constants), methods (preventing overriding), and classes (preventing inheritance)."
    },
    {
      id: "q8",
      question: "What is encapsulation in Java?",
      options: ["Hiding implementation details and providing controlled access", "Creating multiple constructors", "Using static methods", "Overriding methods"],
      correctAnswer: 0,
      explanation: "Encapsulation is the practice of hiding internal implementation details and providing controlled access through getters and setters."
    },
    {
      id: "q9",
      question: "Which statement about inner classes is true?",
      options: ["Inner classes can be static", "Inner classes cannot access outer class members", "Inner classes must be declared as public", "Inner classes cannot have constructors"],
      correctAnswer: 0,
      explanation: "Inner classes can be static (static nested classes) or non-static, and static nested classes don't hold references to outer instances."
    },
    {
      id: "q10",
      question: "What happens when you use the 'new' keyword in Java?",
      options: ["It calls the garbage collector", "It allocates memory for the object and calls the constructor", "It only calls the constructor", "It creates a reference variable"],
      correctAnswer: 1,
      explanation: "The 'new' keyword allocates memory for the object in the heap and then calls the appropriate constructor to initialize it."
    },
    {
      id: "q11",
      question: "Which of the following is true about immutable objects?",
      options: ["Their state can be changed after creation", "They are always thread-safe", "They cannot have constructors", "They must be declared as final"],
      correctAnswer: 1,
      explanation: "Immutable objects cannot be modified after creation and are inherently thread-safe because their state cannot change."
    },
    {
      id: "q12",
      question: "What is the difference between static and instance variables?",
      options: ["Static variables belong to instances, instance variables belong to the class", "Both are the same", "Static variables are shared by all instances, instance variables are unique to each instance", "Static variables cannot be changed, instance variables can"],
      correctAnswer: 2,
      explanation: "Static variables are shared among all instances of the class, while instance variables are unique to each object instance."
    },
    {
      id: "q13",
      question: "Which of the following is NOT a valid constructor chaining technique?",
      options: ["this()", "super()", "this.super()", "Calling another constructor in the same class"],
      correctAnswer: 2,
      explanation: "'this.super()' is not valid syntax. Constructor chaining uses either 'this()' to call another constructor in the same class or 'super()' to call a parent class constructor."
    },
    {
      id: "q14",
      question: "What is the purpose of the 'super' keyword in Java?",
      options: ["To call static methods", "To access parent class members and constructors", "To create objects", "To declare final methods"],
      correctAnswer: 1,
      explanation: "'super' is used to access parent class members (variables and methods) and to call parent class constructors."
    },
    {
      id: "q15",
      question: "Which statement about anonymous classes is correct?",
      options: ["They can be reused multiple times", "They are used for one-time implementations", "They must have names", "They cannot implement interfaces"],
      correctAnswer: 1,
      explanation: "Anonymous classes are defined and instantiated in a single expression, typically used for one-time implementations of interfaces or abstract classes."
    }
  ]
};

