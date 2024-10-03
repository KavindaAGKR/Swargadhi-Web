
import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import languageReducer from './slices/languageSlice'


export const store = configureStore({
  reducer: {
    // auth: authReducer,
    user: userReducer,
    cart: cartReducer,
    language : languageReducer,
  },
});
