/**
 * Individual Custom Interview API Routes
 *
 * This file handles operations on specific interviews by ID:
 * - GET: Fetch a single interview with full details
 * - PUT: Update interview properties
 * - DELETE: Remove an interview completely
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/custom-interviews/[id]
 * Fetch a specific interview by ID with full details including attempts
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify user authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    // Fetch interview with ownership validation
    const interview = await prisma.mockInterview.findFirst({
      where: {
        id: id,
        createdBy: session.user.id 
      },
      include: {
        attempts: {
          include: {
            results: true
          }
        },
        prompts: true,
        user: {
          select: { name: true, email: true }
        }
      }
    })

    if (!interview) {
      return NextResponse.json({ error: 'Interview not found' }, { status: 404 })
    }

    // Format interview data for frontend consumption
    const formattedInterview = {
      id: interview.id,
      title: interview.title || `${interview.interviewType?.replace('_', ' ')} - Custom Interview`,
      company: interview.companyName || "",
      jd: interview.jobDescription || "",
      interviewType: interview.interviewType, // Add interview type for greeting selection
      createdAt: interview.createdAt.toISOString(),
      status: interview.status === "NOT_STARTED" ? "scheduled" :
              interview.status === "IN_PROGRESS" ? "in_progress" : "completed",
      screenShareEnabled: interview.screenShareEnabled,
      prompts: interview.prompts.map(prompt => ({
        id: prompt.id,
        promptText: prompt.promptText,
        isActive: prompt.isActive
      })),
      attempts: interview.attempts.map(attempt => ({
        id: attempt.id,
        completedAt: attempt.completedAt?.toISOString() || attempt.startedAt.toISOString(),
        score: attempt.score || 0,
        duration: attempt.duration || 0,
        feedback: attempt.overallFeedback || "",
        strengths: attempt.strengths,
        weaknesses: attempt.weaknesses,
        recommendations: attempt.recommendations
      }))
    }

    return NextResponse.json(formattedInterview)
  } catch (error) {
    console.error('Error fetching interview:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * PUT /api/custom-interviews/[id]
 * Update an interview's properties (title, company, jd, skills, status)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify user authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const { title, company, jd, status } = await request.json()

    // Verify interview ownership
    const existingInterview = await prisma.mockInterview.findFirst({
      where: {
        id: id,
        createdBy: session.user.id
      }
    })

    if (!existingInterview) {
      return NextResponse.json({ error: 'Interview not found' }, { status: 404 })
    }

    // Build update data conditionally
    const updateData: {
      title?: string
      companyName?: string | null
      jobDescription?: string
      status?: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'
    } = {}

    if (title) updateData.title = title
    if (company !== undefined) updateData.companyName = company || null
    if (jd) updateData.jobDescription = jd
    if (status) {
      updateData.status = status === "scheduled" ? "NOT_STARTED" :
                         status === "in_progress" ? "IN_PROGRESS" : "COMPLETED"
    }

    // Update the interview
    const updatedInterview = await prisma.mockInterview.update({
      where: { id: id },
      data: updateData,
      include: {
        attempts: {
          include: {
            results: true
          }
        },
        prompts: true
      }
    })

    // Format response for frontend
    const formattedInterview = {
      id: updatedInterview.id,
      title: updatedInterview.title || `${updatedInterview.interviewType?.replace('_', ' ')} - Custom Interview`,
      company: updatedInterview.companyName || "",
      jd: updatedInterview.jobDescription || "",
      interviewType: updatedInterview.interviewType, // Add interview type for greeting selection
      createdAt: updatedInterview.createdAt.toISOString(),
      status: updatedInterview.status === "NOT_STARTED" ? "scheduled" :
              updatedInterview.status === "IN_PROGRESS" ? "in_progress" : "completed",
      screenShareEnabled: updatedInterview.screenShareEnabled,
      prompts: updatedInterview.prompts.map(prompt => ({
        id: prompt.id,
        promptText: prompt.promptText,
        isActive: prompt.isActive
      })),
      attempts: updatedInterview.attempts.map(attempt => ({
        id: attempt.id,
        completedAt: attempt.completedAt?.toISOString() || attempt.startedAt.toISOString(),
        score: attempt.score || 0,
        duration: attempt.duration || 0,
        feedback: attempt.overallFeedback || "",
        strengths: attempt.strengths,
        weaknesses: attempt.weaknesses,
        recommendations: attempt.recommendations
      }))
    }

    return NextResponse.json(formattedInterview)
  } catch (error) {
    console.error('Error updating interview:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * DELETE /api/custom-interviews/[id]
 * Permanently delete an interview and all associated data
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify user authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    // Verify interview ownership before deletion
    const interview = await prisma.mockInterview.findFirst({
      where: {
        id: id,
        createdBy: session.user.id
      }
    })

    if (!interview) {
      return NextResponse.json({ error: 'Interview not found' }, { status: 404 })
    }

    // Delete the interview (Prisma cascade will handle related records)
    await prisma.mockInterview.delete({
      where: { id: id }
    })

    return NextResponse.json({ message: 'Interview deleted successfully' })
  } catch (error) {
    console.error('Error deleting interview:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
