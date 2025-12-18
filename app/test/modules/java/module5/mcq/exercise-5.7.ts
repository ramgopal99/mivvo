import { Exercise } from '../../../../data/lessonsData';

export const exercise_5_7: Exercise = {
  id: 5.7,
  title: 'Java Methods - Basic Concepts',
  type: 'mcq',
  questions: [
    {
      question: 'What is the primary purpose of methods in Java?',
      options: [
        'To store data',
        'To encapsulate reusable code and perform specific tasks',
        'To define class structure',
        'To handle exceptions'
      ],
      correctAnswer: 1,
      explanation: 'Methods encapsulate reusable code blocks that perform specific tasks and can be called from other parts of the program.'
    },
    {
      question: 'Which of the following is NOT a valid method return type?',
      options: [
        'void',
        'int',
        'String',
        'method'
      ],
      correctAnswer: 3,
      explanation: 'void, int, and String are all valid return types. "method" is not a valid return type in Java.'
    },
    {
      question: 'What does the "void" return type indicate?',
      options: [
        'The method returns a null value',
        'The method returns an empty string',
        'The method does not return any value',
        'The method returns a void object'
      ],
      correctAnswer: 2,
      explanation: 'void indicates that the method does not return any value.'
    },
    {
      question: 'Which method modifier makes a method accessible from anywhere?',
      options: [
        'private',
        'protected',
        'default (no modifier)',
        'public'
      ],
      correctAnswer: 3,
      explanation: 'The public modifier makes the method accessible from any class in any package.'
    },
    {
      question: 'What is method overloading?',
      options: [
        'Defining multiple methods with the same name in different classes',
        'Defining multiple methods with the same name but different parameter lists in the same class',
        'Defining methods that override parent class methods',
        'Defining methods that can be called statically'
      ],
      correctAnswer: 1,
      explanation: 'Method overloading allows multiple methods with the same name but different parameter lists in the same class.'
    },
    {
      question: 'Which of the following method signatures is valid for overloading?',
      options: [
        'public void method() and public int method()',
        'public void method(int a) and public void method(int b)',
        'public void method(int a) and public void method(String a)',
        'private void method(int a) and public void method(int a)'
      ],
      correctAnswer: 2,
      explanation: 'Method overloading requires different parameter types. Different parameter names with the same types (option 2) or different return types (option 1) are not valid for overloading.'
    },
    {
      question: 'What is the difference between static and instance methods?',
      options: [
        'Static methods can access instance variables, instance methods cannot',
        'Static methods belong to the class, instance methods belong to objects',
        'Instance methods can be called without creating an object, static methods cannot',
        'There is no difference in functionality'
      ],
      correctAnswer: 1,
      explanation: 'Static methods belong to the class and can be called without creating an instance. Instance methods belong to objects and can access instance variables.'
    },
    {
      question: 'Which statement about method parameters is correct?',
      options: [
        'Parameters are passed by reference for primitive types',
        'Parameters are passed by value for all types',
        'Object parameters are passed by reference, primitives by value',
        'All parameters are passed by reference'
      ],
      correctAnswer: 2,
      explanation: 'In Java, primitive types are passed by value, while object references are passed by value (but the referenced object can be modified).'
    },
    {
      question: 'What does varargs (variable arguments) allow you to do?',
      options: [
        'Pass a variable number of arguments of the same type to a method',
        'Define methods with variable return types',
        'Create variables with dynamic types',
        'Pass arguments in any order'
      ],
      correctAnswer: 0,
      explanation: 'Varargs allows methods to accept a variable number of arguments of the same type using the ... syntax.'
    },
    {
      question: 'Which of the following is a valid varargs method signature?',
      options: [
        'public void method(int... numbers)',
        'public void method(int numbers...)',
        'public void method(...int numbers)',
        'public void method(int... numbers, String name)'
      ],
      correctAnswer: 0,
      explanation: 'Varargs parameters use the type... name syntax and must be the last parameter in the method signature.'
    },
    {
      question: 'What is a method signature?',
      options: [
        'The method body enclosed in curly braces',
        'The method name plus parameter list and return type',
        'Only the method name and return type',
        'The access modifiers and method name'
      ],
      correctAnswer: 1,
      explanation: 'A method signature consists of the method name, parameter types (in order), and may include return type depending on context.'
    },
    {
      question: 'Which of the following can be overloaded?',
      options: [
        'Constructors',
        'Main methods',
        'Static methods',
        'All of the above'
      ],
      correctAnswer: 3,
      explanation: 'Constructors, main methods, and static methods can all be overloaded in Java.'
    },
    {
      question: 'What happens when you call a method with fewer arguments than parameters?',
      options: [
        'The method uses default values for missing parameters',
        'A compilation error occurs',
        'The JVM automatically provides null values',
        'The method is called with null for missing parameters'
      ],
      correctAnswer: 1,
      explanation: 'Java requires exact parameter matching. Missing arguments cause compilation errors.'
    },
    {
      question: 'Which access modifier allows access within the same package but not from subclasses in other packages?',
      options: [
        'public',
        'protected',
        'private',
        'default (no modifier)'
      ],
      correctAnswer: 3,
      explanation: 'The default (package-private) access modifier allows access within the same package only.'
    },
    {
      question: 'What is the purpose of the "final" modifier on methods?',
      options: [
        'Prevents the method from being overloaded',
        'Prevents the method from being overridden in subclasses',
        'Makes the method run faster',
        'Allows the method to be called from anywhere'
      ],
      correctAnswer: 1,
      explanation: 'The final modifier prevents the method from being overridden in subclasses.'
    }
  ]
};


