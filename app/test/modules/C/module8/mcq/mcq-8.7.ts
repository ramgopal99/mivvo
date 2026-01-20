import { Exercise } from '../../../../data/lessonsData';

export const exercise_8_7: Exercise = {
  id: "8.7",
  title: 'File I/O MCQ',
  status: 'demo',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which function is used to open a file in C?",
      options: [
        "open()",
        "fopen()",
        "file_open()",
        "create_file()"
      ],
      correctAnswer: 1,
      explanation: "fopen() is the standard C function used to open files. It takes a filename and mode as parameters."
    },
    {
      id: "q2",
      question: "What does the 'r' mode do when opening a file with fopen()?",
      options: [
        "Opens file for writing, creates if doesn't exist",
        "Opens file for reading, file must exist",
        "Opens file for appending, creates if doesn't exist",
        "Opens file for reading and writing"
      ],
      correctAnswer: 1,
      explanation: "'r' mode opens an existing file for reading. If the file doesn't exist, fopen() returns NULL."
    },
    {
      id: "q3",
      question: "Which function is used to write formatted output to a file?",
      options: [
        "printf()",
        "fprintf()",
        "fputs()",
        "fwrite()"
      ],
      correctAnswer: 1,
      explanation: "fprintf() works like printf() but writes to a file instead of stdout."
    },
    {
      id: "q4",
      question: "What does EOF stand for in file I/O?",
      options: [
        "End Of Function",
        "End Of File",
        "Error On File",
        "Execute On Finish"
      ],
      correctAnswer: 1,
      explanation: "EOF (End Of File) is a constant that indicates the end of a file has been reached."
    },
    {
      id: "q5",
      question: "Which of the following is the correct way to close a file in C?",
      options: [
        "close(file)",
        "fclose(file)",
        "file_close(file)",
        "end_file(file)"
      ],
      correctAnswer: 1,
      explanation: "fclose() is used to close an opened file and free associated resources."
    },
    {
      id: "q6",
      question: "What happens if you try to open a file that doesn't exist in 'r' mode?",
      options: [
        "The file gets created automatically",
        "fopen() returns NULL",
        "The program crashes",
        "It opens an empty file"
      ],
      correctAnswer: 1,
      explanation: "When opening a non-existent file in 'r' mode, fopen() returns NULL, allowing you to check for errors."
    },
    {
      id: "q7",
      question: "Which function reads a string from a file?",
      options: [
        "fscanf()",
        "fgets()",
        "fgetc()",
        "fread()"
      ],
      correctAnswer: 1,
      explanation: "fgets() reads a line (string) from a file, similar to how gets() works but safer."
    },
    {
      id: "q8",
      question: "What is the difference between 'w' and 'a' modes?",
      options: [
        "'w' writes, 'a' appends - no other difference",
        "'w' overwrites file, 'a' adds to end",
        "'w' is for text, 'a' is for binary",
        "'w' requires file to exist, 'a' creates it"
      ],
      correctAnswer: 1,
      explanation: "'w' mode truncates/overwrites existing content, while 'a' mode appends to the end of existing content."
    },
    {
      id: "q9",
      question: "Which of these is NOT a valid file opening mode?",
      options: [
        "r+",
        "w+",
        "x",
        "a+"
      ],
      correctAnswer: 2,
      explanation: "'x' is not a standard C file opening mode. Valid modes include r, w, a, r+, w+, a+."
    },
    {
      id: "q10",
      question: "What should you always check after calling fopen()?",
      options: [
        "If the file size is greater than 0",
        "If the return value is not NULL",
        "If the file extension is correct",
        "If the file mode is valid"
      ],
      correctAnswer: 1,
      explanation: "Always check if fopen() returns NULL, which indicates the file could not be opened."
    }
  ]
};
