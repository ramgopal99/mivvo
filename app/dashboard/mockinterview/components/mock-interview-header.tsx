"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { CreateMockInterviewDialog } from "./create-mock-interview-dialog"

interface MockInterviewHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onInterviewCreated: () => void
}

export function MockInterviewHeader({
  searchQuery,
  onSearchChange,
  onInterviewCreated
}: MockInterviewHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Mock Interviews</h1>
        <p className="text-muted-foreground">
          Practice interviews for any position at any company. Get company descriptions and job details automatically.
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search interviews..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 w-64"
          />
        </div>
        <CreateMockInterviewDialog onInterviewCreated={onInterviewCreated} />
      </div>
    </div>
  )
}
