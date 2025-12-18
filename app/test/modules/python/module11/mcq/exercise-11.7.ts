import { Exercise } from '../../../../data/lessonsData';

export const exercise_11_7: Exercise = {
  id: "11.7",
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is the average time complexity of lookup operations in a hash table?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 0,
      explanation: "Hash tables provide average O(1) lookup time because the hash function directly computes the array index where the value is stored."
    },
    {
      id: "q2",
      question: "What is a hash function?",
      options: ["A function that sorts data", "A function that maps keys to array indices", "A function that compares two values", "A function that encrypts data"],
      correctAnswer: 1,
      explanation: "A hash function takes a key as input and produces an integer that represents the index where the corresponding value should be stored in the array."
    },
    {
      id: "q3",
      question: "What happens when two different keys produce the same hash value?",
      options: ["The hash table crashes", "One key overwrites the other", "A collision occurs", "The hash function is recalculated"],
      correctAnswer: 2,
      explanation: "When two different keys hash to the same index, a collision occurs. Hash tables have collision resolution strategies to handle this."
    },
    {
      id: "q4",
      question: "Which collision resolution technique uses a linked list at each array index?",
      options: ["Linear probing", "Quadratic probing", "Separate chaining", "Double hashing"],
      correctAnswer: 2,
      explanation: "Separate chaining resolves collisions by maintaining a linked list of key-value pairs at each array index where collisions occur."
    },
    {
      id: "q5",
      question: "What is the load factor in a hash table?",
      options: ["Number of elements divided by array size", "Number of collisions divided by array size", "Hash function efficiency rating", "Average lookup time"],
      correctAnswer: 0,
      explanation: "The load factor is the ratio of the number of elements stored in the hash table to the total number of slots in the array."
    },
    {
      id: "q6",
      question: "Which of these is a good hash function property?",
      options: ["Always returns the same index", "Distributes keys uniformly across the array", "Returns values in sorted order", "Uses minimal computation"],
      correctAnswer: 1,
      explanation: "A good hash function should distribute keys uniformly across all possible indices to minimize collisions."
    },
    {
      id: "q7",
      question: "What is rehashing?",
      options: ["Recalculating hash values", "Resizing the hash table array", "Resolving hash collisions", "Sorting hash table elements"],
      correctAnswer: 1,
      explanation: "Rehashing involves creating a larger array and reinserting all existing elements when the load factor becomes too high."
    },
    {
      id: "q8",
      question: "Which probing technique checks adjacent slots in linear order?",
      options: ["Separate chaining", "Linear probing", "Quadratic probing", "Double hashing"],
      correctAnswer: 1,
      explanation: "Linear probing resolves collisions by checking the next adjacent slot in the array when a collision occurs."
    },
    {
      id: "q9",
      question: "What is the worst-case time complexity for hash table operations?",
      options: ["O(1)", "O(log n)", "O(n)", "Depends on the hash function"],
      correctAnswer: 2,
      explanation: "In the worst case (when all keys hash to the same index), hash table operations can degrade to O(n) time complexity."
    },
    {
      id: "q10",
      question: "Which data structure is commonly used as the underlying implementation for hash tables?",
      options: ["Linked List", "Binary Tree", "Array", "Stack"],
      correctAnswer: 2,
      explanation: "Hash tables typically use arrays as their underlying data structure, with the hash function determining which array index to use."
    },
    {
      id: "q11",
      question: "What is a perfect hash function?",
      options: ["A function with no collisions", "A function that sorts keys", "A function that encrypts data", "A function that uses minimal memory"],
      correctAnswer: 0,
      explanation: "A perfect hash function is one that maps each key to a unique index with no collisions, though this is often impractical for dynamic data."
    },
    {
      id: "q12",
      question: "Which collision resolution method is also known as open addressing?",
      options: ["Separate chaining", "Linear probing", "Hash chaining", "Key chaining"],
      correctAnswer: 1,
      explanation: "Linear probing and other probing techniques are forms of open addressing, where all elements are stored in the array itself."
    },
    {
      id: "q13",
      question: "What happens when a hash table becomes too full?",
      options: ["It crashes", "Performance degrades", "It automatically resizes", "Elements are lost"],
      correctAnswer: 2,
      explanation: "Modern hash table implementations automatically resize (rehash) when they become too full to maintain good performance."
    },
    {
      id: "q14",
      question: "Which of these keys would be suitable for a hash table?",
      options: ["Lists", "Dictionaries", "Strings", "Sets"],
      correctAnswer: 2,
      explanation: "Strings are immutable and hashable, making them suitable as hash table keys. Lists and dictionaries are mutable and cannot be hashed."
    },
    {
      id: "q15",
      question: "What is the primary advantage of hash tables over binary search trees?",
      options: ["Better worst-case performance", "Automatic sorting of keys", "Average O(1) lookup time", "Lower memory usage"],
      correctAnswer: 2,
      explanation: "Hash tables provide average O(1) lookup, insertion, and deletion operations, making them faster than binary search trees for most operations."
    }
  ]
};

