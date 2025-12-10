import { NextRequest, NextResponse } from "next/server";
import { initiatePayment } from "@/app/actions/initiatePayment";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // Get authenticated user
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { name, mobile, amount, paymentType, creditValue } = await req.json();

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

    // Initiate PhonePe payment first to get transaction ID
    const result = await initiatePayment(amountNum, name, mobile);

    // Create pending payment record in database
    const payment = await prisma.payment.create({
      data: {
        userId: session.user.id,
        amount: amountNum,
        currency: 'INR',
        paymentCategory: paymentType,
        status: 'PENDING',
        paymentDate: new Date(),
        transactionId: result.transactionId,
        description: paymentType === 'MONTHLY'
          ? 'Monthly PRO Subscription'
          : `Addon Credits Purchase (${Math.floor(creditValue || 0) * 12} credits)`,
        value: paymentType === 'ADDON' ? Math.floor((creditValue || 0) * 12) : null, // Convert minutes to credits
      }
    });

    return NextResponse.json({
      success: true,
      redirectUrl: result.redirectUrl,
      transactionId: result.transactionId,
      paymentId: payment.id
    });

  } catch (error) {
    console.error("Payment initiation error:", error);
    return NextResponse.json(
      { error: "Failed to initiate payment. Please try again." },
      { status: 500 }
    );
  }
}
