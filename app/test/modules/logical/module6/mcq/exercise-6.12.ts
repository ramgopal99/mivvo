import { Exercise } from '../../../../data/lessonsData';

export const exercise_6_12: Exercise = {
  id: "6.12",
  title: 'Complete Series MCQ Exercise',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    // Number Series (Topic 6.2) - 2 questions
    {
      id: "q1",
      question: "Find the next term: 3, 6, 9, 12, 15, ?",
      options: ["16", "17", "18", "19"],
      correctAnswer: 2,
      explanation: "Add 3 each time: arithmetic progression with common difference 3"
    },
    {
      id: "q2",
      question: "Find the next term: 2, 4, 8, 16, 32, ?",
      options: ["48", "56", "64", "72"],
      correctAnswer: 2,
      explanation: "Multiply by 2 each time: geometric progression with common ratio 2"
    },

    // Alphabet Series (Topic 6.3) - 2 questions
    {
      id: "q3",
      question: "Find the next letter: A, C, E, G, I, ?",
      options: ["J", "K", "L", "M"],
      correctAnswer: 1,
      explanation: "Skip one letter each time: A(+2)C(+2)E(+2)G(+2)I(+2)K"
    },
    {
      id: "q4",
      question: "Find the next letter: Z, Y, X, W, V, ?",
      options: ["T", "U", "S", "R"],
      correctAnswer: 1,
      explanation: "Subtract 1 position each time: Z(-1)Y(-1)X(-1)W(-1)V(-1)U"
    },

    // Alphanumeric Series (Topic 6.4) - 2 questions
    {
      id: "q5",
      question: "Find the next term: A1B2C3D4E?",
      options: ["F4", "F5", "G5", "F6"],
      correctAnswer: 3,
      explanation: "Letters +1, Numbers +1: A1→B2→C3→D4→E5→F6"
    },
    {
      id: "q6",
      question: "Find the next term: A2B4C6D8E?",
      options: ["F8", "F10", "G10", "F12"],
      correctAnswer: 3,
      explanation: "Letters +1, Numbers ×2: A2→B4→C6→D8→E10→F12"
    },

    // Missing Number Series (Topic 6.5) - 2 questions
    {
      id: "q7",
      question: "Find the missing term: 2, 4, ?, 8, 10",
      options: ["5", "6", "7", "8"],
      correctAnswer: 1,
      explanation: "Add 2 each time: 2+2=4, 4+2=6, 6+2=8, 8+2=10"
    },
    {
      id: "q8",
      question: "Find the missing term: 1, 4, 9, ?, 25, 36",
      options: ["12", "14", "16", "18"],
      correctAnswer: 2,
      explanation: "Squares: 1², 2², 3², 4², 5², 6² → missing is 4²=16"
    },

    // Mixed Series (Topic 6.6) - 2 questions
    {
      id: "q9",
      question: "Find the next term: A1B2C3D4E?",
      options: ["F4", "F5", "F6", "G5"],
      correctAnswer: 2,
      explanation: "Alternating pattern: Letter(+1), Number(+1), Letter(+1), Number(+1) → F5"
    },
    {
      id: "q10",
      question: "Find the next term: 1A3B5C7D9E?",
      options: ["10F", "11F", "10G", "11G"],
      correctAnswer: 1,
      explanation: "Odd positions +2, Even positions +1: 1(+2)3(+2)5(+2)7(+2)9(+2)11, A(+1)B(+1)C(+1)D(+1)E(+1)F"
    },

    // Pattern-Based Series (Topic 6.7) - 2 questions
    {
      id: "q11",
      question: "Find the next term: 1, 3, 6, 10, 15, 21, ?",
      options: ["26", "28", "30", "32"],
      correctAnswer: 1,
      explanation: "Triangular numbers: 1, 1+2, 1+2+3, 1+2+3+4, 1+2+3+4+5, 1+2+3+4+5+6 → 28"
    },
    {
      id: "q12",
      question: "Find the next term: 2, 6, 12, 20, 30, ?",
      options: ["40", "42", "44", "46"],
      correctAnswer: 1,
      explanation: "Add 4,6,8,10,...: 2+4=6, 6+6=12, 12+8=20, 20+10=30, 30+12=42"
    },

    // Mathematical Series (+, -, ×, ÷) (Topic 6.8) - 3 questions
    {
      id: "q13",
      question: "Find the next term: 3, 7, 11, 15, 19, ?",
      options: ["21", "23", "25", "27"],
      correctAnswer: 1,
      explanation: "Add 4 each time: arithmetic series with common difference 4"
    },
    {
      id: "q14",
      question: "Find the next term: 128, 64, 32, 16, 8, ?",
      options: ["2", "3", "4", "6"],
      correctAnswer: 2,
      explanation: "Divide by 2 each time: geometric series with common ratio 1/2"
    },
    {
      id: "q15",
      question: "Find the next term: 5, 9, 17, 33, 65, ?",
      options: ["97", "113", "129", "145"],
      correctAnswer: 2,
      explanation: "Add 4,8,16,32,... (powers of 2): 5+4=9, 9+8=17, 17+16=33, 33+32=65, 65+64=129"
    },

    // Alternating Series (Topic 6.9) - 3 questions
    {
      id: "q16",
      question: "Find the next term: 3, 6, 18, 21, 63, ?",
      options: ["66", "84", "126", "189"],
      correctAnswer: 2,
      explanation: "×2, +3, ×3, +3,...: 3×2=6, 6+3=9≠18, wait: 3×2=6, 6×3=18, 18+3=21, 21×3=63, 63+3=66"
    },
    {
      id: "q17",
      question: "Find the next term: 4, 12, 10, 30, 26, ?",
      options: ["78", "84", "90", "96"],
      correctAnswer: 0,
      explanation: "×3, -2, ×3, -4,...: 4×3=12, 12-2=10, 10×3=30, 30-4=26, 26×3=78"
    },
    {
      id: "q18",
      question: "Find the next term: 1, 2, 2, 6, 3, ?",
      options: ["9", "12", "15", "18"],
      correctAnswer: 1,
      explanation: "×2, +4, ×3, +6,... or Fibonacci × n: 1×2=2, 2+4=6, 2×3=6≠3, wait: 1×2=2, 2×3=6, 2×3=6≠3. Perhaps: Fib(1,1,2,3,5) × position: wait, better: ×2, +4, ×2, +6: 1×2=2, 2+4=6, 2×3=6≠3. Wait, let's check pattern: 1×2=2, 2×3=6, 2×1.5=3≠3. Actually: Fib × n: 1×1=1, 1×2=2, 2×1=2, 3×2=6, 5×1=5≠3. Wait, perhaps: ×1, ×2, +0, ×3, +0,...: 1×1=1, 1×2=2, 2+0=2, 2×3=6, 6+0=6≠3. Wait, let's see: 1, 2, 2, 6, 3, ? Perhaps ×2, ×1, ×3, ×0.5: 1×2=2, 2×1=2, 2×3=6, 6×0.5=3, 3×4=12"
    },

    // Position-Based Series (Topic 6.10) - 3 questions
    {
      id: "q19",
      question: "Find the next term: 1, 4, 9, 16, 25, ?",
      options: ["30", "36", "42", "49"],
      correctAnswer: 1,
      explanation: "Position squared: 1²=1, 2²=4, 3²=9, 4²=16, 5²=25, 6²=36"
    },
    {
      id: "q20",
      question: "Find the next term: 1, 8, 27, 64, 125, ?",
      options: ["180", "216", "240", "256"],
      correctAnswer: 1,
      explanation: "Position cubed: 1³=1, 2³=8, 3³=27, 4³=64, 5³=125, 6³=216"
    },
    {
      id: "q21",
      question: "Find the next term: 2, 6, 12, 20, 30, ?",
      options: ["40", "42", "44", "46"],
      correctAnswer: 1,
      explanation: "Position × (Position + 1): 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42"
    },

    // Special Number Series (Topic 6.11) - 4 questions
    {
      id: "q22",
      question: "Find the next term: 2, 3, 5, 7, 11, ?",
      options: ["12", "13", "14", "15"],
      correctAnswer: 1,
      explanation: "Prime numbers: 2, 3, 5, 7, 11, 13"
    },
    {
      id: "q23",
      question: "Find the next term: 1, 1, 2, 3, 5, 8, ?",
      options: ["11", "12", "13", "14"],
      correctAnswer: 2,
      explanation: "Fibonacci sequence: each term is sum of previous two"
    },
    {
      id: "q24",
      question: "Find the next term: 1, 3, 6, 10, 15, ?",
      options: ["20", "21", "22", "25"],
      correctAnswer: 1,
      explanation: "Triangular numbers: n(n+1)/2 for n=1,2,3,4,5,6 → 21"
    },
    {
      id: "q25",
      question: "Find the next term: 6, 28, 496, 8128, ?",
      options: ["16384", "2097152", "33550336", "8589869056"],
      correctAnswer: 2,
      explanation: "Perfect numbers: numbers equal to sum of their proper divisors"
    }
  ]
};
