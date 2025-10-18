/**
 * Save Analysis API Route
 *
 * Saves interview analysis results to the database in the InterviewResult table.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface AnalysisData {
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
  vocabularyComplexity: number
  emotionalTone: "Positive" | "Neutral" | "Negative"
  wordCountAnalysis: "Too Brief" | "Appropriate" | "Too Verbose"
  questionAnsweringQuality: number
  followUpHandling: boolean
  answerStructure: "Poor" | "Average" | "Excellent"
  exampleUsage: boolean
  relevantTopicAnswer: boolean
}

export async function POST(request: NextRequest) {
  try {
    // Verify user authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { interviewId, analysis, duration } = await request.json()

    // Validate required fields
    if (!interviewId || !analysis) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Get the latest attempt for this interview
    const latestAttempt = await prisma.interviewAttempt.findFirst({
      where: {
        interviewId,
        interview: {
          createdBy: session.user.id
        }
      },
      orderBy: {
        startedAt: 'desc'
      }
    })

    if (!latestAttempt) {
      return NextResponse.json({ error: 'No attempt found for this interview' }, { status: 404 })
    }

    // Convert communication skills to numerical score (0-100)
    const communicationScore = analysis.communication_skills.clarity === "Clear" ? 80 :
                              analysis.communication_skills.clarity === "Moderate" ? 60 : 40

    // Convert technical knowledge to numerical score (0-100)
    const knowledgeScore = analysis.technical_knowledge.depth === "Expert" ? 90 :
                          analysis.technical_knowledge.depth === "Intermediate" ? 70 : 50

    // Create overall feedback from analysis
    const overallFeedback = `Overall Performance: ${analysis.sentiment} sentiment, ${analysis.confidence_level} confidence level. ` +
                           `Technical knowledge: ${analysis.technical_knowledge.depth} level with ${analysis.technical_knowledge.accuracy} accuracy. ` +
                           `Problem solving: ${analysis.soft_skills.problem_solving}. ` +
                           `Recommendation: ${analysis.recommendation}.`

    // Save analysis results to InterviewResult
    const result = await prisma.interviewResult.create({
      data: {
        attemptId: latestAttempt.id,
        duration: duration || latestAttempt.duration,
        feedback: overallFeedback,
        knowledge: knowledgeScore,
        overallScore: analysis.final_score * 10, // Convert to 0-100 scale
        overallFeedback: overallFeedback,
        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
        recommendations: [`Recommendation: ${analysis.recommendation}`],
        communication: communicationScore,
        notes: `Sentiment: ${analysis.sentiment}, Confidence: ${analysis.confidence_level}`,
        vocabularyComplexity: analysis.vocabularyComplexity,
        emotionalTone: analysis.emotionalTone,
        wordCountAnalysis: analysis.wordCountAnalysis,
        questionAnsweringQuality: analysis.questionAnsweringQuality,
        followUpHandling: analysis.followUpHandling,
        answerStructure: analysis.answerStructure,
        exampleUsage: analysis.exampleUsage,
        relevantTopicAnswer: analysis.relevantTopicAnswer
      }
    })

    console.log('Analysis results saved with ID:', result.id)

    return NextResponse.json({
      success: true,
      resultId: result.id,
      message: 'Analysis results saved successfully'
    })

  } catch (error) {
    console.error('Error saving analysis:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
