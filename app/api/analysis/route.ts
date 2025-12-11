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

    // Log input statistics
    console.log('🔍 ANALYSIS INPUT STATS:', {
      conversation_length: conversation.length,
      total_characters: conversationText.length,
      topic: topic?.substring(0, 100) + (topic?.length > 100 ? '...' : ''),
      estimated_input_tokens: Math.ceil(conversationText.length / 4) // Rough estimate
    })

    const systemPrompt = getAnalysisPrompt({
      conversationText,
      topic
    })

    console.log('🔍 ANALYSIS SYSTEM PROMPT LENGTH:', {
      system_prompt_tokens: Math.ceil(systemPrompt.length / 4), // Rough estimate
      system_prompt_chars: systemPrompt.length
    })

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt }
      ],
      max_tokens: 1000,
      temperature: 0.3, // Lower temperature for more consistent analysis
    })

    // Log token usage
    const usage = completion.usage
    console.log('🔍 ANALYSIS TOKEN USAGE:', {
      prompt_tokens: usage?.prompt_tokens || 0,
      completion_tokens: usage?.completion_tokens || 0,
      total_tokens: usage?.total_tokens || 0,
      model: 'gpt-4o-mini',
      response_characters: completion.choices[0]?.message?.content?.length || 0
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
      // Return realistic analysis for failed parsing - assume minimal participation
      return NextResponse.json({
        sentiment: "Negative",
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
          attitude: "Negative"
        },
        strengths: ["Showed up for interview"],
        weaknesses: ["Failed to demonstrate any technical knowledge", "Poor communication skills", "No meaningful responses provided", "Unable to answer basic questions"],
        final_score: 5,
        recommendation: "Reject",
        vocabularyComplexity: 15,
        emotionalTone: "Negative",
        wordCountAnalysis: "Too Brief",
        questionAnsweringQuality: 10,
        followUpHandling: false,
        answerStructure: "Poor",
        exampleUsage: false,
        relevantTopicAnswer: false
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
