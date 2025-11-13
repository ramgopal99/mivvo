"use client"

import { MessageSquare } from "lucide-react"
import { TicketsButton } from "./tickets-button"

export function SupportHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mr-4">
            <MessageSquare className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Center</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Have a question or need help? We&apos;re here to assist you. Submit your query below and our team will get back to you as soon as possible.
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 ml-4">
          <TicketsButton />
        </div>
      </div>
    </div>
  )
}
