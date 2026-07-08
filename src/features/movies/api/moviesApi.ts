import {baseApi} from '../../../app/baseApi';
import {
  creditsSchema,
  genresResponseSchema,
  movieDetailsSchema,
  moviesResponseSchema,
} from './schemas';
import type {
  Credits,
  GenresResponse,
  MovieDetails,
  MoviesResponse,
} from './schemas';

export const movieCategories = [
  'popular',
  'top_rated',
  'upcoming',
  'now_playing',
] as const;
export type Category = (typeof movieCategories)[number];

export const categoryTitles: Record<Category, string> = {
  popular: 'Popular Movies',
  top_rated: 'Top Rated Movies',
  upcoming: 'Upcoming Movies',
  now_playing: 'Now Playing Movies',
};

export type DiscoverParams = {
  sort_by: string;
  page: number;
  'vote_average.gte': number;
  'vote_average.lte': number;
  with_genres?: string;
};

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMoviesByCategory: build.query<
      MoviesResponse,
      {category: Category; page: number}
    >({
      query: ({category, page}) => ({
        url: `/movie/${category}`,
        params: {page},
      }),
      extraOptions: {dataSchema: moviesResponseSchema},
    }),
    searchMovies: build.query<MoviesResponse, {query: string; page: number}>({
      query: ({query, page}) => ({url: '/search/movie', params: {query, page}}),
      extraOptions: {dataSchema: moviesResponseSchema},
    }),
    discoverMovies: build.query<MoviesResponse, DiscoverParams>({
      query: (params) => ({
        url: '/discover/movie',
        // a vote-count floor keeps "best rated" from being movies with one 10/10 vote
        params: {...params, 'vote_count.gte': 50},
      }),
      extraOptions: {dataSchema: moviesResponseSchema},
    }),
    getMovieDetails: build.query<MovieDetails, number>({
      query: (id) => `/movie/${id}`,
      extraOptions: {dataSchema: movieDetailsSchema},
    }),
    getMovieCredits: build.query<Credits, number>({
      query: (id) => `/movie/${id}/credits`,
      extraOptions: {dataSchema: creditsSchema},
    }),
    getSimilarMovies: build.query<MoviesResponse, number>({
      query: (id) => `/movie/${id}/similar`,
      extraOptions: {dataSchema: moviesResponseSchema},
    }),
    getGenres: build.query<GenresResponse, void>({
      query: () => '/genre/movie/list',
      extraOptions: {dataSchema: genresResponseSchema},
    }),
  }),
});

export const {
  useGetMoviesByCategoryQuery,
  useSearchMoviesQuery,
  useDiscoverMoviesQuery,
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
  useGetSimilarMoviesQuery,
  useGetGenresQuery,
} = moviesApi;
