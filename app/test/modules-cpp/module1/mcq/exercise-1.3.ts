import { Exercise } from '../../../data/lessonsData';

export const exercise_1_3: Exercise = {
  id: 1.3,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Who created the C++ programming language?",
      options: ["Dennis Ritchie", "Bjarne Stroustrup", "James Gosling", "Guido van Rossum"],
      correctAnswer: 1,
      explanation: "C++ was created by Bjarne Stroustrup at Bell Labs, starting as 'C with Classes' in 1979."
    },
    {
      id: "q2",
      question: "What is the correct way to declare a class in C++?",
      options: ["struct MyClass {}", "class MyClass {}", "Both struct and class work the same way", "object MyClass {}"],
      correctAnswer: 2,
      explanation: "In C++, both 'struct' and 'class' can be used to declare classes. The only difference is default access (public for struct, private for class)."
    },
    {
      id: "q3",
      question: "Which C++ feature allows writing generic code that works with different data types?",
      options: ["Inheritance", "Polymorphism", "Templates", "Encapsulation"],
      correctAnswer: 2,
      explanation: "Templates in C++ allow you to write generic code that can work with different data types, enabling generic programming."
    },
    {
      id: "q4",
      question: "What is RAII in C++?",
      options: ["Resource Allocation Is Initialization", "Random Access Integer Interface", "Runtime Array Index Implementation", "Resource Acquisition Is Important"],
      correctAnswer: 0,
      explanation: "RAII (Resource Acquisition Is Initialization) is a C++ programming idiom where resource management is tied to object lifetime."
    },
    {
      id: "q5",
      question: "Which smart pointer automatically manages memory and prevents memory leaks?",
      options: ["raw pointer (*)", "unique_ptr", "weak_ptr", "auto_ptr"],
      correctAnswer: 1,
      explanation: "unique_ptr is a smart pointer that automatically manages memory and ensures exclusive ownership, preventing memory leaks."
    },
    {
      id: "q6",
      question: "What does the 'auto' keyword do in modern C++?",
      options: ["Creates automatic variables", "Automatically deduces variable types", "Creates objects automatically", "Enables auto-save feature"],
      correctAnswer: 1,
      explanation: "'auto' keyword in C++11 and later automatically deduces the type of a variable from its initializer."
    },
    {
      id: "q7",
      question: "Which STL container provides O(1) access to elements by index?",
      options: ["std::list", "std::vector", "std::deque", "std::set"],
      correctAnswer: 1,
      explanation: "std::vector provides O(1) access to elements by index, making it suitable for random access operations."
    },
    {
      id: "q8",
      question: "What is a lambda expression in C++?",
      options: ["A mathematical constant", "An anonymous function object", "A type of loop", "A preprocessor directive"],
      correctAnswer: 1,
      explanation: "Lambda expressions (introduced in C++11) are anonymous function objects that can be used inline, often with algorithms."
    },
    {
      id: "q9",
      question: "Which C++ standard introduced smart pointers and move semantics?",
      options: ["C++98", "C++03", "C++11", "C++17"],
      correctAnswer: 2,
      explanation: "C++11 introduced smart pointers (unique_ptr, shared_ptr), move semantics, and many other modern C++ features."
    },
    {
      id: "q10",
      question: "What is the purpose of the 'override' keyword in C++?",
      options: ["To override virtual functions", "To indicate function overriding explicitly", "To override default parameters", "To override access specifiers"],
      correctAnswer: 1,
      explanation: "The 'override' keyword (C++11) explicitly indicates that a virtual function is intended to override a base class function, enabling compiler checks."
    }
  ]
};
