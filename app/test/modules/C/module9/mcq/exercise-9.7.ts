import { Exercise } from '../../../../data/lessonsData';

export const exercise_9_7: Exercise = {
  id: "9.7",
  title: 'Dynamic Memory Allocation MCQ',
  status: 'demo',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which function is used to allocate memory dynamically in C?",
      options: [
        "alloc()",
        "malloc()",
        "new()",
        "create()"
      ],
      correctAnswer: 1,
      explanation: "malloc() (memory allocate) is the standard C function for dynamic memory allocation."
    },
    {
      id: "q2",
      question: "What does malloc() return if memory allocation fails?",
      options: [
        "0",
        "NULL",
        "-1",
        "An error code"
      ],
      correctAnswer: 1,
      explanation: "malloc() returns NULL if it cannot allocate the requested memory."
    },
    {
      id: "q3",
      question: "What is the difference between malloc() and calloc()?",
      options: [
        "malloc() takes one parameter, calloc() takes two",
        "malloc() initializes to zero, calloc() doesn't",
        "malloc() is faster than calloc()",
        "There is no difference"
      ],
      correctAnswer: 0,
      explanation: "malloc() takes one parameter (total bytes), calloc() takes two (number of elements, size per element)."
    },
    {
      id: "q4",
      question: "Which function is used to resize dynamically allocated memory?",
      options: [
        "resize()",
        "realloc()",
        "expand()",
        "enlarge()"
      ],
      correctAnswer: 1,
      explanation: "realloc() resizes an existing memory block allocated by malloc(), calloc(), or realloc()."
    },
    {
      id: "q5",
      question: "What happens if you don't free dynamically allocated memory?",
      options: [
        "The program crashes",
        "Memory leak occurs",
        "The memory is automatically freed",
        "The memory becomes unusable"
      ],
      correctAnswer: 1,
      explanation: "Failing to free allocated memory causes memory leaks, where memory is not returned to the system."
    },
    {
      id: "q6",
      question: "What is a dangling pointer?",
      options: [
        "A pointer that points to NULL",
        "A pointer that points to freed memory",
        "A pointer that hasn't been initialized",
        "A pointer to a local variable"
      ],
      correctAnswer: 1,
      explanation: "A dangling pointer points to memory that has been freed, leading to undefined behavior if accessed."
    },
    {
      id: "q7",
      question: "Which of the following is the correct way to free memory?",
      options: [
        "delete(ptr)",
        "free(ptr)",
        "release(ptr)",
        "dealloc(ptr)"
      ],
      correctAnswer: 1,
      explanation: "free() is the standard C function to deallocate memory previously allocated by malloc(), calloc(), or realloc()."
    },
    {
      id: "q8",
      question: "What does calloc() do that malloc() doesn't?",
      options: [
        "Allocates larger blocks",
        "Initializes memory to zero",
        "Takes more parameters",
        "Is faster"
      ],
      correctAnswer: 1,
      explanation: "calloc() initializes all allocated memory to zero, while malloc() leaves memory uninitialized."
    },
    {
      id: "q9",
      question: "What should you do after calling free() on a pointer?",
      options: [
        "Set it to NULL",
        "Call malloc() again",
        "Leave it as is",
        "Call realloc()"
      ],
      correctAnswer: 0,
      explanation: "Setting freed pointers to NULL prevents accidental use of dangling pointers."
    },
    {
      id: "q10",
      question: "Which memory area is used for dynamic memory allocation?",
      options: [
        "Stack",
        "Heap",
        "Global memory",
        "Code segment"
      ],
      correctAnswer: 1,
      explanation: "Dynamic memory allocation (malloc, calloc, realloc) uses the heap memory area."
    }
  ]
};
