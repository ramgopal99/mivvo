import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

type SlideType =
  | 'title_slide'
  | 'bullet_points'
  | 'step_blocks'
  | 'highlight_box'
  | 'flow_tree'
  | 'comparison_table'
  | 'code_block'
  | 'code_step_explain'
  | 'question_prompt'
  | 'summary_slide'

interface TypedSlide {
  slideNumber: number
  type: SlideType
  title?: string
  content: { tts: string; [key: string]: unknown }
  timing: { displayDelay: number; ttsDuration: number }
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

    const numSlides = parseInt(slideCount) || 2
    if (numSlides < 2 || numSlides > 6) {
      return NextResponse.json(
        { error: 'Slide count must be between 2 and 6' },
        { status: 400 }
      )
    }

    const isLearningRequest = /teach|learn|explain|show me|how to/i.test(prompt)
    if (!isLearningRequest) {
      return NextResponse.json(
        { error: 'Use phrases like "teach me", "teach this", "explain", "learn", or "how to" to generate content' },
        { status: 400 }
      )
    }

    const systemPrompt = `You are an educational content generator. Create structured presentation slides with RICH LAYOUTS. Each slide has a "type" that determines its visual layout. Choose the type that best fits the content.

SLIDE TYPES and their content shape (content always includes "tts" – natural speech for the AI teacher):

1. title_slide – Opening/title. content: { "tts": "...", "subtitle": "optional" }. Use slide "title" for main heading.

2. bullet_points – List of points. content: { "tts": "...", "bullets": ["point 1", "point 2", ...] }

3. step_blocks – Numbered steps. content: { "tts": "...", "steps": [{"step": 1, "title": "Step title", "description": "..."}, ...] }

4. highlight_box – Key quote or callout. content: { "tts": "...", "highlight": "main quote", "supporting": "optional context" }

5. flow_tree – Hierarchy/process flow. content: { "tts": "...", "nodes": [{"id": "1", "label": "Item", "children": [{"id": "1a", "label": "Sub-item"}]}] }

6. comparison_table – Compare options. content: { "tts": "...", "headers": ["Col1", "Col2", ...], "rows": [["r1c1", "r1c2"], ...] }

7. code_block – Code snippet. content: { "tts": "...", "code": "code as string", "language": "javascript"|"python"|"bash"|etc }

8. code_step_explain – Code with line-by-line explanation. content: { "tts": "...", "code": "...", "language": "...", "steps": [{"lineRef": "L1", "text": "explanation"}, ...] }

9. question_prompt – Quiz/reflection. content: { "tts": "...", "question": "?", "options": ["A", "B", "C"] }

10. summary_slide – Wrap-up. content: { "tts": "...", "points": ["point 1", "point 2", ...] }

OUTPUT JSON format:
{
  "slides": [
    {
      "slideNumber": 1,
      "type": "title_slide",
      "title": "Main Title",
      "content": { "tts": "spoken intro...", "subtitle": "Optional subtitle" },
      "timing": { "displayDelay": 0, "ttsDuration": 5 }
    },
    ...
  ]
}

Rules:
- Generate EXACTLY ${numSlides} slides.
- Use a mix of types (e.g. title_slide, bullet_points, code_block, comparison_table, summary_slide) based on the topic. Pick the type that fits each slide best.
- First slide: usually "title_slide". Last slide: often "summary_slide".
- For programming topics: use "code_block" or "code_step_explain" where appropriate.
- For comparisons: use "comparison_table". For processes/hierarchy: "flow_tree" or "step_blocks".
- "tts" must be natural, conversational speech (English). "timing.ttsDuration" = estimated seconds (~150 wpm).
- All content in English. Return ONLY valid JSON, no markdown or code fences.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      max_tokens: 4000,
      temperature: 0.7,
      response_format: { type: 'json_object' }
    })

    const responseContent = completion.choices[0]?.message?.content || '{}'

    let slidesData: { slides: TypedSlide[] }
    try {
      slidesData = JSON.parse(responseContent)
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError)
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      )
    }

    if (!slidesData.slides || !Array.isArray(slidesData.slides)) {
      return NextResponse.json(
        { error: 'Invalid slide data format' },
        { status: 500 }
      )
    }

    let cumulativeDelay = 0
    const processedSlides = slidesData.slides.map((slide, index) => {
      if (index > 0) {
        const prev = slidesData.slides[index - 1]
        cumulativeDelay += (prev.timing?.ttsDuration ?? 5) + 0.5
      }
      return {
        ...slide,
        timing: {
          ...slide.timing,
          displayDelay: index === 0 ? 0 : cumulativeDelay,
          ttsDuration: slide.timing?.ttsDuration ?? 5
        }
      }
    })

    const lastSlide = processedSlides[processedSlides.length - 1]
    const totalDuration = cumulativeDelay + (lastSlide?.timing?.ttsDuration ?? 0)

    return NextResponse.json({
      success: true,
      slides: processedSlides,
      totalDuration
    })
  } catch (error) {
    console.error('VideoLearn API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}
