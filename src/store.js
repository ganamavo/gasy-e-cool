import { configureStore } from '@reduxjs/toolkit';
import product from './slices/product';
import userRegistration from './slices/userRegistration';

export default configureStore({
  reducer: {
    user: userRegistration,
    products: product
  },
});