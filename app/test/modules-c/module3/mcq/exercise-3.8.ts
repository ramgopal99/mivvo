import { Exercise } from '../../../data/lessonsData';

export const exercise_3_8: Exercise = {
  id: 3.8,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is the output of the following code?\n\nif (5 > 3) {\n    printf(\"A\");\n} else {\n    printf(\"B\");\n}",
      options: ["A", "B", "AB", "Nothing"],
      correctAnswer: 0,
      explanation: "Since 5 > 3 is true, the code in the if block executes, printing 'A'."
    },
    {
      id: "q2",
      question: "Which loop is guaranteed to execute at least once?",
      options: ["for loop", "while loop", "do-while loop", "None of the above"],
      correctAnswer: 2,
      explanation: "do-while loops execute the body first, then check the condition, so they always run at least once."
    },
    {
      id: "q3",
      question: "What does the break statement do in a loop?",
      options: ["Skips the current iteration", "Exits the loop immediately", "Restarts the loop", "None of the above"],
      correctAnswer: 1,
      explanation: "break immediately terminates the loop and continues execution after the loop."
    },
    {
      id: "q4",
      question: "What is the output of this switch statement?\n\nint x = 2;\nswitch(x) {\n    case 1: printf(\"One\"); break;\n    case 2: printf(\"Two\");\n    case 3: printf(\"Three\"); break;\n}",
      options: ["One", "Two", "TwoThree", "Three"],
      correctAnswer: 2,
      explanation: "Case 2 matches and prints 'Two', but there's no break, so execution continues to case 3, printing 'Three'."
    },
    {
      id: "q5",
      question: "Which of the following is an infinite loop?",
      options: ["for(;;)", "while(1)", "do { } while(1);", "All of the above"],
      correctAnswer: 3,
      explanation: "All three are infinite loops: for(;;) has no conditions, while(1) is always true, and do-while(1) always continues."
    },
    {
      id: "q6",
      question: "What does the continue statement do?",
      options: ["Exits the program", "Skips the rest of the current iteration", "Restarts the loop from the beginning", "Exits the current function"],
      correctAnswer: 1,
      explanation: "continue skips the remaining code in the current iteration and jumps to the next iteration of the loop."
    },
    {
      id: "q7",
      question: "Which of these is the correct syntax for a for loop?",
      options: ["for (int i = 0; i < 5; i++)", "for (i = 0, i < 5, i++)", "for i in range(5):", "for (int i = 0, i < 5, i++)"],
      correctAnswer: 0,
      explanation: "The correct syntax is for (initialization; condition; increment) with semicolons separating the parts."
    },
    {
      id: "q8",
      question: "What happens if you forget the break statement in a switch case?",
      options: ["The program crashes", "Execution continues to the next case", "The switch ends immediately", "Nothing special happens"],
      correctAnswer: 1,
      explanation: "Without break, execution 'falls through' to the next case, which can be intentional or a bug."
    },
    {
      id: "q9",
      question: "Which loop would you use to read input until the user enters a specific value?",
      options: ["for loop", "while loop", "do-while loop", "Any of them"],
      correctAnswer: 3,
      explanation: "Any loop can be used, but while and do-while are most natural for unknown number of iterations based on conditions."
    },
    {
      id: "q10",
      question: "What is the difference between while and do-while loops?",
      options: ["while checks condition first, do-while executes first", "do-while checks condition first, while executes first", "They are identical", "while is faster"],
      correctAnswer: 0,
      explanation: "while loops check the condition before executing, do-while loops execute once before checking the condition."
    }
  ]
};
