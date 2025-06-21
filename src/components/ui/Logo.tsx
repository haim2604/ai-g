import { GiftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity">
      <GiftIcon className="w-8 h-8" />
      <span className="text-xl font-bold">GIFT.P.T</span>
    </Link>
  );
} 