"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

export function TicketsButton() {
  const router = useRouter()

  const handleViewTickets = () => {
    router.push('/dashboard/support/tickets')
  }

  return (
    <Button
      onClick={handleViewTickets}
      className="bg-primary hover:bg-primary/90 cursor-pointer"
      size="sm"
    >
      <MessageSquare className="h-4 w-4 mr-2" />
      My Tickets
    </Button>
  )
}
