/**
 * Job Description Generation Utilities
 *
 * Provides utilities for generating job descriptions based on predefined roles,
 * experience levels, and interview types.
 */

/**
 * Gets the display title for a role value
 */
const getRoleTitle = (role: string): string => {
  const availableRoles = [
    { value: 'frontend-developer', label: 'Frontend Developer' },
    { value: 'backend-developer', label: 'Backend Developer' },
    { value: 'fullstack-developer', label: 'Full Stack Developer' },
    { value: 'react-developer', label: 'React Developer' },
    { value: 'nodejs-developer', label: 'Node.js Developer' },
    { value: 'python-developer', label: 'Python Developer' }
  ]
  const roleOption = availableRoles.find(r => r.value === role)
  return roleOption?.label || 'Developer'
}

/**
 * Generates role-specific responsibilities
 */
const getRoleSpecificResponsibilities = (role: string): string => {
  switch (role) {
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

    case 'python-developer':
      return `- Develop Python applications and scripts
- Work with Django, Flask, or FastAPI frameworks
- Implement data processing and automation solutions
- Build RESTful APIs and web applications
- Collaborate on data analysis and visualization
- Optimize Python code performance
- Stay updated with Python ecosystem and best practices`

    case 'frontend-developer':
      return `- Develop responsive and interactive user interfaces
- Implement modern web technologies (HTML5, CSS3, JavaScript)
- Work with frontend frameworks and libraries
- Optimize web performance and user experience
- Collaborate with designers and backend teams
- Ensure cross-browser compatibility
- Stay updated with web development trends`

    case 'backend-developer':
      return `- Design and implement scalable backend systems
- Develop RESTful APIs and microservices
- Work with databases and data modeling
- Optimize application performance and security
- Implement authentication and authorization
- Collaborate with frontend and DevOps teams
- Stay updated with backend technologies`

    case 'fullstack-developer':
      return `- Develop end-to-end web applications
- Work with both frontend and backend technologies
- Design and implement full-stack solutions
- Optimize application performance and user experience
- Collaborate with cross-functional teams
- Implement best practices for both frontend and backend
- Stay updated with full-stack development trends`

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

/**
 * Generates role-specific requirements
 */
const getRoleSpecificRequirements = (role: string, level: string): string => {
  const baseExperience = `${level.split(' ')[0]} years of experience`

  switch (role) {
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

    case 'python-developer':
      return `- ${baseExperience} in Python development
- Proficiency in Python frameworks (Django, Flask, FastAPI)
- Experience with data processing and analysis libraries
- Knowledge of RESTful APIs and web development
- Familiarity with database technologies (PostgreSQL, MongoDB)
- Understanding of testing frameworks (pytest, unittest)
- Experience with version control and CI/CD pipelines`

    case 'frontend-developer':
      return `- ${baseExperience} in frontend development
- Strong proficiency in HTML5, CSS3, and JavaScript
- Experience with modern frontend frameworks
- Knowledge of responsive design and cross-browser compatibility
- Understanding of web performance optimization
- Familiarity with build tools and bundlers
- Experience with version control systems`

    case 'backend-developer':
      return `- ${baseExperience} in backend development
- Strong proficiency in server-side languages and frameworks
- Experience with database design and optimization
- Knowledge of RESTful APIs and microservices
- Understanding of security best practices
- Familiarity with cloud platforms and deployment
- Experience with testing and debugging`

    case 'fullstack-developer':
      return `- ${baseExperience} in full-stack development
- Proficiency in both frontend and backend technologies
- Experience with modern web development stacks
- Knowledge of database design and APIs
- Understanding of DevOps and deployment processes
- Familiarity with testing and quality assurance
- Strong problem-solving and communication skills`

    default:
      return `- ${baseExperience} in software development
- Strong problem-solving and analytical skills
- Proficiency in relevant programming languages and frameworks
- Experience with modern development methodologies
- Excellent communication and teamwork abilities
- Commitment to writing maintainable and scalable code`
  }
}

/**
 * Generates a job description based on predefined role and experience level
 * @param role - The role value (e.g., 'frontend-developer')
 * @param level - The experience level (e.g., '2-5 years')
 * @param interviewType - The interview type (optional)
 * @param generalSubType - General interview subtype (optional)
 * @param hrSubType - HR interview subtype (optional)
 * @returns A formatted job description string
 */
export const generateJDFromPredefined = (
  role: string,
  level: string,
  interviewType?: string,
  generalSubType?: string,
  hrSubType?: string
): string => {
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

  // Handle HR interview types - return simple JD for UI
  if (interviewType === 'HR') {
    if (hrSubType === 'Behavioral') {
      return `Behavioral HR Interview Preparation

This interview focuses on assessing your past behaviors and experiences as indicators of future performance. The interview will evaluate your work ethic, communication skills, and professional conduct.

Key Assessment Areas:
- Work ethic and reliability
- Communication and interpersonal skills
- Teamwork and collaboration abilities
- Problem-solving and decision-making approaches
- Adaptability and learning agility
- Leadership potential and initiative

The interview will include questions about your past experiences, workplace behaviors, and professional development.`
    } else if (hrSubType === 'Situational') {
      return `Situational HR Interview Preparation

This interview focuses on assessing how you would handle hypothetical workplace scenarios. The interview will evaluate your problem-solving skills, decision-making process, and situational judgment.

Key Assessment Areas:
- Problem-solving under pressure
- Conflict resolution and mediation skills
- Decision-making in complex situations
- Communication in difficult scenarios
- Adaptability and change management
- Ethical reasoning and judgment

The interview will include hypothetical workplace scenarios and situational judgment questions.`
    } else if (hrSubType === 'Competency') {
      return `Competency-Based HR Interview Preparation

This interview focuses on assessing your specific skills and competencies required for the role. The interview will evaluate your technical abilities, soft skills, and professional competencies.

Key Assessment Areas:
- Communication and presentation skills
- Analytical thinking and problem-solving
- Technical proficiency and expertise
- Interpersonal and relationship-building skills
- Leadership and influence abilities
- Adaptability and continuous learning

The interview will include questions about your competency demonstrations and skill applications.`
    } else if (hrSubType === 'Leadership') {
      return `Leadership HR Interview Preparation

This interview focuses on assessing your leadership potential and management capabilities. The interview will evaluate your ability to lead teams, drive results, and manage organizational challenges.

Key Assessment Areas:
- Leadership style and self-awareness
- Team development and motivation
- Communication and stakeholder management
- Decision-making and strategic thinking
- Conflict resolution and crisis management
- Change management and organizational impact

The interview will include questions about your leadership experiences and management philosophy.`
    } else if (hrSubType === 'Cultural') {
      return `Cultural Fit HR Interview Preparation

This interview focuses on assessing your alignment with company culture and organizational values. The interview will evaluate your work style preferences, communication approach, and cultural compatibility.

Key Assessment Areas:
- Work environment preferences
- Communication and collaboration style
- Team dynamics and interpersonal relationships
- Company values alignment
- Adaptability and change tolerance
- Work-life integration and balance

The interview will include questions about your workplace preferences and cultural experiences.`
    }
  }

  const levelDescriptions: Record<string, string> = {
    '0-2 years': 'junior level',
    '2-5 years': 'mid-level',
    '5+ years': 'senior level'
  }

  const roleTitle = getRoleTitle(role)
  const levelDesc = levelDescriptions[level] || 'professional'

  const responsibilities = getRoleSpecificResponsibilities(role)
  const requirements = getRoleSpecificRequirements(role, level)

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
