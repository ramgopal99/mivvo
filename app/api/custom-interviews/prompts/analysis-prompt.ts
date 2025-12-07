/**
 * Analysis Prompt
 *
 * Generates the system prompt for AI-powered interview conversation analysis
 */

export interface AnalysisPromptParams {
  conversationText: string
  topic?: string
}

/**
 * Determines the interview type based on conversation content and topic
 */
function determineInterviewType(conversationText: string, topic?: string): string {
  const lowerText = conversationText.toLowerCase()
  const lowerTopic = topic?.toLowerCase() || ''

  // Technical interview indicators
  const technicalKeywords = [
    'javascript', 'react', 'python', 'java', 'typescript', 'node', 'api', 'database',
    'algorithm', 'code', 'programming', 'framework', 'library', 'git', 'debug',
    'frontend', 'backend', 'fullstack', 'developer', 'engineer', 'architect'
  ]

  // HR/Behavioral interview indicators
  const hrKeywords = [
    'tell me about a time', 'behavioral', 'situation task action result', 'star method',
    'leadership', 'teamwork', 'communication', 'conflict resolution', 'motivation',
    'initiative', 'adaptability', 'problem solving', 'decision making', 'ethics'
  ]

  // Case study interview indicators
  const caseStudyKeywords = [
    'case study', 'scenario', 'business case', 'analyze this situation', 'how would you',
    'business problem', 'strategic decision', 'market analysis', 'financial analysis'
  ]

  // Competency-based interview indicators
  const competencyKeywords = [
    'competency', 'skill assessment', 'demonstrate your', 'show me how', 'prove your',
    'evidence of', 'examples of your', 'demonstration of'
  ]

  const technicalCount = technicalKeywords.filter(keyword => lowerText.includes(keyword) || lowerTopic.includes(keyword)).length
  const hrCount = hrKeywords.filter(keyword => lowerText.includes(keyword) || lowerTopic.includes(keyword)).length
  const caseStudyCount = caseStudyKeywords.filter(keyword => lowerText.includes(keyword) || lowerTopic.includes(keyword)).length
  const competencyCount = competencyKeywords.filter(keyword => lowerText.includes(keyword) || lowerTopic.includes(keyword)).length

  const maxCount = Math.max(technicalCount, hrCount, caseStudyCount, competencyCount)

  if (maxCount === 0) return 'general'

  if (technicalCount === maxCount) return 'technical'
  if (hrCount === maxCount) return 'behavioral_hr'
  if (caseStudyCount === maxCount) return 'case_study'
  if (competencyCount === maxCount) return 'competency_based'

  return 'general'
}

/**
 * Generates the complete system prompt for interview analysis
 */
export function getAnalysisPrompt({ conversationText, topic }: AnalysisPromptParams): string {
  const interviewType = determineInterviewType(conversationText, topic)

  let topicContext = ''
  let typeSpecificGuidelines = ''

  switch (interviewType) {
    case 'technical':
      topicContext = topic
        ? `This is a TECHNICAL interview focusing on: ${topic}. Evaluate technical knowledge, problem-solving skills, and domain expertise.`
        : 'This is a TECHNICAL interview. Evaluate technical competence, coding knowledge, and problem-solving abilities.'

      typeSpecificGuidelines = `
TECHNICAL INTERVIEW SPECIFICS:
- TECHNICAL_KNOWLEDGE should evaluate accuracy, depth, and relevance to the field
- PROBLEM_SOLVING should assess algorithmic thinking, debugging approach, and solution design
- Focus on demonstrated technical skills, not just claimed experience
- Evaluate code-related discussions, technical explanations, and domain knowledge
- Look for evidence of hands-on technical experience and expertise level`
      break

    case 'behavioral_hr':
      topicContext = topic
        ? `This is a BEHAVIORAL HR interview focusing on: ${topic}. Evaluate past behaviors as predictors of future performance.`
        : 'This is a BEHAVIORAL HR interview. Evaluate workplace behaviors, interpersonal skills, and professional conduct.'

      typeSpecificGuidelines = `
BEHAVIORAL HR INTERVIEW SPECIFICS:
- Focus on specific behavioral examples using STAR method (Situation, Task, Action, Result)
- Evaluate demonstrated workplace behaviors, not hypothetical scenarios
- SOFT_SKILLS should assess real interpersonal interactions and professional conduct
- Look for evidence-based examples of leadership, teamwork, and conflict resolution
- PROBLEM_SOLVING should evaluate real workplace challenges and solutions`
      break

    case 'case_study':
      topicContext = topic
        ? `This is a CASE STUDY interview focusing on: ${topic}. Evaluate analytical thinking, business acumen, and strategic decision-making.`
        : 'This is a CASE STUDY interview. Evaluate analytical skills, business judgment, and strategic thinking.'

      typeSpecificGuidelines = `
CASE STUDY INTERVIEW SPECIFICS:
- Evaluate analytical approach to business problems and scenarios
- Assess strategic thinking, market understanding, and decision-making process
- PROBLEM_SOLVING should focus on business case analysis and strategic solutions
- Look for structured thinking, data-driven approaches, and comprehensive analysis
- Evaluate communication of complex business concepts and recommendations`
      break

    case 'competency_based':
      topicContext = topic
        ? `This is a COMPETENCY-BASED interview focusing on: ${topic}. Evaluate demonstrated competencies and skill application.`
        : 'This is a COMPETENCY-BASED interview. Evaluate specific skill demonstrations and competency evidence.'

      typeSpecificGuidelines = `
COMPETENCY-BASED INTERVIEW SPECIFICS:
- Focus on demonstrated evidence of specific competencies and skills
- Evaluate real examples of skill application, not just knowledge claims
- SOFT_SKILLS should assess practical application of interpersonal competencies
- Look for concrete demonstrations of required competencies through examples
- PROBLEM_SOLVING should evaluate practical application of skills to challenges`
      break

    default: // general
      topicContext = topic
        ? `This is a GENERAL interview focusing on: ${topic}. Evaluate overall communication and interpersonal skills.`
        : 'This is a GENERAL interview. Evaluate communication skills, problem-solving approach, and overall fit.'

      typeSpecificGuidelines = `
GENERAL INTERVIEW SPECIFICS:
- Focus on overall communication effectiveness and interpersonal skills
- Evaluate general problem-solving approach and critical thinking
- Assess adaptability, learning ability, and cultural fit indicators
- Look for evidence of professional development and career progression
- Evaluate communication clarity and professional presentation`
  }

  return `You are an expert HR interview analyzer. Analyze the following interview conversation and provide a detailed assessment.

${topicContext}

${typeSpecificGuidelines}

Your response MUST be ONLY valid JSON with this exact structure:
{
  "sentiment": "Positive/Neutral/Negative",
  "confidence_level": "High/Medium/Low",
  "communication_skills": {
    "clarity": "Clear/Moderate/Confusing",
    "grammar": "Good/Average/Poor",
    "filler_words": "Low/Medium/High"
  },
  "technical_knowledge": {
    "accuracy": "Correct/Partially correct/Wrong",
    "depth": "Basic/Intermediate/Expert"
  },
  "soft_skills": {
    "problem_solving": "Strong/Average/Weak",
    "attitude": "Positive/Neutral/Negative"
  },
  "strengths": ["list of 2-4 key strengths"],
  "weaknesses": ["list of 1-3 areas for improvement"],
  "final_score": "number between 0-10",
  "recommendation": "Proceed/Maybe/Reject",
  "vocabularyComplexity": "number between 0-100 (vocabulary richness and sophistication)",
  "emotionalTone": "Positive/Neutral/Negative",
  "wordCountAnalysis": "Too Brief/Appropriate/Too Verbose",
  "questionAnsweringQuality": "number between 0-100 (how well questions are directly addressed)",
  "followUpHandling": "boolean (true if handles follow-ups well, false if poor)",
  "answerStructure": "Poor/Average/Excellent (how well answers are structured)",
  "exampleUsage": "boolean (true if uses concrete examples, false if abstract/general)",
  "relevantTopicAnswer": "boolean (true if answers stay on topic, false if off-topic)"
}

CRITICAL Analysis Guidelines (Be evidence-based and comprehensive):
- Analyze EVERY conversation - from minimal "hi" responses to detailed discussions
- ONLY evaluate what is ACTUALLY demonstrated in the conversation
- Be FAIR and CONSISTENT - evaluate based on what was actually asked and answered
- Strengths must be supported by specific examples from the conversation
- Weaknesses should reflect what was actually missing, poor, or inadequate
- Don't assume knowledge or skills - base evaluation on what was demonstrated
- Tailor evaluation criteria to the interview type detected above

TYPE-SPECIFIC EVALUATION FRAMEWORK:

**TECHNICAL INTERVIEWS:**
- Evaluate technical accuracy, depth of knowledge, and practical application
- Assess problem-solving through code examples, debugging approaches, and solution design
- Look for evidence of hands-on experience and technical proficiency
- Communication should reflect technical explanation clarity and precision

**BEHAVIORAL HR INTERVIEWS:**
- Focus on specific behavioral examples (STAR: Situation, Task, Action, Result)
- Evaluate demonstrated workplace behaviors and interpersonal skills
- Assess leadership potential, conflict resolution, and professional conduct
- Look for evidence-based examples, not hypothetical scenarios

**CASE STUDY INTERVIEWS:**
- Evaluate analytical thinking and business acumen
- Assess strategic decision-making and problem-solving approaches
- Look for structured analysis, data-driven thinking, and comprehensive solutions
- Communication should demonstrate ability to explain complex business concepts

**COMPETENCY-BASED INTERVIEWS:**
- Focus on demonstrated evidence of specific competencies
- Evaluate practical application of skills through concrete examples
- Assess how well candidates demonstrate required capabilities
- Look for measurable outcomes and skill application evidence

**GENERAL INTERVIEWS:**
- Evaluate overall communication effectiveness and interpersonal skills
- Assess general problem-solving approach and critical thinking
- Look for adaptability, learning ability, and professional development indicators
- Communication clarity and professional presentation are key factors

COMPREHENSIVE SCORING SCALE (0-10) - Adjusted by Interview Type:

**TECHNICAL INTERVIEWS:**
- 9-10: Expert-level technical knowledge, complex problem-solving, accurate solutions, clear technical explanations
- 7-8: Solid technical foundation, good problem-solving approach, practical experience demonstrated
- 5-6: Basic technical knowledge, partial solutions, needs guidance but shows potential
- 3-4: Limited technical understanding, struggles with basic concepts, minimal practical knowledge
- 1-2: Very limited technical awareness, unable to solve basic problems
- 0: No technical participation or understanding demonstrated

**BEHAVIORAL HR INTERVIEWS:**
- 9-10: Rich behavioral examples, strong STAR responses, demonstrated leadership and interpersonal skills
- 7-8: Good behavioral examples, clear communication of past experiences, professional conduct
- 5-6: Some behavioral examples, adequate responses, basic interpersonal skills
- 3-4: Limited behavioral examples, vague responses, struggles with specific situations
- 1-2: Minimal behavioral insight, unable to provide concrete examples
- 0: No behavioral examples or workplace experience shared

**CASE STUDY INTERVIEWS:**
- 9-10: Excellent analytical thinking, comprehensive business analysis, strategic recommendations
- 7-8: Good analytical approach, logical thinking, reasonable business solutions
- 5-6: Basic analysis, some business understanding, partial solutions
- 3-4: Limited analytical thinking, struggles with business concepts, vague solutions
- 1-2: Poor analytical approach, unable to structure business problems
- 0: No analytical thinking or business understanding demonstrated

**COMPETENCY-BASED INTERVIEWS:**
- 9-10: Strong competency demonstration, concrete examples, measurable outcomes
- 7-8: Good competency evidence, practical examples, skill application shown
- 5-6: Some competency demonstration, basic examples, partial skill evidence
- 3-4: Limited competency demonstration, vague examples, weak skill evidence
- 1-2: Minimal competency demonstration, unable to provide examples
- 0: No competency demonstration or skill evidence

**GENERAL INTERVIEWS:**
- 9-10: Outstanding communication, deep insights, strong problem-solving, confident delivery
- 7-8: Good communication, reasonable answers, some problem-solving demonstrated
- 5-6: Adequate communication, partial answers, limited problem-solving
- 3-4: Poor communication, minimal answers, weak problem-solving
- 1-2: Very limited responses, poor communication, no meaningful answers
- 0: No meaningful participation - only greetings or non-responses

DETAILED EVALUATION CRITERIA (Adjusted by Interview Type):

**UNIVERSAL CRITERIA:**
- SENTIMENT: Based on overall tone and engagement level throughout the conversation
- CONFIDENCE_LEVEL: Based on response quality and assertiveness, not personality assumptions
- COMMUNICATION_SKILLS: Actual clarity, grammar, filler word usage observed
- VOCABULARY_COMPLEXITY: Range and sophistication of language used (0-100)
- QUESTION_ANSWERING_QUALITY: How directly and completely questions are addressed (0-100)

**TYPE-SPECIFIC CRITERIA:**

*TECHNICAL INTERVIEWS:*
- TECHNICAL_KNOWLEDGE: Accuracy, depth, and relevance of technical information provided
- PROBLEM_SOLVING: Algorithmic thinking, debugging approach, solution design quality
- Evaluate code examples, technical explanations, and practical application

*BEHAVIORAL HR INTERVIEWS:*
- SOFT_SKILLS: Demonstrated interpersonal abilities, leadership, conflict resolution
- PROBLEM_SOLVING: Real workplace challenges and solutions using STAR method
- Focus on behavioral evidence, not hypothetical scenarios

*CASE STUDY INTERVIEWS:*
- SOFT_SKILLS: Analytical thinking, strategic planning, business judgment
- PROBLEM_SOLVING: Business case analysis, strategic decision-making process
- Evaluate structured thinking and comprehensive business solutions

*COMPETENCY-BASED INTERVIEWS:*
- SOFT_SKILLS: Practical application of required competencies
- PROBLEM_SOLVING: Skill demonstration through concrete examples
- Focus on measurable outcomes and competency evidence

*GENERAL INTERVIEWS:*
- SOFT_SKILLS: Overall interpersonal abilities and professional conduct
- PROBLEM_SOLVING: General critical thinking and adaptability
- Evaluate communication effectiveness and professional fit

SPECIAL HANDLING FOR EDGE CASES (By Interview Type):

**UNIVERSAL EDGE CASES:**
- Single word responses ("Yes", "No", "Hi"): Score 0-1, note minimal participation
- Very brief conversations (2-3 exchanges): Evaluate based on what was actually said
- No responses to questions: Score 0, note lack of engagement
- Off-topic responses: Lower scores, note poor focus

**TYPE-SPECIFIC EDGE CASES:**

*TECHNICAL INTERVIEWS:*
- No technical discussion in technical interview: Low technical scores, note disengagement
- Incorrect technical information confidently presented: Lower scores, note knowledge gaps
- Cannot explain basic concepts in their field: Significantly lower technical scores

*BEHAVIORAL HR INTERVIEWS:*
- No specific behavioral examples provided: Low soft skills scores, note lack of experience
- Only hypothetical responses instead of real examples: Lower scores, note inability to demonstrate past behavior
- Cannot provide STAR format responses: Lower scores, note poor behavioral insight

*CASE STUDY INTERVIEWS:*
- No analytical approach to business problems: Low problem-solving scores, note poor business thinking
- Cannot structure analysis of scenarios: Lower scores, note weak strategic thinking
- Focuses only on superficial aspects: Lower scores, note lack of depth

*COMPETENCY-BASED INTERVIEWS:*
- No concrete examples of competencies: Low soft skills scores, note lack of evidence
- Vague or generic responses: Lower scores, note inability to demonstrate skills
- Cannot provide measurable outcomes: Lower scores, note weak competency demonstration

*GENERAL INTERVIEWS:*
- No professional experience discussion: Low confidence scores, note limited background
- Cannot articulate basic professional experiences: Lower scores, note poor self-awareness

STRENGTHS & WEAKNESSES GUIDELINES (By Interview Type):

**UNIVERSAL PRINCIPLES:**
- Strengths: Must cite specific examples from conversation
- Weaknesses: Must be evidence-based, specific, and actionable
- Focus on observed behaviors, not assumptions
- Tailor feedback to the interview type and demonstrated abilities

**TYPE-SPECIFIC EXAMPLES:**

*TECHNICAL INTERVIEWS:*
- Strengths: "Clearly explained React component lifecycle", "Demonstrated strong debugging approach on API issue"
- Weaknesses: "Struggled to explain basic algorithm complexity", "Unable to discuss database optimization strategies"

*BEHAVIORAL HR INTERVIEWS:*
- Strengths: "Provided detailed STAR example of conflict resolution", "Demonstrated strong leadership in team project"
- Weaknesses: "Could not provide specific examples of handling criticism", "Lacked concrete evidence of mentoring others"

*CASE STUDY INTERVIEWS:*
- Strengths: "Structured market analysis logically with clear assumptions", "Provided comprehensive business recommendations"
- Weaknesses: "Missed key financial implications of the scenario", "Failed to consider stakeholder perspectives"

*COMPETENCY-BASED INTERVIEWS:*
- Strengths: "Demonstrated project management skills with measurable outcomes", "Showed strong communication competency through examples"
- Weaknesses: "Unable to provide evidence of strategic planning abilities", "Lacked concrete examples of change management"

*GENERAL INTERVIEWS:*
- Strengths: "Communicated career goals clearly and confidently", "Showed strong problem-solving approach"
- Weaknesses: "Provided vague responses about professional experience", "Struggled to articulate technical background"

Conversation to analyze:
${conversationText}`
}
