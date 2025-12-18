import { Exercise } from '../../../../data/lessonsData';

export const exercise_4_7: Exercise = {
  id: 4.7,
  title: 'Java Maps - Basic Operations',
  type: 'mcq',
  questions: [
    {
      question: 'What is the primary purpose of a Map in Java?',
      options: [
        'To store elements in a specific order',
        'To store key-value pairs for fast lookup',
        'To store only unique elements',
        'To maintain a collection of elements without duplicates'
      ],
      correctAnswer: 1,
      explanation: 'Maps store key-value pairs and provide fast lookup by key, which is their primary purpose.'
    },
    {
      question: 'Which Map implementation provides the fastest average lookup time?',
      options: [
        'TreeMap',
        'LinkedHashMap',
        'HashMap',
        'ConcurrentHashMap'
      ],
      correctAnswer: 2,
      explanation: 'HashMap provides O(1) average time complexity for get() and put() operations.'
    },
    {
      question: 'What happens when you put a key-value pair into a HashMap where the key already exists?',
      options: [
        'It throws an exception',
        'It creates a duplicate entry',
        'It overwrites the existing value',
        'It appends to the existing value'
      ],
      correctAnswer: 2,
      explanation: 'HashMap.put() overwrites the existing value when the key already exists.'
    },
    {
      question: 'Which method is used to retrieve a value from a Map if you\'re not sure the key exists?',
      options: [
        'get()',
        'getOrDefault()',
        'containsKey()',
        'putIfAbsent()'
      ],
      correctAnswer: 1,
      explanation: 'getOrDefault() returns the value if the key exists, or a default value if it doesn\'t.'
    },
    {
      question: 'What does the putIfAbsent() method do?',
      options: [
        'Always overwrites the existing value',
        'Throws an exception if the key exists',
        'Only puts the value if the key doesn\'t exist',
        'Removes the existing value if the key exists'
      ],
      correctAnswer: 2,
      explanation: 'putIfAbsent() only adds the key-value pair if the key is not already present in the map.'
    },
    {
      question: 'Which Map implementation maintains insertion order?',
      options: [
        'HashMap',
        'TreeMap',
        'LinkedHashMap',
        'ConcurrentHashMap'
      ],
      correctAnswer: 2,
      explanation: 'LinkedHashMap maintains the order in which entries were inserted.'
    },
    {
      question: 'What is the difference between keySet() and values() methods?',
      options: [
        'keySet() returns keys, values() returns values',
        'keySet() returns values, values() returns keys',
        'Both return the same thing',
        'keySet() is for keys, values() is for values - no difference in functionality'
      ],
      correctAnswer: 0,
      explanation: 'keySet() returns a Set of all keys, while values() returns a Collection of all values.'
    },
    {
      question: 'Which of the following is NOT a valid key in a HashMap?',
      options: [
        'String objects',
        'Custom immutable objects',
        'Mutable objects (if properly implemented)',
        'null (for the key, but only one null key is allowed)'
      ],
      correctAnswer: 3,
      explanation: 'HashMap allows one null key, so null IS a valid key (though not recommended).'
    },
    {
      question: 'What is the time complexity of getting a value from a TreeMap?',
      options: [
        'O(1)',
        'O(log n)',
        'O(n)',
        'O(n log n)'
      ],
      correctAnswer: 1,
      explanation: 'TreeMap operations are O(log n) because it uses a red-black tree internally.'
    },
    {
      question: 'When should you use ConcurrentHashMap instead of HashMap?',
      options: [
        'When you need sorted keys',
        'When you need thread-safe operations',
        'When you need insertion order',
        'When you have less than 100 entries'
      ],
      correctAnswer: 1,
      explanation: 'ConcurrentHashMap is designed for concurrent access by multiple threads.'
    },
    {
      question: 'What does the merge() method do in HashMap?',
      options: [
        'Combines two maps into one',
        'Merges values for the same key using a remapping function',
        'Always overwrites existing values',
        'Creates a new map with merged entries'
      ],
      correctAnswer: 1,
      explanation: 'merge() allows you to combine the existing value with a new value using a BiFunction.'
    },
    {
      question: 'Which method would you use to check if a Map contains a specific key?',
      options: [
        'get()',
        'contains()',
        'hasKey()',
        'containsKey()'
      ],
      correctAnswer: 3,
      explanation: 'containsKey() returns true if the map contains the specified key.'
    },
    {
      question: 'What happens when you call clear() on a HashMap?',
      options: [
        'Removes all entries from the map',
        'Resets the map to its initial capacity',
        'Removes only null values',
        'Clears the hash codes but keeps the entries'
      ],
      correctAnswer: 0,
      explanation: 'clear() removes all key-value mappings from the map.'
    },
    {
      question: 'Which Map implementation would you choose if you need keys to be always sorted?',
      options: [
        'HashMap',
        'LinkedHashMap',
        'TreeMap',
        'ConcurrentHashMap'
      ],
      correctAnswer: 2,
      explanation: 'TreeMap maintains keys in sorted order using a red-black tree.'
    },
    {
      question: 'What does the computeIfAbsent() method do?',
      options: [
        'Computes a value if the key is absent and enters it into the map',
        'Computes a value only if the key is present',
        'Always computes and overwrites existing values',
        'Computes values for all absent keys in the map'
      ],
      correctAnswer: 0,
      explanation: 'computeIfAbsent() computes the value using the given mapping function only if the key is not already associated with a value.'
    }
  ]
};


