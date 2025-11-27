import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    console.log('API: Received markdown conversion request')
    const { prompt, cvText } = await request.json()
    console.log('API: CV text length:', cvText?.length)
    console.log('API: Prompt length:', prompt?.length)

    if (!cvText || !prompt) {
      console.log('API: Missing cvText or prompt')
      return NextResponse.json(
        { error: 'Missing cvText or prompt' },
        { status: 400 }
      )
    }

    // Use GPT-4o-mini for cost-effective conversion
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert CV/resume formatter. Convert CV text to clean, structured Markdown format. Preserve all information exactly as provided. Use proper heading hierarchy and bullet points.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.1, // Low temperature for consistent formatting
    })

    const markdown = completion.choices[0]?.message?.content?.trim() || ''
    const tokensUsed = completion.usage?.total_tokens || 0

    console.log('API: Generated markdown length:', markdown.length)
    console.log('API: Tokens used:', tokensUsed)

    // Calculate confidence based on response quality
    const confidence = markdown.includes('#') && markdown.includes('-') ? 0.95 :
                      markdown.includes('#') ? 0.85 : 0.7

    console.log('API: Response confidence:', confidence)

    return NextResponse.json({
      success: true,
      markdown,
      tokensUsed,
      confidence,
      cost: tokensUsed * 0.000012 // Approximate cost in rupees
    })

  } catch (error) {
    console.error('API: Markdown conversion error:', error)

    // Try to get cvText again for fallback (it might have been consumed)
    let cvText = ''
    try {
      const body = await request.json()
      cvText = body.cvText || ''
    } catch {
      cvText = 'Sample CV text - API error occurred'
    }

    console.log('API: Using fallback markdown for text length:', cvText.length)

    // Return a basic formatted version as fallback
    const basicMarkdown = cvText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n\n')

    console.log('API: Fallback markdown length:', basicMarkdown.length)

    return NextResponse.json({
      success: false,
      markdown: basicMarkdown,
      tokensUsed: 0,
      confidence: 0.3,
      cost: 0,
      error: 'AI conversion failed, using basic formatting'
    })
  }
}
