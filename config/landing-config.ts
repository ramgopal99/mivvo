import { CREDIT_PACKAGES, CREDIT_MULTIPLIER } from './site'

export const landingConfig = {
  hero: {
    newTag: {
      text: "AI-Powered",
      subtitle: "The future of interview preparation"
    },
    headline: {
      text: "Ace Interviews with AI & Courses"
    },
    description: {
      text: "Master interviews with AI mock practice and comprehensive courses for technical roles, corporate positions, and professional careers. Get instant feedback and detailed analysis to land your dream job."
    },
    cta: {
      text: "Start Learning Today",
      mobileText: "Get Started",
      href: "/auth/signup"
    },
    additionalInfo: {
      text: "Free to start • AI mock interviews • Interactive courses • Instant feedback"
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
      title: "Get started with our simple 3 step process",
      description: "Experience our comprehensive 3-step interview preparation process designed to build your confidence and skills.",
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
      title: "Empower students for diverse career paths",
      description: "Prepare students for technical interviews, corporate positions, and professional careers with comprehensive AI-powered mock interviews.",
      tabOptions: [
        { label: "For Colleges & Coaching", value: "colleges" },
        { label: "Student Practice Platform", value: "platform" }
      ]
    },
    features: [
      {
        title: "Technical Interview Prep",
        description: "Comprehensive preparation for software engineering, data science, and tech company interviews.",
        icon: "GraduationCap"
      },
      {
        title: "Professional Career Training",
        description: "Specialized coaching for government positions, public sector roles, and administrative career interviews.",
        icon: "Users"
      },
      {
        title: "Finance & Business",
        description: "Prepare students for financial services, business roles, and corporate career interviews.",
        icon: "BookOpen"
      },
      {
        title: "Progress Tracking",
        description: "Monitor student performance across all interview types with detailed analytics and reports.",
        icon: "Award"
      }
    ],
    cta: {
      text: "Contact Us for Institutions",
      mobileText: "Contact Us",
      href: "/contact"
    },
    mockInterface: {
      title: "Professional Development Program 2026",
      subtitle: "120 students • 45 completed interviews",
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
  courses: {
    header: {
      title: "Build Skills the Way Interviews Demand",
      description: "Master technical concepts and build expertise through comprehensive courses designed specifically for career advancement and professional development.",
      tabOptions: [
        { label: "Skill Development", value: "courses" },
        { label: "Interview Preparation", value: "preparation" }
      ]
    },
    features: [
      {
        title: "All-in-One Exam & Interview Prep",
        description: "Courses designed for programming, aptitude, and technical foundations—everything you need in one place.",
        icon: "BookOpen"
      },
      {
        title: "Inbuilt Coding IDE",
        description: "Practice coding directly inside the course with real interview-style problems and exercises.",
        icon: "Code"
      },
      {
        title: "Aptitude Formula Sheet & Calculator",
        description: "Quick access to formulas and a built-in calculator for faster, more accurate problem-solving.",
        icon: "Calculator"
      },
      {
        title: "Progress Tracking",
        description: "Track your learning and practice performance in one clear dashboard.",
        icon: "Award"
      }
    ],
    stats: [
      { label: "Interview Success Rate", value: "85%", icon: "Users" },
      { label: "Courses Available", value: "25+", icon: "BookOpen" },
      { label: "Avg. Performance Boost", value: "+23%", icon: "Award" },
      { label: "Expert Instructors", value: "15+", icon: "GraduationCap" }
    ],
    cta: {
      text: "Explore All Courses",
      mobileText: "Start Learning",
      href: "/courses"
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
        question: "What interview types does Mivvo support?",
        answer: "Mivvo supports all types of interviews including technical (coding, system design, algorithms), HR (behavioral, situational), CV/resume-based, JD/job description-based, government positions, financial services, and corporate roles. We cover all major career paths from tech companies to professional careers with job description-based scenarios."
      },
      {
        question: "How does the AI interviewer work?",
        answer: "Our AI interviewer uses advanced natural language processing to conduct realistic mock interviews that feel exactly like real interviews. It adapts to your responses, asks cross-examination questions, follow-up questions, and evaluates your answers just like human interviewers would. The system creates dynamic interview scenarios with contextual questions based on industry best practices and exam patterns."
      },
      {
        question: "What courses are available on Mivvo?",
        answer: "We offer comprehensive courses covering technical skills, interview preparation, coding fundamentals, system design, and career development. We currently have courses available in our catalog and add new courses every week. Our courses are designed to complement our AI mock interviews and provide structured learning paths for various career tracks."
      },
      {
        question: "Is this suitable for colleges and coaching institutes?",
        answer: "Yes! Mivvo is perfect for colleges and coaching institutes. We offer institutional licensing with batch management, progress tracking, and comprehensive preparation for both technical and professional career interviews."
      },
      {
        question: "How accurate is the performance analysis?",
        answer: "Our AI analyzes your communication skills, technical knowledge, problem-solving approach, and confidence levels. The analysis is based on industry standards and provides detailed insights with actionable recommendations for improvement."
      },
    ]
  },
  cta: {
    headline: {
      main: "Master Interviews & Skills = Career Success",
      sub: ""
    },
    description: "Start practicing with AI mock interviews and comprehensive courses. Get instant feedback and build expertise delivered straight to your dashboard.",
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
      subtitle: "Not just words, see results"
    },
    title: "Loved by students and professionals",
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
        role: "Government Administrator",
        avatar: "https://avatar.iran.liara.run/public/girl",
        quote: "The AI interviewer perfectly simulated government interview scenarios. It helped me master administrative aptitude and governance questions.",
        description: "I was preparing for government positions and needed specialized interview practice. Mivvo's AI interviewer understood the unique requirements of administrative interviews - from policy scenarios to governance discussions. The feedback on my analytical thinking and ethical framework was exactly what I needed to clear the interview.",
        verified: "Verified Graduate",
        cardStyle: "dark-blue"
      },
      {
        name: "Vikram Joshi",
        role: "Financial Services Professional",
        avatar: "https://avatar.iran.liara.run/public/boy",
        quote: "Such a life-changing experience. Highly recommended!",
        description: "I was preparing for financial services interviews and needed practice with business scenarios. Mivvo's AI interviewer provided realistic finance interview simulations covering financial products, regulatory compliance, and client service scenarios. The detailed feedback on my financial knowledge and communication skills helped me land my dream job.",
        verified: "Verified Graduate",
        cardStyle: "white"
      },
      {
        name: "Rahul Singh",
        role: "Public Sector Officer",
        avatar: "https://avatar.iran.liara.run/public/boy",
        quote: "An overall wonderful and rewarding experience",
        description: "Thank you for the wonderful experience! I now have a public sector job I really enjoy, and I owe it all to Mivvo's AI practice sessions. The specialized interview format with general knowledge questions and administrative scenarios prepared me perfectly for the real interview.",
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
      },
      {
        name: "Siddharth Jain",
        role: "Software Engineer @ Microsoft",
        avatar: "https://avatar.iran.liara.run/public/boy",
        quote: "The perfect combination of structured learning and AI practice. Mivvo courses built my foundation while interviews honed my skills.",
        description: "I started with Mivvo courses to learn system design fundamentals, then practiced extensively with their AI mock interviews. The integrated approach helped me land my dream job at Microsoft. The courses provided the knowledge base, while interviews gave me practical experience.",
        verified: "Verified Graduate",
        cardStyle: "purple"
      },
      {
        name: "Meera Patel",
        role: "Data Scientist @ Google",
        avatar: "https://avatar.iran.liara.run/public/girl",
        quote: "Courses and AI interviews together created the perfect learning ecosystem. I went from beginner to Google in 6 months.",
        description: "Mivvo's courses gave me the technical foundation I needed, covering everything from basic algorithms to advanced machine learning concepts. The AI mock interviews then helped me apply this knowledge in real scenarios. The combination was unbeatable for my career growth.",
        verified: "Verified Graduate",
        cardStyle: "dark-blue"
      }
    ]
  },
  features: {
    header: {
      headline: {
        firstPart: "Everything you need to",
        secondPart: "master interviews & skills"
      },
      description: "Our comprehensive platform provides AI mock interviews and interactive courses to prepare for any career path - from technical roles to corporate positions and professional careers."
    },
    mainFeatures: {
      aiInterviews: {
        title: "AI Interviews & Courses Combined",
        description: "Master interviews with AI-powered practice sessions and comprehensive courses. From technical roles to corporate positions, get the complete preparation package."
      },
      technicalCoding: {
        title: "Technical Skills & Coding Courses",
        description: "Master coding interviews and technical concepts with interactive courses and AI-powered practice sessions."
      },
      performanceAnalytics: {
        header: "Learning & Interview Analytics",
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
        title: "Diverse Interview Practice",
        description: "Practice interviews and take courses for top tech companies, corporate positions, and professional careers. Master both interview skills and foundational knowledge across all career paths.",
        interviewCalls: [
          { company: "Google", role: "Senior Software Engineer", type: "Technical Interview" },
          { company: "Amazon", role: "Full Stack Developer", type: "System Design" },
          { company: "Microsoft", role: "Frontend Engineer", type: "Coding Challenge" },
          { company: "Government", role: "Public Administrator", type: "Administrative Interview" },
          { company: "Finance Corp", role: "Financial Analyst", type: "Financial Services Interview" },
          { company: "Consulting", role: "Management Consultant", type: "Case Study Interview" },
          { company: "Healthcare", role: "Healthcare Administrator", type: "Policy Interview" },
          { company: "Defense", role: "Defense Officer", type: "Leadership Interview" },
          { company: "Netflix", role: "Backend Engineer", type: "Architecture Review" },
          { company: "Tesla", role: "Full Stack Engineer", type: "Problem Solving" },
          { company: "Uber", role: "Mobile Developer", type: "Code Review" }
        ]
      }
    }
  },
  footer: {
    brand: {
      description: "AI-powered mock interviews and comprehensive courses that help you practice, learn, and land your dream job."
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
      title: "Simple pricing for all your needs",
      subtitle: "Choose the plan that's right for you and start practicing today.",
      additionalInfo: `${CREDIT_PACKAGES.FREE * CREDIT_MULTIPLIER} credits free • No credit card required`
    },
    plans: [
      {
        name: "Free",
        isPopular: false,
        price: "180",
        currency: "",
        billingPeriod: `credits`,
        description: "Access all Pro features with 180 free credits - no credit card required.",
        features: [
          "180 credits included",
          "Advanced AI analysis",
          "Detailed performance reports",
          "Company-specific practice",
          "Custom interview creation",
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
        description: "Best for serious job seekers and career changers.",
        features: [
          `${CREDIT_PACKAGES.PRO * CREDIT_MULTIPLIER} credits included`,
          "Advanced AI analysis",
          "Detailed performance reports",
          "Company-specific practice",
          "Make your own interview",
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
        description: "Everything in Pro plus enterprise features for organizations and institutions.",
        features: [
          "All Pro features included",
          "Bulk user management",
          "Custom interview scenarios",
          "Advanced analytics dashboard",
          "Dedicated account manager",
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
