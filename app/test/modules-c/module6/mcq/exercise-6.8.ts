import { Exercise } from '../../../data/lessonsData';

export const exercise_6_8: Exercise = {
  id: 6.8,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What does the following code do?\n\nint x = 42;\nint* ptr = &x;",
      options: ["Declares a pointer and assigns it the address of x", "Declares a pointer and assigns it the value of x", "Declares two pointers", "Creates a copy of x"],
      correctAnswer: 0,
      explanation: "int* ptr = &x; declares a pointer ptr and assigns it the memory address of variable x using the address-of operator &."
    },
    {
      id: "q2",
      question: "What is the output of this code?\n\nint arr[] = {10, 20, 30};\nint* ptr = arr;\nprintf(\"%d\", *ptr);",
      options: ["10", "Address of arr", "30", "Garbage value"],
      correctAnswer: 0,
      explanation: "ptr points to the first element of arr, so *ptr dereferences to the value 10."
    },
    {
      id: "q3",
      question: "Which of these is a correct way to declare a pointer to a function that takes two ints and returns an int?",
      options: ["int (*func)(int, int);", "int* func(int, int);", "int func*(int, int);", "int (func*)(int, int);"],
      correctAnswer: 0,
      explanation: "int (*func)(int, int); is the correct syntax for a function pointer that takes two ints and returns an int."
    },
    {
      id: "q4",
      question: "What does malloc() return if memory allocation fails?",
      options: ["0", "NULL", "Garbage value", "-1"],
      correctAnswer: 1,
      explanation: "malloc() returns NULL if it cannot allocate the requested memory."
    },
    {
      id: "q5",
      question: "What is a dangling pointer?",
      options: ["A pointer that points to NULL", "A pointer that points to freed memory", "A pointer that is uninitialized", "A pointer to a local variable"],
      correctAnswer: 1,
      explanation: "A dangling pointer points to memory that has been freed or is no longer valid."
    },
    {
      id: "q6",
      question: "Which function is used to resize dynamically allocated memory?",
      options: ["malloc()", "free()", "realloc()", "calloc()"],
      correctAnswer: 2,
      explanation: "realloc() is used to resize a block of dynamically allocated memory."
    },
    {
      id: "q7",
      question: "What is the difference between malloc() and calloc()?",
      options: ["malloc allocates more memory than calloc", "calloc initializes memory to zero, malloc does not", "malloc is faster than calloc", "There is no difference"],
      correctAnswer: 1,
      explanation: "calloc() initializes the allocated memory to zero, while malloc() leaves it uninitialized."
    },
    {
      id: "q8",
      question: "What happens if you dereference a NULL pointer?",
      options: ["Program runs normally", "Program crashes with segmentation fault", "Pointer becomes valid", "Memory is automatically allocated"],
      correctAnswer: 1,
      explanation: "Dereferencing a NULL pointer typically causes a segmentation fault or undefined behavior."
    },
    {
      id: "q9",
      question: "Which of these pointer declarations is correct for a constant pointer to int?",
      options: ["int const* ptr;", "int* const ptr;", "Both are correct but mean different things", "Neither is correct"],
      correctAnswer: 2,
      explanation: "int const* ptr; means pointer to constant int, int* const ptr; means constant pointer to int."
    },
    {
      id: "q10",
      question: "What is pointer arithmetic?",
      options: ["Adding pointers together", "Operations like ptr + n that move the pointer by n * sizeof(type) bytes", "Converting pointers to numbers", "Comparing pointer addresses"],
      correctAnswer: 1,
      explanation: "Pointer arithmetic automatically scales by the size of the pointed-to type, so ptr + 1 moves the pointer by sizeof(*ptr) bytes."
    }
  ]
};
