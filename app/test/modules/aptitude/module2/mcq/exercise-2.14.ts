import { Exercise } from '../../../../data/lessonsData';

export const exercise_2_14: Exercise = {
  id: "2.14",
  title: 'Simplification MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Simplify: 8 + 4 × (6 ÷ 2) - 3",
      options: ["5", "11", "14", "17"],
      correctAnswer: 2,
      explanation: "BODMAS: 6 ÷ 2 = 3, 4 × 3 = 12, 8 + 12 - 3 = 17 - 3 = 14"
    },
    {
      id: "q2",
      question: "What is the result of 15 - (8 + 3) × 2?",
      options: ["-7", "1", "7", "8"],
      correctAnswer: 0,
      explanation: "BODMAS: 8 + 3 = 11, 11 × 2 = 22, 15 - 22 = -7"
    },
    {
      id: "q3",
      question: "Simplify: 2 × [3 + (4 × 2)]",
      options: ["22", "18", "16", "14"],
      correctAnswer: 0,
      explanation: "Brackets: 4 × 2 = 8, 3 + 8 = 11, 2 × 11 = 22"
    },
    {
      id: "q4",
      question: "Calculate: \\frac{2}{3} + \\frac{1}{4}",
      options: ["\\frac{5}{7}", "\\frac{8}{12}", "\\frac{11}{12}", "\\frac{5}{6}"],
      correctAnswer: 2,
      explanation: "Common denominator 12: \\frac{8}{12} + \\frac{3}{12} = \\frac{11}{12}"
    },
    {
      id: "q5",
      question: "Simplify: \\frac{3}{4} × \\frac{2}{5}",
      options: ["\\frac{3}{10}", "\\frac{6}{20}", "\\frac{3}{10}", "\\frac{6}{9}"],
      correctAnswer: 0,
      explanation: "\\frac{3}{4} × \\frac{2}{5} = \\frac{6}{20} = \\frac{3}{10}"
    },
    {
      id: "q6",
      question: "Find: 2\\frac{1}{3} + 1\\frac{1}{4}",
      options: ["3\\frac{1}{2}", "3\\frac{7}{12}", "4\\frac{1}{12}", "3\\frac{5}{12}"],
      correctAnswer: 1,
      explanation: "2\\frac{1}{3} = \\frac{7}{3}, 1\\frac{1}{4} = \\frac{5}{4}, sum = \\frac{28 + 15}{12} = \\frac{43}{12} = 3\\frac{7}{12}"
    },
    {
      id: "q7",
      question: "Convert 0.75 to fraction",
      options: ["\\frac{1}{4}", "\\frac{3}{4}", "\\frac{1}{2}", "\\frac{2}{3}"],
      correctAnswer: 1,
      explanation: "0.75 = \\frac{75}{100} = \\frac{3}{4}"
    },
    {
      id: "q8",
      question: "Convert 1\\frac{1}{2} to decimal",
      options: ["1.5", "1.05", "1.15", "1.25"],
      correctAnswer: 0,
      explanation: "1\\frac{1}{2} = 1.5"
    },
    {
      id: "q9",
      question: "Simplify: 2³ × 3²",
      options: ["18", "36", "72", "108"],
      correctAnswer: 2,
      explanation: "2³ = 8, 3² = 9, 8 × 9 = 72"
    },
    {
      id: "q10",
      question: "Calculate: 5⁴ ÷ 5²",
      options: ["5", "25", "125", "625"],
      correctAnswer: 1,
      explanation: "5⁴ ÷ 5² = 5^(4-2) = 5² = 25"
    },
    {
      id: "q11",
      question: "Simplify: √36 + √25",
      options: ["6", "11", "13", "15"],
      correctAnswer: 1,
      explanation: "√36 = 6, √25 = 5, 6 + 5 = 11"
    },
    {
      id: "q12",
      question: "Calculate: √(144 ÷ 9)",
      options: ["2", "3", "4", "6"],
      correctAnswer: 2,
      explanation: "144 ÷ 9 = 16, √16 = 4"
    },
    {
      id: "q13",
      question: "Simplify: √12",
      options: ["2", "2√3", "3√2", "4√3"],
      correctAnswer: 1,
      explanation: "√12 = √(4×3) = 2√3"
    },
    {
      id: "q14",
      question: "Rationalize: \\frac{1}{\\sqrt{2}}",
      options: ["\\frac{\\sqrt{2}}{2}", "\\frac{2}{\\sqrt{2}}", "\\frac{1}{2}", "\\frac{\\sqrt{2}}{4}"],
      correctAnswer: 0,
      explanation: "\\frac{1}{\\sqrt{2}} × \\frac{\\sqrt{2}}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}"
    },
    {
      id: "q15",
      question: "Simplify using indices: 2³ × 2⁴",
      options: ["2^7", "2^12", "2^1", "2^5"],
      correctAnswer: 0,
      explanation: "2³ × 2⁴ = 2^(3+4) = 2^7"
    },
    {
      id: "q16",
      question: "Apply indices law: (x²)³",
      options: ["x^5", "x^6", "x^8", "x^9"],
      correctAnswer: 1,
      explanation: "(x²)³ = x^(2×3) = x^6"
    },
    {
      id: "q17",
      question: "Round 3.14159 to 2 decimal places",
      options: ["3.14", "3.15", "3.1", "3.2"],
      correctAnswer: 0,
      explanation: "3.14159 to 2 decimal places: look at 3rd digit (1 < 5), so 3.14"
    },
    {
      id: "q18",
      question: "Estimate 47 + 52",
      options: ["90", "95", "99", "100"],
      correctAnswer: 3,
      explanation: "47 + 52 ≈ 50 + 50 = 100"
    },
    {
      id: "q19",
      question: "Expand: (x + 2)²",
      options: ["x² + 4", "x² + 2x + 4", "x² + 4x + 4", "x² + 4x + 2"],
      correctAnswer: 2,
      explanation: "(x + 2)² = x² + 2×x×2 + 2² = x² + 4x + 4"
    },
    {
      id: "q20",
      question: "Factor: x² - 4",
      options: ["(x - 2)(x + 2)", "(x - 4)(x + 1)", "(x - 2)(x - 2)", "(x + 2)(x + 2)"],
      correctAnswer: 0,
      explanation: "x² - 4 = (x - 2)(x + 2)"
    },
    {
      id: "q21",
      question: "Calculate: 98² using identity",
      options: ["9604", "9801", "10000", "9409"],
      correctAnswer: 0,
      explanation: "(100 - 2)² = 100² - 2×100×2 + 2² = 10000 - 400 + 4 = 9604"
    },
    {
      id: "q22",
      question: "Simplify: (-2) × (-3) × (-4)",
      options: ["-24", "24", "-12", "12"],
      correctAnswer: 0,
      explanation: "Three negative signs: odd number = negative result. (-2)×(-3)×(-4) = (+6)×(-4) = -24"
    },
    {
      id: "q23",
      question: "What is (-3)²?",
      options: ["-9", "9", "3", "-3"],
      correctAnswer: 1,
      explanation: "Any number squared is positive: (-3)² = 9"
    },
    {
      id: "q24",
      question: "Solve: -2x + 5 = -7",
      options: ["x = 6", "x = -6", "x = 1", "x = -1"],
      correctAnswer: 0,
      explanation: "-2x = -7 - 5 = -12, x = -12 ÷ (-2) = 6"
    },
    {
      id: "q25",
      question: "Simplify: 3√2 + 2√2",
      options: ["5√2", "6√2", "√2", "9√2"],
      correctAnswer: 0,
      explanation: "3√2 + 2√2 = (3 + 2)√2 = 5√2"
    }
  ]
};