import { configureStore } from '@reduxjs/toolkit';

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
import storage from 'redux-persist/lib/storage';
import { questionnairesReduser } from './questionnaire/slice.js';

const persistQuestionnaires = {
  key: 'questionnaires',
  storage,
  whitelist: ['oneQuestionnaire'],
};

const persistedQuestionnairesReducer = persistReducer(
  persistQuestionnaires,
  questionnairesReduser
);

export const store = configureStore({
  reducer: {
    questionnaires: persistedQuestionnairesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
