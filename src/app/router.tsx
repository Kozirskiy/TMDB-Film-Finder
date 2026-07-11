import {createBrowserRouter} from 'react-router-dom';
import {Layout} from '../common/components/Layout/Layout';
import {NotFoundPage} from '../common/components/NotFoundPage/NotFoundPage';
import {MainPage} from '../features/movies/ui/MainPage/MainPage';
import {CategoryPage} from '../features/movies/ui/CategoryPage/CategoryPage';
import {FilteredPage} from '../features/movies/ui/FilteredPage/FilteredPage';
import {SearchPage} from '../features/movies/ui/SearchPage/SearchPage';
import {MovieDetailsPage} from '../features/movies/ui/MovieDetailsPage/MovieDetailsPage';
import {FavoritesPage} from '../features/favorites/FavoritesPage/FavoritesPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {index: true, element: <MainPage />},
      {path: 'category', element: <CategoryPage />},
      {path: 'filtered', element: <FilteredPage />},
      {path: 'search', element: <SearchPage />},
      {path: 'favorites', element: <FavoritesPage />},
      {path: 'movie/:id', element: <MovieDetailsPage />},
      {path: '*', element: <NotFoundPage />},
    ],
  },
]);
