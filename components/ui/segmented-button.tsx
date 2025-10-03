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
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "px-6 py-2.5 text-sm font-semibold transition-all duration-300 relative",
            "first:rounded-l-full last:rounded-r-full",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-1",
            value === option.value
              ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-md transform scale-[1.02]"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 hover:shadow-sm"
          )}
        >
          <span className="relative z-10">{option.label}</span>
          {value === option.value && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-full" />
          )}
        </button>
      ))}
    </div>
  )
}
