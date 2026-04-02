import { configureStore } from '@reduxjs/toolkit';
import cartSlice from "../reducers/cartSlice";



export const store = configureStore({
    reducer:{
        card:cartSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;