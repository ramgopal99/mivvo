"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface AuthNavigationProps {
  variant?: "signin" | "signup"
  className?: string
}

export function AuthNavigation({ variant = "signin", className = "" }: AuthNavigationProps) {
  if (variant === "signin") {
    return (
      <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
        <Link href="/auth/signin">
          <Button variant="outline" className="w-full sm:w-auto">
            Sign In
          </Button>
        </Link>
        <Link href="/auth/signup">
          <Button className="w-full sm:w-auto">
            Sign Up
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <Link href="/auth/signup">
        <Button className="w-full sm:w-auto">
          Sign Up
        </Button>
      </Link>
      <Link href="/auth/signin">
        <Button variant="outline" className="w-full sm:w-auto">
          Sign In
        </Button>
      </Link>
    </div>
  )
}
