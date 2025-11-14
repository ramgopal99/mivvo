/**
 * Interview Title Utilities
 *
 * Provides utility functions for generating proper interview titles
 * based on interview type and role/subtype.
 *
 * This file re-exports functions from the centralized interview titles library
 * for backward compatibility and convenience.
 */

export {
  generateInterviewTitle,
  getTechnicalRoleTitle,
  getGeneralSubtypeTitle,
  getHRSubtypeTitle,
  getTechnicalRoles,
  getGeneralSubtypes,
  getHRSubtypes
} from '@/lib/interview-titles'

export type { InterviewTitleOptions } from '@/lib/interview-titles'
