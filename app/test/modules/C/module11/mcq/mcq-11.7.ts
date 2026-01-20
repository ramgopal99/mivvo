import { Exercise } from '../../../../data/lessonsData';

export const exercise_11_7: Exercise = {
  id: "11.7",
  title: 'File I/O and System Programming MCQs',
  status: 'demo',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which function is used to open a file in C?",
      options: [
        "open()",
        "fopen()",
        "fileopen()",
        "createfile()"
      ],
      correctAnswer: 1,
      explanation: "fopen() is the standard C library function for opening files and returns a FILE pointer."
    },
    {
      id: "q2",
      question: "What does the 'r+' mode in fopen() allow?",
      options: [
        "Read only",
        "Write only",
        "Read and write",
        "Append only"
      ],
      correctAnswer: 2,
      explanation: "'r+' mode opens a file for both reading and writing."
    },
    {
      id: "q3",
      question: "Which function is used to read formatted input from a file?",
      options: [
        "fread()",
        "fscanf()",
        "fgets()",
        "read()"
      ],
      correctAnswer: 1,
      explanation: "fscanf() reads formatted input from a file, similar to scanf() but from a file stream."
    },
    {
      id: "q4",
      question: "What is the difference between text mode and binary mode file opening?",
      options: [
        "Text mode is faster",
        "Binary mode handles newlines differently",
        "Text mode can only read text files",
        "There is no difference"
      ],
      correctAnswer: 1,
      explanation: "In text mode, newline characters are translated (CRLF on Windows), while binary mode reads data as-is without translation."
    },
    {
      id: "q5",
      question: "Which function is used to get the current file position?",
      options: [
        "ftell()",
        "fseek()",
        "rewind()",
        "fgetpos()"
      ],
      correctAnswer: 0,
      explanation: "ftell() returns the current file position as a long integer."
    },
    {
      id: "q6",
      question: "What does the fork() system call return in the child process?",
      options: [
        "-1",
        "0",
        "Parent PID",
        "Child PID"
      ],
      correctAnswer: 1,
      explanation: "fork() returns 0 in the child process and the child's PID in the parent process."
    },
    {
      id: "q7",
      question: "Which signal is sent when a user presses Ctrl+C?",
      options: [
        "SIGTERM",
        "SIGKILL",
        "SIGINT",
        "SIGSTOP"
      ],
      correctAnswer: 2,
      explanation: "SIGINT (interrupt signal) is sent when the user presses Ctrl+C."
    },
    {
      id: "q8",
      question: "What does mmap() do?",
      options: [
        "Creates a new file",
        "Maps a file to memory",
        "Deletes a file",
        "Moves a file"
      ],
      correctAnswer: 1,
      explanation: "mmap() maps a file or device into memory, allowing direct memory access to file contents."
    },
    {
      id: "q9",
      question: "Which function creates a POSIX thread?",
      options: [
        "create_thread()",
        "pthread_create()",
        "thread_create()",
        "new_thread()"
      ],
      correctAnswer: 1,
      explanation: "pthread_create() is the POSIX function for creating new threads."
    },
    {
      id: "q10",
      question: "What is the main difference between TCP and UDP sockets?",
      options: [
        "TCP is faster",
        "UDP is connection-oriented",
        "TCP guarantees delivery",
        "UDP uses port numbers"
      ],
      correctAnswer: 2,
      explanation: "TCP provides reliable, connection-oriented communication with guaranteed delivery, while UDP is connectionless and unreliable."
    }
  ]
};
