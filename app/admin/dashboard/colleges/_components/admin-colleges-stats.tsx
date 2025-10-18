"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, CheckCircle, Clock, AlertTriangle } from "lucide-react"

interface AdminCollegesStatsProps {
  totalColleges: number
  activeColleges: number
  pendingColleges: number
  suspendedColleges: number
}

export function AdminCollegesStats({
  totalColleges,
  activeColleges,
  pendingColleges,
  suspendedColleges
}: AdminCollegesStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Colleges</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalColleges}</div>
          <p className="text-xs text-muted-foreground">
            Registered institutions
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Colleges</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeColleges}</div>
          <p className="text-xs text-muted-foreground">
            Fully operational
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingColleges}</div>
          <p className="text-xs text-muted-foreground">
            Awaiting verification
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Suspended</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{suspendedColleges}</div>
          <p className="text-xs text-muted-foreground">
            Temporarily disabled
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
