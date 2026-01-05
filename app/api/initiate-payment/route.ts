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
    const { name, mobile, amount, paymentType, creditValue, courseId, courseName } = body;

    console.log('🎯 Payment request received:', {
      paymentType,
      courseId,
      courseName
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

    // Get authenticated user
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    const userId = session.user.id;

    console.log('About to call initiatePayment with:', { amountNum, name, mobile });
    let result;
    try {
      // Initiate PhonePe payment first to get transaction ID
      result = await initiatePayment(amountNum, name, mobile);
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
    return NextResponse.json(
      { error: "Failed to initiate payment. Please try again." },
      { status: 500 }
    );
  }
}
