import { Exercise } from '../../../../data/lessonsData';

export const exercise_16_1: Exercise = {
  id: "16.1",
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What does the ? extends T wildcard represent in Java generics?",
      options: ["Any type that is a supertype of T", "Any type that is a subtype of T", "Exactly type T", "Any type except T"],
      correctAnswer: 1,
      explanation: "? extends T represents any type that is a subtype of T, allowing read operations but not write operations."
    },
    {
      id: "q2",
      question: "What does the ? super T wildcard represent in Java generics?",
      options: ["Any type that is a supertype of T", "Any type that is a subtype of T", "Exactly type T", "Any reference type"],
      correctAnswer: 0,
      explanation: "? super T represents any type that is a supertype of T, allowing write operations but restricting read operations."
    },
    {
      id: "q3",
      question: "Which of the following is true about bounded wildcards?",
      options: ["? extends T is for producers", "? super T is for producers", "Both are for consumers", "Neither supports generics"],
      correctAnswer: 0,
      explanation: "? extends T is for producers (PECS principle - Producer Extends), allowing safe reading of elements."
    },
    {
      id: "q4",
      question: "What is the PECS principle in Java generics?",
      options: ["Producer Extends Consumer Super", "Producer Extends Consumer Subtypes", "Producers Extend Consumers Super", "None of the above"],
      correctAnswer: 0,
      explanation: "PECS stands for 'Producer Extends, Consumer Super' - use ? extends T for producers and ? super T for consumers."
    },
    {
      id: "q5",
      question: "Which Java collection uses a Red-Black tree internally?",
      options: ["HashMap", "ArrayList", "TreeMap", "LinkedList"],
      correctAnswer: 2,
      explanation: "TreeMap uses a Red-Black tree implementation to maintain sorted order of keys."
    },
    {
      id: "q6",
      question: "What is the time complexity of HashMap operations in Java?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 0,
      explanation: "HashMap provides average O(1) time complexity for get and put operations."
    },
    {
      id: "q7",
      question: "Which interface should be implemented for custom sorting in Java?",
      options: ["Serializable", "Comparable", "Runnable", "Cloneable"],
      correctAnswer: 1,
      explanation: "Comparable interface should be implemented to define natural ordering for objects."
    },
    {
      id: "q8",
      question: "What does the Optional class help prevent in Java?",
      options: ["Memory leaks", "Null pointer exceptions", "Type casting errors", "Concurrent modification exceptions"],
      correctAnswer: 1,
      explanation: "Optional class helps prevent null pointer exceptions by providing a container that may or may not contain a value."
    },
    {
      id: "q9",
      question: "Which method creates an Optional with a value?",
      options: ["Optional.empty()", "Optional.ofNullable()", "Optional.of()", "Optional.none()"],
      correctAnswer: 2,
      explanation: "Optional.of() creates an Optional with a non-null value, throwing NullPointerException if the value is null."
    },
    {
      id: "q10",
      question: "What does the @FunctionalInterface annotation indicate?",
      options: ["The interface has multiple abstract methods", "The interface has exactly one abstract method", "The interface is deprecated", "The interface cannot be implemented"],
      correctAnswer: 1,
      explanation: "@FunctionalInterface indicates that the interface has exactly one abstract method, making it suitable for lambda expressions."
    }
  ]
};

