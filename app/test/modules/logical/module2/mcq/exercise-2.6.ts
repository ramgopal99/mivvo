import { Exercise } from '../../../../data/lessonsData';

export const exercise_2_6: Exercise = {
  id: "2.6",
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
      explanation: "A is brother of B, B is brother of C, so A, B, C are brothers. C is sister of D, so D is female. Males: A, B, C (3 males)."
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
      explanation: "The man has no siblings. 'My father's son' refers to the man himself (since he has no brothers). 'That man's father is my father's son' means the man is the father of the person in the photograph. Therefore, the person in the photograph is his son."
    },
    {
      id: "q15",
      question: "A is the uncle of B, B is the nephew of C, and C is the grandfather of D. How is A related to D?",
      options: ["Father", "Uncle", "Grandfather", "Brother"],
      correctAnswer: 1,
      explanation: "A is uncle of B. B is nephew of C (so C is uncle of B). C is grandfather of D. Since A and C are both uncles of B, they could be brothers or related. A is uncle of D through the family connection."
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
      explanation: "The boy is the only grandson of her father. Since she is female, she cannot be the grandson. The boy must be the son of her brother (making her the aunt) or the son of her father's son (making her the aunt)."
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
      explanation: "The man's mother's sister is his maternal aunt. Her husband is his maternal uncle. The maternal uncle's brother is also a maternal uncle. So the statement is always logically correct."
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
      correctAnswer: 0,
      explanation: "The woman is her father's only daughter. So 'my father's only daughter' refers to herself. Therefore, the son of her father's only daughter is her own son."
    },
    {
      id: "q26",
      question: "If A $ B means A is the brother of B, A @ B means A is the sister of B, and A # B means A is the mother of B, then what does P # Q $ R @ S mean?",
      options: ["P is grandmother of S", "P is mother of S", "P is aunt of S", "P is sister of S"],
      correctAnswer: 0,
      explanation: "P # Q means P is mother of Q. Q $ R means Q is brother of R. R @ S means R is sister of S. So P is maternal grandmother of S."
    },
    {
      id: "q27",
      question: "A family consists of 6 members: P, Q, R, S, T, U. P is the grandfather of R. Q is the grandmother of R. S is the father of R. T is the mother of R. U is the brother of R. Who is the uncle of R?",
      options: ["P", "Q", "S", "Cannot be determined"],
      correctAnswer: 3,
      explanation: "We know the relationships but not the gender of all members. The uncle of R would be the brother of either S or T. Since U is brother of R, he is the uncle of R."
    },
    {
      id: "q28",
      question: "If A is the husband of B, B is the only daughter of C, and C is the mother of D, what is the relationship between A and D?",
      options: ["Father", "Brother-in-law", "Uncle", "Son-in-law"],
      correctAnswer: 0,
      explanation: "B is the only daughter of C, so C has only one daughter B. D is also child of C. A is husband of B, so A is father of D."
    },
    {
      id: "q29",
      question: "Pointing to a man, a woman said, 'His sister's father is my husband's father.' How is the man related to the woman?",
      options: ["Brother", "Cousin", "Brother-in-law", "Nephew"],
      correctAnswer: 0,
      explanation: "The man's sister's father is the man's father. The woman's husband's father is also her father-in-law. If they share the same father-in-law, they are siblings-in-law, so the man is her brother-in-law."
    },
    {
      id: "q30",
      question: "A is B's sister. B is C's brother. C is D's father. E is D's sister. How is A related to E?",
      options: ["Mother", "Aunt", "Sister", "Cousin"],
      correctAnswer: 1,
      explanation: "A is sister of B, B is brother of C, so A is sister of C. C is father of D and E. So A is paternal aunt of E."
    }
  ]
};