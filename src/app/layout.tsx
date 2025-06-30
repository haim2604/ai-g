import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from "@/components/layout/Navigation";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'מתנות AI - חיפוש מתנות מושלמות | GIFT.P.T',
  description: 'מצא מתנות מושלמות בעזרת בינה מלאכותית! מתנות ליום הולדת, יום נישואין, יום אהבה ואירועים מיוחדים. AI Gift Finder - Perfect gifts powered by artificial intelligence.',
  metadataBase: new URL('https://gift-pt.com'),
  keywords: [
    'מתנות AI', 'חיפוש מתנות', 'מתנות ליום הולדת', 'מתנות ליום נישואין', 'מתנות ליום אהבה',
    'AI gifts', 'gift finder', 'birthday gifts', 'anniversary gifts', 'valentine gifts'
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'מתנות AI - חיפוש מתנות מושלמות | GIFT.P.T',
    description: 'מצא מתנות מושלמות בעזרת בינה מלאכותית! מתנות ליום הולדת, יום נישואין, יום אהבה ואירועים מיוחדים.',
          url: 'https://gift-pt.com',
    siteName: 'GIFT.P.T',
    locale: 'he_IL',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "GIFT.P.T - AI Gift Finder",
              "url": "https://gift-pt.com",
              "description": "AI-powered gift recommendation system for finding perfect gifts for any occasion",
              "applicationCategory": "LifestyleApplication",
              "operatingSystem": "Web Browser",
              "inLanguage": ["he", "en"],
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "AI-powered gift recommendations",
                "Personalized gift finder",
                "Multi-language support",
                "Occasion-based suggestions"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-B8TVNSFXJC"} />
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              console.log('🔍 Environment Check:');
              console.log('📊 GA ID from env:', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              console.log('🌐 Current URL:', window.location.href);
              console.log('🔗 Document ready state:', document.readyState);
            `
          }} 
        />
        <Navigation />
        {children}
      </body>
    </html>
  )
}
