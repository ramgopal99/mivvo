// Writing Practice Data Types and Dummy Data

export interface WritingTopicData {
  id: string;
  topic: string;
  description: string;
  instructions: string;
  timeLimit: number; // in minutes
  wordLimit?: number;
  sampleAnswer?: string;
}

// Dummy Writing Practice Data
export const writingTopicData: WritingTopicData[] = [
  {
    id: "writing-1",
    topic: "My Favorite Hobby",
    description: "Write about your favorite hobby and why you enjoy it.",
    instructions: "Describe your favorite hobby in detail. Explain why you enjoy it, how long you've been doing it, and what you like most about it. Include specific examples and details to make your writing interesting.",
    timeLimit: 15, // 15 minutes
    wordLimit: 200,
    sampleAnswer: "My favorite hobby is reading books. I have been reading for as long as I can remember, starting with children's books when I was very young. What I enjoy most about reading is that it allows me to escape into different worlds and experience things I might never encounter in real life. Whether it's a mystery novel that keeps me guessing until the end, or a historical fiction that teaches me about different time periods, reading always provides me with both entertainment and knowledge. I usually read for about an hour each evening before bed, and it's the perfect way to relax after a busy day."
  }
];

// Export combined data for easy access
export const allWritingData = {
  topics: writingTopicData
};