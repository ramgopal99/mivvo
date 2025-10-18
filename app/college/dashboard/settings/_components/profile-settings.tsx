/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Save, Loader2 } from "lucide-react"

interface CollegeProfile {
  id: string
  collegeId: string
  name: string
  email: string
  description?: string
  location?: string
  website?: string
  phone?: string
  establishedYear?: number
}

export function ProfileSettings() {
  const [profile, setProfile] = useState<CollegeProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    loadCollegeProfile()
  }, [])

  const loadCollegeProfile = async () => {
    setIsLoading(true)
    try {
      // First try to load from localStorage for immediate display
      const collegeData = localStorage.getItem('college_data')
      if (collegeData) {
        const college = JSON.parse(collegeData)
        setProfile(college)
      }

      // Then fetch fresh data from API
      const token = localStorage.getItem('college_token')
      if (token) {
        const response = await fetch('/api/college/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setProfile(data.data)
            // Update localStorage with fresh data
            localStorage.setItem('college_data', JSON.stringify(data.data))
          }
        }
      }
    } catch (error) {
      console.error('Error loading college profile:', error)
      setMessage({ type: 'error', text: 'Failed to load college profile' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof CollegeProfile, value: string | number) => {
    if (!profile) return
    setProfile(prev => prev ? { ...prev, [field]: value } : null)
  }

  const handleSave = async () => {
    if (!profile) return

    setIsSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/college/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('college_token')}`
        },
        body: JSON.stringify(profile)
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Update localStorage with new data
        localStorage.setItem('college_data', JSON.stringify(data.data))
        setMessage({ type: 'success', text: 'College profile updated successfully!' })

        // Update the header by triggering a re-render
        window.location.reload()
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update profile' })
      }
    } catch (error) {
      console.error('Save error:', error)
      setMessage({ type: 'error', text: 'An error occurred while saving' })
    } finally {
      setIsSaving(false)
    }
  }

  if (!profile) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading profile...</span>
        </CardContent>
      </Card>
    )
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          College Profile
        </CardTitle>
        <CardDescription>
          Update your college information and contact details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {message && (
          <Alert variant={message.type === 'success' ? 'default' : 'destructive'}>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src="" />
            <AvatarFallback className="text-2xl">
              {profile.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              College logo/avatar
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="college-name">College Name</Label>
            <Input
              id="college-name"
              value={profile.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="college-code">College ID</Label>
            <Input
              id="college-code"
              value={profile.collegeId}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">College ID cannot be changed</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Brief description of your college..."
            value={profile.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Contact Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Contact Phone</Label>
            <Input
              id="phone"
              value={profile.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://yourcollege.edu"
              value={profile.website || ''}
              onChange={(e) => handleInputChange('website', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="established-year">Established Year</Label>
            <Input
              id="established-year"
              type="number"
              placeholder="2020"
              value={profile.establishedYear || ''}
              onChange={(e) => handleInputChange('establishedYear', parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="City, State/Country"
            value={profile.location || ''}
            onChange={(e) => handleInputChange('location', e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
