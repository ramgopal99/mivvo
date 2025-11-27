/**
 * Structure Validator
 * Compares CV markdown with standard template and validates structure
 */

export interface ValidationIssue {
  type: 'error' | 'warning' | 'info'
  category: 'structure' | 'content' | 'formatting' | 'order'
  message: string
  section?: string
  suggestion?: string
}

export interface StructureValidationResult {
  score: number
  issues: ValidationIssue[]
  sectionsFound: string[]
  sectionsMissing: string[]
  sectionsOrder: string[]
  isValidStructure: boolean
}

/**
 * Standard CV section order and requirements
 */
export const CV_STRUCTURE_TEMPLATE = {
  // Required sections (must be present)
  required: ['contact', 'experience', 'education', 'skills'],

  // Recommended sections (should be present)
  recommended: ['summary', 'certifications', 'projects', 'languages'],

  // Standard section order (ideal sequence)
  order: [
    'contact',
    'summary',
    'experience',
    'education',
    'skills',
    'certifications',
    'projects',
    'languages',
    'references'
  ],

  // Section aliases (different ways sections might be named)
  aliases: {
    contact: ['contact', 'contact information', 'personal details'],
    summary: ['summary', 'professional summary', 'objective', 'profile'],
    experience: ['experience', 'work experience', 'employment', 'career'],
    education: ['education', 'academic background', 'qualifications'],
    skills: ['skills', 'technical skills', 'competencies', 'expertise'],
    certifications: ['certifications', 'certificates', 'credentials'],
    projects: ['projects', 'project experience', 'portfolio'],
    languages: ['languages', 'language skills']
  }
}

/**
 * Validate CV structure against template
 */
export function validateStructure(markdown: string, sections: string[]): StructureValidationResult {
  const issues: ValidationIssue[] = []
  const sectionsFound = sections.map(s => s.toLowerCase())

  // Check for required sections
  const missingRequired = CV_STRUCTURE_TEMPLATE.required.filter(required =>
    !sectionsFound.some(found =>
      CV_STRUCTURE_TEMPLATE.aliases[required as keyof typeof CV_STRUCTURE_TEMPLATE.aliases]?.includes(found) ||
      found.includes(required) ||
      required.includes(found)
    )
  )

  missingRequired.forEach(section => {
    issues.push({
      type: 'error',
      category: 'structure',
      message: `Required section "${section}" is missing`,
      section,
      suggestion: `Add a "${section}" section to your CV`
    })
  })

  // Check for recommended sections
  const missingRecommended = CV_STRUCTURE_TEMPLATE.recommended.filter(recommended =>
    !sectionsFound.some(found =>
      CV_STRUCTURE_TEMPLATE.aliases[recommended as keyof typeof CV_STRUCTURE_TEMPLATE.aliases]?.includes(found) ||
      found.includes(recommended) ||
      recommended.includes(found)
    )
  )

  missingRecommended.forEach(section => {
    issues.push({
      type: 'warning',
      category: 'structure',
      message: `Recommended section "${section}" is missing`,
      section,
      suggestion: `Consider adding a "${section}" section to strengthen your CV`
    })
  })

  // Check section order
  const currentOrder = getSectionOrder(markdown)
  const idealOrder = CV_STRUCTURE_TEMPLATE.order

  let orderIssues = 0
  for (let i = 0; i < currentOrder.length - 1; i++) {
    const currentSection = currentOrder[i]
    const nextSection = currentOrder[i + 1]

    const currentIndex = idealOrder.findIndex(ideal =>
      CV_STRUCTURE_TEMPLATE.aliases[ideal as keyof typeof CV_STRUCTURE_TEMPLATE.aliases]?.includes(currentSection) ||
      currentSection.includes(ideal) ||
      ideal.includes(currentSection)
    )

    const nextIndex = idealOrder.findIndex(ideal =>
      CV_STRUCTURE_TEMPLATE.aliases[ideal as keyof typeof CV_STRUCTURE_TEMPLATE.aliases]?.includes(nextSection) ||
      nextSection.includes(ideal) ||
      ideal.includes(nextSection)
    )

    if (currentIndex !== -1 && nextIndex !== -1 && currentIndex > nextIndex) {
      orderIssues++
      issues.push({
        type: 'warning',
        category: 'order',
        message: `Section "${nextSection}" appears before "${currentSection}" in non-standard order`,
        suggestion: `Consider reordering: ${currentSection} → ${nextSection}`
      })
    }
  }

  // Check for formatting issues
  const formattingIssues = checkFormatting(markdown)
  issues.push(...formattingIssues)

  // Calculate overall score
  const baseScore = 100
  const errorPenalty = 15
  const warningPenalty = 5
  const orderPenalty = 3

  const errors = issues.filter(i => i.type === 'error').length
  const warnings = issues.filter(i => i.type === 'warning').length

  const score = Math.max(0, baseScore -
    (errors * errorPenalty) -
    (warnings * warningPenalty) -
    (orderIssues * orderPenalty)
  )

  const isValidStructure = missingRequired.length === 0 && errors === 0

  return {
    score,
    issues,
    sectionsFound,
    sectionsMissing: [...missingRequired, ...missingRecommended],
    sectionsOrder: currentOrder,
    isValidStructure
  }
}

/**
 * Extract section order from markdown
 */
function getSectionOrder(markdown: string): string[] {
  const lines = markdown.split('\n')
  const order: string[] = []

  lines.forEach(line => {
    const match = line.match(/^#{1,3}\s+(.+)$/)
    if (match) {
      order.push(match[1].toLowerCase().trim())
    }
  })

  return order
}

/**
 * Check for common formatting issues
 */
function checkFormatting(markdown: string): ValidationIssue[] {
  const issues: ValidationIssue[] = []

  // Check for inconsistent bullet points
  const lines = markdown.split('\n')
  let bulletCount = 0
  let dashCount = 0
  let asteriskCount = 0

  lines.forEach(line => {
    if (line.trim().startsWith('- ')) dashCount++
    if (line.trim().startsWith('* ')) asteriskCount++
    if (line.trim().startsWith('• ')) bulletCount++
  })

  const totalBullets = bulletCount + dashCount + asteriskCount
  if (totalBullets > 5) { // Only check if there are multiple bullets
    const maxBulletType = Math.max(bulletCount, dashCount, asteriskCount)
    if (maxBulletType < totalBullets * 0.7) { // Less than 70% consistency
      issues.push({
        type: 'warning',
        category: 'formatting',
        message: 'Inconsistent bullet point usage (mixing -, *, •)',
        suggestion: 'Use consistent bullet points throughout (recommend -)'
      })
    }
  }

  // Check for missing contact information
  const hasEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/i.test(markdown)
  const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})/.test(markdown)

  if (!hasEmail) {
    issues.push({
      type: 'error',
      category: 'content',
      message: 'Email address not found in contact section',
      section: 'contact',
      suggestion: 'Add your email address to the contact section'
    })
  }

  if (!hasPhone) {
    issues.push({
      type: 'warning',
      category: 'content',
      message: 'Phone number not found in contact section',
      section: 'contact',
      suggestion: 'Consider adding a phone number to the contact section'
    })
  }

  // Check for reasonable content length
  const wordCount = markdown.split(/\s+/).length
  if (wordCount < 200) {
    issues.push({
      type: 'warning',
      category: 'content',
      message: `CV content seems short (${wordCount} words)`,
      suggestion: 'Aim for 300-600 words for a comprehensive CV'
    })
  }

  return issues
}

/**
 * Generate improvement suggestions based on validation results
 */
export function generateImprovementSuggestions(result: StructureValidationResult): string[] {
  const suggestions: string[] = []

  if (result.sectionsMissing.length > 0) {
    suggestions.push(`Add missing sections: ${result.sectionsMissing.join(', ')}`)
  }

  if (result.issues.filter(i => i.type === 'error').length > 0) {
    suggestions.push('Fix critical errors before proceeding')
  }

  const orderIssues = result.issues.filter(i => i.category === 'order')
  if (orderIssues.length > 0) {
    suggestions.push('Review section order - follow standard CV structure')
  }

  const formattingIssues = result.issues.filter(i => i.category === 'formatting')
  if (formattingIssues.length > 0) {
    suggestions.push('Standardize formatting (bullet points, spacing, etc.)')
  }

  return suggestions
}
