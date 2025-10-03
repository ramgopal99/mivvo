"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { landingConfig } from "../../config/landing-config"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-sm border-b border-gray-200/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1">
            <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">
                {landingConfig.navigation.logo.icon}
              </span>
            </div>
            <span className="text-lg font-bold text-gray-900">
              {landingConfig.navigation.logo.text}
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center space-x-6">
            {landingConfig.navigation.links.map((link) => (
              <Link
                key={link.text}
                href={link.href}
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                {link.text}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {landingConfig.navigation.actions.map((action) => (
              <Link key={action.text} href={action.href}>
                <Button 
                  variant={action.variant} 
                  size="sm"
                  className={action.variant === "outline" 
                    ? "pl-4 pr-3 py-1.5 rounded-full bg-white text-gray-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium text-sm"
                    : "pl-4 pr-3 py-1.5 rounded-full bg-gray-900 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium text-sm"
                  }
                >
                  {action.text}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/30 backdrop-blur-sm rounded-lg mt-2 border border-gray-200/30">
              {landingConfig.navigation.links.map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.text}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                {landingConfig.navigation.actions.map((action) => (
                  <Link key={action.text} href={action.href} className="block px-3">
                    <Button 
                      variant={action.variant} 
                      size="sm"
                      className={`w-full ${action.variant === "outline" 
                        ? "pl-4 pr-3 py-1.5 rounded-full bg-white text-gray-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium text-sm"
                        : "pl-4 pr-3 py-1.5 rounded-full bg-gray-900 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium text-sm"
                      }`}
                    >
                      {action.text}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
