// Dummy data for college dashboard

export interface Student {
  id: string
  name: string
  email: string
  avatar?: string
  enrollmentDate: string
  major: string
  year: string
  gpa: number
  status: 'active' | 'inactive' | 'graduated'
  totalInterviews: number
  completedInterviews: number
  averageScore: number
  totalTimeSpent: number // in minutes
  lastActivity: string
  progress: {
    technicalSkills: number
    communication: number
    problemSolving: number
    overall: number
  }
  recentInterviews: Interview[]
  achievements: Achievement[]
}

export interface Interview {
  id: string
  title: string
  type: 'technical' | 'behavioral' | 'system design' | 'mock'
  score: number
  date: string
  duration: number // in minutes
  feedback: string
  skills: string[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  date: string
  type: 'milestone' | 'improvement' | 'completion'
}

export interface CollegeStats {
  totalStudents: number
  activeStudents: number
  totalInterviews: number
  averageScore: number
  topPerformers: number
  recentActivity: number
}

export const dummyStudents: Student[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@college.edu",
    enrollmentDate: "2023-08-15",
    major: "Computer Science",
    year: "Junior",
    gpa: 3.8,
    status: "active",
    totalInterviews: 15,
    completedInterviews: 12,
    averageScore: 85,
    totalTimeSpent: 480,
    lastActivity: "2024-01-15",
    progress: {
      technicalSkills: 88,
      communication: 82,
      problemSolving: 90,
      overall: 87
    },
    recentInterviews: [
      {
        id: "i1",
        title: "Frontend Developer Interview",
        type: "technical",
        score: 92,
        date: "2024-01-10",
        duration: 45,
        feedback: "Excellent React knowledge and problem-solving skills",
        skills: ["React", "JavaScript", "CSS"]
      },
      {
        id: "i2",
        title: "Behavioral Interview",
        type: "behavioral",
        score: 88,
        date: "2024-01-08",
        duration: 30,
        feedback: "Strong communication skills, could improve on leadership examples",
        skills: ["Communication", "Teamwork"]
      }
    ],
    achievements: [
      {
        id: "a1",
        title: "Interview Master",
        description: "Completed 10 interviews with average score above 85%",
        date: "2024-01-12",
        type: "milestone"
      }
    ]
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.smith@college.edu",
    enrollmentDate: "2023-08-15",
    major: "Software Engineering",
    year: "Senior",
    gpa: 3.6,
    status: "active",
    totalInterviews: 20,
    completedInterviews: 18,
    averageScore: 78,
    totalTimeSpent: 650,
    lastActivity: "2024-01-14",
    progress: {
      technicalSkills: 75,
      communication: 85,
      problemSolving: 80,
      overall: 78
    },
    recentInterviews: [
      {
        id: "i3",
        title: "System Design Interview",
        type: "system design",
        score: 82,
        date: "2024-01-12",
        duration: 60,
        feedback: "Good understanding of scalability concepts",
        skills: ["System Design", "Architecture"]
      }
    ],
    achievements: [
      {
        id: "a2",
        title: "Consistent Performer",
        description: "Completed 15+ interviews consistently",
        date: "2024-01-10",
        type: "completion"
      }
    ]
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol.davis@college.edu",
    enrollmentDate: "2023-08-15",
    major: "Information Technology",
    year: "Junior",
    gpa: 3.9,
    status: "active",
    totalInterviews: 8,
    completedInterviews: 8,
    averageScore: 92,
    totalTimeSpent: 320,
    lastActivity: "2024-01-16",
    progress: {
      technicalSkills: 95,
      communication: 88,
      problemSolving: 92,
      overall: 92
    },
    recentInterviews: [
      {
        id: "i4",
        title: "Full Stack Developer Interview",
        type: "technical",
        score: 95,
        date: "2024-01-14",
        duration: 50,
        feedback: "Outstanding technical skills across the stack",
        skills: ["Node.js", "React", "Database"]
      }
    ],
    achievements: [
      {
        id: "a3",
        title: "Top Performer",
        description: "Achieved 95%+ in 5 consecutive interviews",
        date: "2024-01-15",
        type: "improvement"
      }
    ]
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.wilson@college.edu",
    enrollmentDate: "2023-08-15",
    major: "Data Science",
    year: "Sophomore",
    gpa: 3.7,
    status: "active",
    totalInterviews: 12,
    completedInterviews: 10,
    averageScore: 82,
    totalTimeSpent: 400,
    lastActivity: "2024-01-13",
    progress: {
      technicalSkills: 85,
      communication: 78,
      problemSolving: 88,
      overall: 82
    },
    recentInterviews: [
      {
        id: "i5",
        title: "Data Analyst Interview",
        type: "technical",
        score: 85,
        date: "2024-01-11",
        duration: 40,
        feedback: "Strong analytical skills and SQL knowledge",
        skills: ["SQL", "Python", "Data Analysis"]
      }
    ],
    achievements: [
      {
        id: "a4",
        title: "Rising Star",
        description: "Improved average score by 15% in 3 months",
        date: "2024-01-08",
        type: "improvement"
      }
    ]
  },
  {
    id: "5",
    name: "Eva Martinez",
    email: "eva.martinez@college.edu",
    enrollmentDate: "2023-08-15",
    major: "Cybersecurity",
    year: "Senior",
    gpa: 3.5,
    status: "active",
    totalInterviews: 18,
    completedInterviews: 16,
    averageScore: 76,
    totalTimeSpent: 580,
    lastActivity: "2024-01-12",
    progress: {
      technicalSkills: 80,
      communication: 70,
      problemSolving: 85,
      overall: 76
    },
    recentInterviews: [
      {
        id: "i6",
        title: "Security Interview",
        type: "technical",
        score: 78,
        date: "2024-01-10",
        duration: 45,
        feedback: "Good security knowledge, needs more practical examples",
        skills: ["Security", "Networking"]
      }
    ],
    achievements: [
      {
        id: "a5",
        title: "Dedicated Learner",
        description: "Completed 15 interviews in 6 months",
        date: "2024-01-05",
        type: "completion"
      }
    ]
  }
]

export const collegeStats: CollegeStats = {
  totalStudents: 245,
  activeStudents: 198,
  totalInterviews: 1250,
  averageScore: 81.5,
  topPerformers: 45,
  recentActivity: 89
}

export const interviewTypes = [
  { type: 'technical', count: 680, label: 'Technical' },
  { type: 'behavioral', count: 320, label: 'Behavioral' },
  { type: 'system design', count: 180, label: 'System Design' },
  { type: 'mock', count: 70, label: 'Mock Interviews' }
]

export const performanceData = [
  { month: 'Aug', averageScore: 75, interviews: 45 },
  { month: 'Sep', averageScore: 78, interviews: 62 },
  { month: 'Oct', averageScore: 80, interviews: 58 },
  { month: 'Nov', averageScore: 82, interviews: 71 },
  { month: 'Dec', averageScore: 85, interviews: 89 },
  { month: 'Jan', averageScore: 81.5, interviews: 95 }
]
