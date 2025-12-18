import { Exercise } from '../../../../data/lessonsData';

export const exercise_1_3: Exercise = {
  id: "1.3",
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Who created the Java programming language?",
      options: ["James Gosling", "Guido van Rossum", "Dennis Ritchie", "Bjarne Stroustrup"],
      correctAnswer: 0,
      explanation: "Java was created by James Gosling while working at Sun Microsystems in the early 1990s."
    },
    {
      id: "q2",
      question: "What does WORA stand for in Java?",
      options: ["Write Once, Run Anywhere", "Write Only, Read Anywhere", "Work Once, Rest Anywhere", "Windows Only, Run Applications"],
      correctAnswer: 0,
      explanation: "'Write Once, Run Anywhere' is Java's core principle that allows Java programs to run on any platform with a JVM."
    },
    {
      id: "q3",
      question: "In which year was Java first released to the public?",
      options: ["1991", "1995", "1998", "2000"],
      correctAnswer: 1,
      explanation: "Java was first released in 1995 as Java 1.0 by Sun Microsystems."
    },
    {
      id: "q4",
      question: "What is the primary difference between JDK and JRE?",
      options: ["JDK is for development, JRE is for running applications", "JDK runs faster than JRE", "JRE includes compilers, JDK does not", "They are exactly the same"],
      correctAnswer: 0,
      explanation: "JDK (Java Development Kit) includes development tools like compilers, while JRE (Java Runtime Environment) only allows running Java applications."
    },
    {
      id: "q5",
      question: "Which of the following is NOT a core principle of object-oriented programming in Java?",
      options: ["Encapsulation", "Inheritance", "Polymorphism", "Compilation"],
      correctAnswer: 3,
      explanation: "Encapsulation, Inheritance, and Polymorphism are the three core principles of OOP. Compilation is a separate process in Java, not an OOP principle."
    },
    {
      id: "q6",
      question: "What is the correct way to declare the main method in Java?",
      options: ["public static void main(String args[])", "void main(String[] args)", "public void main(String args[])", "static void main()"],
      correctAnswer: 0,
      explanation: "The main method in Java must be public, static, void, and take a String array parameter: public static void main(String[] args)."
    },
    {
      id: "q7",
      question: "What does JVM stand for in Java?",
      options: ["Java Virtual Machine", "Java Variable Manager", "Java Version Monitor", "Java Visual Model"],
      correctAnswer: 0,
      explanation: "JVM stands for Java Virtual Machine, which is responsible for executing Java bytecode on any platform."
    },
    {
      id: "q8",
      question: "Which company originally developed Java?",
      options: ["Oracle Corporation", "Sun Microsystems", "Microsoft", "Google"],
      correctAnswer: 1,
      explanation: "Java was originally developed by Sun Microsystems. Oracle acquired Sun Microsystems in 2010."
    }
  ]
};

