"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SignInButton() {
  return (
    <Link href="/auth/signin">
      <Button variant="outline" className="w-full">
        Sign In
      </Button>
    </Link>
  )
}
