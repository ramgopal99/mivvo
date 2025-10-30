import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { format } from "date-fns"

interface Interview {
  id: string
  title: string
  description: string
  difficulty: string
  duration: number
  createdAt: string
  totalAttempts: number
  averageScore: number
}

interface StudentInterviewsTableProps {
  interviews: Interview[]
  onViewAttempts?: (interviewId: string) => void
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
  interview: Interview
  onViewAttempts?: (interviewId: string) => void
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

function TableRow({ interview, onViewAttempts }: TableRowProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDuration = (seconds: number) => {
    if (!seconds || isNaN(seconds)) {
      return '0s'
    }
    const totalSeconds = Math.floor(seconds)
    const hours = Math.floor(totalSeconds / 3600)
    const mins = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60
    
    if (hours > 0) {
      return `${hours}h ${mins}m ${secs}s`
    } else if (mins > 0) {
      return `${mins}m ${secs}s`
    } else {
      return `${secs}s`
    }
  }

  return (
    <tr className="border-b hover:bg-muted/50">
      <td className="p-4">
        <div>
          <div className="font-medium">{interview.title}</div>
          <div className="text-sm text-muted-foreground mt-1">
            {interview.description}
          </div>
        </div>
      </td>
      <td className="p-4">
        <Badge className={getDifficultyColor(interview.difficulty)}>
          {interview.difficulty}
        </Badge>
      </td>
      <td className="p-4">
        {formatDuration(interview.duration)}
      </td>
      <td className="p-4">
        <div className="text-center">
          <div className="font-medium">{interview.totalAttempts}</div>
          <div className="text-xs text-muted-foreground">attempts</div>
        </div>
      </td>
      <td className="p-4">
        <div className="text-center">
          <div className="font-medium">{Math.round(interview.averageScore)}%</div>
          <div className="text-xs text-muted-foreground">avg score</div>
        </div>
      </td>
      <td className="p-4 text-sm text-muted-foreground">
        {format(new Date(interview.createdAt), 'MMM dd, yyyy')}
      </td>
      <td className="p-4">
        {onViewAttempts && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewAttempts(interview.id)}
          >
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
        )}
      </td>
    </tr>
  )
}

function TableEmpty({ message = "No interviews found" }: TableEmptyProps) {
  return (
    <tr>
      <td colSpan={7} className="text-center py-8 text-muted-foreground">
        {message}
      </td>
    </tr>
  )
}

// Compound component pattern
function StudentInterviewsTable({ interviews, onViewAttempts }: StudentInterviewsTableProps) {
  return (
    <TableContainer>
      <TableHeader>
        <TableHeaderCell>Interview Title</TableHeaderCell>
        <TableHeaderCell>Difficulty</TableHeaderCell>
        <TableHeaderCell>{"Duration"}</TableHeaderCell>
        <TableHeaderCell>Attempts</TableHeaderCell>
        <TableHeaderCell>Avg Score</TableHeaderCell>
        <TableHeaderCell>Created</TableHeaderCell>
        <TableHeaderCell>Actions</TableHeaderCell>
      </TableHeader>
      <TableBody>
        {interviews.length === 0 ? (
          <TableEmpty />
        ) : (
          interviews.map((interview) => (
            <TableRow
              key={interview.id}
              interview={interview}
              onViewAttempts={onViewAttempts}
            />
          ))
        )}
      </TableBody>
    </TableContainer>
  )
}

export { StudentInterviewsTable }
