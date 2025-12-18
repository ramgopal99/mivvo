import { Exercise } from '../../../../data/lessonsData';

export const exercise_3_7: Exercise = {
  id: "3.7",
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which interface is the root of the Java Collections Framework?",
      options: ["List", "Set", "Collection", "Map"],
      correctAnswer: 2,
      explanation: "The Collection interface is the root interface of the Java Collections Framework and is extended by List, Set, and Queue interfaces."
    },
    {
      id: "q2",
      question: "What is the main difference between ArrayList and LinkedList?",
      options: ["ArrayList is synchronized, LinkedList is not", "ArrayList allows duplicates, LinkedList does not", "ArrayList provides fast random access, LinkedList is better for frequent insertions/deletions", "ArrayList is thread-safe, LinkedList is not"],
      correctAnswer: 2,
      explanation: "ArrayList provides fast random access (O(1)) but slow insertions/deletions in the middle. LinkedList provides fast insertions/deletions but slow random access."
    },
    {
      id: "q3",
      question: "Which method is used to add an element to the end of an ArrayList?",
      options: ["insert()", "append()", "add()", "push()"],
      correctAnswer: 2,
      explanation: "The add() method appends an element to the end of an ArrayList. It can also insert at a specific index when given an index parameter."
    },
    {
      id: "q4",
      question: "What does the get(int index) method return?",
      options: ["The index of an element", "The element at the specified index", "The size of the ArrayList", "The hash code of the ArrayList"],
      correctAnswer: 1,
      explanation: "The get(int index) method returns the element at the specified index in the ArrayList."
    },
    {
      id: "q5",
      question: "Which of these methods removes all elements from a collection?",
      options: ["delete()", "clear()", "removeAll()", "empty()"],
      correctAnswer: 1,
      explanation: "The clear() method removes all elements from the collection, leaving it empty."
    },
    {
      id: "q6",
      question: "What is the difference between remove(int index) and remove(Object obj)?",
      options: ["One removes by index, the other by object value", "One is for ArrayList, the other for LinkedList", "One removes multiple elements, the other removes one", "They are exactly the same"],
      correctAnswer: 0,
      explanation: "remove(int index) removes the element at the specified index, while remove(Object obj) removes the first occurrence of the specified object."
    },
    {
      id: "q7",
      question: "Which interface should be implemented for custom sorting in Collections.sort()?",
      options: ["Runnable", "Serializable", "Comparable", "Cloneable"],
      correctAnswer: 2,
      explanation: "The Comparable interface should be implemented to define the natural ordering of objects for sorting."
    },
    {
      id: "q8",
      question: "What does Collections.shuffle() do?",
      options: ["Sorts the collection in ascending order", "Reverses the order of elements", "Randomly rearranges the elements", "Removes duplicate elements"],
      correctAnswer: 2,
      explanation: "Collections.shuffle() randomly rearranges the elements in the collection."
    },
    {
      id: "q9",
      question: "Which method is used to find the index of the first occurrence of an element?",
      options: ["find()", "search()", "indexOf()", "locate()"],
      correctAnswer: 2,
      explanation: "The indexOf(Object obj) method returns the index of the first occurrence of the specified element, or -1 if not found."
    },
    {
      id: "q10",
      question: "What is the purpose of the Iterator interface?",
      options: ["To create new collections", "To iterate over collection elements", "To sort collections", "To search in collections"],
      correctAnswer: 1,
      explanation: "The Iterator interface provides methods to iterate over collection elements, allowing safe traversal and modification during iteration."
    }
  ]
};



