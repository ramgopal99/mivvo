"use server"
import { prisma } from "@/lib/prisma"
import { ApiResponse, MockInterview } from "../types"

export async function getMockInterviewById(interviewId: string): Promise<ApiResponse<MockInterview>> {
  try {
    // Fetch the specific mock interview
    const mockInterview = await prisma.mockInterview.findUnique({
      where: { id: interviewId }
    })

    if (!mockInterview) {
      throw new Error("Mock interview not found")
    }

    return {
      success: true,
      data: mockInterview
    }

  } catch (error) {
    console.error("Error fetching mock interview:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch mock interview"
    }
  }
}
