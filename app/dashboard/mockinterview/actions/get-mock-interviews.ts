"use server"
import { prisma } from "@/lib/prisma"
import { GetMockInterviewsResponse } from "../types"

export async function getMockInterviews(): Promise<GetMockInterviewsResponse> {
  try {
    // Fetch all mock interviews
    const mockInterviews = await prisma.mockInterview.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Ensure all nullable fields are never undefined (convert null to empty string for display)
    const sanitizedMockInterviews = mockInterviews.map(interview => ({
      ...interview,
      companyName: interview.companyName || "",
      position: interview.position || "",
      companyDescription: interview.companyDescription || "",
      jobDescription: interview.jobDescription || "",
      interviewType: interview.interviewType || "",
      experienceLevel: interview.experienceLevel || "",
      industry: interview.industry || "",
      difficulty: interview.difficulty || ""
    }))

    return {
      success: true,
      data: sanitizedMockInterviews
    }

  } catch (error) {
    console.error("Error fetching mock interviews:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch mock interviews",
      data: []
    }
  }
}
