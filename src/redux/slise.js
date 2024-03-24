import { createSlice } from '@reduxjs/toolkit';
import { fetchAllNannies } from './thunk';

const initialState = {
  nannies: [],
  favorites: [],
  filter: 'popular',
  page: 1,
  isLoading: false,
  error: null,
};

const nanniesSlice = createSlice({
  name: 'nannies',
  initialState,

  reducers: {
    // toggleFav: (state, { payload }) => {
    //   state.nannies = state.nannies.map((el) =>
    //     el.id === payload ? { ...el, isLiked: !el.isLiked } : el
    //   );
    // },

    addFav(state, action) {
      state.favorites.push(action.payload);
    },

    removeFav(state, action) {
      const index = state.favorites.findIndex(
        (item) => item.id === action.payload
      );
      state.favorites.splice(index, 1);
    },

    savePage(state, action) {
      state.page = action.payload;
    },

    saveFilter(state, action) {
      state.filter = action.payload.toString();
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(fetchAllNannies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllNannies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllNannies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.nannies = action.payload;
      }),
});

export const { toggleFav, addFav, removeFav, savePage, saveFilter } =
  nanniesSlice.actions;
export const nanniesReducer = nanniesSlice.reducer;
