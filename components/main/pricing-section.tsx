"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { landingConfig } from "../../config/landing-config"

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-pink-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {landingConfig.pricing.header.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {landingConfig.pricing.header.subtitle}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {landingConfig.pricing.plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                plan.isPopular
                  ? "border-2 border-primary bg-gradient-to-br from-primary/5 to-white transform scale-105"
                  : "border border-gray-200 bg-white hover:border-primary/30"
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md uppercase tracking-wide">
                  Most Popular
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow">
                {/* Pricing */}
                <div className="text-center mb-8">
                  {plan.price === "Custom" ? (
                    <div className="text-5xl font-extrabold text-gray-900 mb-2">
                      {plan.price}
                    </div>
                  ) : (
                    <div className="text-5xl font-extrabold text-gray-900 mb-2">
                      {plan.currency}
                      {plan.price}
                      <span className="text-lg font-medium text-gray-500">
                        {plan.billingPeriod}
                      </span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 text-gray-700">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-8">
                <Link href={plan.cta.href} className="w-full">
                  <Button
                    size="lg"
                    variant={plan.buttonVariant}
                    className={`w-full text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
                      plan.buttonVariant === "default"
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl"
                        : "border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-md hover:shadow-lg"
                    }`}
                  >
                    {plan.cta.text}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            {landingConfig.pricing.header.additionalInfo}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Check className="h-4 w-4 text-primary mr-2" />
              Cancel anytime
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-primary mr-2" />
              Money-back guarantee
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-primary mr-2" />
              Secure payment
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
