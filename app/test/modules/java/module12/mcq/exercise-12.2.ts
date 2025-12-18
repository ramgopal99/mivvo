import { Exercise } from '../../../../data/lessonsData';

export const exercise_12_2: Exercise = {
  id: "12.2",
  title: 'ArrayList and HashMap MCQ',
  status: 'completed',
  mcqQuestions: [
    {
      id: '1',
      question: 'What is the time complexity of ArrayList.get(index) operation?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      correctAnswer: 0,
      explanation: 'ArrayList provides O(1) time complexity for random access operations like get(index).'
    },
    {
      id: '2',
      question: 'Which of the following is true about HashMap?',
      options: [
        'Keys must be sorted',
        'Values must be unique',
        'Keys can be null (one null key allowed)',
        'It maintains insertion order'
      ],
      correctAnswer: 2,
      explanation: 'HashMap allows one null key and multiple null values, but does not guarantee ordering.'
    },
    {
      id: '3',
      question: 'What happens when you add a duplicate key to a HashMap?',
      options: [
        'An exception is thrown',
        'The old value is replaced with the new value',
        'Both values are stored',
        'The operation is ignored'
      ],
      correctAnswer: 1,
      explanation: 'When adding a duplicate key to a HashMap, the old value associated with that key is replaced.'
    },
    {
      id: '4',
      question: 'Which collection should you use when you need ordered elements with fast random access?',
      options: ['HashSet', 'TreeSet', 'ArrayList', 'LinkedList'],
      correctAnswer: 2,
      explanation: 'ArrayList provides ordered elements with O(1) random access, making it ideal for this requirement.'
    },
    {
      id: '5',
      question: 'What does Collections.sort() do?',
      options: [
        'Sorts elements in reverse order',
        'Sorts elements in natural order',
        'Shuffles elements randomly',
        'Removes duplicate elements'
      ],
      correctAnswer: 1,
      explanation: 'Collections.sort() sorts the elements in their natural ordering (ascending order for most types).'
    }
  ]
};


