"use client"

import { Badge } from "@/components/ui/badge"
import { BookOpen, GraduationCap, Code } from "lucide-react"

export function CoursesHeader() {
  return (
    <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 mt-16">
            Our Courses
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Master new skills with our comprehensive learning platform. Choose from our curated courses designed for your success.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm border border-border">
              <BookOpen className="w-3 h-3 mr-1" />
              Interactive Learning
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm border border-border">
              <Code className="w-3 h-3 mr-1" />
              Hands-on Practice
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm border border-border">
              <GraduationCap className="w-3 h-3 mr-1" />
              Expert Guidance
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

