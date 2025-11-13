import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: NextRequest) {
  try {
    const { cvText } = await request.json()

    if (!cvText || typeof cvText !== 'string') {
      return NextResponse.json(
        { success: false, message: 'CV text is required' },
        { status: 400 }
      )
    }

    if (cvText.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'CV text cannot be empty' },
        { status: 400 }
      )
    }

    // Compress the CV text using OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert at compressing and summarizing CV/resume content. Your task is to create a concise, structured summary of the provided CV text that captures all essential information in a brief format.

Structure the compressed CV as follows:
1. **Professional Summary**: 2-3 sentences highlighting key qualifications and career focus
2. **Skills**: Bullet points of technical skills, tools, and competencies (max 10 most relevant)
3. **Experience**: Brief summaries of key roles, companies, and achievements (max 3-4 most recent/relevant positions)
4. **Education**: Key educational qualifications and certifications
5. **Key Achievements**: 3-5 most significant accomplishments or metrics

Keep the total compressed version under 800 words while maintaining all crucial information. Use clear, professional language and focus on quantifiable achievements where possible.`
        },
        {
          role: 'user',
          content: `Please compress and summarize this CV/resume text into a brief, structured format:\n\n${cvText}`
        }
      ],
      max_tokens: 1000,
      temperature: 0.3
    })

    const compressedCV = completion.choices[0]?.message?.content

    if (!compressedCV) {
      throw new Error('Failed to generate compressed CV')
    }

    // Calculate statistics for the compressed version
    const compressedWordCount = compressedCV.trim() === '' ? 0 : compressedCV.trim().split(/\s+/).length
    const originalWordCount = cvText.trim() === '' ? 0 : cvText.trim().split(/\s+/).length

    return NextResponse.json({
      success: true,
      data: {
        compressedCV: compressedCV,
        originalWordCount: originalWordCount,
        compressedWordCount: compressedWordCount,
        compressionRatio: originalWordCount > 0 ? ((originalWordCount - compressedWordCount) / originalWordCount * 100).toFixed(1) : '0'
      }
    })

  } catch (error) {
    console.error('CV compression error:', error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to compress CV'
      },
      { status: 500 }
    )
  }
}
