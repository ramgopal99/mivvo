/**
 * Interview Creation Utilities
 *
 * Provides utility functions for creating custom interviews
 * including role selection, experience levels, interview types, and JD generation.
 */

/**
 * Gets the available role options for interview creation
 */
export const getAvailableRoles = () => [
  { value: 'frontend-developer', label: 'Frontend Developer' },
  { value: 'backend-developer', label: 'Backend Developer' }
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
  { value: 'General', label: 'General' },
  { value: 'Technical', label: 'Technical' },
  { value: 'Coding', label: 'Coding - Coming Soon', disabled: true },
  { value: 'UI/UX', label: 'UI/UX - Coming Soon', disabled: true },
  { value: 'HR', label: 'HR' }
]

/**
 * Generates a job description based on predefined role and experience level
 * @param role - The role value (e.g., 'frontend-developer')
 * @param level - The experience level (e.g., '2-5 years')
 * @returns A formatted job description string
 */
/**
 * Gets the display title for a role value
 */
const getRoleTitle = (role: string): string => {
  const availableRoles = getAvailableRoles()
  const roleOption = availableRoles.find(r => r.value === role)
  return roleOption?.label || 'Developer'
}

export const generateJDFromPredefined = (role: string, level: string): string => {
  const levelDescriptions: Record<string, string> = {
    '0-2 years': 'junior level',
    '2-5 years': 'mid-level',
    '5+ years': 'senior level'
  }

  const roleTitle = getRoleTitle(role)
  const levelDesc = levelDescriptions[level] || 'professional'

  const frontendResponsibilities = `- Develop responsive and interactive user interfaces using modern frontend technologies
- Implement pixel-perfect designs and ensure cross-browser compatibility
- Optimize frontend performance and user experience
- Collaborate with designers and backend developers
- Write clean, maintainable JavaScript/TypeScript code`

  const backendResponsibilities = `- Design and implement scalable backend services and APIs
- Develop database schemas and optimize query performance
- Implement security best practices and data protection
- Build RESTful APIs and microservices architecture
- Write efficient server-side code and algorithms`

  const responsibilities = role === 'frontend-developer' ? frontendResponsibilities : backendResponsibilities

  return `We are looking for a ${levelDesc} ${roleTitle} to join our team.

Responsibilities:
${responsibilities}
- Participate in code reviews and technical discussions
- Stay updated with industry best practices and emerging technologies

Requirements:
- ${level.split(' ')[0]} years of experience in ${roleTitle} role
- Strong problem-solving and analytical skills
- Excellent communication and teamwork abilities
- Experience with modern development methodologies
- Commitment to writing maintainable and scalable code

What we offer:
- Competitive salary and benefits
- Opportunities for professional growth
- Collaborative and innovative work environment
- Chance to work on challenging and impactful projects`
}
