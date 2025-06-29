'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { trackEvent } from '@/components/analytics/GoogleAnalytics';
import IntroAnimation from '@/components/ui/IntroAnimation';
import SplashScreen from '@/components/ui/SplashScreen';

interface BackgroundPoint {
  initialX: number;
  initialY: number;
  targetX: number;
  targetY: number;
  duration: number;
}

// פונקציה עזר ליצירת מערך של נקודות רקע
const createBackgroundPoints = (width: number, height: number): BackgroundPoint[] => {
  return Array.from({ length: 20 }, () => ({
    initialX: Math.random() * (width || 1000),
    initialY: Math.random() * (height || 800),
    targetX: Math.random() * (width || 1000),
    targetY: Math.random() * (height || 800),
    duration: Math.random() * 10 + 10,
  }));
};

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [backgroundPoints, setBackgroundPoints] = useState<BackgroundPoint[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // רק בצד הלקוח
  useLayoutEffect(() => {
    setIsMounted(true);
    setBackgroundPoints(createBackgroundPoints(window.innerWidth, window.innerHeight));
  }, []);

  useEffect(() => {
    // Track home page view
    trackEvent('page_view', {
      page_title: 'Home Page',
      page_location: '/'
    });

    // מציג את התוכן אחרי האנימציות
    const timer = setTimeout(() => {
      setIntroComplete(true);
      setTimeout(() => {
        setShowContent(true);
      }, 500);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        const { clientX, clientY } = e;
        cursorRef.current.style.transform = `translate(${clientX - 10}px, ${clientY - 10}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMounted]);

  // אם לא במצב client-side, מציג גרסה סטטית
  if (!isMounted) {
    return (
      <div className="min-h-screen overflow-hidden">
        <div className="h-screen flex flex-col items-center justify-center gradient-animation">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-8">
              מצא את המתנה המושלמת
            </h1>
            <p className="text-xl md:text-2xl mb-12">
              בעזרת הבינה המלאכותית שלנו, נמצא את המתנה המושלמת עבור האדם היקר לך
            </p>
            <Link 
              href="/quiz"
              className="inline-block bg-white/10 backdrop-blur-md text-white px-12 py-6 rounded-full text-xl font-semibold"
            >
              התחל את השאלון
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <IntroAnimation />
      {introComplete && <SplashScreen />}
      <div ref={cursorRef} className="custom-cursor" />
      <main className="min-h-screen overflow-hidden" ref={containerRef}>
        {/* Hero Section */}
        <motion.div 
          className="h-screen flex flex-col items-center justify-center gradient-animation relative"
          style={{ scale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 100 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center relative z-10"
          >
            <h1 
              className="text-6xl md:text-8xl font-bold mb-8 glitch glow"
              data-text="מצא את המתנה המושלמת"
            >
              מצא את המתנה המושלמת
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gradient">
              בעזרת הבינה המלאכותית שלנו, נמצא את המתנה המושלמת עבור האדם היקר לך
            </p>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/quiz"
                onClick={() => trackEvent('start_quiz_click', {
                  event_category: 'engagement',
                  event_label: 'home_page_cta'
                })}
                className="inline-block bg-white/10 backdrop-blur-md text-white px-12 py-6 rounded-full text-xl font-semibold hover:bg-white/20 transition-all transform hover-lift magnetic glow"
              >
                התחל את השאלון
              </Link>
            </motion.div>
          </motion.div>

          {/* Animated background shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {backgroundPoints.map((point, i) => (
              <motion.div
                key={i}
                className="absolute w-20 h-20 rounded-full bg-white/10"
                initial={{
                  x: point.initialX,
                  y: point.initialY,
                }}
                animate={{
                  x: point.targetX,
                  y: point.targetY,
                  scale: [1, 2, 1],
                }}
                transition={{
                  duration: point.duration,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  filter: 'blur(8px)',
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* SEO Content Section */}
        <motion.section 
          className="max-w-4xl mx-auto px-6 py-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 50 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 text-gradient">
              למה לבחור ב-GIFT.P.T לחיפוש מתנות?
            </h2>
            <p className="text-white/80 mb-6 text-center">
              רוצים לדעת יותר? בקרו ב<Link href="/about" className="text-purple-300 hover:text-purple-200 underline">דף האודות שלנו</Link> או ב<Link href="/faq" className="text-purple-300 hover:text-purple-200 underline">שאלות נפוצות</Link>
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-right">
              <div className="bg-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-3 text-white">🎯 מתנות מותאמות אישית</h3>
                <p className="text-white/80">
                  הבינה המלאכותית שלנו מנתחת את התשובות שלך ומוצאת מתנות מושלמות 
                  המותאמות לטעם, לגיל ולאירוע הספציפי
                </p>
                <Link href="/about" className="text-purple-300 hover:text-purple-200 text-sm underline block mt-2">
                  קרא עוד על הטכנולוגיה שלנו
                </Link>
              </div>
              <div className="bg-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-3 text-white">⚡ חיפוש מהיר וחכם</h3>
                <p className="text-white/80">
                  תוך דקות ספורות תקבל המלצות מותאמות אישית, 
                  ללא צורך לחפש שעות באינטרנט
                </p>
                <Link href="/quiz" className="text-purple-300 hover:text-purple-200 text-sm underline block mt-2">
                  התחל עכשיו →
                </Link>
              </div>
              <div className="bg-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-3 text-white">🎉 לכל אירוע</h3>
                <p className="text-white/80">
                  מתנות ליום הולדת, יום נישואין, יום אהבה, חג, בר/בת מצווה 
                  וכל אירוע מיוחד בחיים
                </p>
                <Link href="/faq" className="text-purple-300 hover:text-purple-200 text-sm underline block mt-2">
                  ראה עוד אירועים
                </Link>
              </div>
              <div className="bg-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-3 text-white">💡 רעיונות יצירתיים</h3>
                <p className="text-white/80">
                  גלה מתנות מקוריות ויצירתיות שלא חשבת עליהן - 
                  מתנות שבאמת יפתיעו ושמחו
                </p>
                <Link href="/quiz" className="text-purple-300 hover:text-purple-200 text-sm underline block mt-2">
                  גלה מתנות מקוריות
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-gradient">
              איך זה עובד? פשוט כמו 1-2-3
            </h2>
            <p className="text-white/80 mb-6 text-center">
              רוצים לדעת יותר? בקרו ב<Link href="/about" className="text-purple-300 hover:text-purple-200 underline">דף האודות שלנו</Link> או ב<Link href="/faq" className="text-purple-300 hover:text-purple-200 underline">שאלות נפוצות</Link>
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
              <div className="flex-1">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">ענה על השאלון</h3>
                <p className="text-white/80">כמה שאלות קצרות על האדם שאתה בוחר עבורו מתנה</p>
                <Link href="/quiz" className="text-purple-300 hover:text-purple-200 text-sm underline block mt-2">
                  התחל כאן →
                </Link>
              </div>
              <div className="flex-1">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">קבל המלצות AI</h3>
                <p className="text-white/80">הבינה המלאכותית מנתחת ומוצאת את המתנה המושלמת</p>
                <Link href="/about" className="text-purple-300 hover:text-purple-200 text-sm underline block mt-2">
                  איך זה עובד?
                </Link>
              </div>
              <div className="flex-1">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">בחר ורכוש</h3>
                <p className="text-white/80">קבל קישור ישיר לרכישת המתנה באלי אקספרס</p>
                <Link href="/faq" className="text-purple-300 hover:text-purple-200 text-sm underline block mt-2">
                  שאלות נפוצות
                </Link>
              </div>
            </div>
            
            {/* Internal Link Hub */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="text-lg font-semibold mb-4 text-white">חקור עוד באתר</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/about" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm transition-colors">
                  📖 על המערכת
                </Link>
                <Link href="/faq" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm transition-colors">
                  ❓ שאלות נפוצות
                </Link>
                <Link href="/quiz" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-full text-sm transition-colors">
                  🎯 התחל שאלון
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </>
  );
}
