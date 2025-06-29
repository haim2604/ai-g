import Logo from '../ui/Logo';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <div className="flex items-center gap-6">
            <Link 
              href="/about" 
              className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-medium"
            >
              אודות
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
        </div>
      </div>
    </nav>
  );
} 