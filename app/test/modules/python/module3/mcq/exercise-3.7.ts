import { Exercise } from '../../../../data/lessonsData';

export const exercise_3_7: Exercise = {
  id: 3.7,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which of the following creates an empty list in Python?",
      options: ["list = {}", "list = []", "list = ()", "list = null"],
      correctAnswer: 1,
      explanation: "Empty lists are created using square brackets with nothing inside: []. Curly braces {} create dictionaries, parentheses () create tuples."
    },
    {
      id: "q2",
      question: "What will be the output of: print([1, 2, 3][0])?",
      options: ["1", "2", "3", "[1, 2, 3]", "Error"],
      correctAnswer: 0,
      explanation: "List indexing starts at 0, so [1, 2, 3][0] returns the first element which is 1."
    },
    {
      id: "q3",
      question: "Which of these creates a list with the numbers 1 through 5?",
      options: ["list(range(1, 5))", "list(range(1, 6))", "[1, 2, 3, 4, 5]", "Both b and c"],
      correctAnswer: 3,
      explanation: "Both list(range(1, 6)) and [1, 2, 3, 4, 5] create the same list [1, 2, 3, 4, 5]. range(1, 6) generates numbers from 1 to 5."
    },
    {
      id: "q4",
      question: "What does len([\"apple\", \"banana\", \"orange\"]) return?",
      options: ["3", "2", "4", "\"orange\""],
      correctAnswer: 0,
      explanation: "len() returns the number of elements in the list. The list has 3 elements: \"apple\", \"banana\", and \"orange\"."
    },
    {
      id: "q5",
      question: "How do you access the last element of a list named 'fruits'?",
      options: ["fruits[len(fruits)]", "fruits[-1]", "fruits[len(fruits)-1]", "Both b and c"],
      correctAnswer: 3,
      explanation: "Both fruits[-1] and fruits[len(fruits)-1] access the last element. Negative indexing starts from the end."
    },
    {
      id: "q6",
      question: "What is the output of: print([\"a\", \"b\", \"c\"][-2])?",
      options: ["a", "b", "c", "Error"],
      correctAnswer: 1,
      explanation: "Negative indexing [-2] counts from the end. For a 3-element list, [-2] is the second-to-last element, which is \"b\"."
    },
    {
      id: "q7",
      question: "Which of these creates a list from a string?",
      options: ["str(\"hello\")", "list(\"hello\")", "[\"hello\"]", "string.list()"],
      correctAnswer: 1,
      explanation: "list(\"hello\") converts each character of the string into a list element: ['h', 'e', 'l', 'l', 'o']."
    },
    {
      id: "q8",
      question: "What happens when you access an index that doesn't exist in a list?",
      options: ["Returns None", "Returns 0", "Causes an IndexError", "Returns the last element"],
      correctAnswer: 2,
      explanation: "Accessing an index beyond the list length causes an IndexError. Always check len(list) before accessing indices."
    },
    {
      id: "q9",
      question: "Which of these lists contains mixed data types?",
      options: ["[1, 2, 3]", "[\"a\", \"b\", \"c\"]", "[True, False]", "[\"Alice\", 25, True]"],
      correctAnswer: 3,
      explanation: "Lists can contain mixed data types. The list [\"Alice\", 25, True] contains a string, integer, and boolean."
    },
    {
      id: "q10",
      question: "What is the index of the first element in any Python list?",
      options: ["-1", "0", "1", "It depends on the list"],
      correctAnswer: 1,
      explanation: "Python list indexing always starts at 0. The first element is at index 0, second at index 1, etc."
    },
    {
      id: "q11",
      question: "How do you create a list with duplicate values?",
      options: ["Lists automatically remove duplicates", "Use the duplicate() function", "Simply include the same value multiple times", "Lists cannot have duplicates"],
      correctAnswer: 2,
      explanation: "Lists in Python allow duplicate values. You can include the same element multiple times: [1, 2, 2, 3]."
    },
    {
      id: "q12",
      question: "What does list(range(3)) create?",
      options: ["[1, 2, 3]", "[0, 1, 2]", "[3]", "Error"],
      correctAnswer: 1,
      explanation: "range(3) generates numbers from 0 to 2 (not including 3), so list(range(3)) creates [0, 1, 2]."
    },
    {
      id: "q13",
      question: "Which statement about Python lists is correct?",
      options: ["Lists are immutable", "Lists maintain insertion order", "Lists cannot contain other lists", "List elements must be the same type"],
      correctAnswer: 1,
      explanation: "Lists in Python are ordered - they maintain the order in which elements were added."
    },
    {
      id: "q14",
      question: "What is the result of len([])?",
      options: ["0", "1", "None", "Error"],
      correctAnswer: 0,
      explanation: "An empty list has length 0. len([]) returns 0."
    },
    {
      id: "q15",
      question: "How do you access the second element of a list named 'numbers'?",
      options: ["numbers[2]", "numbers[1]", "numbers[-2]", "numbers.second()"],
      correctAnswer: 1,
      explanation: "List indexing starts at 0, so the second element is at index 1: numbers[1]."
    }
  ]
};
