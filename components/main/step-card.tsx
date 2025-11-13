"use client"

import { ReactNode } from "react"

interface StepCardProps {
  stepNumber: number
  title: string
  description: string
  children: ReactNode
  className?: string
}

export function StepCard({ stepNumber, title, description, children, className = "" }: StepCardProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Step Label */}
      <div className="flex items-center justify-center mb-4 sm:mb-5 md:mb-6 relative z-10">
        <span className="text-white font-bold text-xs sm:text-sm bg-red-500 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full">
          Step {stepNumber === 1 ? "One" : stepNumber === 2 ? "Two" : "Three"}
        </span>
        <div className="w-6 sm:w-8 h-0.5 bg-red-200 ml-1.5 sm:ml-2"></div>
      </div>

      {/* Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 min-h-[350px] sm:min-h-[400px] md:h-[500px] flex flex-col relative">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight break-words">{title}</h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed break-words">{description}</p>
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}
