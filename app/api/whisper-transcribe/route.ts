import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const audioFile = formData.get('file') as File
    const model = formData.get('model') as string || 'whisper-1'
    const language = formData.get('language') as string | null
    const responseFormat = formData.get('response_format') as string || 'json'

    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['audio/webm', 'audio/wav', 'audio/mp3', 'audio/mpeg', 'audio/mp4', 'audio/ogg']
    if (!allowedTypes.includes(audioFile.type)) {
      return NextResponse.json(
        { error: 'Unsupported audio format. Supported formats: webm, wav, mp3, mp4, ogg' },
        { status: 400 }
      )
    }

    // Check file size (25MB limit for Whisper)
    const maxSize = 25 * 1024 * 1024 // 25MB
    if (audioFile.size > maxSize) {
      return NextResponse.json(
        { error: 'Audio file too large. Maximum size is 25MB' },
        { status: 400 }
      )
    }

    // Convert File to Buffer for OpenAI API
    const arrayBuffer = await audioFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Prepare transcription parameters
    const transcriptionParams: any = {
      file: new File([buffer], audioFile.name, { type: audioFile.type }),
      model: model,
      response_format: responseFormat,
    }

    // Add language if specified
    if (language && language !== 'auto') {
      transcriptionParams.language = language
    }

    // Call OpenAI Whisper API
    const transcription = await openai.audio.transcriptions.create(transcriptionParams)

    // Return the transcription result
    return NextResponse.json({
      text: transcription.text,
      language: transcription.language,
      duration: transcription.duration,
      segments: transcription.segments,
    })

  } catch (error: any) {
    console.error('Whisper transcription error:', error)

    // Handle specific OpenAI errors
    if (error.status === 401) {
      return NextResponse.json(
        { error: 'Invalid OpenAI API key' },
        { status: 401 }
      )
    }

    if (error.status === 429) {
      return NextResponse.json(
        { error: 'OpenAI API rate limit exceeded' },
        { status: 429 }
      )
    }

    if (error.status === 400) {
      return NextResponse.json(
        { error: 'Invalid audio file or parameters' },
        { status: 400 }
      )
    }

    // Generic error
    return NextResponse.json(
      { error: 'Transcription failed. Please try again.' },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to transcribe audio.' },
    { status: 405 }
  )
}
