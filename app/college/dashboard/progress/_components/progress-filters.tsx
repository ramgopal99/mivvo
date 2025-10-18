"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProgressFiltersProps {
  sortBy: string
  onSortChange: (value: string) => void
  filterBy: string
  onFilterChange: (value: string) => void
}

export function ProgressFilters({
  sortBy,
  onSortChange,
  filterBy,
  onFilterChange
}: ProgressFiltersProps) {
  return (
    <div className="flex items-center gap-2">
      <Select value={filterBy} onValueChange={onFilterChange}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="graduated">Graduated</SelectItem>
        </SelectContent>
      </Select>
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="overall">Sort by Progress</SelectItem>
          <SelectItem value="score">Sort by Score</SelectItem>
          <SelectItem value="interviews">Sort by Interviews</SelectItem>
          <SelectItem value="activity">Sort by Activity</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
