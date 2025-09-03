"use server"

export interface GenerateNameData {
  companyName: string
  position: string
  interviewType: string
  industry: string
}

export interface OpenAIUsage {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

export interface GenerateNameResponse {
  success: boolean
  name?: string
  error?: string
  usage?: OpenAIUsage
}

export async function generateName(data: GenerateNameData): Promise<GenerateNameResponse> {
  try {
    // Validate input
    if (!data.companyName || !data.position) {
      return {
        success: false,
        error: 'Company name and position are required'
      }
    }

    // Get OpenAI API key from environment
    const openaiApiKey = process.env.OPENAI_API_KEY
    if (!openaiApiKey) {
      return {
        success: false,
        error: 'OpenAI API key not configured'
      }
    }

    // Create the system message for name generation
    const systemMessage = `You are an expert at generating creative and professional names for mock interview scenarios.
    Generate names that are:
    - Professional and memorable
    - Relevant to the company and position
    - Concise (2-4 words maximum)
    - Include the position or role type
    - Sometimes incorporate the company name or industry

    Examples of good names:
    - "Google Frontend Interview"
    - "Senior React Developer Mock"
    - "Amazon System Design Prep"
    - "Junior DevOps Assessment"
    - "Netflix Product Manager Interview"

    Keep names focused on the interview context and helpful for organization.`

    // Create the user message
    const userMessage = `Please generate a professional name for a mock interview:

Company: ${data.companyName}
Position: ${data.position}
Interview Type: ${data.interviewType || 'General Technical'}
Industry: ${data.industry || 'Technology'}

Create a concise, professional name that would clearly identify this mock interview scenario.`

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userMessage }
        ],
        max_tokens: 50,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error('Failed to call OpenAI API')
    }

    const result = await response.json()
    const name = result.choices[0]?.message?.content?.trim()

    if (!name) {
      throw new Error('No response from OpenAI')
    }

    return {
      success: true,
      name,
      usage: result.usage
    }

  } catch (error) {
    console.error('Error generating name:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate name'
    }
  }
}
