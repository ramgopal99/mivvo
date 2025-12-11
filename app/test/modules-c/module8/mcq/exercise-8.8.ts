import { Exercise } from '../../../data/lessonsData';

export const exercise_8_8: Exercise = {
  id: 8.8,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is a stream in the context of C file I/O?",
      options: ["A sequence of bytes flowing between a program and a file", "A type of data structure for storing files", "A function for reading file contents", "A buffer for temporary storage"],
      correctAnswer: 0,
      explanation: "A stream is a sequence of bytes that flows between a program and a file or device, providing an abstraction for I/O operations."
    },
    {
      id: "q2",
      question: "What does fopen() return if it fails to open a file?",
      options: ["EOF", "NULL", "0", "-1"],
      correctAnswer: 1,
      explanation: "fopen() returns NULL if it fails to open the file, so always check the return value before using the FILE pointer."
    },
    {
      id: "q3",
      question: "Which function is used to move to a specific position in a file?",
      options: ["fmove()", "fseek()", "fposition()", "fsetpos()"],
      correctAnswer: 1,
      explanation: "fseek() is used to set the file position indicator to a specific location in the file."
    },
    {
      id: "q4",
      question: "What is the difference between fgets() and fread()?",
      options: ["fgets() reads binary data, fread() reads text", "fgets() reads a line of text, fread() reads binary data", "fgets() is for writing, fread() is for reading", "There is no difference"],
      correctAnswer: 1,
      explanation: "fgets() reads a line of text until a newline or EOF, while fread() reads raw binary data of a specified size."
    },
    {
      id: "q5",
      question: "What does ferror() check for?",
      options: ["End of file", "File existence", "Read/write errors", "File size"],
      correctAnswer: 2,
      explanation: "ferror() checks if an error has occurred during a file operation, such as read or write failures."
    },
    {
      id: "q6",
      question: "Which file mode should be used to open a file for reading and writing without truncating it?",
      options: ["\"w+\"", "\"r+\"", "\"a+\"", "\"rw\""],
      correctAnswer: 1,
      explanation: "\"r+\" opens a file for both reading and writing without truncating it, positioning at the beginning."
    },
    {
      id: "q7",
      question: "What is the main advantage of binary files over text files?",
      options: ["Human readability", "Compact storage and faster I/O", "Cross-platform compatibility", "Easy editing with text editors"],
      correctAnswer: 1,
      explanation: "Binary files provide compact storage (exact byte representation) and faster I/O operations compared to text files."
    },
    {
      id: "q8",
      question: "What does the 'b' flag in file modes like \"rb\" or \"wb\" indicate?",
      options: ["Big file support", "Binary mode (no text conversion)", "Buffered I/O", "Backup file"],
      correctAnswer: 1,
      explanation: "The 'b' flag indicates binary mode, which prevents automatic text conversions like line ending translation."
    },
    {
      id: "q9",
      question: "Which function should be used to get the current file position?",
      options: ["fposition()", "ftell()", "fgetpos()", "fcurrent()"],
      correctAnswer: 1,
      explanation: "ftell() returns the current file position as a long integer offset from the beginning of the file."
    },
    {
      id: "q10",
      question: "What is the primary disadvantage of binary files?",
      options: ["Larger file sizes", "Not human readable", "Slower I/O", "Limited data types"],
      correctAnswer: 1,
      explanation: "Binary files are not human readable and cannot be easily viewed or edited with text editors, making debugging more difficult."
    }
  ]
};

