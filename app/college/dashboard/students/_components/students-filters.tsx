"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface StudentsFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  majorFilter: string
  onMajorFilterChange: (value: string) => void
  yearFilter: string
  onYearFilterChange: (value: string) => void
  majors: string[]
  years: string[]
}

export function StudentsFilters({
  searchTerm,
  onSearchChange,
  majorFilter,
  onMajorFilterChange,
  yearFilter,
  onYearFilterChange,
  majors,
  years
}: StudentsFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Directory</CardTitle>
        <CardDescription>
          Search and filter students by various criteria
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or major..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={majorFilter} onValueChange={onMajorFilterChange}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by Major" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Majors</SelectItem>
              {majors.map(major => (
                <SelectItem key={major} value={major}>{major}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={yearFilter} onValueChange={onYearFilterChange}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map(year => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
