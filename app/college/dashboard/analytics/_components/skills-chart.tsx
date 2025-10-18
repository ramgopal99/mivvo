"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface SkillsData {
  technicalSkills: number
  communication: number
  problemSolving: number
  overall: number
}

interface SkillsChartProps {
  skillsData: SkillsData
}

export function SkillsChart({ skillsData }: SkillsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Skill Levels</CardTitle>
        <CardDescription>
          Overall skill proficiency across all students
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Technical Skills</span>
            <span className="font-medium">{skillsData.technicalSkills}%</span>
          </div>
          <Progress value={skillsData.technicalSkills} className="h-3" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Communication</span>
            <span className="font-medium">{skillsData.communication}%</span>
          </div>
          <Progress value={skillsData.communication} className="h-3" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Problem Solving</span>
            <span className="font-medium">{skillsData.problemSolving}%</span>
          </div>
          <Progress value={skillsData.problemSolving} className="h-3" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Performance</span>
            <span className="font-medium">{skillsData.overall}%</span>
          </div>
          <Progress value={skillsData.overall} className="h-3" />
        </div>
      </CardContent>
    </Card>
  )
}
