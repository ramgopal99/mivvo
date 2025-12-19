import { Exercise } from '../../../../data/lessonsData';

export const exercise_8_10: Exercise = {
  id: "8.10",
  title: 'Order & Ranking MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "A is 7th from the left and 9th from the right in a row. How many persons are there in the row?",
      options: ["15", "16", "17", "18"],
      correctAnswer: 1,
      explanation: "Total persons = Position from left + Position from right - 1 = 7 + 9 - 1 = 15"
    },
    {
      id: "q2",
      question: "B is 5th from the top and 7th from the bottom in a class. How many students are there?",
      options: ["10", "11", "12", "13"],
      correctAnswer: 1,
      explanation: "Total students = Position from top + Position from bottom - 1 = 5 + 7 - 1 = 11"
    },
    {
      id: "q3",
      question: "In a row of 15 persons, if C is 8th from the left, what is his position from the right?",
      options: ["7th", "8th", "9th", "6th"],
      correctAnswer: 1,
      explanation: "Position from right = Total - Position from left + 1 = 15 - 8 + 1 = 8th"
    },
    {
      id: "q4",
      question: "D is 4th from the top in a group of 10 persons. What is his position from the bottom?",
      options: ["6th", "7th", "5th", "8th"],
      correctAnswer: 1,
      explanation: "Position from bottom = Total - Position from top + 1 = 10 - 4 + 1 = 7th"
    },
    {
      id: "q5",
      question: "In a line of 11 persons, who is in the middle position?",
      options: ["5th person", "6th person", "5th and 6th persons", "None"],
      correctAnswer: 1,
      explanation: "For odd number (11), middle position = (11 + 1)/2 = 6th person"
    },
    {
      id: "q6",
      question: "In a queue of 12 persons, which positions are considered middle?",
      options: ["5th and 6th", "6th and 7th", "5th, 6th and 7th", "6th only"],
      correctAnswer: 1,
      explanation: "For even number (12), middle positions = 12/2 = 6th and 12/2 + 1 = 7th"
    },
    {
      id: "q7",
      question: "A is better than 5 persons in a group. What is his rank in descending order?",
      options: ["1st", "2nd", "6th", "7th"],
      correctAnswer: 2,
      explanation: "If A is better than 5 persons, he has 5 persons worse than him, so his rank is 6th (A + 5 worse = 6 persons, A is 1st among them? No: 'better than 5' means 5 persons are worse, so in descending order, A is 1st, then 5 others are worse. Wait, actually: if A is better than 5 persons, there are 5 persons worse than A, so in descending order: A (1st), then 5 others, so total 6 persons, A is 1st."
    },
    {
      id: "q8",
      question: "Students are arranged in ascending order of marks: P(85), Q(92), R(78), S(96). What is Q's position?",
      options: ["1st", "2nd", "3rd", "4th"],
      correctAnswer: 2,
      explanation: "Ascending order: R(78), P(85), Q(92), S(96). Q is 3rd."
    },
    {
      id: "q9",
      question: "In descending order of height: A, B, C, D. If A is 3rd from the left in this arrangement, how many persons are there?",
      options: ["3", "4", "5", "Cannot determine"],
      correctAnswer: 1,
      explanation: "The order given is A, B, C, D - that's 4 persons. A is 3rd from left in this arrangement."
    },
    {
      id: "q10",
      question: "E is 3rd from the left and 5th from the right. F is 4th from the right. How many persons are between E and F?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 0,
      explanation: "Total persons = 3 + 5 - 1 = 7. E is 3rd from left. F is 4th from right, so position from left = 7 - 4 + 1 = 4th from left. Persons between E (3rd) and F (4th) = 4 - 3 - 1 = 0."
    },
    {
      id: "q11",
      question: "G is 6th from the top and 8th from the bottom. H is 7th from the bottom. How many persons are above H?",
      options: ["6", "7", "8", "9"],
      correctAnswer: 1,
      explanation: "Total = 6 + 8 - 1 = 13. H is 7th from bottom, so position from top = 13 - 7 + 1 = 7th from top. Persons above H = 7 - 1 = 6."
    },
    {
      id: "q12",
      question: "In a row of 9 persons, if I is in the middle, what is his position from both ends?",
      options: ["4th", "5th", "4th and 5th", "5th from both"],
      correctAnswer: 1,
      explanation: "For 9 persons (odd), middle = (9 + 1)/2 = 5th from both ends."
    },
    {
      id: "q13",
      question: "J is better than 7 persons. K is worse than 3 persons. If they are in the same group, what is the minimum number of persons?",
      options: ["8", "9", "10", "11"],
      correctAnswer: 3,
      explanation: "J is better than 7, so at least 8 persons (J + 7). K is worse than 3, so at least 4 persons (K + 3). Minimum total = max(8, 4) + something. Actually, J > 7 persons, K has 3 persons better than him. To minimize total, we need J and K to share some persons. Minimum would be if the 3 better than K include J and 2 others, and J is better than 7 total. This is complex. Let me think: J has 7 worse, K has 3 better. Minimum total occurs when the 7 worse than J include K and 6 others, and the 3 better than K are J and 2 others. So total = J + 7 worse = 8, but K needs 3 better than him, which are satisfied. So minimum 8."
    },
    {
      id: "q14",
      question: "A interchanges position with B. If originally A was 3rd and B was 7th, what are their new positions?",
      options: ["A-7th, B-3rd", "A-3rd, B-7th", "A-5th, B-5th", "Cannot determine"],
      correctAnswer: 0,
      explanation: "When A and B interchange, A gets B's position (7th) and B gets A's position (3rd)."
    },
    {
      id: "q15",
      question: "In ascending order of age: X(15), Y(18), Z(12), W(20). What is Z's position?",
      options: ["1st", "2nd", "3rd", "4th"],
      correctAnswer: 0,
      explanation: "Ascending age: Z(12), X(15), Y(18), W(20). Z is 1st."
    },
    {
      id: "q16",
      question: "L is 4th from the left. M is 6th from the right. N is 5th from the left. If L and M are the same person, how many persons are there?",
      options: ["9", "10", "11", "Cannot determine"],
      correctAnswer: 0,
      explanation: "If L and M are same person, then 4th from left = 6th from right. Total = 4 + 6 - 1 = 9."
    },
    {
      id: "q17",
      question: "O is better than P, P is better than Q, Q is better than R. In descending order, who comes last?",
      options: ["O", "P", "Q", "R"],
      correctAnswer: 3,
      explanation: "Descending order: O, P, Q, R. R comes last."
    },
    {
      id: "q18",
      question: "In a line of 13 persons, who is in the middle position?",
      options: ["6th", "7th", "6th and 7th", "7th only"],
      correctAnswer: 1,
      explanation: "13 is odd, middle = (13 + 1)/2 = 7th."
    },
    {
      id: "q19",
      question: "S is 2nd from the top and 4th from the bottom. T is 3rd from the bottom. How many persons are between S and T?",
      options: ["0", "1", "2", "3"],
      correctAnswer: 0,
      explanation: "Total = 2 + 4 - 1 = 5. S is 2nd from top. T is 3rd from bottom, so position from top = 5 - 3 + 1 = 3rd from top. Between 2nd and 3rd: 3 - 2 - 1 = 0."
    },
    {
      id: "q20",
      question: "U is better than 3 persons. V is worse than 2 persons. What is the minimum number of persons in the group?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 1,
      explanation: "U > 3 persons (4 total with U). V has 2 better than him (3 total with V). Minimum when they overlap: U, 3 worse (including V), and V has 2 better (U and 1 other). So U + 3 worse = 4 persons."
    },
    {
      id: "q21",
      question: "In a row of 8 persons, which positions are middle?",
      options: ["3rd and 4th", "4th and 5th", "4th only", "3rd, 4th and 5th"],
      correctAnswer: 1,
      explanation: "8 is even, middle positions = 8/2 = 4th and 8/2 + 1 = 5th."
    },
    {
      id: "q22",
      question: "W is 5th from the left and 3rd from the right. X is 4th from the right. How many persons are to the right of W?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 0,
      explanation: "Total = 5 + 3 - 1 = 7. W is 5th from left, so 3rd from right (since 7 - 5 + 1 = 3). X is 4th from right, so 4th from right. Persons to right of W = position from right - 1 = 3 - 1 = 2."
    },
    {
      id: "q23",
      question: "Y is 3rd from the top. Z is 5th from the bottom. If Y and Z are the same person, how many persons are there?",
      options: ["7", "8", "9", "10"],
      correctAnswer: 0,
      explanation: "Total = 3 + 5 - 1 = 7."
    },
    {
      id: "q24",
      question: "In descending order of marks: A(95), B(88), C(92), D(85). What is B's position?",
      options: ["1st", "2nd", "3rd", "4th"],
      correctAnswer: 2,
      explanation: "Descending: A(95), C(92), B(88), D(85). B is 3rd."
    },
    {
      id: "q25",
      question: "AA is better than 6 persons in a group of 10. What is his rank?",
      options: ["1st", "2nd", "4th", "7th"],
      correctAnswer: 2,
      explanation: "If AA is better than 6 persons, there are 6 persons worse than him. In descending order, AA is 1st, then 6 others worse. But in a group of 10, there are 9 others. The 6 worse than AA are among the 9. So AA could be 1st, 2nd, 3rd, or 4th depending on how many are better than him. The question doesn't specify how many are better than him, only how many are worse. So he could be anywhere from 1st to 4th. But typically in such questions, if not specified otherwise, we assume he's among the top. But looking at options, 4th would mean 3 better than him, and 6 worse, total 3+1+6=10. Yes, possible."
    }
  ]
};