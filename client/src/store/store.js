import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./tokenSlice";
import taskSlice from "./taskSlice";

export const store = configureStore({
    reducer: {
        auth : tokenSlice,
        taskmate : taskSlice
    }
})