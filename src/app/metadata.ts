import type { Metadata } from 'next';

const defaultMetadata: Metadata = {
  title: 'מתנות AI - חיפוש מתנות מושלמות | GIFT.P.T',
  description: 'מצא מתנות מושלמות בעזרת בינה מלאכותית! מתנות ליום הולדת, יום נישואין, יום אהבה ואירועים מיוחדים. AI Gift Finder - Perfect gifts powered by artificial intelligence.',
  keywords: [
    // מילות מפתח עבריות
    'מתנות AI', 'חיפוש מתנות', 'מתנות ליום הולדת', 'מתנות ליום נישואין', 'מתנות ליום אהבה',
    'מתנות מותאמות אישית', 'מתנות לאירועים', 'מתנות לחברים', 'מתנות למשפחה',
    'מתנות יצירתיות', 'מתנות מיוחדות', 'רעיונות למתנות', 'מתנות מקוריות',
    'מתנות לגברים', 'מתנות לנשים', 'מתנות לילדים', 'מתנות לחג', 'מתנות לפסח',
    'מתנות לראש השנה', 'מתנות לחנוכה', 'מתנות לבר מצווה', 'מתנות לבת מצווה',
    'בינה מלאכותית', 'מערכת המלצות', 'שאלון מתנות', 'מציאת מתנות',
    // מילות מפתח אנגליות
    'AI gifts', 'gift finder', 'birthday gifts', 'anniversary gifts', 'valentine gifts',
    'personalized gifts', 'gift ideas', 'unique gifts', 'creative gifts', 'special occasion gifts',
    'gift recommendations', 'artificial intelligence gifts', 'smart gift finder', 'gift quiz',
    'perfect gifts', 'custom gifts', 'holiday gifts', 'wedding gifts', 'graduation gifts'
  ],
  authors: [{ name: 'GIFT.P.T' }],
  creator: 'GIFT.P.T',
  publisher: 'GIFT.P.T',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    alternateLocale: ['en_US'],
    url: 'https://gift-pt.com',
    siteName: 'GIFT.P.T - מתנות AI',
    title: 'מתנות AI - חיפוש מתנות מושלמות | GIFT.P.T',
    description: 'מצא מתנות מושלמות בעזרת בינה מלאכותית! מתנות ליום הולדת, יום נישואין, יום אהבה ואירועים מיוחדים.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GIFT.P.T - מתנות מותאמות אישית בעזרת בינה מלאכותית',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'מתנות AI - חיפוש מתנות מושלמות | GIFT.P.T',
    description: 'מצא מתנות מושלמות בעזרת בינה מלאכותית! מתנות ליום הולדת, יום נישואין, יום אהבה ואירועים מיוחדים.',
    images: ['/og-image.jpg'],
    creator: '@giftpt_ai',
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
  classification: 'AI-powered gift recommendation system',
};

export default defaultMetadata; 