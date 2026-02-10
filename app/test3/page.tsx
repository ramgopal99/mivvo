"use client"

import { SlideRenderer } from "@/app/dashboard/videolearn/_components/slides"
import { getAllSlidesForGallery, getSlideLabel } from "@/app/dashboard/videolearn/_components/all-slides-demo"

export default function Test3Page() {
  const slides = getAllSlidesForGallery()

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-semibold text-foreground">All slides — gallery view</h1>
      <div className="space-y-6">
        {slides.map((slide) => (
          <section
            key={`${slide.type}-${slide.slideNumber}-${String(slide.content?.variant ?? "")}`}
            className="rounded-lg border bg-card overflow-hidden"
          >
            <div className="px-4 py-2 border-b bg-muted/50 text-sm font-medium text-muted-foreground">
              {getSlideLabel(slide)}
            </div>
            <div className="p-6 min-h-[200px] flex items-center justify-center bg-background">
              <div className="w-full max-w-4xl">
                <SlideRenderer slide={slide} />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
