"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowRight, Info } from "lucide-react"
import Link from "next/link"
import { landingConfig } from "../../config/landing-config"

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-pink-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            {landingConfig.pricing.header.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            {landingConfig.pricing.header.subtitle}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {landingConfig.pricing.plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col p-4 sm:p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                plan.isPopular
                  ? "border-2 border-primary bg-gradient-to-br from-primary/5 to-white sm:transform sm:scale-105"
                  : "border border-gray-200 bg-white hover:border-primary/30"
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-md uppercase tracking-wide">
                  Most Popular
                </div>
              )}

              {/* Info Icon for Free Plan */}
              {plan.name === "Free" && (
                <div className="absolute top-4 right-4 group">
                  <Info className="h-5 w-5 text-gray-400 hover:text-primary cursor-help transition-colors" />
                  <div className="absolute right-0 top-6 w-40 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-lg">
                    <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                    1 min = 12 credits
                  </div>
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
          <p className="text-gray-600">
            {landingConfig.pricing.header.additionalInfo}
          </p>
        </div>
      </div>
    </section>
  )
}
