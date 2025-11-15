"use client"

import { FeedbackForm, FeedbackTitle, FeedbackMessage, FeedbackSubmit, FeedbackHeader } from "./_components"

export default function FeedbackPage() {
  return (
    <div className="space-y-6">
      <FeedbackHeader />

      <FeedbackForm>
        <FeedbackTitle />
        <FeedbackMessage />
        <FeedbackSubmit />
      </FeedbackForm>
    </div>
  )
}
