"use client"

import { useState, useEffect, use } from "react"
import { LoadingCompound } from "@/components/loading-compound"
import { MeetRoom } from "@/components/meet/core/meet-room"
import { MeetRoomProvider } from "@/components/providers/meet-room-provider"
// Removed SessionProviderWrapper import
import type { MockInterview } from "../types"
import { MockInterviewVoiceChatCompound } from "./components/mock-interview-voice-chat-compound"

interface AIAssistant {
  id: string
  name: string
  avatar?: string
  role: string
  industry: string
  experienceLevel: string
  hasVoiceEnabled?: boolean
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

  // Prepare interview data - map MockInterview to AIAssistant interface for MeetRoomProvider
  const interviewData: AIAssistant = {
    id: mockInterview.id,
    name: mockInterview.position || "Interview Position",
    role: "interviewer",
    industry: mockInterview.industry || "Technology",
    experienceLevel: mockInterview.experienceLevel || "Mid-level",
    hasVoiceEnabled: mockInterview.hasVoiceEnabled,
    avatar: undefined
  }

  return (
    <MeetRoomProvider
      assistantId={resolvedParams.interviewid}
      meetingType="interview"
      assistantData={interviewData}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <MeetRoom voiceChatComponent={MockInterviewVoiceChatCompound as any} />
    </MeetRoomProvider>
  )
}
