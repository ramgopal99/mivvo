"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updateUserDetails } from "../actions"
import { UserData } from "../types"

interface MyDetailsFormProps {
  userData: UserData
  isCollegeStudent?: boolean
}

export function MyDetailsForm({ userData, isCollegeStudent = false }: MyDetailsFormProps) {
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [hasChanges, setHasChanges] = useState(false)


  // Form state
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    phone: userData?.phone || "",
    dateOfBirth: userData?.dateOfBirth ? new Date(userData.dateOfBirth).toISOString().split('T')[0] : "",
    jobTitle: userData?.jobTitle || "",
    company: userData?.company || "",
    location: userData?.location || "",
    bio: userData?.bio || "",
    careerGoals: userData?.careerGoals || "",
    linkedIn: userData?.linkedIn || "",
    github: userData?.github || "",
    rollNumber: userData?.rollNumber || "",
    branch: userData?.branch || "",
    course: userData?.course || "",
    courseDuration: userData?.courseDuration || "",
    year: userData?.year || ""
  })

  // Update form state when userData changes (for async loading)
  useEffect(() => {
    setFormData({
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      phone: userData?.phone || "",
      dateOfBirth: userData?.dateOfBirth ? new Date(userData.dateOfBirth).toISOString().split('T')[0] : "",
      jobTitle: userData?.jobTitle || "",
      company: userData?.company || "",
      location: userData?.location || "",
      bio: userData?.bio || "",
      careerGoals: userData?.careerGoals || "",
      linkedIn: userData?.linkedIn || "",
      github: userData?.github || "",
      rollNumber: userData?.rollNumber || "",
      branch: userData?.branch || "",
      course: userData?.course || "",
      courseDuration: userData?.courseDuration || "",
      year: userData?.year || ""
    })
  }, [userData])


  // Track changes
  useEffect(() => {
    const originalData = {
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      phone: userData?.phone || "",
      dateOfBirth: userData?.dateOfBirth ? new Date(userData.dateOfBirth).toISOString().split('T')[0] : "",
      jobTitle: userData?.jobTitle || "",
      company: userData?.company || "",
      location: userData?.location || "",
      bio: userData?.bio || "",
      careerGoals: userData?.careerGoals || "",
      linkedIn: userData?.linkedIn || "",
      github: userData?.github || "",
      rollNumber: userData?.rollNumber || "",
      branch: userData?.branch || "",
      course: userData?.course || "",
      courseDuration: userData?.courseDuration || "",
      year: userData?.year || ""
    }

    const hasAnyChanges = Object.keys(formData).some(key =>
      formData[key as keyof typeof formData] !== originalData[key as keyof typeof originalData]
    )
    setHasChanges(hasAnyChanges)
  }, [formData, userData])

  const handleInputChange = (field: string, value: string) => {
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
      const formData = new FormData(e.currentTarget)

      const result = await updateUserDetails(formData, isCollegeStudent ? userData.id : undefined)

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
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
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
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
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
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Current Company</Label>
              <Input
                id="company"
                name="company"
                placeholder="Tech Corp"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="San Francisco, CA"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
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
                value={formData.careerGoals}
                onChange={(e) => handleInputChange("careerGoals", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell us about your professional background, achievements, and what makes you unique..."
                rows={4}
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedIn">LinkedIn Profile</Label>
              <Input
                id="linkedIn"
                name="linkedIn"
                placeholder="https://linkedin.com/in/yourprofile"
                value={formData.linkedIn}
                onChange={(e) => handleInputChange("linkedIn", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub Profile</Label>
              <Input
                id="github"
                name="github"
                placeholder="https://github.com/yourusername"
                value={formData.github}
                onChange={(e) => handleInputChange("github", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>



        {/* College Information - Only show for college students */}
        {userData?.college && userData.college.collegeId && (
          <Card>
            <CardHeader>
              <CardTitle>College Information</CardTitle>
              <CardDescription>
                Your academic institution details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>College Name</Label>
                <Input
                  value={userData.college.name}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              <div className="space-y-2">
                <Label>College ID</Label>
                <Input
                  value={userData.college.collegeId}
                  disabled
                  className="bg-gray-50 font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Academic Information - Only show for college students */}
        {userData?.college && userData.college.collegeId && (
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>
                Update your academic details and current status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input
                  id="rollNumber"
                  name="rollNumber"
                  placeholder="DEMO2024001"
                  value={formData.rollNumber}
                  onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Input
                    id="branch"
                    name="branch"
                    placeholder="Computer Science"
                    value={formData.branch}
                    onChange={(e) => handleInputChange("branch", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Input
                    id="course"
                    name="course"
                    placeholder="Bachelor of Technology"
                    value={formData.course}
                    onChange={(e) => handleInputChange("course", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="courseDuration">Course Duration</Label>
                  <Input
                    id="courseDuration"
                    name="courseDuration"
                    placeholder="4 years"
                    value={formData.courseDuration}
                    onChange={(e) => handleInputChange("courseDuration", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Current Year</Label>
                  <Input
                    id="year"
                    name="year"
                    placeholder="3rd Year"
                    value={formData.year}
                    onChange={(e) => handleInputChange("year", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {message && (
          <div className={`p-4 rounded-md ${message.includes('successfully') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            {message}
          </div>
        )}

        <div className="flex justify-end pt-6">
          <Button type="submit" disabled={saving || !hasChanges} className="px-8">
            {saving ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </form>
    </div>
  )
}
