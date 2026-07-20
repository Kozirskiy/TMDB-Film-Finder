import type {MouseEvent} from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {
  selectFavorites,
  toggleFavorite,
} from '../../../features/favorites/favoritesSlice';
import {posterUrl} from '../../utils/imageUrl';
import s from './MovieCard.module.css';

type Props = {
  id: number;
  title: string;
  posterPath?: string | null;
  posterUrl?: string;
  voteAverage: number;
  releaseDate?: string;
};

const ratingClass = (vote: number) =>
  vote >= 7 ? s.good : vote >= 5 ? s.medium : s.bad;

export const MovieCard = ({
  id,
  title,
  posterPath = null,
  posterUrl: readyPosterUrl,
  voteAverage,
  releaseDate,
}: Props) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const isFavorite = favorites.some((m) => m.id === id);
  const poster = readyPosterUrl ?? posterUrl(posterPath);

  const onToggleFavorite = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite({id, title, posterUrl: poster, voteAverage}));
  };

  return (
    <Link to={`/movie/${id}`} className={s.card}>
      <div className={s.posterWrap}>
        <img src={poster} alt={title} loading="lazy" className={s.poster} />
        <span className={`${s.badge} ${ratingClass(voteAverage)}`}>
          {voteAverage.toFixed(1)}
        </span>
        <button
          className={`${s.favBtn} ${isFavorite ? s.favActive : ''}`}
          onClick={onToggleFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className={s.info}>
        <h3 className={s.title} title={title}>
          {title}
        </h3>
        {releaseDate && (
          <span className={s.year}>{releaseDate.slice(0, 4)}</span>
        )}
      </div>
    </Link>
  );
};
