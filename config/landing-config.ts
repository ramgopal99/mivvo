import { CREDIT_PACKAGES } from './site'

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
      text: "Practice with our advanced AI interviewer for technical roles, civil services, banking, and government exams. Get instant feedback and detailed analysis to improve your performance and land your dream job."
    },
    cta: {
      text: "Start your first mock interview",
      mobileText: "Start Interview",
      href: "/auth/signup"
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
      { text: "Features", href: "/#features" },
      { text: "Pricing", href: "/pricing" },
      // { text: "Courses", href: "/courses" },
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
      description: "Prepare students for technical interviews, civil services (UPSE), banking, SSC, and government exams with comprehensive AI-powered mock interviews.",
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
        title: "Civil Services Training",
        description: "Specialized coaching for UPSE, SSC, Railways, and other government exam interviews.",
        icon: "Users"
      },
      {
        title: "Banking & Finance",
        description: "Prepare students for banking sector interviews, financial services, and corporate roles.",
        icon: "BookOpen"
      },
      {
        title: "Progress Tracking",
        description: "Monitor student performance across all interview types with detailed analytics and reports.",
        icon: "Award"
      }
    ],
    cta: {
      text: "Start Free Trial for Your Institution",
      mobileText: "Start Free Trial",
      href: "/auth/signup"
    },
    mockInterface: {
      title: "Engineering & Civil Services Batch 2024",
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
        answer: "Mivvo supports technical interviews (coding, system design), civil services (UPSE, SSC, Railways), banking sector interviews, government exams, and corporate roles. We cover all major career paths from tech companies to civil services."
      },
      {
        question: "How does the AI interviewer work?",
        answer: "Our AI interviewer uses advanced natural language processing to conduct realistic mock interviews. It adapts to your responses, asks follow-up questions, and provides real-time feedback based on industry best practices and exam patterns."
      },
      {
        question: "Is this suitable for colleges and coaching institutes?",
        answer: "Yes! Mivvo is perfect for colleges and coaching institutes. We offer institutional licensing with batch management, progress tracking, and comprehensive preparation for both technical and civil service interviews."
      },
      {
        question: "How accurate is the performance analysis?",
        answer: "Our AI analyzes your communication skills, technical knowledge, problem-solving approach, and confidence levels. The analysis is based on industry standards and provides detailed insights with actionable recommendations for improvement."
      },
      {
        question: "Can I practice for specific exams like UPSE or SSC?",
        answer: "Absolutely! We have specialized interview formats for UPSE civil services, SSC government exams, banking sector interviews, and technical roles. Each format is tailored to the specific requirements of that career path."
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
      text: "Get your first 180 credits free",
      mobileText: "Get 180 credits free",
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
        role: "UPSE Civil Service Officer",
        avatar: "https://avatar.iran.liara.run/public/girl",
        quote: "The AI interviewer perfectly simulated UPSE interview scenarios. It helped me master administrative aptitude and governance questions.",
        description: "I was preparing for UPSE civil services and needed specialized interview practice. Mivvo's AI interviewer understood the unique requirements of civil service interviews - from administrative scenarios to current affairs discussions. The feedback on my analytical thinking and ethical framework was exactly what I needed to clear the interview.",
        verified: "Verified Graduate",
        cardStyle: "dark-blue"
      },
      {
        name: "Vikram Joshi",
        role: "Banking Professional @ SBI",
        avatar: "https://avatar.iran.liara.run/public/boy",
        quote: "Such a life-changing experience. Highly recommended!",
        description: "I was preparing for banking sector interviews and needed practice with financial services scenarios. Mivvo's AI interviewer provided realistic banking interview simulations covering banking products, regulatory compliance, and customer service scenarios. The detailed feedback on my financial knowledge and communication skills helped me land my dream job at SBI.",
        verified: "Verified Graduate",
        cardStyle: "white"
      },
      {
        name: "Rahul Singh",
        role: "SSC Officer @ Railways",
        avatar: "https://avatar.iran.liara.run/public/boy",
        quote: "An overall wonderful and rewarding experience",
        description: "Thank you for the wonderful experience! I now have a government job I really enjoy, and I owe it all to Mivvo's AI practice sessions. The specialized SSC interview format with general studies questions and administrative scenarios prepared me perfectly for the real interview.",
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
  features: {
    mainFeatures: {
      aiInterviews: {
        title: "Cross Every Career Ladder",
        description: "Climb through interview levels with AI guidance. From technical roles to civil services, master every stage of your career progression."
      },
      technicalCoding: {
        title: "Technical Coding Interviews (coming soon)",
        description: "Practice technical coding problems and get instant AI-powered feedback to improve your interview skills."
      },
      performanceAnalytics: {
        header: "Interview Analytics",
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
        description: "Practice with interview formats from top tech companies, civil services, banking sector, and government exams. Master interviews across all career paths.",
        interviewCalls: [
          { company: "Google", role: "Senior Software Engineer", type: "Technical Interview" },
          { company: "Amazon", role: "Full Stack Developer", type: "System Design" },
          { company: "Microsoft", role: "Frontend Engineer", type: "Coding Challenge" },
          { company: "UPSE", role: "Civil Service Officer", type: "Administrative Interview" },
          { company: "Banking", role: "Banking Professional", type: "Financial Services Interview" },
          { company: "SSC", role: "Government Officer", type: "General Studies Interview" },
          { company: "Railways", role: "Railway Officer", type: "Technical & General Interview" },
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
      description: "AI-powered mock interviews that help you practice, improve, and land your dream job."
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
      { name: "LinkedIn", href: "#", icon: "LinkedIn" },
      { name: "Instagram", href: "#", icon: "Instagram" }
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
      additionalInfo: `${CREDIT_PACKAGES.FREE} credits free • No credit card required`
    },
    plans: [
      {
        name: "Free",
        isPopular: false,
        price: CREDIT_PACKAGES.FREE.toString(),
        currency: "",
        billingPeriod: "credits",
        description: "Perfect for getting started with AI mock interviews.",
        features: [
          `${CREDIT_PACKAGES.FREE} credits free`,
          "Basic AI feedback",
          "Performance summary",
          "Email support",

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
        billingPeriod: `/${CREDIT_PACKAGES.PRO} credits`,
        description: "Best for serious job seekers and career changers.",
        features: [
          `${CREDIT_PACKAGES.PRO} credits total`,
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
        description: "For institutions and organizations training multiple users.",
        features: [
          "Everything in Pro",
          "Bulk user management",
          "Custom interview scenarios",
          "Advanced analytics dashboard",
          "Dedicated account manager"
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
