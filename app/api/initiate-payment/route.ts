import { NextRequest, NextResponse } from "next/server";
import { initiatePayment } from "@/app/actions/initiatePayment";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CREDIT_PACKAGES, COURSE_ENROLLMENT_CREDITS, siteConfig } from "@/config/site";

interface CoursePurchaseMetadata {
  courseId: string;
  courseName: string;
}

// Test endpoint to manually complete a payment and test enrollment
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get('paymentId');

    if (!paymentId) {
      return NextResponse.json({ error: "paymentId required" }, { status: 400 });
    }

    // Find the payment
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId }
    });

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    // Mark as completed and process enrollment
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: 'COMPLETED' }
    });

    // Process enrollment if it's a course purchase
    if (payment.paymentCategory === 'COURSE_PURCHASE' && payment.metadata) {
      const metadata = payment.metadata as unknown as CoursePurchaseMetadata;
      if (metadata && metadata.courseId) {
        const enrollment =                 // Create enrollment
                await prisma.courseEnrollment.create({
                  data: {
                    userId: payment.userId,
                    courseId: metadata.courseId,
                    enrolledAt: new Date(),
                    isActive: true
                  }
                });

                // Allocate course credits
                try {
                  await prisma.courseCredit.create({
                    data: {
                      userId: payment.userId,
                      courseId: metadata.courseId,
                      totalCredits: COURSE_ENROLLMENT_CREDITS,
                      usedCredits: 0,
                      creditType: 'ENROLLMENT',
                      isActive: true,
                    },
                  });
                  console.log('✅ Course credits allocated (webhook test):', payment.userId, 'Course:', metadata.courseId);
                } catch (creditError) {
                  console.error('❌ Error allocating course credits (webhook test):', creditError);
                }

        return NextResponse.json({
          success: true,
          message: "Payment completed and enrollment created",
          enrollment: enrollment
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Payment completed (no enrollment needed)"
    });

  } catch (error) {
    console.error("Test completion error:", error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  console.log('API route called: /api/initiate-payment');

  // Parse request body first
  let body;
  try {
    body = await req.json();
    console.log('Request body:', body);
  } catch (parseError) {
    console.error('Failed to parse request body:', parseError);
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  try {
    // Check if this is a test request (no auth required for testp page)
    const { isTestRequest, name, mobile, amount, paymentType, creditValue, courseId, courseName } = body;

    console.log('🎯 Payment request received:', {
      paymentType,
      courseId,
      courseName,
      isTestRequest
    });

    // Validate required fields
    if (!name || !mobile || !amount || !paymentType) {
      return NextResponse.json(
        { error: "Missing required fields: name, mobile, amount, paymentType" },
        { status: 400 }
      );
    }

    // Validate payment type
    if (!["MONTHLY", "ADDON", "COURSE_PURCHASE"].includes(paymentType)) {
      return NextResponse.json(
        { error: "Invalid payment type. Must be MONTHLY, ADDON, or COURSE_PURCHASE" },
        { status: 400 }
      );
    }

    // Convert amount to number
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    // Get base URL for redirects
    const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

    let userId = null;

    if (!isTestRequest) {
      // Get authenticated user for production requests
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) {
        return NextResponse.json(
          { error: "Authentication required" },
          { status: 401 }
        );
      }
      userId = session.user.id;
    }

    // For test requests, provide mock response since PhonePe credentials may not be configured
    // Note: In production, webhooks at /api/webhooks/phonepe handle real payment updates
    if (isTestRequest) {
      const merchantId = process.env.NEXT_PUBLIC_PHONE_PAY_CLIENT_ID;
      const saltKey = process.env.NEXT_PUBLIC_PHONE_PAY_CLIENT_SECRET;

      if (!merchantId || !saltKey) {
        console.log('PhonePe credentials not configured - returning mock test response');

        // Generate mock transaction ID
        const mockTransactionId = "TEST_TXN_" + Date.now() + "_" + Math.random().toString(36).substring(2, 8);

        // Create and complete test payment record
        let testPayment = null;
        if (userId) {
          try {
            testPayment = await prisma.payment.create({
              data: {
                userId: userId,
                amount: amountNum,
                currency: 'INR',
                paymentCategory: paymentType || 'ADDON',
                status: 'COMPLETED', // Mark as completed immediately for test mode
                paymentDate: new Date(),
                transactionId: mockTransactionId,
                description: (paymentType === 'MONTHLY')
                  ? 'Monthly PRO Subscription (Test)'
                  : paymentType === 'COURSE_PURCHASE'
                  ? `Course Purchase: ${courseName || 'Unknown Course'} (Test)`
                  : `Addon Credits Purchase (${creditValue ? Math.floor(creditValue * 12) : Math.floor(amountNum * 10)} credits) (Test)`,
                value: paymentType === 'ADDON' ? (creditValue ? Math.floor(creditValue * 12) : Math.floor(amountNum * 10)) : null,
                metadata: paymentType === 'COURSE_PURCHASE' ? {
                  courseId,
                  courseName
                } : null,
              }
            });

            // Update user credits and status for test mode
            if (paymentType === 'MONTHLY') {
              await prisma.user.update({
                where: { id: userId },
                data: {
                  totalCreditAllocation: CREDIT_PACKAGES.PRO,
                  usedCredits: 0,
                  creditResetAt: new Date(),
                  userType: 'PRO'
                }
              });
              console.log(`✅ User ${userId} upgraded to PRO (test mode)`);
            } else if (paymentType === 'ADDON') {
              // Calculate credits from amount if creditValue not provided
              // Assuming ₹0.10 per credit (10 paise per credit)
              const creditsToAdd = creditValue ? Math.floor(creditValue * 12) : Math.floor(amountNum * 10); // amount * 10 credits per rupee
              await prisma.user.update({
                where: { id: userId },
                data: {
                  totalCreditAllocation: {
                    increment: creditsToAdd
                  }
                }
              });
              console.log(`✅ User ${userId} received ${creditsToAdd} credits (test mode)`);
            } else if (paymentType === 'COURSE_PURCHASE' && courseId) {
              // Enroll user in the course
              try {
                // First find the course by courseId to get the database ID
                const course = await prisma.course.findUnique({
                  where: { courseId: courseId },
                  select: { id: true, courseId: true, title: true },
                });

                if (!course) {
                  console.error('❌ Course not found for test enrollment:', courseId);
                  return;
                }

                // Create enrollment
                await prisma.courseEnrollment.create({
                  data: {
                    userId: userId,
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
                        userId: userId,
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
                      userId: userId,
                      courseId: course.id,
                      totalCredits: COURSE_ENROLLMENT_CREDITS,
                      usedCredits: 0,
                      creditType: 'ENROLLMENT',
                      isActive: true,
                    },
                  });
                  console.log(`✅ Course credits allocated (test mode): ${userId} Course: ${courseId}`);
                } catch (creditError) {
                  console.error('❌ Error allocating course credits (test mode):', creditError);
                }

                        console.log(`✅ User ${userId} enrolled in course ${courseId} (test mode)`);

                // Verify enrollment was created
                const enrollment = await prisma.courseEnrollment.findFirst({
                    where: {
                        userId: userId,
                        courseId: course.id
                    }
                });
                console.log('✅ Test enrollment verification:', enrollment ? 'SUCCESS' : 'FAILED');
              } catch (enrollmentError) {
                console.error('Failed to enroll user in course:', enrollmentError);
                // Continue with payment creation even if enrollment fails
              }
            }

            console.log('Test payment completed and user credits updated');

            // For test mode, automatically trigger webhook processing
            console.log('🧪 TEST MODE: Automatically triggering webhook processing for test payment');
            try {
              const testWebhookResponse = await fetch(`${baseUrl}/api/webhooks/phonepe?transactionId=${mockTransactionId}&state=COMPLETED`, {
                method: 'GET',
              });

              if (testWebhookResponse.ok) {
                const webhookResult = await testWebhookResponse.json();
                console.log('🧪 TEST MODE: Webhook processing result:', webhookResult);
              } else {
                console.error('🧪 TEST MODE: Failed to trigger webhook processing');
              }
            } catch (webhookError) {
              console.error('🧪 TEST MODE: Error triggering webhook:', webhookError);
            }
          } catch (dbError) {
            console.error('Database error in test mode:', dbError);
            throw dbError;
          }
        }

        return NextResponse.json({
          success: true,
          redirectUrl: `${baseUrl}/success/${mockTransactionId}`,
          transactionId: mockTransactionId,
          paymentId: testPayment?.id || "test_payment_" + Date.now(),
          message: "Test mode: Payment completed successfully. User credits updated."
        });
      }
    }

    console.log('About to call initiatePayment with:', { amountNum, name, mobile, isTestRequest });
    let result;
    try {
      // Initiate PhonePe payment first to get transaction ID
      result = await initiatePayment(amountNum, name, mobile, undefined, isTestRequest);
      console.log('initiatePayment result:', result);
    } catch (initiateError) {
      console.error('initiatePayment function failed:', initiateError);
      throw initiateError; // Re-throw to be caught by outer catch
    }

    let payment = null;

    // Create pending payment record in database (skip for test requests)
    if (userId) {
      try {
        payment = await prisma.payment.create({
          data: {
            userId: userId,
            amount: amountNum,
            currency: 'INR',
            paymentCategory: paymentType || 'ADDON',
            status: 'PENDING',
            paymentDate: new Date(),
            transactionId: result.transactionId,
            description: (paymentType === 'MONTHLY')
              ? 'Monthly PRO Subscription'
              : paymentType === 'COURSE_PURCHASE'
              ? `Course Purchase: ${courseName || 'Unknown Course'}`
              : `Addon Credits Purchase (${Math.floor(creditValue || 0) * 12} credits)`,
            value: paymentType === 'ADDON' ? Math.floor((creditValue || 0) * 12) : null, // Convert minutes to credits
            metadata: paymentType === 'COURSE_PURCHASE' ? {
              courseId,
              courseName
            } : null,
          }
        });
        console.log('Payment record created:', payment.id);

        // For test mode (development), automatically trigger webhook processing since PhonePe won't send real webhooks
        if (siteConfig.testMode && paymentType === 'COURSE_PURCHASE') {
          console.log('🧪 TEST MODE: Automatically triggering webhook processing for course purchase');
          try {
            const testWebhookResponse = await fetch(`${baseUrl}/api/webhooks/phonepe?transactionId=${result.transactionId}&state=COMPLETED`, {
              method: 'GET',
            });

            if (testWebhookResponse.ok) {
              const webhookResult = await testWebhookResponse.json();
              console.log('🧪 TEST MODE: Course purchase webhook processing result:', webhookResult);
            } else {
              console.error('🧪 TEST MODE: Failed to trigger course purchase webhook processing');
            }
          } catch (webhookError) {
            console.error('🧪 TEST MODE: Error triggering course purchase webhook:', webhookError);
          }
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
        throw dbError; // Re-throw to be caught by outer catch
      }
    }

    console.log('About to return success response');
    const response = NextResponse.json({
      success: true,
      redirectUrl: result.redirectUrl,
      transactionId: result.transactionId,
      paymentId: payment?.id || null
    });
    console.log('Response created successfully');
    return response;

  } catch (error) {
    console.error("Payment initiation error:", error);

    // For test requests, return the actual error for debugging
    if (body?.isTestRequest) {
      let errorMessage = "Failed to initiate payment. Please try again.";

      if (error instanceof Error) {
        // Try to extract PhonePe error details
        const errorMatch = error.message.match(/"message":"([^"]+)"/);
        if (errorMatch) {
          errorMessage = errorMatch[1];
        } else if (error.message.includes("KEY_NOT_CONFIGURED")) {
          errorMessage = "Payment gateway not configured. Please check merchant credentials.";
        } else if (error.message.includes("HTTP error!")) {
          errorMessage = "Payment gateway error. Please contact support.";
        }
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }

    // For production requests, return generic error
    return NextResponse.json(
      { error: "Failed to initiate payment. Please try again." },
      { status: 500 }
    );
  }
}
