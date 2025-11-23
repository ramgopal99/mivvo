"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "lucide-react"
import { useState, useEffect } from "react"
import { updateUserDetails, getUserDetails } from "../../../../dashboard/settings/actions"

interface AdminGeneralSettingsProps {
  session?: any
}

export function AdminGeneralSettings({ session }: AdminGeneralSettingsProps) {
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [hasChanges, setHasChanges] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: ""
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        const result = await getUserDetails()
        if (result.success && result.data) {
          setUserData(result.data)
          setFormData({
            firstName: result.data.firstName || "",
            lastName: result.data.lastName || ""
          })
        } else {
          setError(result.error || "Failed to load user data")
        }
      } catch (err) {
        setError("An error occurred while loading user data")
      } finally {
        setLoading(false)
      }
    }

    if (session?.user?.id) {
      fetchUserData()
    } else {
      setLoading(false)
    }
  }, [session])

  useEffect(() => {
    if (userData) {
      const hasAnyChanges = formData.firstName !== (userData.firstName || "") || formData.lastName !== (userData.lastName || "")
      setHasChanges(hasAnyChanges)
    }
  }, [formData.firstName, formData.lastName, userData])

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    setMessage("")

    try {
      const formDataToSend = new FormData(e.currentTarget)

      const result = await updateUserDetails(formDataToSend)

      if (result.success) {
        setMessage("Name updated successfully!")
        // Update the session data if available
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      } else {
        setMessage(result.error || "Failed to update name")
      }
    } catch {
      setMessage("An error occurred while updating name")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-muted-foreground">Loading administrator details...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !userData) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <p className="text-red-600">{error || "Failed to load administrator data. Please try again."}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Administrator Details
          </CardTitle>
          <CardDescription>
            Update your name and view account information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={userData?.email || "admin@example.com"}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-xs text-gray-500">Email cannot be changed</p>
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Role</Label>
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 hover:bg-blue-100"
              >
                {userData?.role || "ADMIN"}
              </Badge>
            </div>

            {message && (
              <div className={`p-3 rounded-md text-sm ${
                message.includes('successfully')
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={saving || !hasChanges}>
                {saving ? "Saving..." : "Update Name"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
