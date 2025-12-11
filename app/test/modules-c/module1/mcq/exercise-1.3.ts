import { Exercise } from '../../../data/lessonsData';

export const exercise_1_3: Exercise = {
  id: 1.3,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Who created the C programming language?",
      options: ["James Gosling", "Dennis Ritchie", "Bjarne Stroustrup", "Guido van Rossum"],
      correctAnswer: 1,
      explanation: "C was created by Dennis Ritchie at Bell Labs in the early 1970s as part of the UNIX operating system development."
    },
    {
      id: "q2",
      question: "What is the most popular C compiler used for learning and development?",
      options: ["Visual Studio Compiler", "GCC (GNU Compiler Collection)", "Intel C Compiler", "Borland C Compiler"],
      correctAnswer: 1,
      explanation: "GCC (GNU Compiler Collection) is the most widely used C compiler, available on Windows, macOS, and Linux."
    },
    {
      id: "q3",
      question: "Which command installs GCC on Ubuntu/Debian Linux?",
      options: ["sudo apt install gcc", "sudo yum install gcc", "sudo pacman -S gcc", "brew install gcc"],
      correctAnswer: 0,
      explanation: "On Ubuntu and Debian systems, GCC is installed using 'sudo apt install build-essential' which includes GCC."
    },
    {
      id: "q4",
      question: "What is the recommended code editor for beginners learning C?",
      options: ["Notepad", "Visual Studio Code", "Microsoft Word", "Paint"],
      correctAnswer: 1,
      explanation: "Visual Studio Code is recommended for beginners due to its C/C++ extensions, syntax highlighting, and integrated terminal."
    },
    {
      id: "q5",
      question: "Which of the following is the correct way to compile a C program named 'hello.c'?",
      options: ["compile hello.c", "gcc hello.c -o hello", "run hello.c", "execute hello.c"],
      correctAnswer: 1,
      explanation: "The correct command is 'gcc -o hello hello.c' where -o specifies the output filename and hello.c is the source file."
    },
    {
      id: "q6",
      question: "What does the -Wall flag do when compiling with GCC?",
      options: ["Creates a window", "Enables all warning messages", "Links all libraries", "Optimizes for speed"],
      correctAnswer: 1,
      explanation: "-Wall enables most warning messages that GCC can generate, helping catch potential bugs."
    },
    {
      id: "q7",
      question: "Which header file must be included to use the 'printf' function?",
      options: ["<stdlib.h>", "<stdio.h>", "<string.h>", "<math.h>"],
      correctAnswer: 1,
      explanation: "'printf' is declared in <stdio.h> (standard input/output header)."
    },
    {
      id: "q8",
      question: "What is the purpose of the 'return 0;' statement at the end of main()?",
      options: ["Exit the program", "Return success status to the operating system", "Free memory", "Close all files"],
      correctAnswer: 1,
      explanation: "Returning 0 from main() indicates successful program execution to the operating system."
    },
    {
      id: "q9",
      question: "Which symbol is used for single-line comments in C?",
      options: ["//", "/* */", "#", "--"],
      correctAnswer: 0,
      explanation: "C supports single-line comments using '//' (this was added in C99 standard)."
    },
    {
      id: "q10",
      question: "What is MinGW-w64 used for on Windows?",
      options: ["Web browsing", "Running Linux commands", "Providing GCC compiler for Windows", "Creating graphics"],
      correctAnswer: 2,
      explanation: "MinGW-w64 provides the GCC compiler suite for Windows, allowing compilation of C programs on Windows."
    }
  ]
};
