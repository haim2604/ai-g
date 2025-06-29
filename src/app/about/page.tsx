import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'אודות GIFT.P.T - מערכת מתנות AI חכמה | עלינו',
  description: 'למד על GIFT.P.T - המערכת החכמה למציאת מתנות מושלמות בעזרת בינה מלאכותית. איך אנחנו עוזרים למצוא מתנות מותאמות אישית לכל אירוע ולכל אדם.',
  keywords: [
    'אודות GIFT.P.T', 'מערכת מתנות AI', 'בינה מלאכותית למתנות', 'חברת מתנות',
    'about gift finder', 'AI gift company', 'gift recommendation system', 'personalized gifts AI'
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            אודות GIFT.P.T
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            המערכת החכמה והמתקדמת ביותר למציאת מתנות מושלמות בעזרת בינה מלאכותית
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">המשימה שלנו</h2>
            <p className="text-white/80 text-lg leading-relaxed">
              ב-GIFT.P.T אנחנו מאמינים שכל אדם ראוי לקבל מתנה מושלמת. המשימה שלנו היא לעזור לך למצוא 
              את המתנה הכי מתאימה לכל אדם ולכל אירוע, בעזרת הטכנולוגיה החכמה ביותר של בינה מלאכותית.
              אנחנו הופכים את החיפוש אחר המתנה המושלמת לפשוט, מהיר ומדויק.
            </p>
            <p className="text-white/70 text-sm mt-4">
              מוכנים לנסות? התחילו עם <Link href="/quiz" className="text-purple-300 hover:text-purple-200 underline font-semibold">השאלון שלנו</Link> או עיינו ב<Link href="/faq" className="text-purple-300 hover:text-purple-200 underline">שאלות נפוצות</Link>
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">איך זה עובד?</h2>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              המערכת שלנו משתמשת באלגוריתמים מתקדמים של בינה מלאכותית כדי לנתח את התשובות שלך 
              ולמצוא מתנות המותאמות בדיוק לטעם, לגיל, לתחביבים ולאירוע הספציפי.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  🤖
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">בינה מלאכותית מתקדמת</h3>
                <p className="text-white/70 text-sm">
                  אלגוריתמים חכמים שלומדים ומשתפרים כל הזמן
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  🎯
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">דיוק גבוה</h3>
                <p className="text-white/70 text-sm">
                  התאמה מדויקת בהתבסס על עשרות פרמטרים
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  ⚡
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">מהיר ויעיל</h3>
                <p className="text-white/70 text-sm">
                  תוצאות מיידיות תוך דקות ספורות
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">למה GIFT.P.T?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">🎁 מתנות לכל אירוע</h3>
                <p className="text-white/80 text-sm">
                  יום הולדת, יום נישואין, יום אהבה, חגים, בר/בת מצווה ועוד
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">🌟 מותאם אישית</h3>
                <p className="text-white/80 text-sm">
                  כל המלצה מותאמת בדיוק לאדם ולאירוע הספציפי
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">🔄 שיפור מתמיד</h3>
                <p className="text-white/80 text-sm">
                  המערכת לומדת ומשתפרת מכל משוב שאנו מקבלים
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">🛒 קישור ישיר לרכישה</h3>
                <p className="text-white/80 text-sm">
                  מקבלים קישור ישיר לרכישת המתנה באלי אקספרס
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">מוכנים למצוא את המתנה המושלמת?</h2>
            <p className="text-white/80 text-lg mb-6">
              התחילו עכשיו עם <Link href="/quiz" className="text-purple-300 hover:text-purple-200 underline font-semibold">השאלון החכם שלנו</Link> וגלו מתנות מדהימות שתפתיעו את האהובים עליכם
            </p>
            <p className="text-white/70 text-sm mb-6">
              יש לכם שאלות? בקרו ב<Link href="/faq" className="text-purple-300 hover:text-purple-200 underline">שאלות נפוצות</Link> שלנו או חזרו ל<Link href="/" className="text-purple-300 hover:text-purple-200 underline">עמוד הבית</Link>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/quiz"
                className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                התחל שאלון מתנות AI
              </Link>
              <Link 
                href="/faq"
                className="inline-block bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 border border-white/20"
              >
                שאלות נפוצות
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 