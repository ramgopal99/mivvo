/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Interview Title Utilities
 *
 * Provides utility functions for generating proper interview titles
 * based on interview type and role/subtype.
 * 
 * NOTE: All title configurations are centralized in interview-config.ts
 * This file provides convenience functions that read from the centralized config.
 */

import {
  getRoleTitle,
  getInterviewTypeDefaultTitle,
  getTechnicalRolesWithTitles,
  isValidRoleForType as isValidRoleForTypeConfig,
  requiresRole
} from './interview-config'

// =============================================================================
// TITLE GENERATION FUNCTIONS
// =============================================================================

/**
 * Generates a proper interview title based on type and role/subtype
 * @param interviewType - The type of interview (Technical, Voice Profile, Custom)
 * @param role - The role or subtype (optional)
 * @returns A properly formatted interview title
 */
export function generateInterviewTitle(interviewType: string, role?: string): string {
  if (!role) {
    return getInterviewTypeDefaultTitle(interviewType)
  }

  if (requiresRole(interviewType)) {
    return getRoleTitle(role)
  }

  return getInterviewTypeDefaultTitle(interviewType)
}

/**
 * Generates interview title for backend API based on interview type and role information
 */
export function generateBackendInterviewTitle(
  interviewType: string,
  role?: string,
  generalSubType?: string,
  hrSubType?: string,
  extractedData?: { role: string | null; company: string | null } | null,
  cleanedCompanyName?: string | null,
  foreignLanguageSubType?: string
): string {
  if (interviewType === 'Custom') {
    const rolePart = extractedData?.role ? `${extractedData.role} Interview` : getInterviewTypeDefaultTitle('Custom')
    const companyPart = cleanedCompanyName ? ` at ${cleanedCompanyName}` : ''
    return `${rolePart}${companyPart}`
  }

  if (requiresRole(interviewType)) {
    const actualRole = role || generalSubType
    if (actualRole) {
      return getRoleTitle(actualRole)
    }
  }

  return getInterviewTypeDefaultTitle(interviewType)
}

// =============================================================================
// ROLE/SUBTYPE DATA FUNCTIONS
// =============================================================================

/**
 * Gets all available roles with their display titles
 */
export function getTechnicalRoles(): { value: string; label: string; title: string }[] {
  return getTechnicalRolesWithTitles()
}

/**
 * Validates if a role exists for a given interview type
 */
export function isValidRoleForType(interviewType: string, role: string): boolean {
  return isValidRoleForTypeConfig(interviewType, role)
}
