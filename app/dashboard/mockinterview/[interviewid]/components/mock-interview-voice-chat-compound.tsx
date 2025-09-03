"use client"

import React from "react"
import { UniversalVoiceChat, type VoiceEnabledAssistant } from "@/components/meet/core/universal-voice-chat"
import { createVapiMockInterview } from "../../actions"

interface MockInterviewVoiceChatCompoundProps {
  roleMeetId: string
  roleAssistant: VoiceEnabledAssistant
  onRoleAssistantUpdate: () => void
  onTranscriptUpdate?: (messages: { role: string; text: string; timestamp: string }[]) => void
  onVoiceChatStateChange?: (isActive: boolean) => void
  onEndVoiceChat?: (endVoiceFn: () => void) => void
  onSendUserEventReady?: (sendUserEvent: (event: {
    type: 'emoji_reaction'
    value: string
    timestamp: string
    userName?: string
    userEmail?: string
  }) => void) => void
}

export function MockInterviewVoiceChatCompound({
  roleMeetId,
  roleAssistant,
  onRoleAssistantUpdate,
  onTranscriptUpdate,
  onVoiceChatStateChange,
  onEndVoiceChat,
  onSendUserEventReady}: MockInterviewVoiceChatCompoundProps) {

  // Default voice ID for mock interviews
  const defaultVoiceId = "Rohan"

  // Note: sendUserEvent function is handled by the UniversalVoiceChat component internally

  // Note: We could fetch mock interview data here if needed for additional functionality
  // Currently, we work directly with the roleAssistant prop

  // Wrapper function to create VAPI assistant for mock interviews
  const createVapiAssistant = async (data: {
    assistantId: string
    voiceId: string
    voiceProvider: string
    customInstructions?: string
  }) => {
    const result = await createVapiMockInterview({
      mockInterviewId: data.assistantId,
      voiceId: data.voiceId as "Harry" | "Hana" | "Rohan" | "Neha" | "Elliot" | "Paige" | "Lily" | "Cole" | "Kylie" | "Savannah" | "Spencer",
      voiceProvider: "vapi",
      customInstructions: data.customInstructions
    })

    return {
      success: result.success,
      assistantId: result.assistantId,
      error: result.error
    }
  }

  // Convert RoleAssistant to VoiceEnabledAssistant format
  const voiceEnabledAssistant: VoiceEnabledAssistant = {
    id: roleAssistant.id,
    name: roleAssistant.name,
    hasVoiceEnabled: roleAssistant.hasVoiceEnabled || false,
    vapiAssistantId: roleAssistant.vapiAssistantId || null,
    // Add other required properties
    category: roleAssistant.category,
    description: roleAssistant.description,
    specialties: roleAssistant.specialties,
    personality: roleAssistant.personality,
    conversations: roleAssistant.conversations,
    createdBy: roleAssistant.createdBy,
    createdAt: roleAssistant.createdAt,
    updatedAt: roleAssistant.updatedAt,
    avatar: roleAssistant.avatar
  }

  return (
    <UniversalVoiceChat
      assistantId={roleMeetId}
      assistant={voiceEnabledAssistant}
      onAssistantUpdate={(assistant) => {
        if (assistant) {
          // Assistant updated successfully
          onRoleAssistantUpdate()
        }
      }}
      onTranscriptUpdate={onTranscriptUpdate}
      onVoiceChatStateChange={onVoiceChatStateChange}
      onEndVoiceChat={onEndVoiceChat}
      createVapiAssistant={createVapiAssistant}
      defaultVoiceId={defaultVoiceId}
      onSendUserEventReady={onSendUserEventReady}
    />
  )
}
