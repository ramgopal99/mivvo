import { NextRequest, NextResponse } from "next/server";
import { initiatePayment } from "@/app/actions/initiatePayment";

export async function POST(req: NextRequest) {
  try {
    const { name, mobile, amount, muid } = await req.json();

    // Validate required fields
    if (!name || !mobile || !amount) {
      return NextResponse.json(
        { error: "Missing required fields: name, mobile, amount" },
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

    const result = await initiatePayment(amountNum, name, mobile, muid);

    return NextResponse.json({
      success: true,
      redirectUrl: result.redirectUrl,
      transactionId: result.transactionId
    });

  } catch (error) {
    console.error("Payment initiation error:", error);
    return NextResponse.json(
      { error: "Failed to initiate payment. Please try again." },
      { status: 500 }
    );
  }
}
