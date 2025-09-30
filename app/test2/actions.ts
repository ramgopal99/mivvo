'use server'

import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface CodeAnalysis {
  errors: Array<{
    line: number
    column: number
    message: string
    severity: 'error' | 'warning' | 'info'
  }>
  suggestions: string[]
  overall_feedback: string
  language: string
}

export async function analyzeCode(
  code: string,
  language: string,
  currentQuestion?: { title: string; description: string; starterCode: string } | null
): Promise<CodeAnalysis> {
  if (!code || !language) {
    throw new Error('Code and language are required')
  }

  // Create a prompt for code analysis
  let prompt = `Analyze the following ${language} code and provide concise, comprehensive feedback:

Code:
${code}

Please provide analysis in the following JSON format:
{
  "errors": [
    {
      "line": number,
      "column": number,
      "message": "brief issue description",
      "severity": "error|warning|info"
    }
  ],
  "suggestions": [
    "short improvement suggestions"
  ],
  "overall_feedback": "concise summary: code quality, main issues, and key improvements needed"
}`

  // If there's a current question, add context about what the code should accomplish
  if (currentQuestion) {
    prompt = `Analyze the following ${language} code for this specific question:

Question: ${currentQuestion.title}
Description: ${currentQuestion.description}

Starter code:
${currentQuestion.starterCode}

Current code:
${code}

Evaluate if this solves the question correctly. Provide concise analysis in JSON format:
{
  "errors": [
    {
      "line": number,
      "column": number,
      "message": "brief issue description",
      "severity": "error|warning|info"
    }
  ],
  "suggestions": [
    "short improvement suggestions"
  ],
  "overall_feedback": "concise summary: does it solve the question? Main issues and key fixes needed."
}`

    // Add brief evaluation criteria for the question
    if (currentQuestion.title.toLowerCase().includes('add') || currentQuestion.title.toLowerCase().includes('calculator')) {
      prompt += `

Key checks: Correct addition logic? Handles edge cases? Proper structure? Expected output?`
    } else if (currentQuestion.title.toLowerCase().includes('filter') || currentQuestion.title.toLowerCase().includes('array')) {
      prompt += `

Key checks: Correct even number filtering? Handles empty arrays? Returns new array? Right logic?`
    } else if (currentQuestion.title.toLowerCase().includes('list comprehension') || currentQuestion.title.toLowerCase().includes('squares')) {
      prompt += `

Key checks: Uses list comprehension? Squares all numbers? Correct syntax? Expected output?`
    }
  }

  // Add concise guidelines for all analyses
  prompt += `

Guidelines: Be brief but comprehensive. Focus on:
- Critical errors first (syntax, logic)
- Code quality (readability, structure)
- Key improvements (${language} best practices)
- Be specific with line numbers
- Acknowledge good solutions positively`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert code reviewer. Provide concise, comprehensive feedback. Be brief but thorough. Focus on key issues and clear solutions.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 800,
    })

    const response = completion.choices[0].message.content

    if (!response) {
      throw new Error('No response from OpenAI')
    }

    try {
      // Parse the JSON response from OpenAI
      const analysis = JSON.parse(response)

      // Validate the response structure
      if (!analysis.errors || !Array.isArray(analysis.errors)) {
        analysis.errors = []
      }
      if (!analysis.suggestions || !Array.isArray(analysis.suggestions)) {
        analysis.suggestions = []
      }
      if (!analysis.overall_feedback) {
        analysis.overall_feedback = 'Code analysis completed successfully.'
      }
      if (!analysis.language) {
        analysis.language = language
      }

      return analysis as CodeAnalysis
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError)
      console.error('Raw response:', response)

      // Return a fallback response if JSON parsing fails
      return {
        errors: [],
        suggestions: [
          'Unable to parse detailed analysis response. Please ensure your code is syntactically correct.',
          'Consider using a code linter for additional feedback.'
        ],
        overall_feedback: 'Code analysis completed with some technical difficulties. Please verify your code manually.',
        language: language
      }
    }
  } catch (error) {
    console.error('Error analyzing code:', error)
    throw new Error(`Failed to analyze code: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

