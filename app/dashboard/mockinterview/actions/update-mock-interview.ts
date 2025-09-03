"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { CreateMockInterviewData, ApiResponse, MockInterview } from "../types"

export async function updateMockInterview(
  interviewId: string,
  data: Partial<CreateMockInterviewData>
): Promise<ApiResponse<MockInterview>> {
  try {
    // Find the interview
    const existingInterview = await prisma.mockInterview.findUnique({
      where: { id: interviewId }
    })

    if (!existingInterview) {
      throw new Error("Mock interview not found")
    }

    // Validate required fields if they're being updated
    if (data.companyName !== undefined && !data.companyName?.trim()) {
      throw new Error("Company name cannot be empty")
    }

    if (data.position !== undefined && !data.position?.trim()) {
      throw new Error("Position cannot be empty")
    }

    if (data.interviewType !== undefined && !data.interviewType?.trim()) {
      throw new Error("Interview type cannot be empty")
    }

    if (data.experienceLevel !== undefined && !data.experienceLevel?.trim()) {
      throw new Error("Experience level cannot be empty")
    }

    if (data.industry !== undefined && !data.industry?.trim()) {
      throw new Error("Industry cannot be empty")
    }

    // Update the mock interview
    const updatedInterview = await prisma.mockInterview.update({
      where: { id: interviewId },
      data: {
        ...(data.companyName !== undefined && { companyName: data.companyName?.trim() || null }),
        ...(data.position !== undefined && { position: data.position?.trim() || null }),
        ...(data.companyDescription !== undefined && { companyDescription: data.companyDescription?.trim() || null }),
        ...(data.jobDescription !== undefined && { jobDescription: data.jobDescription?.trim() || null }),
        ...(data.interviewType !== undefined && { interviewType: data.interviewType?.trim() || null }),
        ...(data.experienceLevel !== undefined && { experienceLevel: data.experienceLevel?.trim() || null }),
        ...(data.industry !== undefined && { industry: data.industry?.trim() || null }),
        ...(data.difficulty !== undefined && { difficulty: data.difficulty?.trim() || null }),
      }
    })

    // Revalidate the mock interview page
    revalidatePath("/dashboard/mockinterview")

    return {
      success: true,
      data: updatedInterview
    }

  } catch (error) {
    console.error("Error updating mock interview:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update mock interview"
    }
  }
}
