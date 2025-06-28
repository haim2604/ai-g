import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from "@/components/layout/Navigation";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GIFT.P.T - מציאת מתנות מושלמות בעזרת AI',
  description: 'מערכת חכמה למציאת מתנות מותאמות אישית בעזרת בינה מלאכותית',
  metadataBase: new URL('https://gift-finder.vercel.app'),
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
