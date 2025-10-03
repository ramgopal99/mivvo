import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600">
              Last updated: January 15, 2025
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Introduction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              At Mivvo, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use 
              our AI-powered mock interview platform.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              By using our service, you agree to the collection and use of information in accordance with this policy. 
              If you do not agree with our policies and practices, please do not use our service.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Name and email address when you create an account</li>
                <li>Profile information you choose to provide</li>
                <li>Interview responses and performance data</li>
                <li>Communication preferences and feedback</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Usage Information</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Interview session recordings and transcripts</li>
                <li>Performance analytics and improvement suggestions</li>
                <li>Platform usage patterns and feature interactions</li>
                <li>Device information and browser type</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Information</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>IP address and location data</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Log files and system information</li>
                <li>Error reports and performance metrics</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Provision</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Conduct AI-powered mock interviews</li>
                <li>Generate performance analysis and feedback</li>
                <li>Provide personalized improvement recommendations</li>
                <li>Maintain and improve our platform functionality</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Communication</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Send important service updates and notifications</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Provide educational content and tips</li>
                <li>Share relevant product updates and features</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Analytics and Improvement</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Analyze usage patterns to improve our AI models</li>
                <li>Develop new features and enhance existing ones</li>
                <li>Conduct research and development</li>
                <li>Ensure platform security and prevent fraud</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Data Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              We implement industry-standard security measures to protect your personal information:
            </p>
            
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Encryption:</strong> All data is encrypted in transit and at rest using AES-256 encryption</li>
              <li><strong>Access Controls:</strong> Strict access controls limit who can view your personal information</li>
              <li><strong>Regular Audits:</strong> We conduct regular security audits and vulnerability assessments</li>
              <li><strong>Secure Infrastructure:</strong> Our platform is hosted on secure, SOC 2 compliant cloud infrastructure</li>
              <li><strong>Data Minimization:</strong> We only collect and retain data necessary for our services</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              You have the following rights regarding your personal information:
            </p>
            
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
              <li><strong>Restriction:</strong> Limit how we process your data</li>
              <li><strong>Objection:</strong> Object to certain types of data processing</li>
            </ul>
            
            <p className="text-gray-700 leading-relaxed">
              To exercise these rights, please contact us at privacy@mivvo.com. We will respond to your request 
              within 30 days.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Data Retention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information only as long as necessary to provide our services and fulfill 
              the purposes outlined in this Privacy Policy:
            </p>
            
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Account Data:</strong> Retained while your account is active and for 2 years after closure</li>
              <li><strong>Interview Data:</strong> Retained for 1 year to provide historical performance tracking</li>
              <li><strong>Analytics Data:</strong> Aggregated and anonymized data may be retained indefinitely</li>
              <li><strong>Legal Requirements:</strong> Some data may be retained longer to comply with legal obligations</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              We may use third-party services to enhance our platform functionality:
            </p>
            
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Cloud Storage:</strong> Secure cloud storage for data processing and backup</li>
              <li><strong>Analytics:</strong> Anonymous usage analytics to improve our services</li>
              <li><strong>Communication:</strong> Email and notification services</li>
              <li><strong>AI Services:</strong> Third-party AI models for interview analysis</li>
            </ul>
            
            <p className="text-gray-700 leading-relaxed">
              All third-party services are carefully vetted and required to maintain the same level of data 
              protection as outlined in this Privacy Policy.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes 
              by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              Your continued use of our service after any modifications to this Privacy Policy will constitute 
              your acknowledgment of the modifications and your consent to abide and be bound by the modified 
              Privacy Policy.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700"><strong>Email:</strong> privacy@mivvo.com</p>
              <p className="text-gray-700"><strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105</p>
              <p className="text-gray-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
