import { Exercise } from '../../../../data/lessonsData';

export const exercise_12_1: Exercise = {
  id: "12.1",
  title: 'Collections Framework MCQ',
  status: 'completed',
  questions: [
    {
      id: 1,
      question: 'What is the main purpose of the Java Collections Framework?',
      options: [
        'To handle user input',
        'To provide a unified architecture for storing and manipulating groups of objects',
        'To perform mathematical calculations',
        'To create graphical user interfaces'
      ],
      correctAnswer: 1,
      explanation: 'The Collections Framework provides interfaces and classes for storing and manipulating groups of objects.'
    },
    {
      id: 2,
      question: 'Which of the following is NOT a core interface in the Collections Framework?',
      options: ['List', 'Set', 'Map', 'Array'],
      correctAnswer: 3,
      explanation: 'Array is not a core interface in the Collections Framework. The main interfaces are List, Set, Queue, and Map.'
    },
    {
      id: 3,
      question: 'What does the List interface represent?',
      options: [
        'An unordered collection with no duplicates',
        'An ordered collection that allows duplicates',
        'A collection of key-value pairs',
        'A collection designed for processing elements in FIFO order'
      ],
      correctAnswer: 1,
      explanation: 'List represents an ordered collection (sequence) that can contain duplicate elements.'
    },
    {
      id: 4,
      question: 'Which Set implementation maintains insertion order?',
      options: ['HashSet', 'TreeSet', 'LinkedHashSet', 'EnumSet'],
      correctAnswer: 2,
      explanation: 'LinkedHashSet maintains the insertion order of elements while preventing duplicates.'
    },
    {
      id: 5,
      question: 'What is the primary difference between List and Set?',
      options: [
        'List is ordered, Set is unordered',
        'List allows duplicates, Set does not',
        'List is thread-safe, Set is not',
        'List has fixed size, Set grows dynamically'
      ],
      correctAnswer: 1,
      explanation: 'The main difference is that List allows duplicate elements while Set does not allow duplicates.'
    }
  ]
};


