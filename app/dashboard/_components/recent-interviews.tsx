"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, TrendingUp, Eye, Play } from "lucide-react"
import Link from "next/link"

interface Interview {
  id: string
  title: string
  type: string
  status: 'IN_PROGRESS' | 'COMPLETED'
  score?: number
  duration: number // in minutes
  createdAt: Date
  companyName?: string
  position?: string
}

interface RecentInterviewsProps {
  interviews: Interview[]
}

export function RecentInterviews({ interviews }: RecentInterviewsProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }


  const getInterviewTypeColor = (type: string) => {
    switch (type) {
      case 'TECHNICAL':
        return 'bg-blue-100 text-blue-800'
      case 'CODING':
        return 'bg-purple-100 text-purple-800'
      case 'UI_INTERVIEW':
        return 'bg-orange-100 text-orange-800'
      case 'HR_INTERVIEW':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle>Recent Interviews</CardTitle>
        <CardDescription>
          Your latest mock interview sessions and progress
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-start pb-6 h-full">
        {interviews.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-muted-foreground mb-4">
              <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No interviews yet</p>
            </div>
            <Button asChild>
              <Link href="/dashboard/custominterview">
                Start Your First Interview
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {interviews.slice(0, 5).map((interview) => (
              <div key={interview.id} className="relative p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="absolute top-2 right-2">
                  <Badge className={getInterviewTypeColor(interview.type)}>
                    {interview.type.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="pr-20">
                  <div className="mb-1">
                    <h4 className="font-medium">{interview.title}</h4>
                  </div>
                  {(interview.companyName || interview.position) && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {interview.companyName && interview.position
                        ? `${interview.position} at ${interview.companyName}`
                        : interview.companyName || interview.position
                      }
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(interview.createdAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDuration(interview.duration)}
                    </div>
                    {interview.score && (
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {interview.score}%
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/custominterview/${interview.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        Analysis
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/dashboard/custominterview/meet/${interview.id}`}>
                        <Play className="h-4 w-4 mr-1" />
                        Retry
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {interviews.length > 5 && (
              <div className="text-center pt-4">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/custominterview">
                    View All Interviews
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
