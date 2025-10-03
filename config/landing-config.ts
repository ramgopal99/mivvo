export const landingConfig = {
  hero: {
    newTag: {
      text: "AI-Powered",
      subtitle: "The future of interview preparation"
    },
    headline: {
      text: "AI Mock Interviews"
    },
    description: {
      text: "Practice with our advanced AI interviewer, get instant feedback, and receive detailed analysis to improve your performance and land your dream job."
    },
    cta: {
      text: "Start your first mock interview",
      href: "/auth/signin"
    },
    additionalInfo: {
      text: "Free to start • Instant AI feedback • Detailed performance analysis"
    },
  },
  navigation: {
    logo: {
      text: "Mivvo",
      icon: "🔥"
    },
    links: [
      { text: "Product", href: "#product" },
      { text: "Features", href: "#features" },
      { text: "Pricing", href: "#pricing" }
    ],
    actions: [
      { 
        text: "Log in", 
        href: "/auth/signin", 
        variant: "outline" as const
      },
      { 
        text: "Start for Free", 
        href: "/dashboard", 
        variant: "default" as const
      }
    ]
  },
  steps: {
    header: {
      title: "Get started with our simple 3 step process",
      tabOptions: [
        { label: "Steps", value: "steps" },
        { label: "Discover how Mivvo works", value: "discover" }
      ]
    },
    step1: {
      title: "Create Interview",
      description: "Set up your mock interview session and choose your preferred interview type and difficulty level.",
      form: {
        fields: [
          { label: "Your name", placeholder: "Enter your name", icon: "User" },
          { label: "Email", placeholder: "Enter your email", icon: "Mail" },
          { label: "Interview Type", placeholder: "Select type", icon: "Briefcase" },
          { label: "Duration", placeholder: "Select duration", icon: "Clock" }
        ],
        buttonText: "Create Interview"
      }
    },
    step2: {
      title: "Give Interview",
      description: "Practice with our AI interviewer that adapts to your responses and provides realistic interview scenarios.",
      interview: {
        status: "Ready to start",
        time: "00:00",
        aiName: "AI Interviewer",
        aiStatus: "Active",
        question: "Tell me about a challenging project you worked on and how you overcame obstacles.",
        listeningText: "AI is listening...",
        controls: [
          { text: "Mic Test", icon: "Mic" },
          { text: "Start", icon: "Play" }
        ],
        feedback: "Good answer!"
      }
    },
    step3: {
      title: "Get Analysis",
      description: "Receive detailed performance analysis with strengths, areas for improvement, and personalized recommendations.",
      analysis: {
        overallScore: {
          score: 85,
          text: "Excellent performance!"
        },
        performanceData: [
          { name: 'Communication', score: 85, colorClass: 'bg-green-500' },
          { name: 'Technical', score: 78, colorClass: 'bg-blue-500' },
          { name: 'Problem Solving', score: 92, colorClass: 'bg-purple-500' },
          { name: 'Confidence', score: 88, colorClass: 'bg-yellow-500' }
        ],
        improvementAreas: [
          { area: 'Body Language', priority: 'High', trend: 'up' },
          { area: 'Technical Depth', priority: 'Medium', trend: 'down' },
          { area: 'Time Management', priority: 'Low', trend: 'up' }
        ],
        recommendations: [
          { title: 'Practice STAR method', impact: 'High', category: 'Communication' },
          { title: 'Review system design basics', impact: 'Medium', category: 'Technical' },
          { title: 'Improve eye contact', impact: 'High', category: 'Presentation' },
          { title: 'Prepare 3-5 questions', impact: 'Low', category: 'Engagement' }
        ]
      }
    }
  },
  education: {
    header: {
      title: "Prepare students for real-world interviews",
      description: "Give your students the confidence they need with AI-powered mock interviews. Perfect for career preparation and placement training.",
      tabOptions: [
        { label: "For Schools & Colleges", value: "schools" },
        { label: "Student Practice Platform", value: "platform" }
      ]
    },
    features: [
      {
        title: "Campus-Wide Access",
        description: "Unlimited practice sessions for all students with institutional licensing.",
        icon: "GraduationCap"
      },
      {
        title: "Batch Management",
        description: "Organize students by batches, courses, and departments for easy tracking.",
        icon: "Users"
      },
      {
        title: "Curriculum Integration",
        description: "Seamlessly integrate with your existing career guidance and placement programs.",
        icon: "BookOpen"
      },
      {
        title: "Progress Analytics",
        description: "Track student progress, identify improvement areas, and generate detailed reports.",
        icon: "Award"
      }
    ],
    cta: {
      text: "Start Free Trial for Your Institution",
      href: "/auth/signin"
    },
    mockInterface: {
      title: "Computer Science Batch 2024",
      subtitle: "45 students • 12 completed interviews",
      status: "Active",
      stats: [
        { label: "Avg. Score", value: "78%", icon: "Star" },
        { label: "Completed", value: "12/45", icon: "CheckCircle" }
      ],
      students: [
        { name: "Priya Sharma", score: 85, status: "Completed" },
        { name: "Arjun Patel", score: 72, status: "In Progress" },
        { name: "Kavya Reddy", score: 91, status: "Completed" },
        { name: "Rahul Singh", score: 68, status: "Pending" }
      ]
    }
  },
  faq: {
    header: {
      title: "Questions?",
      subtitle: "We're Glad You Asked.",
      tabOptions: [
        { label: "FAQs", value: "faqs" },
        { label: "Questions you might have", value: "questions" }
      ]
    },
    questions: [
      {
        question: "How does the AI interviewer work?",
        answer: "Our AI interviewer uses advanced natural language processing to conduct realistic mock interviews. It adapts to your responses, asks follow-up questions, and provides real-time feedback based on industry best practices."
      },
      {
        question: "What types of interviews can I practice?",
        answer: "You can practice technical interviews, behavioral questions, system design discussions, coding challenges, and general interview scenarios. We cover software engineering, data science, product management, and more roles."
      },
      {
        question: "How accurate is the performance analysis?",
        answer: "Our AI analyzes your communication skills, technical knowledge, problem-solving approach, and confidence levels. The analysis is based on industry standards and provides detailed insights with actionable recommendations for improvement."
      },
      {
        question: "Can I use this for specific companies?",
        answer: "Yes! Our platform includes company-specific interview formats and questions from top tech companies like Google, Amazon, Microsoft, Apple, and many others. You can also practice with custom scenarios."
      },
      {
        question: "Is my data secure and private?",
        answer: "Absolutely. We use enterprise-grade encryption and never share your interview data. All recordings and analysis are stored securely and can be deleted at any time. We're fully GDPR compliant."
      },
      {
        question: "How much does it cost?",
        answer: "We offer a free tier with basic features, and premium plans starting at $19/month for unlimited interviews, advanced analytics, and company-specific practice sessions. Students and institutions get special pricing."
      }
    ]
  },
  cta: {
    headline: {
      main: "Master Interviews = Career Success",
      sub: ""
    },
    description: "Start practicing with AI and get detailed feedback delivered straight to your dashboard.",
    button: {
      text: "Get your first mock interview for free",
      href: "/auth/signin"
    },
    trustIndicators: [
      { icon: "Star", text: "4.9/5 Rating", color: "text-yellow-300" },
      { icon: "Users", text: "10,000+ Users", color: "text-white/60" },
      { icon: "Target", text: "85% Success Rate", color: "text-white/60" }
    ]
  },
  testimonials: {
    header: {
      badge: "Testimonials",
      subtitle: "Not just words, see results"
    },
    title: "Trusted by 100+ companies and students worldwide",
    testimonials: [
      {
        name: "Arjun Patel",
        role: "Software Engineer at Google",
        avatar: "https://avatar.iran.liara.run/public/boy",
        quote: "I received a job offer mid-course, and the AI practice sessions were current, if not more so, in the company I joined. I honestly feel I got every penny's worth.",
        description: "I was struggling with technical interviews for many months before I joined Mivvo. The AI interviewer was incredibly realistic and helped me practice exactly the types of questions I faced in real interviews. The detailed feedback on my communication style and technical knowledge was invaluable.",
        verified: "Verified Graduate",
        cardStyle: "purple"
      },
      {
        name: "Priya Sharma",
        role: "Product Manager @ Microsoft",
        avatar: "https://avatar.iran.liara.run/public/girl",
        quote: "The team was very supportive and kept me motivated throughout my interview preparation journey.",
        description: "I started as a total newbie with virtually no interview experience. Mivvo's AI interviewer adapted to my skill level and gradually increased the difficulty. The real-time feedback helped me identify my weak areas and improve systematically.",
        verified: "Verified Graduate",
        cardStyle: "dark-blue"
      },
      {
        name: "Vikram Joshi",
        role: "Data Scientist (Recent Graduate)",
        avatar: "https://avatar.iran.liara.run/public/boy",
        quote: "Such a life-changing experience. Highly recommended!",
        description: "Before joining Mivvo, I've never had proper interview practice and was extremely nervous about technical interviews. The AI interviewer was so realistic and comprehensive that I felt completely confident going into my actual interviews. The detailed analysis reports with specific feedback on my communication skills, technical knowledge, and problem-solving approach helped me understand exactly what I needed to work on. The personalized recommendations and practice sessions were incredibly valuable. I landed my dream job at a top tech company and couldn't be happier with the results! I would definitely recommend Mivvo to anyone looking for interview practice.",
        verified: "Verified Graduate",
        cardStyle: "white"
      },
      {
        name: "Rahul Singh",
        role: "Frontend Developer @ Apple",
        avatar: "https://avatar.iran.liara.run/public/boy",
        quote: "An overall wonderful and rewarding experience",
        description: "Thank you for the wonderful experience! I now have a job I really enjoy, and I owe it all to Mivvo's AI practice sessions. The personalized feedback and mock interviews prepared me perfectly for the real thing.",
        verified: "Verified Graduate",
        cardStyle: "white"
      },
      {
        name: "Ananya Gupta",
        role: "Full Stack Developer @ Amazon",
        avatar: "https://avatar.iran.liara.run/public/girl",
        quote: "Awesome teaching support from AI that actually understands interview dynamics. Getting guidance and learning from realistic scenarios was easy.",
        description: "The staff seem genuinely concerned about my progress which I find really refreshing. The AI interviewer provided such detailed feedback that I could see my improvement week by week. The program gave me the confidence I needed to excel in my interviews.",
        verified: "Verified Graduate",
        cardStyle: "dark-blue"
      }
    ]
  },
  footer: {
    brand: {
      description: "AI-powered mock interviews that help you practice, improve, and land your dream job."
    },
    company: {
      title: "Company",
      links: [
        { text: "Features", href: "#features" },
        { text: "Pricing", href: "#pricing" },
        { text: "Blog", href: "/blog" },
        { text: "About Us", href: "/about" }
      ]
    },
    support: {
      title: "Support",
      links: [
        { text: "FAQs", href: "#faq" },
        { text: "Contact Us", href: "/contact" }
      ]
    },
    social: [
      { name: "LinkedIn", href: "#", icon: "LinkedIn" },
      { name: "Twitter", href: "#", icon: "Twitter" },
      { name: "GitHub", href: "#", icon: "GitHub" }
    ],
    legal: [
      { text: "Privacy Policy", href: "/privacy" },
      { text: "Terms of Service", href: "/terms"       }
    ]
  },
  pricing: {
    header: {
      title: "Simple pricing for all your needs",
      subtitle: "Choose the plan that's right for you and start practicing today."
    },
    plans: [
      {
        name: "Free",
        isPopular: false,
        price: "0",
        currency: "₹",
        billingPeriod: "/month",
        description: "Perfect for getting started with AI mock interviews.",
        features: [
          "3 mock interviews per month",
          "Basic AI feedback",
          "Performance summary",
          "Email support",
          "Mobile app access"
        ],
        cta: {
          text: "Get Started Free",
          href: "/auth/signin"
        },
        buttonVariant: "outline" as const
      },
      {
        name: "Pro",
        isPopular: true,
        price: "999",
        currency: "₹",
        billingPeriod: "/month",
        description: "Best for serious job seekers and career changers.",
        features: [
          "Unlimited mock interviews",
          "Advanced AI analysis",
          "Detailed performance reports",
          "Company-specific practice",
          "Priority support",
          "Interview preparation tips",
          "Progress tracking",
          "Resume optimization tips"
        ],
        cta: {
          text: "Start Pro Trial",
          href: "/auth/signin"
        },
        buttonVariant: "default" as const
      },
      {
        name: "Enterprise",
        isPopular: false,
        price: "Custom",
        currency: "",
        billingPeriod: "",
        description: "For institutions and organizations training multiple users.",
        features: [
          "Everything in Pro",
          "Bulk user management",
          "Custom interview scenarios",
          "Advanced analytics dashboard",
          "Dedicated account manager",
          "API access",
          "Custom branding",
          "SLA guarantee"
        ],
        cta: {
          text: "Contact Sales",
          href: "/contact"
        },
        buttonVariant: "outline" as const
      }
    ]
  }
} as const
