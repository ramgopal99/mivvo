import Link from "next/link"
import Image from "next/image"
import { siteConfig } from "@/config/site"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
  showSignUp: boolean
  showSignIn: boolean
}

export function AuthLayout({ 
  children, 
  title, 
  subtitle, 
  showSignUp, 
  showSignIn 
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Column - Gradient Background */}
      <div className="h-48 lg:h-auto lg:w-1/2 bg-gradient-to-br from-primary via-primary/80 to-primary/20 relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary/30" />
        
        {/* Logo */}
        <div className="absolute top-4 left-4 lg:top-8 lg:left-8 z-10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={24}
                height={24}
                className="w-6 h-6 lg:w-8 lg:h-8"
              />
            </div>
            <span className="text-white font-semibold text-lg lg:text-xl">Mivvo</span>
          </div>
        </div>

        {/* Tagline */}
        <div className="absolute bottom-4 left-4 lg:bottom-8 lg:left-8 z-10">
          <h2 className="text-white text-2xl lg:text-4xl font-bold leading-tight">
            Unleash your potential
            <br />
            with AI-powered interviews
            <span className="ml-2">🚀</span>
          </h2>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 right-8 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 right-16 w-24 h-24 bg-white/5 rounded-full blur-lg" />
      </div>

      {/* Right Column - Auth Form */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {title}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {subtitle}
            </p>
          </div>

          <div className="mt-8">
            {children}
          </div>

          {/* Navigation Links */}
          <div className="mt-6 text-center">
            {showSignUp && (
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer"
                >
                  Sign up
                </Link>
              </p>
            )}
            {showSignIn && (
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer"
                >
                  Sign in
                </Link>
              </p>
            )}
          </div>

          {/* Back to home */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
