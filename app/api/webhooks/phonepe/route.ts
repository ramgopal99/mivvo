import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { prisma } from "@/lib/prisma";
import { CREDIT_PACKAGES, COURSE_ENROLLMENT_CREDITS, CREDIT_MULTIPLIER } from "@/config/site";


interface CoursePurchaseMetadata {
  courseId: string;
  courseName: string;
}

// Test endpoint to simulate webhook for testing
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const transactionId = searchParams.get('transactionId');
    const state = searchParams.get('state') || 'COMPLETED';

    if (!transactionId) {
      return NextResponse.json({
        error: "transactionId parameter required"
      }, { status: 400 });
    }

    // Check if this is a test transaction (starts with 'test')
    const isTestTransaction = transactionId.startsWith('test');

    console.log('🧪 TEST WEBHOOK: Simulating webhook for transaction:', transactionId, 'State:', state, 'IsTest:', isTestTransaction);

    // Find the payment record
    const payment = await prisma.payment.findFirst({
      where: { transactionId: transactionId },
      include: { user: true }
    });

    if (!payment) {
      console.error('🧪 TEST WEBHOOK: Payment not found for transaction:', transactionId);
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    console.log('🧪 TEST WEBHOOK: Found payment:', payment.id, 'Category:', payment.paymentCategory, 'TestTx:', isTestTransaction);

    // Simulate webhook processing
    if (state === "COMPLETED") {
      // Update payment status to COMPLETED
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'COMPLETED' }
      });

      // Update user credits and status based on payment type
      if (payment.paymentCategory === 'MONTHLY') {
        await prisma.user.update({
          where: { id: payment.userId },
          data: {
            totalCreditAllocation: CREDIT_PACKAGES.PRO,
            usedCredits: 0,
            creditResetAt: new Date(),
            userType: 'PRO'
          }
        });
        console.log('🧪 TEST WEBHOOK: User upgraded to PRO:', payment.userId, isTestTransaction ? '(TEST)' : '');
      } else if (payment.paymentCategory === 'ADDON' && payment.value) {
        await prisma.user.update({
          where: { id: payment.userId },
          data: {
            totalCreditAllocation: {
              increment: payment.value/CREDIT_MULTIPLIER
            }
          }
        });
        console.log('🧪 TEST WEBHOOK: Added credits to user:', payment.userId, 'Credits:', payment.value, isTestTransaction ? '(TEST)' : '');
      } else if ((payment.paymentCategory as string) === 'COURSE_PURCHASE') {
        const metadata = payment.metadata as CoursePurchaseMetadata | null;
        if (metadata && metadata.courseId) {
          try {
            // First find the course by courseId to get the database ID
            const course = await prisma.course.findUnique({
              where: { courseId: metadata.courseId },
              select: { id: true, courseId: true, title: true },
            });

            if (!course) {
              console.error('🧪 TEST WEBHOOK: ❌ Course not found:', metadata.courseId, isTestTransaction ? '(TEST)' : '');
              return;
            }

            await prisma.courseEnrollment.create({
              data: {
                userId: payment.userId,
                courseId: course.id, // Use database primary key
                enrolledAt: new Date(),
                isActive: true
              }
            });

            // Allocate course credits
            try {
              await prisma.courseCredit.upsert({
                where: {
                  userId_courseId: {
                    userId: payment.userId,
                    courseId: course.id,
                  },
                },
                update: {
                  totalCredits: COURSE_ENROLLMENT_CREDITS,
                  usedCredits: 0,
                  creditType: 'ENROLLMENT',
                  isActive: true,
                },
                create: {
                  userId: payment.userId,
                  courseId: course.id,
                  totalCredits: COURSE_ENROLLMENT_CREDITS,
                  usedCredits: 0,
                  creditType: 'ENROLLMENT',
                  isActive: true,
                },
              });
              console.log('🧪 TEST WEBHOOK: ✅ Course credits allocated:', payment.userId, 'Course:', metadata.courseId, isTestTransaction ? '(TEST)' : '');
            } catch (creditError) {
              console.error('🧪 TEST WEBHOOK: ❌ Error allocating course credits:', creditError, isTestTransaction ? '(TEST)' : '');
            }

            console.log('🧪 TEST WEBHOOK: ✅ User enrolled in course:', payment.userId, 'Course:', metadata.courseId, isTestTransaction ? '(TEST)' : '');
          } catch (enrollmentError) {
            console.error('🧪 TEST WEBHOOK: ❌ Failed to enroll user in course:', enrollmentError, isTestTransaction ? '(TEST)' : '');
          }
        } else {
          console.error('🧪 TEST WEBHOOK: ❌ COURSE_PURCHASE missing metadata:', payment.metadata, isTestTransaction ? '(TEST)' : '');
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Test webhook processed successfully for transaction ${transactionId} ${isTestTransaction ? '(TEST)' : ''}`,
      paymentId: payment.id,
      state: state,
      isTestTransaction: isTestTransaction
    });

  } catch (error) {
    console.error('🧪 TEST WEBHOOK: Error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const body = await req.text();
        const signature = req.headers.get('x-verify');

        console.log('PhonePe webhook received:', body);
        console.log('Signature:', signature);

        if (!signature) {
            console.error('No signature provided in webhook');
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify webhook signature
        const saltKey = process.env.NEXT_PUBLIC_PHONE_PAY_CLIENT_SECRET;
        if (!saltKey) {
            console.error('Salt key not configured for webhook verification');
            return NextResponse.json({ error: "Configuration error" }, { status: 500 });
        }

        const expectedSignature = createHmac('sha256', saltKey)
            .update(body)
            .digest('hex');

        const receivedSignature = signature.split('###')[0];

        if (expectedSignature !== receivedSignature) {
            console.error('Invalid webhook signature');
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }

        // Parse the webhook payload
        let payload;
        try {
            payload = JSON.parse(body);
        } catch (parseError) {
            console.error('Failed to parse webhook payload:', parseError);
            return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
        }

        console.log('Parsed webhook payload:', JSON.stringify(payload, null, 2));

        // Extract payment details
        const { merchantOrderId, state } = payload;

        if (!merchantOrderId) {
            console.error('No merchantOrderId in webhook payload');
            return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
        }

        // Find the payment record
        const payment = await prisma.payment.findFirst({
            where: { transactionId: merchantOrderId },
            include: { user: true }
        });

        if (!payment) {
            console.warn('Payment record not found for merchantOrderId:', merchantOrderId);
            return NextResponse.json({ error: "Payment not found" }, { status: 404 });
        }

        console.log('🎯 Processing webhook for payment:', payment.id, 'State:', state, 'Category:', payment.paymentCategory);

        if (state === "COMPLETED") {
            // Update payment status to COMPLETED
            await prisma.payment.update({
                where: { id: payment.id },
                data: { status: 'COMPLETED' }
            });

            // Update user credits and status based on payment type
            if (payment.paymentCategory === 'MONTHLY') {
                // Upgrade user to PRO and reset credits
                await prisma.user.update({
                    where: { id: payment.userId },
                    data: {
                        totalCreditAllocation: CREDIT_PACKAGES.PRO,
                        usedCredits: 0,
                        creditResetAt: new Date(),
                        userType: 'PRO'
                    }
                });
                console.log('User upgraded to PRO:', payment.userId);
            } else if (payment.paymentCategory === 'ADDON' && payment.value) {
                // Add purchased credits to existing allocation
                await prisma.user.update({
                    where: { id: payment.userId },
                    data: {
                        totalCreditAllocation: {
                            increment: payment.value/CREDIT_MULTIPLIER  
                        }
                    }
                });
                console.log('Added credits to user:', payment.userId, 'Credits:', payment.value);
            } else if ((payment.paymentCategory as string) === 'COURSE_PURCHASE') {
                // Enroll user in the purchased course
                console.log('🎯 Processing COURSE_PURCHASE payment:', payment.id, 'Metadata:', payment.metadata);

                const metadata = payment.metadata as CoursePurchaseMetadata | null;
                if (metadata && metadata.courseId) {
                    console.log('🎯 Enrolling user in course:', metadata.courseId, 'User:', payment.userId);
                    try {
                        // First find the course by courseId to get the database ID
                        const course = await prisma.course.findUnique({
                            where: { courseId: metadata.courseId },
                            select: { id: true, courseId: true, title: true },
                        });

                        if (!course) {
                            console.error('❌ Course not found for enrollment:', metadata.courseId);
                            // Continue with other processing even if course not found
                        } else {
                            // Create enrollment
                            await prisma.courseEnrollment.create({
                                data: {
                                    userId: payment.userId,
                                    courseId: course.id, // Use database primary key
                                    enrolledAt: new Date(),
                                    isActive: true
                                }
                            });

                        // Allocate course credits
                        try {
                            await prisma.courseCredit.upsert({
                                where: {
                                    userId_courseId: {
                                        userId: payment.userId,
                                        courseId: course.id,
                                    },
                                },
                                update: {
                                    totalCredits: COURSE_ENROLLMENT_CREDITS,
                                    usedCredits: 0,
                                    creditType: 'ENROLLMENT',
                                    isActive: true,
                                },
                                create: {
                                    userId: payment.userId,
                                    courseId: course.id,
                                    totalCredits: COURSE_ENROLLMENT_CREDITS,
                                    usedCredits: 0,
                                    creditType: 'ENROLLMENT',
                                    isActive: true,
                                },
                            });
                            console.log('✅ Course credits allocated:', payment.userId, 'Course:', metadata.courseId);
                        } catch (creditError) {
                            console.error('❌ Error allocating course credits:', creditError);
                        }

                            console.log('✅ User enrolled in course:', payment.userId, 'Course:', metadata.courseId);

                            // Verify enrollment was created
                            const enrollment = await prisma.courseEnrollment.findFirst({
                                where: {
                                    userId: payment.userId,
                                    courseId: course.id
                                }
                            });
                            console.log('✅ Enrollment verification:', enrollment ? 'SUCCESS' : 'FAILED');
                        }
                    } catch (enrollmentError) {
                        console.error('❌ Failed to enroll user in course:', enrollmentError);
                        console.error('Enrollment error details:', {
                            userId: payment.userId,
                            courseId: metadata.courseId,
                            paymentId: payment.id
                        });
                        // Continue processing even if enrollment fails
                    }
                } else {
                    console.error('❌ COURSE_PURCHASE payment missing metadata or courseId:', {
                        paymentId: payment.id,
                        metadata: payment.metadata,
                        hasMetadata: !!payment.metadata
                    });
                }
            }
        } else if (state === "FAILED" || state === "CANCELLED") {
            // Update payment status to FAILED
            await prisma.payment.update({
                where: { id: payment.id },
                data: { status: 'FAILED' }
            });
            console.log('Payment marked as failed:', payment.id);
        } else {
            console.log('Unhandled payment state:', state);
        }

        return NextResponse.json({ status: "OK" }, { status: 200 });

    } catch (error) {
        console.error("Error processing PhonePe webhook:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
