import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PhonePe Payment Gateway Test',
  description: 'Test and integrate PhonePe Standard Checkout API',
}

export default function Test5Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

