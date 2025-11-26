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
export { generateCustomInterviewPrompt } from './custom-interview-prompt'
export { generateVoiceProfilePrompt, generateVoiceInterviewPrompt } from './voice-profile-prompt'
export * from './general'

// Foreign Language Interview Prompts
export * from './foreign-language'