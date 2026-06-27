import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import questionReducer from "../features/questionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionReducer,
  },
});
