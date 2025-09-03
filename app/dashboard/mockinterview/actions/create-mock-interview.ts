"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { CreateMockInterviewData, CreateMockInterviewResponse } from "../types"
import { createVapiMockInterviewInternal } from "./create-vapi-interview"

export async function createMockInterview(data: CreateMockInterviewData): Promise<CreateMockInterviewResponse> {
  try {
    // Use a default user for anonymous access
    let user = await prisma.user.findFirst({
      where: { email: "default@example.com" }
    })

    // Create default user if it doesn't exist
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "Default User",
          email: "default@example.com"
        }
      })
    }

    // Validate required fields
    if (!data.companyName?.trim()) {
      throw new Error("Company name is required")
    }

    if (!data.position?.trim()) {
      throw new Error("Position is required")
    }

    if (!data.interviewType?.trim()) {
      throw new Error("Interview type is required")
    }

    if (!data.experienceLevel?.trim()) {
      throw new Error("Experience level is required")
    }

    if (!data.industry?.trim()) {
      throw new Error("Industry is required")
    }

    if (!data.difficulty?.trim()) {
      throw new Error("Difficulty is required")
    }

    // Create the mock interview
    const mockInterview = await prisma.mockInterview.create({
      data: {
        companyName: data.companyName?.trim() || null,
        position: data.position?.trim() || null,
        companyDescription: data.companyDescription?.trim() || null,
        jobDescription: data.jobDescription?.trim() || null,
        interviewType: data.interviewType?.trim() || null,
        experienceLevel: data.experienceLevel?.trim() || null,
        industry: data.industry?.trim() || null,
        difficulty: data.difficulty?.trim() || null,
        createdBy: user.id,
      }
    })

    // Automatically create VAPI voice assistant with Rohan voice
    try {
      const vapiResult = await createVapiMockInterviewInternal({
        mockInterviewId: mockInterview.id,
        voiceId: "Rohan",
        voiceProvider: "vapi",
        customInstructions: `You are conducting a ${data.interviewType} interview for the position of ${data.position} at ${data.companyName}. Be professional, ask relevant questions, and provide constructive feedback.`
      })

      if (vapiResult.success && vapiResult.assistantId) {
        // Update the mock interview with the VAPI assistant ID
        await prisma.mockInterview.update({
          where: { id: mockInterview.id },
          data: {
            vapiAssistantId: vapiResult.assistantId,
            hasVoiceEnabled: true
          }
        })
        console.log(`VAPI voice assistant created successfully for ${mockInterview.companyName} interview with ID: ${vapiResult.assistantId}`)
      } else {
        console.warn(`Failed to create VAPI voice assistant: ${vapiResult.error}`)
        // Don't fail the entire creation if VAPI fails
      }
    } catch (vapiError) {
      console.warn("Error creating VAPI voice assistant:", vapiError)
      // Don't fail the entire creation if VAPI fails
    }

    // Revalidate the mock interview page to show the new interview
    revalidatePath("/dashboard/mockinterview")

    return {
      success: true,
      data: mockInterview
    }

  } catch (error) {
    console.error("Error creating mock interview:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create mock interview"
    }
  }
}
