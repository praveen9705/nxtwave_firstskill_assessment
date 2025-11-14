import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';
import { getBackdropUrl } from '@/lib/tmdb';
import { Button } from '@/components/ui/button';

interface HeroBannerProps {
  movie: Movie;
}

export default function HeroBanner({ movie }: HeroBannerProps) {
  return (
    <section className="relative h-[70vh] min-h-[400px] w-full">
      <Image
        src={getBackdropUrl(movie.backdrop_path || '')}
        alt={movie.title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {movie.title}
          </h1>
          
          {movie.overview && (
            <p className="text-lg text-gray-200 mb-6 line-clamp-3">
              {movie.overview}
            </p>
          )}
          
          <div className="flex items-center space-x-4">
            <Link href={`/movie/${movie.id}`}>
              <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                Play
              </Button>
            </Link>
            
            <Link href={`/movie/${movie.id}`}>
              <Button size="lg" variant="secondary" className="bg-gray-600/80 text-white hover:bg-gray-700/80">
                More Info
              </Button>
            </Link>
          </div>
          
          {movie.vote_average && (
            <div className="mt-4 flex items-center space-x-2">
              <span className="text-yellow-400">★</span>
              <span className="text-white">{movie.vote_average.toFixed(1)}</span>
              {movie.release_date && (
                <span className="text-gray-300">
                  • {new Date(movie.release_date).getFullYear()}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}