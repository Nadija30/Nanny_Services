import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  token: null,
  id: null,
  name: null,
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
      state.name = action.payload.name;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.name = null;
    },
  },
});

export const { setUser, removeUser } = userSlise.actions;
export const userReduser = userSlise.reducer;
