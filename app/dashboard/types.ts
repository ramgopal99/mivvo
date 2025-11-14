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
  totalTimeAllowance: number
  usedTimeMinutes: number
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
}

export interface DashboardData {
  stats: DashboardStats
  recentInterviews: RecentInterview[]
}
