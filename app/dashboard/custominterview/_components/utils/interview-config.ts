/**
 * Interview Configuration
 *
 * ============================================================================
 * SINGLE SOURCE OF TRUTH - All Interview Configurations
 * ============================================================================
 * 
 * This file contains ALL interview-related configurations.
 * Changes made here automatically propagate throughout the entire application.
 * 
 * HOW TO ADD A NEW ROLE/TYPE:
 * ============================
 * 
 * 1. Add the role to INTERVIEW_TYPES array (in the appropriate interview type)
 *    - Set value, label, title, jdTemplate
 * 
 * 2. Register the prompt function in interview-utils.ts
 *    - Add role value to PROMPT_FUNCTION_REGISTRY mapping
 * 
 * ============================================================================
 */

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface InterviewTypeConfig {
  value: string
  label?: string // Optional - derived from value if not provided
  subtypes?: InterviewSubtypeConfig[]
  mappedType?: string
  usesCustomPrompt?: boolean
}

export interface InterviewSubtypeConfig {
  value: string
  label?: string // Optional - derived from value if not provided
  title?: string
  jdTemplate?: string
}

// =============================================================================
// CONFIGURATION DATA
// =============================================================================

/**
 * Interview Types: Technical and Custom
 */
export const INTERVIEW_TYPES: InterviewTypeConfig[] = [
  {
    value: 'Technical',
    mappedType: 'TECHNICAL',
    subtypes: [
      {
        value: 'python-developer',
        title: 'Python Developer Interview',
        jdTemplate: `We are looking for a skilled Python Developer to join our development team. You will be responsible for designing, developing, and maintaining Python-based applications and systems.

Key Responsibilities:
- Design and develop Python applications and scripts
- Work with Django, Flask, or FastAPI frameworks
- Implement data processing and automation solutions
- Build RESTful APIs and web applications
- Collaborate on data analysis and visualization projects
- Optimize Python code performance
- Stay updated with Python ecosystem and best practices

Requirements:
- Proficiency in Python frameworks (Django, Flask, FastAPI)
- Knowledge of RESTful APIs and web development
- Familiarity with database technologies (PostgreSQL, MongoDB)
- Understanding of testing frameworks (pytest, unittest)
- Knowledge of version control and CI/CD pipelines`
      }
    ]
  },
  {
    value: 'Custom',
    mappedType: 'CUSTOM_INTERVIEW',
    usesCustomPrompt: true
  }
]

// Derived from INTERVIEW_TYPES - automatically generated
export const INTERVIEW_TYPE_DEFAULT_TITLES: Record<string, string> = Object.fromEntries(
  INTERVIEW_TYPES.map(type => [type.value, `${type.label || type.value} Interview`])
) as Record<string, string>

// Derived from INTERVIEW_TYPES - automatically generated
export const VALID_MAPPED_TYPES = INTERVIEW_TYPES
  .filter(type => type.mappedType)
  .map(type => type.mappedType!)
  .filter((mappedType): mappedType is string => mappedType !== undefined) as readonly string[]

export type MappedInterviewType = typeof VALID_MAPPED_TYPES[number]

export const COMPANY_NAME_SUFFIXES_TO_REMOVE = [
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

// =============================================================================
// RE-EXPORTS - Functions moved to interview-utils.ts
// =============================================================================

// Re-export all utility functions for backward compatibility
export * from './interview-utils'
