"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, BookOpen, CheckCircle2 } from "lucide-react"
import { VideoPresentation } from "@/app/dashboard/videolearn/_components/video-presentation"
import { COURSE_DATA, type CourseModule } from "./course-data"

export function CoursePage() {
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null)
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set())

  const handleModuleSelect = (module: CourseModule) => {
    setSelectedModule(module)
  }

  const handleModuleComplete = () => {
    if (selectedModule) {
      setCompletedModules((prev) => new Set(prev).add(selectedModule.id))
    }
  }

  const handleBackToModules = () => {
    setSelectedModule(null)
  }

  if (selectedModule) {
    return (
      <div className="container mx-auto p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Button variant="ghost" onClick={handleBackToModules} className="mb-4">
              ← Back to Modules
            </Button>
            <h1 className="text-3xl font-bold">{selectedModule.title}</h1>
            <p className="text-muted-foreground mt-2">{selectedModule.description}</p>
          </div>
          <Badge variant="secondary" className="text-sm">
            {selectedModule.slides.length} Slides
          </Badge>
        </div>

        <VideoPresentation
          slides={selectedModule.slides}
          onComplete={handleModuleComplete}
          animationMode="rotation"
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">React Mastery Course</h1>
        <p className="text-lg text-muted-foreground">
          A comprehensive course covering React fundamentals, hooks, and advanced patterns
        </p>
        <div className="flex gap-2 mt-4">
          <Badge variant="outline">{COURSE_DATA.length} Modules</Badge>
          <Badge variant="outline">
            {COURSE_DATA.reduce((sum, m) => sum + m.slides.length, 0)} Total Slides
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {COURSE_DATA.map((module) => {
          const isCompleted = completedModules.has(module.id)
          return (
            <Card
              key={module.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleModuleSelect(module)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      {module.title}
                    </CardTitle>
                  </div>
                  {isCompleted && (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{module.slides.length} slides</Badge>
                  <Button size="sm" variant="outline">
                    <Play className="h-4 w-4 mr-2" />
                    Start
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {completedModules.size > 0 && (
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Progress: {completedModules.size} of {COURSE_DATA.length} modules completed
          </p>
          <div className="mt-2 w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{
                width: `${(completedModules.size / COURSE_DATA.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
