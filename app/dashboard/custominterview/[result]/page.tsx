import { notFound } from "next/navigation"
import { getSessionUserData } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import { InterviewResultsContent } from "./_components"

async function getInterviewResults(interviewId: string) {
  const user = await getSessionUserData()

  if (!user) {
    notFound()
  }

  // Fetch interview with attempts and results
  const interview = await prisma.mockInterview.findUnique({
    where: {
      id: interviewId,
      createdBy: user.id // Ensure user owns this interview
    },
    select: {
      id: true,
      title: true,
      companyName: true,
      position: true,
      createdAt: true,
      attempts: {
        select: {
          id: true,
          startedAt: true,
          completedAt: true,
          duration: true,
          status: true,
          createdAt: true,
          results: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })

  if (!interview) {
    notFound()
  }

  return interview
}

export default async function InterviewResultPage({
  params
}: {
  params: Promise<{ result: string }>
}) {
  const { result } = await params
  const interview = await getInterviewResults(result)

  return <InterviewResultsContent interview={interview} />
}
