import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getAnalysisPrompt } from '@/app/api/custom-interviews/prompts/analysis-prompt'

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

    const systemPrompt = getAnalysisPrompt({
      conversationText,
      topic
    })

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
