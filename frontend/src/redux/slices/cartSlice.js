



// src/redux/slices/cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartItemsFromLocalStorage(),
    subtotal: 0,
  },
  reducers: {
    // setCart: (state, action) => {
    //   state.items = action.payload.items;
    //   state.subtotal = action.payload.subtotal;
    //   saveCartItemsToLocalStorage(action.payload.items);
    // },
    addToCart: (state, action) => {
      state.items.push(action.payload);
      saveCartItemsToLocalStorage(state.items);
    },
    removeItemFromCart: (state, action) => {
      const indexToRemove = state.items.findIndex(
        item => item.productItemID === action.payload
      );
      if (indexToRemove !== -1) {
        state.items.splice(indexToRemove, 1);
        saveCartItemsToLocalStorage(state.items);
      }
    },
  },
});

// export const { setCart, addToCart, removeItemFromCart } = cartSlice.actions;
export const {  addToCart, removeItemFromCart } = cartSlice.actions;
export const selectCartItems = state => state.cart.items;

export default cartSlice.reducer;

// Function to load cart items from local storage
function loadCartItemsFromLocalStorage() {
  const initialCartItems = localStorage.getItem('cartItems');
  return initialCartItems ? JSON.parse(initialCartItems) : [];
}

// Function to save cart items to local storage
function saveCartItemsToLocalStorage(items) {
  localStorage.setItem('cartItems', JSON.stringify(items));
}
