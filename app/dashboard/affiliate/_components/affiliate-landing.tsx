import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface AffiliateLandingProps {
  onAffiliateCreated?: () => void
}

export function AffiliateLanding({ onAffiliateCreated }: AffiliateLandingProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleBecomeAffiliate = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/affiliate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok) {
        // Success - call callback to refresh data and show dashboard
        if (onAffiliateCreated) {
          onAffiliateCreated()
        } else {
          // Fallback: redirect if no callback provided
          router.push('/dashboard/affiliate')
          router.refresh()
        }
      } else {
        // Error - show alert
        alert(data.error || 'Failed to become an affiliate')
      }
    } catch (error) {
      console.error('Error becoming affiliate:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Affiliate Program
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join our exclusive affiliate program and earn generous commissions by referring new users to our platform.
            Share your unique referral link and get paid when people purchase courses through your recommendations.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border-2 border-primary/30 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <div className="text-3xl font-bold text-primary mb-2">20%</div>
            <div className="text-sm font-medium text-muted-foreground mb-1">Commission Rate</div>
            <div className="text-xs text-muted-foreground">On every course purchase</div>
          </div>
          <div className="bg-white border-2 border-primary/30 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⏰</span>
            </div>
            <div className="text-3xl font-bold text-primary mb-2">30 Days</div>
            <div className="text-sm font-medium text-muted-foreground mb-1">Per User Validity</div>
            <div className="text-xs text-muted-foreground">Each referral gets their own 30-day window</div>

          </div>
          <div className="bg-white border-2 border-primary/30 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔄</span>
            </div>
            <div className="text-3xl font-bold text-primary mb-2">∞</div>
            <div className="text-sm font-medium text-muted-foreground mb-1">Multiple Commissions</div>
            <div className="text-xs text-muted-foreground">Earn on every course they buy</div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold mb-2">Get Your Unique Link</h3>
                  <p className="text-sm text-muted-foreground">Join as an affiliate and receive your personalized referral link instantly.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold mb-2">Share Everywhere</h3>
                  <p className="text-sm text-muted-foreground">Share your link on social media, with friends, or embed it in your content.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold mb-2">30 Days Per User</h3>
                  <p className="text-sm text-muted-foreground">Each person who clicks your link gets their own 30-day validity period for purchases.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">4</div>
                <div>
                  <h3 className="font-semibold mb-2">Earn on Every Purchase</h3>
                  <p className="text-sm text-muted-foreground">Get 20% commission on every course they buy within their 30-day window.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">5</div>
                <div>
                  <h3 className="font-semibold mb-2">Track Everything</h3>
                  <p className="text-sm text-muted-foreground">Monitor your referrals, commissions, and earnings in real-time.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">6</div>
                <div>
                  <h3 className="font-semibold mb-2">Get Paid</h3>
                  <p className="text-sm text-muted-foreground">Receive payments for your successful referrals directly to your account.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border-2 border-primary/30">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-lg">🎯</span>
                Per-User 30-Day Validity
              </h3>
              <p className="text-sm text-muted-foreground">
                Unlike traditional affiliate programs, each user who clicks your link gets their own 30-day commission window.
                If User A clicks today, they have 30 days. If User B clicks tomorrow, they also get their own fresh 30 days.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-primary/30">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-lg">🔄</span>
                Multiple Commissions Per User
              </h3>
              <p className="text-sm text-muted-foreground">
                Earn commissions on every course purchase within the 30-day validity period.
                One referral can generate multiple commissions if they buy several courses.
              </p>
            </div>
          </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <Button
            size="lg"
            className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={handleBecomeAffiliate}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : '🚀 Become an Affiliate Now'}
          </Button>

          <p className="text-sm text-muted-foreground">
            By becoming an affiliate, you agree to our{' '}
            <a
              href="/terms"
              className="text-primary hover:underline cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              affiliate terms and conditions
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
