"use client"

import { BarChartComponent } from "./BarChartComponent"
import { PieChartComponent } from "./PieChartComponent"

interface InterviewResult {
  id: string
  overallScore: number | null
  communication: number | null
  knowledge: number | null
}

interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

interface MetricsSectionProps {
  result: InterviewResult | undefined
  allMessages: ConversationMessage[]
}

export function MetricsSection({ result, allMessages }: MetricsSectionProps) {
  const score = result?.overallScore || 0
  const communication = result?.communication || 0
  const knowledge = result?.knowledge || 0

  return (
    <div className="space-y-6">
      {/* Performance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChartComponent
          score={score}
          communication={communication}
          knowledge={knowledge}
        />

        <PieChartComponent allMessages={allMessages} />
      </div>

    </div>
  )
}
