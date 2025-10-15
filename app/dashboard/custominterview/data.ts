import { InterviewData, InterviewAttempt } from "./_components/InterviewCard"

/**
 * Custom Interview Data Access Layer
 *
 * Provides API functions for managing custom interviews.
 * All functions handle authentication and error cases gracefully.
 */

/**
 * Fetch a specific interview by ID
 * @param id - Interview ID
 * @returns Interview data or null if not found
 */
export const getInterviewById = async (id: string): Promise<InterviewData | null> => {
  try {
    const response = await fetch(`/api/custom-interviews/${id}`)
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
    const response = await fetch('/api/custom-interviews')
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
 * Fetch completed interviews for the current user
 * @returns Array of completed interview data
 */
export const getCompletedInterviews = async (): Promise<InterviewData[]> => {
  try {
    const response = await fetch('/api/custom-interviews?status=completed')
    if (!response.ok) {
      throw new Error('Failed to fetch completed interviews')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching completed interviews:', error)
    return []
  }
}

/**
 * Fetch interviews filtered by status
 * @param status - Interview status to filter by
 * @returns Array of interview data matching the status
 */
export const getInterviewsByStatus = async (status: InterviewData['status']): Promise<InterviewData[]> => {
  try {
    const response = await fetch(`/api/custom-interviews?status=${status}`)
    if (!response.ok) {
      throw new Error('Failed to fetch interviews by status')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching interviews by status:', error)
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
      headers: {
        'Content-Type': 'application/json',
      },
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
 * Fetch a specific attempt by interview ID and attempt ID
 * @param interviewId - Interview ID
 * @param attemptId - Attempt ID
 * @returns Object containing interview and attempt data, or null if not found
 */
export const getAttemptById = async (interviewId: string, attemptId: string): Promise<{ interview: InterviewData; attempt: InterviewAttempt } | null> => {
  try {
    const interview = await getInterviewById(interviewId)
    if (!interview || !interview.attempts) {
      return null
    }

    const attempt = interview.attempts.find(a => a.id === attemptId)
    if (!attempt) {
      return null
    }

    return { interview, attempt }
  } catch (error) {
    console.error('Error fetching attempt:', error)
    return null
  }
}
