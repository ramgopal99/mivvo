import { Exercise } from '../../../../data/lessonsData';

export const exercise_8_11: Exercise = {
  id: "8.11",
  title: 'Simple Interest MCQ Practice',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Find SI on ₹2000 at 5% for 3 years.",
      options: ["₹200", "₹300", "₹400", "₹500"],
      correctAnswer: 1,
      explanation: "SI = (2000 × 5 × 3) ÷ 100 = ₹300"
    },
    {
      id: "q2",
      question: "P = ₹1500, SI = ₹225, T = 3 years. Find R.",
      options: ["4%", "5%", "6%", "7%"],
      correctAnswer: 1,
      explanation: "R = (225 × 100) ÷ (1500 × 3) = 5%"
    },
    {
      id: "q3",
      question: "SI = ₹400, P = ₹2000, R = 10%. Find T.",
      options: ["1 year", "1.5 years", "2 years", "2.5 years"],
      correctAnswer: 2,
      explanation: "T = (400 × 100) ÷ (2000 × 10) = 2 years"
    },
    {
      id: "q4",
      question: "A = ₹1320, P = ₹1200, T = 2 years. Find R.",
      options: ["8%", "9%", "10%", "11%"],
      correctAnswer: 2,
      explanation: "R = [(1320-1200) × 100] ÷ (1200 × 2) = 10%"
    },
    {
      id: "q5",
      question: "Convert 12% yearly rate to monthly.",
      options: ["0.8%", "1%", "1.2%", "1.5%"],
      correctAnswer: 1,
      explanation: "Monthly rate = 12% ÷ 12 = 1%"
    },
    {
      id: "q6",
      question: "P = ₹3000, R = 8% yearly, T = 9 months. Find SI.",
      options: ["₹120", "₹150", "₹180", "₹200"],
      correctAnswer: 2,
      explanation: "T = 9/12 = 0.75 years, SI = (3000 × 8 × 0.75) ÷ 100 = ₹180"
    },
    {
      id: "q7",
      question: "P = ₹5000, first 2 years 6%, next 2 years 8%. Total SI?",
      options: ["₹800", "₹1000", "₹1200", "₹1400"],
      correctAnswer: 1,
      explanation: "SI₁ = (5000 × 6 × 2) ÷ 100 = ₹600, SI₂ = (5000 × 8 × 2) ÷ 100 = ₹800, Total = ₹1400"
    },
    {
      id: "q8",
      question: "Compare SI: ₹2000 at 8% for 3y vs ₹2000 at 10% for 2y.",
      options: ["First higher by ₹80", "Second higher by ₹80", "Equal", "First higher by ₹160"],
      correctAnswer: 0,
      explanation: "SI₁ = ₹480, SI₂ = ₹400, difference = ₹80"
    },
    {
      id: "q9",
      question: "A invests ₹10000 at 6% for 2y, ₹15000 at 8% for 3y. Total SI?",
      options: ["₹4200", "₹4800", "₹5200", "₹5600"],
      correctAnswer: 1,
      explanation: "SI₁ = (10000 × 6 × 2) ÷ 100 = ₹1200, SI₂ = (15000 × 8 × 3) ÷ 100 = ₹3600, Total = ₹4800"
    },
    {
      id: "q10",
      question: "P = ₹2500, A = ₹3000, T = 2 years. Find R.",
      options: ["8%", "10%", "12%", "15%"],
      correctAnswer: 1,
      explanation: "R = [(3000-2500) × 100] ÷ (2500 × 2) = 20% ÷ 5 = 10% wait, 200 × 100 ÷ 5000 = 20000 ÷ 5000 = 4%, wait no: (500 × 100) ÷ (2500 × 2) = 50000 ÷ 5000 = 10%"
    },
    {
      id: "q11",
      question: "SI = ₹360, R = 9%, T = 2 years. Find P.",
      options: ["₹1800", "₹2000", "₹2200", "₹2400"],
      correctAnswer: 1,
      explanation: "P = (360 × 100) ÷ (9 × 2) = ₹2000"
    },
    {
      id: "q12",
      question: "Monthly rate 0.75%. Find yearly rate.",
      options: ["6%", "7.5%", "9%", "10.5%"],
      correctAnswer: 2,
      explanation: "Yearly rate = 0.75% × 12 = 9%"
    },
    {
      id: "q13",
      question: "P = ₹4000, R = 7% yearly, T = 18 months. Find SI.",
      options: ["₹350", "₹420", "₹490", "₹560"],
      correctAnswer: 1,
      explanation: "T = 18/12 = 1.5 years, SI = (4000 × 7 × 1.5) ÷ 100 = ₹420"
    },
    {
      id: "q14",
      question: "P = ₹6000, first year 8%, second year 9%, third year 10%. Total SI?",
      options: ["₹1680", "₹1800", "₹1920", "₹2040"],
      correctAnswer: 1,
      explanation: "SI₁ = (6000 × 8 × 1) ÷ 100 = ₹480, SI₂ = (6000 × 9 × 1) ÷ 100 = ₹540, SI₃ = (6000 × 10 × 1) ÷ 100 = ₹600, Total = ₹1620"
    },
    {
      id: "q15",
      question: "Which gives more SI: ₹3000 at 9% for 2y or ₹4000 at 7% for 2y?",
      options: ["First", "Second", "Equal", "Cannot determine"],
      correctAnswer: 0,
      explanation: "SI₁ = (3000 × 9 × 2) ÷ 100 = ₹540, SI₂ = (4000 × 7 × 2) ÷ 100 = ₹560, Second higher"
    },
    {
      id: "q16",
      question: "A deposits ₹20000 at 7% for 3y, ₹15000 at 8% for 2y. Total SI?",
      options: ["₹5200", "₹5800", "₹6200", "₹6800"],
      correctAnswer: 1,
      explanation: "SI₁ = (20000 × 7 × 3) ÷ 100 = ₹4200, SI₂ = (15000 × 8 × 2) ÷ 100 = ₹2400, Total = ₹6600"
    },
    {
      id: "q17",
      question: "P = ₹8000, SI = ₹960, T = 1.5 years. Find R.",
      options: ["6%", "7%", "8%", "9%"],
      correctAnswer: 2,
      explanation: "R = (960 × 100) ÷ (8000 × 1.5) = 8%"
    },
    {
      id: "q18",
      question: "Convert 10% yearly to monthly rate.",
      options: ["0.8%", "0.83%", "0.9%", "1%"],
      correctAnswer: 1,
      explanation: "Monthly rate = 10% ÷ 12 ≈ 0.83%"
    },
    {
      id: "q19",
      question: "P = ₹5000, R = 6% yearly, T = 8 months. Find SI.",
      options: ["₹180", "₹200", "₹220", "₹240"],
      correctAnswer: 1,
      explanation: "T = 8/12 ≈ 0.667 years, SI = (5000 × 6 × 0.667) ÷ 100 ≈ ₹200"
    },
    {
      id: "q20",
      question: "P = ₹10000, different rates: first 2y at 7%, next 2y at 9%. Total SI?",
      options: ["₹1400", "₹1600", "₹1800", "₹2000"],
      correctAnswer: 1,
      explanation: "SI₁ = (10000 × 7 × 2) ÷ 100 = ₹1400, SI₂ = (10000 × 9 × 2) ÷ 100 = ₹1800, Total = ₹3200"
    },
    {
      id: "q21",
      question: "Compare SI: ₹2500 at 8% for 3y vs ₹2500 at 6% for 4y.",
      options: ["First higher by ₹50", "Second higher by ₹50", "Equal", "First higher by ₹100"],
      correctAnswer: 1,
      explanation: "SI₁ = (2500 × 8 × 3) ÷ 100 = ₹600, SI₂ = (2500 × 6 × 4) ÷ 100 = ₹600, Equal"
    },
    {
      id: "q22",
      question: "A lends ₹12000 at 9% for 2y, ₹18000 at 7% for 3y. Total SI?",
      options: ["₹3780", "₹4200", "₹4620", "₹5040"],
      correctAnswer: 2,
      explanation: "SI₁ = (12000 × 9 × 2) ÷ 100 = ₹2160, SI₂ = (18000 × 7 × 3) ÷ 100 = ₹3780, Total = ₹5940"
    },
    {
      id: "q23",
      question: "SI = ₹720, R = 9%, T = 2 years. Find P.",
      options: ["₹3600", "₹4000", "₹4400", "₹4800"],
      correctAnswer: 1,
      explanation: "P = (720 × 100) ÷ (9 × 2) = ₹4000"
    },
    {
      id: "q24",
      question: "Monthly rate 1.2%. Find yearly equivalent.",
      options: ["12%", "14%", "14.4%", "15%"],
      correctAnswer: 2,
      explanation: "Yearly rate = 1.2% × 12 = 14.4%"
    },
    {
      id: "q25",
      question: "P = ₹15000, first 1y at 8%, second 1y at 10%, third 1y at 12%. Total SI?",
      options: ["₹3150", "₹3450", "₹3750", "₹4050"],
      correctAnswer: 1,
      explanation: "SI₁ = (15000 × 8 × 1) ÷ 100 = ₹1200, SI₂ = (15000 × 10 × 1) ÷ 100 = ₹1500, SI₃ = (15000 × 12 × 1) ÷ 100 = ₹1800, Total = ₹4500"
    }
  ]
};

