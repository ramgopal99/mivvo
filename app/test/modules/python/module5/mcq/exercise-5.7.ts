import { Exercise } from '../../../../data/lessonsData';

export const exercise_5_7: Exercise = {
  id: 5.7,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which of the following correctly creates an empty set?",
      options: ["empty = {}", "empty = []", "empty = ()", "empty = set()"],
      correctAnswer: 3,
      explanation: "Empty sets must be created using set() because {} creates an empty dictionary. [] creates a list and () creates a tuple."
    },
    {
      id: "q2",
      question: "What will be the output of: print({1, 2, 2, 3, 3, 3})?",
      options: ["{1, 2, 2, 3, 3, 3}", "{1, 2, 3}", "{1, 2, 3, 3}", "Error"],
      correctAnswer: 1,
      explanation: "Sets automatically remove duplicates, so {1, 2, 2, 3, 3, 3} becomes {1, 2, 3}."
    },
    {
      id: "q3",
      question: "Which statement about Python sets is correct?",
      options: ["Sets are ordered collections", "Sets allow duplicate elements", "Sets are mutable but unindexed", "Sets can be accessed by position"],
      correctAnswer: 2,
      explanation: "Sets are mutable (you can add/remove elements) but they are unindexed and unordered - you cannot access elements by position like lists."
    },
    {
      id: "q4",
      question: "What does set([1, 2, 2, 3, 4, 4, 5]) create?",
      options: ["[1, 2, 2, 3, 4, 4, 5]", "{1, 2, 2, 3, 4, 4, 5}", "{1, 2, 3, 4, 5}", "Error"],
      correctAnswer: 2,
      explanation: "set() function converts any iterable to a set, automatically removing duplicates. So [1, 2, 2, 3, 4, 4, 5] becomes {1, 2, 3, 4, 5}."
    },
    {
      id: "q5",
      question: "Which method adds a single element to a set?",
      options: ["add()", "append()", "insert()", "update()"],
      correctAnswer: 0,
      explanation: "add() method adds a single element to a set. append() is for lists, insert() is for lists, and update() adds multiple elements."
    },
    {
      id: "q6",
      question: "What does {x**2 for x in range(1, 4)} create?",
      options: ["{1, 4, 9}", "{1, 2, 3}", "[1, 4, 9]", "Error"],
      correctAnswer: 0,
      explanation: "This is a set comprehension that creates {1², 2², 3²} = {1, 4, 9}."
    },
    {
      id: "q7",
      question: "Which method safely removes an element from a set without raising an error if the element doesn't exist?",
      options: ["remove()", "delete()", "discard()", "pop()"],
      correctAnswer: 2,
      explanation: "discard() removes an element if it exists but doesn't raise an error if the element is not found. remove() raises a KeyError in that case."
    },
    {
      id: "q8",
      question: "What does set(\"hello\") create?",
      options: ["{'h', 'e', 'l', 'l', 'o'}", "{'h', 'e', 'l', 'o'}", "[\"h\", \"e\", \"l\", \"l\", \"o\"]", "Error"],
      correctAnswer: 1,
      explanation: "set() on a string creates a set of unique characters. 'hello' has duplicate 'l's, so the result is {'h', 'e', 'l', 'o'}."
    },
    {
      id: "q9",
      question: "Which set operation finds elements that are in both sets?",
      options: ["union()", "intersection()", "difference()", "symmetric_difference()"],
      correctAnswer: 1,
      explanation: "intersection() returns elements that are present in both sets. union() returns all elements, difference() returns elements in first but not second."
    },
    {
      id: "q10",
      question: "What does {1, 2, 3}.union({3, 4, 5}) return?",
      options: ["{1, 2, 3, 4, 5}", "{3}", "{1, 2, 3}", "{4, 5}"],
      correctAnswer: 0,
      explanation: "union() combines all unique elements from both sets: {1, 2, 3} ∪ {3, 4, 5} = {1, 2, 3, 4, 5}."
    },
    {
      id: "q11",
      question: "Which of these is NOT a valid way to create a set?",
      options: ["{1, 2, 3}", "set([1, 2, 3])", "set(range(3))", "{x for x in range(3)}"],
      correctAnswer: 3,
      explanation: "All options are valid ways to create sets. {x for x in range(3)} is a set comprehension that creates {0, 1, 2}."
    },
    {
      id: "q12",
      question: "What does {1, 2, 3, 4}.difference({2, 3, 5}) return?",
      options: ["{1, 4}", "{2, 3}", "{5}", "{1, 2, 3, 4, 5}"],
      correctAnswer: 0,
      explanation: "difference() returns elements in the first set but not in the second: {1, 2, 3, 4} - {2, 3, 5} = {1, 4}."
    },
    {
      id: "q13",
      question: "Which method removes and returns an arbitrary element from a set?",
      options: ["remove()", "discard()", "pop()", "clear()"],
      correctAnswer: 2,
      explanation: "pop() removes and returns an arbitrary element from the set. The element returned is unpredictable since sets are unordered."
    },
    {
      id: "q14",
      question: "What is the result of len(set([1, 2, 2, 3, 3, 3]))?",
      options: ["6", "3", "1", "Error"],
      correctAnswer: 1,
      explanation: "set([1, 2, 2, 3, 3, 3]) creates {1, 2, 3}, so len() returns 3."
    },
    {
      id: "q15",
      question: "Which use case is sets most appropriate for?",
      options: ["Storing ordered sequences", "Removing duplicates from data", "Accessing elements by index", "Maintaining insertion order"],
      correctAnswer: 1,
      explanation: "Sets are perfect for removing duplicates and performing mathematical set operations. They don't maintain order and can't be indexed."
    }
  ]
};
