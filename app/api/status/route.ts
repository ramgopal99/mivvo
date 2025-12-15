import { NextRequest, NextResponse } from "next/server";
import sha256 from "crypto-js/sha256";
import { prisma } from "@/lib/prisma";
import { CREDIT_PACKAGES } from "@/config/site";
import { CREDIT_MULTIPLIER } from "@/config/site";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
        }

        const transactionId = id;

        // Handle test/mock transactions
        if (transactionId.startsWith('TEST_TXN_')) {
            console.log('Handling test transaction:', transactionId);

            // For test transactions, simulate successful payment
            // Find if there's a test payment record (though we don't create one for tests)
            const payment = await prisma.payment.findFirst({
                where: { transactionId: transactionId },
                include: { user: true }
            });

            // Return success for test transactions
            return new NextResponse("PAYMENT_SUCCESS", { status: 200 });
        }

        const merchantId = process.env.NEXT_PUBLIC_PHONE_PAY_CLIENT_ID;
        const saltKey = process.env.NEXT_PUBLIC_PHONE_PAY_CLIENT_SECRET;
        const saltIndex = process.env.NEXT_PUBLIC_PHONE_PAY_CLIENT_VERSION || "1";

        if (!merchantId || !saltKey) {
            return NextResponse.json({ error: "Payment configuration missing" }, { status: 500 });
        }

        // Create checksum for status check
        const st = `/status/${merchantId}/${transactionId}` + saltKey;
        const dataSha256 = sha256(st).toString();
        const checksum = dataSha256 + "###" + saltIndex;

        const apiUrl = process.env.NEXT_PUBLIC_PHONE_PAY_HOST_URL || "https://api-preprod.phonepe.com/apis/merchant/pg/v1";

        const response = await fetch(`${apiUrl}/status/${merchantId}/${transactionId}`, {
            method: "GET",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                "X-VERIFY": checksum,
                "X-MERCHANT-ID": merchantId,
            },
        });

        if (!response.ok) {
            console.error("PhonePe API error:", response.status, response.statusText);
            return NextResponse.json({ error: "Failed to check payment status" }, { status: 500 });
        }

        const responseData = await response.json();

        // Find the payment record
        const payment = await prisma.payment.findFirst({
            where: { transactionId: transactionId },
            include: { user: true }
        });

        if (responseData.code === "PAYMENT_SUCCESS") {
            // Update payment status to COMPLETED
            if (payment) {
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
                } else if (payment.paymentCategory === 'ADDON' && payment.value) {
                    // Add purchased credits to existing allocation
                    await prisma.user.update({
                        where: { id: payment.userId },
                        data: {
                            totalCreditAllocation: {
                                increment: payment.value
                            }
                        }
                    });
                }
            }

            return new NextResponse("PAYMENT_SUCCESS", { status: 200 });
        } else if (responseData.code === "PAYMENT_PENDING" || responseData.code === "PAYMENT_INITIATED") {
            // Keep payment status as PENDING (already set when created)
            return new NextResponse("PAYMENT_PENDING", { status: 200 });
        } else {
            // Update payment status to FAILED
            if (payment) {
                await prisma.payment.update({
                    where: { id: payment.id },
                    data: { status: 'FAILED' }
                });
            }

            return new NextResponse("PAYMENT_FAILED", { status: 200 });
        }
    } catch (error) {
        console.error("Error in payment status check:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
