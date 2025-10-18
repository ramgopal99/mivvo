"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Search,
  MessageCircle,
  Phone,
  Mail,
  Clock
} from "lucide-react"

interface HelpSearchProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onContactSupport: () => void
}

export function HelpSearch({ searchTerm, onSearchChange, onContactSupport }: HelpSearchProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Search Help Center
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for help articles, FAQs, or guides..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
            <MessageCircle className="h-5 w-5 text-blue-500" />
            <div>
              <p className="font-medium">Live Chat</p>
              <p className="text-sm text-muted-foreground">Get instant help</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
            <Mail className="h-5 w-5 text-green-500" />
            <div>
              <p className="font-medium">Email Support</p>
              <p className="text-sm text-muted-foreground">support@mivvo.edu</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
            <Phone className="h-5 w-5 text-purple-500" />
            <div>
              <p className="font-medium">Phone Support</p>
              <p className="text-sm text-muted-foreground">1-800-MIVVO</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Support hours: Mon-Fri 9AM-6PM EST</span>
          </div>
          <Button onClick={onContactSupport} className="ml-auto">
            Contact Support
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
