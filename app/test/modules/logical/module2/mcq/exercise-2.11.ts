import { Exercise } from '../../../../data/lessonsData';

export const exercise_2_11: Exercise = {
  id: "2.11",
  title: 'Blood Relations MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "If A is the brother of B, B is the sister of C, and C is the father of D, how is A related to D?",
      options: ["Uncle", "Father", "Brother", "Cousin"],
      correctAnswer: 0,
      explanation: "A is brother of B, B is sister of C, so A is also brother of C. C is father of D, so A is uncle of D."
    },
    {
      id: "q2",
      question: "Pointing to a photograph, a man said, 'She is the daughter of my grandfather's only son.' How is the man related to the girl in the photograph?",
      options: ["Father", "Brother", "Uncle", "Cousin"],
      correctAnswer: 1,
      explanation: "The man's grandfather's only son is his father. The daughter of his father is his sister."
    },
    {
      id: "q3",
      question: "If P + Q means P is the brother of Q, P × Q means P is the father of Q, and P ÷ Q means P is the sister of Q, then what does M × N ÷ O + P mean?",
      options: ["M is uncle of P", "M is grandfather of P", "M is father of P", "M is brother of P"],
      correctAnswer: 0,
      explanation: "M × N means M is father of N. N ÷ O means N is sister of O. O + P means O is brother of P. So M is grandfather of P, making him uncle to P's generation."
    },
    {
      id: "q4",
      question: "A is the son of B. B is the daughter of C. C is the father of D. What is the relationship between A and D?",
      options: ["Grandson", "Brother", "Cousin", "Nephew"],
      correctAnswer: 0,
      explanation: "C is father of B (daughter) and D (could be son or daughter). A is son of B, so A is grandson of C, and thus grandson of D if D is also child of C."
    },
    {
      id: "q5",
      question: "If A is the husband of B, B is the sister of C, and C is the son of D, how is D related to A?",
      options: ["Father-in-law", "Brother-in-law", "Uncle", "Son-in-law"],
      correctAnswer: 0,
      explanation: "A is married to B, B is sister of C, C is son of D. So D is father of C and B, making D father-in-law of A."
    },
    {
      id: "q6",
      question: "Pointing to a lady, a man said, 'She is the wife of my wife's brother.' How is the lady related to the man?",
      options: ["Sister-in-law", "Sister", "Wife", "Aunt"],
      correctAnswer: 0,
      explanation: "Man's wife's brother is his brother-in-law. The wife of his brother-in-law is his sister-in-law."
    },
    {
      id: "q7",
      question: "If P @ Q means P is the sister of Q, P # Q means P is the mother of Q, and P $ Q means P is the father of Q, then what does A # B @ C $ D mean?",
      options: ["A is grandmother of D", "A is mother of D", "A is aunt of D", "A is sister of D"],
      correctAnswer: 0,
      explanation: "A # B means A is mother of B. B @ C means B is sister of C. C $ D means C is father of D. So A is grandmother of D."
    },
    {
      id: "q8",
      question: "A woman introduces a man as the son of the brother of her mother. How is the man related to the woman?",
      options: ["Nephew", "Cousin", "Uncle", "Brother"],
      correctAnswer: 1,
      explanation: "Woman's mother's brother is her maternal uncle. The son of her maternal uncle is her cousin."
    },
    {
      id: "q9",
      question: "If A + B means A is the brother of B, A × B means A is the sister of B, and A ÷ B means A is the mother of B, then what does P × Q ÷ R + S mean?",
      options: ["P is aunt of S", "P is mother of S", "P is sister of S", "P is grandmother of S"],
      correctAnswer: 0,
      explanation: "P × Q means P is sister of Q. Q ÷ R means Q is mother of R. R + S means R is brother of S. So P is maternal aunt of S."
    },
    {
      id: "q10",
      question: "Pointing to a boy, a woman said, 'He is the son of my husband's sister's husband.' How is the boy related to the woman?",
      options: ["Nephew", "Son", "Brother", "Cousin"],
      correctAnswer: 0,
      explanation: "Woman's husband's sister's husband is her husband's brother-in-law. The son of this person would be her nephew."
    },
    {
      id: "q11",
      question: "If P is married to Q, Q is the mother of R, and R is the brother of S, what is the relationship between P and S?",
      options: ["Father", "Uncle", "Brother-in-law", "Son"],
      correctAnswer: 0,
      explanation: "P is married to Q, Q is mother of R and S (since R is brother of S). So P is father of S."
    },
    {
      id: "q12",
      question: "A is the brother of B, B is the brother of C, and C is the sister of D. How many male members are there in the family?",
      options: ["2", "3", "4", "Cannot be determined"],
      correctAnswer: 3,
      explanation: "A and B are brothers, C is sister of B and D. So males: A, B (and possibly D if male). Minimum 2 males (A and B), but could be 3 if D is male."
    },
    {
      id: "q13",
      question: "If A @ B means A is the father of B, A # B means A is the sister of B, and A $ B means A is the brother of B, then what does P @ Q # R $ S mean?",
      options: ["P is uncle of S", "P is grandfather of S", "P is father of S", "P is brother of S"],
      correctAnswer: 0,
      explanation: "P @ Q means P is father of Q. Q # R means Q is sister of R. R $ S means R is brother of S. So P is paternal uncle of S."
    },
    {
      id: "q14",
      question: "Pointing to a photograph, a man said, 'Brothers and sisters, I have none. But that man's father is my father's son.' Who is in the photograph?",
      options: ["His son", "His nephew", "His grandson", "His brother"],
      correctAnswer: 0,
      explanation: "The man has no siblings. The person in photo's father is the man's father's son. Since he has no brothers, it must be his own son."
    },
    {
      id: "q15",
      question: "A is the uncle of B, B is the nephew of C, and C is the grandfather of D. How is A related to D?",
      options: ["Father", "Uncle", "Grandfather", "Brother"],
      correctAnswer: 1,
      explanation: "A is uncle of B. C is grandfather of D. B is nephew of C, so C is uncle of B. This creates a complex relationship where A is uncle of D."
    },
    {
      id: "q16",
      question: "If P × Q means P is the brother of Q, P + Q means P is the sister of Q, and P ÷ Q means P is the father of Q, then what does A ÷ B × C + D mean?",
      options: ["A is uncle of D", "A is grandfather of D", "A is father of D", "A is brother of D"],
      correctAnswer: 0,
      explanation: "A ÷ B means A is father of B. B × C means B is brother of C. C + D means C is sister of D. So A is paternal uncle of D."
    },
    {
      id: "q17",
      question: "A woman said, 'He is the only grandson of my father.' How is the woman related to the boy?",
      options: ["Mother", "Aunt", "Sister", "Grandmother"],
      correctAnswer: 1,
      explanation: "The boy is grandson of her father, so her father is grandfather of the boy. She could be aunt (father's daughter) or sister (if she has a brother who is the father)."
    },
    {
      id: "q18",
      question: "If A is the son of B, B is the husband of C, and C is the mother of D, what is the relationship between A and D?",
      options: ["Brothers", "Cousins", "Father-son", "Cannot be determined"],
      correctAnswer: 3,
      explanation: "A is son of B and C. D is also child of B and C. So A and D are siblings, but we don't know if they are brothers or brother-sister."
    },
    {
      id: "q19",
      question: "Pointing to a lady, a man said, 'She is the wife of the grandson of my mother.' How is the man's mother related to the lady?",
      options: ["Mother-in-law", "Daughter-in-law", "Grandmother", "Mother"],
      correctAnswer: 0,
      explanation: "The lady is wife of the man's mother's grandson. So the man's mother is mother-in-law to the lady."
    },
    {
      id: "q20",
      question: "If P @ Q means P is the mother of Q, P # Q means P is the father of Q, and P $ Q means P is the sister of Q, then what does A @ B # C $ D mean?",
      options: ["A is grandmother of D", "A is mother of D", "A is aunt of D", "A is sister of D"],
      correctAnswer: 0,
      explanation: "A @ B means A is mother of B. B # C means B is father of C. C $ D means C is sister of D. So A is maternal grandmother of D."
    },
    {
      id: "q21",
      question: "A is the brother of B, B is the daughter of C, and C is the son of D. How is D related to A?",
      options: ["Father", "Grandfather", "Uncle", "Brother"],
      correctAnswer: 1,
      explanation: "C is son of D, so D is father of C. C is father of B, B is sister of A, so D is grandfather of A."
    },
    {
      id: "q22",
      question: "If A × B means A is the husband of B, A + B means A is the sister of B, and A ÷ B means A is the brother of B, then what does P × Q + R ÷ S mean?",
      options: ["P is brother-in-law of S", "P is uncle of S", "P is father of S", "P is husband of S"],
      correctAnswer: 0,
      explanation: "P × Q means P is husband of Q. Q + R means Q is sister of R. R ÷ S means R is brother of S. So P is husband of Q's sister, making him brother-in-law of S."
    },
    {
      id: "q23",
      question: "A man said, 'My mother's sister's husband's brother is my uncle.' Is this statement logically correct?",
      options: ["Always correct", "Never correct", "Sometimes correct", "Cannot be determined"],
      correctAnswer: 0,
      explanation: "Mother's sister's husband is maternal uncle. His brother would also be maternal uncle. So the statement is always correct."
    },
    {
      id: "q24",
      question: "If P is the father of Q, Q is the sister of R, and R is the husband of S, what is the relationship between P and S?",
      options: ["Father-in-law", "Son-in-law", "Brother-in-law", "Uncle"],
      correctAnswer: 0,
      explanation: "R is husband of S, R is brother of Q, Q is daughter of P. So P is father of R and Q, making him father-in-law of S."
    },
    {
      id: "q25",
      question: "Pointing to a person, a woman said, 'He is the son of my father's only daughter.' How is the person related to the woman?",
      options: ["Son", "Nephew", "Brother", "Cousin"],
      correctAnswer: 2,
      explanation: "Woman's father's only daughter is the woman herself. The son of the woman is her son, but the question asks for relationship to the woman, and the statement refers to 'he', so it's her brother if she has one."
    }
  ]
};