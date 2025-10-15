import { InterviewCard, InterviewData } from "./InterviewCard"
import { InterviewListItem } from "./InterviewListItem"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LayoutGrid, List, Search } from "lucide-react"

interface InterviewListProps {
  interviews: InterviewData[]
  viewFormat?: "box" | "list"
  onViewFormatChange?: (format: "box" | "list") => void
  searchQuery?: string
  onSearchChange?: (query: string) => void
  onViewDetails?: (interview: InterviewData) => void
  onStartInterview?: (interview: InterviewData) => void
  onDeleteInterview?: (interview: InterviewData) => void
}

export function InterviewList({
  interviews,
  viewFormat = "box",
  onViewFormatChange,
  searchQuery = "",
  onSearchChange,
  onViewDetails,
  onStartInterview,
  onDeleteInterview
}: InterviewListProps) {
  if (interviews.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No interviews yet</h3>
        <p className="text-gray-600">Create your first custom interview to get started.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header with Title, Search, and View Toggle */}
      <div className="relative flex items-center">
        <h2 className="text-xl font-semibold text-gray-900 whitespace-nowrap mr-4">Your Custom Interviews</h2>

        {/* Search Box - Centered */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search interviews..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
        </div>

        {/* View Toggle Buttons - Completely Right */}
        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant={viewFormat === "box" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewFormatChange?.("box")}
            className="flex items-center gap-1 cursor-pointer"
          >
            <LayoutGrid className="w-4 h-4" />
            Box
          </Button>
          <Button
            variant={viewFormat === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewFormatChange?.("list")}
            className="flex items-center gap-1 cursor-pointer"
          >
            <List className="w-4 h-4" />
            List
          </Button>
        </div>
      </div>

      {/* Content based on view format */}
      {viewFormat === "box" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {interviews.map((interview) => (
            <InterviewCard
              key={interview.id}
              interview={interview}
              onViewDetails={onViewDetails}
              onStartInterview={onStartInterview}
              onDeleteInterview={onDeleteInterview}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {interviews.map((interview) => (
            <InterviewListItem
              key={interview.id}
              interview={interview}
              onViewDetails={onViewDetails}
              onStartInterview={onStartInterview}
              onDeleteInterview={onDeleteInterview}
            />
          ))}
        </div>
      )}
    </div>
  )
}
