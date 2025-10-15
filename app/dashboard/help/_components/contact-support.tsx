"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/config/site"

export function ContactSupport() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Still Need Help?</h2>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Email Support</span>
          </CardTitle>
          <CardDescription>
            Send us an email and we&apos;ll get back to you within 24 hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
