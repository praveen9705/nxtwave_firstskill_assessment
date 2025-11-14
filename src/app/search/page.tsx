'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MovieRow from '@/components/MovieRow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { searchMovies } from '@/lib/tmdb';
import { getAllMoviesForSearch, searchInLocalMovies } from '@/lib/search';
import { Movie } from '@/types/movie';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [tmdbResults, setTmdbResults] = useState<Movie[]>([]);
  const [localMovies, setLocalMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchMode, setSearchMode] = useState<'local' | 'tmdb'>('local');

  // Load local movies on component mount
  useEffect(() => {
    const loadLocalMovies = async () => {
      try {
        const movies = await getAllMoviesForSearch();
        setLocalMovies(movies);
      } catch (error) {
        console.error('Error loading local movies:', error);
      }
    };
    loadLocalMovies();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    console.log('Searching for:', searchQuery);
    console.log('Local movies loaded:', localMovies.length);
    console.log('Search mode:', searchMode);
    
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      if (searchMode === 'local') {
        // Search in local movies first
        const localResults = searchInLocalMovies(localMovies, searchQuery);
        console.log('Local search results:', localResults.length);
        setSearchResults(localResults);
        
        // If no local results, fallback to TMDB search
        if (localResults.length === 0) {
          console.log('No local results, searching TMDB...');
          const tmdbData = await searchMovies(searchQuery);
          console.log('TMDB results:', tmdbData.results.length);
          setTmdbResults(tmdbData.results);
          setSearchResults(tmdbData.results);
        } else {
          setTmdbResults([]);
        }
      } else {
        // TMDB search
        console.log('Searching TMDB directly...');
        const tmdbData = await searchMovies(searchQuery);
        console.log('TMDB direct results:', tmdbData.results.length);
        setTmdbResults(tmdbData.results);
        setSearchResults(tmdbData.results);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeChange = (mode: 'local' | 'tmdb') => {
    setSearchMode(mode);
    if (hasSearched && searchQuery.trim()) {
      // Re-run search with new mode
      if (mode === 'local') {
        const localResults = searchInLocalMovies(localMovies, searchQuery);
        setSearchResults(localResults);
      } else {
        setTmdbResults(prev => prev); // Keep existing TMDB results
      }
    }
  };

  const getSearchModeText = () => {
    if (searchResults.length === 0) return '';
    
    const isLocalResults = searchResults.some(result => 
      localMovies.some(movie => movie.id === result.id)
    );
    
    if (isLocalResults && tmdbResults.length > 0) {
      return `Showing ${searchResults.filter(r => localMovies.some(m => m.id === r.id)).length} from our website and ${tmdbResults.length} from TMDB`;
    } else if (isLocalResults) {
      return `Found ${searchResults.length} movies from our website`;
    } else {
      return `Found ${searchResults.length} movies from TMDB`;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Search Movies</h1>
            <p className="text-gray-300 mb-8">
              Find your favorite movies from our collection or search the entire TMDB database
            </p>
            
            <form onSubmit={handleSearch} className="max-w-2xl mb-6">
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="Search for movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
                <Button 
                  type="submit" 
                  disabled={isLoading || !searchQuery.trim()}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </form>

            {/* Search Mode Toggle */}
            {hasSearched && (
              <div className="flex gap-4 justify-center mb-6">
                <Button
                  variant={searchMode === 'local' ? 'default' : 'outline'}
                  size="sm"
                  className={searchMode === 'local' ? 'bg-red-600 text-white' : 'border-gray-600 text-gray-300 hover:bg-gray-800'}
                  onClick={() => handleModeChange('local')}
                >
                  Our Collection ({localMovies.length} movies)
                </Button>
                <Button
                  variant={searchMode === 'tmdb' ? 'default' : 'outline'}
                  size="sm"
                  className={searchMode === 'tmdb' ? 'bg-red-600 text-white' : 'border-gray-600 text-gray-300 hover:bg-gray-800'}
                  onClick={() => handleModeChange('tmdb')}
                >
                  TMDB Database
                </Button>
              </div>
            )}
          </div>
          
          {isLoading && (
            <div className="text-center py-12">
              <div className="text-gray-300">Searching movies...</div>
            </div>
          )}
          
          {hasSearched && !isLoading && (
            <>
              {searchResults.length > 0 ? (
                <div>
                  <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-white mb-2">
                      Found {searchResults.length} results for "{searchQuery}"
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {getSearchModeText()}
                    </p>
                  </div>
                  <MovieRow 
                    movies={searchResults} 
                    categoryTitle="Search Results" 
                  />
                </div>
              ) : (
                <div className="text-center py-12">
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
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                        />
                      </svg>
                    </div>
                    
                    <h2 className="text-2xl font-semibold text-white mb-4">
                      No movies found
                    </h2>
                    <p className="text-gray-300 mb-8">
                      We couldn't find any movies matching "{searchQuery}"
                    </p>
                    
                    <div className="space-y-4">
                      <p className="text-gray-400 text-sm">
                        Try:
                      </p>
                      <ul className="text-gray-400 text-sm space-y-2">
                        <li>• Checking your spelling</li>
                        <li>• Using more general keywords</li>
                        <li>• Switching between "Our Collection" and "TMDB Database"</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          
          {!hasSearched && (
            <div className="text-center py-12">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Smart Search
                </h2>
                <p className="text-gray-300 mb-8">
                  Search through our curated collection of {localMovies.length} movies or the entire TMDB database
                </p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-2">🎬 Our Collection</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Movies currently featured on our website across all categories
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Popular', 'Action', 'Comedy', 'Drama'].map((genre) => (
                        <Button
                          key={genre}
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300 hover:bg-gray-800"
                          onClick={() => setSearchQuery(genre)}
                        >
                          {genre}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-2">🌍 TMDB Database</h3>
                    <p className="text-gray-300 text-sm">
                      Access millions of movies from The Movie Database
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
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
}