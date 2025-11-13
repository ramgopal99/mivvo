/**
 * Interview Title Utilities
 *
 * Provides utility functions for generating proper interview titles
 * based on interview type and role/subtype.
 */

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

  if (interviewType === "General") {
    return "General Interview"
  }

  if (interviewType === "HR") {
    return "HR Interview"
  }

  return `${interviewType} Interview`
}

/**
 * Gets the proper title for technical roles
 */
function getTechnicalRoleTitle(role: string): string {
  const roleMap: { [key: string]: string } = {
    "python-developer": "Python Developer Interview",
    "nodejs-developer": "Node.js Developer Interview",
    "frontend-developer": "Frontend Developer Interview",
    "backend-developer": "Backend Developer Interview",
    "fullstack-developer": "Full Stack Developer Interview",
    "react-developer": "React Developer Interview",
    "data-scientist": "Data Scientist Interview",
    "devops-engineer": "DevOps Engineer Interview",
    "mobile-developer": "Mobile Developer Interview",
    "software-engineer": "Software Engineer Interview",
    "ui-ux-designer": "UI/UX Designer Interview",
    "product-manager": "Product Manager Interview",
    "business-analyst": "Business Analyst Interview",
    "qa-engineer": "QA Engineer Interview",
    "system-administrator": "System Administrator Interview"
  }

  return roleMap[role] || `${role.charAt(0).toUpperCase() + role.slice(1).replace(/-/g, ' ')} Interview`
}

/**
 * Gets the proper title for general interview subtypes
 */
function getGeneralSubtypeTitle(subtype: string): string {
  const subtypeMap: { [key: string]: string } = {
    "UPSE": "UPSE Interview",
    "Banking": "Banking Interview"
  }

  return subtypeMap[subtype] || "General Interview"
}

/**
 * Gets the proper title for HR interview subtypes
 */
function getHRSubtypeTitle(subtype: string): string {
  const subtypeMap: { [key: string]: string } = {
    "Behavioral": "Behavioral Interview",
    "Situational": "Situational Interview",
    "Competency": "Competency-Based Interview",
    "Leadership": "Leadership Interview",
    "Cultural": "Cultural Fit Interview"
  }

  return subtypeMap[subtype] || "HR Interview"
}

/**
 * Gets all available technical roles with their display titles
 */
export function getTechnicalRoles(): { value: string; label: string; title: string }[] {
  return [
    { value: "python-developer", label: "Python Developer", title: "Python Developer Interview" },
    { value: "nodejs-developer", label: "Node.js Developer", title: "Node.js Developer Interview" },
    { value: "frontend-developer", label: "Frontend Developer", title: "Frontend Developer Interview" },
    { value: "backend-developer", label: "Backend Developer", title: "Backend Developer Interview" },
    { value: "fullstack-developer", label: "Full Stack Developer", title: "Full Stack Developer Interview" },
    { value: "react-developer", label: "React Developer", title: "React Developer Interview" },
    { value: "data-scientist", label: "Data Scientist", title: "Data Scientist Interview" },
    { value: "devops-engineer", label: "DevOps Engineer", title: "DevOps Engineer Interview" },
    { value: "mobile-developer", label: "Mobile Developer", title: "Mobile Developer Interview" },
    { value: "software-engineer", label: "Software Engineer", title: "Software Engineer Interview" },
    { value: "ui-ux-designer", label: "UI/UX Designer", title: "UI/UX Designer Interview" },
    { value: "product-manager", label: "Product Manager", title: "Product Manager Interview" },
    { value: "business-analyst", label: "Business Analyst", title: "Business Analyst Interview" },
    { value: "qa-engineer", label: "QA Engineer", title: "QA Engineer Interview" },
    { value: "system-administrator", label: "System Administrator", title: "System Administrator Interview" }
  ]
}

/**
 * Gets all available general subtypes with their display titles
 */
export function getGeneralSubtypes(): { value: string; label: string; title: string }[] {
  return [
    { value: "UPSE", label: "UPSE", title: "UPSE Interview" },
    { value: "Banking", label: "Banking", title: "Banking Interview" }
  ]
}

/**
 * Gets all available HR subtypes with their display titles
 */
export function getHRSubtypes(): { value: string; label: string; title: string }[] {
  return [
    { value: "Behavioral", label: "Behavioral", title: "Behavioral Interview" },
    { value: "Situational", label: "Situational", title: "Situational Interview" },
    { value: "Competency", label: "Competency-Based", title: "Competency-Based Interview" },
    { value: "Leadership", label: "Leadership", title: "Leadership Interview" },
    { value: "Cultural", label: "Cultural Fit", title: "Cultural Fit Interview" }
  ]
}
