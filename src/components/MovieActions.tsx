'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MovieDetail } from '@/types/movie';

interface MovieActionsProps {
  movie: MovieDetail;
}

export default function MovieActions({ movie }: MovieActionsProps) {
  const [isInList, setIsInList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToList = async () => {
    setIsLoading(true);
    
    // Simulate adding to list (in a real app, this would call an API)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get current list from localStorage
    const currentList = JSON.parse(localStorage.getItem('myMovieList') || '[]');
    
    if (isInList) {
      // Remove from list
      const updatedList = currentList.filter((item: any) => item.id !== movie.id);
      localStorage.setItem('myMovieList', JSON.stringify(updatedList));
      setIsInList(false);
    } else {
      // Add to list
      const movieToAdd = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        overview: movie.overview,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        genre_ids: movie.genre_ids,
        addedAt: new Date().toISOString()
      };
      localStorage.setItem('myMovieList', JSON.stringify([...currentList, movieToAdd]));
      setIsInList(true);
    }
    
    setIsLoading(false);
  };

  // Check if movie is already in list
  useEffect(() => {
    const currentList = JSON.parse(localStorage.getItem('myMovieList') || '[]');
    setIsInList(currentList.some((item: any) => item.id === movie.id));
  }, [movie.id]);

  return (
    <div className="flex gap-4 mb-8">
      <Button size="lg" className="bg-white text-black hover:bg-gray-200">
        Play
      </Button>
      <Button 
        size="lg" 
        variant="secondary" 
        className="bg-gray-600/80 text-white hover:bg-gray-700/80"
        onClick={handleAddToList}
        disabled={isLoading}
      >
        {isLoading ? (
          'Loading...'
        ) : isInList ? (
          '✓ In List'
        ) : (
          '+ Add to List'
        )}
      </Button>
    </div>
  );
}