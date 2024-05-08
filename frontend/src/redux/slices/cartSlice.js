// // src/redux/slices/cartSlice.js

// import { createSlice } from '@reduxjs/toolkit';

// export const cartSlice = createSlice({
//   name: 'cart',

//   initialState: {
//     items: [],
//     subtotal: 0,
//   },

//   reducers: {
//     addToCart: (state, action) => {
//       state.items.push(action.payload);
//     },
//     removeItemFromCart: (state, action) => {
//       const indexToRemove = state.items.findIndex(item => item.productItemID === action.payload);
//       if (indexToRemove !== -1) {
//           state.items.splice(indexToRemove, 1);
//       }
//   },

//     // Add more reducers as needed
//   },
// });

// export const { addToCart, removeItemFromCart } = cartSlice.actions;

// export const selectCartItems = (state) => state.cart.items;

// export default cartSlice.reducer;










// src/redux/slices/cartSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    subtotal: 0,
  },
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload.items;
      state.subtotal = action.payload.subtotal;
    },
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

export const { setCart, addToCart, removeItemFromCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;



// Async action to send cart data to backend
export const sendCartData = (cartData) => async (dispatch) => {
  try {
    // Make a POST request to send cart data to backend
    const response = await axios.post('/api/cart/user-cart', cartData); // Assuming your backend API endpoint is '/api/cart/user-cart'
    console.log(response.data); // Log response from backend
  } catch (error) {
    console.error('Error sending cart data:', error);
  }
};

// Async action to fetch cart data from backend
export const fetchCartData = () => async (dispatch) => {
  try {
    // Make a GET request to fetch cart data from backend
    const response = await axios.get('/api/cart'); // Assuming your backend API endpoint for fetching cart data is '/api/cart'
    dispatch(setCart(response.data)); // Dispatch setCart action with fetched cart data
  } catch (error) {
    console.error('Error fetching cart data:', error);
  }
};

// Async action to remove item from cart in backend
export const removeFromCartInBackend = (productId) => async (dispatch) => {
  try {
    await axios.delete(`/api/cart/remove-product/${productId}`); // Assuming your backend API endpoint is '/api/cart/remove-product/:productId'
    console.log(`Product with ID ${productId} removed from cart in backend`);
  } catch (error) {
    console.error('Error removing product from cart in backend:', error);
  }
};

export default cartSlice.reducer;
