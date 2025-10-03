import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Target, Award, Lightbulb, ArrowRight, CheckCircle } from "lucide-react"
import { Navbar } from "@/components/main/navbar"
import { Footer } from "@/components/main/footer"
import { aboutConfig } from "@/config/pages"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 mt-16">
              {aboutConfig.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              {aboutConfig.hero.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {aboutConfig.hero.badges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {aboutConfig.mission.title}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {aboutConfig.mission.description}
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {aboutConfig.mission.additionalContent}
              </p>
              <div className="space-y-4">
                {aboutConfig.mission.stats.map((stat, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-gray-700">{stat}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl p-8">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-4">{aboutConfig.mission.statsDisplay.number}</div>
                  <div className="text-xl text-gray-700">{aboutConfig.mission.statsDisplay.label}</div>
                  <div className="text-sm text-gray-500 mt-2">{aboutConfig.mission.statsDisplay.sublabel}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {aboutConfig.values.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {aboutConfig.values.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutConfig.values.items.map((value, index) => {
              const IconComponent = {
                "Users": Users,
                "Target": Target,
                "Award": Award,
                "Lightbulb": Lightbulb
              }[value.icon] || Users;

              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {aboutConfig.team.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {aboutConfig.team.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutConfig.team.members.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">{member.initials}</span>
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {aboutConfig.cta.title}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {aboutConfig.cta.description}
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90">
            {aboutConfig.cta.buttonText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
