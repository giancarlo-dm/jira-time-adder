import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { jiraPointsReducer } from "./jiraPoints";


export const store = configureStore({
    reducer: {
        jiraPoints: jiraPointsReducer
    }
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
