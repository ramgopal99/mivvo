import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface ConversationMessage {
  role: string
  text: string
  timestamp: string
}

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
}

interface GraphDataRequest {
  conversation: ConversationMessage[]
  analysis: AnalysisResult
  topic: string
  chartType: 'bar' | 'radar' | 'pie' | 'line' | 'all'
}

interface ChartData {
  barChart?: {
    title: string
    data: Array<{
      label: string
      value: number
      color: string
    }>
  }
  radarChart?: {
    title: string
    data: Array<{
      label: string
      value: number
      color: string
    }>
  }
  pieChart?: {
    title: string
    data: Array<{
      label: string
      value: number
      color: string
    }>
  }
  lineChart?: {
    title: string
    data: Array<{
      x: number
      y: number
      label: string
    }>
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: GraphDataRequest = await request.json()
    const { conversation, analysis, topic, chartType } = body

    if (!conversation || !analysis) {
      return NextResponse.json(
        { error: 'Conversation and analysis data are required' },
        { status: 400 }
      )
    }

    // Format conversation for AI analysis
    const conversationText = conversation
      .map(msg => `${msg.role === 'user' ? 'Candidate' : 'Interviewer'}: ${msg.text}`)
      .join('\n\n')

    // Extract key information for dynamic title generation
    const hasTechnicalQuestions = conversationText.toLowerCase().match(/code|algorithm|function|data|api|server|react|javascript|python|system|design|database/)
    const hasProblemSolving = conversationText.toLowerCase().match(/think|approach|solution|method|way|process|debug|optimize/)
    const hasBehavioral = conversationText.toLowerCase().match(/team|leadership|communication|conflict|motivation|culture/)

    const interviewType = hasTechnicalQuestions ? 'Technical' :
                        hasBehavioral ? 'Behavioral' :
                        hasProblemSolving ? 'Problem-Solving' : 'General'

    // Let AI handle ALL conversations including minimal ones
    // The AI will be strict based on the guidelines in the prompt

    const systemPrompt = `You are a data visualization expert specializing in interview performance analytics. Based on the interview conversation and analysis results, generate comprehensive chart data with appropriate, contextual titles.

FIRST, ANALYZE THE CONVERSATION:
- Count user messages and total words spoken by candidate
- If candidate only said "hi" or similar single greeting (≤2 messages, ≤5 words): This is MINIMAL conversation
- For minimal conversations: Only basic communication was demonstrated, no other skills

Interview Context:
- Topic: ${topic}
- Interview Type: ${interviewType}

Analysis Summary:
- Overall Score: ${analysis.final_score}/10 (${analysis.recommendation})
- Sentiment: ${analysis.sentiment}
- Communication Skills: ${analysis.communication_skills.clarity}
- Technical Knowledge: ${analysis.technical_knowledge.depth} (${analysis.technical_knowledge.accuracy})
- Problem Solving: ${analysis.soft_skills.problem_solving}
- Attitude: ${analysis.soft_skills.attitude}

You must respond with ONLY valid JSON in this exact format:
{
  "barChart": {
    "title": "Dynamic Title Based on Interview",
    "data": [
      {"label": "Specific Skill", "value": 75, "color": "#3b82f6"},
      {"label": "Another Skill", "value": 80, "color": "#8b5cf6"},
      {"label": "Key Area", "value": 70, "color": "#10b981"},
      {"label": "Important Metric", "value": 85, "color": "#f59e0b"}
    ]
  },
  "radarChart": {
    "title": "Comprehensive Performance Profile",
    "data": [
      {"label": "Specific Indicator", "value": 75, "color": "#3b82f6"},
      {"label": "Key Competency", "value": 80, "color": "#8b5cf6"},
      {"label": "Critical Skill", "value": 70, "color": "#10b981"},
      {"label": "Performance Area", "value": 85, "color": "#ef4444"},
      {"label": "Essential Quality", "value": 90, "color": "#06b6d4"}
    ]
  },
  "pieChart": {
    "title": "Score Distribution Analysis",
    "data": [
      {"label": "Primary Category", "value": 35, "color": "#8b5cf6"},
      {"label": "Secondary Area", "value": 30, "color": "#3b82f6"},
      {"label": "Supporting Skills", "value": 25, "color": "#10b981"},
      {"label": "Additional Factors", "value": 10, "color": "#f59e0b"}
    ]
  },
  "lineChart": {
    "title": "Conversation Engagement Timeline",
    "data": [
      {"x": 0, "y": 60, "label": "1"},
      {"x": 1, "y": 75, "label": ""},
      {"x": 2, "y": 80, "label": "3"}
    ]
  }
}

DYNAMIC TITLE GENERATION RULES:
Use the interview topic "${topic}" to create highly specific, contextual titles:

- Bar Chart Title: Focus on the specific skills needed for the "${topic}" role (e.g., "Frontend Developer Skills Assessment", "Data Science Core Competencies", "Leadership Communication Analysis")
- Radar Chart Title: Emphasize comprehensive evaluation for the "${topic}" position (e.g., "Full-Stack Developer Performance Profile", "Product Manager Competency Radar", "UX Designer Skills Assessment")
- Pie Chart Title: Show how performance breaks down for the "${topic}" role (e.g., "Software Engineer Score Distribution", "Marketing Manager Performance Breakdown")
- Line Chart Title: Focus on engagement and communication flow for the "${topic}" interview (e.g., "Technical Interview Response Quality", "Behavioral Interview Engagement Timeline")

ULTRA-STRICT DATA GENERATION GUIDELINES:
- Values must be realistic percentages (0-100) based on actual analysis results and conversation content
- BE BRUTALLY HONEST: If candidate only said greetings or minimal responses (like "hi"), scores should be very low (0-5%)
- MINIMAL CONVERSATION DETECTION: If conversation has ≤2 user messages and ≤5 total words, treat as minimal
- Labels should be highly specific to the "${topic}" role and interview content
- Adapt metrics based on the role requirements (e.g., coding skills for developers, communication for managers)
- Colors should be visually distinct and accessible
- Data should directly reflect the candidate's demonstrated performance for the "${topic}" position
- Technical roles: Focus on coding, algorithms, system design, technical knowledge
- Managerial roles: Focus on leadership, communication, strategy, team management
- Creative roles: Focus on design thinking, innovation, presentation skills
- CRITICAL: Only score what was actually demonstrated in the conversation
- If no technical discussion occurred, technical scores should be 0%
- If only basic greetings/responses given, communication might get 5% but everything else 0%
- For "hi" responses: 100% communication in pie chart, 0% everywhere else, tiny scores overall

EXTRA STRICT RULES FOR MINIMAL CONVERSATIONS:
- "hi" or single greeting: Communication=5%, Technical=0%, Problem Solving=0%, Attitude=0%
- Pie chart for "hi": Communication=100%, all others=0%
- Never inflate scores for minimal responses - be brutally honest
- If no skills were demonstrated, give them 0% for those skills
- For single word responses, only communication gets a tiny score, everything else is 0

Interview Context - Topic: ${topic}
Conversation Details:
${conversationText}`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt }
      ],
      max_tokens: 800,
      temperature: 0.2, // Low temperature for consistent data generation
    })

    const aiResponse = completion.choices[0]?.message?.content?.trim()

    if (!aiResponse) {
      throw new Error('No response from OpenAI')
    }

    // Parse the JSON response
    let graphData: ChartData
    try {
      // Remove any markdown formatting if present
      const cleanResponse = aiResponse.replace(/```json\s*|\s*```/g, '').trim()
      graphData = JSON.parse(cleanResponse)

    } catch {
      console.error('Failed to parse AI response for graph data:', aiResponse)
      throw new Error('Invalid JSON response from AI graph data generation')
    }

    // If specific chart type requested, return only that data
    if (chartType !== 'all') {
      const specificData = {
        [chartType]: graphData[chartType as keyof ChartData]
      }
      return NextResponse.json(specificData)
    }

    return NextResponse.json(graphData)

  } catch (error) {
    console.error('Graph data API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate graph data' },
      { status: 500 }
    )
  }
}
