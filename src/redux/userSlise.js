import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  token: null,
  id: null,
};

const userSlise = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      console.log('User data:', action.payload);
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlise.actions;
export const userReduser = userSlise.reducer;
