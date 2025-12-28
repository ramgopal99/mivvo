"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { AuthLayout } from "../_components/auth-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Loader2, GraduationCap } from "lucide-react"
import Link from "next/link"

export default function CollegeAdminLoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { data: session } = useSession()

  // Check authentication status and redirect if already logged in
  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      // Check NextAuth session first
      if (session?.user) {
        router.push('/dashboard')
        return
      }

      // Check for college admin token
      const adminToken = localStorage.getItem('college_token')
      if (adminToken) {
        try {
          const response = await fetch('/api/auth/session', {
            headers: {
              'Authorization': `Bearer ${adminToken}`
            }
          })
          if (response.ok) {
            router.push('/college/dashboard')
            return
          }
        } catch (error) {
          console.error('Error checking admin auth:', error)
        }
      }

      // Check for college student token
      const studentToken = localStorage.getItem('student_token')
      if (studentToken) {
        try {
          const response = await fetch('/api/auth/session', {
            headers: {
              'Authorization': `Bearer ${studentToken}`
            }
          })
          if (response.ok) {
            router.push('/dashboard')
            return
          }
        } catch (error) {
          console.error('Error checking student auth:', error)
        }
      }
    }

    checkAuthAndRedirect()
  }, [session, router])

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
      const response = await fetch('/api/auth/college-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Store token in localStorage (you might want to use a more secure method)
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('user_data', JSON.stringify(data.data.user))

        console.log('College admin login successful')
        router.push('/college/dashboard')
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
      title="College Administrator Login"
      subtitle="Sign in to manage your college and students."
      showSignUp={false}
      showSignIn={false}
    >
      <div className="space-y-6">
        {/* College Admin Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your admin email (e.g., admin@college.edu)"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10"
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
                <GraduationCap className="mr-2 h-4 w-4" />
                Sign in as College Admin
              </>
            )}
          </Button>
        </form>

        {/* Demo Credentials */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials</h4>
          <div className="text-xs text-blue-700 space-y-1">
            <p><strong>Email:</strong> demo@gmail.com</p>
            <p><strong>Password:</strong> college123</p>
            <p><strong>Note:</strong> Use your college admin email to log in</p>
          </div>
        </div>

        {/* Back to main login */}
        <div className="text-center">
          <Link
            href="/auth/signin"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Student Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}
