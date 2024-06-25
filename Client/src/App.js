
import { Route , Routes} from 'react-router-dom';
import { Login } from './Pages/UserLogin/Login';
import { Home } from './Pages/Home/Home';
import { Signup } from './Pages/UserSignup/Signup';
import { AboutEn } from './Pages/About/AboutEn';
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
import { AdminSignup } from './AdminPanel/AdminSignup';
import {Shop}  from './Pages/Shop/Shop';
import {AdminDoctor}from './AdminPanel/AdminDoctor'
import { AdminTreatment } from './AdminPanel/AdminTreatment';
import {EditProduct} from './AdminPanel/EditProduct';
import { EditDoctor } from './AdminPanel/EditDoctor';
import {EditTreatment} from './AdminPanel/EditTreatment'
import { PageNotFound } from './Pages/PageNotFound/PageNotFound';
import {AdminMaterial} from './AdminPanel/AdminMaterial'





import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from './redux/slices/userSlice';
import { selectIsSinhalaTrue } from './redux/slices/languageSlice'; 
import { CheckOutEn } from './Pages/Checkout/CheckoutEn';
import { DispensarySi } from './Pages/Dispensary/DispensarySi';
import { DispensaryEn } from './Pages/Dispensary/DispensaryEn';
import { AboutSi } from './Pages/About/AboutSi';
import { CartEn } from './Pages/Cart/CartEn';
import { CartSi } from './Pages/Cart/CartSi';
import { PageNotFoundSi } from './Pages/PageNotFound/PageNotFoundSi';
import { CheckOutSi } from './Pages/Checkout/CheckoutSi';
import { Search } from './Pages/Search/Search';
import { ShopSi } from './Pages/Shop/Sinhala/ShopSi';
import { selectCartItems } from './redux/slices/cartSlice';
import { UserProfileSi } from './Pages/UserProfile/UserProfileSinhala/UserprofileSi';
import { SignupSi } from './Pages/UserSignup/SignupSi';
import { LoginSi } from './Pages/UserLogin/LoginSi';
import ResetPassword from './Pages/Password/ResetPassword';
import config from './config';


function App() {
  const isUserLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const isSinhalaTrue = useSelector(selectIsSinhalaTrue);
  const cartItems = useSelector(selectCartItems);



  console.log('Base URL:', config.baseURL);
  console.log('REACT_APP_BASE_URL:', process.env.REACT_APP_BASE_URL);
  return (
    <div>
        <Routes>

        {/* Admin Dashboard Routes */}
        {/* Nested Route for admin Dashboard */}


        {isUserLoggedIn && user.isAdmin===true ?
        (<Route path='/admin/home' element={<AdminHome/>}>
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
        <Route path='material' element={<AdminMaterial/>}/>
        {/* Productss */}
        <Route path='products' element={<Products/>}/>
    </Route>
    ):(<Route path='*' element={<PageNotFound/>}/>)
        }
        

        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/adminsignup' element={<AdminSignup/>}/>


        

        {isSinhalaTrue? (
          <>
          <Route path='/dispensary' element={<DispensarySi/>}/>
          <Route path='/about' element={<AboutSi/>}/>
          <Route path='/shop' element={<ShopSi/>}/>
          <Route path='/user' element={<UserProfileSi/>}/>
          <Route path='/login' element={<LoginSi/>}/>
          <Route path='/signup' element={<SignupSi/>} />
          

          {isUserLoggedIn ? (
                    <>
                    <Route path='/cart' element={<CartSi/>}/>
                    {
                      cartItems.length>0 ? <Route path='/checkout' element={<CheckOutSi/>}/> 
                      : <Route path='*' element={<PageNotFound/>}/>
                    }
                    </>
                    ) : (<Route path='*' element={<PageNotFoundSi/>}/>)}
          
          </>
        ):(
          <>
          <Route path='/dispensary' element={<DispensaryEn/>}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path='/about' element={<AboutEn/>}/>
          <Route path='/user' element={<UserProfile/>}/>
          
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>} />
          <Route path="/reset/:token" element={<ResetPassword />} />
          {isUserLoggedIn ? (
                    <>
                    <Route path='/cart' element={<CartEn/>}/>
                    
                    {
                      cartItems.length>0 ? <Route path='/checkout' element={<CheckOutEn/>}/>
                      : <Route path='*' element={<PageNotFound/>}/>
                    }
                    </>
                    ) : (<Route path='*' element={<PageNotFound/>}/>)}
          </>
        )}



        {/* User part Routes */}
        <Route path='/' element={<Home/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='*' element={<PageNotFound/>}/>

        
        
        
        
        





    </Routes>
    </div>
  );
}

export default App;
