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
    <div className="relative overflow-hidden w-full">
      {/* Background with uniform color and fading box pattern */}
      <div className="absolute inset-0 bg-pink-50">
        {/* Fading box pattern overlay */}
        <div 
          className="absolute inset-0 opacity-80" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
          }}
        />
      </div>

      {/* Content Section - First 70% */}
      <div className="relative z-10 min-h-[70vh] h-auto sm:h-[70vh] flex items-center justify-center pt-24 sm:pt-20 md:pt-16 pb-8 sm:pb-0">
        <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center overflow-hidden">
          {/* New Tag */}
          <div className="flex justify-center mb-4 sm:mb-6 px-2 w-full">
            <div className="w-full sm:w-auto max-w-full flex justify-center">
              <SegmentedButton
                options={[...tagOptions]}
                value={selectedTag}
                onChange={setSelectedTag}
                className="border-red-400/30 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full sm:w-auto max-w-full text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight break-words px-2">
            {landingConfig.hero.headline.text}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-3 break-words">
            {landingConfig.hero.description.text}
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-3 w-full">
            <Link href={landingConfig.hero.cta.href} className="w-full sm:w-auto max-w-full">
              <Button
                size="lg"
                className="w-full sm:w-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <span className="sm:hidden">{landingConfig.hero.cta.mobileText}</span>
                <span className="hidden sm:inline whitespace-nowrap">{landingConfig.hero.cta.text}</span>
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500 px-3 break-words">
            <p>{landingConfig.hero.additionalInfo.text}</p>
          </div>
        </div>
      </div>

      {/* Safari Section - Next 100% */}
      <div className="relative z-10 flex items-start justify-center pt-0 pb-0">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-0 mb-0">
          <div className="scale-90 sm:scale-100 pb-0 mb-0">
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



