"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export function RoadmapSection() {
  const router = useRouter()

  const handleViewRoadmap = () => {
    router.push('/courses/roadmap')
  }

  return (
    <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 bg-pink-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          See Our Upcoming Courses
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          Get ready for exciting new courses coming soon. We&apos;re constantly expanding our curriculum to help you master new skills and advance your career.
        </p>
        <Button
          size="lg"
          className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all cursor-pointer"
          onClick={handleViewRoadmap}
        >
          View Upcoming Courses
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  )
}
