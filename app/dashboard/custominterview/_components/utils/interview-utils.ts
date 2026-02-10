/**
 * Interview Utilities
 *
 * Provides utility functions for working with interview configurations and prompts.
 * 
 * This file contains:
 * - Configuration getter functions (getInterviewTypeConfig, getAvailableRoles, etc.)
 * - Validation functions (requiresRole, isValidRoleForType, etc.)
 * - Title functions (getRoleTitle, getInterviewTypeDefaultTitle)
 * - Mapped type functions (getMappedType, getInterviewTypeFromMappedType)
 * - Template functions (getJDTemplateForRole)
 * - Utility functions (cleanCompanyNameForDisplay, processCompanyName)
 * - Prompt generation functions (getTechnicalInterviewPrompt)
 * 
 * NOTE: All configuration data is centralized in interview-config.ts
 * This file provides functions that operate on that configuration data.
 */

import {
  generatePythonDeveloperPrompt
} from '@/app/api/custom-interviews/prompts/technical'
import {
  INTERVIEW_TYPES,
  INTERVIEW_TYPE_DEFAULT_TITLES,
  VALID_MAPPED_TYPES,
  COMPANY_NAME_SUFFIXES_TO_REMOVE,
  type InterviewTypeConfig,
  type InterviewSubtypeConfig
} from './interview-config'

// =============================================================================
// JD DISPLAY HELPERS
// =============================================================================

/** Strip internal [CODING_QUESTION_INDEX:n] from JD so it is not shown to the user */
export function getDisplayJd(jd: string | null | undefined): string {
  if (jd == null || jd === '') return ''
  return jd.replace(/\n\[CODING_QUESTION_INDEX:\d+\]/g, '').trim()
}

// =============================================================================
// CONFIGURATION GETTER FUNCTIONS
// =============================================================================

/**
 * Format a value into a display label (capitalize words, replace hyphens with spaces)
 */
function formatValueToLabel(value: string): string {
  return value
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export function getAvailableInterviewTypes() {
  return INTERVIEW_TYPES.map(type => ({ 
    value: type.value, 
    label: type.label || type.value 
  }))
}

export function getInterviewTypeConfig(interviewType: string): InterviewTypeConfig | undefined {
  return INTERVIEW_TYPES.find(type => type.value === interviewType)
}

export function getInterviewSubtypes(interviewType: string): InterviewSubtypeConfig[] {
  return getInterviewTypeConfig(interviewType)?.subtypes || []
}

export function getSubtypeConfig(interviewType: string, subtypeValue: string): InterviewSubtypeConfig | undefined {
  return getInterviewSubtypes(interviewType).find(subtype => subtype.value === subtypeValue)
}

export function getAvailableRoles() {
  return INTERVIEW_TYPES
    .filter(type => type.subtypes && type.subtypes.length > 0)
    .flatMap(type => 
      (type.subtypes || []).map(subtype => ({
        value: subtype.value,
        label: subtype.label || formatValueToLabel(subtype.value)
      }))
    )
}

export function getTechnicalRolesWithTitles() {
  return INTERVIEW_TYPES
    .filter(type => type.subtypes && type.subtypes.length > 0)
    .flatMap(type => 
      (type.subtypes || []).map(subtype => ({
        value: subtype.value,
        label: subtype.label || formatValueToLabel(subtype.value),
        title: subtype.title || getRoleTitle(subtype.value)
      }))
    )
}

// =============================================================================
// VALIDATION FUNCTIONS
// =============================================================================

export function requiresRole(interviewType: string): boolean {
  const typeConfig = getInterviewTypeConfig(interviewType)
  return (typeConfig?.subtypes?.length ?? 0) > 0
}

export function isValidRoleForType(interviewType: string, role: string): boolean {
  return getInterviewSubtypes(interviewType).some(subtype => subtype.value === role)
}

export function shouldPreventDuplicate(interviewType: string): boolean {
  return interviewType === 'Technical'
}

export function usesCustomPrompt(interviewType: string): boolean {
  return getInterviewTypeConfig(interviewType)?.usesCustomPrompt === true
}

// =============================================================================
// TITLE FUNCTIONS
// =============================================================================

export function getRoleTitle(role: string): string {
  for (const type of INTERVIEW_TYPES) {
    const subtype = type.subtypes?.find(s => s.value === role)
    if (subtype?.title) return subtype.title
  }
  return `${role.charAt(0).toUpperCase() + role.slice(1).replace(/-/g, ' ')} Interview`
}

export function getInterviewTypeDefaultTitle(interviewType: string): string {
  return INTERVIEW_TYPE_DEFAULT_TITLES[interviewType] || `${interviewType} Interview`
}

// =============================================================================
// MAPPED TYPE FUNCTIONS
// =============================================================================

export function getMappedType(interviewType: string): string | undefined {
  return getInterviewTypeConfig(interviewType)?.mappedType
}

export function getInterviewTypeFromMappedType(mappedType: string): string | null {
  const typeConfig = INTERVIEW_TYPES.find(type => type.mappedType === mappedType)
  return typeConfig?.value || null
}

export function getValidMappedTypes(): readonly string[] {
  return VALID_MAPPED_TYPES
}

// =============================================================================
// TEMPLATE FUNCTIONS
// =============================================================================

export function getJDTemplateForRole(role: string): string {
  for (const type of INTERVIEW_TYPES) {
    const subtype = type.subtypes?.find(s => s.value === role)
    if (subtype?.jdTemplate) return subtype.jdTemplate
  }
  return ''
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Clean company name by removing common business suffixes for more natural display
 */
export function cleanCompanyNameForDisplay(companyName: string | null): string | null {
  if (!companyName) return null

  let cleaned = companyName.trim()
  const suffixPattern = new RegExp(`\\s+(${COMPANY_NAME_SUFFIXES_TO_REMOVE.join('|')})$`, 'i')
  cleaned = cleaned.replace(suffixPattern, '')
  return cleaned.trim() || null
}

// =============================================================================
// PROMPT FUNCTION REGISTRY
// =============================================================================

/**
 * Prompt function registry
 * Maps role values directly to their prompt generation functions
 * 
 * NOTE: When adding a new role, add its value here with the corresponding prompt function
 */
const PROMPT_FUNCTION_REGISTRY: Record<string, (jdDetails: string, title: string) => string> = {
  'python-developer': generatePythonDeveloperPrompt,
}

/**
 * Gets the detailed prompt for interview types that require roles
 */
export const getTechnicalInterviewPrompt = (
  role: string | null | undefined, 
  jdDetails: string, 
  title: string, 
  interviewType?: string
): string => {
  if (!role) {
    return "Interview requires selecting a supported role."
  }
  
  if (interviewType) {
    if (!isValidRoleForType(interviewType, role)) {
      return "Interview requires selecting a supported role."
    }
  } else {
    const roleExists = INTERVIEW_TYPES
      .filter(type => requiresRole(type.value))
      .some(type => isValidRoleForType(type.value, role))
    
    if (!roleExists) {
      return "Interview requires selecting a supported role."
    }
  }
  
  const promptFunction = PROMPT_FUNCTION_REGISTRY[role]
  return promptFunction ? promptFunction(jdDetails, title) : ''
}


/**
 * Process company name with fallback logic
 */
export function processCompanyName(
  company: string | undefined,
  extractedData?: { role: string | null; company: string | null } | null
): { finalCompanyName: string | null; cleanedCompanyName: string | null } {
  // Determine company name: use manual input first, then AI extraction as fallback
  // Treat "Custom Company" as null (user didn't provide real company name)
  const normalizedCompany = (company && company.toLowerCase() !== 'custom company') ? company : null
  const finalCompanyName = normalizedCompany || extractedData?.company || null

  // Clean company name for display (remove suffixes like Pvt Ltd, Inc, etc.)
  const cleanedCompanyName = cleanCompanyNameForDisplay(finalCompanyName)

  return { finalCompanyName, cleanedCompanyName }
}


