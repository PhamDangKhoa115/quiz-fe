import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api";

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const tokenFromStorage = localStorage.getItem("token") || null;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/auth/register", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userFromStorage,
    token: tokenFromStorage,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
