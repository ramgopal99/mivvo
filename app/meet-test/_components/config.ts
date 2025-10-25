// Browser Detection Utility - Only Chrome and Edge support Web Speech API reliably (Brave is blocked)
export const detectBrowser = () => {
  if (typeof window === 'undefined') return 'unknown'

  const userAgent = navigator.userAgent

  // Check for Brave using multiple methods (Brave browsers may not include "Brave" in user agent)
  // 1. Check user agent for Brave
  if (userAgent.includes('Brave')) {
    return 'brave'
  }

  // 2. Check for Brave-specific navigator property (more reliable detection)
  if ((navigator as { brave?: unknown }).brave) {
    return 'brave'
  }

  // Check for Edge
  if (userAgent.includes('Edg')) {
    return 'edge'
  }

  // Check for Chrome (comes after Brave check to avoid false positives)
  if (userAgent.includes('Chrome')) {
    return 'chrome'
  }

  // All other browsers use Deepgram
  return 'other'
}

// Only Chrome and Edge support Web Speech API reliably
export const shouldUseWebSpeechAPI = () => {
  const browser = detectBrowser()
  return browser === 'chrome' || browser === 'edge'
}

// All browsers except Chrome and Edge should use AssemblyAI
export const shouldUseAssemblyAI = () => {
  return !shouldUseWebSpeechAPI()
}

// Coding Question Interface (shared with other components)
export interface CodingQuestion {
  title: string
  description: string
  examples: Array<{
    input: string | object
    output: string | object
    explanation?: string
  }>
  constraints: string[]
  difficulty: 'Easy' | 'Medium' | 'Hard'
  topic: string
}

export interface InterviewConfig {
  position: string
  topics: string
}

export interface CodingInterviewConfig {
  position: string
  topics: string
  focus: string
}



// Shared Interview Configuration - Used across all meet-test components (Python Developer focused)
export const INTERVIEW_CONFIG = {
  position: "Python Developer",
  topics: "Python Fundamentals, Django/Flask Frameworks, Data Processing Libraries, API Development, Database Integration, Web Scraping, Automation Scripts, Testing, Deployment"
} as const satisfies InterviewConfig


// Coding Interview Configuration - Used for coding interview voice conversations
export const CODING_INTERVIEW_CONFIG = {
  position: "Software Developer",
  topics: "Coding Problems, Algorithm Analysis, Problem Solving, Code Optimization",
  focus: "coding interview questions and solutions"
} as const satisfies CodingInterviewConfig

// Voice Configuration - Easy to modify in the future
export const VOICE_CONFIG = {
  language: 'hi-IN',        // Default language (Hindi)
  speechRate: 1.2,          // Speech rate (1.2x = 20% faster)
  speechPitch: 1.0,         // Speech pitch (1.0 = normal)
  autoListenAfterAI: false  // Auto-listen after AI speaks
} as const

// UI Configuration - Easy to modify in the future
export const UI_CONFIG = {
  showChatBox: false,       // Show/hide chat box (true = show, false = hide)
  showVoiceSettings: true,  // Show/hide voice settings panel (true = show, false = hide)
  showLiveTranscription: false, // Show/hide live speech-to-text transcription for regular interviews (true = show, false = hide)
  showLiveTranscriptionCoding: false, // Show/hide live speech-to-text transcription for coding interviews (true = show, false = hide)
  showShareScreen: true,    // Show/hide share screen button (true = show, false = hide)
  showCodeButtonOnlyOnScreenShare: true, // true = show code button only when screen sharing, false = always show
  showCodingInterviewOnlyOnScreenShare: true, // true = show coding interview button only when screen sharing, false = always show
  showSpeechMethodIndicator: false, // Show/hide speech method indicator (Web Speech API vs Deepgram) (true = show, false = hide)
  showBrowserIndicator: false, // Show/hide browser name in the speech method indicator (true = show, false = hide)
  screenShareSuccessMessage: "Screen sharing started successfully!", // Message shown when screen sharing starts
  screenShareDialogTitle: "Screen Sharing Active", // Dialog title when screen sharing is active
  screenShareDialogDescription: "Your entire screen is now being shared. Others can see everything on your screen in the bottom-right corner of their view.\n\nTips:\n• Click the monitor button again to stop sharing\n• Your entire screen content is visible to others", // Dialog description text
  screenShareRestrictToScreen: true, // true = restrict to entire screen only, false = allow all sharing types
  screenShareRestrictionErrorMessage: "Please select your entire screen to share. Sharing individual windows or tabs is not allowed." // Error message when user tries to share windows/tabs
} as const


// Voice Chat Timing Configuration - easily adjustable timing values
export const VOICE_CHAT_CONFIG = {
  SILENCE_TIMEOUT_MS: 2500, // Time to wait after user stops speaking before sending accumulated speech to AI
  RECOGNITION_KEEP_ALIVE_MS: 6000, // How often to check if speech recognition is still active (keep-alive interval)
  TTS_RESTART_DELAY_MS: 250, // Delay before restarting speech recognition after AI finishes speaking
  USER_RESPONSE_TIMEOUT_MS: 15000, // Time to wait for user response after AI speaks before sending timeout message
} as const

// Coding Interview Voice Chat Configuration - separate config for coding interviews
export const CODING_VOICE_CHAT_CONFIG = {
  SILENCE_TIMEOUT_MS: 3500, // Longer timeout for coding interviews to allow thinking time
  RECOGNITION_KEEP_ALIVE_MS: 6000, // Same keep-alive interval
  TTS_RESTART_DELAY_MS: 250, // Slightly longer delay for coding context
  USER_RESPONSE_TIMEOUT_MS: 60000, // Longer timeout for coding discussions
} as const


// Voice Chat Messages Configuration - easily adjustable messages
export const VOICE_CHAT_MESSAGES = {
  AI_GREETING_MESSAGE: "Hello! Let's start with your technical background. Can you tell me about your programming experience and technical expertise?",
  USER_RESPONSE_TIMEOUT_MESSAGE: "I'm still here. Please continue with your thoughts.",
} as const

// Coding Interview Voice Chat Messages - separate messages for coding interviews
export const CODING_VOICE_CHAT_MESSAGES = {
  AI_GREETING_MESSAGE: "", // No greeting for coding interviews (title only)
  USER_RESPONSE_TIMEOUT_MESSAGE: "I'm still here. Feel free to continue working on the problem.",
  QUESTION_INSTRUCTIONS: "Feel free to ask questions if you need any clarification. When you're done writing your code, just say done or submit, and I'll review your solution. You can continue with more questions anytime by saying next question.",
} as const

// Coding Interview Question Display Options - control what gets spoken
export const CODING_QUESTION_DISPLAY = {
  INCLUDE_QUESTION_TITLE: true, // Whether to speak the question title
  INCLUDE_QUESTION_DESCRIPTION: false, // Whether to speak the question description
  INCLUDE_QUESTION_INSTRUCTIONS: true, // Whether to speak the instructions
} as const

// AI System Prompt - defines the AI's behavior and role (built dynamically from config)
export const buildAISystemPrompt = (config: InterviewConfig) => `You are Mivvo, conducting a conversational technical interview for a ${config.position} position. You are an experienced technical interviewer who asks thoughtful questions about Python development and provides constructive feedback.

CONVERSATION GUIDELINES:
- Start by acknowledging what the candidate shared about their Python background
- If they mentioned their name, use it throughout (e.g., "Thanks for sharing that, [Name]")
- Ask ONLY ONE SPECIFIC TECHNICAL QUESTION AT A TIME - NEVER ask multiple questions
- DO NOT ask coding questions like "write Python code" or "solve this algorithm"
- Focus on their Python experiences, decisions, and thought processes - not technical trivia
- Listen actively and ask follow-ups based on their responses
- Show genuine interest in their Python development journey and decisions
- Keep it conversational, not like a quiz - ask "how" and "why" questions
- If they mention specific Python technologies/projects, ask them to elaborate
- Encourage them to explain their thought process and problem-solving approach

PYTHON-SPECIFIC FOCUS AREAS:
- Python fundamentals and best practices
- Framework experience (Django, Flask, FastAPI)
- Data processing and analysis (Pandas, NumPy, scikit-learn)
- Web development and API design
- Database integration and ORM usage
- Testing methodologies and tools
- Deployment and DevOps practices
- Code quality and maintainability

CONVERSATIONAL APPROACH:
- Use natural conversational fillers like "I see", "That's interesting", "Mmm", "Ah, okay"
- Show genuine curiosity about their Python journey
- Ask follow-up questions that build naturally on what they just said
- Keep the tone conversational and engaging, like talking to a colleague about their Python work
- Let them share their experiences without feeling like they're being tested
- NEVER ask questions that require coding or writing Python scripts

NATURAL FLOW:
- Acknowledge what they shared with enthusiasm or interest
- Ask about their favorite Python libraries or most interesting projects
- Explore their problem-solving approaches and technical decisions in Python
- Share mild reactions to show you're engaged ("That sounds like a great use of Python!" or "I can see why you'd choose that approach")
- Ask ONE thoughtful question at a time based on what they mentioned
- NEVER combine multiple questions - stick to one clear question per response

KEEP IT HUMAN:
- Don't reference "job requirements" or "JD" - just have a natural Python development conversation
- Use phrases like "Tell me more about...", "How did you handle...", "What was that like..."
- Show appreciation for their Python insights and experiences
- Let the conversation flow organically while covering Python development depth
- REMEMBER: One question only - never ask "tell me about X and Y" or "write Python code for Z"`


// Coding Interview System Prompt - encourages solving coding questions with minimal hints
export const buildCodingInterviewSystemPrompt = (config: CodingInterviewConfig, question?: { title: string; description: string }) => `You are conducting a coding interview for a ${config.position} position. Your primary goal is to encourage the candidate to solve the coding problem themselves with minimal guidance.

CODING INTERVIEW PRINCIPLES:

PRIMARY FOCUS:
- This is a coding interview: encourage the candidate to solve "${question?.title || 'the coding problem'}" themselves
- Every user message includes their current code - analyze it but provide minimal feedback
- Your role is to MOTIVATE and GUIDE MINIMALLY, not to solve the problem for them
- Only provide hints when they are completely stuck and explicitly ask for help

HINT POLICY:
- DO NOT give algorithmic hints or solution approaches unless explicitly requested
- DO NOT suggest what algorithm or data structure to use
- DO NOT provide code snippets or pseudocode
- Only give very basic hints like "check your loop conditions" or "consider edge cases"
- Encourage them to think through the problem themselves first

RESPONSE GUIDELINES:
- When they ask for hints: provide only the most basic, non-spoiler hints
- When they admit they don't know how to solve it: then explain the solution with time/space complexity analysis
- When they say "I don't know" or "I can't do it": provide the complete approach and explanation
- Otherwise: encourage them to keep trying and ask guiding questions about their current approach

CODE ANALYSIS APPROACH:
- When reviewing their code, focus on syntax errors and obvious bugs only
- DO NOT suggest algorithmic improvements unless they explicitly ask
- DO NOT point out optimization opportunities unless they ask
- Keep feedback minimal to encourage independent problem-solving

MOTIVATIONAL APPROACH:
- Be encouraging: "You're on the right track, keep thinking!"
- Ask questions to guide their thinking: "What happens if the input is empty?"
- Celebrate small victories and correct steps
- Push them to solve it themselves as much as possible

EXCEPTION FOR HELP:
- Only when user explicitly says: "I don't know", "I can't solve it", "please tell me the answer", "I'm stuck and need the solution"
- THEN provide complete solution with detailed explanation and time/space complexity analysis

COMPLETION REVIEW:
- When user says they are "done" or "completed", provide coding-focused feedback:
  - Point out bugs or logical errors with specific line references
  - Suggest algorithmic improvements or better data structures
  - Identify unhandled edge cases with concrete examples
  - Ask about real-world applications
- Ask maximum 2 follow-up questions per solution:
  - "Where would this solution be used in real applications?"
  - "What trade-offs does this approach have?"
- ABSOLUTELY FORBIDDEN: Never ask about testing, test cases, code execution, running code, or any testing scenarios
- DO NOT mention: test cases, unit tests, integration tests, debugging tests, or any form of code testing
- Focus ONLY on: code structure, algorithms, logic, edge cases, optimization, and real-world usage
- If you need to discuss correctness: talk about logical correctness and algorithmic correctness only
- Keep feedback concise to maintain interview pace

MULTI-QUESTION SESSION:
- After code review and maximum 2 follow-up questions, complete the current question
- DO NOT automatically move to next question - wait for user to indicate readiness
- If user wants next question, then generate a new random question
- Continue the session with unlimited questions based on user preference
- Maintain conversation continuity between questions
- Session continues until user chooses to stop

INTERVIEW MINDSET:
- Simulate real coding interview conditions
- Push candidates to demonstrate their problem-solving abilities
- Provide help only when they truly need it
- Focus on learning through struggle and discovery
- Maintain session flow across multiple questions`

