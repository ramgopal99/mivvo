"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthLayout } from "../_components/auth-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Loader2, Users } from "lucide-react"
import Link from "next/link"

export default function CollegeStudentLoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/college-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Store token in localStorage (you might want to use a more secure method)
        localStorage.setItem('student_token', data.data.token)
        localStorage.setItem('user_data', JSON.stringify(data.data.user))

        console.log('College student login successful:', formData.email)
        router.push('/dashboard')
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      setError('An error occurred during login')
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="College Student Login"
      subtitle="Sign in with your college email and password."
      showSignUp={false}
      showSignIn={false}
    >
      <div className="space-y-6">
        {/* College Student Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">College Email</Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your college email (e.g., student@college.edu)"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="pr-10"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full h-12 text-base font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <Users className="mr-2 h-4 w-4" />
                Sign in as College Student
              </>
            )}
          </Button>
        </form>

        {/* Demo Credentials */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-green-900 mb-2">Demo Student Credentials</h4>
          <div className="text-xs text-green-700 space-y-1">
            <p><strong>Demo Student Email:</strong> demostudent@demo.edu</p>
            <p><strong>Password:</strong> student123</p>
            <p className="mt-2 text-xs text-green-600">
              This student belongs to the Demo College (ID: demo). Use the create-demo-college.ts script to create them.
            </p>
          </div>
        </div>

        {/* Back to main login */}
        <div className="text-center">
          <Link
            href="/auth/signin"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Google Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}
