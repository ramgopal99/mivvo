/**
 * Interview Creation Utilities
 *
 * Provides utility functions for creating custom interviews
 * including role selection, experience levels, interview types, and JD generation.
 */

import { generateUPSEPrompt, generateBankingPrompt } from '@/app/api/custom-interviews/prompts/general'

/**
 * Gets the available role options for interview creation
 */
export const getAvailableRoles = () => [
  // Roles with specific prompts available
  { value: 'frontend-developer', label: 'Frontend Developer' },
  { value: 'backend-developer', label: 'Backend Developer' },
  { value: 'fullstack-developer', label: 'Full Stack Developer' },
  { value: 'react-developer', label: 'React Developer' },
  { value: 'nodejs-developer', label: 'Node.js Developer' },
  { value: 'python-developer', label: 'Python Developer' }
]

/**
 * Gets the available experience level options
 */
export const getAvailableLevels = () => [
  { value: '0-2 years', label: '0-2 years' },
  { value: '2-5 years', label: '2-5 years' },
  { value: '5+ years', label: '5+ years' }
]

/**
 * Gets the available interview type options
 */
export const getAvailableInterviewTypes = () => [
  { value: 'Technical', label: 'Technical' },
  { value: 'HR', label: 'HR' },
  { value: 'General', label: 'General' }
]

/**
 * Gets the available General interview sub-types
 */
export const getGeneralInterviewSubTypes = () => [
  { value: 'UPSE', label: 'UPSE' },
  { value: 'Banking', label: 'Banking' }
]

/**
 * Gets the available HR interview sub-types
 */
export const getHRInterviewSubTypes = () => [
  { value: 'Behavioral', label: 'Behavioral' },
  { value: 'Situational', label: 'Situational' },
  { value: 'Competency', label: 'Competency-Based' },
  { value: 'Leadership', label: 'Leadership' },
  { value: 'Cultural', label: 'Cultural Fit' }
]

/**
 * Gets the detailed prompt for General interview types
 * This is used for the actual interview, not the UI display
 */
export const getGeneralInterviewPrompt = (generalSubType: string, cvText?: string): string => {
  if (generalSubType === 'UPSE') {
    return generateUPSEPrompt(cvText)
  } else if (generalSubType === 'Banking') {
    return generateBankingPrompt(cvText)
  }
  return ''
}

/**
 * Generates a job description based on predefined role and experience level
 * @param role - The role value (e.g., 'frontend-developer')
 * @param level - The experience level (e.g., '2-5 years')
 * @param interviewType - The interview type (optional)
 * @param generalSubType - General interview subtype (optional)
 * @param hrSubType - HR interview subtype (optional)
 * @returns A formatted job description string
 */
export { generateJDFromPredefined } from './jd-generation'
