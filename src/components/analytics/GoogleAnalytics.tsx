'use client'

import { useEffect } from 'react'
import Script from 'next/script'

interface GoogleAnalyticsProps {
  measurementId: string
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  useEffect(() => {
    // Initialize gtag if it doesn't exist
    if (typeof window !== 'undefined' && !window.gtag) {
      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer.push(args)
      }
      window.gtag('js', new Date())
      window.gtag('config', measurementId, {
        page_title: document.title,
        page_location: window.location.href,
      })
    }
  }, [measurementId])

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(Array.from(arguments));}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  )
}

// Analytics utility functions
export const trackEvent = (eventName: string, parameters?: Record<string, string | number | boolean>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
      page_path: url,
    })
  }
}

// Specific tracking functions for our app
export const trackQuizStart = () => {
  trackEvent('quiz_start', {
    event_category: 'engagement',
    event_label: 'gift_finder_quiz'
  })
}

export const trackQuizComplete = (questionsAnswered: number) => {
  trackEvent('quiz_complete', {
    event_category: 'engagement',
    event_label: 'gift_finder_quiz',
    value: questionsAnswered
  })
}

export const trackGiftRecommendation = (giftType: string) => {
  trackEvent('gift_recommendation', {
    event_category: 'conversion',
    event_label: giftType
  })
}

export const trackFeedback = (feedbackType: 'like' | 'dislike' | 'neutral', section: 'greeting' | 'gift') => {
  trackEvent('feedback_given', {
    event_category: 'engagement',
    event_label: `${section}_${feedbackType}`,
    feedback_type: feedbackType,
    section: section
  })
}

// Declare gtag types for TypeScript
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
} 