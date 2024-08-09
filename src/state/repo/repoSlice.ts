import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Создание слайса с репозиторием
interface Repo {
  id: number;
  name: string;
  language: string;
  forks: number;
  stargazers_count: number;
  updated_at: Date;
  description: string;
  license: {};
  languages_url: string; 
}

// State самого слайса
interface RepoState {
  repos: Repo[];
  languages: { [key: string]: any }; 
  loading: boolean;
  error: string | null;
}

// Начальный State слайса (при инициализации программы)
const initialState: RepoState = {
  repos: [],
  languages: {}, 
  loading: false,
  error: null,
};

// Асинхронная функция для получения информации о репозитериях пользователя с введённым ником
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

// Асинхронная функция для присвоения массиву использованных языков его значений
export const fetchRepoLanguages = createAsyncThunk(
  "repo/fetchRepoLanguages",
  async (languagesUrl: string) => {
    const response = await fetch(languagesUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch languages");
    }
    return response.json();
  }
);

// Создание слайса с его редюсерами
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
      })
      .addCase(fetchRepoLanguages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepoLanguages.fulfilled, (state, action) => {
        state.languages = action.payload;
        state.loading = false;
      })
      .addCase(fetchRepoLanguages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch languages";
      });
  },
});

// Экспорт слайса для последующего использования в других местах программы
export default repoSlice.reducer;
