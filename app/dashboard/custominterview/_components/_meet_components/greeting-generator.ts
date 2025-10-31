/**
 * Dynamic Greeting Generator for Interviews
 *
 * Generates personalized greetings based on interview type, job description,
 * and varied introductory questions to make conversations more natural.
 */

import { extractRoleAndCompanyFromJDWithAI, isOpenAIAvailable } from '@/lib/utils'

/**
 * Clean company name by removing common business suffixes for more natural greetings
 */
function cleanCompanyNameForGreeting(companyName: string | null): string | null {
  if (!companyName) return null

  // Common business suffixes to remove (case insensitive)
  const suffixesToRemove = [
    'pvt\\. ltd\\.',
    'pvt ltd',
    'private limited',
    'ltd\\.',
    'ltd',
    'limited',
    'inc\\.',
    'inc',
    'incorporated',
    'llc',
    'llp',
    'corp\\.',
    'corp',
    'corporation',
    'co\\.',
    'co',
    'company',
    'technologies',
    'tech',
    'solutions',
    'systems',
    'group',
    'international',
    'global'
  ]

  let cleaned = companyName.trim()

  // Remove suffixes from the end of the company name
  const suffixPattern = new RegExp(`\\s+(${suffixesToRemove.join('|')})$`, 'i')
  cleaned = cleaned.replace(suffixPattern, '')

  // Clean up extra spaces and return
  return cleaned.trim() || null
}

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
  const { interviewType, title, jd } = interviewData || {}

  // Extract role and company from job description or use title
  let jobTitle = title || 'this position'
  let companyName: string | null = null

  // Try to extract role and company from JD text using AI (only if API key is available)
  if (jd && isOpenAIAvailable()) {
    try {
      const extractedData = await extractRoleAndCompanyFromJDWithAI(jd)
      if (extractedData) {
        if (extractedData.role) {
          jobTitle = extractedData.role
        }
        if (extractedData.company) {
          // Clean company name for more natural greetings
          companyName = cleanCompanyNameForGreeting(extractedData.company)
        }
      }
    } catch (error) {
      console.error('Failed to extract role and company with AI:', error instanceof Error ? error.message : String(error))
      // Fall back to title if AI extraction fails
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
  const companySuffix = companyName ? ` at ${companyName}` : ''
  const purposeExplanations: Record<string, string[]> = {
    'GENERAL_INTERVIEW': [
      `and I'm here to interview you for ${jobTitle}${companySuffix}`,
      `and I'll be having a conversation with you about ${jobTitle}${companySuffix}`,
      `and we're going to have a conversation about your fit for ${jobTitle}${companySuffix}`
    ],
    'TECHNICAL': [
      `and I'm conducting a technical interview for ${jobTitle}${companySuffix}`,
      `and we'll be discussing your technical background for ${jobTitle}${companySuffix}`,
      `and I'm here for a technical interview for ${jobTitle}${companySuffix}`
    ],
    'CODING': [
      `and I'm here to do a coding interview for ${jobTitle}${companySuffix}`,
      `and we'll be working through some coding challenges for ${jobTitle}${companySuffix}`,
      `and I'm conducting a programming interview for ${jobTitle}${companySuffix}`
    ],
    'HR_INTERVIEW': [
      `and I'm conducting an HR interview for ${jobTitle}${companySuffix}`,
      `and we'll be discussing your professional background for ${jobTitle}${companySuffix}`,
      `and I'm here for a behavioral interview for ${jobTitle}${companySuffix}`
    ],
    'UI_INTERVIEW': [
      `and I'm conducting a UI/UX interview for ${jobTitle}${companySuffix}`,
      `and we'll be discussing your design experience for ${jobTitle}${companySuffix}`,
      `and I'm here for a design-focused interview for ${jobTitle}${companySuffix}`
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
