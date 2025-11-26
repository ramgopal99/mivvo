/**
 * Dynamic Greeting Generator for Interviews
 *
 * Generates personalized greetings based on interview type, job description,
 * and varied introductory questions to make conversations more natural.
 */



interface InterviewData {
  jd?: string
  interviewType?: string
  title?: string
}

/**
 * Generates a dynamic greeting for the interview
 * @param interviewData - Interview data including JD and type
 * @param assistantName - Name to use in the greeting (defaults to "Mivvo")
 * @returns Personalized greeting message
 */
export async function generateInterviewGreeting(interviewData?: InterviewData, assistantName: string = "Mivvo"): Promise<string> {
  // Time-based greeting starters
  const now = new Date()
  const hour = now.getHours()

  let timeGreeting: string
  if (hour >= 5 && hour < 12) {
    timeGreeting = "Good morning"
  } else if (hour >= 12 && hour < 18) {
    timeGreeting = "Good afternoon"
  } else if (hour >= 18 && hour < 22) {
    timeGreeting = "Good evening"
  } else {
    timeGreeting = "Hello"
  }

  // Different closing questions
  const closingQuestions = [
    "Could you tell me about yourself?",
    "Could you start by telling me about yourself?",
    "Let's start with you telling me about yourself.",
    "To begin, could you tell me about your background?",
    "I'd like to start by learning about you - could you tell me about yourself?",
    "First, could you share a bit about your professional background?",
    "Before we dive in, could you tell me about yourself?",
    "Let's begin with you sharing about yourself.",
    "To get started, could you tell me about your experience?",
    "I'd love to hear about your professional journey - could you share that with me?"
  ]

  // Different greeting styles/variations
  const greetingStarters = [
    `${timeGreeting}! I am ${assistantName} conducting your interview.`,
    `${timeGreeting}! I'm ${assistantName}, and I'll be interviewing you today.`,
    `${timeGreeting}! Welcome to your interview with ${assistantName}.`,
    `${timeGreeting}! I'm ${assistantName}, ready to start your interview.`,
    `${timeGreeting}! Let's begin your interview. I'm ${assistantName}.`,
    `${timeGreeting}! I'm ${assistantName}, conducting your interview session.`,
    `Hi there! ${timeGreeting === 'Hello' ? '' : timeGreeting + '! '}I'm ${assistantName} conducting your interview.`,
    `Hey! ${timeGreeting === 'Hello' ? '' : timeGreeting + '! '}I'm ${assistantName}, ready for your interview.`
  ]

  // Randomly select greeting starter and closing question
  const randomStarter = greetingStarters[Math.floor(Math.random() * greetingStarters.length)]
  const randomQuestion = closingQuestions[Math.floor(Math.random() * closingQuestions.length)]

  return `${randomStarter} ${randomQuestion}`
}

