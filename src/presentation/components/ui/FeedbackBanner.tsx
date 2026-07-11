'use client'
import { useEffect } from 'react'

interface FeedbackBannerProps {
  message: string
  show: boolean
  onHide: () => void
}

export function FeedbackBanner({ message, show, onHide }: FeedbackBannerProps) {
  useEffect(() => {
    if (show) {
      const t = setTimeout(onHide, 3000)
      return () => clearTimeout(t)
    }
  }, [show, onHide])

  if (!show) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-4"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
      <span className="text-green-800 font-medium text-sm">{message}</span>
    </div>
  )
}
