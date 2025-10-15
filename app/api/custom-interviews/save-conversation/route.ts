/**
 * Save Conversation API Route
 *
 * Saves interview conversation data (transcript, messages, etc.) to the database
 * for later analysis and review.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    // Verify user authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { interviewId, transcript, messages, duration, createdAt } = await request.json()

    // Validate required fields
    if (!interviewId || !transcript || !messages) {
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

    // Save conversation data to database linked to the attempt
    const conversation = await prisma.interviewConversation.create({
      data: {
        attemptId: latestAttempt.id,
        transcript: JSON.stringify(transcript),
        messages: JSON.stringify(messages),
        duration: duration || 0,
        createdAt: createdAt ? new Date(createdAt) : new Date()
      }
    })

    console.log('Conversation saved with ID:', conversation.id)

    return NextResponse.json({
      success: true,
      conversationId: conversation.id,
      message: 'Conversation data saved successfully'
    })

  } catch (error) {
    console.error('Error saving conversation:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
