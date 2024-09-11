// src/store/features/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import jwt from "jsonwebtoken";

export interface UserDetails {
  _id: string;
  title: string;
  email: string;
  phone: string;
  qualification: string;
  password: string;
  __v?: number;
  [key: string]: any;
}

interface AuthState {
  token: string | null;
  user: UserDetails | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

// Function to decode the token and extract user details
const decodeToken = (token: string): UserDetails | null => {
  try {
    const decoded = jwt.decode(token) as { user: UserDetails } | null;
    return decoded?.user || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/api/login", credentials); // Adjust API endpoint
      const token = response.data.token;

      // Save token to localStorage
      localStorage.setItem("token", token);

      return token;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.user = decodeToken(action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
    initializeToken: (state) => {
      const token = localStorage.getItem("token");
      if (token) {
        state.token = token;
        state.user = decodeToken(token); // Decode and set user details
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.token = action.payload;
        state.user = decodeToken(action.payload); // Decode user details from token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setToken, logout, initializeToken } = authSlice.actions;
export default authSlice.reducer;
