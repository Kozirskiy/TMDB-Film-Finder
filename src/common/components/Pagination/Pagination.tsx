import s from './Pagination.module.css';

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

// TMDB rejects page numbers above 500 even when total_pages is larger
const MAX_PAGE = 500;

const getPageWindow = (page: number, total: number): (number | '…')[] => {
  if (total <= 7) return Array.from({length: total}, (_, i) => i + 1);
  if (page <= 4) return [1, 2, 3, 4, 5, '…', total];
  if (page >= total - 3)
    return [1, '…', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '…', page - 1, page, page + 1, '…', total];
};

export const Pagination = ({page, totalPages, onChange}: Props) => {
  const total = Math.min(totalPages, MAX_PAGE);
  if (total <= 1) return null;

  return (
    <nav className={s.pagination} aria-label="Pagination">
      <button
        className={s.btn}
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        ←
      </button>
      {getPageWindow(page, total).map((item, i) =>
        item === '…' ? (
          <span key={`dots-${i}`} className={s.dots}>
            …
          </span>
        ) : (
          <button
            key={item}
            className={`${s.btn} ${item === page ? s.active : ''}`}
            onClick={() => onChange(item)}
            aria-current={item === page ? 'page' : undefined}
          >
            {item}
          </button>
        )
      )}
      <button
        className={s.btn}
        disabled={page >= total}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        →
      </button>
    </nav>
  );
};
