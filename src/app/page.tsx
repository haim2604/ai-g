'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
      </main>
    </>
  );
}
