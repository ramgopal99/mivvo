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
      { text: "Solutions", href: "#solutions" },
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
  features: [
    {
      title: "AI Mock Interviews",
      description: "Practice with our advanced AI interviewer that adapts to your responses and provides realistic interview scenarios.",
      icon: "🤖"
    },
    {
      title: "Real-time Analysis",
      description: "Get instant feedback on your answers, communication style, and overall performance during the interview.",
      icon: "📊"
    },
    {
      title: "Detailed Reports",
      description: "Receive comprehensive analysis reports with strengths, areas for improvement, and personalized recommendations.",
      icon: "📋"
    },
    {
      title: "Multiple Formats",
      description: "Practice technical interviews, behavioral questions, system design, and coding challenges.",
      icon: "💻"
    }
  ],
  stats: [
    { label: "Mock Interviews", value: "10K+" },
    { label: "Success Stories", value: "500+" },
    { label: "Success Rate", value: "85%" },
    { label: "Companies", value: "50+" }
  ]
} as const
