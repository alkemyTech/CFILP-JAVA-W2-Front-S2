import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'authenticated', 'not-authenticated'
        user: {},
        errorMessage: undefined,
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'cheking';
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, action) => {
            state.status = 'authenticated';
            state.user = action.payload;
            state.errorMessage = undefined;
        },
        onLogOut: (state, action) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = action.payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        }
    }
});

export const { onChecking, onLogin, onLogOut, clearErrorMessage } = AuthSlice.actions;