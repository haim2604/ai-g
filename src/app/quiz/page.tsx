'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import {
  faBaby,
  faChild,
  faGamepad,
  faPersonWalking,
  faHeart,
  faUtensils,
  faPalette,
  faCamera,
  faMusic,
  faLaptopCode,
  faGift,
  faHome,
  faTshirt,
  faBook,
  faUserGraduate,
  faUserTie,
  faPersonCane,
  faStar,
  faMagic
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface BackgroundPoint {
  id: number;
  initialX: number;
  initialY: number;
  targetX: number;
  targetY: number;
  duration: number;
}

interface Option {
  text: string;
  icon?: IconDefinition;
}

interface GiftResponse {
  gift: {
    title: string;
    url: string;
    image: string;
    price: number;
    description: string;
  };
}

interface Question {
  id: number;
  question: string;
  backgroundImage: string;
  options: Option[];
  hasOtherOption: boolean;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'מי האדם שאתה בוחר עבורו מתנה?',
    backgroundImage: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=2070&auto=format&fit=crop',
    options: [
      { text: 'בן/בת זוג', icon: faHeart },
      { text: 'חבר/חברה קרובים', icon: faUserGraduate },
      { text: 'בן משפחה (הורה, אח/אחות, ילד)', icon: faHome },
      { text: 'עמית לעבודה', icon: faUserTie },
      { text: 'אחר' }
    ],
    hasOtherOption: true
  },
  {
    id: 2,
    question: 'איזו פעילות הכי משמחת אותם בזמן הפנוי שלהם?',
    backgroundImage: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=2070&auto=format&fit=crop',
    options: [
      { text: 'משחק עם צעצועים או יצירה (לילדים)', icon: faChild },
      { text: 'צפייה בסרטים או סדרות' },
      { text: 'בישול או אפייה', icon: faUtensils },
      { text: 'טיולים בטבע או פעילויות בחוץ', icon: faPersonWalking },
      { text: 'גיימינג או משחקים דיגיטליים', icon: faGamepad },
      { text: 'אחר' }
    ],
    hasOtherOption: true
  },
  {
    id: 3,
    question: 'איזה סוג של חפץ או גאדג\'ט הם הכי היו מתלהבים לקבל?',
    backgroundImage: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=2070&auto=format&fit=crop',
    options: [
      { text: 'צעצוע או משחק (לילדים, כמו פאזל, מכונית על שלט)', icon: faChild },
      { text: 'משהו טכנולוגי (אוזניות, שעון חכם)', icon: faLaptopCode },
      { text: 'כלי מטבח או בית (מכונת קפה, מארגן)', icon: faHome },
      { text: 'ציוד לטיולים או ספורט', icon: faPersonWalking },
      { text: 'משהו יצירתי (ערכת ציור, יומן)', icon: faPalette },
      { text: 'לא יודע, תפתיעו אותם!', icon: faGift }
    ],
    hasOtherOption: false
  },
  {
    id: 4,
    question: 'איזה סגנון עיצובי הכי מתאים לטעם שלהם?',
    backgroundImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2070&auto=format&fit=crop',
    options: [
      { text: 'צבעוני ושובב (מתאים לילדים)', icon: faChild },
      { text: 'מינימליסטי ונקי (לבן, שחור, אפור)' },
      { text: 'צבעוני ותוסס (אדום, כחול, צהוב)', icon: faPalette },
      { text: 'וינטג\' או רטרו' },
      { text: 'מודרני והייטק', icon: faLaptopCode },
      { text: 'אין לי מושג' }
    ],
    hasOtherOption: false
  },
  {
    id: 5,
    question: 'מה הדבר שהם הכי צריכים כדי להקל על השגרה שלהם?',
    backgroundImage: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=2070&auto=format&fit=crop',
    options: [
      { text: 'משהו שיעזור בארגון (תיק, מארגן שולחני, תיק גן לילדים)', icon: faHome },
      { text: 'גאדג\'ט שחוסך זמן (מטען מהיר, רובוט ניקוי)', icon: faLaptopCode },
      { text: 'משהו לנוחות בבית (כרית, שמיכה, צעצוע מרגיע)', icon: faHome },
      { text: 'משהו שמשפר את מצב הרוח (נרות, תאורה, משחק)', icon: faHeart },
      { text: 'אחר' }
    ],
    hasOtherOption: true
  },
  {
    id: 6,
    question: 'אם הם היו יכולים ללמוד משהו חדש, מה זה היה?',
    backgroundImage: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop',
    options: [
      { text: 'משחק או יצירה (ציור, בנייה, לילדים)', icon: faPalette },
      { text: 'בישול או אפייה', icon: faUtensils },
      { text: 'צילום או עריכת וידאו', icon: faCamera },
      { text: 'נגינה על כלי מוזיקלי', icon: faMusic },
      { text: 'טכנולוגיה או תכנות', icon: faLaptopCode },
      { text: 'משהו אחר' }
    ],
    hasOtherOption: true
  },
  {
    id: 7,
    question: 'איזו מתנה שהם קיבלו בעבר ממש ריגשה אותם?',
    backgroundImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2070&auto=format&fit=crop',
    options: [
      { text: 'משהו אישי ומרגש (תמונה, מכתב, ציור של ילד)', icon: faHeart },
      { text: 'צעצוע או משחק (לילדים)', icon: faChild },
      { text: 'גאדג\'ט טכנולוגי', icon: faLaptopCode },
      { text: 'משהו שימושי ליום יום', icon: faHome },
      { text: 'חוויה (שובר, כרטיס)', icon: faGift },
      { text: 'לא יודע' }
    ],
    hasOtherOption: false
  },
  {
    id: 8,
    question: 'האם הם מעדיפים מתנות שימושיות או כאלה שמפנקות?',
    backgroundImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099&auto=format&fit=crop',
    options: [
      { text: 'שימושי (כלי עבודה, אביזרים, ציוד ללימודים)', icon: faHome },
      { text: 'מפנק (בשמים, מוצרי טיפוח, צעצוע מהנה)', icon: faGift },
      { text: 'שילוב של שניהם', icon: faHeart },
      { text: 'אין לי מושג' }
    ],
    hasOtherOption: false
  },
  {
    id: 9,
    question: 'איך הם הכי אוהבים לבלות עם חברים או משפחה?',
    backgroundImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop',
    options: [
      { text: 'משחקים או פעילויות יצירתיות (לילדים)', icon: faChild },
      { text: 'ערב משחקים או סרטים', icon: faGamepad },
      { text: 'ארוחה משותפת או על האש', icon: faUtensils },
      { text: 'טיול או פעילות בחוץ', icon: faPersonWalking },
      { text: 'שיחות ושיתוף סיפורים', icon: faHeart },
      { text: 'אחר' }
    ],
    hasOtherOption: true
  },
  {
    id: 10,
    question: 'אם היית בוחר קטגוריה למתנה שתשמח אותם, מה היא הייתה?',
    backgroundImage: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=2070&auto=format&fit=crop',
    options: [
      { text: 'צעצועים או משחקים (לילדים)', icon: faChild },
      { text: 'טכנולוגיה (אוזניות, גאדג\'טים)', icon: faLaptopCode },
      { text: 'בית ומטבח (כלים, עיצוב)', icon: faHome },
      { text: 'אופנה וסטייל (בגדים, תכשיטים)', icon: faTshirt },
      { text: 'תחביבים ופנאי (ספרים, משחקים)', icon: faBook },
      { text: 'משהו מפתיע!', icon: faGift }
    ],
    hasOtherOption: false
  },
  {
    id: 11,
    question: 'מה טווח הגיל שלהם?',
    backgroundImage: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=2071&auto=format&fit=crop',
    options: [
      { text: '3–6 (גיל רך)', icon: faBaby },
      { text: '7–12 (ילדים)', icon: faChild },
      { text: '13–17 (נוער)', icon: faUserGraduate },
      { text: '18–25 (צעירים)', icon: faUserGraduate },
      { text: '26–35 (מבוגרים צעירים)', icon: faUserTie },
      { text: '36–50 (מבוגרים)', icon: faUserTie },
      { text: '51–65 (מבוגרים בכירים)', icon: faUserTie },
      { text: '65+ (קשישים)', icon: faPersonCane }
    ],
    hasOtherOption: false
  }
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
  const [otherText, setOtherText] = useState<string>('');
  const [showOtherInput, setShowOtherInput] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const [backgroundPoints, setBackgroundPoints] = useState<BackgroundPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const formatAnswersForAPI = () => {
    const traits: Record<string, string> = {};
    
    // Map answers to API format
    Object.entries(answers).forEach(([questionId, answer]) => {
      switch (parseInt(questionId)) {
        case 1:
          traits["recipient"] = answer;
          break;
        case 2:
          traits["hobby"] = answer;
          break;
        case 3:
          traits["gadget_preference"] = answer;
          break;
        case 4:
          traits["style"] = answer;
          break;
        case 5:
          traits["daily_need"] = answer;
          break;
        case 6:
          traits["learning_interest"] = answer;
          break;
        case 7:
          traits["past_gift"] = answer;
          break;
        case 8:
          traits["gift_type"] = answer;
          break;
        case 9:
          traits["social_preference"] = answer;
          break;
        case 10:
          traits["gift_category"] = answer;
          break;
        case 11:
          traits["age"] = answer.split(' ')[0]; // Extract the age range
          break;
      }
    });

    return { traits };
  };

  const sendAnswersToAPI = async () => {
    try {
      setIsLoading(true);
      const formattedData = formatAnswersForAPI();
      
      const response = await fetch('https://aig-bef3.onrender.com/api/gifts/get-gift', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: GiftResponse = await response.json();
      
      // Store only the gift suggestion with timestamp
      localStorage.setItem('giftSuggestion', JSON.stringify({
        ...data.gift,
        timestamp: new Date().toISOString()
      }));
      
      router.push('/results');
    } catch (error) {
      console.error('Error sending answers:', error);
      alert('אירעה שגיאה בקבלת ההמלצה למתנה. אנא נסה שוב.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = async (answer: string) => {
    if (answer === 'אחר') {
      setShowOtherInput(true);
      return;
    }

    const finalAnswer = showOtherInput ? otherText : answer;
    const newAnswers = { ...answers, [questions[currentQuestion].id]: finalAnswer };
    setAnswers(newAnswers);
    setShowOtherInput(false);
    setOtherText('');
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // This is the last question, send answers to API
      await sendAnswersToAPI();
    }
  };

  const handleOtherSubmit = () => {
    if (otherText.trim()) {
      handleAnswer(otherText);
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
                  key={option.text}
                  onClick={() => handleAnswer(option.text)}
                  className="relative group p-6 text-xl text-center bg-white/10 backdrop-blur-md rounded-xl"
                >
                  {option.text}
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
    <div className="min-h-screen gradient-animation overflow-hidden relative" ref={containerRef}>
      <div ref={cursorRef} className="custom-cursor" />
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Image
              src={questions[currentQuestion].backgroundImage}
              alt="Background"
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex flex-col items-center justify-center min-h-screen p-4 relative z-10"
        >
          <div className="w-full max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="text-4xl md:text-5xl font-bold mb-12 text-center text-gradient"
            >
              {questions[currentQuestion].question}
            </motion.h2>
            
            {showOtherInput ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-4"
              >
                <input
                  type="text"
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  placeholder="הקלד את תשובתך כאן..."
                  className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <div className="flex gap-4 w-full">
                  <button
                    onClick={handleOtherSubmit}
                    className="flex-1 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors px-6 py-3 rounded-full font-semibold"
                  >
                    המשך
                  </button>
                  <button
                    onClick={() => {
                      setShowOtherInput(false);
                      setOtherText('');
                    }}
                    className="flex-1 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors px-6 py-3 rounded-full font-semibold"
                  >
                    חזור
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={option.text}
                    variants={{
                      hidden: { 
                        opacity: 0,
                        y: 20,
                        scale: 0.8
                      },
                      visible: { 
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 12,
                          mass: 0.4
                        }
                      },
                      exit: {
                        opacity: 0,
                        y: -20,
                        scale: 0.8,
                        transition: {
                          duration: 0.2
                        }
                      }
                    }}
                    onClick={() => handleAnswer(option.text)}
                    className="relative group"
                    whileHover={{ 
                      scale: 1.05,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 10
                      }
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 10
                      }
                    }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-xl"
                      whileHover={{
                        backgroundColor: "rgba(255,255,255,0.3)",
                        transition: { duration: 0.15 }
                      }}
                    />
                    <div className="relative p-6 text-xl text-center flex items-center justify-center gap-3">
                      {option.icon && (
                        <motion.div
                          initial={{ rotate: -10, scale: 0.8 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                            delay: index * 0.05 + 0.1
                          }}
                        >
                          <FontAwesomeIcon 
                            icon={option.icon} 
                            className={`w-6 h-6 transition-all duration-300 ${
                              option.icon === faBaby || option.icon === faChild ? 'text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.7)]' :
                              option.icon === faGamepad ? 'text-fuchsia-500 drop-shadow-[0_0_8px_rgba(217,70,239,0.7)]' :
                              option.icon === faPersonWalking ? 'text-lime-500 drop-shadow-[0_0_8px_rgba(132,204,22,0.7)]' :
                              option.icon === faHeart ? 'text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.7)]' :
                              option.icon === faUtensils ? 'text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.7)]' :
                              option.icon === faPalette ? 'text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.7)]' :
                              option.icon === faCamera ? 'text-indigo-500 drop-shadow-[0_0_8px_rgba(99,102,241,0.7)]' :
                              option.icon === faMusic ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]' :
                              option.icon === faLaptopCode ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]' :
                              option.icon === faGift ? 'text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.7)]' :
                              option.icon === faHome ? 'text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.7)]' :
                              option.icon === faTshirt ? 'text-violet-500 drop-shadow-[0_0_8px_rgba(139,92,246,0.7)]' :
                              option.icon === faBook ? 'text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.7)]' :
                              option.icon === faUserGraduate ? 'text-sky-500 drop-shadow-[0_0_8px_rgba(14,165,233,0.7)]' :
                              option.icon === faUserTie ? 'text-slate-400 drop-shadow-[0_0_8px_rgba(148,163,184,0.7)]' :
                              option.icon === faPersonCane ? 'text-zinc-400 drop-shadow-[0_0_8px_rgba(161,161,170,0.7)]' :
                              'text-white'
                            } hover:scale-110 hover:brightness-125`}
                          />
                        </motion.div>
                      )}
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 + 0.15 }}
                      >
                        {option.text}
                      </motion.span>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="mt-12 text-center"
            >
              <p className="text-lg mb-4">
                שאלה {currentQuestion + 1} מתוך {questions.length}
              </p>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Animated background shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-20">
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

      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl flex flex-col items-center gap-6 max-w-sm mx-4"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-5xl text-pink-500"
                >
                  <FontAwesomeIcon icon={faGift} />
                </motion.div>
                <motion.div
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 0.5
                  }}
                  className="absolute -top-3 -right-3 text-2xl text-yellow-400"
                >
                  <FontAwesomeIcon icon={faStar} />
                </motion.div>
                <motion.div
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.75,
                    repeatDelay: 0.5
                  }}
                  className="absolute -bottom-3 -left-3 text-2xl text-purple-400"
                >
                  <FontAwesomeIcon icon={faMagic} />
                </motion.div>
              </div>
              
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-center"
              >
                <h3 className="text-2xl font-bold mb-2">מחפשים את המתנה המושלמת</h3>
                <p className="text-white/80">אנחנו מעבדים את התשובות שלך ומתאימים את המתנה הטובה ביותר</p>
              </motion.div>
              
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                    className="w-3 h-3 bg-white rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 