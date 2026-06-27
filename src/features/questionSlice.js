import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api";

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/questions");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

export const addQuestion = createAsyncThunk(
  "questions/addQuestion",
  async (question, { rejectWithValue }) => {
    try {
      const res = await API.post("/questions", question);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

export const updateQuestion = createAsyncThunk(
  "questions/updateQuestion",
  async ({ id, question }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/questions/${id}`, question);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

export const deleteQuestion = createAsyncThunk(
  "questions/deleteQuestion",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/questions/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

const questionSlice = createSlice({
  name: "questions",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        const index = state.list.findIndex((q) => q._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.list = state.list.filter((q) => q._id !== action.payload);
      });
  },
});

export default questionSlice.reducer;
