'use client';

import Link from 'next/link';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "איך עובדת המערכת של GIFT.P.T?",
    answer: "המערכת שלנו משתמשת בבינה מלאכותית מתקדמת שמנתחת את התשובות שלך בשאלון ומוצאת מתנות המותאמות בדיוק לאדם ולאירוע. האלגוריתם שלנו לוקח בחשבון גיל, תחביבים, טעם אישי, סגנון חיים ועוד פרמטרים רבים. קרא עוד בדף האודות שלנו."
  },
  {
    question: "כמה זמן לוקח להשלים את השאלון?",
    answer: "השאלון לוקח בין 2-5 דקות להשלמה. הוא מכיל 10 שאלות קצרות ומדויקות שיעזרו לנו להבין בדיוק איזו מתנה תהיה מושלמת עבור האדם שאתם בוחרים עבורו."
  },
  {
    question: "האם השירות בחינם?",
    answer: "כן! השירות של GIFT.P.T הוא חינמי לחלוטין. אתם יכולים לענות על השאלון ולקבל המלצות מותאמות אישית ללא תשלום. אנחנו מרוויחים רק כאשר אתם רוכשים מוצרים דרך הקישורים שלנו."
  },
  {
    question: "מאיפה מגיעות המתנות שאתם ממליצים?",
    answer: "אנחנו ממליצים על מתנות מאלי אקספרס, הפלטפורמה הגדולה בעולם לקניות אונליין. זה מאפשר לנו להציע מגוון ענק של מתנות במחירים נוחים עם משלוח לכל העולם."
  },
  {
    question: "האם אוכל לקבל מתנות חלופיות אם לא אהבתי את ההמלצה?",
    answer: "בהחלט! אם המתנה שקיבלתם לא מתאימה לכם, אתם יכולים לבחור מתוך מספר סיבות החלפה והמערכת תציע לכם מתנה חלופית מותאמת."
  },
  {
    question: "האם המערכת מתאימה לכל הגילאים?",
    answer: "כן! המערכת שלנו מתאימה למציאת מתנות לכל הגילאים - מתינוקות ועד למבוגרים. השאלון מותאם לזהות את הגיל ולהציע מתנות מתאימות בהתאם."
  },
  {
    question: "אילו סוגי אירועים המערכת מכסה?",
    answer: "אנחנו מכסים כמעט כל סוג של אירוע: ימי הולדת, ימי נישואין, יום אהבה, חגים יהודיים, בר/בת מצווה, סיום לימודים, חגים נוצריים ומוסלמיים, ועוד הרבה אירועים מיוחדים."
  },
  {
    question: "האם אוכל לשתף את התוצאות ברשתות חברתיות?",
    answer: "כן! אחרי שתקבלו את ההמלצה, תוכלו לשתף אותה בפייסבוק, וואטסאפ, טוויטר, לינקדאין, טלגרם או לשלוח קישור ישיר לחברים ולמשפחה."
  },
  {
    question: "מה אם אני לא מוצא את המתנה המתאימה בקישור?",
    answer: "אם המתנה לא זמינה או שאתם לא מרוצים, אתם יכולים לבקש מתנה חלופית דרך המערכת. בנוסף, אתם יכולים לחזור ולענות על השאלון עם פרטים שונים כדי לקבל המלצות נוספות."
  },
  {
    question: "האם המערכת לומדת ומשתפרת?",
    answer: "בהחלט! המערכת שלנו לומדת מכל משוב שאנו מקבלים. כל פעם שמישהו מדרג המלצה או מבקש מתנה חלופית, זה עוזר לנו לשפר את הדיוק של המערכת למשתמשים הבאים."
  }
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            שאלות נפוצות
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            מצא תשובות לכל השאלות שלך על GIFT.P.T - מערכת מתנות AI החכמה
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {faqData.map((item, index) => (
            <FAQCard key={index} question={item.question} answer={item.answer} />
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">לא מצאתם את התשובה שחיפשתם?</h2>
          <p className="text-white/80 text-lg mb-6">
             התחילו עם <Link href="/quiz" className="text-purple-300 hover:text-purple-200 underline font-semibold">השאלון החכם שלנו</Link> ותגלו איך זה עובד בפועל
           </p>
           <p className="text-white/70 text-sm mb-6">
             רוצים לדעת יותר על המערכת? בקרו ב<Link href="/about" className="text-purple-300 hover:text-purple-200 underline">דף האודות</Link> שלנו או חזרו ל<Link href="/" className="text-purple-300 hover:text-purple-200 underline">עמוד הבית</Link>
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link 
               href="/quiz"
               className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
             >
               התחל שאלון מתנות AI
             </Link>
             <Link 
               href="/about"
               className="inline-block bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 border border-white/20"
             >
               קרא עלינו
             </Link>
           </div>
         </div>
       </div>
     </div>
   );
}

function FAQCard({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-right hover:bg-white/5 transition-colors duration-300 flex items-center justify-between"
      >
        <span className="text-2xl">{isOpen ? '−' : '+'}</span>
        <h3 className="text-lg font-semibold text-white">{question}</h3>
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p className="text-white/80 text-right leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
} 