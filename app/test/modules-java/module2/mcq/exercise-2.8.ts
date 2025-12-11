import { Exercise } from '../../../data/lessonsData';

export const exercise_2_8: Exercise = {
  id: 2.8,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which of the following is the correct syntax for declaring the main method in Java?",
      options: ["public void main(String args[])", "public static void main(String[] args)", "static public void main(String args)", "void main(String[] args)"],
      correctAnswer: 1,
      explanation: "The correct syntax for the main method in Java is 'public static void main(String[] args)' - it must be public, static, return void, and accept a String array parameter."
    },
    {
      id: "q2",
      question: "What is the output of: System.out.println(10 + 20 + \"Hello\");",
      options: ["30Hello", "10Hello20", "1020Hello", "Hello30"],
      correctAnswer: 0,
      explanation: "Java evaluates expressions from left to right. 10 + 20 = 30 (integer addition), then 30 + \"Hello\" = \"30Hello\" (string concatenation)."
    },
    {
      id: "q3",
      question: "Which data type is used to store a single character in Java?",
      options: ["String", "char", "Character", "byte"],
      correctAnswer: 1,
      explanation: "The 'char' primitive data type is used to store single characters in Java. 'Character' is the wrapper class, and 'String' stores sequences of characters."
    },
    {
      id: "q4",
      question: "What is the purpose of the 'new' keyword in Java?",
      options: ["To create a new variable", "To allocate memory for objects", "To declare a new method", "To import a package"],
      correctAnswer: 1,
      explanation: "The 'new' keyword is used to allocate memory for objects and invoke constructors in Java."
    },
    {
      id: "q5",
      question: "Which access modifier makes a class member accessible only within the same class?",
      options: ["public", "protected", "private", "default"],
      correctAnswer: 2,
      explanation: "The 'private' access modifier restricts access to class members only within the same class."
    },
    {
      id: "q6",
      question: "What is method overloading in Java?",
      options: ["Having multiple methods with the same name in different classes", "Having multiple methods with the same name but different parameters", "Having multiple methods with different names", "Having multiple constructors"],
      correctAnswer: 1,
      explanation: "Method overloading allows multiple methods with the same name but different parameter lists (type, number, or order of parameters)."
    },
    {
      id: "q7",
      question: "Which keyword is used to explicitly throw an exception in Java?",
      options: ["catch", "finally", "throw", "throws"],
      correctAnswer: 2,
      explanation: "'throw' is used to explicitly throw an exception, while 'throws' is used in method signatures to declare that a method might throw exceptions."
    },
    {
      id: "q8",
      question: "What does the 'static' keyword mean when applied to a method?",
      options: ["The method can be called without creating an object", "The method belongs to the class rather than instances", "Both A and B", "The method can only be called once"],
      correctAnswer: 2,
      explanation: "Static methods belong to the class rather than any specific instance, and can be called without creating an object of the class."
    },
    {
      id: "q9",
      question: "Which of these is NOT a valid way to declare an array in Java?",
      options: ["int[] arr = new int[5];", "int arr[] = {1, 2, 3};", "int[] arr = new int[]{1, 2, 3};", "int arr = new int[5];"],
      correctAnswer: 3,
      explanation: "Arrays must be declared with square brackets either after the type (int[]) or after the variable name (int arr[]), not just as a simple variable assignment."
    },
    {
      id: "q10",
      question: "What is the difference between '==' and '.equals()' in Java when comparing strings?",
      options: ["They are exactly the same", "'==' compares references, '.equals()' compares content", "'.equals()' compares references, '==' compares content", "'==' is for primitives, '.equals()' is for objects"],
      correctAnswer: 1,
      explanation: "'==' compares object references (memory addresses), while '.equals()' compares the actual content of strings."
    }
  ]
};


