export const siteConfig = {
  name: "Mivvo",
  description: "AI-powered mock interviews that help you practice, improve, and land your dream job.",
  url: "https://mivvo.live",
  logo: "/mivvo.svg",
  email: "hello@mivvo.com",
  enableCourses: true, // Set to false to hide courses and prevent access
  enableForeignLanguage: true, // Set to false to hide foreign language and prevent access
  links: {
    twitter: "https://twitter.com/mivvo",
    github: "https://github.com/mivvo",
    linkedin: "https://linkedin.com/in/mivvo",
  },
}



// Credit calculation base multiplier (credits per minute)
export const CREDIT_MULTIPLIER = 12 as const

// Auto-calculated credit packages (minutes × CREDIT_MULTIPLIER credits per minute)
export const CREDIT_PACKAGES = {
  FREE: 15,   // 15 × 12 = 180 credits
  PRO: 300,     // 300 × 12 = 3600 credits
} as const

// Credit expiration configuration - set ONE of these values, others will be automatically calculated
const CREDIT_EXPIRATION = {
  SECONDS: 0,      // Set this for seconds
  MINUTES: 1,      // Set this for minutes
  HOURS: 0,        // Set this for hours
  DAYS: 0,        // Set this for days (currently active)
  MONTHS: 0,       // Set this for months (approximated as 30 days)
} as const

// Automatically calculate milliseconds based on the set value
const calculateResetPeriod = () => {
  if (CREDIT_EXPIRATION.MONTHS > 0) return CREDIT_EXPIRATION.MONTHS * 30 * 24 * 60 * 60 * 1000
  if (CREDIT_EXPIRATION.DAYS > 0) return CREDIT_EXPIRATION.DAYS * 24 * 60 * 60 * 1000
  if (CREDIT_EXPIRATION.HOURS > 0) return CREDIT_EXPIRATION.HOURS * 60 * 60 * 1000
  if (CREDIT_EXPIRATION.MINUTES > 0) return CREDIT_EXPIRATION.MINUTES * 60 * 1000
  if (CREDIT_EXPIRATION.SECONDS > 0) return CREDIT_EXPIRATION.SECONDS * 1000
  return 30 * 24 * 60 * 60 * 1000 // Default to 30 days
}

// Credit expiration configuration (in milliseconds) - credits expire after this time from allocation
export const CREDIT_RESET_CONFIG = {
  RESET_PERIOD_MS: calculateResetPeriod(),
} as const

// Pricing configuration (in INR)
export const PRICING_CONFIG = {
  // Monthly PRO plan pricing
  MONTHLY_PRO: {
    PRICE_INR: 249,
    CREDITS: CREDIT_PACKAGES.PRO,
    DESCRIPTION: 'Pro Plan'
  },

  // Addon credit pricing (input time in minutes, display as credits, store time in DB)
  ADDON_CREDITS: {
    PRICE_PER_CREDIT_PAISA: 10, // 10 paise = ₹0.10 per credit
    AVAILABLE_PACKAGES: [
      { rupees: 50, minutes: 40, display: `₹50 (${40 * CREDIT_MULTIPLIER} credits)` },    // 15 minutes = 180 credits
      { rupees: 100, minutes: 80, display: `₹100 (${80 * CREDIT_MULTIPLIER} credits)` },  // 30 minutes = 360 credits
      { rupees: 150, minutes: 125, display: `₹150 (${125 * CREDIT_MULTIPLIER} credits)` }   // 45 minutes = 540 credits
    ]
  }
} as const