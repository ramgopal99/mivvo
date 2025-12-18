import { Exercise } from '../../../../data/lessonsData';

export const exercise_10_7: Exercise = {
  id: "10.7",
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is the main difference between arrays and linked lists?",
      options: ["Arrays are faster for insertions, linked lists are faster for access", "Arrays have fixed size, linked lists can grow dynamically", "Arrays use contiguous memory, linked lists use scattered memory", "Arrays support random access, linked lists support sequential access"],
      correctAnswer: 2,
      explanation: "Arrays store elements in contiguous memory locations, while linked lists store elements in scattered memory locations connected by pointers."
    },
    {
      id: "q2",
      question: "Which operation is typically O(1) for arrays but O(n) for linked lists?",
      options: ["Insertion at beginning", "Deletion at end", "Random access by index", "Traversal"],
      correctAnswer: 2,
      explanation: "Random access by index is O(1) for arrays since they use contiguous memory, but O(n) for linked lists which must traverse from the beginning."
    },
    {
      id: "q3",
      question: "In a singly linked list, each node contains:",
      options: ["Only data", "Data and one pointer", "Data and two pointers", "Only pointers"],
      correctAnswer: 1,
      explanation: "Each node in a singly linked list contains data and one pointer that points to the next node in the sequence."
    },
    {
      id: "q4",
      question: "What is the time complexity of inserting an element at the beginning of a linked list?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 0,
      explanation: "Inserting at the beginning of a linked list is O(1) because you only need to update the head pointer and the new node's next pointer."
    },
    {
      id: "q5",
      question: "Which data structure is better for implementing a stack?",
      options: ["Array", "Linked List", "Hash Table", "Tree"],
      correctAnswer: 1,
      explanation: "Linked lists are often preferred for stacks because insertion and deletion at the beginning (top of stack) are O(1) operations."
    },
    {
      id: "q6",
      question: "What is a major disadvantage of using arrays?",
      options: ["Slow random access", "Fixed size after creation", "Cannot store different data types", "Complex implementation"],
      correctAnswer: 1,
      explanation: "Arrays have a fixed size once created. If you need to add more elements than the array can hold, you must create a new, larger array."
    },
    {
      id: "q7",
      question: "In a doubly linked list, each node contains:",
      options: ["Data and one pointer", "Two pointers only", "Data and two pointers", "Data and three pointers"],
      correctAnswer: 2,
      explanation: "Each node in a doubly linked list contains data and two pointers: one pointing to the next node and one pointing to the previous node."
    },
    {
      id: "q8",
      question: "What is the time complexity of searching for an element in an unsorted array?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      explanation: "Searching in an unsorted array requires checking each element, resulting in O(n) time complexity."
    },
    {
      id: "q9",
      question: "Which operation is typically faster in arrays compared to linked lists?",
      options: ["Insertion in middle", "Deletion from beginning", "Random access", "Growing the structure"],
      correctAnswer: 2,
      explanation: "Random access (accessing elements by index) is much faster in arrays (O(1)) than in linked lists (O(n))."
    },
    {
      id: "q10",
      question: "What is the space overhead of a linked list compared to an array?",
      options: ["Same as array", "Less than array", "More than array", "Depends on implementation"],
      correctAnswer: 2,
      explanation: "Linked lists have more space overhead than arrays because each node stores data plus one or two pointers, while arrays only store the data."
    },
    {
      id: "q11",
      question: "Which data structure is better for implementing a queue?",
      options: ["Array", "Linked List", "Both work equally well", "Neither is suitable"],
      correctAnswer: 1,
      explanation: "Linked lists are often preferred for queues because they can easily add elements to the end and remove from the beginning without shifting elements."
    },
    {
      id: "q12",
      question: "What happens when you try to access an index beyond the bounds of an array?",
      options: ["Returns None", "Returns 0", "Raises an IndexError", "Creates a new element"],
      correctAnswer: 2,
      explanation: "Accessing an index beyond the array bounds raises an IndexError exception in most programming languages."
    },
    {
      id: "q13",
      question: "Which linked list variation allows traversal in both directions?",
      options: ["Singly linked list", "Doubly linked list", "Circular linked list", "Skip list"],
      correctAnswer: 1,
      explanation: "Doubly linked lists allow traversal in both directions because each node has pointers to both the next and previous nodes."
    },
    {
      id: "q14",
      question: "What is the time complexity of inserting an element at the end of a dynamic array (like Python list)?",
      options: ["O(1)", "O(log n)", "O(n)", "O(1) amortized"],
      correctAnswer: 3,
      explanation: "Dynamic arrays achieve amortized O(1) time for insertions at the end because occasional resizing operations are spread out over many insertions."
    },
    {
      id: "q15",
      question: "Which data structure is more memory efficient for storing a fixed number of elements?",
      options: ["Array", "Linked List", "Both are equally efficient", "Depends on the elements"],
      correctAnswer: 0,
      explanation: "Arrays are more memory efficient than linked lists because they don't require extra space for pointers to connect elements."
    }
  ]
};

