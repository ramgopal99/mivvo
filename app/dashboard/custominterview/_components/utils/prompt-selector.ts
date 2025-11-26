/**
 * Interview Prompt Selector
 *
 * Centralizes logic for selecting and generating the appropriate prompt
 * for different interview types based on their subtypes and data.
 */

import { generateCustomInterviewPrompt } from '@/app/api/custom-interviews/prompts'
import {
  getTechnicalInterviewPrompt,
  getHRInterviewPrompt,
  getGeneralInterviewPrompt,
  getForeignLanguagePrompt
} from './interview-utils'

export interface PromptSelectionData {
  interviewType: string
  mappedInterviewType: 'GENERAL_INTERVIEW' | 'TECHNICAL' | 'CODING' | 'HR_INTERVIEW' | 'CUSTOM_INTERVIEW'
  generalSubType?: string
  hrSubType?: string | null
  foreignLanguageSubType?: string | null
  role?: string | null
  jdDetails: string
  title?: string
  customPrompt?: string
  experienceLevel?: string
}

/**
 * Selects and generates the appropriate prompt for an interview
 * @param data - Interview data including type, subtypes, and content
 * @returns The generated prompt text
 */
export function selectInterviewPrompt(data: PromptSelectionData): string {
  const {
    interviewType,
    mappedInterviewType,
    generalSubType,
    hrSubType,
    foreignLanguageSubType,
    role,
    jdDetails,
    title,
    customPrompt,
    experienceLevel
  } = data

  // Use custom prompt if provided (for custom JD interviews)
  if (customPrompt) {
    return customPrompt
  }

  // Technical interviews
  if (mappedInterviewType === "TECHNICAL") {
    const selectedRole = generalSubType || role
    const promptText = getTechnicalInterviewPrompt(selectedRole, jdDetails, title || `${selectedRole?.replace('-', ' ') || 'Technical'} Interview`, experienceLevel)
    return promptText || "Technical interview requires selecting a supported role."
  }

  // Foreign Language interviews
  if (interviewType === "Foreign Language") {
    const promptText = getForeignLanguagePrompt(foreignLanguageSubType, jdDetails, title || undefined)
    return promptText || "Foreign language interview sub-type not supported."
  }

  // General interviews
  if (mappedInterviewType === "GENERAL_INTERVIEW") {
    const promptText = getGeneralInterviewPrompt(generalSubType, jdDetails, title || "General Interview")
    return promptText || "General interview sub-type not supported."
  }

  // HR interviews
  if (interviewType === "HR") {
    const promptText = getHRInterviewPrompt(hrSubType, jdDetails, title || "HR Interview")
    return promptText || "HR interview sub-type not supported. Only Behavioral interviews are available."
  }

  // Custom interviews
  if (mappedInterviewType === "CUSTOM_INTERVIEW") {
    return generateCustomInterviewPrompt(jdDetails, undefined)
  }

  // Fallback for unsupported interview types
  return "Interview type not supported."
}
