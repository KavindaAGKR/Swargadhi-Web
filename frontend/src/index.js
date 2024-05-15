import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import {Provider} from 'react-redux'


import { setUser, setToken } from './redux/slices/userSlice';









import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}










const userFromStorage = localStorage.getItem('user');
const tokenFromStorage = localStorage.getItem('token');

if (userFromStorage && tokenFromStorage) {
  store.dispatch(setUser(JSON.parse(userFromStorage)));
  store.dispatch(setToken(tokenFromStorage));
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
    <BrowserRouter>
    <ScrollToTop/>
    <App />
    </BrowserRouter>

    </Provider>
    
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
