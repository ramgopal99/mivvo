/**
 * Interview Creation Utilities
 *
 * Provides utility functions for creating custom interviews
 * including role selection, experience levels, interview types, and JD generation.
 */

import { generateUPSEPrompt } from '@/app/api/custom-interviews/prompts/general'
import {
  generateBehavioralHRPrompt,
  generateSituationalHRPrompt,
  generateCompetencyBasedHRPrompt,
  generateCaseStudyHRPrompt
} from '@/app/api/custom-interviews/prompts/hr'
import {
  generatePythonDeveloperPrompt,
  generateFullStackDeveloperPrompt,
  generateReactDeveloperPrompt,
  generateFrontendDeveloperPrompt
} from '@/app/api/custom-interviews/prompts/technical'
import {
  generateEnglishProficiencyPrompt,
  generateSpanishProficiencyPrompt,
  generateFrenchProficiencyPrompt,
  generateGermanProficiencyPrompt
} from '@/app/api/custom-interviews/prompts/foreign-language'
import {
  getAvailableInterviewTypes,
  getAvailableRoles,
  getAvailableLevels,
  getHRInterviewSubTypes,
  getGeneralInterviewSubTypes,
  getForeignLanguageSubTypes,
  shouldPreventDuplicate
} from './interview-config'

// Re-export functions for backward compatibility with other files
export {
  getAvailableInterviewTypes,
  getAvailableRoles,
  getAvailableLevels,
  getHRInterviewSubTypes,
  getGeneralInterviewSubTypes,
  getForeignLanguageSubTypes,
  shouldPreventDuplicate
}


/**
 * Gets the detailed prompt for General interview types
 * This is used for the actual interview, not the UI display
 */
export const getGeneralInterviewPrompt = (generalSubType: string | null | undefined, jdDetails?: string, title?: string): string => {
  if (!generalSubType) {
    return "General interview sub-type not supported."
  }
  if (generalSubType === 'UPSE') {
    return generateUPSEPrompt(jdDetails, title)
  }
  return ''
}

/**
 * Gets the detailed prompt for HR interview types
 * This is used for the actual interview, not the UI display
 */
export const getHRInterviewPrompt = (hrSubType: string | null | undefined, jdDetails: string, title: string): string => {
  if (!hrSubType) {
    return "HR interview sub-type not supported. Only Behavioral interviews are available."
  }
  switch (hrSubType) {
    case 'Behavioral':
      return generateBehavioralHRPrompt(jdDetails, title)
    case 'Situational':
      return generateSituationalHRPrompt(jdDetails, title)
    case 'CompetencyBased':
      return generateCompetencyBasedHRPrompt(jdDetails, title)
    case 'CaseStudy':
      return generateCaseStudyHRPrompt(jdDetails, title)
    default:
      return ''
  }
}

/**
 * Gets the detailed prompt for Technical interview types
 * This is used for the actual interview, not the UI display
 */
export const getTechnicalInterviewPrompt = (role: string | null | undefined, jdDetails: string, title: string, experienceLevel?: string): string => {
  if (!role) {
    return "Technical interview requires selecting a supported role."
  }
  switch (role) {
    case 'python-developer':
      return generatePythonDeveloperPrompt(jdDetails, title, experienceLevel)
    case 'full-stack-developer':
      return generateFullStackDeveloperPrompt(jdDetails, title, experienceLevel)
    case 'react-developer':
      return generateReactDeveloperPrompt(jdDetails, title, experienceLevel)
    case 'frontend-developer':
      return generateFrontendDeveloperPrompt(jdDetails, title, experienceLevel)
    default:
      return ''
  }
}

/**
 * Gets the detailed prompt for Foreign Language interview types
 * This is used for the actual interview, not the UI display
 */
export const getForeignLanguagePrompt = (languageSubType: string | null | undefined, jdDetails?: string, title?: string): string => {
  if (!languageSubType) {
    return "Foreign language interview sub-type not supported."
  }
  switch (languageSubType) {
    case 'English':
      return generateEnglishProficiencyPrompt(jdDetails, title)
    case 'Spanish':
      return generateSpanishProficiencyPrompt(jdDetails, title)
    case 'French':
      return generateFrenchProficiencyPrompt(jdDetails, title)
    case 'German':
      return generateGermanProficiencyPrompt(jdDetails, title)
    default:
      return ''
  }
}


/**
 * Clean company name by removing common business suffixes for more natural display
 */
export function cleanCompanyNameForDisplay(companyName: string | null): string | null {
  if (!companyName) return null

  // Common business suffixes to remove (case insensitive)
  const suffixesToRemove = [
    'pvt\\. ltd\\.',
    'pvt ltd',
    'private limited',
    'ltd\\.',
    'ltd',
    'limited',
    'inc\\.',
    'inc',
    'incorporated',
    'llc',
    'llp',
    'corp\\.',
    'corp',
    'corporation',
    'co\\.',
    'co',
    'company',
    'technologies',
    'tech',
    'solutions',
    'systems',
    'group',
    'international',
    'global'
  ]

  let cleaned = companyName.trim()

  // Remove suffixes from the end of the company name
  const suffixPattern = new RegExp(`\\s+(${suffixesToRemove.join('|')})$`, 'i')
  cleaned = cleaned.replace(suffixPattern, '')

  // Clean up extra spaces and return
  return cleaned.trim() || null
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


