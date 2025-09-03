// Mock Interview Types
export interface MockInterview {
  id: string
  companyName: string | null
  position: string | null
  companyDescription: string | null
  jobDescription: string | null
  interviewType: string | null
  experienceLevel: string | null
  industry: string | null
  difficulty: string | null
  questions?: string[]
  conversations: number
  createdBy: string
  createdAt: Date
  updatedAt: Date

  // VAPI Voice Assistant Integration
  vapiAssistantId?: string | null
  hasVoiceEnabled: boolean
}

// Create Mock Interview Types
export interface CreateMockInterviewData {
  companyName: string | null
  position: string | null
  companyDescription?: string | null
  jobDescription?: string | null
  interviewType: string | null
  experienceLevel: string | null
  industry: string | null
  difficulty: string | null
}

// Generate Interview Content Types
export interface GenerateInterviewContentData {
  companyName: string | null
  position: string | null
  companyDescription?: string | null
  jobDescription?: string | null
  interviewType: string | null
  experienceLevel: string | null
  industry: string | null
  difficulty: string | null
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export type CreateMockInterviewResponse = ApiResponse<MockInterview>
export type GetMockInterviewsResponse = ApiResponse<MockInterview[]>

export interface GenerateInterviewContentResponse {
  success: boolean
  companyDescription?: string
  jobDescription?: string
  questions?: string[]
  usage?: unknown
  error?: string
}

// Optimize Description Types
export interface OptimizeDescriptionData {
  existingText?: string
  category: string
  name: string // Required for description generation
  specialties: string
  personality?: string
}

// Optimize Specialties Types
export interface OptimizeSpecialtiesData {
  category: string
  name?: string // Made optional since it's not always available
  existingText: string
}

// API Response Types for Optimization
export interface OptimizeDescriptionResponse {
  success: boolean
  optimizedText?: string
  usage?: unknown
  error?: string
}

export interface OptimizeSpecialtiesResponse {
  success: boolean
  specialties?: string
  usage?: unknown
  error?: string
}

// Generate Name Types
export interface GenerateNameData {
  companyName: string
  position: string
  interviewType: string
  industry: string
}

export interface GenerateNameResponse {
  success: boolean
  name?: string
  usage?: unknown
  error?: string
}