import {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {useTheme} from '../../../features/theme/useTheme';
import s from './Header.module.css';

const navItems = [
  {to: '/', label: 'Main'},
  {to: '/category', label: 'Category Movies'},
  {to: '/filtered', label: 'Filtered Movies'},
  {to: '/search', label: 'Search'},
  {to: '/favorites', label: 'Favorites'},
];

export const Header = () => {
  const {theme, toggleTheme} = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <Link to="/" className={s.logoLink} aria-label="TMDB — go to main page">
          <img src="/tmdb-logo.svg" alt="TMDB logo" className={s.logo} />
        </Link>

        <nav className={`${s.nav} ${menuOpen ? s.navOpen : ''}`}>
          {navItems.map(({to, label}) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({isActive}) =>
                `${s.navLink} ${isActive ? s.active : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className={s.actions}>
          <button
            className={s.themeBtn}
            onClick={toggleTheme}
            title="Toggle theme"
            aria-label="Toggle dark/light theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button
            className={s.burger}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
};
