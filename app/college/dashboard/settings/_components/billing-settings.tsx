"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  CreditCard,
  Calendar,
  DollarSign,
  Download,
  AlertTriangle,
  CheckCircle,
  Receipt
} from "lucide-react"

interface BillingPlan {
  name: string
  price: number
  period: string
  features: string[]
  current: boolean
}

interface BillingSettingsProps {
  currentPlan?: BillingPlan
  usageStats?: {
    studentsUsed: number
    studentsLimit: number
    interviewsUsed: number
    interviewsLimit: number
    storageUsed: number
    storageLimit: number
  }
  billingHistory?: {
    id: string
    date: string
    amount: number
    status: 'paid' | 'pending' | 'failed'
    description: string
  }[]
}

export function BillingSettings({
  currentPlan = {
    name: "Professional",
    price: 49,
    period: "month",
    features: [
      "Up to 200 students",
      "Unlimited interviews",
      "Advanced analytics",
      "Priority support",
      "API access"
    ],
    current: true
  },
  usageStats = {
    studentsUsed: 145,
    studentsLimit: 200,
    interviewsUsed: 1250,
    interviewsLimit: -1, // -1 means unlimited
    storageUsed: 2.3,
    storageLimit: 10
  },
  billingHistory = [
    {
      id: "inv-001",
      date: "2024-01-01",
      amount: 49.00,
      status: "paid",
      description: "Professional Plan - January 2024"
    },
    {
      id: "inv-002",
      date: "2023-12-01",
      amount: 49.00,
      status: "paid",
      description: "Professional Plan - December 2023"
    },
    {
      id: "inv-003",
      date: "2023-11-01",
      amount: 49.00,
      status: "paid",
      description: "Professional Plan - November 2023"
    }
  ]
}: BillingSettingsProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Current Plan
          </CardTitle>
          <CardDescription>
            Your current subscription and billing information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{currentPlan.name} Plan</h3>
              <p className="text-2xl font-bold text-primary">
                ${currentPlan.price}
                <span className="text-sm font-normal text-muted-foreground">
                  /{currentPlan.period}
                </span>
              </p>
            </div>
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="mr-1 h-3 w-3" />
              Active
            </Badge>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Plan Features:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {currentPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-2 pt-4">
            <Button>Upgrade Plan</Button>
            <Button variant="outline">Change Plan</Button>
            <Button variant="outline">Cancel Subscription</Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Usage Statistics
          </CardTitle>
          <CardDescription>
            Track your current usage against plan limits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Students</span>
              <span className="font-medium">
                {usageStats.studentsUsed} / {usageStats.studentsLimit === -1 ? 'Unlimited' : usageStats.studentsLimit}
              </span>
            </div>
            <Progress
              value={usageStats.studentsLimit === -1 ? 0 : (usageStats.studentsUsed / usageStats.studentsLimit) * 100}
              className="h-2"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Interviews</span>
              <span className="font-medium">
                {usageStats.interviewsUsed} / {usageStats.interviewsLimit === -1 ? 'Unlimited' : usageStats.interviewsLimit}
              </span>
            </div>
            <Progress
              value={usageStats.interviewsLimit === -1 ? 0 : (usageStats.interviewsUsed / usageStats.interviewsLimit) * 100}
              className="h-2"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Storage (GB)</span>
              <span className="font-medium">
                {usageStats.storageUsed} / {usageStats.storageLimit}
              </span>
            </div>
            <Progress
              value={(usageStats.storageUsed / usageStats.storageLimit) * 100}
              className="h-2"
            />
          </div>

          {(usageStats.studentsUsed / usageStats.studentsLimit > 0.8 ||
            usageStats.interviewsUsed / usageStats.interviewsLimit > 0.8 ||
            usageStats.storageUsed / usageStats.storageLimit > 0.8) && (
            <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                You&apos;re approaching your plan limits. Consider upgrading.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Billing History
              </CardTitle>
              <CardDescription>
                View and download your past invoices
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {billingHistory.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-lg">
                    <Receipt className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{invoice.description}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(invoice.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                    {getStatusBadge(invoice.status)}
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {billingHistory.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No billing history available.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
          <CardDescription>
            Manage your payment information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                ••••
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/26</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="mr-1 h-3 w-3" />
                Primary
              </Badge>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            <CreditCard className="mr-2 h-4 w-4" />
            Add Payment Method
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
