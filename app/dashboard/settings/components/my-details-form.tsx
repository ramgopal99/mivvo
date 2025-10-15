"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updateUserDetails } from "../actions"
import { UserData } from "../types"

interface MyDetailsFormProps {
  userData: UserData
}

export function MyDetailsForm({ userData }: MyDetailsFormProps) {
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    setMessage("")

    try {
      const formData = new FormData(e.currentTarget)

      const result = await updateUserDetails(formData)

      if (result.success) {
        setMessage("Profile updated successfully!")
        // Optionally redirect or refresh the page
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      } else {
        setMessage(result.error || "Failed to update profile")
      }
    } catch {
      setMessage("An error occurred while updating profile")
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return ""
    return new Date(date).toISOString().split('T')[0]
  }


  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
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
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  defaultValue={userData?.firstName || ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  defaultValue={userData?.lastName || ""}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={userData?.email || ""}
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
              <Label htmlFor="jobTitle">Current Job Title</Label>
              <Input
                id="jobTitle"
                name="jobTitle"
                placeholder="Software Engineer"
                defaultValue={userData?.jobTitle || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Current Company</Label>
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
          </CardContent>
        </Card>


        {/* Career Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Career Goals & Bio</CardTitle>
            <CardDescription>
              Share your career aspirations and professional background
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="careerGoals">Career Goals</Label>
              <Textarea
                id="careerGoals"
                name="careerGoals"
                placeholder="What are your career goals? What roles are you targeting?"
                rows={3}
                defaultValue={userData?.careerGoals || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell us about your professional background, achievements, and what makes you unique..."
                rows={4}
                defaultValue={userData?.bio || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedIn">LinkedIn Profile</Label>
              <Input
                id="linkedIn"
                name="linkedIn"
                placeholder="https://linkedin.com/in/yourprofile"
                defaultValue={userData?.linkedIn || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub Profile</Label>
              <Input
                id="github"
                name="github"
                placeholder="https://github.com/yourusername"
                defaultValue={userData?.github || ""}
              />
            </div>
          </CardContent>
        </Card>

        {message && (
          <div className={`p-4 rounded-md ${message.includes('successfully') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            {message}
          </div>
        )}

        <div className="flex justify-end pt-6">
          <Button type="submit" disabled={saving} className="px-8">
            {saving ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </form>
    </div>
  )
}
