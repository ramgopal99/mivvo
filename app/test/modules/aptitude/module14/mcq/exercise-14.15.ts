import { Exercise } from '../../../../data/lessonsData';

export const exercise_14_15: Exercise = {
  id: "14.15",
  title: 'Quadratic Equations MCQ Practice',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which is a quadratic equation?",
      options: ["x + 5 = 0", "x² + 3x + 2 = 0", "x³ + x + 1 = 0", "1/x = 3"],
      correctAnswer: 1,
      explanation: "Quadratic equations have degree 2. x² + 3x + 2 = 0 is quadratic."
    },
    {
      id: "q2",
      question: "For x² - 5x + 6 = 0, sum of roots is:",
      options: ["5", "6", "-5", "11"],
      correctAnswer: 0,
      explanation: "Sum of roots = -b/a = -(-5)/1 = 5"
    },
    {
      id: "q3",
      question: "Solve x² - 7x + 12 = 0",
      options: ["(3,4)", "(4,3)", "(2,6)", "(1,12)"],
      correctAnswer: 0,
      explanation: "(x-3)(x-4)=0 → x=3 or x=4"
    },
    {
      id: "q4",
      question: "Discriminant of 2x² + 5x + 3 = 0 is:",
      options: ["1", "25", "13", "7"],
      correctAnswer: 0,
      explanation: "D = b² - 4ac = 25 - 4×2×3 = 25 - 24 = 1"
    },
    {
      id: "q5",
      question: "Nature of roots for x² + 4x + 5 = 0:",
      options: ["Real and distinct", "Real and equal", "Complex", "One real"],
      correctAnswer: 2,
      explanation: "D = 16 - 20 = -4 < 0 → Complex roots"
    },
    {
      id: "q6",
      question: "Solve by completing square: x² + 6x + 8 = 0",
      options: ["x = -2, -4", "x = 2, 4", "x = -2, 4", "x = 2, -4"],
      correctAnswer: 0,
      explanation: "x² + 6x + 8 = 0 → x² + 6x = -8 → (x+3)² - 9 = -8 → (x+3)² = 1 → x+3 = ±1 → x = -2, -4"
    },
    {
      id: "q7",
      question: "Quadratic formula for ax² + bx + c = 0 is:",
      options: ["x = [-b ± √(b² - 4ac)]/2a", "x = [b ± √(b² + 4ac)]/2a", "x = [-b ± √(b² - 4ac)]/a", "x = [b ± √(b² - 4ac)]/(2a)"],
      correctAnswer: 0,
      explanation: "Standard quadratic formula: x = [-b ± √(b² - 4ac)]/(2a)"
    },
    {
      id: "q8",
      question: "Roots of x² - 4x + 4 = 0 are:",
      options: ["2, 2", "4, 0", "-2, 2", "2, 0"],
      correctAnswer: 0,
      explanation: "(x-2)² = 0 → x = 2 (repeated)"
    },
    {
      id: "q9",
      question: "Convert y = x² - 4x + 3 to vertex form:",
      options: ["y = (x-2)² - 1", "y = (x-2)² + 1", "y = (x+2)² - 1", "y = (x+2)² + 1"],
      correctAnswer: 0,
      explanation: "Complete square: x² - 4x = (x-2)² - 4, so y = (x-2)² - 4 + 3 = (x-2)² - 1"
    },
    {
      id: "q10",
      question: "Rectangle area 120 m², length 2m more than width. Width is:",
      options: ["10m", "12m", "8m", "15m"],
      correctAnswer: 1,
      explanation: "Let width x, length x+2. x(x+2)=120 → x² + 2x - 120 = 0 → (x+12)(x-10)=0 → x=10 (reject negative)"
    },
    {
      id: "q11",
      question: "Numbers sum 15, product 50. Numbers are:",
      options: ["5, 10", "6, 9", "7, 8", "4, 11"],
      correctAnswer: 0,
      explanation: "x + y = 15, xy = 50. x² - 15x + 50 = 0 → (x-5)(x-10)=0 → 5, 10"
    },
    {
      id: "q12",
      question: "A completes work in 12 days, B in 18 days. Together:",
      options: ["7.2 days", "8 days", "6 days", "9 days"],
      correctAnswer: 0,
      explanation: "Rates: 1/12 + 1/18 = 1/7.2 per day → Time = 7.2 days"
    },
    {
      id: "q13",
      question: "Train covers 300km at x km/h. Speed +10 km/h, time -1 hour. x = ?",
      options: ["50", "60", "40", "30"],
      correctAnswer: 1,
      explanation: "Time difference: 300/x - 300/(x+10) = 1 → x=60"
    },
    {
      id: "q14",
      question: "Mix 20% and 30% solutions to get 25%. Ratio:",
      options: ["1:1", "2:1", "1:2", "3:2"],
      correctAnswer: 0,
      explanation: "(20x + 30y)/(x+y) = 25 → 20x + 30y = 25x + 25y → 5y = 5x → x=y → 1:1"
    },
    {
      id: "q15",
      question: "₹10,000 at 8% and 10% gives ₹900 interest. Amounts:",
      options: ["₹4,000 & ₹6,000", "₹5,000 & ₹5,000", "₹3,000 & ₹7,000", "₹6,000 & ₹4,000"],
      correctAnswer: 1,
      explanation: "Let x at 8%. 0.08x + 0.1(10000-x) = 900 → x = 5000"
    },
    {
      id: "q16",
      question: "Equation with roots 3, -2:",
      options: ["x² - x - 6 = 0", "x² + x - 6 = 0", "x² - x + 6 = 0", "x² + x + 6 = 0"],
      correctAnswer: 0,
      explanation: "x² - (3-2)x + (3×-2) = 0 → x² - x - 6 = 0"
    },
    {
      id: "q17",
      question: "Vertex of y = x² - 6x + 5:",
      options: ["(3, -4)", "(3, 4)", "(-3, 4)", "(6, 5)"],
      correctAnswer: 0,
      explanation: "h = -b/(2a) = 6/2 = 3, k = -D/(4a) = -(36-20)/(4) = -16/4 = -4"
    },
    {
      id: "q18",
      question: "Solve (x-1)(x+2) = 8:",
      options: ["x = 3, -5", "x = -3, 5", "x = 4, -3", "x = -4, 3"],
      correctAnswer: 0,
      explanation: "x² + x - 2 = 8 → x² + x - 10 = 0 → (x+5)(x-2)=0 → x = -5, 2. Wait, (x-1)(x+2) = x² + x - 2 = 8 → x² + x - 10 = 0 → (x+5)(x-2)=0 → x = -5, 2"
    },
    {
      id: "q19",
      question: "Three consecutive integers sum 36. Middle number:",
      options: ["11", "12", "13", "10"],
      correctAnswer: 1,
      explanation: "Let middle x. x-1 + x + x+1 = 36 → 3x = 36 → x = 12"
    },
    {
      id: "q20",
      question: "Difference of squares x² - 16 factors as:",
      options: ["(x-4)(x+4)", "(x-2)(x+8)", "(x-8)(x+2)", "(x-4)(x-4)"],
      correctAnswer: 0,
      explanation: "a² - b² = (a-b)(a+b) → (x-4)(x+4)"
    },
    {
      id: "q21",
      question: "Maximum/minimum of x² + 4x + 5 occurs at:",
      options: ["x = -2", "x = 2", "x = 0", "x = -4"],
      correctAnswer: 0,
      explanation: "Vertex at x = -b/(2a) = -4/(2×1) = -2"
    },
    {
      id: "q22",
      question: "Boat 10 km/h in still water, 12 km/h downstream. Stream speed:",
      options: ["1 km/h", "2 km/h", "3 km/h", "4 km/h"],
      correctAnswer: 1,
      explanation: "10 + s = 12 → s = 2 km/h"
    },
    {
      id: "q23",
      question: "Perfect square trinomial x² + 6x + 9 =",
      options: ["(x+3)²", "(x-3)²", "(x+9)²", "(x-9)²"],
      correctAnswer: 0,
      explanation: "x² + 2×x×3 + 3² = (x+3)²"
    },
    {
      id: "q24",
      question: "Roots of x² + x - 12 = 0 are:",
      options: ["3, -4", "-3, 4", "4, -3", "-4, 3"],
      correctAnswer: 0,
      explanation: "(x+4)(x-3)=0 → x = -4, 3"
    },
    {
      id: "q25",
      question: "For equation with roots α, β, α² + β² =",
      options: ["(α+β)²", "(α+β)² - 2αβ", "(αβ)²", "(α+β)² + 2αβ"],
      correctAnswer: 1,
      explanation: "α² + β² = (α+β)² - 2αβ"
    }
  ]
};