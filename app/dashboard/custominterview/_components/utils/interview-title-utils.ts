/**
 * Interview Title Utilities
 *
 * Provides utility functions for generating proper interview titles
 * based on interview type and role/subtype.
 */

// =============================================================================
// TITLE GENERATION CONSTANTS
// =============================================================================

/**
 * Technical role titles mapping (only available roles)
 */
export const TECHNICAL_ROLE_TITLES: Record<string, string> = {
  "python-developer": "Python Developer Interview",
  "full-stack-developer": "Full Stack Developer Interview",
  "react-developer": "React Developer Interview",
  "frontend-developer": "Frontend Developer Interview"
}

/**
 * General interview subtype titles mapping
 */
export const GENERAL_SUBTYPE_TITLES: Record<string, string> = {
  "UPSE": "UPSE Interview"
}

/**
 * HR interview subtype titles mapping
 */
export const HR_SUBTYPE_TITLES: Record<string, string> = {
  "Behavioral": "Behavioral HR Interview",
  "Situational": "Situational HR Interview",
  "CompetencyBased": "Competency-Based HR Interview",
  "CaseStudy": "Case Study HR Interview"
}

/**
 * Foreign Language interview subtype titles mapping
 */
export const FOREIGN_LANGUAGE_SUBTYPE_TITLES: Record<string, string> = {
  "English": "English Proficiency Interview",
  "Spanish": "Spanish Proficiency Interview",
  "French": "French Proficiency Interview",
  "German": "German Proficiency Interview"
}

// =============================================================================
// TITLE GENERATION FUNCTIONS
// =============================================================================

export interface InterviewTitleOptions {
  interviewType: string
  role?: string
}

/**
 * Generates a proper interview title based on type and role/subtype
 * @param interviewType - The type of interview (Technical, General, HR, Voice Profile, Custom)
 * @param role - The role or subtype (optional)
 * @returns A properly formatted interview title
 */
export function generateInterviewTitle(interviewType: string, role?: string): string {
  if (interviewType === "Voice Profile") {
    return "Voice Profile Interview"
  }

  if (interviewType === "Custom") {
    return "Custom Interview"
  }

  if (interviewType === "Technical" && role) {
    return getTechnicalRoleTitle(role)
  }

  if (interviewType === "General" && role) {
    return getGeneralSubtypeTitle(role)
  }

  if (interviewType === "HR" && role) {
    return getHRSubtypeTitle(role)
  }

  if (interviewType === "Foreign Language" && role) {
    return getForeignLanguageSubtypeTitle(role)
  }

  if (interviewType === "General") {
    return "General Interview"
  }

  if (interviewType === "HR") {
    return "HR Interview"
  }

  if (interviewType === "Foreign Language") {
    return "Foreign Language Interview"
  }

  return `${interviewType} Interview`
}

/**
 * Gets the proper title for technical roles
 */
export function getTechnicalRoleTitle(role: string): string {
  return TECHNICAL_ROLE_TITLES[role] || `${role.charAt(0).toUpperCase() + role.slice(1).replace(/-/g, ' ')} Interview`
}

/**
 * Gets the proper title for general interview subtypes
 */
export function getGeneralSubtypeTitle(subtype: string): string {
  return GENERAL_SUBTYPE_TITLES[subtype] || "General Interview"
}

/**
 * Gets the proper title for HR interview subtypes
 */
export function getHRSubtypeTitle(subtype: string): string {
  return HR_SUBTYPE_TITLES[subtype] || "HR Interview"
}

/**
 * Gets the proper title for Foreign Language interview subtypes
 */
export function getForeignLanguageSubtypeTitle(subtype: string): string {
  return FOREIGN_LANGUAGE_SUBTYPE_TITLES[subtype] || "Foreign Language Interview"
}

/**
 * Generates interview title for backend API based on interview type and role information
 * This is used in the API route for creating interviews
 */
export function generateBackendInterviewTitle(
  interviewType: string,
  role?: string,
  generalSubType?: string,
  hrSubType?: string,
  extractedData?: { role: string | null; company: string | null } | null,
  cleanedCompanyName?: string | null,
  foreignLanguageSubType?: string,
  experienceLevel?: string
): string {

  if (interviewType === 'Technical' && (role || generalSubType)) {
    const actualRole = role || generalSubType
    const baseTitle = TECHNICAL_ROLE_TITLES[actualRole!] || `${actualRole!.charAt(0).toUpperCase() + actualRole!.slice(1).replace(/-/g, ' ')} Interview`

    // Include experience level in title for Technical interviews to prevent duplicates
    if (experienceLevel) {
      return `${baseTitle} (${experienceLevel})`
    }

    return baseTitle
  }

  if (interviewType === 'General' && generalSubType) {
    return GENERAL_SUBTYPE_TITLES[generalSubType] || `${generalSubType} Interview`
  }

  if (interviewType === 'HR') {
    if (role) {
      return HR_SUBTYPE_TITLES[role] || `${role} Interview`
    } else {
      // Fallback for when role is not provided
      return 'HR Interview'
    }
  }

  if (interviewType === 'Foreign Language') {
    if (foreignLanguageSubType) {
      return FOREIGN_LANGUAGE_SUBTYPE_TITLES[foreignLanguageSubType] || `${foreignLanguageSubType} Proficiency Interview`
    } else {
      // Fallback for when foreignLanguageSubType is not provided
      return 'Foreign Language Interview'
    }
  }

  if (interviewType === 'Custom') {
    const rolePart = extractedData?.role ? `${extractedData.role} Interview` : 'Custom Interview'
    const companyPart = cleanedCompanyName ? ` at ${cleanedCompanyName}` : ''
    return `${rolePart}${companyPart}`
  }

  return `${interviewType} Interview`
}

// =============================================================================
// ROLE/SUBTYPE DATA FUNCTIONS
// =============================================================================

/**
 * Gets all available technical roles with their display titles
 */
export function getTechnicalRoles(): { value: string; label: string; title: string }[] {
  return Object.entries(TECHNICAL_ROLE_TITLES).map(([value, title]) => ({
    value,
    label: value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    title
  }))
}

/**
 * Gets all available general subtypes with their display titles
 */
export function getGeneralSubtypes(): { value: string; label: string; title: string }[] {
  return Object.entries(GENERAL_SUBTYPE_TITLES).map(([value, title]) => ({
    value,
    label: value,
    title
  }))
}

/**
 * Gets all available HR subtypes with their display titles
 */
export function getHRSubtypes(): { value: string; label: string; title: string }[] {
  return Object.entries(HR_SUBTYPE_TITLES).map(([value, title]) => ({
    value,
    label: value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    title
  }))
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Validates if a role exists for a given interview type
 */
export function isValidRoleForType(interviewType: string, role: string): boolean {
  switch (interviewType) {
    case 'Technical':
      return role in TECHNICAL_ROLE_TITLES
    case 'General':
      return role in GENERAL_SUBTYPE_TITLES
    case 'HR':
      return role in HR_SUBTYPE_TITLES
    default:
      return false
  }
}

/**
 * Gets the expected title format for a given interview type and role
 */
export function getExpectedTitle(interviewType: string, role?: string): string {
  return generateInterviewTitle(interviewType, role)
}
