// src/redux/slices/cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',

  initialState: {
    items: [],
    subtotal: 0,
  },
  
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeItemFromCart: (state, action) => {
      const indexToRemove = state.items.findIndex(item => item.productItemID === action.payload);
      if (indexToRemove !== -1) {
          state.items.splice(indexToRemove, 1);
      }
  },

    // Add more reducers as needed
  },
});

export const { addToCart, removeItemFromCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
