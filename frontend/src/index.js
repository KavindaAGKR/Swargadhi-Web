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
import { createTheme, ThemeProvider } from '@mui/material/styles';





export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


const theme = createTheme();

// theme.typography.h3 = {
//   fontSize: '1.2rem',
//   '@media (min-width:600px)': {
//     fontSize: '2.5rem',
//   },
//   [theme.breakpoints.up('md')]: {
//     fontSize: '4rem',
//   },
// };









const userFromStorage = localStorage.getItem('user');
const tokenFromStorage = localStorage.getItem('token');

if (userFromStorage && tokenFromStorage) {
  store.dispatch(setUser(JSON.parse(userFromStorage)));
  store.dispatch(setToken(tokenFromStorage));
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <Provider store = {store}>
    <BrowserRouter forceRefresh={true}>
    <ScrollToTop/>
    <App />
    </BrowserRouter>

    </Provider>
    
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
