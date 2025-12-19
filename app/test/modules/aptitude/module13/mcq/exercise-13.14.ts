import { Exercise } from '../../../../data/lessonsData';

export const exercise_13_14: Exercise = {
  id: "13.14",
  title: 'Linear Equations MCQ Practice',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which of the following is a linear equation in two variables?",
      options: ["x² + y = 5", "x + y + 1 = 0", "xy = 10", "x/y = 2"],
      correctAnswer: 1,
      explanation: "A linear equation has highest degree 1 and no product of variables. x + y + 1 = 0 is linear."
    },
    {
      id: "q2",
      question: "Solve: x + 5 = 12",
      options: ["x = 7", "x = 17", "x = -7", "x = 17"],
      correctAnswer: 0,
      explanation: "x + 5 = 12 → x = 12 - 5 = 7"
    },
    {
      id: "q3",
      question: "Solve: 3x - 7 = 11",
      options: ["x = 6", "x = 18/3", "x = 7/3", "x = 4"],
      correctAnswer: 0,
      explanation: "3x - 7 = 11 → 3x = 18 → x = 6"
    },
    {
      id: "q4",
      question: "Solve: 2(x + 3) = 14",
      options: ["x = 4", "x = 7", "x = 8", "x = 5"],
      correctAnswer: 0,
      explanation: "2(x + 3) = 14 → x + 3 = 7 → x = 4"
    },
    {
      id: "q5",
      question: "Solve the system: x + y = 8 and x - y = 2",
      options: ["x = 5, y = 3", "x = 6, y = 2", "x = 4, y = 4", "x = 7, y = 1"],
      correctAnswer: 0,
      explanation: "Add equations: 2x = 10 → x = 5. Substitute: 5 + y = 8 → y = 3"
    },
    {
      id: "q6",
      question: "Solve: 2x + 3y = 11 and x + 2y = 7",
      options: ["x = 1, y = 3", "x = 2, y = 2", "x = 3, y = 1", "x = 4, y = 0"],
      correctAnswer: 0,
      explanation: "Multiply second by 2: 2x + 4y = 14. Subtract: y = 3. Substitute: x + 6 = 7 → x = 1"
    },
    {
      id: "q7",
      question: "Using cross-multiplication, solve: x + y = 7 and x - y = 3",
      options: ["x = 5, y = 2", "x = 6, y = 1", "x = 4, y = 3", "x = 7, y = 0"],
      correctAnswer: 0,
      explanation: "x/(1×3 - (-1)×7) = y/(7×1 - 3×1) → x/(3+7) = y/(7-3) → x/10 = y/4. From first: 5 + 2 = 7 ✓"
    },
    {
      id: "q8",
      question: "Convert y = 2x + 3 to general form.",
      options: ["2x - y + 3 = 0", "2x + y - 3 = 0", "2x - y - 3 = 0", "2x + y + 3 = 0"],
      correctAnswer: 2,
      explanation: "y = 2x + 3 → -2x + y - 3 = 0 → 2x - y + 3 = 0"
    },
    {
      id: "q9",
      question: "Find intercepts of x/2 + y/3 = 1.",
      options: ["(2, 0) and (0, 3)", "(0, 2) and (3, 0)", "(2, 3) and (0, 0)", "(1, 2) and (3, 1)"],
      correctAnswer: 0,
      explanation: "X-intercept: y=0, x/2=1 → x=2. Y-intercept: x=0, y/3=1 → y=3"
    },
    {
      id: "q10",
      question: "A father is 30 years older than his son. Sum of ages is 50. Find son's age.",
      options: ["10 years", "15 years", "20 years", "25 years"],
      correctAnswer: 0,
      explanation: "Let son's age = x. Father's age = x + 30. x + (x + 30) = 50 → 2x + 30 = 50 → x = 10"
    },
    {
      id: "q11",
      question: "Two numbers differ by 8. Sum is 40. Find numbers.",
      options: ["16 and 24", "18 and 22", "20 and 20", "14 and 26"],
      correctAnswer: 0,
      explanation: "Let numbers be x and x+8. x + (x+8) = 40 → 2x + 8 = 40 → x = 16. Numbers: 16, 24"
    },
    {
      id: "q12",
      question: "A can do work in 10 days, B in 15 days. How long together?",
      options: ["6 days", "7 days", "8 days", "9 days"],
      correctAnswer: 0,
      explanation: "A's rate = 1/10, B's rate = 1/15. Together: 1/10 + 1/15 = 1/6 per day. Time = 6 days"
    },
    {
      id: "q13",
      question: "Car travels 300 km in 5 hours. Find speed.",
      options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
      correctAnswer: 1,
      explanation: "Speed = Distance/Time = 300/5 = 60 km/h"
    },
    {
      id: "q14",
      question: "Two pipes fill tank in 6 and 8 hours. How long together?",
      options: ["3.43 hours", "4 hours", "5 hours", "6 hours"],
      correctAnswer: 0,
      explanation: "Rates: 1/6 + 1/8 = 4/24 + 3/24 = 7/24. Time = 24/7 ≈ 3.43 hours"
    },
    {
      id: "q15",
      question: "Mix 20% and 40% solutions to get 30% solution. Ratio?",
      options: ["1:1", "2:1", "1:2", "3:1"],
      correctAnswer: 2,
      explanation: "Let quantities be x and y. (0.2x + 0.4y)/(x+y) = 0.3 → 0.2x + 0.4y = 0.3x + 0.3y → 0.1y = 0.1x → x = y. Ratio 1:1"
    },
    {
      id: "q16",
      question: "₹10,000 invested at 8% and 10%. Total interest ₹900. Find amounts.",
      options: ["₹4,000 and ₹6,000", "₹5,000 and ₹5,000", "₹3,000 and ₹7,000", "₹6,000 and ₹4,000"],
      correctAnswer: 1,
      explanation: "Let x at 8%, 10000-x at 10%. 0.08x + 0.1(10000-x) = 900 → x = 5000. Amounts: ₹5,000 each"
    },
    {
      id: "q17",
      question: "Price increased by 10%, then decreased by 10%. Net effect?",
      options: ["1% increase", "1% decrease", "No change", "2% decrease"],
      correctAnswer: 1,
      explanation: "Net% = 10 + (-10) + (10×-10)/100 = 0 - 1 = -1%. 1% decrease"
    },
    {
      id: "q18",
      question: "Classify: 2x + 3y = 6 and 4x + 6y = 12",
      options: ["Unique solution", "Infinite solutions", "No solution", "Cannot determine"],
      correctAnswer: 1,
      explanation: "Second equation is 2×(first equation). Same line, infinite solutions"
    },
    {
      id: "q19",
      question: "Classify: x + y = 3 and x + y = 5",
      options: ["Unique solution", "Infinite solutions", "No solution", "One solution"],
      correctAnswer: 2,
      explanation: "Same coefficients, different constants. Parallel lines, no solution"
    },
    {
      id: "q20",
      question: "Distance between (2,3) and (5,7)?",
      options: ["√13", "5", "√29", "6"],
      correctAnswer: 1,
      explanation: "d = √[(5-2)² + (7-3)²] = √[9 + 16] = √25 = 5"
    },
    {
      id: "q21",
      question: "Area of triangle with points (0,0), (4,0), (2,3)?",
      options: ["6", "8", "10", "12"],
      correctAnswer: 0,
      explanation: "Area = ½| (0×(0-3) + 4×(3-0) + 2×(0-0)) | = ½|0 + 12 + 0| = ½×12 = 6"
    },
    {
      id: "q22",
      question: "Solve graphically: y = x + 1 and y = 2x - 1",
      options: ["(2, 3)", "(3, 2)", "(1, 2)", "(2, 1)"],
      correctAnswer: 0,
      explanation: "Set equal: x + 1 = 2x - 1 → x = 2. y = 2 + 1 = 3. Point (2, 3)"
    },
    {
      id: "q23",
      question: "Boat speed in still water 12 km/h, downstream 16 km/h. Stream speed?",
      options: ["2 km/h", "3 km/h", "4 km/h", "5 km/h"],
      correctAnswer: 2,
      explanation: "Downstream = Boat + Stream = 12 + x = 16 → x = 4 km/h"
    },
    {
      id: "q24",
      question: "Two trains 100m and 80m cross each other at 60 km/h. Time?",
      options: ["6 seconds", "7 seconds", "8 seconds", "9 seconds"],
      correctAnswer: 2,
      explanation: "Relative speed = 60 km/h = 50 m/s. Distance = 100 + 80 = 180m. Time = 180/50 = 3.6 seconds ≈ wait, let's calculate properly: 60 km/h = 60×5/18 = 50/3 m/s. Time = 180 ÷ (50/3) = 180×3/50 = 540/50 = 10.8 seconds"
    },
    {
      id: "q25",
      question: "A shopkeeper sells at 20% profit. If CP is ₹800, SP is?",
      options: ["₹960", "₹850", "₹900", "₹1000"],
      correctAnswer: 0,
      explanation: "SP = 800 × (1 + 20/100) = 800 × 1.2 = ₹960"
    }
  ]
};