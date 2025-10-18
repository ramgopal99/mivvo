"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Filter } from "lucide-react"
import { dummyStudents, collegeStats, interviewTypes, performanceData } from "@/app/college/_components/dummy-data"
import {
  AnalyticsStats,
  PerformanceChart,
  PerformanceDistribution,
  SkillsChart,
  InterviewDistribution,
  InterviewStats,
  EngagementStats,
  TopActiveStudents,
  EngagementTrends
} from "./_components"

export default function AnalyticsPage() {
  const skillAverages = {
    technicalSkills: Math.round(dummyStudents.reduce((acc, s) => acc + s.progress.technicalSkills, 0) / dummyStudents.length),
    communication: Math.round(dummyStudents.reduce((acc, s) => acc + s.progress.communication, 0) / dummyStudents.length),
    problemSolving: Math.round(dummyStudents.reduce((acc, s) => acc + s.progress.problemSolving, 0) / dummyStudents.length),
    overall: Math.round(dummyStudents.reduce((acc, s) => acc + s.progress.overall, 0) / dummyStudents.length)
  }

  // Calculate performance distribution
  const excellent = dummyStudents.filter(s => s.averageScore >= 90).length
  const good = dummyStudents.filter(s => s.averageScore >= 80 && s.averageScore < 90).length
  const average = dummyStudents.filter(s => s.averageScore >= 70 && s.averageScore < 80).length
  const needsImprovement = dummyStudents.filter(s => s.averageScore < 70).length

  // Calculate interview stats
  const totalInterviews = collegeStats.totalInterviews
  const completionRate = Math.round((dummyStudents.reduce((acc, s) => acc + s.completedInterviews, 0) / dummyStudents.reduce((acc, s) => acc + s.totalInterviews, 0)) * 100)
  const averageDuration = 42
  const mostPopularType = "Technical"
  const successRate = Math.round((dummyStudents.filter(s => s.averageScore >= 80).length / dummyStudents.length) * 100)

  // Calculate engagement stats
  const activeStudents = dummyStudents.filter(s => s.status === 'active').length
  const recentActivity = collegeStats.recentActivity
  const averageTimeSpent = Math.round(dummyStudents.reduce((acc, s) => acc + s.totalTimeSpent, 0) / dummyStudents.length)

  // Top active students data
  const topActiveStudents = dummyStudents
    .sort((a, b) => b.totalTimeSpent - a.totalTimeSpent)
    .slice(0, 5)
    .map(student => ({
      id: student.id,
      name: student.name,
      timeSpent: student.totalTimeSpent,
      interviews: student.completedInterviews
    }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive performance analytics and insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <AnalyticsStats
        totalStudents={collegeStats.totalStudents}
        averageScore={collegeStats.averageScore}
        topPerformers={collegeStats.topPerformers}
        recentActivity={collegeStats.recentActivity}
      />

      {/* Analytics Tabs */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <PerformanceChart data={performanceData} />
            <PerformanceDistribution
              excellent={excellent}
              good={good}
              average={average}
              needsImprovement={needsImprovement}
            />
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <SkillsChart skillsData={skillAverages} />
        </TabsContent>

        <TabsContent value="interviews" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <InterviewDistribution data={interviewTypes} />
            <InterviewStats
              totalInterviews={totalInterviews}
              completionRate={completionRate}
              averageDuration={averageDuration}
              mostPopularType={mostPopularType}
              successRate={successRate}
            />
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <EngagementStats
              activeStudents={activeStudents}
              recentActivity={recentActivity}
              averageTimeSpent={averageTimeSpent}
            />
            <TopActiveStudents students={topActiveStudents} />
            <EngagementTrends
              dailyActiveUsers={78}
              weeklyParticipation={65}
              interviewCompletion={82}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
