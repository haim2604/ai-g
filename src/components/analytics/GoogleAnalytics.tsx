'use client'

import { useEffect } from 'react'
import Script from 'next/script'

interface GoogleAnalyticsProps {
  measurementId: string
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  useEffect(() => {
    console.log('🔍 GoogleAnalytics Diagnostics:')
    console.log('📊 Measurement ID:', measurementId)
    console.log('🌐 Environment:', process.env.NODE_ENV)
    console.log('🔗 Current URL:', window.location.href)
    
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || []
    
    function gtag(...args: any[]) {
      console.log('📤 gtag call:', args)
      window.dataLayer.push(args)
    }
    
    // Make gtag available globally
    window.gtag = gtag
    
    // Initialize gtag
    gtag('js', new Date())
    gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: true
    })
    
    console.log('✅ gtag initialized with config:', measurementId)
    console.log('📊 dataLayer contents:', window.dataLayer)
    
    // Test event after 2 seconds
    setTimeout(() => {
      console.log('🧪 Sending test event...')
      gtag('event', 'test_analytics', {
        event_category: 'debug',
        event_label: 'connection_test'
      })
      console.log('✅ Test event sent')
    }, 2000)
    
  }, [measurementId])

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        onLoad={() => {
          console.log('✅ Google Analytics script loaded successfully')
        }}
        onError={(e) => {
          console.error('❌ Google Analytics script failed to load:', e)
        }}
      />
    </>
  )
}

// Analytics utility functions
export const trackEvent = (eventName: string, parameters?: Record<string, string | number | boolean>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    console.log('🎯 Tracking event:', eventName, parameters)
    window.gtag('event', eventName, parameters)
  } else {
    console.log('⚠️ gtag not available for event:', eventName)
  }
}

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    console.log('📄 Tracking page view:', url)
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
      page_path: url,
    })
  }
}

// Specific tracking functions for our app
export const trackQuizStart = () => {
  console.log('🎯 Quiz started')
  trackEvent('quiz_start', {
    event_category: 'engagement',
    event_label: 'gift_finder_quiz'
  })
}

export const trackQuizComplete = (questionsAnswered: number) => {
  console.log('🎯 Quiz completed with', questionsAnswered, 'questions')
  trackEvent('quiz_complete', {
    event_category: 'engagement',
    event_label: 'gift_finder_quiz',
    value: questionsAnswered
  })
}

export const trackGiftRecommendation = (giftType: string) => {
  console.log('🎯 Gift recommendation:', giftType)
  trackEvent('gift_recommendation', {
    event_category: 'conversion',
    event_label: giftType
  })
}

export const trackFeedback = (feedbackType: 'like' | 'dislike' | 'neutral', section: 'greeting' | 'gift') => {
  console.log('🎯 Feedback given:', feedbackType, 'for', section)
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
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
} 