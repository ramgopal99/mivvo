// =============================================================================
// TYPES FOR DASHBOARD
// =============================================================================

export interface UserData {
  id: string
  name: string
  email: string
  role?: string
  college?: {
    id: string
    name: string
    collegeId: string
  }
}

export interface TimeData {
  totalCreditAllocation: number
  usedCredits: number
}

export interface SessionUser {
  id?: string
  name?: string | null
  email?: string | null
  image?: string | null
}

export interface SessionData {
  user?: SessionUser | null
}

export interface DashboardStats {
  totalInterviews: number
  totalTimeSpent: number
  averageScore: number
  enrolledCourses: number
}

export interface RecentInterview {
  id: string
  title: string
  type: string
  status: "IN_PROGRESS" | "COMPLETED"
  score: number | undefined
  duration: number
  createdAt: Date
  companyName: string | undefined
  position: string | undefined
  hasAttempts: boolean
}

export interface RecentCourse {
  id: string
  courseId: string
  displayName: string
  headerTitle: string | null
  completionPercentage: number
  completedModules: number
  totalModules: number
  lastAccessed: Date
}

export interface DashboardData {
  stats: DashboardStats
  recentInterviews: RecentInterview[]
  recentCourses: RecentCourse[]
}
