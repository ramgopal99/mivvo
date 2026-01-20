import { Exercise } from '../../../../data/lessonsData';

export const exercise_17_7: Exercise = {
  id: "17.7",
  title: 'C Libraries & Tools MCQs',
  status: 'demo',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which build system uses CMakeLists.txt files for configuration?",
      options: [
        "Make",
        "CMake",
        "Autotools",
        "Meson"
      ],
      correctAnswer: 1,
      explanation: "CMake uses CMakeLists.txt files to define build configurations and generate makefiles or other build files."
    },
    {
      id: "q2",
      question: "What is the purpose of the .so file extension in Linux?",
      options: [
        "Static library",
        "Object file",
        "Shared library",
        "Executable"
      ],
      correctAnswer: 2,
      explanation: ".so files are shared libraries in Linux that can be loaded at runtime by multiple programs."
    },
    {
      id: "q3",
      question: "Which tool is used for static analysis of C code?",
      options: [
        "gdb",
        "cppcheck",
        "valgrind",
        "strace"
      ],
      correctAnswer: 1,
      explanation: "cppcheck is a static analysis tool that detects bugs and undefined behavior in C/C++ code without executing it."
    },
    {
      id: "q4",
      question: "What does the -fPIC flag do when compiling shared libraries?",
      options: [
        "Forces position-independent code",
        "Enables fast integer computations",
        "Disables position-independent code",
        "Optimizes for position-dependent code"
      ],
      correctAnswer: 0,
      explanation: "-fPIC generates position-independent code, which is required for shared libraries that can be loaded at any address."
    },
    {
      id: "q5",
      question: "Which library provides SQLite database functionality in C?",
      options: [
        "libsqlite3.so",
        "libmysql.so",
        "libpq.so",
        "libdb.so"
      ],
      correctAnswer: 0,
      explanation: "SQLite provides self-contained database functionality through the libsqlite3 library."
    },
    {
      id: "q6",
      question: "What is the purpose of pkg-config?",
      options: [
        "Package manager for C libraries",
        "Tool for retrieving library compilation flags",
        "Code formatting tool",
        "Static analysis tool"
      ],
      correctAnswer: 1,
      explanation: "pkg-config retrieves compilation flags and library paths for installed libraries, used in build systems like Autotools and CMake."
    },
    {
      id: "q7",
      question: "Which IDE is specifically designed for C/C++ development by JetBrains?",
      options: [
        "Visual Studio Code",
        "Eclipse CDT",
        "CLion",
        "Code::Blocks"
      ],
      correctAnswer: 2,
      explanation: "CLion is JetBrains' IDE specifically designed for C and C++ development."
    },
    {
      id: "q8",
      question: "What does Doxygen generate from C source code?",
      options: [
        "Unit tests",
        "Documentation",
        "Executables",
        "Makefiles"
      ],
      correctAnswer: 1,
      explanation: "Doxygen generates HTML and other documentation from specially formatted comments in source code."
    },
    {
      id: "q9",
      question: "Which tool is used for memory leak detection in C programs?",
      options: [
        "gdb",
        "cppcheck",
        "valgrind",
        "strace"
      ],
      correctAnswer: 2,
      explanation: "Valgrind's memcheck tool detects memory leaks, invalid memory access, and other memory-related errors."
    },
    {
      id: "q10",
      question: "What is the purpose of the extern \"C\" declaration in C++ headers?",
      options: [
        "Links C++ code with C libraries",
        "Prevents name mangling for C linkage",
        "Enables C++ features in C code",
        "Converts C code to C++"
      ],
      correctAnswer: 1,
      explanation: "extern \"C\" prevents C++ name mangling, allowing C++ code to call C functions with standard C linkage."
    }
  ]
};
