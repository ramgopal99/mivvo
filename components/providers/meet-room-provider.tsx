"use client"

import { createContext, useContext, useEffect, useState } from "react"

interface AIAssistant {
  id: string
  name: string
  avatar?: string
  role: string
  industry: string
  experienceLevel: string
  hasVoiceEnabled?: boolean
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export type MeetingType = 'interview' | 'role-based'

interface BaseSession {
  id: string
  assistantId: string
  assistantName: string
  title: string
  date: string
  duration: number
  status: 'in-progress' | 'completed'
}

interface InterviewSession extends BaseSession {
  type: 'interview'
  score?: number
}

interface RoleSession extends BaseSession {
  type: 'role-based'
  category: string
  specialties: string[] | string
}

type Session = InterviewSession | RoleSession

interface MeetRoomContextType {
  assistant: AIAssistant | null
  session: Session | null
  messages: Message[]
  isAudioEnabled: boolean
  isVideoEnabled: boolean
  isChatOpen: boolean
  meetingType: MeetingType
  toggleAudio: () => void
  toggleVideo: () => void
  toggleChat: () => void
  sendMessage: (content: string) => void
  addVoiceMessage: (role: 'user' | 'assistant', text: string) => void
  endSession: () => void
}

const MeetRoomContext = createContext<MeetRoomContextType | null>(null)

export function useMeetRoom() {
  const context = useContext(MeetRoomContext)
  if (!context) {
    throw new Error("useMeetRoom must be used within MeetRoomProvider")
  }
  return context
}

interface MeetRoomProviderProps {
  children: React.ReactNode
  assistantId: string
  meetingType: MeetingType
  assistantData?: AIAssistant | null
}

export function MeetRoomProvider({ children, meetingType, assistantData }: MeetRoomProviderProps) {
  const [assistant, setAssistant] = useState<AIAssistant | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(false)

  // Load assistant data based on meeting type
  useEffect(() => {
    // Only use provided assistantData
    if (assistantData) {
      setAssistant(assistantData)
    }
  }, [assistantData])

  // Create session when assistant is loaded
  useEffect(() => {
    if (assistant) {
      if (meetingType === 'interview') {
        // Check if it's a MockInterview or AIAssistant
        if ('interviewType' in assistant && 'role' in assistant) {
          // It's a MockInterview
          const mockInterview = assistant as AIAssistant
          const newSession: InterviewSession = {
            id: `mock-interview-${Date.now()}`,
            assistantId: mockInterview.id,
            assistantName: mockInterview.name,
            title: `Mock Interview with ${mockInterview.name}`,
            date: new Date().toISOString(),
            duration: 30,
            status: 'in-progress',
            type: 'interview'
          }
          setSession(newSession)
        } else {
          // It's an AIAssistant
          const interviewAssistant = assistant as AIAssistant
          const newSession: InterviewSession = {
            id: `interview-${Date.now()}`,
            assistantId: interviewAssistant.id,
            assistantName: interviewAssistant.name,
            title: `Interview with ${interviewAssistant.name}`,
            date: new Date().toISOString(),
            duration: 30,
            status: 'in-progress',
            type: 'interview'
          }
          setSession(newSession)
        }

        // Start with empty messages
        setMessages([])
      } else {
        // Type assertion for role-based assistant
        const roleAssistant = assistant as AIAssistant & {
          category: string
          specialties: string | string[]
        }
        const newSession: RoleSession = {
          id: `role-session-${Date.now()}`,
          assistantId: roleAssistant.id,
          assistantName: roleAssistant.name,
          title: `Role Session with ${roleAssistant.name}`,
          date: new Date().toISOString(),
          duration: 45,
          status: 'in-progress',
          type: 'role-based',
          category: roleAssistant.category,
          specialties: typeof roleAssistant.specialties === 'string'
            ? roleAssistant.specialties.split(',').map((s: string) => s.trim())
            : roleAssistant.specialties
        }
        setSession(newSession)

        // Start with empty messages
        setMessages([])
      }
    }
  }, [assistant, meetingType])

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled)
  }

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled)
  }

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  const sendMessage = (content: string) => {
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    }
    setMessages(prev => [...prev, userMessage])
    
    // No simulated AI response - only real voice chat or actual AI responses
  }

  const addVoiceMessage = (role: 'user' | 'assistant', text: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      role,
      content: text,
      timestamp: new Date().toISOString()
    }
    setMessages(prev => [...prev, newMessage])
  }

  const endSession = () => {
    if (session) {
      const updatedSession: Session = {
        ...session,
        status: 'completed',
        duration: Math.floor((Date.now() - new Date(session.date).getTime()) / 1000 / 60), // minutes
      }
      
      setSession(updatedSession)
    }
  }

  return (
    <MeetRoomContext.Provider value={{
      assistant,
      session,
      messages,
      isAudioEnabled,
      isVideoEnabled,
      isChatOpen,
      meetingType,
      toggleAudio,
      toggleVideo,
      toggleChat,
      sendMessage,
      addVoiceMessage,
      endSession
    }}>
      {children}
    </MeetRoomContext.Provider>
  )
}

// Legacy exports removed - use MeetRoomProvider directly
