import { NextRequest, NextResponse } from "next/server";
import sha256 from "crypto-js/sha256";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
        }

        const merchantId = process.env.NEXT_PUBLIC_MERCHANT_ID;
        const transactionId = id;

        if (!merchantId || !process.env.NEXT_PUBLIC_SALT_KEY || !process.env.NEXT_PUBLIC_SALT_INDEX) {
            return NextResponse.json({ error: "Payment configuration missing" }, { status: 500 });
        }

        const st = `/pg/v1/status/${merchantId}/${transactionId}` + process.env.NEXT_PUBLIC_SALT_KEY;
        const dataSha256 = sha256(st).toString();
        const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;

        const response = await fetch(`${process.env.NEXT_PUBLIC_PHONE_PAY_HOST_URL}/pg/v1/status/${merchantId}/${transactionId}`, {
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

        if (responseData.code === "PAYMENT_SUCCESS") {
            return new NextResponse("PAYMENT_SUCCESS", { status: 200 });
        } else {
            return new NextResponse("PAYMENT_FAILED", { status: 200 });
        }
    } catch (error) {
        console.error("Error in payment status check:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
