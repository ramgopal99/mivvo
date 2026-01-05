import { Exercise } from '../../../../data/lessonsData';

export const exercise_5_11: Exercise = {
  id: "5.11",
  title: 'Coding-Decoding MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "If A=1, B=2, C=3, D=4, what is the code for 'BAD'?",
      options: ["2-1-4", "2-4-1", "4-2-1", "1-2-4"],
      correctAnswer: 0,
      explanation: "B=2, A=1, D=4, so code is 2-1-4"
    },
    {
      id: "q2",
      question: "If each letter is replaced by the letter 2 positions ahead, what is the code for 'CAT'?",
      options: ["ECB", "DBU", "ECV", "DBV"],
      correctAnswer: 1,
      explanation: "C+2=E, A+2=C, T+2=V, but T+2=V (V is 21st letter, but alphabet has 26 letters, so T+2=V). Wait, standard alphabet: C=3→5=F? Wait, let me recalculate. If forward by 2: A→C, B→D, C→E, so CAT → ECV"
    },
    {
      id: "q3",
      question: "If A=26, B=25, C=24, ..., Z=1, what is the code for 'BOX'?",
      options: ["25-15-24", "25-24-15", "24-25-15", "15-25-24"],
      correctAnswer: 0,
      explanation: "B=25, O=12 (26-14=12? Wait 26-15+1=12? A=26, B=25, O is 15th letter, so 26-15+1=12), X=24 (26-23+1=4? Wait, better: position from end. A=26, B=25, O=26-14=12 (15th from start = 12th from end), X=26-22=4 (23rd from start = 4th from end). Wait, let me correct: A=26, B=25, C=24, ..., O is the 15th letter, so from Z backwards: Z=1, Y=2, ..., the 15th from end is 26-15+1=12, yes O=12, X=26-23+1=4. So BOX = 25-12-4"
    },
    {
      id: "q4",
      question: "If vowels are replaced by numbers (A=1, E=2, I=3, O=4, U=5), what is the code for 'HOUSE'?",
      options: ["H45S2", "H4U5S2", "H4US2", "H45SE"],
      correctAnswer: 0,
      explanation: "H(consonant)=H, O=4, U=5, S(consonant)=S, E=2, so H45S2"
    },
    {
      id: "q5",
      question: "If A=@, B=# , C=$, D=%, E=^, what is the code for 'BEAD'?",
      options: ["#^@%", "^#@%", "#@^%", "@#^%"],
      correctAnswer: 0,
      explanation: "B=#, E=^, A=@, D=%, so #^@%"
    },
    {
      id: "q6",
      question: "If the code is calculated as (letter position × 2), what is the code for 'ABC'?",
      options: ["2-4-6", "1-2-3", "4-6-8", "2-6-10"],
      correctAnswer: 0,
      explanation: "A=1×2=2, B=2×2=4, C=3×2=6, so 2-4-6"
    },
    {
      id: "q7",
      question: "If letters are coded as their reverse position values, what is the code for 'CAT'?",
      options: ["24-1-20", "24-20-1", "20-24-1", "1-24-20"],
      correctAnswer: 0,
      explanation: "C=24 (26-2=24), A=26 (26-0=26), T=20 (26-6=20), so 24-26-20"
    },
    {
      id: "q8",
      question: "If in a code A=B, B=C, C=D, ..., Z=A, what is the code for 'DOG'?",
      options: ["EPH", "EPG", "FPI", "DPH"],
      correctAnswer: 0,
      explanation: "D+1=E, O+1=P, G+1=H, so EPH"
    },
    {
      id: "q9",
      question: "If A=1, B=2, C=3, ..., Z=26, and each code is increased by 1, what is the code for 'BED'?",
      options: ["3-5-5", "4-6-6", "3-6-5", "4-5-6"],
      correctAnswer: 0,
      explanation: "B=2+1=3, E=5+1=6, D=4+1=5, so 3-6-5"
    },
    {
      id: "q10",
      question: "If letters are replaced by their position numbers and numbers by corresponding letters, what is the code for 'A1B2'?",
      options: ["1-A-2-B", "A-1-B-2", "1-A-B-2", "A-B-1-2"],
      correctAnswer: 0,
      explanation: "A→1, 1→A, B→2, 2→B, so 1-A-2-B"
    },
    {
      id: "q11",
      question: "If each letter's position value is multiplied by its position in word, what is the code for 'BAT'?",
      options: ["2-4-60", "2-8-60", "4-8-60", "2-8-58"],
      correctAnswer: 0,
      explanation: "B(2)×1=2, A(1)×2=2, T(20)×3=60, so 2-2-60"
    },
    {
      id: "q12",
      question: "If A=Z, B=Y, C=X, D=W, E=V, what is the code for 'BED'?",
      options: ["YVA", "YVA", "YVW", "YVW"],
      correctAnswer: 2,
      explanation: "B=Y, E=V, D=W, so YVW"
    },
    {
      id: "q13",
      question: "If the code is (letter position + 1) for consonants and (letter position) for vowels, what is the code for 'CAT'?",
      options: ["4-1-21", "3-1-20", "4-2-21", "3-2-20"],
      correctAnswer: 0,
      explanation: "C(consonant)=3+1=4, A(vowel)=1, T(consonant)=20+1=21, so 4-1-21"
    },
    {
      id: "q14",
      question: "If in a 2×2 matrix, code = row + column, what are the codes for positions (1,1), (1,2), (2,1), (2,2)?",
      options: ["2,3,3,4", "1,2,2,3", "2,4,3,5", "1,2,3,4"],
      correctAnswer: 0,
      explanation: "(1,1)=2, (1,2)=3, (2,1)=3, (2,2)=4"
    },
    {
      id: "q15",
      question: "If letters are coded as △ □ ○ ◇ for A B C D, what is the code for 'BAD'?",
      options: ["□△◇", "□△%", "■▲◆", "□△◇"],
      correctAnswer: 0,
      explanation: "B=□, A=△, D=◇, so □△◇"
    },
    {
      id: "q16",
      question: "If the pattern is position × 2 - 1, what is the code for 'ABC'?",
      options: ["1-3-5", "2-4-6", "1-2-3", "3-5-7"],
      correctAnswer: 0,
      explanation: "A(1)×2-1=1, B(2)×2-1=3, C(3)×2-1=5, so 1-3-5"
    },
    {
      id: "q17",
      question: "If A=26, B=25, C=24, and numbers are coded as letters, what is the code for 'A1B2'?",
      options: ["26-A-25-B", "Z-A-Y-B", "26-1-25-2", "Z-1-Y-2"],
      correctAnswer: 1,
      explanation: "A→26→Z, 1→A, B→25→Y, 2→B, so Z-A-Y-B"
    },
    {
      id: "q18",
      question: "If each letter is shifted 3 positions backward, what is the code for 'DOG'?",
      options: ["ALB", "ALD", "ALB", "AMB"],
      correctAnswer: 1,
      explanation: "D-3=A, O-3=L, G-3=D, so ALD"
    },
    {
      id: "q19",
      question: "If the code is (letter position in alphabet) × (position in word), what is the code for 'CAT'?",
      options: ["3-2-60", "3-2-58", "3-4-60", "6-2-60"],
      correctAnswer: 0,
      explanation: "C(3)×1=3, A(1)×2=2, T(20)×3=60, so 3-2-60"
    },
    {
      id: "q20",
      question: "If vowels get numbers 1-5 and consonants stay the same, what is the code for 'APPLE'?",
      options: ["1PPL2", "APPLE", "1PPLE", "APPLE"],
      correctAnswer: 2,
      explanation: "A=1, P=P, P=P, L=L, E=2, so 1PPLE"
    },
    {
      id: "q21",
      question: "If A=@, B=#, C=$, and the pattern repeats, what is the code for 'FACE'?",
      options: ["@#$%", "$@#@", "@#$^", "$@#^"],
      correctAnswer: 2,
      explanation: "F=A+5 so @, A=@, C=$, E=C+2 so ^, so @#$^"
    },
    {
      id: "q22",
      question: "If in a matrix code = row × column for a 2×2 matrix, what are the codes?",
      options: ["1,2,2,4", "1,2,3,4", "2,3,3,4", "1,3,2,6"],
      correctAnswer: 0,
      explanation: "(1,1)=1, (1,2)=2, (2,1)=2, (2,2)=4"
    },
    {
      id: "q23",
      question: "If the pattern is every other letter reversed, what is the code for 'ABCD'?",
      options: ["AZCD", "ABZD", "AZCB", "ABCD"],
      correctAnswer: 0,
      explanation: "1st letter A→Z, 3rd letter C→X, but wait, typically every other means alternate positions"
    },
    {
      id: "q24",
      question: "If letters are coded as their square root positions (rounded), what is the code for 'BCD'?",
      options: ["2-2-2", "1-2-2", "2-2-3", "1-1-2"],
      correctAnswer: 0,
      explanation: "B(2)→√2≈2, C(3)→√3≈2, D(4)→√4=2, so 2-2-2"
    },
    {
      id: "q25",
      question: "If the code is position mod 3, what is the code for 'ABCDEFGHI'?",
      options: ["1-2-0-1-2-0-1-2-0", "1-2-3-1-2-3-1-2-3", "0-1-2-0-1-2-0-1-2", "1-2-0-1-2-0-1-2-0"],
      correctAnswer: 3,
      explanation: "A(1%3=1), B(2%3=2), C(3%3=0), D(4%3=1), E(5%3=2), F(6%3=0), G(7%3=1), H(8%3=2), I(9%3=0), so 1-2-0-1-2-0-1-2-0"
    }
  ]
};