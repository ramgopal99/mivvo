export const siteConfig = {
  name: "Mivvo",
  description: "AI-powered mock interviews that help you practice, improve, and land your dream job.",
  url: "https://mivvo.com",
  logo: "/mivvo.svg",
  email: "support@mivvo.com",
  enableCourses: false, // Set to false to hide courses and prevent access
  links: {
    twitter: "https://twitter.com/mivvo",
    github: "https://github.com/mivvo",
    linkedin: "https://linkedin.com/in/mivvo",
  },
}

// Credit package configuration (in minutes)
export const CREDIT_PACKAGE_MINUTES = {
  FREE: 15, // 15 minutes free for new users
  PRO: 360, // 6 hours (360 minutes) for pro users
} as const

// Credit expiration configuration - set ONE of these values, others will be automatically calculated
const CREDIT_EXPIRATION = {
  SECONDS: 0,      // Set this for seconds
  MINUTES: 0,      // Set this for minutes
  HOURS: 0,        // Set this for hours
  DAYS: 0,        // Set this for days (currently active)
  MONTHS: 1,       // Set this for months (approximated as 30 days)
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