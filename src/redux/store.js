import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { nanniesReducer } from './slise';
import { userReduser } from './userSlise';

const nanniesPersistConfig = {
  key: 'nannies',
  storage,
  whitelist: ['favorites', 'page'],
};

const userConfig = {
  key: 'root', // Ключ, за яким буде збережено стан
  storage, // Використовуємо обраний метод збереження
  whitelist: ['user'], // Вказуємо, які редуктори потрібно зберігати (в даному випадку - 'user')
  // blacklist: [], // Або можемо вказати, які редуктори не зберігати
};
const persistedReducer = persistReducer(userConfig, userReduser);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    nannies: persistReducer(nanniesPersistConfig, nanniesReducer),
    // filter: persistReducer(favCarsPersistConfig, setFilters),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: import.meta.env.MODE === 'development',
});

export const persistor = persistStore(store);
