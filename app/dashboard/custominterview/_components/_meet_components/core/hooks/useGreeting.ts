import { useState, useEffect } from 'react'
import { generateInterviewGreeting } from '../../greeting-generator'
import { InterviewData, VoiceChatMessages } from '../../types'

interface UseGreetingProps {
  greeting?: string
  interviewData?: InterviewData
  assistantName: string
}

export function useGreeting({ greeting, interviewData, assistantName }: UseGreetingProps) {
  const [voiceChatMessages, setVoiceChatMessages] = useState<VoiceChatMessages>({
    AI_GREETING_MESSAGE: "Hi! I'm Mivvo. Could you tell me about your background?",
    USER_RESPONSE_TIMEOUT_MESSAGE: "I'm still here. Please continue with your thoughts.",
  })

  useEffect(() => {
    const generateGreeting = async () => {
      let greetingMessage = greeting

      if (!greetingMessage && interviewData) {
        greetingMessage = await generateInterviewGreeting({
          jd: interviewData.jd || interviewData.customPrompt,
          interviewType: interviewData.interviewType,
          title: interviewData.title
        }, assistantName)
      }

      greetingMessage = greetingMessage || `Hi! I'm ${assistantName}. Could you tell me about your background?`

      setVoiceChatMessages(prev => ({
        ...prev,
        AI_GREETING_MESSAGE: greetingMessage
      }))
    }

    generateGreeting()
  }, [interviewData, greeting, assistantName])

  return { voiceChatMessages }
}
