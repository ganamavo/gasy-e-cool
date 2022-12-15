import { configureStore } from '@reduxjs/toolkit';
import userRegistration from './slices/userRegistration';

export default configureStore({
  reducer: {
    user: userRegistration,
  },
});