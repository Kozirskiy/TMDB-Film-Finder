import s from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <p className={s.copy}>© 2025 Kinopoisk Demo · Data courtesy of TMDB</p>
        <p className={s.note}>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
        <div className={s.socials}>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://t.me" target="_blank" rel="noreferrer">
            Telegram
          </a>
        </div>
      </div>
    </footer>
  );
};
