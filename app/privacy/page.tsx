import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/main"
import { Footer } from "@/components/main"
import { privacyConfig } from "@/config/pages"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-16">
              {privacyConfig.hero.title}
            </h1>
            <p className="text-xl text-gray-600">
              Last updated: {privacyConfig.lastUpdated}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{privacyConfig.introduction.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {privacyConfig.introduction.content.map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>

        {/* Dynamic Sections */}
        {privacyConfig.sections.map((section, sectionIndex) => (
          <Card key={sectionIndex} className="mt-8">
            <CardHeader>
              <CardTitle className="text-2xl">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Section Content */}
              {section.content && section.content.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {/* Subsections */}
              {section.subsections && section.subsections.map((subsection, subIndex) => (
                <div key={subIndex}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{subsection.title}</h3>
                  {Array.isArray(subsection.content) ? (
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {subsection.content.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700 leading-relaxed">{subsection.content}</p>
                  )}
                </div>
              ))}

              {/* List Items */}
              {section.listItems && (
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {section.listItems.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              )}

              {/* Additional Content */}
              {section.additionalContent && section.additionalContent.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* Contact Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">{privacyConfig.contact.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              {privacyConfig.contact.description}
            </p>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700"><strong>Email:</strong> {privacyConfig.contact.email}</p>
              <p className="text-gray-700"><strong>Address:</strong> {privacyConfig.contact.address}</p>
              <p className="text-gray-700"><strong>Phone:</strong> {privacyConfig.contact.phone}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
