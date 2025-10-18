"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Plus,
  Calendar,
  GraduationCap
} from "lucide-react"

interface InterviewsFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  typeFilter: string
  onTypeFilterChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  dateFilter: string
  onDateFilterChange: (value: string) => void
  onScheduleInterview: () => void
}

export function InterviewsFilters({
  searchTerm,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  statusFilter,
  onStatusFilterChange,
  dateFilter,
  onDateFilterChange,
  onScheduleInterview
}: InterviewsFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Interview Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search interviews or students..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={typeFilter} onValueChange={onTypeFilterChange}>
            <SelectTrigger className="w-full lg:w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="behavioral">Behavioral</SelectItem>
              <SelectItem value="system design">System Design</SelectItem>
              <SelectItem value="mock">Mock</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-full lg:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateFilter} onValueChange={onDateFilterChange}>
            <SelectTrigger className="w-full lg:w-40">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={onScheduleInterview}>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Interview
          </Button>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Next interview: Today at 3:00 PM</span>
          </div>
          <div className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Showing {typeFilter === 'all' ? 'all interviews' : `${typeFilter} interviews`}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
