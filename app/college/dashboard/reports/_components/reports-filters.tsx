"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Download,
  Plus,
  Calendar,
  FileText
} from "lucide-react"

interface ReportsFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  typeFilter: string
  onTypeFilterChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  onGenerateReport: () => void
  onExportAll: () => void
}

export function ReportsFilters({
  searchTerm,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  statusFilter,
  onStatusFilterChange,
  onGenerateReport,
  onExportAll
}: ReportsFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Report Generation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={typeFilter} onValueChange={onTypeFilterChange}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Report Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="group">Group</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
              <SelectItem value="progress">Progress</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button onClick={onGenerateReport}>
              <Plus className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button variant="outline" onClick={onExportAll}>
              <Download className="mr-2 h-4 w-4" />
              Export All
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Last generated: Today at 2:30 PM</span>
          </div>
          <div className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Showing {typeFilter === 'all' ? 'all reports' : `${typeFilter} reports`}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
