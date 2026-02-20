'use client'

import { Orb, type AgentState } from '../../ui/orb'

export type VoiceChatOrbState = 'thinking' | 'listening' | 'talking'

export interface VoiceChatOrbProps {
  agentState: VoiceChatOrbState
  colors?: [string, string]
  className?: string
}

/**
 * Orb shown during voice chat. Swap this file's default export
 * to use a different visualization (e.g. another orb, avatar, or custom component).
 */
export function VoiceChatOrb({
  agentState,
  colors = ['#CADCFC', '#A0B9D1'],
  className = 'w-full h-full',
}: VoiceChatOrbProps) {
  return (
    <Orb
      agentState={agentState as AgentState}
      colors={colors}
      className={className}
    />
  )
}
