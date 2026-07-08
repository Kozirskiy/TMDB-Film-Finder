import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

export type FavoriteMovie = {
  id: number;
  title: string;
  posterUrl: string;
  voteAverage: number;
};

const STORAGE_KEY = 'favorites';

const loadFavorites = (): FavoriteMovie[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {items: loadFavorites()},
  reducers: {
    toggleFavorite(state, action: PayloadAction<FavoriteMovie>) {
      const index = state.items.findIndex((m) => m.id === action.payload.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    },
  },
  selectors: {
    selectFavorites: (state) => state.items,
  },
});

export const {toggleFavorite} = favoritesSlice.actions;

export const {selectFavorites} = favoritesSlice.selectors;
export const favoritesReducer = favoritesSlice.reducer;
