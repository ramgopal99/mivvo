import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { prisma } from "@/lib/prisma";
import { CREDIT_PACKAGES } from "@/config/site";
import { CREDIT_MULTIPLIER } from "@/config/site";

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

        console.log('Processing webhook for payment:', payment.id, 'State:', state);

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
                            increment: payment.value / CREDIT_MULTIPLIER
                        }
                    }
                });
                console.log('Added credits to user:', payment.userId, 'Credits:', payment.value / CREDIT_MULTIPLIER);
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
