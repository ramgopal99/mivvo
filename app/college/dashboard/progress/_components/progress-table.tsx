import React from 'react'
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  rollNumber: string | null
  collegeName: string | null
  branch: string | null
  course: string | null
  courseDuration: string | null
  year: string | null
  averageScore: number
  completedInterviews: number
  totalInterviews: number
  totalTimeSpent: number
  thisWeekTimeSpent: number
  lastWeekTimeSpent: number
  status: string
}

interface ProgressTableProps {
  children: React.ReactNode
}

interface TableContainerProps {
  children: React.ReactNode
}

interface TableHeaderProps {
  children: React.ReactNode
}

interface TableBodyProps {
  children: React.ReactNode
}

interface TableRowProps {
  student: Student
  onViewDetails?: (student: Student) => void
}

interface TableEmptyProps {
  message?: string
}

function TableContainer({ children }: TableContainerProps) {
  return (
    <div className="border rounded-lg">
      <div className="overflow-x-auto">
        <table className="w-full">{children}</table>
      </div>
    </div>
  )
}

function TableHeader({ children }: TableHeaderProps) {
  return (
    <thead className="bg-muted/50">
      <tr className="border-b">{children}</tr>
    </thead>
  )
}

function TableHeaderCell({ children, className = "text-left p-4 font-medium" }: { children: React.ReactNode, className?: string }) {
  return <th className={className}>{children}</th>
}

function TableBody({ children }: TableBodyProps) {
  return <tbody>{children}</tbody>
}

function TableRow({ student, onViewDetails }: TableRowProps) {
  return (
    <tr className="border-b hover:bg-muted/50">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-medium text-sm">
              {student.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="font-medium">{student.name}</div>
            <div className="text-sm text-muted-foreground">{student.email}</div>
          </div>
        </div>
      </td>
      <td className="p-4">
        {student.rollNumber || 'N/A'}
      </td>
      <td className="p-4">
        {student.branch || 'N/A'}
      </td>
      <td className="p-4">
        {student.course || 'N/A'}
      </td>
      <td className="p-4">
        <div className="text-sm font-medium">{student.totalInterviews}</div>
        <div className="text-xs text-muted-foreground">Interviews Created</div>
      </td>
      <td className="p-4">
        {onViewDetails && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(student)}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        )}
      </td>
    </tr>
  )
}

function TableEmpty({ message = "No students found" }: TableEmptyProps) {
  return (
    <tr>
      <td colSpan={6} className="text-center py-8 text-muted-foreground">
        {message}
      </td>
    </tr>
  )
}

// Compound component pattern
function ProgressTable({ children }: ProgressTableProps) {
  return <>{children}</>
}

ProgressTable.Container = TableContainer
ProgressTable.Header = TableHeader
ProgressTable.HeaderCell = TableHeaderCell
ProgressTable.Body = TableBody
ProgressTable.Row = TableRow
ProgressTable.Empty = TableEmpty

export { ProgressTable }
export type { Student }
