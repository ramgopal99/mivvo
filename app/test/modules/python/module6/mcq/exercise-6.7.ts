import { Exercise } from '../../../../data/lessonsData';

export const exercise_6_7: Exercise = {
  id: "6.7",
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which of the following correctly creates an empty dictionary?",
      options: ["empty = {}", "empty = []", "empty = ()", "empty = dict()"],
      correctAnswer: 3,
      explanation: "Both {} and dict() create empty dictionaries, but dict() is more explicit and recommended when you need to distinguish from sets."
    },
    {
      id: "q2",
      question: "What will be the output of: print({'a': 1, 'b': 2}['a'])?",
      options: ["'a'", "1", "2", "Error"],
      correctAnswer: 1,
      explanation: "Dictionary access uses square brackets with the key. {'a': 1, 'b': 2}['a'] returns the value associated with key 'a', which is 1."
    },
    {
      id: "q3",
      question: "Which statement about dictionary keys is correct?",
      options: ["Keys must be mutable", "Keys can be lists", "Keys must be immutable", "Keys can be any data type"],
      correctAnswer: 2,
      explanation: "Dictionary keys must be immutable (hashable). You can use strings, numbers, and tuples, but not lists or other mutable types."
    },
    {
      id: "q4",
      question: "What does dict([('a', 1), ('b', 2)]) create?",
      options: ["['a', 1, 'b', 2]", "{'a': 1, 'b': 2}", "[('a', 1), ('b', 2)]", "Error"],
      correctAnswer: 1,
      explanation: "dict() can create a dictionary from a sequence of key-value pairs (tuples). dict([('a', 1), ('b', 2)]) creates {'a': 1, 'b': 2}."
    },
    {
      id: "q5",
      question: "How do you safely get a value from a dictionary that might not exist?",
      options: ["dict[key]", "dict.get(key)", "dict.fetch(key)", "dict.retrieve(key)"],
      correctAnswer: 1,
      explanation: "dict.get(key) returns the value if the key exists, or None if it doesn't. It's safer than dict[key] which raises a KeyError."
    },
    {
      id: "q6",
      question: "What does {'name': 'Alice', 'name': 'Bob'} create?",
      options: ["{'name': 'Alice', 'name': 'Bob'}", "{'name': 'Bob'}", "Error", "{'Alice': 'name', 'Bob': 'name'}"],
      correctAnswer: 1,
      explanation: "Duplicate keys in dictionary literals are not allowed. The last value for a key overwrites any previous values, so only 'Bob' is kept."
    },
    {
      id: "q7",
      question: "Which method adds or updates a key-value pair in a dictionary?",
      options: ["add()", "insert()", "update()", "set()"],
      correctAnswer: 2,
      explanation: "dict.update() can add new key-value pairs or update existing ones. You can also use dict[key] = value syntax."
    },
    {
      id: "q8",
      question: "What does d.pop('key') do?",
      options: ["Removes and returns the value for 'key'", "Removes 'key' and returns None", "Returns the value for 'key' without removing it", "Adds 'key' to the dictionary"],
      correctAnswer: 0,
      explanation: "dict.pop(key) removes the key-value pair and returns the value. If the key doesn't exist, it raises a KeyError unless a default is provided."
    },
    {
      id: "q9",
      question: "Which of these returns all keys in a dictionary?",
      options: ["dict.keys()", "dict.values()", "dict.items()", "dict.all()"],
      correctAnswer: 0,
      explanation: "dict.keys() returns a view object containing all the keys in the dictionary."
    },
    {
      id: "q10",
      question: "What does dict.clear() do?",
      options: ["Removes all items from the dictionary", "Removes only the first item", "Creates a new empty dictionary", "Removes duplicate values"],
      correctAnswer: 0,
      explanation: "dict.clear() removes all items from the dictionary, leaving it empty. The dictionary itself still exists but has no key-value pairs."
    },
    {
      id: "q11",
      question: "How do you check if a key exists in a dictionary?",
      options: ["key in dict", "dict.contains(key)", "dict.has_key(key)", "dict.exists(key)"],
      correctAnswer: 0,
      explanation: "Use the 'in' operator: key in dict returns True if the key exists in the dictionary, False otherwise."
    },
    {
      id: "q12",
      question: "What does len({'a': 1, 'b': 2, 'c': 3}) return?",
      options: ["3", "6", "9", "Error"],
      correctAnswer: 0,
      explanation: "len() on a dictionary returns the number of key-value pairs, not the total characters or anything else."
    },
    {
      id: "q13",
      question: "Which method returns key-value pairs as tuples?",
      options: ["dict.keys()", "dict.values()", "dict.items()", "dict.pairs()"],
      correctAnswer: 2,
      explanation: "dict.items() returns a view object containing (key, value) tuples for each key-value pair in the dictionary."
    },
    {
      id: "q14",
      question: "What happens when you try to access a non-existent key with dict.get('key', 'default')?",
      options: ["Raises KeyError", "Returns None", "Returns 'default'", "Returns the first key"],
      correctAnswer: 2,
      explanation: "dict.get(key, default) returns the default value if the key doesn't exist. If no default is provided, it returns None."
    },
    {
      id: "q15",
      question: "Which of these can be used as dictionary keys?",
      options: ["Lists", "Sets", "Tuples", "Dictionaries"],
      correctAnswer: 2,
      explanation: "Only immutable (hashable) types can be dictionary keys. Tuples are immutable, while lists, sets, and dictionaries are mutable."
    }
  ]
};

