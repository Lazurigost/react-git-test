// store.ts
import { configureStore } from '@reduxjs/toolkit';
import repoReducer from './repo/repoSlice'; // Adjust the path as necessary

const store = configureStore({
  reducer: {
    repo: repoReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;