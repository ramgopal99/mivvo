import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface Slide {
  slideNumber: number
  title: string
  content: {
    text: string // Text to display on screen
    tts: string // Text for TTS (what AI will speak)
  }
  timing: {
    displayDelay: number // When to show this slide (in seconds)
    ttsDuration: number // Estimated duration for TTS (in seconds)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, slideCount = 2 } = await request.json()

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // Validate slide count
    const numSlides = parseInt(slideCount) || 2
    if (numSlides < 2 || numSlides > 6) {
      return NextResponse.json(
        { error: 'Slide count must be between 2 and 6' },
        { status: 400 }
      )
    }

    // Check if user wants to learn about a list/topic
    const isLearningRequest = /teach me|learn|explain|show me/i.test(prompt)

    if (!isLearningRequest) {
      return NextResponse.json(
        { error: 'Please use phrases like "teach me", "learn", "explain", or "show me" to generate content' },
        { status: 400 }
      )
    }

    const systemPrompt = `You are an educational content generator. Generate structured presentation content (like PowerPoint slides) based on the user's request.

Generate content in JSON format with this exact structure:
{
  "slides": [
    {
      "slideNumber": 1,
      "title": "Slide title",
      "content": {
        "text": "Visual content to display on screen (can include bullet points, key concepts, diagrams descriptions, etc.)",
        "tts": "Natural spoken explanation that the AI teacher will say (should be conversational and educational)"
      },
      "timing": {
        "displayDelay": 0,
        "ttsDuration": 5
      }
    }
  ]
}

Rules:
1. Generate EXACTLY ${numSlides} slides for the topic
2. Each slide should have:
   - A clear title (in English)
   - Visual content (text) that's concise and displayable (in English, use bullet points, short sentences)
   - TTS content that's natural speech (in English, can be longer, more conversational)
3. Timing:
   - displayDelay: When to show the slide (0 for first, then cumulative based on previous slide's ttsDuration)
   - ttsDuration: Estimated seconds for speaking (calculate based on ~150 words per minute)
4. Make content educational, clear, and engaging
5. All content must be in English (both display text and TTS)
6. Return ONLY valid JSON, no markdown, no code blocks`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      max_tokens: 2000,
      temperature: 0.7,
      response_format: { type: 'json_object' }
    })

    const responseContent = completion.choices[0]?.message?.content || '{}'
    
    let slidesData: { slides: Slide[] }
    try {
      slidesData = JSON.parse(responseContent)
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError)
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      )
    }

    // Validate and process slides
    if (!slidesData.slides || !Array.isArray(slidesData.slides)) {
      return NextResponse.json(
        { error: 'Invalid slide data format' },
        { status: 500 }
      )
    }

    // Calculate proper timing delays
    let cumulativeDelay = 0
    const processedSlides = slidesData.slides.map((slide, index) => {
      if (index === 0) {
        cumulativeDelay = 0
      } else {
        // Add previous slide's TTS duration plus a small transition
        cumulativeDelay += slidesData.slides[index - 1].timing.ttsDuration + 0.5
      }
      
      return {
        ...slide,
        timing: {
          ...slide.timing,
          displayDelay: cumulativeDelay
        }
      }
    })

    return NextResponse.json({
      success: true,
      slides: processedSlides,
      totalDuration: cumulativeDelay + (processedSlides[processedSlides.length - 1]?.timing.ttsDuration || 0)
    })

  } catch (error) {
    console.error('VideoLearn API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}
