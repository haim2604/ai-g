'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faArrowLeft, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

interface GiftSuggestion {
  title: string;
  url: string;
  image: string;
  price: number;
  description: string;
  timestamp: string;
}

export default function Results() {
  const [giftSuggestion, setGiftSuggestion] = useState<GiftSuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGiftSuggestion = () => {
      const savedGift = localStorage.getItem('giftSuggestion');
      if (savedGift) {
        setGiftSuggestion(JSON.parse(savedGift));
      }
      setIsLoading(false);
    };

    loadGiftSuggestion();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-animation flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!giftSuggestion) {
    return (
      <div className="min-h-screen gradient-animation flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">לא נמצאה המלצת מתנה</h1>
        <p className="mb-8">נראה שעדיין לא השלמת את השאלון</p>
        <Link 
          href="/quiz"
          className="bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors px-6 py-3 rounded-full font-semibold flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          חזרה לשאלון
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-animation">
      <div className="max-w-4xl mx-auto p-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <FontAwesomeIcon icon={faGift} className="mr-4 text-pink-400" />
            המתנה המושלמת בשבילך
          </h1>
          <p className="text-xl text-white/80">
            בהתבסס על התשובות שלך, מצאנו את המתנה המושלמת
          </p>
        </motion.div>

        {/* Gift Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="relative h-[300px] md:h-[400px]">
            <Image
              src={giftSuggestion.image}
              alt={giftSuggestion.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Price Tag */}
            <div className="absolute top-4 left-4 bg-white/90 text-black px-4 py-2 rounded-full font-bold">
              ₪{giftSuggestion.price.toFixed(2)}
            </div>
          </div>

          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{giftSuggestion.title}</h2>
            <p className="text-lg text-white/80 mb-6">{giftSuggestion.description}</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={giftSuggestion.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-pink-500 hover:bg-pink-600 transition-colors px-6 py-3 rounded-full font-semibold text-center flex items-center justify-center gap-2"
              >
                <span>קנה עכשיו</span>
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </a>
              
              <Link
                href="/quiz"
                className="flex-1 bg-white/10 hover:bg-white/20 transition-colors px-6 py-3 rounded-full font-semibold text-center flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>חזרה לשאלון</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Timestamp */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 text-white/60"
        >
          <p>
            התוצאות התקבלו בתאריך:{' '}
            {new Date(giftSuggestion.timestamp).toLocaleDateString('he-IL', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </motion.div>
      </div>
    </div>
  );
} 