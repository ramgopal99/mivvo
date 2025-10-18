/**
 * Custom Interviews API Routes
 *
 * This file handles CRUD operations for custom interviews:
 * - GET: Fetch all interviews for authenticated user (with optional status filtering)
 * - POST: Create new custom interview
 *
 * Individual interview operations (GET, PUT, DELETE by ID) are handled in [id]/route.ts
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateGeneralPrompt, generateCodingPrompt, generateUIUXPrompt, generateHRPrompt, generateTechnicalPrompt } from './prompts'

interface InterviewWhereClause {
  createdBy: string
  status?: 'IN_PROGRESS' | 'COMPLETED'
}


/**
 * GET /api/custom-interviews
 * Fetch all interviews for the authenticated user
 * Optional query parameter: status (scheduled, in_progress, completed)
 */
export async function GET(request: NextRequest) {
  try {
    // Verify user authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse query parameters for filtering
    const { searchParams } = new URL(request.url)
    const statusFilter = searchParams.get('status')

    // Build database query filter
    const whereClause: InterviewWhereClause = {
      createdBy: session.user.id
    }

    // Apply status filter if provided
    if (statusFilter) {
      const prismaStatus = statusFilter === "in_progress" ? "IN_PROGRESS" : "COMPLETED"
      whereClause.status = prismaStatus
    }

    // Fetch interviews from database with related data
    const interviews = await prisma.mockInterview.findMany({
      where: whereClause,
      include: {
        attempts: {
          include: {
            results: true,
            conversations: true
          }
        },
        prompts: true
      },
      orderBy: { createdAt: 'desc' }
    })

    // Format interviews for frontend consumption
    const formattedInterviews = interviews.map(interview => ({
      id: interview.id,
      title: interview.title || `${interview.interviewType?.replace('_', ' ')} - Custom Interview`,
      company: interview.companyName || "",
      jd: interview.jobDescription || "",
      createdAt: interview.createdAt.toISOString(),
      status: interview.status === "IN_PROGRESS" ? "in_progress" : "completed",
      screenShareEnabled: interview.screenShareEnabled,
      prompts: interview.prompts.map(prompt => ({
        id: prompt.id,
        promptText: prompt.promptText,
        isActive: prompt.isActive
      })),
      attempts: interview.attempts.map((attempt) => {
        // Get overall analysis from the first result that has overall feedback
        const overallResult = attempt.results.find(r => r.overallFeedback) || attempt.results[0]

        return {
          id: attempt.id,
          completedAt: attempt.completedAt?.toISOString() || attempt.startedAt.toISOString(),
          score: overallResult?.overallScore || 0,
          duration: attempt.duration || 0,
          feedback: overallResult?.overallFeedback || "",
          strengths: overallResult?.strengths || [],
          weaknesses: overallResult?.weaknesses || [],
          recommendations: overallResult?.recommendations || []
        }
      })
    }))

    return NextResponse.json(formattedInterviews)
  } catch (error) {
    console.error('Error fetching custom interviews:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * POST /api/custom-interviews
 * Create a new custom interview for the authenticated user
 * Required fields: jdDetails, interviewType
 * Optional fields: company, screenShare
 */
export async function POST(request: NextRequest) {
  try {
    // Verify user authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse request body
    const { jdDetails, interviewType, screenShare, company } = await request.json()

    // Validate required fields
    if (!jdDetails || !interviewType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Map frontend interview types to database enum values
    const interviewTypeMap: Record<string, 'GENERAL_INTERVIEW' | 'TECHNICAL' | 'CODING' | 'UI_INTERVIEW' | 'HR_INTERVIEW'> = {
      'General': 'GENERAL_INTERVIEW',
      'Technical': 'TECHNICAL',
      'Coding': 'CODING',
      'UI/UX': 'UI_INTERVIEW',
      'HR': 'HR_INTERVIEW'
    }

    // Convert interview type and prepare data
    const mappedInterviewType = interviewTypeMap[interviewType] || 'GENERAL_INTERVIEW'

    // Create interview in database
    const interview = await prisma.mockInterview.create({
      data: {
        title: `${interviewType} - Custom Interview`,
        companyName: company || null,
        jobDescription: jdDetails,
        interviewType: mappedInterviewType,
        screenShareEnabled: screenShare || false,
        createdBy: session.user.id
      },
      include: {
        attempts: true,
        prompts: true
      }
    })

    // Generate and save interview prompt based on type
    let promptText: string

    if (interviewType === "Coding") {
      promptText = generateCodingPrompt(jdDetails, interview.title || "Coding Interview")
    } else if (interviewType === "UI/UX") {
      promptText = generateUIUXPrompt(jdDetails, interview.title || "UI/UX Interview")
    } else if (interviewType === "HR") {
      promptText = generateHRPrompt(jdDetails, interview.title || "HR Interview")
    } else if (interviewType === "Technical") {
      promptText = generateTechnicalPrompt(jdDetails, interview.title || "Technical Interview")
    } else {
      // General interview
      promptText = generateGeneralPrompt(jdDetails, interview.title || "Custom Interview")
    }

    await prisma.interviewPrompt.create({
      data: {
        promptText,
        interviewId: interview.id,
        isActive: true
      }
    })

    // Format response for frontend
    const formattedInterview = {
      id: interview.id,
      title: interview.title,
      company: interview.companyName || "",
      jd: interview.jobDescription,
      createdAt: interview.createdAt.toISOString(),
      status: "in_progress",
      screenShareEnabled: interview.screenShareEnabled,
      prompts: interview.prompts.map(prompt => ({
        id: prompt.id,
        promptText: prompt.promptText,
        isActive: prompt.isActive
      })),
      attempts: []
    }

    return NextResponse.json(formattedInterview, { status: 201 })
  } catch (error) {
    console.error('Error creating custom interview:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
