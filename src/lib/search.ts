import { Movie } from '@/types/movie';
import { 
  fetchPopularMovies, 
  fetchNowPlayingMovies, 
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchActionMovies,
  fetchComedyMovies
} from '@/lib/tmdb';

// Cache for storing movies from different categories
let movieCache: Movie[] = [];
let lastCacheUpdate = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getAllMoviesForSearch(): Promise<Movie[]> {
  const now = Date.now();
  
  // Return cached movies if still fresh
  if (movieCache.length > 0 && (now - lastCacheUpdate) < CACHE_DURATION) {
    return movieCache;
  }

  try {
    // Fetch all movie categories
    const [
      popularMovies,
      nowPlayingMovies,
      topRatedMovies,
      upcomingMovies,
      actionMovies,
      comedyMovies
    ] = await Promise.all([
      fetchPopularMovies().catch(() => ({ results: [] })),
      fetchNowPlayingMovies().catch(() => ({ results: [] })),
      fetchTopRatedMovies().catch(() => ({ results: [] })),
      fetchUpcomingMovies().catch(() => ({ results: [] })),
      fetchActionMovies().catch(() => ({ results: [] })),
      fetchComedyMovies().catch(() => ({ results: [] }))
    ]);

    // Combine all movies and remove duplicates
    const allMovies = [
      ...popularMovies.results,
      ...nowPlayingMovies.results,
      ...topRatedMovies.results,
      ...upcomingMovies.results,
      ...actionMovies.results,
      ...comedyMovies.results
    ];

    // Remove duplicates based on movie ID
    const uniqueMovies = allMovies.filter((movie, index, arr) => 
      arr.findIndex(m => m.id === movie.id) === index
    );

    // Cache the results
    movieCache = uniqueMovies;
    lastCacheUpdate = now;

    return uniqueMovies;
  } catch (error) {
    console.error('Error fetching movies for search:', error);
    return movieCache; // Return cached movies even if stale
  }
}

export function searchInLocalMovies(movies: Movie[], query: string): Movie[] {
  if (!query.trim()) return [];

  const queryLower = query.toLowerCase().trim();
  
  return movies.filter(movie => {
    const titleMatch = movie.title.toLowerCase().includes(queryLower);
    const overviewMatch = movie.overview?.toLowerCase().includes(queryLower);
    
    return titleMatch || overviewMatch;
  }).sort((a, b) => {
    // Prioritize exact title matches
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();
    
    const aExactMatch = aTitle === queryLower;
    const bExactMatch = bTitle === queryLower;
    
    if (aExactMatch && !bExactMatch) return -1;
    if (!aExactMatch && bExactMatch) return 1;
    
    // Then prioritize title starts with query
    const aStartsWith = aTitle.startsWith(queryLower);
    const bStartsWith = bTitle.startsWith(queryLower);
    
    if (aStartsWith && !bStartsWith) return -1;
    if (!aStartsWith && bStartsWith) return 1;
    
    // Finally, sort by popularity (vote_average)
    return (b.vote_average || 0) - (a.vote_average || 0);
  });
}