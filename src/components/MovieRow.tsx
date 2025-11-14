'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '@/types/movie';
import { getImageUrl } from '@/lib/tmdb';

interface MovieRowProps {
  movies: Movie[];
  categoryTitle: string;
}

export default function MovieRow({ movies, categoryTitle }: MovieRowProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4 px-4">
        {categoryTitle}
      </h2>
      
      <div className="relative group">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-4">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="flex-shrink-0 transition-transform duration-200 hover:scale-105"
            >
              <div className="relative w-36 md:w-44 h-56 md:h-64">
                {movie.poster_path ? (
                  <Image
                    src={getImageUrl(movie.poster_path)}
                    alt={movie.title}
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 768px) 144px, 176px"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 rounded-md flex items-center justify-center">
                    <span className="text-gray-400 text-sm text-center px-2">
                      {movie.title}
                    </span>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-black/0 hover:bg-black/60 transition-colors duration-200 rounded-md flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center">
                    <p className="text-white text-sm font-medium px-2 line-clamp-2">
                      {movie.title}
                    </p>
                    {movie.vote_average && (
                      <p className="text-yellow-400 text-sm mt-1">
                        ★ {movie.vote_average.toFixed(1)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
    </section>
  );
}