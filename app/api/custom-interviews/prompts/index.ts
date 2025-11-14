/**
 * Interview Prompts Index
 *
 * Exports all prompt generation utilities
 */

// Technical Role-Specific Prompts
export * from './technical'

// HR Interview Sub-Type Prompts
export * from './hr'

// General Interview Prompts
export { generateGeneralPrompt } from './general-prompt'
export { generateCodingPrompt } from './coding-prompt'
export { generateTechnicalPrompt } from './technical-prompt'
export { generateCustomInterviewPrompt } from './custom-interview-prompt'
export { generateVoiceProfilePrompt, generateVoiceInterviewPrompt } from './voice-profile-prompt'
export * from './general'
