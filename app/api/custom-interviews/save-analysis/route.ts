/**
 * Save Analysis API Route
 *
 * Saves interview analysis results to the database in the InterviewResult table.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

/**
 * Authenticate user from NextAuth session or JWT token
 * @param request - NextRequest object
 * @returns User ID if authenticated, null otherwise
 */
async function authenticateUser(request: NextRequest): Promise<string | null> {
  console.log('Authenticating user...')

  // First, try NextAuth session
  const session = await getServerSession(authOptions)
  if (session?.user?.id) {
    console.log('Using NextAuth session for user:', session.user.id)
    return session.user.id
  }

  // If no NextAuth session, try JWT token from Authorization header
  const authHeader = request.headers.get('authorization')
  console.log('Auth header:', authHeader ? 'present' : 'missing')

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7)
    console.log('JWT token present, attempting verification...')
    try {
      const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as { userId?: string; email?: string }
      console.log('JWT decoded:', { userId: decoded.userId, email: decoded.email })
      if (decoded.userId) {
        console.log('Using JWT token for user:', decoded.userId)
        return decoded.userId
      }
    } catch (error) {
      console.error('JWT verification failed:', error)
    }
  } else {
    console.log('No Bearer token found in authorization header')
  }

  console.log('Authentication failed - returning null')
  return null
}


export async function POST(request: NextRequest) {
  try {
    console.log('Save analysis API called')

    // Verify user authentication (NextAuth or JWT token)
    const userId = await authenticateUser(request)
    if (!userId) {
      console.log('Authentication failed - no userId')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Authenticated user:', userId)

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
          createdBy: userId
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
