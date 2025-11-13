import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { SupportTicketCategory, SupportTicketPriority } from '@prisma/client'

// Generate a human-readable ticket ID
function generateTicketId(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const timestamp = Date.now()
  return `SUP-${year}${month}${day}-${String(timestamp).slice(-3)}`
}

// Map string values to enum values
function mapCategory(category: string): SupportTicketCategory {
  switch (category.toLowerCase()) {
    case 'technical issue':
      return SupportTicketCategory.TECHNICAL_ISSUE
    case 'billing & payment':
      return SupportTicketCategory.BILLING_PAYMENT
    case 'account & profile':
      return SupportTicketCategory.ACCOUNT_PROFILE
    case 'feature request':
      return SupportTicketCategory.FEATURE_REQUEST
    default:
      return SupportTicketCategory.GENERAL_INQUIRY
  }
}

function mapPriority(priority: string): SupportTicketPriority {
  switch (priority.toLowerCase()) {
    case 'high':
      return SupportTicketPriority.HIGH
    case 'medium':
      return SupportTicketPriority.MEDIUM
    default:
      return SupportTicketPriority.LOW
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { name, email, category, subject, message, priority } = await request.json()

    // Basic validation
    if (!name || !email || !category || !subject || !message || !priority) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Generate ticket ID and map enums
    const ticketId = generateTicketId()
    const ticketCategory = mapCategory(category)
    const ticketPriority = mapPriority(priority)

    // Create the support ticket in the database
    const supportTicket = await prisma.supportTicket.create({
      data: {
        ticketId,
        subject,
        category: ticketCategory,
        priority: ticketPriority,
        description: message, // Using message as description
        userId: session.user.id,
      },
    })

    // Here you could also:
    // 1. Send email notification to support team
    // 2. Send confirmation email to user
    // 3. Trigger webhook for ticketing system

    console.log('Support ticket created:', {
      ticketId: supportTicket.ticketId,
      userId: session.user.id,
      category: ticketCategory,
      priority: ticketPriority,
      subject,
    })

    return NextResponse.json({
      success: true,
      message: 'Support ticket created successfully',
      ticketId: supportTicket.ticketId,
      ticket: supportTicket
    })

  } catch (error) {
    console.error('Support API error:', error)
    return NextResponse.json(
      { error: 'Failed to create support ticket' },
      { status: 500 }
    )
  }
}

// Map enum values back to display strings
function mapCategoryToString(category: SupportTicketCategory): string {
  switch (category) {
    case SupportTicketCategory.TECHNICAL_ISSUE:
      return 'Technical Issue'
    case SupportTicketCategory.BILLING_PAYMENT:
      return 'Billing & Payment'
    case SupportTicketCategory.ACCOUNT_PROFILE:
      return 'Account & Profile'
    case SupportTicketCategory.FEATURE_REQUEST:
      return 'Feature Request'
    default:
      return 'General Inquiry'
  }
}

function mapPriorityToString(priority: SupportTicketPriority): string {
  switch (priority) {
    case SupportTicketPriority.HIGH:
      return 'High'
    case SupportTicketPriority.MEDIUM:
      return 'Medium'
    default:
      return 'Low'
  }
}

function mapStatusToString(status: string): string {
  return status === 'PENDING' ? 'Pending' : 'Completed'
}

// GET endpoint to fetch user's tickets
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Fetch tickets with replies for the authenticated user
    const tickets = await prisma.supportTicket.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        replies: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
    })

    // Group tickets by status
    const pending = tickets
      .filter(ticket => ticket.status === 'PENDING')
      .map(ticket => ({
        id: ticket.ticketId,
        subject: ticket.subject,
        category: mapCategoryToString(ticket.category),
        priority: mapPriorityToString(ticket.priority),
        status: mapStatusToString(ticket.status),
        createdAt: ticket.createdAt.toISOString(),
        lastUpdate: ticket.updatedAt.toISOString(),
        description: ticket.description,
      }))

    const completed = tickets
      .filter(ticket => ticket.status === 'COMPLETED')
      .map(ticket => ({
        id: ticket.ticketId,
        subject: ticket.subject,
        category: mapCategoryToString(ticket.category),
        priority: mapPriorityToString(ticket.priority),
        status: mapStatusToString(ticket.status),
        createdAt: ticket.createdAt.toISOString(),
        lastUpdate: ticket.updatedAt.toISOString(),
        description: ticket.description,
        resolution: ticket.resolution,
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
      }
    })

  } catch (error) {
    console.error('Support tickets API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch support tickets' },
      { status: 500 }
    )
  }
}
