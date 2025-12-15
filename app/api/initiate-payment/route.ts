import { NextRequest, NextResponse } from "next/server";
import { initiatePayment } from "@/app/actions/initiatePayment";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
    const { isTestRequest, name, mobile, amount, paymentType, creditValue } = body;

    // For test requests, provide mock response since PhonePe credentials may not be configured
    if (isTestRequest) {
      const merchantId = process.env.NEXT_PUBLIC_PHONE_PAY_CLIENT_ID;
      const saltKey = process.env.NEXT_PUBLIC_PHONE_PAY_CLIENT_SECRET;

      if (!merchantId || !saltKey) {
        console.log('PhonePe credentials not configured - returning mock test response');

        // Generate mock transaction ID
        const mockTransactionId = "TEST_TXN_" + Date.now() + "_" + Math.random().toString(36).substring(2, 8);

        return NextResponse.json({
          success: true,
          redirectUrl: `http://localhost:3001/status/${mockTransactionId}`,
          transactionId: mockTransactionId,
          paymentId: "test_payment_" + Date.now(),
          message: "Test mode: PhonePe credentials not configured. This is a mock response for development."
        });
      }
    }

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

    // Validate required fields
    if (!name || !mobile || !amount || !paymentType) {
      return NextResponse.json(
        { error: "Missing required fields: name, mobile, amount, paymentType" },
        { status: 400 }
      );
    }

    // Validate payment type
    if (!["MONTHLY", "ADDON"].includes(paymentType)) {
      return NextResponse.json(
        { error: "Invalid payment type. Must be MONTHLY or ADDON" },
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
              : `Addon Credits Purchase (${Math.floor(creditValue || 0) * 12} credits)`,
            value: paymentType === 'ADDON' ? Math.floor((creditValue || 0) * 12) : null, // Convert minutes to credits
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
