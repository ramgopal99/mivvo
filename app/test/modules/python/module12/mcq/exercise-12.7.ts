import { Exercise } from '../../../../data/lessonsData';

export const exercise_12_7: Exercise = {
  id: 12.7,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What does LIFO stand for in the context of stacks?",
      options: ["Last In, First Out", "Last In, First On", "Least Important First Out", "Last Item First Out"],
      correctAnswer: 0,
      explanation: "LIFO stands for Last In, First Out, meaning the last element added to the stack is the first one to be removed."
    },
    {
      id: "q2",
      question: "Which data structure follows the FIFO (First In, First Out) principle?",
      options: ["Stack", "Queue", "Heap", "Tree"],
      correctAnswer: 1,
      explanation: "A queue follows the FIFO principle where the first element added is the first one to be removed."
    },
    {
      id: "q3",
      question: "In a binary heap, what is the relationship between a parent node and its children?",
      options: ["Parent is always smaller than children (min-heap)", "Parent is always larger than children (max-heap)", "Parent can be larger or smaller depending on the heap type", "No specific relationship required"],
      correctAnswer: 2,
      explanation: "In a min-heap, parent nodes are smaller than their children; in a max-heap, parent nodes are larger than their children."
    },
    {
      id: "q4",
      question: "Which operation has O(1) time complexity in a properly implemented stack?",
      options: ["Push", "Pop", "Search for an element", "Sort the stack"],
      correctAnswer: 0,
      explanation: "Push operation in a stack is typically O(1) as it just adds an element to the top."
    },
    {
      id: "q5",
      question: "What is the time complexity of inserting an element into a heap?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 1,
      explanation: "Inserting an element into a heap takes O(log n) time because the element may need to bubble up through the heap levels."
    },
    {
      id: "q6",
      question: "Which data structure would be most appropriate for implementing function call stacks in programming languages?",
      options: ["Queue", "Stack", "Heap", "Linked List"],
      correctAnswer: 1,
      explanation: "Stacks are perfect for function call management because function calls follow LIFO order - the last function called is the first one to return."
    },
    {
      id: "q7",
      question: "In a priority queue implemented with a heap, what is the time complexity of extracting the highest priority element?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 1,
      explanation: "Extracting the highest priority element (root of the heap) takes O(log n) time due to the heapify operation needed to maintain heap property."
    },
    {
      id: "q8",
      question: "Which of the following is NOT a typical stack operation?",
      options: ["Push", "Pop", "Peek", "Enqueue"],
      correctAnswer: 3,
      explanation: "Enqueue is a queue operation, not a stack operation. Stack operations are push, pop, and peek."
    },
    {
      id: "q9",
      question: "What is the maximum number of comparisons needed to extract the minimum element from a heap of size n?",
      options: ["1", "log n", "n", "n log n"],
      correctAnswer: 1,
      explanation: "Extracting the minimum element from a heap requires at most log n comparisons to maintain the heap property."
    },
    {
      id: "q10",
      question: "Which data structure is commonly used for breadth-first search (BFS) algorithms?",
      options: ["Stack", "Queue", "Heap", "Tree"],
      correctAnswer: 1,
      explanation: "Queues are used in BFS because BFS processes nodes level by level, which follows FIFO order."
    },
    {
      id: "q11",
      question: "What is the heap property that must be maintained in a max-heap?",
      options: ["Parent nodes are smaller than children", "Parent nodes are larger than children", "All nodes are equal", "No specific ordering required"],
      correctAnswer: 1,
      explanation: "In a max-heap, every parent node must be larger than or equal to its children."
    },
    {
      id: "q12",
      question: "Which operation on a stack would cause a stack overflow?",
      options: ["Pop from an empty stack", "Push to a full stack", "Peek at an empty stack", "Check if stack is empty"],
      correctAnswer: 1,
      explanation: "Stack overflow occurs when trying to push an element onto a stack that has reached its maximum capacity."
    },
    {
      id: "q13",
      question: "What is the time complexity of finding the maximum element in a heap?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 0,
      explanation: "In a max-heap, the maximum element is always at the root, so finding it takes O(1) time."
    },
    {
      id: "q14",
      question: "Which data structure would be most appropriate for implementing a job scheduler with priorities?",
      options: ["Stack", "Queue", "Priority Queue (Heap)", "Linked List"],
      correctAnswer: 2,
      explanation: "Priority queues implemented with heaps are ideal for job scheduling because they can efficiently retrieve the highest priority job."
    },
    {
      id: "q15",
      question: "What happens when you try to dequeue from an empty queue?",
      options: ["Returns None", "Raises an exception", "Returns the last added element", "Queue becomes full"],
      correctAnswer: 1,
      explanation: "Attempting to dequeue from an empty queue typically raises an exception like QueueUnderflow or returns an error."
    }
  ]
};
