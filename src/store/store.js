import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./auth/AuthSlice";
import { AccountSlice } from "./wallet/AccountSlice";


export const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        account: AccountSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});