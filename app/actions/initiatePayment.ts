"use server";

import { v4 as uuidv4 } from "uuid";
import { SHA256 } from "crypto-js";

export async function initiatePayment(amount: number, name: string, mobile: string, muid?: string) {
  const transactionId = "Tr-" + uuidv4().toString().slice(-6);

  // Get base URL from environment or use localhost as fallback
  const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_URL || "http://localhost:3001";

  const payload = {
    merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
    merchantTransactionId: transactionId,
    merchantUserId: muid || "MUID-" + uuidv4().toString().slice(-6),
    name: name,
    mobileNumber: mobile,
    amount: Math.round(amount * 100), // Amount in paise
    redirectUrl: `${baseUrl}/status/${transactionId}`,
    redirectMode: "REDIRECT",
    callbackUrl: `${baseUrl}/status/${transactionId}`,
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const dataPayload = JSON.stringify(payload);
  const dataBase64 = Buffer.from(dataPayload).toString("base64");

  const fullURL = dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
  const dataSha256 = SHA256(fullURL).toString();

  const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;

  const UAT_PAY_API_URL = `${process.env.NEXT_PUBLIC_PHONE_PAY_HOST_URL}/pg/v1/pay`;

  try {
    const response = await fetch(UAT_PAY_API_URL, {
      method: 'POST',
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      body: JSON.stringify({ request: dataBase64 }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    return {
      redirectUrl: responseData.data.instrumentResponse.redirectInfo.url,
      transactionId: transactionId,
    };
  } catch (error) {
    console.error("Error in server action:", error);
    throw error;
  }
}
