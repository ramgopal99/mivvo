/**
 * Voice Text Refinement API Route
 *
 * This endpoint takes raw transcribed voice text and refines it using OpenAI
 * to make it clearer and more professional for interview requests.
 */

import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { voiceText } = await request.json()

    // Basic validation
    if (!voiceText || typeof voiceText !== 'string' || voiceText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Voice text is required' },
        { status: 400 }
      )
    }

    // If text is very short, return as-is
    if (voiceText.trim().length < 5) {
      return NextResponse.json({
        success: true,
        refinedText: voiceText.trim()
      })
    }

    // Create refinement prompt
    const refinementPrompt = `You are refining transcribed voice text for interview creation. The user spoke their interview request and you need to clean it up.

TASK: Fix grammar, improve clarity, and make it professional, but keep it as a SIMPLE interview request phrase. Do NOT create formal emails, letters, or long messages.

EXAMPLES:
- If they say "i want python interview" → I want a Python developer interview
- If they say "give me junior frontend" → I want a junior frontend developer interview
- If they say "make react dev questions" → Create React developer interview questions

Keep it concise - just the refined request phrase, no extra text, quotes, or formatting.

Original text: "${voiceText}"

Provide only the cleaned up request phrase without quotes:`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: refinementPrompt }
      ],
      max_tokens: 50, // Short responses only
      temperature: 0.2, // Very low temperature for consistency
    })

    // Log token usage for voice text refinement
    console.log('🎤 Voice Text Refinement - Token Usage:', {
      prompt_tokens: completion.usage?.prompt_tokens || 0,
      completion_tokens: completion.usage?.completion_tokens || 0,
      total_tokens: completion.usage?.total_tokens || 0,
      model: 'gpt-4o-mini',
      operation: 'voice_refinement',
      input_length: voiceText.length
    })

    const refinedText = completion.choices[0]?.message?.content?.trim() || voiceText

    return NextResponse.json({
      success: true,
      refinedText: refinedText
    })

  } catch (error) {
    console.error('Voice text refinement error:', error)

    // Return original text if refinement fails
    const { voiceText } = await request.json().catch(() => ({ voiceText: '' }))

    return NextResponse.json({
      success: true,
      refinedText: voiceText || 'Interview request'
    })
  }
}
