"use client"

import { MorphingText } from "@/components/ui/morphing-text"

export function MorphingSection() {
  return (
    <section className="h-[40vh] w-full flex items-center justify-center bg-pink-50">
      <MorphingText 
        texts={[
          "AI Mock Interviews",
          "Real-time Feedback", 
          "Performance Analysis",
          "Interview Preparation",
          "Career Success"
        ]} 
        className="text-primary text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center"
      />
    </section>
  )
}
