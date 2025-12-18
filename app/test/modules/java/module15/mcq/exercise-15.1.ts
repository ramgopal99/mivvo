import { Exercise } from '../../../../data/lessonsData';

export const exercise_15_1: Exercise = {
  id: 15.1,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which sorting algorithm has the best average-case time complexity?",
      options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"],
      correctAnswer: 1,
      explanation: "Quick Sort has an average-case time complexity of O(n log n), which is the best among the comparison-based sorting algorithms."
    },
    {
      id: "q2",
      question: "Which sorting algorithm is guaranteed to have O(n log n) time complexity in all cases?",
      options: ["Quick Sort", "Merge Sort", "Heap Sort", "Both Merge Sort and Heap Sort"],
      correctAnswer: 3,
      explanation: "Both Merge Sort and Heap Sort guarantee O(n log n) time complexity in worst, average, and best cases."
    },
    {
      id: "q3",
      question: "Which sorting algorithm is NOT stable?",
      options: ["Bubble Sort", "Merge Sort", "Quick Sort", "Insertion Sort"],
      correctAnswer: 2,
      explanation: "Quick Sort is not stable - it may change the relative order of equal elements."
    },
    {
      id: "q4",
      question: "What is the worst-case time complexity of Quick Sort?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      correctAnswer: 2,
      explanation: "Quick Sort has O(n²) worst-case time complexity when the pivot selection consistently results in unbalanced partitions."
    },
    {
      id: "q5",
      question: "Which sorting algorithm uses a heap data structure?",
      options: ["Quick Sort", "Merge Sort", "Heap Sort", "Radix Sort"],
      correctAnswer: 2,
      explanation: "Heap Sort uses a binary heap data structure to sort elements."
    },
    {
      id: "q6",
      question: "Which sorting algorithm requires additional O(n) space?",
      options: ["Quick Sort", "Heap Sort", "Insertion Sort", "Merge Sort"],
      correctAnswer: 3,
      explanation: "Merge Sort requires O(n) additional space for merging arrays, while the others are in-place."
    },
    {
      id: "q7",
      question: "Which of the following is NOT a comparison-based sorting algorithm?",
      options: ["Bubble Sort", "Counting Sort", "Selection Sort", "Insertion Sort"],
      correctAnswer: 1,
      explanation: "Counting Sort is not comparison-based - it uses the range of input values to sort elements."
    },
    {
      id: "q8",
      question: "What is the best-case time complexity of Bubble Sort?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
      correctAnswer: 0,
      explanation: "Bubble Sort has O(n) best-case time complexity when the array is already sorted and optimized with a flag."
    },
    {
      id: "q9",
      question: "Which sorting algorithm works by repeatedly selecting the minimum element from the unsorted portion?",
      options: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort"],
      correctAnswer: 1,
      explanation: "Selection Sort works by repeatedly finding the minimum element from the unsorted portion and placing it at the beginning."
    },
    {
      id: "q10",
      question: "Which sorting algorithm is most efficient for nearly sorted arrays?",
      options: ["Quick Sort", "Merge Sort", "Insertion Sort", "Heap Sort"],
      correctAnswer: 2,
      explanation: "Insertion Sort performs well on nearly sorted arrays with O(n) time complexity in the best case."
    },
    {
      id: "q11",
      question: "What is the space complexity of Heap Sort?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 0,
      explanation: "Heap Sort has O(1) auxiliary space complexity as it sorts elements in-place."
    },
    {
      id: "q12",
      question: "Which sorting algorithm uses the divide-and-conquer approach?",
      options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Counting Sort"],
      correctAnswer: 1,
      explanation: "Quick Sort uses the divide-and-conquer approach by partitioning the array around a pivot element."
    },
    {
      id: "q13",
      question: "What is the average-case time complexity of Merge Sort?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      correctAnswer: 1,
      explanation: "Merge Sort has O(n log n) time complexity in all cases - worst, average, and best."
    },
    {
      id: "q14",
      question: "Which sorting algorithm is most suitable for sorting linked lists?",
      options: ["Quick Sort", "Merge Sort", "Heap Sort", "Counting Sort"],
      correctAnswer: 1,
      explanation: "Merge Sort is well-suited for linked lists because it doesn't require random access to elements."
    },
    {
      id: "q15",
      question: "What happens when Quick Sort chooses the smallest or largest element as pivot repeatedly?",
      options: ["Best case performance", "Average case performance", "Worst case performance", "No effect on performance"],
      correctAnswer: 2,
      explanation: "Choosing the smallest or largest element as pivot leads to worst-case performance with O(n²) time complexity due to unbalanced partitions."
    }
  ]
};
