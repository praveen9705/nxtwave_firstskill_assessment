import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TVShowsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">TV Shows</h1>
            <p className="text-gray-300 text-lg mb-8">
              Coming Soon: TV Shows Collection
            </p>
            
            <div className="bg-gray-800 rounded-lg p-12 max-w-2xl mx-auto">
              <div className="text-gray-400 mb-6">
                <svg 
                  className="w-24 h-24 mx-auto mb-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
              </div>
              
              <h2 className="text-2xl font-semibold text-white mb-4">
                TV Shows Coming Soon
              </h2>
              <p className="text-gray-300 mb-8">
                We're working on bringing you the best TV shows collection. 
                Check back soon for updates!
              </p>
              
              <div className="flex gap-4 justify-center">
                <Link href="/">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">Browse Movies</Button>
                </Link>
                <Link href="/my-list">
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                    My List
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}