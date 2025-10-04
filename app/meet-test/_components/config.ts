export interface InterviewConfig {
  position: string
  company: string
  topics: string
  difficulty: string
}

export interface VoiceConfig {
  language: string
  speechRate: number
  speechPitch: number
  autoListenAfterAI: boolean
}

export interface UIConfig {
  showChatBox: boolean
  showVoiceSettings: boolean
  showLiveTranscription: boolean
  showShareScreen: boolean
  showCodeButtonOnlyOnScreenShare: boolean
  screenShareSuccessMessage: string
  screenShareDialogTitle: string
  screenShareDialogDescription: string
  screenShareRestrictToScreen: boolean
  screenShareRestrictionErrorMessage: string
}

// Shared Interview Configuration - Used across all meet-test components
export const INTERVIEW_CONFIG = {
  position: "Software Developer",           // Job position title
  company: "Amazon",                        // Company name
  topics: "Technical Background, Programming Experience, System Design Theory, Algorithm Concepts, Database Design, API Design, Scalability, Performance Optimization", // Technical topics to cover
  difficulty: "Beginner to Advanced"         // Technical difficulty progression
} as const satisfies InterviewConfig

// Voice Configuration - Easy to modify in the future
export const VOICE_CONFIG = {
  language: 'hi-IN',        // Default language (Hindi)
  speechRate: 1.2,          // Speech rate (1.2x = 20% faster)
  speechPitch: 1.0,         // Speech pitch (1.0 = normal)
  autoListenAfterAI: false  // Auto-listen after AI speaks
} as const satisfies VoiceConfig

// UI Configuration - Easy to modify in the future
export const UI_CONFIG = {
  showChatBox: true,       // Show/hide chat box (true = show, false = hide)
  showVoiceSettings: true,  // Show/hide voice settings panel (true = show, false = hide)
  showLiveTranscription: true, // Show/hide live speech-to-text transcription (true = show, false = hide)
  showShareScreen: true,    // Show/hide share screen button (true = show, false = hide)
  showCodeButtonOnlyOnScreenShare: true, // true = show code button only when screen sharing, false = always show
  screenShareSuccessMessage: "Screen sharing started successfully!", // Message shown when screen sharing starts
  screenShareDialogTitle: "Screen Sharing Active", // Dialog title when screen sharing is active
  screenShareDialogDescription: "Your entire screen is now being shared. Others can see everything on your screen in the bottom-right corner of their view.\n\nTips:\n• Click the monitor button again to stop sharing\n• Your entire screen content is visible to others", // Dialog description text
  screenShareRestrictToScreen: true, // true = restrict to entire screen only, false = allow all sharing types
  screenShareRestrictionErrorMessage: "Please select your entire screen to share. Sharing individual windows or tabs is not allowed." // Error message when user tries to share windows/tabs
} as const satisfies UIConfig

// Voice Chat Timing Configuration - easily adjustable timing values
export const VOICE_CHAT_CONFIG = {
  SILENCE_TIMEOUT_MS: 7000, // Time to wait after user stops speaking before sending accumulated speech to AI
  RECOGNITION_KEEP_ALIVE_MS: 5000, // How often to check if speech recognition is still active (keep-alive interval)
  TTS_RESTART_DELAY_MS: 250, // Delay before restarting speech recognition after AI finishes speaking
  USER_RESPONSE_TIMEOUT_MS: 10000 // Time to wait for user response after AI speaks before sending automatic follow-up
} as const

// Voice Chat Messages Configuration - easily adjustable messages
export const VOICE_CHAT_MESSAGES = {
  USER_RESPONSE_TIMEOUT_MESSAGE: "The user has not responded for 10 seconds. Please provide an appropriate follow-up such as repeating the question, asking if they need clarification, or moving to the next question.",
  AI_GREETING_MESSAGE: "Hello! Let's start with your technical background. Can you tell me about your programming experience and technical expertise?"
} as const

// AI System Prompt - defines the AI's behavior and role (built dynamically from config)
export const buildAISystemPrompt = (config: InterviewConfig) => `You are conducting a technical interview for a ${config.position} position at ${config.company}. You are an experienced technical interviewer who asks thoughtful theoretical questions and provides constructive feedback.

Interview Guidelines:
- Start with technical background questions to understand the candidate's experience level
- Ask one question at a time and wait for complete responses
- Focus on theoretical concepts and understanding, not coding implementation
- Ask follow-up questions to explore technical depth and problem-solving thinking
- NEVER ask candidates to write code, create programs, or solve coding problems
- Ask about theoretical concepts in: ${config.topics}
- Progress from ${config.difficulty} level of technical complexity
- Evaluate technical knowledge, reasoning ability, and communication skills

Technical Interview Focus:
- Understanding of core computer science concepts
- System design principles and architectural thinking
- Algorithm and data structure knowledge
- Database design and optimization theory
- API design and scalability concepts
- Performance optimization strategies
- Technical decision-making and trade-offs

Current Interview Progress:
- This is an ongoing technical interview
- Adapt questions based on candidate's responses and demonstrated knowledge level
- Score technical understanding and problem-solving ability (keep track internally)
- Maintain professional technical interviewer demeanor
- End the interview when technical topics are thoroughly explored

Remember: You are conducting a technical interview, not a casual conversation. Focus on assessing technical knowledge, reasoning skills, and ability to explain concepts clearly.`
