
import { Route , Routes} from 'react-router-dom';
import { Login } from './Pages/Login';
import { Home } from './Pages/Home';
import { Signup } from './Pages/Signup';
import { About } from './Pages/About';
import { AdminLogin } from './AdminPanel/AdminLogin';
import { AdminHome } from './AdminPanel/AdminHome';
import { Products } from './AdminPanel/Products';
import { AdminDashboard } from './AdminPanel/AdminDashboard';
import { AdminProfile } from './AdminPanel/AdminProfile';
import { AdminOrders } from './AdminPanel/AdminOrders';
import { AdminSaleReport } from './AdminPanel/AdminSaleReport';
import { AdminUsers } from './AdminPanel/AdminUsers';
import { AdminMessages } from './AdminPanel/AdminMessages';
import { AdminSettings } from './AdminPanel/AdminSettings';
import { UserProfile } from './Pages/Userprofile';
import { Dispensary } from './Pages/Dispensary';
import { AdminSignup } from './AdminPanel/AdminSignup';
import Shop  from './Pages/Shop/Shop';
import {AdminDoctor}from './AdminPanel/AdminDoctor'
import { AdminTreatment } from './AdminPanel/AdminTreatment';
import {EditProduct} from './AdminPanel/EditProduct';
import { EditDoctor } from './AdminPanel/EditDoctor';
import {EditTreatment} from './AdminPanel/EditTrearment'
import { Cart } from './Pages/Cart/Cart';

// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { checkAuthExpiration, logout } from './redux/slices/authSlice';


function App() {



  // //To Check whether the JWT token
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(checkAuthExpiration());    // Dispatch the action to check for token expiration when the app initializes
  //   // Set up a timer to periodically check for token expiration and clear localStorage after logout
  //   const expirationCheckInterval = setInterval(() => {
  //     dispatch(checkAuthExpiration());
  //   }, 60000); // Check every minute
  //   // Set up a timer to automatically log out the user after 3 hours (in milliseconds)
  //   const logoutTimer = setTimeout(() => {
  //     dispatch(logout());
  //   }, 3 * 60 * 60 * 1000); // 3 hours
  //   // Clean up the intervals on component unmount
  //   return () => {
  //     clearInterval(expirationCheckInterval);
  //     clearTimeout(logoutTimer);
  //   };
  // }, [dispatch]);



  return (
    <div>
        <Routes>

        {/* Admin Dashboard Routes */}
        {/* Nested Route for admin Dashboard */}
        <Route path='/admin/home' element={<AdminHome/>}>
            <Route index element={<AdminDashboard/>}/>
            <Route path='profile' element={<AdminProfile/>}/>
            <Route path='orders' element={<AdminOrders/>}/>
            <Route path='salesreport' element={<AdminSaleReport/>}/>
            <Route path='users' element={<AdminUsers/>}/>
            <Route path='messages' element={<AdminMessages/>}/> 

            <Route path='settings' element={<AdminSettings/>}/>
            <Route path='doctor' element={<AdminDoctor/>}/>
            <Route path='treatment' element={<AdminTreatment/>}/>
            <Route path='products/:id/edit' element={<EditProduct/>}/>
            <Route path='doctor/:id/edit' element={<EditDoctor/>}/>
            <Route path='treatment/:id/edit' element={<EditTreatment/>}/>
            {/* Productssssssssssssssss */}
            <Route path='products' element={<Products/>}/>
        </Route>

        <Route path='/admin' element={<AdminLogin/>}/>
        
        <Route path='/adminsignup' element={<AdminSignup/>}/>

        

        

        {/* User part Routes */}
        <Route path='/' element={<Home/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/dispensary' element={<Dispensary/>}/>
        <Route path='/user' element={<UserProfile/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/cart' element={<Cart/>}/>


    </Routes>
    </div>
  );
}

export default App;
