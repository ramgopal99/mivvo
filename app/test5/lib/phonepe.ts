// PhonePe API Utility Functions

import {
  PhonePeConfig,
  AuthTokenResponse,
  CreatePaymentRequest,
  CreatePaymentResponse,
  OrderStatusResponse,
  RefundRequest,
  RefundResponse,
  RefundStatusResponse,
} from '../types/phonepe'
import crypto from 'crypto'

// Base URLs for different environments
const BASE_URLS = {
  sandbox: {
    auth: 'https://api-preprod.phonepe.com/apis/identity-manager',
    payment: 'https://api-preprod.phonepe.com/apis/pg-sandbox',
  },
  production: {
    auth: 'https://api.phonepe.com/apis/identity-manager',
    payment: 'https://api.phonepe.com/apis/pg',
  },
}

/**
 * Generate X-VERIFY header for PhonePe API requests
 * Format: SHA256(base64EncodedPayload + apiEndpoint + saltKey) + ### + saltIndex
 * 
 * For requests: payload is base64 encoded JSON string
 * For callbacks: payload is base64 encoded response body
 */
function generateXVerify(
  payload: string,
  apiEndpoint: string,
  saltKey: string,
  saltIndex: string
): string {
  // Base64 encode the payload for X-VERIFY calculation
  const base64Payload = Buffer.from(payload).toString('base64')
  const stringToHash = base64Payload + apiEndpoint + saltKey
  const sha256Hash = crypto.createHash('sha256').update(stringToHash).digest('hex')
  return sha256Hash + '###' + saltIndex
}

/**
 * Get authorization token from PhonePe
 */
export async function getAuthToken(config: PhonePeConfig): Promise<AuthTokenResponse> {
  try {
    const baseUrl = BASE_URLS[config.environment].auth
    const url = `${baseUrl}/v1/oauth/token`

    const credentials = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64')

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${credentials}`,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: config.clientId,
        client_secret: config.clientSecret,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Failed to get auth token',
        error_description: data.error_description,
      }
    }

    return {
      success: true,
      access_token: data.access_token,
      token_type: data.token_type,
      expires_in: data.expires_in,
    }
  } catch (error) {
    console.error('Error getting auth token:', error)
    return {
      success: false,
      error: 'Network error',
      error_description: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Create a payment request
 */
export async function createPayment(
  config: PhonePeConfig,
  authToken: string,
  paymentRequest: CreatePaymentRequest
): Promise<CreatePaymentResponse> {
  try {
    const baseUrl = BASE_URLS[config.environment].payment
    const url = `${baseUrl}/checkout/v2/pay`

    // Convert amount to paise if needed (assuming it's already in paise)
    const requestPayload = {
      merchantId: paymentRequest.merchantId,
      merchantTransactionId: paymentRequest.merchantTransactionId,
      merchantUserId: paymentRequest.merchantUserId,
      amount: paymentRequest.amount,
      redirectUrl: paymentRequest.redirectUrl,
      redirectMode: paymentRequest.redirectMode,
      callbackUrl: paymentRequest.callbackUrl,
      mobileNumber: paymentRequest.mobileNumber,
      paymentInstrument: paymentRequest.paymentInstrument || {
        type: 'PAY_PAGE',
      },
    }

    const payloadString = JSON.stringify(requestPayload)
    
    // Generate X-VERIFY header: SHA256(payload + apiEndpoint + saltKey) + ### + saltIndex
    const saltKey = process.env.PHONEPE_SALT_KEY || ''
    const saltIndex = process.env.PHONEPE_SALT_INDEX || '1'
    const apiEndpoint = '/checkout/v2/pay'
    const xVerify = generateXVerify(payloadString, apiEndpoint, saltKey, saltIndex)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
        'X-VERIFY': xVerify,
        'X-CLIENT-ID': config.clientId,
        'X-CLIENT-VERSION': config.clientVersion,
      },
      body: payloadString,
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'Failed to create payment',
        code: data.code,
      }
    }

    return {
      success: true,
      code: data.code,
      message: data.message,
      data: data.data,
    }
  } catch (error) {
    console.error('Error creating payment:', error)
    return {
      success: false,
      error: 'Network error',
      message: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Get order status
 */
export async function getOrderStatus(
  config: PhonePeConfig,
  authToken: string,
  merchantOrderId: string
): Promise<OrderStatusResponse> {
  try {
    const baseUrl = BASE_URLS[config.environment].payment
    const url = `${baseUrl}/checkout/v2/order/${merchantOrderId}/status`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
        'X-CLIENT-ID': config.clientId,
        'X-CLIENT-VERSION': config.clientVersion,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'Failed to get order status',
        code: data.code,
      }
    }

    return {
      success: true,
      code: data.code,
      message: data.message,
      data: data.data,
    }
  } catch (error) {
    console.error('Error getting order status:', error)
    return {
      success: false,
      error: 'Network error',
      message: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Create a refund request
 */
export async function createRefund(
  config: PhonePeConfig,
  authToken: string,
  refundRequest: RefundRequest
): Promise<RefundResponse> {
  try {
    const baseUrl = BASE_URLS[config.environment].payment
    const url = `${baseUrl}/payments/v2/refund`

    const requestPayload = {
      merchantId: refundRequest.merchantId,
      merchantUserId: refundRequest.merchantUserId,
      originalTransactionId: refundRequest.originalTransactionId,
      merchantRefundId: refundRequest.merchantRefundId,
      amount: refundRequest.amount,
      callbackUrl: refundRequest.callbackUrl,
    }

    const payloadString = JSON.stringify(requestPayload)
    
    // Generate X-VERIFY header: SHA256(payload + apiEndpoint + saltKey) + ### + saltIndex
    const saltKey = process.env.PHONEPE_SALT_KEY || ''
    const saltIndex = process.env.PHONEPE_SALT_INDEX || '1'
    const apiEndpoint = '/payments/v2/refund'
    const xVerify = generateXVerify(payloadString, apiEndpoint, saltKey, saltIndex)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
        'X-VERIFY': xVerify,
        'X-CLIENT-ID': config.clientId,
        'X-CLIENT-VERSION': config.clientVersion,
      },
      body: payloadString,
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'Failed to create refund',
        code: data.code,
      }
    }

    return {
      success: true,
      code: data.code,
      message: data.message,
      data: data.data,
    }
  } catch (error) {
    console.error('Error creating refund:', error)
    return {
      success: false,
      error: 'Network error',
      message: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Get refund status
 */
export async function getRefundStatus(
  config: PhonePeConfig,
  authToken: string,
  merchantRefundId: string
): Promise<RefundStatusResponse> {
  try {
    const baseUrl = BASE_URLS[config.environment].payment
    const url = `${baseUrl}/payments/v2/refund/${merchantRefundId}/status`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
        'X-CLIENT-ID': config.clientId,
        'X-CLIENT-VERSION': config.clientVersion,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'Failed to get refund status',
        code: data.code,
      }
    }

    return {
      success: true,
      code: data.code,
      message: data.message,
      data: data.data,
    }
  } catch (error) {
    console.error('Error getting refund status:', error)
    return {
      success: false,
      error: 'Network error',
      message: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Verify PhonePe callback X-VERIFY header
 * Format: SHA256(base64EncodedPayload + /pg/v1/status/{merchantId}/{merchantTransactionId} + saltKey) + ### + saltIndex
 */
export function verifyCallback(
  payload: any,
  xVerifyHeader: string | null,
  saltKey: string,
  saltIndex: string
): boolean {
  if (!xVerifyHeader || !saltKey) {
    return false
  }

  try {
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64')
    const merchantId = payload.merchantId || ''
    const merchantTransactionId = payload.merchantTransactionId || ''
    const apiEndpoint = `/pg/v1/status/${merchantId}/${merchantTransactionId}`
    const stringToHash = base64Payload + apiEndpoint + saltKey
    const calculatedHash = crypto.createHash('sha256').update(stringToHash).digest('hex')
    const expectedXVerify = calculatedHash + '###' + saltIndex

    return xVerifyHeader === expectedXVerify
  } catch (error) {
    console.error('Error verifying callback:', error)
    return false
  }
}

/**
 * Get PhonePe configuration from environment variables
 */
export function getPhonePeConfig(): PhonePeConfig {
  return {
    clientId: process.env.PHONEPE_CLIENT_ID || '',
    clientSecret: process.env.PHONEPE_CLIENT_SECRET || '',
    clientVersion: process.env.PHONEPE_CLIENT_VERSION || '1.0',
    merchantId: process.env.PHONEPE_MERCHANT_ID || '',
    environment: (process.env.PHONEPE_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox',
    redirectUrl: process.env.PHONEPE_REDIRECT_URL || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/test5/callback`,
    callbackUrl: process.env.PHONEPE_CALLBACK_URL || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/api/phonepe/callback`,
  }
}

