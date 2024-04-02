import { createAsyncThunk } from '@reduxjs/toolkit';
import app from '../firebase/firebaseConfig';
import {
  getDatabase,
  ref,
  get,
  query,
  orderByValue,
  limitToFirst,
  startAfter,
} from 'firebase/database';

export const fetchAllNannies = createAsyncThunk(
  'nannies/fetchAllNannies',
  async (filter, page, thunkAPI) => {
    try {
      const db = getDatabase(app);

      const dbRef = query(
        ref(db, 'nannies'),
        orderByValue('rating'),
        startAfter(4),
        limitToFirst(20)
      );

      const snapshot = await get(dbRef);

      const res = await snapshot.val();

      const arrFromThunk = [...res];

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
