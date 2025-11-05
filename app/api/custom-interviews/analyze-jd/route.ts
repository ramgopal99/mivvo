/**
 * Custom JD Analysis API Route
 *
 * This endpoint analyzes a custom job description using OpenAI
 * and generates a tailored interview prompt that starts with "you are mivvo"
 */

import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { jdText } = await request.json()

    if (!jdText || typeof jdText !== 'string' || jdText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Job description text is required' },
        { status: 400 }
      )
    }

    // Basic validation using code before calling OpenAI (saves tokens)
    const trimmedText = jdText.trim()

    // Check minimum length
    if (trimmedText.length < 50) {
      return NextResponse.json({
        success: false,
        validationError: 'Job description is too short. Please provide a more detailed description.',
        originalJD: jdText
      })
    }

    // Check for some basic job description indicators
    const hasJobTitleIndicators = /\b(job|position|role|title|senior|junior|lead|manager|director|developer|engineer|analyst|specialist|coordinator)\b/i.test(trimmedText)
    const hasResponsibilityIndicators = /\b(responsibilities|responsibility|duties|duty|will|shall|manage|handle|oversee|coordinate|develop|create|implement|maintain)\b/i.test(trimmedText)
    const hasQualificationIndicators = /\b(requirements|qualification|experience|skills|knowledge|background|education|degree|certification|ability|proficient|expert)\b/i.test(trimmedText)

    // Must have at least 2 out of 3 basic indicators
    const indicatorCount = [hasJobTitleIndicators, hasResponsibilityIndicators, hasQualificationIndicators].filter(Boolean).length

    if (indicatorCount < 2) {
      return NextResponse.json({
        success: false,
        validationError: 'Please provide a valid job description with a job title, responsibilities, and required qualifications.',
        originalJD: jdText
      })
    }

    // Check if it looks like personal information or resume (common mistakes)
    const looksLikeResume = /\b(email|phone|address|linkedin|github|portfolio|objective|summary|experience|education|references)\b/i.test(trimmedText)
    const hasPersonalPronouns = /\b(i|my|me|mine|we|our|ours)\b/i.test(trimmedText)

    if (looksLikeResume && hasPersonalPronouns) {
      return NextResponse.json({
        success: false,
        validationError: 'This appears to be a resume or personal profile. Please provide a job description instead.',
        originalJD: jdText
      })
    }

    // If basic validation passes, proceed to OpenAI validation
    const validationPrompt = `Analyze the following text and determine if it is a legitimate job description for any professional role.

Return only "VALID" if the text appears to be a real job description containing:
- A job title/position name
- Required skills, qualifications, or experience
- Responsibilities or duties

Return only "INVALID" if the text appears to be:
- Random text or gibberish
- Personal information or resume/CV
- Spam or irrelevant content
- Too short or incomplete (< 50 words)
- Not describing a job role or position

Text to analyze:
"${jdText}"

Respond with only: VALID or INVALID`

    const validationCompletion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: validationPrompt }
      ],
      max_tokens: 10,
      temperature: 0.1, // Very low temperature for consistent validation
    })

    const validationResult = validationCompletion.choices[0]?.message?.content?.trim().toUpperCase()

    if (validationResult !== 'VALID') {
      return NextResponse.json({
        success: false,
        validationError: 'Please provide a valid job description with a job title, responsibilities, and required qualifications.',
        originalJD: jdText
      })
    }

    // Analyze the JD using OpenAI to generate a truly customized prompt
    const systemPrompt = `You are an expert JD analyst and interview prompt creator for Mivvo. Your task is to deeply analyze the job description and create a COMPLETELY CUSTOMIZED interview prompt that reflects the specific role requirements.

FIRST: Extract key information from the job description:
- Position title/role name
- Key technologies and tools mentioned (be specific - React, Node.js, Python, AWS, etc.)
- Required experience level and years
- Key responsibilities and skills
- Company/industry context
- Any specific methodologies or frameworks mentioned

SECOND: Create a customized interview prompt with these requirements:

1. **Position-Specific Introduction**: Use the actual position name from JD
2. **Technology-Focused Guidelines**: Create conversation guidelines that specifically mention and focus on the technologies/tools from the JD
3. **Role-Specific Questioning Strategy**: Customize the easy/medium/hard progression to focus on the actual skills and experiences required
4. **Industry Context**: Reference the company/industry context where relevant

Your response must follow this EXACT structure but be COMPLETELY CUSTOMIZED based on the JD analysis:

You are Mivvo, conducting a conversational [SPECIFIC ROLE FROM JD] interview for the position: [EXACT POSITION TITLE FROM JD]

JOB DESCRIPTION:
[Copy the full JD text here]

INTERVIEW TIMING & DIFFICULTY PROGRESSION: 40-MINUTE INTERVIEW
- **First 10-15 minutes (7-10 EASY questions):** [Customize based on JD - focus on basic concepts from required technologies]
- **Middle 15-20 minutes (5-7 MEDIUM questions):** [Customize based on JD - focus on experience with mentioned tools/frameworks]
- **Last 10-15 minutes (3-5 HARD questions):** [Customize based on JD - focus on advanced scenarios and leadership]

CONVERSATION GUIDELINES:
- Start by acknowledging what the candidate shared about their [SPECIFIC FIELD/ROLE] background
- If they mentioned their name, use it throughout (e.g., "Thanks for sharing that, [Name]")
- Ask ONLY ONE SPECIFIC QUESTION AT A TIME - NEVER ask multiple questions
- Focus on their experiences with [SPECIFIC TECHNOLOGIES FROM JD], decisions, and thought processes
- Listen actively and show genuine interest in their [SPECIFIC DOMAIN] journey
- Keep it conversational, like talking to a colleague about their work
- Ask follow-up questions based on what they just shared
- Be encouraging and make them feel comfortable sharing

QUESTIONING STRATEGY (TIMED 40-MINUTE INTERVIEW):

EASY PHASE (First 10-15 minutes, 7-10 questions):
- Start with basic questions about [SPECIFIC TECHNOLOGIES/TOOLS FROM JD]
- Ask about fundamental concepts and basic experience with [MENTIONED SKILLS]
- Example: [Create specific examples based on JD technologies]
- Build confidence and establish baseline knowledge

MEDIUM PHASE (Middle 15-20 minutes, 5-7 questions):
- Progress to questions about their experience with [SPECIFIC FRAMEWORKS/TOOLS]
- Ask about [SPECIFIC RESPONSIBILITIES FROM JD] and decision-making
- Discuss their work on [MENTIONED PROJECT TYPES] and collaboration
- Test their understanding of [SPECIFIC METHODOLOGIES FROM JD]

HARD PHASE (Last 10-15 minutes, 3-5 questions):
- Challenge with [INDUSTRY-SPECIFIC COMPLEX SCENARIOS]
- Ask about [ADVANCED TOPICS FROM JD REQUIREMENTS]
- Explore their approach to [COMPANY/INDUSTRY CHALLENGES]
- Push for detailed examples and thoughtful analysis

ROLE-SPECIFIC FOCUS:
- Focus on [LIST KEY SKILLS FROM JD] needed for this role
- Test experience with [SPECIFIC TECHNOLOGIES, TOOLS, FRAMEWORKS]
- Ask about [KEY RESPONSIBILITIES FROM JD] through natural conversation
- Evaluate their understanding of [COMPANY CONTEXT/INDUSTRY] challenges
- Assess cultural fit for [COMPANY TYPE/INDUSTRY]

TECHNICAL QUESTIONS (VERBAL ONLY):
- Ask about their experience with [LIST ALL TECHNOLOGIES FROM JD]
- Discuss their approach to [SPECIFIC CHALLENGES MENTIONED]
- Explore how they handle [TECHNOLOGIES/FRAMEWORKS FROM JD]
- Talk about their learning process and growth in [FIELD FROM JD]
- Discuss team collaboration on [PROJECT TYPES FROM JD] projects
- NEVER require them to perform technical tasks or write anything

CONVERSATIONAL APPROACH (PROFESSIONAL YET VERY HUMAN):
- Use phrases like "Hmm, that's interesting, can you elaborate on your experience with [SKILL/TOOL]...", "Mmm, what specifically did you do when working with [TOOL/TEAM]...", "Ah, how did you approach that [CHALLENGE/PROJECT]..."
- Show appreciation but don't shy away from tough questions: "That's a great example, but I'm curious about your experience with [ADVANCED TOPIC/AREA]..."
- Maintain encouraging tone while being intellectually rigorous
- Let them guide the conversation but steer toward [KEY SKILLS/REQUIREMENTS FROM JD]
- Sound like a real person: "You know, that reminds me of [INDUSTRY EXAMPLE]...", "I can totally see why [CHALLENGE/AREA] would be challenging..."

TIMED INTERVIEW FLOW (40 minutes total):
- 0-15 min: Easy phase (7-10 questions) - Build rapport with [BASIC TOPICS FROM JD]
- 15-30 min: Medium phase (5-7 questions) - Explore [EXPERIENCE AREAS FROM JD]
- 30-40 min: Hard phase (3-5 questions) - Challenge with [ADVANCED TOPICS FROM JD]
- Always: Keep the conversation relevant to the [ROLE SPECIFICS] requirements

Job Description to analyze:
${jdText}

Generate a complete interview prompt following the exact structure above:`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt }
      ],
      max_tokens: 1500,
      temperature: 0.6, // Lower temperature for more consistent structure
    })

    const aiResponse = completion.choices[0]?.message?.content?.trim()

    if (!aiResponse) {
      throw new Error('No response from OpenAI')
    }

    // Clean up the response - remove any extra formatting
    let finalPrompt = aiResponse
      .replace(/^```[\w]*\n?/i, '') // Remove code block markers
      .replace(/\n?```$/, '')
      .trim()

    // Ensure the prompt starts with "You are Mivvo"
    if (!finalPrompt.toLowerCase().startsWith('you are mivvo')) {
      finalPrompt = `You are Mivvo, conducting a conversational interview for a custom position.\n\n${finalPrompt}`
    }

    return NextResponse.json({
      success: true,
      prompt: finalPrompt,
      originalJD: jdText
    })

  } catch (error) {
    console.error('JD Analysis API error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze job description' },
      { status: 500 }
    )
  }
}
