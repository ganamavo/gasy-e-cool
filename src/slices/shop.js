import { createSlice } from '@reduxjs/toolkit';

export const shopSlice = createSlice({
    name: 'shops',
    initialState: {
        data: null,
        singleShop: false,
        shouldRefreshData: false,
        categories: []
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
        setShopCategories: (state, action) => {
            state.categories = action.payload;
        }
    }
});

// this is for dispatch
export const { setShops, setShouldRefreshShopsData, setShopCategories } = shopSlice.actions;

// this is for configureStore
export default shopSlice.reducer;