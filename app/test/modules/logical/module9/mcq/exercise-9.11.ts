import { Exercise } from '../../../../data/lessonsData';

export const exercise_9_11: Exercise = {
  id: "9.11",
  title: 'Syllogism MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Statements: All roses are flowers. Some flowers are red. Conclusion: Some roses are red.",
      options: ["Must be true", "May be true", "Cannot be true", "Always true"],
      correctAnswer: 1,
      explanation: "This conclusion may be true but is not guaranteed. Some roses could be red, or they might all be other colors."
    },
    {
      id: "q2",
      question: "Statements: No cats are dogs. All pets are animals. Conclusion: No cats are animals.",
      options: ["Must be true", "May be true", "Cannot be true", "Always true"],
      correctAnswer: 2,
      explanation: "This conclusion cannot be true because all pets (which include cats) are animals, so cats must be animals."
    },
    {
      id: "q3",
      question: "Statements: All A are B. All B are C. Conclusion: All A are C.",
      options: ["Must be true", "May be true", "Cannot be true", "Always true"],
      correctAnswer: 0,
      explanation: "This is a valid syllogism (Barbara). If all A are B and all B are C, then all A must be C."
    },
    {
      id: "q4",
      question: "Which statement type represents 'All politicians are leaders'?",
      options: ["Type A", "Type E", "Type I", "Type O"],
      correctAnswer: 0,
      explanation: "This is a universal affirmative statement - All S are P."
    },
    {
      id: "q5",
      question: "Statements: Some doctors are engineers. All engineers are graduates. Conclusion: Some doctors are graduates.",
      options: ["Must be true", "May be true", "Cannot be true", "Always true"],
      correctAnswer: 1,
      explanation: "This conclusion may be true. Some doctors who are engineers would be graduates, but we don't know if those doctors exist."
    },
    {
      id: "q6",
      question: "Statements: A ⊂ B, B ∩ C. What do these coded statements mean?",
      options: ["All A are B, Some B are C", "No A are B, All B are C", "Some A are B, All B are C", "All A are B, No B are C"],
      correctAnswer: 0,
      explanation: "⊂ typically means 'are included in' (All) and ∩ typically means 'some overlap' (Some)."
    },
    {
      id: "q7",
      question: "Statements: All A are B. Some B are C. Some B are not C. Conclusion: Either All A are C or Some A are not C.",
      options: ["Must be true", "May be true", "Cannot be true", "Always true"],
      correctAnswer: 0,
      explanation: "This is an either-or conclusion. A could be entirely in the C part of B, or partially in the non-C part of B, but not both."
    },
    {
      id: "q8",
      question: "Statements: No A are B. All C are A. Conclusion: No C are B.",
      options: ["Must be true", "May be true", "Cannot be true", "Always true"],
      correctAnswer: 0,
      explanation: "Since C are a subset of A, and no A are B, then no C can be B."
    },
    {
      id: "q9",
      question: "Which of these is an immediate inference from 'All men are mortal'?",
      options: ["Some mortals are men", "Some men are not mortal", "No men are mortal", "All mortals are men"],
      correctAnswer: 0,
      explanation: "By conversion: All men are mortal → Some mortals are men."
    },
    {
      id: "q10",
      question: "Statements: Some A are B. Some A are not B. Conclusion: All B are A.",
      options: ["Must be true", "May be true", "Cannot be true", "Always true"],
      correctAnswer: 2,
      explanation: "This conclusion cannot be true. B could extend beyond A."
    },
    {
      id: "q11",
      question: "In Venn diagrams, 'No A are B' is represented by:",
      options: ["A completely inside B", "B completely inside A", "A and B completely separate", "A and B overlapping"],
      correctAnswer: 2,
      explanation: "No overlap means the circles representing A and B are completely separate."
    },
    {
      id: "q12",
      question: "Statements: All A are B. Some B are C. Which conclusion definitely follows?",
      options: ["All A are C", "Some A are C", "Some A are not C", "No A are C"],
      correctAnswer: 1,
      explanation: "Some A are C may follow (if the B that are C include some A), but is not definite."
    },
    {
      id: "q13",
      question: "What violates the rules of syllogism?",
      options: ["Illicit major", "Illicit minor", "Undistributed middle", "All of these"],
      correctAnswer: 3,
      explanation: "All three are fallacies in syllogistic reasoning."
    },
    {
      id: "q14",
      question: "Statements: A1B, B2C. Using numerical coding (1=All, 2=No), what follows?",
      options: ["All A are C", "No A are C", "Some A are C", "Cannot determine"],
      correctAnswer: 1,
      explanation: "A1B means All A are B, B2C means No B are C, therefore No A are C."
    },
    {
      id: "q15",
      question: "Statements: All A are B. No B are C. Conclusion: No A are C.",
      options: ["Must be true", "May be true", "Cannot be true", "Always true"],
      correctAnswer: 0,
      explanation: "Since A are a subset of B, and no B are C, then no A can be C."
    },
    {
      id: "q16",
      question: "Which statement type is 'Some animals are not pets'?",
      options: ["Type A", "Type E", "Type I", "Type O"],
      correctAnswer: 3,
      explanation: "This is a particular negative statement - Some S are not P."
    },
    {
      id: "q17",
      question: "Statements: All politicians are leaders. Some leaders are honest. Conclusion: Some politicians are honest.",
      options: ["Must be true", "May be true", "Cannot be true", "Always true"],
      correctAnswer: 1,
      explanation: "This may be true if the honest leaders include some politicians, but is not guaranteed."
    },
    {
      id: "q18",
      question: "From 'No A are B' by contraposition:",
      options: ["No B are A", "All A are non-B", "All non-B are A", "Some A are not B"],
      correctAnswer: 2,
      explanation: "Contraposition: No A are B → All non-B are A."
    },
    {
      id: "q19",
      question: "Statements: Some A are B. Some B are C. Conclusion: Some A are C.",
      options: ["Must be true", "May be true", "Cannot be true", "Always true"],
      correctAnswer: 1,
      explanation: "This may be true if there's overlap between the A's that are B and the B's that are C."
    },
    {
      id: "q20",
      question: "In a valid syllogism, the middle term must be:",
      options: ["Distributed in both premises", "Distributed in the conclusion", "Distributed in at least one premise", "Not distributed in either premise"],
      correctAnswer: 2,
      explanation: "The middle term must be distributed in at least one premise."
    },
    {
      id: "q21",
      question: "Statements: All A are B. Some A are not C. Conclusion: Some B are not C.",
      options: ["Must be true", "May be true", "Cannot be true", "Always true"],
      correctAnswer: 1,
      explanation: "This may be true if the A that are not C are also B, but is not definite."
    },
    {
      id: "q22",
      question: "Which coding represents 'Some A are not B'?",
      options: ["A ⊂ B", "A ⊄ B", "A ∩ B", "A × B"],
      correctAnswer: 1,
      explanation: "⊄ typically means 'are not included in' or 'some are not'."
    },
    {
      id: "q23",
      question: "Statements: No A are B. Some C are A. Conclusion: Some C are not B.",
      options: ["Must be true", "May be true", "Cannot be true", "Always true"],
      correctAnswer: 0,
      explanation: "Since some C are A, and no A are B, those C that are A cannot be B."
    },
    {
      id: "q24",
      question: "What is the obverse of 'All A are B'?",
      options: ["No A are B", "All A are non-B", "No non-B are A", "Some A are B"],
      correctAnswer: 1,
      explanation: "Obversion: All A are B → No A are non-B → All A are non-B (by quality change)."
    },
    {
      id: "q25",
      question: "Statements: All A are B. All C are B. Conclusion: All A are C.",
      options: ["Must be true", "May be true", "Cannot be true", "Always true"],
      correctAnswer: 2,
      explanation: "This is the fallacy of undistributed middle. Cannot conclude All A are C from these premises."
    }
  ]
};