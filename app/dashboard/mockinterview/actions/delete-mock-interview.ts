"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { ApiResponse } from "../types"

export async function deleteMockInterview(interviewId: string): Promise<ApiResponse<boolean>> {
  try {
    // Find the interview
    const interview = await prisma.mockInterview.findUnique({
      where: { id: interviewId }
    })

    if (!interview) {
      throw new Error("Mock interview not found")
    }

    // Delete the mock interview
    await prisma.mockInterview.delete({
      where: { id: interviewId }
    })

    // Revalidate the mock interview page
    revalidatePath("/dashboard/mockinterview")

    return {
      success: true,
      data: true
    }

  } catch (error) {
    console.error("Error deleting mock interview:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete mock interview"
    }
  }
}
