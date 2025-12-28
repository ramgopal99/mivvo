"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, MessageSquare } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { siteConfig } from "@/config/site"
import { landingConfig } from "../../config/landing-config"
import { Navbar } from "@/components/main"
import { redirect } from "next/navigation"

export default function PricingPage() {
  // Check if pricing is enabled
  if (!siteConfig.enablePricing) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <Navbar />
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Join Our AI Interview Beta
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience the future of interview preparation with our AI-powered mock interviews. Start with 180 free credits.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-8">
              <Zap className="h-4 w-4 text-green-500" />
              <span>180 credits free • No credit card required • Pro version coming soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {landingConfig.pricing.plans.filter(plan => plan.name !== "Pro").map((plan) => (
              <Card
                key={plan.name}
                className={`relative ${
                  plan.isPopular
                    ? 'border-2 border-primary shadow-xl scale-105'
                    : 'border border-gray-200'
                }`}
              >
                {plan.isPopular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white">
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      {plan.currency && (
                        <span className="text-3xl font-bold text-gray-900">{plan.currency}</span>
                      )}
                      <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                      {plan.billingPeriod && (
                        <span className="text-gray-600 ml-1">{plan.billingPeriod}</span>
                      )}
                    </div>
                  </div>
                  <CardDescription className="text-gray-600 mt-4">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Link href={plan.cta.href} className="w-full">
                    <Button
                      variant={plan.buttonVariant}
                      size="lg"
                      className="w-full cursor-pointer"
                    >
                      {plan.cta.text}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="pt-16 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Everything you need to know about our pricing</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4 mb-4">
            <AccordionItem value="credits" className="border border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="text-lg font-semibold text-gray-900">What are credits?</span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6">
                Credits are used to conduct mock interviews. Each interview consumes credits based on its duration and complexity.
              </AccordionContent>
            </AccordionItem>

            {/* <AccordionItem value="upgrade" className="border border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="text-lg font-semibold text-gray-900">What happens when credits finish?</span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6">
                You can add on credits anytime.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="expire" className="border border-gray-200 rounded-lg px-6 mb-4">
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="text-lg font-semibold text-gray-900">What happens to unused credits?</span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6">
                Credits expire 30 days after allocation. We recommend using them regularly to get the most value from your plan.
              </AccordionContent>
            </AccordionItem> */}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to join our AI interview beta?</h2>
          <p className="text-xl mb-8 opacity-90">Start with 180 free credits and experience the future of interview preparation. Enhance your skills with our growing course library.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-50 hover:shadow-xl hover:shadow-white/30 hover:scale-105 transition-all duration-300 font-semibold cursor-pointer"
              >
                <Zap className="w-5 h-5 mr-2" />
                Join Beta - 180 Credits Free
              </Button>
            </Link>
            <Link href="/courses">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:border-white hover:shadow-lg hover:shadow-white/25 transition-all duration-300 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
