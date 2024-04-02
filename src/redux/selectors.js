export const selectLoading = (state) => state.nannies.isLoading;

export const selectError = (state) => state.nannies.error;

export const selectNannies = (state) => state.nannies.nannies;

export const selectFilter = (state) => state.nannies.filter;

export const selectFav = (state) => state.nannies.favorites;

export const selectUser = (state) => state.user;
