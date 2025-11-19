/**
 * Credit conversion utility
 */

import { CREDIT_PACKAGE_MINUTES } from '@/config/site'

export const CREDITS_PER_MINUTE = 12

/**
 * Convert minutes to credits
 * @param minutes - Number of minutes
 * @returns Number of credits
 */
export function minutesToCredits(minutes: number): number {
  return minutes * CREDITS_PER_MINUTE
}

/**
 * Convert credits to minutes
 * @param credits - Number of credits
 * @returns Number of minutes
 */
export function creditsToMinutes(credits: number): number {
  return credits / CREDITS_PER_MINUTE
}

/**
 * Format credits for display
 * @param credits - Number of credits
 * @returns Formatted string (e.g., "30 credits", "1,200 credits")
 */
export function formatCredits(credits: number): string {
  if (credits >= 1000) {
    return `${(credits / 1000).toFixed(1)}K credits`
  }
  return `${credits} credits`
}

/**
 * Get credit package details
 */
export const CREDIT_PACKAGES = {
  FREE: minutesToCredits(CREDIT_PACKAGE_MINUTES.FREE), // FREE tier credits
  PRO: minutesToCredits(CREDIT_PACKAGE_MINUTES.PRO), // PRO tier credits
} as const

// =============================================================================
// CREDIT USAGE DISPLAY FUNCTIONS
// =============================================================================

export interface CreditUsageInfo {
  totalCredits: number
  usedCredits: number
  remainingCredits: number
  usagePercentage: number
}

/**
 * Calculate credit usage information
 * @param totalCredits - Total credits allocated
 * @param usedCredits - Credits already used
 * @returns Credit usage information object
 */
export function calculateCreditUsage(totalCredits: number, usedCredits: number): CreditUsageInfo {
  const remainingCredits = Math.max(0, totalCredits - usedCredits)
  const usagePercentage = totalCredits > 0 ? (usedCredits / totalCredits) * 100 : 0

  return {
    totalCredits,
    usedCredits,
    remainingCredits,
    usagePercentage
  }
}

/**
 * Format credit usage for display (e.g., "150 / 180 credits")
 * @param usedCredits - Credits used
 * @param totalCredits - Total credits available
 * @returns Formatted string
 */
export function formatCreditUsage(usedCredits: number, totalCredits: number): string {
  return `${formatCredits(usedCredits)} / ${formatCredits(totalCredits)}`
}

/**
 * Get credit usage status message
 * @param usageInfo - Credit usage information
 * @returns Status message string
 */
export function getCreditUsageStatus(usageInfo: CreditUsageInfo): string {
  if (usageInfo.usagePercentage >= 90) {
    return `Critical: ${usageInfo.remainingCredits} credits remaining`
  } else if (usageInfo.usagePercentage >= 75) {
    return `Low: ${usageInfo.remainingCredits} credits remaining`
  } else {
    return `${usageInfo.remainingCredits} credits remaining`
  }
}

/**
 * Check if credit usage is near limit
 * @param usageInfo - Credit usage information
 * @returns True if usage is 80% or more
 */
export function isCreditUsageNearLimit(usageInfo: CreditUsageInfo): boolean {
  return usageInfo.usagePercentage >= 80
}

/**
 * Format remaining credits with appropriate styling indication
 * @param usageInfo - Credit usage information
 * @returns Object with formatted text and style indicator
 */
export function formatRemainingCredits(usageInfo: CreditUsageInfo): {
  text: string
  isNearLimit: boolean
  statusColor: 'normal' | 'warning' | 'danger'
} {
  const isNearLimit = isCreditUsageNearLimit(usageInfo)
  let statusColor: 'normal' | 'warning' | 'danger' = 'normal'

  if (usageInfo.usagePercentage >= 90) {
    statusColor = 'danger'
  } else if (usageInfo.usagePercentage >= 75) {
    statusColor = 'warning'
  }

  return {
    text: formatCredits(usageInfo.remainingCredits),
    isNearLimit,
    statusColor
  }
}

