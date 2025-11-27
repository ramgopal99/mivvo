import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyCollegeToken } from "@/lib/auth-utils"
import bcrypt from "bcryptjs"
import { CREDIT_PACKAGES } from "@/config/site"

export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const { rollNumber, studentName, studentEmail, studentPassword, enrollmentMonths, paymentAmount } = body

    // Validate required fields
    if (!rollNumber || !studentName || !studentEmail || !studentPassword || !enrollmentMonths || !paymentAmount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (studentPassword.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 })
    }

    // No capacity limits - unlimited enrollments allowed

    // Check if student email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: studentEmail }
    })

    if (existingUser) {
      return NextResponse.json({
        error: 'A user with this email already exists'
      }, { status: 400 })
    }

    // Check if roll number is already used in this college
    const existingEnrollment = await prisma.studentEnrollment.findFirst({
      where: {
        collegeId: collegeData.id,
        rollNumber: rollNumber,
        isActive: true
      }
    })

    if (existingEnrollment) {
      return NextResponse.json({
        error: 'This roll number is already enrolled in your college'
      }, { status: 400 })
    }

    // Hash the provided password and calculate expiration date
    const hashedPassword = await bcrypt.hash(studentPassword, 12)
    const expirationDate = new Date()
    expirationDate.setMonth(expirationDate.getMonth() + enrollmentMonths)

    // Start transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create user account with PRO credits
      const user = await tx.user.create({
        data: {
          name: studentName,
          email: studentEmail,
          password: hashedPassword,
          role: 'COLLEGE_STUDENT',
          status: 'ACTIVE',
          rollNumber: rollNumber,
          collegeName: collegeData.name,
          collegeId: collegeData.id,
          userType: 'PRO', // College students get PRO access
          totalCreditAllocation: CREDIT_PACKAGES.PRO, // Allocate PRO credits (360)
          usedCredits: 0 // Start with 0 used credits
        }
      })

      // Create payment record for individual student
      const payment = await tx.payment.create({
        data: {
          userId: user.id,
          amount: paymentAmount,
          currency: 'INR',
          paymentCategory: 'SUBSCRIPTION',
          status: 'COMPLETED', // Assume payment is successful for now
          paymentDate: new Date(),
          description: `Student enrollment for ${enrollmentMonths} months`
        }
      })

      // Generate billing period (current month)
      const now = new Date()
      const billingPeriod = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

      // Generate invoice number for enterprise payment
      const invoiceNumber = `ENROLL-${collegeData.id.substring(0, 8).toUpperCase()}-${Date.now()}`

      // Create enterprise payment record for billing history
      const enterprisePayment = await tx.enterprisePayment.create({
        data: {
          collegeId: collegeData.id,
          amount: paymentAmount,
          paymentDate: new Date(),
          billingPeriod,
          studentCount: 1, // Single student enrollment
          ratePerStudent: collegeData.monthlyRatePerUser,
          description: `Student enrollment: ${studentName} (${rollNumber}) - ${enrollmentMonths} months`,
          invoiceNumber,
          status: 'COMPLETED',
          paidAt: new Date()
        }
      })

      // Create student enrollment record
      const enrollment = await tx.studentEnrollment.create({
        data: {
          collegeId: collegeData.id,
          userId: user.id,
          rollNumber: rollNumber,
          enrollmentMonths: enrollmentMonths,
          enrollmentDate: new Date(),
          expirationDate: expirationDate,
          paymentAmount: paymentAmount,
          paymentStatus: 'COMPLETED',
          paymentId: payment.id,
          isActive: true
        }
      })

      // No need to update college student count - we track enrollments individually

      return { user, payment, enrollment, enterprisePayment }
    })

    return NextResponse.json({
      success: true,
      message: 'Student enrolled successfully',
      data: {
        userId: result.user.id,
        enrollmentId: result.enrollment.id,
        paymentId: result.payment.id,
        enterprisePaymentId: result.enterprisePayment.id,
        invoiceNumber: result.enterprisePayment.invoiceNumber,
        expirationDate: expirationDate.toISOString()
      }
    })

  } catch (error) {
    console.error('Error enrolling student:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
