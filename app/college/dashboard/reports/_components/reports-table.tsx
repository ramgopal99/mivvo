"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Download,
  Eye,
  Calendar,
  User,
  FileText,
  TrendingUp
} from "lucide-react"

interface Report {
  id: string
  title: string
  type: 'individual' | 'group' | 'performance' | 'progress'
  studentName?: string
  studentAvatar?: string
  generatedDate: string
  score?: number
  status: 'completed' | 'processing' | 'failed'
}

interface ReportsTableProps {
  reports: Report[]
}

export function ReportsTable({ reports }: ReportsTableProps) {
  const getStatusBadge = (status: Report['status']) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-500">Completed</Badge>
      case 'processing':
        return <Badge variant="secondary">Processing</Badge>
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getTypeIcon = (type: Report['type']) => {
    switch (type) {
      case 'individual':
        return <User className="h-4 w-4" />
      case 'group':
        return <TrendingUp className="h-4 w-4" />
      case 'performance':
        return <TrendingUp className="h-4 w-4" />
      case 'progress':
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reports</CardTitle>
        <CardDescription>
          View and download generated reports
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {getTypeIcon(report.type)}
                    <div>
                      <p className="font-medium">{report.title}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {report.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  {report.studentName ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={report.studentAvatar} />
                        <AvatarFallback className="text-xs">
                          {report.studentName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{report.studentName}</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">All Students</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(report.generatedDate).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  {report.score ? (
                    <span className="font-medium">{report.score}%</span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  {getStatusBadge(report.status)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" disabled={report.status !== 'completed'}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
