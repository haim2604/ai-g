'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

// מערך של מתנות לדוגמה - בהמשך נחליף עם API אמיתי
const mockGifts = [
  {
    title: 'אוזניות Sony WH-1000XM4',
    description: 'אוזניות על-אוזן אלחוטיות עם ביטול רעשים אקטיבי',
    price: '$278',
    image: 'https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg',
    link: 'https://www.aliexpress.com/item/1005002066903785.html',
    categories: ['טכנולוגיה', 'מוזיקה']
  },
  {
    title: 'סט סכיני שף מקצועיים',
    description: 'סט סכינים יפני איכותי עם להב פלדת דמשק',
    price: '$89',
    image: 'https://m.media-amazon.com/images/I/71v7NR5mChL._AC_SL1500_.jpg',
    link: 'https://www.aliexpress.com/item/1005001270888374.html',
    categories: ['מטבח', 'בישול']
  },
  {
    title: 'שעון חכם Galaxy Watch 5',
    description: 'שעון חכם עם מעקב בריאות ותמיכה ב-NFC',
    price: '$199',
    image: 'https://m.media-amazon.com/images/I/61Sl+xoVHoL._AC_SL1500_.jpg',
    link: 'https://www.aliexpress.com/item/1005004557777748.html',
    categories: ['טכנולוגיה', 'ספורט']
  }
];

export default function Results() {
  const [currentGiftIndex, setCurrentGiftIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [showChangeReason, setShowChangeReason] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        const { clientX, clientY } = e;
        cursorRef.current.style.transform = `translate(${clientX - 10}px, ${clientY - 10}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChangeGift = () => {
    setShowChangeReason(true);
  };

  const confirmChangeGift = () => {
    setIsChanging(true);
    setShowChangeReason(false);
    
    setTimeout(() => {
      setCurrentGiftIndex((prev) => (prev + 1) % mockGifts.length);
      setIsChanging(false);
    }, 1000);
  };

  const currentGift = mockGifts[currentGiftIndex];

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <main className="min-h-screen gradient-animation overflow-hidden">
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-8 text-center text-gradient"
            >
              המתנה המושלמת עבורך!
            </motion.h1>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentGift.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 rounded-xl p-6 mb-6 overflow-hidden relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <motion.img 
                  src={currentGift.image} 
                  alt={currentGift.title}
                  className="w-full h-64 object-contain mb-4 rounded-lg relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative z-10"
                >
                  <h2 className="text-2xl font-semibold mb-2">{currentGift.title}</h2>
                  <p className="text-lg mb-4 text-gray-200">{currentGift.description}</p>
                  <p className="text-3xl font-bold mb-6 text-gradient">{currentGift.price}</p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.a
                      href={currentGift.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full text-center font-semibold hover:bg-white/20 transition-all transform hover-lift magnetic"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      לרכישה באלי אקספרס
                    </motion.a>
                    <motion.button
                      onClick={handleChangeGift}
                      className="flex items-center justify-center gap-2 flex-1 bg-purple-500/50 backdrop-blur-md hover:bg-purple-500/70 transition-colors px-6 py-3 rounded-full font-semibold magnetic"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowPathIcon className={`w-5 h-5 ${isChanging ? 'animate-spin' : ''}`} />
                      החלף מתנה
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {showChangeReason && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 mb-6"
              >
                <h3 className="text-xl font-semibold mb-4 text-gradient">למה תרצה/י להחליף את המתנה?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.button
                    onClick={() => confirmChangeGift()}
                    className="bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-lg magnetic"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    יקר מדי
                  </motion.button>
                  <motion.button
                    onClick={() => confirmChangeGift()}
                    className="bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-lg magnetic"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    לא מתאים לטעם
                  </motion.button>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/"
                className="block text-center text-gray-300 hover:text-white transition-colors hover-lift"
              >
                חזרה להתחלה
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated background shapes */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/5"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 2 + 1,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: [1, 2, 1],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                filter: 'blur(40px)',
              }}
            />
          ))}
        </div>
      </main>
    </>
  );
} 