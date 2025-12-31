"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Eye } from "lucide-react"
import { UserDetailsHeader } from "./user-details-header"
import { UserBasicInfo } from "./user-basic-info"
import { UserCourses } from "./user-courses"
import { UserPayments } from "./user-payments"
import { UserActivity } from "./user-activity"

interface UserCourse {
  title: string
  enrolledAt: string
  progress: number
}

interface UserPayment {
  description: string
  amount: number
  date: string
}

interface UserInterview {
  id: string
  title: string
  status: string
  attempts: number
}

interface UserDetails {
  id: string
  name: string
  email: string
  role: string
  status: string
  userType: string
  totalLogins: number
  collegeName?: string
  createdAt: string
  lastLogin: string
  courses: UserCourse[]
  payments: UserPayment[]
  interviews: UserInterview[]
  totalIncome: number
}

interface UserDetailsPageProps {
  userId: string
}

export function UserDetailsPage({ userId }: UserDetailsPageProps) {
  const router = useRouter()
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/admin/user-details?userId=${userId}`)
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch user details')
        }

        setUserDetails(result.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    if (userId) {
      fetchUserDetails()
    }
  }, [userId])

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading user details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !userDetails) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'User not found'}</p>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <UserDetailsHeader userDetails={userDetails} onBack={() => router.back()} />

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-6">
          <UserBasicInfo userDetails={userDetails} />
        </TabsContent>

        <TabsContent value="courses" className="mt-6">
          <UserCourses courses={userDetails.courses} />
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <UserPayments payments={userDetails.payments} totalIncome={userDetails.totalIncome} />
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <UserActivity
            userDetails={userDetails}
            interviews={userDetails.interviews}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
