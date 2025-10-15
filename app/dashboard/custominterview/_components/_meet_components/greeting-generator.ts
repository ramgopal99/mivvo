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
export function generateInterviewGreeting(interviewData?: InterviewData, assistantName: string = "Mivvo"): string {
  const { interviewType, title, jd } = interviewData || {}

  // Extract role from job description or use title
  let jobTitle = title || 'this position'

  // Try to extract role from JD text (e.g., "We are looking for a junior level Frontend Developer to join")
  if (jd && jd.includes('We are looking for a')) {
    // Match everything between "We are looking for a " and " to join"
    const jdMatch = jd.match(/We are looking for a (.+?) to join/)
    if (jdMatch && jdMatch[1]) {
      // Remove the level description (first few words) to get just the role
      const fullMatch = jdMatch[1]
      // Split by spaces and take everything except the first 1-2 words (level description)
      const parts = fullMatch.split(' ')
      if (parts.length > 2) {
        // Remove level words like "junior", "mid-level", "senior"
        const levelWords = ['junior', 'mid-level', 'mid', 'senior', 'level']
        let roleStartIndex = 0
        if (levelWords.includes(parts[0].toLowerCase())) {
          roleStartIndex = 1
          if (parts[1] && parts[1].toLowerCase() === 'level') {
            roleStartIndex = 2
          }
        }
        jobTitle = parts.slice(roleStartIndex).join(' ')
      } else if (parts.length === 2) {
        // Just remove the first word (level) and take the second (role)
        jobTitle = parts[1]
      } else {
        jobTitle = fullMatch
      }
    }
  }

  // Base greeting variations
  // Choose greeting based on time of day
  function getTimeBasedGreeting() {
    const now = new Date()
    const hour = now.getHours()
    if (hour >= 5 && hour < 12) {
      return `Good morning, I'm ${assistantName}`
    } else if (hour >= 12 && hour < 18) {
      return `Good afternoon, I'm ${assistantName}`
    } else if (hour >= 18 && hour < 22) {
      return `Good evening, I'm ${assistantName}`
    } else {
      return `Hello, I'm ${assistantName}`
    }
  }

  const greetingStarters = [
    getTimeBasedGreeting(),
    `I'm ${assistantName}`,
    `Hello, I'm ${assistantName}`,
    `Hi there, I'm ${assistantName}`,
    `Hi, I'm ${assistantName}`,
    `Greetings, I'm ${assistantName}`,
    `Hey there, I'm ${assistantName}`,
    `Good to meet you, I'm ${assistantName}`,
    `Welcome! I'm ${assistantName}`,
    `It's great to connect, I'm ${assistantName}`,
    `Nice to meet you, I'm ${assistantName}`
  ]

  // Interview purpose explanations based on type
  const purposeExplanations: Record<string, string[]> = {
    'GENERAL_INTERVIEW': [
      `and I'm here to conduct a general interview for ${jobTitle}`,
      `and I'll be interviewing you for ${jobTitle}`,
      `and we're doing an interview for ${jobTitle}`
    ],
    'TECHNICAL': [
      `and I'm conducting a technical interview for ${jobTitle}`,
      `and we'll be discussing your technical background for ${jobTitle}`,
      `and I'm here for a technical assessment for ${jobTitle}`
    ],
    'CODING': [
      `and I'm here to do a coding interview for ${jobTitle}`,
      `and we'll be working through some coding challenges for ${jobTitle}`,
      `and I'm conducting a programming interview for ${jobTitle}`
    ],
    'HR_INTERVIEW': [
      `and I'm conducting an HR interview for ${jobTitle}`,
      `and we'll be discussing your professional background for ${jobTitle}`,
      `and I'm here for a behavioral interview for ${jobTitle}`
    ],
    'UI_INTERVIEW': [
      `and I'm conducting a UI/UX interview for ${jobTitle}`,
      `and we'll be discussing your design experience for ${jobTitle}`,
      `and I'm here for a design-focused interview for ${jobTitle}`
    ]
  }

  // Introductory questions variations
  const introQuestions = [
    "Could you start by telling me about yourself?",
    "To begin, could you tell me about your background?",
    "Let's start with you telling me about yourself.",
    "First, could you share a bit about your professional background?",
    "I'd like to start by learning about you - could you tell me about yourself?",
    "Before we dive in, could you tell me about your experience?",
    "Let's begin with you sharing about yourself.",
    "To get started, could you tell me about your background?",
    "I'd love to hear about your professional journey - could you share that with me?",
    "Let's start by you telling me about yourself and your experience."
  ]

  // Select random elements
  const randomStarter = greetingStarters[Math.floor(Math.random() * greetingStarters.length)]
  const purposes = purposeExplanations[interviewType || 'GENERAL_INTERVIEW'] ||
                   purposeExplanations['GENERAL_INTERVIEW']
  const randomPurpose = purposes[Math.floor(Math.random() * purposes.length)]
  const randomQuestion = introQuestions[Math.floor(Math.random() * introQuestions.length)]

  // Construct the full greeting
  return `${randomStarter} ${randomPurpose}. ${randomQuestion}`
}

/**
 * Legacy greeting mappings for backward compatibility
 * These can be removed once all components use the dynamic generator
 */
export const INTERVIEW_GREETINGS = {
  GENERAL: "Hi! I'm Mivvo. Could you please tell me about yourself and your background?",
  TECHNICAL: "Hello! I'm Mivvo. Could you tell me about your technical background and experience?",
  CODING: "Hi there! I'm Mivvo. Could you tell me about your coding experience and background?",
  HR: "Hello! I'm Mivvo. Could you please tell me about yourself and your professional background?",
  UI_UX: "Hi! I'm Mivvo. Could you tell me about your design background and experience?"
}
