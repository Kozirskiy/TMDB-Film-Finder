import {z} from 'zod';

export const movieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string().optional().default(''),
  poster_path: z.string().nullable().optional().default(null),
  backdrop_path: z.string().nullable().optional().default(null),
  vote_average: z.number().optional().default(0),
  release_date: z.string().optional().default(''),
  genre_ids: z.array(z.number()).optional(),
});

export const moviesResponseSchema = z.object({
  page: z.number(),
  results: z.array(movieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export const movieDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string().optional().default(''),
  poster_path: z.string().nullable().optional().default(null),
  backdrop_path: z.string().nullable().optional().default(null),
  vote_average: z.number().optional().default(0),
  release_date: z.string().optional().default(''),
  runtime: z.number().nullable().optional().default(null),
  genres: z.array(z.object({id: z.number(), name: z.string()})),
  tagline: z.string().nullable().optional().default(''),
});

export const castMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  character: z.string().optional().default(''),
  profile_path: z.string().nullable().optional().default(null),
});

export const creditsSchema = z.object({
  id: z.number(),
  cast: z.array(castMemberSchema),
});

export const genreSchema = z.object({id: z.number(), name: z.string()});

export const genresResponseSchema = z.object({
  genres: z.array(genreSchema),
});

export type Movie = z.infer<typeof movieSchema>;
export type MoviesResponse = z.infer<typeof moviesResponseSchema>;
export type MovieDetails = z.infer<typeof movieDetailsSchema>;
export type CastMember = z.infer<typeof castMemberSchema>;
export type Credits = z.infer<typeof creditsSchema>;
export type Genre = z.infer<typeof genreSchema>;
export type GenresResponse = z.infer<typeof genresResponseSchema>;
