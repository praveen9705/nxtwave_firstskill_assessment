'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-white font-bold text-xl">StreamFlix</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-white hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link href="/movies" className="text-white hover:text-gray-300 transition-colors">
              Movies
            </Link>
            <Link href="/tv" className="text-white hover:text-gray-300 transition-colors">
              TV Shows
            </Link>
            <Link href="/my-list" className="text-white hover:text-gray-300 transition-colors">
              My List
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/search">
              <Button variant="ghost" size="sm" className="text-white hover:text-gray-300">
                Search
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="text-white hover:text-gray-300">
              Account
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}