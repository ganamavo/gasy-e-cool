import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        data: null,
        singleProduct: false,
    },
    reducers: {
        setProducts: (state, action) => {
            state.data = action.payload;
        },

        setSingleProduct: (state, action) => {
            state.singleProduct = action.payload;
        },
    }
});

// this is for dispatch
export const { setProducts } = productSlice.actions;

// this is for configureStore
export default productSlice.reducer;