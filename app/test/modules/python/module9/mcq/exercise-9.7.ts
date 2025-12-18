import { Exercise } from '../../../../data/lessonsData';

export const exercise_9_7: Exercise = {
  id: "9.7",
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is a class in Python?",
      options: ["A built-in data type", "A blueprint for creating objects", "A function that returns values", "A type of loop"],
      correctAnswer: 1,
      explanation: "A class is a blueprint or template for creating objects. It defines the properties and methods that objects of that class will have."
    },
    {
      id: "q2",
      question: "Which keyword is used to define a class?",
      options: ["function", "class", "object", "define"],
      correctAnswer: 1,
      explanation: "The 'class' keyword is used to define a class in Python. The syntax is: class ClassName:"
    },
    {
      id: "q3",
      question: "What is an object in OOP?",
      options: ["A class definition", "An instance of a class", "A method", "A variable"],
      correctAnswer: 1,
      explanation: "An object is an instance of a class. When you create an object from a class, you're instantiating that class."
    },
    {
      id: "q4",
      question: "Which method is automatically called when an object is created?",
      options: ["__init__", "__str__", "__main__", "__new__"],
      correctAnswer: 0,
      explanation: "__init__ is the constructor method that's automatically called when an object is created from a class."
    },
    {
      id: "q5",
      question: "What is 'self' in Python classes?",
      options: ["A keyword for class definition", "A reference to the current instance", "A method name", "A built-in function"],
      correctAnswer: 1,
      explanation: "'self' is a reference to the current instance of the class. It's the first parameter in instance methods."
    },
    {
      id: "q6",
      question: "Which of these defines a method in a class?",
      options: ["def method_name():", "def method_name(self):", "function method_name():", "method method_name():"],
      correctAnswer: 1,
      explanation: "Instance methods in classes must have 'self' as the first parameter: def method_name(self):"
    },
    {
      id: "q7",
      question: "What does encapsulation mean in OOP?",
      options: ["Hiding data and methods within a class", "Creating multiple classes", "Inheriting from parent classes", "Using objects in programs"],
      correctAnswer: 0,
      explanation: "Encapsulation is the concept of bundling data and methods that work on that data within a single unit (class), and restricting access to some components."
    },
    {
      id: "q8",
      question: "Which symbol is used to access attributes and methods of an object?",
      options: ["->", "::", ".", "#"],
      correctAnswer: 2,
      explanation: "The dot (.) operator is used to access attributes and methods of an object: object.attribute or object.method()"
    },
    {
      id: "q9",
      question: "What is inheritance in OOP?",
      options: ["Creating multiple objects", "A class getting properties from another class", "Hiding data", "Using methods"],
      correctAnswer: 1,
      explanation: "Inheritance allows a class (child/subclass) to inherit attributes and methods from another class (parent/superclass)."
    },
    {
      id: "q10",
      question: "Which keyword is used for inheritance?",
      options: ["extends", "inherits", "ParentClass", "No keyword needed"],
      correctAnswer: 3,
      explanation: "Python uses parentheses in the class definition to specify inheritance: class ChildClass(ParentClass):"
    },
    {
      id: "q11",
      question: "What is a constructor?",
      options: ["A method that destroys objects", "A method that creates objects", "A method that prints objects", "A method that copies objects"],
      correctAnswer: 1,
      explanation: "A constructor is a special method that is automatically called when an object is created from a class."
    },
    {
      id: "q12",
      question: "What does 'obj = MyClass()' do?",
      options: ["Defines a class", "Creates an object", "Calls a method", "Imports a module"],
      correctAnswer: 1,
      explanation: "obj = MyClass() creates an instance (object) of the MyClass class and assigns it to the variable obj."
    },
    {
      id: "q13",
      question: "Which of these is a class attribute?",
      options: ["self.name", "def method(self):", "class_variable = 10", "object.method()"],
      correctAnswer: 2,
      explanation: "class_variable = 10 (defined directly in the class) is a class attribute. self.name is an instance attribute."
    },
    {
      id: "q14",
      question: "What is polymorphism in OOP?",
      options: ["Multiple inheritance", "Same method name, different behavior", "Data hiding", "Object creation"],
      correctAnswer: 1,
      explanation: "Polymorphism allows objects of different classes to respond to the same method call in different ways."
    },
    {
      id: "q15",
      question: "Which method converts an object to a string?",
      options: ["__init__", "__str__", "__repr__", "__len__"],
      correctAnswer: 1,
      explanation: "__str__ is a special method that returns a string representation of the object, used by str() and print()."
    }
  ]
};

