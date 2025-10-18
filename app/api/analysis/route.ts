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

    // Pre-analyze conversation for obviously minimal responses
    const userMessages = conversation.filter(msg => msg.role === 'user')
    const totalUserWords = userMessages.reduce((sum, msg) => sum + msg.text.trim().split(/\s+/).length, 0)

    // Check for minimal technical content
    const hasTechnicalContent = userMessages.some(msg => {
      const text = msg.text.toLowerCase()
      return text.includes('code') || text.includes('algorithm') || text.includes('data') ||
             text.includes('function') || text.includes('class') || text.includes('api') ||
             text.includes('database') || text.includes('server') || text.includes('react') ||
             text.includes('javascript') || text.includes('python') || text.includes('java') ||
             text.includes('system') || text.includes('design') || text.includes('complexity') ||
             text.includes('time') || text.includes('space') || text.includes('sort') ||
             text.includes('search') || text.includes('tree') || text.includes('graph')
    })

    // If conversation is extremely minimal, return low scores without calling OpenAI
    if (userMessages.length <= 1 || totalUserWords <= 5) {
      return NextResponse.json({
        sentiment: "Neutral",
        confidence_level: "Low",
        communication_skills: {
          clarity: "Confusing",
          grammar: "Poor",
          filler_words: "High"
        },
        technical_knowledge: {
          accuracy: "Wrong",
          depth: "Basic"
        },
        soft_skills: {
          problem_solving: "Weak",
          attitude: "Neutral"
        },
        strengths: ["Participated in conversation"],
        weaknesses: ["Minimal responses", "No technical discussion", "Limited communication"],
        final_score: 0,
        recommendation: "Reject",
        vocabularyComplexity: 20,
        emotionalTone: "Neutral",
        wordCountAnalysis: "Too Brief",
        questionAnsweringQuality: 10,
        followUpHandling: false,
        answerStructure: "Poor",
        exampleUsage: false,
        relevantTopicAnswer: false
      })
    }

    // If conversation has responses but no technical content, also return low scores
    if (!hasTechnicalContent && userMessages.length > 2) {
      return NextResponse.json({
        sentiment: "Neutral",
        confidence_level: "Low",
        communication_skills: {
          clarity: "Moderate",
          grammar: "Average",
          filler_words: "Medium"
        },
        technical_knowledge: {
          accuracy: "Wrong",
          depth: "Basic"
        },
        soft_skills: {
          problem_solving: "Weak",
          attitude: "Neutral"
        },
        strengths: ["Basic communication skills"],
        weaknesses: ["No technical knowledge demonstrated", "Did not engage with technical questions", "Failed to show problem-solving abilities"],
        final_score: 1,
        recommendation: "Reject",
        vocabularyComplexity: 35,
        emotionalTone: "Neutral",
        wordCountAnalysis: "Appropriate",
        questionAnsweringQuality: 25,
        followUpHandling: false,
        answerStructure: "Average",
        exampleUsage: false,
        relevantTopicAnswer: false
      })
    }

    // Format conversation for AI analysis
    const conversationText = conversation
      .map(msg => `${msg.role === 'user' ? 'Candidate' : 'Interviewer'}: ${msg.text}`)
      .join('\n\n')

    const topicContext = topic ? `This interview focuses on: ${topic}. Evaluate technical knowledge and responses in the context of ${topic} expertise.` : 'This is a general technical interview. Evaluate technical knowledge based on demonstrated programming and problem-solving skills.'

    const systemPrompt = `You are an expert HR interview analyzer specializing in technical interviews. Analyze the following interview conversation and provide a detailed assessment.

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

CRITICAL Analysis Guidelines (Be extremely strict and evidence-based):
- ONLY evaluate what is ACTUALLY demonstrated in the conversation
- If candidate says "hi" or gives minimal responses, give LOW scores (0-2)
- If no technical discussion occurs, technical_knowledge should be "Wrong" and depth "Basic"
- Look for SPECIFIC evidence of technical understanding - don't assume knowledge
- Communication skills should reflect actual clarity shown in responses
- Problem-solving should only be rated if candidate demonstrates thinking process
- Be SKEPTICAL - assume minimal competence unless clearly demonstrated
- Strengths must be supported by specific examples from conversation
- Weaknesses should reflect what was actually missing or poor
- Default to LOW scores unless exceptional evidence is shown

Strict Scoring Scale (based on actual conversation content):
- 9-10: Demonstrated deep technical understanding with specific examples, clear explanations, strong problem-solving
- 7-8: Showed some technical knowledge with correct answers, reasonable explanations
- 5-6: Basic understanding shown, partial correct answers, needs more depth
- 3-4: Very limited technical knowledge demonstrated, mostly incorrect or no answers
- 0-2: No meaningful technical discussion, minimal responses, or complete lack of understanding

EVIDENCE-BASED REQUIREMENTS:
- If candidate only says greetings/minimal responses: score 0-2
- If no technical questions were asked or answered: technical_knowledge = "Wrong"
- Communication clarity based on actual response quality, not assumed
- Problem-solving only if candidate shows thinking/reasoning process
- Confidence level based on actual demonstrated knowledge, not personality

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
