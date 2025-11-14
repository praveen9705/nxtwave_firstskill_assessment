import { Movie, MovieDetail, MovieListResponse } from '@/types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

async function fetchWithTimeout(url: string, timeout = 10000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export async function fetchPopularMovies(): Promise<MovieListResponse> {
  if (!API_KEY) {
    throw new Error('TMDB API key is missing');
  }
  
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  const res = await fetchWithTimeout(url);
  
  if (!res.ok) {
    throw new Error(`Failed to fetch popular movies: ${res.status} ${res.statusText}`);
  }
  
  return res.json();
}

export async function fetchNowPlayingMovies(): Promise<MovieListResponse> {
  if (!API_KEY) {
    throw new Error('TMDB API key is missing');
  }
  
  const url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
  const res = await fetchWithTimeout(url);
  
  if (!res.ok) {
    throw new Error(`Failed to fetch now playing movies: ${res.status} ${res.statusText}`);
  }
  
  return res.json();
}

export async function fetchTopRatedMovies(): Promise<MovieListResponse> {
  if (!API_KEY) {
    throw new Error('TMDB API key is missing');
  }
  
  const url = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
  const res = await fetchWithTimeout(url);
  
  if (!res.ok) {
    throw new Error(`Failed to fetch top rated movies: ${res.status} ${res.statusText}`);
  }
  
  return res.json();
}

export async function fetchUpcomingMovies(): Promise<MovieListResponse> {
  if (!API_KEY) {
    throw new Error('TMDB API key is missing');
  }
  
  const url = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
  const res = await fetchWithTimeout(url);
  
  if (!res.ok) {
    throw new Error(`Failed to fetch upcoming movies: ${res.status} ${res.statusText}`);
  }
  
  return res.json();
}

export async function fetchActionMovies(): Promise<MovieListResponse> {
  if (!API_KEY) {
    throw new Error('TMDB API key is missing');
  }
  
  const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=28&page=1`;
  const res = await fetchWithTimeout(url);
  
  if (!res.ok) {
    throw new Error(`Failed to fetch action movies: ${res.status} ${res.statusText}`);
  }
  
  return res.json();
}

export async function fetchComedyMovies(): Promise<MovieListResponse> {
  if (!API_KEY) {
    throw new Error('TMDB API key is missing');
  }
  
  const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=35&page=1`;
  const res = await fetchWithTimeout(url);
  
  if (!res.ok) {
    throw new Error(`Failed to fetch comedy movies: ${res.status} ${res.statusText}`);
  }
  
  return res.json();
}

export async function fetchMovieById(id: string): Promise<MovieDetail> {
  if (!API_KEY) {
    throw new Error('TMDB API key is missing');
  }
  
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`;
  const res = await fetchWithTimeout(url);
  
  if (!res.ok) {
    throw new Error(`Failed to fetch movie details: ${res.status} ${res.statusText}`);
  }
  
  return res.json();
}

export async function searchMovies(query: string): Promise<MovieListResponse> {
  if (!API_KEY) {
    throw new Error('TMDB API key is missing');
  }
  
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`;
  const res = await fetchWithTimeout(url);
  
  if (!res.ok) {
    throw new Error(`Failed to search movies: ${res.status} ${res.statusText}`);
  }
  
  return res.json();
}

export function getImageUrl(path: string, size: string = 'w500'): string {
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function getBackdropUrl(path: string): string {
  return `https://image.tmdb.org/t/p/original${path}`;
}