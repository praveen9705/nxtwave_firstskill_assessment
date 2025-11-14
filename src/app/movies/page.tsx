import Header from '@/components/Header';
import MovieRow from '@/components/MovieRow';
import { 
  fetchPopularMovies, 
  fetchNowPlayingMovies, 
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchActionMovies,
  fetchComedyMovies
} from '@/lib/tmdb';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
      overview: "A third sample movie for testing movie rows.",
      release_date: "2024-03-01",
      vote_average: 9.1,
      genre_ids: []
    }
  ]
};

export default async function MoviesPage() {
  try {
    const [
      popularMovies,
      nowPlayingMovies,
      topRatedMovies,
      upcomingMovies,
      actionMovies,
      comedyMovies
    ] = await Promise.all([
      fetchPopularMovies().catch(() => fallbackMovies),
      fetchNowPlayingMovies().catch(() => fallbackMovies),
      fetchTopRatedMovies().catch(() => fallbackMovies),
      fetchUpcomingMovies().catch(() => fallbackMovies),
      fetchActionMovies().catch(() => fallbackMovies),
      fetchComedyMovies().catch(() => fallbackMovies)
    ]);

    return (
      <div className="min-h-screen bg-black">
        <Header />
        
        <main className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">All Movies</h1>
              <p className="text-gray-300">
                Browse our complete collection of movies across different categories
              </p>
            </div>
            
            <div className="space-y-8">
              <MovieRow 
                movies={popularMovies.results} 
                categoryTitle="Popular Movies" 
              />
              
              <MovieRow 
                movies={nowPlayingMovies.results} 
                categoryTitle="Now Playing in Theaters" 
              />
              
              <MovieRow 
                movies={topRatedMovies.results} 
                categoryTitle="Top Rated Movies" 
              />
              
              <MovieRow 
                movies={upcomingMovies.results} 
                categoryTitle="Upcoming Movies" 
              />
              
              <MovieRow 
                movies={actionMovies.results} 
                categoryTitle="Action Movies" 
              />
              
              <MovieRow 
                movies={comedyMovies.results} 
                categoryTitle="Comedy Movies" 
              />
            </div>
            
            <div className="text-center mt-12">
              <Link href="/">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        
        <main className="pt-16">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Movies</h1>
              <p className="text-gray-300 mb-8">
                Unable to load movies at this time
              </p>
              <Link href="/">
                <Button>Back to Home</Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }
}