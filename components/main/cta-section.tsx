"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Users, Target } from "lucide-react"
import { landingConfig } from "../../config/landing-config"

const iconMap = {
  Star,
  Users,
  Target
}

export function CtaSection() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Centered content with gradient background */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80">
          {/* Abstract light streaks pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-20 right-20 w-40 h-40 bg-white/15 rounded-full blur-2xl animate-pulse animation-delay-300" />
            <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse animation-delay-150" />
            <div className="absolute bottom-10 right-1/3 w-36 h-36 bg-white/12 rounded-full blur-2xl animate-pulse animation-delay-200" />
          </div>
          
          {/* Subtle wave patterns */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1000 200" fill="none">
              <path d="M0,100 Q250,50 500,100 T1000,100 L1000,200 L0,200 Z" fill="white" />
            </svg>
          </div>

          <div className="relative z-10 px-8 py-16 text-center">
            {/* Main Content */}
            <div className="space-y-8">
              {/* Headline */}
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight whitespace-nowrap">
                  {landingConfig.cta.headline.main} {landingConfig.cta.headline.sub}
                </h2>
                <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                  {landingConfig.cta.description}
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Button
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold bg-white text-primary hover:bg-white/90 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 rounded-full"
                >
                  {landingConfig.cta.button.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-white/80">
                {landingConfig.cta.trustIndicators.map((indicator, index) => {
                  const IconComponent = iconMap[indicator.icon as keyof typeof iconMap]
                  return (
                    <div key={index} className="flex items-center space-x-2">
                      <IconComponent className={`w-5 h-5 ${indicator.color} ${indicator.icon === 'Star' ? 'fill-current' : ''}`} />
                      <span className="text-sm font-medium">{indicator.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
