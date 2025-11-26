'use client'

import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const StatusPage = () => {
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await fetch('/api/status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: params?.id })
        })

        if (!response.ok) {
          throw new Error('Verification failed')
        }

        const result = await response.text()

        // Redirect immediately to appropriate page
        if (result === "PAYMENT_SUCCESS") {
          router.replace(`/success/${params?.id}`)
        } else if (result === "PAYMENT_PENDING") {
          router.replace(`/pending/${params?.id}`)
        } else {
          router.replace(`/failed/${params?.id}`)
        }
      } catch {
        // On error, redirect to failed page
        router.replace(`/failed/${params?.id}`)
      }
    }

    if (params?.id) {
      verifyPayment()
    }
  }, [params?.id, router])

  // No UI - redirect immediately
  return null
}

export default StatusPage
