/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { cn } from "@/lib/utils"

interface SegmentedButtonProps {
  options: {
    label: string
    value: string
  }[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function SegmentedButton({ options, value, onChange, className }: SegmentedButtonProps) {
  return (
    <div className={cn(
      "inline-flex items-center bg-white border border-gray-200 rounded-full overflow-hidden shadow-sm",
      className
    )}>
      {options.map((option, index) => (
        <div
          key={option.value}
          className={cn(
            "px-6 py-2.5 text-sm font-semibold transition-all duration-300 relative",
            "first:rounded-l-full last:rounded-r-full",
            index === 0 
              ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-md"
              : "text-gray-600 bg-gray-50"
          )}
        >
          <span className="relative z-10">{option.label}</span>
          {index === 0 && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-full" />
          )}
        </div>
      ))}
    </div>
  )
}
