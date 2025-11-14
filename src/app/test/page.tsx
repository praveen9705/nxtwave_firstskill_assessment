import { fetchPopularMovies } from '@/lib/tmdb';

export default async function TestPage() {
  try {
    const movies = await fetchPopularMovies();
    
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-3xl font-bold mb-4">API Test Page</h1>
        <div className="bg-green-600 p-4 rounded mb-4">
          <p>✅ API Connection Successful!</p>
          <p>Found {movies.results.length} movies</p>
        </div>
        
        <div className="space-y-4">
          {movies.results.slice(0, 3).map((movie) => (
            <div key={movie.id} className="bg-gray-800 p-4 rounded">
              <h3 className="text-xl font-semibold">{movie.title}</h3>
              <p className="text-gray-300">{movie.overview?.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-3xl font-bold mb-4">API Test Failed</h1>
        <div className="bg-red-600 p-4 rounded">
          <p>❌ Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  }
}