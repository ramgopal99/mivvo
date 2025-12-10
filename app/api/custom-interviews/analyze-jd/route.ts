/**
 * Custom JD Analysis API Route
 *
 * This endpoint analyzes a custom job description using OpenAI
 * and generates a tailored interview prompt that starts with "you are mivvo"
 */

import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { generateCustomInterviewPrompt } from '../prompts/custom-interview-prompt'
import { prisma } from '@/lib/prisma'
import { INTERVIEW_CONFIG } from '@/config/site'
import jwt from 'jsonwebtoken'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

/**
 * Authenticate user from NextAuth session or JWT token
 * @param request - NextRequest object
 * @returns User ID if authenticated, null otherwise
 */
async function authenticateUser(request: NextRequest): Promise<string | null> {
  // First, try NextAuth session
  const session = await prisma.session.findFirst({
    where: {
      sessionToken: request.cookies.get('next-auth.session-token')?.value ||
                   request.cookies.get('__Secure-next-auth.session-token')?.value ||
                   request.headers.get('authorization')?.replace('Bearer ', '') || ''
    },
    include: { user: true }
  })

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

export async function POST(request: NextRequest) {
  try {
    // Check rate limit BEFORE any processing
    const userId = await authenticateUser(request)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user info for rate limit check
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check rate limit: maximum custom interviews per day (resets at midnight)
    if (user.role === 'USER') {
      // Get start of current day (midnight)
      const now = new Date()
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())

      const todayCustomInterviewCount = await prisma.mockInterview.count({
        where: {
          createdBy: userId,
          interviewType: 'CUSTOM_INTERVIEW',
          createdAt: {
            gte: startOfDay
          }
        }
      })

      if (todayCustomInterviewCount >= INTERVIEW_CONFIG.MAX_INTERVIEWS_PER_DAY) {
        // Calculate time until midnight (next day reset)
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
        const hoursUntilMidnight = Math.ceil((tomorrow.getTime() - now.getTime()) / (60 * 60 * 1000))

        return NextResponse.json({
          error: 'Rate limit exceeded',
          message: `You can only create ${INTERVIEW_CONFIG.MAX_INTERVIEWS_PER_DAY} custom interviews per day. You have created ${todayCustomInterviewCount} interviews today. You can create another custom interview in ${hoursUntilMidnight} hours (resets at midnight).`,
          rateLimitExceeded: true,
          currentCount: todayCustomInterviewCount,
          maxAllowed: INTERVIEW_CONFIG.MAX_INTERVIEWS_PER_DAY,
          nextAllowedAt: tomorrow.toISOString(),
          resetsAt: 'midnight'
        }, { status: 429 })
      }
    }

    const { jdText, cvText } = await request.json()

    // Basic check - only ensure jdText exists and is a string
    if (!jdText || typeof jdText !== 'string' || jdText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Job description text is required' },
        { status: 400 }
      )
    }

    // Let OpenAI handle all validation directly
    const validationPrompt = `Analyze the following text and determine if it is a legitimate job description for any professional role.

Return only "VALID" if the text appears to be a real job description containing:
- A job title/position name
- Required skills, qualifications, or experience
- Responsibilities or duties

Return only "INVALID" if the text appears to be:
- Random text or gibberish
- Personal information or resume/CV (if it's a resume, suggest using the CV upload feature)
- Spam or irrelevant content
- Too short or incomplete (less than 50 words)
- Not describing a job role or position

Text to analyze:
"${jdText}"

Respond with only: VALID or INVALID`

    const validationCompletion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: validationPrompt }
      ],
      max_tokens: 10,
      temperature: 0.1, // Very low temperature for consistent validation
    })

    // Log token usage for validation
    console.log('🔍 Custom JD Validation - Token Usage:', {
      prompt_tokens: validationCompletion.usage?.prompt_tokens || 0,
      completion_tokens: validationCompletion.usage?.completion_tokens || 0,
      total_tokens: validationCompletion.usage?.total_tokens || 0,
      model: 'gpt-4o-mini',
      operation: 'jd_validation'
    })

    const validationResult = validationCompletion.choices[0]?.message?.content?.trim().toUpperCase()

    if (validationResult !== 'VALID') {
      return NextResponse.json({
        success: false,
        validationError: 'Please provide a valid job description with a job title, responsibilities, and required qualifications.',
        originalJD: jdText
      })
    }

    // Analyze the JD using OpenAI to generate a truly customized prompt
    const systemPrompt = generateCustomInterviewPrompt(jdText, cvText)

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt }
      ],
      max_tokens: 1500,
      temperature: 0.6, // Lower temperature for more consistent structure
    })

    // Log token usage for custom interview prompt generation
    console.log('🤖 Custom JD Analysis - Token Usage:', {
      prompt_tokens: completion.usage?.prompt_tokens || 0,
      completion_tokens: completion.usage?.completion_tokens || 0,
      total_tokens: completion.usage?.total_tokens || 0,
      model: 'gpt-4o-mini',
      operation: 'jd_analysis',
      jd_length: jdText.length,
      cv_provided: !!cvText
    })

    const aiResponse = completion.choices[0]?.message?.content?.trim()

    if (!aiResponse) {
      throw new Error('No response from OpenAI')
    }

    // Clean up the response - remove any extra formatting
    let finalPrompt = aiResponse
      .replace(/^```[\w]*\n?/i, '') // Remove code block markers
      .replace(/\n?```$/, '')
      .trim()

    // Ensure the prompt starts with "You are Mivvo"
    if (!finalPrompt.toLowerCase().startsWith('you are mivvo')) {
      finalPrompt = `You are Mivvo, conducting a conversational interview for a custom position.\n\n${finalPrompt}`
    }

    return NextResponse.json({
      success: true,
      prompt: finalPrompt,
      originalJD: jdText
    })

  } catch (error) {
    console.error('JD Analysis API error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze job description' },
      { status: 500 }
    )
  }
}
