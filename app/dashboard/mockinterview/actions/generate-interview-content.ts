"use server"

import { OpenAI } from "openai"
import { GenerateInterviewContentData, GenerateInterviewContentResponse } from "../types"

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateInterviewContent(data: GenerateInterviewContentData): Promise<GenerateInterviewContentResponse> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key not configured")
    }

    const {
      companyName,
      position,
      companyDescription,
      jobDescription,
      interviewType,
      experienceLevel,
      industry,
      difficulty
    } = data

    // Generate company description if not provided
    let finalCompanyDescription = companyDescription
    if (!companyDescription || companyDescription.trim().length === 0) {
      const companyPrompt = `Generate a detailed description for ${companyName}, a company in the ${industry} industry. Include information about their business, culture, values, and market position. Keep it professional and informative.`

      const companyResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a professional business researcher. Generate accurate, detailed company descriptions based on the provided information."
          },
          {
            role: "user",
            content: companyPrompt
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      })

      finalCompanyDescription = companyResponse.choices[0]?.message?.content?.trim() || ""
    }

    // Generate job description if not provided
    let finalJobDescription = jobDescription
    if (!jobDescription || jobDescription.trim().length === 0) {
      const jobPrompt = `Generate a detailed job description for the position of ${position} at ${companyName} in the ${industry} industry.

Requirements:
- Interview type: ${interviewType}
- Experience level: ${experienceLevel}
- Difficulty: ${difficulty}

Include:
1. Job summary
2. Key responsibilities
3. Required skills and qualifications
4. Preferred experience
5. What success looks like in this role

Make it comprehensive and realistic for a ${experienceLevel} level position.`

      const jobResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an experienced HR professional and technical recruiter. Generate realistic, detailed job descriptions."
          },
          {
            role: "user",
            content: jobPrompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      })

      finalJobDescription = jobResponse.choices[0]?.message?.content?.trim() || ""
    }

    // Generate interview questions based on the position and details
    const questionsPrompt = `Generate 10-15 relevant interview questions for a ${interviewType} interview for the position of ${position} at ${companyName}.

Context:
- Industry: ${industry}
- Experience Level: ${experienceLevel}
- Difficulty: ${difficulty}
- Company: ${companyName}
- Job Description: ${finalJobDescription}

Questions should be appropriate for a ${experienceLevel} candidate and cover:
1. Technical skills relevant to the position
2. Behavioral questions
3. Company-specific questions
4. Problem-solving scenarios
5. Leadership and team collaboration (if applicable)

Format each question on a new line, numbered 1-15. Make questions challenging but fair for the experience level.`

    const questionsResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an experienced interviewer. Generate relevant, insightful interview questions that assess candidates appropriately for their role and experience level."
        },
        {
          role: "user",
          content: questionsPrompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.8,
    })

    const questionsText = questionsResponse.choices[0]?.message?.content?.trim() || ""
    const questions = questionsText
      .split('\n')
      .filter(line => line.trim() && /^\d+\./.test(line.trim()))
      .map(line => line.replace(/^\d+\.\s*/, '').trim())

    return {
      success: true,
      companyDescription: finalCompanyDescription || undefined,
      jobDescription: finalJobDescription || undefined,
      questions: questions,
      usage: {
        companyTokens: companyDescription ? 0 : 300,
        jobTokens: jobDescription ? 0 : 500,
        questionsTokens: 1000
      }
    }

  } catch (error) {
    console.error("Error generating interview content:", error)

    if (error instanceof Error && error.message.includes('API key')) {
      return {
        success: false,
        error: "OpenAI service not configured. Please check your API key."
      }
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate interview content"
    }
  }
}
