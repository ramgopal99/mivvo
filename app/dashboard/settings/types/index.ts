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
  // Time management fields
  totalTimeAllowance?: number
  usedTimeMinutes?: number
  timeAllowanceResetAt?: Date | null
}

export interface ServerActionResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
} 