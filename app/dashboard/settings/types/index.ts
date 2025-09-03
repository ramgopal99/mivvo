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
}

export interface ServerActionResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
} 