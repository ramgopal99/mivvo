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

/**
 * Gets the available role options for interview creation
 */
export const getAvailableRoles = () => [
  // Roles with specific prompts available
  { value: 'python-developer', label: 'Python Developer' },
  { value: 'full-stack-developer', label: 'Full Stack Developer' },
  { value: 'react-developer', label: 'React Developer' },
  { value: 'frontend-developer', label: 'Frontend Developer' }
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
  { value: 'Behavioral', label: 'Behavioral' },
  { value: 'Situational', label: 'Situational' },
  { value: 'CompetencyBased', label: 'Competency-Based' },
  { value: 'CaseStudy', label: 'Case Study' }
]

/**
 * Gets the detailed prompt for General interview types
 * This is used for the actual interview, not the UI display
 */
export const getGeneralInterviewPrompt = (generalSubType: string, jdDetails?: string, title?: string): string => {
  if (generalSubType === 'UPSE') {
    return generateUPSEPrompt(jdDetails, title)
  }
  return ''
}

/**
 * Gets the detailed prompt for HR interview types
 * This is used for the actual interview, not the UI display
 */
export const getHRInterviewPrompt = (hrSubType: string, jdDetails: string, title: string): string => {
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
export const getTechnicalInterviewPrompt = (role: string, jdDetails: string, title: string, experienceLevel?: string): string => {
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

