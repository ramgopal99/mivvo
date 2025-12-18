import { Exercise } from '../../../../data/lessonsData';

export const exercise_17_4: Exercise = {
  id: 17.4,
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which mode should you use when opening a file for reading text?",
      options: ["'w'", "'r'", "'a'", "'x'"],
      correctAnswer: 1,
      explanation: "'r' is the read mode for opening files for reading text content."
    },
    {
      id: "q2",
      question: "What is the correct way to safely open and close a file in Python?",
      options: ["file.open(); file.close()", "with open() as file:", "open().close()", "file = open(); file.close()"],
      correctAnswer: 1,
      explanation: "The 'with' statement automatically handles file closing, even if exceptions occur."
    },
    {
      id: "q3",
      question: "Which Tkinter widget is used to create a clickable button?",
      options: ["Label", "Entry", "Button", "Frame"],
      correctAnswer: 2,
      explanation: "The Button widget creates clickable buttons in Tkinter GUI applications."
    },
    {
      id: "q4",
      question: "What does the pygame.display.set_mode() function do?",
      options: ["Sets the window title", "Creates the game window", "Loads an image", "Plays a sound"],
      correctAnswer: 1,
      explanation: "pygame.display.set_mode() creates and returns a Surface representing the game window."
    },
    {
      id: "q5",
      question: "Which method is used to read all lines from a file into a list?",
      options: ["read()", "readline()", "readlines()", "readall()"],
      correctAnswer: 2,
      explanation: "readlines() reads all lines from a file and returns them as a list of strings."
    },
    {
      id: "q6",
      question: "What is the purpose of the Tkinter mainloop() method?",
      options: ["Creates the main window", "Starts the event loop", "Closes the application", "Updates the display"],
      correctAnswer: 1,
      explanation: "mainloop() starts the Tkinter event loop, which waits for and processes events like button clicks."
    },
    {
      id: "q7",
      question: "Which pygame module is used for handling keyboard and mouse input?",
      options: ["pygame.display", "pygame.event", "pygame.image", "pygame.mixer"],
      correctAnswer: 1,
      explanation: "pygame.event handles all types of input events including keyboard, mouse, and system events."
    },
    {
      id: "q8",
      question: "What does the 'b' flag do when opening a file?",
      options: ["Opens in binary mode", "Opens in buffered mode", "Opens in big-endian mode", "Opens in blocking mode"],
      correctAnswer: 0,
      explanation: "The 'b' flag opens the file in binary mode, which is necessary for reading/writing binary data like images."
    },
    {
      id: "q9",
      question: "Which Tkinter geometry manager organizes widgets in a table-like grid?",
      options: ["pack()", "place()", "grid()", "flow()"],
      correctAnswer: 2,
      explanation: "grid() organizes widgets in rows and columns, similar to a spreadsheet layout."
    },
    {
      id: "q10",
      question: "What is the pygame clock used for?",
      options: ["Playing sound effects", "Managing game time and frame rate", "Creating timers", "Handling events"],
      correctAnswer: 1,
      explanation: "pygame.time.Clock is used to control the frame rate and manage game timing."
    },
    {
      id: "q11",
      question: "Which method is used to write text to a file?",
      options: ["write()", "writeline()", "writelines()", "append()"],
      correctAnswer: 0,
      explanation: "write() writes a string to a file at the current position."
    },
    {
      id: "q12",
      question: "What does the Tkinter StringVar() class do?",
      options: ["Creates a string variable", "Converts strings to numbers", "Validates string input", "Formats string output"],
      correctAnswer: 0,
      explanation: "StringVar() creates a special variable that can be associated with Tkinter widgets and automatically updates the GUI when changed."
    },
    {
      id: "q13",
      question: "Which pygame function is used to load and display images?",
      options: ["pygame.image.load()", "pygame.display.load()", "pygame.surface.load()", "pygame.sprite.load()"],
      correctAnswer: 0,
      explanation: "pygame.image.load() loads an image file and returns a Surface that can be displayed on the screen."
    },
    {
      id: "q14",
      question: "What does the seek() method do in file operations?",
      options: ["Finds text in a file", "Moves the file pointer to a specific position", "Searches for a pattern", "Changes file permissions"],
      correctAnswer: 1,
      explanation: "seek() moves the file pointer to a specified position, allowing random access to file content."
    },
    {
      id: "q15",
      question: "Which pygame event type represents a key being pressed?",
      options: ["KEYDOWN", "KEYUP", "KEYPRESS", "KEYBOARD"],
      correctAnswer: 0,
      explanation: "KEYDOWN events are generated when a keyboard key is pressed down."
    }
  ]
};
