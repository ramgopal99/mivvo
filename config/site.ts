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