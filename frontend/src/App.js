
import { Route , Routes} from 'react-router-dom';
import { Login } from './Pages/UserLogin/Login';
import { Home } from './Pages/Home/Home';
import { Signup } from './Pages/UserSignup/Signup';
import { About } from './Pages/About/About';
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
import { UserProfile } from './Pages/UserProfile/Userprofile';
import { Dispensary } from './Pages/Dispensary/Dispensary';
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
