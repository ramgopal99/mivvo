import { InterviewData } from "./_components/InterviewCard"

/**
 * Custom Interview Data Access Layer
 *
 * Provides API functions for managing custom interviews.
 * All functions handle authentication and error cases gracefully.
 */

/**
 * Get authorization headers for API requests
 * @param includeContentType - Whether to include Content-Type header
 * @returns Headers object with authorization if available
 */
const getAuthHeaders = (includeContentType = true): Record<string, string> => {
  const headers: Record<string, string> = {}

  if (includeContentType) {
    headers['Content-Type'] = 'application/json'
  }

  // Check for NextAuth session token
  const nextAuthToken = localStorage.getItem('next-auth.session-token') ||
                       localStorage.getItem('__Secure-next-auth.session-token')
  if (nextAuthToken) {
    headers['Authorization'] = `Bearer ${nextAuthToken}`
  }

  // Check for JWT tokens (college students/admins) - updated token names
  const jwtToken = localStorage.getItem('token') ||
                  localStorage.getItem('student_token') ||
                  localStorage.getItem('college_token')
  if (jwtToken) {
    headers['Authorization'] = `Bearer ${jwtToken}`
  }

  return headers
}

/**
 * Fetch a specific interview by ID
 * @param id - Interview ID
 * @returns Interview data or null if not found
 */
export const getInterviewById = async (id: string): Promise<InterviewData | null> => {
  try {
    const response = await fetch(`/api/custom-interviews/${id}`, {
      headers: getAuthHeaders()
    })
    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error('Failed to fetch interview')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching interview:', error)
    return null
  }
}

/**
 * Fetch all interviews for the current user
 * @returns Array of interview data
 */
export const getAllInterviews = async (): Promise<InterviewData[]> => {
  try {
    const response = await fetch('/api/custom-interviews', {
      headers: getAuthHeaders()
    })
    if (!response.ok) {
      throw new Error('Failed to fetch interviews')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching interviews:', error)
    return []
  }
}

/**
 * Update an interview with partial data
 * @param id - Interview ID to update
 * @param updates - Partial interview data to update
 * @returns Updated interview data or null if not found
 */
export const updateInterview = async (
  id: string,
  updates: Partial<Pick<InterviewData, 'title' | 'company' | 'jd' | 'status'>>
): Promise<InterviewData | null> => {
  try {
    const response = await fetch(`/api/custom-interviews/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(true), // Content-Type needed for PUT with body
      body: JSON.stringify(updates),
    })
    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error('Failed to update interview')
    }
    return await response.json()
  } catch (error) {
    console.error('Error updating interview:', error)
    return null
  }
}

/**
 * Delete an interview by ID
 * @param id - Interview ID to delete
 * @returns True if deleted successfully, false otherwise
 */
export const deleteInterview = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/custom-interviews/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
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

/**
 * Fetch detailed attempt data by interview ID and attempt ID
 * @param interviewId - Interview ID
 * @param attemptId - Attempt ID
 * @returns Detailed attempt data with results and conversations
 */
export const getAttemptDetails = async (interviewId: string, attemptId: string): Promise<{
  id: string;
  startedAt: string | null;
  completedAt: string | null;
  duration: number | null;
  status: string | null;
  createdAt: string;
  interview: Record<string, unknown>;
  results: Record<string, unknown>[];
  conversations: Record<string, unknown>[];
} | null> => {
  try {
    console.log('Fetching detailed attempt data:', { interviewId, attemptId })

    const response = await fetch(`/api/custom-interviews/${interviewId}/attempt/${attemptId}`, {
      headers: getAuthHeaders(false)
    })

    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error('Failed to fetch attempt details')
    }

    const attemptData = await response.json()
    return attemptData
  } catch (error) {
    console.error('Error fetching attempt details:', error)
    return null
  }
}