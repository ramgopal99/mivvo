"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface LoadingCompoundProps {
  text?: string
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "spinner" | "dots"
}

const sizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg"
}

const LoadingSpinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => (
  <div
    className={cn(
      "inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent",
      size === "sm" ? "w-4 h-4" : size === "lg" ? "w-8 h-8" : "w-6 h-6",
      "mr-2"
    )}
    role="status"
  />
)

const LoadingDots = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => (
  <div className="flex space-x-1 mr-2">
    <div
      className={cn(
        "bg-current rounded-full animate-bounce",
        size === "sm" ? "w-1 h-1" : size === "lg" ? "w-2 h-2" : "w-1.5 h-1.5"
      )}
    />
    <div
      className={cn(
        "bg-current rounded-full animate-bounce animation-delay-150",
        size === "sm" ? "w-1 h-1" : size === "lg" ? "w-2 h-2" : "w-1.5 h-1.5"
      )}
    />
    <div
      className={cn(
        "bg-current rounded-full animate-bounce animation-delay-300",
        size === "sm" ? "w-1 h-1" : size === "lg" ? "w-2 h-2" : "w-1.5 h-1.5"
      )}
    />
  </div>
)

export function LoadingCompound({
  text = "loading",
  className,
  size = "md",
  variant = "default"
}: LoadingCompoundProps) {
  const renderLoadingIndicator = () => {
    switch (variant) {
      case "spinner":
        return <LoadingSpinner size={size} />
      case "dots":
        return <LoadingDots size={size} />
      default:
        return null
    }
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      {renderLoadingIndicator()}
      <span className="sr-only">{text}...</span>
      <span aria-hidden="true">{text}...</span>
    </div>
  )
}

// Export additional variants for convenience
export function LoadingSpinnerCompound(props: Omit<LoadingCompoundProps, 'variant'>) {
  return <LoadingCompound {...props} variant="spinner" />
}

export function LoadingDotsCompound(props: Omit<LoadingCompoundProps, 'variant'>) {
  return <LoadingCompound {...props} variant="dots" />
}
