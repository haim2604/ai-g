import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from "@/components/layout/Navigation";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'מוצא המתנות - מציאת מתנות מושלמות בעזרת AI',
  description: 'מערכת חכמה למציאת מתנות מותאמות אישית בעזרת בינה מלאכותית',
  metadataBase: new URL('https://gift-finder.vercel.app'),
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
