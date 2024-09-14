// src/store/features/articleSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import jwt from "jsonwebtoken";

// Define the shape of an article
export interface Article {
  _id: string;
  title: string;
  description: string;
  category: string;
  file: string; // File path or URL
  [key: string]: any;
}

// Define the shape of the articles state
interface ArticlesState {
  token: string | null;
  articles: Article[] | null; // Changed to an array
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: ArticlesState = {
  token: null,
  articles: null,
  loading: false,
  error: null,
};

// Async thunk for fetching articles
export const fetchArticles = createAsyncThunk(
  "api/fetchArticles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/fetchArticle"); // Adjust API endpoint
      // Assume response.data is an array of articles
      return response.data as Article[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch articles");
    }
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    clearArticles: (state) => {
      state.token = null;
      state.articles = null;
    },
    initializeToken: (state) => {
      const token = localStorage.getItem("token");
      if (token) {
        state.token = token;
        // Assuming you have some way of using the token to fetch articles
        // This might be different depending on your application's logic
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.loading = false;
        state.articles = action.payload; // Set articles data
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Set error message
      });
  },
});

export const { clearArticles, initializeToken } = articlesSlice.actions;
export default articlesSlice.reducer;
