/**
 * Custom Greeting Messages for Interviews
 * 
 * This file contains multiple predefined greeting messages that will be randomly
 * selected at the start of every interview. The AI (Mivvo) will ask one of these
 * questions first, wait for the user's response, and then continue with the interview.
 * 
 * You can add more greeting messages to this array to increase variety.
 */

const AI_NAME = "Mivvo"

/**
 * Array of greeting messages - one will be randomly selected each time
 */
export const GREETING_MESSAGES = [
  `Hello! I'm ${AI_NAME}. Tell me about yourself.`,
  `Hi there! I'm ${AI_NAME}, and I'd like to start by learning a bit about you. Could you tell me about yourself?`,
  `Hello! Welcome to the interview. I'm ${AI_NAME}. Let's begin with you telling me about yourself.`,
  `Good day! I'm ${AI_NAME}, and I'm excited to learn more about you. Please start by introducing yourself.`,
  `Hello! I'm ${AI_NAME}. To get started, could you share a bit about your background and experience?`,
  `Hi! I'm ${AI_NAME} conducting your interview today. Let's start with you telling me about yourself.`,
  `Hello there! I'm ${AI_NAME}. I'd love to hear about your professional journey. Could you tell me about yourself?`,
  `Good morning! I'm ${AI_NAME}, and I'm here to conduct your interview. Let's begin with you introducing yourself.`,
  `Hi! Welcome! I'm ${AI_NAME}. Before we dive into the interview, could you tell me a bit about yourself?`,
  `Hello! I'm ${AI_NAME}. I'd like to start by getting to know you better. Could you tell me about yourself?`,
  `Hi there! I'm ${AI_NAME}, your interviewer today. Let's start with you sharing a bit about your background.`,
  `Hello! I'm ${AI_NAME}. To begin our conversation, could you tell me about yourself and your experience?`,
]

/**
 * Get a random greeting message
 * @returns A randomly selected greeting message
 */
export function getRandomGreeting(): string {
  const randomIndex = Math.floor(Math.random() * GREETING_MESSAGES.length)
  return GREETING_MESSAGES[randomIndex]
}

/**
 * Default export for backward compatibility
 * Returns a random greeting each time it's called
 */
export const CUSTOM_GREETING_MESSAGE = getRandomGreeting()
