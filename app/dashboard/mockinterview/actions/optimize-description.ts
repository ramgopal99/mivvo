"use server"
import {
  OptimizeDescriptionData,
  OptimizeSpecialtiesData,
  OptimizeDescriptionResponse,
  OptimizeSpecialtiesResponse
} from '../types'

export async function optimizeDescription(data: OptimizeDescriptionData): Promise<OptimizeDescriptionResponse> {
  try {
    // Validate input
    if (!data.category || !data.name) {
      return {
        success: false,
        error: 'Category and name are required'
      }
    }

    if (!data.specialties) {
      return {
        success: false,
        error: 'Specialties are required'
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

    // Create the system message based on context
    const systemMessage = `You are an expert at writing clear, professional descriptions for interview scenarios and mock interview setups.
    Your descriptions should be:
    - Concise but informative (2-3 sentences)
    - Professional and engaging
    - Tailored to the interview context
    - Highlight the key aspects of the position and company
    - Include relevant industry context when appropriate

    Focus on creating descriptions that would be suitable for:
    - Company profiles in interview preparation
    - Job description summaries
    - Interview scenario setups

    Keep the tone professional but approachable, and ensure the description gives candidates a clear understanding of what to expect.`

    // Create the user message
    const userMessage = `Please optimize this description for a ${data.category} interview scenario:

Name: ${data.name}
Specialties: ${data.specialties}
Personality: ${data.personality || 'Professional'}

${data.existingText ? `Existing description: ${data.existingText}` : 'Please create a new description from scratch.'}

Create a compelling, professional description that would help candidates prepare for this type of interview.`

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
        max_tokens: 300,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error('Failed to call OpenAI API')
    }

    const result = await response.json()
    const optimizedText = result.choices[0]?.message?.content?.trim()

    if (!optimizedText) {
      throw new Error('No response from OpenAI')
    }

    return {
      success: true,
      optimizedText,
      usage: result.usage
    }

  } catch (error) {
    console.error('Error optimizing description:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to optimize description'
    }
  }
}

export async function optimizeSpecialties(data: OptimizeSpecialtiesData): Promise<OptimizeSpecialtiesResponse> {
  try {
    // Validate input
    if (!data.category) {
      return {
        success: false,
        error: 'Category is required'
      }
    }

    if (!data.existingText) {
      return {
        success: false,
        error: 'Existing text is required'
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

    // Create the system message
    const systemMessage = `You are an expert at creating clear, professional specialty lists for interview scenarios.
    Your specialties should be:
    - Concise and specific
    - Professional and relevant
    - Focused on key skills and areas of expertise
    - Tailored to the interview category
    - Comma-separated format
    - 3-8 key specialties

    Focus on creating specialty lists that would help candidates understand:
    - What technical skills will be tested
    - What experience areas are important
    - What competencies the interviewer will assess

    Keep the list focused and actionable.`

    // Create the user message
    const userMessage = `Please optimize this specialty list for a ${data.category} interview:

Existing specialties: ${data.existingText}

Create a refined list of 3-8 key specialties that would be most relevant for this type of interview. Format as a comma-separated list.`

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
        max_tokens: 150,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error('Failed to call OpenAI API')
    }

    const result = await response.json()
    const specialties = result.choices[0]?.message?.content?.trim()

    if (!specialties) {
      throw new Error('No response from OpenAI')
    }

    return {
      success: true,
      specialties,
      usage: result.usage
    }

  } catch (error) {
    console.error('Error optimizing specialties:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to optimize specialties'
    }
  }
}
