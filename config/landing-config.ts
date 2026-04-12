import { CREDIT_PACKAGES, CREDIT_MULTIPLIER } from './site'

export const landingConfig = {
  hero: {
    newTag: {
      text: "AI-Powered",
      subtitle: "Interview prep, upgraded"
    },
    headline: {
      text: "Ace Interviews with AI & Courses"
    },
    description: {
      text: "Practice with AI mock interviews and courses. Instant feedback for tech, corporate, and professional roles."
    },
    cta: {
      text: "Start Learning Today",
      mobileText: "Get Started",
      href: "/auth/signup"
    },
    additionalInfo: {
      text: "Free to start • AI interviews • Courses • Instant feedback"
    },
  },
  navigation: {
    logo: {
      text: "Mivvo",
      icon: "🔥"
    },
    links: [
      { text: "Features", href: "/#features" },
      { text: "Pricing", href: "/pricing" },
      { text: "Courses", href: "/courses" },
      // { text: "Blog", href: "/blog" },
      { text: "About", href: "/about" },
    ],
    actions: [
      { 
        text: "Log in", 
        href: "/auth/signin", 
        variant: "outline" as const
      },
      { 
        text: "Sign up", 
        href: "/auth/signup", 
        variant: "default" as const
      }
    ]
  },
  steps: {
    header: {
      title: "Start in 3 steps",
      description: "Create a session, interview with AI, then review your analysis.",
      tabOptions: [
        { label: "Steps", value: "steps" },
        { label: "How it works", value: "discover" }
      ]
    },
    step1: {
      title: "Create Interview",
      description: "Pick interview type, difficulty, and duration.",
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
      description: "Voice practice with an AI that adapts to your answers.",
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
      description: "See scores, strengths, and clear next steps.",
      analysis: {
        overallScore: {
          score: 85,
          text: "Excellent performance!"
        },
        performanceData: [
          { name: 'Communication', score: 85, colorClass: 'bg-primary' },
          { name: 'Technical', score: 78, colorClass: 'bg-primary' },
          { name: 'Problem Solving', score: 92, colorClass: 'bg-primary' },
          { name: 'Confidence', score: 88, colorClass: 'bg-primary' }
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
      title: "For colleges & coaching",
      description: "AI mock interviews for tech, corporate, and public-sector prep—plus progress you can track.",
      tabOptions: [
        { label: "Institutions", value: "colleges" },
        { label: "Student platform", value: "platform" }
      ]
    },
    features: [
      {
        title: "Tech interviews",
        description: "Software, data, and product-style practice.",
        icon: "GraduationCap"
      },
      {
        title: "Govt & admin",
        description: "Public-sector and administrative scenarios.",
        icon: "Users"
      },
      {
        title: "Finance & business",
        description: "Corporate and finance-style questions.",
        icon: "BookOpen"
      },
      {
        title: "Analytics",
        description: "Batch progress and performance reports.",
        icon: "Award"
      }
    ],
    cta: {
      text: "Contact for institutions",
      mobileText: "Contact",
      href: "/contact"
    },
    mockInterface: {
      title: "Campus program 2026",
      subtitle: "120 students • 45 interviews",
      status: "Active",
      stats: [
        { label: "Avg. Score", value: "82%", icon: "Star" },
        { label: "Completed", value: "45/120", icon: "CheckCircle" }
      ],
      students: [
        { name: "Priya Sharma", score: 85, status: "Completed" },
        { name: "Arjun Patel", score: 72, status: "In Progress" },
        { name: "Kavya Reddy", score: 91, status: "Completed" },
        { name: "Rahul Singh", score: 68, status: "Pending" }
      ]
    }
  },
  recruiters: {
    header: {
      title: "Screen faster with AI interviews",
      description:
        "JD-based voice screens for every candidate—consistent, fair signal without booking dozens of intro calls.",
      tabOptions: [
        { label: "Recruiters", value: "recruiters" },
        { label: "AI screening", value: "workflow" }
      ]
    },
    features: [
      {
        title: "JD-aligned",
        description: "Questions match role and seniority from your job description.",
        icon: "FileText"
      },
      {
        title: "Voice AI",
        description: "Adaptive follow-ups—more signal than static forms alone.",
        icon: "Mic"
      },
      {
        title: "Scores & summaries",
        description: "Compare candidates with structured breakdowns.",
        icon: "BarChart3"
      },
      {
        title: "Scale invites",
        description: "Run many screens in parallel; your team focuses on final rounds.",
        icon: "Users"
      }
    ],
    cta: {
      text: "Talk to sales",
      mobileText: "Contact",
      href: "/contact"
    },
    mockInterface: {
      title: "Senior Backend Engineer — AI screen",
      subtitle: "Role from JD • 24 invites • 18 completed",
      status: "Live",
      roleBadge: "Technical",
      stats: [
        { label: "Completed", value: "18/24", icon: "CheckCircle" },
        { label: "Median score", value: "78", icon: "BarChart3" }
      ],
      candidates: [
        { initials: "AM", name: "Alex Morgan", detail: "AI interview • 12 min", score: 82, label: "Strong fit" },
        { initials: "SK", name: "Sam Khan", detail: "AI interview • 14 min", score: 71, label: "Review" },
        { initials: "JL", name: "Jordan Lee", detail: "In progress", score: null, label: "Pending" }
      ]
    }
  },
  courses: {
    header: {
      title: "Skills built for real interviews",
      description: "Courses for programming, aptitude, and interview-style practice in one place.",
      tabOptions: [
        { label: "Courses", value: "courses" },
        { label: "Interview prep", value: "preparation" }
      ]
    },
    features: [
      {
        title: "All-in-one prep",
        description: "Programming, aptitude, and foundations together.",
        icon: "BookOpen"
      },
      {
        title: "Built-in IDE",
        description: "Code inside the course on interview-style problems.",
        icon: "Code"
      },
      {
        title: "Formulas & calculator",
        description: "Quick references and tools for aptitude drills.",
        icon: "Calculator"
      },
      {
        title: "Progress",
        description: "One dashboard for learning and practice.",
        icon: "Award"
      }
    ],
    stats: [
      { label: "Success rate", value: "85%", icon: "Users" },
      { label: "Courses", value: "25+", icon: "BookOpen" },
      { label: "Avg. boost", value: "+23%", icon: "Award" },
      { label: "Instructors", value: "15+", icon: "GraduationCap" }
    ],
    cta: {
      text: "Explore All Courses",
      mobileText: "Start Learning",
      href: "/courses"
    }
  },
  faq: {
    header: {
      title: "FAQ",
      subtitle: "Quick answers",
      tabOptions: [
        { label: "FAQs", value: "faqs" },
        { label: "More", value: "questions" }
      ]
    },
    questions: [
      {
        question: "What interview types are supported?",
        answer: "Technical (coding, system design), HR/behavioral, CV- and JD-based, government, finance, and corporate scenarios."
      },
      {
        question: "How does the AI interviewer work?",
        answer: "Voice-style practice with follow-ups that adapt to your answers, plus structured scoring after each session."
      },
      {
        question: "What about courses?",
        answer: "Technical, interview prep, coding basics, and career topics—with new content added regularly."
      },
      {
        question: "Colleges and coaching?",
        answer: "Yes—licensing with batches, tracking, and tech plus professional interview tracks."
      },
      {
        question: "How good is the analysis?",
        answer: "Scores communication, technical depth, problem-solving, and confidence with practical improvement tips."
      },
    ]
  },
  cta: {
    headline: {
      main: "Practice smarter. Interview stronger.",
      sub: ""
    },
    description: "AI interviews plus courses—feedback on your dashboard in minutes.",
    button: {
      text: "Start Learning Today",
      mobileText: "Get Started",
      href: "/auth/signup"
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
      subtitle: "Real outcomes"
    },
    title: "From learners who used Mivvo",
    testimonials: [
      {
        name: "Arjun Patel",
        role: "Software Engineer at Google",
        avatar: "https://avatar.iran.liara.run/public/boy",
        quote: "Offer mid-course—the practice matched what I saw on the job.",
        description: "Technical rounds finally clicked after realistic AI sessions and clear feedback.",
        verified: "Verified Graduate",
        cardStyle: "purple"
      },
      {
        name: "Priya Sharma",
        role: "Government Administrator",
        avatar: "https://avatar.iran.liara.run/public/girl",
        quote: "Govt-style scenarios felt spot-on.",
        description: "Admin and policy-style questions plus feedback on structure helped me pass.",
        verified: "Verified Graduate",
        cardStyle: "dark-blue"
      },
      {
        name: "Vikram Joshi",
        role: "Financial Services Professional",
        avatar: "https://avatar.iran.liara.run/public/boy",
        quote: "Worth it for finance interview prep.",
        description: "Business cases and communication notes sharpened my answers fast.",
        verified: "Verified Graduate",
        cardStyle: "white"
      },
      {
        name: "Rahul Singh",
        role: "Public Sector Officer",
        avatar: "https://avatar.iran.liara.run/public/boy",
        quote: "Prepared me for the real panel.",
        description: "GK and admin-style drills matched the format I faced.",
        verified: "Verified Graduate",
        cardStyle: "white"
      },
      {
        name: "Ananya Gupta",
        role: "Full Stack Developer @ Amazon",
        avatar: "https://avatar.iran.liara.run/public/girl",
        quote: "Feedback I could act on every week.",
        description: "Scenarios felt like real loops—not generic Q&A.",
        verified: "Verified Graduate",
        cardStyle: "dark-blue"
      },
      {
        name: "Siddharth Jain",
        role: "Software Engineer @ Microsoft",
        avatar: "https://avatar.iran.liara.run/public/boy",
        quote: "Courses plus AI interviews closed the gap.",
        description: "System design study, then mock rounds—integrated and practical.",
        verified: "Verified Graduate",
        cardStyle: "purple"
      },
      {
        name: "Meera Patel",
        role: "Data Scientist @ Google",
        avatar: "https://avatar.iran.liara.run/public/girl",
        quote: "Learned concepts, then stress-tested them in mocks.",
        description: "Algorithms through ML topics—interviews forced me to explain clearly.",
        verified: "Verified Graduate",
        cardStyle: "dark-blue"
      }
    ]
  },
  features: {
    header: {
      headline: {
        firstPart: "Everything to",
        secondPart: "nail interviews & skills"
      },
      description: "AI mock interviews and courses for tech, corporate, and professional tracks."
    },
    mainFeatures: {
      aiInterviews: {
        title: "AI interviews + courses",
        description: "Practice and learn in one flow—technical to corporate roles."
      },
      technicalCoding: {
        title: "Coding & technical depth",
        description: "IDE-style practice plus AI sessions for coding rounds."
      },
      performanceAnalytics: {
        header: "Analytics",
        badge: "Live Session",
        mainScore: 85,
        scoreLabel: "Interview Score",
        metrics: [
          {
            name: "Confidence",
            value: 78,
            color: "primary"
          },
          {
            name: "Technical",
            value: 92,
            color: "primary"
          },
          {
            name: "Communication",
            value: 88,
            color: "primary"
          }
        ]
      },
      companyPractice: {
        title: "Many interview styles",
        description: "Tech, public sector, finance, consulting, and more—same platform.",
        interviewCalls: [
          { company: "Google", role: "Senior SWE", type: "Technical" },
          { company: "Amazon", role: "Full Stack", type: "System design" },
          { company: "Microsoft", role: "Frontend", type: "Coding" },
          { company: "Government", role: "Administrator", type: "Admin" },
          { company: "Finance", role: "Analyst", type: "Finance" },
          { company: "Consulting", role: "Consultant", type: "Case" },
          { company: "Healthcare", role: "Administrator", type: "Policy" },
          { company: "Defense", role: "Officer", type: "Leadership" },
          { company: "Netflix", role: "Backend", type: "Architecture" },
          { company: "Tesla", role: "Full Stack", type: "Problem solving" },
          { company: "Uber", role: "Mobile", type: "Code review" }
        ]
      }
    }
  },
  footer: {
    brand: {
      description: "AI mock interviews and courses to practice, learn, and get hired."
    },
    company: {
      title: "Company",
      links: [
        { text: "Features", href: "/#features" },
        { text: "Pricing", href: "/pricing" },
        // { text: "Blog", href: "/blog" },
        { text: "About Us", href: "/about" }
      ]
    },
    support: {
      title: "Support",
      links: [
        { text: "FAQs", href: "/#faq" },
        { text: "Contact Us", href: "/contact" }
      ]
    },
    social: [
      { name: "Instagram", href: "https://www.instagram.com/mivvo2025/?hl=en", icon: "Instagram" }
    ],
    legal: [
      { text: "Privacy Policy", href: "/privacy" },
      { text: "Terms of Service", href: "/terms"       }
    ]
  },
  pricing: {
    header: {
      title: "Simple pricing",
      subtitle: "Pick a plan and start practicing.",
      additionalInfo: `${CREDIT_PACKAGES.FREE * CREDIT_MULTIPLIER} credits free • No card`
    },
    plans: [
      {
        name: "Free",
        isPopular: false,
        price: "180",
        currency: "",
        billingPeriod: `credits`,
        description: "Pro-level features with free credits—no card.",
        features: [
          "180 credits",
          "AI analysis",
          "Performance reports",
          "Company practice",
          "Custom interviews",
          "Priority support"
        ],
        cta: {
          text: "Get Started Free",
          href: "/auth/signup"
        },
        buttonVariant: "outline" as const
      },
      {
        name: "Pro",
        isPopular: true,
        price: "249",
        currency: "₹",
        billingPeriod: `/month`,
        description: "For active job seekers.",
        features: [
          `${CREDIT_PACKAGES.PRO * CREDIT_MULTIPLIER} credits / month`,
          "AI analysis",
          "Reports",
          "Company practice",
          "Custom interviews",
          "Priority support"
        ],
        cta: {
          text: "Start Pro Trial",
          href: "/auth/signup"
        },
        buttonVariant: "default" as const
      },
      {
        name: "Enterprise",
        isPopular: false,
        price: "Custom",
        currency: "",
        billingPeriod: "",
        description: "Pro plus org features.",
        features: [
          "Everything in Pro",
          "Bulk users",
          "Custom scenarios",
          "Analytics dashboard",
          "Account manager",
          "Priority support"
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
