/**
 * Custom Interview Actions
 *
 * Server actions and API call utilities for custom interviews
 */

import { InterviewData } from './_components/InterviewCard'

// Helper function to get authentication headers
const getAuthHeaders = (includeContentType = true): Record<string, string> => {
  const headers: Record<string, string> = {}

  if (includeContentType) {
    headers['Content-Type'] = 'application/json'
  }

  // Check for NextAuth session token
  const nextAuthToken = typeof window !== 'undefined' ? (
    localStorage.getItem('next-auth.session-token') ||
    localStorage.getItem('__Secure-next-auth.session-token')
  ) : null
  if (nextAuthToken) {
    headers['Authorization'] = `Bearer ${nextAuthToken}`
  }

  // Check for JWT tokens (college students/admins) - updated token names
  const jwtToken = typeof window !== 'undefined' ? (
    localStorage.getItem('token') ||
    localStorage.getItem('student_token') ||
    localStorage.getItem('college_token')
  ) : null
  if (jwtToken) {
    headers['Authorization'] = `Bearer ${jwtToken}`
  }

  return headers
}

// Extended interface for API response data
interface ExtendedInterviewData extends InterviewData {
  interviewType?: string
}

/**
 * Fetch interview data by ID
 * @param interviewId - The interview ID to fetch
 * @returns Promise<ExtendedInterviewData | null>
 */
export async function fetchInterviewById(interviewId: string): Promise<ExtendedInterviewData | null> {
  try {
    console.log('Fetching interview with ID:', interviewId)

    const response = await fetch(`/api/custom-interviews/${interviewId}`, {
      headers: getAuthHeaders(false) // No content-type for GET requests
    })
    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error('Failed to fetch interview')
    }

    const interviewData = await response.json()
    return interviewData
  } catch (error) {
    console.error('Error fetching interview:', error)
    throw error
  }
}

/**
 * Create a new custom interview
 * @param interviewData - The interview data to create
 * @returns Promise<ExtendedInterviewData | null>
 */
export async function createInterview(interviewData: {
  jdDetails: string
  interviewType: string
  screenShare?: boolean
  company?: string
}): Promise<ExtendedInterviewData | null> {
  try {
    console.log('Creating new interview')

    const response = await fetch('/api/custom-interviews', {
      method: 'POST',
      headers: getAuthHeaders(true),
      body: JSON.stringify(interviewData),
    })

    if (!response.ok) {
      throw new Error('Failed to create interview')
    }

    const createdInterview = await response.json()
    return createdInterview
  } catch (error) {
    console.error('Error creating interview:', error)
    throw error
  }
}

/**
 * Update an interview with partial data
 * @param id - Interview ID to update
 * @param updates - Partial interview data to update
 * @returns Promise<ExtendedInterviewData | null>
 */
export async function updateInterview(
  id: string,
  updates: Partial<Pick<ExtendedInterviewData, 'title' | 'company' | 'jd' | 'status'>>
): Promise<ExtendedInterviewData | null> {
  try {
    console.log('Updating interview:', id)

    const response = await fetch(`/api/custom-interviews/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(true),
      body: JSON.stringify(updates),
    })

    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error('Failed to update interview')
    }

    const updatedInterview = await response.json()
    return updatedInterview
  } catch (error) {
    console.error('Error updating interview:', error)
    throw error
  }
}

/**
 * Delete an interview by ID
 * @param id - Interview ID to delete
 * @returns Promise<boolean>
 */
export async function deleteInterview(id: string): Promise<boolean> {
  try {
    console.log('Deleting interview:', id)

    const response = await fetch(`/api/custom-interviews/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(false) // No content-type for DELETE requests
    })

    if (!response.ok) {
      if (response.status === 404) return false
      throw new Error('Failed to delete interview')
    }

    return true
  } catch (error) {
    console.error('Error deleting interview:', error)
    return false
  }
}
