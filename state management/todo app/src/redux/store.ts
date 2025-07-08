import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./features/task/taskSlice"
import userSlice from "./features/user/userSlice";


export const store = configureStore({
    reducer: {
        todo: taskReducer,
        user: userSlice
    },

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

