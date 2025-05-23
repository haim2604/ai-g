'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface BackgroundPoint {
  id: number;
  initialX: number;
  initialY: number;
  targetX: number;
  targetY: number;
  duration: number;
}

const questions = [
  {
    id: 1,
    question: 'עבור מי המתנה מיועדת?',
    options: ['בן/בת זוג', 'חבר/ה', 'משפחה', 'עמית/ה לעבודה'],
  },
  {
    id: 2,
    question: 'מה התקציב שלך למתנה?',
    options: ['עד 100₪', '100₪-300₪', '300₪-500₪', 'מעל 500₪'],
  },
  {
    id: 3,
    question: 'מה תחומי העניין העיקריים של מקבל/ת המתנה?',
    options: ['טכנולוגיה', 'אופנה', 'ספורט', 'בישול ואפייה'],
  },
  {
    id: 4,
    question: 'מה הגיל של מקבל/ת המתנה?',
    options: ['18-25', '26-35', '36-50', '50+'],
  },
  {
    id: 5,
    question: 'באיזו הזדמנות המתנה?',
    options: ['יום הולדת', 'חתונה', 'חג', 'סתם כי בא לי'],
  },
];

// פונקציה עזר ליצירת מערך של נקודות רקע
const createBackgroundPoints = (width: number, height: number): BackgroundPoint[] => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: i,
    initialX: Math.random() * (width || 1000),
    initialY: Math.random() * (height || 800),
    targetX: Math.random() * (width || 1000),
    targetY: Math.random() * (height || 800),
    duration: Math.random() * 5 + 5,
  }));
};

export default function Quiz() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isMounted, setIsMounted] = useState(false);
  const [backgroundPoints, setBackgroundPoints] = useState<BackgroundPoint[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setIsMounted(true);
    setBackgroundPoints(createBackgroundPoints(window.innerWidth, window.innerHeight));

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        const { clientX, clientY } = e;
        cursorRef.current.style.transform = `translate(${clientX - 10}px, ${clientY - 10}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQuestion].id]: answer }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      localStorage.setItem('quizAnswers', JSON.stringify(answers));
      router.push('/results');
    }
  };

  // אם לא במצב client-side, מציג גרסה סטטית
  if (!isMounted) {
    return (
      <div className="min-h-screen gradient-animation overflow-hidden">
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gradient">
              {questions[currentQuestion].question}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="relative group p-6 text-xl text-center bg-white/10 backdrop-blur-md rounded-xl"
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg mb-4">
                שאלה {currentQuestion + 1} מתוך {questions.length}
              </p>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-animation overflow-hidden" ref={containerRef}>
      <div ref={cursorRef} className="custom-cursor" />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center justify-center min-h-screen p-4"
        >
          <div className="w-full max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-12 text-center text-gradient"
            >
              {questions[currentQuestion].question}
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={option}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onClick={() => handleAnswer(option)}
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-xl transform transition-transform group-hover:scale-105" />
                  <div className="relative p-6 text-xl text-center">
                    {option}
                  </div>
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <p className="text-lg mb-4">
                שאלה {currentQuestion + 1} מתוך {questions.length}
              </p>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Animated background shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {backgroundPoints.map((point) => (
          <motion.div
            key={point.id}
            className="absolute w-32 h-32 rounded-full bg-white/5"
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
              filter: 'blur(40px)',
            }}
          />
        ))}
      </div>
    </div>
  );
} 