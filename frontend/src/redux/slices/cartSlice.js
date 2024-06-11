
import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartItemsFromLocalStorage(),
    
  },
  reducers: {
    
    addToCart: (state, action) => {
      const newItem = { ...action.payload, buyingCount: 1 }; // Ensure buyingCount is set
      state.items = [...state.items, newItem]; // Use spread operator for new array
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
    updateItemBuyingCount: (state, action) => {
      const { productItemID, buyingCount } = action.payload;
      const itemToUpdate = state.items.find(
        item => item.productItemID === productItemID
      );
      if (itemToUpdate) {
        itemToUpdate.buyingCount = buyingCount;
        saveCartItemsToLocalStorage(state.items);
      }
    },
    removeCart: (state) => {
      state.items = [];
      saveCartItemsToLocalStorage(state.items);
    },
    
  },
});

// export const { setCart, addToCart, removeItemFromCart } = cartSlice.actions;
export const {  addToCart, removeItemFromCart,updateItemBuyingCount, removeCart  } = cartSlice.actions;
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
