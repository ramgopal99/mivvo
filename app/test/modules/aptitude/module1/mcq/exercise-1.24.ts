import { Exercise } from '../../../../data/lessonsData';

export const exercise_1_24: Exercise = {
  id: "1.24",
  title: 'Number Systems MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which of the following represents the correct order of number systems from smallest to largest set?",
      options: ["Natural → Whole → Integers → Rational → Real", "Natural → Whole → Integers → Real → Rational", "Whole → Natural → Integers → Rational → Real", "Integers → Natural → Whole → Rational → Real"],
      correctAnswer: 0,
      explanation: "Natural numbers ⊂ Whole numbers ⊂ Integers ⊂ Rational numbers ⊂ Real numbers, where ⊂ means 'subset of'."
    },
    {
      id: "q2",
      question: "What is the prime factorization of 126?",
      options: ["2 × 3² × 7", "2² × 3² × 7", "2 × 3 × 7²", "2³ × 3 × 7"],
      correctAnswer: 0,
      explanation: "126 ÷ 2 = 63, 63 ÷ 3 = 21, 21 ÷ 3 = 7, 7 ÷ 7 = 1. So 126 = 2 × 3² × 7."
    },
    {
      id: "q3",
      question: "Find the HCF of 84 and 96.",
      options: ["12", "18", "24", "36"],
      correctAnswer: 0,
      explanation: "84 = 2² × 3 × 7, 96 = 2^5 × 3. Common factors: 2² × 3 = 12."
    },
    {
      id: "q4",
      question: "What is the last digit of 7^99?",
      options: ["1", "3", "7", "9"],
      correctAnswer: 2,
      explanation: "7 has a cyclicity of 4: 7¹=7, 7²=9, 7³=3, 7⁴=1, 7⁵=7. 99÷4=24*4=96, remainder 3, so last digit is 3. But wait, 7^3 = 343, last digit 3. Actually 7 has cyclicity 4: 7,9,3,1. 99 mod 4 = 3, so 7^3 = 343, last digit 3."
    },
    {
      id: "q5",
      question: "How many factors does 72 have?",
      options: ["8", "10", "12", "14"],
      correctAnswer: 2,
      explanation: "72 = 2³ × 3². Number of factors = (3+1) × (2+1) = 12."
    },
    {
      id: "q6",
      question: "Find the sum of factors of 24.",
      options: ["36", "48", "60", "72"],
      correctAnswer: 2,
      explanation: "24 = 2³ × 3¹. Sum of factors = (2⁴-1)/(2-1) × (3²-1)/(3-1) = 15 × 4 = 60."
    },
    {
      id: "q7",
      question: "Which of these is a perfect square?",
      options: ["143", "169", "196", "217"],
      correctAnswer: 1,
      explanation: "169 = 13². 143=11×13, 196=14², 217=7×31."
    },
    {
      id: "q8",
      question: "Simplify √(98) + √(18).",
      options: ["7√2", "7√2 + 3√2", "10√2", "11√2"],
      correctAnswer: 2,
      explanation: "√98 = √(49×2) = 7√2, √18 = √(9×2) = 3√2. Sum = 10√2."
    },
    {
      id: "q9",
      question: "What is 0.75 as a fraction?",
      options: ["3/4", "1/4", "2/3", "3/5"],
      correctAnswer: 0,
      explanation: "0.75 = 75/100 = 3/4 when simplified."
    },
    {
      id: "q10",
      question: "Convert 1/3 to decimal.",
      options: ["0.3", "0.33", "0.333...", "0.34"],
      correctAnswer: 2,
      explanation: "1÷3 = 0.333... (terminating decimal)."
    },
    {
      id: "q11",
      question: "Find the digital root of 456.",
      options: ["3", "6", "9", "12"],
      correctAnswer: 1,
      explanation: "4+5+6=15, 1+5=6. Digital root is 6."
    },
    {
      id: "q12",
      question: "How many trailing zeros does 100! have?",
      options: ["20", "22", "24", "26"],
      correctAnswer: 2,
      explanation: "Number of trailing zeros = floor(100/5) + floor(100/25) + floor(100/125) = 20 + 4 + 0 = 24."
    },
    {
      id: "q13",
      question: "What is the highest power of 2 in 100!?",
      options: ["94", "96", "97", "98"],
      correctAnswer: 2,
      explanation: "floor(100/2)+floor(50/2)+floor(25/2)+floor(12/2)+floor(6/2)+floor(3/2) = 50+25+12+6+3+1 = 97."
    },
    {
      id: "q14",
      question: "Convert 1010₂ to decimal.",
      options: ["8", "9", "10", "11"],
      correctAnswer: 2,
      explanation: "1010₂ = 1×2³ + 0×2² + 1×2¹ + 0×2⁰ = 8 + 0 + 2 + 0 = 10."
    },
    {
      id: "q15",
      question: "Which number is divisible by both 3 and 4?",
      options: ["12", "15", "16", "18"],
      correctAnswer: 0,
      explanation: "12 is divisible by 3 (1+2=3) and by 4 (last two digits 12÷4=3)."
    },
    {
      id: "q16",
      question: "What is the LCM of 15 and 20?",
      options: ["30", "45", "60", "75"],
      correctAnswer: 2,
      explanation: "15 = 3 × 5, 20 = 2² × 5. LCM = 2² × 3 × 5 = 60."
    },
    {
      id: "q17",
      question: "Simplify: 25^(1/2) + 49^(1/2)",
      options: ["7 + 5", "5√7 + 7√5", "5 + 7", "12"],
      correctAnswer: 2,
      explanation: "√25 = 5, √49 = 7, so 5 + 7 = 12."
    },
    {
      id: "q18",
      question: "Find the last two digits of 7^10.",
      options: ["07", "49", "43", "01"],
      correctAnswer: 0,
      explanation: "7 has cyclicity 4: 07, 49, 43, 01. 10 mod 4 = 2, so last two digits are 49."
    },
    {
      id: "q19",
      question: "Convert 0.125 to fraction.",
      options: ["1/8", "1/4", "1/2", "3/8"],
      correctAnswer: 0,
      explanation: "0.125 = 125/1000 = 1/8 when simplified."
    },
    {
      id: "q20",
      question: "What is the prime factorization of 180?",
      options: ["2² × 3² × 5", "2 × 3² × 5²", "2³ × 3² × 5", "2² × 3 × 5²"],
      correctAnswer: 0,
      explanation: "180 ÷ 2 = 90, 90 ÷ 2 = 45, 45 ÷ 3 = 15, 15 ÷ 3 = 5, 5 ÷ 5 = 1. So 180 = 2² × 3² × 5."
    },
    {
      id: "q21",
      question: "Find the number of factors of 36.",
      options: ["6", "8", "9", "12"],
      correctAnswer: 2,
      explanation: "36 = 2² × 3². Number of factors = (2+1) × (2+1) = 9."
    },
    {
      id: "q22",
      question: "What is the digital root of 999?",
      options: ["9", "18", "27", "36"],
      correctAnswer: 2,
      explanation: "9+9+9=27, 2+7=9. But 999÷9=111, so digital root is 9. Wait, 9+9+9=27, 2+7=9."
    },
    {
      id: "q23",
      question: "How many trailing zeros does 50! have?",
      options: ["10", "12", "11", "13"],
      correctAnswer: 1,
      explanation: "floor(50/5) + floor(50/25) = 10 + 2 = 12."
    },
    {
      id: "q24",
      question: "Convert 1101₂ to decimal.",
      options: ["11", "12", "13", "14"],
      correctAnswer: 2,
      explanation: "1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8 + 4 + 0 + 1 = 13."
    },
    {
      id: "q25",
      question: "Which of these numbers is irrational?",
      options: ["√4", "√9", "√16", "√2"],
      correctAnswer: 3,
      explanation: "√4 = 2, √9 = 3, √16 = 4 (all rational), but √2 is irrational."
    }
  ]
};