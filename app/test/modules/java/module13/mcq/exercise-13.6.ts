import { Exercise } from '../../../../data/lessonsData';

export const exercise_13_6: Exercise = {
  id: 13.6,
  title: 'BST Project',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is the correct way to implement a generic BST node in Java?",
      options: ["class Node<T> { T data; Node left, right; }", "class Node<T extends Comparable<T>> { T data; Node left, right; }", "class Node<T> { T data; Node<T> left, right; }", "class Node<T extends Comparable<T>> { T data; Node<T> left, right; }"],
      correctAnswer: 3,
      explanation: "The correct implementation uses generics with Comparable bound: class Node<T extends Comparable<T>> { T data; Node<T> left, right; }"
    },
    {
      id: "q2",
      question: "Which method is used for comparison in BST operations?",
      options: ["equals()", "compareTo()", "hashCode()", "toString()"],
      correctAnswer: 1,
      explanation: "compareTo() method from Comparable interface is used for ordering comparisons in BST operations like insert, search, and delete."
    },
    {
      id: "q3",
      question: "What is the return type of compareTo() method?",
      options: ["boolean", "int", "String", "Object"],
      correctAnswer: 1,
      explanation: "compareTo() returns an int: negative if less than, 0 if equal, positive if greater than the compared object."
    },
    {
      id: "q4",
      question: "Which data structure is used for level-order traversal?",
      options: ["Stack", "Queue", "ArrayList", "LinkedList"],
      correctAnswer: 1,
      explanation: "Level-order traversal uses a Queue (FIFO) to visit nodes level by level, ensuring proper breadth-first traversal."
    },
    {
      id: "q5",
      question: "What is the most common self-balancing BST used in Java's standard library?",
      options: ["AVL Tree", "B-Tree", "Red-Black Tree", "Splay Tree"],
      correctAnswer: 2,
      explanation: "Java's TreeMap and TreeSet use Red-Black Tree implementation, which provides guaranteed O(log n) performance."
    },
    {
      id: "q6",
      question: "Which traversal is used to delete a binary tree safely?",
      options: ["In-order", "Pre-order", "Post-order", "Level-order"],
      correctAnswer: 2,
      explanation: "Post-order traversal (left, right, root) is used for safe deletion because it deletes children before parent."
    },
    {
      id: "q7",
      question: "What happens if you insert duplicate values in a standard BST?",
      options: ["Creates duplicate nodes", "Overwrites existing node", "Throws exception", "Ignores insertion"],
      correctAnswer: 3,
      explanation: "Standard BST implementations typically ignore duplicate insertions to maintain the strict ordering property."
    },
    {
      id: "q8",
      question: "Which operation has O(n) time complexity even in a balanced BST?",
      options: ["Search", "Insert", "Traversal", "Find minimum"],
      correctAnswer: 2,
      explanation: "Traversal operations (inorder, preorder, postorder, level-order) visit all n nodes, so they are always O(n)."
    },
    {
      id: "q9",
      question: "What is the height of a balanced BST with n nodes?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 1,
      explanation: "A balanced BST has height O(log n), ensuring logarithmic time for search, insert, and delete operations."
    },
    {
      id: "q10",
      question: "Which Java collection automatically sorts elements?",
      options: ["HashSet", "ArrayList", "TreeSet", "LinkedList"],
      correctAnswer: 2,
      explanation: "TreeSet in Java uses a Red-Black Tree internally and automatically maintains sorted order of elements."
    },
    {
      id: "q11",
      question: "What is the worst-case scenario for BST performance?",
      options: ["Empty tree", "Balanced tree", "Skewed tree", "Single node"],
      correctAnswer: 2,
      explanation: "When a BST becomes skewed (resembling a linked list), all operations degrade from O(log n) to O(n)."
    },
    {
      id: "q12",
      question: "Which interface should be implemented for custom BST node types?",
      options: ["Serializable", "Comparable", "Iterable", "Collection"],
      correctAnswer: 1,
      explanation: "Custom classes used as BST node values must implement Comparable<T> to define their natural ordering."
    },
    {
      id: "q13",
      question: "What is the space complexity of recursive BST operations?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 1,
      explanation: "Recursive BST operations use O(log n) stack space in balanced trees and O(n) in skewed trees."
    },
    {
      id: "q14",
      question: "Which traversal preserves the tree structure for reconstruction?",
      options: ["In-order", "Pre-order", "Post-order", "Level-order"],
      correctAnswer: 1,
      explanation: "Pre-order traversal preserves the tree structure and can be used to reconstruct the tree when combined with inorder."
    },
    {
      id: "q15",
      question: "What is the main advantage of BST over sorted arrays?",
      options: ["Better search performance", "Dynamic size changes", "Less memory usage", "Simpler implementation"],
      correctAnswer: 1,
      explanation: "BST allows efficient insertions and deletions (O(log n)) while maintaining sorted order, unlike arrays which require O(n) for insertions/deletions."
    }
  ]
};
