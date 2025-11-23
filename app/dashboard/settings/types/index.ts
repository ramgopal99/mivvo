export interface UserData {
  id: string
  name: string | null
  email: string | null
  role?: string | null
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

export interface CollegeData {
  id: string
  collegeId: string
  name: string
  description: string | null
  location: string | null
  website: string | null
  phone: string | null
  establishedYear: number | null
  isActive: boolean
  maxStudents: number
  currentStudents: number
  monthlyRatePerUser: number
  billingCycle: string
  nextBillingDate: Date | null
  lastBillingAmount: number
  createdAt: Date
  updatedAt: Date
  users: Array<{
    id: string
    name: string | null
    email: string | null
    role: string
  }>
}

export interface ServerActionResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
} 