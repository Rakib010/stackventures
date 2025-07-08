import { configureStore } from "@reduxjs/toolkit";
import { quizApi } from "./api/quizApi";
import { quizSlice } from "./feature/quizSlice";

export const store = configureStore({
  reducer: {
    quiz: quizSlice.reducer,
    //
    [quizApi.reducerPath]: quizApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(quizApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
