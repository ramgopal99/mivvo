"use client"

import { Button } from "@/components/ui/button"
import { Receipt } from "lucide-react"
import { siteConfig } from "@/config/site"
import jsPDF from 'jspdf'

interface Payment {
  id: string
  amount: number
  currency: string
  paymentCategory: string
  status: string
  paymentDate: string
  description?: string
  value?: number
  transactionId?: string
  createdAt: string
}

interface DownloadReceiptButtonProps {
  userName?: string
  userEmail?: string
  payment: Payment // Individual payment receipt only
}

export function DownloadReceiptButton({
  userName,
  userEmail,
  payment
}: DownloadReceiptButtonProps) {
  const downloadReceipt = async () => {
    const doc = new jsPDF()

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 20
    let yPosition = margin

    // Helper function to add text with proper font settings
    const addText = (text: string, x: number, y: number, fontSize = 10, fontWeight: 'normal' | 'bold' = 'normal') => {
      doc.setFontSize(fontSize)
      doc.setFont('helvetica', fontWeight)
      doc.text(text, x, y)
    }

    // Helper function to get text width
    const getTextWidth = (text: string, fontSize = 10, fontWeight: 'normal' | 'bold' = 'normal') => {
      doc.setFontSize(fontSize)
      doc.setFont('helvetica', fontWeight)
      return doc.getTextWidth(text)
    }

    const addLine = (y: number, lineWidth = 0.5) => {
      doc.setLineWidth(lineWidth)
      doc.setDrawColor(200, 200, 200)
      doc.line(margin, y, pageWidth - margin, y)
    }

    // Format currency - use INR instead of ₹ symbol to avoid rendering issues
    const formatCurrency = (amount: number) => {
      return `INR ${amount.toFixed(2)}`
    }

    // Load and add logo in top right
    try {
      const logoPath = siteConfig.logo || '/mivvo.svg'
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      const logoData = await new Promise<string>((resolve) => {
        const timeout = setTimeout(() => {
          resolve('') // Timeout after 2 seconds
        }, 2000)
        
        img.onload = () => {
          clearTimeout(timeout)
          try {
            const canvas = document.createElement('canvas')
            canvas.width = img.naturalWidth || img.width || 100
            canvas.height = img.naturalHeight || img.height || 100
            const ctx = canvas.getContext('2d')
            if (ctx) {
              ctx.drawImage(img, 0, 0)
              resolve(canvas.toDataURL('image/png'))
            } else {
              resolve('')
            }
          } catch {
            resolve('')
          }
        }
        img.onerror = () => {
          clearTimeout(timeout)
          resolve('')
        }
        img.src = logoPath
      })

      if (logoData && logoData.length > 0) {
        // Add logo in top right corner (smaller size)
        const logoSize = 20
        const logoX = pageWidth - margin - logoSize
        const logoY = margin
        doc.addImage(logoData, 'PNG', logoX, logoY, logoSize, logoSize)
      }
    } catch {
      // Logo failed to load, continue without it
    }

    // Header - Receipt title and info
    addText('Receipt', margin, yPosition, 20, 'bold')
    
    // Receipt number and date on the left (below "Receipt" title)
    // Use transactionId if available, otherwise use payment ID formatted
    const receiptNumber = payment.transactionId 
      ? payment.transactionId.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 12)
      : `MIVVO-${payment.id.toUpperCase().slice(0, 8)}`
    
    const datePaid = new Date(payment.paymentDate).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
    
    // Receipt number appears below "Receipt" title on the left
    yPosition += 10
    addText(receiptNumber, margin, yPosition, 10, 'normal')
    
    // "Date paid" appears below receipt number on the left (closer spacing)
    yPosition += 5
    const datePaidText = `Date paid: ${datePaid}`
    addText(datePaidText, margin, yPosition, 9, 'normal')
    
    // Set yPosition for next section (after header)
    yPosition += 20

    // Sender information (Mivvo)
    addText('Mivvo', margin, yPosition, 11, 'bold')
    yPosition += 7
    addText(siteConfig.url.replace('https://', ''), margin, yPosition, 9, 'normal')
    yPosition += 6
    addText(siteConfig.email, margin, yPosition, 9, 'normal')
    yPosition += 15

    // Recipient information (Bill to)
    addText('Bill to', margin, yPosition, 11, 'bold')
    yPosition += 7
    addText(userName || 'Customer', margin, yPosition, 9, 'normal')
    yPosition += 6
    if (userEmail) {
      addText(userEmail, margin, yPosition, 9, 'normal')
      yPosition += 6
    }
    yPosition += 10

    // Payment confirmation
    const amountPaid = `${formatCurrency(payment.amount)} paid on ${datePaid}`
    addText(amountPaid, margin, yPosition, 11, 'bold')
    yPosition += 15

    // Itemized list table
    addLine(yPosition)
    yPosition += 8

    // Table headers - properly aligned
    addText('Description', margin, yPosition, 9, 'bold')
    addText('Qty', margin + 100, yPosition, 9, 'bold')
    addText('Unit price', margin + 120, yPosition, 9, 'bold')
    const amountHeaderWidth = getTextWidth('Amount', 9, 'bold')
    addText('Amount', pageWidth - margin - amountHeaderWidth, yPosition, 9, 'bold')
    yPosition += 8
    addLine(yPosition)
    yPosition += 8

    // Item row
    const description = payment.description || `${payment.paymentCategory === 'MONTHLY' ? 'Mivvo Pro' : 'Addon Credits Purchase'}${payment.value ? ` (${payment.value} credits)` : ''}`
    const servicePeriod = payment.paymentCategory === 'MONTHLY' 
      ? (() => {
          const startDate = new Date(payment.paymentDate)
          const endDate = new Date(startDate)
          endDate.setMonth(endDate.getMonth() + 1)
          return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
        })()
      : 'One-time purchase'

    addText(description, margin, yPosition, 9, 'normal')
    addText(servicePeriod, margin, yPosition + 5, 8, 'normal')
    addText('1', margin + 100, yPosition, 9, 'normal')
    
    const unitPrice = formatCurrency(payment.amount)
    addText(unitPrice, margin + 120, yPosition, 9, 'normal')
    
    const amountText = formatCurrency(payment.amount)
    const amountWidth = getTextWidth(amountText, 9, 'normal')
    addText(amountText, pageWidth - margin - amountWidth, yPosition, 9, 'normal')
    yPosition += 15
    addLine(yPosition)
    yPosition += 10

    // Payment summary - right aligned
    const summaryStartX = pageWidth - margin - 60
    addText('Subtotal', summaryStartX, yPosition, 9, 'normal')
    const subtotalWidth = getTextWidth(amountText, 9, 'normal')
    addText(amountText, pageWidth - margin - subtotalWidth, yPosition, 9, 'normal')
    yPosition += 7
    
    addText('Total', summaryStartX, yPosition, 9, 'bold')
    const totalWidth = getTextWidth(amountText, 9, 'bold')
    addText(amountText, pageWidth - margin - totalWidth, yPosition, 9, 'bold')
    yPosition += 7
    
    addText('Amount paid', summaryStartX, yPosition, 9, 'bold')
    const paidWidth = getTextWidth(amountText, 9, 'bold')
    addText(amountText, pageWidth - margin - paidWidth, yPosition, 9, 'bold')
    yPosition += 15

    // Payment history section
    addText('Payment history', margin, yPosition, 10, 'bold')
    yPosition += 10
    addLine(yPosition)
    yPosition += 8

    // Payment history table headers
    addText('Payment method', margin, yPosition, 9, 'bold')
    addText('Date', margin + 70, yPosition, 9, 'bold')
    addText('Amount paid', margin + 120, yPosition, 9, 'bold')
    const receiptHeaderWidth = getTextWidth('Receipt number', 9, 'bold')
    addText('Receipt number', pageWidth - margin - receiptHeaderWidth, yPosition, 9, 'bold')
    yPosition += 8
    addLine(yPosition)
    yPosition += 8

    // Payment history row
    const paymentMethod = 'PhonePe'
    const paymentDate = new Date(payment.paymentDate).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
    // Use same receipt number format as header
    const receiptNumForHistory = receiptNumber.slice(-8) // Last 8 chars for history table

    addText(paymentMethod, margin, yPosition, 9, 'normal')
    addText(paymentDate, margin + 70, yPosition, 9, 'normal')
    addText(amountText, margin + 120, yPosition, 9, 'normal')
    const receiptNumWidth = getTextWidth(receiptNumForHistory, 9, 'normal')
    addText(receiptNumForHistory, pageWidth - margin - receiptNumWidth, yPosition, 9, 'normal')
    yPosition += 15

    // Company information footer
    yPosition = pageHeight - 30
    addLine(yPosition, 0.3)
    yPosition += 8
    addText('Mivvo', margin, yPosition, 9, 'bold')
    const urlWidth = getTextWidth(siteConfig.url, 8, 'normal')
    addText(siteConfig.url, pageWidth - margin - urlWidth, yPosition, 8, 'normal')

    // Save the PDF
    const fileName = `mivvo-receipt-${payment.id}-${new Date().toISOString().split('T')[0]}.pdf`
    doc.save(fileName)
  }


  return (
    <Button
      onClick={downloadReceipt}
      variant="outline"
      size="sm"
      className="flex items-center gap-1 text-xs"
      title="Download Receipt"
    >
      <Receipt className="h-3 w-3" />
      Receipt
    </Button>
  )
}
