'use client';

import Logo from '../ui/Logo';
import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/about" 
              className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-medium"
            >
              אודות
            </Link>
            <Link 
              href="/blog" 
              className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-medium"
            >
              מדריכים
            </Link>
            <Link 
              href="/categories" 
              className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-medium"
            >
              קטגוריות
            </Link>
            <Link 
              href="/occasions" 
              className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-medium"
            >
              אירועים
            </Link>
            <Link 
              href="/faq" 
              className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-medium"
            >
              שאלות נפוצות
            </Link>
            <Link 
              href="/quiz" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105"
            >
              התחל שאלון
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white/80 hover:text-white transition-colors duration-300 p-2"
              aria-label="תפריט ניווט"
            >
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="text-xl" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-lg rounded-lg mt-2 p-4">
            <div className="flex flex-col gap-4">
              <Link 
                href="/about" 
                className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                אודות
              </Link>
              <Link 
                href="/blog" 
                className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                מדריכים
              </Link>
              <Link 
                href="/categories" 
                className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                קטגוריות
              </Link>
              <Link 
                href="/occasions" 
                className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                אירועים
              </Link>
              <Link 
                href="/faq" 
                className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                שאלות נפוצות
              </Link>
              <Link 
                href="/quiz" 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                התחל שאלון
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 