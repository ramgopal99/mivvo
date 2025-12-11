/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// Helper function to get client IP address
function getClientIP(request: NextRequest): string | null {
  // Try various headers that might contain the IP
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(',')[0].trim()
  }
  
  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP.trim()
  }
  
  // Fallback to connection remote address if available
  const cfConnectingIP = request.headers.get('cf-connecting-ip') // Cloudflare
  if (cfConnectingIP) {
    return cfConnectingIP.trim()
  }
  
  return null
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, subject, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Get client IP address
    const clientIP = getClientIP(request)

    // Check rate limit: 1 message per email per 24 hours
    const twentyFourHoursAgo = new Date()
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24)

    // Check email-based rate limit
    const recentMessagesByEmail = await prisma.contact.count({
      where: {
        email: email.toLowerCase().trim(),
        createdAt: {
          gte: twentyFourHoursAgo
        }
      }
    })

    if (recentMessagesByEmail >= 1) {
      return NextResponse.json(
        { 
          error: 'You have already sent a message in the last 24 hours. Please wait before submitting another message.',
          limitReached: true
        },
        { status: 429 } // Too Many Requests
      )
    }

    // Check IP-based rate limit (if IP is available)
    if (clientIP) {
      const recentMessagesByIP = await prisma.contact.count({
        where: {
          ipAddress: clientIP,
          createdAt: {
            gte: twentyFourHoursAgo
          }
        }
      })

      if (recentMessagesByIP >= 1) {
        return NextResponse.json(
          { 
            error: 'You have already sent a message in the last 24 hours. Please wait before submitting another message.',
            limitReached: true
          },
          { status: 429 } // Too Many Requests
        )
      }
    }

    // Create contact entry in database
    const contact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        email: email.toLowerCase().trim(),
        subject,
        message,
        ipAddress: clientIP,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully. We'll get back to you soon!",
        contact: {
          id: contact.id,
          createdAt: contact.createdAt,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating contact:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    )
  }
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

    // Fetch all contact messages, ordered by newest first
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: contacts,
      count: contacts.length
    })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contact messages' },
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

    const { id, status } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Contact ID is required' },
        { status: 400 }
      )
    }

    // Update contact status
    const updatedContact = await prisma.contact.update({
      where: { id },
      data: {
        status: status || 'COMPLETED',
        updatedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Contact status updated successfully',
      contact: updatedContact
    })
  } catch (error) {
    console.error('Error updating contact:', error)
    return NextResponse.json(
      { error: 'Failed to update contact status' },
      { status: 500 }
    )
  }
}

