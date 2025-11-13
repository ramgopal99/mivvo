/**
 * Credit conversion utility
 * 12 credits = 1 minute of interview time
 */

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
  FREE: minutesToCredits(15), // 15 minutes = 180 credits
  PRO: minutesToCredits(360), // 6 hours (360 minutes) = 4,320 credits
} as const

