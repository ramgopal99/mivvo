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

// Writing Session Data Types
export interface WritingSessionData {
  id: string;
  title: string;
  topics: WritingTopicData[];
  chatScenarios: ChatScenario[];
  timeLimit: number; // in minutes per topic/scenario
  totalTimeLimit: number; // in minutes for entire session
}

// AI Chat Scenario Types
export interface ChatScenario {
  id: string;
  title: string;
  description: string;
  initialMessage: string;
  aiResponses: Record<string, string>;
  vocabulary: string[];
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
  },
  {
    id: "writing-2",
    topic: "A Memorable Travel Experience",
    description: "Write about a memorable travel experience you had.",
    instructions: "Describe a travel experience that made a strong impression on you. Include details about where you went, what you did, who you were with, and why this experience was memorable. Explain what you learned from this trip and how it changed you.",
    timeLimit: 20, // 20 minutes
    wordLimit: 300,
    sampleAnswer: "One of the most memorable travel experiences I had was my trip to Kyoto, Japan last year. I traveled there with my sister during the cherry blossom season, which made the whole experience even more magical. We stayed in a traditional ryokan and participated in a tea ceremony, which taught me about the importance of mindfulness and appreciation for simple moments. The temples and gardens were breathtaking, especially when the cherry blossoms were in full bloom. What made this trip truly special was witnessing how the Japanese people honor their traditions while embracing modernity. This experience taught me to slow down and appreciate the beauty in everyday life, and it inspired me to learn more about Japanese culture."
  }
];

// AI Chat Scenarios
export const chatScenarios: ChatScenario[] = [
  {
    id: "pizza-booking",
    title: "Pizza Ordering",
    description: "Practice ordering pizza at a restaurant",
    initialMessage: "Hello! Welcome to Mario's Pizza. How can I help you today?",
    aiResponses: {
      "hello": "Hi there! What would you like to order?",
      "hi": "Hello! What can I get for you today?",
      "pizza": "Great choice! What size would you like? Small, medium, or large?",
      "small": "Small pizza is $12.99. What toppings would you like?",
      "medium": "Medium pizza is $16.99. What toppings would you like?",
      "large": "Large pizza is $20.99. What toppings would you like?",
      "pepperoni": "Pepperoni is $2 extra. Would you like any other toppings?",
      "cheese": "Extra cheese is $1.50. Any other toppings?",
      "mushroom": "Mushrooms are $1.25. Any other toppings?",
      "delivery": "Delivery is $3.99. What's your address?",
      "pickup": "Pickup will be ready in 15 minutes. See you soon!",
      "bye": "Thank you for your order! Goodbye!",
      "thank": "You're welcome! Enjoy your pizza!"
    },
    vocabulary: ["pizza", "order", "size", "toppings", "pepperoni", "cheese", "mushrooms", "delivery", "pickup", "address"]
  }
];

// Dummy Writing Practice Sessions
export const writingSessionsData: WritingSessionData[] = [
  {
    id: "writing-session-1",
    title: "Complete Writing & Chat Practice",
    topics: writingTopicData, // All 2 writing topics
    chatScenarios: chatScenarios, // All chat scenarios (pizza ordering)
    timeLimit: 15, // 15-20 minutes per topic/scenario
    totalTimeLimit: 50 // 50 minutes total (2 writing + 1 chat)
  },
];

// Export combined data for easy access
export const allWritingData = {
  topics: writingTopicData,
  chatScenarios: chatScenarios
};