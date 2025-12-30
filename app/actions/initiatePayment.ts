"use server";

import { StandardCheckoutClient, Env, MetaInfo, StandardCheckoutPayRequest } from 'pg-sdk-node';
import { randomUUID } from 'crypto';
import { siteConfig } from '@/config/site';

export async function initiatePayment(amount: number, name: string, mobile: string, muid?: string, isTestRequest?: boolean) {
  // Check if this is a test request
  const isTestMode = isTestRequest || siteConfig.testMode;
  const merchantOrderId = isTestMode ? `test${randomUUID()}` : randomUUID();

  // Get base URL from environment or use localhost as fallback
  const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  // Use PhonePe SDK credentials
  const clientId = process.env.NEXT_PUBLIC_PHONE_PAY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_PHONE_PAY_CLIENT_SECRET;
  const clientVersion = parseInt(process.env.NEXT_PUBLIC_PHONE_PAY_CLIENT_VERSION || "1");
  const isProduction = process.env.NODE_ENV === 'production';
  const env = isProduction ? Env.PRODUCTION : Env.SANDBOX;

  if (!clientId || !clientSecret) {
    const missing = [];
    if (!clientId) missing.push('NEXT_PUBLIC_PHONE_PAY_CLIENT_ID');
    if (!clientSecret) missing.push('NEXT_PUBLIC_PHONE_PAY_CLIENT_SECRET');
    throw new Error(`Payment configuration incomplete. Missing environment variables: ${missing.join(', ')}`);
  }

  try {
    // Initialize PhonePe client
    const client = StandardCheckoutClient.getInstance(clientId, clientSecret, clientVersion, env);

    // Create meta info with user details
    const metaInfo = MetaInfo.builder()
      .udf1(name) // Customer name
      .udf2(mobile) // Customer mobile
      .udf3(muid || `USER${Date.now()}`) // Merchant user ID
      .build();

    // Create payment request
    // Note: Webhook URL configuration may need to be done via PhonePe dashboard
    // or using a different SDK method. The webhook endpoint is ready at /api/webhooks/phonepe
    const request = StandardCheckoutPayRequest.builder()
      .merchantOrderId(merchantOrderId)
      .amount(Math.round(amount * 100)) // Amount in paise
      .redirectUrl(`${baseUrl}/success/${merchantOrderId}`)
      .metaInfo(metaInfo)
      .build();

    console.log('Initiating PhonePe payment with SDK...');
    console.log('Merchant Order ID:', merchantOrderId);
    console.log('Amount:', Math.round(amount * 100), 'paise');
    console.log('Environment:', env);

    // Initiate payment using SDK
    const response = await client.pay(request);

    console.log('PhonePe SDK response:', JSON.stringify(response, null, 2));

    // Validate response
    if (!response || !response.redirectUrl) {
      console.error('Invalid response from PhonePe SDK:', response);
      throw new Error('Invalid response received from PhonePe');
    }

    return {
      redirectUrl: response.redirectUrl,
      transactionId: merchantOrderId,
    };

  } catch (error) {
    console.error("Error in server action:", error);

    // Handle SDK-specific errors
    if (error instanceof Error) {
      // Re-throw with more context
      throw new Error(`PhonePe payment initiation failed: ${error.message}`);
    }

    throw error;
  }
}