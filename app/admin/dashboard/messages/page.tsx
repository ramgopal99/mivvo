"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, HelpCircle } from "lucide-react"
import { toast } from "sonner"
import {
  MessagesStats,
  MessagesFilters,
  ContactMessagesList,
  SupportTicketsList,
  Pagination,
  MessageDialog,
  ReplyDialog
} from "./_components"

interface ContactMessage {
  id: string
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
  status: string
  createdAt: string
  updatedAt: string
}

interface SupportTicket {
  id: string
  ticketId: string
  subject: string
  category: string
  status: string
  description: string
  userId: string
  createdAt: string
  updatedAt: string
  resolution?: string
  reply?: {
    subject: string
    message: string
    from: string
    date: string
  }
  user?: {
    name?: string
    email: string
  }
}

export default function AdminMessagesPage() {
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([])
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [activeTab, setActiveTab] = useState("contact")

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)

  // Reply dialog state
  const [replyDialogOpen, setReplyDialogOpen] = useState(false)
  const [selectedTicketForReply, setSelectedTicketForReply] = useState<SupportTicket | null>(null)
  const [replyLoading, setReplyLoading] = useState(false)

  // Pagination state for contact messages
  const [contactPagination, setContactPagination] = useState({
    page: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false
  })

  // Pagination state for support tickets
  const [supportPagination, setSupportPagination] = useState({
    page: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false
  })

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchContactMessages = async (page = 1) => {
    try {
      const response = await fetch(`/api/admin/messages?page=${page}&limit=10`)
      if (response.ok) {
        const data = await response.json()
        setContactMessages(data.messages)
        setContactPagination(data.pagination)
      }
    } catch (error) {
      console.error('Failed to fetch contact messages:', error)
    }
  }

  const fetchSupportTickets = async (page = 1) => {
    try {
      const response = await fetch(`/api/admin/support-tickets?page=${page}&limit=10`)
      if (response.ok) {
        const data = await response.json()
        // Combine pending and completed tickets
        const allTickets = [
          ...data.data.pending,
          ...data.data.completed
        ]
        setSupportTickets(allTickets)
        setSupportPagination(data.pagination)
      }
    } catch (error) {
      console.error('Failed to fetch support tickets:', error)
    }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch contact messages (first page)
      await fetchContactMessages(1)

      // Fetch support tickets (first page)
      await fetchSupportTickets(1)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const completedTickets = supportTickets.filter(ticket => ticket.status === 'COMPLETED').length

  const filteredContactMessages = contactMessages.filter(message => {
    const matchesSearch = searchTerm === "" ||
      message.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  const handleContactPageChange = async (newPage: number) => {
    setLoading(true)
    await fetchContactMessages(newPage)
    setLoading(false)
  }

  const handleSupportPageChange = async (newPage: number) => {
    setLoading(true)
    await fetchSupportTickets(newPage)
    setLoading(false)
  }

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message)
    setSelectedTicket(null)
    setDialogOpen(true)
  }

  const handleViewTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket)
    setSelectedMessage(null)
    setDialogOpen(true)
  }

  const handleReply = (item: ContactMessage | SupportTicket) => {
    // Check if it's a support ticket (only support tickets can be replied to)
    if ('ticketId' in item) {
      const ticket = item as SupportTicket
      setSelectedTicketForReply(ticket)
      setReplyDialogOpen(true)
    } else {
      // It's a contact message - show message that replies are not supported for contact messages
      toast.info('Replies are not available for contact messages. Use the "Mark Complete" button instead.')
    }
  }

  const handleReplySubmit = async (subject: string, message: string, resolution?: string) => {
    if (!selectedTicketForReply) return

    setReplyLoading(true)
    try {
      const response = await fetch('/api/admin/support-tickets', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticketId: selectedTicketForReply.ticketId,
          action: 'reply_and_complete',
          reply: {
            subject,
            message,
            from: 'Support Team'
          },
          resolution: resolution || undefined
        })
      })

      if (response.ok) {
          toast.success('Reply sent and ticket marked as complete!')
        setReplyDialogOpen(false)
        setSelectedTicketForReply(null)
        // Refresh the data
        await fetchData()
      } else {
        toast.error('Failed to send reply and mark complete')
      }
    } catch (error) {
      console.error('Error sending reply and marking complete:', error)
      alert('Failed to send reply and mark complete')
    } finally {
      setReplyLoading(false)
    }
  }


  const filteredSupportTickets = supportTickets.filter(ticket => {
    const matchesSearch = searchTerm === "" ||
      ticket.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Messages & Support</h1>
            <p className="text-muted-foreground">Loading data...</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Messages & Support</h1>
            <p className="text-gray-600 mt-1">
              View and manage contact messages and support tickets from users
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-blue-600" />
                <div>
                  <div className="text-sm font-medium text-blue-900">{contactPagination.totalCount}</div>
                  <div className="text-xs text-blue-600">Messages</div>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-2">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-purple-600" />
                <div>
                  <div className="text-sm font-medium text-purple-900">{supportPagination?.totalCount || 0}</div>
                  <div className="text-xs text-purple-600">Tickets</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <MessagesStats
        totalCount={contactPagination.totalCount + (supportPagination?.totalCount || 0)}
        contactMessageCount={contactPagination.totalCount}
        supportTicketCount={supportPagination?.totalCount || 0}
        completedTickets={completedTickets}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-1">
          <TabsList className="grid w-full grid-cols-2 bg-transparent h-auto p-0">
            <TabsTrigger
              value="contact"
              className="flex items-center gap-3 px-6 py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200 text-gray-600 data-[state=active]:text-gray-900"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-100 text-blue-600">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Contact Messages</div>
                </div>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="support"
              className="flex items-center gap-3 px-6 py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200 text-gray-600 data-[state=active]:text-gray-900"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-100 text-purple-600">
                  <HelpCircle className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Support Tickets</div>
                </div>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Filters */}
        <MessagesFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          activeTab={activeTab}
          onRefresh={fetchData}
          totalCount={activeTab === 'contact' ? contactPagination.totalCount : (supportPagination?.totalCount || 0)}
          filteredCount={activeTab === 'contact' ? filteredContactMessages.length : filteredSupportTickets.length}
        />

        <TabsContent value="contact" className="space-y-4">
          <ContactMessagesList
            messages={filteredContactMessages}
            onMessageClick={handleViewMessage}
          />

          <Pagination
            currentPage={contactPagination.page}
            totalPages={contactPagination.totalPages}
            onPageChange={handleContactPageChange}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="support" className="space-y-4">
          <SupportTicketsList
            tickets={filteredSupportTickets}
            onTicketClick={handleViewTicket}
            onReplyClick={handleReply}
          />

          <Pagination
            currentPage={supportPagination?.page || 1}
            totalPages={supportPagination?.totalPages || 0}
            onPageChange={handleSupportPageChange}
            loading={loading}
          />
        </TabsContent>
      </Tabs>

      {/* Message Dialog */}
      <MessageDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        message={selectedMessage}
        ticket={selectedTicket}
      />

      {/* Reply Dialog */}
      <ReplyDialog
        open={replyDialogOpen}
        onOpenChange={setReplyDialogOpen}
        ticket={selectedTicketForReply}
        onSubmit={handleReplySubmit}
        loading={replyLoading}
      />
    </div>
  )
}
