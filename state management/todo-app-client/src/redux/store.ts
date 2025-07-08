import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";

export const store = configureStore({
    reducer: {
        //✅ RTK Query reducer
        [baseApi.reducerPath]: baseApi.reducer
    },
    // ✅ RTK Query middleware
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware)

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

