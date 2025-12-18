import { Exercise } from '../../../../data/lessonsData';

export const exercise_15_2: Exercise = {
  id: 15.2,
  title: 'Sorting Project',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which Java method provides the most efficient general-purpose sorting?",
      options: ["Arrays.sort()", "Collections.sort()", "Both Arrays.sort() and Collections.sort()", "Manual implementation"],
      correctAnswer: 2,
      explanation: "Both Arrays.sort() and Collections.sort() use optimized algorithms (Timsort for objects, dual-pivot quicksort for primitives) and are highly efficient."
    },
    {
      id: "q2",
      question: "What algorithm does Java's Arrays.sort() use for object arrays?",
      options: ["Quick Sort", "Merge Sort", "Timsort", "Heap Sort"],
      correctAnswer: 2,
      explanation: "Java's Arrays.sort() uses Timsort for object arrays, which is a hybrid sorting algorithm derived from merge sort and insertion sort."
    },
    {
      id: "q3",
      question: "Which sorting algorithm is used by Java's Arrays.sort() for primitive arrays?",
      options: ["Timsort", "Dual-pivot Quick Sort", "Merge Sort", "Heap Sort"],
      correctAnswer: 1,
      explanation: "Java's Arrays.sort() uses dual-pivot quicksort for primitive arrays, which provides better performance than traditional quicksort."
    },
    {
      id: "q4",
      question: "What interface must objects implement for natural ordering in Java collections?",
      options: ["Serializable", "Comparable", "Comparator", "Iterable"],
      correctAnswer: 1,
      explanation: "Objects must implement Comparable<T> interface to define their natural ordering for sorting in Java collections."
    },
    {
      id: "q5",
      question: "Which method is used to provide custom sorting order in Java?",
      options: ["compareTo()", "equals()", "hashCode()", "Comparator interface"],
      correctAnswer: 3,
      explanation: "The Comparator interface is used to provide custom sorting order, allowing sorting by different criteria or reverse order."
    },
    {
      id: "q6",
      question: "What is the return type of compareTo() method in Comparable interface?",
      options: ["boolean", "int", "String", "Object"],
      correctAnswer: 1,
      explanation: "compareTo() returns an int: negative if this object is less than the specified object, zero if equal, positive if greater."
    },
    {
      id: "q7",
      question: "Which Java collection automatically keeps elements sorted?",
      options: ["ArrayList", "HashSet", "TreeSet", "LinkedList"],
      correctAnswer: 2,
      explanation: "TreeSet automatically maintains elements in sorted order using a Red-Black tree implementation."
    },
    {
      id: "q8",
      question: "What happens when you try to sort a list with incomparable objects?",
      options: ["Silent failure", "ClassCastException", "NullPointerException", "NoSuchMethodException"],
      correctAnswer: 1,
      explanation: "Attempting to sort a list with incomparable objects throws ClassCastException at runtime."
    },
    {
      id: "q9",
      question: "Which method provides stable sorting in Java?",
      options: ["Arrays.sort()", "Collections.sort()", "Both", "Neither"],
      correctAnswer: 1,
      explanation: "Collections.sort() provides stable sorting, while Arrays.sort() uses different algorithms for primitives (unstable) and objects (stable with Timsort)."
    },
    {
      id: "q10",
      question: "How can you sort a list in reverse order using Java's built-in methods?",
      options: ["Collections.reverse(list)", "Collections.sort(list, Collections.reverseOrder())", "Arrays.sort(arr, Collections.reverseOrder())", "list.sort(Comparator.reverseOrder())"],
      correctAnswer: 1,
      explanation: "Collections.sort(list, Collections.reverseOrder()) sorts the list in reverse natural order."
    }
  ]
};
