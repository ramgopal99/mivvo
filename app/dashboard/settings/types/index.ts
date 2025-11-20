export interface UserData {
  id: string
  name: string | null
  email: string | null
  image: string | null
  createdAt: Date | null
  firstName: string | null
  lastName: string | null
  phone: string | null
  dateOfBirth: Date | null
  jobTitle: string | null
  company: string | null
  location: string | null
  bio: string | null
  // New SaaS mock interview platform fields
  careerGoals?: string | null
  linkedIn?: string | null
  github?: string | null
  // User type (FREE/PRO)
  userType?: 'FREE' | 'PRO'
  // Credit management fields
  totalCreditAllocation?: number
  usedCredits?: number
  creditResetAt?: Date | null
  // Academic fields for college students
  rollNumber?: string | null
  branch?: string | null
  course?: string | null
  courseDuration?: string | null
  year?: string | null
  // College information for college students
  college?: {
    id: string
    name: string
    collegeId: string
  } | null
}

export interface ServerActionResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
} 