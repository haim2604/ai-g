import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'קטגוריות מתנות AI - מתנות לילדים, מתנות טכנולוגיות ועוד | GIFT.P.T',
  description: 'חפש מתנות לפי קטגוריה: מתנות לילדים, מתנות טכנולוגיות, מתנות רומנטיות, מתנות בית ומטבח, מתנות לגיימרים ועוד. כל הקטגוריות במקום אחד.',
  keywords: [
    // עברית - קטגוריות ספציפיות
    'מתנות לילדים', 'מתנות טכנולוגיות', 'מתנות רומנטיות', 'מתנות בית ומטבח',
    'מתנות לגיימרים', 'מתנות אופנה', 'מתנות לתינוקות', 'מתנות יוקרה',
    'מתנות לחתונה', 'מתנות יצירתיות', 'מתנות ספורט', 'מתנות לנסיעות',
    'מתנות חינוכיות', 'מתנות מוזיקה', 'מתנות צילום', 'מתנות מפתיעות',
    'קטגוריות מתנות', 'סוגי מתנות', 'חיפוש מתנות לפי קטגוריה',
    'מתנות לגילאים שונים', 'מתנות לתחביבים', 'מתנות לעיסוקים',
    'מתנות לחגים', 'מתנות לאירועים', 'מתנות מיוחדות',
    'מתנות גברים', 'מתנות נשים', 'מתנות זוגות', 'מתנות משפחה',
    'מתנות חברים', 'מתנות עמיתים', 'מתנות קרובים',
    'מתנות מעשיות', 'מתנות מפנקות', 'מתנות זכרון',
    
    // אנגלית - קטגוריות ספציפיות
    'kids gifts', 'tech gifts', 'romantic gifts', 'home kitchen gifts',
    'gaming gifts', 'fashion gifts', 'baby gifts', 'luxury gifts',
    'wedding gifts', 'creative gifts', 'sports gifts', 'travel gifts',
    'educational gifts', 'music gifts', 'photography gifts', 'surprise gifts',
    'gift categories', 'types of gifts', 'gifts by category',
    'age-appropriate gifts', 'hobby gifts', 'profession gifts',
    'holiday gifts', 'occasion gifts', 'special gifts',
    'mens gifts', 'womens gifts', 'couples gifts', 'family gifts',
    'friends gifts', 'coworker gifts', 'relative gifts',
    'practical gifts', 'luxury gifts', 'memory gifts',
    'gift ideas by category', 'categorized gifts', 'gift classification'
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'קטגוריות מתנות AI - מתנות לילדים, מתנות טכנולוגיות ועוד',
    description: 'חפש מתנות לפי קטגוריה: מתנות לילדים, מתנות טכנולוגיות, מתנות רומנטיות ועוד.',
    url: 'https://gift-pt.com/categories',
    type: 'website',
  },
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 