/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Voice Profile API Route
 *
 * This endpoint processes voice input from users, refines it into a professional profile,
 * and generates a personalized interview prompt.
 */

import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { generateVoiceProfilePrompt, generateVoiceInterviewPrompt } from '../prompts'

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

    // Validate minimum length for meaningful analysis
    if (voiceText.trim().length < 10) {
      return NextResponse.json({
        success: false,
        validationError: 'Please provide more detailed information about your background and career goals. Speak for at least 20-30 seconds to give us enough information to create a personalized profile.',
        originalVoiceText: voiceText
      })
    }

    // Step 1: Convert voice text to structured profile using OpenAI
    const profilePrompt = generateVoiceProfilePrompt(voiceText)

    const profileCompletion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: profilePrompt }
      ],
      max_tokens: 1000,
      temperature: 0.3, // Lower temperature for consistent JSON structure
    })

    const profileResponse = profileCompletion.choices[0]?.message?.content?.trim()

    if (!profileResponse) {
      throw new Error('No profile response from OpenAI')
    }

    // Parse the JSON profile
    let profile
    try {
      // Clean up the response - remove any markdown formatting
      const cleanResponse = profileResponse
        .replace(/^```json\n?/i, '')
        .replace(/\n?```$/, '')
        .trim()

      profile = JSON.parse(cleanResponse)
    } catch (parseError: unknown) {
      console.error('Failed to parse profile JSON:', profileResponse)
      throw new Error('Failed to generate valid profile from voice input')
    }

    // Step 2: Generate interview prompt from the profile
    const interviewPrompt = generateVoiceInterviewPrompt(profile)

    return NextResponse.json({
      success: true,
      profile: profile,
      prompt: interviewPrompt,
      originalVoiceText: voiceText
    })

  } catch (error) {
    console.error('Voice Profile API error:', error)
    return NextResponse.json(
      { error: 'Failed to process voice input and generate profile' },
      { status: 500 }
    )
  }
}
