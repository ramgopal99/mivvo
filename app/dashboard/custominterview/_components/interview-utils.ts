/**
 * Interview Creation Utilities
 *
 * Provides utility functions for creating custom interviews
 * including role selection, experience levels, interview types, and JD generation.
 */

import { UPSE_PROMPT } from '@/app/api/custom-interviews/prompts/upse-prompt'
import { BANKING_PROMPT } from '@/app/api/custom-interviews/prompts/banking-prompt'

/**
 * Gets the available role options for interview creation
 */
export const getAvailableRoles = () => [
  // General Roles
  { value: 'frontend-developer', label: 'Frontend Developer' },
  { value: 'backend-developer', label: 'Backend Developer' },
  { value: 'fullstack-developer', label: 'Full Stack Developer' },
  { value: 'software-engineer', label: 'Software Engineer' },

  // Technology-Specific Roles
  { value: 'java-developer', label: 'Java Developer' },
  { value: 'python-developer', label: 'Python Developer' },
  { value: 'javascript-developer', label: 'JavaScript Developer' },
  { value: 'react-developer', label: 'React Developer' },
  { value: 'angular-developer', label: 'Angular Developer' },
  { value: 'vue-developer', label: 'Vue.js Developer' },
  { value: 'nodejs-developer', label: 'Node.js Developer' },
  { value: 'dotnet-developer', label: '.NET Developer' },
  { value: 'flutter-developer', label: 'Flutter Developer' },
  { value: 'react-native-developer', label: 'React Native Developer' },
  { value: 'swift-developer', label: 'Swift Developer (iOS)' },
  { value: 'kotlin-developer', label: 'Kotlin Developer (Android)' },
  { value: 'go-developer', label: 'Go Developer' },
  { value: 'rust-developer', label: 'Rust Developer' },
  { value: 'php-developer', label: 'PHP Developer' },
  { value: 'ruby-developer', label: 'Ruby Developer' },
  { value: 'scala-developer', label: 'Scala Developer' },
  { value: 'c-developer', label: 'C Developer' },
  { value: 'cpp-developer', label: 'C++ Developer' },
  { value: 'csharp-developer', label: 'C# Developer' },

  // Specialized Roles
  { value: 'devops-engineer', label: 'DevOps Engineer' },
  { value: 'data-scientist', label: 'Data Scientist' },
  { value: 'machine-learning-engineer', label: 'Machine Learning Engineer' },
  { value: 'product-manager', label: 'Product Manager' },
  { value: 'qa-engineer', label: 'QA Engineer' },
  { value: 'mobile-developer', label: 'Mobile Developer' },
  { value: 'system-administrator', label: 'System Administrator' },
  { value: 'database-administrator', label: 'Database Administrator' },
  { value: 'security-engineer', label: 'Security Engineer' },
  { value: 'cloud-architect', label: 'Cloud Architect' },
  { value: 'ui-ux-designer', label: 'UI/UX Designer' },
  { value: 'technical-lead', label: 'Technical Lead' }
]

/**
 * Gets the available experience level options
 */
export const getAvailableLevels = () => [
  { value: '0-2 years', label: '0-2 years' },
  { value: '2-5 years', label: '2-5 years' },
  { value: '5+ years', label: '5+ years' }
]

/**
 * Gets the available interview type options
 */
export const getAvailableInterviewTypes = () => [
  { value: 'Technical', label: 'Technical' },
  { value: 'HR', label: 'HR' },
  { value: 'General', label: 'General' }
]

/**
 * Gets the available General interview sub-types
 */
export const getGeneralInterviewSubTypes = () => [
  { value: 'UPSE', label: 'UPSE' },
  { value: 'Banking', label: 'Banking' }
]

/**
 * Gets the detailed prompt for General interview types
 * This is used for the actual interview, not the UI display
 */
export const getGeneralInterviewPrompt = (generalSubType: string): string => {
  if (generalSubType === 'UPSE') {
    return UPSE_PROMPT
  } else if (generalSubType === 'Banking') {
    return BANKING_PROMPT
  }
  return ''
}

/**
 * Generates a job description based on predefined role and experience level
 * @param role - The role value (e.g., 'frontend-developer')
 * @param level - The experience level (e.g., '2-5 years')
 * @returns A formatted job description string
 */
/**
 * Gets the display title for a role value
 */
const getRoleTitle = (role: string): string => {
  const availableRoles = getAvailableRoles()
  const roleOption = availableRoles.find(r => r.value === role)
  return roleOption?.label || 'Developer'
}

export const generateJDFromPredefined = (role: string, level: string, interviewType?: string, generalSubType?: string): string => {
  // Handle General interview types (UPSE and Banking) - return simple JD for UI
  if (interviewType === 'General') {
    if (generalSubType === 'UPSE') {
      return `UPSE Civil Service Interview Preparation

This interview focuses on assessing your suitability for administrative positions in the Indian civil service. The interview will evaluate your administrative aptitude, governance knowledge, and commitment to public service.

Key Assessment Areas:
- Administrative aptitude and decision-making abilities
- Knowledge of Indian polity, economy, and social issues
- Leadership potential and ethical framework
- Current affairs and policy understanding
- Problem-solving in governance scenarios
- Public service motivation and integrity

The interview will include scenario-based questions, current affairs discussions, and assessments of your analytical thinking and communication skills.`
    } else if (generalSubType === 'Banking') {
      return `Banking Sector Interview Preparation

This interview focuses on assessing your suitability for positions in the banking and financial services sector. The interview will evaluate your financial knowledge, customer service orientation, and regulatory awareness.

Key Assessment Areas:
- Banking products and services knowledge
- Customer relationship management skills
- Financial analysis and risk assessment abilities
- Regulatory compliance and ethical banking practices
- Market awareness and current banking trends
- Problem-solving in banking scenarios

The interview will include scenario-based questions, financial analysis discussions, and assessments of your customer service and analytical skills.`
    }
  }

  const levelDescriptions: Record<string, string> = {
    '0-2 years': 'junior level',
    '2-5 years': 'mid-level',
    '5+ years': 'senior level'
  }

  const roleTitle = getRoleTitle(role)
  const levelDesc = levelDescriptions[level] || 'professional'

  // Role-specific responsibilities
  const getRoleSpecificResponsibilities = (role: string): string => {
    switch (role) {
      case 'java-developer':
        return `- Develop enterprise-grade Java applications
- Design and implement microservices architecture
- Work with Spring Framework and related technologies
- Optimize JVM performance and memory management
- Implement RESTful APIs and web services
- Collaborate on database design and integration
- Participate in code reviews and technical discussions`

      case 'python-developer':
        return `- Develop Python applications and scripts
- Work with Django, Flask, or FastAPI frameworks
- Implement data processing and automation solutions
- Build RESTful APIs and web applications
- Collaborate on data analysis and visualization
- Optimize Python code performance
- Stay updated with Python ecosystem and best practices`

      case 'flutter-developer':
        return `- Develop cross-platform mobile applications
- Implement responsive UI/UX designs using Flutter widgets
- Integrate with platform-specific APIs and services
- Optimize app performance and user experience
- Collaborate with designers and backend teams
- Implement state management solutions
- Stay updated with Flutter ecosystem and Dart language`

      case 'react-developer':
        return `- Build interactive user interfaces with React
- Implement responsive web applications
- Work with state management (Redux, Context API)
- Optimize component performance and rendering
- Collaborate with backend APIs and services
- Implement modern React patterns and hooks
- Stay updated with React ecosystem and best practices`

      case 'nodejs-developer':
        return `- Develop server-side applications with Node.js
- Build RESTful APIs and GraphQL endpoints
- Work with Express.js and related frameworks
- Implement real-time features with WebSockets
- Optimize server performance and scalability
- Collaborate with frontend and database teams
- Stay updated with Node.js ecosystem and NPM packages`

      case 'go-developer':
        return `- Develop high-performance backend services
- Implement concurrent and scalable Go applications
- Work with Go's standard library and popular frameworks
- Design efficient data structures and algorithms
- Optimize application performance and resource usage
- Collaborate on microservices architecture
- Stay updated with Go language evolution`

      case 'dotnet-developer':
        return `- Develop .NET applications and services
- Work with C# and .NET Core/Framework
- Implement ASP.NET Web APIs and MVC applications
- Design database models and Entity Framework integration
- Optimize application performance and security
- Collaborate with cross-platform development teams
- Stay updated with .NET ecosystem and Microsoft technologies`

      case 'product-manager':
        return `- Define product strategy and roadmap
- Conduct market research and competitive analysis
- Collaborate with engineering, design, and marketing teams
- Prioritize features and manage product backlog
- Analyze user feedback and usage metrics
- Coordinate product launches and releases
- Drive product adoption and user satisfaction`

      case 'data-scientist':
        return `- Analyze large datasets to extract meaningful insights
- Build and deploy machine learning models
- Create data visualizations and reports
- Collaborate with engineering teams on data pipelines
- Design experiments and A/B tests
- Present findings to stakeholders
- Stay current with data science methodologies and tools`

      case 'devops-engineer':
        return `- Design and maintain CI/CD pipelines
- Manage cloud infrastructure and deployments
- Implement monitoring and logging solutions
- Automate deployment and scaling processes
- Ensure system security and compliance
- Collaborate with development and operations teams
- Optimize system performance and reliability`

      case 'qa-engineer':
        return `- Design and execute comprehensive test plans
- Write automated test scripts and frameworks
- Perform manual testing and bug tracking
- Collaborate with developers on quality assurance
- Implement testing best practices and standards
- Report on quality metrics and test coverage
- Participate in agile development processes`

      case 'ui-ux-designer':
        return `- Create intuitive user interfaces and experiences
- Conduct user research and usability testing
- Design wireframes, prototypes, and mockups
- Collaborate with product and engineering teams
- Ensure design consistency across platforms
- Stay updated with design trends and best practices
- Present design concepts to stakeholders`

      default:
        // Default responsibilities for technical roles
        return `- Design and develop scalable software solutions
- Write clean, maintainable, and efficient code
- Participate in code reviews and technical discussions
- Collaborate with cross-functional teams
- Optimize application performance and user experience
- Implement best practices for software development
- Stay updated with industry trends and emerging technologies`
    }
  }

  const getRoleSpecificRequirements = (role: string): string => {
    const baseExperience = `${level.split(' ')[0]} years of experience`

    switch (role) {
      case 'java-developer':
        return `- ${baseExperience} in Java development
- Strong knowledge of Java SE/EE and Spring Framework
- Experience with microservices and RESTful APIs
- Proficiency in SQL databases and ORM tools
- Knowledge of JVM performance tuning
- Experience with build tools (Maven, Gradle)
- Understanding of design patterns and SOLID principles`

      case 'python-developer':
        return `- ${baseExperience} in Python development
- Proficiency in Python frameworks (Django, Flask, FastAPI)
- Experience with data processing and analysis libraries
- Knowledge of RESTful APIs and web development
- Familiarity with database technologies (PostgreSQL, MongoDB)
- Understanding of testing frameworks (pytest, unittest)
- Experience with version control and CI/CD pipelines`

      case 'flutter-developer':
        return `- ${baseExperience} in Flutter development
- Strong proficiency in Dart programming language
- Experience with Flutter framework and widgets
- Knowledge of mobile app development patterns
- Familiarity with platform-specific APIs (Android/iOS)
- Understanding of state management solutions
- Experience with Firebase or other backend services`

      case 'react-developer':
        return `- ${baseExperience} in React development
- Strong proficiency in JavaScript/TypeScript and React
- Experience with modern React patterns and hooks
- Knowledge of state management (Redux, Context API)
- Familiarity with testing frameworks (Jest, React Testing Library)
- Understanding of web performance optimization
- Experience with build tools and bundlers`

      case 'nodejs-developer':
        return `- ${baseExperience} in Node.js development
- Strong proficiency in JavaScript/TypeScript
- Experience with Express.js or similar frameworks
- Knowledge of RESTful APIs and GraphQL
- Familiarity with database technologies and ORMs
- Understanding of asynchronous programming
- Experience with NPM ecosystem and build tools`

      case 'go-developer':
        return `- ${baseExperience} in Go development
- Strong proficiency in Go programming language
- Experience with Go's standard library and concurrency
- Knowledge of microservices architecture
- Familiarity with database technologies and ORMs
- Understanding of performance optimization
- Experience with testing and benchmarking`

      case 'dotnet-developer':
        return `- ${baseExperience} in .NET development
- Strong proficiency in C# and .NET ecosystem
- Experience with ASP.NET Core and Entity Framework
- Knowledge of RESTful APIs and web development
- Familiarity with SQL Server and database design
- Understanding of SOLID principles and design patterns
- Experience with Azure or cloud platforms`

      case 'product-manager':
        return `- ${baseExperience} in product management
- Strong analytical and problem-solving skills
- Experience with agile methodologies
- Excellent communication and leadership abilities
- Knowledge of market research and data analysis
- Experience with product management tools`

      case 'data-scientist':
        return `- ${baseExperience} in data science or analytics
- Proficiency in Python, R, SQL, and statistical analysis
- Experience with machine learning frameworks
- Strong mathematical and statistical background
- Knowledge of data visualization tools
- Experience with big data technologies`

      case 'devops-engineer':
        return `- ${baseExperience} in DevOps or infrastructure
- Proficiency in cloud platforms (AWS, Azure, GCP)
- Experience with containerization (Docker, Kubernetes)
- Knowledge of CI/CD tools and automation
- Strong scripting and programming skills
- Experience with monitoring and logging tools`

      case 'qa-engineer':
        return `- ${baseExperience} in software testing or QA
- Experience with automated testing frameworks
- Knowledge of testing methodologies and best practices
- Familiarity with bug tracking and project management tools
- Understanding of software development lifecycle
- Strong attention to detail and analytical skills`

      case 'ui-ux-designer':
        return `- ${baseExperience} in UI/UX design
- Proficiency in design tools (Figma, Sketch, Adobe XD)
- Knowledge of user research and usability testing
- Understanding of design systems and accessibility
- Experience with prototyping tools
- Strong visual design and communication skills`

      default:
        return `- ${baseExperience} in software development
- Strong problem-solving and analytical skills
- Proficiency in relevant programming languages and frameworks
- Experience with modern development methodologies
- Excellent communication and teamwork abilities
- Commitment to writing maintainable and scalable code`
    }
  }

  const responsibilities = getRoleSpecificResponsibilities(role)
  const requirements = getRoleSpecificRequirements(role)

  return `We are looking for a ${levelDesc} ${roleTitle} to join our team.

Responsibilities:
${responsibilities}
- Participate in team meetings and planning sessions
- Contribute to continuous improvement initiatives

Requirements:
${requirements}

What we offer:
- Competitive salary and benefits
- Opportunities for professional growth
- Collaborative and innovative work environment
- Chance to work on challenging and impactful projects`
}
