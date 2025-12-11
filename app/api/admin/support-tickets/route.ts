import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

type TicketUpdateData = {
  status: 'COMPLETED'
  updatedAt: Date
  resolution?: string
}

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const session = await getServerSession(authOptions)

    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPERADMIN')) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    // Get pagination parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = (page - 1) * limit

    // Fetch paginated support tickets with user information
    const [tickets, totalCount] = await Promise.all([
      prisma.supportTicket.findMany({
        include: {
          user: {
            select: {
              name: true,
              email: true
            }
          },
          replies: {
            orderBy: {
              createdAt: 'desc'
            },
            take: 1 // Get the latest reply
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip: offset,
        take: limit,
      }),
      prisma.supportTicket.count()
    ])

    const totalPages = Math.ceil(totalCount / limit)

    // Group tickets by status
    const pending = tickets
      .filter(ticket => ticket.status === 'PENDING')
      .map(ticket => ({
        id: ticket.id,
        ticketId: ticket.ticketId,
        subject: ticket.subject,
        category: ticket.category,
        status: ticket.status,
        description: ticket.description,
        userId: ticket.userId,
        user: ticket.user,
        createdAt: ticket.createdAt.toISOString(),
        updatedAt: ticket.updatedAt.toISOString(),
      }))

    const completed = tickets
      .filter(ticket => ticket.status === 'COMPLETED')
      .map(ticket => ({
        id: ticket.id,
        ticketId: ticket.ticketId,
        subject: ticket.subject,
        category: ticket.category,
        status: ticket.status,
        description: ticket.description,
        resolution: ticket.resolution,
        userId: ticket.userId,
        user: ticket.user,
        createdAt: ticket.createdAt.toISOString(),
        updatedAt: ticket.updatedAt.toISOString(),
        reply: ticket.replies.length > 0 ? {
          subject: ticket.replies[0].subject,
          message: ticket.replies[0].message,
          from: ticket.replies[0].from,
          date: ticket.replies[0].createdAt.toISOString()
        } : null
      }))

    return NextResponse.json({
      success: true,
      data: {
        pending,
        completed
      },
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    })
  } catch (error) {
    console.error('Error fetching support tickets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch support tickets' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const session = await getServerSession(authOptions)

    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPERADMIN')) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { ticketId, action, reply, resolution } = body

    if (!ticketId) {
      return NextResponse.json(
        { error: 'Ticket ID is required' },
        { status: 400 }
      )
    }

    // Find the ticket first
    const ticket = await prisma.supportTicket.findUnique({
      where: { ticketId }
    })

    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      )
    }

    // Handle different actions
    if (action === 'reply') {
      // Validate reply data
      if (!reply || !reply.subject || !reply.message) {
        return NextResponse.json(
          { error: 'Reply subject and message are required' },
          { status: 400 }
        )
      }

      // Create the reply
      const newReply = await prisma.ticketReply.create({
        data: {
          ticketId: ticket.id,
          subject: reply.subject,
          message: reply.message,
          from: reply.from || 'Support Team'
        }
      })

      // Update ticket's updatedAt timestamp
      await prisma.supportTicket.update({
        where: { ticketId },
        data: {
          updatedAt: new Date()
        }
      })

      return NextResponse.json({
        success: true,
        message: 'Reply added successfully',
        reply: newReply
      })

    } else if (action === 'complete') {
      // Mark ticket as completed
      const updateData: TicketUpdateData = {
        status: 'COMPLETED',
        updatedAt: new Date()
      }

      // Add resolution if provided
      if (resolution) {
        updateData.resolution = resolution
      }

      const updatedTicket = await prisma.supportTicket.update({
        where: { ticketId },
        data: updateData
      })

      return NextResponse.json({
        success: true,
        message: 'Ticket marked as completed',
        ticket: updatedTicket
      })

    } else if (action === 'reply_and_complete') {
      // Validate reply data
      if (!reply || !reply.subject || !reply.message) {
        return NextResponse.json(
          { error: 'Reply subject and message are required when marking as complete' },
          { status: 400 }
        )
      }

      // Create the reply
      const newReply = await prisma.ticketReply.create({
        data: {
          ticketId: ticket.id,
          subject: reply.subject,
          message: reply.message,
          from: reply.from || 'Support Team'
        }
      })

      // Update ticket as completed with resolution
      const updateData: TicketUpdateData = {
        status: 'COMPLETED',
        updatedAt: new Date()
      }

      if (resolution) {
        updateData.resolution = resolution
      }

      const updatedTicket = await prisma.supportTicket.update({
        where: { ticketId },
        data: updateData
      })

      return NextResponse.json({
        success: true,
        message: 'Reply added and ticket marked as completed',
        reply: newReply,
        ticket: updatedTicket
      })

    } else {
      return NextResponse.json(
        { error: 'Invalid action. Use "reply", "complete", or "reply_and_complete"' },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Error updating support ticket:', error)
    return NextResponse.json(
      { error: 'Failed to update support ticket' },
      { status: 500 }
    )
  }
}