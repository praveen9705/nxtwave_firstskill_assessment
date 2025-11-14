import Header from '@/components/Header';
import MovieActions from '@/components/MovieActions';
import { fetchMovieById } from '@/lib/tmdb';
import { getImageUrl, getBackdropUrl } from '@/lib/tmdb';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface MoviePageProps {
  params: {
    id: string;
  };
}

export default async function MoviePage({ params }: MoviePageProps) {
  try {
    const movie = await fetchMovieById(params.id);

    return (
      <div className="min-h-screen bg-black">
        <Header />
        
        <main className="pt-16">
          <div className="relative h-[60vh] min-h-[400px]">
            <Image
              src={getBackdropUrl(movie.backdrop_path || '')}
              alt={movie.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="container mx-auto">
                <Link href="/" className="text-white hover:text-gray-300 mb-4 inline-block">
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-shrink-0">
                <div className="relative w-64 h-96">
                  {movie.poster_path ? (
                    <Image
                      src={getImageUrl(movie.poster_path)}
                      alt={movie.title}
                      fill
                      className="object-cover rounded-lg"
                      sizes="256px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-center px-4">
                        {movie.title}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {movie.title}
                </h1>
                
                {movie.tagline && (
                  <p className="text-xl text-gray-300 italic mb-6">
                    "{movie.tagline}"
                  </p>
                )}
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  {movie.release_date && (
                    <span className="text-gray-300">
                      {new Date(movie.release_date).getFullYear()}
                    </span>
                  )}
                  
                  {movie.runtime && (
                    <span className="text-gray-300">
                      {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                    </span>
                  )}
                  
                  {movie.vote_average && (
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-white">{movie.vote_average.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {movie.genres.map((genre) => (
                      <Badge key={genre.id} variant="secondary">
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                )}
                
                <MovieActions movie={movie} />
                
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-3">Overview</h2>
                    <p className="text-gray-300 leading-relaxed">
                      {movie.overview || 'No overview available.'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {movie.status && (
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">Status</h3>
                        <p className="text-gray-300">{movie.status}</p>
                      </div>
                    )}
                    
                    {movie.budget && movie.budget > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">Budget</h3>
                        <p className="text-gray-300">${movie.budget.toLocaleString()}</p>
                      </div>
                    )}
                    
                    {movie.revenue && movie.revenue > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">Revenue</h3>
                        <p className="text-gray-300">${movie.revenue.toLocaleString()}</p>
                      </div>
                    )}
                    
                    {movie.imdb_id && (
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">IMDB</h3>
                        <a
                          href={`https://www.imdb.com/title/${movie.imdb_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          View on IMDB
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error fetching movie:', error);
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Movie Not Found</h1>
          <p className="text-gray-300 mb-6">The movie you're looking for doesn't exist or couldn't be loaded.</p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }
}