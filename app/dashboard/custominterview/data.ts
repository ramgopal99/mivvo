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

/**
 * Generate dummy interview attempts for testing
 * @param interviewId - Interview ID
 * @returns Array of dummy interview attempts
 */
export const generateDummyAttempts = (interviewId: string): InterviewAttempt[] => {
  const attempts: InterviewAttempt[] = [
    {
      id: `${interviewId}-attempt-1`,
      completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      score: 85,
      duration: 45,
      feedback: "Strong technical knowledge demonstrated with excellent problem-solving skills. Good communication throughout the interview. Areas for improvement include more detailed explanations of complex algorithms and better time management during coding challenges.",
      strengths: [
        "Excellent problem-solving approach",
        "Strong technical fundamentals",
        "Clear communication skills",
        "Good code structure and readability",
        "Demonstrated understanding of data structures"
      ],
      weaknesses: [
        "Could provide more detailed algorithm explanations",
        "Time management during complex problems",
        "Limited discussion of edge cases",
        "Could ask more clarifying questions"
      ],
      recommendations: [
        "Practice explaining algorithms step-by-step",
        "Work on time management strategies",
        "Study common edge cases for data structure problems",
        "Practice asking clarifying questions before coding"
      ]
    },
    {
      id: `${interviewId}-attempt-2`,
      completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      score: 72,
      duration: 38,
      feedback: "Good understanding of basic concepts but struggled with advanced topics. Communication was clear but could be more structured. Showed improvement in problem-solving approach compared to previous attempts.",
      strengths: [
        "Solid understanding of basic programming concepts",
        "Improved problem-solving approach",
        "Good code organization",
        "Willing to ask for help when stuck"
      ],
      weaknesses: [
        "Difficulty with advanced algorithms",
        "Limited knowledge of optimization techniques",
        "Inconsistent code quality",
        "Could improve debugging skills"
      ],
      recommendations: [
        "Focus on advanced algorithm study",
        "Practice optimization techniques",
        "Work on consistent coding standards",
        "Improve debugging and testing skills"
      ]
    },
    {
      id: `${interviewId}-attempt-3`,
      completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      score: 91,
      duration: 52,
      feedback: "Outstanding performance with excellent technical depth and communication. Demonstrated mastery of complex algorithms and provided insightful solutions. Strong problem-solving methodology and clear explanations throughout.",
      strengths: [
        "Exceptional technical knowledge",
        "Outstanding problem-solving skills",
        "Excellent communication and explanation",
        "Strong understanding of system design",
        "Great attention to edge cases",
        "Efficient and optimized solutions"
      ],
      weaknesses: [
        "Minor time management on one complex problem",
        "Could have discussed alternative approaches more"
      ],
      recommendations: [
        "Continue practicing advanced algorithms",
        "Work on discussing multiple solution approaches",
        "Practice system design concepts"
      ]
    }
  ]

  return attempts
}

/**
 * Get interview with dummy attempts for testing
 * @param interviewId - Interview ID
 * @returns Interview data with dummy attempts
 */
export const getInterviewWithDummyAttempts = async (interviewId: string): Promise<InterviewData | null> => {
  try {
    const interview = await getInterviewById(interviewId)
    if (!interview) {
      return null
    }

    // Add dummy attempts if none exist
    if (!interview.attempts || interview.attempts.length === 0) {
      interview.attempts = generateDummyAttempts(interviewId)
      interview.status = "completed" // Mark as completed since we have attempts
    }

    return interview
  } catch (error) {
    console.error('Error fetching interview with dummy attempts:', error)
    return null
  }
}