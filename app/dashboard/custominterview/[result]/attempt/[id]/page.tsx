import { notFound } from "next/navigation"
import { getSessionUserData } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import { AttemptDetailsContent } from "../_components"

async function getAttemptDetails(attemptId: string) {
  const user = await getSessionUserData()

  if (!user) {
    notFound()
  }

  // Fetch comprehensive interview attempt data
  const attempt = await prisma.interviewAttempt.findFirst({
    where: {
      id: attemptId,
      interview: {
        createdBy: user.id // Ensure user owns this interview
      }
    },
    include: {
      interview: {
        select: {
          id: true,
          title: true,
          companyName: true,
          position: true,
          jobDescription: true,
          interviewType: true,
          createdAt: true,
        }
      },
      results: {
        select: {
          id: true,
          overallScore: true,
          overallFeedback: true,
          strengths: true,
          weaknesses: true,
          recommendations: true,
          communication: true,
          knowledge: true,
          feedback: true,
          duration: true,
          createdAt: true,
          vocabularyComplexity: true,
          emotionalTone: true,
          wordCountAnalysis: true,
          questionAnsweringQuality: true,
          followUpHandling: true,
          answerStructure: true,
          exampleUsage: true,
          relevantTopicAnswer: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      },
      conversations: {
        select: {
          id: true,
          transcript: true,
          messages: true,
          duration: true,
          createdAt: true
        },
        orderBy: {
          createdAt: 'asc'
        }
      }
    }
  })

  if (!attempt) {
    notFound()
  }

  return attempt
}

export default async function AttemptDetailsPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const attempt = await getAttemptDetails(id)

  return <AttemptDetailsContent attempt={attempt} />
}
