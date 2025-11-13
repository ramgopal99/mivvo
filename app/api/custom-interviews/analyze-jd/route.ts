/**
 * Custom JD Analysis API Route
 *
 * This endpoint analyzes a custom job description using OpenAI
 * and generates a tailored interview prompt that starts with "you are mivvo"
 */

import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { generateCustomInterviewPrompt } from '../prompts/custom-interview-prompt'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { jdText, cvText } = await request.json()

    // Basic check - only ensure jdText exists and is a string
    if (!jdText || typeof jdText !== 'string' || jdText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Job description text is required' },
        { status: 400 }
      )
    }

    // Let OpenAI handle all validation directly
    const validationPrompt = `Analyze the following text and determine if it is a legitimate job description for any professional role.

Return only "VALID" if the text appears to be a real job description containing:
- A job title/position name
- Required skills, qualifications, or experience
- Responsibilities or duties

Return only "INVALID" if the text appears to be:
- Random text or gibberish
- Personal information or resume/CV (if it's a resume, suggest using the CV upload feature)
- Spam or irrelevant content
- Too short or incomplete (less than 50 words)
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
    const systemPrompt = generateCustomInterviewPrompt(jdText, cvText)

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
