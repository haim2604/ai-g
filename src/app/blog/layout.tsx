import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'מדריך מתנות AI מקיף - כל מה שצריך לדעת על מתנות חכמות | GIFT.P.T',
  description: 'המדריך הכי מקיף למתנות AI בישראל. רעיונות מתנות, מדריכים, טיפים, ועצות מקצועיות למציאת המתנה המושלמת לכל אירוע ואדם.',
  keywords: [
    // עברית - מילות מפתח עיקריות
    'מדריך מתנות AI', 'רעיונות מתנות', 'מתנות חכמות', 'מתנות אישיות', 'מתנות מותאמות',
    'מתנות ליום הולדת', 'רעיונות יום הולדת', 'מתנות יום נישואין', 'מתנות יום אהבה',
    'מתנות לחנוכה', 'מתנות לפורים', 'מתנות לחגים', 'מתנות לראש השנה',
    'מתנות לילדים', 'מתנות לגברים', 'מתנות לנשים', 'מתנות למבוגרים',
    'מתנות לגיימרים', 'מתנות טכנולוגיות', 'מתנות בית ומטבח', 'מתנות DIY',
    'מתנות רומנטיות', 'מתנות מיוחדות', 'מתנות מעשיות', 'מתנות מפנקות',
    'מתנות סטודנטים', 'מתנות עובדים', 'מתנות משפחה', 'מתנות חברים',
    'מתנות בר מצווה', 'מתנות בת מצווה', 'מתנות סיום לימודים', 'מתנות פרישה',
    'מתנות צעצועים', 'מתנות חינוכיות', 'מתנות יצירתיות', 'מתנות ספורט',
    'מתנות תכשיטים', 'מתנות אופנה', 'מתנות ביוטי', 'מתנות בריאות',
    'מתנות נסיעות', 'מתנות חיות מחמד', 'מתנות הריון', 'מתנות תינוקות',
    'איך לבחור מתנה', 'מה לתת במתנה', 'מתנות זולות', 'מתנות יקרות',
    
    // אנגלית - מילות מפתח עיקריות
    'AI gift guide', 'gift ideas AI', 'smart gift finder', 'personalized gifts',
    'birthday gift ideas', 'anniversary gifts', 'valentine gifts', 'holiday gifts',
    'Hanukkah gifts', 'Purim gifts', 'Jewish holiday gifts', 'Christmas gifts',
    'gifts for kids', 'gifts for men', 'gifts for women', 'gifts for teens',
    'gamer gifts', 'tech gifts', 'home gifts', 'kitchen gifts', 'DIY gifts',
    'romantic gifts', 'unique gifts', 'practical gifts', 'luxury gifts',
    'student gifts', 'coworker gifts', 'family gifts', 'friend gifts',
    'bar mitzvah gifts', 'bat mitzvah gifts', 'graduation gifts', 'retirement gifts',
    'toy gifts', 'educational gifts', 'creative gifts', 'sports gifts',
    'jewelry gifts', 'fashion gifts', 'beauty gifts', 'wellness gifts',
    'travel gifts', 'pet gifts', 'pregnancy gifts', 'baby gifts',
    'how to choose gifts', 'gift selection tips', 'cheap gifts', 'expensive gifts',
    'gift shopping guide', 'best gifts 2024', 'trending gifts', 'popular gifts'
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'מדריך מתנות AI מקיף - כל מה שצריך לדעת על מתנות חכמות',
    description: 'המדריך הכי מקיף למתנות AI בישראל. רעיונות מתנות, מדריכים, טיפים ועצות מקצועיות.',
    url: 'https://gift-pt.com/blog',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GIFT.P.T - מדריך מתנות AI',
      },
    ],
  },
  alternates: {
    canonical: 'https://gift-pt.com/blog',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 