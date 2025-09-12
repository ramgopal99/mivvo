"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Shield, Trash2 } from "lucide-react"
// Removed authentication import
import { useEffect, useState } from "react"
import { getUserDetails, updatePassword, deleteAccount } from "../actions"
import { UserData } from "../types"

export function ProfileTab() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [passwordMessage, setPasswordMessage] = useState("")
  const [deleteMessage, setDeleteMessage] = useState("")

  // Since authentication is removed, treat as non-Google user
  const isGoogleUser = false

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await getUserDetails()
        if (result.success && result.data) {
          setUserData(result.data)
        }
      } catch {
        console.error('Error fetching user data')
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPasswordMessage("")

    try {
      const formData = new FormData(e.currentTarget)
      const result = await updatePassword(formData)
      
      if (result.success) {
        setPasswordMessage("Password updated successfully!")
        // Clear form
        e.currentTarget.reset()
      } else {
        setPasswordMessage(result.error || "Failed to update password")
      }
    } catch {
      setPasswordMessage("An error occurred while updating password")
    }
  }

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return
    }

    try {
      const result = await deleteAccount()
      
      if (result.success) {
        setDeleteMessage("Account deleted successfully")
        // Redirect to sign out or home page
        window.location.href = "/"
      } else {
        setDeleteMessage(result.error || "Failed to delete account")
      }
    } catch {
      setDeleteMessage("An error occurred while deleting account")
    }
  }

  const formatMemberSince = (createdAt: Date | null) => {
    if (!createdAt) return "Member since January 2024"
    const date = new Date(createdAt)
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long' 
    }
    return `Member since ${date.toLocaleDateString('en-US', options)}`
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Overview</CardTitle>
            <CardDescription>
              Manage your profile visibility and basic information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-muted rounded-full animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse w-32" />
                <div className="h-3 bg-muted rounded animate-pulse w-48" />
                <div className="h-3 bg-muted rounded animate-pulse w-40" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Overview</CardTitle>
          <CardDescription>
            Manage your profile visibility and basic information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={userData?.image || "/placeholder-avatar.jpg"} alt="Profile" />
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-lg font-medium">{userData?.name || "Default User"}</h3>
              <p className="text-sm text-muted-foreground">{userData?.email || "user@example.com"}</p>
              <p className="text-sm text-muted-foreground">
                {userData?.createdAt ? formatMemberSince(userData.createdAt) : "Member since January 2024"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Security - Only show for non-Google users */}
      {!isGoogleUser && (
        <Card>
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
            <CardDescription>
              Manage your account security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handlePasswordUpdate}>
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" name="currentPassword" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" name="newPassword" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" required />
              </div>
              {passwordMessage && (
                <div className={`p-3 rounded-md text-sm ${
                  passwordMessage.includes('successfully') 
                    ? 'bg-green-50 text-green-800' 
                    : 'bg-red-50 text-red-800'
                }`}>
                  {passwordMessage}
                </div>
              )}
              <Button type="submit">
                <Shield className="mr-2 h-4 w-4" />
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Delete your account data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-destructive">Delete Account</Label>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all data
              </p>
            </div>
            <Button variant="destructive" size="sm" onClick={handleDeleteAccount}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
          {deleteMessage && (
            <div className={`p-3 rounded-md text-sm ${
              deleteMessage.includes('successfully') 
                ? 'bg-green-50 text-green-800' 
                : 'bg-red-50 text-red-800'
            }`}>
              {deleteMessage}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 