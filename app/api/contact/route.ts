import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, subject, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Create contact entry in database
    const contact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        email,
        subject,
        message,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully. We'll get back to you soon!",
        contact: {
          id: contact.id,
          createdAt: contact.createdAt,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating contact:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    )
  }
}

