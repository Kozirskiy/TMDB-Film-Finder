import {configureStore, isRejected} from '@reduxjs/toolkit';
import type {Middleware} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import {baseApi} from './baseApi';
import {favoritesReducer} from '../features/favorites/favoritesSlice';

// One place catches every failed RTK Query request: network drops,
// invalid token (401), broken endpoints (404) and zod validation errors.
const errorToastMiddleware: Middleware = () => (next) => (action) => {
  if (isRejected(action) && !action.meta.condition) {
    const payload = action.payload as
      | {
          status?: number | string;
          error?: string;
          data?: {status_message?: string};
        }
      | undefined;
    let message = 'Something went wrong';
    if (payload?.status === 'FETCH_ERROR') {
      message = 'Network error. Check your internet connection';
    } else if (payload?.status === 401) {
      message = 'Invalid API token (401). Check VITE_TMDB_TOKEN';
    } else if (payload?.status === 404) {
      message = 'Requested resource not found (404)';
    } else if (payload?.status === 'CUSTOM_ERROR') {
      message = payload.error ?? message;
    } else if (payload?.data?.status_message) {
      message = payload.data.status_message;
    }
    toast.error(message, {toastId: message});
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, errorToastMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
