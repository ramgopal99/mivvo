"use server"

import { OpenAI } from "openai"

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateCompanyDescription(companyName: string, industry: string): Promise<{ success: boolean, description?: string, error?: string }> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key not configured")
    }

    const prompt = `Generate a detailed, professional description for ${companyName}, a company in the ${industry} industry.

Include the following information:
1. Company overview and what they do
2. Their market position and competitive advantages
3. Company culture and values
4. Recent achievements or notable projects
5. Industry impact or innovations

Keep the description informative, professional, and suitable for a job interview context. Aim for 150-250 words.`

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional business researcher and writer. Generate accurate, compelling company descriptions based on industry knowledge."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 400,
      temperature: 0.7,
    })

    const description = response.choices[0]?.message?.content?.trim()

    if (!description) {
      throw new Error("Failed to generate company description")
    }

    return {
      success: true,
      description
    }

  } catch (error) {
    console.error("Error generating company description:", error)

    if (error instanceof Error && error.message.includes('API key')) {
      return {
        success: false,
        error: "OpenAI service not configured. Please check your API key."
      }
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate company description"
    }
  }
}
