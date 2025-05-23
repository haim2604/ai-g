'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function IntroAnimation() {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
    }, 4000); // משך האנימציה

    return () => clearTimeout(timer);
  }, []);

  if (isComplete) return null;

  const textVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 1.5,
      filter: "blur(10px)",
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const particleCount = 50;
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 2,
    duration: Math.random() * 2 + 2,
  }));

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* רקע דינמי */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white/30"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -100, -200],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* אנימציית לוגו */}
      <div className="relative">
        <motion.div
          className="relative z-10 flex flex-col items-center"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* קו עליון */}
          <motion.div
            variants={lineVariants}
            className="w-32 h-0.5 bg-white mb-8"
          />

          {/* טקסט ראשי */}
          <motion.div
            variants={textVariants}
            className="text-center"
          >
            <motion.div
              className="text-6xl font-bold text-white mb-4 relative"
              style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
            >
              מוצא
              <span className="text-gradient"> המתנות</span>
            </motion.div>
            <motion.div
              className="text-xl text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              חווית מציאת מתנות חדשה
            </motion.div>
          </motion.div>

          {/* קו תחתון */}
          <motion.div
            variants={lineVariants}
            className="w-32 h-0.5 bg-white mt-8"
          />

          {/* אפקט זוהר */}
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-white/20 to-transparent"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 2],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </div>

      {/* וילון סגירה */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{
          delay: 3.5,
          duration: 0.5,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "top" }}
      />
    </motion.div>
  );
} 