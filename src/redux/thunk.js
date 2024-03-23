import { createAsyncThunk } from '@reduxjs/toolkit';
import app from '../firebase/firebaseConfig';
import { getDatabase, ref, get } from 'firebase/database';

export const fetchAllNannies = createAsyncThunk(
  'nannies/fetchAllNannies',
  async (_, thunkAPI) => {
    try {
      const db = await getDatabase(app);
      const dbRef = await ref(db, 'nannies');
      const snapshot = await get(dbRef);
      const res = await snapshot.val();
      return res;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
