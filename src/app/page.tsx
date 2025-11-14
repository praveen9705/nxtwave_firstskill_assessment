import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import MovieRow from '@/components/MovieRow';
import { fetchPopularMovies, fetchNowPlayingMovies, fetchTopRatedMovies } from '@/lib/tmdb';

// Fallback data for when API is unavailable
const fallbackMovies = {
  results: [
    {
      id: 1,
      title: "Sample Movie 1",
      poster_path: null,
      backdrop_path: null,
      overview: "This is a sample movie for demonstration purposes.",
      release_date: "2024-01-01",
      vote_average: 8.5,
      genre_ids: []
    },
    {
      id: 2,
      title: "Sample Movie 2",
      poster_path: null,
      backdrop_path: null,
      overview: "Another sample movie to showcase the interface.",
      release_date: "2024-02-01",
      vote_average: 7.8,
      genre_ids: []
    },
    {
      id: 3,
      title: "Sample Movie 3",
      poster_path: null,
      backdrop_path: null,
      overview: "A third sample movie for testing the movie rows.",
      release_date: "2024-03-01",
      vote_average: 9.1,
      genre_ids: []
    }
  ]
};

export default async function Home() {
  try {
    const [popularMovies, nowPlayingMovies, topRatedMovies] = await Promise.all([
      fetchPopularMovies().catch(() => fallbackMovies),
      fetchNowPlayingMovies().catch(() => fallbackMovies),
      fetchTopRatedMovies().catch(() => fallbackMovies)
    ]);

    const heroMovie = popularMovies.results[0];

    return (
      <div className="min-h-screen bg-black">
        <Header />
        
        <main className="pt-16">
          {heroMovie && <HeroBanner movie={heroMovie} />}
          
          <div className="px-4 md:px-8 py-8">
            <MovieRow 
              movies={popularMovies.results.slice(1)} 
              categoryTitle="Popular Movies" 
            />
            
            <MovieRow 
              movies={nowPlayingMovies.results} 
              categoryTitle="Now Playing" 
            />
            
            <MovieRow 
              movies={topRatedMovies.results} 
              categoryTitle="Top Rated" 
            />
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error fetching movies:', error);
    
    // Fallback UI with sample data
    const heroMovie = fallbackMovies.results[0];
    
    return (
      <div className="min-h-screen bg-black">
        <Header />
        
        <main className="pt-16">
          {heroMovie && <HeroBanner movie={heroMovie} />}
          
          <div className="px-4 md:px-8 py-8">
            <div className="bg-yellow-600/20 border border-yellow-600 p-4 rounded mb-6">
              <p className="text-yellow-300">⚠️ Using demo data - Unable to connect to movie database</p>
            </div>
            
            <MovieRow 
              movies={fallbackMovies.results} 
              categoryTitle="Popular Movies" 
            />
            
            <MovieRow 
              movies={fallbackMovies.results} 
              categoryTitle="Now Playing" 
            />
            
            <MovieRow 
              movies={fallbackMovies.results} 
              categoryTitle="Top Rated" 
            />
          </div>
        </main>
      </div>
    );
  }
}