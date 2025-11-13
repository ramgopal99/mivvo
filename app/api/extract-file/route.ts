import { NextRequest, NextResponse } from 'next/server'
import mammoth from 'mammoth'
import PDFParser from 'pdf2json'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: 'Invalid file type. Only PDF and DOCX files are supported.' },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: 'File size exceeds 10MB limit.' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    let extractedText = ''
    let fileType = ''

    // Extract text based on file type
    if (file.type === 'application/pdf') {
      fileType = 'PDF'
      // Use pdf2json for PDF parsing
      const pdfParser = new PDFParser()
      extractedText = await new Promise<string>((resolve, reject) => {
        let text = ''
        
        pdfParser.on('pdfParser_dataError', (errData: Error | { parserError: Error }) => {
          const error = errData instanceof Error ? errData : errData.parserError
          reject(new Error(`PDF parsing error: ${error.message}`))
        })
        
        pdfParser.on('pdfParser_dataReady', (pdfData: {
          Pages?: Array<{
            Texts?: Array<{
              R?: Array<{
                T?: string
              }>
            }>
          }>
        }) => {
          try {
            // Extract text from all pages
            if (pdfData && pdfData.Pages) {
              pdfData.Pages.forEach((page) => {
                if (page.Texts) {
                  page.Texts.forEach((textItem) => {
                    if (textItem.R && textItem.R.length > 0) {
                      textItem.R.forEach((run) => {
                        if (run.T) {
                          // Decode URI component if needed
                          try {
                            text += decodeURIComponent(run.T) + ' '
                          } catch {
                            text += run.T + ' '
                          }
                        }
                      })
                    }
                  })
                  text += '\n'
                }
              })
            }
            resolve(text.trim())
          } catch (error) {
            reject(error)
          }
        })
        
        // Load the PDF buffer
        pdfParser.parseBuffer(buffer)
      })
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      fileType = 'DOCX'
      const result = await mammoth.extractRawText({ buffer })
      extractedText = result.value
      
      // Handle warnings if any
      if (result.messages.length > 0) {
        console.warn('Mammoth extraction warnings:', result.messages)
      }
    }

    // Calculate statistics
    const textLength = extractedText.length
    const wordCount = extractedText.trim() === '' ? 0 : extractedText.trim().split(/\s+/).length
    const lineCount = extractedText === '' ? 0 : extractedText.split('\n').length

    // Prepare response data
    const extractedData = {
      fileName: file.name,
      fileType: fileType,
      fileSize: file.size,
      extractedText: extractedText,
      textLength: textLength,
      wordCount: wordCount,
      lineCount: lineCount
    }

    return NextResponse.json({
      success: true,
      data: extractedData
    })

  } catch (error) {
    console.error('File extraction error:', error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to extract text from file'
      },
      { status: 500 }
    )
  }
}
