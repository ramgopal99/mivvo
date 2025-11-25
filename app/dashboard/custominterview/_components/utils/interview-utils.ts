/**
 * Interview Creation Utilities
 *
 * Provides utility functions for creating custom interviews
 * including role selection, experience levels, interview types, and JD generation.
 */

import { generateUPSEPrompt } from '@/app/api/custom-interviews/prompts/general'

/**
 * Gets the available role options for interview creation
 */
export const getAvailableRoles = () => [
  // Roles with specific prompts available
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
  { value: 'UPSE', label: 'UPSE' }
]

/**
 * Gets the available HR interview sub-types
 */
export const getHRInterviewSubTypes = () => [
  { value: 'Behavioral', label: 'Behavioral' }
]

/**
 * Gets the detailed prompt for General interview types
 * This is used for the actual interview, not the UI display
 */
export const getGeneralInterviewPrompt = (generalSubType: string): string => {
  if (generalSubType === 'UPSE') {
    return generateUPSEPrompt()
  }
  return ''
}

