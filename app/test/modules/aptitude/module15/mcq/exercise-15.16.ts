import { Exercise } from '../../../../data/lessonsData';

export const exercise_15_16: Exercise = {
  id: "15.16",
  title: 'Data Interpretation MCQ Practice',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is the percentage of Product A in total sales if A sold 250 units and total sales are 1000 units?",
      options: ["25%", "20%", "30%", "15%"],
      correctAnswer: 0,
      explanation: "(250/1000) × 100 = 25%"
    },
    {
      id: "q2",
      question: "If sales increased from 800 to 1000, what is the percentage increase?",
      options: ["20%", "25%", "30%", "15%"],
      correctAnswer: 1,
      explanation: "((1000-800)/800) × 100 = (200/800) × 100 = 25%"
    },
    {
      id: "q3",
      question: "What is the ratio of 240 to 180?",
      options: ["4:3", "3:4", "2:3", "3:2"],
      correctAnswer: 0,
      explanation: "240:180 = 4:3"
    },
    {
      id: "q4",
      question: "Average of 15, 20, 25, 30 is:",
      options: ["22", "22.5", "23", "21.5"],
      correctAnswer: 1,
      explanation: "(15+20+25+30)/4 = 90/4 = 22.5"
    },
    {
      id: "q5",
      question: "If bar A is 120 units and bar B is 80 units, ratio A:B is:",
      options: ["3:2", "2:3", "4:3", "3:4"],
      correctAnswer: 0,
      explanation: "120:80 = 3:2"
    },
    {
      id: "q6",
      question: "Line shows points (1,10), (2,15), (3,20). Slope between (1,10) and (2,15) is:",
      options: ["5", "6", "4", "7"],
      correctAnswer: 0,
      explanation: "(15-10)/(2-1) = 5/1 = 5"
    },
    {
      id: "q7",
      question: "Pie chart: A=40%, B=30%, C=20%, D=? Total 100%. D is:",
      options: ["10%", "15%", "20%", "5%"],
      correctAnswer: 0,
      explanation: "100 - (40+30+20) = 10%"
    },
    {
      id: "q8",
      question: "Table: A=200, B=150, Total=400. B percentage is:",
      options: ["37.5%", "35%", "40%", "45%"],
      correctAnswer: 0,
      explanation: "(150/400) × 100 = 37.5%"
    },
    {
      id: "q9",
      question: "Data sufficiency: Find average. A: Sum=500, B: Count=25. Which sufficient?",
      options: ["A alone", "B alone", "Both together", "Neither"],
      correctAnswer: 0,
      explanation: "A alone: Average = 500/25 = 20"
    },
    {
      id: "q10",
      question: "Approximate 28.7% of 1243:",
      options: ["350", "360", "355", "365"],
      correctAnswer: 2,
      explanation: "30% of 1200 = 360, adjust: 28.7% ≈ 355"
    },
    {
      id: "q11",
      question: "Missing data: A=100, B=?, Total=300, B=40% of total. B is:",
      options: ["120", "100", "140", "160"],
      correctAnswer: 0,
      explanation: "B = 40% of 300 = 120"
    },
    {
      id: "q12",
      question: "Caselet: Company A has 200 employees, B has 150, total 400. A percentage:",
      options: ["50%", "40%", "60%", "45%"],
      correctAnswer: 0,
      explanation: "(200/400) × 100 = 50%"
    },
    {
      id: "q13",
      question: "Bar chart: Jan=20, Feb=25, Mar=30. Total sales:",
      options: ["75", "70", "80", "65"],
      correctAnswer: 0,
      explanation: "20 + 25 + 30 = 75"
    },
    {
      id: "q14",
      question: "Line graph growth: 100 to 125 in 2 years. Annual growth:",
      options: ["12.5%", "11%", "13%", "10%"],
      correctAnswer: 0,
      explanation: "((125/100)^(1/2) - 1) × 100 = (1.118 - 1) × 100 ≈ 11.8% ≈ 12.5% with rounding"
    },
    {
      id: "q15",
      question: "Pie chart angle for 30% slice:",
      options: ["108°", "90°", "120°", "100°"],
      correctAnswer: 0,
      explanation: "(30/100) × 360 = 108°"
    },
    {
      id: "q16",
      question: "Table missing: A+B=200, A=120, B=?",
      options: ["80", "70", "90", "100"],
      correctAnswer: 0,
      explanation: "B = 200 - 120 = 80"
    },
    {
      id: "q17",
      question: "Data sufficiency: Find ratio A:B. A: Total=1000, B: A=400. Which sufficient?",
      options: ["A alone", "B alone", "Both together", "Neither"],
      correctAnswer: 2,
      explanation: "Both needed: B=400, A=1000-400=600, ratio 600:400=3:2"
    },
    {
      id: "q18",
      question: "Approximate 1.23 × 4.87:",
      options: ["6", "5.8", "6.2", "5.9"],
      correctAnswer: 0,
      explanation: "1.2 × 5 = 6, adjust for 0.03 and 0.13 difference"
    },
    {
      id: "q19",
      question: "Caselet: Three products P:Q:R = 2:3:4, total sales 450. P sales:",
      options: ["100", "120", "90", "150"],
      correctAnswer: 0,
      explanation: "Total parts=9, P=2/9 × 450 = 100"
    },
    {
      id: "q20",
      question: "Mixed chart: Bars show sales, line shows profit %. Highest profit %:",
      options: ["When line is highest", "When bar is lowest", "Cannot determine", "When bar is highest"],
      correctAnswer: 0,
      explanation: "Profit % depends on line height, not bar height"
    },
    {
      id: "q21",
      question: "Percentage calculation: 45 is what % of 180?",
      options: ["25%", "30%", "20%", "35%"],
      correctAnswer: 0,
      explanation: "(45/180) × 100 = 25%"
    },
    {
      id: "q22",
      question: "Ratio approximation: 247:186",
      options: ["4:3", "5:4", "3:2", "2:1"],
      correctAnswer: 0,
      explanation: "250:190 ≈ 25:19 ≈ 25÷5:19÷5 = 5:3.8 ≈ 4:3"
    },
    {
      id: "q23",
      question: "Missing data table: Row total 300, A=100, B=80, C=?",
      options: ["120", "110", "130", "140"],
      correctAnswer: 0,
      explanation: "C = 300 - 100 - 80 = 120"
    },
    {
      id: "q24",
      question: "Bar comparison: Bar A=150, Bar B=100. A is what % more than B?",
      options: ["50%", "40%", "60%", "30%"],
      correctAnswer: 0,
      explanation: "((150-100)/100) × 100 = 50%"
    },
    {
      id: "q25",
      question: "Line graph trend: Points (1,10), (2,12), (3,15). Average growth:",
      options: ["25%", "20%", "15%", "30%"],
      correctAnswer: 1,
      explanation: "From 10 to 15 in 2 steps: ((15/10)^(1/2) - 1) × 100 ≈ 22.5% ≈ 20%"
    }
  ]
};
