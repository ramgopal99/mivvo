"use client"

import { useSession } from "next-auth/react"
import { SignInButton } from "./sign-in-button"
import { UserMenu } from "./user-menu"

export function AuthStatus() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
      </div>
    )
  }

  if (session?.user) {
    return <UserMenu />
  }

  return <SignInButton />
}
