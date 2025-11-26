/**
 * Dynamic Greeting Generator for Interviews
 *
 * Generates personalized greetings based on interview type, job description,
 * and varied introductory questions to make conversations more natural.
 *
 * For Foreign Language interviews, generates greetings in the appropriate language:
 * - Spanish: "Buenos días! Soy Mivvo conduciendo su entrevista."
 * - French: "Bonjour ! Je suis Mivvo qui conduit votre entretien."
 * - German: "Guten Morgen! Ich bin Mivvo und führe Ihr Interview durch."
 *
 * For all other interview types, uses English greetings.
 *
 * Usage:
 * ```typescript
 * const greeting = await generateInterviewGreeting({
 *   interviewType: "Foreign Language",
 *   foreignLanguageSubType: "Spanish"
 * }, "Mivvo");
 * ```
 */



interface InterviewData {
  jd?: string
  interviewType?: string
  title?: string
  foreignLanguageSubType?: string
}

/**
 * Generates a dynamic greeting for the interview
 * @param interviewData - Interview data including JD and type
 * @param assistantName - Name to use in the greeting (defaults to "Mivvo")
 * @returns Personalized greeting message
 */
// Language-specific greeting data
const LANGUAGE_GREETINGS = {
  Spanish: {
    timeGreetings: {
      morning: "Buenos días",
      afternoon: "Buenas tardes",
      evening: "Buenas noches",
      general: "Hola"
    },
    closingQuestions: [
      "¿Podría hablarme de usted?",
      "¿Podría comenzar contándome sobre usted?",
      "Empecemos con que me hable de usted.",
      "Para comenzar, ¿podría contarme sobre su formación profesional?",
      "Me gustaría comenzar conociéndolo - ¿podría hablarme de usted?",
      "Primero, ¿podría compartir un poco sobre su formación profesional?",
      "Antes de comenzar, ¿podría hablarme de usted?",
      "Empecemos con que comparta sobre usted.",
      "Para comenzar, ¿podría contarme sobre su experiencia?",
      "Me encantaría escuchar sobre su trayectoria profesional - ¿podría compartirla conmigo?"
    ],
    greetingStarters: [
      "{timeGreeting}! Soy {assistantName} conduciendo su entrevista.",
      "{timeGreeting}! Soy {assistantName} y estaré entrevistándolo hoy.",
      "{timeGreeting}! Bienvenido a su entrevista con {assistantName}.",
      "{timeGreeting}! Soy {assistantName}, listo para comenzar su entrevista.",
      "{timeGreeting}! Comencemos su entrevista. Soy {assistantName}.",
      "{timeGreeting}! Soy {assistantName}, conduciendo su sesión de entrevista.",
      "¡Hola! {timeGreetingPrefix}Soy {assistantName} conduciendo su entrevista.",
      "¡Ey! {timeGreetingPrefix}Soy {assistantName}, listo para su entrevista."
    ]
  },
  French: {
    timeGreetings: {
      morning: "Bonjour",
      afternoon: "Bon après-midi",
      evening: "Bonsoir",
      general: "Bonjour"
    },
    closingQuestions: [
      "Pourriez-vous me parler de vous ?",
      "Pourriez-vous commencer en me parlant de vous ?",
      "Commençons par vous parler de vous.",
      "Pour commencer, pourriez-vous me parler de votre formation professionnelle ?",
      "J'aimerais commencer en vous connaissant - pourriez-vous me parler de vous ?",
      "D'abord, pourriez-vous partager un peu sur votre formation professionnelle ?",
      "Avant de commencer, pourriez-vous me parler de vous ?",
      "Commençons par vous partager sur vous.",
      "Pour commencer, pourriez-vous me parler de votre expérience ?",
      "J'aimerais entendre parler de votre parcours professionnel - pourriez-vous le partager avec moi ?"
    ],
    greetingStarters: [
      "{timeGreeting} ! Je suis {assistantName} qui conduit votre entretien.",
      "{timeGreeting} ! Je suis {assistantName} et je vous interviewerai aujourd'hui.",
      "{timeGreeting} ! Bienvenue à votre entretien avec {assistantName}.",
      "{timeGreeting} ! Je suis {assistantName}, prêt à commencer votre entretien.",
      "{timeGreeting} ! Commençons votre entretien. Je suis {assistantName}.",
      "{timeGreeting} ! Je suis {assistantName}, qui conduit votre session d'entretien.",
      "Salut ! {timeGreetingPrefix}Je suis {assistantName} qui conduit votre entretien.",
      "Hé ! {timeGreetingPrefix}Je suis {assistantName}, prêt pour votre entretien."
    ]
  },
  German: {
    timeGreetings: {
      morning: "Guten Morgen",
      afternoon: "Guten Tag",
      evening: "Guten Abend",
      general: "Hallo"
    },
    closingQuestions: [
      "Könnten Sie mir etwas über sich erzählen?",
      "Könnten Sie damit beginnen, mir von sich zu erzählen?",
      "Lassen Sie uns damit beginnen, dass Sie mir von sich erzählen.",
      "Um zu beginnen, könnten Sie mir von Ihrer beruflichen Laufbahn erzählen?",
      "Ich würde gerne damit beginnen, Sie kennenzulernen - könnten Sie mir von sich erzählen?",
      "Zuerst könnten Sie ein wenig über Ihre berufliche Laufbahn teilen?",
      "Bevor wir beginnen, könnten Sie mir von sich erzählen?",
      "Lassen Sie uns damit beginnen, dass Sie über sich teilen.",
      "Um zu beginnen, könnten Sie mir von Ihrer Erfahrung erzählen?",
      "Ich würde gerne von Ihrer beruflichen Laufbahn hören - könnten Sie das mit mir teilen?"
    ],
    greetingStarters: [
      "{timeGreeting}! Ich bin {assistantName} und führe Ihr Interview durch.",
      "{timeGreeting}! Ich bin {assistantName} und werde Sie heute interviewen.",
      "{timeGreeting}! Willkommen zu Ihrem Interview mit {assistantName}.",
      "{timeGreeting}! Ich bin {assistantName}, bereit, Ihr Interview zu starten.",
      "{timeGreeting}! Lassen Sie uns Ihr Interview beginnen. Ich bin {assistantName}.",
      "{timeGreeting}! Ich bin {assistantName}, der Ihre Interview-Session durchführt.",
      "Hallo! {timeGreetingPrefix}Ich bin {assistantName} und führe Ihr Interview durch.",
      "Hey! {timeGreetingPrefix}Ich bin {assistantName}, bereit für Ihr Interview."
    ]
  }
}

export async function generateInterviewGreeting(interviewData?: InterviewData, assistantName: string = "Mivvo"): Promise<string> {
  // Check if this is a foreign language interview
  const isForeignLanguage = interviewData?.interviewType === "Foreign Language"
  const language = interviewData?.foreignLanguageSubType

  // If we have explicit foreign language data, use it
  if (isForeignLanguage && language && LANGUAGE_GREETINGS[language as keyof typeof LANGUAGE_GREETINGS]) {
    return generateLanguageSpecificGreeting(language, assistantName)
  }

  // Check if the title contains language keywords (fallback detection)
  const title = interviewData?.title || ""
  const detectedLanguage = detectLanguageFromTitle(title)

  if (detectedLanguage && LANGUAGE_GREETINGS[detectedLanguage as keyof typeof LANGUAGE_GREETINGS]) {
    return generateLanguageSpecificGreeting(detectedLanguage, assistantName)
  }

  // Default to English greetings for all other interviews
  return generateEnglishGreeting(assistantName)
}

/**
 * Detect language from interview title
 * Checks for language keywords in the title
 */
function detectLanguageFromTitle(title: string): string | null {
  if (!title) return null

  const titleLower = title.toLowerCase()

  // Check for Spanish
  if (titleLower.includes('spanish')) {
    return 'Spanish'
  }

  // Check for French
  if (titleLower.includes('french')) {
    return 'French'
  }

  // Check for German
  if (titleLower.includes('german')) {
    return 'German'
  }

  return null
}

function generateLanguageSpecificGreeting(language: string, assistantName: string): string {
  const langData = LANGUAGE_GREETINGS[language as keyof typeof LANGUAGE_GREETINGS]
  if (!langData) return generateEnglishGreeting(assistantName)

  // Time-based greeting
  const now = new Date()
  const hour = now.getHours()

  let timeGreeting: string
  let timeGreetingPrefix = ""
  if (hour >= 5 && hour < 12) {
    timeGreeting = langData.timeGreetings.morning
  } else if (hour >= 12 && hour < 18) {
    timeGreeting = langData.timeGreetings.afternoon
  } else if (hour >= 18 && hour < 22) {
    timeGreeting = langData.timeGreetings.evening
    timeGreetingPrefix = timeGreeting + " "
  } else {
    timeGreeting = langData.timeGreetings.general
  }

  // Randomly select greeting starter and closing question
  const randomStarterTemplate = langData.greetingStarters[Math.floor(Math.random() * langData.greetingStarters.length)]
  const randomQuestion = langData.closingQuestions[Math.floor(Math.random() * langData.closingQuestions.length)]

  // Replace placeholders in greeting starter
  const randomStarter = randomStarterTemplate
    .replace("{timeGreeting}", timeGreeting)
    .replace("{timeGreetingPrefix}", timeGreetingPrefix)
    .replace("{assistantName}", assistantName)

  return `${randomStarter} ${randomQuestion}`
}

function generateEnglishGreeting(assistantName: string): string {
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

