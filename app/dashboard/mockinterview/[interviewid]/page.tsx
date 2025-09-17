"use client"

import { useState, useEffect, use } from "react"
import { LoadingCompound } from "@/components/loading-compound"
import { MeetRoom } from "@/components/meet/core/meet-room"
import { MeetRoomProvider } from "@/components/providers/meet-room-provider"
// Removed SessionProviderWrapper import
import type { MockInterview } from "../types"
import { MockInterviewVoiceChatCompound } from "./components/mock-interview-voice-chat-compound"

// Local type definition for interview assistant data
// This matches RoleAssistant interface with additional properties for AIAssistant
interface InterviewAssistant {
  id: string
  name: string
  category: string
  description: string
  specialties: string
  personality: string
  conversations: number
  createdBy: string
  createdAt: Date
  updatedAt: Date
  avatar?: string | undefined
  vapiAssistantId?: string | null
  hasVoiceEnabled: boolean
  // Required for AIAssistant interface in MeetRoomProvider
  role: string
  industry: string
  experienceLevel: string
  // Index signature to match VoiceEnabledAssistant
  [key: string]: unknown
}


export default function MockInterviewSessionPage({ params }: { params: Promise<{ interviewid: string }> }) {
  const resolvedParams = use(params)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mockInterview, setMockInterview] = useState<MockInterview | null>(null)

  useEffect(() => {
    const loadInterview = async () => {
      try {
        // Fetch mock interview data
        const { getMockInterviewById } = await import("../actions")
        const result = await getMockInterviewById(resolvedParams.interviewid)

        if (!result.success || !result.data) {
          throw new Error(result.error || "Mock interview not found")
        }

        setMockInterview(result.data)
        setIsLoading(false)
    } catch (error) {
        console.error("Error loading interview:", error)
        setError(error instanceof Error ? error.message : "Failed to load interview")
      setIsLoading(false)
    }
  }
    loadInterview()
  }, [resolvedParams.interviewid])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <LoadingCompound text="Preparing Interview Session" variant="spinner" size="lg" />
        <p className="text-muted-foreground">Preparing Interview Session...</p>
      </div>
    )
  }

  if (error || !mockInterview) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-destructive">Unable to Start Interview</h2>
          <p className="text-muted-foreground">{error || "Interview not found. Please try again."}</p>
            </div>
      </div>
    )
  }

  // Prepare interview data - map MockInterview to InterviewAssistant interface for voice chat
  const interviewData: InterviewAssistant = {
    id: mockInterview.id,
    name: mockInterview.position || "Interview Position",
    category: mockInterview.interviewType || "General Interview",
    description: `${mockInterview.jobDescription || "Job description not available."}\n\nCompany: ${mockInterview.companyName || "Company not specified"}\nIndustry: ${mockInterview.industry || "Industry not specified"}\nExperience Level: ${mockInterview.experienceLevel || "Level not specified"}`,
    specialties: `Interview Type: ${mockInterview.interviewType || "General"}, Difficulty: ${mockInterview.difficulty || "Not specified"}`,
    personality: "Professional interviewer focused on assessing technical skills and experience",
    conversations: mockInterview.conversations,
    createdBy: mockInterview.createdBy,
    createdAt: mockInterview.createdAt,
    updatedAt: mockInterview.updatedAt,
    avatar: undefined, // MockInterview doesn't have avatar
    vapiAssistantId: mockInterview.vapiAssistantId,
    hasVoiceEnabled: mockInterview.hasVoiceEnabled,
    // Required for AIAssistant interface in MeetRoomProvider
    role: mockInterview.position || "Interview Position",
    industry: mockInterview.industry || "General Industry",
    experienceLevel: mockInterview.experienceLevel || "Mid Level"
  }

  return (
    <MeetRoomProvider
      assistantId={resolvedParams.interviewid}
      meetingType="interview"
      assistantData={interviewData}
    >
      <MeetRoom voiceChatComponent={MockInterviewVoiceChatCompound} />
    </MeetRoomProvider>
  )
}
