import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authslice';

const store = configureStore({
  reducer: {
    auth: authReducer, // Adding our reducer to manage authentication state
  },
});

export default store;