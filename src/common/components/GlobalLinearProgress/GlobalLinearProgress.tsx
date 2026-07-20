import {useAppSelector} from '../../hooks/storeHooks';
import s from './GlobalLinearProgress.module.css';

// Any in-flight RTK Query request (page change, filters, search, navigation
// data) lights up the bar — no per-page loader wiring needed.
export const GlobalLinearProgress = () => {
  const isFetching = useAppSelector((state) =>
    Object.values(state.api.queries).some((q) => q?.status === 'pending')
  );

  if (!isFetching) return null;

  return (
    <div className={s.track} role="progressbar" aria-label="Loading">
      <div className={s.bar} />
    </div>
  );
};
