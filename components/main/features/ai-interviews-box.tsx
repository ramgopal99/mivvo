"use client"

import { useEffect, useState } from "react"
import { landingConfig } from "@/config/landing-config"

export function AiInterviewsBox() {
  const featureData = landingConfig.features.mainFeatures.aiInterviews

  return (
    <div className="col-span-1 sm:col-span-2 lg:col-span-2 group relative flex flex-col justify-between overflow-hidden rounded-lg bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
      <AnimatedBarGraph featureData={featureData} />
    </div>
  )
}

export function AnimatedBarGraph({ featureData }: { featureData: { title: string; description: string } }) {
  const [lineProgress, setLineProgress] = useState(0)
  
  // Bar heights in percentages
  const bars = [30, 50, 40, 70, 55, 80, 65, 90, 75, 85, 70, 95, 80]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLineProgress(prev => (prev >= 100 ? 0 : prev + 1))
    }, 30)
    
    return () => clearInterval(interval)
  }, [])
  
  // Calculate the total path length and points
  const getPathData = () => {
    let pathData = `M 2 ${100 - bars[0]}%`
    bars.forEach((height, i) => {
      if (i > 0) {
        const x = ((i) / (bars.length - 1)) * 96 + 2
        const y = 100 - height
        pathData += ` L ${x} ${y}%`
      }
    })
    return pathData
  }
  
  return (
    <div className="relative p-4 sm:p-5 md:p-6 flex flex-col h-full bg-white rounded-lg">
      <div className="flex-1 flex items-end justify-between gap-1 relative min-h-[120px] sm:min-h-[150px]">
        {/* Animated Line that follows bar heights */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset={`${lineProgress}%`} stopColor="hsl(var(--primary))" stopOpacity="0.9" />
              <stop offset={`${lineProgress}%`} stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={getPathData()}
            stroke="url(#lineGradient)"
            strokeWidth="3"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          {/* Glowing dot at progress point */}
          <circle
            cx={`${2 + (lineProgress / 100) * 96}%`}
            cy={`${100 - bars[Math.min(Math.floor((lineProgress / 100) * bars.length), bars.length - 1)]}%`}
            r="4"
            fill="hsl(var(--primary))"
            opacity="0.95"
          >
            <animate
              attributeName="r"
              values="4;6;4"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* Bars */}
        {bars.map((height, index) => (
          <div
            key={index}
            className="flex-1 bg-primary/20 rounded-t transition-all duration-500 hover:bg-primary/30"
            style={{
              height: `${height}%`,
              animation: `barGrow 0.8s ease-out ${index * 0.05}s backwards`
            }}
          />
        ))}
      </div>

      <div className="mt-4 sm:mt-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 leading-tight break-words">
          {featureData.title}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed break-words">
          {featureData.description}
        </p>
      </div>

      <style>{`
        @keyframes barGrow {
          from {
            height: 0%;
          }
        }
      `}</style>
    </div>
  )
}
