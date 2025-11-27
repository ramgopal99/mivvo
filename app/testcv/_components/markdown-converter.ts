/**
 * Markdown Converter using GPT-4o-mini
 * Converts plain CV text to structured Markdown format
 */

export interface MarkdownConversionResult {
  markdown: string
  sections: string[]
  confidence: number
  tokensUsed: number
}

/**
 * Convert CV text to Markdown using GPT-4o-mini
 */
export async function convertToMarkdown(cvText: string): Promise<MarkdownConversionResult> {
  const prompt = `
Convert this CV/resume text into clean, well-structured Markdown format.

IMPORTANT RULES:
1. Keep the exact content - do not add, remove, or modify any information
2. Use proper Markdown headings (# ## ###) for sections
3. Use bullet points (-) for lists
4. Preserve dates, company names, and all details exactly as written
5. Do not invent missing details or sections
6. Structure should follow standard CV format

Expected structure (use these heading levels):
# [Full Name]

## Contact
- Email: [email]
- Phone: [phone]
- Location: [location]

## Summary
[Summary text]

## Experience
### [Job Title], [Company], [Dates]
- [Responsibility 1]
- [Responsibility 2]

## Education
### [Degree], [University], [Year]
- [Details]

## Skills
- [Skill 1]
- [Skill 2]

## [Other Sections as Found]

CV TEXT:
${cvText}

Output ONLY the Markdown, no explanations:
`

  try {
    const response = await fetch('/api/cv-validation/convert-markdown', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        cvText
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to convert to markdown')
    }

    const result = await response.json()

    // Extract sections from markdown
    const sections = extractSectionsFromMarkdown(result.markdown)

    return {
      markdown: result.markdown,
      sections,
      confidence: result.confidence || 0.9,
      tokensUsed: result.tokensUsed || 0
    }

  } catch (error) {
    console.error('Markdown conversion error:', error)

    // Fallback: basic markdown conversion without AI
    const fallbackMarkdown = createBasicMarkdown(cvText)
    const sections = extractSectionsFromMarkdown(fallbackMarkdown)

    return {
      markdown: fallbackMarkdown,
      sections,
      confidence: 0.5,
      tokensUsed: 0
    }
  }
}

/**
 * Extract section names from markdown content
 */
function extractSectionsFromMarkdown(markdown: string): string[] {
  const sectionRegex = /^#{1,3}\s+(.+)$/gm
  const sections: string[] = []
  let match

  while ((match = sectionRegex.exec(markdown)) !== null) {
    const sectionName = match[1].toLowerCase().trim()
    sections.push(sectionName)
  }

  return [...new Set(sections)] // Remove duplicates
}

/**
 * Basic fallback markdown conversion without AI
 */
function createBasicMarkdown(text: string): string {
  let markdown = text

  // Basic formatting improvements
  markdown = markdown.replace(/^([A-Z][^.!?]*)$/gm, '## $1') // Section headers
  markdown = markdown.replace(/^(\d+\.|\•|-|\*)\s*/gm, '- ') // Bullet points
  markdown = markdown.replace(/\n{3,}/g, '\n\n') // Reduce excessive line breaks

  return markdown
}

/**
 * Standard CV template in Markdown format for comparison
 */
export const STANDARD_CV_TEMPLATE = `# [Full Name]

## Contact
- Email: [email]
- Phone: [phone]
- Location: [location]
- LinkedIn: [linkedin]

## Summary
[Professional summary highlighting key skills and experience]

## Experience
### [Job Title], [Company Name], [Location]
[Start Date] - [End Date]

- [Key responsibility or achievement 1]
- [Key responsibility or achievement 2]
- [Key responsibility or achievement 3]

### [Previous Job Title], [Previous Company], [Location]
[Start Date] - [End Date]

- [Key responsibility or achievement 1]
- [Key responsibility or achievement 2]

## Education
### [Degree/Certification], [University/Institution], [Location]
[Graduation Year]

- [Relevant coursework, honors, or achievements]
- GPA: [if applicable]

## Skills
### Technical Skills
- [Skill 1]
- [Skill 2]
- [Skill 3]

### Soft Skills
- [Skill 1]
- [Skill 2]
- [Skill 3]

## Certifications
- [Certification Name], [Issuing Organization], [Date Earned]

## Projects
### [Project Name]
[Brief description of the project]

- [Key feature or technology 1]
- [Key feature or technology 2]

## Languages
- [Language 1]: [Proficiency Level]
- [Language 2]: [Proficiency Level]
`

