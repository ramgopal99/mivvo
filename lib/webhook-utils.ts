import { createHmac } from "crypto";

/**
 * Verify PhonePe webhook signature using HMAC-SHA256
 * @param body Raw request body as string
 * @param signature Signature from x-verify header
 * @param saltKey PhonePe client secret
 * @returns boolean indicating if signature is valid
 */
export function verifyPhonePeSignature(
  body: string,
  signature: string,
  saltKey: string
): boolean {
  try {
    // Generate expected HMAC-SHA256 signature
    const expectedSignature = createHmac('sha256', saltKey)
      .update(body)
      .digest('hex');

    // PhonePe sends signature in format: "signature###keyIndex"
    const receivedSignature = signature.split('###')[0];

    return expectedSignature === receivedSignature;
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
}
