import { Exercise } from '../../../../data/lessonsData';

export const exercise_15_9: Exercise = {
  id: "15.9",
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which sorting algorithm has the best average time complexity?",
      options: ["Bubble Sort", "Quick Sort", "Insertion Sort", "Selection Sort"],
      correctAnswer: 1,
      explanation: "Quick Sort has an average time complexity of O(n log n), which is optimal for comparison-based sorting algorithms."
    },
    {
      id: "q2",
      question: "What is the time complexity of Bubble Sort in the worst case?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(2^n)"],
      correctAnswer: 2,
      explanation: "Bubble Sort has a worst-case time complexity of O(n²) because it may need to swap elements in nested loops."
    },
    {
      id: "q3",
      question: "Which sorting algorithm is guaranteed to have O(n log n) time complexity in the worst case?",
      options: ["Quick Sort", "Merge Sort", "Heap Sort", "Both Merge Sort and Heap Sort"],
      correctAnswer: 3,
      explanation: "Both Merge Sort and Heap Sort guarantee O(n log n) time complexity in the worst case, unlike Quick Sort which can degrade to O(n²)."
    },
    {
      id: "q4",
      question: "Which sorting algorithm works by repeatedly finding the minimum element from the unsorted portion?",
      options: ["Bubble Sort", "Insertion Sort", "Selection Sort", "Merge Sort"],
      correctAnswer: 2,
      explanation: "Selection Sort works by repeatedly finding the minimum element from the unsorted portion and putting it at the beginning."
    },
    {
      id: "q5",
      question: "What is the main advantage of Merge Sort over Quick Sort?",
      options: ["Faster in practice", "Uses less memory", "Guaranteed O(n log n) worst case", "Simpler to implement"],
      correctAnswer: 2,
      explanation: "Merge Sort guarantees O(n log n) time complexity in the worst case, while Quick Sort can degrade to O(n²) in the worst case."
    },
    {
      id: "q6",
      question: "Which sorting algorithm is stable?",
      options: ["Quick Sort", "Heap Sort", "Merge Sort", "Selection Sort"],
      correctAnswer: 2,
      explanation: "Merge Sort is a stable sorting algorithm that maintains the relative order of equal elements."
    },
    {
      id: "q7",
      question: "What is the space complexity of Merge Sort?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 2,
      explanation: "Merge Sort requires O(n) additional space for the temporary arrays used in merging."
    },
    {
      id: "q8",
      question: "Which sorting algorithm would be most efficient for sorting a linked list?",
      options: ["Quick Sort", "Merge Sort", "Heap Sort", "Bubble Sort"],
      correctAnswer: 1,
      explanation: "Merge Sort is efficient for linked lists because it doesn't require random access and can merge sublists efficiently."
    },
    {
      id: "q9",
      question: "What is the best case time complexity of Insertion Sort?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
      correctAnswer: 0,
      explanation: "Insertion Sort has O(n) best case time complexity when the array is already sorted."
    },
    {
      id: "q10",
      question: "Which sorting algorithm uses a heap data structure?",
      options: ["Quick Sort", "Merge Sort", "Heap Sort", "Radix Sort"],
      correctAnswer: 2,
      explanation: "Heap Sort uses a binary heap data structure to sort elements."
    },
    {
      id: "q11",
      question: "What is the main disadvantage of Bubble Sort?",
      options: ["Unstable", "Not in-place", "Very slow for large datasets", "Complex implementation"],
      correctAnswer: 2,
      explanation: "Bubble Sort is very slow for large datasets with its O(n²) time complexity."
    },
    {
      id: "q12",
      question: "Which sorting algorithm is NOT comparison-based?",
      options: ["Quick Sort", "Merge Sort", "Counting Sort", "Insertion Sort"],
      correctAnswer: 2,
      explanation: "Counting Sort is not comparison-based; it uses the range of input values to count frequencies."
    },
    {
      id: "q13",
      question: "What is the worst-case time complexity of Heap Sort?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(2^n)"],
      correctAnswer: 1,
      explanation: "Heap Sort has a worst-case time complexity of O(n log n), making it suitable for large datasets."
    },
    {
      id: "q14",
      question: "Which sorting algorithm performs well on partially sorted data?",
      options: ["Bubble Sort", "Quick Sort", "Insertion Sort", "Selection Sort"],
      correctAnswer: 2,
      explanation: "Insertion Sort performs well on partially sorted data with its O(n) best case performance."
    },
    {
      id: "q15",
      question: "What is the key insight behind Quick Sort?",
      options: ["Divide and conquer", "Heap property", "Counting frequencies", "Stable sorting"],
      correctAnswer: 0,
      explanation: "Quick Sort uses the divide and conquer approach, partitioning the array around a pivot element."
    }
  ]
};

