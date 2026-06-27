import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api";

export const fetchQuizzes = createAsyncThunk(
  "quizzes/fetchQuizzes",
  async () => {
    const res = await API.get("/quizzes");
    return res.data;
  },
);

export const fetchQuizById = createAsyncThunk(
  "quizzes/fetchQuizById",
  async (id) => {
    const res = await API.get(`/quizzes/${id}`);
    return res.data;
  },
);

export const createQuiz = createAsyncThunk(
  "quizzes/createQuiz",
  async (quiz, { rejectWithValue }) => {
    try {
      const res = await API.post("/quizzes", quiz);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Create quiz failed",
      );
    }
  },
);

export const updateQuiz = createAsyncThunk(
  "quizzes/updateQuiz",
  async ({ id, quiz }) => {
    const res = await API.put(`/quizzes/${id}`, quiz);
    return res.data;
  },
);

export const deleteQuiz = createAsyncThunk("quizzes/deleteQuiz", async (id) => {
  await API.delete(`/quizzes/${id}`);
  return id;
});

const quizSlice = createSlice({
  name: "quizzes",
  initialState: {
    error: null,
    list: [],
    selectedQuiz: null,
  },
  reducers: {
    clearSelectedQuiz: (state) => {
      state.selectedQuiz = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchQuizById.fulfilled, (state, action) => {
        state.selectedQuiz = action.payload;
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(updateQuiz.fulfilled, (state, action) => {
        const index = state.list.findIndex((q) => q._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.list = state.list.filter((q) => q._id !== action.payload);
      });
  },
});

export const { clearSelectedQuiz } = quizSlice.actions;
export default quizSlice.reducer;
