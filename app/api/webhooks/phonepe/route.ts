import { NextRequest, NextResponse } from "next/server";
import { StandardCheckoutClient, Env } from 'pg-sdk-node';
import { prisma } from "@/lib/prisma";
import { CREDIT_PACKAGES, COURSE_ENROLLMENT_CREDITS, CREDIT_MULTIPLIER } from "@/config/site";


interface CoursePurchaseMetadata {
  courseId: string;
  courseName: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const body = await req.text();
        const signature = req.headers.get('x-verify');

        console.log('PhonePe webhook received:', body);
        console.log('Signature:', signature);

        // Require signature for all webhook requests (production security)
        // Get authorization header for PhonePe callback validation
        const authorization = req.headers.get('authorization');
        if (!authorization) {
            console.error('❌ No authorization header provided in webhook');
            return NextResponse.json({ error: "Unauthorized - authorization header required" }, { status: 401 });
        }

        // Get PhonePe credentials for callback validation
        const clientId = process.env.NEXT_PUBLIC_PHONE_PAY_CLIENT_ID;
        const clientSecret = process.env.NEXT_PUBLIC_PHONE_PAY_CLIENT_SECRET;
        const clientVersion = parseInt(process.env.NEXT_PUBLIC_PHONE_PAY_CLIENT_VERSION || "1");

        if (!clientId || !clientSecret) {
            console.error('❌ PhonePe credentials not configured');
            return NextResponse.json({ error: "Configuration error" }, { status: 500 });
        }

        // Get merchant callback credentials (these should be configured in PhonePe dashboard)
        const username = process.env.PHONEPE_WEBHOOK_USERNAME;
        const password = process.env.PHONEPE_WEBHOOK_PASSWORD;

        if (!username || !password) {
            console.error('❌ PhonePe webhook credentials not configured');
            console.error('Set PHONEPE_WEBHOOK_USERNAME and PHONEPE_WEBHOOK_PASSWORD');
            return NextResponse.json({ error: "Configuration error - webhook credentials missing" }, { status: 500 });
        }

        console.log('🔐 PhonePe Callback Validation:');
        console.log('Authorization header:', authorization.substring(0, 20) + '...');
        console.log('Username configured:', username ? '✅ Yes' : '❌ No');
        console.log('Password configured:', password ? '✅ Yes' : '❌ No');

        try {
            // Initialize PhonePe client for callback validation
            const env = process.env.NODE_ENV === 'production' ? Env.PRODUCTION : Env.SANDBOX;
            const client = StandardCheckoutClient.getInstance(clientId, clientSecret, clientVersion, env);

            // Validate the callback using PhonePe SDK
            const callbackResponse = client.validateCallback(
                username,
                password,
                authorization,
                body
            );

            console.log('✅ PhonePe callback validation successful');
            console.log('Callback type:', callbackResponse.type);
            console.log('Order state:', callbackResponse.payload?.state);

        } catch (error) {
            console.error('❌ PhonePe callback validation failed:', error);
            return NextResponse.json({
                error: "Invalid callback",
                details: "PhonePe callback validation failed",
                message: error instanceof Error ? error.message : "Unknown error"
            }, { status: 401 });
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

        // Extract payment details - handle PhonePe's nested payload structure
        let merchantOrderId, state;
        if (payload.payload) {
            // PhonePe's actual structure: payload contains the payment data
            merchantOrderId = payload.payload.merchantOrderId;
            state = payload.payload.state;
            console.log('📦 Extracted from payload:', { merchantOrderId, state });
        } else {
            // Fallback for other formats
            merchantOrderId = payload.merchantOrderId;
            state = payload.state;
            console.log('📦 Extracted from root:', { merchantOrderId, state });
        }

        if (!merchantOrderId) {
            console.error('❌ No merchantOrderId found in payload');
            return NextResponse.json({ error: "Invalid payload - missing merchantOrderId" }, { status: 400 });
        }

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

        console.log('🎯 Processing webhook for payment:', {
            paymentId: payment.id,
            transactionId: payment.transactionId,
            userId: payment.userId,
            amount: payment.amount,
            status: payment.status,
            state: state,
            category: payment.paymentCategory,
            timestamp: new Date().toISOString()
        });

        if (state === "COMPLETED") {
            // Update payment status to COMPLETED
            await prisma.payment.update({
                where: { id: payment.id },
                data: { status: 'COMPLETED' }
            });
            console.log('✅ Payment status updated to COMPLETED:', payment.id);

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
