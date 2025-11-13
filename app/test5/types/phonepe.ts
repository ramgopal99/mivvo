// PhonePe API Types and Interfaces

export interface PhonePeConfig {
  clientId: string
  clientSecret: string
  clientVersion: string
  merchantId: string
  environment: 'sandbox' | 'production'
  redirectUrl: string
  callbackUrl: string
}

export interface AuthTokenResponse {
  success: boolean
  access_token?: string
  token_type?: string
  expires_in?: number
  error?: string
  error_description?: string
}

export interface CreatePaymentRequest {
  merchantId: string
  merchantTransactionId: string
  merchantUserId: string
  amount: number // Amount in paise (e.g., 10000 = ₹100)
  redirectUrl: string
  redirectMode: 'REDIRECT' | 'POST'
  callbackUrl: string
  mobileNumber?: string
  paymentInstrument?: {
    type: 'PAY_PAGE' | 'UPI' | 'CARD' | 'NET_BANKING'
    targetApp?: string
  }
}

export interface CreatePaymentResponse {
  success: boolean
  code?: string
  message?: string
  data?: {
    merchantId: string
    merchantTransactionId: string
    instrumentResponse?: {
      type: string
      redirectInfo?: {
        url: string
        method: string
      }
    }
  }
  error?: string
}

export interface OrderStatusResponse {
  success: boolean
  code?: string
  message?: string
  data?: {
    merchantId: string
    merchantTransactionId: string
    transactionId?: string
    amount: number
    state: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED'
    responseCode: string
    paymentInstrument?: {
      type: string
      utr?: string
      pgTransactionId?: string
    }
  }
  error?: string
}

export interface RefundRequest {
  merchantId: string
  merchantUserId: string
  originalTransactionId: string
  merchantRefundId: string
  amount: number // Amount in paise
  callbackUrl: string
}

export interface RefundResponse {
  success: boolean
  code?: string
  message?: string
  data?: {
    merchantId: string
    merchantRefundId: string
    amount: number
    state: 'PENDING' | 'COMPLETED' | 'FAILED'
    responseCode: string
  }
  error?: string
}

export interface RefundStatusResponse {
  success: boolean
  code?: string
  message?: string
  data?: {
    merchantId: string
    merchantRefundId: string
    amount: number
    state: 'PENDING' | 'COMPLETED' | 'FAILED'
    responseCode: string
    transactionId?: string
  }
  error?: string
}

