'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MovieRow from '@/components/MovieRow';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  genre_ids?: number[];
  addedAt: string;
}

export default function MyListPage() {
  const [myList, setMyList] = useState<Movie[]>([]);

  useEffect(() => {
    // Load movies from localStorage
    const savedList = JSON.parse(localStorage.getItem('myMovieList') || '[]');
    setMyList(savedList);
  }, []);

  const handleRemoveFromList = (movieId: number) => {
    const updatedList = myList.filter(movie => movie.id !== movieId);
    setMyList(updatedList);
    localStorage.setItem('myMovieList', JSON.stringify(updatedList));
  };

  if (myList.length === 0) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        
        <main className="pt-16">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">My List</h1>
              <p className="text-gray-300 text-lg mb-8">
                Your personal collection of movies and TV shows
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
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
                    />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Your list is empty
                </h2>
                <p className="text-gray-300 mb-8">
                  Start adding movies and shows to your list to see them here
                </p>
                
                <Link href="/">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700">
                    Browse Movies
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">My List</h1>
            <p className="text-gray-300">
              {myList.length} {myList.length === 1 ? 'movie' : 'movies'} in your collection
            </p>
          </div>
          
          <MovieRow 
            movies={myList} 
            categoryTitle="Your Movies" 
          />
          
          <div className="text-center mt-12">
            <Link href="/">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Browse More Movies
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}