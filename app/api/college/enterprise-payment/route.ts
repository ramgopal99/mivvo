import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

interface JWTPayload {
  role: string
  userId?: string
  collegeId?: string
  [key: string]: unknown
}

export async function POST(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    // Verify token
    let decoded: JWTPayload
    try {
      decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as JWTPayload
    } catch {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    // Check if user is a college admin
    if (decoded.role !== 'COLLEGE_ADMIN') {
      return NextResponse.json(
        { error: 'Access denied. College admin required.' },
        { status: 403 }
      )
    }

    let collegeId: string

    // Handle both old JWT structure (collegeId directly) and new structure (userId with college relationship)
    if (decoded.collegeId) {
      // Old structure - collegeId directly in JWT
      collegeId = decoded.collegeId
    } else if (decoded.userId) {
      // New structure - get collegeId from user relationship
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { collegeId: true }
      })

      if (!user || !user.collegeId) {
        return NextResponse.json(
          { error: 'College admin not associated with a college' },
          { status: 403 }
        )
      }

      collegeId = user.collegeId
    } else {
      return NextResponse.json(
        { error: 'Invalid token structure' },
        { status: 401 }
      )
    }

    const { amount, studentCount, ratePerStudent, description } = await request.json()

    // Validate required fields
    if (!amount || !studentCount || !ratePerStudent) {
      return NextResponse.json(
        { error: 'Amount, student count, and rate per student are required' },
        { status: 400 }
      )
    }

    // Generate billing period (current month)
    const now = new Date()
    const billingPeriod = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

    // Generate invoice number
    const invoiceNumber = `ENT-${collegeId.substring(0, 8).toUpperCase()}-${Date.now()}`

    // Create enterprise payment record
    const enterprisePayment = await prisma.enterprisePayment.create({
      data: {
        collegeId,
        amount: parseFloat(amount),
        paymentDate: new Date(),
        billingPeriod,
        studentCount: parseInt(studentCount),
        ratePerStudent: parseFloat(ratePerStudent),
        description,
        invoiceNumber,
        status: 'COMPLETED', // For test payments, mark as completed
        paidAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Enterprise payment created successfully',
      data: {
        id: enterprisePayment.id,
        amount: enterprisePayment.amount,
        studentCount: enterprisePayment.studentCount,
        invoiceNumber: enterprisePayment.invoiceNumber,
        billingPeriod: enterprisePayment.billingPeriod
      }
    })

  } catch (error) {
    console.error('Enterprise payment creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    // Verify token
    let decoded: JWTPayload
    try {
      decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as JWTPayload
    } catch {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    // Check if user is a college admin
    if (decoded.role !== 'COLLEGE_ADMIN') {
      return NextResponse.json(
        { error: 'Access denied. College admin required.' },
        { status: 403 }
      )
    }

    let collegeId: string

    // Handle both old JWT structure (collegeId directly) and new structure (userId with college relationship)
    if (decoded.collegeId) {
      // Old structure - collegeId directly in JWT
      collegeId = decoded.collegeId
    } else if (decoded.userId) {
      // New structure - get collegeId from user relationship
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { collegeId: true }
      })

      if (!user || !user.collegeId) {
        return NextResponse.json(
          { error: 'College admin not associated with a college' },
          { status: 403 }
        )
      }

      collegeId = user.collegeId
    } else {
      return NextResponse.json(
        { error: 'Invalid token structure' },
        { status: 401 }
      )
    }

    // Get enterprise payments for this college
    const enterprisePayments = await prisma.enterprisePayment.findMany({
      where: {
        collegeId
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    })

    return NextResponse.json({
      success: true,
      data: enterprisePayments
    })

  } catch (error) {
    console.error('Enterprise payments fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
