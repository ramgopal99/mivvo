import { Suspense } from 'react'
import { CallbackContent } from './CallbackContent'

export default function CallbackPage() {
  return (
    <Suspense fallback={<div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p>Loading payment details...</p>
      </div>
    </div>}>
      <CallbackContent />
    </Suspense>
  )
}

