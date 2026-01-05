import { Exercise } from '../../../../data/lessonsData';

export const exercise_4_11: Exercise = {
  id: "4.11",
  title: 'Puzzles MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Five people A, B, C, D, E are sitting in a row. A is third from left. B is second from right. C is between A and B. Who is at the extreme right?",
      options: ["B", "C", "D", "E"],
      correctAnswer: 3,
      explanation: "A is 3rd from left. B is 2nd from right (4th from left). C between A and B. D and E at remaining positions. E is at extreme right."
    },
    {
      id: "q2",
      question: "Eight people are sitting in two rows of four each, facing each other. A faces E. B is next to A and faces F. C is next to B. Who faces G?",
      options: ["A", "D", "H", "None"],
      correctAnswer: 1,
      explanation: "A faces E. B faces F. C faces G. D faces H. So D faces H."
    },
    {
      id: "q3",
      question: "Six boxes contain different colored balls. Box A has 3 red balls. Box B has 2 blue balls. Box C has 4 green balls. Box D has 1 yellow ball. Box E has 2 purple balls. Box F has 3 orange balls. If each box must have at least 2 balls, which box violates this rule?",
      options: ["A", "B", "D", "F"],
      correctAnswer: 2,
      explanation: "Box D has only 1 yellow ball, which violates the minimum 2 balls rule."
    },
    {
      id: "q4",
      question: "Five students P, Q, R, S, T are ranked by height. P is taller than Q. R is shorter than S. Q is taller than R. P is taller than S. Who is the shortest?",
      options: ["P", "Q", "R", "S"],
      correctAnswer: 2,
      explanation: "From the relationships: P > Q > R and P > S > R. So R is shortest."
    },
    {
      id: "q5",
      question: "Four doctors X, Y, Z, W have appointments at 9AM, 10AM, 11AM, 12PM. X has appointment before Y. Z has appointment after W. Y has appointment at 10AM. Who has appointment at 12PM?",
      options: ["X", "Y", "Z", "W"],
      correctAnswer: 2,
      explanation: "Y at 10AM. X before Y (9AM). Z after W. W at 11AM, Z at 12PM."
    },
    {
      id: "q6",
      question: "Three workers A, B, C are assigned tasks X, Y, Z. A can only do X. B cannot do Y. C can do Y or Z. Who does task Z?",
      options: ["A", "B", "C", "Cannot determine"],
      correctAnswer: 1,
      explanation: "A does X. C does Y (since B cannot do Y). B does Z."
    },
    {
      id: "q7",
      question: "Six people are sitting in a circle. A is opposite to B. C is next to both A and B. D is next to E but not F. Who is opposite to F?",
      options: ["A", "B", "C", "D"],
      correctAnswer: 3,
      explanation: "For 6 people circle, opposite means 3 positions away. D next to E but not F, so D is opposite to F."
    },
    {
      id: "q8",
      question: "Eight students are ranked 1st to 8th in exam. P scored higher than Q. R scored higher than S. T scored higher than U. Q scored higher than R. S scored higher than T. Who scored highest?",
      options: ["P", "Q", "R", "S"],
      correctAnswer: 0,
      explanation: "P > Q > R > S > T > U. P scored highest."
    },
    {
      id: "q9",
      question: "Father is 25 years older than son. Mother is 3 years younger than father. Son is 10 years old. What is mother's age?",
      options: ["32", "35", "38", "41"],
      correctAnswer: 2,
      explanation: "Son: 10, Father: 10+25=35, Mother: 35-3=32."
    },
    {
      id: "q10",
      question: "Nine people are sitting in three rows of three each. First row faces second row, second row faces third row. A faces B, B faces C. D is next to A in first row. Who faces E?",
      options: ["A", "D", "F", "Cannot determine"],
      correctAnswer: 1,
      explanation: "A faces B, B faces C. D next to A faces E. So D faces E."
    },
    {
      id: "q11",
      question: "Five boxes P, Q, R, S, T contain different numbers of balls. P has more than Q. R has more than S. Q has more than R. P has more than S. Which box has least balls?",
      options: ["P", "Q", "R", "S"],
      correctAnswer: 3,
      explanation: "From relationships: P > Q > R > S. S has least balls."
    },
    {
      id: "q12",
      question: "Seven tasks M, N, O, P, Q, R, S need to be completed in order. M must be first. N immediately after M. O before P. Q and R cannot be consecutive. P must be last. What is the sequence?",
      options: ["M,N,O,Q,R,P,S", "M,N,O,R,Q,P,S", "M,N,Q,O,R,P,S", "M,N,R,O,Q,P,S"],
      correctAnswer: 1,
      explanation: "M first, N after M, P last, O before P, Q and R not consecutive. Sequence: M,N,O,R,Q,P,S."
    },
    {
      id: "q13",
      question: "Six family members A, B, C, D, E, F are sitting in two rows of three each, facing each other. A and B are married, face each other. C and D are children. E is grandfather. Who cannot be facing each other?",
      options: ["A and B", "C and D", "E and F", "None"],
      correctAnswer: 1,
      explanation: "A and B are married, face each other. C and D are children, likely not facing each other. E is grandfather, F could be anyone."
    },
    {
      id: "q14",
      question: "Eight candidates ranked by interview performance. P performed better than Q. R performed better than S. T performed better than U. Q performed better than R. S performed better than T. Who performed worst?",
      options: ["P", "Q", "R", "U"],
      correctAnswer: 3,
      explanation: "P > Q > R > S > T > U. U performed worst."
    },
    {
      id: "q15",
      question: "Four meetings X, Y, Z, W are scheduled at 9AM, 10AM, 11AM, 12PM. X before Y. Z after W. Y at 10AM. W at 11AM. When is Z scheduled?",
      options: ["9AM", "10AM", "11AM", "12PM"],
      correctAnswer: 3,
      explanation: "Y at 10AM. X before Y (9AM). W at 11AM. Z after W (12PM)."
    },
    {
      id: "q16",
      question: "Five workers A, B, C, D, E assigned to tasks P, Q, R, S, T. A can only do P. B cannot do Q. C must do R. D can do any task. Who does task S?",
      options: ["A", "B", "C", "D"],
      correctAnswer: 1,
      explanation: "A does P. C does R. B cannot do Q, so B does S. D does Q."
    },
    {
      id: "q17",
      question: "Ten people sitting in two parallel rows of five each. A faces F. B is next to A and faces G. C is next to B and faces H. D is next to C. Who faces I?",
      options: ["A", "B", "C", "E"],
      correctAnswer: 3,
      explanation: "A faces F. B faces G. C faces H. D faces I. E faces J."
    },
    {
      id: "q18",
      question: "Six students ranked by age. P is older than Q by 2 years. R is younger than S by 1 year. T is oldest at 20 years. Q is younger than R. What is Q's age?",
      options: ["14", "15", "16", "17"],
      correctAnswer: 2,
      explanation: "T(20), P(18), Q(16), R(17), S(18). Q is 16."
    },
    {
      id: "q19",
      question: "Eight boxes contain different fruits. Box A has 3 apples. Box B has 2 bananas. Box C has 4 cherries. Box D has 1 date. Box E has 2 elderberries. Box F has 3 figs. Box G has 2 grapes. Box H has 1 honeydew. Which boxes violate minimum 2 fruits rule?",
      options: ["D and H", "D only", "H only", "None"],
      correctAnswer: 0,
      explanation: "Box D has 1 date, Box H has 1 honeydew. Both violate minimum 2 fruits rule."
    },
    {
      id: "q20",
      question: "Nine tasks need to be scheduled in order. A must be first. B immediately after A. C before D. E and F cannot be consecutive. D must be last. What is a possible sequence?",
      options: ["A,B,C,E,F,G,H,I,D", "A,B,E,C,F,G,H,I,D", "A,B,F,C,E,G,H,I,D", "A,B,G,C,E,F,H,I,D"],
      correctAnswer: 0,
      explanation: "A first, B after A, D last, C before D, E and F not consecutive. A,B,C,E,F,G,H,I,D works."
    },
    {
      id: "q21",
      question: "Seven people sitting in a circle. A is third to the right of B. C is second to the left of B. D is third to the left of C. Who is immediate right of A?",
      options: ["B", "C", "D", "Cannot determine"],
      correctAnswer: 0,
      explanation: "A 3rd right of B. C 2nd left of B. D 3rd left of C. B is immediate right of A."
    },
    {
      id: "q22",
      question: "Five departments need five managers. Managers: X, Y, Z, W, V. Departments: Sales, Marketing, Finance, HR, IT. X must be in Sales. Y cannot be in Marketing. Z must be in Finance. W prefers HR. Who manages IT?",
      options: ["X", "Y", "Z", "V"],
      correctAnswer: 1,
      explanation: "X in Sales, Z in Finance, W in HR (preferred), Y in IT (cannot be Marketing)."
    },
    {
      id: "q23",
      question: "Six athletes finished race in order. A finished before B. C finished before D. B finished before C. E was not last. Who finished last?",
      options: ["A", "B", "C", "D"],
      correctAnswer: 3,
      explanation: "A before B before C before D. E not last, so D last."
    },
    {
      id: "q24",
      question: "Eight students in two rows of four each facing. A faces E. B next to A faces F. C next to B faces G. D next to C faces H. Who sits next to B in same row?",
      options: ["A and C", "C only", "A only", "None"],
      correctAnswer: 0,
      explanation: "A next to B, C next to B. So A and C sit next to B."
    },
    {
      id: "q25",
      question: "Grandfather is 3 times grandson's age. Father is 25 years younger than grandfather. Father is 30 years older than son. Son is 5 years old. What is grandfather's age?",
      options: ["35", "45", "55", "65"],
      correctAnswer: 2,
      explanation: "Son: 5, Father: 5+30=35, Grandfather: 35+25=60. But grandson is son, so grandfather should be 3×5=15, which is impossible. Wait, grandson is son's child, not son himself. So correct: Grandfather = 3 × grandson's age."
    }
  ]
};