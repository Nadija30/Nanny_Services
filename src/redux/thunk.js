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

// const filterQ = 'popular';
// const pageQ = 1;

export const fetchAllNannies = createAsyncThunk(
  'nannies/fetchAllNannies',
  async (filter, page, thunkAPI) => {
    try {
      console.log('filter in thunk', filter);

      // db handling
      const db = getDatabase(app);
      // const topUserPostsRef = query(ref(db, 'user-posts/' + myUserId), orderByChild('starCount'));
      const dbRef = query(
        ref(db, 'nannies'),
        orderByValue('rating'),
        startAfter(4),
        limitToFirst(20)
      );
      // const dbRef = query(ref(db, "nannies"));
      // await get(dbRef);
      console.log(dbRef);
      console.log(await get(dbRef));

      const snapshot = await get(dbRef);

      // old response
      const res = await snapshot.val();
      console.log(res);
      const arrFromThunk = [...res];
      console.log('arrFromThunk', arrFromThunk);
      return res;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

////// РОБОЧИЙ ВАРІАНТ НА ВСІ КАРТКИ
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import app from "../firebase/firebaseConfig";
// import { getDatabase, ref, get } from "firebase/database";
// // import { useSelector } from "react-redux";
// // import { selectFilter } from "./selectors";

// export const fetchAllNannies = createAsyncThunk(
//   "nannies/fetchAllNannies",
//   async (filter, thunkAPI) => {

//     try {
//       console.log('filter in thunk', filter)
//       let goodRes = [];

//       // db handling
//       const db = await getDatabase(app);
//       const dbRef = await ref(db, "nannies");
//       const snapshot = await get(dbRef);

//       // new responce
//   // filter database searching for specific state user is looking for

// console.log(goodRes)
//       // old response
//           const res = await snapshot.val();
//           return res;

//     } catch (error) {
//       console.log(error.message);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
