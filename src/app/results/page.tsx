'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGift, 
  faArrowLeft, 
  faExternalLinkAlt, 
  faSync, 
  faTimes, 
  faShare,
  faCopy,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebook, 
  faTwitter, 
  faWhatsapp, 
  faLinkedin, 
  faTelegram 
} from '@fortawesome/free-brands-svg-icons';

interface GiftSuggestion {
  title: string;
  url: string;
  image: string;
  price: number;
  description: string;
  greeting: string;
  timestamp: string;
  orderNumber?: string;
  replacementReasons?: string[];
}

interface ReplacementResponse {
  gift: {
    title: string;
    url: string;
    image: string;
    price: number;
    description: string;
  };
  orderNumber: string;
  replacementReasons: string[];
  greeting?: string;
}

export default function Results() {
  const [giftSuggestion, setGiftSuggestion] = useState<GiftSuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showReplacementReasons, setShowReplacementReasons] = useState(false);
  const [isReplacingGift, setIsReplacingGift] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadGiftSuggestion = () => {
      const savedGift = localStorage.getItem('giftSuggestion');
      if (savedGift) {
        const giftData = JSON.parse(savedGift);
        setGiftSuggestion(giftData);
      }
      setIsLoading(false);
    };

    loadGiftSuggestion();
  }, []);

  const handleReplaceGift = () => {
    if (!giftSuggestion?.replacementReasons || giftSuggestion.replacementReasons.length === 0) {
      alert('אין סיבות החלפה זמינות למתנה זו');
      return;
    }
    setShowReplacementReasons(true);
  };

  const handleReasonSelect = async (reason: string) => {
    if (!giftSuggestion?.orderNumber) {
      alert('חסר מספר הזמנה');
      return;
    }

    try {
      setIsReplacingGift(true);
      setShowReplacementReasons(false);

      const response = await fetch('https://gserver-0do4.onrender.com/api/gifts/get-alternative', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderNumber: giftSuggestion.orderNumber,
          reason: reason
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: ReplacementResponse = await response.json();
      console.log('🔄 Replacement data:', data);
      console.log('🔄 Replacement greeting:', data.greeting);
      
      // Update the gift suggestion with the new gift
      const newGiftSuggestion = {
        title: data.gift.title,
        url: data.gift.url,
        image: data.gift.image,
        price: data.gift.price,
        description: data.gift.description,
        greeting: data.greeting || "🎁 מתנה חלופית מיוחדת בשבילך!",
        orderNumber: data.orderNumber,
        replacementReasons: data.replacementReasons,
        timestamp: new Date().toISOString()
      };

      setGiftSuggestion(newGiftSuggestion);
      
      // Update localStorage
      localStorage.setItem('giftSuggestion', JSON.stringify(newGiftSuggestion));
      
    } catch (error) {
      console.error('Error replacing gift:', error);
      alert('אירעה שגיאה בהחלפת המתנה. אנא נסה שוב.');
    } finally {
      setIsReplacingGift(false);
    }
  };

  // פונקציות שיתוף
  const getShareText = () => {
    if (!giftSuggestion) return '';
    return `מצאתי את המתנה המושלמת! ${giftSuggestion.title} - ב-₪${giftSuggestion.price} בלבד. בואו תראו מה מומלץ לכם!`;
  };

  const getShareUrl = () => {
    return window.location.origin + window.location.pathname;
  };

  const handleShare = (platform: string) => {
    if (!giftSuggestion) return;
    
    const text = getShareText();
    const url = getShareUrl();
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = async () => {
    try {
      const shareData = {
        title: 'מתנה מושלמת',
        text: getShareText(),
        url: getShareUrl(),
      };

      // אם יש Web Share API
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // עותק לקליפבורד
        await navigator.clipboard.writeText(`${getShareText()}\n${getShareUrl()}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // פדיבק למקרה של כשלון
      try {
        await navigator.clipboard.writeText(`${getShareText()}\n${getShareUrl()}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        alert('לא ניתן להעתיק את הקישור');
      }
    }
  };

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
          {giftSuggestion.orderNumber && (
            <p className="text-sm text-white/60 mt-2">
              מספר הזמנה: {giftSuggestion.orderNumber}
            </p>
          )}
        </motion.div>

        {/* Greeting Section */}
        {giftSuggestion.greeting && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative mb-8"
          >
            <div className="greeting-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
              {/* Decorative floating elements */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="floating-element absolute top-4 right-4 text-pink-300/40 text-6xl">❤️</div>
                <div className="floating-element absolute bottom-4 left-4 text-purple-300/40 text-4xl">✨</div>
                <div className="floating-element absolute top-1/2 left-8 text-blue-300/40 text-3xl">🎁</div>
                <div className="floating-element absolute top-8 left-1/3 text-yellow-300/30 text-2xl">⭐</div>
                <div className="floating-element absolute bottom-8 right-1/3 text-green-300/30 text-3xl">💫</div>
              </div>
              
              {/* Main greeting content */}
              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="inline-block mb-4"
                >
                  <span className="text-4xl emoji-dance pulse-glow">🌟</span>
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl font-bold mb-6 text-gradient"
                >
                  ברכה מיוחדת בשבילך
                </motion.h3>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative"
                >
                  {/* Quote decoration */}
                  <div className="absolute -top-4 -right-2 text-white/20 text-6xl font-serif">&quot;</div>
                  <div className="absolute -bottom-8 -left-2 text-white/20 text-6xl font-serif">&quot;</div>
                  
                  <p className="greeting-text text-lg md:text-xl leading-relaxed font-medium px-8 py-4">
                    {giftSuggestion.greeting}
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
                  className="mt-6 flex justify-center space-x-4"
                >
                  <span className="text-2xl emoji-dance" style={{ animationDelay: '0.5s' }}>💝</span>
                  <span className="text-2xl emoji-dance" style={{ animationDelay: '1s' }}>🎉</span>
                  <span className="text-2xl emoji-dance" style={{ animationDelay: '1.5s' }}>✨</span>
                </motion.div>
              </div>
              
              {/* Animated sparkle effects */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-8 right-12 w-2 h-2 bg-white/50 rounded-full shadow-lg"
                />
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.7, 0.2],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                  className="absolute bottom-12 right-8 w-3 h-3 bg-pink-300/50 rounded-full shadow-lg"
                />
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.4, 0.9, 0.4],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8
                  }}
                  className="absolute top-16 left-12 w-1.5 h-1.5 bg-blue-300/50 rounded-full shadow-lg"
                />
                <motion.div
                  animate={{
                    y: [0, -25, 0],
                    opacity: [0.1, 0.6, 0.1],
                    scale: [1, 1.4, 1]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                  className="absolute top-1/2 right-1/4 w-1 h-1 bg-yellow-300/60 rounded-full shadow-md"
                />
              </div>
            </div>
          </motion.div>
        )}

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
            
            <div className="flex flex-col gap-4">
              {/* Main actions row */}
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
                
                {giftSuggestion.replacementReasons && giftSuggestion.replacementReasons.length > 0 && (
                  <button
                    onClick={handleReplaceGift}
                    disabled={isReplacingGift}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors px-6 py-3 rounded-full font-semibold text-center flex items-center justify-center gap-2"
                  >
                    {isReplacingGift ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>מחליף מתנה...</span>
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faSync} />
                        <span>החלף מתנה</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Secondary actions row */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowShareModal(true)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 transition-colors px-6 py-3 rounded-full font-semibold text-center flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faShare} />
                  <span>שתף ברשתות</span>
                </button>
                
                <Link
                  href="/quiz"
                  className="flex-1 bg-white/10 hover:bg-white/20 transition-colors px-6 py-3 rounded-full font-semibold text-center flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <span>חזרה לשאלון</span>
                </Link>
                
                <button
                  onClick={() => {
                    localStorage.removeItem('giftSuggestion');
                    window.location.href = '/quiz';
                  }}
                  className="flex-1 bg-purple-500 hover:bg-purple-600 transition-colors px-6 py-3 rounded-full font-semibold text-center flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faSync} />
                  <span>שאלון חדש</span>
                </button>
              </div>
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

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">שתף את המתנה</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Social Media Share Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 share-grid">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="share-button bg-blue-600 hover:bg-blue-700"
                  >
                    <FontAwesomeIcon icon={faFacebook} size="lg" />
                    <span>פייסבוק</span>
                  </button>
                  
                  <button
                    onClick={() => handleShare('twitter')}
                    className="share-button bg-blue-400 hover:bg-blue-500"
                  >
                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                    <span>טוויטר</span>
                  </button>
                  
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="share-button bg-green-500 hover:bg-green-600"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                    <span>ווטסאפ</span>
                  </button>
                  
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="share-button bg-blue-700 hover:bg-blue-800"
                  >
                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                    <span>לינקדאין</span>
                  </button>
                  
                  <button
                    onClick={() => handleShare('telegram')}
                    className="share-button bg-blue-500 hover:bg-blue-600"
                  >
                    <FontAwesomeIcon icon={faTelegram} size="lg" />
                    <span>טלגרם</span>
                  </button>
                  
                  <button
                    onClick={handleCopyLink}
                    className={`share-button ${
                      copied 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-gray-600 hover:bg-gray-700'
                    }`}
                  >
                    <FontAwesomeIcon icon={copied ? faCheck : faCopy} size="lg" />
                    <span>{copied ? 'הועתק!' : 'העתק קישור'}</span>
                  </button>
                </div>
                
                {/* Share text preview */}
                <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-sm text-white/70 mb-2">טקסט השיתוף:</p>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {getShareText()}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Replacement Reasons Modal */}
      <AnimatePresence>
        {showReplacementReasons && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setShowReplacementReasons(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">למה אתה רוצה להחליף?</h3>
                <button
                  onClick={() => setShowReplacementReasons(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>
              </div>
              
              <div className="space-y-3">
                {giftSuggestion?.replacementReasons?.map((reason, index) => (
                  <button
                    key={index}
                    onClick={() => handleReasonSelect(reason)}
                    className="w-full p-4 text-right bg-white/10 hover:bg-white/20 transition-colors rounded-xl border border-white/20 hover:border-white/40"
                  >
                    {reason}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading overlay for gift replacement */}
      <AnimatePresence>
        {isReplacingGift && (
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
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="text-5xl text-orange-500"
                >
                  <FontAwesomeIcon icon={faSync} />
                </motion.div>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">מחליף מתנה</h3>
                <p className="text-white/80">מחפשים מתנה חלופית מושלמת בשבילך</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 