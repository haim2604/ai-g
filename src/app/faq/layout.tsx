import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'שאלות נפוצות - GIFT.P.T | מתנות AI חכמות',
  description: 'מצא תשובות לשאלות הנפוצות על GIFT.P.T - מערכת מתנות AI. איך עובד השאלון? איך בוחרים מתנות? כל מה שתרצו לדעת על מציאת מתנות בעזרת בינה מלאכותית.',
  keywords: [
    'שאלות נפוצות מתנות AI', 'כיצד עובד שאלון מתנות', 'מתנות בינה מלאכותית FAQ',
    'GIFT.P.T שאלות', 'עזרה מתנות AI', 'תמיכה מערכת מתנות',
    'gift finder FAQ', 'AI gift questions', 'how does gift quiz work', 'gift recommendations help'
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'שאלות נפוצות - GIFT.P.T | מתנות AI חכמות',
    description: 'מצא תשובות לשאלות הנפוצות על GIFT.P.T - מערכת מתנות AI.',
    url: 'https://gift-finder.vercel.app/faq',
    type: 'website',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 