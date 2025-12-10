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

    // Check rate limit: 2 feedback per 24 hours
    const twentyFourHoursAgo = new Date()
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24)

    const recentFeedbackCount = await prisma.feedback.count({
      where: {
        userId: user.id,
        createdAt: {
          gte: twentyFourHoursAgo
        }
      }
    })

    if (recentFeedbackCount >= 2) {
      return NextResponse.json(
        { success: false, message: "You have already submitted 2 feedback messages in the last 24 hours. Please wait before submitting another." },
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

    if (!user || (user.role !== "ADMIN" && user.role !== "SUPERADMIN")) {
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
