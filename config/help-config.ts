export interface HelpArticle {
  id: string
  title: string
  category: string
  content: string
  tags: string[]
  lastUpdated: string
}

export interface HelpCategory {
  id: string
  icon: string
  title: string
  description: string
  topics: HelpTopic[]
}

export interface HelpTopic {
  id: string
  title: string
  content: string
  articleId?: string
}

export interface FAQItem {
  question: string
  answer: string
}

export const helpArticles: HelpArticle[] = [
  {
    id: "getting-started",
    title: "Getting Started with Mivvo",
    category: "Getting Started",
    content: `
      Welcome to Mivvo! Here's how to get started:

      1. **Create your account** - Sign up with your email or use Google OAuth
      2. **Complete your profile** - Add your professional details
      3. **Start your first mock interview** - Choose from available templates
      4. **Review your results** - Get detailed feedback and improvement suggestions

      Our AI-powered platform will guide you through realistic interview scenarios.
    `,
    tags: ["onboarding", "basics", "first-steps"],
    lastUpdated: "2024-01-15"
  },
  {
    id: "interview-setup",
    title: "Setting Up Your First Interview",
    category: "Mock Interviews",
    content: `
      Ready for your first mock interview? Follow these steps:

      **Preparation:**
      - Ensure you have a quiet environment
      - Test your microphone and camera
      - Have your resume ready
      - Choose your preferred programming language

      **During the Interview:**
      - Speak clearly and at a normal pace
      - Think out loud for coding problems
      - Be honest about what you know
      - Take your time to formulate answers

      **After the Interview:**
      - Review detailed feedback
      - Practice weak areas
      - Schedule follow-up interviews
    `,
    tags: ["interviews", "setup", "preparation"],
    lastUpdated: "2024-01-10"
  },
  {
    id: "troubleshooting",
    title: "Common Technical Issues",
    category: "Technical Support",
    content: `
      Having trouble? Here are solutions to common issues:

      **Audio/Video Problems:**
      - Check browser permissions for camera/microphone
      - Try refreshing the page
      - Test in a different browser
      - Ensure stable internet connection

      **Code Editor Issues:**
      - Clear browser cache
      - Try incognito mode
      - Check for browser extensions conflicts
      - Ensure JavaScript is enabled

      **Login Problems:**
      - Clear cookies and cache
      - Try a different browser
      - Check if account is verified
      - Contact support if issues persist
    `,
    tags: ["troubleshooting", "technical", "issues"],
    lastUpdated: "2024-01-08"
  }
]

export const helpCategories: HelpCategory[] = [
  {
    id: "getting-started",
    icon: "Book",
    title: "Getting Started",
    description: "Learn the basics of using Mivvo platform",
    topics: [
      {
        id: "creating-account",
        title: "Creating an account",
        content: "Learn how to sign up and create your Mivvo account using email or Google OAuth.",
        articleId: "getting-started"
      },
      {
        id: "navigation-guide",
        title: "Navigation guide",
        content: "Understand the Mivvo dashboard and how to navigate between different sections.",
        articleId: "getting-started"
      },
      {
        id: "first-interview-setup",
        title: "First interview setup",
        content: "Step-by-step guide to setting up and starting your first mock interview.",
        articleId: "interview-setup"
      }
    ]
  },
  {
    id: "mock-interviews",
    icon: "MessageSquare",
    title: "Mock Interviews",
    description: "Everything about conducting mock interviews",
    topics: [
      {
        id: "starting-interview",
        title: "Starting an interview",
        content: "How to begin a new mock interview session and what to expect.",
        articleId: "interview-setup"
      },
      {
        id: "using-ai-features",
        title: "Using AI features",
        content: "Learn about the AI-powered feedback and analysis features during interviews."
      },
      {
        id: "reviewing-results",
        title: "Reviewing results",
        content: "How to access and understand your interview performance and feedback."
      }
    ]
  },
  {
    id: "account-profile",
    icon: "User",
    title: "Account & Profile",
    description: "Manage your account settings and profile",
    topics: [
      {
        id: "updating-profile",
        title: "Updating profile",
        content: "How to update your personal information and professional details."
      },
      {
        id: "password-management",
        title: "Password management",
        content: "Change your password and manage account security settings."
      },
      {
        id: "account-preferences",
        title: "Account preferences",
        content: "Customize your account settings and notification preferences."
      }
    ]
  },
  {
    id: "billing-plans",
    icon: "CreditCard",
    title: "Billing & Plans",
    description: "Questions about subscriptions and payments",
    topics: [
      {
        id: "plan-comparison",
        title: "Plan comparison",
        content: "Compare different subscription plans and their features."
      },
      {
        id: "payment-methods",
        title: "Payment methods",
        content: "Supported payment methods and how to update billing information."
      },
      {
        id: "billing-history",
        title: "Billing history",
        content: "View and download your billing history and invoices."
      }
    ]
  },
  {
    id: "technical-support",
    icon: "Settings",
    title: "Technical Support",
    description: "Technical issues and troubleshooting",
    topics: [
      {
        id: "browser-compatibility",
        title: "Browser compatibility",
        content: "Which browsers are supported and system requirements.",
        articleId: "troubleshooting"
      },
      {
        id: "video-audio-issues",
        title: "Video/audio issues",
        content: "Troubleshoot common video and audio problems during interviews.",
        articleId: "troubleshooting"
      },
      {
        id: "error-messages",
        title: "Error messages",
        content: "Common error messages and how to resolve them."
      }
    ]
  },
  {
    id: "privacy-security",
    icon: "Shield",
    title: "Privacy & Security",
    description: "Your data privacy and security questions",
    topics: [
      {
        id: "data-protection",
        title: "Data protection",
        content: "How we protect your data and ensure privacy."
      },
      {
        id: "privacy-settings",
        title: "Privacy settings",
        content: "Control your privacy settings and data sharing preferences."
      },
      {
        id: "security-features",
        title: "Security features",
        content: "Learn about our security measures and data encryption."
      }
    ]
  }
]

export const faqItems: FAQItem[] = [
  {
    question: "How much does Mivvo cost?",
    answer: "We offer flexible pricing plans starting from $9.99/month for basic features, with premium plans available for advanced interview scenarios."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period."
  },
  {
    question: "What programming languages are supported?",
    answer: "We support all major programming languages including JavaScript, Python, Java, C++, Go, and many more."
  },
  {
    question: "Is my interview data private?",
    answer: "Absolutely. All interview data is encrypted and stored securely. We never share your personal information or interview content."
  }
]
