import { Exercise } from '../../../../data/lessonsData';

export const exercise_13_5: Exercise = {
  id: 13.5,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is the key property of a Binary Search Tree (BST)?",
      options: ["All nodes have exactly two children", "Left subtree values < node value < right subtree values", "The tree is always balanced", "All leaves are at the same level"],
      correctAnswer: 1,
      explanation: "In a BST, for every node, all values in its left subtree are less than the node's value, and all values in its right subtree are greater than the node's value."
    },
    {
      id: "q2",
      question: "What is the time complexity of search operation in a balanced BST?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 1,
      explanation: "In a balanced BST, search operations take O(log n) time because we eliminate half the remaining nodes at each step."
    },
    {
      id: "q3",
      question: "Which traversal visits nodes in sorted order?",
      options: ["Pre-order", "In-order", "Post-order", "Level-order"],
      correctAnswer: 1,
      explanation: "In-order traversal visits nodes in sorted order: left subtree, root, right subtree."
    },
    {
      id: "q4",
      question: "What is the worst-case time complexity for BST operations when the tree becomes skewed?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      explanation: "When a BST becomes skewed (like a linked list), operations degrade to O(n) time complexity."
    },
    {
      id: "q5",
      question: "Which of the following is NOT a valid BST?",
      options: ["2, 1, 3", "5, 3, 7, 2, 4, 6, 8", "1, 2, 3", "4, 2, 6, 1, 3, 5, 7"],
      correctAnswer: 2,
      explanation: "1, 2, 3 is not a valid BST because 2 (root) has 1 in left but 3 in right, but if inserted in order, it would be skewed."
    },
    {
      id: "q6",
      question: "What is the minimum number of nodes in a BST of height h?",
      options: ["h", "h+1", "2^h", "2^(h+1)-1"],
      correctAnswer: 1,
      explanation: "The minimum number of nodes in a BST of height h is h+1 (a straight line)."
    },
    {
      id: "q7",
      question: "Which operation on a BST can cause it to become unbalanced?",
      options: ["Search", "Insert in sorted order", "Delete leaf node", "Find minimum"],
      correctAnswer: 1,
      explanation: "Inserting elements in sorted order creates a skewed tree, breaking the balance property."
    },
    {
      id: "q8",
      question: "What is the space complexity of a BST with n nodes?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      explanation: "A BST with n nodes requires O(n) space to store all the nodes and their references."
    },
    {
      id: "q9",
      question: "Which traversal visits the root before its subtrees?",
      options: ["In-order", "Pre-order", "Post-order", "Level-order"],
      correctAnswer: 1,
      explanation: "Pre-order traversal visits the root first, then left subtree, then right subtree."
    },
    {
      id: "q10",
      question: "What is the maximum number of nodes at level k in a BST?",
      options: ["k", "2k", "2^k", "k^2"],
      correctAnswer: 2,
      explanation: "In the worst case, level k can have up to 2^k nodes in a complete binary tree."
    },
    {
      id: "q11",
      question: "Which of the following operations has the same time complexity in both BST and sorted array?",
      options: ["Search", "Insert", "Delete", "Find minimum"],
      correctAnswer: 0,
      explanation: "Search in both BST and sorted array can be O(log n) if the BST is balanced and array allows binary search."
    },
    {
      id: "q12",
      question: "What happens when you delete a node with two children in a BST?",
      options: ["Replace with inorder successor", "Replace with inorder predecessor", "Remove node and connect children", "Operation is not allowed"],
      correctAnswer: 0,
      explanation: "When deleting a node with two children, it's typically replaced with its inorder successor (smallest value in right subtree)."
    },
    {
      id: "q13",
      question: "Which data structure can be used to implement a BST?",
      options: ["Array", "Linked List", "Both array and linked list", "Neither"],
      correctAnswer: 2,
      explanation: "BST can be implemented using both arrays (for complete trees) and linked lists (for general trees)."
    },
    {
      id: "q14",
      question: "What is the inorder successor of a node in a BST?",
      options: ["Parent node", "Left child", "Smallest value larger than the node", "Largest value smaller than the node"],
      correctAnswer: 2,
      explanation: "The inorder successor is the smallest value that is larger than the current node's value."
    },
    {
      id: "q15",
      question: "Which BST operation benefits most from self-balancing trees like AVL?",
      options: ["Insert", "Search", "Delete", "All operations equally"],
      correctAnswer: 3,
      explanation: "Self-balancing trees like AVL ensure that all operations (insert, search, delete) remain O(log n) in the worst case."
    }
  ]
};
