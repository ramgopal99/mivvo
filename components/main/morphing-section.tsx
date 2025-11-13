"use client"

import { MorphingText } from "@/components/ui/morphing-text"

export function MorphingSection() {
  return (
    <section className="min-h-[30vh] sm:min-h-[35vh] lg:h-[40vh] w-full flex items-center justify-center bg-pink-50 py-8 sm:py-0">
      <MorphingText 
        texts={[
          "AI Mock Interviews",
          "Real-time Feedback", 
          "Performance Analysis",
          "Interview Preparation",
          "Career Success"
        ]} 
        className="text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-center px-4"
      />
    </section>
  )
}
