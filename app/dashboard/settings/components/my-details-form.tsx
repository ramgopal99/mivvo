"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { updateUserDetails } from "../actions"
import { UserData } from "../types"
import { settingsFormSchema, SettingsFormValues } from "../schema"

interface MyDetailsFormProps {
  userData: UserData
  isCollegeStudent?: boolean
}

export function MyDetailsForm({ userData, isCollegeStudent = false }: MyDetailsFormProps) {
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
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
  })

  // Update form when userData changes
  useEffect(() => {
    form.reset({
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
  }, [userData, form])

  const onSubmit = async (data: SettingsFormValues) => {
    setSaving(true)
    setMessage("")

    try {
      // Normalize GitHub and LinkedIn URLs
      let githubUrl = data.github?.trim() || ""
      let linkedInUrl = data.linkedIn?.trim() || ""

      // Convert username to full URL if needed
      if (githubUrl && !githubUrl.startsWith("http")) {
        githubUrl = `https://github.com/${githubUrl}`
      }
      if (linkedInUrl && !linkedInUrl.startsWith("http")) {
        linkedInUrl = `https://linkedin.com/in/${linkedInUrl}`
      }

      const formData = new FormData()
      formData.append("firstName", data.firstName)
      formData.append("lastName", data.lastName)
      formData.append("phone", data.phone || "")
      formData.append("dateOfBirth", data.dateOfBirth || "")
      formData.append("jobTitle", data.jobTitle || "")
      formData.append("company", data.company || "")
      formData.append("location", data.location || "")
      formData.append("bio", data.bio || "")
      formData.append("careerGoals", data.careerGoals || "")
      formData.append("linkedIn", linkedInUrl)
      formData.append("github", githubUrl)
      formData.append("rollNumber", data.rollNumber || "")
      formData.append("branch", data.branch || "")
      formData.append("course", data.course || "")
      formData.append("courseDuration", data.courseDuration || "")
      formData.append("year", data.year || "")

      const result = await updateUserDetails(formData, isCollegeStudent ? userData.id : undefined)

      if (result.success) {
        setMessage("Profile updated successfully!")
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
      {/* User Type Display */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-primary">Account Type</h3>
              <p className="text-sm text-primary/80">
                Your current subscription plan
              </p>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                userData.userType === 'PRO'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {userData.userType || 'FREE'}
              </div>
              {userData.userType === 'FREE' && (
                <p className="text-xs text-gray-600 mt-1">Upgrade to unlock premium features</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Tech Corp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="San Francisco, CA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="careerGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Career Goals</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What are your career goals? What roles are you targeting?"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your professional background, achievements, and what makes you unique..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn Profile</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://linkedin.com/in/yourprofile or username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Profile</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/yourusername or username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              <FormField
                control={form.control}
                name="rollNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roll Number</FormLabel>
                    <FormControl>
                      <Input placeholder="DEMO2024001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="branch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Branch</FormLabel>
                      <FormControl>
                        <Input placeholder="Computer Science" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <FormControl>
                        <Input placeholder="Bachelor of Technology" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="courseDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="4 years" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Year</FormLabel>
                      <FormControl>
                        <Input placeholder="3rd Year" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
          <Button type="submit" disabled={saving} className="px-8">
            {saving ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </form>
      </Form>
    </div>
  )
}
