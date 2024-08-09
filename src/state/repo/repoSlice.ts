import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//Создание класса
interface Repo {
  id: number;
  name: string;
  language: string;
  forks: number;
  stars: number;
  updated_at: Date;
  description: string;
  license: {};
}
//Создание списка
interface RepoState {
  repos: Repo[];
  loading: boolean;
  error: string | null;
}
//Инициализация списка
const initialState: RepoState = {
  repos: [],
  loading: false,
  error: null,
};

//Асинхронный метод для получения данных
export const fetchUserRepos = createAsyncThunk(
  "repo/fetchUserRepos",
  async (username: string) => {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!response.ok) {
      throw new Error("Failed to fetch repos");
    }
    return response.json();
  }
);
//Создание слайса 
const repoSlice = createSlice({
  name: "repo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRepos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserRepos.fulfilled, (state, action) => {
        state.repos = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserRepos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch repos";
      });
  },
});

//Экспорт данных
export default repoSlice.reducer;
