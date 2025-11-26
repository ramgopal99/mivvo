/**
 * Interview Configuration
 *
 * Centralized configuration for all interview types, subtypes, and their properties
 * This makes it easy to add new interview types and subtypes in an organized way
 */

export interface InterviewTypeConfig {
  value: string
  label: string
  description?: string
  subtypes?: InterviewSubtypeConfig[]
  requiresRole?: boolean
  requiresExperienceLevel?: boolean
  allowsDuplicates?: boolean
}

export interface InterviewSubtypeConfig {
  value: string
  label: string
  description?: string
  promptFunction?: string // Reference to the prompt generation function
  experienceLevels?: string[] // For technical roles
}

/**
 * Interview Types Configuration
 * Each interview type can have subtypes and specific properties
 */
export const INTERVIEW_TYPES: InterviewTypeConfig[] = [
  {
    value: 'Technical',
    label: 'Technical',
    description: 'Technical interviews for specific developer roles',
    requiresRole: true,
    requiresExperienceLevel: true,
    allowsDuplicates: false,
    subtypes: [
      {
        value: 'python-developer',
        label: 'Python Developer',
        description: 'Python development interview',
        promptFunction: 'generatePythonDeveloperPrompt',
        experienceLevels: ['0-2 years', '2-5 years', '5+ years']
      },
      {
        value: 'full-stack-developer',
        label: 'Full Stack Developer',
        description: 'Full stack development interview',
        promptFunction: 'generateFullStackDeveloperPrompt',
        experienceLevels: ['0-2 years', '2-5 years', '5+ years']
      },
      {
        value: 'react-developer',
        label: 'React Developer',
        description: 'React development interview',
        promptFunction: 'generateReactDeveloperPrompt',
        experienceLevels: ['0-2 years', '2-5 years', '5+ years']
      },
      {
        value: 'frontend-developer',
        label: 'Frontend Developer',
        description: 'Frontend development interview',
        promptFunction: 'generateFrontendDeveloperPrompt',
        experienceLevels: ['0-2 years', '2-5 years', '5+ years']
      }
    ]
  },
  {
    value: 'HR',
    label: 'HR',
    description: 'Human Resources interviews for different HR specializations',
    requiresRole: false,
    requiresExperienceLevel: false,
    allowsDuplicates: true,
    subtypes: [
      {
        value: 'Behavioral',
        label: 'Behavioral',
        description: 'Behavioral HR interview focusing on past experiences',
        promptFunction: 'generateBehavioralHRPrompt'
      },
      {
        value: 'Situational',
        label: 'Situational',
        description: 'Situational HR interview focusing on hypothetical scenarios',
        promptFunction: 'generateSituationalHRPrompt'
      },
      {
        value: 'CompetencyBased',
        label: 'Competency-Based',
        description: 'Competency-based HR interview focusing on skills and abilities',
        promptFunction: 'generateCompetencyBasedHRPrompt'
      },
      {
        value: 'CaseStudy',
        label: 'Case Study',
        description: 'Case study HR interview focusing on problem-solving scenarios',
        promptFunction: 'generateCaseStudyHRPrompt'
      }
    ]
  },
  {
    value: 'General',
    label: 'General',
    description: 'General interview questions and topics',
    requiresRole: false,
    requiresExperienceLevel: false,
    allowsDuplicates: false,
    subtypes: [
      {
        value: 'UPSE',
        label: 'UPSE',
        description: 'Universal Problem Solving Engine interview',
        promptFunction: 'generateUPSEPrompt'
      }
    ]
  },
  {
    value: 'Foreign Language',
    label: 'Foreign Language',
    description: 'Language proficiency tests',
    requiresRole: false,
    requiresExperienceLevel: false,
    allowsDuplicates: true,
    subtypes: [
      {
        value: 'English',
        label: 'English Proficiency',
        description: 'English language proficiency test',
        promptFunction: 'generateEnglishProficiencyPrompt'
      },
      {
        value: 'Spanish',
        label: 'Spanish Proficiency',
        description: 'Spanish language proficiency test',
        promptFunction: 'generateSpanishProficiencyPrompt'
      },
      {
        value: 'French',
        label: 'French Proficiency',
        description: 'French language proficiency test',
        promptFunction: 'generateFrenchProficiencyPrompt'
      },
      {
        value: 'German',
        label: 'German Proficiency',
        description: 'German language proficiency test',
        promptFunction: 'generateGermanProficiencyPrompt'
      }
    ]
  }
]

/**
 * Experience levels configuration
 */
export const EXPERIENCE_LEVELS = [
  { value: '0-2 years', label: '0-2 years' },
  { value: '2-5 years', label: '2-5 years' },
  { value: '5+ years', label: '5+ years' }
]

/**
 * Get all available interview types
 */
export function getAvailableInterviewTypes(): Array<{ value: string; label: string }> {
  return INTERVIEW_TYPES.map(type => ({
    value: type.value,
    label: type.label
  }))
}

/**
 * Get subtypes for a specific interview type
 */
export function getInterviewSubtypes(interviewType: string): InterviewSubtypeConfig[] {
  const typeConfig = INTERVIEW_TYPES.find(type => type.value === interviewType)
  return typeConfig?.subtypes || []
}

/**
 * Get available roles (technical subtypes)
 */
export function getAvailableRoles(): Array<{ value: string; label: string }> {
  const technicalType = INTERVIEW_TYPES.find(type => type.value === 'Technical')
  return technicalType?.subtypes?.map(subtype => ({
    value: subtype.value,
    label: subtype.label
  })) || []
}

/**
 * Get available experience levels
 */
export function getAvailableLevels(): Array<{ value: string; label: string }> {
  return EXPERIENCE_LEVELS
}

/**
 * Get HR interview subtypes
 */
export function getHRInterviewSubTypes(): Array<{ value: string; label: string }> {
  const hrType = INTERVIEW_TYPES.find(type => type.value === 'HR')
  return hrType?.subtypes?.map(subtype => ({
    value: subtype.value,
    label: subtype.label
  })) || []
}

/**
 * Get General interview subtypes
 */
export function getGeneralInterviewSubTypes(): Array<{ value: string; label: string }> {
  const generalType = INTERVIEW_TYPES.find(type => type.value === 'General')
  return generalType?.subtypes?.map(subtype => ({
    value: subtype.value,
    label: subtype.label
  })) || []
}

/**
 * Get Foreign Language interview subtypes
 */
export function getForeignLanguageSubTypes(): Array<{ value: string; label: string }> {
  const foreignLanguageType = INTERVIEW_TYPES.find(type => type.value === 'Foreign Language')
  return foreignLanguageType?.subtypes?.map(subtype => ({
    value: subtype.value,
    label: subtype.label
  })) || []
}

/**
 * Check if an interview type should prevent duplicates
 */
export function shouldPreventDuplicate(interviewType: string): boolean {
  const typeConfig = INTERVIEW_TYPES.find(type => type.value === interviewType)
  return typeConfig?.allowsDuplicates === false
}

/**
 * Get interview type configuration by value
 */
export function getInterviewTypeConfig(interviewType: string): InterviewTypeConfig | undefined {
  return INTERVIEW_TYPES.find(type => type.value === interviewType)
}

/**
 * Get subtype configuration by interview type and subtype value
 */
export function getSubtypeConfig(interviewType: string, subtypeValue: string): InterviewSubtypeConfig | undefined {
  const typeConfig = getInterviewTypeConfig(interviewType)
  return typeConfig?.subtypes?.find(subtype => subtype.value === subtypeValue)
}
