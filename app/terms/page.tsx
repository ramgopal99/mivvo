import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Terms of Service
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
            <CardTitle className="text-2xl">Agreement to Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              These Terms of Service ("Terms") govern your use of Mivvo's AI-powered mock interview platform 
              ("Service") operated by Mivvo Inc. ("us", "we", or "our").
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree with 
              any part of these terms, then you may not access the Service.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Description of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Mivvo provides an AI-powered mock interview platform that helps users practice for job interviews 
              through realistic AI-conducted interviews, performance analysis, and personalized feedback.
            </p>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Features Include:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>AI-powered mock interviews across various job roles and industries</li>
                <li>Real-time performance analysis and feedback</li>
                <li>Detailed interview reports and improvement recommendations</li>
                <li>Practice sessions for technical, behavioral, and system design interviews</li>
                <li>Progress tracking and performance analytics</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">User Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Account Creation</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                <li>You must be at least 18 years old to use our Service</li>
                <li>One person or entity may maintain only one account</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Account Responsibilities</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>You are responsible for all activities that occur under your account</li>
                <li>You must notify us immediately of any unauthorized use of your account</li>
                <li>You may not share your account credentials with others</li>
                <li>We reserve the right to suspend or terminate accounts that violate these Terms</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Acceptable Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Permitted Uses</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Using the Service for legitimate interview preparation purposes</li>
                <li>Providing honest and constructive feedback about the Service</li>
                <li>Sharing your own interview experiences and results</li>
                <li>Using the Service in accordance with all applicable laws and regulations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Prohibited Uses</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Attempting to reverse engineer, hack, or compromise the Service</li>
                <li>Using the Service for any illegal or unauthorized purpose</li>
                <li>Interfering with or disrupting the Service or servers</li>
                <li>Attempting to gain unauthorized access to other users' accounts</li>
                <li>Uploading malicious code or harmful content</li>
                <li>Using the Service to harass, abuse, or harm others</li>
                <li>Violating any applicable laws or regulations</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Rights</h3>
              <p className="text-gray-700 leading-relaxed">
                The Service and its original content, features, and functionality are and will remain the 
                exclusive property of Mivvo and its licensors. The Service is protected by copyright, 
                trademark, and other laws.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Rights</h3>
              <p className="text-gray-700 leading-relaxed">
                You retain ownership of any content you provide to the Service, including interview responses 
                and feedback. By using the Service, you grant us a limited license to use this content to 
                provide and improve our services.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Feedback</h3>
              <p className="text-gray-700 leading-relaxed">
                Any feedback, comments, or suggestions you provide regarding the Service may be used by us 
                without any obligation to compensate you.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Payment and Billing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Free and Paid Services</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>We offer both free and paid tiers of our Service</li>
                <li>Free tier includes basic features and limited usage</li>
                <li>Paid tiers provide additional features and unlimited usage</li>
                <li>Pricing and features are subject to change with notice</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Billing Terms</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Subscription fees are billed in advance on a monthly or annual basis</li>
                <li>All fees are non-refundable except as required by law</li>
                <li>You may cancel your subscription at any time</li>
                <li>Access to paid features continues until the end of the current billing period</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Privacy and Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Your privacy is important to us. Our collection and use of personal information is governed 
              by our Privacy Policy, which is incorporated into these Terms by reference.
            </p>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Security</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>We implement appropriate security measures to protect your data</li>
                <li>Interview recordings and transcripts are encrypted and stored securely</li>
                <li>We do not share your personal data with third parties without consent</li>
                <li>You may request deletion of your data at any time</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Service Availability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Uptime and Maintenance</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>We strive to maintain high service availability but cannot guarantee 100% uptime</li>
                <li>Scheduled maintenance may temporarily interrupt service</li>
                <li>We will provide advance notice of planned maintenance when possible</li>
                <li>Emergency maintenance may occur without notice</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Modifications</h3>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify, suspend, or discontinue the Service at any time with or 
                without notice. We shall not be liable to you or any third party for any modification, 
                suspension, or discontinuation of the Service.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              To the maximum extent permitted by law, Mivvo shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages, including without limitation, loss of profits, data, 
              use, goodwill, or other intangible losses, resulting from your use of the Service.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              Our total liability to you for all damages shall not exceed the amount you paid us for the 
              Service in the 12 months preceding the claim.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Termination by You</h3>
              <p className="text-gray-700 leading-relaxed">
                You may terminate your account at any time by contacting us or using the account deletion 
                feature in your account settings.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Termination by Us</h3>
              <p className="text-gray-700 leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice or liability, 
                for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Effect of Termination</h3>
              <p className="text-gray-700 leading-relaxed">
                Upon termination, your right to use the Service will cease immediately. All provisions of 
                the Terms which by their nature should survive termination shall survive termination.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Governing Law</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be interpreted and governed by the laws of the State of California, United States, 
              without regard to its conflict of law provisions.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              Any disputes arising from these Terms or your use of the Service shall be resolved in the courts 
              of San Francisco County, California.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
              If a revision is material, we will try to provide at least 30 days notice prior to any new 
              terms taking effect.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              By continuing to access or use our Service after those revisions become effective, you agree 
              to be bound by the revised terms.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700"><strong>Email:</strong> legal@mivvo.com</p>
              <p className="text-gray-700"><strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105</p>
              <p className="text-gray-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
