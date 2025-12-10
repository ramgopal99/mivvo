// Reading Practice Data Types and Dummy Data

export interface ReadingComprehensionData {
  id: string;
  passage: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface RearrangeSentenceData {
  id: string;
  scrambledSentence: string[];
  correctOrder: string[];
  explanation: string;
}

export interface ReadingSessionData {
  id: string;
  title: string;
  comprehension: ReadingComprehensionData;
  rearranging: RearrangeSentenceData;
}

// Dummy Combined Reading Session Data
export const readingSessionsData: ReadingSessionData[] = [
  {
    id: "reading-session-1",
    title: "English Language Evolution",
    comprehension: {
      id: "comp-1",
      passage: "The English language has become the global language of business, science, and technology. Millions of people around the world learn English as a second language. The rise of the internet has further accelerated this trend, making English essential for international communication.",
      question: "What has accelerated the trend of English becoming a global language?",
      options: [
        "The development of new technologies",
        "The rise of the internet",
        "Increased business travel",
        "Scientific discoveries"
      ],
      correctAnswer: 1, // Index of correct answer (0-based)
      explanation: "The passage states that 'The rise of the internet has further accelerated this trend', making it the correct answer."
    },
    rearranging: {
      id: "rearrange-1",
      scrambledSentence: ["language", "English", "the", "global", "become", "has"],
      correctOrder: ["English", "has", "become", "the", "global", "language"],
      explanation: "The correct grammatical order is: Subject (English) + Auxiliary verb (has) + Past participle (become) + Article (the) + Adjective (global) + Noun (language)."
    }
  }
];

// Legacy exports for backward compatibility
export const readingComprehensionData: ReadingComprehensionData[] = readingSessionsData.map(session => session.comprehension);
export const rearrangeSentencesData: RearrangeSentenceData[] = readingSessionsData.map(session => session.rearranging);

// Export combined data for easy access
export const allReadingData = {
  sessions: readingSessionsData,
  comprehension: readingComprehensionData,
  rearranging: rearrangeSentencesData
};