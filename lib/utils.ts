import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import OpenAI from 'openai'

let openai: OpenAI | null = null

// Lazy initialization of OpenAI client
function getOpenAIClient(): OpenAI {
  if (!openai) {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is not set')
    }
    openai = new OpenAI({
      apiKey,
    })
  }
  return openai
}

// Check if OpenAI is available (API key is set)
export function isOpenAIAvailable(): boolean {
  return !!process.env.OPENAI_API_KEY
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Extract role and company from job description using OpenAI
 * @param jd - Job description text
 * @returns Object with extracted role and company, or null if extraction fails
 */
export async function extractRoleAndCompanyFromJDWithAI(jd: string): Promise<{ role: string | null; company: string | null } | null> {
  if (!jd || jd.trim().length === 0) return null

  try {
    const client = getOpenAIClient()
    const prompt = `Extract the main job role/position and company name from this job description. Return ONLY a JSON object with exactly two fields:
- "role": the main job role/position (e.g., "Frontend Developer", "Data Scientist", "Product Manager")
- "company": the company name (e.g., "Google", "Microsoft", "Amazon")

Rules:
- If no clear role is found, set role to null
- If no company is mentioned, set company to null
- Return ONLY the JSON object, no markdown formatting, no code blocks, no explanations

Job Description:
${jd}

JSON:`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,
      temperature: 0.1, // Low temperature for consistent extraction
    });

    const response = completion.choices[0]?.message?.content?.trim();

    if (!response) {
      return null;
    }

    let cleanedResponse = response;

    try {
      // Clean the response by removing markdown code blocks if present
      // Remove markdown code block syntax (```json ... ```)
      if (cleanedResponse.startsWith('```')) {
        // Find the first line break after ```
        const firstLineBreak = cleanedResponse.indexOf('\n');
        if (firstLineBreak !== -1) {
          cleanedResponse = cleanedResponse.substring(firstLineBreak + 1);
        }

        // Remove the closing ```
        const lastBackticks = cleanedResponse.lastIndexOf('```');
        if (lastBackticks !== -1) {
          cleanedResponse = cleanedResponse.substring(0, lastBackticks);
        }
      }

      // Remove any remaining backticks and clean up
      cleanedResponse = cleanedResponse.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '').trim();

      const parsed = JSON.parse(cleanedResponse);

      return {
        role: parsed.role ? parsed.role.replace(/["']/g, '').trim() : null,
        company: parsed.company ? parsed.company.replace(/["']/g, '').trim() : null
      };
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      console.error('Raw response:', response);
      console.error('Cleaned response:', cleanedResponse);
      return null;
    }
  } catch (error) {
    console.error('Error extracting role and company with OpenAI:', error);
    return null;
  }
}

/**
 * Extract role from job description using OpenAI (legacy function for backward compatibility)
 * @param jd - Job description text
 * @returns Extracted role name or null if extraction fails
 */
export async function extractRoleFromJDWithAI(jd: string): Promise<string | null> {
  const result = await extractRoleAndCompanyFromJDWithAI(jd);
  return result?.role || null;
}
