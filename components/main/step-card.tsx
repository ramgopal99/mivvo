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
      <div className="flex items-center justify-center mb-4">
        <span className="text-white font-bold text-sm bg-red-500 px-3 py-1 rounded-full">
          Step {stepNumber === 1 ? "One" : stepNumber === 2 ? "Two" : "Three"}
        </span>
        <div className="w-8 h-0.5 bg-red-200 ml-2"></div>
      </div>

      {/* Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 h-[500px] flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{description}</p>
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}
