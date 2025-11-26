"use client"

import { use } from "react"
import { CollegeDetails } from "./_components"

interface CollegePageProps {
  params: Promise<{
    collegeid: string
  }>
}

export default function CollegePage({ params }: CollegePageProps) {
  const unwrappedParams = use(params)
  const handleBack = () => {
    // Navigate back to colleges list
    window.history.back()
  }

  return (
    <CollegeDetails
      collegeId={unwrappedParams.collegeid}
      onBack={handleBack}
    />
  )
}
