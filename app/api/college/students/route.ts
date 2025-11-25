import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyCollegeToken } from "@/lib/auth-utils"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const collegeData = await verifyCollegeToken(token)

    if (!collegeData) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Fetch all student enrollments for this college
    const enrollments = await prisma.studentEnrollment.findMany({
      where: {
        collegeId: collegeData.id,
        isActive: true
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            status: true
          }
        }
      },
      orderBy: {
        enrollmentDate: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      enrollments
    })

  } catch (error) {
    console.error('Error fetching student enrollments:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}