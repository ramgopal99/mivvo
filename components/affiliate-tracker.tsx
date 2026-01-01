'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export function AffiliateTracker() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const trackReferral = async () => {
      // Check both search params and URL directly for referral code
      const refFromParams = searchParams.get('ref')
      const urlRef = new URL(window.location.href).searchParams.get('ref')
      const ref = refFromParams || urlRef

      console.log(`[AFFILIATE-TRACKER] Checking for referral code...`)
      console.log(`[AFFILIATE-TRACKER] URL: ${window.location.href}`)
      console.log(`[AFFILIATE-TRACKER] Ref from params: ${refFromParams}`)
      console.log(`[AFFILIATE-TRACKER] Ref from URL: ${urlRef}`)
      console.log(`[AFFILIATE-TRACKER] Final ref: ${ref}`)

      // Check if we've already tracked this referral to avoid duplicates
      const lastTrackedRef = sessionStorage.getItem('last_tracked_ref')
      if (ref && ref !== lastTrackedRef) {
        console.log(`[AFFILIATE-TRACKER] Referral code found: ${ref}`)
        try {
          // Create a unique tracking session for each user visit
          // Don't check for existing referrals - each click creates a new tracking record
          console.log(`[AFFILIATE-TRACKER] Calling tracking API with code: ${ref}`)
          const response = await fetch('/api/affiliate/track', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              referralCode: ref,
              sourceUrl: window.location.href,
              userAgent: navigator.userAgent,
              ipAddress: '', // Will be determined server-side
            }),
          })

          console.log(`[AFFILIATE-TRACKER] API response status: ${response.status}`)

          if (response.ok) {
            const data = await response.json()

            // Only proceed if we have a valid referral ID (not null for self-referrals)
            if (data.referralId) {
              console.log(`[AFFILIATE-TRACKER] New referral tracked: ${data.referralId} for code: ${ref}`)

              // Create unique tracking for each user/click
              // Store multiple recent referrals to handle multiple users on same device
              const referralData = {
                referralId: data.referralId,
                referralCode: ref,
                timestamp: Date.now(),
                sourceUrl: window.location.href
              }

              // Get existing referrals from localStorage
              const existingReferrals = JSON.parse(localStorage.getItem('affiliate_referrals') || '[]')
              console.log(`[AFFILIATE-TRACKER] Existing referrals count: ${existingReferrals.length}`)

              // Add new referral to the list (keep only recent ones to avoid storage bloat)
              existingReferrals.unshift(referralData)

              // Keep only the 10 most recent referrals (30 days max per referral anyway)
              const recentReferrals = existingReferrals.slice(0, 10)

              // Store updated referrals list
              localStorage.setItem('affiliate_referrals', JSON.stringify(recentReferrals))
              console.log(`[AFFILIATE-TRACKER] Updated referrals count: ${recentReferrals.length}`)

              // Set primary cookie with the latest referral ID (for server-side access)
              document.cookie = `affiliate_referral_id=${data.referralId}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`

              // Store additional recent referral IDs in a secondary cookie for multi-user support
              const recentIds = recentReferrals.slice(1, 6).map(r => r.referralId) // Get up to 5 additional recent IDs
              console.log(`[AFFILIATE-TRACKER] Additional referral IDs: ${recentIds.join(', ')}`)

              if (recentIds.length > 0) {
                document.cookie = `affiliate_additional_referrals=${JSON.stringify(recentIds)}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`
              }

              // Store that we've tracked this referral to avoid duplicates
              sessionStorage.setItem('last_tracked_ref', ref)
            } else {
              console.log(`[AFFILIATE-TRACKER] Self-referral detected - no tracking created`)
            }

            // Clean up URL parameter (optional) - do this regardless of self-referral
            const url = new URL(window.location.href)
            url.searchParams.delete('ref')
            window.history.replaceState({}, '', url.toString())
          } else {
            const errorData = await response.json()
            console.error(`[AFFILIATE-TRACKER] API error: ${response.status} - ${errorData.error}`)
          }
        } catch (error) {
          console.error('[AFFILIATE-TRACKER] Error tracking affiliate referral:', error)
        }
      } else {
        console.log(`[AFFILIATE-TRACKER] No referral code found in URL`)
      }
    }

    // Track referral on initial load and when search params change
    trackReferral()
  }, [searchParams])

  return null // This component doesn't render anything
}
