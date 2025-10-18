// Dummy data for dashboard components
export const dummyStats = {
  totalInterviews: 12,
  completedInterviews: 8,
  inProgressInterviews: 2,
  totalTimeSpent: 145, // in minutes
  averageScore: 78,
  timeRemaining: 15 // in minutes
}

export const dummyInterviews = [
  {
    id: "interview-1",
    title: "Frontend Developer Interview - Google",
    type: "TECHNICAL",
    status: "COMPLETED" as const,
    score: 85,
    duration: 45,
    createdAt: new Date("2024-01-15"),
    companyName: "Google",
    position: "Frontend Developer"
  },
  {
    id: "interview-2",
    title: "Full Stack Engineer Interview - Meta",
    type: "CODING",
    status: "IN_PROGRESS" as const,
    score: undefined,
    duration: 30,
    createdAt: new Date("2024-01-14"),
    companyName: "Meta",
    position: "Full Stack Engineer"
  },
  {
    id: "interview-3",
    title: "React Developer Interview - Netflix",
    type: "TECHNICAL",
    status: "COMPLETED" as const,
    score: 92,
    duration: 50,
    createdAt: new Date("2024-01-13"),
    companyName: "Netflix",
    position: "React Developer"
  },
  {
    id: "interview-4",
    title: "Senior Developer Interview - Amazon",
    type: "HR_INTERVIEW",
    status: "IN_PROGRESS" as const,
    score: undefined,
    duration: 0,
    createdAt: new Date("2024-01-12"),
    companyName: "Amazon",
    position: "Senior Developer"
  },
]

export const dummyProgress = {
  interviewsCompleted: 8,
  targetInterviews: 15,
  timeSpent: 145, // in minutes
  targetTime: 300, // 5 hours in minutes
  currentStreak: 3,
  bestStreak: 7,
  averageScore: 78,
  improvementRate: 12 // percentage
}
