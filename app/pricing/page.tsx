"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Users, Target, Zap, MessageSquare } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CREDIT_PACKAGES, CREDIT_MULTIPLIER } from "@/config/site"
import { landingConfig } from "../../config/landing-config"
import { Navbar } from "@/components/main"

export default function PricingPage() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <Navbar />
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Simple pricing for all your needs
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Choose the plan that&apos;s right for you and start practicing today.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-8">
              <Zap className="h-4 w-4 text-green-500" />
              <span>{CREDIT_PACKAGES.FREE * CREDIT_MULTIPLIER} credits free • No credit card required</span>
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

      {/* Trust Indicators */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-8">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-gray-600 font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span className="text-gray-600 font-medium">10,000+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" />
                <span className="text-gray-600 font-medium">85% Success Rate</span>
              </div>
            </div>
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
          <h2 className="text-3xl font-bold mb-4">Ready to ace your next interview?</h2>
          <p className="text-xl mb-8 opacity-90">Start with {CREDIT_PACKAGES.FREE * CREDIT_MULTIPLIER} free credits and see the difference AI-powered practice makes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-50 hover:shadow-xl hover:shadow-white/30 hover:scale-105 transition-all duration-300 font-semibold cursor-pointer"
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:border-white hover:shadow-lg hover:shadow-white/25 transition-all duration-300 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
