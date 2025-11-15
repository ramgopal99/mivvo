import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSessionUserData } from "@/lib/session"

// POST /api/feedback - Submit feedback
export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUserData()

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, message } = body

    // Validate required fields
    if (!title?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, message: "Title and message are required" },
        { status: 400 }
      )
    }

    // Check if user has already submitted feedback today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const existingFeedback = await prisma.feedback.findFirst({
      where: {
        userId: user.id,
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    })

    if (existingFeedback) {
      return NextResponse.json(
        { success: false, message: "You can only submit feedback once per day. Please try again tomorrow." },
        { status: 429 }
      )
    }

    // Save feedback to database
    const feedback = await prisma.feedback.create({
      data: {
        userId: user.id,
        title: title.trim(),
        message: message.trim(),
      },
    })

    return NextResponse.json({
      success: true,
      message: "Feedback submitted successfully",
      data: {
        id: feedback.id,
        createdAt: feedback.createdAt,
      },
    })

  } catch (error) {
    console.error("Error submitting feedback:", error)
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}

// GET /api/feedback - Get feedback for admin (optional, for admin panel)
export async function GET(request: NextRequest) {
  try {
    const user = await getSessionUserData()

    if (!user || user.role !== "SUPERADMIN") {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")

    const skip = (page - 1) * limit

    const where = {}

    const [feedback, total] = await Promise.all([
      prisma.feedback.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.feedback.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        feedback,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    })

  } catch (error) {
    console.error("Error fetching feedback:", error)
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}
