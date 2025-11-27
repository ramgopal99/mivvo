/**
 * PDF Layout Extractor using pdfplumber-like functionality
 * Extracts text, positions, font sizes, and layout information
 */

export interface LayoutElement {
  text: string
  x: number
  y: number
  width: number
  height: number
  fontSize?: number
  fontName?: string
  page: number
}

export interface PDFLayout {
  elements: LayoutElement[]
  pageWidth: number
  pageHeight: number
  totalPages: number
}

/**
 * Extract layout information from PDF file
 * Note: In a real implementation, this would use pdfplumber or pdfminer.six
 * For now, we'll simulate the extraction using the browser PDF.js
 */
export async function extractPDFLayout(file: File): Promise<PDFLayout> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer

        // Try PDF.js first, fallback to basic extraction if it fails
        try {
          const pdfjsLib = await import('pdfjs-dist')

          // Configure worker - try multiple sources
          if (typeof window !== 'undefined') {
            const workerSources = [
              `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`,
              `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`
            ]

            let workerConfigured = false
            for (const workerSrc of workerSources) {
              try {
                pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc
                workerConfigured = true
                break
              } catch (workerError) {
                console.warn('Worker source failed:', workerSrc, workerError)
              }
            }

            if (!workerConfigured) {
              console.warn('All worker sources failed, proceeding without worker')
            }
          }

          const pdf = await pdfjsLib.getDocument({
            data: arrayBuffer,
            verbosity: 0
          }).promise

          const elements: LayoutElement[] = []
          let maxWidth = 0
          let maxHeight = 0

          // Process each page
          for (let pageNum = 1; pageNum <= Math.min(pdf.numPages, 5); pageNum++) { // Limit to first 5 pages
            try {
              const page = await pdf.getPage(pageNum)
              const viewport = page.getViewport({ scale: 1.0 })

              maxWidth = Math.max(maxWidth, viewport.width)
              maxHeight = Math.max(maxHeight, viewport.height)

              // Get text content with positioning
              const textContent = await page.getTextContent()

              textContent.items.forEach((item: unknown) => {
                const textItem = item as {
                  str?: string
                  transform?: number[]
                  width?: number
                  height?: number
                }

                if (textItem.str && textItem.str.trim()) {
                  elements.push({
                    text: textItem.str,
                    x: textItem.transform?.[4] || 0, // x position
                    y: viewport.height - (textItem.transform?.[5] || 0), // y position (PDF coords are bottom-up)
                    width: textItem.width || textItem.str.length * 8, // approximate width
                    height: textItem.height || 12, // approximate height
                    fontSize: textItem.height || 12,
                    page: pageNum
                  })
                }
              })
            } catch (pageError) {
              console.warn(`Failed to process page ${pageNum}:`, pageError)
            }
          }

          resolve({
            elements,
            pageWidth: maxWidth || 595, // A4 width fallback
            pageHeight: maxHeight || 842, // A4 height fallback
            totalPages: pdf.numPages
          })

        } catch (pdfjsError) {
          console.warn('PDF.js failed, using basic fallback:', pdfjsError)
          // Fallback: Basic layout estimation without PDF.js
          const basicLayout: PDFLayout = {
            elements: [{
              text: 'Basic PDF detected',
              x: 50,
              y: 100,
              width: 200,
              height: 14,
              fontSize: 14,
              page: 1
            }],
            pageWidth: 595, // A4 width
            pageHeight: 842, // A4 height
            totalPages: 1
          }
          resolve(basicLayout)
        }

      } catch (error) {
        console.error('PDF layout extraction error:', error)
        reject(new Error('Failed to extract PDF layout'))
      }
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsArrayBuffer(file)
  })
}

/**
 * Analyze layout for common CV formatting issues
 */
export function analyzeLayout(layout: PDFLayout): {
  layoutErrors: string[]
  layoutScore: number
} {
  const errors: string[] = []
  const { elements, pageWidth } = layout

  if (elements.length === 0) {
    return { layoutErrors: ['No text content found in PDF'], layoutScore: 0 }
  }

  // If we only have basic layout (fallback), give a moderate score
  if (elements.length === 1 && elements[0].text === 'Basic PDF detected') {
    return {
      layoutErrors: ['Detailed layout analysis unavailable - using basic detection'],
      layoutScore: 60 // Moderate score for basic detection
    }
  }

  // Find header elements (top 30% of page)
  const headerElements = elements.filter(el => el.y > layout.pageHeight * 0.7)

  // Check for name (usually centered or prominent in header)
  const nameCandidates = headerElements.filter(el =>
    el.text.length > 3 && // Reasonable name length
    el.text.split(' ').length <= 4 && // Not too many words
    el.fontSize && el.fontSize > 12 // Reasonable font size
  )

  if (nameCandidates.length === 0) {
    errors.push('Name not prominently displayed in header')
  } else {
    // Check if name is reasonably centered
    const nameElement = nameCandidates[0]
    const centerX = pageWidth / 2
    const tolerance = pageWidth * 0.3 // 30% tolerance for more flexibility

    if (Math.abs(nameElement.x - centerX) > tolerance) {
      errors.push('Name may not be properly centered in the header')
    }
  }

  // Check for contact information placement (be more flexible)
  const contactElements = elements.filter(el =>
    /\b(email|phone|mobile|contact|tel)\b/i.test(el.text) ||
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(el.text) ||
    /(\+?\d{1,3}[-.\s]?)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})/.test(el.text)
  )

  if (contactElements.length === 0) {
    errors.push('Contact information not clearly identified in layout')
  } else {
    // Check if contact info is reasonably positioned (not too far left)
    const avgContactX = contactElements.reduce((sum, el) => sum + el.x, 0) / contactElements.length
    if (avgContactX < pageWidth * 0.3) {
      errors.push('Contact information may be too far to the left')
    }
  }

  // Check for reasonable text distribution
  const leftHalf = elements.filter(el => el.x < pageWidth * 0.5).length
  const rightHalf = elements.filter(el => el.x >= pageWidth * 0.5).length

  if (Math.abs(leftHalf - rightHalf) > elements.length * 0.7) {
    errors.push('Text distribution seems unbalanced')
  }

  // Calculate layout score (0-100) - more lenient
  const baseScore = 100
  const penaltyPerError = 12 // Reduced penalty
  const layoutScore = Math.max(0, baseScore - (errors.length * penaltyPerError))

  return { layoutErrors: errors, layoutScore }
}

/**
 * Get CV template structure for comparison
 */
export const CV_TEMPLATE = {
  sections: [
    'contact',
    'summary',
    'experience',
    'education',
    'skills',
    'certifications',
    'projects',
    'languages'
  ],
  requiredSections: ['contact', 'experience', 'education', 'skills']
}
