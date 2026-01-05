"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { LaunchBanner } from "./launch-banner"
import { useSession } from "next-auth/react"
import { landingConfig } from "../../config/landing-config"

export function Navbar({ remainingSpots = 847, totalSeats = 1000 }: { remainingSpots?: number; totalSeats?: number }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)

  // Check authentication status including college student and admin JWT tokens
  useEffect(() => {
    const checkAuth = async () => {
      // Check NextAuth session first
      if (session?.user) {
        setIsAuthenticated(true)
        setUserRole((session.user as { role?: string })?.role || 'USER')
        return
      }

      // Check for college student or admin JWT token via API
      const studentToken = localStorage.getItem('student_token')
      const collegeToken = localStorage.getItem('college_token')

      const token = studentToken || collegeToken

      if (token) {
        try {
          const response = await fetch('/api/auth/session', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

          if (response.ok) {
            const sessionData = await response.json()
            setIsAuthenticated(sessionData.authenticated || false)
            setUserRole(sessionData.user?.role || null)
          } else {
            setIsAuthenticated(false)
            setUserRole(null)
          }
        } catch (error) {
          console.error('Error checking college authentication:', error)
          setIsAuthenticated(false)
          setUserRole(null)
        }
      } else {
        setIsAuthenticated(false)
        setUserRole(null)
      }
    }

    checkAuth()
  }, [session])

  // Determine dashboard URL based on user role
  const dashboardUrl = userRole === 'COLLEGE_ADMIN' ? '/college/dashboard' : '/dashboard'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Launch Banner Section */}
      <div className="bg-primary text-primary-foreground py-2 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center text-sm">
          <span className="animate-bounce">🚀</span>
          <span className="font-bold">LAUNCH OFFER!</span>
          <span className="hidden sm:inline">Every course ₹149</span>
          <span className="font-bold underline hidden sm:inline">LIFETIME VALIDITY</span>
          <LaunchBanner variant="navbar" remainingSpots={remainingSpots} totalSeats={totalSeats} />
          <span className="hidden lg:inline">left at launch pricing!</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white/20 backdrop-blur-sm border-b border-gray-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2 cursor-pointer">
                <div className="w-8 h-8">
                  <Image 
                    src="/mivvo.svg" 
                    alt="Mivvo Logo" 
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-lg font-bold text-gray-900">
                  {landingConfig.navigation.logo.text}
                </span>
              </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center space-x-6">
            {landingConfig.navigation.links
              .map((link) => (
              <Link
                key={link.text}
                href={link.href}
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
              >
                {link.text}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <Link href={dashboardUrl}>
                <Button
                  variant="default"
                  size="sm"
                  className="pl-4 pr-3 py-1.5 rounded-full bg-gray-900 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium text-sm cursor-pointer"
                >
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button
                    variant="outline"
                    size="sm"
                    className="pl-4 pr-3 py-1.5 rounded-full bg-white text-gray-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium text-sm cursor-pointer"
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button
                    variant="default"
                    size="sm"
                    className="pl-4 pr-3 py-1.5 rounded-full bg-gray-900 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium text-sm"
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="cursor-pointer"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/30 backdrop-blur-sm rounded-lg mt-2 border border-gray-200/30">
              {landingConfig.navigation.links
                .map((link) => (
                  <Link
                    key={link.text}
                    href={link.href}
                    className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200 cursor-pointer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.text}
                  </Link>
                ))}
              <div className="pt-4 space-y-2">
                {isAuthenticated ? (
                  <Link href={dashboardUrl} className="block px-3">
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full pl-4 pr-3 py-1.5 rounded-full bg-gray-900 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium text-sm"
                    >
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/auth/signin" className="block px-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full pl-4 pr-3 py-1.5 rounded-full bg-white text-gray-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium text-sm"
                      >
                        Log in
                      </Button>
                    </Link>
                    <Link href="/auth/signup" className="block px-3">
                      <Button
                        variant="default"
                        size="sm"
                        className="w-full pl-4 pr-3 py-1.5 rounded-full bg-gray-900 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium text-sm"
                      >
                        Sign up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </nav>
  )
}
