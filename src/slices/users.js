import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        data: []
    },
    reducers: {
        setUsers: (state, action) => {
            state.data.push(action.payload);
        },
    }
});

// this is for dispatch
export const { setUsers } = userSlice.actions;

// this is for configureStore
export default userSlice.reducer;