'use client';

import { motion } from 'framer-motion';
import { useEffect, useLayoutEffect, useState } from 'react';
import { GiftIcon } from '@heroicons/react/24/outline';

// פונקציה עזר ליצירת מערך של נקודות רקע
const createBackgroundPoints = (width: number, height: number) => {
  return Array.from({ length: 10 }, () => ({
    initialX: Math.random() * (width || 1000),
    initialY: Math.random() * (height || 800),
    targetX: Math.random() * (width || 1000),
    targetY: Math.random() * (height || 800),
    duration: Math.random() * 5 + 5,
  }));
};

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [backgroundPoints, setBackgroundPoints] = useState<Array<any>>([]);

  // רק בצד הלקוח
  useLayoutEffect(() => {
    setIsMounted(true);
    const width = window.innerWidth;
    const height = window.innerHeight;
    setWindowSize({ width, height });
    setBackgroundPoints(createBackgroundPoints(width, height));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // אם לא במצב client-side, מציג גרסה סטטית
  if (!isMounted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-animation">
        <div className="relative flex flex-col items-center">
          <div className="mb-8">
            <GiftIcon className="w-24 h-24 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-center">
            מוצא המתנות
          </h1>
          <div className="text-xl text-white/80 mb-8 text-center">
            נמצא את המתנה המושלמת עבורך
          </div>
        </div>
      </div>
    );
  }

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, when: "beforeChildren" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-animation"
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <GiftIcon className="w-24 h-24 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold text-white mb-4 text-center"
        >
          מוצא המתנות
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-xl text-white/80 mb-8 text-center"
        >
          נמצא את המתנה המושלמת עבורך
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-48 h-1 bg-white/30 rounded-full overflow-hidden"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
            className="w-full h-full bg-white"
          />
        </motion.div>

        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {backgroundPoints.map((point, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-16 rounded-full bg-white/10"
              initial={{
                x: point.initialX,
                y: point.initialY,
              }}
              animate={{
                x: point.targetX,
                y: point.targetY,
                scale: [1, 1.5, 1],
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
      </div>
    </motion.div>
  );
} 