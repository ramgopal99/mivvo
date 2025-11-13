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
      "inline-flex items-stretch bg-white border border-gray-200 rounded-xl sm:rounded-full overflow-hidden shadow-sm max-w-full w-full sm:w-auto gap-0",
      className
    )}>
      {options.map((option, index) => (
        <div
          key={option.value}
          className={cn(
            "px-2.5 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-2.5 text-[10px] sm:text-xs md:text-sm font-semibold relative flex-1 sm:flex-none text-center min-h-[36px] sm:min-h-0",
            "first:rounded-l-xl sm:first:rounded-l-full last:rounded-r-xl sm:last:rounded-r-full",
            index === 0
              ? "bg-primary text-white shadow-md z-10"
              : "text-gray-600 bg-gray-50"
          )}
        >
          <span className="relative z-10 block leading-tight break-words">
            {option.label}
          </span>
        </div>
      ))}
    </div>
  )
}
