import type { Metadata } from 'next';

const defaultMetadata: Metadata = {
  title: 'GIFT.P.T - מתנות מותאמות אישית בעזרת AI',
  description: 'מצא את המתנה המושלמת לכל אחד בעזרת הבינה המלאכותית שלנו. אנחנו עוזרים לך למצוא מתנות מותאמות אישית באלי אקספרס.',
  keywords: [
    'מתנות',
    'AI',
    'בינה מלאכותית',
    'מתנות מותאמות אישית',
    'אלי אקספרס',
    'קניות',
    'מתנות לחברים',
    'מתנות למשפחה',
    'מתנות לעובדים',
  ],
  authors: [{ name: 'GIFT.P.T' }],
  creator: 'GIFT.P.T',
  publisher: 'GIFT.P.T',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: 'https://gift-finder.com',
    siteName: 'GIFT.P.T',
    title: 'GIFT.P.T - מתנות מותאמות אישית בעזרת AI',
    description: 'מצא את המתנה המושלמת לכל אחד בעזרת הבינה המלאכותית שלנו',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GIFT.P.T - מתנות מותאמות אישית',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GIFT.P.T - מתנות מותאמות אישית בעזרת AI',
    description: 'מצא את המתנה המושלמת לכל אחד בעזרת הבינה המלאכותית שלנו',
    images: ['/og-image.jpg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_ID', // יש להחליף עם ה-ID האמיתי
  },
  category: 'shopping',
};

export default defaultMetadata; 