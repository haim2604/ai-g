import type { Metadata } from 'next';

const defaultMetadata: Metadata = {
  title: 'מוצא המתנות - מתנות מותאמות אישית בעזרת AI',
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
  authors: [{ name: 'מוצא המתנות' }],
  creator: 'מוצא המתנות',
  publisher: 'מוצא המתנות',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: 'https://gift-finder.com',
    siteName: 'מוצא המתנות',
    title: 'מוצא המתנות - מתנות מותאמות אישית בעזרת AI',
    description: 'מצא את המתנה המושלמת לכל אחד בעזרת הבינה המלאכותית שלנו',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'מוצא המתנות - מתנות מותאמות אישית',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'מוצא המתנות - מתנות מותאמות אישית בעזרת AI',
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