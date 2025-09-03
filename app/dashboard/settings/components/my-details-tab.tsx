"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, User } from "lucide-react"
import { getUserDetails, updateUserDetails } from "../actions"
import { useSession } from "next-auth/react"
import { UserData } from "../types"

export function MyDetailsTab() {
  const { data: session } = useSession()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await getUserDetails()
        if (result.success && result.data) {
          setUserData(result.data as UserData)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    setMessage("")

    try {
      const formData = new FormData(e.currentTarget)
      const result = await updateUserDetails(formData)
      
      if (result.success) {
        setMessage("Profile updated successfully!")
        setUserData(result.data as UserData)
      } else {
        setMessage(result.error || "Failed to update profile")
      }
    } catch (error) {
      setMessage("An error occurred while updating profile")
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return ""
    return new Date(date).toISOString().split('T')[0]
  }

  // Extract first and last name from Google session data
  const getGoogleName = () => {
    if (!session?.user?.name) return { firstName: "", lastName: "" }
    
    const fullName = session.user.name
    const nameParts = fullName.trim().split(' ')
    
    if (nameParts.length === 1) {
      return { firstName: nameParts[0], lastName: "" }
    } else if (nameParts.length >= 2) {
      return { 
        firstName: nameParts[0], 
        lastName: nameParts.slice(1).join(' ') 
      }
    }
    
    return { firstName: "", lastName: "" }
  }

  const { firstName: googleFirstName, lastName: googleLastName } = getGoogleName()

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Profile Picture Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>
            Update your profile picture to personalize your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={userData?.image || session?.user?.image || "/placeholder-avatar.jpg"} alt="Profile" />
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button variant="outline" size="sm">
                <Camera className="mr-2 h-4 w-4" />
                Change Photo
              </Button>
              <p className="text-sm text-muted-foreground">
                JPG, PNG or GIF. Max size 2MB.
              </p>
              {session?.user?.image && (
                <p className="text-xs text-muted-foreground">
                  Using Google profile picture
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  name="firstName"
                  placeholder="John" 
                  defaultValue={userData?.firstName || googleFirstName || ""}
                />
                {googleFirstName && !userData?.firstName && (
                  <p className="text-xs text-muted-foreground">
                    Pre-filled from Google account
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  name="lastName"
                  placeholder="Doe" 
                  defaultValue={userData?.lastName || googleLastName || ""}
                />
                {googleLastName && !userData?.lastName && (
                  <p className="text-xs text-muted-foreground">
                    Pre-filled from Google account
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="john.doe@example.com" 
                value={userData?.email || session?.user?.email || ""}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone"
                placeholder="+1 (555) 123-4567" 
                defaultValue={userData?.phone || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input 
                id="dateOfBirth" 
                name="dateOfBirth"
                type="date" 
                defaultValue={formatDate(userData?.dateOfBirth)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
            <CardDescription>
              Add your professional details and work information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input 
                id="jobTitle" 
                name="jobTitle"
                placeholder="Software Engineer" 
                defaultValue={userData?.jobTitle || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input 
                id="company" 
                name="company"
                placeholder="Tech Corp" 
                defaultValue={userData?.company || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                name="location"
                placeholder="San Francisco, CA" 
                defaultValue={userData?.location || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input 
                id="bio" 
                name="bio"
                placeholder="Tell us about yourself..." 
                defaultValue={userData?.bio || ""}
              />
            </div>
          </CardContent>
        </Card>

        {message && (
          <div className={`p-4 rounded-md ${message.includes('successfully') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message}
          </div>
        )}

        <div className="flex justify-end pt-6">
          <Button type="submit" disabled={saving} className="px-8">
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
} 