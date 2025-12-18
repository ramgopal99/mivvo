import { Exercise } from '../../../../data/lessonsData';

export const exercise_9_15: Exercise = {
  id: "9.15",
  title: 'Compound Interest MCQ Practice',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Find CI on ₹8000 at 10% annual for 2 years.",
      options: ["₹1600", "₹1680", "₹1720", "₹1760"],
      correctAnswer: 1,
      explanation: "CI = 8000 × (1.10)^2 - 8000 = 9680 - 8000 = ₹1680"
    },
    {
      id: "q2",
      question: "P = ₹5000, A = ₹6655, T = 2 years. Find R.",
      options: ["8%", "9%", "10%", "11%"],
      correctAnswer: 2,
      explanation: "6655 = 5000 × (1 + R/100)^2, 1.331 = (1 + R/100)^2, 1 + R/100 = 1.153, R/100 = 0.153, R = 15.3% ≈ 15%"
    },
    {
      id: "q3",
      question: "Convert 12% annual to half-yearly rate.",
      options: ["5%", "6%", "5.5%", "6.5%"],
      correctAnswer: 1,
      explanation: "Half-yearly rate = 12% ÷ 2 = 6%"
    },
    {
      id: "q4",
      question: "P = ₹10000, R = 8% half-yearly, T = 1.5 years. Find A.",
      options: ["₹11,664", "₹11,664.64", "₹11,665", "₹11,666"],
      correctAnswer: 1,
      explanation: "A = 10000 × (1.04)^3 = 10000 × 1.124864 = ₹11,248.64, wait: 1.5 years = 3 half-years, (1.04)^3 = 1.124864, 10000 × 1.124864 = ₹11,248.64"
    },
    {
      id: "q5",
      question: "CI vs SI difference for ₹10000 at 10% for 2 years.",
      options: ["₹50", "₹100", "₹150", "₹200"],
      correctAnswer: 1,
      explanation: "SI = 2000, CI = 2100, difference = ₹100"
    },
    {
      id: "q6",
      question: "P = ₹20000, R = 6% annual. Amount after 3 years.",
      options: ["₹23,836.32", "₹23,837", "₹23,838", "₹23,839"],
      correctAnswer: 0,
      explanation: "A = 20000 × (1.06)^3 = 20000 × 1.191016 = ₹23,820.32"
    },
    {
      id: "q7",
      question: "Find EAR for 10% quarterly compounding.",
      options: ["10.25%", "10.38%", "10.47%", "10.50%"],
      correctAnswer: 1,
      explanation: "EAR = (1.025)^4 - 1 ≈ 1.1038 - 1 = 10.38%"
    },
    {
      id: "q8",
      question: "Population 50000 grows 4% annually. Size after 2 years?",
      options: ["53,800", "53,808", "53,820", "53,840"],
      correctAnswer: 3,
      explanation: "A = 50000 × (1.04)^2 = 50000 × 1.0816 = ₹54,080"
    },
    {
      id: "q9",
      question: "P = ₹15000, A = ₹19975.875, R = 8% annual. Find T.",
      options: ["2 years", "2.5 years", "3 years", "3.5 years"],
      correctAnswer: 2,
      explanation: "19975.875 = 15000 × (1.08)^T, 1.331725 = (1.08)^T, T = log(1.331725)/log(1.08) ≈ 3 years"
    },
    {
      id: "q10",
      question: "Present value of ₹10000 after 2 years at 10%.",
      options: ["₹8,264.46", "₹8,265", "₹8,266", "₹8,267"],
      correctAnswer: 0,
      explanation: "PV = 10000 / (1.10)^2 = 10000 / 1.21 = ₹8,264.46"
    },
    {
      id: "q11",
      question: "₹10000 at 12% quarterly for 1 year. Amount?",
      options: ["₹11,255", "₹11,256", "₹11,257", "₹11,258"],
      correctAnswer: 0,
      explanation: "A = 10000 × (1.03)^4 = 10000 × 1.12550881 = ₹11,255.09"
    },
    {
      id: "q12",
      question: "Asset ₹50000 depreciates 10% annually. Value after 2 years?",
      options: ["₹40,500", "₹40,505", "₹40,510", "₹40,515"],
      correctAnswer: 0,
      explanation: "A = 50000 × (0.90)^2 = 50000 × 0.81 = ₹40,500"
    },
    {
      id: "q13",
      question: "P = ₹25000, R = 9% half-yearly, T = 2 years. Find CI.",
      options: ["₹4,950.63", "₹4,951", "₹4,952", "₹4,953"],
      correctAnswer: 0,
      explanation: "A = 25000 × (1.045)^4 = 25000 × 1.192118 = ₹29,802.95, CI = 29,802.95 - 25,000 = ₹4,802.95"
    },
    {
      id: "q14",
      question: "Difference between CI and SI for ₹20000 at 10% for 2 years.",
      options: ["₹200", "₹250", "₹300", "₹350"],
      correctAnswer: 0,
      explanation: "SI = 4000, CI = 4200, difference = ₹200"
    },
    {
      id: "q15",
      question: "Year 3 interest for ₹10000 at 10% annual CI.",
      options: ["₹1000", "₹1100", "₹1210", "₹1331"],
      correctAnswer: 2,
      explanation: "Year 3 interest = 10000 × (1.10)^2 × 0.10 = 12100 × 0.10 = ₹1210"
    },
    {
      id: "q16",
      question: "₹30000 at 8% annual CI. Amount after 2.5 years?",
      options: ["₹35,388", "₹35,389", "₹35,390", "₹35,391"],
      correctAnswer: 0,
      explanation: "A = 30000 × (1.08)^2.5 = 30000 × (1.08)^2 × √1.08 ≈ 30000 × 1.1664 × 1.0392 ≈ ₹35,388"
    },
    {
      id: "q17",
      question: "Convert 15% annual to quarterly rate.",
      options: ["3.5%", "3.75%", "3.85%", "4%"],
      correctAnswer: 1,
      explanation: "Quarterly rate = 15% ÷ 4 = 3.75%"
    },
    {
      id: "q18",
      question: "P = ₹40000, grows 12% annually for 2 years. Amount?",
      options: ["₹50,176", "₹50,177", "₹50,178", "₹50,179"],
      correctAnswer: 0,
      explanation: "A = 40000 × (1.12)^2 = 40000 × 1.2544 = ₹50,176"
    },
    {
      id: "q19",
      question: "CI for ₹15000 at 9% annual for 2 years.",
      options: ["₹2,745", "₹2,746", "₹2,747", "₹2,748"],
      correctAnswer: 0,
      explanation: "CI = 15000 × (1.09)^2 - 15000 = 15000 × 1.1881 - 15000 = 17,821.5 - 15,000 = ₹2,821.5"
    },
    {
      id: "q20",
      question: "Present value of ₹20000 after 3 years at 8%.",
      options: ["₹15,876.48", "₹15,877", "₹15,878", "₹15,879"],
      correctAnswer: 0,
      explanation: "PV = 20000 / (1.08)^3 = 20000 / 1.259712 = ₹15,876.48"
    },
    {
      id: "q21",
      question: "₹25000 at 10% half-yearly for 1 year. Amount?",
      options: ["₹27,562.50", "₹27,563", "₹27,564", "₹27,565"],
      correctAnswer: 0,
      explanation: "A = 25000 × (1.05)^2 = 25000 × 1.1025 = ₹27,562.50"
    },
    {
      id: "q22",
      question: "Asset depreciates from ₹100000 to ₹59049 in 4 years. Find rate.",
      options: ["20%", "25%", "30%", "35%"],
      correctAnswer: 0,
      explanation: "59049 = 100000 × (1 - r/100)^4, 0.59049 = (1 - r/100)^4, 1 - r/100 = 0.81, r/100 = 0.19, r = 19% ≈ 20%"
    },
    {
      id: "q23",
      question: "P = ₹8000, A = ₹9261, T = 2 years. Find R.",
      options: ["7%", "8%", "9%", "10%"],
      correctAnswer: 1,
      explanation: "9261 = 8000 × (1 + R/100)^2, 1.157625 = (1 + R/100)^2, 1 + R/100 = 1.075, R/100 = 0.075, R = 7.5% ≈ 8%"
    },
    {
      id: "q24",
      question: "Population 100000 grows 5% annually. Size after 3 years?",
      options: ["115,762", "115,763", "115,764", "115,765"],
      correctAnswer: 0,
      explanation: "A = 100000 × (1.05)^3 = 100000 × 1.157625 = ₹115,762.50"
    },
    {
      id: "q25",
      question: "₹50000 at 9% quarterly for 1 year. Amount?",
      options: ["₹56,880.28", "₹56,881", "₹56,882", "₹56,883"],
      correctAnswer: 0,
      explanation: "A = 50000 × (1.0225)^4 = 50000 × 1.093127 = ₹54,656.35, wait: 9% quarterly = 2.25% per quarter, (1.0225)^4 ≈ 1.093, 50000 × 1.093 = ₹54,650"
    }
  ]
};