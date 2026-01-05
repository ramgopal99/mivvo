import { Exercise } from '../../../../data/lessonsData';

export const exercise_3_10: Exercise = {
  id: "3.10",
  title: 'Seating Arrangement MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Six friends A, B, C, D, E, and F are sitting in a row. B is sitting between A and C. D is not at the end. E is sitting next to C. Who is sitting at the extreme left?",
      options: ["A", "B", "C", "D"],
      correctAnswer: 0,
      explanation: "B between A and C means A-B-C. E next to C means E is next to C. D not at end and F at remaining position. A is at extreme left."
    },
    {
      id: "q2",
      question: "Eight people are sitting in a circle. A is second to the left of B. C is third to the right of B. D is second to the right of C. E is immediate left of D. Who is third to the right of A?",
      options: ["B", "C", "D", "E"],
      correctAnswer: 1,
      explanation: "Starting from B: A is 2nd left of B. C is 3rd right of B. D is 2nd right of C. E is immediate left of D. Third to right of A is C."
    },
    {
      id: "q3",
      question: "Six people P, Q, R, S, T, U are sitting in two rows of three each, facing each other. P is facing S. Q is to the immediate right of P. R is facing the person to the immediate left of S. Who is facing U?",
      options: ["P", "Q", "R", "T"],
      correctAnswer: 2,
      explanation: "P faces S. Q is right of P, so Q faces person right of S. R faces person left of S. U must be facing R."
    },
    {
      id: "q4",
      question: "Five people A, B, C, D, E are sitting in a circle facing center. A is second to the left of B. C is third to the right of B. D is immediate right of C. Who is second to the right of A?",
      options: ["B", "C", "D", "E"],
      correctAnswer: 0,
      explanation: "A is 2nd left of B. C is 3rd right of B. D is immediate right of C. E is remaining. Second to right of A is B."
    },
    {
      id: "q5",
      question: "Seven friends are sitting in a circle. A is sitting next to B but not next to C. D is not sitting next to A. E is second to the left of D. F is sitting between C and E. Who is sitting next to A?",
      options: ["C and D", "B and E", "B and F", "C and F"],
      correctAnswer: 1,
      explanation: "A next to B but not C. D not next to A. E 2nd left of D. F between C and E. B and E sit next to A."
    },
    {
      id: "q6",
      question: "Eight students are sitting in two rows of four each, facing each other. A faces E. B is to the immediate left of A. C is to the immediate right of B. F is to the immediate right of E. Who faces C?",
      options: ["E", "F", "G", "H"],
      correctAnswer: 1,
      explanation: "A faces E. B left of A faces person left of E. C right of B faces person right of person left of E, which is F."
    },
    {
      id: "q7",
      question: "Six people are sitting in a circle. A is opposite to B. C is next to B. D is next to C and A. E is next to D. Who is opposite to E?",
      options: ["A", "B", "C", "D"],
      correctAnswer: 2,
      explanation: "For 6 people circle, opposite means 3 positions away. A opposite B. C next to B. D next to C and A. E next to D. E is opposite to C."
    },
    {
      id: "q8",
      question: "Five people P, Q, R, S, T are sitting in a row. P is second from left. Q is immediate right of P. R is not next to Q. S is between R and T. Who is at the extreme right?",
      options: ["R", "S", "T", "Q"],
      correctAnswer: 2,
      explanation: "P 2nd from left. Q immediate right of P. R not next to Q, so R at end. S between R and T. T at extreme right."
    },
    {
      id: "q9",
      question: "Seven people are seated in a circle. A is sitting next to B and C. D is sitting next to E and F. G is sitting next to no one mentioned. Who might be sitting between A and D?",
      options: ["B", "E", "G", "Cannot be determined"],
      correctAnswer: 2,
      explanation: "A next to B and C. D next to E and F. G next to no one mentioned, so G sits between A and D."
    },
    {
      id: "q10",
      question: "Eight people are sitting in two parallel rows of four each. A faces E. B is next to A and faces F. C is next to B and faces G. Who faces H?",
      options: ["A", "B", "C", "D"],
      correctAnswer: 3,
      explanation: "A faces E. B faces F. C faces G. D faces H."
    },
    {
      id: "q11",
      question: "Six friends A, B, C, D, E, F are sitting in a circle. A is not next to B. C is next to both A and B. D is next to E but not to F. Who is opposite to A?",
      options: ["B", "C", "D", "E"],
      correctAnswer: 3,
      explanation: "A not next to B. C next to both A and B. D next to E but not F. F is opposite to A."
    },
    {
      id: "q12",
      question: "Four couples are sitting in a circle. No two males or two females are sitting next to each other. A is husband of B. C is wife of D. Who is sitting opposite to A?",
      options: ["B", "C", "D", "Cannot be determined"],
      correctAnswer: 1,
      explanation: "In circle with alternating genders, opposite person will be of same gender. A is male, so opposite is female C."
    },
    {
      id: "q13",
      question: "Five people P, Q, R, S, T are sitting in a row. P is sitting next to Q. R is not sitting next to P. S is sitting between R and T. Who is sitting in the middle?",
      options: ["P", "Q", "R", "S"],
      correctAnswer: 3,
      explanation: "P next to Q. R not next to P. S between R and T. S is in middle position."
    },
    {
      id: "q14",
      question: "Eight people are sitting in a circle. A is third to the right of B. C is second to the left of B. D is third to the left of C. Who is immediate right of A?",
      options: ["B", "C", "D", "Cannot be determined"],
      correctAnswer: 0,
      explanation: "A is 3rd right of B. C is 2nd left of B. D is 3rd left of C. B is immediate right of A."
    },
    {
      id: "q15",
      question: "Six people are sitting in two rows of three each facing each other. P faces R. Q is to the left of P. S is to the right of R. Who is facing Q?",
      options: ["R", "S", "T", "U"],
      correctAnswer: 1,
      explanation: "P faces R. Q left of P faces person left of R. S right of R. Q faces S."
    },
    {
      id: "q16",
      question: "Seven people A, B, C, D, E, F, G are sitting in a circle. A is sitting next to B. B is sitting next to C. C is sitting next to D. D is not sitting next to E. Who is sitting between B and D?",
      options: ["A", "C", "E", "F"],
      correctAnswer: 1,
      explanation: "A next to B, B next to C, C next to D. This creates chain A-B-C-D. C sits between B and D."
    },
    {
      id: "q17",
      question: "Five friends are sitting in a circle. A is second to the left of B. C is immediate right of B. D is immediate left of A. Who is immediate left of C?",
      options: ["A", "B", "D", "Cannot be determined"],
      correctAnswer: 1,
      explanation: "A 2nd left of B. C immediate right of B. D immediate left of A. B is immediate left of C."
    },
    {
      id: "q18",
      question: "Eight people are sitting in two rows of four each facing each other. A faces H. B is next to A and faces G. C is next to B. Who is facing D?",
      options: ["E", "F", "G", "H"],
      correctAnswer: 1,
      explanation: "A faces H. B faces G. C next to B faces F. D faces E."
    },
    {
      id: "q19",
      question: "Six people P, Q, R, S, T, U are sitting in a row. P is between Q and R. S is next to R. T is not next to Q. Who is at the extreme ends?",
      options: ["Q and U", "P and T", "Q and T", "R and U"],
      correctAnswer: 0,
      explanation: "P between Q and R. S next to R. T not next to Q. Q and U are at extreme ends."
    },
    {
      id: "q20",
      question: "Four people A, B, C, D are sitting in a square. A is facing north. B is to the east of A. C is to the south of B. Who is facing west?",
      options: ["A", "B", "C", "D"],
      correctAnswer: 3,
      explanation: "A faces north. B east of A faces east. C south of B faces south. D faces west."
    },
    {
      id: "q21",
      question: "Seven people are sitting in a circle. A is sitting two places to the right of B. C is sitting three places to the left of B. D is sitting next to C. Who is sitting opposite to A?",
      options: ["B", "C", "D", "Cannot be determined"],
      correctAnswer: 2,
      explanation: "A 2 places right of B. C 3 places left of B. D next to C. D is opposite to A."
    },
    {
      id: "q22",
      question: "Five people P, Q, R, S, T are sitting in a circle. P is not next to Q. R is between P and S. T is next to Q. Who is sitting between Q and P?",
      options: ["R", "S", "T", "None"],
      correctAnswer: 2,
      explanation: "P not next to Q. R between P and S. T next to Q. T sits between Q and P."
    },
    {
      id: "q23",
      question: "Eight people are sitting in two parallel rows. A faces E. B is to the right of A and faces F. C is to the left of A. Who faces D?",
      options: ["G", "H", "E", "F"],
      correctAnswer: 0,
      explanation: "A faces E. B right of A faces F. C left of A faces G. D faces H."
    },
    {
      id: "q24",
      question: "Six friends A, B, C, D, E, F are sitting in a row. A is sitting to the left of B. C is sitting between A and D. E is not sitting next to C. Who is sitting at the extreme right?",
      options: ["D", "E", "F", "B"],
      correctAnswer: 2,
      explanation: "A left of B. C between A and D. E not next to C. F is at extreme right."
    },
    {
      id: "q25",
      question: "Nine people are sitting in a circle. A is third to the right of B. C is fourth to the left of B. D is second to the right of C. Who is fourth to the right of A?",
      options: ["B", "C", "D", "Cannot be determined"],
      correctAnswer: 0,
      explanation: "A 3rd right of B. C 4th left of B. D 2nd right of C. B is 4th right of A."
    }
  ]
};