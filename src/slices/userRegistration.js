import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        isRegistered: false,
        isLoggedIn: false
    },
    reducers: {
        setIsRegistered: (state, action) => {
            state.isRegistered = action.payload;
        },

        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },

        setUserInfo: (state, action) => {
            state.data = action.payload;
        },
    }
});

// this is for dispatch
export const { setIsRegistered, setIsLoggedIn, setUserInfo } = userSlice.actions;

// this is for configureStore
export default userSlice.reducer;