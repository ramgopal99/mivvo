"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Plus,
  Download,
  Building2
} from "lucide-react"

interface AdminCollegesFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  planFilter: string
  onPlanFilterChange: (value: string) => void
  onAddCollege: () => void
  onExportColleges: () => void
}

export function AdminCollegesFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  planFilter,
  onPlanFilterChange,
  onAddCollege,
  onExportColleges
}: AdminCollegesFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>College Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search colleges by name or domain..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-full lg:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={planFilter} onValueChange={onPlanFilterChange}>
            <SelectTrigger className="w-full lg:w-40">
              <SelectValue placeholder="Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button onClick={onAddCollege}>
              <Building2 className="mr-2 h-4 w-4" />
              Add College
            </Button>
            <Button variant="outline" onClick={onExportColleges}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
