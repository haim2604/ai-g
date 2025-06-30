import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'מתנות לכל אירוע - יום הולדת, יום נישואין, חנוכה ועוד',
  description: 'מצא מתנות מושלמות לכל אירוע: יום הולדת, יום נישואין, יום אהבה, חנוכה, פורים, חתונה ועוד.',
  keywords: [
    'מתנות לאירועים',
    'מתנות ליום הולדת',
    'מתנות ליום נישואין', 
    'מתנות ליום אהבה',
    'מתנות לחנוכה',
    'מתנות לפורים',
    'מתנות לחתונה',
    'מתנות לבר מצווה',
    'מתנות לבת מצווה',
    'מתנות לראש השנה',
    'מתנות לפסח',
    'מתנות לסיום לימודים',
    'מתנות לפרישה',
    'מתנות לחנוכת בית',
    'מתנות לתינוק חדש',
    'occasion gifts',
    'birthday gifts',
    'anniversary gifts',
    'valentine gifts',
    'hanukkah gifts',
    'wedding gifts',
    'graduation gifts',
    'retirement gifts'
  ],
  openGraph: {
    title: 'מתנות לכל אירוע - יום הולדת, יום נישואין, חנוכה ועוד',
    description: 'מצא מתנות מושלמות לכל אירוע: יום הולדת, יום נישואין, יום אהבה, חנוכה, פורים, חתונה ועוד.',
    url: 'https://gift-pt.com/occasions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'מתנות לכל אירוע - GIFT.P.T',
    description: 'מצא מתנות מושלמות לכל אירוע: יום הולדת, יום נישואין, יום אהבה, חנוכה, פורים, חתונה ועוד.',
  },
};

export default function OccasionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 