"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, Clock } from "lucide-react"
import { useState, useEffect } from "react"

interface LoginHistory {
  id: string
  timestamp: Date
  ipAddress: string
  userAgent: string
  location: string
  status: 'success' | 'failed'
}

export function SecuritySettings() {
  const [loginHistory, setLoginHistory] = useState<LoginHistory[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load login history when component mounts
    loadLoginHistory()
  }, [])

  const loadLoginHistory = async () => {
    setIsLoading(true)
    try {
      // In a real app, this would fetch from an API
      // For now, we'll simulate some login history data
      const mockHistory: LoginHistory[] = [
        {
          id: '1',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          ipAddress: '192.168.1.100',
          userAgent: 'Chrome 120.0.0.0 (Windows)',
          location: 'Mumbai, India',
          status: 'success'
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          ipAddress: '192.168.1.100',
          userAgent: 'Chrome 120.0.0.0 (Windows)',
          location: 'Mumbai, India',
          status: 'success'
        },
        {
          id: '3',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          ipAddress: '10.0.0.50',
          userAgent: 'Firefox 119.0 (Windows)',
          location: 'Mumbai, India',
          status: 'success'
        },
        {
          id: '4',
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
          ipAddress: '192.168.1.100',
          userAgent: 'Chrome 119.0.0.0 (Windows)',
          location: 'Mumbai, India',
          status: 'success'
        }
      ]
      setLoginHistory(mockHistory)
    } catch (error) {
      console.error('Error loading login history:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Security Overview
        </CardTitle>
        <CardDescription>
          Monitor account security and login activity
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="text-base font-medium">Login History</h4>
            <p className="text-sm text-muted-foreground">
              View your recent login activity and account access
            </p>
          </div>
          <Button
            variant="outline"
            onClick={loadLoginHistory}
            disabled={isLoading}
            className="cursor-pointer"
          >
            <Eye className="mr-2 h-4 w-4" />
            {isLoading ? 'Loading...' : 'Refresh'}
          </Button>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Device/Browser</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loginHistory.map((login) => (
                <TableRow key={login.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {formatDate(login.timestamp)}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {login.ipAddress}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {login.userAgent}
                  </TableCell>
                  <TableCell>{login.location}</TableCell>
                  <TableCell>
                    <Badge
                      variant={login.status === 'success' ? 'default' : 'destructive'}
                      className={login.status === 'success'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                      }
                    >
                      {login.status === 'success' ? 'Success' : 'Failed'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {loginHistory.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No login history available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Security Tips</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Regularly monitor your login activity</li>
            <li>• Change your password periodically</li>
            <li>• Use strong, unique passwords</li>
            <li>• Contact support if you see suspicious activity</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
