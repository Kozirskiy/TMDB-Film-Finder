import s from './MovieCardSkeleton.module.css';

export const MovieCardSkeleton = () => (
  <div className={s.card} aria-hidden="true">
    <div className={`${s.poster} ${s.shimmer}`} />
    <div className={s.info}>
      <div className={`${s.line} ${s.shimmer}`} />
      <div className={`${s.lineShort} ${s.shimmer}`} />
    </div>
  </div>
);

export const MovieGridSkeleton = ({count = 6}: {count?: number}) => (
  <>
    {Array.from({length: count}, (_, i) => (
      <MovieCardSkeleton key={i} />
    ))}
  </>
);
