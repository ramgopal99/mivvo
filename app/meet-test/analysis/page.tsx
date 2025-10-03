'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { INTERVIEW_CONFIG } from '../_components/config'
import { AnalysisTabs } from './components/analysis-tabs'

const interviewTopic = `${INTERVIEW_CONFIG.position} (${INTERVIEW_CONFIG.topics})`

interface TranscriptMessage {
  role: string
  text: string
  timestamp: string
}

interface AnalysisResult {
  sentiment: "Positive" | "Neutral" | "Negative"
  confidence_level: "High" | "Medium" | "Low"
  communication_skills: {
    clarity: "Clear" | "Moderate" | "Confusing"
    grammar: "Good" | "Average" | "Poor"
    filler_words: "Low" | "Medium" | "High"
  }
  technical_knowledge: {
    accuracy: "Correct" | "Partially correct" | "Wrong"
    depth: "Basic" | "Intermediate" | "Expert"
  }
  soft_skills: {
    problem_solving: "Strong" | "Average" | "Weak"
    attitude: "Positive" | "Neutral" | "Negative"
  }
  strengths: string[]
  weaknesses: string[]
  final_score: number
  recommendation: "Proceed" | "Maybe" | "Reject"
}

export default function AnalysisPage() {
  const router = useRouter()
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadAnalysis = async () => {
      try {
        const transcriptData = sessionStorage.getItem('interviewTranscript')

        if (!transcriptData) {
          setIsLoading(false)
          return
        }

        const parsedTranscript: TranscriptMessage[] = JSON.parse(transcriptData)
        setTranscript(parsedTranscript)

          // Call the analysis API with topic context
          const response = await fetch('/api/analysis', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              conversation: parsedTranscript,
              topic: `${INTERVIEW_CONFIG.position} (${INTERVIEW_CONFIG.topics})`
            })
          })

        if (response.ok) {
          const analysisResult = await response.json()
          setAnalysis(analysisResult)
        } else {
          console.error('Analysis API error:', response.statusText)
        }

      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAnalysis()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {transcript.length === 0 && !isLoading ? (
        <Card>
          <CardHeader>
            <CardTitle>No Data Found</CardTitle>
            <CardDescription>
              No interview data was found. Please complete an interview first.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/meet-test')} className="w-full">
              Start Interview
            </Button>
          </CardContent>
        </Card>
      ) : (
        <AnalysisTabs
          analysis={analysis!}
          transcript={transcript}
          topic={interviewTopic}
        />
      )}
    </>
  )
}