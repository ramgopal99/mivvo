/**
 * Interview Prompt Selector
 *
 * Centralizes logic for selecting and generating the appropriate prompt
 * for different interview types based on their subtypes and data.
 * Uses centralized configuration from interview-config.ts - no hardcoded types!
 */

import { generateCustomInterviewPrompt } from '@/app/api/custom-interviews/prompts'
import {
  getTechnicalInterviewPrompt
} from './interview-utils'
import {
  requiresRole,
  getInterviewTypeConfig,
  getInterviewTypeFromMappedType,
  usesCustomPrompt,
  MappedInterviewType
} from './interview-config'

export interface PromptSelectionData {
  mappedInterviewType: MappedInterviewType
  generalSubType?: string // Legacy field - use 'role' instead. Kept for backward compatibility
  role?: string | null
  jdDetails: string
  title?: string
  customPrompt?: string
}

/**
 * Selects and generates the appropriate prompt for an interview
 */
export function selectInterviewPrompt(data: PromptSelectionData): string {
  const {
    mappedInterviewType,
    generalSubType,
    role,
    jdDetails,
    title,
    customPrompt
  } = data

  if (customPrompt) return customPrompt

  // Get interview type from mapped type using centralized config
  const actualInterviewType = getInterviewTypeFromMappedType(mappedInterviewType)
  if (!actualInterviewType || !getInterviewTypeConfig(actualInterviewType)) {
    return "Interview type not supported."
  }

  // Handle interview types that use custom prompt generation
  if (usesCustomPrompt(actualInterviewType)) {
    return generateCustomInterviewPrompt(jdDetails, undefined)
  }

  // Handle interview types that require roles (e.g., Technical)
  if (requiresRole(actualInterviewType)) {
    const selectedRole = generalSubType || role
    if (!selectedRole) {
      return "Interview requires selecting a supported role."
    }
    
    const defaultTitle = title || `${selectedRole.replace('-', ' ')} Interview`
    const promptText = getTechnicalInterviewPrompt(
      selectedRole, 
      jdDetails, 
      defaultTitle, 
      actualInterviewType
    )
    
    return promptText || "Interview requires selecting a supported role."
  }

  return "Interview type not supported."
}
