const IMG_BASE = import.meta.env.VITE_IMG_BASE_URL;

export const POSTER_PLACEHOLDER =
  'https://placehold.co/342x513/1c2330/8b949e?text=No+Poster';
export const PROFILE_PLACEHOLDER =
  'https://placehold.co/185x278/1c2330/8b949e?text=No+Photo';

export const posterUrl = (
  path: string | null,
  size: 'w342' | 'w500' | 'w780' = 'w342'
) => (path ? `${IMG_BASE}/${size}${path}` : POSTER_PLACEHOLDER);

export const profileUrl = (path: string | null) =>
  path ? `${IMG_BASE}/w185${path}` : PROFILE_PLACEHOLDER;

export const backdropUrl = (path: string | null) =>
  path ? `${IMG_BASE}/w1280${path}` : '';
