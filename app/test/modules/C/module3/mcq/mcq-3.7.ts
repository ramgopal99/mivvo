import { Exercise } from '../../../../data/lessonsData';

export const exercise_3_7: Exercise = {
  id: "3.7",
  title: 'Control Structures MCQ',
  status: 'demo',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is the output of the following code?\n\n```c\n#include <stdio.h>\nint main() {\n    int x = 5;\n    if (x > 10) {\n        printf(\"Big\");\n    } else {\n        printf(\"Small\");\n    }\n    return 0;\n}\n```",
      options: [
        "Big",
        "Small",
        "No output",
        "Compilation error"
      ],
      correctAnswer: 1,
      explanation: "Since x (5) is not greater than 10, the else block executes, printing 'Small'."
    },
    {
      id: "q2",
      question: "Which of the following is the correct syntax for a while loop in C?",
      options: [
        "while condition { statements; }",
        "while (condition) { statements; }",
        "while condition: statements;",
        "while (condition) statements;"
      ],
      correctAnswer: 1,
      explanation: "The correct syntax for a while loop requires parentheses around the condition and curly braces around the statements."
    },
    {
      id: "q3",
      question: "What does the 'break' statement do in a loop?",
      options: [
        "Skips the current iteration and continues with the next",
        "Exits the loop immediately",
        "Restarts the loop from the beginning",
        "Pauses the loop execution"
      ],
      correctAnswer: 1,
      explanation: "The break statement immediately terminates the loop and transfers control to the statement following the loop."
    },
    {
      id: "q4",
      question: "Which logical operator has the highest precedence?",
      options: [
        "&& (AND)",
        "|| (OR)",
        "! (NOT)",
        "All have equal precedence"
      ],
      correctAnswer: 2,
      explanation: "The NOT operator (!) has the highest precedence, followed by AND (&&), then OR (||)."
    },
    {
      id: "q5",
      question: "What is the output of this code?\n\n```c\n#include <stdio.h>\nint main() {\n    int i = 0;\n    do {\n        printf(\"%d \", i);\n        i++;\n    } while (i < 3);\n    return 0;\n}\n```",
      options: [
        "0 1 2",
        "1 2 3",
        "0 1 2 3",
        "No output"
      ],
      correctAnswer: 0,
      explanation: "The do-while loop executes once before checking the condition. It prints 0, increments to 1, prints 1, increments to 2, prints 2, then stops when i becomes 3."
    },
    {
      id: "q6",
      question: "Which of the following statements about switch statements is true?",
      options: [
        "Switch can only use integer constants as case values",
        "Switch requires a default case",
        "Switch can have multiple default cases",
        "Switch cases must be in ascending order"
      ],
      correctAnswer: 0,
      explanation: "Switch statements can only use integer constants (including char) as case values. Default case is optional, and case order doesn't matter."
    },
    {
      id: "q7",
      question: "What is the difference between 'break' and 'continue' in loops?",
      options: [
        "Both terminate the loop completely",
        "break exits the current iteration, continue exits the loop",
        "break exits the loop, continue skips to next iteration",
        "They are identical in functionality"
      ],
      correctAnswer: 2,
      explanation: "break terminates the entire loop, while continue skips the remaining code in the current iteration and moves to the next iteration."
    },
    {
      id: "q8",
      question: "Which loop is guaranteed to execute at least once?",
      options: [
        "for loop",
        "while loop",
        "do-while loop",
        "None of the above"
      ],
      correctAnswer: 2,
      explanation: "The do-while loop executes the body once before checking the condition, guaranteeing at least one execution."
    },
    {
      id: "q9",
      question: "What is a 'nested if' statement?",
      options: [
        "An if statement inside another if statement",
        "Multiple if statements in sequence",
        "An if statement with multiple conditions",
        "An if statement that calls itself"
      ],
      correctAnswer: 0,
      explanation: "A nested if is an if statement that is placed inside another if statement, allowing for more complex conditional logic."
    },
    {
      id: "q10",
      question: "What is the output of this code?\n\n```c\n#include <stdio.h>\nint main() {\n    for(int i = 0; i < 3; i++) {\n        if(i == 1) continue;\n        printf(\"%d \", i);\n    }\n    return 0;\n}\n```",
      options: [
        "0 1 2",
        "0 2",
        "1 2",
        "0 1"
      ],
      correctAnswer: 1,
      explanation: "When i=1, continue skips the printf statement, so only 0 and 2 are printed."
    }
  ]
};
