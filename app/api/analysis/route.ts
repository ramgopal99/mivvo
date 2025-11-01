import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface AnalysisResult {
  sentiment: "Positive" | "Neutral" | "Negative"
  confidence_level: "High" | "Medium" | "Low"
  communication_skills: {
    clarity: "Clear" | "Moderate" | "Confusing"
    grammar: "Good" | "Average" | "Poor"
    filler_words: "Low" | "Medium" | "High"
  }
  technical_knowledge: {
    accuracy: "Correct" | "Partially correct" | "Wrong"
    depth: "Basic" | "Intermediate" | "Expert"
  }
  soft_skills: {
    problem_solving: "Strong" | "Average" | "Weak"
    attitude: "Positive" | "Neutral" | "Negative"
  }
  strengths: string[]
  weaknesses: string[]
  final_score: number
  recommendation: "Proceed" | "Maybe" | "Reject"
  vocabularyComplexity: number
  emotionalTone: "Positive" | "Neutral" | "Negative"
  wordCountAnalysis: "Too Brief" | "Appropriate" | "Too Verbose"
  questionAnsweringQuality: number
  followUpHandling: boolean
  answerStructure: "Poor" | "Average" | "Excellent"
  exampleUsage: boolean
  relevantTopicAnswer: boolean
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { conversation, topic } = body

    if (!conversation || !Array.isArray(conversation)) {
      return NextResponse.json(
        { error: 'Invalid request: conversation array is required' },
        { status: 400 }
      )
    }

    // Let OpenAI analyze ALL conversations - no hardcoded early returns
    // This ensures consistent AI-driven evaluation for every conversation type

    // Format conversation for AI analysis
    const conversationText = conversation
      .map(msg => `${msg.role === 'user' ? 'Candidate' : 'Interviewer'}: ${msg.text}`)
      .join('\n\n')

    const topicContext = topic ?
      `This interview focuses on: ${topic}. Evaluate responses in the context of ${topic} expertise.` :
      'This is a general interview. Evaluate communication skills, problem-solving approach, and overall fit.'

    const systemPrompt = `You are an expert HR interview analyzer. Analyze the following interview conversation and provide a detailed assessment.

${topicContext}

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
- For GENERAL interviews: Focus on communication, problem-solving approach, and interpersonal skills
- For TECHNICAL interviews: Evaluate technical understanding, problem-solving, and domain knowledge
- Communication skills should reflect actual clarity, grammar, and coherence shown
- Problem-solving should be rated based on demonstrated thinking process and examples given
- Be FAIR and CONSISTENT - evaluate based on what was actually asked and answered
- Strengths must be supported by specific examples from the conversation
- Weaknesses should reflect what was actually missing, poor, or inadequate
- Don't assume knowledge or skills - base evaluation on what was demonstrated

COMPREHENSIVE SCORING SCALE (0-10):
- 9-10: Outstanding performance - excellent communication, deep insights, strong problem-solving, relevant examples, confident delivery
- 7-8: Good performance - clear communication, reasonable answers, some problem-solving demonstrated, appropriate examples
- 5-6: Adequate performance - basic communication, partial answers, limited problem-solving, few or generic examples
- 3-4: Poor performance - unclear communication, minimal answers, weak problem-solving, no specific examples
- 1-2: Very poor performance - very limited responses, poor communication, no meaningful answers
- 0: No meaningful participation - only greetings or non-responses

DETAILED EVALUATION CRITERIA:
- SENTIMENT: Based on overall tone and engagement level
- CONFIDENCE_LEVEL: Based on response quality and assertiveness, not personality assumptions
- COMMUNICATION_SKILLS: Actual clarity, grammar, filler word usage observed
- TECHNICAL_KNOWLEDGE: Only evaluate if technical topics were discussed (accuracy and depth)
- SOFT_SKILLS: Problem-solving approach, attitude, and interpersonal skills demonstrated
- VOCABULARY_COMPLEXITY: Range and sophistication of language used (0-100)
- QUESTION_ANSWERING_QUALITY: How directly and completely questions are addressed (0-100)

SPECIAL HANDLING FOR EDGE CASES:
- Single word responses ("Yes", "No", "Hi"): Score 0-1, note minimal participation
- Very brief conversations (2-3 exchanges): Evaluate based on what was actually said
- No responses to questions: Score 0, note lack of engagement
- Off-topic responses: Lower scores, note poor focus
- Technical interviews with no technical discussion: Low technical scores, note disengagement

STRENGTHS & WEAKNESSES GUIDELINES:
- Strengths: Must cite specific examples from conversation ("Clear explanation of X", "Good example of Y")
- Weaknesses: Must be evidence-based ("Did not provide examples", "Unclear on X topic", "Minimal responses")
- Be specific and actionable in feedback
- Focus on observed behaviors, not assumptions

Conversation to analyze:
${conversationText}`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt }
      ],
      max_tokens: 1000,
      temperature: 0.3, // Lower temperature for more consistent analysis
    })

    const aiResponse = completion.choices[0]?.message?.content?.trim()

    if (!aiResponse) {
      throw new Error('No response from OpenAI')
    }

    // Parse the JSON response
    let analysis: AnalysisResult
    try {
      // Remove any markdown formatting if present
      const cleanResponse = aiResponse.replace(/```json\s*|\s*```/g, '').trim()
      analysis = JSON.parse(cleanResponse)

      // Validate the response structure
      const requiredFields = ['sentiment', 'confidence_level', 'communication_skills', 'technical_knowledge', 'soft_skills', 'strengths', 'weaknesses', 'final_score', 'recommendation']
      for (const field of requiredFields) {
        if (!(field in analysis)) {
          throw new Error(`Missing required field: ${field}`)
        }
      }

    } catch {
      console.error('Failed to parse AI response:', aiResponse)
      // Return conservative analysis if AI response is malformed
      return NextResponse.json({
        sentiment: "Neutral",
        confidence_level: "Low",
        communication_skills: {
          clarity: "Moderate",
          grammar: "Average",
          filler_words: "Medium"
        },
        technical_knowledge: {
          accuracy: "Partially correct",
          depth: "Basic"
        },
        soft_skills: {
          problem_solving: "Average",
          attitude: "Neutral"
        },
        strengths: ["Completed the interview process"],
        weaknesses: ["Response quality could not be fully evaluated", "Technical demonstration unclear"],
        final_score: 3,
        recommendation: "Maybe",
        vocabularyComplexity: 45,
        emotionalTone: "Neutral",
        wordCountAnalysis: "Appropriate",
        questionAnsweringQuality: 50,
        followUpHandling: true,
        answerStructure: "Average",
        exampleUsage: true,
        relevantTopicAnswer: true
      })
    }

    return NextResponse.json(analysis)

  } catch (error) {
    console.error('Analysis API error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze conversation' },
      { status: 500 }
    )
  }
}
