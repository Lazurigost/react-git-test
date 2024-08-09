// Создание store файла для взаимодействия с Redux
import { configureStore } from '@reduxjs/toolkit';
import repoReducer from './repo/repoSlice'; 

const store = configureStore({
  reducer: {
    repo: repoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;