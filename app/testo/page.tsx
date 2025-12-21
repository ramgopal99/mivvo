"use client"

import { useState } from 'react'
import { Orb } from '../dashboard/custominterview/_components/_meet_components/ui/orb'

export default function TestPage() {
  const [agentState, setAgentState] = useState<'thinking' | 'listening' | 'talking' | null>(null)

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-8">Orb Component Test</h1>

        {/* Orb Component */}
        <div className="mb-8">
          <Orb
            agentState={agentState}
            colors={["#CADCFC", "#A0B9D1"]}
            className="w-48 h-48 mx-auto"
          />
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => setAgentState(null)}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
          >
            Idle (Brain Icon)
          </button>
          <button
            onClick={() => setAgentState('thinking')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
          >
            Thinking
          </button>
          <button
            onClick={() => setAgentState('listening')}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition-colors"
          >
            Listening (User Speaking)
          </button>
          <button
            onClick={() => setAgentState('talking')}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500 transition-colors"
          >
            Talking (AI Speaking)
          </button>
        </div>

        {/* Current State Display */}
        <div className="mt-8 text-white">
          <p className="text-lg">Current State: <span className="font-bold text-blue-400">{agentState || 'Idle'}</span></p>
        </div>
      </div>
    </div>
  )
}
