"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { landingConfig } from "../../config/landing-config"
import { SafariDemo } from "./safari-demo"
import { SegmentedButton } from "@/components/ui/segmented-button"
import { useState } from "react"

export function HeroSection() {
  const [selectedTag, setSelectedTag] = useState("ai-powered")

  const tagOptions = [
    { label: landingConfig.hero.newTag.text, value: "ai-powered" },
    { label: landingConfig.hero.newTag.subtitle, value: "future" }
  ]

  return (
    <div className="relative h-[170vh] overflow-hidden">
      {/* Background with gradient and grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-pink-100/50 to-white">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-20 bg-grid-pattern" />
      </div>

      {/* Content Section - First 70% */}
      <div className="relative z-10 h-[70vh] flex items-center justify-center pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* New Tag */}
          <div className="flex justify-center mb-6">
            <SegmentedButton
              options={[...tagOptions]}
              value={selectedTag}
              onChange={setSelectedTag}
              className="border-red-400/30 shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight whitespace-nowrap">
            {landingConfig.hero.headline.text}
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Practice with our advanced AI interviewer and get instant feedback to improve your performance.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={landingConfig.hero.cta.href}>
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {landingConfig.hero.cta.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-4 mb-0 text-sm text-gray-500">
            <p>{landingConfig.hero.additionalInfo.text}</p>
          </div>
        </div>
      </div>

      {/* Safari Section - Next 100% */}
      <div className="relative z-10 h-[100vh] flex items-start justify-center pt-4">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="scale-100">
            <SafariDemo />
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse animation-delay-300" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/15 rounded-full blur-lg animate-pulse animation-delay-150" />
    </div>
  )
}



