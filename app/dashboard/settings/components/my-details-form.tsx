"use client"

import { useState, useEffect, useRef } from "react"
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

  // Handle CV file selection
  const handleCvFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    if (!allowedTypes.includes(selectedFile.type)) {
      import('sonner').then(({ toast }) => {
        toast.error('Please select a PDF or DOCX file only.')
      })
      return
    }

    // Validate file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      import('sonner').then(({ toast }) => {
        toast.error('File size must be less than 10MB.')
      })
      return
    }

    setCvFile(selectedFile)
    setIsExtractingCV(true)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await fetch('/api/extract-file', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (response.ok && result.success) {
        const extractedText = result.data.extractedText
        handleInputChange("cv", extractedText)

        // Compress the CV text
        try {
          const compressionResponse = await fetch('/api/compress-cv', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cvText: extractedText }),
          })

          const compressionResult = await compressionResponse.json()

          if (compressionResponse.ok && compressionResult.success) {
            handleInputChange("cv", compressionResult.data.compressedCV)
            import('sonner').then(({ toast }) => {
              toast.success(`CV extracted and compressed successfully (${compressionResult.data.compressionRatio}% reduction)`)
            })
          } else {
            // Still save the original CV even if compression fails
            import('sonner').then(({ toast }) => {
              toast.success('CV extracted successfully (compression failed, but CV saved)')
            })
          }
        } catch (compressionError) {
          console.error('CV compression error:', compressionError)
          // Still save the original CV even if compression fails
          import('sonner').then(({ toast }) => {
            toast.success('CV extracted successfully (compression failed, but CV saved)')
          })
        }
      } else {
        throw new Error(result.message || 'Failed to extract text from CV')
      }
    } catch (error) {
      console.error('CV extraction error:', error)
      import('sonner').then(({ toast }) => {
        toast.error('Failed to extract text from CV. Please try again.')
      })
      setCvFile(null)
    } finally {
      setIsExtractingCV(false)
    }
  }

  // Clear CV file
  const clearCvFile = () => {
    setCvFile(null)
    handleInputChange("cv", "")
    setShowUploadInput(true) // Show upload input when CV is cleared
    if (cvInputRef.current) {
      cvInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
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
