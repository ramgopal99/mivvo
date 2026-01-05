"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ArrowLeft, Clock, MessageSquare, Eye, CheckCircle } from "lucide-react"

interface PendingTicket {
  id: string
  subject: string
  category: string
  status: string
  createdAt: string
  lastUpdate: string
  description?: string
}

interface CompletedTicket extends PendingTicket {
  resolution: string
  reply: {
    subject: string
    message: string
    from: string
    date: string
  }
}

interface TicketsData {
  pending: PendingTicket[]
  completed: CompletedTicket[]
}

export default function TicketsPage() {
  const router = useRouter()
  const [ticketsData, setTicketsData] = useState<TicketsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedReply, setSelectedReply] = useState<{
    subject: string
    message: string
    from: string
    date: string
  } | null>(null)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('/api/support')
        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setTicketsData(data.data)
          }
        }
      } catch (error) {
        console.error('Error fetching tickets:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTickets()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading your tickets...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => router.push('/dashboard/support')}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Support
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Support Tickets</h1>
            <p className="text-gray-600 mt-1">View your pending queries and support responses</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary">Total Tickets</CardTitle>
              <MessageSquare className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {(ticketsData?.pending.length || 0) + (ticketsData?.completed.length || 0)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Pending</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">
                {ticketsData?.pending.length || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">
                {ticketsData?.completed.length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tickets Tabs */}
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="pending" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Pending ({ticketsData?.pending.length || 0})
                </TabsTrigger>
                <TabsTrigger value="completed" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Completed ({ticketsData?.completed.length || 0})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4">
                {ticketsData?.pending.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Tickets</h3>
                    <p className="text-gray-600">You don&apos;t have any pending support tickets at the moment.</p>
                  </div>
                ) : (
                  ticketsData?.pending.map((ticket: PendingTicket) => (
                    <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{ticket.subject}</h4>
                            <p className="text-sm text-gray-600 mb-2">{ticket.category}</p>
                            {ticket.description && (
                              <p className="text-sm text-gray-700 leading-relaxed">{ticket.description}</p>
                            )}
                          </div>
                          <Badge
                            variant={ticket.status === 'In Progress' ? 'default' : 'secondary'}
                            className="ml-4"
                          >
                            {ticket.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <span>Ticket #{ticket.id}</span>
                            <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {ticketsData?.completed.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Completed Tickets</h3>
                    <p className="text-gray-600">You haven&apos;t had any tickets resolved yet.</p>
                  </div>
                ) : (
                  ticketsData?.completed.map((ticket: CompletedTicket) => (
                    <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{ticket.subject}</h4>
                            <p className="text-sm text-gray-600 mb-2">{ticket.category}</p>
                            <p className="text-sm text-gray-700 leading-relaxed">{ticket.description}</p>
                          </div>
                          <Badge variant="default" className="bg-green-600">
                            {ticket.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-3">
                          <h5 className="font-medium text-green-800 mb-2">Resolution</h5>
                          <p className="text-sm text-green-700 leading-relaxed">
                            {ticket.resolution}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Ticket #{ticket.id}</span>
                          <div className="flex items-center gap-2">
                            <span>Resolved: {new Date(ticket.lastUpdate).toLocaleDateString()}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedReply(ticket.reply)}
                              className="h-7 text-xs cursor-pointer"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View Reply
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Reply Dialog */}
        {selectedReply && (
          <Dialog open={true} onOpenChange={() => setSelectedReply(null)}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  {selectedReply.subject}
                </DialogTitle>
                <DialogDescription>
                  Support response from {selectedReply.from}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-800">From: {selectedReply.from}</span>
                    <span className="text-xs text-blue-600">
                      {new Date(selectedReply.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-blue-700 leading-relaxed whitespace-pre-wrap">
                    {selectedReply.message}
                  </p>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setSelectedReply(null)} variant="outline" className="cursor-pointer">
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
