import { createSlice } from '@reduxjs/toolkit';

export const shopSlice = createSlice({
    name: 'shops',
    initialState: {
        data: null,
        singleShop: false,
        shouldRefreshData: false
    },
    reducers: {
        setShops: (state, action) => {
            state.data = action.payload;
        },
        setShouldRefreshShopsData: (state, action) => {
            state.shouldRefreshData = action.payload;
        },
        setSingleShop: (state, action) => {
            state.singleShop = action.payload;
        },
    }
});

// this is for dispatch
export const { setShops, setShouldRefreshShopsData } = shopSlice.actions;

// this is for configureStore
export default shopSlice.reducer;