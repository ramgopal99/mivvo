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
import { UPSE_PROMPT, BANKING_PROMPT } from './prompts'
import { extractRoleAndCompanyFromJDWithAI, isOpenAIAvailable } from '@/lib/utils'
import jwt from 'jsonwebtoken'

/**
 * Clean company name by removing common business suffixes for more natural display
 */
function cleanCompanyNameForDisplay(companyName: string | null): string | null {
  if (!companyName) return null

  // Common business suffixes to remove (case insensitive)
  const suffixesToRemove = [
    'pvt\\. ltd\\.',
    'pvt ltd',
    'private limited',
    'ltd\\.',
    'ltd',
    'limited',
    'inc\\.',
    'inc',
    'incorporated',
    'llc',
    'llp',
    'corp\\.',
    'corp',
    'corporation',
    'co\\.',
    'co',
    'company',
    'technologies',
    'tech',
    'solutions',
    'systems',
    'group',
    'international',
    'global'
  ]

  let cleaned = companyName.trim()

  // Remove suffixes from the end of the company name
  const suffixPattern = new RegExp(`\\s+(${suffixesToRemove.join('|')})$`, 'i')
  cleaned = cleaned.replace(suffixPattern, '')

  // Clean up extra spaces and return
  return cleaned.trim() || null
}

interface InterviewWhereClause {
  createdBy: string
  status?: 'IN_PROGRESS' | 'COMPLETED'
}


/**
 * Authenticate user from NextAuth session or JWT token
 * @param request - NextRequest object
 * @returns User ID if authenticated, null otherwise
 */
async function authenticateUser(request: NextRequest): Promise<string | null> {
  // First, try NextAuth session
  const session = await getServerSession(authOptions)
  if (session?.user?.id) {
    return session.user.id
  }

  // If no NextAuth session, try JWT token from Authorization header
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7)
    try {
      const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as { userId?: string }
      if (decoded.userId) {
        return decoded.userId
      }
    } catch (error) {
      console.error('JWT verification failed:', error)
    }
  }

  return null
}


/**
 * GET /api/custom-interviews
 * Fetch all interviews for the authenticated user
 * Optional query parameter: status (scheduled, in_progress, completed)
 */
export async function GET(request: NextRequest) {
  try {
    // Verify user authentication (NextAuth or JWT token)
    const userId = await authenticateUser(request)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse query parameters for filtering
    const { searchParams } = new URL(request.url)
    const statusFilter = searchParams.get('status')

    // Build database query filter
    const whereClause: InterviewWhereClause = {
      createdBy: userId
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
    // Verify user authentication (NextAuth or JWT token)
    const userId = await authenticateUser(request)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check user's time allowance
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        totalTimeAllowance: true,
        usedTimeMinutes: true,
        role: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user has exceeded their time allowance
    // Only apply time limits to regular users, not admins
    if (user.role === 'USER' && user.usedTimeMinutes >= user.totalTimeAllowance) {
      return NextResponse.json({
        error: 'Time limit exceeded',
        message: `You have used all ${user.totalTimeAllowance} minutes of your free interview time. Please upgrade to continue practicing.`,
        timeLimitExceeded: true
      }, { status: 403 })
    }

    // Parse request body
    const { jdDetails, interviewType, screenShare, company, generalSubType, customPrompt } = await request.json()

    // Validate required fields
    if (!jdDetails || !interviewType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Map frontend interview types to database enum values
    const interviewTypeMap: Record<string, 'GENERAL_INTERVIEW' | 'TECHNICAL' | 'CODING' | 'UI_INTERVIEW' | 'HR_INTERVIEW' | 'CUSTOM_INTERVIEW'> = {
      'General': 'GENERAL_INTERVIEW',
      'Technical': 'TECHNICAL',
      'Coding': 'CODING',
      'UI/UX': 'UI_INTERVIEW',
      'HR': 'HR_INTERVIEW',
      'Custom': 'CUSTOM_INTERVIEW' // JD-based custom interviews
    }

    // Convert interview type and prepare data
    const mappedInterviewType = interviewTypeMap[interviewType] || 'GENERAL_INTERVIEW'

    // Extract AI data for custom interviews (used for both title and company)
    let extractedData: { role: string | null; company: string | null } | null = null
    if (interviewType === 'Custom' && isOpenAIAvailable()) {
      try {
        extractedData = await extractRoleAndCompanyFromJDWithAI(jdDetails)
      } catch (error) {
        console.error('Failed to extract data with AI:', error instanceof Error ? error.message : String(error))
      }
    }

    // Determine company name: use manual input first, then AI extraction as fallback
    // Treat "Custom Company" as null (user didn't provide real company name)
    const normalizedCompany = (company && company.toLowerCase() !== 'custom company') ? company : null
    const finalCompanyName = normalizedCompany || extractedData?.company || null

    // Clean company name for display (remove suffixes like Pvt Ltd, Inc, etc.)
    const cleanedCompanyName = cleanCompanyNameForDisplay(finalCompanyName)
    // Generate unique title based on interview type and existing interviews
    let baseTitle: string
    if (interviewType === 'General' && generalSubType) {
      baseTitle = `${interviewType} - ${generalSubType} Interview`
    } else if (interviewType === 'Custom') {
      const rolePart = extractedData?.role ? `${extractedData.role} Interview` : 'Custom Interview'
      const companyPart = cleanedCompanyName ? ` at ${cleanedCompanyName}` : ''
      baseTitle = `${rolePart}${companyPart}`
    } else {
      baseTitle = `${interviewType} Interview`
    }

    // Check for existing interviews with similar titles
    const existingInterviews = await prisma.mockInterview.findMany({
      where: {
        createdBy: userId,
        title: {
          startsWith: baseTitle
        }
      },
      select: { title: true }
    })

    // Generate unique title
    let uniqueTitle = baseTitle
    if (existingInterviews.length > 0) {
      const existingTitles = existingInterviews.map(i => i.title)
      let counter = 1
      do {
        uniqueTitle = `${baseTitle} (${counter})`
        counter++
      } while (existingTitles.includes(uniqueTitle))
    }

    // Create interview in database
    const interview = await prisma.mockInterview.create({
      data: {
        title: uniqueTitle,
        companyName: cleanedCompanyName,
        jobDescription: jdDetails,
        interviewType: mappedInterviewType,
        screenShareEnabled: screenShare || false,
        createdBy: userId
      },
      include: {
        attempts: true,
        prompts: true
      }
    })

    // Generate and save interview prompt based on type
    let promptText: string

    // Use custom prompt if provided (for custom JD interviews)
    if (customPrompt) {
      promptText = customPrompt
    } else if (interviewType === "Coding") {
      promptText = generateCodingPrompt(jdDetails, interview.title || "Coding Interview")
    } else if (interviewType === "UI/UX") {
      promptText = generateUIUXPrompt(jdDetails, interview.title || "UI/UX Interview")
    } else if (interviewType === "HR") {
      promptText = generateHRPrompt(jdDetails, interview.title || "HR Interview")
    } else if (interviewType === "Technical") {
      promptText = generateTechnicalPrompt(jdDetails, interview.title || "Technical Interview")
    } else if (interviewType === "General") {
      // Handle General interview sub-types (UPSE and Banking)
      if (generalSubType === "UPSE") {
        promptText = UPSE_PROMPT
      } else if (generalSubType === "Banking") {
        promptText = BANKING_PROMPT
      } else {
        // Fallback to general prompt
        promptText = generateGeneralPrompt(jdDetails, interview.title || "Custom Interview")
      }
    } else {
      // Fallback to general prompt
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
