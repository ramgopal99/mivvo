import React from 'react'
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  rollNumber: string | null
  collegeName: string | null
  collegeId?: string
  status: string
  avatar: string | null
  cv?: string | null
  firstName?: string
  lastName?: string
  phone?: string
  careerGoals?: string
  linkedIn?: string
  github?: string
  totalCreditAllocation?: number
  usedCredits?: number
  createdAt?: string
  updatedAt?: string
}

interface StudentsTableProps {
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
  onViewDetails: (student: Student) => void
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
          <span className="font-medium">{student.name}</span>
        </div>
      </td>
      <td className="p-4 text-muted-foreground">
        {student.email}
      </td>
      <td className="p-4">
        {student.rollNumber || 'N/A'}
      </td>
      <td className="p-4">
        {student.cv ? (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            ✓ Available
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            No CV
          </span>
        )}
      </td>
      <td className="p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(student)}
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </td>
    </tr>
  )
}

function TableEmpty({ message = "No students found" }: TableEmptyProps) {
  return (
    <tr>
      <td colSpan={5} className="text-center py-8 text-muted-foreground">
        {message}
      </td>
    </tr>
  )
}

// Compound component pattern
function StudentsTable({ children }: StudentsTableProps) {
  return <>{children}</>
}

StudentsTable.Container = TableContainer
StudentsTable.Header = TableHeader
StudentsTable.HeaderCell = TableHeaderCell
StudentsTable.Body = TableBody
StudentsTable.Row = TableRow
StudentsTable.Empty = TableEmpty

export { StudentsTable }
export type { Student }
