// src/redux/slices/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({

    name: 'user',

initialState: {
    user: null,
    token: null,
    isLoggedIn: false,
},

reducers: {
    setUser: (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(action.payload));
        
        setTimeout(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          }, 3600000); // logout if inactive for 1 hour 
        
    },
    setToken: (state, action) => {
        state.token = action.payload;
        localStorage.setItem('token', state.token);
    },
    logout: (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    },
},
});

export const { setUser, setToken, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export default userSlice.reducer;
